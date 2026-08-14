# Rebuild a real deck on the brand kit

The kit is built, improved, synced and pinned by 104 fidelity checks — and **no deck uses it**. Every
deck and one-pager in `~/ws/synos-gtm` is hand-written HTML with inline CSS. Until one is rebuilt on
the components, none of this reaches a VC.

This is that step. Scope: **one deck, proven end to end.**

## The approach, decided

Components are server-rendered to static HTML at build time and injected into a reveal.js shell. The
output is the same portable single-file `.html` the repo already ships.

Rejected: a React + reveal runtime app. It would break the existing PDF export path, the
`verify_pdf.py` gate and the single-file portability, and buy nothing — decks are static documents.

The kit already renders this way: `fidelity/scripts/run-fidelity.mjs` and `tools/boxes.mjs` both use
`renderToStaticMarkup`. This is the same mechanism, aimed at a whole deck.

## Which deck

**`synos-vc-deck-v6.html` — the reading deck.** 35 slides (21 main + 14 appendix). It is the artifact
that actually gets sent, its PDF already exports correctly, and it is the deck the kit was extracted
from, so it is the fairest test of whether the components can express real content.

Do **not** touch the source deck in `~/ws/synos-gtm` — that repo is READ-ONLY here. Build the new deck
in this repo and leave a comparison for Anoop to judge before anything replaces anything.

## Build it in this order

### 1. The renderer — `packages/brand-kit/deck/`

A small build script that takes a deck definition and emits a single self-contained `.html`:

- reveal.js CSS/JS **vendored, not CDN-loaded** — deck-research §C.4 found the current decks load
  fonts, reveal CSS and reveal JS from CDNs at present time, so a meeting on bad wifi renders them
  wrong. Same for the fonts: self-host the three families.
- The kit's `dist/brand-kit.css` inlined.
- Each slide server-rendered inside `<section class="has-card">`.
- Reveal config matching the source: `width: 1280, height: 720, center: false`.
- Explicitly override reveal's theme body font so nothing falls through to Source Sans Pro — §C.4
  measured four families rendering where three were intended, with the leak embedded in the PDF.

### 2. The deck definition — one file per slide, or one array

Content comes from the **source deck's own text**, not rewritten. This is a re-platforming, not a
rewrite: if the content changes at the same time, nobody can tell whether the kit or the edit caused
a difference.

Where a slide's layout has no component, either compose it from existing primitives or record it in
the report as a gap. **Do not add a component to the kit to force a slide through** — the inventory
deliberately excluded ~60 one-off classes, and a component that exists for one slide is drift.

### 3. Prove it

- **Page parity**: 35 sections in, 35 pages out through `_build_deck_pdf.py`, verified with
  `synos-gtm/presentations/verify_pdf.py --slides 35`.
- **No CDN at render**: every font and script resolves from disk. Load it with the network disabled
  and confirm the three intended families and nothing else.
- **Side-by-side render**, source deck vs rebuilt deck, every slide, at deck scale, into
  `deck/comparison/`. This is what Anoop reviews.
- **Geometry probe**: the `h1` sits at the same top on every standard slide — deck-research §D.1
  measured 27 distinct `h1` positions across 35 slides in the source, which is the most visible
  "homemade" tell. The rebuild should collapse that to one, and that is the single clearest proof the
  kit was worth building.

### 4. Report

`docs/plans/2026-08-14-deck-on-kit-report.md`: which slides mapped cleanly, which needed composition,
which could not be expressed and why, the parity and geometry numbers, and an honest verdict on
whether the kit is ready to carry real decks or needs specific additions first.

## What success is

Not "it looks identical" — the kit is deliberately different now (Instrument Serif, opened scale,
de-boxed). Success is:

1. All 35 slides express in components, or the exceptions are named and understood.
2. The `h1` stops moving.
3. The PDF exports at 35 pages and passes the verifier.
4. Nothing loads from a CDN.
5. Anoop looks at the comparison and judges the rebuilt deck better.

If (1) fails for more than a handful of slides, that is the finding — report it rather than forcing
it, because it means the kit needs a grid and a spacing scale first, which is already item 1 on the
de-box list.
