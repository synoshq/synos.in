# Fidelity report

27 specimens · 104 computed-style checks · 27 passing, 0 failing.
84 of those checks record a **deliberate** divergence from the source artifact.

Each specimen renders a built component and the real slide it was extracted from at the same
viewport, screenshots both, and compares the computed values of the properties that carry the
brand. Side-by-side images are in `fidelity/side-by-side/`.

The harness was a *spec* while the kit was being extracted. Since the 2026-08-13 improvement
pass it is a **regression net**: the kit is deliberately no longer byte-faithful to the decks it
came from. A property the kit has moved off is not deleted from the harness and not loosened —
it is pinned on both sides, so the check still fails if the kit drifts off its new value *and*
now also fails if the source artifact moves underneath it. Every one is listed below with the
decision that moved it.

| Specimen | Component | Source | Checks | Recorded moves | Result |
|---|---|---|---:|---:|---|
| `slide-frame-default` | SlideFrame | presenting s2 | 1 | 0 | PASS |
| `slide-frame-arch` | SlideFrame variant="arch" | presenting s6 | 5 | 4 | PASS |
| `eyebrow-indigo` | Eyebrow tone="indigo" | presenting s7 | 1 | 2 | PASS |
| `eyebrow-violet` | Eyebrow tone="violet" | presenting s2 | 1 | 2 | PASS |
| `eyebrow-red` | Eyebrow tone="red" | presenting s4 | 1 | 2 | PASS |
| `eyebrow-buyer-conflict` | Eyebrow (vs buyer deck — conflict C4) | tech-v2 s3 | 1 | 1 | CONFLICT (expected difference) |
| `slide-header-row` | SlideHeader layout="row" | presenting s2 | 2 | 6 | PASS |
| `cover` | CoverSlide | presenting s1 | 6 | 13 | PASS |
| `big-type` | BigTypeSlide | presenting s22 | 6 | 3 | PASS |
| `callout-deck` | Callout | presenting s24 | 1 | 2 | PASS |
| `chips` | Chip / ChipRow | presenting s24 | 2 | 0 | PASS |
| `chip-md` | Chip size="md" | presenting s6 | 1 | 0 | PASS |
| `wall` | WallCard / WallGrid | presenting s34 | 4 | 8 | PASS |
| `pillar` | PillarCard / PillarGrid | presenting s6 | 5 | 12 | PASS |
| `pillar-brain` | PillarCard brain | presenting s6 | 4 | 3 | PASS |
| `phase` | PhaseCard / PhaseRow | presenting s10 | 8 | 1 | PASS |
| `usecase` | UseCaseCard / UseCaseGrid | presenting s30 | 6 | 2 | PASS |
| `stat` | StatCard / StatRow | presenting s27 | 6 | 5 | PASS |
| `step` | StepCard / StepGrid | presenting s7 | 8 | 14 | PASS |
| `split` | SplitColumns / SplitColumn | presenting s28 | 5 | 1 | PASS |
| `caption` | Caption | presenting s25 | 1 | 0 | PASS |
| `quote` | QuoteBar | presenting s26 | 1 | 0 | PASS |
| `onepager-header` | OnePagerHeader | 1p-vc | 7 | 1 | PASS |
| `onepager-callout-chip` | Callout / Chip at print scale | 1p-vc | 6 | 2 | PASS |
| `onepager-phase` | PhaseCard scale="print" | 1p-vc | 5 | 0 | PASS |
| `onepager-cta` | CtaBar | 1p-vc | 4 | 0 | PASS |
| `onepager-outcome-heading` | OutcomeCard / SectionHeading | 1p-retail | 6 | 0 | PASS |

## Deliberate divergences, by decision

### A

