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
- **Design rules since the 2026-09-26 redesign** (canvas "Synos website redesign", board Tokens):
  one type family, Instrument Sans at 400 and 500, with JetBrains Mono only for a value read from
  a system; five colours (paper, ink, ink-2, line, brand indigo) plus one tint behind a status
  chip; no cards, no shadows, no gradient, no dark band, no load motion. Hairlines carry structure:
  an ink rule opens a table or list, a hairline separates rows, the brand rule marks the one
  column that is SynOS, once per page. No eyebrows above headings, no mono all-caps labels, no
  `Fig. N ·` captions. `tools/render-gate.mjs` allows exactly Instrument Sans and JetBrains Mono.
  The brand kit's palette (`packages/brand-kit`) is unchanged; the site diverges from it on purpose.
- Shared behaviour lives in `public/js/synos.js` (nav, GA). Pages do not repeat it. Scroll reveal
  is retired; `.sk-reveal` is a no-op kept so old markup still renders.
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

## Use cases page (`/use-cases`)

Rebuilt 2026-09-23. **The `[X] Brain` taxonomy is retired**, along with the inward/outward split and
the `#sales-brain` / `#marketing-brain` / `#internal-ops-brain` / `#support-cx-brain` anchors, which
were never built and which nothing links to any more. Do not reintroduce a per-function card grid.

The page is now the ICP-B page: software companies whose agents are already in production and
already wrong. Its spine is the qualifying question from
`synos-gtm/outreach/2026-09-21-icp-criteria-v2-and-the-500.md` — are the failures domain-knowledge
failures or prompt failures — and the first branch **disqualifies us on purpose**. Keep that. A
reader who discovers it themselves in month two does not come back.

Structure: hero · the fork (Fig. 13) · a six-row ledger of what teams say on a first call · the
disclosure band · CTA. Rows, never cards.

### Claims discipline on this page

Source of truth is `synos-gtm/docs/research/product-truth/` (both files) and the capability audit
§7 "Claims to NOT make".

**The discipline is not claiming a thing. It is not announcing that we lack it.** The first build
of this page carried a live / in-build / roadmap chip on every row and a disclosure band listing
what was unfinished. That is an internal claims register published to customers, and it reads as a
list of reasons not to buy. Removed 2026-09-23.

What replaced it is precision. Write the sentence so it is exactly true and no caveat is required:

- Cost: "every run priced, per model and per provider, so you can see where the money actually
  goes." True, useful, and it delivers the cost argument without a reduction claim. **Never quote a
  reduction percentage in any form** — accounting is shipped, reduction has no benchmark.
- A model of their own: "it accumulates on your own infrastructure in the shape a training set is
  built from." True from week one. Says nothing about when we train.
- Scope: carried by the subject of the sentence. "**Agents built on it** rehearse against your real
  systems." That scopes the claim without a warning chip, and without implying we can drive a
  LangGraph or CrewAI agent the customer already wrote, which we cannot yet.
- **No connector count.** The two September audits disagree (59 vs 61), and a precise number that
  turns out wrong is what fails a technical evaluation.

The unfinished parts belong in the technical conversation, not on the page. `/build-your-own-ai` is
the deep page and keeps its own explicit ladder, which is correct there and wrong here.

`/use-cases` has no sub-pages. `/use-cases/cloud-finops-agents` and the `two-doors` figure were
deleted on 2026-09-23: both were internal-operations artefacts, the FinOps page addressed a team
running its own cloud cost rather than a software company shipping AI in its product, and the
figure drew the inward and outward split that no longer exists. Recoverable from history if an
external-facing version is ever wanted.

The internal-operations motion survives on the site in exactly one place, by request: one clause in
the homepage closing line, so an operations reader can recognise themselves without the page being
written for them. Do not grow it back into a section.

## Landing page

