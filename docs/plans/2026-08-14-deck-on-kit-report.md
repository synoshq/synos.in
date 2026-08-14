# The VC reading deck, rebuilt on the brand kit — report

Branch `feat/deck-on-kit-aug14` in `~/ws/synos-landing`. Built against
`docs/plans/2026-08-14-deck-on-kit-spec.md`. Three commits, nothing merged, nothing pushed, nothing
re-synced to the design project.

`~/ws/synos-gtm` was read only. No command in this work wrote to it, and no commit, checkout or
stash was run there. Its own PDF export script and verifier were executed against files in *this*
repo, and one comparison PDF of the source deck was written to `/tmp`.

Companions:

- `packages/brand-kit/deck/comparison/*.png` — **35 side-by-side renders. This is the thing to look
  at.** Source above, rebuild below, both at the deck's own 1280 × 720 stage.
- `packages/brand-kit/deck/out/synos-vc-deck-v6-kit.html` — the artifact. One file, 1.3 MB, nothing
  fetched at render time.
- `packages/brand-kit/deck/out/synos-vc-deck-v6-kit.pdf` — 35 pages, `verify_pdf.py` says SAFE.
- `packages/brand-kit/deck/probe/{source,rebuilt}.json` — every number below, per slide.

---

## 0. The verdict, first

**The kit can carry a real deck. It cannot yet carry this one unaided, and the gap is one specific
missing thing, not a general weakness.**

Concretely:

- **All 35 slides express.** Every one of the kit's 25 deck components was used at least once; none
  was found useless and none had to be added. **18 of 35 slides map onto components with no
  invention at all**; 10 more needed only deck-local geometry around kit components.
- **The h1 stopped moving**, which was the headline test: 25 distinct positions → 2, a 175px spread
  → 32px. That cost one CSS declaration and it is the clearest single piece of evidence that
  extracting the kit was worth doing.
- **Four slides genuinely resist**, and they resist for the same reason: they are *tables*, and the
  kit has no table. That is a real, nameable gap.
- **Eight slides overflowed the card**, and this is the finding that matters most. It is not a
  layout bug. It is that the kit has exactly one type scale, tuned for a presenting deck, and this
  is the reading deck. I made them fit with a deck-local second type scale, which is drift, and I
  am reporting it rather than hiding it.

**What the kit needs before the next deck, in order:** a density register, a column grid, a spacing
scale. §5 says what each one is. Until the first exists, every reading-deck rebuild will reinvent
`.dk-dense`, and two of those is a second design system again.

**What I would not do:** thin the deck. deck-research's correction block is right — v6 is sent
without a presenter and is supposed to carry more words than the presenting build. The overflow is
the kit's problem to solve, not the copy's.

---

## 1. What was built

`packages/brand-kit/deck/` — a build script, a deck definition, vendored assets and three probes.

| | |
|---|---|
| `build.mjs` | `renderToStaticMarkup` over the deck definition into a reveal.js shell → one self-contained `.html` |
| `src/deck.jsx` · `slides-main.jsx` · `slides-appendix.jsx` | the 35 slides, each commented with which component carried it |
| `src/diagrams.jsx` | the three bespoke SVGs, as deck content, explicitly not components |
| `src/deck.css` | everything the kit does not provide, in four named buckets |
| `vendor/reveal/` · `vendor/fonts/` | reveal.js 5.1.0 and 18 font faces, on disk |
| `probe/measure.mjs` | h1 geometry, the no-CDN check, resolved font families, per-slide overflow |
| `compare.mjs` | the 35 side-by-side renders |

The approach the spec decided — server-render at build time into the same portable single-file
`.html` the GTM repo already ships — held up with no friction. `_build_deck_pdf.py` ran against the
output unmodified. This is the same mechanism `fidelity/scripts/run-fidelity.mjs` and
`tools/boxes.mjs` already use, aimed at a whole deck.

Reproduce everything:

