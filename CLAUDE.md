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
- Use-case sub-pages live in `public/use-cases/<slug>.html`
- Images in `public/img/` and `public/`.

## Canonical Slugs

Use-case URL slugs (kebab-case, lowercase):

- `cloud-finops-agents` — only deep sub-page at launch (`public/use-cases/cloud-finops-agents.html`)
- `sales-ops-agents` — anchor blurb on `/use-cases`
- `marketing-ops-agents` — anchor blurb on `/use-cases`
- `custom-agents` — anchor blurb on `/use-cases`

Display labels (what visible copy says):

- "Operating Layer for Cloud FinOps Agents"
- "Operating Layer for Sales Ops Agents"
- "Operating Layer for Marketing Ops Agents"
- "Operating Layer for Custom AI Agents"

Landing-page meta-section (NOT a use-case card): "Living Company Brain" — the cross-cutting brain customers compound across functions.

## Use-Case Framing Convention

Each use-case is framed as **"Operating Layer for [function] Agents"** — show the agents customers would run + why those agents need a layer underneath (context graph, skills, sandboxes, trace loop). The layer is the product; agents are what the customer builds and runs.

NEVER claim Synos ships the productized agent itself. Use phrasing like:
- ✅ "The agents a FinOps team runs — and the operating layer they need."
- ✅ "Pattern: how a sales-ops team builds their pipeline brain on Synos."
- ❌ "Our Cloud FinOps Brain product."
- ❌ "Buy Sales Brain."

## Vocabulary Guardrails

Block list (verification grep below):
- `self-learning` — allow only as part of the proper noun "Self-Learning Loop"
- `shared brain`, `hive mind`
- `AI OS`, `agent OS` — allow only inside "Agent-Native Operating Layer" / "Operating Layer"
- `solo founder`
- bare `memory` as a noun-phrase for the brain (use "context", "context graph", "knowledge layer" instead)

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

- Primary CTA = Google Calendar booking link: `https://calendar.app.google/5TydwUfWCfrxn5tj7`
- Secondary CTA = `/scorecard` (5-question diagnostic, captures email via Web3Forms on completion)
- Tertiary CTA = Substack subscribe: `https://anoopjawahar.substack.com`
- Web3Forms access key is a public-by-design identifier; it lives inline in `public/scorecard.html`. Abuse is rate-limited server-side by Web3Forms.

## Analytics

GA4 measurement ID: `G-MXVRX5VMJR`

Event names:
- `cta-book-demo`
- `cta-scorecard-start`, `cta-scorecard-submit`
- `cta-waitlist-substack`
- `see-usecase-<slug>` (e.g., `see-usecase-cloud-finops-agents`)

## Design Tokens

- Display font: Instrument Serif
- Body font: DM Sans
- Mono: JetBrains Mono
- Inlined CSS in each page's `<style>` block (no shared stylesheet — keeps deploys simple)

## Git
- Repo: github.com/synoshq/synos.in
- Branch: `main`
