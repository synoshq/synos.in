# SynOS Landing Page

## Deployment
- Vercel auto-deploys from `main` branch
- Vercel serves only from `public/` (configured in `vercel.json` → `outputDirectory: "public"`)
- Root-level HTML files are NOT served. Single source of truth is `public/`.
- Live at: https://www.synos.in

## Structure
- Static HTML/CSS/JS, no build step.
- Each top-level page is its own file in `public/`:
  - `public/index.html` — landing
  - `public/use-cases.html` — grid index for example agent operating-layer use-cases
  - `public/blog.html` — links to Substack posts
  - `public/product.html`, `public/about.html`
  - `public/scorecard.html` — interactive 5-question diagnostic
  - `public/early-access.html` — primary CTA waitlist (Web3Forms email capture)
- Use-case sub-pages live in `public/use-cases/<slug>.html`
- Images in `public/img/` and `public/`.

## Canonical Slugs

Home X-Brain cards link to `/use-cases` anchors (kebab-case, lowercase):

- `/use-cases` — Company Brain (flagship) → top of grid, no `#company-brain` anchor
- `/use-cases#sales-brain` — Sales Brain
- `/use-cases#marketing-brain` — Marketing Brain
- `/use-cases#internal-ops-brain` — Internal Ops Brain
- `/use-cases#support-cx-brain` — Support / CX Brain
- `/use-cases#custom-agents` — Custom AI agents & products
- `/use-cases/cloud-finops-agents` — FinOps Brain → only deep sub-page at launch (`public/use-cases/cloud-finops-agents.html`)

**PENDING:** the `#sales-brain` / `#marketing-brain` / `#internal-ops-brain` / `#support-cx-brain` / `#custom-agents` anchors are built in a FOLLOW-ON use-cases plan — the home cards already point at them, but the targets aren't in `/use-cases` yet. Wire them up there before launch.

## Use-Case Framing Convention

`[X] Brain` is the canonical TEMPLATE-pattern naming on the home page:

- **Company Brain** (flagship / umbrella — full-width anchor card; every function brain sits inside it)
- **Sales Brain**, **Marketing Brain**, **FinOps Brain**, **Internal Ops Brain**, **Support / CX Brain**
- **Custom AI agents & products** (AI builders & agencies — build on the same rails)

Frame each as **"a template your team builds on SynOS and OWNS,"** tuned over time on your data and corrections — a starting point you extend, not a ceiling. NOT a productized SKU.

- Company Brain: the umbrella pattern — one living context graph across every team; function brains are instances inside it. Card links to `/use-cases`.
- No live customer deployments named anywhere. Anonymized outcome shapes only. No firm savings figures presented as Synos-delivered.

KEEP the ban on productized SKUs. Use:
- ✅ "Sales Brain — a template your team builds and owns on SynOS."
- ✅ "Templated brains, tuned to how you operate."
- ✅ "What teams can build on SynOS."
- ❌ "Buy Sales Brain."
- ❌ "Our Sales Brain product."
- ❌ "Use cases" as a consumer noun (URL slug only).

## Landing Page Architecture (vNext)

Section order (each `<section>` carries a `data-section` name, shown in parens):

1. **Hero** (`hero`) — eyebrow "The Agent-Native Operating Layer", H1 "The infrastructure to unblock your agentic transformation.", pillar subhead (Context Brain / skills / agent-native storage / deploy / access control), focus strip, clients line ("For companies, products, and agencies going AI-native."), trust line ("Self-hosted. Your data stays yours. Model + harness agnostic."). PRIMARY CTA = "Request early access" (`/early-access`); secondary = "Book a 30-min demo".
2. **Six walls — problem** (`walls`) — section-label "Why a layer"; H2 "Six walls between a clever demo and real company value."; inlines the D3 six-walls diagram; bridge line "Six walls. One layer that answers all six. ↓".
3. **Six pillars — answer** (`pillars`) — section-label "The operating layer"; H2 "Each wall, closed by one piece of the layer."; inlines the D1 architecture diagram; 6 pillar cards, each tagged with the wall it closes (`Closes wall 0N`). **Context Brain is the anchor/centre** (full-width brain card).
4. **Focus on impact / vs-alternatives** (`focus`) — section-label "Focus on impact, not plumbing"; H2 "Build the 20% that's you. We ship the infra."; folds in "Buy it / Own it" cards + the works-with-your-stack claims (BYOA · Models · Connectors · Deploy) + logos as a sub-row.
5. **X-Brain templates** (`what-teams-build`) — section `id="what-teams-build"`; Company Brain flagship anchor card + 6 brain cards (Sales / Marketing / FinOps / Internal Ops / Support-CX / Custom AI agents & products).
6. **Bottom CTA** (`bottom-cta`) — early-access primary + demo secondary; scorecard + Substack as tertiary line below.

