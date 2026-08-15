/*
 * synos-tech-buyer — the 42-section technical-buyer deck, rebuilt on the brand kit.
 *
 *   node deck/build.mjs --deck tech-buyer
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word is the shipped deck's own
 * (`synos-gtm/presentations/synos-tech-buyer-v3.html`). Content and platform must not move in the
 * same pass or nobody can tell which caused a difference. Where a slide's copy is wrong or stale it
 * goes in the report for Anoop; it does not get quietly fixed here.
 *
 * WHAT THIS PORT INHERITS. The two buyer decks share 288 of 328 class names — 91% of class uses —
 * so `ops-buyer.jsx` did most of this job already. Measured against it section by section, 24 of
 * these 42 are near-lifts of a slide that deck already ported (`docs/plans/2026-08-14-buyer-decks-
 * mapping.md`). That is why this file reads as thin as it does: the components it needs mostly
 * exist, and the ones that did not — `Tile` above all — were built during that port.
 *
 * WHAT IS GENUINELY NEW HERE. Roughly fifteen slides, and they are the technical half of the story:
 * the five hard parts, the retrieval router, the living-context brain, the autonomy gate, the
 * open-source graph-memory comparison. Those are also where the nine carried diagrams live.
 *
 * THE DIAGRAMS ARE CARRIED, NOT REDRAWN. `tech-buyer-svgs.js` holds all nine verbatim, extracted
 * programmatically. See that file's header for why, and for the black-bar failure that made
 * checking their tokens a step rather than an assumption.
 */
import {
  SEAM_SVG,
  EDGE_SVG,
  BRAIN_SVG,
  GOV_SVG,
  LOOP_SVG,
  RETRIEVAL_SVG,
  FLYWHEEL_SVG,
  SOR_SVG,
  BUILD_SVG,
} from './tech-buyer-svgs.js'

/* Under construction. While this is exported, `build.mjs` reports the count instead of asserting
   it — the deliberate, visible opt-out, so that a deck cannot ship short by being forgotten. */
export const wip = true

/*
 * The running order, stated once and enforced.
 *
 * Same discipline as the ops-buyer port: the slides below are written in whatever order the port
 * worked through them, which is not the order the deck runs in. Relying on file position is how a
 * deck ships with its architecture slide after the appendix divider.
 */
const ORDER = [
  'cover',
  'unblock',
  'viewpoint',
  'the-edge',
  'the-gap',
  'the-shift',
  'six-walls',
  'what-synos-is',
  'operating-layer',
  'six-capabilities',
  'living-brain',
  'retrieval-router',
  'no-migration',
  'hard-parts',
  'hp-staying-current',
  'hp-who-authors',
  'hp-agents-act',
  'hp-earning-autonomy',
  'hp-the-gate',
  'hp-learning',
  'hp-where-it-leads',
  'no-lock-in',
  'where-this-goes',
  'two-ways',
  'product-transformation',
  'templated-brains',
  'what-teams-get',
  'how-it-lands',
  'the-outcome',
  'to-the-demo',
  'under-the-hood',
  'architecture',
  'memory-types',
  'retrieval-deep',
  'oss-question',
  'oss-comparison',
  'compounding-flywheel',
  'operational-data',
  'safe-to-build',
  'why-synos',
  'apx-the-moat',
  'closing',
]

