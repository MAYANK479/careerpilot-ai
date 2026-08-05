/**
 * Ollama Service
 * Calls the local Ollama REST API for resume analysis.
 * Uses Qwen3 by default — no API key required.
 */

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen3";

/**
 * Sends a prompt to Ollama and returns the full response text.
 * Uses the /api/generate endpoint with stream: false for simplicity.
 */
async function callOllama(prompt, options = {}) {
  const { timeoutMs = 120000 } = options;

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
 * Returns a structured JSON object matching the analysis schema.
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

  // Extract JSON from the response — handle cases where model wraps in ```json
  let jsonStr = raw.trim();
  const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    jsonStr = fenceMatch[1].trim();
  }
  // Also try to find the first { ... } block
  const braceStart = jsonStr.indexOf("{");
  const braceEnd = jsonStr.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd > braceStart) {
    jsonStr = jsonStr.slice(braceStart, braceEnd + 1);
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    console.error("Ollama returned non-JSON response:", raw.slice(0, 500));
    throw new Error(
      "The AI returned an invalid response. Please try again."
    );
  }

  // Ensure all required fields exist with defaults
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

/**
 * Compares a resume against a job description using Ollama.
 */
async function compareResumeWithJobOllama(resumeText, jobDescription) {
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

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    console.error("Ollama job-match returned non-JSON:", raw.slice(0, 500));
    throw new Error(
      "The AI returned an invalid response. Please try again."
    );
  }

  return {
    matchScore: Number(parsed.matchScore) || 0,
    matchingSkills: Array.isArray(parsed.matchingSkills) ? parsed.matchingSkills : [],
    missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
    keywordCoverage: Number(parsed.keywordCoverage) || 0,
    recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
    shortlistProbability: parsed.shortlistProbability || "Medium",
  };
}

module.exports = {
  analyzeResumeWithOllama,
  compareResumeWithJobOllama,
};
