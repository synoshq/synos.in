# SynOS Brand Kit — build report

Branch `feat/brand-kit-aug13` in `~/ws/synos-landing`. Built against
`docs/plans/2026-08-13-brand-kit-spec.md`. Not merged, not pushed.

`~/ws/synos-gtm` was only ever read — no command in this work wrote to it, and no commit, checkout
or stash was run there. Note that the repository already had uncommitted local changes when this
work started (including to `pitch-materials/SYNOS_FOUNDER_MEMO_SHORT.html`, one of the seven source
artifacts, last modified 2026-08-13 11:28, before this session). Those are pre-existing and were
left alone; all measurements were taken from the working-tree state as found.

Companion documents:

- `docs/plans/2026-08-13-slide-inventory.md` — every measurement, every archetype, every conflict.
- `packages/brand-kit/fidelity/report/fidelity.md` — the machine-generated pass/fail table.
- `packages/brand-kit/fidelity/side-by-side/*.png` — 27 side-by-side comparisons.

---

## 1. What was built

`packages/brand-kit/` — React 18 + TypeScript, Vite library mode, its own `package.json`. Builds
clean (`tsc --noEmit && vite build`) to a 14.4 kB ESM bundle plus one 23 kB stylesheet.

**31 exported components** across two scales that share tokens and fonts and share no padding or
type scale:

| Deck (inside the 1380 × 712 card) | One-pager (A4) |
|---|---|
| `SlideFrame` · `SlideHeader` · `Eyebrow` | `OnePagerPage` · `OnePagerHeader` · `SectionHeading` |
| `CoverSlide` · `BigTypeSlide` | `CtaBar` · `OutcomeCard` / `OutcomeGrid` |
| `Callout` · `Chip` / `ChipRow` · `QuoteBar` · `Caption` | `Callout`, `Chip`, `PhaseCard`, `QuoteBar`, `Eyebrow` at `scale="print"` |
| `WallCard` / `WallGrid` · `PillarCard` / `PillarGrid` | |
| `PhaseCard` / `PhaseRow` · `UseCaseCard` / `UseCaseGrid` | |
| `StatCard` / `StatRow` · `StepCard` / `StepGrid` | |
| `SplitColumns` / `SplitColumn` / `SplitItem` | |

Every component has a TypeScript prop interface with a doc comment on the type and on each prop,
including which source class the prop reproduces and what the prop is *for*. `/design-sync` reads
those, so they were written as instructions to a design agent, not as type annotations. Every
`tone` prop documents the meaning of each hue, because a design agent that picks amber for a win
has understood the palette and not the system.

`src/styles/tokens.css` is the only file in the package containing a literal colour. Where a source
hardcoded a hex inline (`#312e81` for deep indigo ink, `#78350f` for amber ink, `#fde68a`, `#065f46`,
`#991b1b`, `#e0e7ff`), it was promoted to a token with its origin named in a comment. Components
read `var(--sk-*)` only. The two exceptions are `rgba(255,255,255,.18)` and `#fff` inside the
gradient-filled brain card and phase badge — white on a gradient, not a palette colour.

Props over variants-by-copy-paste, as the spec asked. The clearest case: the corpus contains
seventeen near-identical tinted callout classes in live use (`stk-note`, `nw-fit`, `q2note`,
`lstk-foot`, `grad-foot`, `fw-band`, `cf`, `sm-auto`, `edge-pt`, `oneliner-foot`, `gap`, `joint`,
`bx`, `ag`, `ob`, `mbox`, `proof`), plus `qp` declared but unused. They ship as one `Callout` with `tone`, `fill`, `accent`, `flush`,
`banner`, `label` and `scale`. Similarly, nine chip classes totalling 157 occurrences ship as one
`Chip` with `tone`, `size`, `mono` and `scale`.

## 2. Selection: what came forward, and on what evidence

The selection criterion was frequency across source *files*, per the spec. Method and full numbers
are in the inventory; the headline is:

- **148 deck slides** across four decks, **5 one-pager pages**, **1 memo**.
- Seven structural classes appear in all four decks, and they became the non-negotiable core:
  `has-card` and `card-frame` (148/148), `eyebrow` (144), `title-block` (67), `wall` (24 — exactly
  six per deck in every deck), `arch-card` (8), `cover` (4). `head-row` (58) is VC-only but does
  the same job as `title-block`, and the two never co-occur, so together they cover 125 of the 148
  slides as one component.
