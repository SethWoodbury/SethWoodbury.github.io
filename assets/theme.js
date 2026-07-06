/* =========================================================================
   THEME CONTROLLER  ·  Seth M. Woodbury
   - Registry metadata (name + short description) for every theme in themes.css
   - Applies a saved theme, exposes helpers used by playground.html
   Note: a tiny inline snippet in each page's <head> applies the saved theme
   BEFORE paint to avoid a flash. This file powers switching + the playground.
   ========================================================================= */
window.SW_THEMES = [
  { id: "iridescent-jade", name: "Iridescent Jade", note: "Biotech green with a full iridescent shimmer. The default.", swatch: ["#6ee7b7", "#2dd4bf", "#22d3ee", "#a78bfa"] },
  { id: "abyssal-violet",  name: "Abyssal Violet",  note: "Deep indigo with violet, cyan, and magenta light.",        swatch: ["#c4b5fd", "#a78bfa", "#22d3ee", "#f472b6"] },
  { id: "arctic-cyan",     name: "Arctic Cyan",     note: "Cool teal and ice blue, crisp and clinical.",              swatch: ["#a5f3fc", "#22d3ee", "#38bdf8", "#5eead4"] },
  { id: "solar-flare",     name: "Solar Flare",     note: "Warm gold and amber with an emerald counterpoint.",        swatch: ["#fde68a", "#fbbf24", "#fb923c", "#34d399"] },
  { id: "graphite-mono",   name: "Graphite Mono",   note: "Near-monochrome graphite with a single mint accent.",      swatch: ["#6ee7b7", "#9ca3af", "#d1d5db", "#5eead4"] },
  { id: "husky-uw",        name: "Husky (UW)",      note: "University of Washington purple and gold.",                swatch: ["#b7a5e6", "#8b6dd6", "#e8c34a", "#ffd54a"] },
  { id: "maize-blue",      name: "Maize & Blue (Michigan)", note: "University of Michigan maize and blue.",           swatch: ["#ffcb05", "#ffe27a", "#3f7bd6", "#8fb3ff"] },
  { id: "rose-quartz",     name: "Rose Quartz",     note: "Plum base with rose, fuchsia, and violet.",                swatch: ["#fbcfe8", "#f472b6", "#e879f9", "#a78bfa"] }
];

window.SW_applyTheme = function (id, persist) {
  document.documentElement.setAttribute("data-theme", id);
  if (persist) { try { localStorage.setItem("sw-theme", id); } catch (e) {} }
  window.dispatchEvent(new CustomEvent("sw-theme-change", { detail: { id: id } }));
};

window.SW_currentTheme = function () {
  return document.documentElement.getAttribute("data-theme") || "iridescent-jade";
};

/* Apply any custom variable overrides saved from the playground (all pages). */
(function () {
  try {
    var v = JSON.parse(localStorage.getItem("sw-vars") || "null");
    if (v) { for (var k in v) { document.documentElement.style.setProperty(k, v[k]); } }
  } catch (e) {}
})();
