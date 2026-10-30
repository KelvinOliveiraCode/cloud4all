const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const js = walk("js").filter((f) => f.endsWith(".js"));
const used = new Set();
for (const file of js) {
  const src = fs.readFileSync(file, "utf8");
  for (const match of src.matchAll(/class:\s*"([^"]+)"/g)) {
    match[1].split(/\s+/).forEach((c) => c && used.add(c));
  }
  for (const match of src.matchAll(/classList\.(?:add|remove|toggle)\("([^"]+)"\)/g)) {
    match[1].split(/\s+/).forEach((c) => c && used.add(c));
  }
}

const css = walk("css")
  .filter((f) => f.endsWith(".css"))
  .map((f) => fs.readFileSync(f, "utf8"))
  .join("\n");
const defined = new Set([...css.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map((m) => m[1]));
const missing = [...used].filter((c) => !defined.has(c)).sort();
console.log("used:", used.size, "missing:", missing.length);
console.log(missing.join("\n"));
