const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
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

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/job-match", jobMatchRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/cover-letter", coverLetterRoutes);
app.use("/api/auth", authRoutes);
console.log("✅ API routes mounted");

// Serve static files from the React build (client) in production
const publicPath = path.join(__dirname, "public");
const indexPath = path.join(publicPath, "index.html");

if (fs.existsSync(indexPath)) {
  app.use(express.static(publicPath));
  // Fallback to index.html for client-side React routing with no-cache headers
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      return res.sendFile(indexPath);
    }
    next();
  });
}

// 404 handler for API routes
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: `API endpoint not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error("❌ Global Server Error:", err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
