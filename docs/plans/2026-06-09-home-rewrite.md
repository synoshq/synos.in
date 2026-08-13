# SynOS Home Rewrite — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `public/index.html` to the approved messaging spine — new hero, walls→pillars arc, focus-on-impact + vs-alternatives, X-Brain template cards, two on-brand code-generated diagrams (D1 architecture, D3 six-walls), and a new email early-access path — then bring the site's CLAUDE.md guardrails into lockstep.

**Architecture:** Static HTML/CSS/JS, no build step. CSS inlined per page (do NOT add a shared stylesheet). One file rewrite (`index.html`) + one new page (`early-access.html`) + diagrams inlined as HTML/SVG into `index.html`. Verification is grep (vocab guardrails) + Playwright browser render + console scan + GA-event check — there is no test runner.

**Tech Stack:** Vanilla HTML/CSS/JS, Instrument Serif / DM Sans / JetBrains Mono, Web3Forms (lead capture), GA4, Vercel (auto-deploy from `main`). Diagrams generated with the `ui-ux-pro-max` skill.

**Spine (source of truth):** `/Users/anoopjawahar/ws/synos-gtm/website/MESSAGING_SPINE.md`

**Locked decisions (from brainstorm 2026-06-09):**
- Brand **SynOS**; category **Agent-Native Operating Layer** (primary, sitewide).
- Home frame: platform, Context Brain at center, 6 pillars. All client types named.
- Hero H1 (tight form): *"The infrastructure to unblock your agentic transformation."*
- Walls BEFORE pillars; sections separate but bridged.
- Trust-ladder section REMOVED from home.
- **"[X] Brain" allowed as TEMPLATE names** (Sales/Marketing/FinOps Brain) — still ban "Buy/Our [X] Brain product." Update guardrail.
- Wall 1 renamed **"No shared memory" → "No shared context"** to honor the site's vocab guardrail (no bare "memory" for the brain).
- Pillar 6 uses the proper noun **"Self-Learning Loop"** (vocab guardrail).
- Early access = email waitlist, dedicated page `early-access.html` (mirrors scorecard's Web3Forms pattern), CTA on hero + footer + bottom.
- No customer names / logos / metrics (no-proof guardrail kept).

**Scope:** HOME page only. Use-cases page (X-Brain deep) and Product page (split) are FOLLOW-ON plans that cite the same spine.

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `public/index.html` | The home page — full rewrite to spine | Modify (section-by-section) |
| `public/early-access.html` | Email waitlist capture page | Create |
| `CLAUDE.md` | Site guardrails — bring into lockstep with the new page | Modify |
| `docs/diagrams/d1-home-architecture.html` | Standalone D1 build artifact (then inlined) | Create |
| `docs/diagrams/d3-six-walls.html` | Standalone D3 build artifact (then inlined) | Create |

Diagrams are built standalone first (easy to iterate), then their markup is inlined into `index.html` (per the no-shared-asset rule).

**Design tokens already in `index.html` `:root` (reuse, do NOT redefine):** `--bg #FAFAF8`, `--text #1A1A1A`, `--accent #6366F1` (indigo), `--teal #0D9488`, `--amber #D97706`, `.gradient-text` = indigo→teal, shadows `--shadow-sm/md/lg/glow`, fonts `--font-display/body/mono`. Reusable classes: `.section`, `.section--alt`, `.container`, `.card`, `.btn--primary`, `.btn--secondary`, `.section-label`, `.section-sub`, `.reveal`, `.reveal-stagger`, `.mesh-bg`, `[data-section]`, `[data-cta]`.

---

## Task 0: Branch + baseline

**Files:** none (git + screenshot)

- [ ] **Step 1: Create work branch**

```bash
cd /Users/anoopjawahar/ws/synos-landing
git checkout -b home-rewrite
```

- [ ] **Step 2: Serve the site locally**

```bash
cd /Users/anoopjawahar/ws/synos-landing/public && python3 -m http.server 4321 &
```

- [ ] **Step 3: Capture baseline screenshot of current home (for before/after)**

Use Playwright MCP: `browser_navigate` → `http://localhost:4321/index.html`, then `browser_take_screenshot` (full page). Save as reference.

- [ ] **Step 4: Record baseline vocab-grep is clean**

Run (must return zero lines):
```bash
cd /Users/anoopjawahar/ws/synos-landing && grep -rEin --include='*.html' \
  -e 'self-learning' -e 'shared brain' -e 'hive mind' -e 'AI OS' \
  -e '\bagent OS\b' -e 'solo founder' public/ \
  | grep -v 'Self-Learning Loop' | grep -v 'Agent-Native Operating Layer' | grep -vi 'operating layer'
```
Expected: zero lines.

---

## Task 1: Generate D1 — home architecture diagram

**Files:**
- Create: `docs/diagrams/d1-home-architecture.html`

D1 = the primary home diagram: self-improving Context Brain at center + 6 pillars; harness layer above (Claude Code / Codex / Cursor / SynOS Apps & Workers — "all speak MCP"); a thin guardrails strip; systems-of-record row below ("connected, not replaced"). Footer line: *"The Company Brain is one pillar of six — and every use makes it smarter."*

- [ ] **Step 1: Invoke the ui-ux-pro-max skill to generate the diagram**

Invoke `ui-ux-pro-max` with this brief:
- **What:** A layered "operating layer" architecture diagram as self-contained HTML + inline SVG (no external assets, no JS).
- **Structure (top→bottom):**
  1. Harness row: chips for `Claude Code`, `Codex`, `Cursor`, `ChatGPT`, `Slack / WhatsApp`, `In-house agents`, `SynOS Apps & Workers`. Label above: "Bring your own harness — all speak MCP."
  2. Thin connector band (mono text): `MCP · one interface · any model`.
  3. Center — the Operating Layer, indigo→teal gradient frame, with **Context Brain featured (larger, center)** surrounded by 6 pillar cells: Context Brain, Compounding Skills, Agent-Native Storage, Safe Build & Deploy, Access Control & Audit, Self-Learning Loop & Traces.
  4. Thin guardrails strip: `RBAC · audit · sandbox scan · egress proxy · kill-switch`.
  5. Systems-of-record row: `Warehouse / BigQuery`, `CRM & SaaS`, `Docs / Drive / Notion`, `Slack / Email / WhatsApp`, `Ads / GA / Tickets`. Label: "Connected to your existing systems — not replaced."
  6. Footer line (italic display font): "The Company Brain is one pillar of six — and every use makes it smarter."
- **Base on:** `/Users/anoopjawahar/ws/synos-gtm/presentations/synos-verlinvest.html` lines 822-903 (6-pillar layout) + `/Users/anoopjawahar/ws/synos-gtm/pitch-materials/diagrams/synos_cto_agent_native_stack.html` (guardrail band).
- **Style tokens (MANDATORY — match the site):** bg `#FAFAF8`, ink `#1A1A1A`, indigo `#6366F1` (interactive + brain), teal `#0D9488` (harness/positive), amber `#D97706` (systems-of-record row only). **Signature gradient indigo→teal (NOT indigo→violet).** Fonts: Instrument Serif headings, DM Sans body, JetBrains Mono labels/bands. Rounded cards 12–18px, soft shadow `0 4px 16px rgba(0,0,0,0.06)`, 1.5px-stroke line icons (inline SVG, no emoji), uppercase letterspaced labels. Responsive: stack gracefully under 768px.

Save the result to `docs/diagrams/d1-home-architecture.html`.

- [ ] **Step 2: Render + eyeball D1**

Playwright MCP: `browser_navigate` → `http://localhost:4321/docs/diagrams/d1-home-architecture.html` (serve repo root if needed), `browser_take_screenshot`. Verify: brain visually central, all 6 pillars present, harness row + SoR row present, indigo→teal gradient (not violet), no emoji, renders on mobile width (`browser_resize` 375×800).

- [ ] **Step 3: Commit the standalone diagram**

```bash
cd /Users/anoopjawahar/ws/synos-landing
git add docs/diagrams/d1-home-architecture.html
git commit -m "feat(home): D1 home-architecture diagram (standalone)"
```

---

## Task 2: Generate D3 — six-walls visual

**Files:**
- Create: `docs/diagrams/d3-six-walls.html`

D3 = a 3×2 numbered card grid of the six walls; each card shows the number, wall title, the human question (italic), and a small "→ answered by [pillar]" tag. Sits back-to-back before D1 on the page (problem → answer).

- [ ] **Step 1: Invoke ui-ux-pro-max to generate D3**

Brief: self-contained HTML + inline SVG, no JS. A 3×2 grid (2 cols < 900px → 1 col < 600px) of six numbered cards. Card N = mono number `0N` (indigo), bold title, plain description, the human question in italic display font, and a small uppercase tag `→ [pillar]`. Use the exact copy below. Same style tokens as Task 1. Amber accent only on the left border of each card; indigo for numbers/tags.

| # | Title | Description | Question (italic) | → tag |
|---|---|---|---|---|
| 01 | No shared context | AI forgets your business every session; corrections die in chat history. | "Why do I re-explain our hubs, SLAs and last week's fix every single time?" | Context Brain |
| 02 | No safe access to systems | Reaching real data means raw keys on a laptop — no permissions, no audit. | "How do I even get to that warehouse table — safely?" | Access Control & Audit |
| 03 | Nowhere governed to deploy | Apps and their data ship to personal accounts. No sandbox, no kill-switch. | "Where does this app — and its data — actually live?" | Safe Build & Deploy |
| 04 | Skills don't compound | No shared library. Everyone rebuilds the same skill; nothing is reused or scheduled. | "Sarah built this skill last month — why am I starting from scratch?" | Compounding Skills |
| 05 | Engineering gets overloaded | Every access request, guardrail and deploy routes through eng — they become the bottleneck. | "Why is every team's automation now a ticket in my backlog?" | Set the rails once |
| 06 | No learning, no visibility | Outputs lost in sheets and DMs. Who ran what, what's working — invisible. | "Did that even help? And is anyone else getting value from it?" | Self-Learning Loop |

Save to `docs/diagrams/d3-six-walls.html`.

- [ ] **Step 2: Render + eyeball D3**

Playwright: navigate + screenshot at desktop and 375px. Verify 6 cards, questions render in italic display font, tags present, no banned vocab ("memory" must NOT appear — confirm "No shared context").

- [ ] **Step 3: Commit**

```bash
cd /Users/anoopjawahar/ws/synos-landing
git add docs/diagrams/d3-six-walls.html
git commit -m "feat(home): D3 six-walls diagram (standalone)"
```

---

## Task 3: Rewrite `<head>` + hero

**Files:**
- Modify: `public/index.html:6-15` (title + meta + og/twitter)
- Modify: `public/index.html:284-299` (hero section)

- [ ] **Step 1: Replace title + meta + og/twitter**

Replace lines 6-15 with:
```html
    <title>SynOS — The infrastructure to unblock your agentic transformation</title>
    <meta name="description" content="SynOS is the Agent-Native Operating Layer: a self-improving Context Brain, compounding skills, agent-native storage, safe deploy, and access control — operated with Claude Code, Codex, or your own. Self-hosted. For companies, products, and agencies going AI-native.">
    <meta property="og:title" content="SynOS — The infrastructure to unblock your agentic transformation">
    <meta property="og:description" content="A self-improving Context Brain, compounding skills, agent-native storage, safe deploy, and access control — under any agent harness. Self-hosted.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://synos.in">
    <meta property="og:image" content="https://synos.in/img/operating-layer-architecture.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SynOS — The infrastructure to unblock your agentic transformation">
    <meta name="twitter:description" content="The Agent-Native Operating Layer. Self-hosted. Model + harness agnostic.">
```

- [ ] **Step 2: Replace the hero section** (lines 284-299)

```html
    <!-- HERO -->
    <section class="container hero mesh-bg" data-section="hero">
        <p class="hero-eyebrow reveal">The Agent-Native Operating Layer</p>
        <h1 class="reveal">The infrastructure to unblock your <span class="gradient-text">agentic transformation.</span></h1>
        <p class="hero-sub reveal">
            SynOS gives your team a self-improving <strong>Context Brain</strong>, compounding <strong>skills</strong>, <strong>agent-native storage</strong>, a safe place to <strong>deploy agents &amp; apps</strong>, and built-in <strong>access control</strong> — operated with Claude Code, Codex, or your own.
        </p>
        <p class="hero-focus reveal">
            Spend your time on the AI impact your business needs — not on rebuilding the brain, storage, governance, and deploy plumbing under every agent.
        </p>
        <div class="hero-cta reveal">
            <a href="/early-access" class="btn btn--primary" data-cta="cta-early-access-hero">Request early access</a>
            <a href="https://calendar.app.google/5TydwUfWCfrxn5tj7" target="_blank" class="btn btn--secondary" data-cta="cta-book-demo-hero">Book a 30-min demo</a>
        </div>
        <p class="hero-clients reveal">For companies, products, and agencies going AI-native.</p>
        <p class="hero-trust reveal">Self-hosted. Your data stays yours. Model + harness agnostic.</p>
    </section>
```

Note: the old italic `.hero-subhead` line is dropped (its job is now done by H1 + sub). "Request early access" is the new PRIMARY hero CTA; demo demoted to secondary.

- [ ] **Step 3: Add hero helper styles** — insert after the `.hero-trust` rule (line 143):

```css
        .hero-focus { font-size: 14px; line-height: 1.7; color: var(--text-muted); max-width: 600px; margin-bottom: 36px; padding-top: 18px; border-top: 1px solid var(--border); }
        .hero-clients { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 14px; }
```

- [ ] **Step 4: Render + verify hero**

Playwright: reload `http://localhost:4321/index.html`, screenshot. Verify: H1 reads new line with "agentic transformation." in gradient; two CTAs (Request early access primary, Book demo secondary); focus strip + clients line + trust line visible. `browser_console_messages` → no errors.

- [ ] **Step 5: Commit**

```bash
git add public/index.html
git commit -m "feat(home): new hero + head meta (agentic-transformation spine)"
```

---

## Task 4: Walls section (problem) — replace Roadblocks, embed D3

**Files:**
- Modify: `public/index.html:301-340` (the `roadblocks` section)
- Modify: `public/index.html:305-307` (section label says "Five walls"; becomes "Six walls")

- [ ] **Step 1: Replace the entire `<!-- ROADBLOCKS -->` section** (lines 301-340) with the six-walls section. Use the existing `.roadblock` card styles; change the grid to 6 (3×2). Replace:

```html
    <!-- WHY A LAYER — SIX WALLS (problem) -->
    <section class="section section--alt" data-section="walls">
        <div class="container">
            <div class="reveal">
                <p class="section-label">Why a layer</p>
                <h2>Six walls between a clever demo and real company value.</h2>
                <p class="section-sub">It's not the model. It's everything the model needs around it to be safe, shared, and worth trusting.</p>
            </div>
            <div class="roadblocks reveal-stagger">
                <div class="roadblock reveal">
                    <div class="roadblock-num">01</div>
                    <h3>No shared context</h3>
                    <p>AI forgets your business every session; corrections die in chat history. <em>"Why do I re-explain our hubs, SLAs and last week's fix every single time?"</em></p>
                </div>
                <div class="roadblock reveal">
                    <div class="roadblock-num">02</div>
                    <h3>No safe access to systems</h3>
                    <p>Reaching real data means raw keys on a laptop — no permissions, no audit. <em>"How do I even get to that warehouse table — safely?"</em></p>
                </div>
                <div class="roadblock reveal">
                    <div class="roadblock-num">03</div>
                    <h3>Nowhere governed to deploy</h3>
                    <p>Apps and their data ship to personal accounts. No sandbox, no kill-switch. <em>"Where does this app — and its data — actually live?"</em></p>
                </div>
                <div class="roadblock reveal">
                    <div class="roadblock-num">04</div>
                    <h3>Skills don't compound</h3>
                    <p>Everyone rebuilds the same skill; nothing is reused or scheduled. <em>"Sarah built this skill last month — why am I starting from scratch?"</em></p>
                </div>
                <div class="roadblock reveal">
                    <div class="roadblock-num">05</div>
                    <h3>Engineering gets overloaded</h3>
                    <p>Every access request, guardrail and deploy routes through eng — they become the bottleneck. <em>"Why is every team's automation now a ticket in my backlog?"</em></p>
                </div>
                <div class="roadblock reveal">
                    <div class="roadblock-num">06</div>
                    <h3>No learning, no visibility</h3>
                    <p>Outputs lost in sheets and DMs. Who ran what, what's working — invisible. <em>"Did that even help? And is anyone else getting value from it?"</em></p>
                </div>
            </div>
            <p class="walls-bridge reveal">Six walls. One layer that answers all six. ↓</p>
        </div>
    </section>
```

- [ ] **Step 2: Update the responsive grid for 6 walls** — change line 146 `.roadblocks` to a 3-col grid:

```css
        .roadblocks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 32px; }
        .roadblock p em { color: var(--text-secondary); font-style: italic; }
        .walls-bridge { text-align: center; margin-top: 32px; font-family: var(--font-display); font-size: 20px; color: var(--text); }
```
And the 1024px breakpoint (line 224) already drops to 2 cols — keep. Confirm 768px (line 234) drops to 1 col — keep.

- [ ] **Step 3: Embed D3 above the wall cards** — copy the inner markup of `docs/diagrams/d3-six-walls.html` (the diagram container + its scoped `<style>`) and inline it inside the walls section, ABOVE `.roadblocks`, OR replace the card grid with the diagram if the diagram already renders all six as cards. DECISION: if D3 already renders the six cards well, use D3 in place of the `.roadblocks` grid (delete the grid). Otherwise keep cards and skip embedding (cards already convey it). Pick one; do not show both.

- [ ] **Step 4: Render + verify**

Playwright reload + screenshot. Verify: heading "Six walls…", six cards with questions in italic, bridge line "Six walls. One layer that answers all six. ↓". Run the vocab grep from Task 0 Step 4 → still zero lines (confirms no bare "memory"/"shared brain").

- [ ] **Step 5: Commit**

```bash
git add public/index.html
git commit -m "feat(home): six-walls problem section (replaces roadblocks)"
```

---

## Task 5: Pillars section (answer) — rewrite "What's inside", embed D1

**Files:**
- Modify: `public/index.html:342-383` (the `inside` section)

- [ ] **Step 1: Replace the `<!-- WHAT'S INSIDE THE OPERATING LAYER -->` section** (lines 342-383). Keep the `.inside-anchor` (Context Brain, full-width, central) + 5 `.inside-piece` siblings = 6 pillars total. Opening bridge in the section-sub.

```html
    <!-- THE SIX PILLARS (answer) -->
    <section class="section" data-section="pillars">
        <div class="container">
            <div class="reveal">
                <p class="section-label">The operating layer</p>
                <h2>Each wall, closed by one piece of the layer.</h2>
                <p class="section-sub">Six pieces. The self-improving Context Brain at the centre; the rest make agents safe, shared, and compounding in production.</p>
            </div>
            <div class="inside-grid reveal-stagger" role="group" aria-label="Operating layer pillars">
                <article class="inside-anchor reveal">
                    <div class="inside-tag">Closes wall 01 · the centre</div>
                    <h3>Self-improving Context Brain</h3>
                    <p>A shared, living context graph of how your company operates — streaming ingestion from your systems of record, smart extraction, entity resolution. It updates itself as your business changes, and gets smarter from every run.</p>
                    <p><strong>Self-Learning Loop:</strong> every agent trace and every human correction feeds back. The brain compounds — model-agnostic, harness-agnostic, yours forever.</p>
                </article>
                <article class="inside-piece reveal">
                    <div class="inside-tag">Closes wall 04</div>
                    <h3>Compounding Skills</h3>
                    <p class="inside-sub">Built once, shared everywhere</p>
                    <p>Skills your team builds once, then shares, versions, and forks across the org. The 10th teammate starts from the 9th's best work, not from scratch.</p>
                </article>
                <article class="inside-piece reveal">
                    <div class="inside-tag">Closes "lost outputs"</div>
                    <h3>Agent-Native Storage</h3>
                    <p class="inside-sub">A System of Record built for agents</p>
                    <p>A store designed for how agents actually write, revise, and reference each other — not what SQL or NoSQL stores were built for. Output accrues into an owned, queryable system of record.</p>
                </article>
                <article class="inside-piece reveal">
                    <div class="inside-tag">Closes wall 03</div>
                    <h3>Safe Build &amp; Deploy</h3>
                    <p class="inside-sub">Custom apps &amp; autonomous workers</p>
                    <p>Build custom AI workflows and apps shaped to how you operate — and promote a skill into an autonomous, integrated worker. Sandboxed, scanned, governed.</p>
                </article>
                <article class="inside-piece reveal">
                    <div class="inside-tag">Closes wall 02</div>
                    <h3>Access Control &amp; Audit</h3>
                    <p class="inside-sub">One gated, audited door</p>
                    <p>Per-skill, per-agent, per-team scopes. Revocable. Auditable. A kill-switch. Engineering provisions templates, not tickets — no raw keys on laptops.</p>
                </article>
                <article class="inside-piece reveal">
                    <div class="inside-tag">Closes walls 05 + 06</div>
                    <h3>Traces &amp; Self-Learning Loop</h3>
                    <p class="inside-sub">Visibility your AI team can read</p>
                    <p>Every skill run and tool call captured — cost, latency, success rate, hallucination signal. Set the rails once so eng isn't the bottleneck; the brain learns from every correction.</p>
                </article>
            </div>
        </div>
    </section>
```

- [ ] **Step 2: Embed D1 above the pillar grid** — copy the diagram container + scoped `<style>` from `docs/diagrams/d1-home-architecture.html` and inline it inside the pillars section, directly under the heading block and above `.inside-grid`. Wrap in `<div class="reveal" style="margin-bottom:48px;">`.

- [ ] **Step 3: Render + verify**

Playwright reload + screenshot. Verify: D1 renders (brain central, 6 pillars, harness row, SoR row, indigo→teal); pillar grid below with 6 cards each tagged with the wall it closes; flows visually from the walls section above. Console clean. Resize 375px → diagram + grid stack.

- [ ] **Step 4: Commit**

```bash
git add public/index.html
git commit -m "feat(home): six-pillars answer section + D1 architecture diagram"
```

---

## Task 6: "Build the 20%" focus + vs-alternatives section

**Files:**
- Modify: `public/index.html` — replace the `<!-- WORKS WITH YOUR STACK -->` section (lines 385-425) — repurpose this slot for the focus/vs-alternatives message; fold the stack claims/logos into it compactly so "works with your stack" survives as a sub-row.

- [ ] **Step 1: Replace lines 385-425** with:

```html
    <!-- BUILD THE 20% / FOCUS ON IMPACT -->
    <section class="section section--alt" data-section="focus">
        <div class="container">
            <div class="reveal">
                <p class="section-label">Focus on impact, not plumbing</p>
                <h2>Build the 20% that's you. We ship the infra.</h2>
                <p class="section-sub">Build custom AI workflows and apps shaped to how you actually operate — owned by your team, not rented from a vendor. SynOS owns the brain, storage, governance, and deploy plumbing underneath.</p>
            </div>
            <div class="grid-2 reveal-stagger" style="margin-bottom:48px;">
                <div class="card reveal">
                    <h3>Buy it, don't build it</h3>
                    <p><strong>Buying it is days of integration. Building it is six quiet months.</strong> The substrate is the same shape every team ends up building. Storage is the easy 10% — compounding is the product.</p>
                </div>
                <div class="card reveal">
                    <h3>Own it, don't rent it</h3>
                    <p>Self-hosted in your VPC. Swap models, swap harnesses, swap connectors — the brain, skills, and audit stay yours. The layer outlasts any contract. SynOS is infra, not lock-in.</p>
                </div>
            </div>
            <div class="stack-claims reveal-stagger">
                <div class="stack-claim reveal">
                    <div class="stack-tag">BYOA</div>
                    <h3>Bring your own agent</h3>
                    <p>Claude Code, Codex, Cursor, your in-house harness. SynOS sits underneath.</p>
                </div>
                <div class="stack-claim reveal">
                    <div class="stack-tag">Models</div>
                    <h3>Model-agnostic</h3>
                    <p>Anthropic, OpenAI, Gemini, OSS. Switch for price or capability.</p>
                </div>
                <div class="stack-claim reveal">
                    <div class="stack-tag">Connectors</div>
                    <h3>Your SoRs</h3>
                    <p>Salesforce, BigQuery, Jira, Slack, Notion, your spreadsheets. Connect once.</p>
                </div>
                <div class="stack-claim reveal">
                    <div class="stack-tag">Deploy</div>
                    <h3>Self-hosted</h3>
                    <p>Your VPC. Your data. SSO. RBAC. Multi-tenant inside your org.</p>
                </div>
            </div>
            <div class="stack-logos reveal">
                <span class="stack-logo">Anthropic</span>
                <span class="stack-logo">OpenAI</span>
                <span class="stack-logo">Gemini</span>
                <span class="stack-logo">Claude Code</span>
                <span class="stack-logo">Codex</span>
                <span class="stack-logo">Cursor</span>
                <span class="stack-logo">MCP</span>
            </div>
        </div>
    </section>
```

- [ ] **Step 2: Render + verify** — Playwright reload + screenshot. Verify the two build/own cards + the stack row + logos render; console clean.

- [ ] **Step 3: Commit**

```bash
git add public/index.html
git commit -m "feat(home): focus-on-impact + vs-alternatives (build the 20%)"
```

---

## Task 7: "What teams can build" → X-Brain template cards

**Files:**
- Modify: `public/index.html:427-470` (the `what-teams-build` section)

- [ ] **Step 1: Replace the section body.** Keep the `#what-teams-build` id + `.teams-anchor` (Company Brain flagship, full-width) + `.teams-grid` siblings. Swap the 4 function-pattern cards for the X-Brain template cards. Frame as **templates you build + own**, never as products.

```html
    <!-- WHAT TEAMS CAN BUILD — X-BRAIN TEMPLATES -->
    <section class="section" id="what-teams-build" data-section="what-teams-build">
        <div class="container">
            <div class="reveal">
                <p class="section-label">A starting brain for every operating team</p>
                <h2>Templated brains. Live in weeks, then tuned to you.</h2>
                <p class="section-sub">Each is a template your team builds on SynOS and owns — pre-built for the functions your company runs, then compounding on your data and your corrections. Not productized SKUs; starting points you extend.</p>
            </div>

            <a href="/use-cases" class="teams-anchor reveal" data-cta="see-pattern-company-brain">
                <div class="teams-anchor-tag">The flagship</div>
                <h3>Company Brain</h3>
                <p class="teams-anchor-lead">One living context graph across every team — tribal knowledge captured once and reused everywhere.</p>
                <p class="teams-anchor-body">The customer Sales just signed is the same one Finance is invoicing and Marketing is segmenting. Resolved once, known everywhere. Every function brain below sits inside it. Start with one function — the brain compounds across the rest.</p>
                <span class="teams-anchor-link">Explore the brains →</span>
            </a>

            <div class="teams-grid reveal-stagger">
                <a href="/use-cases#sales-brain" class="teams-card reveal" data-cta="see-pattern-sales-brain">
                    <div class="teams-tag">Revenue · Pipeline</div>
                    <h3>Sales Brain</h3>
                    <p>Lead triage &amp; instant follow-up · AI battlecards &amp; objection handling · pipeline hygiene &amp; deal nudges · account &amp; competitor context.</p>
                    <span class="teams-link">See the template →</span>
                </a>
                <a href="/use-cases#marketing-brain" class="teams-card reveal" data-cta="see-pattern-marketing-brain">
                    <div class="teams-tag">Growth · Demand</div>
                    <h3>Marketing Brain</h3>
                    <p>Campaign planning &amp; decisioning · content &amp; creative drafting · channel &amp; ROAS digests · audience &amp; cohort context.</p>
                    <span class="teams-link">See the template →</span>
                </a>
                <a href="/use-cases/cloud-finops-agents" class="teams-card reveal" data-cta="see-pattern-finops-brain">
                    <div class="teams-tag">Cloud spend · FP&amp;A · Deep dive</div>
                    <h3>FinOps Brain</h3>
                    <p>Budget &amp; spend pacing · cost-anomaly investigation · rightsizing &amp; orphan-resource review · margin &amp; unit-economics watch.</p>
                    <span class="teams-link">See the template →</span>
                </a>
                <a href="/use-cases#internal-ops-brain" class="teams-card reveal" data-cta="see-pattern-ops-brain">
                    <div class="teams-tag">Operations · SOPs</div>
                    <h3>Internal Ops Brain</h3>
                    <p>Weekly ops digests &amp; exceptions · SOP capture &amp; playbook lookup · vendor / supply / fleet monitoring · incident handling.</p>
                    <span class="teams-link">See the template →</span>
                </a>
                <a href="/use-cases#support-cx-brain" class="teams-card reveal" data-cta="see-pattern-cx-brain">
                    <div class="teams-tag">Customer · Retention</div>
                    <h3>Support / CX Brain</h3>
                    <p>Ticket triage &amp; drafted replies · voice-of-customer themes · churn &amp; CSAT signal watch.</p>
                    <span class="teams-link">See the template →</span>
                </a>
                <a href="/use-cases#custom-agents" class="teams-card reveal" data-cta="see-pattern-custom-agents">
                    <div class="teams-tag">AI builders &amp; agencies</div>
                    <h3>Custom AI agents &amp; products</h3>
                    <p>Build on the same rails for your clients or your product. Own the brain, skills, and deploy — ship the custom 20% without owning the infra.</p>
                    <span class="teams-link">See the template →</span>
                </a>
            </div>
            <p class="reveal" style="text-align:center;margin-top:32px;font-size:14px;color:var(--text-muted);font-style:italic;">Templates are the starting point, not the ceiling. Each ships day-one, then compounds until it operates the way you do.</p>
        </div>
    </section>
```

NOTE: links `#sales-brain` / `#marketing-brain` / etc. are anchors the FOLLOW-ON use-cases plan must create. They 404-to-top harmlessly until then; the FinOps card already points to the real deep page.

- [ ] **Step 2: Adjust `.teams-grid` for 6 cards** — it's currently 2-col (line 190); 6 cards in 2 cols = fine (3 rows). Optionally make it 3-col on wide screens — add to the CSS:

```css
        @media (min-width: 1024px) { .teams-grid { grid-template-columns: repeat(3, 1fr); } }
```

- [ ] **Step 3: Render + verify** — screenshot. Verify Company Brain flagship full-width on top; 6 brain cards below; "templates… not the ceiling" footer. No "Buy"/"product" language. Console clean.

- [ ] **Step 4: Commit**

```bash
git add public/index.html
git commit -m "feat(home): X-Brain template cards (Company Brain flagship)"
```

---

## Task 8: Bottom CTA + early-access wiring

**Files:**
- Modify: `public/index.html:472-487` (bottom CTA)

- [ ] **Step 1: Replace the bottom CTA section** (lines 472-487):

```html
    <!-- BOTTOM CTA -->
    <section class="section cta-section mesh-bg" data-section="bottom-cta">
        <div class="container" style="display:flex;flex-direction:column;align-items:center;">
            <div class="reveal">
                <h2>Unblock your agentic transformation.</h2>
                <p class="hero-sub">Request early access, or take 30 minutes with the founder — no sales pitch, just whether this layer helps what your team is building.</p>
                <div class="cta-row">
                    <a href="/early-access" class="btn btn--primary" data-cta="cta-early-access-bottom">Request early access</a>
                    <a href="https://calendar.app.google/5TydwUfWCfrxn5tj7" target="_blank" class="btn btn--secondary" data-cta="cta-book-demo-bottom">Book a 30-min demo</a>
                </div>
                <p class="cta-secondary">
                    Or <a href="/scorecard" data-cta="bottom-scorecard">take the 5-question scorecard →</a> · <a href="https://anoopjawahar.substack.com" target="_blank" data-cta="bottom-substack">subscribe on Substack →</a>
                </p>
            </div>
        </div>
    </section>
```

- [ ] **Step 2: Render + verify** — screenshot, console clean.

- [ ] **Step 3: Commit**

```bash
git add public/index.html
git commit -m "feat(home): bottom CTA with early-access primary"
```

---

## Task 9: Create `early-access.html`

**Files:**
- Create: `public/early-access.html`

Mirror `scorecard.html`'s structure (same `<head>` boilerplate, nav, footer, inlined tokens) but with a single email-waitlist form posting to Web3Forms. Reuse the public access key.

- [ ] **Step 1: Create `public/early-access.html`.** Copy the `<head>` (fonts, GA, `:root` tokens, base styles, `.btn`, `.nav`, `.site-footer`) from `index.html` lines 1-257 + nav (262-280) + footer (491-514) + the nav-scroll/reveal/GA `<script>` (516-554) so it's a consistent standalone page. Between `<main>` tags put:

```html
<main id="main-content">
  <section class="container" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding-top:120px;padding-bottom:80px;max-width:720px;">
    <p class="hero-eyebrow reveal" style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:var(--accent);margin-bottom:24px;">Early access</p>
    <h1 class="reveal" style="margin-bottom:20px;">Request early access to <span class="gradient-text">SynOS.</span></h1>
    <p class="reveal" style="font-size:16px;line-height:1.75;color:var(--text-secondary);max-width:560px;margin-bottom:36px;">We're onboarding companies, AI builders, and agencies going AI-native. Drop your work email and we'll reach out with access and a short setup conversation.</p>

    <form id="ea-form" class="reveal" style="width:100%;max-width:440px;text-align:left;display:flex;flex-direction:column;gap:14px;">
      <div>
        <label for="ea-email" style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;">Work email</label>
        <input type="email" id="ea-email" name="email" required placeholder="you@company.com" style="width:100%;padding:14px 16px;border:1px solid var(--border);border-radius:10px;font-family:var(--font-body);font-size:15px;background:var(--surface);">
      </div>
      <div>
        <label for="ea-size" style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;">Company size (optional)</label>
        <select id="ea-size" name="company_size" style="width:100%;padding:14px 16px;border:1px solid var(--border);border-radius:10px;font-family:var(--font-body);font-size:15px;background:var(--surface);">
          <option value="">—</option>
          <option value="under-50">Under 50</option>
          <option value="50-200">50–200</option>
          <option value="200-1000">200–1000</option>
          <option value="1000-plus">1000+</option>
        </select>
      </div>
      <div>
        <label for="ea-use" style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;">What are you building? (optional)</label>
        <input type="text" id="ea-use" name="use_case" placeholder="e.g. internal Sales brain, AI product for clients" style="width:100%;padding:14px 16px;border:1px solid var(--border);border-radius:10px;font-family:var(--font-body);font-size:15px;background:var(--surface);">
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:6px;">
        <button type="submit" class="btn btn--primary" data-cta="cta-early-access-submit">Request access</button>
        <a href="https://calendar.app.google/5TydwUfWCfrxn5tj7" target="_blank" class="btn btn--secondary" data-cta="ea-book-demo">Or book a demo →</a>
      </div>
      <p style="font-size:12px;color:var(--text-dim);margin-top:4px;">We only use this to reach out about access. No newsletter unless you subscribe on Substack separately.</p>
    </form>

    <div id="ea-success" class="hidden" style="margin-top:8px;">
      <h3 style="font-family:var(--font-display);font-weight:400;font-size:26px;margin-bottom:8px;">You're on the list.</h3>
      <p style="font-size:15px;color:var(--text-muted);max-width:480px;margin:0 auto 24px;">We'll be in touch shortly. Want to skip the queue? Book a 30-minute call with the founder.</p>
      <a href="https://calendar.app.google/5TydwUfWCfrxn5tj7" target="_blank" class="btn btn--primary">Book a 30-min demo</a>
    </div>
  </section>
</main>
```

Add `.hidden { display:none !important; }` to the page styles if not present.

- [ ] **Step 2: Add the submit handler `<script>`** (after the shared nav/reveal/GA script):

```html
<script>
  document.getElementById('ea-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('ea-email').value.trim();
    const size = document.getElementById('ea-size').value;
    const use = document.getElementById('ea-use').value.trim();
    const payload = new FormData();
    payload.append('access_key', '6cdc9753-8c20-49de-9334-276e842a5f82');
    payload.append('subject', `SynOS Early Access — ${email}`);
    payload.append('email', email);
    payload.append('company_size', size);
    payload.append('use_case', use);
    if (typeof gtag === 'function') gtag('event', 'early_access_submit');
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload })
      .then(r => r.json()).catch(() => null)
      .finally(() => {
        document.getElementById('ea-form').classList.add('hidden');
        document.getElementById('ea-success').classList.remove('hidden');
      });
  });
</script>
```

- [ ] **Step 3: Set `<title>` + meta** to "SynOS — Request early access" / matching description.

- [ ] **Step 4: Render + verify the form flow**

Playwright: navigate `http://localhost:4321/early-access.html`, screenshot. `browser_type` into email, `browser_click` Request access. Verify success state shows ("You're on the list."). `browser_console_messages` → no errors. (Web3Forms POST will actually send — use a throwaway test email; note it's fine, scorecard uses the same key.)

- [ ] **Step 5: Commit**

```bash
git add public/early-access.html
git commit -m "feat(early-access): waitlist page (Web3Forms)"
```

---

## Task 10: Nav mobile menu + footer link

**Files:**
- Modify: `public/index.html` nav (262-280), the 768px media rule (231-243), footer (500-506); apply the SAME nav/footer to `early-access.html`.

- [ ] **Step 1: Add a mobile nav toggle.** Currently `.nav-links { display:none }` under 768px with no menu (links unreachable). Add a hamburger button + a CSS-only/JS toggle. Replace the nav block (262-280) with:

```html
<nav class="nav" id="nav">
    <a href="/" class="nav-left">
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <path d="M11 7C11 7 11 7 16 7C21 7 23 10 23 13C23 16 21 18 16 18" stroke="#6366F1" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M21 25C21 25 21 25 16 25C11 25 9 22 9 19C9 16 11 14 16 14" stroke="#6366F1" stroke-width="2.2" stroke-linecap="round"/>
            <polyline points="14 15.5 16 14 14 12.5" stroke="#6366F1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="18 19.5 16 18 18 16.5" stroke="#6366F1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="nav-logo-text">SynOS</span>
    </a>
    <div class="nav-links" id="nav-links">
        <a href="/product">Product</a>
        <a href="/use-cases">Use Cases</a>
        <a href="/blog">Blog</a>
        <a href="/scorecard">Scorecard</a>
        <a href="/about">About</a>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
        <a href="/early-access" class="btn btn--primary" data-cta="cta-early-access-nav">Early access</a>
        <button id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" class="nav-toggle">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
        </button>
    </div>
</nav>
```

- [ ] **Step 2: Add nav-toggle CSS** (near `.nav` rules ~134) + update the 768px rule:

```css
        .nav-toggle { display: none; background: none; border: none; cursor: pointer; padding: 6px; }
        @media (max-width: 768px) {
            .nav-toggle { display: inline-flex; }
            .nav-links { display: none; position: absolute; top: 64px; left: 0; right: 0; flex-direction: column; gap: 0; background: rgba(250,250,248,0.98); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); padding: 8px 24px 16px; }
            .nav-links.open { display: flex; }
            .nav-links a { padding: 12px 0; font-size: 15px; border-bottom: 1px solid var(--border-light); }
        }
```
(Keep the other 768px rules already present.)

- [ ] **Step 3: Wire the toggle in the page `<script>`** (append):

```javascript
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (navToggle) navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
```

- [ ] **Step 4: Add "Early Access" to footer** — in `.footer-middle` (lines 500-506) add as first link: `<a href="/early-access">Early Access</a>`. Apply same nav + footer to `early-access.html`.

- [ ] **Step 5: Verify mobile nav** — Playwright `browser_resize` 375×800 on `/index.html`, `browser_click` `#nav-toggle`, verify links appear; screenshot. Desktop ≥769px: hamburger hidden, links inline.

- [ ] **Step 6: Commit**

```bash
git add public/index.html public/early-access.html
git commit -m "fix(nav): mobile menu toggle + early-access nav/footer links"
```

---

## Task 11: Update `CLAUDE.md` guardrails to lockstep

**Files:**
- Modify: `CLAUDE.md`

The site's CLAUDE.md still describes the v6.1 page (5 walls, "what's inside", trust-via-sandboxes, "Operating Layer for X Agents" framing, no early-access). Bring it current — otherwise the next agent fights the new page.

- [ ] **Step 1: Update these sections:**
  - **Canonical Slugs / framing:** allow `[X] Brain` as **template-pattern names** (Sales Brain, Marketing Brain, FinOps Brain, Internal Ops Brain, Support/CX Brain, Custom AI agents). Keep the ban on ❌ "Buy [X] Brain" / ❌ "Our [X] Brain product." Update the ✅/❌ examples accordingly.
  - **Landing Page Architecture:** bump to vNext. New section order: 1 Hero (early-access primary CTA) · 2 Six walls (problem, w/ examples + D3) · 3 Six pillars (answer + D1) · 4 Focus-on-impact / vs-alternatives (build the 20%) · 5 X-Brain templates (Company Brain flagship) · 6 Bottom CTA (early-access + demo + scorecard + Substack). Note "Five walls" → "Six walls"; trust-ladder NOT a home section.
  - **Vocabulary Guardrails:** keep the bare-"memory" ban; document Wall 1 = "No shared context" (not "memory"). Keep "Self-Learning Loop" proper-noun rule.
  - **Forms / Lead Capture:** add primary CTA = `/early-access` (Web3Forms email waitlist, same access key as scorecard); demote demo to secondary; scorecard/Substack tertiary.
  - **Analytics:** add events `cta-early-access-hero`, `cta-early-access-nav`, `cta-early-access-bottom`, `early_access_submit`, `cta-book-demo-hero`, `cta-book-demo-bottom`, `see-pattern-<brain>`.
  - **Design Tokens / Diagrams:** note the two inlined home diagrams (D1 architecture, D3 six-walls), built indigo→teal, Instrument Serif/DM Sans/JetBrains Mono; standalone sources in `docs/diagrams/`.

- [ ] **Step 2: Re-run the vocab grep** (Task 0 Step 4) across `public/` → still zero lines.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs(site): CLAUDE.md guardrails lockstep with home rewrite"
```

---

## Task 12: Full verification sweep

**Files:** none (verification)

- [ ] **Step 1: Vocab guardrail grep** — must return zero lines:

```bash
cd /Users/anoopjawahar/ws/synos-landing && grep -rEin --include='*.html' \
  -e 'self-learning' -e 'shared brain' -e 'hive mind' -e 'AI OS' \
  -e '\bagent OS\b' -e 'solo founder' public/ \
  | grep -v 'Self-Learning Loop' | grep -v 'Agent-Native Operating Layer' | grep -vi 'operating layer'
```

- [ ] **Step 2: No banned product framing** — must return zero lines:

```bash
cd /Users/anoopjawahar/ws/synos-landing && grep -rEin --include='*.html' -e 'buy .{0,8}brain' -e 'our .{0,8}brain product' public/
```

- [ ] **Step 3: Internal links resolve** — confirm `/early-access` → `public/early-access.html` exists; nav/footer links present on both pages:

```bash
cd /Users/anoopjawahar/ws/synos-landing && ls public/early-access.html && grep -c 'early-access' public/index.html
```
Expected: file exists; count ≥ 3 (hero, nav, bottom + footer).

- [ ] **Step 4: Full browser render pass** (Playwright) on `/index.html` desktop + 375px:
  - screenshot full page
  - `browser_console_messages` → no errors
  - scroll the whole page (reveals fire; D1 + D3 render; mesh backgrounds animate)
  - verify section order matches vNext

- [ ] **Step 5: GA events fire** — `browser_click` the hero "Request early access", confirm via console/network that `cta_click` (`cta-early-access-hero`) fires (the `[data-cta]` handler is intact).

- [ ] **Step 6: Early-access form e2e** — on `/early-access.html`, fill a throwaway email + submit, verify success state.

- [ ] **Step 7: Final commit + push branch**

```bash
cd /Users/anoopjawahar/ws/synos-landing
git add -A && git commit -m "chore(home): verification pass" --allow-empty
git push -u origin home-rewrite
```

(Do NOT merge to `main` — Vercel auto-deploys `main`. Merge is a human decision after visual review.)

---

## Self-Review (checklist run against the spine)

- **Spine §3 hero** → Task 3. ✅
- **Spine §4 what-it-is line** → folded into hero sub (the "company brain, safe hands, place to build" plain line can also live on Product page; home leads with the pillar sub). NOTE: the verbatim Verlinvest one-liner is NOT on the home in this plan — it's optional. If wanted on home, add a one-line strip under the hero in Task 3. (Flagging — minor scope choice.)
- **Spine §5 six walls (w/ examples)** → Task 4. ✅ (Wall 1 = "No shared context" per vocab guardrail.)
- **Spine §6 six pillars (bridged)** → Task 5. ✅ (each tagged with wall closed; "Self-Learning Loop" proper noun.)
- **Spine §2 focus thread + vs-alternatives** → Task 6. ✅
- **Spine §7 X-Brain (Company Brain flagship)** → Task 7. ✅ (templates framing; guardrail updated Task 11.)
- **Spine §8 early access** → Tasks 8, 9, 10. ✅
- **Spine §9 diagrams D1 + D3** → Tasks 1, 2 (built) + embedded Tasks 4, 5. ✅ (D2 flywheel + D4 X-brain map deferred to follow-on use-cases plan — home only needs D1 + D3.)
- **Spine §10 naming/voice** → enforced throughout + Task 11. ✅
- **Spine §11 IA fixes** (mobile nav, naming) → Task 10. ✅
- **Trust ladder removed** → not present. ✅
- **Type consistency:** GA event names, `[data-cta]` values, Web3Forms access key, class names all match `index.html`/`scorecard.html` originals. ✅
- **Placeholder scan:** the `#sales-brain` etc. anchors point to a page the follow-on plan builds — flagged inline in Task 7 (harmless 404-to-top until then). No other placeholders.