```bash
cd packages/brand-kit
npm run build                                  # tsc + css-lint + vite
node deck/build.mjs                            # -> deck/out/synos-vc-deck-v6-kit.html
node deck/probe/measure.mjs                    # gates on 0 off-disk, 3 families, <= 2 h1 positions
node deck/probe/measure.mjs --source           # the before column
node deck/compare.mjs                          # -> deck/comparison/, 35 pairs
python3 ~/ws/synos-gtm/presentations/_build_deck_pdf.py \
        deck/out/synos-vc-deck-v6-kit.html deck/out/synos-vc-deck-v6-kit.pdf
python3 ~/ws/synos-gtm/presentations/verify_pdf.py \
        deck/out/synos-vc-deck-v6-kit.pdf --slides 35
```

### It is a re-platforming, not a rewrite

Every sentence in the rebuild is the source deck's own text. The check, rather than the claim: both
PDFs were run through `pdftotext` and their vocabularies compared. Of ~1,110 distinct words of five
letters or more on each side, the *only* differences are text-extraction artifacts — the source's
letter-spaced eyebrows extract one character at a time (`l a n d s c a p e`) where the rebuild's
extract as words, its rotated quadrant axis label extracts backwards (`gninrael`), and a few
hyphenated compounds join differently. No sentence, statistic, company name or claim differs.

Extractable characters: 51,864 → 51,430, a 0.8% difference entirely accounted for by the above.

---

## 2. Slide by slide

**Clean** = kit components, nothing invented. **Composed** = kit components arranged with
deck-local geometry (a two-column grid, a gap). **Gap** = the kit has no expression for it.

| # | Slide | Verdict | What carried it |
|---|---|---|---|
| 1 | Cover | Clean + SVG | `CoverSlide` maps one-for-one: eyebrow / big / hero-sub / lede / children / foot. `.tagchip` row → `ChipRow` + `Chip size="pill"` |
| 2 | The premise | Clean | `.flow`/`.sc` → `PhaseRow`/`PhaseCard` exactly; `.honesty-row` → two `Callout`s |
| 3 | The gap | Clean | `BigTypeSlide`, all four slots |
| 4 | Where they are today | SVG | `SlideHeader` + the seam diagram |
| 5 | The trap | Composed | `.uc-grid` → `UseCaseGrid` exactly; `.land` → a `Callout` carrying an `h3` |
| 6 | What we built · job one | Composed | `PillarGrid`/`PillarCard` carry the six pillars; the harness row, MCP seam, `.d1-core` container, guardrails strip and systems row are composed from `Eyebrow`/`Chip`/`Callout`/`Caption` |
| 7 | The hard part | Clean | `.demo-grid`/`.demo-card` → `StepGrid`/`StepCard` exactly, bar/num/title/body/quote |
| 8 | The same environment, tomorrow | **Gap** | `.dual` is a 5 × 3 matrix. No table in the kit |
| 9 | What we're building · job two | Composed | as slide 6; the LIVE / IN BUILD status badges ride inside `PillarCard`'s `name`, which takes a node |
| 10 | The play | Clean | `PhaseRow` + `Caption` |
| 11 | How trust is earned | Composed | `.grad`/`.gcard` → `StepGrid`/`StepCard`; the `.garr` connector arrows are dropped, not faked |
| 12 | Why it compounds | SVG | `SlideHeader` + loop diagram + `Caption` + `Callout` |
| 13 | Who buys | Clean | `.icard` → `UseCaseCard`, which is the check that excluding `.icard` from the kit was right |
| 14 | The wedge | Composed | `.moat-split` → `SplitColumns`/`SplitColumn`/`SplitItem` exactly; `.sm-flow` composed from Chips |
| 15 | Traction | Composed | `.story-grid`'s 1.15fr/1fr split is deck-local; a `StepCard` and two `UseCaseCard`s inside it |
| 16 | Business model | Clean | `.bm`/`.bcard` → `PhaseRow`/`PhaseCard` with no badge |
| 17 | Landscape | **Gap** | a 6 × 7 capability matrix with four cell states |
| 18 | How we build differently | Clean | `.dfx`/`.dcard` → `StepGrid`/`StepCard` exactly |
| 19 | If models get better | Clean | `PhaseRow` + `Caption` |
| 20 | Why us | Clean | `.team-grid`/`.tcard` → `UseCaseGrid`; three `Callout`s |
| 21 | The round | Composed | `PhaseRow`; `.mstone` → a `Callout` carrying a `ChipRow` |
| 22 | Closing wordmark | Clean + SVG | `BigTypeSlide` with the seam in its `children` slot, which is what the slot is for |
| 23 | Appendix divider | Clean | `BigTypeSlide` |
| 24 | Appendix · What it is | Composed | `PillarGrid columns={5}` — the one place the kit lets a caller set a track count |
| 25 | Appendix · Status | Clean | `.stat-card` → `StatCard` exactly; track count overridden inline (no `columns` on `StatRow`) |
| 26 | Appendix · Where value | SVG | edge diagram + three `Callout`s + `QuoteBar` |
| 27 | Appendix · Why now | Clean | three `StatCard`s, a `Callout`, a `Caption`. The cleanest slide in the deck |
| 28 | Appendix · The shift | Clean | `SplitColumns` + an italic `Caption`, which is the class `Caption italic` was extracted from |
| 29 | Appendix · Built on the hard layer | Clean | `StepGrid` |
| 30 | Appendix · what runs on it | Clean | six `UseCaseCard`s, flagship included. Needed nothing else |
| 31 | Appendix · the data flywheel | Composed | `PhaseRow` at five columns, overridden inline; `.fw-pays` → `UseCaseGrid` |
| 32 | Appendix · Landscape detail | **Gap** | a 6 × 3 comparison table |
| 33 | Appendix · who is most like us | **Gap** | a 2 × 2 quadrant with two labelled axes |
| 34 | Appendix · the walls | Clean | `WallGrid`/`WallCard`, quote + tag. The most exact map in the corpus |
| 35 | Appendix · why the neutral layer wins | Composed | `.dk-cols` + `Eyebrow` + `ChipRow` + `Callout` |