**Decision A — Instrument Serif as the display face.** The display face was Plus Jakarta Sans,
which deck-research §C.1 measured as the modal face of the free-template ecosystem: it cannot
make a deck read expensive because it is exactly what an inexpensive deck also uses. It is
retired outright rather than demoted, because a display face used for nothing is drift.
Instrument Serif replaces it in exactly three roles — `h1`, `.sk-cover-title` and
`.sk-stat-value` — and nowhere else; it is the face synos.in already uses, so this is the one
change in the pass that makes two artifacts converge instead of adding a variant.

The face has **one weight and no bold**, so every 700/800 it replaced is re-solved with size:
h1 34/700 → 40/400, cover 47/800 → 56/400, stat value 48/800 → 56/400. It loses its thin
strokes first under projector gamma (§B.3), so it must never render below 24px — which is why
`h2` (26px) and `h3` (20px) and every card title stay Inter, moving from `--sk-font-display` to
`--sk-font-body` without changing size.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `slide-frame-arch` | `.sk-slide h1` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `"Instrument Serif", Georgia, serif` |
| `slide-frame-arch` | `.sk-slide h1` | `font-weight` | `700` | `400` |
| `slide-header-row` | `.sk-header--row h1` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `"Instrument Serif", Georgia, serif` |
| `slide-header-row` | `.sk-header--row h1` | `font-weight` | `700` | `400` |
| `slide-header-row` | `.sk-header--row h1` | `letter-spacing` | `-0.34px` | `-0.6px` |
| `slide-header-row` | `.sk-header--row h1` | `line-height` | `40.8px` | `44.8px` |
| `cover` | `.sk-cover-title` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `"Instrument Serif", Georgia, serif` |
| `cover` | `.sk-cover-title` | `font-size` | `47px` | `56px` |
| `cover` | `.sk-cover-title` | `font-weight` | `800` | `400` |
| `cover` | `.sk-cover-title` | `letter-spacing` | `-1.4px` | `-1.12px` |
| `cover` | `.sk-cover-title` | `line-height` | `49.82px` | `58.24px` |
| `cover` | `.sk-cover-lead` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `big-type` | `.sk-bigtype-l1` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `big-type` | `.sk-bigtype-l2` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `big-type` | `.sk-bigtype-punch` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain) .sk-pillar-name` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `phase` | `.sk-phase-title` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `usecase` | `.sk-usecase-title` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `stat` | `.sk-stat-value` | `font-family` | `"Plus Jakarta Sans"` | `"Instrument Serif", Georgia, serif` |
| `stat` | `.sk-stat-value` | `font-size` | `48px` | `72px` |
| `stat` | `.sk-stat-value` | `font-weight` | `800` | `400` |
| `stat` | `.sk-stat-value` | `line-height` | `48px` | `72px` |
| `step` | `.sk-step-title` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `onepager-header` | `.sk-ph-brand` | `font-family` | `"Plus Jakarta Sans"` | `Inter, -apple-system, "Segoe UI", sans-serif` |

### B

**Decision B — the gradient ends at `--sk-violet-ink`, not `--sk-violet`.** An accessibility
fix, not taste. White text on the old ramp ran 4.47:1 at the light end and 3.45:1 at the 80%
opacity the Company Brain block actually used — a WCAG AA failure on the single most important
object in the deck (§E.2). `#4c1d95` was already a token, sits 16.6° from `--sk-violet` so the
brand hue is unchanged, and raises perceptual travel from ΔE_ok 0.087 to 0.215 — 2.5×, and the
first time the ramp moves lightness at all (ΔL −0.206 vs −0.044).

