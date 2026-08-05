const { callOllama } = require("./ollamaService");

/**
 * Generates role-specific interview questions.
 */
async function generateInterviewQuestions(role, difficulty = "Mid-Level", count = 3) {
  const prompt = `/no_think
You are a senior technical interviewer at a top tech company.
Generate ${count} distinct interview questions for a ${difficulty} ${role} candidate.
Include a mix of technical concepts, practical scenarios, and behavioral/problem-solving questions.

Return ONLY valid JSON (no markdown, no code fences) with this structure:
{
  "questions": [
    {
      "id": 1,
      "category": "<Technical | Scenario | Behavioral>",
      "question": "<The question string>"
    }
  ]
}`;

  const raw = await callOllama(prompt);

  let jsonStr = raw.trim();
  const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) jsonStr = fenceMatch[1].trim();
  const braceStart = jsonStr.indexOf("{");
  const braceEnd = jsonStr.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd > braceStart) {
    jsonStr = jsonStr.slice(braceStart, braceEnd + 1);
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed.questions) ? parsed.questions : [];
  } catch {
    // Fallback questions if AI fails
    return [
      {
        id: 1,
        category: "Technical",
        question: `Tell me about your experience with core technologies relevant to a ${role} role.`,
      },
      {
        id: 2,
        category: "Scenario",
        question: "Describe a challenging bug or technical problem you solved recently and your approach to debugging it.",
      },
      {
        id: 3,
        category: "Behavioral",
        question: "How do you handle technical disagreements with team members or tight deadlines?",
      },
    ];
  }
}

/**
 * Evaluates the full interview transcript.
 */
async function evaluateInterview(role, difficulty, qaPairs) {
  const formattedTranscript = qaPairs
    .map(
      (qa, i) =>
        `Q${i + 1} (${qa.category}): ${qa.question}\nAnswer: ${qa.answer || "[No answer provided]"}`
    )
    .join("\n\n");

  const prompt = `/no_think
You are an expert interviewer evaluating a candidate for a ${difficulty} ${role} position.
Evaluate the following interview transcript constructively and objectively.

Return ONLY valid JSON (no markdown, no code fences) with this structure:
{
  "overallScore": <integer 0-100>,
  "communicationRating": "<Needs Work | Good | Excellent>",
  "technicalRating": "<Needs Work | Good | Excellent>",
  "confidenceRating": "<Needs Work | Good | Excellent>",
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "areasForImprovement": ["<area 1>", "<area 2>"],
  "questionFeedback": [
    {
      "question": "<Q1>",
      "score": <0-100>,
      "feedback": "<Feedback on candidate's answer>",
      "idealAnswerKeyPoints": ["<point 1>", "<point 2>"]
    }
  ]
}

TRANSCRIPT:
${formattedTranscript}`;

  const raw = await callOllama(prompt);

  let jsonStr = raw.trim();
  const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) jsonStr = fenceMatch[1].trim();
  const braceStart = jsonStr.indexOf("{");
  const braceEnd = jsonStr.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd > braceStart) {
    jsonStr = jsonStr.slice(braceStart, braceEnd + 1);
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      overallScore: Number(parsed.overallScore) || 70,
      communicationRating: parsed.communicationRating || "Good",
      technicalRating: parsed.technicalRating || "Good",
      confidenceRating: parsed.confidenceRating || "Good",
      summary: parsed.summary || "Good effort on the interview.",
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      areasForImprovement: Array.isArray(parsed.areasForImprovement) ? parsed.areasForImprovement : [],
      questionFeedback: Array.isArray(parsed.questionFeedback) ? parsed.questionFeedback : [],
    };
  } catch {
    throw new Error("Failed to evaluate interview responses. Please try again.");
  }
}

module.exports = {
  generateInterviewQuestions,
  evaluateInterview,
};
