# Fidelity report

27 specimens · 104 computed-style checks · 27 passing, 0 failing.
138 of those checks record a **deliberate** divergence from the source artifact.

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
| `slide-frame-default` | SlideFrame | presenting s2 | 1 | 1 | PASS |
| `slide-frame-arch` | SlideFrame variant="arch" | presenting s6 | 5 | 5 | PASS |
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
| `pillar` | PillarCard / PillarGrid | presenting s6 | 5 | 6 | PASS |
| `pillar-brain` | PillarCard brain | presenting s6 | 4 | 3 | PASS |
| `phase` | PhaseCard / PhaseRow | presenting s10 | 8 | 13 | PASS |
| `usecase` | UseCaseCard / UseCaseGrid | presenting s30 | 6 | 2 | PASS |
| `stat` | StatCard / StatRow | presenting s27 | 6 | 16 | PASS |
| `step` | StepCard / StepGrid | presenting s7 | 8 | 14 | PASS |
| `split` | SplitColumns / SplitColumn | presenting s28 | 5 | 14 | PASS |
| `caption` | Caption | presenting s25 | 1 | 0 | PASS |
| `quote` | QuoteBar | presenting s26 | 1 | 12 | PASS |
| `onepager-header` | OnePagerHeader | 1p-vc | 7 | 1 | PASS |
| `onepager-callout-chip` | Callout / Chip at print scale | 1p-vc | 6 | 2 | PASS |
| `onepager-phase` | PhaseCard scale="print" | 1p-vc | 5 | 10 | PASS |
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
| `cover` | `.sk-cover-title` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `"Instrument Serif", Georgia, serif` |
| `cover` | `.sk-cover-title` | `font-weight` | `800` | `400` |
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
| `slide-frame-arch` | `.sk-slide h2` | `font-size` | `18px` | `26px` |
| `eyebrow-indigo` | `.sk-eyebrow--indigo` | `font-size` | `11.5px` | `13px` |
| `eyebrow-indigo` | `.sk-eyebrow--indigo` | `line-height` | `14.95px` | `16.9px` |
| `eyebrow-violet` | `.sk-eyebrow--violet` | `font-size` | `11.5px` | `13px` |
| `eyebrow-violet` | `.sk-eyebrow--violet` | `line-height` | `14.95px` | `16.9px` |
| `eyebrow-red` | `.sk-eyebrow--red` | `font-size` | `11.5px` | `13px` |
| `eyebrow-red` | `.sk-eyebrow--red` | `line-height` | `14.95px` | `16.9px` |
| `eyebrow-buyer-conflict` | `.sk-eyebrow` | `font-size` | `10px` | `13px` |
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

### F

**Decision F — the serif re-solve (2026-08-14 follow-on).** Decision A applied Instrument Serif
and moved `h1` 34px/700 sans → 40px/400 serif, calling that a re-solve of the lost weight. It was
not. Presence on a wall is *ink*, not nominal point size, and Instrument Serif is both
lighter-stemmed and narrower-set than Plus Jakarta Sans, so the swap lost on both terms at once.
`node tools/ink.mjs` draws the longest headline in the corpus at each spec and counts glyph
pixels:

| spec | set width | ink |
|---|---|---|
| PJS 34/700 (before) | 919px | 9528px² |
| IS 40/400 (decision A) | 734px — **0.80×** | 6173px² — **0.65×** |
| IS 54/400 (decision F) | 963px — 1.05× | 11320px² — 1.19× |

A serif headline painting two thirds of the ink of the sans it replaced reads QUIETER, which
inverts the whole point of the face change — visible in the phase-3 before/after on
`slide-six-walls`, where the old headline lands harder. **h1 is now 54px**, the first step that
clears the old headline on both terms with margin rather than merely matching it, at -0.024em
tracking (closing the sidebearings is the only other lever a single-weight face offers) and
line-height 1.08. It still leaves 305px of the 1268px content width in hand on the longest
headline in the corpus, which 58px would not.

