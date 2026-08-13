# Brand Kit — improvement pass, Phase 3 report

What changed, why, what it was measured against, and what I did not do.

Branch `feat/brand-kit-improve-aug13`, four commits, nothing merged and nothing pushed. The kit has
**not** been re-synced to the `SynOS Brand Kit` design project — that is Anoop's step after review.

Companions: `2026-08-13-brand-kit-improvement-pass.md` (the pass), `2026-08-13-deck-research.md`
(the research, including the correction block on reading vs presenting decks),
`~/ws/synos-gtm/docs/superpowers/specs/2026-08-13-design-system-state.md` (the state doc).

---

## 0. Bottom line

| | Before | After | Target | |
|---|---|---|---|---|
| Fidelity specimens passing | 27/27 (as a spec) | 27/27 (as a regression net) | — | ✅ |
| Fidelity checks | 103 | 104 | never fewer | ✅ |
| Assertions deleted | — | **0** | 0 | ✅ |
| Assertions updated with a recorded reason | — | **84** | all failing ones | ✅ |
| Unexpected AA failures introduced | — | **0** | 0 | ✅ |
| AA failures fixed | — | **2** (decisions B, E) | 2 | ✅ |
| Font families loaded | 3 | 3 | 3 | ✅ |
| Type scale adjacent ratios | 1.89 / 1.06 / 1.06 / 1.39 | 1.54 / 1.30 / 1.25 / 1.23 | ≥ 1.2 throughout | ✅ |
| Panels per composed slide (mean) | 12.0 | 9.2 | — | ↓ 23% |
| Boxes per composed slide (mean) | 12.6 | 11.6 | ≤ 6 | ❌ **not met** |
| Boxes per composed slide (max) | 20 | 15 | ≤ 15 | ✅ |
| Content nesting depth | 2 | 2 | ≤ 2 | ✅ |
| Literal colours in components | 6 | **0** | 0 | ✅ |

The one target missed is the de-box mean, and it is missed for a scope reason rather than an
execution reason. §6 says exactly where the remaining budget sits and what it would cost to close.

Reproduce all of it:

```bash
cd packages/brand-kit
npm run build        # tsc + css-lint + vite
npm run fidelity     # 27 specimens, 104 computed-style checks
npm run contrast     # every text/surface pair a component forms
npm run boxes        # box count and nesting on five composed slides
```

---

## 1. What changed, by decision

### A — Instrument Serif as the display face

`--sk-font-display` is now `'Instrument Serif', Georgia, serif`. Plus Jakarta Sans is gone from
`tokens.css` and from the font load. It is retired outright rather than demoted, because a display
face that is used for nothing is drift, and the research's case against it is that it is the modal
face of the free-template ecosystem — it cannot make a deck read expensive because it is exactly
what an inexpensive deck also uses.

The face is scoped to **three roles and no others**: `h1`, `.sk-cover-title`, `.sk-stat-value`.
Everything that used to read `--sk-font-display` now reads `--sk-font-body` — `h2`, `h3`, every
card title, every print heading — at unchanged size. That is not a compromise, it is the
constraint: Instrument Serif loses its thin strokes first under projector gamma, so it must never
render below 24px, and `h2` at 26px is the only other element in the system that would even
qualify. It stays Inter so the face change reads as a deliberate two-role system rather than a
find-and-replace.

**Every 700/800 it replaced was re-solved with size, never with weight**, because the face has one
weight:

| Role | Was | Now | Why that size |
|---|---|---|---|
| `h1` | 34px / 700 PJS | 40px / 400 serif | 5.56%EH; the one element that already cleared AVIXA's lecture preset now clears it wider |
| `.sk-cover-title` | 47px / 800 PJS | 56px / 400 serif | keeps the cover a clear step above `h1` |
| `.sk-stat-value` | 48px / 800 PJS | **72px** / 400 serif | see below |

The stat value took the largest step and it is the one place I overrode my own first answer. I
built it at 56px, rendered it, and it read thin — a stat value's whole job is to be the loudest
thing on the slide, and 400 weight at roughly the old size does not do that. Size is the only lever
the face leaves. 72px is 10%EH, which also puts the one number a partner is meant to remember well
clear of every projection floor in the research.

