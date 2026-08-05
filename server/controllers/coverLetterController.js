const { generateCoverLetter } = require("../services/coverLetterService");

exports.createCoverLetter = async (req, res, next) => {
  const { resumeText, jobDescription, companyName } = req.body;

  if (!resumeText || typeof resumeText !== "string" || !resumeText.trim()) {
    return res.status(400).json({
      success: false,
      message: "Resume text is required.",
    });
  }

  if (
    !jobDescription ||
    typeof jobDescription !== "string" ||
    !jobDescription.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Job description is required.",
    });
  }

  try {
    const coverLetter = await generateCoverLetter(
      resumeText.trim(),
      jobDescription.trim(),
      companyName ? companyName.trim() : "the company"
    );

    return res.status(200).json({
      success: true,
      coverLetter,
    });
  } catch (error) {
    return next(error);
  }
};
