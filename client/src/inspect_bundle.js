const fs = require("fs");
const text = fs.readFileSync("./client/src/site_bundle.js", "utf8");

// Search for tab names, navigation labels, and UI titles
const regex = /["']([A-Z][a-zA-Z0-9\s\-\.\?\/,]{3,60})["']/g;
let m;
const headings = new Set();
while ((m = regex.exec(text)) !== null) {
  const str = m[1].trim();
  if (
    str.includes("Career") ||
    str.includes("Resume") ||
    str.includes("Plan") ||
    str.includes("Interview") ||
    str.includes("Project") ||
    str.includes("Job") ||
    str.includes("Skill") ||
    str.includes("Score") ||
    str.includes("AI") ||
    str.includes("Dashboard") ||
    str.includes("Builder") ||
    str.includes("Generator") ||
    str.includes("Analyzer")
  ) {
    headings.add(str);
  }
}

console.log("=== FOUND KEY UI STRINGS ===");
console.log(Array.from(headings).slice(0, 100).join("\n"));
