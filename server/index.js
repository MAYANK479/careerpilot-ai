const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 AI Resume Analyzer Backend Running Successfully!"
  });
});

const requestedPort = Number(process.env.PORT) || 5000;
const portsToTry = [requestedPort, 5001, 5002];

function startServer(portIndex = 0) {
  const port = portsToTry[portIndex];

  app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
  }).on("error", (error) => {
    if (error.code === "EADDRINUSE" && portIndex < portsToTry.length - 1) {
      console.warn(`Port ${port} is busy. Trying ${portsToTry[portIndex + 1]}...`);
      startServer(portIndex + 1);
    } else {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  });
}

startServer();