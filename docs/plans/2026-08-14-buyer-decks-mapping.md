# Buyer decks on the kit — the mapping, before the rebuild

The backlog's item 7 said: *"Two families collapsed into one vocabulary, so they rebuild on the same
components."* This measures that claim against the actual files before anyone spends a day on the
port. The claim is **half right, and the half that is wrong changes the plan.**

Canonical source is `synos-ops-buyer.html` (43 sections), **not** the 38-section standalone.

## What is actually one vocabulary

| Pair | Shared class names | Share of the ops deck's class *uses* covered |
|---|---|---|
| ops ↔ tech-buyer | 288 of 328 | **91%** |
| ops ↔ VC deck v6 | 65 of 328 | 29% |

So the two buyer decks are one family — porting one really does port the other, and that part of the
claim holds. But **the kit was extracted from the VC deck**, and the buyer family shares less than a
third of its class vocabulary. Rebuilding the buyer decks is therefore not the same shape of job as
the VC rebuild was, and planning it as "the same again" would have been wrong.

## Class names understate it — the component-level map

Name overlap is a floor, not the answer: the buyer decks call a pillar `.pillar` where the VC deck
calls it something else, and the kit already has `PillarCard`. Mapped by *shape* rather than by
name, across 1,210 class uses in the ops deck:

| Group | Uses | Kit answer |
|---|---|---|
| Frame, header, eyebrow | 187 · 15% | `SlideFrame` / `SlideHeader` / `Eyebrow` |
| Use-case, why, template, trust cards | 84 · 6% | `UseCaseCard` family |
| **Two-line chips** | **77 · 6%** | **nothing — deliberately excluded** |
| Architecture diagram vocabulary | 66 · 5% | nothing, and correctly so |
| Pillars | 42 · 3% | `PillarCard` / `PillarGrid` |
| Steps | 41 · 3% | `StepCard` / `StepGrid` |
| Tables | 40 · 3% | `Matrix` (built 2026-08-14, did not exist when item 7 was written) |
| One-line chips | 39 · 3% | `Chip` / `ChipRow` |
| Walls | 18 · 1% | `WallCard` / `WallGrid` |
| Everything else | 616 · 50% | see below |

That 50% remainder is **not** 50% of a rebuild. Of its 270 distinct classes, **119 are used exactly
once**, and the most frequent by a wide margin are colour utilities — `indigo` (27), `muted` (23),
`accent` (5), `violet` (4) — which the kit expresses as `tone` props rather than as classes. This is
the same long tail the VC inventory found and deliberately excluded ~60 one-offs from.

## The two real gaps

1. **Two-line chips — 77 uses, the single largest genuine gap.** `.harness-chip` and `.tool-chip`
   carry a name plus a quieter descriptor line, sometimes with an icon block. The kit's `Chip` is
   deliberately one nowrap line; the slide inventory (§5.5) excluded these on the grounds that they
   are cards, not chips. At 77 uses across the buyer family that judgement should be revisited — it
   was made when the corpus was the VC deck, where they barely appear. The VC deck rebuild had to
   relax `white-space` on `.sk-chip` locally to get through its architecture slides, which is a
   second vote for the same conclusion.
2. **Architecture diagram vocabulary — 66 uses.** `.node`, `.edge-indigo`, `.brain`, `.arch-row`.
   This should stay out of the kit, exactly as the VC deck's five SVG slides did: the kit has no
   diagram language, and one that exists to serve two decks is drift wearing a component's clothes.

Everything else in the top of the distribution already has a home.

## What this changes about the plan

- Item 7 is **not** blocked on the kit gaining a lot — it is blocked on **one component**: a
  two-line chip. Build that first, from the buyer corpus rather than from the VC deck, and the port
  becomes the same mechanical job the VC deck was.
- `Matrix` landing on 2026-08-14 already removed what would have been the second-largest gap. Item 7
  is cheaper now than when it was written.
- Port `synos-ops-buyer.html` first and `synos-tech-buyer.html` second; at 91% shared vocabulary the
  second should be near-mechanical, and if it is not, that is the finding.

## Status

**The port itself is not started.** This is the measurement that precedes it, done deliberately
first because the plan it produced is different from the plan that was written. 43 sections is a
session's work of its own and half-porting a deck leaves an artifact nobody can send.