One knock-on worth naming: **Inter's load gained weight 800**. Five one-pager headings
(`.sk-ph-brand`, `.sk-ph-title`, `.sk-sh-title`, `.sk-cta-title`, `.sk-cta-right b`) were genuinely
Plus Jakarta Sans 800. Moving them to Inter without extending the load would have silently dropped
them to 700 — a visible lightening nobody asked for. Extending the load also makes four small
labels that were *already* declaring 800 on Inter (`.sk-phase-when`, `.sk-callout-label`,
`.sk-eyebrow--print`, and the print phase title) render at the weight they always claimed; they
were clamping to 700 before. That is a small, real, previously-invisible change and it is recorded
here rather than left to be discovered.

### B — the gradient ends at `--sk-violet-ink`

`--sk-grad` is now `linear-gradient(135deg, var(--sk-indigo-2), var(--sk-violet-ink))`. Written as
token references, not hexes, so the gradient cannot drift away from the palette it is made of. No
new token: `#4c1d95` was already `--sk-violet-ink`.

This is an accessibility fix. Numbers in §3.

**The part that needed more than the token change.** Ending the ramp darker fixes the far half. The
light end is unchanged, so it remains the binding constraint — and the Company Brain block set its
kicker at `rgba(255,255,255,0.8)` and its description at `0.88`, which fail at *any* point on this
ramp's first half. Both are now solid `--sk-on-brand`. The kicker stays subordinate to the name by
tracking (1.2px → 1.6px) rather than by being faded: the same substitution decision A forces on
weight, applied to opacity.

`--sk-on-brand` is new and is the only white in the system. `--sk-on-brand-scrim` is the icon
tile's translucent fill — a decorative surface, explicitly never a text colour. Adding these two
removed **all six** literal colours from components — three `#fff` (the brain icon, the brain name,
the phase badge) and three `rgba(255,255,255,…)` — which the kit's own token file had always
claimed did not exist.

### C — the type scale, and de-boxing

**Scale: 34 / 18 / 17 / 16 / 11.5 → 40 / 26 / 20 / 16 / 13.**

| Step | Was | Now | Ratio to next step down |
|---|---|---|---|
| `h1` | 34 | 40 | 1.54 |
| `h2` | 18 | 26 | 1.30 |
| `h3` | 17 | 20 | 1.25 |
| `p` / `li` | 16 | 16 | 1.23 |
| eyebrow | 11.5 | 13 | — |

The old scale's defect was not that it was small, it was that `h2`, `h3` and `p` spanned 18→16px —
three semantic levels inside a 12.5% range, which is 4.5 / 4.25 / 4.0px at Hale's 25% zoom. Every
adjacent ratio now clears 1.2, so hierarchy is carried by size, which is what frees colour and
weight from having to carry it.

Two follow-ons, both on the scale rather than beside it: `.sk-split-eyebrow` 11.5 → 13px (a column
eyebrow is the same register as a slide eyebrow; there is no reason for two eyebrow sizes in one
system), and `.sk-cover-foot` 12 → 13px (a tracked uppercase line is the eyebrow register).

**De-box.** Nesting capped at 2, a group's outer container gives up its border in favour of space,
and 1px `--sk-border` hairlines go in most positions — they are 1.23:1, invisible on a projector
while still fragmenting the layout.

| Component | What went | What stayed, and why |
|---|---|---|
| `WallCard` | fill, hairline, radius, most padding; gap 12 → 22px | the 3px red left rule — it is the signal, not the box |
| `PillarCard` | fill, hairline, radius, padding; gap 7 → 18px | the tinted icon tile (the one place colour is spent per pillar) and the Company Brain gradient (the one "this is us" object) |
| `UseCaseCard` | the hairline; gap 12 → 16px | the fill — three stacked text levels need a surface. The flagship keeps its 1.5px indigo border: an exception that is the only bordered object on the slide actually reads as one |
| `StepCard` | the step's hairline; the quote's fill AND hairline; gap 14 → 16px | the step fill, the gradient cap, and the quote's 3px violet rule. This was the nesting case — step and quote were drawing the same rectangle twice |
| `Callout` | the 1px border, in **every** tone and at **both** scales | the tint and the accent rule. A callout is now a tint plus a rule, always. The `banner` variant keeps its deliberate 1.5px border |

