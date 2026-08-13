# SynOS deck + one-pager inventory

Measured from the seven source artifacts in `~/ws/synos-gtm` on 2026-08-13. Every number below was
counted from the files, not estimated. Method: parse each file's `<body>`, strip `<script>`/`<style>`,
count `class="..."` tokens and walk each `<section class="has-card">` to record its frame class,
eyebrow, `h1` and the class of each direct child of `.card-frame`.

Reproduce with `packages/brand-kit/fidelity/scripts/inventory.mjs`.

## 0. Corpus

| # | File | Date | Kind | Slides / pages |
|---|------|------|------|----------------|
| 1 | `presentations/synos-vc-deck-presenting.html` | 2026-08-12 | Reveal deck | 35 |
| 2 | `presentations/synos-vc-deck-v6.html` | 2026-08-12 | Reveal deck | 35 |
| 3 | `presentations/synos-tech-buyer-v2.html` | 2026-08-09 | Reveal deck | 40 |
| 4 | `presentations/synos-ops-buyer.standalone.html` | 2026-07-17 | Reveal deck (self-contained) | 38 |
| 5 | `pitch-materials/SYNOS_VC_1PAGER.html` | 2026-08-11 | A4 print page | 1 |
| 6 | `pitch-materials/1pager-retail-multistore-cto.html` | 2026-08-09 | A4 print pages | 2 |
| 7 | `pitch-materials/1pager-financial-inclusion-cto.html` | 2026-08-09 | A4 print pages | 2 |
| — | `pitch-materials/SYNOS_FOUNDER_MEMO_SHORT.html` | 2026-08-11 | A4 long-form memo | 1 |

148 deck slides, 5 one-pager pages, 1 memo.

**The memo is excluded as a component source.** It is set in Source Serif 4 at pt sizes with a
`.masthead` / `.lede` / `.close` / `.colophon` vocabulary that appears in no other file. Every one of
its classes has frequency 1. It is a typographic register, not a component library. Its `:root`
confirms the shared token values and nothing else.

## 1. The single biggest finding: there are two deck families, not one

The four decks do **not** share one component vocabulary. They split cleanly in two, and the split
runs through almost every measurement:

- **VC family** — `synos-vc-deck-presenting` + `synos-vc-deck-v6`. Byte-for-byte near-identical CSS
  (v6 is the same stylesheet; presenting adds speaker notes). 35 slides each, matching slide order,
  matching eyebrows. Effectively one deck in two builds.
- **Buyer family** — `synos-tech-buyer-v2` + `synos-ops-buyer.standalone`. Also near-identical CSS to
  each other; ops is the older cut and shares ~90% of tech-v2's classes.

Cross-family sharing is limited to a small universal core (below) plus three blocks that were
copy-pasted from one family into the other: `loop-wrap`/`lp-*`, `edge-wrap`/`edge-pt`/`edge-quote`,
and `fw-pipe`/`fw-st`/`fw-pay`/`fw-band` (all three appear in presenting + v6 + tech-v2, 3 files).

Practical consequence: "used in 2 files" usually means "used in one family". The selection bar below
is therefore **≥2 files, and preference to patterns that cross the family line.**

## 2. Universal core — present in all four decks

These are the only structural classes that appear in every deck. They are the non-negotiable
components.

| Class | presenting | v6 | tech-v2 | ops | Total | Component |
|-------|-----------:|---:|--------:|----:|------:|-----------|
| `has-card` | 35 | 35 | 40 | 38 | **148** | `SlideFrame` (the section wrapper) |
| `card-frame` | 35 | 35 | 40 | 38 | **148** | `SlideFrame` |
| `eyebrow` | 35 | 35 | 38 | 36 | **144** | `Eyebrow` |
| `cover` | 1 | 1 | 1 | 1 | **4** | `CoverSlide` |
| `arch-card` | 2 | 2 | 2 | 2 | **8** | `SlideFrame variant="arch"` |
| `wall` | 6 | 6 | 6 | 6 | **24** | `WallCard` / `WallGrid` |
| `title-block` | 2 | 2 | 32 | 31 | **67** | `SlideHeader layout="stack"` |
| `head-row` | 29 | 29 | 0 | 0 | **58** | `SlideHeader layout="row"` |

`title-block` + `head-row` together cover 125 of 148 slides. They are the same job — eyebrow, `h1`,
optional `h2` — laid out two ways, so they are one component with a `layout` prop, not two.

## 3. Slide archetypes, by frequency

