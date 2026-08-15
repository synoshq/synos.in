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

/* The pillar icons, at the source's own geometry and paths. Carried rather than swapped for the VC
   deck's set (`archIcons` in slides-main.jsx): four of the six are the same drawing, but the wrench
   and the chart are this deck's, and a half-carried icon set is how two decks quietly stop looking
   like the same product. */
const ico = (d, size = 20) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    {d}
  </svg>
)
const IcoBrain = ico(
  <>
    <path d="M9 3a3 3 0 00-3 3v1a3 3 0 00-3 3v2a3 3 0 003 3v1a3 3 0 003 3" />
    <path d="M15 3a3 3 0 013 3v1a3 3 0 013 3v2a3 3 0 01-3 3v1a3 3 0 01-3 3" />
  </>,
)
const IcoDoc = ico(
  <>
    <path d="M4 19V5a2 2 0 012-2h11l3 3v13a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
    <path d="M9 7h6M9 11h6M9 15h4" />
  </>,
)
const IcoShield = ico(
  <>
    <path d="M12 2L4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4z" />
    <path d="M9 12l2 2 4-4" />
  </>,
)
const IcoWrench = ico(
  <>
    <path d="M14.7 6.3a1 1 0 010 1.4l-7 7-3.4-3.4 7-7a1 1 0 011.4 0z" />
    <path d="M16 4l4 4M3 21l3-1 1-3" />
  </>,
)
const IcoLoop = ico(
  <>
    <path d="M21 12a9 9 0 11-3-6.7L21 8" />
    <path d="M21 3v5h-5" />
  </>,
)
const IcoChart = ico(
  <>
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 4 4 5-5" />
  </>,
)

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

    /* ── 9 · The AI-native operating layer ────────────────────────────────
     * The architecture stack, and the same three-band shape the VC deck draws. `Band` puts the
     * outer two inside boxes deliberately: see `.dk-band` in _shared.css for what happened when
     * they were de-boxed and the three layers ended up three different widths.
     *
     * The six pillars are `PillarCard` / `PillarGrid` — the cleanest map in either buyer deck. The
     * Context Brain is the `brain` variant, which is what the source's `.featured` class means. */
    {
      id: 'operating-layer',
      variant: 'arch',
      node: (
        <SlideFrame density="compact" stage={false} variant="arch">
          <SlideHeader
            eyebrow="The AI-Native Operating Layer"
            eyebrowTone="indigo"
            title="More than a brain — a full operating layer."
            subtitle="Six capabilities working as one. The Company Brain is just one of them — and the whole thing compounds with every use."
          />
          <Band tone="models" label="Your teams work in their own tools">
            <TileRow className="dk-tile-row-tight">
              {[
                ['ChatGPT', 'marketing · sales'],
                ['Claude Code', 'ops · analysts'],
                ['Codex', 'analysts · eng'],
                ['Slack', 'everyone'],
                ['WhatsApp', 'field · ops'],
                ['Apps', 'shared'],
              ].map(([nm, kd]) => (
                <Tile key={nm} size="sm" mono name={nm} kind={kd} />
              ))}
            </TileRow>
          </Band>
          <Callout
            tone="violet"
            fill="neutral"
            accent="none"
            label="The Operating Layer"
            className="dk-gap-sm"
          >
            <Caption>Self-hosted · governed · model- &amp; tool-agnostic</Caption>
            <div className="dk-gap-sm">
              <PillarGrid>
                <PillarCard
                  brain
                  wide={false}
                  icon={IcoBrain}
                  name="Context Brain"
                  desc="Knowledge that compounds across every source — batch + streaming, continuously curated."
                />
                <PillarCard
                  icon={IcoDoc}
                  tone="amber"
                  name="Skills Marketplace"
                  desc="Shared, reusable workflows. Install once, run anywhere, fork across teams."
                />
                <PillarCard
                  icon={IcoShield}
                  tone="emerald"
                  name="Safe Data Access"
                  desc="One governed door to your systems. Gated by role, audited on every call."
                />
                <PillarCard
                  icon={IcoWrench}
                  tone="indigo"
                  name="Safe App Deploy"
                  desc="Sandboxed apps + their data your team can share — scanned, never on personal accounts."
                />
                <PillarCard
                  icon={IcoLoop}
                  tone="violet"
                  name="Self-Learning Loop"
                  desc="Every correction reviewed + promoted. The brain and the agents improve themselves."
                />
                <PillarCard
                  icon={IcoChart}
                  tone="indigo"
                  name="Observability"
                  desc="Who ran what, what's working, what it costs — and an instant kill-switch."
                />
              </PillarGrid>
            </div>
          </Callout>
          <Band tone="sor" label="Connected to your existing systems — not replaced">
            <ChipRow tight>
              {[
                'Warehouse · BigQuery',
                'CRM · Marketing SaaS',
                'Sheets · Docs · Notion',
                'Drive · S3',
                'Slack · Email · WhatsApp',
                'Ads · GA · Tickets',
              ].map((c) => (
                <Chip key={c} size="sm" mono>{c}</Chip>
              ))}
            </ChipRow>
          </Band>
        </SlideFrame>
      ),
    },

    /* ── 10 · Six capabilities ────────────────────────────────────────────
     * `.cap-grid` → UseCaseGrid at three columns; each `.cap` is an icon, a heading and a line.
     * The `.selflearn-strip` beneath it is a two-up of worked examples — the agent asking, the
     * human answering — which is a Columns of two Callouts, tinted to match who is speaking. */
    {
      id: 'six-capabilities',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="The Operating Layer"
            eyebrowTone="indigo"
            title="Six capabilities most teams ship one of — as one governed platform."
            subtitle="Engineering sets the rails once; the whole org self-serves on top — non-coders included. Build agents, build apps, all on the real brain."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="violet"
              title="Self-learning company brain"
              body="Every source → one graph that corrects itself from every run. Not static RAG."
            />
            <UseCaseCard
              tone="amber"
              title="Skills marketplace"
              body="Company know-how as reusable, versioned skills. Build once, share across teams."
            />
            <UseCaseCard
              tone="indigo"
              title="Agent builder"
              body="Describe an agent in plain English — assembled from skills, live in minutes."
            />
            <UseCaseCard
              tone="indigo"
              title="AI app builder"
              body="SMEs ship internal apps + live dashboards on the real brain — sandboxed, governed."
            />
            <UseCaseCard
              tone="emerald"
              title="Bring your own harness + tools"
              body="Point Claude Code, Codex or Cursor at the brain — they operate on top. One MCP door, plus warehouse, object store, SaaS & internal APIs."
            />
            <UseCaseCard
              tone="emerald"
              title="Self-hosted & governed"
              body="On-prem-capable, RBAC, audited, egress-controlled. Your data and your moat stay yours."
            />
          </UseCaseGrid>
          <Caption className="dk-gap-sm">
            <strong>Self-learning in practice</strong> — the agent surfaces, a human approves, the
            brain compounds.
          </Caption>
          <Columns className="dk-gap-sm">
            <Callout tone="indigo" label="Agent → human">
              Found a new entity <strong>“Gift Recipient”</strong> across 3 tables — add it to the
              ontology?
              <ChipRow tight className="dk-gap-sm">
                <Chip size="sm" tone="emerald">✓ Approve</Chip>
                <Chip size="sm" tone="red">Reject</Chip>
              </ChipRow>
            </Callout>
            <Callout tone="violet" label="Human → brain · doctrine">
              Correction: treat tracked CVR as directional.
              <Caption>
                → becomes <strong>a rule every future run inherits.</strong>
              </Caption>
            </Callout>
          </Columns>
        </SlideFrame>
      ),
    },

    /* ── 11 · The living context brain ────────────────────────────────────
     * The scattered-context diagram: six silos, one resolved graph. Carried. The `.metric-strip`
     * beneath it is four claims about the approach, which is a ChipRow — they are labels on the
     * diagram rather than prose, and each has a bolded lead. */
    {
      id: 'living-brain',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="The living context brain"
            eyebrowTone="violet"
            title="A living context brain — it knows how & where, it doesn't hoard your data."
            subtitle="Agentic profiling — with a human in the loop — builds the ontology, access maps and curation rules. Agents run on top, drawing the right context per task; agents and people feed learnings and tribal knowledge back. No bulk ETL, no data migration."
          />
          <div className="tb-diagram" dangerouslySetInnerHTML={{ __html: BRAIN_SVG }} />
          <ChipRow tight className="dk-gap-sm">
            <Chip size="sm"><strong>Agentic profiling</strong> — human-in-the-loop, no bulk ETL</Chip>
            <Chip size="sm"><strong>Profiled, not copied</strong> — stats + column roles; the rows stay in your systems</Chip>
            <Chip size="sm"><strong>Periodic re-curation</strong> — refreshes itself on a schedule</Chip>
            <Chip size="sm"><strong>Self-learning &amp; living</strong> — every run and correction feeds back</Chip>
          </ChipRow>
        </SlideFrame>
      ),
    },

    /* ── 12 · Retrieval, the router ───────────────────────────────────────
     * Six modes x three columns — mode, what it does, when to use it. This is `Matrix` in its
     * `rules` variant: a comparison table, not a capability grid, so the cells are rows of prose
     * with no fill and the label column carries the mode name plus its mono tag.
     *
     * The table IS the slide for a technical reader, which is why every one of the eighteen cells
     * is carried rather than summarised. */
    {
      id: 'retrieval-router',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Retrieval"
            eyebrowTone="indigo"
            title="Accuracy starts with retrieving the right slice — every mode, one router."
            subtitle="The >1M-token hallucination is a retrieval problem, not a model problem. Synos picks the right retrieval mode per query — automatically."
          />
          <Matrix
            variant="rules"
            labelWidth="210px"
            columns={[{ label: 'What it does' }, { label: 'When it fires', width: '1.05fr' }]}
            rows={[
              {
                label: 'Auto router',
                sub: 'mode=auto',
                cells: [
                  { text: 'An LLM selector picks the best mode (and source) per query — one goes to SQL, another to vector, another to graph.' },
                  { text: 'Mixed query types & heterogeneous sources — the default.' },
                ],
              },
              {
                label: 'Keyword / lexical',
                sub: 'BM25',
                cells: [
                  { text: 'Sparse retrieval on exact term overlap. Fast, transparent, no GPU.' },
                  { text: 'Order IDs, account numbers, SKUs, error & policy codes, exact literals.' },
                ],
              },
              {
                label: 'Semantic / vector',
                sub: 'dense embeddings',
                cells: [
                  { text: 'Encodes query + docs as embeddings, ranks by meaning — handles paraphrase, synonyms, cross-lingual.' },
                  { text: 'Natural-language questions, paraphrase & vocabulary variety.' },
                ],
              },
              {
                label: 'Hybrid + rerank',
                sub: 'BM25 + vector + RRF',
                cells: [
                  { text: 'Runs lexical + vector in parallel, fuses, then a cross-encoder reranks for precision.' },
                  { text: 'Production default — NL mixed with literal IDs.' },
                ],
              },
              {
                label: 'Agentic retrieval',
                sub: 'plan → retrieve → reason',
                cells: [
                  { text: 'LLM decomposes a complex query into sub-queries, runs each, merges + reranks. A large relevance lift on hard queries.' },
                  { text: 'Multi-part questions, long support threads, follow-ups.' },
                ],
              },
              {
                label: 'Graph / GraphRAG',
                sub: 'entity traversal',
                cells: [
                  { text: 'Traverses linked entities + relationships. Deferred to query-time — no giant persisted graph to maintain.' },
                  { text: 'Multi-hop reasoning across connected entities.' },
                ],
              },
            ]}
          />
          <Caption className="dk-gap-sm">
            Same model, same cost per token — dramatically fewer tokens and fewer wrong answers,
            because the brain decides what the model sees.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 13 · No migration, no new habits ─────────────────────────────────
     * Five tools, an arrow, and the connector band. `Tile` is exactly the source's `.tool-chip` —
     * this slide is one of the 77 uses that argued the component into existence. The per-tool
     * icons are dropped: five tiles distinguished by name and a descriptor line do not also need a
     * glyph, and the source's are generic shapes rather than the vendors' marks. */
    {
      id: 'no-migration',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="No Migration, No New Habits"
            eyebrowTone="indigo"
            title="Your people keep working in the tools they already love."
            subtitle="Synos sits underneath — making every one of them safe, shared, and governed."
          />
          <TileRow>
            {[
              ['ChatGPT', 'marketing · sales'],
              ['Claude Code', 'ops · analysts'],
              ['Codex', 'analysts · eng'],
              ['Slack', 'everyone'],
              ['WhatsApp', 'field · ops'],
            ].map(([nm, kd]) => (
              <Tile key={nm} mono name={nm} kind={kd} />
            ))}
          </TileRow>
          <Caption className="dk-gap">
            ▼ &nbsp; all flow through the Synos operating layer &nbsp; ▼
          </Caption>
          <div className="dk-band dk-band--sor dk-gap">
            <Eyebrow tone="muted">
              Connected to your existing stack out of the box — not replaced
            </Eyebrow>
            <ChipRow tight>
              {[
                'Warehouse · BigQuery',
                'CRM · Salesforce · HubSpot',
                'Sheets · Docs · Notion',
                'Drive · S3',
                'Slack · Email · WhatsApp',
                'Ads · GA',
                'Tickets · Internal APIs',
              ].map((c) => (
                <Chip key={c} size="sm" mono>{c}</Chip>
              ))}
            </ChipRow>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 14 · Five hard parts ─────────────────────────────────────────────
     * The map for the next seven slides. `.hp` is num + name + body + a muted "what most teams do"
     * line — which is `WallCard`'s exact four-slot shape (`num` / `title` / `body` / `tag`), and the
     * reason that component takes every slot optionally. Five in a six-cell grid, so the last cell
     * is empty; that reads as deliberate here because the band underneath closes the row. */
    {
      id: 'hard-parts',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Where The Work Actually Is"
            eyebrowTone="indigo"
            title="Five hard parts — the ones a demo never shows."
            subtitle="Connecting data and calling a model is the easy half. These five are what stand between a clever agent and one you'd let near a real customer. The next slides take them one at a time."
          />
          <WallGrid>
            <WallCard
              num="1"
              title="Keeping context current"
              body="Schemas drift, definitions change, docs go stale. Agents keep answering — just wrongly."
              tag="Most teams: a one-time setup, then decay."
            />
            <WallCard
              num="2"
              title="Who authors the rules"
              body="The rules that make an agent correct live with your ops leads and analysts, not your platform team."
              tag="Most teams: engineers relay it, badly."
            />
            <WallCard
              num="3"
              title="Agents that actually act"
              body="Reading is safe. Writing to a CRM, a ledger, a campaign is where the blast radius starts."
              tag="Most teams: keys in chat, no audit."
            />
            <WallCard
              num="4"
              title="Earning autonomy"
              body="Nobody flips an agent to unsupervised on day one. What is the gate, and what is the rollback?"
              tag="Most teams: no gate — a judgement call."
            />
            <WallCard
              num="5"
              title="Learning from what ran"
              body="Every run and correction is signal. Stored, it's a log. Fed back, it's compounding accuracy."
              tag="Most teams: traces stored, never used."
            />
          </WallGrid>
          <Callout tone="indigo" className="dk-gap-sm">
            <strong>You may already have one or two of these.</strong> Almost nobody has all five
            wired together — and it's the wiring, not any single piece, that makes agents safe enough
            to leave running.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 15 · Hard part 1 · staying current ───────────────────────────────
     * Two columns: a three-step cycle on the left, the admin review queue on the right. The queue
     * is six severity-tagged rows — a Matrix in `rules` form would flatten the severity, which is
     * the one thing an admin actually scans for, so the rows are Callouts carrying their own tone.
     * That is the tone system doing the job the source's `.pf-row.amber/red/violet` classes did. */
    {
      id: 'hp-staying-current',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Hard Part 1 · Staying Current"
            eyebrowTone="indigo"
            title="The brain re-profiles itself — and tells your admins what needs a human."
            subtitle="A company brain built once starts going stale immediately. Agents don't fail loudly when it does; they keep answering with the old meaning. So profiling runs on a schedule, and anything it isn't sure about becomes a review item — not a silent guess."
          />
          <Columns>
            <Stack gap="snug">
              <Eyebrow tone="muted">On a schedule</Eyebrow>
              <Stack gap="tight">
                <StepCard
                  num="1"
                  title="Re-profile"
                  body="Agents re-read schemas, samples, docs and APIs. New tables, dropped columns, renamed fields, changed distributions."
                />
                <StepCard
                  num="2"
                  title="Compare & score"
                  body="Diff against what the brain believed. Each mapping carries a confidence score and a freshness stamp."
                />
                <StepCard
                  num="3"
                  title="Auto-fix or escalate"
                  body="High-confidence changes apply themselves. Anything ambiguous stops and asks a human."
                />
              </Stack>
              <Caption>No bulk ETL. No re-migration. The maps refresh; your data never moves.</Caption>
            </Stack>
            <Stack gap="tight">
              <Eyebrow tone="muted">Admin review queue — what needs your attention</Eyebrow>
              <Callout tone="amber" label="STALE">
                <strong>7 tables</strong> not re-profiled in 30 days — 2 feed a live agent
              </Callout>
              <Callout tone="red" label="DRIFT">
                <strong>orders.status</strong> gained 3 new enum values — mapping no longer covers them
              </Callout>
              <Callout tone="red" label="CONFLICT">
                Two tables both claim <strong>“revenue”</strong> — which is authoritative?
              </Callout>
              <Callout tone="amber" label="LOW CONF">
                <strong>4 metric bindings</strong> below threshold — agent is guessing
              </Callout>
              <Callout tone="violet" label="PROPOSED">
                Agent found a new entity <strong>“Gift Recipient”</strong> across 3 tables — add it?
              </Callout>
              <Callout tone="indigo" label="RUNS">
                <strong>12 failures</strong> · 3 permission denials · cost up 18% week-on-week
              </Callout>
              <Caption>
                One place an admin can answer: <em>is the brain still right, and is anything running
                badly?</em>
              </Caption>
            </Stack>
          </Columns>
        </SlideFrame>
      ),
    },

    /* ── 16 · Hard part 2 · who authors ───────────────────────────────────
     * The densest slide in the deck: a today-chain, a two-lane split of who owns what, a four-step
     * how, and a closing band. The chain is Chips separated by `.dk-arrow`, the same sequence
     * vocabulary the VC deck's wedge slide uses. The two lanes are SplitColumns with real lists,
     * which is the one place in either buyer deck a `<ul>` survives the port — the items are a
     * checklist of responsibilities and flattening them into prose loses the count. */
    {
      id: 'hp-who-authors',
      node: (
        <SlideFrame stage={false} density="compact" className="tb-overfull">
          <SlideHeader
            eyebrow="Hard Part 2 · Who Authors"
            eyebrowTone="violet"
            title="Engineers set the rails. The people who know the work build the agents."
            subtitle="The knowledge that makes an agent correct lives with your SMEs — ops leads, analysts, marketers, support veterans. Today it can only reach production through an engineer. That queue is the bottleneck."
          />
          <Callout tone="red" label="Today">
            <ChipRow tight>
              <Chip size="sm">SME explains the rule</Chip>
              <span className="dk-arrow">→</span>
              <Chip size="sm">ticket / doc</Chip>
              <span className="dk-arrow">→</span>
              <Chip size="sm">engineer codes it</Chip>
              <span className="dk-arrow">→</span>
              <Chip size="sm">v1 misses the exception</Chip>
              <span className="dk-arrow">→</span>
              <Chip size="sm" tone="red">back in the queue</Chip>
            </ChipRow>
            <Caption>weeks per change · the real rules stay in heads</Caption>
          </Callout>
          <SplitColumns className="dk-gap-sm">
            <SplitColumn tone="indigo" eyebrow="Engineering owns · set once" title="The rails">
              <SplitItem>Connectors and data scopes — what an agent may read</SplitItem>
              <SplitItem>
                Governed tools and write-actions — what it may do, and what needs approval
              </SplitItem>
              <SplitItem>
                RBAC, full audit trail, sandboxed execution, rate and cost limits
              </SplitItem>
              <SplitItem>Eval harness and promotion gates</SplitItem>
              <SplitItem>
                <Caption>Built once and reviewed — not re-implemented for every new request.</Caption>
              </SplitItem>
            </SplitColumn>
            <SplitColumn tone="violet" eyebrow="SMEs own · every day" title="The knowledge">
              <SplitItem>
                Skills written in plain English — how <em>we</em> actually do this
              </SplitItem>
              <SplitItem>
                Rules, exceptions and judgment calls, captured where they come up
              </SplitItem>
              <SplitItem>
                Corrections on agent output — each becomes a rule every agent follows, and material a
                future training set is built from
              </SplitItem>
              <SplitItem>Test cases: “here are ten real ones — get them right”</SplitItem>
              <SplitItem>
                <Caption>
                  No code, no ticket, no waiting. Inside the rails there is nothing they can break.
                </Caption>
              </SplitItem>
            </SplitColumn>
          </SplitColumns>
          <StepGrid columns={4} className="dk-gap-sm">
            <StepCard
              num="1"
              title="Rails published"
              body="Engineering exposes scoped data and governed tools once. Everything authored above them is safe by construction."
            />
            <StepCard
              num="2"
              title="SME authors in plain English"
              body="In chat, Slack or Claude Code: “T3 billing escalations never go by SMS — email finance first.” Stored as a versioned skill."
            />
            <StepCard
              num="3"
              title="Corrections in the flow"
              body="Edit the agent's draft; the diff is captured and reviewed, and the promoted rule reaches every agent. Tribal knowledge lands the moment it surfaces."
            />
            <StepCard
              num="4"
              title="Tested, then promoted"
              body="Replayed against past cases and scored, then moved assist → reviewed → autonomous. Versioned, diffable, revertible."
            />
          </StepGrid>
          <Callout tone="emerald" className="dk-gap-sm">
            <strong>The handoff disappears.</strong> The person who holds the knowledge is the one who
            encodes it — and engineering moves from transcribing requirements to owning the rails and
            reviewing what ships.
          </Callout>
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
