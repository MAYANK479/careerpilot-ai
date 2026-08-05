const express = require("express");
const router = express.Router();

const { createCoverLetter } = require("../controllers/coverLetterController");

router.post("/", createCoverLetter);

module.exports = router;