Counted from the per-slide walk. "Files" counts source artifacts, not occurrences.

### In scope — recurring

| Archetype | Source classes | Occurrences | Files | Component |
|-----------|----------------|------------:|------:|-----------|
| Slide card | `card-frame` | 148 | 4 | `SlideFrame` |
| Eyebrow label | `eyebrow` (+`.red .indigo .violet .emerald`) | 144 | 4 | `Eyebrow` |
| Eyebrow + title (+ sub) | `head-row`, `title-block` | 125 | 4 | `SlideHeader` |
| Tinted callout | `stk-note` `nw-fit` `q2note` `lstk-foot` `grad-foot` `fw-band` `cf` `oneliner-foot` `gap` `joint` `bx` `ag` `ob` `mbox` `proof` `edge-pt` `qp` `sm-auto` | 60+ | 7 | `Callout` |
| Chip / pill | `source-chip` 38, `stk-chip` 24, `d1-sor-chip` 24, `pchip` 19, `pill` 16, `nw-chip` 12, `tool-chip` 10, `demo-chip` 8, `tagchip` 6 | **157** | 7 | `Chip` / `ChipRow` |
| Wall card (3×2 grid) | `wall` + `wall-grid` / `walls-grid` | 24 | 4 | `WallCard` / `WallGrid` |
| Pillar card | `d1-pillar` 20, `pillar` 20 | 40 | 4 | `PillarCard` / `PillarGrid` |
| Phase / horizon card | `sc`+`sn`+`when`+`rev` 24, `hx-sc` 6, 1-pager `sc` 3 | 33 | 5 | `PhaseCard` / `PhaseRow` |
| Use-case card | `uc` + `uk` + `uc-grid` | 24 | 2 | `UseCaseCard` / `UseCaseGrid` |
| Architecture card | `arch-card` frame + `d1`/`arch-stack` | 8 | 4 | `SlideFrame variant="arch"` (contents out of scope, see §5) |
| Cover slide | `cover` | 4 | 4 | `CoverSlide` |
| Big-type statement | `big-type` + `l1`/`l2`/`sub`/`punch`/`tagline` | 6 | 2 | `BigTypeSlide` |
| Stat row | `g3` + `stat-card` (`n`/`l`/`s`) | 10 | 2 | `StatCard` / `StatRow` |
| Centred caption | `caption` | 13 | 2 | `Caption` |
| Italic quote bar | `edge-quote` 3, `nadella` 2, `dq` 12, 1-pager `q` 10 | 27 | 5 | `QuoteBar` |
| Two-column split | `moat-split` + `moat-col` (`dies`/`wins`/`doorA`) | 8 | 2 | `SplitColumns` / `SplitColumn` |
| Demo/step card | `demo-card` (`db`/`dc`/`dn`/`dq`) | 12 | 2 | `StepCard` / `StepGrid` |

### One-pager archetypes

| Archetype | Source classes | Occurrences | Files | Component |
|-----------|----------------|------------:|------:|-----------|
| A4 page | `page` | 5 | 3 | `OnePagerPage` |
| Masthead | `hd` + `top`/`brand`/`tag`/`h1`/`lede`/`sub`/`runner` | 5 | 3 | `OnePagerHeader` |
| Section heading | `sh` (h2 + sub) | 16 | 2 | `SectionHeading` |
| Small caps label | `sec-label` + `badge` | 4 | 1 | folded into `Eyebrow scale="print"` — see §4 |
| Bottom CTA banner | `cta` (`l`/`r`) | 5 | 3 | `CtaBar` |
| Outcome card | `oc` + `ot`/`od` | 8 | 2 | `OutcomeCard` / `OutcomeGrid` |
| Print chip | `pchip` (+`.paid`, `.mono`) | 19 | 3 | `Chip scale="print"` |

### Out of scope — one-offs and bespoke slides

Everything below occurs in exactly one deck, or is a hand-drawn diagram whose value is the drawing,
not the pattern. Listed so it is on the record that they were seen and rejected, not missed.

- **Bespoke SVG diagrams**: `seam-wrap`/`u-*` (seam, VC only), `loop-wrap`/`lp-*` (self-learning loop),
  `edge-wrap`/`edge-svg`, `flywheel-wrap`/`flywheel-svg`, `scatter-diagram`, `diagram-svg`,
  `coverseam`, `close-seam`. These are drawings. A component wrapper around them would carry no
  brand information the `SlideFrame` + `Callout` pair does not already carry.
