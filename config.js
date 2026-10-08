// The one place to set the prototype's address. Both "Try the prototype"
// buttons use it: the published prototype, opening on its onboarding.
var PROTOTYPE_URL = "https://claude.ai/artifact/9YyFyPYYeygst8gSCTxLCK#welcome";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-prototype]").forEach(function (a) {
    a.setAttribute("href", PROTOTYPE_URL);
  });
});