`--sk-callout-br` was deleted: after the border went, every tone still set it and nothing painted
it. A token that is assigned and never read is the drift this pass exists to remove.

The Callout change applies to print as well as deck deliberately. A print-only exception would be
exactly the "one more variant" the pass warns about, and the research found the same box-nesting
habit on the one-pagers (17–30 bordered boxes per A4 page).

### D — the cover paragraph is optional, and the register decides

Structurally `lede` was already optional, so nothing needed removing — which is the point. What was
missing was the *rule*, and it now lives on the prop where a deck author will actually meet it:

- **Reading deck** (`synos-vc-deck-v6.html`, 35 slides, zero `class="notes"` blocks) — the artifact
  that is sent, read on a laptop with no presenter. **Set `lede`.**
- **Presenting deck** (`synos-vc-deck-presenting.html`, same 35 slides, 22 note blocks) — shown with
  a presenter who says the paragraph out loud. **Omit `lede`**, put the text in that slide's
  `<aside class="notes">`.

`CoverSlide` now carries both as worked `@example` blocks. Deleting the slot, as G10 originally
proposed, would have made the reading deck worse in order to fix the presenting deck.

One size change: the slot was 12.3px, **smaller than the 13px eyebrow above it** — an inverted
hierarchy. It is a paragraph, so it is now set at the scale's paragraph step, 16px.

### E — `.sk-stat--amber`

One line. `--sk-amber-2 #f59e0b` → `--sk-amber #92400e`. Numbers in §3.

Worth noting *why* this one mattered more after decision A than before it: once the display face
has no bold, the stat value's emphasis rests on size and hue alone. Hue became load-bearing in the
same pass that would have left it illegible.

---

## 2. Every fidelity assertion that changed, and why

**Zero assertions were deleted. Zero were loosened.**

The harness was a spec while the kit was being extracted. It is now a regression net, and the
mechanism reflects that. A check may carry an `intentional` map naming, per property, the value the
source has and the value the kit deliberately took instead, plus the decision key that moved it.

This is strictly **stronger** than the check it replaces:

| | Old check | New check |
|---|---|---|
| Asserts | built == source | source == recorded old value **and** built == recorded new value |
| Fails if the kit drifts | ✅ | ✅ |
| Fails if the *source artifact* changes underneath us | ❌ | ✅ |