Rebuilt 2026-09-30. The page before it opened on an essay sentence ("Almost nobody trains an agent
on a real business. They train it on a copy.") and addressed only a company already training its
own models, which is one of four buyer stages.

Built against a survey of eighteen infrastructure homepages: Modal, Prime Intellect, E2B,
Braintrust, Daytona, Temporal, Fireworks, Baseten, Together, Anyscale, HUD, W&B, LangChain,
Thinking Machines, Tinker, Mercor, Surge and Scale. What that survey settled, and what this page
therefore follows:

- **The hero is a bare noun phrase naming the category.** Nine of twenty heroes take this shape
  (`The + category noun + for + who`), and the subhead carries the mechanism. Zero of twenty put a
  number in the headline.
- **A content block stops at two sentences.** The longest sustained prose in the whole sample is a
  research lab's manifesto page, which has no product on it.
- **A claim is quantified with a baseline, or rewritten as a mechanism.** Modal does not say
  "reliable", it says "Bad hardware is drained and replaced before it touches your workload."
- **"You" throughout. "We" only where we are claiming authorship of something specific.** Never
  "we help you" or "we enable you to".
- **A block CTA names its own action.** Braintrust uses "Log your first trace", not "Learn more".
- **Trust and security never appear in the nav.** Zero of eighteen, despite ten of eighteen
  carrying a security section on the page. They live in the footer.

Section order, each carrying a `data-section` name for GA:

1. `hero` — H1 "The platform for AI built on your own systems.", subhead naming the three
   mechanisms, two CTAs, and a three item trust strip.
2. `where-you-are` — the three buyer situations as columns, drawn from the customer deck family
   (`synos-gtm/presentations/_client_content.py`). **No links out**: there is nothing behind them
   and a dead "learn more" is worse than nothing. Depth belongs in the deck taken to the call.
3. `outcomes` — four rows on one rule. Rows rather than cards, because four equal cards would say
   the four are interchangeable and the order is the argument.
4. `platform` — the four pieces, as cards.
5. `where-it-sits` — the only dark band on the site, carrying the only figure.
6. `how-it-starts` — the two week first engagement, as a ledger.
7. `deployment` — self-hosting, data handling, model choice, then the trust centre link. Second to
   last, which is where every surveyed site puts its security block.
8. `bottom-cta`.

### The nav

A wordmark and one action. The hamburger and the empty links panel were removed on 2026-09-30:
there were no links in it, and at 320px the CTA wrapped to two lines and sat on top of the
wordmark. If nav links ever return, restore the toggle from history along with them.

### Claims discipline on this page

Source of truth is `synos-gtm/docs/research/product-truth/` and the capability audit §7 "Claims to
NOT make". Carried forward from the previous build, and still binding:

- **Never quote a cost reduction percentage in any form.** Accounting is shipped, reduction has no
  benchmark. The page says "Every run is priced per model and per provider".
- **No approval claim.** The approval gate was removed from the product. The outcomes row says the
  write is "intercepted and recorded rather than committed, then scored", which is true.
- **No connector count.** Two September audits disagree, and a precise number that turns out wrong
  is what fails a technical evaluation.
- A model of their own: "accumulate inside your estate in the shape a training set is built from"
  is true from week one and says nothing about when we train.

### Figures

One, `/figures/where-it-sits`. The two previous figures (`three-ways`, `rent-and-own`) were deleted
on 2026-09-30: both argued the stage four essay the page no longer makes. Only two of eighteen
surveyed sites lead with an architecture diagram, so this one has to earn its place, and it does
because "where does this sit" is the first question an engineering reader asks about a layer.

Every figure must load `/js/figure.js`, which posts its height to the host page. Without it the
iframe sits at the 900px CSS fallback and leaves dead space under the drawing.

## Landing Section Anchors

None. Every section is addressed by `data-section` only, used for GA `section_view` tracking.

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

`data-cta` values follow `cta-<action>-<place>`, e.g. `cta-early-access-hero`,
`cta-book-demo-bottom`, `cta-early-access-nav`. The early-access form also fires a bare
`early_access_submit`.

**Do not maintain the list here.** It was hand-written, drifted, and by 2026-09-23 named seven
`see-pattern-*` values that had not existed since the August revamp while omitting thirty real
ones, which is worse than no list because GA was being read against it. Get the live set with:

```bash
grep -rho 'data-cta="[^"]*"' public/ | sort -u
```

Three legacy values predate the convention and are left alone rather than renamed, because
renaming them breaks continuity in GA: `ea-book-demo`, `finops-hero-demo`, `finops-bottom-demo`.

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