export const deck = (K) => {
  const {
    SlideFrame,
    SlideHeader,
    CoverSlide,
    BigTypeSlide,
    Eyebrow,
    Callout,
    Caption,
    Chip,
    ChipRow,
    Tile,
    TileRow,
    Stack,
    Columns,
    Matrix,
    PillarCard,
    PillarGrid,
    UseCaseCard,
    UseCaseGrid,
    StepCard,
    StepGrid,
    PhaseCard,
    PhaseRow,
    WallCard,
    WallGrid,
    SplitColumns,
    SplitColumn,
    SplitItem,
  } = K

  /* The architecture bands. Same three-layer stack the VC deck draws, and the same rule learned
     there the hard way: the outer bands are BOXES. De-boxing them leaves shrink-to-fit rows inside
     a full-width card, so the three layers of a stack end up three different widths. See the
     `.dk-band` block in deck.css. */
  const Band = ({ tone, label, children }) => (
    <div className={`dk-band dk-band--${tone}`}>
      <Eyebrow tone="muted">{label}</Eyebrow>
      {children}
    </div>
  )

  const slides = [
    /* ── 1 · Cover ────────────────────────────────────────────────────────
     * CoverSlide. The technical deck's cover carries a two-line title and a real paragraph, which
     * is what `lede` is for — this deck is SENT to an engineering audience that reads before any
     * call happens. */
    {
      id: 'cover',
      variant: 'cover',
      node: (
        <CoverSlide
          stage={false}
          eyebrow="Synos"
          eyebrowTone="indigo"
          spacedEyebrow={false}
          title={
            <>
              The <span className="sk-gradient-text">Human-Agent</span> Operating Layer
              <br />
              Bring your company to life.
            </>
          }
          lede={
            <>
              Unblock your humans, your agents, and your systems — from each other. The self-learning
              brain, skills, agents and apps that let AI operate <em>your</em> company — safely,
              shared, self-hosted, and governed.
            </>
          }
        >
          <ChipRow center className="dk-gap">
            <Chip size="pill">Self-hosted</Chip>
            <Chip size="pill">Model- &amp; tool-agnostic</Chip>
            <Chip size="pill">Bring your own harness</Chip>
            <Chip size="pill">Governed by default</Chip>
          </ChipRow>
        </CoverSlide>
      ),
    },

    /* ── 2 · The one idea ─────────────────────────────────────────────────
     * The seam diagram, carried. Unlike the ops deck — which ships this as a raster `<img>` from a
     * path outside the presentations directory — the technical deck draws it as inline SVG, so it
     * stays sharp at projector scale and in the PDF. Nothing to import and nothing to break. */
    {
      id: 'unblock',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            className="tb-center"
            eyebrow="The one idea"
            eyebrowTone="indigo"
            title="Unblock your humans, your agents, and your systems — from each other."
          />
          <div className="tb-seam" dangerouslySetInnerHTML={{ __html: SEAM_SVG }} />
          <Caption>
            <em>Synos is the infrastructure layer in the middle.</em> The interaction, correction
            &amp; outcome data captured here exists nowhere else — and compounds into accuracy the
            model alone can never reach.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 3 · Our viewpoint ────────────────────────────────────────────────
     * `.belief-cols` is an old-world / new-world contrast, which is what SplitColumns is for. The
     * `.stack` line under each column is the vendor list; it rides as a mono Caption rather than
     * becoming a component, because it appears exactly twice in the corpus. */
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
              tone="amber"
              eyebrow="The old world · SaaS"
              title={
                <>
                  80% common features — shipped.
                  <br />
                  20% custom to you — never built.
                </>
              }
            >
              <SplitItem>
                You bought the platform and bent your operations to fit it. You used a fraction of
                the feature list. The 20% unique to how you run was never the vendor's job to build.
              </SplitItem>
              <SplitItem>
                <Caption mono>CRM SaaS · Marketing SaaS · Ops SaaS · …</Caption>
              </SplitItem>
            </SplitColumn>
            <SplitColumn
              tone="indigo"
              eyebrow="The new world · AI-built on your brain"
              title={
                <>
                  Custom software + custom agents.
                  <br />
                  Designed for <em>your</em> way of operating.
                </>
              }
            >
              <SplitItem>
                Your team describes the workflow in plain English; AI builds it — on top of a company
                brain that knows your business. The 20% you always needed, finally yours.
              </SplitItem>
              <SplitItem>
                <Caption mono>Claude Code · ChatGPT · Codex · …</Caption>
              </SplitItem>
            </SplitColumn>
          </SplitColumns>
          <Callout tone="violet" className="dk-gap-sm">
            <strong>The AI model isn't the moat.</strong> The layer that remembers how <em>your</em>{' '}
            company operates is. That's why Synos is <em>model- and tool-agnostic</em> — switch the
            AI for price or capability, keep the brain you've built.
            <ChipRow tight className="dk-gap-sm">
              <Chip size="sm">Anthropic</Chip>
              <Chip size="sm">OpenAI</Chip>
              <Chip size="sm">Gemini</Chip>
              <Chip size="sm">Self-hosted</Chip>
            </ChipRow>
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 4 · Where value gets created ─────────────────────────────────────
     * Diagram beside prose. `.tb-plate` frames the drawing; the right column is a Stack of
     * Callouts. */
    {
      id: 'the-edge',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Where Value Gets Created Now"
            eyebrowTone="indigo"
            title="New value is created at the edge of what models know."
            subtitle="Humans and agents, working together on one layer, create what no model holds — and everything they create teaches your AI. Humans move at AI speed; your AI learns your company."
          />
          <Columns ratio="nudge">
            <div className="tb-plate" dangerouslySetInnerHTML={{ __html: EDGE_SVG }} />
            <Stack gap="snug">
              <Callout tone="indigo" label="Humans get faster">
                Knowledge work runs at AI speed — on your own context, not generic answers.
              </Callout>
              <Callout tone="emerald" label="The edge is yours alone">
                What's created at the boundary — decisions, corrections, outcomes — exists in no model
                and at no competitor.
              </Callout>
              <Callout tone="violet" label="Creating value makes your AI better">
                Every piece of edge-work feeds the loop: your agents, skills and brain sharpen with
                the work itself.
              </Callout>
            </Stack>
          </Columns>
          <Caption className="dk-gap-sm">
            “You can offload a task, or even a job — <strong>you can never offload your learning.</strong>”
            As models commoditize expertise, the durable advantage moves from the model to the
            learning loop you own. — <strong>Satya Nadella, 2026</strong>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 5 · The gap ──────────────────────────────────────────────────────
     * BigTypeSlide, exactly — the source hand-rolls a centred card with inline styles, which is
     * this component with its slots spelled out longhand. */
    {
      id: 'the-gap',
      variant: 'bigType',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="The gap"
          line1="Models learned the entire internet."
          line2={<span className="sk-gradient-text">They never learned how you operate.</span>}
          sub={
            <>
              Frontier models are trained on the world's <strong>common</strong> knowledge. But your
              value lives in what's <em>not</em> on the internet — how your company actually
              operates: your customers, your data, your policies, your operational judgment, your
              tribal knowledge. That's exactly where every agent stalls — and no amount of
              fine-tuning a public model puts it there.
            </>
          }
          punch="The agents have hands now. They have no company to stand on."
        />
      ),
    },

    /* ── 6 · The shift ────────────────────────────────────────────────────
     * Identical to the ops deck's, word for word — the two decks share this slide exactly. */
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
                  An ops lead pastes a raw warehouse key, asks for last week's anomalies as a report.{' '}
                  <strong>Runs on his laptop.</strong>
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
              <div className="tb-row" key={badge}>
                <Chip mono tone="indigo">{badge}</Chip>
                <p>{line}</p>
              </div>
            ))}
          </Stack>
          <Callout tone="red" className="dk-gap">
            The individual is unblocked.{' '}
            <strong>
              The team is blocked from sharing and compounding the AI transformation — and walled off
              from real company value.
            </strong>
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 7 · The six walls ────────────────────────────────────────────────
     * WallGrid / WallCard. Wall 3 differs from the ops deck by one line — "Nowhere governed to
     * deploy" against "Nowhere safe to put it" — which is the register difference between the two
     * audiences and is carried, not normalised. */
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
              title="Nowhere governed to deploy"
              body="Apps and their data ship to personal accounts. No sandbox, no kill-switch."
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

    /* ── 8 · What Synos is ────────────────────────────────────────────────
     * `.three-box` → UseCaseGrid: `.tb-kind` is the kicker, `h3` the title, `p` the body. The
     * per-card icons are dropped: unlike the template grid, these three cards are already
     * distinguished by their kickers and their tones, and the icons repeat the shield / brain /
     * wrench vocabulary the architecture slide uses at a size where it reads. */
    {
      id: 'what-synos-is',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="What Synos Is"
            eyebrowTone="indigo"
            title="A company brain, safe hands, and a place to build."
            subtitle="One operating layer underneath every AI tool your teams already use."
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
              title="Acts in your systems, governed"
              body="AI can read and act across your tools through one gated, audited door — with permissions and a kill-switch. No raw keys on laptops."
            />
            <UseCaseCard
              tone="violet"
              kicker="A place to build"
              title="Apps & always-on agents your team owns"
              body="Turn a workflow into a shared app or an always-on agent that runs on its own — built by your team, kept inside your business."
            />
          </UseCaseGrid>
          <Caption className="dk-gap">
            <em>Let your people work in their own tools. We handle the hard infrastructure underneath.</em>
          </Caption>
        </SlideFrame>
      ),
    },
  ]

  const byId = new Map(slides.map((s) => [s.id, s]))
  const stray = slides.map((s) => s.id).filter((id) => !ORDER.includes(id))
  if (stray.length) throw new Error(`slides missing from ORDER: ${stray.join(', ')}`)
  /* While `wip` is set, ORDER may name slides that do not exist yet — that is the whole point of a
     running order written before the slides. Once `wip` goes, the missing check below turns on. */
  const missing = ORDER.filter((id) => !byId.has(id))
  if (!wip && missing.length)
    throw new Error(`ORDER names slides that do not exist: ${missing.join(', ')}`)
  return ORDER.map((id) => byId.get(id)).filter(Boolean)
}