So the assertion is not "this may now differ" — it is "this differs by exactly this much, in this
direction, for this reason, and both ends are pinned." The runner reports `built drifted off its
recorded value` and `source moved: the recorded source value was X, it now reads Y` as distinct
failures.

**One assertion was added**, not removed: nothing in the 103-check harness pinned the amber stat
variant's value colour. That is how a 2.05:1 contrast failure survived a 103-check harness. It is
pinned now (`.stat-card.a .n` → `.sk-stat--amber .sk-stat-value`, `color`).

`expectFail` keeps its old grading. Those specimens document a conflict between two source
artifacts and are *meant* to carry a real difference, so they are still graded on "something
differs" rather than on this pass's changes. The `eyebrow-buyer-conflict` specimen's
`margin-bottom` is deliberately left un-recorded for exactly that reason: its `font-size` gap is
now two effects stacked (1.5px of conflict C4 plus decision C) and conflating them would let the
pass's own change satisfy a check that exists to prove something else.

Counts: **A 24 · B 4 · C 53 · D 2 · E 1 = 84.** Full table:

#### Decision A — 24 assertions

| Specimen | Selector | Property | Source says | Kit says |
|---|---|---|---|---|
| `big-type` | `.sk-bigtype-l1` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `big-type` | `.sk-bigtype-l2` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `big-type` | `.sk-bigtype-punch` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `cover` | `.sk-cover-lead` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `cover` | `.sk-cover-title` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `"Instrument Serif", Georgia, serif` |
| `cover` | `.sk-cover-title` | `font-size` | `47px` | `56px` |
| `cover` | `.sk-cover-title` | `font-weight` | `800` | `400` |
| `cover` | `.sk-cover-title` | `letter-spacing` | `-1.4px` | `-1.12px` |
| `cover` | `.sk-cover-title` | `line-height` | `49.82px` | `58.24px` |
| `onepager-header` | `.sk-ph-brand` | `font-family` | `"Plus Jakarta Sans"` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `phase` | `.sk-phase-title` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain) .sk-pillar-name` | `font-family` | `"Plus Jakarta Sans", sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `slide-frame-arch` | `.sk-slide h1` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `"Instrument Serif", Georgia, serif` |
| `slide-frame-arch` | `.sk-slide h1` | `font-weight` | `700` | `400` |
| `slide-header-row` | `.sk-header--row h1` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `"Instrument Serif", Georgia, serif` |
| `slide-header-row` | `.sk-header--row h1` | `font-weight` | `700` | `400` |
| `slide-header-row` | `.sk-header--row h1` | `letter-spacing` | `-0.34px` | `-0.6px` |
| `slide-header-row` | `.sk-header--row h1` | `line-height` | `40.8px` | `44.8px` |
| `stat` | `.sk-stat-value` | `font-family` | `"Plus Jakarta Sans"` | `"Instrument Serif", Georgia, serif` |
| `stat` | `.sk-stat-value` | `font-size` | `48px` | `72px` |
| `stat` | `.sk-stat-value` | `font-weight` | `800` | `400` |
| `stat` | `.sk-stat-value` | `line-height` | `48px` | `72px` |
| `step` | `.sk-step-title` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |
| `usecase` | `.sk-usecase-title` | `font-family` | `"Plus Jakarta Sans", Inter, sans-serif` | `Inter, -apple-system, "Segoe UI", sans-serif` |

#### Decision B — 4 assertions

| Specimen | Selector | Property | Source says | Kit says |
|---|---|---|---|---|
| `pillar-brain` | `.sk-pillar--brain` | `background-image` | `linear-gradient(135deg, rgb(99, 102, 241), rgb(124, 58, 237))` | `linear-gradient(135deg, rgb(99, 102, 241), rgb(76, 29, 149))` |
| `pillar-brain` | `.sk-pillar--brain .sk-pillar-kicker` | `color` | `rgba(255, 255, 255, 0.8)` | `rgb(255, 255, 255)` |
| `pillar-brain` | `.sk-pillar--brain .sk-pillar-kicker` | `letter-spacing` | `1.2px` | `1.6px` |
| `step` | `.sk-step-bar` | `background-image` | `linear-gradient(135deg, rgb(99, 102, 241), rgb(124, 58, 237))` | `linear-gradient(135deg, rgb(99, 102, 241), rgb(76, 29, 149))` |

#### Decision C — 53 assertions

| Specimen | Selector | Property | Source says | Kit says |
|---|---|---|---|---|
| `callout-deck` | `.sk-callout` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(51, 65, 85)` |
| `callout-deck` | `.sk-callout` | `border-top-width` | `1px` | `0px` |
| `cover` | `.sk-cover-foot` | `font-size` | `12px` | `13px` |
| `cover` | `.sk-cover-foot` | `line-height` | `15.6px` | `16.9px` |
| `cover` | `.sk-cover-lead` | `font-size` | `16.5px` | `20px` |
| `cover` | `.sk-cover-lead` | `font-weight` | `700` | `600` |
| `cover` | `.sk-cover-lead` | `line-height` | `22.275px` | `27px` |
| `eyebrow-buyer-conflict` | `.sk-eyebrow` | `font-size` | `10px` | `13px` |
| `eyebrow-indigo` | `.sk-eyebrow--indigo` | `font-size` | `11.5px` | `13px` |
| `eyebrow-indigo` | `.sk-eyebrow--indigo` | `line-height` | `14.95px` | `16.9px` |
| `eyebrow-red` | `.sk-eyebrow--red` | `font-size` | `11.5px` | `13px` |
| `eyebrow-red` | `.sk-eyebrow--red` | `line-height` | `14.95px` | `16.9px` |
| `eyebrow-violet` | `.sk-eyebrow--violet` | `font-size` | `11.5px` | `13px` |
| `eyebrow-violet` | `.sk-eyebrow--violet` | `line-height` | `14.95px` | `16.9px` |
| `onepager-callout-chip` | `.sk-callout--print` | `border-top-color` | `rgb(254, 202, 202)` | `rgb(51, 65, 85)` |
| `onepager-callout-chip` | `.sk-callout--print` | `border-top-width` | `1px` | `0px` |
| `pillar` | `.sk-pillar-grid` | `gap` | `7px` | `18px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `background-color` | `rgb(248, 250, 252)` | `rgba(0, 0, 0, 0)` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-left-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-left-width` | `1px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-top-left-radius` | `11px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `border-top-width` | `1px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-bottom` | `7px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-left` | `11px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-right` | `11px` | `0px` |
| `pillar` | `.sk-pillar:not(.sk-pillar--brain)` | `padding-top` | `7px` | `0px` |
| `slide-frame-arch` | `.sk-slide h1` | `font-size` | `34px` | `40px` |
| `slide-frame-arch` | `.sk-slide h2` | `font-size` | `18px` | `26px` |
| `slide-header-row` | `.sk-header--row h1` | `font-size` | `34px` | `40px` |
| `slide-header-row` | `.sk-header--row h1` | `margin-bottom` | `10px` | `12px` |
| `split` | `.sk-split-eyebrow` | `font-size` | `11.5px` | `13px` |
| `step` | `.sk-step` | `border-left-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `step` | `.sk-step` | `border-left-width` | `1px` | `0px` |
| `step` | `.sk-step` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `step` | `.sk-step` | `border-top-width` | `1px` | `0px` |
| `step` | `.sk-step-grid` | `gap` | `14px` | `16px` |
| `step` | `.sk-step-quote` | `background-color` | `rgb(255, 255, 255)` | `rgba(0, 0, 0, 0)` |
| `step` | `.sk-step-quote` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(51, 65, 85)` |
| `step` | `.sk-step-quote` | `border-top-left-radius` | `7px` | `0px` |
| `step` | `.sk-step-quote` | `border-top-width` | `1px` | `0px` |
| `step` | `.sk-step-quote` | `padding-bottom` | `7px` | `2px` |
| `step` | `.sk-step-quote` | `padding-right` | `10px` | `0px` |
| `step` | `.sk-step-quote` | `padding-top` | `7px` | `2px` |
| `usecase` | `.sk-usecase-grid` | `gap` | `12px` | `16px` |
| `wall` | `.sk-wall` | `background-color` | `rgb(248, 250, 252)` | `rgba(0, 0, 0, 0)` |
| `wall` | `.sk-wall` | `border-top-color` | `rgb(226, 232, 240)` | `rgb(15, 23, 42)` |
| `wall` | `.sk-wall` | `border-top-left-radius` | `10px` | `0px` |
| `wall` | `.sk-wall` | `border-top-width` | `1px` | `0px` |
| `wall` | `.sk-wall` | `padding-bottom` | `12px` | `2px` |
| `wall` | `.sk-wall` | `padding-right` | `14px` | `0px` |
| `wall` | `.sk-wall` | `padding-top` | `12px` | `2px` |
| `wall` | `.sk-wall-grid` | `gap` | `12px` | `22px` |

#### Decision D — 2 assertions

| Specimen | Selector | Property | Source says | Kit says |
|---|---|---|---|---|
| `cover` | `.sk-cover-lede` | `font-size` | `12.3px` | `16px` |
| `cover` | `.sk-cover-lede` | `line-height` | `18.45px` | `24px` |

#### Decision E — 1 assertions

| Specimen | Selector | Property | Source says | Kit says |
|---|---|---|---|---|
| `stat` | `.sk-stat--amber .sk-stat-value` | `color` | `rgb(245, 158, 11)` | `rgb(146, 64, 14)` |
`fidelity/report/fidelity.md` regenerates this grouping on every run, so it cannot go stale.

---

## 3. Contrast, before and after

Every text/surface pair a component actually forms, recomputed with the WCAG 2.x relative-luminance
formula. `npm run contrast`.

Gradients are sampled **along their own axis at the point where text actually sits**, not at the
endpoints. The Company Brain pillar is 833 × 62px on the 1380 slide and its text starts 68px in
(16px pad + 38px icon + 14px gap), so the leftmost, lightest glyph sits at t ≈ 0.11 — not at t = 0,
which is a corner behind the icon tile that no glyph reaches. Sampling only the endpoints answers
the wrong question in both directions.

### The two failures this pass fixed

| Pair | Before | After | Needs |
|---|---|---|---|
| `.sk-stat--amber` value on `--sk-surface-2` | **2.05:1** ❌ (failed even the 3:1 large-text floor, at 72px) | **6.78:1** ✅ | 3.0 |
| Brain kicker, white @ 0.8, at the text's left edge | **3.55:1** ❌ | **4.94:1** ✅ (solid `--sk-on-brand`) | 4.5 |
| Brain description, white @ 0.88, at the text's left edge | **3.96:1** ❌ | **4.94:1** ✅ | 4.5 |
| Brain text, mid-ramp | 3.89:1 ❌ @0.8 | **7.04:1** ✅ | 4.5 |
| Brain text, far end | 4.22:1 ❌ @0.8 | **10.95:1** ✅ | 4.5 |

Both fixes hold across the whole gradient, not just at the end that moved. That is the point of the
opacity removal: the token change alone would have left the light half failing.

### Gradient travel, for completeness

| | ΔL | ΔE_ok | White at far end |
|---|---|---|---|
| Before, `#6366f1 → #7c3aed` | −0.044 | 0.087 | 5.70:1 |
| After, `#6366f1 → #4c1d95` | **−0.206** | **0.215** | **10.95:1** |

