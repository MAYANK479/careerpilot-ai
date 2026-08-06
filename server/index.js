const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

console.log("✅ index.js started");

const uploadRoutes = require("./routes/uploadRoutes");
const jobMatchRoutes = require("./routes/jobMatchRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const coverLetterRoutes = require("./routes/coverLetterRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Serve static files from the React build (client) in production
app.use(express.static(path.join(__dirname, 'public')));
// Fallback to index.html for client-side routing
app.get('/*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.use(cors());
app.use(express.json({ limit: "5mb" }));

// API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/job-match", jobMatchRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/cover-letter", coverLetterRoutes);
app.use('/api/auth', authRoutes);
console.log('✅ auth routes mounted');


app.use((error, req, res, next) => {
  console.error("Request failed:", error);
  const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 500;
  res.status(status).json({
    success: false,
    message:
      error.code === "LIMIT_FILE_SIZE"
        ? "PDF files must be 10 MB or smaller."
        : error.message || "The request could not be processed.",
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
