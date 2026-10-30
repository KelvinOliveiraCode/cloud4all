// Revelação suave ao entrar na tela. Sem esconder conteúdo de leitores de tela.

export function observeReveals(root = document) {
  const items = root.querySelectorAll("[data-reveal], .reveal-group");
  if (!items.length) return () => {};

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-revealed"));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  items.forEach((item) => observer.observe(item));
  return () => observer.disconnect();
}