2.5× the perceptual travel, and the first time the ramp moves lightness — which is the channel the
eye reads a gradient by.

### Everything else

35 of 38 gated rows pass. The three that do not are all **pre-existing and all outside the approved
set** — see §5. The probe exits non-zero only on an *unexpected* failure, so those three stay
visible in every run rather than being absorbed into a green tick. **This pass introduced no AA
failure.**

Also now on the record as `guard` rows, which pass by being *below* threshold: `--sk-ink`,
`--sk-violet-ink` and `--sk-indigo-ink` on the gradient's far end are 1.63:1, 1.00:1 and 1.04:1. No
component puts dark text on a gradient surface, and the numbers proving why nobody should are in
the probe instead of in a comment.

---

## 4. De-boxing, measured — and the target that was missed

The research's numbers (mean 11.0 boxes, max 46, nesting 4) are **per slide**. Nothing consumes the
kit yet, so there are no real slides. My first attempt measured the 27 fidelity specimens, and I
threw that measurement out: the specimen corpus scored mean 4.2 / max 11 *before* this pass, so it
was already inside the target and could not show a delta. Each specimen is one small component
group, not a slide.

So `tools/boxes.mjs` composes **five whole slides** from the real components at real deck density —
the six walls, the six-pillar architecture slide, the three-horizon play, the demo storyboard, the
moat split — and counts those. The specimens are still counted, and labelled explicitly as not a
gate.