- The largest single shape in the corpus is the chip: 157 occurrences across seven of the eight
  files under nine class names.
- The second is the tinted callout: 60+ occurrences across all seven artifacts.

Everything shipped occurs in **two or more source files**. Everything that occurs in one is listed
in the inventory as explicitly out of scope, by name — roughly sixty classes, including all the
bespoke SVG diagrams (`seam-wrap`, `loop-wrap`, `flywheel-svg`, `scatter-diagram`, `edge-svg`) and
all the single-slide layouts (`dual`, `lstk`, `comp`, `q2wrap`, `bm`, `dfx`, `grad`, `mstone`,
`story-grid`, `nw-wrap`, `belief-cols`, `three-box`, `pair`, `fde-flow`, `ladder`, `types-grid`,
`retrieval-wrap`, and the rest).

Also excluded, with reasons:

- **The founder memo** as a component source. It is Source Serif 4 at pt sizes with a vocabulary
  (`masthead`, `lede`, `close`, `colophon`) that appears in no other file. Every one of its classes
  has frequency 1. It is a typographic register, not a library.
- **`aside.notes`** (33 occurrences, 3 files). Reveal.js speaker-note markup — invisible. The build
  spec lists `notes` among the recurring structural classes; it is not a visual class.
- **`icard`** (4 occurrences, 2 files, one slide each). The spec lists it as recurring; by the
  spec's own frequency criterion it is a one-off.
- **Dead CSS**: `.quad`/`.qchip`/`.qp`, `.ask-grid`, `.tl`/`.tl-chip`, `.foot-note`, `.appendix-tag`,
  `.pnum`, `.reel`, `.expand-flow`, `.stk-chip.us`, and the deck-side `.cta`/`.cta-steps` in
  `synos-tech-buyer-v2.html`. Declared, never used in any body.

## 3. The finding that changed the shape of the job

**The four decks are not one design system. They are two.**

- **VC family** — `synos-vc-deck-presenting` + `synos-vc-deck-v6` (both 2026-08-12). Effectively
  one deck in two builds: same stylesheet, same 35 slides, same order, same eyebrows.
- **Buyer family** — `synos-tech-buyer-v2` (2026-08-09) + `synos-ops-buyer.standalone` (2026-07-17).
  Also near-identical to each other, and sharing only a thin universal core with the VC family.

Cross-family sharing beyond that core amounts to three blocks that were copy-pasted between them
(`loop-wrap`/`lp-*`, `edge-wrap`/`edge-pt`/`edge-quote`, `fw-pipe`/`fw-st`/`fw-pay`/`fw-band`).

This matters for how "used in two files" should be read: it usually means "used twice inside one
family", which is weaker evidence than it looks. Where a pattern crosses the family line — the
wall, the pillar, the frame, the eyebrow, the phase card — the evidence is much stronger, and those
are the components carrying the most props.

The spec anticipated drift and named the ops-buyer deck as the likely outlier. In practice the
ops-buyer deck is a close sibling of tech-buyer-v2, and the real fault line runs between the two
*pairs*.

## 4. Conflicts found, and how each was resolved

Eighteen are tabulated in the inventory (§4, C1–C18) with the exact competing values. Summarised by
severity:

**Structural — the sources disagree on the frame itself.**

| | VC (canonical) | tech-buyer-v2 | ops-buyer |
|---|---|---|---|
| `.card-frame` width | 1380px, `max-width:99%` | 1180px, `max-width:96%` | 1256px, `max-width:99%` |
| padding | `40px 56px 34px` | `36px 44px 34px` | `34px 44px 32px` |
| height | `712px` fixed, flex-centred | `max-height:760px`, no flex | `max-height:792px`, no flex |
| stage | `720px` | `800px` | `800px` |
| `.arch-card` padding | `14px 44px 12px` | `24px 32px` | `24px 32px` |

Resolved to the newest throughout: 1380 × 712, `40px 56px 34px`, a 720px stage.

**Typographic.** Two type scales exist — h1 34/h2 18/h3 17/p 16 at line-height 1.2 (VC) against
30/16/15/14 at 1.25 (buyer). Two eyebrows — 11.5px with an 11px gap against 10px with an 8px gap.
Two covers, which agree on almost nothing: violet eyebrow at 2.4px tracking, a 47px headline and a
16.5px lead (VC) against an indigo eyebrow at normal tracking, a 46px headline, a 17px sub and a
pill tag row (buyer). Resolved to the VC values; the buyer cover survives as documented props
(`eyebrowTone`, `spacedEyebrow`) rather than as a second component.

