/*
 * synos-ops-buyer — the 43-section operations-buyer deck, rebuilt on the brand kit.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word is the shipped deck's own
 * (`synos-gtm/presentations/synos-ops-buyer.html`). Content and platform must not move in the same
 * pass or nobody can tell which caused a difference. Where a slide's copy is wrong or stale, it
 * goes in the report for Anoop — it does not get quietly fixed here.
 *
 * WHY THIS DECK AND NOT THE OTHER. The two buyer decks share 288 of 328 class names — 91% of class
 * uses — so they are one family and this port carries tech-buyer with it. They share only 29% with
 * the VC deck, which is why this needed its own measurement pass first:
 * `docs/plans/2026-08-14-buyer-decks-mapping.md`.
 *
 * WORK IN PROGRESS. `wip` below is what lets the build run with fewer than 43 sections, and it
 * prints the count every time so a half-ported deck can never be mistaken for a finished one.
 * Remove it on the last section, not before.
 */
import unblockDiagram from './ops-assets/unblock.png'

/* The two hand-drawn diagrams, verbatim from the source. Injected rather than transcribed into
   JSX: re-typing shaped elements is a way to introduce differences that then get mistaken for
   design decisions. Their classes are styled in ops-buyer.css. */
const LOOP_SVG = "<svg viewBox=\"0 0 1080 320\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <radialGradient id=\"obLpCore\" cx=\"50%\" cy=\"36%\" r=\"72%\">\n            <stop offset=\"0\" stop-color=\"#8B8DF7\"/><stop offset=\"0.55\" stop-color=\"#6366F1\"/><stop offset=\"1\" stop-color=\"#7C3AED\"/>\n          </radialGradient>\n          <filter id=\"obLpGlow\" x=\"-60%\" y=\"-60%\" width=\"220%\" height=\"220%\">\n            <feDropShadow dx=\"0\" dy=\"6\" stdDeviation=\"12\" flood-color=\"#6366F1\" flood-opacity=\"0.28\"/>\n          </filter>\n          <marker id=\"obLpA\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n            <path d=\"M1 1 L9 5 L1 9 Z\" fill=\"#6366F1\"/>\n          </marker>\n          <marker id=\"obLpAv\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n            <path d=\"M1 1 L9 5 L1 9 Z\" fill=\"#7C3AED\"/>\n          </marker>\n        </defs>\n        <circle cx=\"300\" cy=\"160\" r=\"64\" fill=\"url(#obLpCore)\" filter=\"url(#obLpGlow)\"/>\n        <circle cx=\"300\" cy=\"160\" r=\"64\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".35\" stroke-width=\"1.4\"/>\n        <text x=\"300\" y=\"156\" text-anchor=\"middle\" style=\"font-family:'Plus Jakarta Sans';font-weight:800;font-size:19px;fill:#fff\">Synos</text>\n        <text x=\"300\" y=\"177\" text-anchor=\"middle\" style=\"font-family:'JetBrains Mono';font-size:8.5px;letter-spacing:1.4px;fill:rgba(255,255,255,.85)\">THE LOOP</text>\n        <rect class=\"lp-node\" x=\"196\" y=\"16\" width=\"208\" height=\"52\" rx=\"12\"/>\n        <circle class=\"lp-badge\" cx=\"216\" cy=\"42\" r=\"10\"/><text class=\"lp-badge-t\" x=\"216\" y=\"46\" text-anchor=\"middle\">1</text>\n        <text class=\"lp-h\" x=\"234\" y=\"38\">Your team corrects it</text>\n        <text class=\"lp-m\" x=\"234\" y=\"56\">\"top-tier \u2014 email, never SMS\"</text>\n        <rect class=\"lp-node\" x=\"452\" y=\"134\" width=\"160\" height=\"52\" rx=\"12\"/>\n        <circle class=\"lp-badge\" cx=\"472\" cy=\"160\" r=\"10\"/><text class=\"lp-badge-t\" x=\"472\" y=\"164\" text-anchor=\"middle\">2</text>\n        <text class=\"lp-h\" x=\"490\" y=\"156\">The AI acts</text>\n        <text class=\"lp-m\" x=\"490\" y=\"174\">in any tool you use</text>\n        <rect class=\"lp-node-plain\" x=\"196\" y=\"252\" width=\"208\" height=\"52\" rx=\"12\"/>\n        <circle class=\"lp-badge\" cx=\"216\" cy=\"278\" r=\"10\"/><text class=\"lp-badge-t\" x=\"216\" y=\"282\" text-anchor=\"middle\">3</text>\n        <text class=\"lp-h\" x=\"234\" y=\"274\">Systems report results</text>\n        <text class=\"lp-m\" x=\"234\" y=\"292\">measured, not guessed</text>\n        <path class=\"lp-edge lp-flow\" d=\"M 350 72 C 396 92, 428 112, 452 142\" marker-end=\"url(#obLpA)\"/>\n        <path class=\"lp-edge lp-flow\" d=\"M 456 186 C 424 226, 396 244, 360 258\" marker-end=\"url(#obLpA)\"/>\n        <path class=\"lp-edge lp-flow\" d=\"M 208 252 C 178 220, 178 100, 210 66\" marker-end=\"url(#obLpA)\"/>\n        <path class=\"lp-edge-v lp-flow\" d=\"M 366 178 C 500 236, 620 216, 686 178\" marker-end=\"url(#obLpAv)\"/>\n        <rect class=\"lp-panel\" x=\"692\" y=\"62\" width=\"230\" height=\"196\" rx=\"15\"/>\n        <text class=\"lp-ph\" x=\"807\" y=\"92\" text-anchor=\"middle\">What builds up</text>\n        <text class=\"lp-pr\" x=\"807\" y=\"122\" text-anchor=\"middle\">What actually worked</text>\n        <text class=\"lp-pr\" x=\"807\" y=\"152\" text-anchor=\"middle\">Ways of working that improve</text>\n        <text class=\"lp-pr\" x=\"807\" y=\"182\" text-anchor=\"middle\">The Company Brain itself</text>\n        <text class=\"lp-tag\" x=\"807\" y=\"216\" text-anchor=\"middle\">sharper every week</text>\n        <path class=\"lp-edge-v\" d=\"M 922 122 H 946\" marker-end=\"url(#obLpAv)\"/>\n        <path class=\"lp-edge-v\" d=\"M 922 196 H 946\" marker-end=\"url(#obLpAv)\"/>\n        <rect class=\"lp-pay\" x=\"950\" y=\"96\" width=\"122\" height=\"50\" rx=\"11\"/>\n        <text class=\"lp-pay-h\" x=\"1011\" y=\"117\" text-anchor=\"middle\">Better results now</text>\n        <text class=\"lp-pay-s\" x=\"1011\" y=\"133\" text-anchor=\"middle\">with today's AI</text>\n        <rect class=\"lp-pay\" x=\"950\" y=\"170\" width=\"122\" height=\"50\" rx=\"11\"/>\n        <text class=\"lp-pay-h\" x=\"1011\" y=\"191\" text-anchor=\"middle\">An asset you own</text>\n        <text class=\"lp-pay-s\" x=\"1011\" y=\"207\" text-anchor=\"middle\">yours, not a vendor's</text>\n      </svg>"

