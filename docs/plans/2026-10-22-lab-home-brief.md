# lab-home: homepage iteration 2 brief (2026-10-22)

Second homepage iteration. It continues rl-home direction D ("The Keynote"), which was chosen, with
a new positioning. Page: `/lab-home` (`public/lab-home.html`), branch `lab-home`, noindex, no
canonical until promoted. Everything in `2026-10-21-rl-home-brief.md` about claims discipline, copy
rules, CTAs, analytics, design partners and the three why-now facts still applies.

## Positioning

**Everyone can run their own post-training lab, with SynOS.**

One platform takes you there despite the odds. SynOS is an agentic training platform: its own agents
do the upstream work that normally needs a research team, and it runs inside your org.

## The odds (each upstream challenge, and what the platform does about it)

| The odds | What SynOS does |
|---|---|
| Context data preparation: records scattered, inconsistent, unlabelled | Platform agents curate the data and build the context layer |
| AI engineers and researchers are scarce and costly | Platform agents do the environment building, data cleaning and training work; a small team of domain experts and engineers runs the rest |
| Learnings from scattered sandboxes do not compound | One environment on live data; every run and correction accumulates in one place |
| Agent runtime monitoring: traces and evals | Every run traced, scored against your evals and priced per model and per provider |
| The RL loop is hard to close | Corrections become evals and training data; prompt optimisation first, then SFT and RL with verifiable rewards; a release that scores worse does not ship |
| Proprietary data leaving the org | The platform runs inside your org; data, traces and weights stay there |

## What the platform's agents do (inside your org)

1. Curate the data
2. Build the context layer
3. Build and deploy your agents
4. Monitor your agent runs (traces and evals)
5. Optimise the prompts for performance
6. Generate training datasets
7. Work with your human experts on supervised fine-tuning
8. Build and launch apps

## Section order (data-section names)

hero · why-now · odds · platform-agents · schematic · components (The Brain, The Agent Runtime,
The Training Plane, with benefits folded in) · become-ai-native · faq · bottom-cta

## Copy notes

- "Lab" is the organising metaphor. Keep it concrete: a post-training lab is the environment, the
  data, the evals and the training runs, which SynOS provides as software, run by your own people.
- "Despite the odds" can appear once as language; do not dramatise it.
- No claim that SynOS drives agents a customer already built on another framework. "Build and
  deploy your agents" refers to agents built on SynOS.

## Why-now revision (2026-10-22)

The 83.6% Scale AI fact is replaced by R1's result: an open-weight model post-trained on one task was
5x cheaper than a frontier model and 28% more accurate. Source: R1, "Long-context medical reasoning to reduce
denials", Oct 15, 2026 (r1rcm.com). Hospital appeals of denied claims; R1-super on NVIDIA Nemotron 3.5 Super;
pass@4 on 16 synthetic cases, 71.9% at an estimated $1.20 against GPT-6 Sol at 56.3% and $7.08 (5.9x, +28% relative).
Costs are projected serving costs. On a single attempt GPT-6 Sol led, 35.2% to 31.3%. The page carries no footnote
(removed by request 2026-10-22); the source line names R1, Oct 2026.

Presented as 80% lower cost with a falling arrow and two bars to scale ($7.08 against $1.20), rather than
a multiple: multiples read poorly for savings. 80% understates the measured 83%. Superseded below.

## Cost slider (2026-10-22)

Why-now carries a slider across three published results, each an open-weight model (Nemotron 3.5 Super
family) post-trained for one task against the frontier model it replaced. Default is the 40x case.

| Task | Source | Cost | Accuracy | Speed |
|---|---|---|---|---|
| Hospital claim appeals | R1, Oct 15 2026 | 5.9x lower ($1.20 vs $7.08), shown as 80% | 28% more accurate (pass@4) | |
| M&A due diligence (EY) | Scale AI blog, "Scale Partners With NVIDIA", Oct 15 2026 | about 1/18, 94% | matched | more than 2x faster |
| Vendor credit review (Skydance) | same | about 40x lower, 97% | matched | 5x faster |

Scale's figures are measured on production tickets and held-out data rooms. The baseline frontier model is unnamed in
both. Scale's third case (an insurer's copilot, 1/4 cost) is left out: its baseline is not described as a frontier model.

## Why-now layout (2026-10-22, later)

Two facts, each paired with the chart that explains it. The 95% MIT NANDA fact is removed.

- **~3% gap** with a line chart of the Arena gap between the top closed and top open model, redrawn from the values
  the AI Index 2026 chapter 2 text states for Figure 2.1.2: 15.2% (May 2023, GPT-4-0314 vs Vicuna-13B), 0.5%
  (Aug 2024), 3.4% (Mar 2026, Claude Opus 4.6 1,503 vs GLM-5 1,454; the chapter highlights say 3.3%). Only the
  stated points are plotted; lines join them. The original figure image could not be fetched or reused.