**Semantic — the same class name means different things.**

- **`.cta`.** In `synos-tech-buyer-v2.html` it is a centred closing-*slide* layout with a 32px h1
  and a three-column `.cta-steps` grid. In all three one-pagers it is a bottom banner *bar*. The
  deck version has zero uses in its own body — dead CSS — so the one-pager banner is the live
  meaning and the one built as `CtaBar`. This is precisely the case the spec's "known conflicts"
  section anticipated.
- **`.sc`.** The horizon card at deck scale (14px radius, 18px padding, 19px title) and at print
  scale (10px radius, `9px 11px`, 12px title). Same object, two scales — kept as both.
- **`.wall`.** Identical shell in all four decks, two different sets of innards: a 15px italic
  quote plus a muted tag (VC) against a numbered red badge, a bold h4, a paragraph and a demoted
  italic quote under a dashed rule (buyer). Originally `WallCard` took both prop sets and `num`
  switched shapes; §8.2 has since been decided and the numbered shape is removed — `quote` + `tag`
  is now the only shape.
- **`.pillar` vs `.d1-pillar`.** Left-aligned on grey with a 1px border and an 11px radius (VC)
  against centred on white with a 1.5px indigo border and a 10px radius (buyer). Originally
  reachable as `PillarCard align="center"`; §8.2 has since been decided and `align` is removed —
  left-aligned is now the only shape.

**Chromatic.** The decks' brand gradient is indigo → violet (`--grad`). The VC one-pager's is
indigo → **teal**, and it defines `--teal: #0d9488`; the buyer decks define `--teal: #0e7490`; the
two CTO one-pagers have no teal at all. The newest VC deck writes `var(--teal, #0d9488)` as an
inline fallback, agreeing with the one-pager. Resolved: the deck gradient stays indigo → violet,
`--teal` takes `#0d9488`, and teal is scoped to the one-pager components where it actually appears.

Relatedly, phase 3's accent is **violet** in the newest deck and **teal** in tech-buyer-v2 and the
VC one-pager. Violet wins; `PhaseCard position="far"` is violet and no teal variant is offered.

Outside those, the token values are **byte-identical across all four decks** for every shared
token. The palette is settled even where the layout vocabulary is not — the single most useful fact
in the corpus.

## 5. Where the spec and the files disagreed — the files won

Per the instruction to say so rather than follow the spec off a cliff.

1. **`.cover .big` is 47px, not 58px.** The stylesheet declares 58px at line 126 and overrides it to
   47px at line 509 under a "v7 cover refit" comment. The same block cuts `.hero-sub` from 23px to
   16.5px, `.lede` from 16.5px to 12.3px, and `.coverseam` from 36% to 30%. The kit uses the
   effective values. The `cover` fidelity specimen asserts them against the rendered slide.
2. **The eyebrow has five hue variants, not two.** The spec names `.red` and `.violet`. All four
   decks also define `.indigo` and `.emerald`, and `.indigo` is used **75 times** — more than
   `.violet` (27) and `.red` (11) combined. `Eyebrow` ships `muted | indigo | violet | emerald |
   amber | red`.
3. **The spec's token list is missing four load-bearing tokens.** `--red-2 #ef4444` draws the left
   rule on every one of the 24 wall cards. `--amber-2 #f59e0b` colours a stat value. `--teal*` is
   in three of the seven artifacts. All are in all four decks (bar teal) and all are included.
4. **`--indigo-3 #818cf8`** is in the spec and declared in all four decks, but the two VC decks
   reference it **zero** times — it is live only in the buyer decks, where it draws the flow arrows,
   the bullet dots and the left rule on the memory-type cards, all one-off slides. Kept as a token;
   no component uses it.
5. **The 1380px frame is never 1380px in the shipped deck.** `.card-frame` declares
   `width: 1380px; max-width: 99%`, and the VC decks run reveal.js at `width: 1280`. The card as
   shipped renders at **1267.2px**. Both numbers are honoured: the component declares 1380px with a
   `maxWidth` prop defaulting to `'99%'`, so it clamps identically inside a 1280px stage and reaches
   1380px in a wider container. Fidelity captures use each deck's own stage size so both sides are
   measured under the same clamp.
