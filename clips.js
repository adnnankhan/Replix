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
  var PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" fill="currentColor"/></svg>';

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

  // Pause / play: the viewer can stop any clip; it then stays paused until played again.
  function addToggle(fig) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "clip-toggle";
    var show = function () {
      var paused = fig.classList.contains("user-paused");
      btn.innerHTML = paused ? PLAY : PAUSE;
      btn.setAttribute("aria-label", paused ? "Play clip" : "Pause clip");
    };
    btn.addEventListener("click", function () {
      fig.classList.toggle("user-paused");
      show();
      apply();
    });
    show();
    fig.querySelector(".frame").appendChild(btn);
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
      if (visible.has(fig) && !document.hidden && !fig.classList.contains("user-paused")) v.play().catch(function () {});
      else v.pause();
    });
  }

  // The 720px poster where the clip is shown that small (phones), else the full one.
  function setPoster(v, width) {
    var src = v.dataset.poster;
    if (!src || v.poster) return;
    var small = width * (window.devicePixelRatio || 1) <= 720;
    v.poster = small ? src.replace(".webp", "-720.webp") : src;
  }

  // Posters load when a clip comes near the screen, so the eight stills don't
  // compete with the top of the page. No JavaScript: the clips stay blank.
  var near = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        // The observer already measured the figure: no extra layout read.
        setPoster(e.target.querySelector("video"), e.boundingClientRect.width);
        near.unobserve(e.target);
      });
    },
    { rootMargin: "1200px 0px" },
  );
  figures.forEach(function (fig) {
    near.observe(fig);
  });

  var byFrame = new Map();
  figures.forEach(function (fig) {
    addMarkers(fig);
    addPlayButton(fig);
    addToggle(fig);
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
