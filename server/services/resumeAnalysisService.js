/**
 * Resume Analysis Service — Provider-Agnostic Wrapper
 *
 * Routes analysis to Ollama (default) or OpenAI based on AI_PROVIDER env var.
 * Both providers return the same schema for consistent frontend consumption.
 */

const { analyzeResumeWithOllama } = require("./ollamaService");

const AI_PROVIDER = (process.env.AI_PROVIDER || "ollama").toLowerCase();

// OpenAI analysis schema (kept for OpenAI provider path)
const analysisSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    atsScore: { type: "integer", minimum: 0, maximum: 100 },
    resumeRating: { type: "string", enum: ["Needs work", "Fair", "Good", "Excellent"] },
    professionalSummary: { type: "string" },
    strengths: { type: "array", items: { type: "string" } },
    weaknesses: { type: "array", items: { type: "string" } },
    missingSkills: { type: "array", items: { type: "string" } },
    grammarIssues: { type: "array", items: { type: "string" } },
    formattingSuggestions: { type: "array", items: { type: "string" } },
    keywordSuggestions: { type: "array", items: { type: "string" } },
    recommendedImprovements: { type: "array", items: { type: "string" } },
  },
  required: [
    "atsScore",
    "resumeRating",
    "professionalSummary",
    "strengths",
    "weaknesses",
    "missingSkills",
    "grammarIssues",
    "formattingSuggestions",
    "keywordSuggestions",
    "recommendedImprovements",
  ],
};

async function analyzeResumeWithOpenAI(resumeText) {
  const OpenAI = require("openai");

  if (!process.env.OPENAI_API_KEY) return null;

  const clientOpts = { apiKey: process.env.OPENAI_API_KEY };
  if (process.env.OPENAI_BASE_URL) {
    clientOpts.baseURL = process.env.OPENAI_BASE_URL;
  }
  const client = new OpenAI(clientOpts);

  const prompt = `You are an experienced ATS recruiter. Analyze the following resume factually and constructively. Do not invent experience or qualifications.

Return ONLY valid JSON with this exact structure:
${JSON.stringify(analysisSchema, null, 2)}

RESUME:
${resumeText.slice(0, 30000)}`;

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an ATS recruiter analyzer. Return strictly valid JSON." },
      { role: "user", content: prompt }
    ],
    temperature: 0.3,
  });

  const content = completion.choices[0]?.message?.content || "";
  let jsonStr = content.trim();
  const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) jsonStr = fenceMatch[1].trim();
  const braceStart = jsonStr.indexOf("{");
  const braceEnd = jsonStr.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd > braceStart) {
    jsonStr = jsonStr.slice(braceStart, braceEnd + 1);
  }

  return JSON.parse(jsonStr);
}

/**
 * Main entry point — routes to the configured provider.
 */
async function analyzeResume(resumeText) {
  console.log(`[AI] Using provider: ${AI_PROVIDER}`);

  if (AI_PROVIDER === "openai") {
    return analyzeResumeWithOpenAI(resumeText);
  }

  // Default: Ollama
  return analyzeResumeWithOllama(resumeText);
}

module.exports = { analyzeResume };