One refinement to the metric, stated so it does not read as moving the goalposts. §D.4's definition
scores a 3px accent rule identically to a nested filled rounded rectangle — and converting the
second into the first is precisely what de-boxing does. So boxes are additionally split into
**panels** (a fill, or borders on 3+ edges — a container) and **rules** (1–2 edges — a mark). The
`boxes` total stays comparable to §D.4; `panels` is what shows the work. Nesting is likewise
reported twice: raw, and with the `.sk-slide` card discounted once, since the artifact's own edge
is on every slide in every deck ever made and is not a composition choice.

| | Before | After | Target |
|---|---|---|---|
| Boxes, mean | 12.6 | 11.6 | ≤ 6 ❌ |
| Boxes, max | 20 | **15** | ≤ 15 ✅ |
| **Panels, mean** | 12.0 | **9.2** | — ↓ 23% |
| Content nesting depth | 2 | 2 | ≤ 2 ✅ |

Per slide: `architecture` 20 → 15, `demo` 15 → 15 (12 panels + 3 rules), `six-walls` 8 → 8 (2
panels + 6 rules), `the-play` 13 → 13, `moat` 7 → 7.

**The mean-boxes target of 6 is not met, and it cannot be met within the approved scope.** Here is
the entire residual budget across the five slides:

