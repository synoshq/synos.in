# Site Consistency Sweep — Implementation Plan (v2, post-review)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development or executing-plans. Steps use checkbox (`- [ ]`).
> **v2 incorporates plan_review fixes** — the v1 premises about footers/breakpoints/tokens were wrong; corrected below with file:line evidence.

**Goal:** Make every page of synos.in consistent + share-ready: migrate the 4 lagging pages to the canonical nav + mobile-toggle, standardize footers, add og:image + canonical everywhere, add an About early-access CTA, normalize visible "Synos" → "SynOS". Closes the live-review BLOCKING (mobile nav dead-end) + SHOULD-FIX items.

**Architecture:** Static HTML, CSS inlined per page, no build. Canonical source of truth = `public/index.html`. Copy its nav/toggle/footer/CSS/JS into lagging pages. No new behavior.

**Branch:** `main`. Commit per task; push after full verification (Task 6).

**OUT OF SCOPE:** forms deliverability (founder verifies from a real browser — Web3Forms CORS-blocks the sandbox); blog depth; pricing/docs pages; favicon PNG; scorecard-specific og image.

---

## Ground truth (verified by plan_review — DO NOT re-assume)

Per-page current state (from reading the real files):

| Page | Footer shape | nav-links hide rule | `--border-light`? | `--shadow-md`? | `.nav .btn--primary`? | `.btn--secondary`? | og tags? | visible "Synos" |
|---|---|---|---|---|---|---|---|---|
| **finops** (`use-cases/cloud-finops-agents.html`) | OLD centered 1-line | `@media 768 {display:none}` (~L108) | ❌ missing | ✅ has | ❌ missing | ✅ has | has og:title/desc/img | **4×** (L149,219,220,**227**) |
| **scorecard** | OLD centered 1-line (~L132) | `@media **600** {display:none}` (~L139) | ❌ missing | ✅ has | ❌ missing | ✅ has | has og:title/desc | 0 |
| **blog** | NEW footer already (~L146-165) — missing Early Access + Scorecard links | `@media 768 {display:none}` (~L67) | ❌ missing | ✅ has | ✅ has | (check) | **NONE** | 0 |
| **about** | NEW footer already (~L120-139) — missing Early Access + Scorecard links | `@media 768 {display:none}` (~L57) | ❌ missing | ❌ **missing** | ✅ has | ❌ **missing** | **NONE** | 0 |

- **cleanUrls: true** in `vercel.json` → on Vercel, `/product` etc. serve `product.html`. On the local `http.server --directory .`, root-absolute links (`/product`, `/early-access`, `/`, `/img/...`) **404** — EXPECTED, do NOT "fix" them. Verify link *correctness* by grep (`href="/product"`), and verify the mobile dropdown *renders* visually at ≤768px.
- Canonical nav uses an inline-styled `<div style="display:flex;align-items:center;gap:12px;">` wrapper (matches the 3 already-shipped pages home/use-cases/early-access). Use that form — do NOT introduce `.nav-right`.
- Canonical CSS line refs in index.html: `.nav .btn--primary` override ~L134 (+ mobile shrink ~L324); `.nav-toggle` base ~L135; mobile dropdown block `@media(max-width:768px)` ~L303-312 (`.nav-toggle{display:inline-flex}`, `.nav-links{position:absolute;top:64px;...background:var(--bg);box-shadow:var(--shadow-md);border-bottom:1px solid var(--border)}`, `.nav-links.open{display:flex}`, `.nav-links a{...border-bottom:1px solid var(--border-light)}`); footer CSS ~L283-295; nav-toggle JS ~L836-842.

**Canonical NAV markup** (copy verbatim; root-absolute links):
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

