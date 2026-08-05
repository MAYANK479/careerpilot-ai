const { callOllama } = require("./ollamaService");

async function generateCoverLetter(resumeText, jobDescription, companyName = "the company") {
  const prompt = `/no_think
You are an expert career consultant and professional resume writer.
Write a compelling, professional cover letter tailored for a position at ${companyName}.
Base the letter strictly on the candidate's actual qualifications in the resume and match them to the job description requirements.

Do NOT include placeholder variables like [Your Name] or [Date] if candidate name is available. Format cleanly with clear paragraph breaks.

RESUME:
${resumeText.slice(0, 15000)}

JOB DESCRIPTION:
${jobDescription.slice(0, 10000)}`;

  const letter = await callOllama(prompt);
  return letter.trim();
}

module.exports = { generateCoverLetter };