Colour was measured as a third lever and rejected: `--sk-ink #0f172a` is already 17.4:1 on white
and the darkest thing left (#020617, 19.6:1) is a 12% luminance move, invisible at any projector
gamma — a token bought for nothing.

`.sk-cover-title` follows to **72px**, not as a second opinion about the cover but as a
consequence: at 56px it would sit 1.04× the h1 on the slide after it, which is not a step. The
old system ran cover/h1 = 47/34 = 1.38; 72/54 = 1.33 holds it, and 72px is where
`.sk-stat-value` already sits, so the deck's two "largest object on the slide" roles agree on
one size instead of on two near-misses.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `slide-frame-arch` | `.sk-slide h1` | `font-size` | `34px` | `54px` |
| `slide-header-row` | `.sk-header--row h1` | `font-size` | `34px` | `54px` |
| `slide-header-row` | `.sk-header--row h1` | `letter-spacing` | `-0.34px` | `-1.296px` |
| `slide-header-row` | `.sk-header--row h1` | `line-height` | `40.8px` | `58.32px` |
| `slide-header-row` | `.sk-header--row h1` | `margin-bottom` | `10px` | `14px` |
| `cover` | `.sk-cover-title` | `font-size` | `47px` | `72px` |
| `cover` | `.sk-cover-title` | `letter-spacing` | `-1.4px` | `-1.728px` |
| `cover` | `.sk-cover-title` | `line-height` | `49.82px` | `73.44px` |

### G

**Decision G — de-box, second pass (2026-08-14 follow-on).** Decision C left the composed-slide
mean at 11.6 boxes against a target of 6, and named `PhaseCard`, `StatCard`, `SplitColumn` and
`QuoteBar` as the remaining candidates. All four are taken here, on the argument decision C
already made for `WallCard` and `PillarCard`: a fill that paints nothing (`.sk-phase` is
`--sk-surface` on a `--sk-surface` slide) and a 1.23:1 hairline nobody can see on a projector are
two devices doing zero work between them. In each case the grid gap opens to do the separating
the box was pretending to do — phase and stat rows 14 → 28px, the moat split 14 → 40px.

What is kept, and why, in each: the **phase badge** (this component's one colour spend, and the
only place the brand gradient appears on that slide — the argument that kept `.sk-pillar-ico`);
the **dashed phase foot** and the **stat hue** (a rule and a colour, not containers); the
**split column's tone**, moved off the plate and onto the eyebrow and the ✓/✕ marker, which puts
the hue on the two glyphs that carry the argument instead of washing it across 300px of
background that text must then survive. `QuoteBar` takes the same 3px rule `StepCard`'s quote
took under decision C, deliberately rather than inventing a second answer, and rises 11.5 → 13px
because a line that was getting away with being smaller than the eyebrow above it can only do
that while a plate marks it out. Print scales move with deck scales, for the reason decision C
gave: a print-only exception is the "one more variant" these passes exist to remove.

**The mean-6 target is retired at 10, on a measurement.** `SK_FLOOR=1 node tools/boxes.mjs`
strips every remaining optional container fill — the callout tint, the use-case fill, the step
fill — and the count lands at **mean 9.0 boxes / 5.8 panels**. What survives is vocabulary, not
composition: the slide card (5), the chips (10), the pillar icon tiles (6), the phase badges (3),
the gradient step cap (3), the Company Brain block, the flagship border and 13 rules. A target of
6 sits 3.0 below a floor that already costs three components their surfaces. The gate is now
mean ≤ 10 boxes and ≤ 7.5 panels, and the entire distance between 10 and the 9.0 floor is the
three step fills and the two non-flagship use-case fills — both kept for decision C's stated
reason that three or more stacked text levels need a surface, and both named so the number moves
if that call changes.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `phase` | `.sk-phase` | `background-color` | `rgb(255, 255, 255)` | `rgba(0, 0, 0, 0)` |
| `phase` | `.sk-phase` | `border-top-width` | `1px` | `0px` |
| `phase` | `.sk-phase` | `border-left-width` | `1px` | `0px` |
| `phase` | `.sk-phase` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `phase` | `.sk-phase` | `border-left-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `phase` | `.sk-phase` | `border-top-left-radius` | `14px` | `0px` |
| `phase` | `.sk-phase` | `padding-top` | `18px` | `0px` |
| `phase` | `.sk-phase` | `padding-right` | `18px` | `0px` |
| `phase` | `.sk-phase` | `padding-bottom` | `18px` | `0px` |
| `phase` | `.sk-phase` | `padding-left` | `18px` | `0px` |
| `phase` | `.sk-phase-row` | `gap` | `14px` | `28px` |
| `stat` | `.sk-stat` | `background-color` | `rgb(248, 250, 252)` | `rgba(0, 0, 0, 0)` |
| `stat` | `.sk-stat` | `border-top-width` | `1px` | `0px` |
| `stat` | `.sk-stat` | `border-left-width` | `1px` | `0px` |
| `stat` | `.sk-stat` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `stat` | `.sk-stat` | `border-left-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `stat` | `.sk-stat` | `border-top-left-radius` | `14px` | `0px` |
| `stat` | `.sk-stat` | `padding-top` | `22px` | `0px` |
| `stat` | `.sk-stat` | `padding-right` | `18px` | `0px` |
| `stat` | `.sk-stat` | `padding-bottom` | `22px` | `0px` |
| `stat` | `.sk-stat` | `padding-left` | `18px` | `0px` |
| `stat` | `.sk-stat-row` | `gap` | `14px` | `28px` |
| `split` | `.sk-split-col` | `background-color` | `rgb(248, 250, 252)` | `rgba(0, 0, 0, 0)` |
| `split` | `.sk-split-col` | `border-top-width` | `1px` | `0px` |
| `split` | `.sk-split-col` | `border-left-width` | `1px` | `0px` |
| `split` | `.sk-split-col` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `split` | `.sk-split-col` | `border-left-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `split` | `.sk-split-col` | `border-top-left-radius` | `14px` | `0px` |
| `split` | `.sk-split-col` | `padding-top` | `18px` | `0px` |
| `split` | `.sk-split-col` | `padding-right` | `20px` | `0px` |
| `split` | `.sk-split-col` | `padding-bottom` | `18px` | `0px` |
| `split` | `.sk-split-col` | `padding-left` | `20px` | `0px` |
| `split` | `.sk-split-col--violet` | `background-color` | `rgb(245, 243, 255)` | `rgba(0, 0, 0, 0)` |
| `split` | `.sk-split-col--violet` | `border-top-color` | `rgb(221, 214, 254)` | `rgb(15, 23, 42)` |
| `split` | `.sk-split` | `gap` | `14px` | `40px` |
| `quote` | `.sk-quote` | `background-color` | `rgb(248, 250, 252)` | `rgba(0, 0, 0, 0)` |
| `quote` | `.sk-quote` | `border-top-width` | `1px` | `0px` |
| `quote` | `.sk-quote` | `border-left-width` | `1px` | `3px` |
| `quote` | `.sk-quote` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(51, 65, 85)` |
| `quote` | `.sk-quote` | `border-left-color` | `rgb(226, 232, 240)` | `rgb(124, 58, 237)` |
| `quote` | `.sk-quote` | `border-top-left-radius` | `11px` | `0px` |
| `quote` | `.sk-quote` | `padding-top` | `9px` | `2px` |
| `quote` | `.sk-quote` | `padding-right` | `16px` | `0px` |
| `quote` | `.sk-quote` | `padding-bottom` | `9px` | `2px` |
| `quote` | `.sk-quote` | `padding-left` | `16px` | `12px` |
| `quote` | `.sk-quote` | `font-size` | `11.5px` | `13px` |
| `quote` | `.sk-quote` | `line-height` | `17.25px` | `19.5px` |
| `onepager-phase` | `.sk-phase--print` | `background-color` | `rgb(255, 255, 255)` | `rgba(0, 0, 0, 0)` |
| `onepager-phase` | `.sk-phase--print` | `border-top-width` | `1px` | `0px` |
| `onepager-phase` | `.sk-phase--print` | `border-left-width` | `1px` | `0px` |
| `onepager-phase` | `.sk-phase--print` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `onepager-phase` | `.sk-phase--print` | `border-left-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `onepager-phase` | `.sk-phase--print` | `border-top-left-radius` | `10px` | `0px` |
| `onepager-phase` | `.sk-phase--print` | `padding-top` | `9px` | `0px` |
| `onepager-phase` | `.sk-phase--print` | `padding-right` | `11px` | `0px` |
| `onepager-phase` | `.sk-phase--print` | `padding-bottom` | `9px` | `0px` |
| `onepager-phase` | `.sk-phase--print` | `padding-left` | `11px` | `0px` |

### H

**Decision H — the phase badge clears AA.** `.sk-phase-badge` filled with `--sk-indigo-2`
(#6366f1) put white on 4.47:1, missing AA by 0.03 at the badge's 10px. It was carried as a
KNOWN row through the Phase 3 pass because fixing it is a visible colour change and it was not
in the approved set. Closed 2026-08-14 by filling with `--sk-indigo` (#4338ca), which is 7.9:1
and is already the accent the same component uses for `--sk-phase-accent`, so the badge and its
rail now agree on one indigo instead of two.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `phase` | `.sk-phase-badge` | `background-color` | `rgb(99, 102, 241)` | `rgb(67, 56, 202)` |

### I

**Decision I — the title stops moving (2026-08-14, the deck-on-kit pass).** `.sk-slide` was
`justify-content: center`, copied faithfully from `.card-frame`. That makes a slide title's
vertical position a function of how much content sits BELOW it, so the headline walks up and
down the screen as the deck advances — and in a live presentation the transition is what you
see. deck-research §D.1 calls it "the highest-value single change in this document" and §D.5
ranks it the single most visible "homemade" tell there is.

**Measured, not asserted.** `node deck/probe/measure.mjs --source` reports the shipped
`synos-vc-deck-v6.html` landing its `h1` at **25 distinct top offsets across 35 slides,
spanning 175px — 24.3% of stage height**. The same probe on the deck rebuilt on this kit
reports **2 positions and a 32px spread**: one value for the default frame, one for the tighter
`arch` frame, which is exactly G1's stated success criterion of `distinctH1Tops ≤ 2`.

This is the one place in three passes where the kit deliberately stops reproducing the source
rather than reproducing it exactly, on a defect the source is known to have. It stayed undone
through the whole improvement pass for a good reason — nothing consumed the kit, so there were
no real slides on which a moving headline could be seen. Building a real deck is what made it
visible, and fixing it is one declaration.

The cost, accepted in advance by G1: sparse slides now carry their slack at the bottom rather
than split top and bottom, which reads as unfinished until the eye adjusts.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `slide-frame-default` | `.sk-slide` | `justify-content` | `center` | `flex-start` |
| `slide-frame-arch` | `.sk-slide` | `justify-content` | `center` | `flex-start` |

### J

**Decision J — the pillar card comes back (2026-08-15). A partial reversal of C, on review.**
Decision C removed the 1px `--sk-border` hairline from grouped cards and opened the grid gap to
replace it, on the measured argument that a 1.23:1 line is invisible on a projector while still
fragmenting the layout. That argument holds everywhere it was applied EXCEPT `PillarGrid`, and
Anoop caught the exception by looking at the rendered architecture slide: five bare text blocks
sitting beside one filled gradient card, rows top-aligned and ragging against it. Nothing failed
— boxes, contrast and the overflow probe were all green on the version that looked wrong.

The distinction the reversal draws: **a border that decorates a group can go; a border that IS
the group has to stay.** In every other grid the cards are prose blocks and the gap reads as the
separation. In `PillarGrid` the cards are objects in a diagram, one of them is a filled gradient
panel, and without a card of their own the other five stop being the same kind of thing as it.

So `.sk-pillar` regains `--sk-surface-2`, a 1px `--sk-border` and an 11px radius; the grid gains
`align-items: stretch` so the rows stop ragging. The numbers below are the shipped values, and
they are tuned rather than restored: padding is **8px 10px**, not the source's 7px 11px, and the
gap is `--sk-space-4` (12px), not 7px — at 12px padding the architecture slide overflowed the
card by 16px, and every pixel here is spent against a diagram that has to fit. The de-box
decision stands unchanged for `WallGrid`, `UseCaseGrid`, `StepGrid` and `Callout`.

| Specimen | Selector | Property | Source | Built |
|---|---|---|---|---|
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-top` | `7px` | `8px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-right` | `11px` | `10px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-bottom` | `7px` | `8px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-left` | `11px` | `10px` |
| `pillar` | `.sk-pillar-grid` | `gap` | `7px` | `12px` |

## Recorded conflicts — differences that are correct

### `eyebrow-buyer-conflict`

C4: the buyer decks run the eyebrow at 10px / margin-bottom 8px. The newest deck wins at 11.5px / 11px. This check is expected to differ and is kept as evidence of the conflict.

- `margin-bottom`: source `8px` · built `11px`
- `font-size`: source `10px` · built `13px` — also moved by C
