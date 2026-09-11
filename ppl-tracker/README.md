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
