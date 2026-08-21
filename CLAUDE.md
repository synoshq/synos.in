# SynOS Landing Page

## Deployment
- Vercel auto-deploys from `main` branch
- Vercel serves only from `public/` (configured in `vercel.json` → `outputDirectory: "public"`)
- Root-level HTML files are NOT served. Single source of truth is `public/`.
- Live at: https://www.synos.in

## Structure
- Static HTML/CSS/JS. No build step: Vercel serves `public/` exactly as committed.
- Shared tokens and components live in `public/css/synos.css`. Page-specific CSS stays inline in
  that page's `<style>` block. **No page may write a literal colour** — promote it to a token first.
- Shared behaviour lives in `public/js/synos.js` (nav, scroll reveal, GA). Pages do not repeat it.
- Nav, footer and the common `<head>` live in `public/partials/` and are injected between markers by
  `npm run pages`, which rewrites the committed HTML in place. Edit a partial, run `npm run pages`,
  commit the result.
- Each top-level page is its own file in `public/`:
  - `public/index.html` — landing
  - `public/use-cases.html` — grid index for example agent operating-layer use-cases
  - `public/blog.html` — links to Substack posts
  - `public/product.html`, `public/about.html`
  - `public/early-access.html` — primary CTA waitlist (Web3Forms email capture)
- Use-case sub-pages live in `public/use-cases/<slug>.html`
- Images in `public/img/` and `public/`.

## Tooling and gates

`npm run gate` must pass before any commit that touches `public/`. Three checks:

- `tools/contrast-gate.mjs` — every text-on-background pair the site uses, against WCAG AA. Added
  2026-08-21 after the brand-kit port failed five pairs that the deck kit never hits, because a deck
  paints text on white cards and a web page paints it on the page background.
- `tools/vocab-gate.mjs` — the vocabulary guardrails below, as an exit code.
- `tools/copy-gate.mjs` — the outward-copy rules in `docs/COPY_STANDARD.md`: no dashes, no banned
  vocabulary, no negation pivots, no payoff beats. Reads rendered text, not source, because source
  comments are not outward copy.

`npm run gate:render` additionally renders every in-scope page at 320/768/1440 and asserts no
horizontal overflow and exactly three font families. It needs a static server on `public/` and
`playwright` installed; it skips cleanly when playwright is absent.

**Scope is explicit.** `tools/migrated.json` lists which pages the gates check. A page joins the
list once it is converted to `public/css/synos.css` and the partial markers. The gates print their
coverage on every run (`clean · 1 of 12 pages in scope`) so a green result can never be mistaken for
a clean site. Pages still in `pending` are being rewritten in a later phase; cleaning their copy
before the rewrite would be thrown away.

Revamp spec: `synos-gtm/docs/superpowers/specs/2026-08-21-website-revamp-build-your-own-ai-design.md`
Phase plans: `synos-gtm/docs/superpowers/plans/`

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

## Landing Page Architecture

> **Superseded by the 2026-08-21 revamp.** The thirteen-section homepage is specified in
> `synos-gtm/docs/superpowers/specs/2026-08-21-website-revamp-build-your-own-ai-design.md`. What
> follows describes the homepage as it stands until phase 3 replaces it, and is kept so the current
> file is readable rather than as a target.


Section order (each `<section>` carries a `data-section` name, shown in parens):

1. **Hero** (`hero`) — eyebrow "The Human-Agent Operating Layer", H1 "The infrastructure to unblock your agentic transformation.", pillar subhead (Company Brain / skills / agent-native storage / deploy / access control), focus strip, clients line ("For companies, products, and agencies going AI-native."), trust line ("Self-hosted. Your data stays yours. Model + harness agnostic."). PRIMARY CTA = "Request early access" (`/early-access`); secondary = "Book a 30-min demo".
2. **Six walls — problem** (`walls`) — section-label "Why a layer"; H2 "Six walls between a clever demo and real company value."; inlines the D3 six-walls diagram; bridge line "Six walls. One layer that answers all six. ↓".
3. **Six pillars — answer** (`pillars`) — section-label "The operating layer"; H2 "Each wall, closed by one piece of the layer."; inlines the D1 architecture diagram; 6 pillar cards, each tagged with the wall it closes (`Closes wall 0N`). **Company Brain is the anchor/centre** (full-width brain card).
4. **Focus on impact / vs-alternatives** (`focus`) — section-label "Focus on impact, not plumbing"; H2 "Build the 20% that's you. We ship the infra."; folds in "Buy it / Own it" cards + the works-with-your-stack claims (BYOA · Models · Connectors · Deploy) + logos as a sub-row.
5. **X-Brain templates** (`what-teams-build`) — section `id="what-teams-build"`; Company Brain flagship anchor card + 6 brain cards (Sales / Marketing / FinOps / Internal Ops / Support-CX / Custom AI agents & products).
6. **Bottom CTA** (`bottom-cta`) — early-access primary, demo secondary, Substack as the tertiary line below.

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
- `AI OS`, `agent OS`, `Operating System` — allow only inside "The Human-Agent Operating Layer" / "Operating Layer"
- `solo founder`
- bare `memory` as a noun-phrase for the brain (use "context", "context graph", "knowledge layer" instead). Wall 1 is **"No shared context"**, never "no memory" or "memory loss".
- `Agent-Native Operating Layer` — retired Jul 14, still shipped until 2026-08-21. The category is
  **The Human-Agent Operating Layer**.
