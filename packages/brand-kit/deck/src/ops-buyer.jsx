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

export const wip = true

export const deck = (K) => {
  const {
    SlideFrame,
    SlideHeader,
    CoverSlide,
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
  ]
}
