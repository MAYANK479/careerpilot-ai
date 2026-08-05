const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log("✅ index.js started");

const uploadRoutes = require("./routes/uploadRoutes");
const jobMatchRoutes = require("./routes/jobMatchRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use("/api/upload", uploadRoutes);
app.use("/api/job-match", jobMatchRoutes);

app.use((error, req, res, next) => {
  console.error("Request failed:", error);
  const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 500;
  res.status(status).json({
    success: false,
    message:
      error.code === "LIMIT_FILE_SIZE"
        ? "PDF files must be 10 MB or smaller."
        : error.message || "The resume could not be processed.",
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