const EDGE_SVG = "<svg viewBox=\"0 0 640 330\" xmlns=\"http://www.w3.org/2000/svg\">\n          <defs>\n            <radialGradient id=\"obEgCore\" cx=\"50%\" cy=\"50%\" r=\"65%\">\n              <stop offset=\"0\" stop-color=\"#c7d2fe\"/><stop offset=\"1\" stop-color=\"#a5b4fc\"/>\n            </radialGradient>\n            <marker id=\"obEgA\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M1 1 L9 5 L1 9 Z\" fill=\"#10b981\"/></marker>\n          </defs>\n          <circle cx=\"240\" cy=\"168\" r=\"150\" fill=\"none\" stroke=\"#7c3aed\" stroke-width=\"1.6\" stroke-dasharray=\"7 6\"/>\n          <circle cx=\"240\" cy=\"168\" r=\"112\" fill=\"#eef2ff\" stroke=\"#c7d2fe\" stroke-width=\"1.4\"/>\n          <circle cx=\"240\" cy=\"168\" r=\"64\" fill=\"url(#obEgCore)\"/>\n          <text x=\"240\" y=\"163\" text-anchor=\"middle\" style=\"font-family:'Plus Jakarta Sans';font-weight:800;font-size:13px;fill:#312e81\">Public internet</text>\n          <text x=\"240\" y=\"180\" text-anchor=\"middle\" style=\"font-family:'Inter';font-size:9.5px;fill:#4338ca\">what every AI knows</text>\n          <text x=\"240\" y=\"80\" text-anchor=\"middle\" style=\"font-family:'Inter';font-size:10px;fill:#4f46e5\">licensed expert data</text>\n          <text x=\"240\" y=\"12\" text-anchor=\"middle\" style=\"font-family:'JetBrains Mono';font-size:8.5px;letter-spacing:.6px;fill:#7c3aed\">GROWS WITH EVERY AI RELEASE</text>\n          <g style=\"font-family:'Inter';font-size:10.5px;font-weight:600;fill:#0f172a\">\n            <text x=\"475\" y=\"96\">your operations</text>\n            <text x=\"490\" y=\"128\">your corrections</text>\n            <text x=\"498\" y=\"160\">your customer history</text>\n            <text x=\"490\" y=\"192\">your judgment calls</text>\n            <text x=\"475\" y=\"224\">your way of working</text>\n          </g>\n          <path d=\"M 392 168 q 22 0 40 0\" fill=\"none\" stroke=\"#10b981\" stroke-width=\"2\" marker-end=\"url(#obEgA)\"/>\n          <rect x=\"404\" y=\"248\" width=\"216\" height=\"58\" rx=\"12\" fill=\"#ecfdf5\" stroke=\"#6ee7b7\" stroke-width=\"1.4\"/>\n          <text x=\"512\" y=\"272\" text-anchor=\"middle\" style=\"font-family:'Plus Jakarta Sans';font-weight:800;font-size:12px;fill:#065f46\">THE EDGE</text>\n          <text x=\"512\" y=\"290\" text-anchor=\"middle\" style=\"font-family:'Inter';font-size:9.5px;fill:#047857\">your people + AI create value here</text>\n          <circle cx=\"418\" cy=\"110\" r=\"4\" fill=\"#10b981\"/><circle cx=\"434\" cy=\"142\" r=\"4\" fill=\"#10b981\"/>\n          <circle cx=\"440\" cy=\"174\" r=\"4\" fill=\"#10b981\"/><circle cx=\"434\" cy=\"206\" r=\"4\" fill=\"#10b981\"/>\n          <circle cx=\"418\" cy=\"238\" r=\"4\" fill=\"#10b981\"/>\n        </svg>"

export const wip = true