The light end is unchanged, so it is still the binding constraint: every white-on-gradient text
colour therefore also moved from `rgba(255,255,255,0.8/0.88)` to solid `--sk-on-brand`. Proof
for both halves: `node tools/contrast.mjs`.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `pillar-brain` | `.sk-pillar--brain` | `background-image` | `linear-gradient(135deg, rgb(99, 102, 241), rgb(124, 58, 237))` | `linear-gradient(135deg, rgb(99, 102, 241), rgb(76, 29, 149))` |
| `pillar-brain` | `.sk-pillar--brain .sk-pillar-kicker` | `letter-spacing` | `1.2px` | `1.6px` |
| `pillar-brain` | `.sk-pillar--brain .sk-pillar-kicker` | `color` | `rgba(255, 255, 255, 0.8)` | `rgb(255, 255, 255)` |
| `step` | `.sk-step-bar` | `background-image` | `linear-gradient(135deg, rgb(99, 102, 241), rgb(124, 58, 237))` | `linear-gradient(135deg, rgb(99, 102, 241), rgb(76, 29, 149))` |

### C

**Decision C — open the type scale and de-box.** The extracted scale ran 34/18/17/16/11.5,
which put `h2`, `h3` and `p` inside a 12.5% range covering three semantic levels (§D.2). At
Hale's 25%-zoom test they are 4.5, 4.25 and 4.0px: indistinguishable. Hierarchy was therefore
being carried by weight and colour, which is why the deck needed 7.7 text colours a slide —
colour doing the job size should do. The scale is now **40 / 26 / 20 / 16 / 13**, every
adjacent ratio ≥ 1.25, with the eyebrow rising 11.5 → 13px (1.60%EH → 1.81%EH), lifting the
label that appears on 144 of 148 slides off the ambient-light floor (§B.3).

