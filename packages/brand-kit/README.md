# @synos/brand-kit

SynOS brand components for **investor decks and prospect one-pagers**, extracted from the seven
artifacts SynOS already ships (`~/ws/synos-gtm`). Not a web component library — no hero, no nav, no
feature grid.

```tsx
import '@synos/brand-kit/styles.css'
import { SlideFrame, SlideHeader, WallGrid, WallCard, Callout } from '@synos/brand-kit'

<SlideFrame>
  <SlideHeader
    layout="row"
    eyebrow="Why AI transformation stalls"
    eyebrowTone="red"
    title="Six walls between a clever demo and real company value."
  />
  <WallGrid>
    <WallCard quote="“Nobody knows what anyone else automated.”" tag="No shared context." />
    {/* … five more */}
  </WallGrid>
  <Callout tone="indigo" fill="neutral">
    Six walls. <strong>One layer that answers all six.</strong>
  </Callout>
</SlideFrame>
```

## Two scales, one system

| | Deck | One-pager |
|---|---|---|
| Frame | `SlideFrame` — 1380 × 712 card | `OnePagerPage` — A4 portrait |
| Type | 10–19px | 7–13px |
| Root class | `.sk-deck` | `.sk-print` |

They share `src/styles/tokens.css` and the three fonts. They deliberately share no padding and no
type scale — the sources set them independently.

`Callout`, `Chip`, `PhaseCard`, `QuoteBar` and `Eyebrow` exist at both scales via `scale="print"`.

## Tones

`indigo` = us / the layer · `violet` = AI, agents, what comes next · `emerald` = a win ·
`amber` = caution or an objection · `red` = pain or a wall. One hue per meaning; do not reassign.

## Where the values come from

Every measurement was read out of the shipped artifacts. `tokens.css` is the only file containing a
literal colour; where a source hardcoded a hex inline it is promoted to a token with its origin
named in a comment.

- **Inventory and every conflict found** — `docs/plans/2026-08-13-slide-inventory.md`
- **What was extracted and what was left out** — `docs/plans/2026-08-13-brand-kit-report.md`

## Scripts

```bash
npm run build        # tsc --noEmit && vite build  → dist/
npm run typecheck
npm run inventory    # reproduce the class-frequency table from the sources
npm run inventory -- --slides   # per-slide archetype walk
npm run fidelity     # the gate: screenshots + computed-style diff against the real slides
```

`npm run fidelity` requires `dist/` to be built. It opens `~/ws/synos-gtm` **read-only** and writes
only inside `fidelity/`. It exits non-zero if any component drifts from its source.

Playwright is resolved from `~/ws/cursor_experiment/frontend/node_modules/playwright` rather than
being added as a dependency here, so this package stays dependency-light.
