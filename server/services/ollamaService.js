/**
 * Ollama Service
 * Calls the local Ollama REST API or OpenAI for resume analysis, with graceful fallbacks.
 */

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen3";

function isOpenAIConfigured() {
  const key = (process.env.OPENAI_API_KEY || "").trim();
  return key.startsWith("sk-") && !key.includes("your_") && key.length > 20;
}

/**
 * Sends a prompt to OpenAI or Ollama.
 */
async function callOllama(prompt, options = {}) {
  // If OpenAI is configured with a valid API key, use it
  if (isOpenAIConfigured()) {
    try {
      const OpenAI = require("openai");
      const clientOpts = { apiKey: process.env.OPENAI_API_KEY };
      if (process.env.OPENAI_BASE_URL) {
        clientOpts.baseURL = process.env.OPENAI_BASE_URL;
      }
      const client = new OpenAI(clientOpts);

      const completion = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      });

      return completion.choices[0]?.message?.content || "";
    } catch (err) {
      console.warn("[AI] OpenAI call failed:", err.message);
      throw err;
    }
  }

  const { timeoutMs = 15000 } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
        options: {
          temperature: 0.3,
          num_predict: 4096,
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(
        `Ollama returned HTTP ${res.status}: ${body.slice(0, 200)}`
      );
    }

    const data = await res.json();
    return data.response || "";
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Analyzes a resume using Ollama.
 */
async function analyzeResumeWithOllama(resumeText) {
  const prompt = `/no_think
You are an experienced ATS recruiter and resume analyst.
Analyze the following resume factually and constructively.
Do NOT invent experience, qualifications, or achievements that are not present.

Return ONLY valid JSON (no markdown, no code fences, no explanation) with this exact structure:
{
  "atsScore": <integer 0-100>,
  "resumeRating": <one of: "Needs work", "Fair", "Good", "Excellent">,
  "professionalSummary": "<2-3 sentence professional summary>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "weaknesses": ["<weakness 1>", "<weakness 2>", ...],
  "missingSkills": ["<skill 1>", "<skill 2>", ...],
  "grammarIssues": ["<issue 1>", "<issue 2>", ...],
  "formattingSuggestions": ["<suggestion 1>", "<suggestion 2>", ...],
  "keywordSuggestions": ["<keyword 1>", "<keyword 2>", ...],
  "recommendedImprovements": ["<improvement 1>", "<improvement 2>", ...]
}

RESUME:
${resumeText.slice(0, 30000)}`;

  const raw = await callOllama(prompt);

  let jsonStr = raw.trim();
  const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    jsonStr = fenceMatch[1].trim();
  }
  const braceStart = jsonStr.indexOf("{");
  const braceEnd = jsonStr.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd > braceStart) {
    jsonStr = jsonStr.slice(braceStart, braceEnd + 1);
  }

  const parsed = JSON.parse(jsonStr);

  return {
    atsScore: Number(parsed.atsScore) || 0,
    resumeRating: parsed.resumeRating || "Fair",
    professionalSummary: parsed.professionalSummary || "",
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
    missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
    grammarIssues: Array.isArray(parsed.grammarIssues) ? parsed.grammarIssues : [],
    formattingSuggestions: Array.isArray(parsed.formattingSuggestions) ? parsed.formattingSuggestions : [],
    keywordSuggestions: Array.isArray(parsed.keywordSuggestions) ? parsed.keywordSuggestions : [],
    recommendedImprovements: Array.isArray(parsed.recommendedImprovements) ? parsed.recommendedImprovements : [],
  };
}

function compareResumeWithJobHeuristically(resumeText, jobDescription) {
  const commonTech = [
    "JavaScript", "TypeScript", "React", "Node.js", "Express", "Python",
    "Java", "SQL", "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker",
    "Kubernetes", "Git", "CI/CD", "REST API", "GraphQL", "HTML", "CSS",
    "Tailwind", "Next.js", "Redux", "Linux", "Agile", "Microservices"
  ];

  const resumeLower = (resumeText || "").toLowerCase();
  const jobLower = (jobDescription || "").toLowerCase();

  const matchingSkills = [];
  const missingSkills = [];

  commonTech.forEach((tech) => {
    const inJob = jobLower.includes(tech.toLowerCase());
    const inResume = resumeLower.includes(tech.toLowerCase());

    if (inJob && inResume) {
      matchingSkills.push(tech);
    } else if (inJob && !inResume) {
      missingSkills.push(tech);
    } else if (inResume && matchingSkills.length < 5) {
      matchingSkills.push(tech);
    }
  });

  const totalRequired = matchingSkills.length + missingSkills.length;
  const matchScore = totalRequired > 0
    ? Math.round((matchingSkills.length / totalRequired) * 100)
    : 78;

  let shortlistProbability = "Medium";
  if (matchScore >= 80) shortlistProbability = "High";
  else if (matchScore >= 90) shortlistProbability = "Very High";
  else if (matchScore < 50) shortlistProbability = "Low";

  return {
    matchScore,
    matchingSkills,
    missingSkills: missingSkills.slice(0, 5),
    keywordCoverage: matchScore,
    recommendations: [
      missingSkills.length > 0
        ? `Incorporate missing requirements (${missingSkills.slice(0, 3).join(", ")}) into your experience bullets.`
        : "Highlight quantified results and metrics to stand out among applicants.",
      "Align the phrasing of your work experience directly with the terminology in the job description.",
      "Include recent project achievements demonstrating leadership and end-to-end ownership.",
    ],
    shortlistProbability,
  };
}

/**
 * Compares a resume against a job description using Ollama with heuristic fallback.
 */
async function compareResumeWithJobOllama(resumeText, jobDescription) {
  try {
    const prompt = `/no_think
You are an expert ATS recruiter. Compare the following resume against the job description.
Be factual — only identify skills and keywords that are actually present or absent.

Return ONLY valid JSON (no markdown, no code fences, no explanation) with this exact structure:
{
  "matchScore": <integer 0-100>,
  "matchingSkills": ["<skill>", ...],
  "missingSkills": ["<skill>", ...],
  "keywordCoverage": <integer 0-100>,
  "recommendations": ["<recommendation>", ...],
  "shortlistProbability": "<Low | Medium | High | Very High>"
}

RESUME:
${resumeText.slice(0, 15000)}

JOB DESCRIPTION:
${jobDescription.slice(0, 10000)}`;

    const raw = await callOllama(prompt);

    let jsonStr = raw.trim();
    const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      jsonStr = fenceMatch[1].trim();
    }
    const braceStart = jsonStr.indexOf("{");
    const braceEnd = jsonStr.lastIndexOf("}");
    if (braceStart !== -1 && braceEnd > braceStart) {
      jsonStr = jsonStr.slice(braceStart, braceEnd + 1);
    }

    const parsed = JSON.parse(jsonStr);

    return {
      matchScore: Number(parsed.matchScore) || 0,
      matchingSkills: Array.isArray(parsed.matchingSkills) ? parsed.matchingSkills : [],
      missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
      keywordCoverage: Number(parsed.keywordCoverage) || 0,
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
      shortlistProbability: parsed.shortlistProbability || "Medium",
    };
  } catch (err) {
    console.warn("[AI] Job match AI unavailable, using heuristic engine:", err.message);
    return compareResumeWithJobHeuristically(resumeText, jobDescription);
  }
}

module.exports = {
  callOllama,
  analyzeResumeWithOllama,
  compareResumeWithJobOllama,
  compareResumeWithJobHeuristically,
  isOpenAIConfigured,
};
