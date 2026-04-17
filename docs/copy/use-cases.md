# Use Cases Page — Copy Draft v1

**Status**: Ready for review
**URL**: https://synos.in/use-cases
**Plan**: `/Users/anoopjawahar/.claude/plans/magical-meandering-hamster.md`

**Vocabulary guardrails**:
- "Institutional brain" (product north-star)
- "Institutional knowledge" (substance descriptor)
- "Intelligence" = LLMs only
- Templates framed as "what's possible" / "starting points" — not overclaiming proven results

**Page goal**: Deep-dives on the 3 featured templates linked from homepage (with anchor IDs `#startup-ops`, `#sales-ops-lite`, `#cloud-infra-ops`), plus expanded treatments of 6 more. Help a prospect picture their own workflow inside a template, then book a call.

---

## 1. Nav (same as other pages)

Product | Use Cases (active) | Blog | About | [Talk to Founder]

---

## 2. Hero

**Eyebrow**: Use Cases

**Headline**:
# The kinds of operations SynOS can run.

**Sub-copy**:
Starting points for the workflows that run your company. Each template ships with pre-built agents, the right connectors, and the guardrails to run safely — then shapes itself to how your team actually operates through correction and self-learning.

**Small note under sub-copy**:
These are starting points, not proven benchmarks. Each template is shaped with your team during onboarding and compounds as your institutional brain grows.

---

## 3. Featured Template 1 — Startup Operations  (anchor: `#startup-ops`)

**Section header**: Startup Operations

**One-line pitch**:
One pulse across Slack, Linear, Sheets, and GitHub. Ops without hiring ops.

**The pain**:
Your startup is growing — and nobody's managing internal ops. Leadership wants visibility into what's shipping, what's stuck, and what's slipping — but the data is scattered across work-tracking tools, Slack threads, GitHub PRs, docs, and a pile of spreadsheets. Monday mornings are manual stitching.

**What SynOS does**:
Connects your collaboration stack into a single institutional brain. Agents read across Linear, Slack, GitHub, and Sheets, and learn which things mean what — your sprint cadence, your release conventions, your OKR scoring rules, your on-call rotation.

**These agents act like your ops team — they don't just report, they draft, update, flag, and follow up:**
- **Standup Summarizer** — Drafts daily or weekly status across engineering, product, and ops
- **Blocker Detector** — Surfaces stuck tickets, stalled PRs, and missed follow-ups before they become fires
- **OKR Tracker** — Watches key results, flags drift, and drafts quarterly check-ins
- **Weekly Digest** — A founder-ready snapshot of what moved, what slipped, and what needs attention
- **Client Requirement Tracker** — Compiles client requirements from docs, Slack, and meetings into structured specs

**Connectors**:
- **Work Tracking**: Linear, Jira, Asana
- **Communication**: Slack, Microsoft Teams
- **Code & Deploys**: GitHub, GitLab
- **Documentation**: Google Docs, Notion, Confluence
- **Data**: Google Sheets

**Outcome framing**:
Your team operates with a single source of truth without a single new hire. As you correct the agents, the brain learns your company's rhythms — and the Monday-morning grind starts compiling itself.

