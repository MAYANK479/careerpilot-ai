const express = require("express");
const router = express.Router();

const {
  getQuestions,
  submitEvaluation,
} = require("../controllers/interviewController");

router.post("/questions", getQuestions);
router.post("/evaluate", submitEvaluation);

module.exports = router;
