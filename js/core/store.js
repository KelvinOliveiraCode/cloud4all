// Estado local: tema, progresso, comparação e semente de prompt.
// Nada sai do navegador. Falha de armazenamento não quebra a página.

const PREFIX = "c4a3:";
const memory = new Map();

function safeGet(key) {
  try {
    return window.localStorage.getItem(PREFIX + key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    memory.set(key, value);
  }
}

function safeRemove(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    memory.delete(key);
  }
}

export const store = {
  get(key, fallback = null) {
    const raw = safeGet(key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    safeSet(key, JSON.stringify(value));
  },
  remove(key) {
    safeRemove(key);
  },
};

export function getTheme() {
  const saved = store.get("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0f110e" : "#f3f0e9");
  window.dispatchEvent(new CustomEvent("c4a:theme", { detail: theme }));
}

export function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  store.set("theme", next);
  applyTheme(next);
  return next;
}

export function getProgress() {
  const value = store.get("progress", []);
  return Array.isArray(value) ? value.filter((id) => typeof id === "string") : [];
}

export function isDone(moduleId) {
  return getProgress().includes(moduleId);
}

export function toggleDone(moduleId) {
  const current = getProgress();
  const next = current.includes(moduleId)
    ? current.filter((id) => id !== moduleId)
    : [...current, moduleId];
  store.set("progress", next);
  return next;
}

export function getCompare() {
  const value = store.get("compare", []);
  return Array.isArray(value) ? value.slice(0, 3) : [];
}

export function setCompare(ids) {
  const clean = Array.from(new Set(ids)).slice(0, 3);
  store.set("compare", clean);
  return clean;
}

export function toggleCompare(id) {
  const current = getCompare();
  return setCompare(
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  );
}

export function seedPrompt(payload) {
  try {
    window.sessionStorage.setItem(PREFIX + "seed", JSON.stringify(payload));
  } catch {
    memory.set("seed", JSON.stringify(payload));
  }
}

export function takeSeed() {
  let raw = null;
  try {
    raw = window.sessionStorage.getItem(PREFIX + "seed");
    if (raw) window.sessionStorage.removeItem(PREFIX + "seed");
  } catch {
    raw = memory.get("seed") ?? null;
    memory.delete("seed");
  }
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAll() {
  for (const key of ["theme", "progress", "compare"]) store.remove(key);
}
