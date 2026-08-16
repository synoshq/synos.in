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
  TRACE_HTML,
} from './tech-buyer-svgs.js'

/* COMPLETE at 42 of 42. The `wip` export is gone, so `build.mjs` now ASSERTS the section count on
   every build and the ORDER check below fails on a slide named but not written — a deck that
   silently loses a section fails rather than ships short. */

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
            </>
          }
          /* The positioning line sits here rather than in the headline: the headline names the
             category, this names what the buyer gets out of it. `lead` is the slot the kit already
             has for exactly that, at 20px semibold under the 72px serif. */
          lead={<>Build your own AI, for the knowledge work that runs your company.</>}
          lede={
            <>
              Synos is the platform that makes a company AI-native. Engineering installs it once.
              After that the people who hold the knowledge, your ops leads, analysts, marketers and
              support veterans, build and run the agents that do the critical work themselves, on a
              Company Brain that learns how your business actually operates. Self-hosted and
              governed. Yours to keep.
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
     * Company Brain is the `brain` variant, which is what the source's `.featured` class means. */
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
                  name="Company Brain"
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
          {/* The middle of this diagram used to be a caption reading "all flow through the Synos
              operating layer" with an arrow either side, and nothing drawn between the tools and
              the systems. Anoop read it as a missing box, correctly: the slide asserted a layer and
              then did not show one, so the two rows appeared to connect to each other. The layer is
              now an actual band, and it names what it does rather than just naming itself. */}
          <div className="tb-arrow">▼</div>
          <div className="dk-band dk-band--layer">
            <Eyebrow tone="indigo">The Synos operating layer</Eyebrow>
            <ChipRow tight>
              {[
                'Company Brain',
                'Governed access · role + audit',
                'Skills your SMEs write',
                'Agents & apps, sandboxed',
                'Every run traced',
              ].map((c) => (
                <Chip key={c} size="sm" tone="indigo">{c}</Chip>
              ))}
            </ChipRow>
          </div>
          <div className="tb-arrow">▼</div>
          <div className="dk-band dk-band--sor">
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

    /* ── 17 · Hard part 3 · agents that act ───────────────────────────────
     * A without / with pair. SplitColumns carries the contrast; the right column's body is the
     * governed-gate diagram rather than prose, which is why the two halves are a `Columns` of a
     * SplitColumn and a plate rather than a plain SplitColumns — the drawing needs its own frame. */
    {
      id: 'hp-agents-act',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Hard Part 3 · Agents That Act"
            eyebrowTone="indigo"
            title="Every action gated. Every action audited."
            subtitle="Reading data is the safe half. The moment an agent writes to a CRM, a ledger or a campaign, you need one door it must pass through — and a row in a log for every attempt."
          />
          <SplitColumns>
            <SplitColumn
              tone="red"
              eyebrow="Without the layer"
              title="Raw keys in chat history. No permissions. No audit. No boundary."
            >
              <SplitItem>
                The moment someone pastes a CRM key into a chat window, the blast radius is unbounded.
              </SplitItem>
              <SplitItem>Keys on personal laptops.</SplitItem>
              <SplitItem>No “this role can't do that” gate.</SplitItem>
              <SplitItem>No log of who did what, when.</SplitItem>
            </SplitColumn>
            <SplitColumn
              tone="emerald"
              eyebrow="With Synos — one governed door"
              title="UI, AI tool, or always-on agent — every call goes through the same gate."
            >
              {/* NOT a SplitItem. SplitItem is a bullet row — a marker glyph in a flex row beside
                  its text — so wrapping a drawing in one renders a stray bullet next to the diagram
                  and squeezes it into the remaining width. That is what made this diagram read as
                  far too small; it was being laid out as if it were a sentence. */}
              <div className="tb-diagram tb-diagram--tall" dangerouslySetInnerHTML={{ __html: GOV_SVG }} />
            </SplitColumn>
          </SplitColumns>
        </SlideFrame>
      ),
    },

    /* ── 18 · Hard part 4 · earning autonomy ──────────────────────────────
     * Three stages with connector arrows. `PhaseCard` is the kit's three-across arc and carries
     * badge / title / body exactly; the source's arrows between them are decoration the ops-buyer
     * port already decided to drop rather than fake — the `position` prop's colour progression
     * (near -> bridge -> far) is what carries the direction now. */
    {
      id: 'hp-earning-autonomy',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Hard Part 4 · Earning Autonomy"
            eyebrowTone="indigo"
            title="From a skill you run yourself to an agent that runs the system."
            subtitle="Start in your own AI tool; graduate into the platform as trust builds — review gates and human oversight at every step."
          />
          <PhaseRow>
            <PhaseCard
              badge="STAGE 01"
              title="Run it yourself"
              body="Pull a skill from the marketplace and run it in your own Claude Code or ChatGPT. You drive every run; a person approves every action."
            />
            <PhaseCard
              position="bridge"
              badge="STAGE 02"
              title="Scheduled + reviewed"
              body="Promote it to run on a schedule in the system. It proposes actions; a person clears them at a review gate. Most of the work, a fraction of the time."
            />
            <PhaseCard
              position="far"
              badge="STAGE 03"
              title="Autonomous + overseen"
              body="It runs continuously in the system, posting to Slack/WhatsApp and stopping at a review gate only on exceptions. Human oversight + kill-switch stay on."
            />
          </PhaseRow>
          <Callout tone="indigo" className="dk-gap">
            <strong>Every stage is governed.</strong> Permissions, full audit trail, human review and
            an instant kill-switch apply at every level — so <em>autonomous never means
            unsupervised</em>.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 19 · Hard part 4 · the gate ──────────────────────────────────────
     * The autonomy ladder: four rungs, each taller than the last, which is the source drawing a
     * staircase with inline `min-height`. That rising geometry IS the point — it is the one place
     * in the deck where the layout carries meaning rather than decorating it — so it is kept, as
     * four `Tile`s in a row with explicit heights rather than flattened into equal cards.
     *
     * Each rung is a level, a name, what it does, and who does the work plus the gate that promotes
     * it. Four slots, so `StepCard` (num / title / body / quote) maps cleanly. */
    {
      id: 'hp-the-gate',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Hard Part 4 · The Gate"
            eyebrowTone="indigo"
            title="Every function climbs an autonomy ladder — gated by evals, not by faith."
            subtitle="Graduated trust, per function. One function can be fully autonomous while another is still only assisted. Humans never leave — they move to the edge. Governed and reversible at every rung."
          />
          <div className="tb-ladder">
            <StepCard
              num="LEVEL 1"
              title="Assisted"
              body="Agent drafts; the human decides and sends."
              quote="Human does the work · Gate — just start"
            />
            <StepCard
              num="LEVEL 2"
              title="Reviewed"
              body="Agent acts; the human approves every action."
              quote="Human approves each · Gate — eval accuracy clears the bar"
            />
            <StepCard
              num="LEVEL 3"
              title="Supervised-autonomous"
              body="Agent runs; the human samples and handles exceptions."
              quote="Human samples + exceptions · Gate — sustained eval pass, low breach"
            />
            <StepCard
              num="LEVEL 4 · THE SUMMIT"
              title="Autonomous"
              body="Agent runs the function; humans set policy, watch dashboards, hold the kill-switch."
              quote="Human sets policy · edge only · Gate — evals hold at scale"
            />
          </div>
          <Caption className="dk-gap-sm">
            <em>The loop is the ladder.</em> Better context + stronger evals + self-learning → more
            functions earn autonomy. You never hand off what you can't measure.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 20 · Hard part 5 · learning from runs ────────────────────────────
     * The learning-pipeline diagram, carried. `.tb-lp` scopes its own `lp-*` vocabulary so it never
     * collides with the `.node` / `.edge` set the other eight diagrams share. */
    {
      id: 'hp-learning',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Hard Part 5 · Learning From Runs"
            eyebrowTone="violet"
            title="What compounds is the loop — the record of how your company works, not the model."
            subtitle="Humans correct. Agents act. Systems return the measured outcome. Every turn builds data no public model can ever train on — and it pays off whichever model wins."
          />
          <div className="tb-lp tb-diagram" dangerouslySetInnerHTML={{ __html: LOOP_SVG }} />
          <Caption className="dk-gap-sm">
            Live today at a martech design partner: every operator correction feeds one learning layer
            their whole platform gets smarter from.{' '}
            <strong>
              This is data the model can never train on — and it accrues to you, on your
              infrastructure.
            </strong>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 21 · Hard part 5 · where it leads ────────────────────────────────
     * A five-stage pipeline, then three payoffs, then the honesty band. The stage status flags
     * (LIVE TODAY / IN BUILD / ACCUMULATING NOW / ROADMAP) are the most-scrutinised text on the
     * slide for a technical reader — they are what separates shipped from promised — so each rides
     * as a toned Chip inside its card rather than as a coloured line that could be skimmed past. */
    {
      id: 'hp-where-it-leads',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Hard Part 5 · Where It Leads"
            eyebrowTone="violet"
            title="Every run is traced. Every trace is future training data."
            subtitle="The same environment is your training ground: every run traced, every review and correction captured, private evals against your own outcomes — the raw material to fine-tune open-weight models on how your company operates. Models that are yours, on your infrastructure."
          />
          <div className="tb-pipe">
            <StepCard
              num="01 · Trace"
              title="Every run captured"
              body={
                <>
                  Inputs, tool calls, decisions, outcome — full lineage on every agent run.{' '}
                  <Chip size="sm" tone="emerald">● LIVE TODAY</Chip>
                </>
              }
            />
            <StepCard
              num="02 · Capture"
              title="Corrections captured"
              body={
                <>
                  Every human correction and approval is captured and reviewed in the flow of work —
                  the material labels are built from.{' '}
                  <Chip size="sm" tone="emerald">● LIVE TODAY</Chip>
                </>
              }
            />
            <StepCard
              num="03 · Eval"
              title="Private evals"
              body={
                <>
                  Agents scored against <em>your</em> outcomes, not public benchmarks — ground truth
                  only you own. <Chip size="sm" tone="amber">◐ IN BUILD</Chip>
                </>
              }
            />
            <StepCard
              num="04 · Dataset"
              title="Outcome-verified data"
              body={
                <>
                  Curated for you: traces that worked, corrections that fixed, evals that prove it.{' '}
                  <Chip size="sm" tone="emerald">● ACCUMULATING NOW</Chip>
                </>
              }
            />
            <StepCard
              num="05 · Fine-tune & distill"
              title="Your own models"
              body={
                <>
                  Custom and distilled small models for your workflows — trained on the loop, run on
                  your infra. <Chip size="sm" tone="violet">◆ ROADMAP</Chip>
                </>
              }
            />
          </div>
          <UseCaseGrid className="dk-gap-sm">
            <UseCaseCard
              tone="emerald"
              kicker="Cost"
              title="Small models carry the routine"
              body="Distilled models run the ~80% of routine work at a fraction of frontier-token cost — the open-source future, powered by your data."
            />
            <UseCaseCard
              tone="indigo"
              kicker="Sovereignty"
              title="Your data, your models, your infra"
              body="Nothing trains a public model. Your models live in your cloud — swap providers freely without losing what you've learned."
            />
            <UseCaseCard
              tone="violet"
              kicker="Moat"
              title="A dataset nobody can buy"
              body="Minted from your own operations and corrections — the one asset a competitor or a lab can't replicate."
            />
          </UseCaseGrid>
          <Callout tone="amber" className="dk-gap-sm">
            <strong>Where we honestly are:</strong> the data layer — tracing, corrections,
            agent-native storage — is live and accumulating in every deployment. The eval and
            training layers are still being built — deliberately data-first, because{' '}
            <strong>capture is the scarce part</strong>; training stacks on top, with no rebuild.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 22 · Neutral by design ───────────────────────────────────────────
     * Three swappable rails, the layer that never moves, four swap tests, and the band. The rails
     * are the slide's spine — the ops-buyer port lost one of them entirely when a `Stack` shrank
     * below its content and painted the row behind the next block. Stacks no longer shrink; the
     * comment stays because the failure was invisible in the DOM. */
    {
      id: 'no-lock-in',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Neutral by Design · No Lock-In"
            eyebrowTone="indigo"
            title="Swap any vendor. Keep everything you've learned."
            subtitle="Models, harnesses and clouds will each change several times over the life of this system. Synos is the neutral, self-hosted layer underneath them — so a vendor decision never becomes an identity decision."
          />
          <Stack gap="tight">
            {[
              ['Model providers', ['Anthropic', 'OpenAI', 'Google', 'Bedrock / Vertex', 'open-weight, self-hosted'], 'swap anytime'],
              ['Agent harnesses', ['Claude Code', 'Codex', 'Cursor', 'your in-house agents', 'open-source frameworks'], 'bring your own'],
              ['Infrastructure', ['your VPC', 'any cloud', 'on-prem', 'air-gapped'], 'your deployment'],
            ].map(([rail, items, swap]) => (
              <div className="tb-row" key={rail}>
                <Eyebrow tone="muted">{rail}</Eyebrow>
                <ChipRow tight>
                  {items.map((i) => (
                    <Chip key={i} size="sm">{i}</Chip>
                  ))}
                </ChipRow>
                <Caption mono>{swap}</Caption>
              </div>
            ))}
          </Stack>
          <Callout tone="violet" className="dk-gap-sm" label="What never moves — the layer you own">
            Company Brain · skills and SOPs · rules and exceptions · corrections · decision traces ·
            evals · governed tools and policy. It runs on <strong>your</strong> infrastructure and
            stays portable across every choice above.
            <ChipRow tight className="dk-gap-sm">
              {['any model', 'any harness', 'any cloud', 'your data', 'your models later'].map((c) => (
                <Chip key={c} size="sm" tone="violet">{c}</Chip>
              ))}
            </ChipRow>
          </Callout>
          <UseCaseGrid columns={4} className="dk-gap-sm">
            <UseCaseCard
              tone="indigo"
              kicker="Swap the model"
              body="Skills, rules, evals and traces repoint. Route the routine 80% to a cheap or open-weight model; keep frontier where it earns its cost."
            />
            <UseCaseCard
              tone="indigo"
              kicker="Swap the harness"
              body="Claude Code, Codex, Cursor or your own — every one reaches the same brain and the same governed tools over MCP."
            />
            <UseCaseCard
              tone="indigo"
              kicker="Swap the cloud"
              body="Self-hosted in your VPC, on-prem or air-gapped. Moving it is a deployment, not a migration."
            />
            <UseCaseCard
              tone="indigo"
              kicker="A vendor disappears"
              body="Nothing of yours lived inside them. Your knowledge, your loop and your agents carry on."
            />
          </UseCaseGrid>
          <Callout tone="emerald" className="dk-gap-sm">
            <strong>The test we hold ourselves to:</strong> take any one vendor away — does your
            company's capability survive? Nothing leaves your infrastructure and nothing trains a
            public model, so what you build here is capital you own, not intelligence you rent.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 23 · Where this goes ─────────────────────────────────────────────
     * Three horizons. `PhaseCard` carries badge / when / title / body one-for-one, and its
     * `position` progression is the same near -> bridge -> far the source's `.s1/.s2/.s3` tints
     * were doing by hand. */
    {
      id: 'where-this-goes',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Where this goes"
            eyebrowTone="emerald"
            title="Today you install the layer. Then it compounds into something bigger."
            subtitle="The layer you deploy now sits between your people, agents and systems — it takes you from transforming today to a truly AI-native company — and it becomes the training ground for AI of your own."
          />
          <PhaseRow>
            <PhaseCard
              badge="HORIZON 1"
              when="Now"
              title="Install the layer"
              body="Engineering sets the rails once; your teams build and run agents safely on a shared brain. The work you're starting today."
            />
            <PhaseCard
              position="bridge"
              badge="HORIZON 2"
              when="Compounds"
              title="Your own AI"
              body={
                <>
                  Every run traced, every review and correction captured, evals against <em>your</em>{' '}
                  outcomes — the training ground to fine-tune open-weight models you own, graduated
                  into real work the way you onboard a new team member.
                </>
              }
            />
            <PhaseCard
              position="far"
              badge="HORIZON 3"
              when="Where it leads"
              title="Operations that run themselves"
              body="The routine work runs on models and agents that are yours; your people create value at the edge of what AI can do, on a company brain that keeps learning."
            />
          </PhaseRow>
          <Caption className="dk-gap">
            Build horizontal, deploy vertical — each team (Sales, Marketing, Ops, FinOps) is its own
            curve on the same layer.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 24 · Two ways to deploy ──────────────────────────────────────────
     * Inward / outward, which is SplitColumns again — the same contrast component the viewpoint
     * slide uses, and the third time in this deck that a two-up with a label, a claim, a list and a
     * bottom line turns out to be one shape. */
    {
      id: 'two-ways',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Two Ways To Deploy"
            eyebrowTone="indigo"
            title="One substrate. Two ways to become agent-native."
            subtitle="The same operating layer can point inward at your company — or outward through your product. Same brain, skills, and governance; different go-to-market."
          />
          <SplitColumns>
            <SplitColumn
              tone="indigo"
              eyebrow="Motion 1 · Internal"
              title="Make your company agent-native"
            >
              <SplitItem>
                An internal operating brain that unblocks your own teams — ops, support, finance,
                product — on the tools they already use.
              </SplitItem>
              <SplitItem>A shared brain over your systems, not per-laptop context</SplitItem>
              <SplitItem>Skills &amp; agents your teams author and own</SplitItem>
              <SplitItem>Every run and correction compounds internally</SplitItem>
              <SplitItem>
                <Caption mono>Shows up as leaner ops on the P&amp;L</Caption>
              </SplitItem>
            </SplitColumn>
            <SplitColumn
              tone="violet"
              eyebrow="Motion 2 · Product"
              title="Make your product agent-native"
            >
              <SplitItem>
                Embed the layer beneath your own SaaS so every customer gets an AI-native surface —
                without building the infrastructure yourself.
              </SplitItem>
              <SplitItem>An isolated, governed brain per customer / tenant</SplitItem>
              <SplitItem>Agent experiences you ship to your users</SplitItem>
              <SplitItem>New revenue &amp; retention, not just internal savings</SplitItem>
              <SplitItem>
                <Caption mono>Shows up as a differentiated product</Caption>
              </SplitItem>
            </SplitColumn>
          </SplitColumns>
          <Caption className="dk-gap">
            <em>
              Different packaging, one platform — so you never rebuild the substrate to switch
              motions.
            </em>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 25 · Product transformation ──────────────────────────────────────
     * `.three-box` again, same map as slide 8. Icons dropped for the same reason: three cards
     * already separated by kicker and tone do not also need a glyph, and the source's are the same
     * three generic shapes reused. */
    {
      id: 'product-transformation',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Product Transformation"
            eyebrowTone="violet"
            title="Make your product agent-native — on the same layer."
            subtitle="Give every customer a living brain and agents over their own data. The infrastructure ships with Synos, so your team builds the experience, not the plumbing."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="A brain per customer"
              title="Their data, mapped automatically"
              body="Agentic profilers scan each customer's tables and documents, build an entity graph, and stand up an isolated, tenant-scoped brain — no manual onboarding per account."
            />
            <UseCaseCard
              tone="emerald"
              kicker="Agents you ship to users"
              title="An AI-native surface in your product"
              body="Insights, planning, diagnostics, assistants — authored once as skills, exposed to your customers through chat, Slack, or your own UI. Governed and cost-metered per tenant."
            />
            <UseCaseCard
              tone="violet"
              kicker="Compounds per account"
              title="Gets smarter with every use"
              body="Every customer interaction and correction feeds that tenant's brain. Your product's value grows per account over time — a moat competitors can't copy by swapping models."
            />
          </UseCaseGrid>
          <Caption className="dk-gap">
            <em>
              The pattern SaaS teams use to turn “AI-first” ambition into a shipped, differentiated
              product — in weeks, not a year.
            </em>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 26 · Templated brains ────────────────────────────────────────────
     * Six function templates. The colour-coding is the content here: six cards that all say "a
     * brain for X" are told apart by hue and nothing else, which is why the bullets read the card's
     * own kicker variable rather than a colour restated per list. The ops-buyer port lost exactly
     * this and it took an A/B against the shipped slide to see it. */
    {
      id: 'templated-brains',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Templated Brains"
            eyebrowTone="indigo"
            title="A starting brain for every operating team."
            subtitle="Pre-built for the functions a lean company runs — live in weeks, then tuned to you."
          />
          <UseCaseGrid>
            {[
              ['indigo', 'Revenue · Pipeline', 'Sales Brain', ['Lead triage & instant follow-up', 'AI battlecards & objection handling', 'Pipeline hygiene & deal nudges', 'Account & competitor context']],
              ['amber', 'Growth · Demand', 'Marketing Brain', ['Campaign planning & decisioning', 'Content & creative drafting', 'Channel & ROAS performance digests', 'Audience & cohort context']],
              ['emerald', 'Operations · SOPs', 'Internal Ops Brain', ['Weekly ops digests & exceptions', 'SOP capture & playbook lookup', 'Vendor / supply / fleet monitoring', 'Incident & escalation handling']],
              ['violet', 'Discovery · Roadmap', 'Product Brain', ['PRDs & specs drafted from real context', 'Roadmap trade-offs on live usage data', 'Feature adoption & funnel digests', 'Feedback & research → themes → backlog']],
              ['indigo', 'FP&A · Spend', 'Finance Brain', ['Budget & spend pacing', 'Margin & unit-economics watch', 'Anomaly & variance alerts']],
              ['red', 'Customer · Retention', 'Support / CX Brain', ['Ticket triage & drafted replies', 'Voice-of-customer themes', 'Churn & CSAT signal watch']],
            ].map(([tone, kicker, title, items]) => (
              <UseCaseCard
                key={title}
                tone={tone}
                kicker={kicker}
                title={title}
                body={
                  <ul className="tb-tpl-list">
                    {items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                }
              />
            ))}
          </UseCaseGrid>
          <Caption className="dk-gap-sm">
            <strong>Templates are the starting point, not the ceiling.</strong> Each ships day-one and
            then <em>compounds on your data and your corrections</em> until it operates the way you do
            — and any function not shown here is built on the same rails, owned and extended by your
            team.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 27 · What your teams get ─────────────────────────────────────────
     * Three functions, each a checklist plus a result line. The result is the row that matters, so
     * it rides as a `Caption mono` under the list rather than as another bullet. */
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
            {[
              ['indigo', 'Revenue', 'Sales Ops', ['Leads followed up instantly, not next day', 'Every rep armed with live battlecards', 'Pipeline kept clean without nagging'], '↑ Higher conversion & revenue per rep'],
              ['amber', 'Demand', 'Marketing Ops', ['Campaigns planned & launched faster', 'More content, on-brand, less manual effort', 'Spend steered by always-on performance reads'], '↑ More qualified leads & better ROAS'],
              ['emerald', 'Efficiency', 'Internal Ops', ['Manual reporting & monitoring runs itself', 'Issues caught early, fewer fire-drills', 'Institutional knowledge survives churn'], '↑ Leaner ops, faster cycles, fewer errors'],
            ].map(([tone, kicker, title, items, result]) => (
              <UseCaseCard
                key={title}
                tone={tone}
                kicker={kicker}
                title={title}
                body={
                  <>
                    <ul className="tb-tpl-list">
                      {items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                    <Caption mono>{result}</Caption>
                  </>
                }
              />
            ))}
          </UseCaseGrid>
          <Caption className="dk-gap">
            <em>
              The compounding effect: the brain gets smarter, the agents do more, and the team's
              leverage grows every quarter — without growing headcount at the same rate.
            </em>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 28 · How a brand gets there ──────────────────────────────────────
     * Discover / build / hand over. Same `PhaseRow` shape as the autonomy stages, and the same
     * dropped arrows. */
    {
      id: 'how-it-lands',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="How a Brand Gets There"
            eyebrowTone="indigo"
            title="Live in weeks — and your team owns it."
            subtitle="We forward-deploy engineers alongside your team to build the 20% custom to your business, then hand it over."
          />
          <PhaseRow>
            <PhaseCard
              badge="01 · DISCOVER"
              title="Pair with your team"
              body="We sit with Sales, Marketing & Ops, connect your systems, and pick the highest-leverage workflows to start with."
            />
            <PhaseCard
              position="bridge"
              badge="02 · BUILD"
              title="Stand up the brains + agents"
              body="Deploy the templated brains, tune them to your data, and ship the first agents and apps on the governed layer."
            />
            <PhaseCard
              position="far"
              badge="03 · HAND OVER"
              title="Your team carries it forward"
              body="Non-coders author and tweak workflows in plain English. The brain compounds inside your business — not ours."
            />
          </PhaseRow>
          <Callout tone="indigo" className="dk-gap">
            <strong>Platform + people.</strong> The layer stands on its own; the FDE team gets you to{' '}
            <em>outcomes this quarter</em>, not just a tool installed.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 29 · The outcome ─────────────────────────────────────────────────
     * A vision slide: a headline and three payoff pills. `BigTypeSlide` carries the headline; the
     * pills are a Columns of three Callouts in its children slot, which is what that slot is for. */
    {
      id: 'the-outcome',
      variant: 'bigType',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="The Outcome"
          line1="Lean teams running Sales, Marketing & Ops"
          line2={<>on a <span className="sk-gradient-text">brain that compounds</span>.</>}
        >
          {/* Three across, so UseCaseGrid rather than Columns — `Columns` is a two-up and wrapped
              these 2 + 1, which reads as one payoff being less important than the other two. */}
          <UseCaseGrid className="dk-gap">
            <UseCaseCard tone="indigo" title="Higher sales" body="Faster follow-up, better-armed reps, cleaner pipeline." />
            <UseCaseCard tone="amber" title="More leads" body="More campaigns & content, steered by live performance." />
            <UseCaseCard tone="emerald" title="Leaner ops" body="Repetitive work automated; knowledge that never leaves." />
          </UseCaseGrid>
        </BigTypeSlide>
      ),
    },

    /* ── 30 · To the demo ─────────────────────────────────────────────────
     * The handover to the live walkthrough. Four chips of what is about to be shown. */
    {
      id: 'to-the-demo',
      variant: 'bigType',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="Let's see it live"
          line1="From slides to the"
          line2={<span className="sk-gradient-text">running product.</span>}
          sub="A quick walkthrough of the real platform — the brain, an agent running, and the governance underneath."
        >
          <ChipRow center className="dk-gap">
            <Chip size="pill">The Company Brain in action</Chip>
            <Chip size="pill">An agent run, step by step</Chip>
            <Chip size="pill">Human review + audit trail</Chip>
            <Chip size="pill">Slack / WhatsApp delivery</Chip>
          </ChipRow>
        </BigTypeSlide>
      ),
    },

    /* ── 31 · Appendix divider ────────────────────────────────────────────
     * Everything after this is the engineering deep dive. */
    {
      id: 'under-the-hood',
      variant: 'bigType',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="Appendix"
          line1="Under the"
          line2={<span className="sk-gradient-text">hood</span>}
          sub="Architecture, retrieval, governance and the self-learning loop — the engineering deep dive."
        />
      ),
    },

    /* ── 32 · Architecture ────────────────────────────────────────────────
     * Identical to the ops deck's, and lifted from it rather than re-derived — the two decks share
     * this slide word for word, and two hand-written copies of one diagram is how they drift. The
     * three bands are the same stack rule as slide 9: outer bands are boxes, all three the same
     * width. */
    {
      id: 'architecture',
      variant: 'arch',
      node: (
        <SlideFrame stage={false} variant="arch" density="compact">
          <SlideHeader
            eyebrow="Architecture"
            eyebrowTone="indigo"
            title="One substrate. Any tool, any model."
            subtitle="Engineering sets the rails once. Non-engineers ship safely on top."
          />
          <Stack gap="tight">
            <Band tone="sor" label="Bring Your Own Tool — all speak one interface (MCP)">
              <TileRow className="dk-tile-row-tight">
                <Tile size="sm" mono name="ChatGPT" kind="teams" />
                <Tile size="sm" mono name="Claude Code" kind="power users" />
                <Tile size="sm" mono name="Cursor" kind="IDE" />
                <Tile size="sm" mono name="In-house agents" kind="custom" />
                <Tile size="sm" mono name="Synos Apps" kind="sandboxed" />
                <Tile size="sm" mono name="Synos Agents" kind="managed" />
              </TileRow>
            </Band>
            <Caption mono>One interface · any model · swap for price or capability</Caption>
            <div className="dk-band tb-band--core">
              <div className="tb-band-head">
                <span className="tb-band-title">Synos Core</span>
                <Chip size="sm" tone="indigo">
                  Self-hosted · multi-tenant · model-agnostic · tool-agnostic
                </Chip>
              </div>
              <PillarGrid columns={4}>
                <PillarCard
                  brain
                  wide={false}
                  name="Company Brain"
                  desc="Knowledge graph across sources. Entities, relationships, citations."
                />
                <PillarCard
                  name="Skills Library"
                  desc="Workflows authored in plain English. Shared & versioned."
                />
                <PillarCard
                  name="System of Record"
                  desc="Schema-enforced operational data. Agents write, apps read."
                />
                <PillarCard
                  name="Self-Learning Loop"
                  desc="Every correction reviewed & promoted. Improves without rewrites."
                />
              </PillarGrid>
              <ChipRow tight className="dk-gap-sm">
                <Chip size="sm" tone="indigo">Guardrails</Chip>
                <Chip size="sm">RBAC · role · tenant</Chip>
                <Chip size="sm">Audit on every action</Chip>
                <Chip size="sm">Build scan on every app</Chip>
                <Chip size="sm">Egress proxy</Chip>
                <Chip size="sm">Kill-switch · approvals</Chip>
              </ChipRow>
            </div>
            <Band tone="sor" label="Your existing systems — connected, not replaced">
              <ChipRow tight>
                <Chip size="sm" mono>Warehouse · BigQuery</Chip>
                <Chip size="sm" mono>CRM · Salesforce · HubSpot</Chip>
                <Chip size="sm" mono>Sheets · Docs · Notion</Chip>
                <Chip size="sm" mono>Drive · S3</Chip>
                <Chip size="sm" mono>Slack · Email · WhatsApp</Chip>
                <Chip size="sm" mono>Ads · GA · Tickets</Chip>
              </ChipRow>
            </Band>
            <div className="tb-actors">
              <Callout tone="indigo" label="Engineering — sets rails once">
                Connects systems · defines tools + permissions · picks models. Stops being the
                workflow bottleneck.
              </Callout>
              <Callout tone="violet" label="Non-engineering — ships daily">
                Sales · Marketing · Ops author workflows in plain English. Safely. With analytics.
              </Callout>
            </div>
          </Stack>
        </SlideFrame>
      ),
    },

    /* ── 33 · What lives in the brain ─────────────────────────────────────
     * Eight memory types, four across. The hue groups them — knowledge indigo, rules red, outcome
     * emerald, learning violet — so the grid reads as four families rather than eight cards. */
    {
      id: 'memory-types',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="What Lives In The Brain"
            eyebrowTone="indigo"
            title="Eight kinds of memory — every shape an agent needs."
            subtitle="Schema-less and extensible, each mapped to a concrete store so the brain stays queryable, auditable, and rollback-safe."
          />
          <UseCaseGrid columns={4}>
            {[
              ['indigo', 'Knowledge graph', 'Semantic', 'Stable facts about entities — customer, product, cohort, region.', '“Acme Corp · T2 · Mumbai · WhatsApp-preferred”'],
              ['indigo', 'Operational store', 'Episodic', 'Time-stamped events — orders, messages, sessions, tickets.', '“Order #4821 placed · 19:42”'],
              ['violet', 'Skill library', 'Procedural', 'How-to recipes — the workflows and playbooks agents follow.', '“Win-back campaign workflow”'],
              ['red', 'Policy graph', 'Policy / Rules', 'Brand-mandated constraints — frequency caps, channel + consent rules.', '“Never message before 9am local”'],
              ['indigo', 'Knowledge graph', 'Preferences', 'Per-entity modifiers learned from behaviour.', '“Prefers WhatsApp · evenings”'],
              ['amber', 'Decision log', 'Decision Trace', 'Input-state → action → outcome. Every agent call recorded.', '“Win-back dispatch · WA · 10% offer”'],
              ['emerald', 'Outcome log', 'Reward / Outcome', 'Did the action move the baseline? Measured uplift per action.', '“10% offer · conv +3.2% vs baseline”'],
              ['violet', 'Review queue', 'Reflective', 'Human + agent corrections compounded back. One-line corrections become rules.', '“Exception: skip VIP tier on discount blasts”'],
            ].map(([tone, kicker, title, def, ex]) => (
              <UseCaseCard
                key={title}
                tone={tone}
                kicker={kicker}
                title={title}
                body={
                  <>
                    {def}
                    <div className="tb-example">{ex}</div>
                  </>
                }
              />
            ))}
          </UseCaseGrid>
          <Caption className="dk-gap-sm">
            <strong>Open list, not closed.</strong> Adding a new kind of memory is configuration, not
            a migration.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 34 · Retrieval, deep ─────────────────────────────────────────────
     * Two modes side by side: a deterministic five-step pack assembly, and the agentic traversal
     * with its own diagram plus a mono trace of the four tool calls it actually made. The trace is
     * the most convincing object on the slide for an engineer — it is the thing that says this is
     * implemented rather than described — so it is carried verbatim. */
    {
      id: 'retrieval-deep',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Retrieval"
            eyebrowTone="indigo"
            title="Every agent gets the right slice — deterministic or agentic."
            subtitle="Job-specific context packs assembled per query. Hybrid retrieval, authority-ranked, freshness-aware, policy-redacted. MCP-native envelope."
          />
          <div className="tb-retrieval">
            <div>
              <div className="tb-ret-head">
                <Chip size="sm" tone="indigo">Mode A</Chip>
                <span className="tb-ret-name">Deterministic pack assembly</span>
                <span className="tb-ret-when">~300ms · single call</span>
              </div>
              <div className="tb-ret-flow">
                {[
                  ['Query · scoped by agent role + intent', '“Next-best action for Maya” + agent capabilities + project_id'],
                  ['Hybrid retrieval · vec + graph + keyword', 'ChromaDB embeddings · Neo4j multi-hop · Postgres FTS — fused'],
                  ['Authority + freshness rank', 'AgentPromoted > Document > SOR row · staleness penalty'],
                  ['Policy redact + token budget', 'RBAC filter · PII redaction · 4K/16K/32K envelope per agent'],
                  ['Context Pack → MCP response', 'Typed JSON · citation IDs · authority score · staleness ts'],
                ].map(([name, desc], i) => (
                  <div className="tb-ret-step" key={name}>
                    <div className="tb-ret-num">{i + 1}</div>
                    <div>
                      <div className="tb-ret-name">{name}</div>
                      <div className="tb-ret-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="tb-ret-head">
                <Chip size="sm" tone="violet">Mode B</Chip>
                <span className="tb-ret-name">Agentic retrieval — multi-step graph traversal</span>
                <span className="tb-ret-when">3–6 hops · adaptive</span>
              </div>
              <div className="tb-agentic diagram-svg">
                <div dangerouslySetInnerHTML={{ __html: RETRIEVAL_SVG }} />
                <div className="tb-trace" dangerouslySetInnerHTML={{ __html: TRACE_HTML }} />
              </div>
            </div>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 35 · Compared to the open-source stack ───────────────────────────
     * Three categories x what-it-does / what-it-is-not. `Matrix` in `rules` form: the label column
     * carries the category name plus its projects and star counts, which is exactly the label +
     * `sub` shape.
     *
     * The star counts are dated ON the slide because they rot. Carried verbatim, dates included —
     * a number without its date is the kind of claim that quietly becomes wrong. */
    {
      id: 'oss-question',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Compared to the open-source stack"
            eyebrowTone="violet"
            title="“Why not just use the open-source graph memory?”"
            subtitle="Three unrelated categories get named in that one question, and the honest answer differs per category. Star counts: GitHub API, 2026-08-15 — they rot fast, so they are dated."
          />
          <Matrix
            variant="rules"
            labelWidth="220px"
            columns={[{ label: 'What it does' }, { label: 'What it is not', width: '1.35fr' }]}
            rows={[
              {
                label: 'GraphRAG',
                sub: 'LightRAG 38.9k★ · Microsoft GraphRAG 35.5k★',
                cells: [
                  { text: 'Turns a document corpus you have already collected into a queryable knowledge graph. Cheap, good, available today.' },
                  {
                    text: (
                      <>
                        The biggest category by stars — and <strong>not a memory system</strong>. No
                        connectors, no tenancy, no temporality, no live source. Collecting, governing
                        and connecting to running systems is left entirely to you.
                      </>
                    ),
                  },
                ],
              },
              {
                label: 'Graph memory engines',
                sub: 'cognee 30.0k★ · Graphiti 29.9k★ · Semantica 7.5k★',
                cells: [
                  { text: 'Real peers on the graph itself. Graphiti has the best temporal model in the field; cognee is the most complete system and the honest benchmark.' },
                  {
                    text: (
                      <>
                        <strong>Components, not layers.</strong> Graphiti ships{' '}
                        <strong>zero connectors</strong> — its own README says bring your own database
                        and build your own tooling, and Zep's scaled engine is proprietary. cognee
                        reaches for Graphiti to get temporal.
                      </>
                    ),
                  },
                ],
              },
              {
                label: 'Agent memory, no graph',
                sub: 'mem0 63.3k★ · letta 24.2k★',
                cells: [
                  { text: 'Conversational personalisation for one agent — memory blocks, extracted facts, vector recall.' },
                  {
                    text: (
                      <>
                        mem0 — the most-starred of all —{' '}
                        <strong>deleted graph memory from its open source in v3</strong> (~4,000
                        lines, all five drivers) and made it Platform-only. A graph is not table
                        stakes; it has to earn its ingestion cost.
                      </>
                    ),
                  },
                ],
              },
            ]}
          />
          <Callout tone="violet" className="dk-gap-sm">
            <strong>The fact that separates us from all three:</strong> no system in this study
            computes a single column statistic on a structured source. Semantica does schema
            introspection plus <code>SELECT … LIMIT</code>; cognee pulls rows in through{' '}
            <code>dlt</code> and derives foreign-key edges. We <strong>profile in place</strong> —
            null rate, distinct counts, length bounds, samples — then semantically type each column
            and bind your metrics to it, while{' '}
            <strong>the rows stay in your warehouse and are queried live at answer time</strong>.
            That is data residency, cost and freshness in one design decision.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 36 · The honest comparison ───────────────────────────────────────
     * Ours / theirs, and the right column is the point of the slide: six places named competitors
     * are genuinely ahead. Every claim carries its matrix reference, which is what makes the slide
     * checkable rather than assertive — those refs are carried verbatim as mono captions rather
     * than dropped as clutter, because a citation you cannot follow is decoration. */
    {
      id: 'oss-comparison',
      node: (
        <SlideFrame stage={false} density="compact" className="tb-overfull">
          <SlideHeader
            eyebrow="The honest comparison"
            eyebrowTone="violet"
            title="What no open-source engine ships — and the four places they are ahead of us."
            subtitle="Read from source on 2026-08-15 across Graphiti, cognee, Semantica, LightRAG, mem0 and letta. Everything on this slide is checkable from a GitHub account, which is exactly why the right column is here."
          />
          <SplitColumns>
            <SplitColumn tone="emerald" eyebrow="Ours — absent from every engine measured">
              {[
                [<><strong>Profiling of structured sources.</strong> Statistics plus tiered LLM semantic typing of every column. Rivals ingest rows or read schemas; none profiles.</>, 'matrix I-04 / I-05'],
                [<><strong>Metric binding &amp; column-role grounding.</strong> What turns “a graph of your warehouse” into the right number for a business question. Unique in the field.</>, 'matrix I-07'],
                [<><strong>Connecting a source is configuration, not engineering.</strong> 64 connectors, five separate credential surfaces with independent revocation, scheduling and incremental watermarks. Graphiti: 0 connectors. Semantica: instantiate the class, pass creds in code.</>, 'matrix I-01 / I-02 / I-03'],
                [<><strong>A graph shaped by your domain, not by what the model found.</strong> Domain templates declare the entities, metrics and relationships; extraction is constrained by them. Semantica infers an ontology instead.</>, 'matrix G-06'],
                [<><strong>A human corrects; nothing silently rewrites your knowledge.</strong> Writes go through a review queue. cognee auto-weights instead; Graphiti and Semantica have no gate.</>, 'matrix T-04'],
                [<><strong>One deployment, many tenants, ACL enforced at read time per source.</strong> Project isolation across five stores, node-grained visibility tiers. cognee's ACL is dataset-grained; Graphiti's is a partition string; Semantica has none.</>, 'matrix T-01 / T-02'],
              ].map(([body, src], i) => (
                <SplitItem key={i}>
                  <span>
                    {body}
                    <span className="tb-src">{src}</span>
                  </span>
                </SplitItem>
              ))}
            </SplitColumn>
            <SplitColumn tone="amber" eyebrow="Theirs — where they are genuinely ahead">
              {[
                [<><strong>Graphiti — bi-temporal, point-in-time querying.</strong> Facts carry system and world time; “as of last quarter” is a first-class query. We track supersession only. cognee delegates to Graphiti for exactly this, which is the strongest signal available that it is the reference design.</>, 'matrix G-01 / G-02'],
                [<><strong>Semantica — audit-grade provenance.</strong> W3C PROV-O export with a sha256 hash chain, so lineage is tamper-evident. Ours is citations and source objects.</>, 'matrix T-05 / T-06'],
                [<><strong>cognee — self-improvement, onboarding and evaluation.</strong> Its <em>memify</em> loop folds feedback, frequency and agent traces back in as weights; it starts with embedded defaults and no infrastructure; and it has five benchmark adapters. Our human-in-the-loop gate is a deliberate trade-off, not a superiority claim.</>, 'matrix O-01 / O-02 / O-04'],
                [<><strong>Backend choice.</strong> cognee runs on six graph backends, Graphiti on four. We are Neo4j-only.</>, 'matrix O-06'],
              ].map(([body, src], i) => (
                <SplitItem key={i}>
                  <span>
                    {body}
                    <span className="tb-src">{src}</span>
                  </span>
                </SplitItem>
              ))}
            </SplitColumn>
          </SplitColumns>
          <Callout tone="indigo" className="dk-gap-sm">
            <strong>And one thing nobody in this field can claim:</strong> a verified benchmark. We
            have run none, and no one has independently verified mem0's or cognee's published numbers
            either. If retrieval quality on your corpus decides the deal, the way to settle it is a
            bake-off on your data — which we will help you set up.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 37 · The compounding flywheel ────────────────────────────────────
     * The flywheel diagram beside three signals and the anchor line. */
    {
      id: 'compounding-flywheel',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="The Compounding Flywheel"
            eyebrowTone="indigo"
            title="Every action is captured with its outcome and its review — the material your evals and future training sets are built from."
            subtitle="The brain holds the input. Decision traces hold the action + outcome. Human review calibrates it back. The moat is the traces, not the model."
          />
          <Columns>
            <div className="tb-diagram" dangerouslySetInnerHTML={{ __html: FLYWHEEL_SVG }} />
            <Stack gap="snug">
              <Callout tone="indigo" label="The best examples">
                Strong decision traces are curated as reference examples of how your company should
                operate.
              </Callout>
              <Callout tone="emerald" label="The outcome signal">
                Actions that moved the needle get reinforced; the ones that didn't get down-weighted.
              </Callout>
              <Callout tone="violet" label="Human review">
                A person reviews a sample each week; disagreements become new rules in the brain.
              </Callout>
              <Caption>
                <em>The moat is the traces, not the model.</em> Years of real decisions across your
                customers and your business can't be replicated by a competitor starting today.
              </Caption>
            </Stack>
          </Columns>
        </SlideFrame>
      ),
    },

    /* ── 38 · Operational data ────────────────────────────────────────────
     * The same without / with pair as slide 17, with the system-of-record diagram. */
    {
      id: 'operational-data',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Operational Data"
            eyebrowTone="indigo"
            title="A shared, governed store agents write to and read from."
            subtitle="Agents write structured rows; apps and agents read them back. Schema-enforced, tenant-scoped, audited."
          />
          <SplitColumns>
            <SplitColumn
              tone="red"
              eyebrow="Without the layer"
              title="Agent outputs land in Sheets, Slack DMs, local files."
            >
              <SplitItem>
                Agents have nowhere structured to write. The next run can't read the last one.
              </SplitItem>
              <SplitItem>No shared table for outputs.</SplitItem>
              <SplitItem>Scattered, lost, un-reusable.</SplitItem>
              <SplitItem>No schema, no audit.</SplitItem>
            </SplitColumn>
            <SplitColumn
              tone="emerald"
              eyebrow="With Synos — System of Record"
              title="Project-scoped collections. Agents write, apps read — audited."
            >
              <SplitItem>
                <div className="tb-diagram" dangerouslySetInnerHTML={{ __html: SOR_SVG }} />
              </SplitItem>
            </SplitColumn>
          </SplitColumns>
        </SlideFrame>
      ),
    },

    /* ── 39 · Safe to build ───────────────────────────────────────────────
     * The build pipeline, same pair shape again — three slides in this appendix share it, which is
     * the appendix's own rhythm: name the failure, then draw the gate. */
    {
      id: 'safe-to-build',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Safe to Build"
            eyebrowTone="indigo"
            title="Apps ship through a sandbox — a scanner gates every build."
            subtitle="Code is scanned for unsafe access and secrets, then deployed to a sandboxed URL behind the egress proxy."
          />
          <SplitColumns>
            <SplitColumn
              tone="red"
              eyebrow="Without the layer"
              title="Apps ship straight to personal accounts."
            >
              <SplitItem>
                No sandbox, no scan, no proxy, no kill-switch. Secrets leak into client code.
              </SplitItem>
              <SplitItem>Secrets in shipped code.</SplitItem>
              <SplitItem>Calls to anywhere.</SplitItem>
              <SplitItem>Personal deploy = no control.</SplitItem>
            </SplitColumn>
            <SplitColumn
              tone="emerald"
              eyebrow="With Synos — gated build pipeline"
              title="Build → scan → compile → sandbox URL → audit row."
            >
              <SplitItem>
                <div className="tb-diagram" dangerouslySetInnerHTML={{ __html: BUILD_SVG }} />
              </SplitItem>
            </SplitColumn>
          </SplitColumns>
        </SlideFrame>
      ),
    },

    /* ── 40 · Why Synos, why now ──────────────────────────────────────────
     * Six reasons, three across. Icons dropped for the same reason as slides 8 and 25 — six cards
     * already told apart by heading and tone. */
    {
      id: 'why-synos',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Why Synos · Why Now"
            eyebrowTone="indigo"
            title="Own the layer that compounds your AI transformation."
            subtitle={
              <>
                Models are commodities. Tools are commodities. The brain that learns how <em>your</em>{' '}
                company operates isn't.
              </>
            }
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="violet"
              title="The brain is the moat"
              body="Operational knowledge that defines your edge can't be rented. It compounds inside your tenant — or not at all."
            />
            <UseCaseCard
              tone="indigo"
              title="Model + tool agnostic"
              body="Switch Anthropic ↔ OpenAI ↔ Gemini; move ChatGPT → Claude Code. Models change quarterly; the substrate shouldn't."
            />
            <UseCaseCard
              tone="emerald"
              title="Sovereignty by default"
              body="Self-hosted. Your tenant, your audit trail, your kill-switch. The opposite of vendor dependency."
            />
            <UseCaseCard
              tone="violet"
              title="Self-learning compounds"
              body="Every run and correction accumulates in your tenant. Year-2 leverage builds; it doesn't reset with the next model."
            />
            <UseCaseCard
              tone="amber"
              title="Custom is finally cheap"
              body="The 20% that defines you was never going to ship from a SaaS vendor. AI-built custom now costs less than the seats you rent."
            />
            <UseCaseCard
              tone="emerald"
              title="The post-SaaS substrate"
              body="SaaS sold seats for the common 80%. The agent era ships your custom 20% — if you own the substrate it learns on."
            />
          </UseCaseGrid>
          <Caption className="dk-gap-sm">
            <em>Own the layer. Swap the engine. Compound the transformation.</em>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 41 · Appendix · the moat is yours ────────────────────────────────
     * Four points under a lead paragraph. */
    {
      id: 'apx-the-moat',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Appendix · the moat is yours"
            eyebrowTone="emerald"
            title="The moat you walk away owning."
            subtitle="Models are commodities. The brain that learns how your company works is not."
          />
          <Callout tone="violet">
            Your moat is the <strong>feedback loop</strong> between your people, agents and systems —
            captured in your own cloud, accumulating with every run, tied to how <strong>you</strong>{' '}
            operate. Not a dataset a competitor can buy — a loop embedded in your workflow.
          </Callout>
          <UseCaseGrid columns={4} className="dk-gap">
            <UseCaseCard
              tone="indigo"
              title="Model & harness sovereignty"
              body="Swap Claude → Codex → open-source without losing your company's learned expertise. No lock-in."
            />
            <UseCaseCard
              tone="emerald"
              title="Private evals on your outcomes"
              body="Measured against your business results, not public benchmarks — ground truth only you own."
            />
            <UseCaseCard
              tone="violet"
              title="Self-hosted, your data"
              body="Runs inside your account. The compounding IP stays yours, on your infra."
            />
            <UseCaseCard
              tone="amber"
              title="You become the model-maker"
              body="Only you have this data — so your domain models can beat generic ones over time."
            />
          </UseCaseGrid>
        </SlideFrame>
      ),
    },

    /* ── 42 · Closing wordmark ────────────────────────────────────────────
     * The wordmark and the line. `BigTypeSlide` with nothing but its two lines, which is what a
     * closing card is. */
    {
      id: 'closing',
      variant: 'bigType',
      node: (
        <BigTypeSlide
          stage={false}
          line1={<>Synos<span className="sk-gradient-text">.</span></>}
          line2="The Human-Agent Operating Layer"
        />
      ),
    },
  ]

  const byId = new Map(slides.map((s) => [s.id, s]))
  const stray = slides.map((s) => s.id).filter((id) => !ORDER.includes(id))
  if (stray.length) throw new Error(`slides missing from ORDER: ${stray.join(', ')}`)
  const missing = ORDER.filter((id) => !byId.has(id))
  if (missing.length) throw new Error(`ORDER names slides that do not exist: ${missing.join(', ')}`)
  return ORDER.map((id) => byId.get(id))
}