Notes:
- **"Five walls" → "Six walls"** (problem framing is now six walls, six pillars).
- **Trust-ladder is NOT a home section.**
- The old **"What's inside the operating layer" / "Works with your stack" / "Roadblocks"** sections are replaced by the structure above (walls → pillars → focus).

## Landing Section Anchors

- `#what-teams-build` — the X-Brain templates section (`<section id="what-teams-build" data-section="what-teams-build">`).
- All other sections are addressed via `data-section` only (no `id`), used for GA `section_view` tracking.

## Vocabulary Guardrails

Block list (verification grep below):
- `self-learning` — allow only as part of the proper noun "Self-Learning Loop"
- `shared brain`, `hive mind`
- `AI OS`, `agent OS` — allow only inside "Agent-Native Operating Layer" / "Operating Layer"
- `solo founder`
- bare `memory` as a noun-phrase for the brain (use "context", "context graph", "knowledge layer" instead). Wall 1 is **"No shared context"** — never "no memory" / "memory loss".

Keep / preferred terms:
- BYOA / "Bring your own agent"
- Agent-Native Operating Layer
- Living Context Brain
- Living Company Brain
- Context Graph
- Skill Analytics, Skill Marketplace
- Self-Learning Loop
- Team Brain, Knowledge Layer

Verification (must return zero lines):

```bash
grep -rEin --include='*.html' \
  -e 'self-learning' -e 'shared brain' -e 'hive mind' -e 'AI OS' \
  -e '\bagent OS\b' -e 'solo founder' \
  public/ \
  | grep -v 'Self-Learning Loop' \
  | grep -v 'Agent-Native Operating Layer' \
  | grep -vi 'operating layer'
```

## Forms / Lead Capture

- **PRIMARY CTA = `/early-access`** — Web3Forms email waitlist (`public/early-access.html`). Uses the **SAME public Web3Forms access key as scorecard.html: `6cdc9753-8c20-49de-9334-276e842a5f82`**.
- Secondary CTA = Google Calendar booking link (demoted): `https://calendar.app.google/5TydwUfWCfrxn5tj7`
- Tertiary = `/scorecard` (5-question diagnostic, captures email via Web3Forms on completion) + Substack subscribe: `https://anoopjawahar.substack.com`
- Web3Forms access key is a public-by-design identifier; it lives inline in `public/early-access.html` and `public/scorecard.html`. Abuse is rate-limited server-side by Web3Forms.

## Analytics

GA4 measurement ID: `G-MXVRX5VMJR`

Tracking model: `[data-cta]` clicks fire a `cta_click` event with `cta_location` = the `data-cta` value; `[data-section]` fires `section_view` with `section_name`. The early-access form also fires a bare `early_access_submit` event on submit.

`data-cta` values in use:
- Early access: `cta-early-access-hero`, `cta-early-access-nav`, `cta-early-access-bottom`, `cta-early-access-submit` (+ bare `early_access_submit` GA event)
- Book demo: `cta-book-demo-hero`, `cta-book-demo-bottom`
- X-Brain cards: `see-pattern-company-brain`, `see-pattern-sales-brain`, `see-pattern-marketing-brain`, `see-pattern-finops-brain`, `see-pattern-ops-brain`, `see-pattern-cx-brain`, `see-pattern-custom-agents`
- Tertiary: `bottom-scorecard`, `bottom-substack`

## Design Tokens

- Display font: Instrument Serif
- Body font: DM Sans
- Mono: JetBrains Mono
- Palette: indigo (`--accent` #6366F1) → teal (`--teal` #0D9488) gradient
- Inlined CSS in each page's `<style>` block (no shared stylesheet — keeps deploys simple)

## Home Diagrams (inlined)

Two diagrams are inlined into `public/index.html` (built indigo→teal, Instrument Serif / DM Sans / JetBrains Mono):

- **D1 — home architecture** (in the `pillars` section): harness row → MCP band → brain-centered 6-pillar Operating Layer core → guardrails strip → systems-of-record row. Scoped with `.d1` / `.d1-*` classes to avoid clashing with `.card` / `.section`.
- **D3 — six-walls grid** (in the `walls` section): 3×2 grid of the six walls, each → the pillar that closes it. Scoped with `.d3-six-walls` / `.d3-*` classes.

Standalone sources kept in `docs/diagrams/` (`d1-home-architecture.html`, `d3-six-walls.html`) and inlined into `index.html` with the scoped class prefixes above. Edit the source + re-inline (or edit in place) — keep the two in sync.

## Git
- Repo: github.com/synoshq/synos.in
- Branch: `main`
