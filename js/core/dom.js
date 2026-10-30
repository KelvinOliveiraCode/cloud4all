// Helpers de DOM. Sem framework, sem innerHTML para conteúdo dinâmico.

const SVG_NS = "http://www.w3.org/2000/svg";

export function h(tag, props, ...children) {
  const el = document.createElement(tag);
  apply(el, props);
  append(el, children);
  return el;
}

export function s(tag, props, ...children) {
  const el = document.createElementNS(SVG_NS, tag);
  apply(el, props, true);
  append(el, children);
  return el;
}

function apply(el, props, isSvg = false) {
  if (!props) return;
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === "class") {
      el.setAttribute("class", value);
    } else if (key === "dataset") {
      for (const [k, v] of Object.entries(value)) el.dataset[k] = v;
    } else if (key === "html") {
      el.innerHTML = value;
    } else if (key === "text") {
      el.textContent = value;
    } else if (key === "style" && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) el.style.setProperty(k, v);
    } else if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "value") {
      el.value = value;
    } else if (key === "checked" || key === "selected" || key === "disabled" || key === "open") {
      if (value) el.setAttribute(key, "");
    } else if (value === true) {
      el.setAttribute(key, "");
    } else {
      el.setAttribute(key, String(value));
      if (isSvg && key === "className") el.setAttribute("class", String(value));
    }
  }
}

export function append(el, children) {
  for (const child of children.flat(4)) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return el;
}

export function frag(...children) {
  return append(document.createDocumentFragment(), children);
}

export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

export function on(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

export function icon(name, size = 18) {
  const paths = ICONS[name];
  if (!paths) return null;
  const svg = s("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.6",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
    focusable: "false",
  });
  for (const d of paths) svg.append(s("path", { d }));
  return svg;
}

const ICONS = {
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  arrowUpRight: ["M7 17L17 7", "M9 7h8v8"],
  check: ["M4 12.5l5 5L20 6.5"],
  close: ["M6 6l12 12", "M18 6L6 18"],
  search: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z", "M20 20l-4-4"],
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  sun: [
    "M12 3v2",
    "M12 19v2",
    "M3 12h2",
    "M19 12h2",
    "M5.6 5.6l1.4 1.4",
    "M17 17l1.4 1.4",
    "M5.6 18.4L7 17",
    "M17 7l1.4-1.4",
    "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z",
  ],
  moon: ["M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"],
  home: ["M4 10.5L12 4l8 6.5", "M6 9.5V20h12V9.5"],
  book: ["M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z", "M4 20.5A2.5 2.5 0 0 1 6.5 18H20"],
  grid: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M4 14h6v6H4z", "M14 14h6v6h-6z"],
  letter: ["M4 6h16", "M4 12h10", "M4 18h13"],
  spark: ["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z", "M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z"],
  copy: ["M9 9h11v11H9z", "M15 5H5v10"],
  plus: ["M12 5v14", "M5 12h14"],
  trash: ["M4 7h16", "M9 7V4h6v3", "M6 7l1 13h10l1-13", "M10 11v6", "M14 11v6"],
  filter: ["M4 6h16", "M7 12h10", "M10 18h4"],
  compare: ["M4 7h7v7H4z", "M13 10h7v7h-7z", "M11 10h2", "M11 13h2"],
  external: ["M14 4h6v6", "M20 4L10 14", "M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"],
  chevronLeft: ["M15 5l-7 7 7 7"],
  chevronRight: ["M9 5l7 7-7 7"],
  info: ["M12 11v6", "M12 7.5v.5", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"],
  shield: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6Z", "M9 12l2 2 4-4"],
  globe: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "M3.5 9h17", "M3.5 15h17", "M12 3c3 3.5 3 14.5 0 18", "M12 3c-3 3.5-3 14.5 0 18"],
  wallet: ["M4 7h16v12H4z", "M4 7l12-3v3", "M16 13h2"],
  layers: ["M12 3l9 5-9 5-9-5Z", "M3 13l9 5 9-5", "M3 17l9 5 9-5"],
  compass: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "M15.5 8.5l-2 5-5 2 2-5Z"],
  refresh: ["M4 11a8 8 0 0 1 14-5l2 2", "M20 4v4h-4", "M20 13a8 8 0 0 1-14 5l-2-2", "M4 20v-4h4"],
  mail: ["M3 6h18v12H3z", "M3 7l9 6 9-6"],
};

export function formatNumber(n) {
  return new Intl.NumberFormat("pt-BR").format(n);
}