export const deck = (K) => {
  const {
    SlideFrame,
    SlideHeader,
    CoverSlide,
    Eyebrow,
    Callout,
    Caption,
    Chip,
    ChipRow,
    Tile,
    TileRow,
    UseCaseCard,
    UseCaseGrid,
    WallCard,
    WallGrid,
    StepCard,
    StepGrid,
    StatCard,
    StatRow,
    PhaseCard,
    PhaseRow,
    SplitColumns,
    SplitColumn,
    SplitItem,
    Stack,
    Columns,
  } = K

  return [
    /* ── 1 · Cover ────────────────────────────────────────────────────────
     * `.cover` + `.tag-row` of four `.pill`s. CoverSlide takes the pills as children; the source's
     * `.sub` is the lede, because this is a deck that gets SENT as often as it is presented. */
    {
      id: 'cover',
      node: (
        <CoverSlide
          stage={false}
          eyebrow="Synos"
          eyebrowTone="indigo"
          spacedEyebrow={false}
          title={
            <>
              Put your team's AI to work — <span className="sk-a">across your whole company</span>.
            </>
          }
          lede={
            <>
              Your people already use AI on their own laptops. Synos turns that into shared,
              always-on help for Sales, Marketing and Ops — help that knows <em>your</em> business,
              follows your rules, and gets better every week.
            </>
          }
        >
          <ChipRow center className="dk-gap">
            <Chip size="pill">Works with your tools</Chip>
            <Chip size="pill">Nothing goes out without approval</Chip>
            <Chip size="pill">Your data stays yours</Chip>
            <Chip size="pill">Live in weeks</Chip>
          </ChipRow>
        </CoverSlide>
      ),
    },

    /* ── 2 · The one idea ─────────────────────────────────────────────────
     * The unblock diagram. In the source this is `<img src="../blogs/…png">` — a path outside the
     * presentations directory, which resolves on the authoring machine and arrives BROKEN in a
     * buyer's inbox. Here the image is imported, so esbuild embeds it as a data: URI and shipping
     * that mistake is impossible. */
    {
      id: 'unblock',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            className="ob-center"
            eyebrow="The one idea"
            eyebrowTone="indigo"
            title="Unblock your humans, your agents, and your systems — from each other."
          />
          <div className="ob-hero">
            <img src={unblockDiagram} alt="Humans, agents and systems freed from each other, with Synos as the shared layer in the middle" />
          </div>
          <Caption italic>Synos is the shared layer in the middle.</Caption>
        </SlideFrame>
      ),
    },

    /* ── 3 · Our viewpoint ────────────────────────────────────────────────
     * `.belief-cols` is a two-column old-world / new-world contrast, which is exactly what
     * SplitColumns is for — it is the kit's *contrast* component, with its own label vocabulary. */
    {
      id: 'viewpoint',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Our Viewpoint"
            eyebrowTone="indigo"
            title="Every company operates differently. SaaS forced you to operate the same."
            subtitle="The old deal: buy the common 80%, use a fraction of it, and never get the 20% that's actually you."
          />
          <SplitColumns>
            <SplitColumn
              tone="neutral"
              eyebrow="The old world · SaaS"
              title={
                <>
                  80% common features — shipped.
                  <br />
                  20% custom to you — never built.
                </>
              }
            >
              <SplitItem marker="×">
                You bought the platform and bent your operations to fit it. You used a fraction of
                the feature list. The 20% unique to how you run was never the vendor's job to build.
              </SplitItem>
              <Caption mono>CRM SaaS · Marketing SaaS · Ops SaaS · …</Caption>
            </SplitColumn>
            <SplitColumn
              tone="violet"
              eyebrow="The new world · AI-built on your brain"
              title={
                <>
                  Software + AI helpers built for <em>your</em> way of working.
                </>
              }
            >
              <SplitItem marker="✓">
                Your team describes the work in plain English; AI builds it — on top of a shared
                memory that knows your business. The 20% you always needed, finally yours.
              </SplitItem>
              <Caption mono>Claude Code · ChatGPT · Codex · …</Caption>
            </SplitColumn>
          </SplitColumns>
          <Callout tone="indigo" className="dk-gap-sm">
            <strong>The AI itself isn't the advantage.</strong> The shared memory of how{' '}
            <em>your</em> company runs is. Swap the AI whenever a better one arrives — you keep
            everything it has learned about your business.
            <ChipRow className="dk-gap-sm">
              <Chip size="sm">Anthropic</Chip>
              <Chip size="sm">OpenAI</Chip>
              <Chip size="sm">Gemini</Chip>
              <Chip size="sm" tone="indigo">In your control</Chip>
            </ChipRow>
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 4 · The shift ────────────────────────────────────────────────────
     * `.shift-row` is a badge beside a line of prose, three times. Composed from Chip + text on the
     * kit's column grid rather than given a component: three rows on one slide is not a pattern. */
    {
      id: 'the-shift',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="The Shift"
            eyebrowTone="indigo"
            title="Individuals are already winning with AI. The team isn't compounding."
            subtitle="Great work — but it lives on one laptop, in one account. Nothing shared, nothing building on the last win."
          />
          <Stack gap="snug">
            {[
              [
                'ChatGPT · Claude',
                <>
                  A marketer drafts a full campaign plan and content calendar from a chat window.{' '}
                  <strong>Lives in her account.</strong>
                </>,
              ],
              [
                'Claude Code',
                <>
                  An ops lead pastes a raw warehouse key, asks for last week's anomalies as a
                  report. <strong>Runs on his laptop.</strong>
                </>,
              ],
              [
                'Codex',
                <>
                  An analyst scripts a Slack-to-Sheets bot to chase pending tasks.{' '}
                  <strong>Runs on his machine, alone.</strong>
                </>,
              ],
            ].map(([badge, line]) => (
              <div className="ob-row" key={badge}>
                <Chip mono tone="indigo">{badge}</Chip>
                <p>{line}</p>
              </div>
            ))}
          </Stack>
          <Callout tone="red" className="dk-gap">
            The individual is unblocked.{' '}
            <strong>
              The team is blocked from sharing and compounding the AI transformation — and walled
              off from real company value.
            </strong>
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 5 · The six walls ────────────────────────────────────────────────
     * WallGrid / WallCard, using the richer four-slot form the buyer decks need. */
    {
      id: 'six-walls',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Why AI Transformation Stalls"
            eyebrowTone="red"
            title="Six walls between a clever demo and real company value."
            subtitle="It's not the model. It's everything the model needs around it to be safe, shared, and worth trusting."
          />
          <WallGrid>
            <WallCard
              num="1"
              title="No shared memory"
              body="AI forgets your business every session; corrections die in chat history."
              quote="“Why do I re-explain our hubs, SLAs and last week's fix every single time?”"
            />
            <WallCard
              num="2"
              title="No safe access to systems"
              body="Reaching real data means raw keys on a laptop — no permissions, no audit."
              quote="“How do I even get to that warehouse table for analytics — safely?”"
            />
            <WallCard
              num="3"
              title="Nowhere safe to put it"
              body="Apps and their data end up in personal accounts. No safe home, no off-switch."
              quote="“Where does this app — and its data — actually live?”"
            />
            <WallCard
              num="4"
              title="Skills don't compound"
              body="No shared library. Everyone rebuilds the same skill or app; nothing is reused or scheduled."
              quote="“Sarah built this skill last month — why am I starting from scratch?”"
            />
            <WallCard
              num="5"
              title="Engineering gets overloaded"
              body="Every access request, guardrail and deploy routes through eng — they become the bottleneck."
              quote="“Why is every team's automation now a ticket in my backlog?”"
            />
            <WallCard
              num="6"
              title="No learning, no visibility"
              body="Outputs lost in Sheets and DMs. Who ran what, what's working — invisible."
              quote="“Did that even help? And is anyone else getting value from it?”"
            />
          </WallGrid>
        </SlideFrame>
      ),
    },

    /* ── 7 · What Synos is ────────────────────────────────────────────────
     * `.three-box` maps to UseCaseGrid: `.tb-kind` is the kicker, `h3` the title, `p` the body.
     * (Section 6, the scattered-context SVG, is deliberately not here yet — see the report.) */
    {
      id: 'what-synos-is',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="What Synos Is"
            eyebrowTone="indigo"
            title="A company brain, safe hands, and a place to build."
            subtitle="One shared foundation underneath every AI tool your teams already use."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="A company brain"
              title="Knows how you operate"
              body="Your data, documents and decisions — organised into one living memory every AI tool can draw on. It accumulates and gets better with use."
            />
            <UseCaseCard
              tone="emerald"
              kicker="Safe hands"
              title="Acts in your systems, safely"
              body="AI can look things up and take actions across your tools through one safe, logged door — with permissions and an off-switch. No passwords floating around on laptops."
            />
            <UseCaseCard
              tone="violet"
              kicker="A place to build"
              title="Apps & assistants your team owns"
              body="Turn a task into a shared app or an assistant that runs on its own — built by your team, kept inside your business."
            />
          </UseCaseGrid>
          <Caption italic className="dk-gap-sm">
            Let your people work in their own tools. We handle the hard infrastructure underneath.
          </Caption>
        </SlideFrame>
      ),
    },
    /* ── 8 · AI builds it ─────────────────────────────────────────────────
     * A prompt on the left, an arrow, and a product mock on the right. The mock is an
     * ILLUSTRATION — a picture of a screen — so it is deck-local CSS, the same call the kit made
     * for the SVG diagrams. The keyband and the closing note are local for the same reason: both
     * are full-width tinted bands with a specific gradient this deck uses three times. */
    {
      id: 'ai-builds-it',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="AI Builds It — Not Your Backlog"
            eyebrowTone="indigo"
            title="Describe a full application. AI writes it in minutes."
            subtitle="One plain-English brief — the AI builds the whole thing: screens, logic, charts, and rules — wired to your live data. No engineers, no six-month roadmap."
          />
          <div className="ob-keyband">
            <p>
              <strong>
                AI is already brilliant at building apps and workflows — it just can't safely reach
                your systems or truly understand your business.
              </strong>{' '}
              <em>Synos already has both wired in</em> — so the moment someone describes what they
              want, it just works on your real data.
            </p>
          </div>
          <div className="ob-two-mock dk-gap-sm">
            <div className="ob-prompt">
              <div className="ob-prompt-txt">
                <span className="ob-you">You describe · plain English</span>
                “Build me a <b>store-performance app</b>: daily sales vs target by region, flag any
                store 10%+ below target for 3 days, show top &amp; bottom SKUs, and let managers add
                a note on each flag.”
              </div>
            </div>
            <div className="ob-becomes">→</div>
            <div className="ob-mock">
              <div className="ob-mock-chrome">
                <div className="ob-mock-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="ob-mock-url">synos · store-performance · built by AI</div>
              </div>
              <div className="ob-mock-body">
                <div className="ob-kpi-row">
                  <div className="ob-kpi">
                    <b>₹4.2Cr</b>
                    <span>Today · sales</span>
                  </div>
                  <div className="ob-kpi">
                    <b className="up">+6%</b>
                    <span>vs target</span>
                  </div>
                  <div className="ob-kpi">
                    <b className="down">3</b>
                    <span>stores flagged</span>
                  </div>
                </div>
                <div className="ob-bars">
                  {[
                    ['', 80], ['good', 100], ['', 72], ['hot', 38],
                    ['', 88], ['good', 95], ['hot', 44], ['', 76],
                  ].map(([kind, h], i) => (
                    <i key={i} className={kind} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="ob-flag">
                  <span className="ob-dot" />
                  <span>
                    <b>Pune Camp</b> — 14% below target for 3 days · manager note: “festival stock
                    delayed”
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="ob-capnote dk-gap-sm">
            The AI wrote the app; <em>Synos gave it the safe access and business context to make it
            real.</em> That's why a non-engineer can do this in minutes.
          </div>
        </SlideFrame>
      ),
    },

    /* ── 9 · Plain English to a workflow ──────────────────────────────────
     * Same shape as slide 8, violet register, and the mock body is a workflow trace rather than a
     * dashboard. Note the source repeats the keyband copy verbatim across both slides — flagged in
     * the report rather than deduplicated here, because that is a content call. */
    {
      id: 'workflow-from-english',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Plain English → an AI Workflow"
            eyebrowTone="violet"
            title="Describe an agentic AI workflow — it runs the steps for you."
            subtitle="One sentence becomes a multi-step AI worker that thinks, acts across your systems, and stops for a human before anything leaves the building."
          />
          <div className="ob-keyband">
            <p>
              <strong>
                AI is already brilliant at building apps and workflows — it just can't safely reach
                your systems or truly understand your business.
              </strong>{' '}
              <em>Synos already has both wired in</em> — so the moment someone describes what they
              want, it just works on your real data.
            </p>
          </div>
          <div className="ob-two-mock dk-gap-sm">
            <div className="ob-prompt ob-prompt--violet">
              <div className="ob-prompt-txt">
                <span className="ob-you">You describe · plain English</span>
                “When a new lead comes in, <b>research the account</b>, draft a personalized reply,
                log it in the CRM, and WhatsApp me to approve before it sends.”
              </div>
            </div>
            <div className="ob-becomes">→</div>
            <div className="ob-mock">
              <div className="ob-mock-chrome">
                <div className="ob-mock-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="ob-mock-url">synos · lead-response-workflow · live</div>
              </div>
              <div className="ob-mock-body">
                <div className="ob-flow">
                  <div className="ob-step">
                    <span className="ob-step-n">1</span>
                    <span>
                      <b>Researches the account</b> — history, past orders, open tickets
                    </span>
                  </div>
                  <div className="ob-step">
                    <span className="ob-step-n">2</span>
                    <span>
                      <b>Drafts a tailored reply</b> in your tone, with the right offer
                    </span>
                  </div>
                  <div className="ob-step">
                    <span className="ob-step-n">3</span>
                    <span>
                      <b>Logs it in the CRM</b> and sets a follow-up
                    </span>
                  </div>
                  <div className="ob-step ob-step--approve">
                    <span className="ob-step-n">✓</span>
                    <span>
                      <b>WhatsApps you to approve</b>{' '}
                      <Chip size="sm" tone="emerald">WhatsApp</Chip> — tap send, or edit first
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ob-capnote dk-gap-sm">
            The AI designed the workflow;{' '}
            <em>Synos gave it safe access to your systems and the context to run it right</em> —
            always with a human check.
          </div>
        </SlideFrame>
      ),
    },

    /* ── 10 · Ask anything ────────────────────────────────────────────────
     * One mock containing two question-and-answer pairs side by side. `Columns` supplies the
     * geometry inside the mock body, which is the point of having it in the kit. */
    {
      id: 'ask-anything',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Ask Anything"
            eyebrowTone="indigo"
            title="Your company can answer — about the business, and about itself."
            subtitle="Everything runs on one connected brain. So anyone can ask in plain English and get a straight answer — whether it's a business question or “how do we do this in Synos?” Like onboarding someone who already knows both."
          />
          <div className="ob-mock">
            <div className="ob-mock-chrome">
              <div className="ob-mock-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="ob-mock-url">synos · ask your company</div>
            </div>
            <div className="ob-mock-body">
              <Columns gap="snug">
                <div>
                  <div className="ob-prompt">
                    <div className="ob-prompt-txt">
                      <span className="ob-you">About the business</span>
                      “How did our Diwali campaign do vs last year, and what drove it?”
                    </div>
                  </div>
                  <div className="ob-ans">
                    <p>
                      Revenue <b>+18%</b> — led by large appliances (<b>+31%</b>) and audio. Two
                      West stores lagged on stock.
                    </p>
                    <div className="ob-src-row">
                      <span className="ob-lbl">From</span>
                      <Chip size="sm" tone="indigo">Warehouse</Chip>
                      <Chip size="sm" tone="indigo">CRM</Chip>
                      <Chip size="sm" tone="indigo">Ad platforms</Chip>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="ob-prompt">
                    <div className="ob-prompt-txt">
                      <span className="ob-you">About running Synos</span>
                      “What assistants run for Sales — and how do I add one for win-backs?”
                    </div>
                  </div>
                  <div className="ob-ans">
                    <p>
                      Three are live: <b>lead-response, quote-follow-up, renewal-nudge</b>. To add
                      win-backs, just describe it — I can set it up now.
                    </p>
                    <div className="ob-src-row">
                      <span className="ob-lbl">From</span>
                      <Chip size="sm" tone="indigo">Your Synos setup</Chip>
                      <Chip size="sm" tone="indigo">Skills library</Chip>
                      <Chip size="sm" tone="indigo">This workspace</Chip>
                    </div>
                  </div>
                </div>
              </Columns>
            </div>
          </div>
          <div className="ob-capnote dk-gap-sm">
            The brain knows your business <em>and</em> how your company runs Synos —{' '}
            <em>so it can answer questions and help you operate it, in the same breath.</em>
          </div>
        </SlideFrame>
      ),
    },
    /* ── 11 · No migration ────────────────────────────────────────────────
     * `.tool-chip` is exactly the kit's `Tile` at `md` — this is the slide the component was
     * measured from. The connector row below it is Eyebrow + ChipRow, unchanged. */
    {
      id: 'no-migration',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="No Migration, No New Habits"
            eyebrowTone="indigo"
            title="Your people keep working in the tools they already love."
            subtitle="Synos sits underneath — making every one of them safe, shared, and always-on."
          />
          <TileRow>
            <Tile name="ChatGPT" kind="marketing · sales" />
            <Tile name="Claude Code" kind="ops · analysts" />
            <Tile name="Codex" kind="analysts · eng" />
            <Tile name="Slack" kind="everyone" />
            <Tile name="WhatsApp" kind="field · ops" />
          </TileRow>
          <Caption className="dk-gap-sm">▼ all run on the same shared foundation ▼</Caption>
          <div className="dk-gap-sm">
            <Eyebrow tone="muted">
              Connected to your existing stack out of the box — not replaced
            </Eyebrow>
            <ChipRow tight className="dk-gap-sm">
              <Chip mono>Warehouse · BigQuery</Chip>
              <Chip mono>CRM · Salesforce · HubSpot</Chip>
              <Chip mono>Sheets · Docs · Notion</Chip>
              <Chip mono>Drive · S3</Chip>
              <Chip mono>Slack · Email · WhatsApp</Chip>
              <Chip mono>Ads · GA</Chip>
              <Chip mono>Tickets · Internal APIs</Chip>
            </ChipRow>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 12 · The honest question ─────────────────────────────────────────
     * `.why-card` is an icon, a heading and a paragraph, three across — UseCaseGrid, with the
     * icons dropped. The kit's UseCaseCard has no icon slot and should not grow one for this: the
     * three glyphs here (a brain, a shield, a person) restate their own headings and carry no
     * information the heading does not. Decision C removed decoration that was doing no work;
     * this is the same call. Recorded in the report as a deliberate loss, not an oversight. */
    {
      id: 'honest-question',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="The Honest Question"
            eyebrowTone="indigo"
            title="“Why not just ChatGPT or Claude Code?”"
            subtitle={
              <>
                Because those are the driver. The hard part is everything the driver needs to run{' '}
                <em>your</em> company — safely, and shared across the team. Keep them; Synos is the
                layer underneath.
              </>
            }
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              title="A chat window forgets your business"
              body="Every session starts blank. What one person teaches it stays in their account — and leaves when they do. Synos gives the whole team one shared memory that sticks."
            />
            <UseCaseCard
              tone="emerald"
              title="To help, it needs your data — safely"
              body="On its own, that means pasting sensitive data or passwords into a chat. Synos is the one safe, logged door to your systems — with permissions and an instant off-switch."
            />
            <UseCaseCard
              tone="violet"
              title="It helps one person, on demand"
              body="Great tools — but still one person, one request at a time. Synos turns them into always-on assistants the whole team shares, running on a schedule with approvals."
            />
          </UseCaseGrid>
          <div className="ob-capnote dk-gap-sm">
            Keep ChatGPT, Claude Code, Copilot — bring any of them.{' '}
            <em>
              Synos is the layer underneath that makes them work on your company — and lets you swap
              the AI anytime without losing what it has learned.
            </em>
          </div>
        </SlideFrame>
      ),
    },
    /* ── 13 · The handoff nobody solves ───────────────────────────────────
     * `.sme-lanes` is IT-owns versus experts-own — a genuine contrast, so SplitColumns rather than
     * two cards side by side. The four `.sme-how` cards are StepCards at 4-up. Only the "today"
     * chain stays local: five states with connector arrows is a picture of a process. */
    {
      id: 'sme-authoring',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="The Handoff Nobody Solves"
            eyebrowTone="violet"
            title="Your experts build the agents. IT just sets the rails."
            subtitle="The rules that make an agent right sit with the people doing the work — your ops leads, analysts, marketers, support veterans. Today those rules only reach a working system through an engineer, and that queue is where AI projects die."
          />
          <div className="ob-chain">
            <span className="ob-chain-k">Today</span>
            <div className="ob-chain-links">
              <span className="s">expert explains the rule</span>
              <span className="a">→</span>
              <span className="s">ticket or doc</span>
              <span className="a">→</span>
              <span className="s">engineer interprets it</span>
              <span className="a">→</span>
              <span className="s">v1 misses the exception</span>
              <span className="a">→</span>
              <span className="s bad">back in the queue</span>
            </div>
            <span className="ob-chain-t">weeks per change · the real rules stay in heads</span>
          </div>
          <SplitColumns className="dk-gap-sm">
            <SplitColumn
              tone="indigo"
              eyebrow="IT / engineering owns · set up once"
              title="The rails"
            >
              <SplitItem>Which systems the AI can see, and which it can't</SplitItem>
              <SplitItem>
                What it's allowed to do on its own, and what needs a human to approve
              </SplitItem>
              <SplitItem>Permissions, full activity log, spend limits, instant off-switch</SplitItem>
              <SplitItem>The check that must pass before anything goes live</SplitItem>
              <Caption>A one-time setup they own — not a new project for every request.</Caption>
            </SplitColumn>
            <SplitColumn tone="violet" eyebrow="Your experts own · every day" title="The know-how">
              <SplitItem>How we do this, written in plain English — no code</SplitItem>
              <SplitItem>
                The rules, the exceptions, the judgment calls, captured as they come up
              </SplitItem>
              <SplitItem>
                Corrections on the AI's drafts — each one teaches it permanently
              </SplitItem>
              <SplitItem>“Here are ten real cases — get them right”</SplitItem>
              <Caption>
                No ticket, no waiting. Inside the rails, there is nothing they can break.
              </Caption>
            </SplitColumn>
          </SplitColumns>
          <StepGrid columns={4} className="dk-gap-sm">
            <StepCard
              bar={false}
              num="1"
              title="Rails set up once"
              body="IT decides what the AI can see and do. Everything your team writes on top of that is safe by design."
            />
            <StepCard
              bar={false}
              num="2"
              title="Your expert writes it in plain English"
              body="In chat or Slack: “Billing escalations from top-tier accounts never go by SMS — email finance first.” Saved as a rule the AI follows."
            />
            <StepCard
              bar={false}
              num="3"
              title="Corrections while working"
              body="Edit the AI's draft the way you'd fix a junior's. The change is remembered — that's how tribal knowledge finally gets written down."
            />
            <StepCard
              bar={false}
              num="4"
              title="Tried out, then trusted"
              body="Run it against past real cases, check the results, then let it go from suggesting → reviewed → running on its own. Reversible at any point."
            />
          </StepGrid>
          <div className="ob-band-violet dk-gap-sm">
            <strong>The handoff disappears.</strong> The person who knows the work is the one who
            teaches the system — and IT moves from writing down other people's rules to owning the
            rails and reviewing what goes live.
          </div>
        </SlideFrame>
      ),
    },
    /* ── 14 · Templated brains ────────────────────────────────────────────
     * Six `.template` cards: an icon, a name, a vertical, and a list. UseCaseGrid holds them —
     * `.t-vertical` is the kicker, and the list goes in the body. The custom-brain card takes
     * Six DIFFERENT hues, deliberately. The first pass dropped the source's per-card icons and
     * left every card the same colour — and the A/B against the source showed that was wrong: six
     * near-identical cards are hard to scan, and each icon's hue was doing real work telling them
     * apart. The distinction is restored through the kit's tones instead of six glyphs, so the
     * information survives and the decoration does not. */
    {
      id: 'templated-brains',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Templated Brains"
            eyebrowTone="indigo"
            title="A starting brain for every operating team."
            subtitle="Pre-built for the functions a lean consumer company runs — live in weeks, then tuned to you."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="Revenue · Pipeline"
              title="Sales Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Lead triage &amp; instant follow-up</li>
                  <li>AI battlecards &amp; objection handling</li>
                  <li>Pipeline hygiene &amp; deal nudges</li>
                  <li>Account &amp; competitor context</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="amber"
              kicker="Growth · Demand"
              title="Marketing Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Campaign planning &amp; decisioning</li>
                  <li>Content &amp; creative drafting</li>
                  <li>Channel &amp; ROAS performance digests</li>
                  <li>Audience &amp; cohort context</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="emerald"
              kicker="Operations · SOPs"
              title="Internal Ops Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Weekly ops digests &amp; exceptions</li>
                  <li>SOP capture &amp; playbook lookup</li>
                  <li>Vendor / supply / fleet monitoring</li>
                  <li>Incident &amp; escalation handling</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="red"
              kicker="FP&amp;A · Spend"
              title="Finance Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Budget &amp; spend pacing</li>
                  <li>Margin &amp; unit-economics watch</li>
                  <li>Anomaly &amp; variance alerts</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="violet"
              kicker="Customer · Retention"
              title="Support / CX Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Ticket triage &amp; drafted replies</li>
                  <li>Voice-of-customer themes</li>
                  <li>Churn &amp; CSAT signal watch</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="violet"
              kicker="The 20% that's you"
              title="Your custom brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Whatever your business runs on</li>
                  <li>Built on the same rails</li>
                  <li>Owned and extended by your team</li>
                </ul>
              }
            />
          </UseCaseGrid>
          <div className="ob-capnote dk-gap-sm">
            <strong>Templates are the starting point, not the ceiling.</strong> Each ships day-one
            and then <em>compounds on your data and your corrections</em> until it operates the way
            you do.
          </div>
        </SlideFrame>
      ),
    },

    /* ── 15 · A day in the difference ─────────────────────────────────────
     * The same `.belief-cols` contrast as slide 3, so the same SplitColumns. Two slides using one
     * component the same way is the argument for the component. */
    {
      id: 'two-mondays',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="A Day in the Difference"
            eyebrowTone="indigo"
            title="Same lead. Same team. Two very different Mondays."
            subtitle="What changes isn't the people — it's whether the work waited for them."
          />
          <SplitColumns>
            <SplitColumn
              tone="neutral"
              eyebrow="Today · the work waits"
              title="A lead comes in Friday, 6pm."
            >
              <SplitItem marker="×">
                It sits over the weekend. Monday, someone finally notices, pieces the account
                history together across three different tools, then writes a reply.
              </SplitItem>
              <SplitItem marker="×">
                <strong>First contact: ~62 hours later — if it isn't missed entirely.</strong>
              </SplitItem>
            </SplitColumn>
            <SplitColumn
              tone="violet"
              eyebrow="With Synos · the work is ready"
              title="A lead comes in Friday, 6pm."
            >
              <SplitItem marker="✓">
                An assistant pulls the full history, drafts a tailored reply, and queues it. Monday
                9am your rep reads it, adjusts a line, and sends.
              </SplitItem>
              <SplitItem marker="✓">
                <strong>First contact: minutes — every time, even after hours.</strong>
              </SplitItem>
            </SplitColumn>
          </SplitColumns>
          <Callout tone="indigo" className="dk-gap">
            Nobody worked the weekend. The people didn't change —{' '}
            <em>the work simply stopped waiting on them.</em>
          </Callout>
        </SlideFrame>
      ),
    },
    /* ── 16 · Why it compounds ────────────────────────────────────────────
     * The loop diagram, carried across verbatim. Its CSS is in ops-buyer.css, re-pointed at
     * tokens; the source's dash ANIMATION is dropped, because a deck exported to PDF freezes
     * mid-animation and the export has to be deterministic. */
    {
      id: 'why-it-compounds',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Why It Compounds"
            eyebrowTone="violet"
            title="What compounds is the record of how your company works."
            subtitle="Your people correct. The AI acts. Your systems report what actually happened. Every turn builds something no public AI can ever learn on its own — and it keeps paying off no matter which AI you use next year."
          />
          <div className="ob-loop" dangerouslySetInnerHTML={{ __html: LOOP_SVG }} />
          <Caption className="dk-gap-sm">
            Live today at a martech design partner: every correction an operator makes feeds one
            shared memory their whole platform gets smarter from.{' '}
            <strong>This is knowledge no outside AI can have — and it stays with you.</strong>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 17 · Where value gets created ────────────────────────────────────
     * Diagram on the left, three points on the right, a quotation underneath. The three points are
     * a bordered list rather than cards — kept local, because a left-ruled point is the source's
     * own shape and the kit's Callout would restate it at a different weight. */
    {
      id: 'the-edge',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Where Value Gets Created Now"
            eyebrowTone="indigo"
            title="New value gets created at the edge of what AI already knows."
            subtitle="Public AI knows the public internet. It doesn't know your customers, your exceptions or your judgment. That's where your people create value — and on Synos, everything they create teaches your AI."
          />
          <div className="ob-edge">
            <div className="ob-edge-svg" dangerouslySetInnerHTML={{ __html: EDGE_SVG }} />
            <div className="ob-edge-side">
              <div className="ob-edge-pt">
                <h3>Your people move faster</h3>
                <p>Work runs at AI speed — on your own context, not generic answers off the internet.</p>
              </div>
              <div className="ob-edge-pt ob-edge-pt--em">
                <h3>The edge is yours alone</h3>
                <p>
                  The decisions, corrections and outcomes created here exist nowhere else — not in
                  any AI, not at any competitor.
                </p>
              </div>
              <div className="ob-edge-pt ob-edge-pt--vi">
                <h3>Doing the work improves the AI</h3>
                <p>
                  Every bit of that work feeds back: your assistants and your shared memory get
                  better as the team simply does its job.
                </p>
              </div>
            </div>
          </div>
          <div className="ob-edge-quote dk-gap-sm">
            “You can offload a task, or even a job — <strong>you can never offload your
            learning.</strong>” As AI makes expertise cheap, the lasting advantage moves from the AI
            to the learning loop you own. — <strong>Satya Nadella, 2026</strong>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 18 · What your teams get ─────────────────────────────────────────
     * Three outcome columns, each a heading, a tag, a list and a result line. UseCaseGrid again,
     * with the result line as a Caption inside the card body — and one hue per column, which is
     * the lesson from slide 14: a set of near-identical cards needs colour to be scannable. */
    {
      id: 'what-teams-get',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="What Your Teams Get"
            eyebrowTone="emerald"
            title="Run leaner and faster — where it shows up on the P&L."
            subtitle="The same team, doing more — because the repetitive work runs itself and the judgement work is better-informed."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="Revenue"
              title="Sales Ops"
              body={
                <>
                  <ul className="ob-tpl-list">
                    <li>Leads followed up instantly, not next day</li>
                    <li>Every rep armed with live battlecards</li>
                    <li>Pipeline kept clean without nagging</li>
                  </ul>
                  <div className="ob-result">↑ Higher conversion &amp; revenue per rep</div>
                </>
              }
            />
            <UseCaseCard
              tone="amber"
              kicker="Demand"
              title="Marketing Ops"
              body={
                <>
                  <ul className="ob-tpl-list">
                    <li>Campaigns planned &amp; launched faster</li>
                    <li>More content, on-brand, less manual effort</li>
                    <li>Spend steered by always-on performance reads</li>
                  </ul>
                  <div className="ob-result">↑ More qualified leads &amp; better ROAS</div>
                </>
              }
            />
            <UseCaseCard
              tone="emerald"
              kicker="Efficiency"
              title="Internal Ops"
              body={
                <>
                  <ul className="ob-tpl-list">
                    <li>Manual reporting &amp; monitoring runs itself</li>
                    <li>Issues caught early, fewer fire-drills</li>
                    <li>Institutional knowledge survives churn</li>
                  </ul>
                  <div className="ob-result">↑ Leaner ops, faster cycles, fewer errors</div>
                </>
              }
            />
          </UseCaseGrid>
          <Caption italic className="dk-gap-sm">
            The compounding effect: the brain gets smarter, the assistants do more, and the team's
            leverage grows every quarter — without growing headcount at the same rate.
          </Caption>
        </SlideFrame>
      ),
    },
    /* ── 19 · The payoff ──────────────────────────────────────────────────
     * Four big numbers with a line each. StatCard / StatRow is exactly this and the kit already
     * has it — the source's `.vision-pill` with an inline 26px override is a stat card that had
     * not been recognised as one. */
    {
      id: 'the-payoff',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="The Payoff"
            eyebrowTone="emerald"
            title="What a team tends to feel in the first quarter."
            subtitle="Illustrative targets from early pilots — not a promise, but what we point a first workflow at."
          />
          <StatRow columns={4}>
            <StatCard value="~5 hrs" label="per person, per week, handed back from repetitive work." />
            <StatCard tone="amber" value="Minutes" label="to first follow-up — not the next working day." />
            <StatCard tone="emerald" value="Weeks" label="to go live on the first workflow — not quarters." />
            <StatCard value="Zero" label="of your data leaves your own systems." />
          </StatRow>
          <Caption italic className="dk-gap">
            Same headcount, more output — and the know-how stays with you when people move on.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 20 · From early pilots ───────────────────────────────────────────
     * Same card shape as slide 14, one hue each for the same reason. */
    {
      id: 'early-pilots',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="From Early Pilots"
            eyebrowTone="indigo"
            title="Real teams, real workflows — already running."
            subtitle="A few of the first workflows live today, kept anonymous by request. Different industries, same pattern."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="Reporting"
              title="A retail team"
              body={
                <ul className="ob-tpl-list">
                  <li>Monthly partner-performance deck, once hand-built</li>
                  <li>Now drafted automatically for a human to review</li>
                  <li>Days of manual work → a morning's review</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="amber"
              kicker="Sales response"
              title="A D2C brand"
              body={
                <ul className="ob-tpl-list">
                  <li>After-hours leads used to wait till morning</li>
                  <li>Now get an instant, on-brand first reply</li>
                  <li>A person still approves anything unusual</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="emerald"
              kicker="Weekly digest"
              title="An operations team"
              body={
                <ul className="ob-tpl-list">
                  <li>Exception reports lived in one person's head</li>
                  <li>Now produced and shared every Monday</li>
                  <li>Survives when that person is on leave</li>
                </ul>
              }
            />
          </UseCaseGrid>
          <div className="ob-capnote dk-gap-sm">
            <strong>Same pattern every time:</strong> work that used to wait on a person now runs —{' '}
            <em>with a person still approving.</em>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 21 · Your AI transformation ──────────────────────────────────────
     * A three-step arc with arrows between. PhaseCard/PhaseRow is the kit's horizon component and
     * carries `when` (TODAY / IN WEEKS / WITHIN THE YEAR) as its own slot — the arrows go, because
     * the row already reads left to right and three glyphs between three cards is the kind of
     * connective decoration decision C removed. */
    {
      id: 'transformation-arc',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Your AI Transformation"
            eyebrowTone="indigo"
            title="From scattered AI experiments to an AI-run company."
            subtitle="Most companies are stuck at step one. Synos is how you move through all three — in weeks, not years."
          />
          <PhaseRow>
            <PhaseCard
              when="Today"
              title="AI on laptops"
              body="A few sharp people get wins in ChatGPT. It lives in their account, isn't shared, and disappears the day they leave."
            />
            <PhaseCard
              position="bridge"
              when="In weeks"
              title="A shared brain + first assistants"
              body="Your business knowledge lives in one place. The first assistants handle real work — follow-ups, reports, digests — with a person approving each step."
            />
            <PhaseCard
              position="far"
              when="Within the year"
              title="Every team compounds"
              body="Sales, Marketing and Ops each run on assistants that get better every week. The same headcount does far more — and the knowledge stays with you."
            />
          </PhaseRow>
          <div className="ob-capnote dk-gap">
            <strong>The gap was never the AI.</strong> It's everything around it — shared memory,
            safe access, approvals. <em>That's what Synos gives you.</em>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 22 · Graduated trust ─────────────────────────────────────────────
     * The same three-step shape as 21, so the same PhaseRow. Two slides on one component again. */
    {
      id: 'graduated-trust',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Graduated Trust"
            eyebrowTone="indigo"
            title="From a helping hand to work that runs itself — you stay in control."
            subtitle="Start with AI helping one person; grow to always-on help — with a person approving every step, at every stage."
          />
          <PhaseRow>
            <PhaseCard
              badge="01"
              when="Stage one"
              title="Run it yourself"
              body="Your team uses AI in the tools they already have. A person drives every step and approves every action."
            />
            <PhaseCard
              badge="02"
              position="bridge"
              when="Stage two"
              title="Runs on a schedule"
              body="It runs on a schedule and drafts the work. A person reviews and approves before anything goes out — most of the work, a fraction of the time."
            />
            <PhaseCard
              badge="03"
              position="far"
              when="Stage three"
              title="Runs on its own"
              body="It runs continuously, posting to Slack/WhatsApp, and only comes back to a person for the exceptions. You can pause or stop it any time."
            />
          </PhaseRow>
          <div className="ob-capnote dk-gap">
            <strong>Every stage stays under your control.</strong> Permissions, a full activity log,
            human review and an instant off-switch apply at every level — so{' '}
            <em>running on its own never means out of your control</em>.
          </div>
        </SlideFrame>
      ),
    },
  ]
}