**CTA**: [Talk about your startup's ops — 15 min →]

---

## 4. Featured Template 2 — Sales Ops Lite  (anchor: `#sales-ops-lite`)

**Section header**: Sales Ops Lite

**One-line pitch**:
Pipeline intelligence from Sheets + Slack + docs. No CRM required.

**The pain**:
You have real deals, real revenue, and real urgency — but no Salesforce. Your pipeline lives in Google Sheets, deal context lives in Slack threads, and proposals live in Google Docs. Monday forecasting is a scramble. Deals go stale without anyone noticing.

**What SynOS does**:
Builds your pipeline's institutional brain from the tools you already use. Agents learn your deal stages, your naming conventions, how your team talks about deals in Slack, and which data points actually matter for forecasting. Over time, agents learn patterns from your pipeline and customer calls — what messaging works, which deal shapes convert, and where your team consistently loses. You get deep insights out of your own sales data, not generic benchmarks.

**These agents act like your sales ops team — they don't just track, they surface what matters and draft what's needed:**
- **Pipeline Health Monitor** — Watches stage transitions, flags deals that have gone quiet, highlights at-risk opportunities
- **Stale Deal Flagger** — Surfaces opportunities stuck too long in a stage or without recent touch
- **Forecast Drafter** — Generates weekly pipeline reports with confidence-weighted projections
- **Deal Context Pull** — Compiles all Slack + doc context on a deal before a call
- **Win/Loss Pattern Analyzer** — Learns what's working and what isn't from your closed deals — messaging, timing, deal structure

**Connectors**:
- **CRM (optional)**: HubSpot, Salesforce — or no CRM at all
- **Communication**: Slack, Microsoft Teams, Email (Gmail, Outlook)
- **Documentation**: Google Docs, Notion
- **Data**: Google Sheets
- **Calls**: Gong, Fireflies (optional — for call pattern learning)

**Outcome framing**:
Pipeline intelligence without a CRM migration. As your team corrects and annotates, the institutional brain captures patterns — which deal shapes convert, which stages are traps, where follow-ups matter most. Your forecast sharpens. Your team gets smarter. And every new rep inherits what the whole team has learned.

**CTA**: [Talk about your sales pipeline — 15 min →]

---

## 5. Featured Template 3 — Cloud Infra Ops Agents  (anchor: `#cloud-infra-ops`)

**Section header**: Cloud Infra Ops Agents

**One-line pitch**:
Monitor, optimize, and act across AWS, GCP, and Azure.

**The pain**:
Cloud spend is growing. Idle resources, forgotten test environments, oversized instances, anomalous spikes. Incidents happen across three clouds with different dashboards. Your DevOps lead is stretched. Manual reviews catch maybe half of what matters.

**What SynOS does**:
Connects to your billing and monitoring stack. Agents learn your org's cloud baseline — who owns what, which costs are normal for which teams, what an anomaly actually looks like given your deployment patterns — and act on what they find.

**These agents act like your FinOps + DevOps team — they don't just monitor, they investigate, flag, and act:**
- **Cost Watchdog** — Continuously monitors spend, flags anomalies, routes them to the right team in Slack
- **Idle Resource Detector** — Finds stale instances, orphaned volumes, and unused resources. Drafts cleanup PRs.
- **Budget Guardrail Agent** — Alerts on drift against team/project budgets before the bill closes
- **Incident Responder** — Correlates billing spikes with recent deploys and surfaces likely root causes

**Connectors**:
- **Cloud Providers**: AWS (Cost Explorer, CloudWatch), GCP (Billing, Monitoring), Azure (Cost Management, Monitor)
- **Tagging & Org**: Cost-allocation tags, org/team structure
- **Communication**: Slack, Microsoft Teams
- **Code & Deploys**: GitHub, GitLab (for deploy correlation)

**Outcome framing**:
A FinOps + incident-response team-in-a-box. Agents start in supervised mode (flag only), graduate to shadow (dry-run cleanups), then to autonomous action on scheduled, bounded operations. Your institutional brain learns what "normal" looks like for your company — not for some generic cloud customer.

**CTA**: [Talk about your cloud ops — 15 min →]

---

## 6. More Templates

*(These are additional operational starting points. Each is shaped to your team during onboarding.)*

**Card grid — 6 expanded templates (grid-2 or grid-3):**

### Customer 360
Unify CRM, support tickets, and product-usage signals into a single account view. Agents flag accounts that look healthy by CRM metrics but are actually declining based on support volume and usage drops. Proactive retention without a dedicated CS ops team.
**CRM**: Salesforce, HubSpot · **Support**: Zendesk, Intercom · **Product Analytics**: Segment, Amplitude · **Communication**: Slack

### Recruiting Pipeline
Track candidates across your ATS, recruiter Sheets, and interviewer Slack channels. Catch stale pipelines, missed follow-ups, and interview loops that have gone dark. Drafts nudge messages to recruiters and hiring managers.
**ATS**: Greenhouse, Lever, Ashby · **Data**: Google Sheets · **Communication**: Slack, Gmail

### Client Project Manager
Score project health across your delivery tools. Flag deadline risks early. Draft client status updates. Agents learn your delivery rhythm — what "on track" actually means for your agency or services team.
**Work Tracking**: Linear, Asana, Jira · **Communication**: Slack, Gmail · **Documentation**: Google Docs

### Revenue Ops
Forecast gaps, stale opportunities, renewal risk, and deal-quality drift across CRM + billing + Slack. Agents learn the difference between a real renewal slip and normal sales-cycle noise.
**CRM**: Salesforce, HubSpot · **Billing**: Stripe, Chargebee, NetSuite · **Communication**: Slack · **Calls**: Gong

### Compliance Watch
Flag sensitive data exposure, permission drift, and audit-trail gaps across your SaaS stack. Agents learn your policies, your exceptions, and your approval patterns — and act only where you've authorized them to.
**Identity**: Google Workspace, Okta · **Code**: GitHub · **Cloud**: AWS IAM · **Communication**: Slack

### Cross-Tool Tracker
Blocker detection, dependency tracking, and weekly digests across work-tracking tools, Slack, and docs. For larger teams where coordination breaks down between departments.
**Work Tracking**: Jira, Linear · **Communication**: Slack · **Documentation**: Google Docs, Confluence

---

## 7. Custom / Build Your Own

**Header**: Don't see your workflow?

**Body**:
Templates are starting points. If what you need isn't here, describe the workflow you wish ran itself — we'll shape a template around your stack and your rules during onboarding. The institutional brain is the same underneath.

**CTA**: [Describe your workflow — Talk to Founder →]

---

## 8. Bottom CTA

**Headline**:
## Start where your pain lives.

**Sub-copy**:
Pick a template. Or describe the workflow you wish ran itself. 15 minutes with the founder — we'll walk through how SynOS would shape a template to your team, your tools, and your way of operating.

**Primary CTA**: [Talk to Founder]
**Secondary**: [Read the thesis →] (Substack)

---

## 9. Footer (same as homepage)

---

## Notes for Founder Review

- **Anchor IDs**: `#startup-ops`, `#sales-ops-lite`, `#cloud-infra-ops` match the homepage template card links.
- **Agent names**: Each featured template has 4 pre-built agents listed. Confirm these match what's actually built/demonstrable. Easy to trim or rename.
- **Connectors**: Liberal listing (per earlier direction — show breadth). Ones with "/" are alternatives ("Salesforce / HubSpot" = either). Confirm which are real today vs quick-to-add.
- **"Expanded templates" section**: 6 additional templates. Kept scannable — 2-3 sentences each + connectors. If too much content, can drop to 3-4.
- **"Build Your Own" section**: Adds an honest closer — "don't see your workflow? describe it." Lets prospects self-select into a conversation even when templates don't match.
- **Outcome framing**: Everywhere kept at "here's what's possible" not "here are proven benchmarks" — per direction that templates use synthetic data for now.
- **CTAs throughout**: Repeated variants of "Talk to Founder" — currently 5 CTAs on the page (hero, each featured template, custom, bottom). Can trim if too many.
