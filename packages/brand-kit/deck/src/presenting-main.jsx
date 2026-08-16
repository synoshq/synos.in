/**
 * The PRESENTING cut of slides 1–23. Same argument, same order, same diagrams — fewer words.
 *
 * WHY THIS IS A SECOND FILE AND NOT A FLAG. A reading deck and a presenting deck are two artifacts
 * with two jobs, and the difference between them is editorial, not mechanical. `slides-main.jsx` is
 * SENT: nobody is talking over it, so its words are doing real work and it legitimately runs long.
 * This one is SHOWN while somebody speaks. Every sentence a presenter is going to say out loud is a
 * sentence the room should not also be reading. A `presenting: true` prop threaded through the
 * reading deck would have made every slide a conditional and left neither version legible in
 * source.
 *
 * THE RULES THIS CUT FOLLOWS (Anoop, 2026-08-15 — "cut hard … but make sure the rest has some
 * meaning at all … else cut lightly"):
 *
 *   1. Cut hard by default. Fall back to a light cut on any slide where what remains stops standing
 *      on its own. Which slides those were is recorded in `LIGHTLY_CUT` at the bottom of this file,
 *      not silently absorbed.
 *   2. EVERY DIAGRAM STAYS, AND SO DOES EVERY LABEL INSIDE ONE. The two architecture slides, the
 *      seam, the loop, the landscape matrix and the second-job matrix are the argument, not
 *      decoration around it. A diagram with its annotations stripped is worse than a paragraph.
 *      Where those slides needed room, it came out of their *prose*, never their labels.
 *   3. NOTHING IS DELETED. Every cut sentence moves to the slide's `notes`, which the build renders
 *      as reveal's `<aside class="notes">` — speaker view (press S), invisible on the projector.
 *      The presenter still has the paragraph; the room gets the claim.
 *   4. Headlines do not move. The h1 is the claim and it is identical to the reading deck's, which
 *      is what keeps the two artifacts recognisably one deck.
 *   5. `density="compact"` comes off wherever the cut bought the room. Compact is the READING
 *      register (see `Density.css`); the kit's default scale is the presenting one, and a
 *      presenting deck still on the reading register would be the cut only half done. It came off
 *      five of the reading deck's seven compact slides. It stays on the two architecture slides, where the default
 *      register still overflows by 62px and 45px *after* the cut and the only remaining source of
 *      room would be labels — see slide 6.
 */
import { Seam, Loop } from './diagrams.jsx'
import { archIcons, archParts } from './slides-main.jsx'

