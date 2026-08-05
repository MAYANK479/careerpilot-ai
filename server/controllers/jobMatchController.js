const { compareResumeWithJobOllama } = require("../services/ollamaService");

exports.compareJob = async (req, res, next) => {
  const { resumeText, jobDescription } = req.body;

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
    const comparison = await compareResumeWithJobOllama(
      resumeText.trim(),
      jobDescription.trim()
    );

    return res.status(200).json({
      success: true,
      message: "Job comparison completed successfully!",
      comparison,
    });
  } catch (error) {
    return next(error);
  }
};