6. **`.arch-card h1 { 24px }` and `.arch-card h2 { 13.5px }` never fire.** Both are specificity
   (0,1,1) and lose the tie to `.reveal h1` / `.reveal h2`, which come later in the same stylesheet.
   A shipped arch slide renders its h1 at 34px. The kit reproduces what ships; the dead overrides
   were removed after the fidelity gate caught the difference. The sibling `.arch-card .title-block`
   and `.arch-card .eyebrow` overrides in the same block are (0,2,0), do fire, and are reproduced.
7. **`notes` and `icard`** are listed in the spec as recurring structural classes. `notes` is
   invisible speaker-note markup; `icard` occurs four times across two files on one slide each.
   Both excluded (§2).
8. **`head-row` and `title-block` never co-occur.** The spec lists them side by side as if they
   were complementary. They are the two families' alternatives for the same job, which is why they
   became one component with a `layout` prop rather than two components.

Everything else in the spec's measurements checked out byte-for-byte: the `.card-frame` radius,
shadow and border; the eyebrow's `1.6px` tracking and `700` weight; the whole `:root` palette; the
three font families; the `.card-frame.arch-card` padding; the tinted-callout `bg`/`br`/text pattern
and its one-hue-per-meaning discipline.

## 6. Fidelity evidence

**27 specimens · 103 computed-style checks · 27 passing.** (Was 28 · 108 · 28 before §8.2 removed
the `wall-numbered` specimen along with the variant it exercised.) Full table in
`packages/brand-kit/fidelity/report/fidelity.md`; raw values in `fidelity.json`; images in
`fidelity/side-by-side/`.

How it works: for each specimen the harness renders the built component to static markup with the
built stylesheet, opens the real source slide over `file://`, pins reveal.js to scale 1 and
navigates to the slide, screenshots both at the same viewport, and compares
`getComputedStyle` for the named properties — `font-family`, `font-size`, `font-weight`,
`letter-spacing`, `line-height`, `color`, `text-transform`, and for anything with a surface the full
box: `background-color`, `background-image`, border widths, border colours, radius and all four
paddings. Grid rules additionally assert track count and evenness. Run it with
`npm run fidelity` from `packages/brand-kit`; it exits non-zero on any drift.

Two properties are normalised rather than compared literally, and the reasons are in the harness:
`font-family` compares the first family only (the sources quote the stack differently), and
`grid-template-columns` compares track count and evenness rather than used pixel widths (a specimen
is not the width of a slide, so used track widths are not comparable — the structural claim is).

**The gate found four real defects.** None of them were visible by eye at a glance, and all four
would have shipped:

1. **The base type scale silently overrode six components.** `.sk-deck h3` and `.sk-deck p` are
   specificity (0,1,1) against a component class's (0,1,0), so `PhaseCard`, `UseCaseCard`,
   `StepCard`, `CoverSlide`, `CtaBar` and `SectionHeading` were all rendering their body text at
   16px instead of 13px / 12.5px / 8.8px and their titles at 17px instead of 19px / 15.5px. Fixed by
   wrapping the element rules in `:where()`.
2. **`SlideHeader` zeroed its last child's bottom margin.** A tidy-looking rule I wrote, not
   something in the source, which drops the h1's 10px gap. Removed.
3. **A toned print chip lost its hue's border.** `Chip`'s tone rules preceded its scale rules, so
   `.sk-chip--print` re-narrowed the border to `--border-2` and beat `--emerald-br`. The source's
   `.pchip.paid` is emerald-bordered. Fixed by ordering tones last.
4. **The brain pillar's icon lost its white-on-gradient treatment** to the per-tone icon tints.
   Fixed by raising it to (0,3,0), which is the specificity the source itself uses.

It also produced the `.arch-card` finding in §5.6.

**One specimen is expected to differ and is kept as evidence, not as a failure.**
`eyebrow-buyer-conflict` asserts that the kit does **not** match `synos-tech-buyer-v2.html`'s 10px /
8px eyebrow — that is conflict C4 resolved in favour of the newest artifact. The harness reports it
as `CONFLICT` and fails the run if it ever starts matching.

### Coverage and its limits

Every component in the package has at least one specimen. What the gate does **not** cover, stated
plainly:

- **Only the properties named per check.** A property not listed is not compared. The lists were
  chosen as "what carries the brand" and are visible in `fidelity/scripts/specimens.mjs`.
