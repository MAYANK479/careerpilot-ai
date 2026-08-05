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
  // Only require OpenAI when actually needed
  const OpenAI = require("openai");

  if (!process.env.OPENAI_API_KEY) return null;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    instructions:
      "You are an experienced ATS recruiter. Analyze the resume factually and constructively. Do not invent experience, qualifications, or achievements. Return only the requested JSON.",
    input: `Analyze this resume:\n\n${resumeText.slice(0, 30000)}`,
    text: {
      format: {
        type: "json_schema",
        name: "resume_analysis",
        strict: true,
        schema: analysisSchema,
      },
    },
  });

  if (!response.output_text) {
    throw new Error("The AI service returned no analysis.");
  }

  return JSON.parse(response.output_text);
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
