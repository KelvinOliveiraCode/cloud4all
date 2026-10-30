const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk("js").filter((f) => f.endsWith(".js"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "c4a-check-"));
let fail = 0;
for (const file of files) {
  const copy = path.join(tmp, path.basename(file, ".js") + "-" + Math.random().toString(36).slice(2) + ".mjs");
  fs.copyFileSync(file, copy);
  try {
    execFileSync(process.execPath, ["--check", copy], { stdio: "pipe" });
  } catch (error) {
    fail++;
    console.log("FAIL", file);
    console.log(String(error.stderr || error.message).split("\n").slice(0, 6).join("\n"));
  }
}
console.log(`checked ${files.length} modules, ${fail} failures`);

for (const file of walk("data").filter((f) => f.endsWith(".json"))) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
    console.log("json ok", file);
  } catch (error) {
    console.log("json FAIL", file, error.message);
  }
}
