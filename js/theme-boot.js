// Aplica o tema antes da primeira pintura para evitar piscada clara.
// Roda como script clássico, antes dos módulos.
(function () {
  var theme = null;
  try {
    var raw = window.localStorage.getItem("c4a3:theme");
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed === "light" || parsed === "dark") theme = parsed;
    }
  } catch (error) {
    theme = null;
  }

  if (!theme) {
    try {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (error) {
      theme = "light";
    }
  }

  document.documentElement.dataset.theme = theme;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0f110e" : "#f3f0e9");
})();
