// The recorded clips: play only while on screen (and the tab is visible),
// pause otherwise. With reduced motion, show the poster and a play button.
// Numbered markers sit on the elements named under each clip, at the
// positions read while recording (media/markers.js), shown on the poster
// and around that moment of the loop.
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var data = window.REPLIX_MARKERS || {};
  var figures = [].slice.call(document.querySelectorAll("figure.clip"));
  var visible = new Set();
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="currentColor"/></svg>';

  function addMarkers(fig) {
    var entry = data[fig.getAttribute("data-clip")];
    if (!entry || !entry.markers.length) return;
    var layer = document.createElement("div");
    layer.className = "co-layer";
    layer.setAttribute("aria-hidden", "true");
    entry.markers.forEach(function (m) {
      if (!m.box) return; // the named element isn't in the app: no marker
      var d = document.createElement("span");
      d.className = "co-marker";
      d.textContent = String(m.n);
      d.setAttribute("data-n", String(m.n));
      var b = m.box;
      if (b.h < 0.06 && b.x > 0.03) {
        // A small element (a button, a line): just left of it, centred on it.
        d.style.left = "calc(" + b.x * 100 + "% - 14px)";
        d.style.top = (b.y + b.h / 2) * 100 + "%";
      } else {
        // A region: on its top-left corner, kept inside the frame.
        d.style.left = Math.min(0.975, Math.max(0.018, b.x)) * 100 + "%";
        d.style.top = Math.min(0.97, Math.max(0.03, b.y)) * 100 + "%";
      }
      layer.appendChild(d);
    });
    fig.querySelector(".frame").appendChild(layer);
    // The positions belong to the poster moment, so the markers show on the
    // poster and for a moment around that point in each loop.
    var v = fig.querySelector("video");
    var at = entry.posterAt;
    var sync = function () {
      var t = v.currentTime;
      layer.classList.toggle("on", (v.paused && t === 0) || (t >= at - 0.4 && t <= at + 1.6));
    };
    var loop = function () {
      sync();
      if (!v.paused) requestAnimationFrame(loop);
    };
    v.addEventListener("play", loop);
    v.addEventListener("seeked", sync);
    v.addEventListener("pause", sync);
    sync();
  }

  function addPlayButton(fig) {
    var video = fig.querySelector("video");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "play";
    btn.setAttribute("aria-label", "Play");
    btn.innerHTML = PLAY;
    fig.querySelector(".frame").appendChild(btn);
    btn.addEventListener("click", function () {
      fig.classList.add("playing");
      video.controls = true;
      video.play().catch(function () {});
    });
  }

  function apply() {
    figures.forEach(function (fig) {
      var v = fig.querySelector("video");
      if (reduced.matches) {
        // A still: the poster, until the viewer presses play.
        v.autoplay = false;
        v.removeAttribute("autoplay");
        fig.classList.add("still-mode");
        if (!fig.classList.contains("playing")) v.pause();
        return;
      }
      fig.classList.remove("still-mode", "playing");
      v.controls = false;
      if (visible.has(fig) && !document.hidden) v.play().catch(function () {});
      else v.pause();
    });
  }

  var byFrame = new Map();
  figures.forEach(function (fig) {
    addMarkers(fig);
    addPlayButton(fig);
    byFrame.set(fig.querySelector(".frame"), fig);
  });
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        var fig = byFrame.get(e.target);
        if (e.isIntersecting && e.intersectionRatio >= 0.2) visible.add(fig);
        else visible.delete(fig);
      });
      apply();
    },
    { threshold: [0, 0.2, 0.5] },
  );
  byFrame.forEach(function (_, frame) {
    io.observe(frame);
  });
  document.addEventListener("visibilitychange", apply);
  if (reduced.addEventListener) reduced.addEventListener("change", apply);
  apply();
})();
