# Brand Kit — improvement pass

Everything built so far **states** SynOS's visual language exactly as it already is. Nothing has
tried to make it better. This pass does, deliberately, with evidence.

Scope: **decks and one-pagers only** (`packages/brand-kit`). A separate improvement pass is running
in parallel on the product UI in `~/ws/cursor_experiment`. They do not overlap: product tokens live
in `cursor_experiment/frontend/src/index.css`, kit tokens in
`packages/brand-kit/src/styles/tokens.css` (`--sk-*`). Do not touch the product repo. Do not try to
merge the two systems — an operator console and an investor deck want opposite things.

## What we already know is weak

Evidence from the extraction, not opinion. Start here rather than re-deriving.

1. **The deck gradient barely travels.** `indigo #6366f1 → violet #7c3aed` are 51 units apart. The
   Company Brain block, the single most important object in the deck, reads nearly flat. Measured
   against `indigo → teal` at 143 units, which was rejected for good reasons (teal fails AA on white
   at 3.74:1 and sits 57 units from emerald, colliding with "a win" in the semantic palette). The
   constraint is real; the flatness is still a problem. A wider *violet-family* ramp was proposed and
   not tested.
2. **The type scale won on recency, not merit.** The VC family (h1 34 / h2 18 / h3 17 / p 16 at
   1.2) beat the buyer family (30/16/15/14 at 1.25) because it was newer. Nobody asked which is
   better for a deck projected in a room.
3. **Eighteen documented conflicts** in `2026-08-13-slide-inventory.md` §4 — every one is a place
   the decks disagreed with themselves. Each is an opportunity, not just a resolution.
4. **`.cover .big` was refit from 58px to 47px** under a "v7 cover refit" comment, and three
   sibling values were cut with it. That was a hand-tuning pass nobody documented the reasoning for.
5. **Nobody has asked whether the 35-slide structure is right.** Every check so far has been about
   CSS consistency. Slide *order*, *count*, and *what earns a slide* are untouched.

## Phase 1 — research, before touching anything

Produce `docs/plans/2026-08-13-deck-research.md`.

- **Teardown of decks that actually raised.** Find published Series A/seed decks and the design
  conventions in them: slide count, how much type per slide, where colour is spent, how data is
  shown, cover treatment, how the ask is presented. Cite sources — real decks, not listicles about
  decks.
- **Projection and print reality.** These are shown on a TV in a room and read as PDFs on a laptop.
  Research minimum type sizes for projected reading, contrast under projector gamma, and what
  survives a PDF export.
- **Typography.** Is Plus Jakarta Sans + Inter + JetBrains Mono the right trio for this register?
  What do decks with strong typographic identity actually use, and what would a serif display face
  (as the marketing site uses) buy or cost here?
- **What separates a deck that reads expensive from one that reads templated.** Be specific and
  visual — spacing discipline, restraint in colour, consistency of one idea per slide.

Then audit our own artifacts against those findings and rank the gaps by how much they cost.

## Phase 2 — propose, with pictures

For each proposed change, build a **side-by-side render**: current versus proposed, using the real
components and real SynOS deck copy, at deck scale. No proposal is discussable as prose alone.

Cover at minimum: the gradient, the type scale, cover treatment, callout density, the wall and
pillar blocks, and the one-pager's information hierarchy.

**Anoop reviews the renders and picks.** Do not implement a visual change he has not seen.

## Phase 3 — implement

- The fidelity harness is now a **regression net, not a spec**: 27 specimens, 103 checks pinned to
  the old design. A deliberate improvement will fail them. That is correct. Update each failing
  assertion *with a recorded reason* — never delete one to make a run green, and never change one
  without saying which decision changed it.
- Keep one vocabulary. An improvement that adds a variant for its own sake is drift with better
  branding.
- Every token change stays in `tokens.css`. No literal colours in components.
- Re-run contrast on every text/surface pair. The kit currently has no known AA failure; do not
  introduce one.

## Phase 4 — ship

Rebuild, re-validate, re-sync to the `SynOS Brand Kit` project
(`f733f13d-112b-4f02-ae4c-a4a33e99f7a6`, pinned in `.design-sync/config.json`), and rebuild one real
deck — the current VC deck — on the improved kit as proof that the improvement survives contact with
a real 35-slide narrative.

Report to `docs/plans/2026-08-13-brand-kit-improvement-report.md`: what changed, what was rejected
and why, every fidelity assertion updated with its reason, and before/after renders.

## The bar

The test is not "is it different". It is: **would a partner at a fund that sees a thousand decks a
year read this one as expensive?** If a change cannot be defended on that question, it does not ship.
