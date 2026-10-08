// Static visuals drawn from data: the V2 sphere (thin ellipses), the type
// specimen and the spacing ladder (values from the app's tokens.css, kept in
// the HTML as data-* attributes).
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";

  // V2: a sphere of thin strands, as ellipses turned around the centre.
  document.querySelectorAll("[data-sphere]").forEach(function (svg) {
    var g = document.createElementNS(NS, "g");
    g.setAttribute("fill", "none");
    g.setAttribute("stroke-width", "0.8");
    for (var i = 0; i < 26; i++) {
      var e = document.createElementNS(NS, "ellipse");
      var t = i / 26;
      e.setAttribute("rx", "150");
      e.setAttribute("ry", String(Math.round(150 * Math.abs(Math.cos(t * Math.PI)) + 6)));
      e.setAttribute("transform", "rotate(" + (t * 180 - 30).toFixed(1) + ")");
      e.setAttribute("stroke", "rgba(236,236,236," + (0.18 + 0.32 * Math.abs(Math.sin(t * Math.PI))).toFixed(2) + ")");
      g.appendChild(e);
    }
    var ring = document.createElementNS(NS, "circle");
    ring.setAttribute("r", "152");
    ring.setAttribute("stroke", "rgba(236,236,236,0.35)");
    g.appendChild(ring);
    svg.appendChild(g);
  });

  // Type specimen: each HIG text style at its size, weight and line height.
  document.querySelectorAll("[data-type-scale] li").forEach(function (li) {
    var s = li.dataset;
    var sample = document.createElement("span");
    sample.className = "sample";
    sample.textContent = s.style;
    sample.style.fontSize = s.size + "px";
    sample.style.lineHeight = s.lh + "px";
    sample.style.fontWeight = s.w;
    var val = document.createElement("span");
    val.className = "val mono";
    val.textContent = s.size + "/" + s.lh + " · " + s.w;
    li.append(sample, val);
  });

  // Spacing ladder: one bar per step, at its real width.
  document.querySelectorAll("[data-spacing] li").forEach(function (li) {
    var name = document.createElement("span");
    name.className = "name mono";
    name.textContent = li.dataset.name;
    var bar = document.createElement("span");
    bar.className = "bar";
    bar.style.width = li.dataset.px + "px";
    var val = document.createElement("span");
    val.className = "val mono";
    val.textContent = li.dataset.px + "px";
    var track = document.createElement("span");
    track.appendChild(bar);
    li.append(name, track, val);
  });
})();
