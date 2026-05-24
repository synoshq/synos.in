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

Landing-page use-case grid (v6.1): **Company Brain** is the umbrella anchor card (full-width, top). The 4 function-level patterns (Cloud FinOps, Sales Ops, Marketing Ops, Custom AI Agents) sit below as smaller siblings. Company Brain card links to `/use-cases` (top of grid), not a `#company-brain` anchor (that anchor does not exist).

## Use-Case Framing Convention

- Visible copy: "**What teams can build**" / "**Patterns**" — never "use-cases" in the consumer sense. URL slug `/use-cases` stays (don't break SEO + outreach links).
- Each function-level pattern: **"Operating Layer for [function] Agents"** — show the agents customers would run + why those agents need a layer underneath (context graph, skills, sandboxes, trace loop). The layer is the product; agents are what the customer builds and runs.
- Company Brain: framed as the **umbrella pattern** — "enable non-engineers to build custom workflows and apps that understand how your company operates." Function brains are instances of this pattern.
- No live customer deployments are named anywhere. Anonymized outcome shapes only (e.g., "indicative ranges from engagements in progress"). No firm savings figures presented as Synos-delivered.

NEVER claim Synos ships a productized agent. Use:
- ✅ "The agents a FinOps team runs — and the operating layer they need."
- ✅ "What teams can build on Synos."
- ❌ "Our Cloud FinOps Brain product."
- ❌ "Buy Sales Brain."
- ❌ "Use cases" as a consumer noun (URL slug only).

## Landing Page Architecture (v6.1)

Section order:
1. Hero — kicker, H1, single subhead, sub-paragraph, CTAs, trust line
2. Roadblocks — "Five walls" opener (Agent Harnesses make individuals faster; shared compounding is the wall) + 5 walls + scorecard CTA
3. **"What's inside the operating layer"** — Living Context Brain as full-width anchor card (first), followed by 4 sibling cards (Agent-Native Storage · Secure Scanned Sandboxes · Tool Access & Permissions · Skill & Tool Traces). Self-Learning Loop is folded into the brain card as a property, not a sibling.
4. Works with your stack
5. **"What teams can build"** — Company Brain umbrella card (full-width, first), then 4 function-pattern siblings
6. Bottom CTA — Book demo · Scorecard · Substack

**No "Living Company Brain" standalone meta-section** (folded into the Company Brain umbrella card).
**No blog cards section** on landing (Blog page is enough).
**No memory-type taxonomy** (Skill / Knowledge / Entity / Trace) on landing — defer to product page when revamped.

## Landing Section Anchors

- `#what-teams-build` — used by hero CTA "What teams build →"
- `#use-cases` — NOT used currently; the section's anchor is `#what-teams-build`. If reintroduced, ensure `id` matches.

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