- `Context Brain` — retired Jul 14, still shipped until 2026-08-21. Use **Living Company Brain** on
  first use in a section and **Company Brain** after.
- `Synos` — the canonical casing is **SynOS**, decided 2026-08-21.

Keep / preferred terms:
- "works with any agent stack" (BYOA acronym retired Jul 14)
- The Human-Agent Operating Layer (category — migrated Jul 14 from "Agent-Native Operating Layer"; keep "agent-native" only as an adjective: agent-native storage, agent-native enterprise)
- Living Company Brain (formerly "Context Brain" — migrated Jul 14)
- Context Graph
- Skill Analytics, Skill Marketplace
- Self-Learning Loop
- Team Brain, Knowledge Layer

Verification: `npm run gate`. The grep that used to live here was never run and had drifted from
what the site actually shipped, which is how 66 violations accumulated. `tools/vocab-gate.mjs`
replaces it and reports its own coverage.

## Forms / Lead Capture

- **PRIMARY CTA = `/early-access`**, on every page including the hero. Web3Forms email waitlist
  (`public/early-access.html`), access key `6cdc9753-8c20-49de-9334-276e842a5f82`.
- Secondary CTA = Google Calendar booking link (demoted): `https://calendar.app.google/5TydwUfWCfrxn5tj7`
- Tertiary = Substack subscribe: `https://anoopjawahar.substack.com`
- Web3Forms access key is a public-by-design identifier and lives inline in
`public/early-access.html`. Abuse is rate-limited server-side by Web3Forms.

## Analytics

GA4 measurement ID: `G-MXVRX5VMJR`

Tracking model: `[data-cta]` clicks fire a `cta_click` event with `cta_location` = the `data-cta` value; `[data-section]` fires `section_view` with `section_name`. The early-access form also fires a bare `early_access_submit` event on submit.

`data-cta` values in use:
- Early access: `cta-early-access-hero`, `cta-early-access-nav`, `cta-early-access-bottom`, `cta-early-access-submit` (+ bare `early_access_submit` GA event)
- Book demo: `cta-book-demo-hero`, `cta-book-demo-bottom`
- X-Brain cards: `see-pattern-company-brain`, `see-pattern-sales-brain`, `see-pattern-marketing-brain`, `see-pattern-finops-brain`, `see-pattern-ops-brain`, `see-pattern-cx-brain`, `see-pattern-custom-agents`
- Tertiary: `bottom-substack`

## Design Tokens

Tokens live in `public/css/synos.css`, ported from `packages/brand-kit/src/styles/tokens.css` on
2026-08-21 so that a diagram built once works on the site and in a deck. The site no longer has a
palette of its own.

- Display: Instrument Serif. **One weight, no bold, and it loses its thin strokes first, so it must
  not render below 24px.** On the site that means `h1` and `.sk-display` only. `h2`, `h3` and every
  card title read `--sk-font-body`.
- Body: Inter. Mono: JetBrains Mono. **Exactly three families**, enforced by `gate:render`.
- Gradient: `--sk-grad`, indigo `#6366f1` to violet-ink `#4c1d95`. Not a taste choice: white on the
  old indigo-to-teal ramp measured 4.47:1 and failed AA. Teal survives as an accent token.
- **`--sk-indigo-2` is a fill, never a text colour** (4.08 on page background). Brand-coloured text
  uses `--sk-brand-text`.
- **`--sk-muted` and `--sk-dim` are surface-only.** On the page background, secondary text uses
  `--sk-ink-3`.
- Buttons and inputs get `font: inherit` in the base, or they report Arial as a fourth family.

## Home Diagrams (inlined)

Two diagrams are inlined into `public/index.html` (built indigo→teal, Instrument Serif / DM Sans / JetBrains Mono):

- **D1 — home architecture** (in the `pillars` section): harness row → MCP band → brain-centered 6-pillar Operating Layer core → guardrails strip → systems-of-record row. Scoped with `.d1` / `.d1-*` classes to avoid clashing with `.card` / `.section`.
- **D3 — six-walls grid** (in the `walls` section): 3×2 grid of the six walls, each → the pillar that closes it. Scoped with `.d3-six-walls` / `.d3-*` classes.

Standalone sources kept in `docs/diagrams/` (`d1-home-architecture.html`, `d3-six-walls.html`) and inlined into `index.html` with the scoped class prefixes above. Edit the source + re-inline (or edit in place) — keep the two in sync.

## Git
- Repo: github.com/synoshq/synos.in
- Branch: `main`