- **Single-slide layouts (VC family)**: `dual`/`dual-row`/`dual-rail` (today-vs-next rail — 1 slide),
  `lstk` landscape matrix (1), `comp`/`comp-us` competition table (1), `q2wrap` 2×2 quadrant (1),
  `quad`/`qchip` quadrant (0 uses; dead CSS), `bm` business model (1), `dfx` differentiation (1),
  `grad` graduation ladder (1), `mstone` milestones (1), `story-grid`/`trc` traction (1),
  `team-grid`/`tcard` (1), `nw-wrap` neutrality (1), `stk`/`stk-slab` stack slab (1),
  `fw-pipe` flywheel pipe (1), `sm-flow`/`sm-seg` selling machine (1), `icp2`/`icard` (1),
  `land` beachhead (1), `ask-grid` (0 uses; dead CSS), `honesty-row`/`hon` (v6 only), `velocity`/`geo`
  (v6 only), `tl`/`tl-chip` training layer (0 uses; dead CSS), `tstakes` (1).
- **Single-slide layouts (buyer family)**: `belief-cols`, `shift-stack`, `three-box`, `cap-grid`,
  `selflearn-strip`/`sl-card`, `modes-list`/`mode-row`, `tools-band`, `hp-grid`, `pf-wrap`/`pf-step`,
  `sme-lanes`, `pair`/`pair-wall`/`pair-lock`, `fde-flow`, `ladder`/`rung`, `nl-rails`, `deploy-two`,
  `templates-grid`, `outcomes-grid`, `types-grid`, `retrieval-wrap`, `why-grid`, `vision-row`,
  `hx-flow`, `wm`/`closing`, `mock`/`mock-chrome` (ops only), `prompt-box` (ops only),
  `trust-card` (ops only), `keyband` (ops only).
- **Dead CSS** (defined, zero uses in the body): `.quad`/`.qchip`/`.quad-pts`/`.qp`, `.ask-grid`/
  `.ask-col`, `.tl`/`.tl-core`/`.tl-chip`, `.foot-note`, `.appendix-tag`, `.pnum`, `.reel`,
  `.expand-flow`/`.ex-step`, deck-side `.cta`/`.cta-steps` (tech-v2). Not extracted.
- **Reveal.js plumbing**: `aside.notes` (33 occurrences, 3 files) is invisible speaker-note markup,
  not a visual component. `slidenum`, `.progress`, `print-pdf` overrides — deployment concerns.
- **The founder memo** in full (§0).

## 4. Conflicts found between the sources

Resolution rule from the spec: **newest wins**, i.e. `synos-vc-deck-presenting.html` (2026-08-12) is
canonical, then v6, then tech-buyer-v2, then ops-buyer. Where the conflict is between the deck scale
and the print scale, both survive as two scales of one system.

