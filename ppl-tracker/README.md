# Iron — Push / Pull / Legs (installable PWA)

A personal training coach: it builds your week from a few setup questions, guides
every rep with an animated demo + tempo counter, and tracks your progress — **fully
offline**, with all data kept on the device.

This folder is a self-contained static web app. No build step, no server code.

```
ppl-tracker/
├── index.html            # the whole app (HTML + CSS + JS inline)
├── manifest.webmanifest  # PWA manifest (name, icons, standalone display)
├── service-worker.js     # offline cache (network-first for the page, cache-first for assets)
├── icons/                # app icons (192 / 512 / maskable / apple-touch)
└── README.md
```

## Run it locally

A service worker needs `http(s)://`, not `file://`. From this folder:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/
```

## Deploy it (so it's installable)

Any static host works. Easiest is **GitHub Pages**:

1. Push this repo, then in **Settings → Pages** set the source to your branch, root.
2. Your app is served at `https://<user>.github.io/<repo>/ppl-tracker/`.
3. Because every path in the app is **relative**, it works at that sub-path with no
   changes. HTTPS is provided by Pages, which is all the PWA needs.

(Netlify / Vercel / Cloudflare Pages: drop this folder in as the publish directory.)

## Install on a phone

- **iPhone (Safari):** Share → **Add to Home Screen**.
- **Android (Chrome):** the app shows an **Add to Home Screen** button in Settings,
  or use Chrome's menu → **Install app**.

It then launches full screen, with its own icon, and runs with no internet.

## What changed in this pass

**Correctness**
- Aliased exercise figures (e.g. Barbell Bench → `db_bench`) no longer render as blank
  thumbnails — `mountFigs` now resolves the alias.
- The session builder's gym/home toggle no longer hides a home-only user's exercises;
  the location now follows your profile and the toggle only appears for hybrid setups.
- The rest timer survives a mid-workout reload (its state is stored on the session).
- Editing a live session no longer re-adds a core exercise you'd swapped out.
- Guarded the rep counter against a session discarded mid-count.
- Unit changes in Settings now also update your saved profile.
- You can now delete a logged session from **Stats → Recent sessions**.

**Performance**
- Exercise animations pause when the tab is backgrounded (battery/CPU).

**Premium / interaction**
- Real installable PWA: manifest, offline service worker, generated app icons, and an
  in-app install prompt (Android) / Safari instructions (iOS), hidden once installed.
- Subtle haptics on tab switches; fixed a double pre-beep on the rest countdown.

**Training / health**
- A rotating recovery cue on the finish screen (sleep, protein, spacing muscle groups).
- A plain "training tool, not medical advice" note in Settings.

All changes are covered by an automated test suite (plan generator invariants across
every split, home/no-equipment and injury filters, the fixes above, and a render
smoke-test of every screen).

## Warm & human visual identity

- New type system bundled offline: **Fredoka** (rounded display) + **Nunito** (body),
  inlined as woff2 so they work with no network; rounded system fallback for instant load.
- Warm palette in both themes — cozy brown-black dark, warm-paper light — with a coral
  primary, honey and mint secondaries, and softer/rounder cards and shadows.
- Confetti when you finish a session (bigger + multicolour on a PR), friendlier
  illustrated empty states, and a **weekly-volume** bar chart in Stats.

## Muscle-aware exercise animation

Every animated demo (and the in-set rep counter) now answers three questions at a glance:

- **What moves** — a mint direction arrow tracks the moving hand/hip and reverses on the
  way down; joint dots mark the working elbow/knee/hip.
- **Where you feel it** — the working muscle glows in coral on the body, brightest at peak
  contraction (weights are gold, so muscle / load / motion read as three distinct things).
- **How fast** — the rep pauses and "squeezes" at the top, tempo-synced to your counter
  (up → hold → lower → reset), with a plain-language legend under the demo.

The overlay is generated from the exercise's movement pattern, so it scales to the whole
library rather than being hand-drawn per exercise. Verified with rendered snapshots and
an extended test suite (221 assertions).

## Precise muscle map (front + back)

Alongside the movement animation, every demo now shows an anatomical **Muscles worked**
chart — front and back figures with the real muscle groups. The exercise's target muscles
light up in coral (primary) and gold (assisting), with names, so "where you feel it" is
exact rather than indicative. Mapping is per movement pattern with per-exercise overrides
(e.g. chin-ups bias biceps, RDLs bias hamstrings, incline press adds upper chest / front
delts). Every library exercise resolves to at least one primary muscle (checked in tests).

## The animation *is* the muscle body (in the counter)

During a set the rep counter no longer shows a stick figure — it shows the detailed
front/back muscular body itself. The working muscles are drawn with real, differentiated
groups (biceps vs triceps, quads vs hamstrings, pecs, delts, lats, glutes, abs, calves…),
labelled on the body, and they **flex and brighten live with each rep** (bulge + glow at
the squeeze, ease at the stretch), driven by the same repCycle. So you can tell exactly
which muscle is working, and watch it work, while you train.

## One realistic body, everywhere

The stick figure is gone. The app now uses a single anatomical figure throughout —
a connected body silhouette with gradient-shaded muscles and fibre striations:

- **Rep counter** — the body is the animation, flexing/glowing live with each rep.
- **Exercise demo** — the same body flexes at your chosen tempo (play/pause), above the
  what-moves / where / how-fast legend and the form cues.
- **Thumbnails** — a mini body that lights the target muscle (auto front/back), so a
  glance down a list tells you what each exercise trains.
- **Onboarding** — a clean neutral body as the hero.

More realism: connected silhouette (muscles no longer float), radial/linear gradients for
volume, and striation lines on the big groups. Muscle differentiation stays exact.

## Real anatomical body (replaces the hand-drawn one)

The figure is now a proper muscular anatomy chart — front and back, with clearly visible,
individually highlightable muscle groups — using the MIT-licensed muscle paths from
`react-native-body-highlighter` (see `LICENSE-body-highlighter`). The working muscles light
up (primary coral, assisting gold) and flex live in the counter; thumbnails show a mini
body lighting the target muscle. The earlier hand-drawn silhouette is gone.

## Counter turntable + movement demo

- **Counter:** the muscular body is now one large figure on a gentle 3D **turntable**
  (perspective + drop shadow), with a flip button for front/back, and the worked muscle
  **pumps** — contracts and brightens — in time with each rep (stronger, clearly tempo-based).
- **Demo:** shows **how to do the movement** — an animated figure performing the exercise
  *with its equipment/machine* through the full range of motion (direction arrow, joints,
  play/pause + tempo) — above the **muscles worked** anatomy map and the form cues.
- Only the open exercise's movement animates (visibility-gated) to stay light on the phone.
