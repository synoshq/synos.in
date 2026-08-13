# Fidelity report

27 specimens · 103 computed-style checks · 27 passing, 0 failing.

Each specimen renders a built component and the real slide it was extracted from at the same
viewport, screenshots both, and compares the computed values of the properties that carry the
brand. Side-by-side images are in `fidelity/side-by-side/`.

| Specimen | Component | Source | Checks | Result |
|---|---|---|---:|---|
| `slide-frame-default` | SlideFrame | presenting s2 | 1 | PASS |
| `slide-frame-arch` | SlideFrame variant="arch" | presenting s6 | 5 | PASS |
| `eyebrow-indigo` | Eyebrow tone="indigo" | presenting s7 | 1 | PASS |
| `eyebrow-violet` | Eyebrow tone="violet" | presenting s2 | 1 | PASS |
| `eyebrow-red` | Eyebrow tone="red" | presenting s4 | 1 | PASS |
| `eyebrow-buyer-conflict` | Eyebrow (vs buyer deck — conflict C4) | tech-v2 s3 | 1 | CONFLICT (expected difference) |
| `slide-header-row` | SlideHeader layout="row" | presenting s2 | 2 | PASS |
| `cover` | CoverSlide | presenting s1 | 6 | PASS |
| `big-type` | BigTypeSlide | presenting s22 | 6 | PASS |
| `callout-deck` | Callout | presenting s24 | 1 | PASS |
| `chips` | Chip / ChipRow | presenting s24 | 2 | PASS |
| `chip-md` | Chip size="md" | presenting s6 | 1 | PASS |
| `wall` | WallCard / WallGrid | presenting s34 | 4 | PASS |
| `pillar` | PillarCard / PillarGrid | presenting s6 | 5 | PASS |
| `pillar-brain` | PillarCard brain | presenting s6 | 4 | PASS |
| `phase` | PhaseCard / PhaseRow | presenting s10 | 8 | PASS |
| `usecase` | UseCaseCard / UseCaseGrid | presenting s30 | 6 | PASS |
| `stat` | StatCard / StatRow | presenting s27 | 5 | PASS |
| `step` | StepCard / StepGrid | presenting s7 | 8 | PASS |
| `split` | SplitColumns / SplitColumn | presenting s28 | 5 | PASS |
| `caption` | Caption | presenting s25 | 1 | PASS |
| `quote` | QuoteBar | presenting s26 | 1 | PASS |
| `onepager-header` | OnePagerHeader | 1p-vc | 7 | PASS |
| `onepager-callout-chip` | Callout / Chip at print scale | 1p-vc | 6 | PASS |
| `onepager-phase` | PhaseCard scale="print" | 1p-vc | 5 | PASS |
| `onepager-cta` | CtaBar | 1p-vc | 4 | PASS |
| `onepager-outcome-heading` | OutcomeCard / SectionHeading | 1p-retail | 6 | PASS |

## Recorded conflicts — differences that are correct

### `eyebrow-buyer-conflict`

C4: the buyer decks run the eyebrow at 10px / margin-bottom 8px. The newest deck wins at 11.5px / 11px. This check is expected to differ and is kept as evidence of the conflict.

- `font-size`: source `10px` · built `11.5px`
- `margin-bottom`: source `8px` · built `11px`