| # | What | VC family (canonical) | Buyer family | One-pagers | Resolution |
|---|------|----------------------|--------------|-----------|-----------|
| C1 | `.card-frame` size | `1380px × 712px` fixed, `max-width:99%`, `padding:40px 56px 34px`, `display:flex; flex-direction:column; justify-content:center` | tech-v2 `1180px`, `max-width:96%`, `padding:36px 44px 34px`, `max-height:760px`, no fixed height, no flex; ops `1256px`, `max-width:99%`, `padding:34px 44px 32px`, `max-height:792px` | n/a | **1380×712, padding 40/56/34.** Three different frames existed. |
| C2 | `section.has-card` height | `720px` | `800px` (both buyer decks) | n/a | **720px.** |
| C3 | `.card-frame.arch-card` padding | `14px 44px 12px` | `24px 32px` | n/a | **14px 44px 12px.** |
| C4 | `.eyebrow` | `font-size:11.5px; margin-bottom:11px` | `font-size:10px; margin-bottom:8px` | `sec-label` `8.5px`, `.sh p` n/a | **11.5px / 11px** for deck; print scale keeps `8.5px`. `letter-spacing:1.6px` and `font-weight:700` are identical in all four decks. |
| C5 | Type scale | h1 `34/700`, h2 `18/500`, h3 `17/700`, p `16`, heading `line-height:1.2` | h1 `30`, h2 `16`, h3 `15`, p `14`, heading `line-height:1.25` | print scale | **34/18/17/16, lh 1.2.** |
| C6 | `.title-block` | `margin-bottom:16px`, no size overrides | `margin-bottom:18px` **plus** `title-block h1{26px}` / `h2{14px}` — i.e. the buyer decks shrink the title inside the block | n/a | **16px, no overrides.** |
| C7 | Cover | `.cover .eyebrow` violet, `letter-spacing:2.4px`; `.big` **47px** (see C8); `.hero-sub` 16.5px; `.lede` 12.3px; padding `56px 60px 48px` | `.cover .eyebrow` indigo, no extra tracking; `h1` 46px; `.sub` 17px; `.tag-row .pill`; padding `64px 60px 56px` | n/a | **VC cover.** Two genuinely different covers; the buyer cover is kept only as the documented `tone`/`tagRow` deviation. |
| C8 | **`.cover .big` font-size** | Declared `58px` at line 126, then **overridden to `47px`** by a later `/* v7 cover refit */` block in the same stylesheet (line 509). Effective computed value is **47px**. | — | — | **47px.** The build spec says 58px; the file says 47px. See §6. |
| C9 | `.wall` innards | `.w-q` 15px italic + `.w-t` 13px; padding `12px 14px` | `.num` 24px red badge + `h4` 15px + `p` 13px + `.wq` 11.5px italic with dashed top rule; padding `16px 18px` | — | Shell is identical in all four (`surface-2`, `1px border`, `border-left:3px solid var(--red-2)`, `radius:10px`). **VC innards are the default**; `num`/`title`/`body` are optional props that render the buyer shape. Both shapes exist in the sources — this is not an invention. |
| C10 | `.pillar` vs `.d1-pillar` | `d1-pillar`: left-aligned, `surface-2`, `1px var(--border)`, `radius:11px`, `padding:7px 11px`, name 13px `var(--ink)`, desc 10.5px | `pillar`: **centre**-aligned, `surface`, `1.5px var(--indigo-br)`, `radius:10px`, `padding:10px`, name 12.5px `#312e81`, desc 11px | — | **`d1-pillar`.** `align="center"` reproduces the buyer variant. |
| C11 | Phase-3 accent colour | `.sc.s3 .sn`/`.when`/`.rev` = **violet** `#7c3aed`; `.sc.s2 .sn` = `--grad` (indigo→violet) | tech-v2 `.hx-sc.s3` = **teal** `#0d9488`; `.hx-sc.s2 .hx-sn` = `linear-gradient(90deg,#6366f1,#14b8a6)` | 1p-vc `.sc.s3` = teal `var(--teal)` | **Violet.** The gradient direction of the brand differs by artifact — see C13. |
| C12 | `.cta` means two different things | — | tech-v2 `.cta` is a full **centred closing-slide layout** (`h1` 32px, `.c-sub`, `.cta-steps` 3-col) — and it has **zero uses in the body**, i.e. dead CSS | one-pagers `.cta` is a **bottom banner bar** (flex, left block + right block, `margin-top:auto`) | Ship the **one-pager banner** as `CtaBar`. The deck `.cta` is dead code and is not extracted. This is exactly the "same class name, different meaning" case the spec anticipated. |
| C13 | The brand gradient | `--grad: linear-gradient(135deg,#6366f1,#7c3aed)` — indigo→**violet**. No `--teal` token at all. | tech-v2/ops define `--teal:#0e7490`, `--teal-bg:#ecfeff`, `--teal-br:#67e8f9`. No `--grad`. | 1p-vc defines `--teal:#0d9488`, `--teal-2:#14b8a6`, `--teal-bg:#f0fdfa`, `--teal-br:#99f6e4`, and uses indigo→**teal** gradients throughout (`.hd` border-image, `.cta`, `.sc.s2 .sn`). retail/fin 1-pagers have **no teal at all** — pure indigo/violet. | **Deck gradient is indigo→violet** (`--grad`). Teal survives as a token but at the newest observed value: `--teal:#0d9488`, `--teal-2:#14b8a6`. Note the VC deck itself writes `var(--teal,#0d9488)` in `.fw-pay.cost` — an inline fallback that agrees with the one-pager, not with the buyer decks. Two teals existed; `#0d9488` is the one the newest artifacts use. |
| C14 | Eyebrow hue variants | All four decks define `.eyebrow.red`, `.eyebrow.indigo`, `.eyebrow.violet`, `.eyebrow.emerald` | same | — | **Four hue variants, not two.** The build spec lists only `.red` and `.violet`. See §6. |
| C15 | JetBrains Mono weights | VC decks load `500;600` | buyer decks load `500` only | one-pagers load `500;600` | **500;600.** |
| C16 | Font stack for one-pagers | — | — | `Plus Jakarta Sans:600;700;800` (no 500) + Inter `400..700` + JetBrains Mono `500;600` | Load the union: Plus Jakarta Sans `500;600;700;800`. |
| C17 | `--dim`, `--indigo-3`, `--amber-2`, `--red-2` | all present | all present | **absent** from all three one-pagers | Tokens file carries the full deck set; the one-pager components simply do not reference the missing ones. No conflict in value, only in coverage. |
| C18 | `.sc` scale | deck: `radius:14px`, `padding:18px`, `h3` 19px, `p` 13px, `sn` 10px | `hx-sc` identical to deck `.sc` | 1p-vc: `radius:10px`, `padding:9px 11px`, `h3` 12px, `p` 8.8px, `sn` 8px | Both kept — this is the clearest instance of "two scales, one system". `PhaseCard scale="deck" \| "print"`. |

