// The one place to set Replix's address. Both "Try Replix" buttons use it
// (they open it in a new tab).
var PROTOTYPE_URL = "https://replix.pro";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-prototype]").forEach(function (a) {
    a.setAttribute("href", PROTOTYPE_URL);
  });
});
