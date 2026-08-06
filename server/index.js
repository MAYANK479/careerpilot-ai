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

app.use(cors({
  origin: true, // Allow all origins (Vercel, localhost, etc.)
  credentials: true,
}));
app.use(express.json({ limit: "5mb" }));

// API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/job-match", jobMatchRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/cover-letter", coverLetterRoutes);
app.use("/api/auth", authRoutes);
console.log("✅ API routes mounted");

// Serve static files from the React build (client) in production
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Fallback to index.html for client-side React routing with no-cache headers (Express 5 compatible)
app.use((req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