Token values themselves are **identical across all four decks** for every shared token
(`--bg --surface --surface-2 --border --border-2 --ink --ink-2 --ink-3 --muted --dim --indigo
--indigo-2 --indigo-3 --indigo-bg --indigo-br --violet --violet-bg --violet-br --amber --amber-2
--amber-bg --amber-br --emerald --emerald-bg --emerald-br --red --red-2 --red-bg --red-br`). The
only token disagreements in the whole corpus are `--teal` (C13) and coverage (C17). That is the
strongest evidence in the corpus that the palette, unlike the layout vocabulary, is settled.

## 5. Deliberate deviations from the sources

Recorded here as the spec requires. Each is a case where the built component does not reproduce a
source byte-for-byte, and why.

1. **`SlideFrame` drops `max-width:99%`.** The source caps the card at 99% of the viewport so it
   shrinks on small screens. The component renders at a fixed 1380px because it is a library part
   with no reveal.js scaling context around it. `maxWidth` is exposed as a prop defaulting to `99%`
   so a consumer inside reveal.js gets the source behaviour. Fidelity screenshots are taken at a
   viewport wide enough for the two to be identical.
2. **Architecture-card *contents* are not extracted.** `SlideFrame variant="arch"` reproduces the
   frame (padding `14px 44px 12px`, the `h1`→24px / `h2`→13.5px / `title-block`→5px / `eyebrow`→5px
   descendant overrides). The `d1-*` and `arch-stack` diagram bodies inside it are bespoke per deck
   (see §3 out-of-scope) and are left to the design agent to compose from `PillarCard`, `Chip` and
   `Callout`.
3. **`Callout` unifies a family with small spread.** The sources' tinted callouts vary by 1–2px in
   padding and radius (`stk-note` `11px 16px`/`10px`; `nw-fit` `10px 15px`/`11px`; `q2note`
   `5px 9px`/`0 7px 7px 0`; `fw-band` `10px 16px`/`11px`; `gap` `8px 12px`/`8px`). The component
   takes the newest deck value (`stk-note`: `padding:11px 16px; border-radius:10px`) for
   `scale="deck"` and the newest one-pager value (`gap` in 1p-vc: `padding:8px 12px;
   border-radius:8px`) for `scale="print"`, and exposes `accent="left" | "full" | "top" | "none"` to
   cover the four border treatments actually present. Per-instance 1px drift is not reproduced.
4. **`WallCard` merges C9's two innard shapes** into one prop set rather than shipping two
   components. Both shapes are in the sources; neither is invented.
5. **`Chip` merges nine chip classes** (§3) that share the shape `background + 1px border +
   small radius + 500–600 weight` and differ in radius (6–12px, plus `999px` for `tagchip`), padding
   and font-size. Two scales (`deck`/`print`), five tones, and a `pill` shape prop cover every
   observed instance except `tool-chip` (which carries a 38px icon block and is a card, not a chip —
   left out of scope as a one-family pattern).
6. **`--teal` takes `#0d9488`, not `#0e7490`.** See C13. The older buyer-deck value is not carried.
7. **The `.arch-card h1` / `.arch-card h2` overrides are not reproduced, because they do not fire.**
   `synos-vc-deck-presenting.html` declares `.arch-card h1 { font-size:24px }` at line 35 and
   `.reveal h1 { font-size:34px }` at line 42. Both selectors have specificity (0,1,1); the later
   one wins. Measured in a browser, the h1 on the shipped arch slide renders at **34px** and the h2
   at **18px** — the tightened sizes never take effect. The `.arch-card .title-block` and
   `.arch-card .eyebrow` overrides in the same block are (0,2,0) and *do* fire, and are reproduced.
   The kit follows what ships, not what is declared. Asserted by the `slide-frame-arch` specimen.
