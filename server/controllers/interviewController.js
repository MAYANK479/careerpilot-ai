const {
  generateInterviewQuestions,
  evaluateInterview,
} = require("../services/interviewService");

exports.getQuestions = async (req, res, next) => {
  const { role = "Full-Stack Developer", difficulty = "Mid-Level", count = 3 } = req.body;

  try {
    const questions = await generateInterviewQuestions(
      role,
      difficulty,
      Math.min(Math.max(Number(count) || 3, 1), 5)
    );

    return res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    return next(error);
  }
};

exports.submitEvaluation = async (req, res, next) => {
  const { role = "Software Engineer", difficulty = "Mid-Level", qaPairs } = req.body;

  if (!Array.isArray(qaPairs) || qaPairs.length === 0) {
    return res.status(400).json({
      success: false,
      message: "QA pairs are required for evaluation.",
    });
  }

  try {
    const evaluation = await evaluateInterview(role, difficulty, qaPairs);

    return res.status(200).json({
      success: true,
      evaluation,
    });
  } catch (error) {
    return next(error);
  }
};