**Canonical FOOTER markup** (for finops + scorecard, which have the old footer):
```html
<footer class="site-footer">
    <div class="footer-inner">
        <div class="footer-left">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <path d="M11 7C11 7 11 7 16 7C21 7 23 10 23 13C23 16 21 18 16 18" stroke="#A1A1AA" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M21 25C21 25 21 25 16 25C11 25 9 22 9 19C9 16 11 14 16 14" stroke="#A1A1AA" stroke-width="2.2" stroke-linecap="round"/>
            </svg>
            <span class="footer-logo-text">SynOS</span>
        </div>
        <div class="footer-middle">
            <a href="/early-access">Early Access</a>
            <a href="/product">Product</a>
            <a href="/use-cases">Use Cases</a>
            <a href="/scorecard">Scorecard</a>
            <a href="/blog">Blog</a>
            <a href="/about">About</a>
        </div>
        <div class="footer-links">
            <a href="https://www.linkedin.com/in/anoopjawahar/" target="_blank">LinkedIn</a>
            <span class="footer-sep"></span>
            <a href="https://anoopjawahar.substack.com" target="_blank">Substack</a>
        </div>
    </div>
    <p class="footer-copy">&copy; 2026 SynOS. All rights reserved.</p>
</footer>
```

**Canonical mobile-toggle CSS to ADD** (copy these into a page's `<style>`; they don't pre-exist):
```css
        .nav-toggle { display: none; background: none; border: none; cursor: pointer; padding: 6px; }
        .nav .btn--primary { padding: 10px 22px; font-size: 14px; border-radius: 10px; }
```
and INSIDE the page's existing `@media (max-width: 768px) { ... }` block, **after deleting that block's existing `.nav-links { display: none; }`** (and for scorecard, after deleting its separate `@media(max-width:600px){.nav-links{display:none}}`), add:
```css
            .nav-toggle { display: inline-flex; }
            .nav-links { display: none; position: absolute; top: 64px; left: 0; right: 0; flex-direction: column; gap: 0; background: var(--bg); box-shadow: var(--shadow-md); border-bottom: 1px solid var(--border); padding: 8px 24px 16px; }
            .nav-links.open { display: flex; }
            .nav-links a { padding: 12px 0; font-size: 15px; border-bottom: 1px solid var(--border-light); }
```