| Panels | Component | In decision C's scope? |
|---:|---|---|
| 10 | `.sk-chip` | no — and a chip is definitionally a box; this is the vocabulary, not drift |
| 6 | `.sk-pillar-ico` | kept deliberately: the one place colour is spent per pillar |
| 5 | `.sk-slide` | the slide card itself, one per slide |
| 3 | `.sk-callout` | in scope; keeps its tint by design |
| 3 | `.sk-phase` | **no** |
| 3 | `.sk-phase-badge` | **no** |
| 3 | `.sk-stat` | **no** |
| 3 | `.sk-step` | in scope; keeps its fill by design |
| 3 | `.sk-step-bar` | the gradient cap |
| 3 | `.sk-usecase` | in scope; keeps its fill by design |
| 2 | `.sk-split-col` | **no** |
| 1 | `.sk-pillar` (brain) | kept deliberately |
| 1 | `.sk-quote` | **no** |

Reaching mean ≤ 6 needs `PhaseCard`, `StatCard`, `SplitColumn` and `QuoteBar` de-boxed too, and
probably the chip reduced to a text token. Those are four more components and a vocabulary change,
none of them rendered, none of them approved. **That is Anoop's call, not mine.** My
recommendation: take `PhaseCard`, `StatCard` and `SplitColumn` in a follow-on (they are the same
argument as `UseCaseCard` and would land the mean near 7), and leave the chip alone — a chip that is
not a box is a different component.

### The cost G9 predicted, and it arrived

The research warned that de-boxing "is the change most likely to expose that the kit has no grid
system," and it did. With their fills removed, the pillar cards sit in 3 × 440px grid tracks
holding ~30 characters each, so the row reads as scattered text rather than as three columns. The
fill used to make that whitespace read as card padding.

I did not fix this, and deliberately: fixing it properly means giving the kit a column grid, which
is a new subsystem, is not in decisions A–E, and has not been rendered for review. Patching it at
component level (capping the text measure) would hide the symptom and leave the kit still without a
grid. **A column grid is the single thing I would put next on the list.** See §7.

---

## 5. Found but not fixed

Three live WCAG AA failures the contrast probe surfaced that are **not** in the approved set. All
three are pre-existing — none was introduced by this pass. I did not fix them, because each is a
visible colour change and the pass's own rule is that Anoop sees a change before it ships.

| Pair | Ratio | Where | Fix I'd propose |
|---|---|---|---|
| `--sk-teal` on `--sk-teal-bg` | **3.59:1** | `.sk-eyebrow-badge`, 7.5px teal on teal tint | a darker teal token — teal-800 `#115e59` is 6.9:1. Needs a **new token**; `--sk-teal #0d9488` is already the darkest teal in the file |
| `--sk-teal` on `--sk-surface` | **3.74:1** | `.sk-ph-tag`, 9px teal on white | same fix |
| `--sk-on-brand` on `--sk-indigo-2` | **4.47:1** | `.sk-phase-badge` default fill | `--sk-indigo #4338ca` is 7.9:1. Short of AA by 0.03 — marginal, but it is a fail |

The state doc and the pass document both said "the kit currently has no known AA failure." The
research corrected that to two. **It is three**, and the teal pair is the one nobody has counted
yet. It is also the one that needs a token that does not exist, which is why it is the least
convenient to fix and the most likely to keep being skipped.

Two more things I found and left alone:

- **`--sk-dim` and `--sk-indigo-3`** are still declared and still referenced by no component (2.56:1
  and 2.98:1). G7 proposed retiring them; that was not in the approved set. They remain loaded guns
  for the next deck author.