**Totals: 18 clean, 10 composed, 4 gaps.** Five of those 35 (slides 1, 4, 12, 22, 26) additionally
carry a bespoke SVG; three of the five are otherwise nothing but a header and the diagram.

**Every one of the kit's 25 deck components was used.** Nothing in the kit turned out to be dead
weight, which is a real result for an extraction that ran on frequency counts rather than on a deck.
Usage, most to least: `Callout` 36, `SlideHeader`/`SlideFrame` 31, `Chip` 28, `UseCaseCard` 26,
`PhaseCard` 20, `PillarCard` 15, `Caption` 14, `StepCard` 13, `SplitItem` 12, `ChipRow` 11,
`WallCard`/`PhaseRow`/`Eyebrow` 6, then the rest.

`Callout` at 36 uses is the vindication of the extraction's largest single call — collapsing
seventeen near-identical tinted-callout classes into one component with props. It is doing more work
in this deck than any other component and it never needed a variant that did not exist.

### 2.1 No component was added to the kit

Per the spec. The only kit change in this work is one declaration in `SlideFrame.css`
(`justify-content`), which is a defect fix, is recorded as decision I in the fidelity harness, and
is discussed in §3. `deck/src/deck.css` holds everything else and is deck-local by design; its
header says so and says why nothing in it should migrate.

---

## 3. The h1 stops moving

This was the spec's clearest test and it passed.

| | Source `synos-vc-deck-v6.html` | Rebuilt on the kit |
|---|---|---|
| Slides with an `h1` | 31 / 35 | 31 / 35 |
| `h1` top, min .. max | 40px .. 215px | **37px .. 69px** |
| Spread | 175px = **24.3% of stage height** | **32px = 4.4%** |
| Distinct positions | **25** | **2** |

Two positions is the success criterion deck-research G1 set for itself: one value for the default
frame, one for the tighter `arch` frame. Nothing else in the deck moves the headline.

