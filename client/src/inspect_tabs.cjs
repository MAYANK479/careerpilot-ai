const fs = require("fs");
const text = fs.readFileSync("./client/src/site_bundle.js", "utf8");

// Search for tab definitions in the bundle
const matches = text.match(/[\w$]+\s*=\s*\[\s*\{[^}]*id:[^}]*\}[\s\S]*?\]/g) || [];
console.log("Tab definitions found:", matches.length);
matches.forEach((m, i) => {
  console.log(`--- MATCH ${i} ---`);
  console.log(m.slice(0, 300));
});
