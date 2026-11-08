# Replix app case study

A static page (HTML, CSS, JS), live at https://adnnankhan.github.io/Replix/.
Replix itself is live at https://replix.pro.

Every file sits in this one folder, so it can be uploaded to GitHub in one drag.

- `index.html`: the page, with its CSS inlined (so the first paint doesn't wait for a stylesheet).
- `config.js`: `PROTOTYPE_URL`, the address every "Try Replix" button opens (in a new tab).
- `clips.js`: the recorded clips. Each plays only while on screen, has a pause button, shows its
  poster and a play button under reduced motion, and draws the numbered markers (`markers.js`).
- `site.js`: the top bar names the section being read; blocks fade in as they scroll into view.
- `visuals.js`: the sphere, the type specimen and the spacing ladder.
- `clip-01` … `clip-08`: `.mp4` / `.webm` clips and `-poster.webp` / `-poster-720.webp` stills.
- `hero-*`, `clip-0X-still-*`: the hero and before/after screens as AVIF and WebP at two sizes.
- `ibm-plex-*.woff2`: IBM Plex Sans and Mono (SIL Open Font License), cut down to the characters
  the page uses.
- `clip-0X.jpg`: the full-size stills the WebP/AVIF files were made from (not loaded by the page).

The look follows the Nudge case study (https://adnnankhan.github.io/Nudge/) with Replix's purple accent.

GitHub Pages: Settings → Pages → Deploy from branch → `main`, `/ (root)`.