(deck-research §D.1 reported 27 positions and a 164px spread. This probe measures the `h1` top
relative to the card rather than to the stage and forces all 35 slides visible in one pass, which
is why the numbers differ by a few pixels. Same finding, same magnitude, and both are reproducible
— `node deck/probe/measure.mjs --source`.)

**The cause was one declaration.** `.sk-slide` carried `justify-content: center`, extracted
faithfully from `.card-frame`. A centring card makes a title's vertical position a function of how
much content sits below it. It is `flex-start` now, recorded as decision I, with both ends pinned in
the fidelity harness: the check still fails if the kit drifts *and* if the source artifact moves.

**Why this stayed broken through the whole improvement pass is the interesting part.** G1 was ranked
the highest-value single change in the research and it was not done, in a pass that did nine other
things. The reason is in the improvement report's own §14: *"nothing consumes the kit. Every number
in both halves of this report is measured against a proxy."* Five hand-composed proxy slides cannot
show a headline that moves, because a moving headline is a property of a *sequence*. Building the
real deck is what made it visible, and then it took one line.

One live demonstration of the same principle: while tuning the density register in §5 I added a
`.dk-dense .sk-eyebrow { margin-bottom: 6px }` rule. The probe immediately reported a third distinct
h1 position, because the eyebrow sits above the headline. The rule came straight back out. Without
the probe that would have shipped and quietly undone decision I on eight slides.

---

## 4. Nothing loads from a CDN

`node deck/probe/measure.mjs` runs with the network **refused**, not merely absent: every request
that is not `file:` or `data:` is recorded and aborted. A pass therefore means the artifact never
wanted the network.

| | Source | Rebuilt |
|---|---|---|
| Off-disk requests at render | **4** — Google Fonts, `reveal.css`, `theme/white.css`, `reveal.js` from jsDelivr | **0** |
| Font families rendered in the slides | 3 | 3 |
| Families embedded in the exported PDF | Inter, JetBrains Mono, Plus Jakarta Sans, **SourceSansPro-Semibold** | Inter, JetBrains Mono, **Instrument Serif** |

**The four-family leak is closed.** deck-research §C.4 found `Source Sans Pro` rendering on slide 33
and embedded in the shipped PDF, arriving from reveal's `theme/white.css`. The rebuild does not load
that theme at all — the ~10 rules it was actually providing (page background, body face, left-aligned
slide text, zeroed section padding) are written explicitly in the shell, and the kit supplies the
rest. The leak is closed by construction rather than by override, and `pdffonts` on the export
confirms Source Sans Pro is gone.

18 font faces are vendored (`latin` and `latin-ext` only; the full css2 response carries 51 across
Cyrillic, Greek and Vietnamese) and base64'd into the stylesheet. reveal.js 5.1.0's CSS and JS are
inlined from `deck/vendor/reveal/`.

### 4.1 One font finding that is NOT fixed, and is in both decks

`pdffonts` on both PDFs shows `Menlo-Regular`, `Menlo-Bold`, `LucidaGrande`, `LucidaGrande-Bold` and
`ZapfDingbatsITC`. These are macOS system fallbacks, and they are painting the glyphs that are not in
the Latin subsets of any of the three brand faces: the arrows `→ ← ↑ ↓`, the status marks `● ◐ ◆`,
and the `✓ ✕` on the split columns.

This is pre-existing — it is in the shipped source deck too — and it is not what §C.4 was about. But
it is real: **a deck rendered on a machine without those system fonts will paint those glyphs
differently or not at all**, which is the same class of failure as the CDN dependency this pass just
removed. The fix is to vendor a symbols subset or to replace the glyphs with SVG marks. It is
recorded here rather than fixed because it is a font-inventory decision, not a build one.

### 4.2 Type 3 fonts, unchanged

The export still emits mostly Type 3 fonts, exactly as §B.4 measured on the shipped deck — with one
improvement nobody planned: **Instrument Serif embeds as a real CID TrueType font program**, not
Type 3. Text extraction works on both, so this stays benign, and it stays a class of export that can
degrade silently between Chrome versions. Unchanged by this pass and still worth a fix in G5.

---

## 5. The finding that matters most: the kit has one type scale, and this is the reading deck