**Canonical nav-toggle JS to append** (inside the page's existing body `<script>`, before its closing `</script>`):
```javascript
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (navToggle) navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
```
If a page has NO body `<script>` (only the head gtag), add a new `<script>` before `</body>` containing this + the `[data-cta]` click tracker (copy from index.html ~L843-847).

**`--border-light` token** (add to `:root` of any page missing it): `--border-light: #EBEBEA;`
**`--shadow-md` token** (add to about's `:root`): `--shadow-md: 0 4px 16px rgba(0,0,0,0.06);`
**`.btn--secondary` rule** (add to about): `.btn--secondary { background: transparent; color: var(--text); border: 1px solid var(--border); } .btn--secondary:hover { border-color: var(--accent); color: var(--accent); }`

**og/canonical head block** (swap PATH + page title/desc):
```html
    <meta property="og:image" content="https://synos.in/img/operating-layer-architecture.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<OG TITLE>">
    <meta name="twitter:description" content="<OG DESC>">
    <link rel="canonical" href="https://synos.in/<PATH>">
```

---

## Task 0: Branch + server

- [ ] `cd /Users/anoopjawahar/ws/synos-landing && git status` (on `main`).
- [ ] `(python3 -m http.server 4321 --directory . >/tmp/synos-server.log 2>&1 &)`. Browser MCP (Docker) → `http://host.docker.internal:4321/public/<page>.html`. **Reminder:** root-absolute links/images 404 locally — expected, not a regression.

---

## Task 1: `cloud-finops-agents.html` (old footer + full nav migration)

**Files:** Modify `public/use-cases/cloud-finops-agents.html`

- [ ] **Step 1:** Replace `<nav>…</nav>` with the canonical NAV markup.
- [ ] **Step 2:** Replace the old centered `<footer>…</footer>` (~L257-266 area) with the canonical FOOTER markup.
- [ ] **Step 3 (CSS):** (a) **Overwrite** the page's existing `.site-footer` and `.site-footer a` rules — the old `.site-footer{text-align:center}` + `.site-footer a{margin:0 12px}` would leak into the new footer. Replace with the canonical footer CSS block (`.site-footer{padding:48px 24px} .footer-inner{...} .footer-left{...} .footer-logo-text{...} .footer-middle{...} .footer-middle a{...} .footer-links{...} .footer-links a{...} .footer-sep{...} .footer-copy{...}` — copy from index.html ~L283-295). (b) Add `.nav-toggle` base + `.nav .btn--primary` override rules. (c) **DELETE** the existing `@media(max-width:768px){ .nav-links{display:none} }` rule (~L108) and replace with the canonical 768px block (toggle + dropdown). (d) Add `--border-light: #EBEBEA;` to `:root`.
- [ ] **Step 4 (JS):** Append the nav-toggle JS to the page's body `<script>` (or create one with the toggle + data-cta tracker).
- [ ] **Step 5 (head):** finops already has og:title/desc/og:image. Add only `twitter:card/title/description` + `<link rel="canonical" href="https://synos.in/use-cases/cloud-finops-agents">`.
- [ ] **Step 6 (casing):** Replace ALL 4 visible "Synos" → "SynOS": lines ~149 ("productized Synos offerings"), ~219 (img alt), ~220 ("Synos sits underneath"), **~227 ("Synos-delivered")**. Verify: `grep -n '\bSynos\b' public/use-cases/cloud-finops-agents.html | grep -v 'SynOS'` → only HTML comments (or zero).
- [ ] **Step 7 (CTA):** If the bottom CTA is demo-only, add primary "Request early access" → `/early-access` (`data-cta="cta-early-access-finops"`), demote demo to secondary.
- [ ] **Step 8 (verify):** Playwright at 375px — confirm the hamburger renders AND the dropdown **opens with the 5 links visible** (not just that `#nav-toggle` exists). Desktop: new footer renders, nav "Early access" button is correctly sized (not oversized). Console: ignore root-absolute 404s + favicon; no JS errors.
- [ ] **Step 9 (commit):** `git add public/use-cases/cloud-finops-agents.html && git commit -m "fix(finops): nav/footer/mobile-toggle + og/canonical + SynOS casing (4 spots)"`

---

## Task 2: `scorecard.html` (old footer + 600px breakpoint; PRESERVE quiz)

**Files:** Modify `public/scorecard.html`

⚠️ Do NOT touch the quiz state machine, `handleGateSubmit`, the Web3Forms key, or existing quiz `data-cta`s. Append the nav-toggle JS to the body `<script>` that ends ~L455 (before its `</script>`).

- [ ] **Step 1:** Replace `<nav>` with canonical NAV.
- [ ] **Step 2:** Replace the old centered `<footer>` (~L132-135 markup region) with canonical FOOTER.
- [ ] **Step 3 (CSS):** (a) Overwrite `.site-footer` + `.site-footer a` with the canonical footer CSS block. (b) Add `.nav-toggle` base + `.nav .btn--primary` override. (c) **DELETE the `@media(max-width:600px){ .nav-links{display:none} }` rule (~L139)** and add the canonical `@media(max-width:768px)` toggle+dropdown block (consolidate to 768px so there's no 601–768 doubled-nav band). (d) Add `--border-light: #EBEBEA;` to `:root`.
- [ ] **Step 4 (JS):** Append nav-toggle JS to the body script (before L455 `</script>`).
- [ ] **Step 5 (head):** scorecard has og:title/desc. Add only twitter + `<link rel="canonical" href="https://synos.in/scorecard">` + og:image.
- [ ] **Step 6 (verify):** 375px hamburger opens, 5 links show. THEN run the quiz end-to-end (5 answers → email gate appears) to confirm the JS still works. Console clean (ignore expected 404s).
- [ ] **Step 7 (commit):** `git add public/scorecard.html && git commit -m "fix(scorecard): nav/footer/mobile-toggle (600→768) + og/canonical; quiz untouched"`

---

## Task 3: `blog.html` (footer ALREADY new — add 2 links only)

**Files:** Modify `public/blog.html`

- [ ] **Step 1:** Replace `<nav>` with canonical NAV.
- [ ] **Step 2 (footer links only):** blog already has the new footer markup + CSS — do NOT re-add footer CSS. Just add the two missing links to its existing `.footer-middle`: `<a href="/early-access">Early Access</a>` (first) and `<a href="/scorecard">Scorecard</a>`, so the set matches canonical {Early Access, Product, Use Cases, Scorecard, Blog, About}.
- [ ] **Step 3 (CSS):** Add `.nav-toggle` base + `.nav .btn--primary` override (blog already has `.nav .btn--primary`? per ground-truth table it does — if present, skip). **DELETE** the `@media(max-width:768px){ .nav-links{display:none} }` (~L67) and add the canonical 768px toggle+dropdown block. Add `--border-light: #EBEBEA;` to `:root` (missing).
- [ ] **Step 4 (JS):** Append nav-toggle JS (create a body `<script>` if none, including the data-cta tracker).
- [ ] **Step 5 (head):** blog has NO og tags → add the FULL set: `og:title`, `og:description`, `og:type`, `og:url` (`https://synos.in/blog`), `og:image`, twitter card, canonical. Title "From the founder — SynOS"; description "Thinking on the Agent-Native Operating Layer, the Context Brain, and the SaaS-to-AI-native transition."
- [ ] **Step 6 (verify):** 375px hamburger opens; the 2 post cards still link out to Substack; footer now shows Early Access + Scorecard; console clean.
- [ ] **Step 7 (commit):** `git add public/blog.html && git commit -m "fix(blog): nav/mobile-toggle + footer links + full og/canonical"`

---

## Task 4: `about.html` (footer add 2 links; needs --shadow-md + .btn--secondary; + early-access CTA)

**Files:** Modify `public/about.html`

- [ ] **Step 1:** Replace `<nav>` with canonical NAV.
- [ ] **Step 2 (footer links only):** about already has the new footer — add the 2 missing `.footer-middle` links (Early Access first, Scorecard) to match canonical. Do NOT re-add footer CSS.
- [ ] **Step 3 (CSS):** Add `.nav-toggle` base + `.nav .btn--primary` override. **DELETE** `@media(max-width:768px){ .nav-links{display:none} }` (~L57) and add canonical 768px toggle+dropdown block. Add to `:root`: `--border-light: #EBEBEA;` AND `--shadow-md: 0 4px 16px rgba(0,0,0,0.06);` (about lacks `--shadow-md`). Add `.btn--secondary` rule (about lacks it; needed for the demoted demo button).
- [ ] **Step 4 (JS):** Append nav-toggle JS (create body script if none + data-cta tracker).
- [ ] **Step 5 (head):** about has NO og tags → add FULL set (og:title "About — SynOS"; og:description "The team building SynOS, the Agent-Native Operating Layer."; og:type, og:url `https://synos.in/about`, og:image, twitter, canonical).
- [ ] **Step 6 (CTA):** Add primary "Request early access" → `/early-access` (`data-cta="cta-early-access-about"`) beside the existing demo button; make demo `.btn--secondary`.
- [ ] **Step 7 (verify):** 375px hamburger opens; both CTAs present + styled (secondary has a border); dropdown has shadow; console clean.
- [ ] **Step 8 (commit):** `git add public/about.html && git commit -m "fix(about): nav/mobile-toggle + footer links + og/canonical + early-access CTA"`

---

## Task 5: og + casing on the 3 already-migrated pages

**Files:** Modify `public/product.html`, `public/use-cases.html`, `public/early-access.html`

- [ ] **Step 1 product:** add og:image + twitter + canonical `https://synos.in/product`. Normalize the visible architecture label `<div class="arch-synos-label">Synos · Agent-Native Operating Layer</div>` → "SynOS · …" (leave the `<!-- Middle: Synos … -->` comment).
- [ ] **Step 2 use-cases:** add og:image + twitter + canonical `https://synos.in/use-cases`.
- [ ] **Step 3 early-access:** add og:image + twitter + canonical `https://synos.in/early-access`.
- [ ] **Step 4 (commit):** `git add public/product.html public/use-cases.html public/early-access.html && git commit -m "fix(meta): og:image + canonical on product/use-cases/early-access; SynOS casing"`

---

## Task 6: Verification sweep + push

- [ ] **Step 1 (meta coverage):**
```bash
cd /Users/anoopjawahar/ws/synos-landing && for f in index product use-cases scorecard blog about early-access use-cases/cloud-finops-agents; do printf "%-30s og=%s canon=%s toggle=%s\n" "$f" "$(grep -c og:image public/$f.html)" "$(grep -c 'rel=\"canonical\"' public/$f.html)" "$(grep -c nav-toggle public/$f.html)"; done
```
Expect og≥1, canon≥1, toggle≥1 on ALL 8 (index already has og/toggle; add canonical to index too if missing — see Step 1b).
- [ ] **Step 1b:** index.html lacks canonical (per review). Add `<link rel="canonical" href="https://synos.in/">` to index.html `<head>`; commit `fix(meta): canonical on home`.
- [ ] **Step 2 (footer link parity):** `for f in ...; do printf "%-30s ea=%s sc=%s\n" "$f" "$(grep -c '>Early Access<' public/$f.html)" "$(grep -c '/scorecard\"' public/$f.html)"; done` → Early Access ≥1 on all.
- [ ] **Step 3 (SynOS casing guardrail):** `grep -rn '\bSynos\b' --include='*.html' public/ | grep -v 'SynOS'` → returns ONLY HTML comments (e.g. product L315) or zero. No visible lowercase "Synos".
- [ ] **Step 4 (vocab guardrail, must be empty):**
```bash
grep -rEin --include='*.html' -e 'self-learning' -e 'shared brain' -e 'hive mind' -e 'AI OS' -e '\bagent OS\b' -e 'solo founder' public/ | grep -v 'Self-Learning Loop' | grep -v 'Agent-Native Operating Layer' | grep -vi 'operating layer'
```
- [ ] **Step 5 (no leftover hide-rule):** `grep -rn 'nav-links { display: none; }' public/ ; grep -rn 'max-width: 600px' public/scorecard.html` → confirm no bare `.nav-links{display:none}` survives outside the canonical dropdown block; scorecard's 600px rule gone.
- [ ] **Step 6 (browser, the real blocker check):** Playwright at **375px** on scorecard, blog, about, cloud-finops-agents: click `#nav-toggle`, confirm the dropdown **opens and the 5 links are visible** (screenshot each). This is the BLOCKING fix — verify it RENDERS, not just that the button exists. Desktop ≥769px: hamburger hidden, links inline, "Early access" button correctly sized.
- [ ] **Step 7 (push):** `git push origin main` (live deploy).
- [ ] **Step 8:** `pkill -f "http.server 4321"`.
- [ ] **Step 9 (live spot-check):** after deploy, `curl -sI https://synos.in/about` etc.; confirm og:image present live on a couple pages.

---

## Self-Review (against review findings)

- Review §1 (blog/about already-new footer) → Tasks 3/4 add links only, no CSS dup. ✅
- Review §2 (delete leftover `.nav-links{display:none}`) → every migration task Step 3 explicitly DELETES it. ✅
- Review §3 (scorecard 600px) → Task 2 Step 3 deletes 600px, consolidates to 768. ✅
- Review §4 (`--border-light` all 4, incl finops) → added in Tasks 1-4. ✅
- Review §5 (finops 4th "Synos" L227) → Task 1 Step 6 lists all 4 + grep guard Task 6 Step 3. ✅
- Review §6 (`.nav .btn--primary` finops+scorecard) → Tasks 1/2 Step 3. ✅
- Review §7 (blog/about no og at all) → Tasks 3/4 Step 5 add FULL og set. ✅
- Review §8 (about `--shadow-md` + `.btn--secondary`) → Task 4 Step 3. ✅
- Review §9 (cleanUrls local 404s) → noted in Ground truth + Task 0 + every verify step uses dropdown-render check, not nav navigation. ✅
- Simplicity: no build/partial system introduced; inline-div nav kept (matches shipped pages); merged grep checks into Task 6. ✅
- index canonical gap → Task 6 Step 1b. ✅
