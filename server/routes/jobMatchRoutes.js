const express = require("express");
const router = express.Router();

const { compareJob } = require("../controllers/jobMatchController");

router.post("/", compareJob);

module.exports = router;