This is the honest core of the report.

### 5.1 What happened

The kit's scale is 54 / 26 / 20 / 16 / 13 (decisions C and F). It is measurably better than the
34 / 18 / 17 / 16 / 11.5 it replaced — every adjacent ratio now clears 1.25 where three semantic
levels used to sit inside a 12.5% range. Nothing below argues with that.

But bigger type needs more room per character, `synos-vc-deck-v6.html` carries **1,438 rendered
characters a slide**, and the card is a fixed 712px with no slack in it.

| | Source | Rebuilt (before the fix) |
|---|---|---|
| Header block — eyebrow + h1 + subtitle — mean | **158px** | **223px** |
| Header block, max | 193px | 286px |
| Slides whose content runs past the card | **0 / 35** | **8 / 35**, worst +112px |
| PDF pages via `_build_deck_pdf.py` | 35 | **42** |

The 42 is the sharp end of it. Reveal's print-pdf path splits a slide taller than the page across
pages, so eight overflowing slides became seven extra pages and the export failed
`verify_pdf.py --slides 35` — **precisely the page-count drift deck-research §B.4 flagged as a live
defect on two other decks in the corpus**. An invisible 30px of overflow in a browser is a visible
extra page in the artifact a VC actually reads.

The header block alone is +65px a slide against a content area of 638px. That is 10% of the slide,
spent before any content is placed.

### 5.2 What I did about it, and why it is a hack

`.dk-dense` in `deck/src/deck.css`: a second type scale, applied to those eight slides and to
nothing else. Subtitle 26 → 19px, body 16 → 13.5px, card titles 20 → 17px, quotes 13 → 11.5px, and
the grid gaps that decisions C and G opened to replace removed borders come back toward the source's
12–14px. `h1` deliberately does not move — it is the brand's one display role, its position is what
decision I just pinned, and shrinking it per slide would split the register across the deck.

That fixed it: **0 / 35 slides overflow, 35 PDF pages, `verify_pdf.py` reports SAFE.**

**A per-artifact type scale living in a deck is exactly the drift these passes exist to remove.** It
is how you end up with two design systems again, which is the finding that shaped the original
extraction. It is here because the alternative was shipping eight visibly broken slides and a PDF
that fails its own verifier, and because writing the numbers down is more useful than either. It is
in `deck.css`, under a comment that calls it a hack, and it is 18 of the file's 96 rule blocks.

### 5.3 What the kit should do instead

Not "make the scale smaller". Three things, in this order:

1. **A density register the kit owns.** Two scales, chosen deliberately, both documented, both
   gated — a `presenting` register at today's 54 / 26 / 20 / 16 / 13 and a `reading` register at
   something like 54 / 20 / 17 / 13.5 / 13, reachable as a prop on `SlideFrame` and inherited by
   everything inside it. The distinction already exists in the corpus and the kit already knows
   about it: `CoverSlide`'s `lede` prop documents reading-deck versus presenting-deck at length.
   The kit makes that distinction for one paragraph slot and for nothing else.
2. **A column grid.** The improvement report has had this at item 1 since 2026-08-13, found twice
   from two directions. This deck found it a third time: `deck.css` carries `.dk-cols--12`,
   `.dk-cols--54` and `.dk-cols--65` because nine slides needed a two-column split that is not
   `SplitColumns` — which is a *contrast* component with its own eyebrow, title and marker
   vocabulary, not a geometry.
3. **A spacing scale.** `.dk-gap-sm` / `.dk-gap` / `.dk-gap-lg` are 12 / 18 / 26px, and those are
   three numbers I picked. The improvement report's §11 left a 40px in `tools/composed.mjs` for the
   same reason and called it "a token that does not exist yet". There are now four.

**A fourth, smaller one: `columns` on the grids.** `PillarGrid` takes a `columns` prop;
`StatRow`, `PhaseRow`, `UseCaseGrid` and `StepGrid` do not. Slides 25 and 31 override
`gridTemplateColumns` inline for a two-up stat row and a five-up phase row. That is a one-line
change per component and it removes the most common inline style in the deck.

