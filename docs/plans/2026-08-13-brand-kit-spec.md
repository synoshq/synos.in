# SynOS Brand Kit — build spec

Branch: `feat/brand-kit-aug13` in `~/ws/synos-landing`.

Build a real React component package for **decks and one-pagers**, extracted from the artifacts
SynOS already ships. It gets synced to claude.ai/design via `/design-sync` afterwards, so the design
agent builds investor decks and prospect one-pagers out of real, on-brand parts.

**This is an extraction job, not a design job.** The source artifacts are the authority. Where they
disagree with each other, the *most recent* one wins and you record the conflict. Do not invent a
component that has no precedent in the source files, and do not "improve" the visual language while
extracting it. Improvement is a later, deliberate pass.

## Source artifacts — the authority, in priority order

Repo: `~/ws/synos-gtm` (read-only for this task — do not modify it).

**Decks** (Reveal.js, one `<section class="has-card">` per slide):
1. `presentations/synos-vc-deck-presenting.html` — 2026-08-12, the newest. **Primary reference.**
2. `presentations/synos-vc-deck-v6.html` — 2026-08-12.
3. `presentations/synos-tech-buyer-v2.html` — 2026-08-09.
4. `presentations/synos-ops-buyer.standalone.html` — 2026-07-17, oldest of the four.

**One-pagers** (standalone print-oriented pages):
5. `pitch-materials/SYNOS_VC_1PAGER.html` — 2026-08-11.
6. `pitch-materials/1pager-retail-multistore-cto.html` and `1pager-financial-inclusion-cto.html` — 2026-08-09.
7. `pitch-materials/SYNOS_FOUNDER_MEMO_SHORT.html` — 2026-08-11, long-form register.

**Design corpus** (already-written analysis, use as a cross-check, NOT as the authority):
`~/ws/synos-gtm/design-corpus/BRAND_SYSTEM.md` and `design-corpus/ds-bundle/editorial/*.html`.
Where the corpus and a real deck disagree, **the deck wins** — the corpus is one reading of them.

## What the source files already establish

Measured, not guessed. Verify each before relying on it.

**Deck frame.** `.card-frame` is `width:1380px; height:712px; border-radius:20px;
padding:40px 56px 34px; background:var(--surface); border:1px solid var(--border);
box-shadow:0 1px 3px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.04)`, centred in a 720px-tall
section. A variant `.card-frame.arch-card` tightens to `padding:14px 44px 12px` for diagram-heavy
slides.

**Eyebrow.** `font-size:11.5px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase;
color:var(--muted); margin-bottom:11px`, with hue variants `.red`, `.violet`, and a cover variant at
`letter-spacing:2.4px`.

**Token set** (deck `:root`): `--ink #0f172a`, `--ink-2 #334155`, `--ink-3 #475569`, `--muted #64748b`,
`--dim #94a3b8`, `--bg #f1f5f9`, `--surface #ffffff`, `--surface-2 #f8fafc`, `--border #e2e8f0`,
`--border-2 #cbd5e1`, `--indigo #4338ca`, `--indigo-2 #6366f1`, `--indigo-3 #818cf8`,
`--indigo-bg #eef2ff`, `--indigo-br #c7d2fe`, `--violet #7c3aed`, `--violet-bg #f5f3ff`,
`--violet-br #ddd6fe`, `--emerald #047857`, `--emerald-bg #ecfdf5`, `--emerald-br #6ee7b7`,
`--amber #92400e`, `--amber-bg #fffbeb`, `--amber-br #fcd34d`, `--red #b91c1c`, `--red-bg #fef2f2`,
`--red-br #fecaca`, `--grad linear-gradient(135deg,#6366f1,#7c3aed)`.

**Fonts.** Plus Jakarta Sans (500/600/700/800) display, Inter (400/500/600/700) body, JetBrains Mono
(500/600) for keys, labels and eyebrows-in-mono. Loaded from Google Fonts.

**The tinted-callout pattern**, used everywhere: a `bg` + `br` border + saturated text of the same
hue. One hue per meaning — indigo for us/SynOS, violet for AI/knowledge, emerald for a win, amber for
caution, red for pain.

**Recurring structural classes** across the newest three decks: `card-frame`, `has-card`, `eyebrow`,
`title-block`, `head-row`, `notes`, plus chip families (`stk-chip`, `source-chip`, `harness-chip`,
`d1-chip`, `pchip`), `pillar`, `icard`, and the `k`/`n`/`t` micro-label convention.

## Task

### 1. Inventory before you build

Read all seven source artifacts and produce `docs/plans/2026-08-13-slide-inventory.md`: every distinct
slide and block archetype you find, how many times each occurs and in which files, and which are
one-offs. **Frequency is the selection criterion** — a pattern used once in one deck is not a
component, it is a bespoke slide. Bring the recurring ones forward; list the one-offs as explicitly
out of scope.

Expect to find, among others: cover, big-type statement, eyebrow+title+body, two-column split,
today-vs-next dual rail, tinted callout grid, stat row, stack/chip row, pillar grid, architecture
diagram card, quote, notes footer. Confirm or correct that list against what is actually there.

### 2. Build the package

`packages/brand-kit/` inside this repo. React 18 + TypeScript, Vite library mode, its own
`package.json`. The root repo currently has no build; adding one here is expected and intended.

- **Tokens live in exactly one CSS file** and are the deck values above. Every component reads
  `var(--*)`. No hardcoded hex in any component.
- **Two scales, one system.** Deck components render at the 1380x712 frame. One-pager components
  render at print width. They share tokens and fonts; they do not share padding or type scale.
- Props over variants-by-copy-paste: a `Callout` takes `tone="indigo|violet|emerald|amber|red"`,
  it is not five components.
- Every component gets a real TypeScript prop interface with doc comments. `/design-sync` turns
  those into the API contract the design agent codes against, so a vague prop type becomes a
  vague design agent.
- Ship a `SlideFrame` that owns the 1380x712 card and an `arch` variant, since every deck slide sits
  in one.

### 3. Prove fidelity — this is the gate that matters

For each component, render it and compare against the real slide it came from.
Playwright is available (`~/ws/cursor_experiment/frontend/node_modules/playwright`).

- Screenshot the source slide from the original deck HTML and the equivalent built component at the
  same viewport, and put them side by side in `packages/brand-kit/fidelity/`.
- Computed-style checks on the properties that carry the brand: font-family, font-size,
  letter-spacing, border-radius, padding, the tinted-callout bg/border/text triple.
- **A component that does not match its source is not done.** Record any deliberate deviation in the
  inventory doc with the reason.

### 4. Report

`docs/plans/2026-08-13-brand-kit-report.md`: what was extracted, what was deliberately left out and
why, every conflict found between the four decks and how it was resolved, and the fidelity evidence.
Commit in logical chunks, conventional commits. Do not merge, do not push.

## Explicitly out of scope

Rebuilding synos.in on these components. Web patterns (hero, feature grid, nav, footer) — decks and
one-pagers only. Touching `~/ws/synos-gtm`. Running `/design-sync` (that happens after review).

## Known conflicts to expect

The four decks were written over two months and drifted. The ops-buyer deck is the oldest and least
likely to match. Where a class name means different things in different decks, the newest VC deck is
canonical. Record every such case rather than silently picking one.
