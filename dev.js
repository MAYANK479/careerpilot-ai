const { spawn } = require("child_process");
const path = require("path");

const projectRoot = __dirname;
const processes = [
  spawn("node", ["index.js"], {
    cwd: path.join(projectRoot, "server"),
    stdio: "inherit",
  }),
  spawn("npm", ["run", "dev"], {
    cwd: path.join(projectRoot, "client"),
    stdio: "inherit",
    shell: process.platform === "win32",
  }),
];

const stop = () => processes.forEach((child) => child.kill());
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