- **`--sk-font-serif: 'Source Serif 4'`** is still declared for the founder memo and used by no
  component. Now that a real serif is in the system, a second unused one is a trap. It is a
  one-line deletion whenever someone confirms the memo is out of scope for the kit.

---

## 6. Rejected, and why

**A blanket 14px type floor (G3).** The single largest gap in the research and I did not touch it.
It is not in decisions A–E, and more importantly it is not a kit decision: raising 22 declarations
above 14px makes every dense slide overflow, which forces content off slides. The kit cannot make
that call. Decision C raised the eyebrow — the one label on 144 of 148 slides — and stopped there.

**Instrument Serif on the big-type statement lines.** `.sk-bigtype-l1` and `l2` are 44px and 48px,
comfortably above the 24px floor, and a "statement slide" is exactly where a display serif wants to
be. They stayed Inter because decision A says "h1, the cover headline and stat values ONLY.
Everything else stays Inter," and I read that as binding rather than as a rough sketch. **Flagging
it as the one place I think the scope may be a beat too tight**: a 48px Inter-800 statement line
sitting between a 40px serif `h1` and a 72px serif stat value is a register split inside one deck.
It is a two-line change if Anoop wants it.

**Dropping the `.sk-slide` hairline.** The slide card carries both a 1px `--sk-border` and a shadow;
the border is redundant against the shadow and removing it would take one box off *every* slide —
the single highest-leverage de-box available. Not done: `SlideFrame` is not in decision C's list,
and the card edge against the grey stage is a different question from the boxes drawn on it.

**Adding a column grid.** The right fix for §4's pillar-scatter problem, and out of scope. A new
layout subsystem is not a de-box.

**Fixing the three AA failures in §5.** Each needs a colour change Anoop has not seen, and one needs
a new token. Reported instead.

**Loosening any assertion to make a run green.** Considered and rejected on the obvious grounds; the
`intentional` mechanism exists so that the alternative was never necessary. The
`eyebrow-buyer-conflict` specimen is the sharpest case — the easy move was to record its
`margin-bottom` divergence too and get a clean CONFLICT verdict. That would have let decision C's
change satisfy an assertion whose entire job is to prove a *source* conflict. It is left failing-by-
design instead.

---

## 7. What I would do next, in order

1. **Give the kit a column grid.** De-boxing exposed that there isn't one (§4). Everything else in
   the composition backlog is downstream of it.
2. **Decide the three AA failures in §5.** The teal one needs a new token; the phase badge is a
   one-word swap.
3. **Decide the four remaining de-box candidates** (`PhaseCard`, `StatCard`, `SplitColumn`,
   `QuoteBar`) — that is the mean-boxes target, and it is a scope decision.
4. **Build one real deck on the kit.** Nothing consumes it. Until something does, every measurement
   in this report is against a proxy I composed, and none of these improvements reaches a VC. This
   is still the largest open item in the whole thread and it has not moved.
5. **Then** re-sync to the design project.

---

## 8. Commits

| | |
|---|---|
| `a1ff964` | `fix(brand-kit)` — decisions B and E, the two AA fixes |
| `bdd408a` | `feat(brand-kit)` — decisions A, C and D |
| `6c1160a` | `test(brand-kit)` — contrast, box-count and CSS lint probes |
| `f014ef0` | `test(brand-kit)` — recorded divergences in the fidelity harness |

### One incident worth recording

While rendering the stat value at 72px I wrote a CSS comment describing it as `**72px**/400`. Two
asterisks followed by a slash is a comment terminator. The comment closed on its own first line,
every rule after it stopped being CSS, `vite build` reported success, and the stylesheet shipped
40% shorter. A fidelity assertion caught it — `.sk-stat-value` computing at 16px Inter — and
nothing else would have.

`tools/css-lint.mjs` now checks comment balance and, while it is walking the files, the kit's own
long-standing claim that no component carries a literal colour. Both are wired into `npm run build`
and both were verified against injected instances of the bugs they exist for. The literal-colour
rule reports clean now, but run against the pre-pass kit it flags six real violations in
`Cards.css` alone — the ones decision B removed on its way past. The rule is what stops them
coming back.