export const presentingMainSlides = (K) => {
  const {
    SlideFrame,
    SlideHeader,
    Matrix,
    Tile,
    TileRow,
    Stack,
    Columns,
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

  const { ArchCore, HarnessRow, SorRow } = archParts(K)
  const {
    IconBrain,
    IconLoop,
    IconDoc,
    IconDb,
    IconDbLarge,
    IconShield,
    IconCheck,
    IconDocCheck,
    IconBars,
    IconTune,
  } = archIcons

  return [
    /* ── 1 · Cover ────────────────────────────────────────────────────────
     * The `lede` comes off. CoverSlide's own prop doc already says the slot is the reading deck's:
     * it is a 90-word paragraph, and it is the single clearest case in the deck of the room reading
     * ahead while the founder is still on the first sentence. Title, one-line lead, seam and the
     * three tag chips stay — that is a cover.
     */
    {
      id: 'cover',
      variant: 'cover',
      node: (
        <CoverSlide
          stage={false}
          eyebrow="SynOS"
          title={<>The <span className="sk-gradient-text">Human-Agent Operating Layer</span></>}
          lead="The platform an enterprise builds its own AI on, for the critical knowledge work that runs the business."
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
      notes:
        'A per-company AI training and evaluation environment: company memory, governed access into real systems, somewhere safe to deploy what gets built, and a trace and correction loop over everything that runs. Installed inside your own infrastructure, under the AI tools your teams already use. Systems are profiled where they sit and queried live, so nothing is migrated. Engineering sets the rails once; we land the first workflow, then hand the controls to the domain experts in ops, finance and service and step back. Everything it learns belongs to them. Three engagements live, all three verbally committed to paid contracts and in contracting now.',
    },

    /* ── 2 · The premise ──────────────────────────────────────────────────
     * The three-card spine is the slide and it stays. Each body drops to its own first clause; the
     * `foot` lines already carried the punch and are untouched. The red Callout keeps both numbers
     * — they are the two facts the room writes down — and loses the sentence around them.
     */
    {
      id: 'premise',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The premise"
            eyebrowTone="violet"
            title="Every company is going to have to become an AI-native company."
            subtitle="Almost none wants to build the infrastructure that takes. That is why this layer gets bought."
          />
          <PhaseRow>
            <PhaseCard
              badge="THE PRESSURE"
              when="Not optional any more"
              title="The mandate is already on the board agenda."
              body="Every company we meet has a programme running. None started it because they wanted one."
              foot="the question is no longer whether, it's how"
            />
            <PhaseCard
              position="bridge"
              badge="THE GAP"
              when="What it actually takes"
              title="Becoming AI-native is an infrastructure problem."
              body={
                <>
                  Context, governed access, somewhere safe to deploy, a record of what worked.{' '}
                  <strong>Every enterprise builds the same five things, separately and slowly.</strong>
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
                  substrate spends their scarcest engineering on{' '}
                  <strong>no differentiation at all</strong>.
                </>
              }
              foot="vendor-built platforms succeed 2× as often as internal builds · MIT"
            />
          </PhaseRow>
          <Columns className="dk-gap">
            <Callout tone="red" label="And it is going badly">
              <strong>95%</strong> of enterprise GenAI pilots deliver no P&amp;L impact (MIT).{' '}
              <strong>~40%</strong> of agentic projects cancelled by 2027 (Gartner).
            </Callout>
            <Callout tone="emerald" label="Which is the opportunity">
              What none of them has is <strong>somewhere to do it</strong>, that they own.
            </Callout>
          </Columns>
        </SlideFrame>
      ),
      notes:
        'Almost none of them can hire the AI bench it assumes either. THE PRESSURE: a competitor ships AI features, or leadership asks for the efficiency story. THE GAP: context over your systems, governed access, somewhere safe to deploy, a record of what worked. THE FAILURE: it is never the model. THE OPPORTUNITY: the destination is not in doubt. What is missing is somewhere to do it.',
    },

    /* ── 3 · The gap ──────────────────────────────────────────────────────
     * BigType slides are already the presenting register — two lines and a punch. Only the `sub`
     * is cut, from four sentences to the one that carries the contrast.
     */
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
              Enterprise value lives in what is <strong>not</strong> on the internet: how your company
              actually operates. That is exactly where every agent pilot stalls.
            </>
          }
          punch="The agents have hands now. They have no company to stand on."
        />
      ),
      notes:
        'Frontier models are trained on the world’s common knowledge. The enterprise part, its data and its decisions and its tribal knowledge, was never in the training set and never will be.',
    },

    /* ── 4 · Where they are today ─────────────────────────────────────────
     * LIGHTLY CUT. The subtitle is the diagram's legend: three nouns (people, models, systems) that
     * name the three things the seam draws. Cutting it leaves an unlabelled picture, which rule 2
     * exists to prevent. It loses its last clause and nothing else.
     */
    {
      id: 'today',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Where they are today"
            eyebrowTone="red"
            title="Their people, their AI and their systems are blocked from each other."
            subtitle="Knowledge sits with people. Capability sits in the models. Data sits in the systems. Nothing safely connects the three."
          />
          <Seam uid="u" subs />
        </SlideFrame>
      ),
      notes:
        'So every attempt at AI stops in the same gap, not for want of a better model, but because nothing safely connects the three.',
    },

    /* ── 5 · The trap ─────────────────────────────────────────────────────
     * Three cards, each cut to its trade in one line — these are the three competitors' business
     * models and the room only has to hold the shape. The `.land` block keeps its heading and one
     * sentence; the evidence Caption moves entirely to notes, because it is a thing the founder
     * SAYS ("a second enterprise, in weeks, air-gapped") rather than a thing the room reads.
     */
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
                Rip out the legacy stack, move the data, rebuild the pipelines, and <strong>then</strong>{' '}
                you get AI. Many of our buyers are already inside one.
              </>
            }
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="amber"
              kicker="Consultancies & systems integrators"
              title="The migration is the product"
              body="Billable hours are the business model. Working agents are a downstream promise."
            />
            <UseCaseCard
              tone="amber"
              kicker="Hyperscalers & platform vendors"
              title="Your data has to move first"
              body="The AI is real, but it works only once the data lives on their side of the line."
            />
            <UseCaseCard
              tone="amber"
              kicker="AI-native SaaS"
              title="A smaller lift-and-shift"
              body="Same trade, no programme: your corrections and evals accumulate in their tenancy."
            />
          </UseCaseGrid>
          <Callout tone="indigo" fill="neutral" className="dk-gap">
            <h3>SynOS comes to the data instead.</h3>
            <p>
              Nothing is replaced, nothing is moved, and agents do real work in weeks.{' '}
              <strong>The messy legacy estate stops being the blocker and becomes the asset.</strong>
            </p>
          </Callout>
        </SlideFrame>
      ),
      notes:
        'The platforms already in the building say it more politely: bring the data to us first. Two years and a programme budget before a single agent does real work. Ours installs inside the customer’s own infrastructure and reads their systems where they already are, not a positioning choice, just what an in-tenant, model-agnostic architecture delivers. Evidence: a second enterprise committed on the same template in weeks, fully air-gapped inside their own infrastructure. No data left the building, no system was migrated.',
    },

    /* ── 6 · What we built · job one ──────────────────────────────────────
     * LIGHTLY CUT, and deliberately. This is the architecture diagram: six pillars, a harness row,
     * a guardrails strip and a systems row. Every one of those is a label (rule 2) and every one
     * stays, including all six guardrail chips and all six harness tiles. What the cut takes is
     * only the *prose inside the pillars* — each description down to its claim — and the header
     * subtitle.
     *
     * `density="compact"` STAYS here, and this is the one place in the cut where it does. Measured:
     * at the default register this slide runs 62px past the card and slide 9 runs 45px past it, with
     * the whole cut already applied. The only way to buy that back would be to drop labels, which is
     * rule 2. Two diagram slides keeping the reading register is the right trade; the other two
     * slides that were compact in the reading deck (landscape, differently) now sit at the
     * presenting scale, which is where that register change was actually worth having.
     */
    {
      id: 'architecture-today',
      variant: 'arch',
      node: (
        <SlideFrame density="compact" stage={false} variant="arch">
          <SlideHeader
            eyebrow="What we built · job one, today"
            eyebrowTone="indigo"
            title="One environment under the chaos, built once for the whole enterprise."
            subtitle="Engineering sets the rails once. After that everyone, non-coders included, builds real work on top of them."
          />
          <HarnessRow
            label="Your teams keep their own AI tools, connected through MCP"
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
            title="SynOS · The Human-Agent Operating Layer"
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
                desc="A living map of how your company operates: entities, relations, citations. Sharper with every run."
              />
              <PillarCard
                icon={IconLoop}
                tone="violet"
                name="The Learning Loop"
                desc="Every human correction reaches every agent."
              />
              <PillarCard
                icon={IconDoc}
                tone="amber"
                name="Compounding Skills"
                desc="Authored in plain English; shared, versioned, forked."
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
      notes:
        'MCP is the open standard agents use to call tools: one interface, any model. The teams keep whatever AI tool they already use. The Learning Loop: every human correction is reviewed, promoted, and reaches every agent. Company Brain gets sharper with every run and every correction. Non-coders build and run real work from the AI tools they already have.',
    },

    /* ── 7 · The hard part ────────────────────────────────────────────────
     * The three `quote` lines are kept verbatim: they are the mono strip under each card and the
     * densest statement of the claim on the slide. The bodies above them lose their middle
     * sentences. The two Callouts hold the live/ahead split and each drop to one line, because "what
     * ships today vs what the round pays for" is a question that gets ASKED and then answered at
     * length out loud.
     */
    {
      id: 'hard-part',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The hard part we're taking on"
            eyebrowTone="indigo"
            title="Making an enterprise AI-native is a cluster of hard problems. We take the ones nobody else wants."
            subtitle={
              <>
                The one we are built to own:{' '}
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
              body="No clean schema, thirty years of drift, no migration allowed. Agents profile the systems where they sit and resolve the same entity across all of them."
              quote="no warehouse project · no schema rewrite · nothing leaves the building"
            />
            <StepCard
              num="KEEP IT ALIVE"
              title="A company brain that survives the data shifting underneath it."
              body="Static extraction rots in weeks. The brain re-profiles, re-resolves and re-cites as the systems change."
              quote="living context · cited · continuously updated"
            />
            <StepCard
              num="MAKE IT TRAINABLE"
              title="The trace and eval loop that turns work into training data."
              body="Governed access through tools, CLIs and APIs; every run traced; every human correction captured for review."
              quote="traces + corrections + private evals → their dataset, on their infra"
            />
          </StepGrid>
          <Columns className="dk-gap">
            <Callout tone="emerald" label="Live today">
              Profiling and the capture loop ship today.{' '}
              <strong>We're building AI that's good at building enterprise AI.</strong>
            </Callout>
            <Callout tone="amber" label="The hard problems ahead · what the pre-seed pays for">
              Turning live capture into a <strong>real training environment</strong>: private evals,
              preference-grade correction data, rollout against the real systems.
            </Callout>
          </Columns>
        </SlideFrame>
      ),
      notes:
        'Also hard, and also ours: governed integration into systems never built for it, and safe environments for AI to act on real data. Why the brain getting sharper with use matters: static extraction goes stale, and a stale brain is worse than none. Capture is accumulating in every deployment today, increasingly solved with our own specialised infra and agents. What the round pays for: the version that survives the ugliest enterprise data, then the deep end: private evals scored against their outcomes, preference-grade correction data, rollout where reads are live and writes are captured and scored, and RL where a workflow’s volume earns it. Ours to own, because only we sit on the live capture.',
    },

    /* ── 8 · The same environment, tomorrow ───────────────────────────────
     * The matrix IS the slide — five components × two tenses — so all ten cells stay (rule 2). The
     * Tomorrow row keeps its five bolded terms untouched, because those five phrases are the
     * argument. What goes is the trailing explanation in each Today cell, and one of the two
     * Callouts under it.
     */
    {
      id: 'second-job',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The same environment, tomorrow"
            eyebrowTone="violet"
            title="Nothing new gets installed. Every component starts doing a second job."
            subtitle="The pieces that make AI work inside a company are the pieces you need to train a model on how that company operates."
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
                  { text: 'Context an agent is grounded in, so answers cite the company.' },
                  { text: 'Safe, audited actions in real systems. No raw credentials.' },
                  { text: 'Somewhere a non-engineer ships an app or agent without a ticket.' },
                  { text: 'What ran, what it touched, what a person fixed afterwards.' },
                  { text: 'Did this workflow work, measured against the outcome.' },
                ],
              },
              {
                label: 'Tomorrow',
                sub: 'what the same thing becomes for training',
                cells: [
                  { tone: 'full', text: <>The <strong>grounding corpus</strong> a model is fine-tuned against.</> },
                  { tone: 'full', text: <>The <strong>action space</strong> a model is trained and tested in.</> },
                  { tone: 'full', text: <>The <strong>rollout environment</strong> where attempts run safely, over and over.</> },
                  { tone: 'full', text: <><strong>Labelled data and preference signal</strong>, from their people doing real work.</> },
                  { tone: 'full', text: <>The <strong>benchmark only they own</strong>, and the gate a candidate model has to pass.</> },
                ],
              },
            ]}
          />
          <Callout tone="indigo" className="dk-gap" label="Why this is infrastructure work">
            Not a few frontier models doing everything. Thousands of company-specific models, each
            needing somewhere to be built, grounded, run and measured.{' '}
            <strong>That environment has to be repeatable, or it does not happen at all.</strong>
          </Callout>
        </SlideFrame>
      ),
      notes:
        'Only the name of the job changes. Nothing new is installed and nothing new is bought. What is live and what the round builds: the capture layer ships today and accumulates in every deployment, because capture is the scarce part and only happens inside real work. Private evals are in build. Fine-tuning and distillation stack on top, with no rebuild and nothing new for the customer to install.',
    },

    /* ── 9 · What we're building · job two ────────────────────────────────
     * Same treatment as slide 6, same reason. All five status badges (LIVE / IN BUILD / THE ROUND
     * BUILDS) stay — on this slide the badges ARE the information — as do the six model-layer tiles,
     * the six brain contents chips and the five governance chips. Only the pillar prose is cut.
     */
    {
      id: 'architecture-training',
      variant: 'arch',
      node: (
        <SlideFrame density="compact" stage={false} variant="arch">
          <SlideHeader
            eyebrow="What we're building · job two"
            eyebrowTone="violet"
            title="The same environment, drawn as the training layer."
            subtitle="One centralised store, four things acting on it. Three of the five ship today; the round builds the last two."
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
            title="SynOS · the per-company AI training and evaluation environment"
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
                    The layer that grounds agents today is the corpus models are trained against
                    tomorrow. One store, per company, on their own infrastructure.
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
                desc="Every run traced with full lineage; every correction captured from SMEs doing real work, not an annotation vendor."
              />
              <PillarCard
                icon={IconDocCheck}
                tone="emerald"
                name={<>Rollout environment <Chip size="sm" tone="emerald">LIVE</Chip></>}
                desc="Sandboxed execution against real systems, repeatable and reversible."
              />
              <PillarCard
                icon={IconBars}
                tone="amber"
                name={<>Eval harness <Chip size="sm" tone="amber">IN BUILD</Chip></>}
                desc="Task suites from real traces, scored against the company's own outcomes."
              />
              <PillarCard
                icon={IconTune}
                tone="violet"
                name={<>Fine-tune & distillation <Chip size="sm" tone="violet">THE ROUND BUILDS</Chip></>}
                desc="Tuning on open weights, distilled per function, inside the customer's infrastructure."
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
      notes:
        'Three of the five ship today because the transformation needs them, and that is the point: phase two is not a new product, it is the same install. Rollout runs on the same permissions and kill-switch the transformation runs on. The eval harness is the gate a candidate model passes before promotion. Fine-tuning is supervised and preference tuning on open weights, trained and served inside their infrastructure.',
    },

    /* ── 10 · The play ────────────────────────────────────────────────────
     * Three phases, three cards, three `foot` lines naming the revenue at each — all kept. Bodies
     * cut to the claim. The long Caption underneath ("the order is forced…") is the founder's own
     * explanation of why entry has to come first, so it goes to notes whole.
     */
    {
      id: 'the-play',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The play"
            eyebrowTone="violet"
            title="One environment, three phases. The first pays for the rest."
            subtitle="Everyone else authors a copy of the business and trains in the copy. This one instruments the original."
          />
          <PhaseRow>
            <PhaseCard
              badge="ENTRY"
              when="Today · revenue"
              title="Unblock the knowledge work"
              body={
                <>
                  The layer installs in their cloud or fully air-gapped, and their non-engineers start
                  doing real work on it. This is the pain they're paying to fix now, and{' '}
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
                  outcomes. That is a{' '}
                  <strong>per-company AI training environment</strong>.
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
                  <strong>models the company owns</strong>. We operate the layer it lives on.
                </>
              }
              foot="the operating layer of the agent-native enterprise"
            />
          </PhaseRow>
        </SlideFrame>
      ),
      notes:
        'The environment that makes AI work today is the one they need to train their own models tomorrow. Entry is how the position gets earned, and the order is forced: capture is the scarce part and it only happens inside real work, which is why the entry motion is the only way to earn the position the rest depends on, and it happens to be where the budget is today. What that makes us: an AI-infrastructure play. Transformation is the entry motion; forward-deployed is only the delivery mechanics. One layer, three tenses, not three businesses. Phase two work runs in the tools they already use, against their own systems, and needs no second procurement.',
    },

    /* ── 11 · How trust is earned ─────────────────────────────────────────
     * The three rungs and their live/round status chips are the ladder and stay. Each body drops to
     * one sentence. The Callout keeps its first and last sentences — "the same ladder onboards both
     * generations" is the reason the slide is in the deck at all.
     */
    {
      id: 'trust-ladder',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="How trust is earned"
            eyebrowTone="indigo"
            title="AI earns autonomy here the way a new team member does."
            subtitle="Nobody hands a new hire the keys on day one. The environment makes that graduation explicit."
          />
          <StepGrid>
            <StepCard
              num="01 · Rehearse"
              title="Sandboxes cut from the real systems."
              body={
                <>
                  Practice inside the customer's environment with no blast radius: dry-runs, scanned
                  deploys, rehearsal copies. <Chip size="sm" tone="emerald">live today</Chip>
                </>
              }
            />
            <StepCard
              num="02 · Work, supervised"
              title="Real work, human sign-off."
              body={
                <>
                  Approval gates, every run traced, every correction captured.{' '}
                  <strong>This is where the training data comes from</strong>: supervised real work,
                  not a replica. <Chip size="sm" tone="emerald">live today</Chip>
                </>
              }
            />
            <StepCard
              num="03 · Autonomous, audited"
              title="Runs alone once the evals clear their bar."
              body={
                <>
                  Private evals decide the promotion. Kill switch and full audit stay on; authority is
                  revocable. <Chip size="sm" tone="amber">evals & mandates · the round builds</Chip>
                </>
              }
            />
          </StepGrid>
          <Callout tone="indigo" fill="neutral" className="dk-gap">
            <strong>The same ladder onboards both generations of their AI.</strong> The onboarding
            record of every review, every correction and every outcome,{' '}
            <strong>is the curriculum their models train on</strong>.
          </Callout>
        </SlideFrame>
      ),
      notes:
        'For agents on frontier models today, and for the company’s own models tomorrow. Rehearsal copies are possible because the environment already knows their systems. A practice room, not the curriculum. Corrections come from the person who owns the process. Promotion is scored against their outcomes, not a public benchmark; circuit breakers and re-checks stay on afterwards. That is why the unblocking work and the training ground are one environment, not two products.',
    },

    /* ── 12 · Why it compounds ────────────────────────────────────────────
     * The loop diagram carries this slide, so everything textual around it is cut to one Caption:
     * the design-partner proof plus the one sentence the whole deck turns on ("data the model can
     * never train on"). The status Callout goes to notes — it is the answer to a question, not a
     * thing to project.
     */
    {
      id: 'compounds',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Why it compounds"
            eyebrowTone="violet"
            title="The moat is the loop: the record of how your company works, not the model."
            subtitle="Humans correct. Agents act. Systems return the measured outcome. Every turn builds data no public model can ever train on."
          />
          <Loop />
          <Caption className="dk-gap-sm">
            Live today at a martech design partner: every marketer correction feeds one learning layer.{' '}
            <strong>It accrues to the customer, on their infrastructure.</strong>
          </Caption>
        </SlideFrame>
      ),
      notes:
        'And it pays off whichever model wins. Where we are: the capture layer, meaning tracing and corrections and agent-native storage, is live and accumulating in every deployment. Private evals are in build; fine-tuning on the loop is the layer after that. Built data-first on purpose, because capture is the scarce part and training stacks on top with no rebuild. Full flywheel is in the appendix.',
    },

    /* ── 13 · Who buys ────────────────────────────────────────────────────
     * Five cards on this slide already, so the intro Callout above them goes entirely to notes and
     * the three triggers cut to their tell. The two buyer cards keep their kickers — "who signs" and
     * "who wins day one" is the distinction the slide exists to draw.
     */
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
                The ones that <strong>buy rather than build</strong>, with a mandate they can't fulfil
                internally. Every deal we've closed fits this shape.
              </>
            }
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="red"
              kicker="Trigger · capacity"
              title="Thin AI bench"
              body="AI/ML req open for months or re-posted; few or no ML titles; senior hires with no bench behind them."
            />
            <UseCaseCard
              tone="red"
              kicker="Trigger · failed build"
              title="Attempted, hasn't shipped"
              body="An AI initiative announced 6-12 months ago with nothing shipped, or a platform build that stalled."
            />
            <UseCaseCard
              tone="red"
              kicker="Trigger · posture"
              title="Buy-first procurement DNA"
              body="An organisation that has always bought its systems. It will buy this one too."
            />
          </UseCaseGrid>
          <Columns className="dk-gap">
            <UseCaseCard
              tone="indigo"
              kicker="Who signs · the owner of the mandate"
              title="Business or product leadership, with CEO air-cover"
              body="The person accountable for the AI outcome, not the VP Eng being asked to build it."
            />
            <UseCaseCard
              tone="violet"
              kicker="Who wins day one · the SMEs"
              title="The people who hold the knowledge"
              body="Ops, sales, marketing, finance and support author the agent workflows themselves, in plain English."
            />
          </Columns>
        </SlideFrame>
      ),
      notes:
        'Not the eng-heavy tech companies. They own the domain expertise and the customer relationships, held by people who do not write code. What they lack is the engineering capacity to turn any of it into agents, and that gap closes only if the non-engineers can build and run on the layer themselves. Enterprise AI licences are being cancelled at renewal because integration proved harder than it was sold as. Where an eng-heavy company would build and stall, a buy-first one buys. Budget follows the mandate.',
    },

    /* ── 14 · The wedge ───────────────────────────────────────────────────
     * Each door keeps its claim and its evidence line and loses its middle item — the buyer/expansion
     * detail is exactly what gets said out loud in answer to "who do you sell to". The four-step
     * chip flow is a diagram and stays whole. The "why this is one company" Callout and the FDE
     * Caption both go to notes.
     */
    {
      id: 'the-wedge',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="The wedge"
            eyebrowTone="indigo"
            title="Two doors into the same layer. One qualifier opens both."
            subtitle="The same buyer feels it in two directions: outward at their product, inward at their operations."
          />
          <SplitColumns>
            <SplitColumn
              tone="indigo"
              eyebrow="Door 1 · outward · their product"
              title="Agentic transformation of their SaaS."
            >
              <SplitItem>
                Their competitors shipped AI features; their own platform build stalled. We make their
                product agent-native <strong>in their own tenancy</strong>.
              </SplitItem>
              <SplitItem>
                Evidence today:{' '}
                <strong>a martech platform. POC successful, moving to a paid client pilot.</strong>
              </SplitItem>
            </SplitColumn>
            <SplitColumn
              tone="violet"
              eyebrow="Door 2 · inward · their operations"
              title="A company brain their non-engineers can build on."
            >
              <SplitItem>
                Internal automation is blocked on engineering. We put the layer in and the{' '}
                <strong>SMEs author the agent workflows themselves</strong>.
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
          <ChipRow center className="dk-gap">
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
        </SlideFrame>
      ),
      notes:
        'Same substrate, same buyer shape, same paid-POC contract. Door 1 buyer: the AI/product owner carrying the roadmap, with CEO sponsorship; expansion path is their clients, one at a time, on one substrate: the enterprise-readiness layer they would otherwise spend two years building. Door 2 enters at whatever hurts most today: a cost line, a sales-ops queue, a marketing pipeline. The pain is the entry point; the brain is the product. Engineering just sets the rails once. Why this is one company, not two: both doors deploy the identical substrate: in-tenant deployment, governed writes back to the systems of record, and the per-customer record of corrections that compounds. Nothing forks; a door is a sales entry point. Delivery compounds, and that is what keeps it a platform: an FDE pair, a domain expert plus a forward-deployed engineer, lands each account and runs the engagement on SynOS itself, so engagement N costs a fraction of engagement 1 and every one mints reusable brains and skills. Pipeline: founder-led and advisor networks, design-partner referrals, embedded distribution, content and open-source inbound.',
    },

    /* ── 15 · Traction ────────────────────────────────────────────────────
     * LIGHTLY CUT. This is the evidence slide and the details ARE the evidence — "two weeks", "300
     * columns", "no documentation", "post-POC pricing agreed" are the specifics an investor tests
     * the claim against, and a version that says "three engagements, going well" is worth nothing.
     * Only connective tissue comes out.
     */
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
                title="A manufacturing enterprise: a Cloud FinOps Brain, plus agents that take critical DevOps actions."
                body={
                  <>
                    Cloud-cost knowledge lived in a few engineers' heads. It moves onto the layer:
                    billing data and people on one Company Brain, cited answers in plain English, every
                    correction captured once.{' '}
                    <strong>Committed paid monthly POC, kickoff underway</strong>, and the expansion
                    conversation is already about the next function.
                  </>
                }
              />
              <Caption mono>
                committed paid monthly POC · Cloud FinOps Brain + DevOps agents · expansion in discussion
              </Caption>
            </div>
            <Stack>
              <UseCaseCard
                tone="emerald"
                kicker="Door 2 · committed paid POC · air-gapped on-prem"
                title="A US software company"
                body="The same landing template, reused for a second close two weeks later, fully inside their own infrastructure. Post-POC pricing agreed."
              />
              <UseCaseCard
                tone="emerald"
                kicker="Door 1 · agentic SaaS transformation · POC successful"
                title="A martech SaaS platform"
                body={
                  <>
                    Four months on a warehouse-native assistant had not produced what they needed; ours
                    ran in <strong>two weeks</strong>, on raw data of about 300 columns with no
                    documentation. Moving to a paid pilot with their own clients.
                  </>
                }
              />
            </Stack>
          </Columns>
          <Columns className="dk-gap">
            <Callout tone="emerald" label="Live & demo-able today">
              Company Brain · access controls · agent-native storage · app deploy from Claude Code ·
              any AI tool via MCP · triggers · observability.
            </Callout>
            <Callout tone="amber" label="Roadmap">
              Fine-tuning and deeper capture for custom / distilled models. The data is being captured
              today; training is the next layer.
            </Callout>
          </Columns>
        </SlideFrame>
      ),
      notes:
        'Agents carry the DevOps actions on the same rails as the FinOps brain. The martech platform’s product was made agent-native on our rails after their own platform build stalled. The US software company is the reuse proof: same template, second close, two weeks later, air-gapped.',
    },

    /* ── 16 · Business model ──────────────────────────────────────────────
     * The three rungs keep their `foot` lines, which name the revenue. Bodies cut to one sentence
     * each. Both Callouts go to notes: "why not per seat" is an objection answered out loud, not a
     * thing to read while it is being answered.
     */
    {
      id: 'business-model',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Business model"
            eyebrowTone="violet"
            title="Priced like infrastructure, because that's what it is."
            subtitle="Platform fee on the footprint the environment covers, never per seat, because per-seat pricing punishes the thing we sell."
          />
          <PhaseRow>
            <PhaseCard
              when="Land · today"
              title="Paid POC → annual platform licence."
              body="Live in weeks on one expensive workflow. Converts to a licence priced on the data footprint the environment covers."
              foot="platform licence + deployment · grows with footprint, not headcount"
            />
            <PhaseCard
              position="bridge"
              when="Expand · the margin story"
              title="Licence grows. Delivery cost falls."
              body="Each new function lands on rails already built. That widening gap is what makes this a platform business, not a services one."
              foot="the number we hold ourselves to: delivery cost per engagement, falling"
            />
            <PhaseCard
              position="far"
              when="Phase two · stacks on the same install"
              title="The training layers become revenue lines."
              body="Private eval suites, then fine-tuning and distillation runs. Sold onto an environment already installed and already trusted."
              foot="evals · training runs · model ops, on the environment phase one paid for"
            />
          </PhaseRow>
        </SlideFrame>
      ),
      notes:
        'The revenue ladder is the play restated in money. The thing we sell is more of the company on the layer, which is exactly what per-seat pricing punishes. Why not per seat: agents do not hold seats, and the buyer’s win condition is more people and more agents on the layer, so the price follows the footprint of what the environment knows and governs, and our revenue grows exactly when the customer gets more value. Where it points: as the layer proves what work produces, pricing moves toward outcomes. Pricing an outcome is underwriting, and you can only underwrite a business you understand, which is precisely what the environment accumulates. No second procurement mountain for phase two.',
    },

    /* ── 17 · Landscape ───────────────────────────────────────────────────
     * The 6×5 matrix stays entirely — every cell is a competitive claim and the row labels are the
     * six bands being argued over (rule 2). Underneath it, the reading deck carries a ~200-word
     * Callout: the longest single block in the deck. It goes to notes whole and is replaced by the
     * one line it was arguing for.
     */
    {
      id: 'landscape',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Landscape"
            title="Everyone owns one band. Nobody owns the three in the middle."
            subtitle="Different categories doing different jobs, each good at its own. The gap between a company's systems and the AI its people already have is the part none of them was built for."
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
                  { tone: 'partial', text: 'fine-tuning too, once your data lives in theirs' },
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
          <Caption className="dk-gap-sm">
            <strong>One data layer, two jobs.</strong> The Company Brain grounds every answer today,
            and the traces, corrections and evals it captures doing that are tomorrow's training data.
            The environment is the part nobody else produces.
          </Caption>
        </SlideFrame>
      ),
      notes:
        'Around the Brain: an identity and permission model an agent can act through, and somewhere isolated to build and deploy. The data platforms own the bottom band and ask you to move everything into it first. Search reads a copy. Workflow tools execute without knowing what anything means. We deliberately do not touch your existing systems of record, and we do not need to own the tools your people already use. What your people build new gets an agent-native store inside the same environment, on your infrastructure, yours like everything else it accumulates, so the AI-era workflows never need a second procurement. Governance is the permission to act; isolation is where a rollout can safely run. Built once for the transformation, and together with the Brain they are the place a company trains models of its own. The training compute underneath stays pluggable: Prime Intellect, Fireworks, or their own GPUs, the same neutrality we hold toward models.',
    },

    /* ── 18 · How we build differently ────────────────────────────────────
     * LIGHTLY CUT on the quotes, hard on the bodies. The two customer verbatims are kept whole:
     * they are the only two places in the deck where a buyer says the thesis in their own words,
     * and paraphrasing a quote to save a line destroys the thing that makes it evidence.
     */
    {
      id: 'differently',
      node: (
        <SlideFrame stage={false}>
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
                  for the handover. A firm that bills for embedded engineers cannot copy this without
                  cutting its own revenue; a multi-tenant platform cannot, because the learning lives
                  in its product.
                </>
              }
              quote="A martech platform said it back to us: “if tomorrow the customer says we don’t want to continue, fine, we exit, but that data stays with us. You can’t take my structured data which I have curated.”"
            />
            <StepCard
              num="02 · Instrumented, not simulated"
              title="They author a copy and learn in the copy. We instrument the original."
              body={
                <>
                  Training environments are a funded category: Mercor, Fleet, Prime Intellect. Every
                  one of them{' '}
                  <strong>authors a replica of your business and trains in the replica</strong>, and a
                  replica cannot hold twelve years of exceptions in one company's order-to-cash.
                </>
              }
              quote="Why the order is forced: capture only happens inside real work. And the pull is cost. A lending platform’s data lead: “it’s exorbitant, the amount of tokens you consume; it just makes it unfeasible.”"
            />
            <StepCard
              num="03 · Horizontal surface, vertical delivery"
              title="One expensive workflow at a time, on one layer."
              body="Every engagement lands a single high-value piece of knowledge work with an ROI the buyer can name. The layer underneath is the same one every time."
              quote="This is what makes it infrastructure rather than a services business, and the automation curve is how we prove it."
            />
          </StepGrid>
          <Callout tone="amber" fill="neutral" className="dk-gap" label="What we don't claim as an edge">
            A context layer, non-engineers building agents, bring-your-own-model, private-cloud and
            air-gapped deployment, forward-deployed delivery. Every serious vendor now has these.
          </Callout>
        </SlideFrame>
      ),
      notes:
        'The handover in detail: engineering keeps the rails, their domain experts operate and correct, and the record of how the company works stays on their side of the wall. Prime Intellect sells the gym at a $1B valuation; Mercor and Fleet sell mocks to the labs. Even the ones that deploy the copy in your cloud are still training in a copy. Ours is their own systems, instrumented during real work, with rewards from real corrections and outcomes, only possible because we were already doing the transformation. In phase two the gym vendors sit under us, not against us. The second function costs less than the first and the tenth costs least of all. And a room that hears the commodity list pitched as differentiators learns something about the pitch rather than the product.',
    },

    /* ── 19 · If models get better ────────────────────────────────────────
     * The three `foot` lines are compressed arrows and carry the whole argument, so they stay and
     * the bodies above them cut to one sentence. The closing Caption is two short sentences and the
     * slide's punchline — kept.
     */
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
                needs to know how the company operates and what it may touch.
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
                  Each jump raises what an enterprise will hand over.{' '}
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
                  Each jump moves more of what the forward-deployed engineer does into the platform,
                  until delivery is agentic. <strong>Cost per outcome falls.</strong>
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
                  <strong>Model progress shortens the distance to what we are building for.</strong>
                </>
              }
              foot="capability ↑ → the next phase arrives sooner, on the same environment"
            />
          </PhaseRow>
          <Caption className="dk-gap">
            None of this asks you to bet that model progress slows down.{' '}
            <strong>It asks you to bet that it continues.</strong>
          </Caption>
        </SlideFrame>
      ),
      notes:
        'The test for built capital: take any one model away, and the company’s capability survives, because it was never built into the model. Every agent still needs the brain, the policies, the tools and something to evaluate against. Today the motion is platform plus a forward-deployed engineer; the platform carries the growth as that work automates. And betting that progress continues is the only part of this everyone in the room already agrees on.',
    },

    /* ── 20 · Why us ──────────────────────────────────────────────────────
     * Three cards, three disciplines, one line each — the names (Sundial, Nutanix, Google) do most
     * of the work and the room reads them in two seconds. Of the three Callouts, only the one that
     * is a claim about the business survives; the FDE and geography notes are answers to questions.
     */
    {
      id: 'why-us',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Why us"
            eyebrowTone="indigo"
            title="This layer sits at the intersection of three disciplines. We have all three."
            subtitle="Most teams attacking this problem have one of the three."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="violet"
              kicker="Data & agentic analytics"
              title="Sundial"
              body="Founder was CTO: built agentic analytics and semantic layers, and transformed a SaaS product to be AI-native."
            />
            <UseCaseCard
              tone="indigo"
              kicker="On-prem enterprise infra"
              title="Nutanix"
              body="Eight years on distributed data systems. Air-gapped installs, upgrade paths, correctness with nobody watching."
            />
            <UseCaseCard
              tone="emerald"
              kicker="Enterprise go-to-market"
              title="Google"
              body="Amit, ex-Google, anchors go-to-market with strong India and SEA reach."
            />
          </UseCaseGrid>
          <Callout tone="indigo" fill="neutral" className="dk-gap">
            <strong>We run SynOS on SynOS</strong>. Our own GTM, research and operations run as agents
            on the layer. It's why, four months in, there's a live platform and three committed
            engagements.
          </Callout>
        </SlideFrame>
      ),
      notes:
        'The three disciplines: agentic analytics and semantic layers; on-prem enterprise infrastructure; enterprise go-to-market in this region. Hiring from the same three pools is the first line in the use of funds. Delivery is an FDE model: a domain expert plus a forward-deployed engineer. That embedded work is the wedge; revenue scales with the platform, not with hours billed, and what the FDE team learns becomes brains and skills on the platform. India first, US in test: the buyer profile is not geography-specific, the US wedge is enterprise outside the Bay Area, and which market we scale into is an output of the GTM test.',
    },

    /* ── 21 · The round ───────────────────────────────────────────────────
     * The five outcome Tiles are the ask restated as a checklist and stay whole — this is the slide
     * an investor photographs. Card bodies cut to one sentence; the closing Caption goes to notes.
     */
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
              body="Engineering deep enough to own the messy-data problem, go-to-market, and domain SMEs who can run an FDE pair."
              foot="the team is the use of funds"
            />
            <PhaseCard
              position="bridge"
              badge="02"
              when="Six months, in parallel"
              title="India GTM at scale, US GTM opened"
              body="Scale the India motion that is already converting; open the US through enterprise outside the Bay Area."
              foot="one entry wedge, chosen on evidence"
            />
            <PhaseCard
              position="far"
              badge="03"
              when="Stacks on what ships"
              title="R&D: the fine-tuning infra and environment"
              body="Private eval suites hardened first, then fine-tuning and distillation on top of the capture already running."
              foot="phase one funds it, phase two compounds it"
            />
          </PhaseRow>
          <Callout tone="emerald" fill="neutral" className="dk-gap" label="What is true when this round is spent">
            <TileRow>
              <Tile size="sm" tone="emerald" name="Revenue" kind="Committed contracts paid and referenceable" />
              <Tile size="sm" tone="emerald" name="Repeatability" kind="Delivery cost per engagement instrumented, falling" />
              <Tile size="sm" tone="emerald" name="Product" kind="Eval + fine-tuning infra live on real capture" />
              <Tile size="sm" tone="emerald" name="Phase-two proof" kind="First training run on one customer's own data" />
              <Tile size="sm" tone="emerald" name="Geography" kind="India motion scaled; first US logo outside the Bay Area" />
            </TileRow>
          </Callout>
        </SlideFrame>
      ),
      notes:
        'Hires are the binding constraint on everything else. The three GTM routes carry kill thresholds written before the data, then we concentrate. R&D is what turns the transformation environment into the one they build their own AI in. What it buys, plainly: a team, a proven way to repeat the deals we already have, and the layer that makes the second phase real. Terms and the current round structure on a call.',
    },

    /* ── 22 · Closing wordmark ────────────────────────────────────────────
     * The seam, the two lines and the ask. The explanatory paragraph under the diagram goes to
     * notes; the tagline stays because it is the one place the qualifiers (self-hosted,
     * model-agnostic, yours) are listed at the end, and somebody photographs this slide.
     */
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
        </BigTypeSlide>
      ),
      notes:
        'The layer where humans, AI and systems work at light speed, creating value at the edge of what current AI capabilities can achieve.',
    },

    /* ── 23 · Appendix divider ────────────────────────────────────────────
     * A divider's job is to say "the deck ended, ask me anything". The list of what is in the
     * appendix is for the reader of a sent deck; the presenter has it in notes and turns to the
     * slide that gets asked for.
     */
    {
      id: 'appendix-divider',
      variant: 'bigType',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="End of the main deck"
          line1="Appendix"
          line2={<span className="sk-gradient-text">Detail on request.</span>}
          tagline="Security and readiness overview, architecture deep-dive and a live demo available on a call."
        />
      ),
      notes:
        'In the appendix: what runs on the layer, the status of the two doors, where value gets created at the edge of model capability, the market evidence, the SaaS shift, plain-English build and deploy, the full data flywheel, the landscape in detail, and the open-source memory audit.',
    },
  ]
}

/**
 * The slides where the hard cut was pulled back, and why. Recorded rather than absorbed, because
 * "cut hard, unless" is only honest if the exceptions are countable.
 *
 *   today       the subtitle names the three things the seam diagram draws. Cutting it leaves an
 *               unlabelled picture — rule 2.
 *   arch (x2)   labels are the content. The cut came out of the pillar prose only; every chip,
 *               tile, badge and guardrail is intact.
 *   traction    the specifics ARE the evidence: two weeks, ~300 columns, no documentation, post-POC
 *               pricing agreed. A vaguer traction slide is a weaker one.
 *   differently the two customer verbatims are kept whole. A paraphrased quote is not a quote.
 */
export const LIGHTLY_CUT = ['today', 'architecture-today', 'architecture-training', 'traction', 'differently']
