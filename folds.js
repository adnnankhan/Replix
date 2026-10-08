// Section 03's collapsible rows. Closed on load; a button toggles each one
// (Enter and Space work, aria-expanded follows), the "+" turns into "−", and
// closed bodies are inert. A URL hash (#explored, #design-system,
// #how-i-worked, #decisions) opens its row.
(function () {
  "use strict";

  var folds = [].slice.call(document.querySelectorAll(".fold"));

  function set(fold, open) {
    fold.classList.toggle("open", open);
    fold.querySelector(".fold-btn").setAttribute("aria-expanded", String(open));
    fold.querySelector(".fold-body").inert = !open;
  }

  folds.forEach(function (fold) {
    set(fold, false);
    fold.querySelector(".fold-btn").addEventListener("click", function () {
      set(fold, !fold.classList.contains("open"));
    });
  });

  function openHash() {
    var fold = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (fold && fold.classList.contains("fold")) {
      set(fold, true);
      requestAnimationFrame(function () {
        fold.scrollIntoView({ block: "start" });
      });
    }
  }
  window.addEventListener("hashchange", openHash);
  openHash();
})();