---

## 6. The four slides that resist, and what they have in common

They are all **tables**, and the kit has no table.

| Slide | Shape |
|---|---|
| 8 · The same environment, tomorrow | 5 columns × 3 rows: a component header row, a "today" row, a "tomorrow" row, with a rail label down the left |
| 17 · Landscape | 6 columns × 7 rows with four cell states (absent / partial / full / ours) and a gradient hero cell |
| 32 · Appendix · Landscape detail | 6 rows × 3 columns, plus a highlighted "us" row |
| 33 · Appendix · who is most like us | 2 × 2 quadrant with two labelled axes |

`.dk-matrix` in `deck.css` is one generic CSS grid driven entirely by an inline
`gridTemplateColumns`, plus five cell states. It is 22 of the file's 96 rule blocks and it is the
single largest thing the kit is missing after the density register.

**I do not think the answer is a `Table` component**, and this is a judgement rather than a
measurement. The four are genuinely different objects — a transposed two-row comparison, a
capability matrix, a prose comparison table and a positioning quadrant — and the inventory's
frequency test would reject all four (each occurs once, in one file). What they share is *grid
geometry with a caller-set track count and a small vocabulary of cell emphasis*, which is the same
thing item 2 above asks for. **A column grid plus cell-emphasis tokens would carry all four**; four
table components would be exactly the drift the inventory excluded sixty classes to avoid.

Worth noting for the next deck: the buyer decks are being rebuilt on this kit (report §9), and
`synos-tech-buyer-v2.html` is comparison-table-heavy. This gap will be hit again, harder.

---

## 7. The bespoke SVG diagrams

Five slides (1, 4, 12, 22, 26) carry a hand-drawn SVG: the humans/agents/systems seam three times,
the learning loop once, the edge diagram once. They live in `deck/src/diagrams.jsx` as deck content
and their styles are 43 of `deck.css`'s 96 rule blocks — the largest bucket by rule count, and the
one I am least worried about.

**This is correct and should stay this way.** The inventory put every hand-drawn diagram out of scope
on the grounds that each occurs in exactly one file. A diagram is content, not a component. What the
kit gave them is what it should give them: the tokens. Every `--indigo-bg` became `--sk-indigo-bg`,
every literal hex became a token, and every `'Plus Jakarta Sans'` label became Inter, because
decision A retired that face — so the diagrams stopped being a back door for the retired display
face into the deck.

Two consequences of the palette decisions that a reviewer should see rather than read about: the
seam and loop gradients now end at `--sk-violet-ink` (decision B), and the edge diagram's emerald
moved from `#10b981` (a 2.5:1 stray the token file never knew it had) to `--sk-emerald #047857`.

---

## 8. Density, colour and boxes, measured on real slides for the first time

Every box and colour count in three passes has been against five hand-composed proxy slides. These
are the first numbers from 35 real ones.

| | Source, 35 slides | Rebuilt, 35 slides | Improvement-report target |
|---|---|---|---|
| Distinct text colours per slide, mean | 6.9 | **6.5** | ≤ 4.0 (G7, never approved) |
| Distinct text colours, max | 13 | **9** | ≤ 6 |
| Bordered/filled elements per slide, mean | 11.2 | **9.6** | ≤ 10 (retired target) |
| Bordered/filled elements, max | **46** | **36** | ≤ 15 |
| Rendered characters per slide, mean | 1,429 | 1,438 | — (unchanged by design) |

Read this honestly. The de-box work is **real but smaller on real slides than on the proxies**: the
proxy corpus went 12.6 → 10.0 mean boxes, and the real deck sits at 9.6 against a source of 11.2 —
a 14% reduction, not the 21% the proxies suggested. The max is still 36 on the architecture slide,
against a gate of 15 that the proxies clear.

**The gate and the artifact disagree, and the artifact is right.** `tools/boxes.mjs` composes five
slides at what it calls "real deck density" and they are not as dense as the real deck. That is not
a criticism of the tool — it was the only option when nothing consumed the kit — but the gate should
now be pointed at this deck. That is a small change to `boxes.mjs` and it is the first thing I would
do next, because a gate calibrated on a proxy will pass builds the artifact fails.