8. **`.stk-chip.us` is not extracted.** It is declared in both VC decks and used zero times in any
   source body. Dead CSS. `Chip tone="violet"` covers the same intent from live precedent
   (`.tagchip.ai`, `.demo-chip`).

## 5b. A measurement the declared CSS hides: the card ships at 1267px, not 1380px

`.card-frame` declares `width: 1380px` **and** `max-width: 99%`. The VC decks initialise reveal.js
with `width: 1280, height: 720, margin: 0`, so the slide box the card lives in is 1280px wide and
`max-width: 99%` clamps the card to **1267.2px**. The declared 1380px is never the rendered width in
the shipped deck.

Both numbers are real and both are kept: the component declares `width: 1380px` with a
`maxWidth` prop defaulting to `'99%'`, so it renders at 1267.2px inside a 1280px stage exactly as
the deck does, and at 1380px in a wider container. The fidelity captures use each deck's own reveal
stage size so both sides are measured under the same clamp. The buyer decks clamp differently again
(1180px and 1256px declared, `max-width` 96% and 99%) — conflict C1.

## 6. Where the build spec disagrees with the files — the files win

Per the instruction to say so rather than follow the spec off a cliff:

- **`.cover .big` is 47px, not 58px.** The spec's token list is silent on this, but the spec's
  general framing treats the declared value as the measurement. `synos-vc-deck-presenting.html`
  declares `58px` at line 126 and then overrides it to `47px` at line 509 under a
  `/* v7 cover refit */` comment. Same for `.hero-sub` (23px → 16.5px) and `.lede` (16.5px → 12.3px)
  and `.coverseam` (36% → 30%). The kit uses the **effective** values: 47 / 16.5 / 12.3.
- **Eyebrow has four hue variants, not two.** The spec says "hue variants `.red`, `.violet`". All
  four decks also define `.indigo` and `.emerald`, and `.indigo` is used 75 times across all four
  files — more than `.violet` (27) and `.red` (11) combined. `Eyebrow` ships five tones.
- **The token list in the spec is missing `--amber-2 #f59e0b` and `--red-2 #ef4444`**, both of which
  are in all four decks and both of which are load-bearing: `--red-2` draws the left rule on every
  `wall` (24 occurrences, 4 files) and `--amber-2` colours `stat-card.a .n`. Both are included.
  `--teal*` is likewise absent from the spec (C13). Included.
- **The spec's `--indigo-bg`, `--indigo-br` etc. are all correct.** Verified byte-for-byte.
- **The spec's `.card-frame` measurement is correct** for the newest deck, but it presents the
  1380×712 frame as if it were *the* frame. Three different frames exist (C1); the other two are the
  buyer decks. The spec's known-conflicts section anticipates this in general terms; this inventory
  names the specific numbers.
- **"Recurring structural classes across the newest three decks"** in the spec lists `card-frame`,
  `has-card`, `eyebrow`, `title-block`, `head-row`, `notes`, chip families, `pillar`, `icard`, `k`/`n`/`t`.
  Corrections: `notes` is invisible reveal.js speaker-note markup, not a visual class (excluded);
  `icard` occurs 4 times in 2 files on 1 slide each and is a one-off (excluded); `head-row` and
  `title-block` do not co-occur — they are the two families' alternatives for the same job, which is
  why they became one component; `d1-chip`/`harness-chip` are chips in name only in the buyer decks
  (`harness-chip` is a two-line card, `d1-chip` likewise) and are not folded into `Chip`.

## 7. Component manifest

Twenty-two components. Deck components render inside the 1380×712 frame; print components render at
A4 width. Both read the same `tokens.css`; neither shares padding or type scale with the other.

**Deck** — `SlideFrame`, `Eyebrow`, `SlideHeader`, `CoverSlide`, `BigTypeSlide`, `Callout`, `Chip`,
`ChipRow`, `WallCard`, `WallGrid`, `PillarCard`, `PillarGrid`, `PhaseCard`, `PhaseRow`,
`UseCaseCard`, `UseCaseGrid`, `StatCard`, `StatRow`, `StepCard`, `StepGrid`, `SplitColumns`,
`SplitColumn`, `Caption`, `QuoteBar`.

**Print** — `OnePagerPage`, `OnePagerHeader`, `SectionHeading`, `CtaBar`, `OutcomeCard`,
`OutcomeGrid`, plus `Callout`, `Chip`, `PhaseCard`, `QuoteBar` at `scale="print"`.
