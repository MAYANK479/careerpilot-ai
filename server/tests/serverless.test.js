const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const app = require("../index.js");

test("Serverless Express App Export Test", () => {
  assert.strictEqual(typeof app, "function", "Express app should be exported as a function handler");
});

test("Health check endpoint responds with healthy status", async () => {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;

  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, "healthy");
  } finally {
    server.close();
  }
});

