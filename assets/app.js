/* =========================================================================
   Seth M. Woodbury — site interactions
   - Animated "molecular network" hero canvas (theme-aware colors)
   - Profile photo fallback, mobile nav, scroll reveal, footer year
   ========================================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function palette() {
    var cs = getComputedStyle(document.documentElement);
    var out = [];
    for (var i = 1; i <= 6; i++) {
      var v = cs.getPropertyValue("--a" + i).trim();
      if (v) out.push(v);
    }
    return out.length ? out : ["#6ee7b7", "#34d399", "#2dd4bf", "#22d3ee", "#7dd3fc", "#a78bfa"];
  }

  var canvas = document.getElementById("molecular-canvas");
  if (canvas && !reduce) {
    var ctx = canvas.getContext("2d");
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W, H, nodes = [], mouse = { x: -9999, y: -9999 }, COLORS = palette();

    function size() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      COLORS = palette();
      build();
    }
    function build() {
      var count = Math.max(26, Math.min(64, Math.round((W * H) / 24000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 2.1 + 1.3, c: COLORS[(Math.random() * COLORS.length) | 0]
        });
      }
    }
    function step() {
      ctx.clearRect(0, 0, W, H);
      var LINK = 150, i, a, b;
      for (i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        var dxm = mouse.x - n.x, dym = mouse.y - n.y, dm = Math.hypot(dxm, dym);
        if (dm < 180) { n.x += dxm * 0.0016; n.y += dym * 0.0016; }
      }
      for (a = 0; a < nodes.length; a++) {
        for (b = a + 1; b < nodes.length; b++) {
          var na = nodes[a], nb = nodes[b], dx = na.x - nb.x, dy = na.y - nb.y, d = Math.hypot(dx, dy);
          if (d < LINK) {
            var o = (1 - d / LINK), grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
            grad.addColorStop(0, na.c); grad.addColorStop(1, nb.c);
            ctx.strokeStyle = grad; ctx.globalAlpha = o * 0.34; ctx.lineWidth = o * 1.25;
            ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      for (var k = 0; k < nodes.length; k++) {
        var p = nodes[k], near = Math.hypot(mouse.x - p.x, mouse.y - p.y) < 150;
        ctx.beginPath(); ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = near ? 18 : 8;
        ctx.arc(p.x, p.y, near ? p.r * 1.5 : p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;
      requestAnimationFrame(step);
    }
    window.addEventListener("resize", size);
    window.addEventListener("mousemove", function (e) {
      var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    window.addEventListener("mouseleave", function () { mouse.x = mouse.y = -9999; });
    // let the playground force a repaint after a live theme change
    window.addEventListener("sw-theme-change", size);
    size(); requestAnimationFrame(step);
  }

  var pic = document.getElementById("profile-photo");
  if (pic) {
    var showFallback = function () {
      var fb = document.getElementById("profile-fallback");
      if (fb) { pic.style.display = "none"; fb.style.display = "grid"; }
    };
    pic.addEventListener("error", showFallback);
    if (pic.complete && pic.naturalWidth === 0) showFallback();
  }

  var toggle = document.getElementById("nav-toggle"), links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { links.classList.remove("open"); }); });
  }

  var io;
  if ("IntersectionObserver" in window && !reduce) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
