# Replix app case study

A static site: plain HTML, CSS and JS, no build step. Published as a private
artifact: https://claude.ai/artifact/1AbVxtRaTzd2kDLXrN1h2W (the prototype it
links to: https://claude.ai/artifact/9YyFyPYYeygst8gSCTxLCK#welcome).

- `index.html`: the page. Every line of text comes from
  `replix-case-study-final.md`, word for word and in order; lines in
  [brackets] there are build notes.
- `config.js`: `PROTOTYPE_URL` for both "Try the prototype" buttons: the
  prototype artifact, opening on its onboarding (`#welcome`).
- `css/styles.css`: dark theme (IBM Plex Sans and Mono, 40px grid). The
  mockups use the Replix app's own tokens.
- `js/clips.js`: the clips play only while on screen and the tab is visible;
  with reduced motion they show the poster and a play button. The numbered
  markers show on the poster and around that moment of each loop.
- `js/folds.js`: the four collapsible rows in section 03.
- `js/visuals.js`: the sphere, the type specimen and the spacing ladder
  (values from `replix/src/styles/tokens.css`, kept in the HTML).
- `media/`: `clip-01` … `clip-08` as `.webm` (VP9) and `.mp4` (H.264), no
  sound, a poster `.jpg` each, and `markers.json` / `markers.js` (marker
  boxes as fractions of the 1440 × 900 frame, read at the poster moment).

## Look at it locally

```bash
node scripts/serve.mjs
```

Then open http://localhost:3400.

## Re-record the clips

Start the Replix app's dev server on port 3100 (`C:/Users/adnan/replix`,
launch config "replix"), then:

```bash
npm run record
```

It drives the real prototype at 1440 × 900 with Playwright, captures
screencast frames and encodes them with ffmpeg (by default the one bundled
with Remotion in `replix-site/video`; pass `--ffmpeg=<path>` for another).
It never changes the app.

## Checks

```bash
npm install
node scripts/serve.mjs   # in another terminal
npm run verify
```

Text against the markdown, clips (files, in-view play, pause, reduced
motion), markers, fonts, the rows, horizontal scroll and axe at 390 and
1280. Screenshots go to `screenshots/`.

## Republishing

Copy `index.html` without its doctype/html/head/body tags, plus `config.js`,
`css/`, `js/` and `media/` (not `markers.json`), into one folder and publish
it to the same artifact URL with those files.

## Open items

- Three markers named in the copy have no element in the app (see the
  report): star and hide, the "Next:" hint, the steps row in the chat.