- **Prop combinations are sampled, not exhausted.** `Callout` has 5 tones × 2 fills × 3 accents ×
  flush × banner × 2 scales; the specimens exercise one representative per tone at each scale plus
  the neutral fill, the top accent and the print scale. `Chip` similarly covers `sm`/`md`/`lg`/`pill`
  and print but not every tone at every size.
- **Layout is compared by computed style, not by pixel diff.** The side-by-side images are for a
  human to look at; the machine gate is the style comparison. A layout bug that produced identical
  computed styles on the sampled elements would not be caught.
- **Only the newest artifact of each pair is asserted against**, except `eyebrow-buyer-conflict`
  (tech-v2) and `onepager-outcome-heading` (1p-retail). `synos-vc-deck-v6`
  and `synos-ops-buyer.standalone` are inventoried but not used as fidelity targets — v6 because it
  is stylistically identical to `presenting`, ops-buyer because it is the oldest artifact and loses
  every conflict it participates in.

## 7. Commits

Two, conventional, on `feat/brand-kit-aug13`:

- `feat(brand-kit): extract SynOS deck + one-pager components from shipped artifacts` — inventory
  document, tokens, all 31 components, package scaffolding.
- `test(brand-kit): prove fidelity against the real slides, fix four drifts it caught` — the
  harness, the evidence, the four fixes and the `.arch-card` correction.

Nothing merged, nothing pushed, `main` untouched in both repositories. `~/ws/synos-gtm` was only
ever read; its pre-existing uncommitted changes were left exactly as found.

## 8. Recommended next steps, in order

1. **Review the inventory's conflict table before `/design-sync`.** Several resolutions are
   judgement calls that a founder should ratify, not inherit: the deck gradient staying
   indigo → violet while the one-pagers go indigo → teal (C13) is a brand-level decision, not an
   extraction one, and the same is true of phase 3 being violet rather than teal (C11).
2. **Decide whether the buyer decks are being retired.** Half the conflicts in §4 exist only because
   two design systems are live at once. If the buyer decks are going to be rebuilt on this kit, most
   of the `align="center"` / `num` / `rule="solid"` escape hatches become dead weight and should be
   dropped. If they are staying, they need a second pass to bring them onto the newest frame.
3. **Then run `/design-sync`,** which is out of scope here by the spec's own instruction.
4. **Optional, and deliberately not done:** an improvement pass. The spec is explicit that
   improvement is a later, deliberate pass, so nothing in this package tries to make the visual
   language better — only to state it exactly.

## 9. Decision on §8.2 — one vocabulary, not two

**Decided 2026-08-13: the buyer decks will be rebuilt on this kit.** The VC deck's vocabulary is
therefore canonical, and the buyer-family escape hatches are dead weight. Two were removed:

| Removed | Conflict | Evidence |
| --- | --- | --- |
| `WallCard`'s numbered shape — the `num` / `title` / `body` props, `.sk-wall--numbered`, `.sk-wall-num`, `.sk-wall-title`, `.sk-wall-body` and the demoted-quote rule | C9 | Zero uses of the numbered wall in the VC deck; buyer-only |
| `PillarCard`'s `align` prop and the `.sk-pillar--center` block | C10 | The VC deck uses the left-aligned `.d1-pillar` shape 10 times and the centred one never |

`WallCard` now takes `quote` + `tag` only; `PillarCard` is left-aligned with no alternative. The
`wall-numbered` fidelity specimen asserted against `synos-tech-buyer-v2.html` and went with the
variant, taking the harness from 28 specimens / 108 checks to 27 / 103. All 27 pass, and
`eyebrow-buyer-conflict` remains the one documented expected-difference.

**Nothing the VC deck renders changed.** Both removals were opt-in variants the VC deck never opted
into; the default shapes and their fidelity checks are untouched.

Deliberately **kept**, having been checked rather than assumed:

- **`Eyebrow`'s `tone`** — canonical, not a hatch. The VC deck itself uses indigo 12×, violet 10×,
  red 3× and emerald 3×.
- **`PillarGrid`'s `columns`** — an ordinary grid prop, default 3. Only its doc comment changed, to
  stop framing 4 as "the buyer decks".

Two of §8.2's three named hatches were dropped; `rule="solid"` was out of scope for this pass and
still stands. §4's `.wall` and `.pillar` bullets and §6's specimen counts were amended to match.
`docs/plans/2026-08-13-slide-inventory.md` is left as written — it is a dated record of what the
*sources* contain, and C9 / C10 are still true of those files; this section supersedes its notes on
what the *kit* exposes.
