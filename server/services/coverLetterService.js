const { callOllama } = require("./ollamaService");

function generateFallbackCoverLetter(resumeText, jobDescription, companyName = "the company") {
  const commonTech = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL",
    "PostgreSQL", "AWS", "Docker", "Git", "REST APIs", "Microservices"
  ];

  const resumeLower = (resumeText || "").toLowerCase();
  const detected = commonTech.filter(tech => resumeLower.includes(tech.toLowerCase()));
  const skillSummary = detected.length > 0 ? detected.slice(0, 5).join(", ") : "software engineering and modern technology frameworks";

  return `Dear Hiring Team at ${companyName},

I am writing to enthusiastically express my interest in joining ${companyName}. With a strong background in ${skillSummary} and hands-on experience developing scalable digital solutions, I am eager to contribute to your engineering goals.

Throughout my career, I have focused on writing clean, maintainable code, architecting performant services, and collaborating cross-functionally to deliver measurable user impact. My background aligns well with the challenges outlined in your position, particularly in solving complex engineering problems and delivering high-quality software on schedule.

What excites me most about ${companyName} is your dedication to building high-impact products. I am confident that my technical proficiency in ${detected[0] || "modern software development"} and passion for continuous improvement will allow me to make immediate contributions to your team.

Thank you for your time and consideration. I welcome the opportunity to discuss how my skill set and experience can support ${companyName}'s continued growth.

Sincerely,
Applicant`;
}

async function generateCoverLetter(resumeText, jobDescription, companyName = "the company") {
  try {
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
    if (letter && letter.trim().length > 50) {
      return letter.trim();
    }
  } catch (err) {
    console.warn("[AI] Cover letter AI generation failed, using fallback:", err.message);
  }

  return generateFallbackCoverLetter(resumeText, jobDescription, companyName);
}

module.exports = { generateCoverLetter, generateFallbackCoverLetter };
