const { spawn } = require("child_process");
const path = require("path");

const projectRoot = __dirname;
const processes = [
  spawn("node", ["index.js"], {
    cwd: path.join(projectRoot, "server"),
    stdio: "inherit",
    shell: true,
  }),
  spawn("npm", ["run", "dev"], {
    cwd: path.join(projectRoot, "client"),
    stdio: "inherit",
    shell: true,
  }),
];

const stop = () => processes.forEach((child) => {
  try {
    child.kill();
  } catch (e) {
    // Process might already be dead
  }
});

process.on("SIGINT", () => {
  stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stop();
  process.exit(0);
});
