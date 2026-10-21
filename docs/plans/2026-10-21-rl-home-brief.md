# rl-home: homepage iteration brief (2026-10-21)

Three approaches to a new homepage that leads with the biggest thing SynOS delivers: **your own AI**.
A company post-trains an open-weight model on its own proprietary data, curated by its own human
domain experts. That is the highest level of AI nativity a business can reach.

Review URLs (branch `rl-home`, not merged to `main`):

- `/rl-home` chooser · `/rl-home/a` · `/rl-home/b` · `/rl-home/c`
- Destinations for the two callouts: `/vertical-saas`, `/ai-transformation` (holding pages, noindex)

All pages under `/rl-home` carry `<meta name="robots" content="noindex">` and no canonical to `/`
until one approach is chosen and promoted.

## Product brief (from the founders)

SynOS lets a small team of domain experts and engineers run their own post-training lab.

SynOS installs inside a company's own cloud, on top of the systems and historical data it already
has. It builds training environments where agents work on live data, but their actions are recorded
instead of executed. When an expert corrects an agent, the correction is saved as eval and training
data. The platform uses it to improve the agents, first through prompt optimisation (GEPA) and then
by post-training an open-weight model with SFT, RL with verifiable rewards and similar methods. With
each run the agents become more accurate and less expensive than frontier models, and the company
owns the models.

Why now: open-weight models are now good enough to post-train, and training itself has become
cheaper. Building the environments and cleaning up the data is still hard, and most companies do not
have a research or engineering team to do it. SynOS platform agents work on those parts
autonomously, so a small team of domain experts and engineers can build their own models. The bet:
in every domain, the companies that pull ahead will be the ones that use their own data and
expertise to train their own models.

## The three solution components (names are fixed)

1. **The Brain**: connects the systems and historical data the company already has, resolves the
   same entity across sources, and holds the procedures experts follow. The context every agent and
   every training run reads from.
2. **The Agent Runtime**: where agents run against live data. Writes are intercepted and recorded
   rather than executed, then scored. Expert corrections are captured in the tools experts already
   use. Every run priced per model and per provider.
3. **The Training Plane**: turns runs and corrections into evals and training data, improves agents
   first with prompt optimisation (GEPA), then post-trains an open-weight model (SFT, RL with
   verifiable rewards). Platform agents do the environment building and data cleaning. A release that
   scores worse than the last one does not ship. The weights are yours.

## Section order (data-section names in brackets)

- Hero `[hero]`: position the lead value, your own AI.
- BTF-1 `[why-now]`: lead with the key facts supporting training your own model (sourced, below).
- BTF-2 `[upstream]`: the upstream challenges to training your own model.
- BTF-3 `[solution]`: The Brain, The Agent Runtime, The Training Plane.
- BTF-4 `[schematic]`: the SynOS schematic.
- BTF-5 `[benefits]`: the benefits of each of the three components.
- BTF-6 `[become-ai-native]`: two callouts. "I am a vertical SaaS provider" → `/vertical-saas`
  (SynOS for Vertical SaaS). "I am a large enterprise with an AI transformation mandate" →
  `/ai-transformation` (SynOS for AI Transformation).
- BTF-7 `[faq]`: FAQs.
- BTF-8 `[bottom-cta]`: banner "Bring one use case", secondary CTA "Not sure where to start? Take
  the AMI quiz" → `/agent-maturity-index`.

## Why-now facts (use these, with the source named on the page)

| Fact | Source |
|---|---|
| The top open-weight model sits within about 3% of the top closed model on Arena (GLM-5 1,454 vs 1,503, March 2026). | Stanford HAI, AI Index 2026, ch. 2 |
| A 4B open model post-trained with RL on a law firm's task scored 83.6% against GPT-5's 79.6%, and cut answers invented for unanswerable questions from 49% to 21%. | Scale AI Labs, Nov 2025 |
| LoRA matched full fine-tuning for RL, even at rank 1, at roughly two-thirds the compute per pass. | Thinking Machines, "LoRA Without Regret", Sep 2025 |
| Open-model inference prices fell roughly 6x to 50x over three years. | Mozilla, State of Open Source AI, 2026 |
| About 95% of enterprise generative AI pilots stalled before scaled adoption; the cause was a learning gap between tools and workflows, not model quality. | MIT NANDA, The GenAI Divide, Aug 2025 |

Links: hai.stanford.edu/ai-index/2026-ai-index-report ·
labs.scale.com/blog/scaling-enterprise-agent-performance-with-reinforcement-learning-via-verifiable-feedback-loops ·
thinkingmachines.ai/blog/lora · opensource.org/blog/the-ai-era-arcs-toward-openness ·
computing.co.uk/news/2025/ai/mit-report-95pc-corporate-generative-ai-pilots-fail

## Upstream challenges (BTF-2 raw material)

- The training environment: agents need somewhere to act on real systems without consequences.
  Copies and sandboxes drift from the business.
- The data: historical records are scattered across systems, inconsistent, and unlabelled. What
  experts know lives in their heads, not in a dataset.
- The reward: someone has to decide what "correct" means, per task, and keep it current.
- The team: research engineers who build environments and run post-training are scarce and costly.
- The loop: corrections made in production rarely flow back into the model.
- Sovereignty: training data cannot leave the company's boundary.

## Design partners (never name them)

- A marketing automation platform: marketing agents.
- A distributed database company: cloud cost agents.
- A large publicly listed automotive manufacturer: cloud cost agents.

## Claims discipline (binding, from CLAUDE.md and docs/COPY_STANDARD.md)

- Never quote a cost reduction or accuracy improvement percentage for SynOS. Third-party facts in
  why-now are fine because they are sourced.
- No approval claim. Writes are "intercepted and recorded rather than executed, then scored".
- No connector count. No customer names. No competitor jabs.
- "You" throughout; "we" only for something specific we built.
- No em dashes or en dashes anywhere in rendered text. No banned words: leverage, robust, seamless,
  unlock, delve, journey, quietly, moat, game-changer, cutting-edge, best-in-class, revolutionise,
  revolutionize, empower, supercharge, effortless, turnkey. No "not just X but Y", no "X isn't the
  problem, Y is", no payoff beats ("That's the gap."). Casing: SynOS. Never "Operating System",
  "AI OS", "shared brain", "Context Brain".
- Primary CTA `/early-access`, secondary `https://calendar.app.google/5TydwUfWCfrxn5tj7`.
  `data-cta` values follow `cta-<action>-<place>`. GA tag `G-MXVRX5VMJR` in the head.
