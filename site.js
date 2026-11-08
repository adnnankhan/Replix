// The top bar names the section you're reading, and blocks fade in as they
// scroll into view (the CSS only hides them when motion is allowed).
(function () {
  "use strict";
  // A link to a section (#screen-3): sections below the fold are laid out lazily
  // (content-visibility), so land again once the page has its real heights.
  window.addEventListener("load", function () {
    var target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    var land = function () { target.scrollIntoView({ block: "start", behavior: "instant" }); };
    requestAnimationFrame(land);
    setTimeout(land, 350); // again, once images above it have their sizes
  });
  // Set up once the page has settled, so it never competes with the first paint.
  var later = window.requestIdleCallback || function (fn) { setTimeout(fn, 200); };
  later(function () {

  var progress = document.querySelector("[data-progress]");
  var current = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) progress.textContent = e.target.getAttribute("data-name");
      });
    },
    { rootMargin: "-50% 0px -50% 0px" },
  );
  document.querySelectorAll("main > section[data-name]").forEach(function (s) {
    current.observe(s);
  });

  var reveal = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        reveal.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  document.querySelectorAll(".reveal, .stagger").forEach(function (el) {
    reveal.observe(el);
  });
  }, { timeout: 2000 });
})();