The character count is unchanged on purpose. This was a re-platforming.

---

## 9. Two smaller findings

**`Chip` cannot carry a two-line label, and the architecture slides need one.** The inventory (§5.5)
excluded `.tool-chip` and `.harness-chip` — the two-line chips with an icon block — on the grounds
that they are cards. That call looks right for the ones with icons, but slides 6, 9, 14 and 21 need
a chip with a quiet descriptor line and no icon, so `deck.css` relaxes `white-space` and caps the
measure on `.sk-chip:has(.dk-chip-kd)`. **A deck-local override of a kit class is a smell**, and it
is the one place in this work where I would accept an argument that the kit should change. Four uses
across four slides is not yet frequency; if the buyer decks want it too, it is a `Chip` prop.

**The `arch` variant no longer tightens anything but padding.** `.card-frame.arch-card` declared
`h1 { 24px }` and `h2 { 13.5px }`; the inventory correctly found both dead in the source (they lose
a specificity tie) and did not reproduce them. The consequence only becomes visible now: on a
diagram-heavy slide the 54px serif headline wraps to two lines and takes 130px off the diagram —
look at `comparison/06-architecture-today.png`. The `arch` variant is *supposed* to be the "give the
diagram the room" variant and it currently cannot. This is the same missing thing as §5: it is what
a density register would fix, on the variant that most obviously needs one.

---

## 10. What I did not do

- **Add any component to the kit.** Per the spec. The one kit change is `justify-content`.
- **Change any content.** §1 has the evidence.
- **Thin the deck.** deck-research's correction block is explicit that the reading deck legitimately
  carries more, and thinning it would have made the comparison unreadable as evidence about the kit.
- **Fix the three known AA failures** (improvement report §5) or the seven orphaned tokens (§13).
  Unchanged, still open, still nobody's decision.
- **Re-point `tools/boxes.mjs` at this deck.** §8 argues it should be, but changing a gate in the
  same pass that produces the artifact it will be calibrated against is how gates stop meaning
  anything. Separate change, next.
- **Re-sync to the design project**, or touch `~/ws/synos-gtm`.

---

## 11. Recommended next steps, in order

1. **Look at `deck/comparison/`.** Nothing below matters if the rebuild does not read better. Start
   with `10-the-play.png` (the clearest win), `06-architecture-today.png` (the clearest cost) and
   `17-landscape.png` (the hardest slide).
2. **Decide the density register** (§5.3 item 1). It is the difference between a kit that can carry
   a reading deck and one that needs a `.dk-dense` per artifact. Everything else in this list is
   smaller.
3. **The column grid and the spacing scale.** Item 1 on the improvement report's list since
   2026-08-13, now found from a third direction.
4. **`columns` props on `StatRow`, `PhaseRow`, `UseCaseGrid`, `StepGrid`.** One line each; removes
   the most common inline style in the deck.
5. **Re-point `tools/boxes.mjs` at this deck** and re-baseline the box gate on real slides (§8).
6. **Vendor a symbols subset**, or replace `→ ● ◐ ◆ ✓ ✕` with SVG marks (§4.1).
7. **Then the buyer decks**, which is where the table gap will be hit hardest.

---

## 12. Commits

Three, on `feat/deck-on-kit-aug14`:

| | |
|---|---|
| `fix(brand-kit)` | the h1 stops moving — decision I, deck-research G1, recorded in the fidelity harness |
| `feat(brand-kit)` | the deck: build script, definition, vendored reveal and fonts, the geometry and no-CDN probe |
| `feat(brand-kit)` | the proof: 35 comparison renders, the PDF at 35 pages, and the `.dk-dense` register that got it there |

Gates after all three: **fidelity 27/27 specimens · 104 checks · 144 recorded divergences · contrast
40/43 with 3 known and 0 unexpected · boxes mean 10.0 / panels 7.4, both inside their gates.**
