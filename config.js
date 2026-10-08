// The one place to set the prototype's address. Both "Try the prototype"
// buttons use it: the prototype next to this page, opening on its onboarding.
var PROTOTYPE_URL = "prototype.html#welcome";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-prototype]").forEach(function (a) {
    a.setAttribute("href", PROTOTYPE_URL);
  });
});
