# Replix app case study

A static site (HTML, CSS, JS). Every file sits in this one folder, so it uploads to GitHub in a single drag.

- `index.html`: the page
- `prototype.html`: the working Replix prototype (sample data), opened by both "Try the prototype" buttons on its onboarding
- `config.js`: `PROTOTYPE_URL`, the link for both buttons (`prototype.html#welcome`)
- `styles.css`, `clips.js`, `folds.js`, `visuals.js`: style and behaviour
- `clip-01` … `clip-08` (`.mp4`, `.webm`, `.jpg`) and `markers.js`: the recorded clips, posters and marker positions

GitHub Pages: Settings → Pages → Deploy from branch → `main`, `/ (root)`.
The source project (recording and checks) lives in `replix-case-study/`.