- **Lower cost** tile, explained by the cost slider beside it.

Update: the gap chart now plots both monthly series (top closed and top open Arena score, May 2023 to
March 2026) read off the published Figure 2.1.2 supplied by the founders, with the gap shaded. Model names are
removed by request. Values are approximate readings (about 2 Arena points); end points are the stated 1,503 and
1,454. Caption: "Stanford HAI, AI Index 2026" only; no legend, lines labelled directly.

Revision (2026-10-22, later): no credits under the two anchor numbers. The cost anchor is a static
"$$$" with the falling arrow and the line "Early adopters have reported lower costs and higher performance
with domain-trained open weight models." The slider has no title block, keeps one fixed height (the tallest slide, re-measured on resize), auto-rotates every 3 s (pauses on hover or focus, stops once a reader picks a
slide, off under reduced motion), and its tabs show only the task and the multiple. The source stays in the
panel's bottom line.

Revision: the slider bar is removed; the three tabs rotate every 3 s and show which result is on screen. Every
block in the panel keeps its tallest height, so nothing moves between slides. The two why-now rows zig-zag on
desktop (gap: number left, chart right; cost: panel left, $$$ right); on phones each number sits above its panel.

Slide order: vendor credit review (40x), hospital claim appeals (R1), M&A due diligence (18x). Each change
slides in (0.45 s, off under reduced motion); a tap on a tab stops the rotation. On desktop the gap chart panel
takes the same height as the cost panel.

## The road (odds section, 2026-10-22)

The odds section is no longer a twelve-phrase table. Headline "Building your own AI takes a lab.", line "Six
things usually stand in the way." A road runs from "Your agents today" to "Your post-training lab" with six red walls,
two or three words each: Messy data, No AI researchers, Learnings don't compound, Blind agent runs, Open RL loop,
Data leaves the org. The run is tied to scroll (revised later on 2026-10-22): as the road moves from the lower part of the screen
to the upper third, a SynOS token travels it and each wall drops and its name is struck as the token passes; scrolling
back raises them, so it replays on every pass. At the end the road turns green and the lab label lights. Closing line: "One
platform clears all six, inside your org." No button. Reduced motion shows the end state. Vertical on phones. The
per-blocker fixes are carried by the platform-agents section that follows.

Revision: headline "What’s standing in your way.", line "AI Natives cross these to get ahead." The road ends on
"Your own AI" (was "Your post-training lab"), with a small agent icon at the start and an AI icon at the end that
lights when the road is cleared. Cleared walls become green rising steps (each taller than the last), so the
road reads as a ladder up to your own AI; on phones the steps grow in width down the column.

Revision: "Your own AI" is a single luminous point (the same light as the hero's "Your model"), grey at rest
and glowing white-green when the road is cleared. Each wall now collapses continuously as SynOS passes; its name
lights green while the wall falls and is struck through once it has become a step.

Revision: the road's closing line is "Clear all hurdles with SynOS." and appears only once every wall is down.
The hero chart is scroll-driven too: a glowing ball travels the line from "curate" through v1 and v2 to "Your
model" (v3) as the reader scrolls, lighting each agent step and version it passes; reversible. In why now, on
desktop, the cost row slides up over the gap row and holds, leaving the ~3% and a faded line of its text in view
(sticky rows with a spacer); on phones the rows stay in normal flow.

Revision: in why now (desktop, when it fits the screen) the heading pins and the cost row fully covers the gap
row beneath it; on shorter screens and phones the rows stay in normal flow. The road line runs from the "Your agents
today" icon to the "Your own AI" light on desktop as on phones. "It runs inside your org." became "SynOS runs
inside your org." The platform diagram shows its dark version in both themes. "Three parts." became "What you
get." with "SynOS is installed in your cloud, above your existing systems and below your Agents." FAQ 2 now
reads "A small team of domain experts and engineers runs it with support from SynOS."

Revision: the hero text link and the bottom-banner button read "Tell me more" (calendar link, data-cta unchanged);
the banner heading stays "Bring one use case." The sticky top bar carries only "Request early access". In why now
the pinned heading and rows release as soon as the cost row has fully covered the gap row (no hold).

Revision: the cost slides follow the scroll; no auto-rotation, no slide-in animation. On desktop, once the cost
row covers the gap row the section holds (a 110vh spacer) while the reader scrolls through the three results in
thirds, then the whole section scrolls up. On phones the slide follows the panel's position as it passes. Tabs
stay clickable; the next scroll resumes from the reader's position.

Revision: the "Bring one use case." banner is removed. "Become AI native." moves to the end of the page, after the
FAQ, on the dark panel the banner used (tiles lifted slightly off black). The AMI quiz link went with the banner.
Published on main at /rl-home-3.