De-box, same decision: nesting capped at 2, a group's outer container gives up its border in
favour of space, and 1px `--sk-border` hairlines go in most positions — they are 1.23:1, so
they are invisible on a projector while still fragmenting the layout (§D.4). Where a border is
removed the grid gap opens to replace it. Affects `WallGrid`, `PillarGrid`, `UseCaseGrid`,
`StepGrid` and `Callout`. Measured by `node tools/boxes.mjs`.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `slide-frame-arch` | `.sk-slide h1` | `font-size` | `34px` | `40px` |
| `slide-frame-arch` | `.sk-slide h2` | `font-size` | `18px` | `26px` |
| `eyebrow-indigo` | `.sk-eyebrow--indigo` | `font-size` | `11.5px` | `13px` |
| `eyebrow-indigo` | `.sk-eyebrow--indigo` | `line-height` | `14.95px` | `16.9px` |
| `eyebrow-violet` | `.sk-eyebrow--violet` | `font-size` | `11.5px` | `13px` |
| `eyebrow-violet` | `.sk-eyebrow--violet` | `line-height` | `14.95px` | `16.9px` |
| `eyebrow-red` | `.sk-eyebrow--red` | `font-size` | `11.5px` | `13px` |
| `eyebrow-red` | `.sk-eyebrow--red` | `line-height` | `14.95px` | `16.9px` |
| `eyebrow-buyer-conflict` | `.sk-eyebrow` | `font-size` | `10px` | `13px` |
| `slide-header-row` | `.sk-header--row h1` | `font-size` | `34px` | `40px` |
| `slide-header-row` | `.sk-header--row h1` | `margin-bottom` | `10px` | `12px` |
| `cover` | `.sk-cover-lead` | `font-size` | `16.5px` | `20px` |
| `cover` | `.sk-cover-lead` | `font-weight` | `700` | `600` |
| `cover` | `.sk-cover-lead` | `line-height` | `22.275px` | `27px` |
| `cover` | `.sk-cover-foot` | `font-size` | `12px` | `13px` |
| `cover` | `.sk-cover-foot` | `line-height` | `15.6px` | `16.9px` |
| `callout-deck` | `.sk-callout` | `border-top-width` | `1px` | `0px` |
| `callout-deck` | `.sk-callout` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(51, 65, 85)` |
| `wall` | `.sk-wall` | `background-color` | `rgb(248, 250, 252)` | `rgba(0, 0, 0, 0)` |
| `wall` | `.sk-wall` | `border-top-width` | `1px` | `0px` |
| `wall` | `.sk-wall` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `wall` | `.sk-wall` | `border-top-left-radius` | `10px` | `0px` |
| `wall` | `.sk-wall` | `padding-top` | `12px` | `2px` |
| `wall` | `.sk-wall` | `padding-right` | `14px` | `0px` |
| `wall` | `.sk-wall` | `padding-bottom` | `12px` | `2px` |
| `wall` | `.sk-wall-grid` | `gap` | `12px` | `22px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `background-color` | `rgb(248, 250, 252)` | `rgba(0, 0, 0, 0)` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-top-width` | `1px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-left-width` | `1px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-left-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-top-left-radius` | `11px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-top` | `7px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-right` | `11px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-bottom` | `7px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-left` | `11px` | `0px` |
| `pillar` | `.sk-pillar-grid` | `gap` | `7px` | `18px` |
| `usecase` | `.sk-usecase-grid` | `gap` | `12px` | `16px` |
| `step` | `.sk-step` | `border-top-width` | `1px` | `0px` |
| `step` | `.sk-step` | `border-left-width` | `1px` | `0px` |
| `step` | `.sk-step` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `step` | `.sk-step` | `border-left-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `step` | `.sk-step-quote` | `background-color` | `rgb(255, 255, 255)` | `rgba(0, 0, 0, 0)` |
| `step` | `.sk-step-quote` | `border-top-width` | `1px` | `0px` |
| `step` | `.sk-step-quote` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(51, 65, 85)` |
| `step` | `.sk-step-quote` | `border-top-left-radius` | `7px` | `0px` |
| `step` | `.sk-step-quote` | `padding-top` | `7px` | `2px` |
| `step` | `.sk-step-quote` | `padding-right` | `10px` | `0px` |
| `step` | `.sk-step-quote` | `padding-bottom` | `7px` | `2px` |
| `step` | `.sk-step-grid` | `gap` | `14px` | `16px` |
| `split` | `.sk-split-eyebrow` | `font-size` | `11.5px` | `13px` |
| `onepager-callout-chip` | `.sk-callout--print` | `border-top-width` | `1px` | `0px` |
| `onepager-callout-chip` | `.sk-callout--print` | `border-top-color` | `rgb(254, 202, 202)` | `rgb(51, 65, 85)` |

### D

**Decision D — the cover paragraph slot stays, and is optional.** SynOS ships a reading deck
and a presenting deck deliberately, as two artifacts with two jobs. The reading deck is sent
without a presenter and the paragraph is doing real work there; the presenting deck should omit
it and speak it. `CoverSlide`'s `lede` prop documents which register sets it. The slot was not
removed — deleting it would have made the reading deck worse in order to fix the presenting
deck. Its size moved onto the scale as part of decision C.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `cover` | `.sk-cover-lede` | `font-size` | `12.3px` | `16px` |
| `cover` | `.sk-cover-lede` | `line-height` | `18.45px` | `24px` |

### E

**Decision E — `.sk-stat--amber` takes `--sk-amber`, not `--sk-amber-2`.** A straight defect
fix. `--sk-amber-2 #f59e0b` on `--sk-surface-2` is **2.05:1** — it failed even the 3:1 large-
text threshold, at 72px, making it the kit's worst live WCAG failure. `--sk-amber #92400e` is
6.78:1 and is already the amber *text* token in every other component. `--sk-amber-2` remains a
border and accent colour and is now used for no text anywhere.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `stat` | `.sk-stat--amber .sk-stat-value` | `color` | `rgb(245, 158, 11)` | `rgb(146, 64, 14)` |

## Recorded conflicts — differences that are correct

### `eyebrow-buyer-conflict`

C4: the buyer decks run the eyebrow at 10px / margin-bottom 8px. The newest deck wins at 11.5px / 11px. This check is expected to differ and is kept as evidence of the conflict.

- `margin-bottom`: source `8px` · built `11px`
- `font-size`: source `10px` · built `13px` — also moved by C
