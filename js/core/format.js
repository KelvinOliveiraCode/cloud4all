// Formatação e utilidades de texto. Tudo em pt-BR.

export function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function brl(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function priceLabel(service) {
  if (!service) return "sem preço";
  const { min, max } = service;
  if (min === 0 && max === 0) return "R$ 0";
  if (min === 0) return `R$ 0 a ${brl(max)}`;
  if (min === max) return brl(min);
  return `${brl(min)} a ${brl(max)}`;
}

export function priceShort(service) {
  if (!service) return "";
  if (service.gratis === "sempre" && service.min === 0) return "grátis";
  if (service.min === 0) return `até ${brl(service.max)}`;
  return `a partir de ${brl(service.min)}`;
}

export function plural(n, singular, pluralForm) {
  return n === 1 ? singular : pluralForm;
}

export function countLabel(n, singular, pluralForm) {
  return `${n} ${plural(n, singular, pluralForm)}`;
}

export function debounce(fn, wait = 160) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

export function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function priceBand(service) {
  if (service.gratis === "sempre" && service.min === 0) return "zero";
  if (service.min === 0) return "zero";
  if (service.min <= 50) return "baixo";
  if (service.min <= 200) return "medio";
  return "alto";
}

export function complexityLabel(level) {
  return {
    1: "guiado",
    2: "simples",
    3: "moderado",
    4: "técnico",
    5: "avançado",
  }[level] ?? "moderado";
}

export function gratuityLabel(service) {
  if (service.gratis === "sempre") return "grátis para sempre";
  if (service.gratis === "temporario") return "grátis no começo";
  return "pago";
}

export function gratuityClass(service) {
  if (service.gratis === "sempre") return "badge badge--free";
  if (service.gratis === "temporario") return "badge badge--trial";
  return "badge badge--paid";
}

export function areaName(catalog, key) {
  return catalog?.areas?.[key] ?? key;
}

export function sortByName(a, b) {
  return a.nome.localeCompare(b.nome, "pt-BR");
}

export function unique(values) {
  return Array.from(new Set(values));
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
