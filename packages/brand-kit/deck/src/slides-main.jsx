/**
 * Slides 1–23 of `synos-vc-deck-v6.html` — the cover, the 20-slide argument, the closing wordmark
 * and the appendix divider.
 *
 * THIS IS A RE-PLATFORMING, NOT A REWRITE. Every sentence below is the source deck's own text,
 * copied. Where a word differs from the source it is a bug, not an edit. The point of holding that
 * line is that if the content changed at the same time as the substrate, nobody could tell whether
 * the kit or the edit caused a difference in the comparison renders.
 *
 * Each slide records, in a comment, which kit component carried it and — where the answer is "none
 * cleanly" — what had to be composed instead. Those comments are the raw material for
 * `docs/plans/2026-08-14-deck-on-kit-report.md` §2.
 */
import { Fragment } from 'react'
import { Seam, Loop } from './diagrams.jsx'

/* The five pillar icons from the architecture slides, at the source's own geometry. */
const ico = (d, extra) => (
  <svg width={extra?.size ?? 17} height={extra?.size ?? 17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    {d}
  </svg>
)
const IconBrain = ico(
  <>
    <path d="M9 3a3 3 0 00-3 3v1a3 3 0 00-3 3v2a3 3 0 003 3v1a3 3 0 003 3h.5" />
    <path d="M15 3a3 3 0 013 3v1a3 3 0 013 3v2a3 3 0 01-3 3v1a3 3 0 01-3 3h-.5" />
  </>,
  { size: 22 },
)
const IconLoop = ico(
  <>
    <path d="M21 12a9 9 0 11-3-6.7L21 8" />
    <path d="M21 3v5h-5" />
  </>,
)
const IconDoc = ico(
  <>
    <path d="M4 19V5a2 2 0 012-2h11l3 3v13a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
    <path d="M9 7h6M9 11h6M9 15h4" />
  </>,
)
const IconDb = ico(
  <>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </>,
)
const IconDbLarge = ico(
  <>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </>,
  { size: 22 },
)
const IconShield = ico(
  <>
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </>,
)
const IconCheck = ico(<path d="M20 6L9 17l-5-5" />)
const IconDocCheck = ico(
  <>
    <path d="M4 19V5a2 2 0 012-2h11l3 3v13a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
    <path d="M9 15l2 2 4-4" />
  </>,
)
const IconBars = ico(<path d="M3 20h18M6 16V9M11 16V5M16 16v-4M21 16v-8" />)
const IconTune = ico(
  <>
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    <circle cx="12" cy="12" r="3" />
  </>,
)

export const mainSlides = (K) => {
  const {
    SlideFrame,
    SlideHeader,
    Matrix,
    Tile,
    TileRow,
    Stack,
    Columns,
    Eyebrow,
    CoverSlide,
    BigTypeSlide,
    Callout,
    Chip,
    ChipRow,
    PillarCard,
    PillarGrid,
    PhaseCard,
    PhaseRow,
    UseCaseCard,
    UseCaseGrid,
    StepCard,
    StepGrid,
    SplitColumns,
    SplitColumn,
    SplitItem,
    Caption,
  } = K

  /* The two architecture slides share one shape: a harness row, an MCP seam, a bordered core
     holding the pillar grid and a guardrails strip, and a systems-of-record row. Composed, not a
     component — `.d1-core` is a container the kit does not have, so a neutral-fill Callout with no
     accent rule stands in for it. */
  const ArchCore = ({ title, tag, children, guardrailsLabel, guardrails }) => (
    <Callout tone="violet" fill="neutral" accent="none" label={title}>
      <Caption>{tag}</Caption>
      <div className="dk-gap-sm">{children}</div>
      <div className="dk-gap-sm">
        <Eyebrow tone="muted">{guardrailsLabel}</Eyebrow>
        <ChipRow tight>
          {guardrails.map((g) => (
            <Chip key={g} size="sm">{g}</Chip>
          ))}
        </ChipRow>
      </div>
    </Callout>
  )

  const HarnessRow = ({ label, chips }) => (
    <div>
      <Eyebrow tone="muted">{label}</Eyebrow>
      <TileRow even={false} className="dk-tile-row-tight">
        {chips.map(([nm, kd]) => (
          <Tile key={nm} size="sm" mono name={nm} kind={kd} />
        ))}
      </TileRow>
    </div>
  )

  const SorRow = ({ label, chips }) => (
    <div className="dk-gap-sm">
      <Eyebrow tone="muted">{label}</Eyebrow>
      <ChipRow tight>
        {chips.map((c) => (
          <Chip key={c} size="sm" mono>{c}</Chip>
        ))}
      </ChipRow>
    </div>
  )

  return [
    /* ── 1 · Cover ────────────────────────────────────────────────────────
     * CoverSlide, exactly — eyebrow / title / lead / lede / children / foot maps one-for-one onto
     * `.eyebrow` / `.big` / `.hero-sub` / `.lede` / `.coverseam` + `.tagchips` / `.foot`.
     * `lede` is set because this is the READING deck (CoverSlide's own prop doc decides this).
     * The `.tagchip` row is ChipRow + Chip size="pill". The seam SVG is deck content. */
    {
      id: 'cover',
      variant: 'cover',
      node: (
        <CoverSlide
          stage={false}
          eyebrow="SynOS"
          title={<>The <span className="sk-gradient-text">Human-Agent Operating Layer</span></>}
          lead="The platform an enterprise builds its own AI on, designed for the critical knowledge work that runs the business."
          lede={
            <>
              A per-company <strong>AI training and evaluation environment</strong>: company memory,
              governed access into real systems, somewhere safe to deploy what gets built, and a trace
              and correction loop over everything that runs. Installed{' '}
              <strong>inside your own infrastructure</strong>, under the AI tools your teams already
              use. Your systems are profiled where they sit and queried live, so nothing is migrated.
              Engineering sets the rails once; we land the first workflow, then{' '}
              <strong>hand the controls to the domain experts in ops, finance and service</strong> and
              step back. Everything it learns belongs to them.{' '}
              <strong>
                Three engagements live, all three verbally committed to paid contracts and in
                contracting now.
              </strong>
            </>
          }
          foot="Pre-seed · 2026"
        >
          <Seam uid="x" variant="cover" agentsLabel="AI & Agents" />
          <ChipRow center>
            <Chip size="pill">Self-hosted · your cloud</Chip>
            <Chip size="pill">Any model, any agent stack</Chip>
            <Chip size="pill" tone="violet">Yours to operate, and to own</Chip>
          </ChipRow>
        </CoverSlide>
      ),
    },

    /* ── 2 · The premise ──────────────────────────────────────────────────
     * `.flow` of three `.sc` cards maps exactly onto PhaseRow / PhaseCard: `.sn` → badge,
     * `.when` → when, h3 → title, p → body, `.rev` → foot. The `.honesty-row` pair is two
     * Callouts, one amber (the bad news) and one emerald (the opportunity), in a two-column
     * deck-local grid because the kit has no two-up container that is not SplitColumns. */
    {
      id: 'premise',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The premise"
            eyebrowTone="violet"
            title="Every company is going to have to become an AI-native company."
            subtitle="Almost none of them wants to build the infrastructure that takes, and almost none can hire the AI bench it assumes. That is why this layer gets bought rather than built."
          />
          <PhaseRow>
            <PhaseCard
              badge="THE PRESSURE"
              when="Not optional any more"
              title="The mandate is already on the board agenda."
              body="A competitor ships AI features, or leadership asks for the efficiency story. Every company we meet has a programme running. None started it because they wanted one."
              foot="the question is no longer whether, it's how"
            />
            <PhaseCard
              position="bridge"
              badge="THE GAP"
              when="What it actually takes"
              title="Becoming AI-native is an infrastructure problem."
              body={
                <>
                  Context over your systems, governed access, somewhere safe to deploy, a record of
                  what worked.{' '}
                  <strong>
                    Every enterprise ends up building the same five things internally, separately and
                    slowly.
                  </strong>
                </>
              }
              foot="months of platform work before the first useful agent"
            />
            <PhaseCard
              position="far"
              badge="THE CHOICE"
              when="Build it or buy it"
              title="Nobody's moat is their AI plumbing."
              body={
                <>
                  A manufacturer's edge is manufacturing. A lender's is underwriting. Building the
                  substrate themselves spends their scarcest engineering on{' '}
                  <strong>no differentiation at all</strong>.
                </>
              }
              foot="vendor-built platforms succeed 2× as often as internal builds · MIT"
            />
          </PhaseRow>
          <Columns className="dk-gap">
            <Callout tone="red" label="And it is going badly">
              <strong>95%</strong> of enterprise GenAI pilots deliver no P&L impact (MIT).{' '}
              <strong>~40%</strong> of agentic projects cancelled by 2027 (Gartner). The failure is
              never the model.
            </Callout>
            <Callout tone="emerald" label="Which is the opportunity">
              The destination isn't in doubt. What none of them has is{' '}
              <strong>somewhere to do it</strong>, that they own.
            </Callout>
          </Columns>
        </SlideFrame>
      ),
    },

    /* ── 3 · The gap ──────────────────────────────────────────────────────
     * BigTypeSlide, exactly. `.l1` / `.l2 .gradient` / `.sub` / `.punch` are its four slots. */
    {
      id: 'the-gap',
      variant: 'bigType',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="The gap"
          line1="Models learned the entire internet."
          line2={<span className="sk-gradient-text">They never learned your company.</span>}
          sub={
            <>
              Frontier models are trained on the world's <strong>common</strong> knowledge. But
              enterprise value lives in what is <strong>not</strong> on the internet. How your company
              actually operates: its data, its decisions, its tribal knowledge. That's exactly where
              every agent pilot stalls.
            </>
          }
          punch="The agents have hands now. They have no company to stand on."
        />
      ),
    },

    /* ── 4 · Where they are today ─────────────────────────────────────────
     * SlideHeader + a bespoke SVG. The kit has no diagram vocabulary and should not grow one. */
    {
      id: 'today',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Where they are today"
            eyebrowTone="red"
            title="Their people, their AI and their systems are blocked from each other."
            subtitle="Knowledge sits with people. Capability sits in the models. Data sits in the systems. Nothing safely connects the three, so every attempt at AI stops in the same gap."
          />
          <Seam uid="u" subs />
        </SlideFrame>
      ),
    },

    /* ── 5 · The trap ─────────────────────────────────────────────────────
     * `.uc-grid` → UseCaseGrid / UseCaseCard exactly (`.uk` → kicker, h3 → title, p → body).
     * `.land` is a heading-plus-paragraph block with no kit component; composed as a neutral-fill
     * indigo Callout carrying an h3. `.caption` → Caption. */
    {
      id: 'the-trap',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The trap they're already in"
            eyebrowTone="red"
            title="Everyone selling them AI is selling them a migration first."
            subtitle={
              <>
                The platforms already in the building say the same thing more politely: bring the data
                to us first. Rip out the legacy stack, move the data, rebuild the pipelines, and{' '}
                <strong>then</strong> you get AI. Two years and a programme budget before a single
                agent does real work. Many of our buyers are already inside one.
              </>
            }
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="amber"
              kicker="Consultancies & systems integrators"
              title="The migration is the product"
              body="Billable hours are the business model. A multi-year transformation programme is the deliverable; working agents are a downstream promise."
            />
            <UseCaseCard
              tone="amber"
              kicker="Hyperscalers & platform vendors"
              title="Your data has to move first"
              body="Consumption is the business model. The AI is real, but it only works once the company’s data lives on their side of the line."
            />
            <UseCaseCard
              tone="amber"
              kicker="AI-native SaaS"
              title="A quieter lift-and-shift"
              body="No migration programme, but the same trade: your operational data, your corrections and your evals accumulate inside someone else’s tenancy."
            />
          </UseCaseGrid>
          <Callout tone="indigo" fill="neutral" className="dk-gap">
            <h3>SynOS comes to the data instead.</h3>
            <p>
              Nothing is replaced, nothing is moved, and agents are doing real work in weeks — because
              the layer installs inside the customer’s own infrastructure and reads their systems where
              they already are. This is not a positioning choice; it is what an in-tenant,
              model-agnostic architecture actually delivers.{' '}
              <strong>The messy legacy estate stops being the blocker and becomes the asset.</strong>
            </p>
          </Callout>
          <Caption className="dk-gap-sm">
            Evidence: a second enterprise committed on the same template{' '}
            <strong>in weeks, fully air-gapped inside their own infrastructure</strong> — no data left
            the building, no system was migrated.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 6 · What we built · job one ──────────────────────────────────────
     * The architecture slide. PillarGrid / PillarCard carry the six pillars including the Company
     * Brain anchor — the cleanest map in the whole deck. Everything around them (the harness row,
     * the MCP seam, the `.d1-core` container, the guardrails strip, the systems row) is composed
     * from Eyebrow / Chip / ChipRow / Callout / Caption. */
    {
      id: 'architecture-today',
      variant: 'arch',
      node: (
        <SlideFrame density="compact" stage={false} variant="arch">
          <SlideHeader
            eyebrow="What we built · job one, today"
            eyebrowTone="indigo"
            title="One environment under the chaos, built once for the whole enterprise."
            subtitle="Engineering sets the rails once. After that everyone, non-coders included, builds and runs real work on top of them, from the AI tools they already use."
          />
          <HarnessRow
            label="Your teams keep their own AI tools, all connected through MCP, the open standard agents use to call tools"
            chips={[
              ['Claude Code', 'CLI · engineers'],
              ['Codex / GPT', 'CLI · engineers'],
              ['Cursor', 'IDE · power users'],
              ['In-house agents', 'custom stacks'],
              ['SynOS Apps', 'sandboxed'],
              ['Always-on agents', 'scheduled'],
            ]}
          />
          <Caption className="dk-gap-sm">MCP · one interface · any model</Caption>
          <ArchCore
            title="SynOS — The Human-Agent Operating Layer"
            tag="Self-hosted · governed · model- & tool-agnostic"
            guardrailsLabel="Guardrails & Observability"
            guardrails={[
              'role-based access',
              'audit on every call',
              'build scan',
              'egress proxy',
              'kill-switch',
              'every run traced & collected',
            ]}
          >
            <PillarGrid>
              <PillarCard
                brain
                icon={IconBrain}
                kicker="The loop's memory · self-improving"
                name="Company Brain"
                desc="A living map of how your company operates: entities, relations, citations. Sharper with every run and every correction."
              />
              <PillarCard
                icon={IconLoop}
                tone="violet"
                name="The Learning Loop"
                desc="Every human correction is reviewed, promoted, and reaches every agent."
              />
              <PillarCard
                icon={IconDoc}
                tone="amber"
                name="Compounding Skills"
                desc="Authored in plain English; shared, versioned, forked across teams."
              />
              <PillarCard
                icon={IconDb}
                tone="indigo"
                name="Agent-Native Storage"
                desc="A governed database agents safely write to and read from."
              />
              <PillarCard
                icon={IconShield}
                tone="emerald"
                name="Safe Build & Deploy"
                desc="Apps and agents ship through sandboxes: scanned, proxied, live URLs."
              />
            </PillarGrid>
          </ArchCore>
          <SorRow
            label="Connected to your existing systems, not replacing them"
            chips={[
              'Warehouse · BigQuery',
              'CRM · Salesforce',
              'Docs · Notion · Drive',
              'Slack · Email',
              'GitHub · Tickets',
              'Internal APIs',
            ]}
          />
        </SlideFrame>
      ),
    },

    /* ── 7 · The hard part ────────────────────────────────────────────────
     * `.demo-grid` / `.demo-card` → StepGrid / StepCard exactly: `.db` → the gradient bar,
     * `.dn` → num, h3 → title, p → body, `.dq` → quote. */
    {
      id: 'hard-part',
      node: (
        <SlideFrame density="compact" stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The hard part we're taking on"
            eyebrowTone="indigo"
            title="Making an enterprise AI-native is a cluster of hard problems. We take the ones nobody else wants."
            subtitle={
              <>
                Governed integration into systems never built for it. Safe environments for AI to act
                on real data. And underneath both, the one we are built to own:{' '}
                <strong>
                  turning messy, un-moved, on-prem data into a usable per-company AI environment
                </strong>
                .
              </>
            }
          />
          <StepGrid>
            <StepCard
              num="MAKE BAD DATA USABLE IN PLACE"
              title="Profiling & entity resolution, agent-driven."
              body="Legacy systems with no clean schema, thirty years of drift, no migration allowed. Agents profile the systems where they sit and resolve the same entity across all of them."
              quote="no warehouse project · no schema rewrite · nothing leaves the building"
            />
            <StepCard
              num="KEEP IT ALIVE"
              title="A company brain that survives the data shifting underneath it."
              body="Static extraction rots in weeks. The brain re-profiles, re-resolves and re-cites as the systems change, which is why it gets sharper with use instead of going stale."
              quote="living context · cited · continuously updated"
            />
            <StepCard
              num="MAKE IT TRAINABLE"
              title="The trace and eval loop that turns work into training data."
              body="Governed access into internal systems through tools, CLIs and APIs; every run traced; every human correction captured for review. That is the raw material for a model of their own."
              quote="traces + corrections + private evals → their dataset, on their infra"
            />
          </StepGrid>
          <Columns className="dk-gap">
            <Callout tone="emerald" label="Live today">
              Profiling and the capture loop ship today and are accumulating in every deployment.
              Increasingly we solve these problems with our own specialised infra and agents, which is
              another way of saying{' '}
              <strong>we're building AI that's good at building enterprise AI</strong>.
            </Callout>
            <Callout tone="amber" label="The hard problems ahead · what the pre-seed pays for">
              The version that survives the ugliest enterprise data, then the deep end: turning live
              capture into a <strong>real training environment</strong> — private evals scored against
              their outcomes, preference-grade correction data, rollout against the real systems — live
              reads, writes captured and scored — and RL where a workflow’s volume earns it. Ours to
              own, because only we sit on the live capture.
            </Callout>
          </Columns>
        </SlideFrame>
      ),
    },

    /* ── 8 · The same environment, tomorrow ───────────────────────────────
     * GAP. `.dual` is a 5-column × 3-row matrix: a component header row, a "today" row and a
     * "tomorrow" row, with a rail label down the left. The kit has no table primitive and no grid
     * with a caller-set column count outside PillarGrid, so this is `.dk-matrix` — a raw CSS grid
     * in deck.css. The three Callouts under it ARE kit. */
    {
      id: 'second-job',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The same environment, tomorrow"
            eyebrowTone="violet"
            title="Nothing new gets installed. Every component starts doing a second job."
            subtitle="The pieces that make AI work inside a company are the same pieces you need to train a model on how that company operates. Only the name of the job changes."
          />
          <Matrix
            labelWidth="150px"
            columns={[
              { label: 'Company Brain', sub: 'Component 01' },
              { label: 'Governed tool access', sub: 'Component 02' },
              { label: 'Sandboxes & deploy', sub: 'Component 03' },
              { label: 'Traces & corrections', sub: 'Component 04' },
              { label: 'Private evals', sub: 'Component 05' },
            ]}
            rows={[
              {
                label: 'Today',
                sub: 'what it does for the transformation',
                cells: [
                  { text: 'Context an agent is grounded in, so answers cite the company instead of guessing.' },
                  { text: 'Safe, audited actions inside real systems. No raw credentials, revocable.' },
                  { text: 'Somewhere a non-engineer can ship an app or an agent without a ticket.' },
                  { text: 'Observability. What ran, what it touched, what a person fixed afterwards.' },
                  { text: 'Did this workflow actually work, measured against the outcome.' },
                ],
              },
              {
                label: 'Tomorrow',
                sub: 'what the same thing becomes for training',
                cells: [
                  { tone: 'full', text: <>The <strong>grounding corpus</strong> a model is fine-tuned against.</> },
                  { tone: 'full', text: <>The <strong>action space</strong> a model is trained and tested in.</> },
                  { tone: 'full', text: <>The <strong>rollout environment</strong> where attempts run safely, over and over.</> },
                  { tone: 'full', text: <><strong>Labelled data and preference signal</strong>, produced by their people doing real work.</> },
                  { tone: 'full', text: <>The <strong>benchmark only they own</strong>, and the gate a candidate model has to pass.</> },
                ],
              },
            ]}
          />
          <Columns className="dk-gap">
            <Callout tone="indigo" label="Why this is infrastructure work">
              A world where every enterprise has AI of its own is not a world of a few frontier models
              doing everything. It is thousands of company-specific models, each needing somewhere to
              be built, grounded, run and measured.{' '}
              <strong>That environment has to be repeatable, or it does not happen at all.</strong>
            </Callout>
            <Callout tone="violet" label="What is live, and what the round builds">
              The capture layer ships today and accumulates in every deployment, because capture is the
              scarce part and only happens inside real work. Private evals are in build. Fine-tuning and
              distillation stack on top, with no rebuild and nothing new for the customer to install.
            </Callout>
          </Columns>
        </SlideFrame>
      ),
    },

    /* ── 9 · What we're building · job two ────────────────────────────────
     * The second architecture slide. Same composition as slide 6. The `.d1-st` status badges
     * (LIVE / IN BUILD / THE ROUND BUILDS) ride inside the pillar name as Chips — the kit's
     * PillarCard takes a ReactNode name, so this needs no new prop. */
    {
      id: 'architecture-training',
      variant: 'arch',
      node: (
        <SlideFrame density="compact" stage={false} variant="arch">
          <SlideHeader
            eyebrow="What we're building · job two"
            eyebrowTone="violet"
            title="The same environment, drawn as the training layer."
            subtitle="One centralised store, four things acting on it. Three of the five ship today because the transformation needs them; the round builds the last two on top."
          />
          <HarnessRow
            label="The model layer · whatever the company runs, bought or trained"
            chips={[
              ['Frontier APIs', 'Claude · GPT · Gemini'],
              ['Open-weight bases', 'self-hosted'],
              ['Fine-tuned models', 'theirs, per function'],
              ['Distilled small models', 'the routine 80%'],
              ['Candidate models', 'under evaluation'],
              ['Model registry', 'versioned, promotable'],
            ]}
          />
          <Caption className="dk-gap-sm">
            One governed interface · train against it, evaluate against it, serve through it
          </Caption>
          <ArchCore
            title="SynOS — the per-company AI training and evaluation environment"
            tag="Self-hosted · nothing leaves the tenancy · the same install as job one"
            guardrailsLabel="Data governance, unchanged from job one"
            guardrails={[
              'datasets stay in tenancy',
              'no vendor egress',
              'lineage on every example',
              'per-function datasets',
              'right to delete',
            ]}
          >
            <PillarGrid>
              <PillarCard
                brain
                icon={IconDbLarge}
                kicker="One store · the scarce part · accumulating now"
                name={<>Company Brain <Chip size="sm" tone="emerald">LIVE</Chip></>}
                desc={
                  <>
                    The same centralised layer that grounds agents today is the corpus models are
                    trained against tomorrow. One store, per company, on their own infrastructure.
                    <ChipRow tight className="dk-gap-sm">
                      {[
                        'entities & relations',
                        'traces & trajectories',
                        'skills & SOPs',
                        'corrections & labels',
                        'eval sets',
                        'curated datasets',
                      ].map((b) => (
                        <Chip key={b} size="sm">{b}</Chip>
                      ))}
                    </ChipRow>
                  </>
                }
              />
              <PillarCard
                icon={IconCheck}
                tone="emerald"
                name={<>Capture & labelling <Chip size="sm" tone="emerald">LIVE</Chip></>}
                desc="What fills the brain. Every run traced with full lineage; every correction, approval and rejection captured from SMEs doing real work rather than an annotation vendor."
              />
              <PillarCard
                icon={IconDocCheck}
                tone="emerald"
                name={<>Rollout environment <Chip size="sm" tone="emerald">LIVE</Chip></>}
                desc="Sandboxed execution against real systems, repeatable and reversible, on the same permissions and kill-switch the transformation runs on."
              />
              <PillarCard
                icon={IconBars}
                tone="amber"
                name={<>Eval harness <Chip size="sm" tone="amber">IN BUILD</Chip></>}
                desc="Task suites built from real traces, scored against the company's own outcomes. The gate a candidate model passes before promotion."
              />
              <PillarCard
                icon={IconTune}
                tone="violet"
                name={<>Fine-tune & distillation <Chip size="sm" tone="violet">THE ROUND BUILDS</Chip></>}
                desc="Supervised and preference tuning on open weights, distilled to small models per function, trained and served inside the customer's infrastructure."
              />
            </PillarGrid>
          </ArchCore>
          <SorRow
            label="Grounded in the same systems the transformation already connected"
            chips={[
              'Warehouse',
              'CRM & ERP',
              'Docs & wikis',
              'Slack & email',
              'Internal APIs',
              'Same connectors, permissions and audit',
            ]}
          />
        </SlideFrame>
      ),
    },

    /* ── 10 · The play ────────────────────────────────────────────────────
     * `.flow` → PhaseRow / PhaseCard, `.caption` → Caption. Nothing composed. */
    {
      id: 'the-play',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The play"
            eyebrowTone="violet"
            title="One environment, three phases. The first pays for the rest."
            subtitle="Everyone else authors a copy of the business and trains in the copy. This one instruments the original. The environment that makes AI work today is the one they need to train their own models tomorrow. Entry is how the position gets earned."
          />
          <PhaseRow>
            <PhaseCard
              badge="ENTRY"
              when="Today · revenue"
              title="Unblock the knowledge work"
              body={
                <>
                  The layer installs in their cloud or fully air-gapped, and the company's
                  non-engineers start doing real work on it, in the AI tools they already use, against
                  their own systems. This is the pain they're paying to fix now, and{' '}
                  <strong>it's a good business on its own</strong>.
                </>
              }
              foot="revenue: paid POC → platform license + deployment"
            />
            <PhaseCard
              position="bridge"
              badge="NEXT"
              when="Same environment"
              title="They train their own AI"
              body={
                <>
                  Every run traced, every correction a label, private evals against <em>their</em>{' '}
                  outcomes rather than public benchmarks. That is a{' '}
                  <strong>per-company AI training environment</strong>, and what you need to fine-tune
                  open-weight models on how this business operates.
                </>
              }
              foot="revenue: data layer + evals + per-model / training runs"
            />
            <PhaseCard
              position="far"
              badge="THE LONG ARC"
              when="What we're building for"
              title="Autonomous enterprise infrastructure"
              body={
                <>
                  Most work running through agents and the software they wrote, on{' '}
                  <strong>models the company owns</strong>. We operate the layer it lives on and get
                  paid for what it produces.
                </>
              }
              foot="the operating layer of the agent-native enterprise"
            />
          </PhaseRow>
          <Caption className="dk-gap">
            The order is forced.{' '}
            <strong>Capture is the scarce part and it only happens inside real work</strong>, which is
            why the entry motion is the only way to earn the position the rest depends on, and it
            happens to be where the budget is today. What that makes us:{' '}
            <strong>an AI-infrastructure play</strong> — transformation is the entry motion,
            forward-deployed is only the delivery mechanics. One layer, three tenses, not three
            businesses.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 11 · How trust is earned ─────────────────────────────────────────
     * `.grad` / `.gcard` → StepGrid / StepCard: `.gnum` → num, h3 → title, the two paragraphs →
     * body, `.gst` → a Chip inside the body. The `.garr` connector arrows between cards are
     * decoration with no kit home and are dropped rather than faked — see the report. */
    {
      id: 'trust-ladder',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="How trust is earned"
            eyebrowTone="indigo"
            title="AI earns autonomy here the way a new team member does."
            subtitle="Nobody hands a new hire the keys on day one. The environment makes that graduation explicit — for agents on frontier models today, and for the company’s own models tomorrow."
          />
          <StepGrid>
            <StepCard
              num="01 · Rehearse"
              title="Sandboxes cut from the real systems."
              body={
                <>
                  Practice inside the customer’s environment with no blast radius: dry-runs, scanned
                  deploys, rehearsal copies we can spin up because the environment already knows their
                  systems. A practice room, not the curriculum.{' '}
                  <Chip size="sm" tone="emerald">live today</Chip>
                </>
              }
            />
            <StepCard
              num="02 · Work, supervised"
              title="Real work, human sign-off."
              body={
                <>
                  Approval gates on actions that matter, every run traced, every correction captured
                  from the person who owns the process.{' '}
                  <strong>This is where the training data comes from</strong> — supervised real work,
                  not a replica. <Chip size="sm" tone="emerald">live today</Chip>
                </>
              }
            />
            <StepCard
              num="03 · Autonomous, audited"
              title="Runs alone once the evals clear their bar."
              body={
                <>
                  Private evals scored against their outcomes decide the promotion. Circuit breakers,
                  kill switch, full audit stay on; authority is granted, revocable and re-checked.{' '}
                  <Chip size="sm" tone="amber">evals & mandates · the round builds</Chip>
                </>
              }
            />
          </StepGrid>
          <Callout tone="indigo" fill="neutral" className="dk-gap">
            <strong>The same ladder onboards both generations of their AI.</strong> An agent on a
            frontier model climbs it today; a model of their own climbs it tomorrow. And the onboarding
            record — every review, every correction, every outcome —{' '}
            <strong>is the curriculum their models train on</strong>. That is why the unblocking work
            and the training ground are one environment, not two products.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 12 · Why it compounds ────────────────────────────────────────────
     * SlideHeader + the loop SVG (deck content) + Caption + Callout. */
    {
      id: 'compounds',
      node: (
        <SlideFrame density="compact" stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Why it compounds"
            eyebrowTone="violet"
            title="The moat is the loop: the record of how your company works, not the model."
            subtitle="Humans correct. Agents act. Systems return the measured outcome. Every turn builds data no public model can ever train on, and it pays off whichever model wins."
          />
          <Loop />
          <Caption className="dk-gap-sm">
            Live today: at a martech design partner, every marketer correction feeds one learning layer
            their whole platform gets smarter from.{' '}
            <strong>
              This is data the model can never train on, and it accrues to the customer, on their
              infrastructure.
            </strong>
          </Caption>
          <Callout tone="violet" accent="none" className="dk-gap-sm">
            <strong>Where we are:</strong> the capture layer, meaning tracing, corrections and
            agent-native storage, is live and accumulating in every deployment. Private evals are in
            build, and fine-tuning on the loop is the layer after that. Built data-first on purpose,
            because <strong>capture is the scarce part</strong> and training stacks on top with no
            rebuild. <em>Full flywheel in the appendix.</em>
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 13 · Who buys ────────────────────────────────────────────────────
     * `.land` → Callout, `.uc-grid` → UseCaseGrid, `.icp2` / `.icard` → two UseCaseCards. `.icard`
     * was excluded from the kit by the inventory's own frequency test (4 uses, 2 files, one slide
     * each) and UseCaseCard carries the same kicker/title/body shape, which is the check that the
     * exclusion was right. */
    {
      id: 'who-buys',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Who buys"
            eyebrowTone="indigo"
            title="Enterprises under real AI pressure, with no bench to build their way out."
            subtitle={
              <>
                Not the eng-heavy tech companies. The ones that <strong>buy rather than build</strong>,
                with a mandate they can't fulfil internally. Every deal we've closed fits this shape.
              </>
            }
          />
          <Callout tone="indigo" fill="neutral">
            They own the domain expertise and the customer relationships, held by people who do not
            write code. What they lack is the engineering capacity to turn any of it into agents, and
            that gap closes only if the{' '}
            <strong>non-engineers can build and run on the layer themselves</strong>.
          </Callout>
          <UseCaseGrid className="dk-gap-sm">
            <UseCaseCard
              tone="red"
              kicker="Trigger · capacity"
              title="Thin AI bench"
              body="AI/ML req open for months, or re-posted; few or no ML titles; senior hires with no mid-level bench behind them."
            />
            <UseCaseCard
              tone="red"
              kicker="Trigger · failed build"
              title="Attempted, hasn't shipped"
              body="An AI initiative announced 6-12 months ago with nothing shipped, or a platform build that stalled after months. Enterprise AI licences are being cancelled at renewal because integration proved harder than it was sold as."
            />
            <UseCaseCard
              tone="red"
              kicker="Trigger · posture"
              title="Buy-first procurement DNA"
              body="An organisation that has always bought its systems. It will buy this one too, where an eng-heavy company would build and stall."
            />
          </UseCaseGrid>
          <Columns className="dk-gap-sm">
            <UseCaseCard
              tone="indigo"
              kicker="Who signs · the owner of the mandate"
              title="Business or product leadership, with CEO air-cover"
              body="The person accountable for the AI outcome, not the VP Eng being asked to build it. Budget follows the mandate."
            />
            <UseCaseCard
              tone="violet"
              kicker="Who wins day one · the SMEs"
              title="The people who hold the knowledge"
              body="Ops, sales, marketing, finance and support author the agent workflows themselves, in plain English, without a ticket."
            />
          </Columns>
        </SlideFrame>
      ),
    },

    /* ── 14 · The wedge ───────────────────────────────────────────────────
     * `.moat-split` / `.moat-col` / `.item` → SplitColumns / SplitColumn / SplitItem exactly.
     * `.sm-flow` (a four-step arrow sequence) is composed from Chips and `.dk-arrow`. */
    {
      id: 'the-wedge',
      node: (
        <SlideFrame density="compact" stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The wedge"
            eyebrowTone="indigo"
            title="Two doors into the same layer. One qualifier opens both."
            subtitle="The same buyer feels it in two directions: outward at their product, inward at their operations. Same substrate, same buyer shape, same paid-POC contract."
          />
          <SplitColumns>
            <SplitColumn
              tone="indigo"
              eyebrow="Door 1 · outward — their product"
              title="Agentic transformation of their SaaS."
            >
              <SplitItem>
                Their competitors shipped AI features; their own platform build stalled. We make their
                product agent-native <strong>in their own tenancy</strong>, the enterprise-readiness
                layer they would otherwise spend two years building.
              </SplitItem>
              <SplitItem>
                Buyer: the AI/product owner carrying the roadmap, with CEO sponsorship. Expansion path:
                their clients, one at a time, on one substrate.
              </SplitItem>
              <SplitItem>
                Evidence today:{' '}
                <strong>a martech platform. POC successful, moving to a paid client pilot.</strong>
              </SplitItem>
            </SplitColumn>
            <SplitColumn
              tone="violet"
              eyebrow="Door 2 · inward — their operations"
              title="A company brain their non-engineers can build on."
            >
              <SplitItem>
                Internal automation is blocked on engineering. We put the layer in and the{' '}
                <strong>SMEs author the agent workflows themselves</strong>. The knowledge holders
                build; engineering just sets the rails once.
              </SplitItem>
              <SplitItem>
                Enters at whatever hurts most today: a cost line, a sales-ops queue, a marketing
                pipeline. The pain is the <em>entry point</em>; the brain is the product.
              </SplitItem>
              <SplitItem>
                Evidence today:{' '}
                <strong>
                  a manufacturing enterprise and a US software company, both committed to paid
                  contracts.
                </strong>
              </SplitItem>
            </SplitColumn>
          </SplitColumns>
          <Callout tone="indigo" fill="neutral" className="dk-gap-sm">
            <strong>Why this is one company, not two:</strong> both doors deploy the identical
            substrate: in-tenant deployment, governed writes back to the systems of record, and the
            per-customer record of corrections that compounds. Nothing forks. A door is a sales entry
            point; the asset being built is the same one, and it stays inside the customer's account.
          </Callout>
          <ChipRow center className="dk-gap-sm">
            <Chip size="lg" mono>Qualify<span className="dk-chip-kd">buy-first · no AI bench</span></Chip>
            <span className="dk-arrow">→</span>
            <Chip size="lg" mono>Land<span className="dk-chip-kd">paid POC · weeks</span></Chip>
            <span className="dk-arrow">→</span>
            <Chip size="lg" mono>Expand<span className="dk-chip-kd">team → team · client → client</span></Chip>
            <span className="dk-arrow">→</span>
            <Chip size="lg" mono tone="violet">
              Platform account<span className="dk-chip-kd">annual platform license</span>
            </Chip>
          </ChipRow>
          <Caption className="dk-gap-sm">
            <strong>Delivery compounds, and that's what keeps it a platform:</strong> an{' '}
            <strong>FDE pair</strong>, a domain expert plus a forward-deployed engineer, lands each
            account and runs the engagement on SynOS itself, so engagement N costs a fraction of
            engagement 1's human hours and every one mints reusable brains and skills.{' '}
            <strong>Pipeline:</strong> founder-led and advisor networks → design-partner referrals →
            embedded distribution → content and open-source inbound.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 15 · Traction ────────────────────────────────────────────────────
     * `.story-grid` is a 1.15fr / 1fr split with one long narrative on the left and two small cards
     * on the right. Composed: `Columns ratio="nudge"` for the geometry, a StepCard for the story (the only
     * kit block that carries num + title + body + a footer line), two UseCaseCards on the right. */
    {
      id: 'traction',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Traction"
            eyebrowTone="emerald"
            title="Three engagements live. All three verbally committed to paid contracts, in contracting now."
            subtitle="Names under NDA. Introduced live on request."
          />
          <Columns ratio="nudge">
            <div>
            <UseCaseCard
              tone="emerald"
              kicker="The proof story"
              title="A manufacturing enterprise, beginning with a Cloud FinOps Brain, plus agents that take critical DevOps actions. A committed paid POC."
              body={
                <>
                  Cloud-cost knowledge lived in a few engineers' heads. It moves onto the layer: billing
                  data and people on one Company Brain, cited answers in plain English, every correction
                  captured once. Agents then carry the DevOps actions on the same rails.{' '}
                  <strong>Committed paid monthly POC, kickoff underway</strong>, and the expansion
                  conversation is already about the next function.
                </>
              }
            />
            {/* Was StepCard's `quote` slot, which rendered mono. UseCaseCard has no quote slot,
                so the line moved to a Caption — and the mono face came back as a Caption prop
                rather than by routing the content through a card it does not belong in. */}
            <Caption mono>
              committed paid monthly POC · Cloud FinOps Brain + DevOps agents · expansion in discussion
            </Caption>
            </div>
            <Stack>
              <UseCaseCard
                tone="emerald"
                kicker="Door 2 · committed paid POC · air-gapped on-prem"
                title="A US software company"
                body="Same landing template as the manufacturing enterprise, reused for a second close two weeks later, fully inside their own infrastructure. Post-POC pricing agreed."
              />
              <UseCaseCard
                tone="emerald"
                kicker="Door 1 · agentic SaaS transformation · POC successful"
                title="A martech SaaS platform"
                body={
                  <>
                    Their product made agent-native on our rails, after their own platform build
                    stalled. Four months on a warehouse-native assistant had not produced what they
                    needed; ours ran in <strong>two weeks</strong>, on raw data of about 300 columns
                    with no documentation. POC succeeded; moving to a paid pilot with a few of their own
                    clients.
                  </>
                }
              />
            </Stack>
          </Columns>
          <Columns className="dk-gap-sm">
            <Callout tone="emerald" label="Live & demo-able today">
              Company Brain, living and continuously updated · access controls · agent-native storage ·
              app deploy from Claude Code · works across AI tools via MCP · triggers · usage analytics
              & observability.
            </Callout>
            <Callout tone="amber" label="Roadmap">
              The fine-tuning and deeper data-capture layers for custom / distilled models. The data is
              being captured today; training is the next layer.
            </Callout>
          </Columns>
        </SlideFrame>
      ),
    },

    /* ── 16 · Business model ──────────────────────────────────────────────
     * `.bm` / `.bcard` → PhaseRow / PhaseCard with no badge: `.bnum` → when, h3 → title, p → body,
     * `.brev` → foot. `.bm-foot` → two Callouts. */
    {
      id: 'business-model',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Business model"
            eyebrowTone="violet"
            title="Priced like infrastructure, because that’s what it is."
            subtitle="The revenue ladder is the play restated in money. Platform fee on the footprint the environment covers — never per seat, because per-seat pricing punishes the thing we sell: more of the company on the layer."
          />
          <PhaseRow>
            <PhaseCard
              when="Land · today"
              title="Paid POC → annual platform licence."
              body="Live in weeks on one expensive workflow. Converts to a licence priced on the data footprint the environment covers, the way on-prem infrastructure has always been bought."
              foot="platform licence + deployment · grows with footprint, not headcount"
            />
            <PhaseCard
              position="bridge"
              when="Expand · the margin story"
              title="Licence grows. Delivery cost falls."
              body="Each new function lands on rails already built, so the licence grows with coverage while templated delivery gets cheaper per engagement. That widening gap is what makes this a platform business, not a services one."
              foot="the number we hold ourselves to: delivery cost per engagement, falling"
            />
            <PhaseCard
              position="far"
              when="Phase two · stacks on the same install"
              title="The training layers become revenue lines."
              body="Private eval suites, then fine-tuning and distillation runs on the captured data. Sold onto an environment already installed and already trusted, so there is no second procurement mountain."
              foot="evals · training runs · model ops — on the environment phase one paid for"
            />
          </PhaseRow>
          <Columns className="dk-gap">
            <Callout tone="indigo" label="Why not per seat">
              Agents don’t hold seats, and the buyer’s win condition is more people and more agents on
              the layer. The price follows the footprint of what the environment knows and governs, so
              our revenue grows exactly when the customer gets more value.
            </Callout>
            <Callout tone="violet" label="Where it points">
              As the layer proves what work produces, pricing moves toward outcomes. Pricing an outcome
              is underwriting, and you can only underwrite a business you understand — which is
              precisely what the environment accumulates.
            </Callout>
          </Columns>
        </SlideFrame>
      ),
    },

    /* ── 17 · Landscape ───────────────────────────────────────────────────
     * WAS the biggest gap in the rebuild: `.lstk` is a 6-column capability matrix with four cell
     * states, and the kit had no table at all. It is now the kit's `Matrix` — this slide and the
     * report's item 2 are what that component was built for. The footnote below it is a Callout. */
    {
      id: 'landscape',
      node: (
        <SlideFrame density="compact" stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Landscape"
            title="Everyone owns one band. Nobody owns the three in the middle."
            subtitle="These are different categories doing different jobs, and each is good at its own. The gap between a company's systems and the AI its people already have is the part none of them was built for."
          />
          <Matrix
            labelWidth="180px"
            columns={[
              { label: 'Data platforms', sub: 'Databricks · Snowflake · Fabric' },
              { label: 'Enterprise search', sub: 'Glean' },
              { label: 'Workflow and iPaaS', sub: 'n8n · Workato' },
              { label: 'Agent platforms', sub: 'Dust · UnifyApps' },
              { label: 'SynOS', sub: 'today, and what it becomes', emphasis: true },
            ]}
            rows={[
              {
                label: 'People and their AI tools',
                sub: 'Claude Code, Cursor, chat, apps',
                cells: [
                  { tone: 'none' },
                  { tone: 'partial', text: 'assistant' },
                  { tone: 'none' },
                  { tone: 'full', text: 'their agent' },
                  { tone: 'full', text: 'any harness' },
                ],
              },
              {
                label: 'Execution and isolation',
                sub: 'tools, sandboxes, governed deploy',
                cells: [
                  { tone: 'none' },
                  { tone: 'none' },
                  { tone: 'partial', text: 'runs flows' },
                  { tone: 'partial', text: 'runs agents' },
                  { tone: 'full', text: 'sandboxes · governed deploy' },
                ],
              },
              {
                label: 'Governance',
                sub: 'identity, credentials, RBAC, audit, kill switch',
                cells: [
                  { tone: 'none' },
                  { tone: 'none' },
                  { tone: 'none' },
                  { tone: 'none' },
                  { tone: 'full', text: 'agent acts as a revocable person' },
                ],
              },
              {
                label: 'The data layer',
                sub: 'context today · training data tomorrow',
                cells: [
                  { tone: 'partial', text: 'catalog, once the data moves in' },
                  { tone: 'partial', text: 'a copy of your documents' },
                  { tone: 'none' },
                  { tone: 'partial', text: 'connectors' },
                  {
                    tone: 'brand',
                    title: 'Company Brain',
                    text: 'profiled in place · every run traced, every correction captured',
                  },
                ],
              },
              {
                label: 'Systems of record',
                sub: 'ERP, CRM, warehouse, docs, tickets',
                cells: [
                  { tone: 'partial', text: 'move it here first' },
                  { tone: 'none' },
                  { tone: 'partial', text: 'moves data' },
                  { tone: 'none' },
                  {
                    tone: 'full',
                    text: 'existing: stay yours, untouched · new apps & agents: born on the layer',
                  },
                ],
              },
              {
                label: 'Where it goes',
                sub: 'what this round builds',
                cells: [
                  { tone: 'partial', text: 'fine-tuning too — once your data lives in theirs' },
                  { tone: 'none' },
                  { tone: 'none' },
                  { tone: 'none' },
                  {
                    tone: 'full',
                    text: '→ the same infra becomes the training ground for models they own',
                  },
                ],
              },
            ]}
          />
          <Callout tone="indigo" fill="neutral" className="dk-gap-sm">
            <strong>One data layer, two jobs.</strong> The Company Brain is the primary data layer:
            today it grounds every answer and agent in how the business actually runs, and the traces,
            corrections and evals it captures doing that are tomorrow’s training data. Around it: an
            identity and permission model an agent can act through, and somewhere isolated to build and
            deploy. The data platforms own the bottom band and ask you to move everything into it
            first. Search reads a copy. Workflow tools execute without knowing what anything means. We
            deliberately do not touch your existing systems of record, and we do not need to own the
            tools your people already use. What your people build <em>new</em> gets an agent-native
            store inside the same environment — on your infrastructure, yours like everything else it
            accumulates — so the AI-era workflows never need a second procurement. Governance is the
            permission to act, isolation is where a rollout can safely run: built once for the
            transformation, and together with the Brain they are the place a company trains models of
            its own. The training compute underneath stays pluggable — Prime Intellect, Fireworks, or
            their own GPUs — the same neutrality we hold toward models. The environment is the part
            nobody else produces.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 18 · How we build differently ────────────────────────────────────
     * `.dfx` / `.dcard` → StepGrid / StepCard exactly: `.dnum` → num, h3 → title, p → body,
     * `.dproof` → quote. `.tstakes` → a Callout. */
    {
      id: 'differently',
      node: (
        <SlideFrame density="compact" stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="How we build this differently"
            eyebrowTone="violet"
            title="Three choices that are hard to copy, because each costs a competitor something real."
            subtitle="Not features. Each one requires giving up revenue, an architecture, or a category everyone else is chasing."
          />
          <StepGrid>
            <StepCard
              num="01 · The exit"
              title="You own what accumulates."
              body={
                <>
                  Every serious vendor lands with forward-deployed engineers. We are the one building
                  for the handover: engineering keeps the rails, their domain experts operate and
                  correct, and the record of how the company works stays on their side of the wall. A
                  firm that bills for embedded engineers cannot copy this without cutting its own
                  revenue. A multi-tenant platform cannot, because the learning lives in its product.
                </>
              }
              quote="A martech platform said it back to us: “if tomorrow the customer says we don’t want to continue, fine, we exit, but that data stays with us. You can’t take my structured data which I have curated.”"
            />
            <StepCard
              num="02 · Instrumented, not simulated"
              title="They author a copy and learn in the copy. We instrument the original."
              body={
                <>
                  Training environments are a funded category — Mercor and Fleet sell mocks to the
                  labs, Prime Intellect sells the gym at a $1B valuation. Every one of them, including
                  the few that deploy the copy in your cloud,{' '}
                  <strong>authors a replica of your business and trains in the replica</strong>. A
                  replica cannot hold twelve years of exceptions in one company's order-to-cash. Ours
                  is their own systems, instrumented during real work, with rewards from real
                  corrections and outcomes — only possible because we were already doing the
                  transformation. In phase two the gym vendors sit under us, not against us.
                </>
              }
              quote="Why the order is forced: capture only happens inside real work. And the pull is cost — a lending platform’s data lead: “it’s exorbitant, the amount of tokens you consume; it just makes it unfeasible.”"
            />
            <StepCard
              num="03 · Horizontal surface, vertical delivery"
              title="One expensive workflow at a time, on one layer."
              body="Every engagement lands a single high-value piece of knowledge work with an ROI the buyer can name, the way a vertical product would. The layer underneath is the same one every time, so the second function costs less than the first and the tenth costs least of all."
              quote="This is what makes it infrastructure rather than a services business, and the automation curve is how we prove it."
            />
          </StepGrid>
          <Callout tone="amber" fill="neutral" className="dk-gap" label="What we don't claim as an edge">
            A context layer, non-engineers building agents, bring-your-own-model, private-cloud and
            air-gapped deployment, forward-deployed delivery. Every serious vendor now has these, and a
            room that hears them pitched as differentiators learns something about the pitch rather
            than the product.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 19 · If models get better ────────────────────────────────────────
     * `.flow` → PhaseRow / PhaseCard, `.caption` → Caption. Nothing composed. */
    {
      id: 'models-better',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="If models get better"
            eyebrowTone="emerald"
            title="Every jump in model capability makes this layer more necessary, not less."
            subtitle={
              <>
                Enterprises don't stop at the model. They do <em>more</em> with it, and all of it still
                needs to know how the company operates and what it may touch. The test for built
                capital: take any one model away, and the company’s capability survives, because it was
                never built into the model.
              </>
            }
          />
          <PhaseRow>
            <PhaseCard
              badge="DEMAND"
              when="More capability, more surface"
              title="Better models mean more agents, and every one needs a company underneath it."
              body={
                <>
                  Each jump raises what an enterprise will hand over, and every one still needs the
                  brain, the policies, the tools and something to evaluate against.{' '}
                  <strong>Capability doesn't grant permissions, and it doesn't know your exceptions.</strong>
                </>
              }
              foot="capability ↑ → more agents deployed → more of this layer per customer"
            />
            <PhaseCard
              position="bridge"
              badge="DELIVERY"
              when="Our own cost curve"
              title="The FDE work automates onto our own rails."
              body={
                <>
                  Today the motion is <strong>platform plus a forward-deployed engineer</strong>. Each
                  jump moves more of what that engineer does into the platform, until delivery is
                  agentic. Cost per outcome falls and the platform carries the growth.
                </>
              }
              foot="platform + FDE → agentic FDE → platform-led delivery"
            />
            <PhaseCard
              position="far"
              badge="VISION"
              when="The arrival date moves"
              title="It pulls the autonomous enterprise closer."
              body={
                <>
                  Their own models, trained on their own loop, running more of the company.{' '}
                  <strong>Model progress shortens the distance to what we are actually building for</strong>
                  , on the environment we install today.
                </>
              }
              foot="capability ↑ → the next phase arrives sooner, on the same environment"
            />
          </PhaseRow>
          <Caption className="dk-gap">
            None of this asks you to bet that model progress slows down.{' '}
            <strong>It asks you to bet that it continues</strong>, which is the only part of this
            everyone already agrees on.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 20 · Why us ──────────────────────────────────────────────────────
     * `.team-grid` / `.tcard` → UseCaseGrid / UseCaseCard (`.tp` → kicker). The two `.velocity`
     * bands and `.geo` → Callouts. */
    {
      id: 'why-us',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Why us"
            eyebrowTone="indigo"
            title="This layer sits at the intersection of three disciplines. We have all three."
            subtitle="Agentic analytics and semantic layers. On-prem enterprise infrastructure. Enterprise go-to-market in this region. Most teams attacking this problem have one of the three."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="violet"
              kicker="Data & agentic analytics"
              title="Sundial"
              body="Founder was CTO: built agentic analytics and semantic layers, and worked through the challenges of transforming a SaaS product to be AI-native."
            />
            <UseCaseCard
              tone="indigo"
              kicker="On-prem enterprise infra"
              title="Nutanix"
              body="Eight years on distributed data systems. What on-prem demands of a product: air-gapped installs, upgrade paths, correctness with nobody from your team watching."
            />
            <UseCaseCard
              tone="emerald"
              kicker="Enterprise go-to-market"
              title="Google"
              body="Amit, ex-Google, anchors go-to-market with strong India and SEA reach. Hiring from the same three pools is the first line in the use of funds."
            />
          </UseCaseGrid>
          <Stack className="dk-gap">
            <Callout tone="indigo" fill="neutral">
              <strong>Delivery is an FDE model</strong>, a domain expert plus a forward-deployed
              engineer. That embedded work is the wedge; <strong>revenue scales with the platform</strong>
              , not with hours billed, and what the FDE team learns becomes brains and skills on the
              platform.
            </Callout>
            <Callout tone="indigo" fill="neutral">
              <strong>We run SynOS on SynOS</strong>. Our own GTM, research and operations run as
              agents on the layer. It's why, four months in, there's a live platform and three
              committed engagements.
            </Callout>
            <Callout tone="emerald" fill="neutral">
              <strong>India first, US in test.</strong> The buyer profile is not geography-specific,
              and the US wedge is enterprise outside the Bay Area. Which market we scale into is an
              output of the GTM test.
            </Callout>
          </Stack>
        </SlideFrame>
      ),
    },

    /* ── 21 · The round ───────────────────────────────────────────────────
     * `.flow` → PhaseRow. `.mstone` (a titled row of five short label/value pairs) has no kit
     * component; composed as a Callout carrying a ChipRow. */
    {
      id: 'the-round',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The round"
            eyebrowTone="indigo"
            title="A pre-seed, to turn three committed contracts into a repeatable motion and a training layer."
            subtitle="Three things, in this order. The first is the constraint on everything else."
          />
          <PhaseRow>
            <PhaseCard
              badge="01"
              when="First line, first rupee"
              title="Senior founding hires"
              body="Engineering deep enough to own the messy-data problem, go-to-market, and domain SMEs who can run an FDE pair. The binding constraint on everything else."
              foot="the team is the use of funds"
            />
            <PhaseCard
              position="bridge"
              badge="02"
              when="Six months, in parallel"
              title="India GTM at scale, US GTM opened"
              body="Scale the India motion that is already converting; open the US through enterprise outside the Bay Area. Three routes carry kill thresholds written before the data, then we concentrate."
              foot="one entry wedge, chosen on evidence"
            />
            <PhaseCard
              position="far"
              badge="03"
              when="Stacks on what ships"
              title="R&D: the fine-tuning infra and environment"
              body="Private eval suites hardened first, then fine-tuning and distillation on top of the capture already running. This is what turns the transformation environment into the one they build their own AI in."
              foot="phase one funds it, phase two compounds it"
            />
          </PhaseRow>
          <Callout tone="emerald" fill="neutral" className="dk-gap" label="What is true when this round is spent">
            <TileRow>
              <Tile size="sm" tone="emerald" name="Revenue" kind="Committed contracts paid and referenceable" />
              <Tile size="sm" tone="emerald" name="Repeatability" kind="Delivery cost per engagement instrumented, falling" />
              <Tile size="sm" tone="emerald" name="Product" kind="Eval + fine-tuning infra live on real capture" />
              <Tile size="sm" tone="emerald" name="Phase-two proof" kind="First training run on one customer’s own data" />
              <Tile size="sm" tone="emerald" name="Geography" kind="India motion scaled; first US logo outside the Bay Area" />
            </TileRow>
          </Callout>
          <Caption className="dk-gap-sm">
            What it buys, plainly:{' '}
            <strong>
              a team, a proven way to repeat the deals we already have, and the layer that makes the
              second phase real
            </strong>
            . Terms and the current round structure on a call.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 22 · Closing wordmark ────────────────────────────────────────────
     * BigTypeSlide with the seam diagram in its `children` slot, which is what the slot is for. */
    {
      id: 'closing',
      variant: 'bigType',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="SynOS"
          line1={<>Make your enterprise agent-native, <span style={{ color: 'var(--sk-indigo)' }}>today.</span></>}
          line2={<span className="sk-gradient-text">Build your own AI, and own it, tomorrow.</span>}
          punch="Raising our pre-seed. Let's talk."
          tagline="Self-hosted · model-agnostic · works with any AI stack · built for the knowledge workers, not just the engineers · your data, your moat"
        >
          <Seam uid="c" variant="close" agentsLabel="AI & Agents" />
          <p className="sk-bigtype-sub">
            The layer where <strong>humans, AI and systems work at light speed</strong>, creating value
            at the edge of what current AI capabilities can achieve.
          </p>
        </BigTypeSlide>
      ),
    },

    /* ── 23 · Appendix divider ────────────────────────────────────────────
     * BigTypeSlide, exactly. */
    {
      id: 'appendix-divider',
      variant: 'bigType',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="End of the main deck"
          line1="Appendix"
          line2={<span className="sk-gradient-text">Detail on request.</span>}
          sub="What runs on the layer, the status of the two doors, where value gets created at the edge of model capability, the market evidence, the SaaS shift, plain-English build and deploy, and the full data flywheel."
          tagline="Security and readiness overview, architecture deep-dive and a live demo available on a call."
        />
      ),
    },
  ]
}
