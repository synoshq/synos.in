/**
 * Slides 24–35 of `synos-vc-deck-v6.html` — the appendix, every eyebrow prefixed `Appendix ·`.
 *
 * Same rule as `slides-main.jsx`: the text is the source deck's, copied. See that file's header.
 */
import { Fragment } from 'react'
import { EdgeDiagram } from './diagrams.jsx'

export const appendixSlides = (K) => {
  const {
    SlideFrame,
    SlideHeader,
    Eyebrow,
    Callout,
    Chip,
    ChipRow,
    PillarCard,
    PillarGrid,
    PhaseCard,
    PhaseRow,
    UseCaseCard,
    UseCaseGrid,
    StatCard,
    StatRow,
    StepCard,
    StepGrid,
    SplitColumns,
    SplitColumn,
    SplitItem,
    WallCard,
    WallGrid,
    Caption,
    QuoteBar,
  } = K

  return [
    /* ── 24 · Appendix · What it is ───────────────────────────────────────
     * `.stk` is a three-band stack: a chip row, a five-cell slab, another chip row. Composed from
     * Eyebrow + ChipRow + a neutral Callout holding a five-column PillarGrid. PillarGrid's
     * `columns` prop is the one place the kit lets a caller set a track count, and it is the only
     * reason this slide did not need `.dk-matrix`. */
    {
      id: 'apx-what-it-is',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · What it is"
            eyebrowTone="indigo"
            title="One environment, under everything your teams already use."
            subtitle={
              <>
                Your teams go on building agents wherever they do today. SynOS is the environment{' '}
                <em>underneath</em> them, so the company gets one governed place where its AI runs,
                learns and is measured.
              </>
            }
          />
          <Eyebrow tone="muted">Where agents get built · whatever your teams already use</Eyebrow>
          <ChipRow center>
            {['Claude Code', 'Codex', 'Cursor', 'n8n', 'Copilot', 'your own apps'].map((c) => (
              <Chip key={c} size="lg" mono>{c}</Chip>
            ))}
          </ChipRow>
          <Callout
            tone="indigo"
            fill="neutral"
            accent="none"
            className="dk-gap-sm"
            label="SynOS — one self-hosted layer · installed once · model-agnostic"
          >
            <PillarGrid columns={5}>
              <PillarCard name="Company Brain" tone="violet" desc="self-curating, not static RAG" />
              <PillarCard name="Deploy & share" tone="emerald" desc="sandboxed, governed, no ticket" />
              <PillarCard name="Access & permissions" tone="red" desc="agents acting on behalf of people" />
              <PillarCard name="Agent-native storage" tone="indigo" desc="where agent output actually lives" />
              <PillarCard name="Evals & observability" tone="amber" desc="every run traced and improvable" />
            </PillarGrid>
          </Callout>
          <div className="dk-gap-sm">
            <Eyebrow tone="muted">Your systems of record · structured and unstructured</Eyebrow>
            <ChipRow center>
              {['Warehouses', 'SaaS apps', 'Internal data stores', 'ERP', 'Communication layers', 'Docs & wikis'].map(
                (c) => (
                  <Chip key={c} size="lg" mono>{c}</Chip>
                ),
              )}
            </ChipRow>
          </div>
          <Callout tone="indigo" fill="neutral" className="dk-gap-sm">
            Every enterprise going agent-native ends up building these same five things internally,
            separately and slowly.{' '}
            <strong>
              A martech platform spent four months on a platform build that never shipped. Three India
              tech majors went build-first and still aren't in production.
            </strong>{' '}
            That work is the product.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 25 · Appendix · Status ───────────────────────────────────────────
     * `.stat-card` → StatCard exactly (`.n` → value, `.l` → label, `.s` → source). StatRow is a
     * three-column grid and this slide wants two, so the track count is overridden inline — the
     * kit has no columns prop on StatRow. */
    {
      id: 'apx-status',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · Status"
            eyebrowTone="indigo"
            title="Both doors have converted. The next quarter picks the one we scale."
            subtitle={
              <>
                Demand is real on either side, and the criteria are written down before the data:{' '}
                <strong>one entry wedge</strong>, then repeated deliberately.
              </>
            }
          />
          <StatRow style={{ gridTemplateColumns: '1fr 1fr' }}>
            <StatCard
              tone="violet"
              value="1"
              label={<>account through <strong>Door 1</strong>. The POC succeeded and it is moving to a paid client pilot.</>}
              source="OUTWARD · PRODUCT"
            />
            <StatCard
              tone="indigo"
              value="2"
              label={
                <>
                  accounts through <strong>Door 2</strong>. Both committed to paid contracts, and the
                  landing template was reused for the second close two weeks after the first.
                </>
              }
              source="INWARD · OPERATIONS"
            />
          </StatRow>
          <Callout tone="indigo" fill="neutral" className="dk-gap">
            <h3>We decide on evidence rather than instinct, and the criteria are written down before the data.</h3>
            <p>
              The gate we are running to:{' '}
              <strong>
                which door produces a second customer from the same template with materially less
                delivery effort than the first
              </strong>
              , and <strong>which one expands inside the account without new engineering</strong>. That
              is the door that gets the spend. A pre-registered demand test with kill thresholds runs
              alongside the live POCs, with control arms that isolate what sells cold.
            </p>
          </Callout>
          <Caption className="dk-gap-sm">
            The live POCs <strong>are</strong> the experiment, so the answer comes out of the
            deployments rather than ahead of them. The same playbook is being run in the US and in
            India in parallel, so the market is an output of the test too.{' '}
            <strong>We expect to know by the end of Q3.</strong>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 26 · Appendix · Where value gets created now ─────────────────────
     * A bespoke SVG on the left, three `.edge-pt` blocks on the right → Callouts. `.edge-quote`
     * → QuoteBar, which is exactly what QuoteBar is for. */
    {
      id: 'apx-edge',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · Where value gets created now"
            eyebrowTone="indigo"
            title="New value is created at the edge of what models know."
            subtitle="Humans and agents, working together on one layer, create what no model holds, and everything they create teaches your AI. Humans move at AI speed; your AI learns your company."
          />
          <div className="dk-cols dk-cols--54">
            <EdgeDiagram />
            <div className="dk-stack">
              <Callout tone="indigo" fill="neutral" label="Humans get faster">
                Knowledge work runs at AI speed, on the company's own context rather than generic
                answers.
              </Callout>
              <Callout tone="emerald" label="The edge is yours alone">
                What's created at the boundary, meaning decisions, corrections and outcomes, exists in
                no model and no competitor.
              </Callout>
              <Callout tone="violet" label="Creating value makes your AI better">
                Every piece of edge-work feeds the loop: your agents, skills and brain sharpen with the
                work itself.
              </Callout>
            </div>
          </div>
          <QuoteBar className="dk-gap-sm">
            "You can offload a task, or even a job — <strong>you can never offload your learning.</strong>"
            As models commoditize expertise, the durable advantage moves from the model to the learning
            loop you own. — <strong>Satya Nadella, 2026</strong>
          </QuoteBar>
        </SlideFrame>
      ),
    },

    /* ── 27 · Appendix · Why now ──────────────────────────────────────────
     * Three StatCards, a Callout, a Caption. The cleanest appendix slide in the deck. */
    {
      id: 'apx-why-now',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · Why now"
            eyebrowTone="indigo"
            title="Enterprises are all trying this. Most fail the same way."
            subtitle="The failure mode is universal, and it names exactly the layer we sell."
          />
          <StatRow>
            <StatCard
              tone="indigo"
              value="40%"
              label='of agentic AI projects will be cancelled by 2027. "Agent sprawl," and the integration cost is never in the pilot budget.'
              source="GARTNER · 2025"
            />
            <StatCard
              tone="violet"
              value="95%"
              label="of enterprise GenAI pilots deliver no P&L impact. The gap is the learning and integration layer rather than model quality."
              source="MIT · 2025"
            />
            <StatCard
              tone="amber"
              value="68%"
              label="of employees already use AI tools without IT approval; only ~10% of F500 have any agent-governance strategy."
              source="CSA · 2026"
            />
          </StatRow>
          <Callout tone="indigo" fill="neutral" className="dk-gap">
            <h3>And the model future is hybrid, including open-source.</h3>
            <p>
              ~80% of enterprise use cases already run well on open-source and smaller fine-tuned
              models. Enterprises will mix frontier, open-weight and their own fine-tuned models, for
              cost, sovereignty and control. Every mix needs the same two things:{' '}
              <strong>a model-agnostic layer, and the company's own data as fuel.</strong> That's us,
              twice.
            </p>
          </Callout>
          <Caption className="dk-gap-sm">
            Vendor-built platforms succeed <strong>2× as often</strong> as internal builds (MIT). The
            layer is the missing product.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 28 · Appendix · The shift ────────────────────────────────────────
     * `.moat-split` → SplitColumns exactly. `.nadella` → an italic Caption, which is the class
     * `Caption italic` was extracted from. */
    {
      id: 'apx-shift',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · The shift"
            eyebrowTone="violet"
            title="Every company operates differently. SaaS forced them to operate the same."
            subtitle="The old deal: buy the common 80%, bend your operations to fit it, and never get the 20% that's actually you. Agents end that deal."
          />
          <SplitColumns>
            <SplitColumn eyebrow="The old world · rented SaaS" title="You adjusted to the software.">
              <SplitItem marker="✕">One-size-fits-none workflows: your ops bent to the vendor's shape.</SplitItem>
              <SplitItem marker="✕">Seats for the common 80%; the custom 20% was never the vendor's job.</SplitItem>
              <SplitItem marker="✕">Your data and your process knowledge, held in someone else's cloud.</SplitItem>
            </SplitColumn>
            <SplitColumn tone="violet" eyebrow="The new world · on your layer" title="The software understands you.">
              <SplitItem marker="✓">
                <strong>Custom apps and always-on agents</strong> that know how <em>you</em> operate,
                described in plain English, live in days.
              </SplitItem>
              <SplitItem marker="✓">
                Built on your company's own memory, rules and corrections: the 20% you always needed,
                finally yours.
              </SplitItem>
              <SplitItem marker="✓">
                Owned by you, on your infrastructure, and it gets smarter with every use.
              </SplitItem>
            </SplitColumn>
          </SplitColumns>
          <Caption italic className="dk-gap">
            SynOS is the layer that makes <strong>custom finally cheaper than SaaS</strong>. Companies
            build software that understands them instead of adjusting to software that doesn't.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 29 · Appendix · Built on the hard layer ──────────────────────────
     * `.demo-grid` → StepGrid / StepCard, same as slide 7. */
    {
      id: 'apx-hard-layer',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · Built on the hard layer"
            eyebrowTone="indigo"
            title='Once the hard layer exists, the "magic" is just a feature.'
            subtitle={
              <>
                Use whichever agent or app builder your teams already love.{' '}
                <strong>
                  Build, deploy and share in an afternoon onto your company's shared surface
                </strong>
                , where every skill and correction compounds instead of dying on a laptop. All of that
                is easy once the memory, storage, permissions and sandboxes exist underneath. It is why
                we built the layer first.
              </>
            }
          />
          <StepGrid>
            <StepCard
              num="PLAIN ENGLISH → AGENT"
              title="Describe the job. Get an agent."
              body="A knowledge worker describes the task in plain English → it becomes a versioned skill → one click promotes it to an always-on agent with triggers, tools and guardrails."
              quote='"every Monday, check spend spikes and post to Slack" → running agent'
            />
            <StepCard
              num="PLAIN ENGLISH → APP"
              title="Describe the app. Get a live URL."
              body="Describe the dashboard or tool → it's built and deployed to a live, sandboxed URL with governed data access. No ticket, no engineering queue."
              quote="idea → working app · sandboxed · same afternoon"
            />
            <StepCard
              num="TRUST, GRADUATED"
              title="Run it → schedule it → set it free."
              body="Every automation climbs a trust ladder: run it yourself → scheduled with human review → autonomous with audit and a kill-switch. Autonomy never means unsupervised."
              quote="assisted → reviewed → autonomous · governed at every step"
            />
          </StepGrid>
          <Caption className="dk-gap-sm">
            Point solutions sell each of these as a product. On SynOS they're{' '}
            <strong>features of the layer</strong>, grounded in the company's own memory and loop.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 30 · Appendix · what runs on it ──────────────────────────────────
     * Six UseCaseCards in a UseCaseGrid, with the Company Brain as the flagship. This is the slide
     * UseCaseCard was extracted for, and it needed nothing else. */
    {
      id: 'apx-what-runs',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · what runs on it"
            eyebrowTone="emerald"
            title="One layer. Every function is a template away."
            subtitle="We enter through one wedge, but the surface underneath is the same for all of it. Every use case feeds the same Company Brain and the same loop."
          />
          <UseCaseGrid>
            <UseCaseCard
              flagship
              kicker="Flagship"
              title="Company Brain"
              body="One living memory of how the company operates. Tribal knowledge captured once, used by every team and every agent."
            />
            <UseCaseCard
              tone="violet"
              kicker="Product"
              title="Agent-native product transform"
              body="Turn an existing product into an agent-native platform on our rails. Live with a martech platform today."
            />
            <UseCaseCard
              tone="emerald"
              kicker="Functions"
              title="Function brains"
              body="Sales Ops · Marketing · FinOps / Cloud DevOps. Pre-built starting points, live in weeks, then tuned to how you operate."
            />
            <UseCaseCard
              tone="indigo"
              kicker="Operate"
              title="From the tools they already use"
              body="Claude Code, Codex, Cursor. Non-engineers author skills in plain English and operate the whole layer."
            />
            <UseCaseCard
              tone="amber"
              kicker="Build"
              title="Apps & always-on agents"
              body="Deploy governed apps and always-on agents on the same rails: sandboxed, audited, with real data access."
            />
            <UseCaseCard
              kicker="And beyond"
              title="Your domain"
              body="The layer is horizontal. Each new function or domain is a template away, on the same compounding memory."
            />
          </UseCaseGrid>
        </SlideFrame>
      ),
    },

    /* ── 31 · Appendix · the data flywheel ────────────────────────────────
     * `.fw-pipe` is five steps in a row, which PhaseCard's badge/title/body/foot shape carries —
     * but PhaseRow is a fixed three-column grid, so the track count is overridden inline. Same
     * missing `columns` prop as StatRow on slide 25. `.fw-pays` → UseCaseGrid. */
    {
      id: 'apx-flywheel',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · the data flywheel"
            eyebrowTone="violet"
            title="Every run is traced. Every trace is future training data."
            subtitle="The tracing layer shipping today is quietly building each customer's fine-tuning dataset, the raw material for their own models tomorrow. We built it data-first on purpose."
          />
          <PhaseRow style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            <PhaseCard
              badge="01 · Trace"
              title="Every run captured"
              body="Inputs, tool calls, decisions, outcome: full lineage on every agent run."
              foot="● LIVE TODAY"
            />
            <PhaseCard
              badge="02 · Label"
              title="Corrections captured"
              body="Every human correction and approval is captured and reviewed in the flow of work — the material labels are built from."
              foot="● LIVE TODAY"
            />
            <PhaseCard
              position="bridge"
              badge="03 · Eval"
              title="Private evals"
              body={<>Agents scored against <em>your</em> outcomes, not public benchmarks. Ground truth only you own.</>}
              foot="◐ IN BUILD"
            />
            <PhaseCard
              position="bridge"
              badge="04 · Dataset"
              title="Outcome-verified data"
              body="Curated per company: traces that worked, corrections that fixed, evals that prove it."
              foot="● ACCUMULATING NOW"
            />
            <PhaseCard
              position="far"
              badge="05 · Fine-tune & distill"
              title="Your own models"
              body="Custom and distilled small models for your workflows, trained on the loop and run on your infra."
              foot="◆ ROADMAP"
            />
          </PhaseRow>
          <UseCaseGrid className="dk-gap">
            <UseCaseCard
              tone="amber"
              kicker="Cost"
              title="Small models carry the routine"
              body="Distilled models run the ~80% of routine work at a fraction of frontier-token cost. The open-source future, powered by your data."
            />
            <UseCaseCard
              tone="indigo"
              kicker="Sovereignty"
              title="Your data, your models, your infra"
              body="Nothing trains a public model. Your models live in your cloud, so you can swap providers freely without losing what you've learned."
            />
            <UseCaseCard
              tone="violet"
              kicker="Moat"
              title="A dataset nobody can buy"
              body="Minted from your own operations and corrections. The one asset a competitor or a lab cannot replicate."
            />
          </UseCaseGrid>
          <Callout tone="violet" accent="none" className="dk-gap-sm">
            <strong>Where we are:</strong> the data layer (tracing, corrections, agent-native storage)
            is live and accumulating in every deployment, and the eval and training layers stack on top
            of it next. Built data-first on purpose, because{' '}
            <strong>capture is the scarce part</strong> and training needs no rebuild.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 32 · Appendix · Landscape detail ─────────────────────────────────
     * GAP. `.comp` is a six-row × three-column comparison table with a highlighted "us" row. There
     * is no table in the kit; this is `.dk-comp` in deck.css. The two footnotes are Callouts. */
    {
      id: 'apx-landscape-detail',
      dense: true,
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · Landscape detail"
            title="The categories we get compared to each unblock one piece."
            subtitle={
              <>
                We unblock humans, agents and the enterprise <em>together</em>. The honest map against
                the nearest tools, and who each was built for.
              </>
            }
          />
          <div className="dk-comp">
            <div className="dk-comp-h">You'll bucket us with…</div>
            <div className="dk-comp-h">What they unblock</div>
            <div className="dk-comp-h">What stays blocked</div>
            {[
              [
                'Eval & observability platforms',
                'agent tracing & eval tooling',
                'Scoring recorded outputs against datasets an engineer authors.',
                "No environment attached: they score what an agent said; we execute against the real systems and score what it did, authored by the SME, judged against the company's own outcomes.",
              ],
              [
                'Enterprise search & RAG',
                'knowledge retrieval products',
                'Finding documents across silos.',
                'No hands: can’t act in systems, no outcome to learn from, so the loop never starts.',
              ],
              [
                'Context / memory layers',
                'agent memory stores',
                'Memory for one agent, one app.',
                'A component, not a layer: no entity resolution across systems, no governance, no deploy, and framework lock-in.',
              ],
              [
                'Tool proxies & MCP gateways',
                'connectivity & governance pipes',
                'Governed pipes to real systems.',
                'Pipes without a brain: no shared context, no skills, nothing compounds between calls.',
              ],
              [
                'AI workflow builders',
                'low-code automation platforms',
                'Automating one defined flow.',
                'Every run starts from zero: no company brain, rigid graphs, per-vendor lock-in.',
              ],
              [
                'Agent harnesses',
                'Claude Code · Codex · Cursor',
                'A very capable individual agent.',
                'No company underneath: no shared brain, no safe data access, nowhere governed to deploy, no way to share wins.',
              ],
            ].map(([who, sub, unblock, blocked]) => (
              <Fragment key={who}>
                <div className="dk-comp-c">
                  <b>{who}</b>
                  <span>{sub}</span>
                </div>
                <div className="dk-comp-c">{unblock}</div>
                <div className="dk-comp-c">{blocked}</div>
              </Fragment>
            ))}
          </div>
          <Callout tone="violet" className="dk-gap-sm" label="SynOS · built ground-up for non-engineering knowledge work, provider-agnostic">
            The full agent & agent-data infra stack: Company Brain, permissioned access, sandboxes,
            governed deploy, and the learning loop, all under any AI tool, on your infra. Engineering
            sets the rails once; the domain experts operate on them. An agent- and data-infra play:
            every run and correction accumulates and compounds into your enterprise's own data.
          </Callout>
          <div className="dk-cols dk-cols--12 dk-gap-sm">
            <Callout tone="indigo" fill="neutral" label="Built for a different person">
              Every category above is built for engineers. The developer is the user, and the
              enterprise's domain experts are downstream of a ticket. That is the gap: the knowledge
              lives with people who cannot code, and the value only unlocks when <strong>they</strong>{' '}
              can build and run on the layer safely. Not all rivals, either: harnesses, search and
              memory tools plug into us over MCP.
            </Callout>
            <Callout tone="indigo" fill="neutral" label="Why the labs won't build it">
              It must be self-hosted, neutral across every AI tool, and made of <strong>your</strong>{' '}
              corrections: three things a model vendor structurally will not do.
            </Callout>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 33 · Appendix · who is most like us ──────────────────────────────
     * GAP. A 2×2 positioning quadrant with labelled axes. The four cells are UseCaseCards, which
     * fits — but the quadrant geometry and the two axis labels are the whole argument of the slide
     * and have no kit expression at all. `.dk-quad` in deck.css. */
    {
      id: 'apx-quadrant',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · who is most like us"
            title="Everyone lands the same way. Almost nobody leaves."
            subtitle="Context layers, non-engineer authoring and forward-deployed delivery are table stakes now. What separates vendors is what the customer owns and operates a year later."
          />
          <div className="dk-quad">
            <div className="dk-quad-y">↑ the learning stays in your company · in the vendor's product ↓</div>
            <div className="dk-quad-grid">
              <UseCaseCard
                title="Sovereign, but still delivered to you"
                kicker="Cohere North · Conduct · Eragon · Sarvam"
                body="Runs on your infrastructure, sometimes air-gapped. Their people build it and their people keep running it."
              />
              <UseCaseCard
                flagship
                title="Yours to operate"
                kicker="SynOS — then: they train their own models on it"
                body="We install the layer, land the first workflow, then hand the controls to their domain experts and step back. What accumulates is theirs."
              />
              <UseCaseCard
                title="Outcome delivered, vendor stays"
                kicker="Distyl · Sierra · Decagon · Ema · Moveworks · the SIs"
                body="Excellent products. Engineers embedded for the contract, or an outcome bought per vertical. Nothing transitions to the customer."
              />
              <UseCaseCard
                title="You operate it, the learning doesn't stay"
                kicker="UnifyApps · Dust · Glean · Workato · n8n"
                body="Real platforms your team runs. Multi-tenant by design, so what your company teaches it lives in their product, not yours."
              />
            </div>
            <div className="dk-quad-x">
              <span>← A solution delivered to you</span>
              <span>Infrastructure your own people run →</span>
            </div>
          </div>
          <Callout tone="violet" flush className="dk-gap-sm">
            <strong>The top right is empty, and it is hard to move into.</strong> Reaching it needs a
            delivery model that lets the vendor withdraw and an architecture where the corrections live
            on the customer's side. The firms on the left bill for the people who stay. The platforms
            below are multi-tenant, so the learning cannot sit with one customer.
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 34 · Appendix · the walls, up close ──────────────────────────────
     * WallGrid / WallCard, six of them, `.w-q` → quote and `.w-t` → tag. The most exact map in the
     * corpus — the wall is the only body block that appears six times in every deck. */
    {
      id: 'apx-walls',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · the walls, up close"
            eyebrowTone="red"
            title="Enterprises handed agents to everyone. The floor gave way."
            subtitle={
              <>
                They got the tools without company knowledge or safe rails.{' '}
                <strong>
                  Every wall below is an engineering problem standing between a domain expert and their
                  own work
                </strong>
                , and everything built for this market assumes that person is an engineer.
              </>
            }
          />
          <WallGrid>
            <WallCard quote='"I built an app. Now deploy and share it."' tag="No safe, sandboxed host. Engineering blocks it." />
            <WallCard quote='"I wrote a skill. Can I share it across teams?"' tag="No reuse. No self-improvement. No visibility." />
            <WallCard quote={'"Where does my agent\'s output live?"'} tag="Random Sheets & DMs. No governed storage." />
            <WallCard quote='"My skill needs the warehouse & SaaS data."' tag="Raw creds in chat. Engineering blocks it." />
            <WallCard quote={'"What\'s the source of truth across systems?"'} tag="No clean, shared answer. Everyone re-derives." />
            <WallCard quote='"Can it get smarter over time?"' tag="Corrections die in chat history. Nothing compounds." />
          </WallGrid>
          <Caption className="dk-gap">
            Six angles, one problem:{' '}
            <strong>
              agents can work now, but the enterprise has no layer for humans and agents to work on
              together.
            </strong>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 35 · Appendix · why the neutral layer wins ───────────────────────
     * `.nw-wrap` is a two-column contrast: three tagged chip rows and a verdict on the left, a
     * paragraph block and a chip row on the right. Composed from `.dk-cols` + Eyebrow + ChipRow +
     * Callout rather than SplitColumns, because SplitColumns' item vocabulary (eyebrow, title,
     * marker rows) does not fit chip rows. */
    {
      id: 'apx-neutral',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            layout="row"
            eyebrow="Appendix · why the neutral layer wins"
            eyebrowTone="violet"
            title="Each vendor's AI exists to lock in its own platform."
            subtitle="Enterprises already run multiple clouds, multiple SaaS platforms, multiple model providers, and no CIO will standardize the company's AI on a stack that belongs to one of them."
          />
          <div className="dk-cols dk-cols--12">
            <div className="dk-stack">
              <h3>The enterprise stack today: every layer pushing its own AI</h3>
              {[
                ['Hyperscalers', ['each cloud → its own AI suite', 'tied to its own compute']],
                ['SaaS platforms', ['every CRM / ERP → its own copilot', 'locked to its own data']],
                ['Model providers', ['each lab → its own enterprise suite', 'on its own models only']],
              ].map(([tag, chips]) => (
                <div key={tag}>
                  <Eyebrow tone="muted">{tag}</Eyebrow>
                  <ChipRow tight>
                    {chips.map((c) => (
                      <Chip key={c} size="sm" tone="red">{c}</Chip>
                    ))}
                  </ChipRow>
                </div>
              ))}
              <Callout tone="red" fill="neutral">
                Each one's AI exists to defend its own platform, which makes it structurally unable to
                be the layer that spans all of them.
              </Callout>
            </div>
            <div className="dk-stack">
              <h3>The neutral layer is the only one everyone can meet on.</h3>
              <p>
                Model-agnostic, tool-agnostic, self-hosted on the customer's infra.{' '}
                <strong>
                  The test: take any one model away, and see whether the company's capability survives.
                </strong>{' '}
                On SynOS, the brain, skills, evals and agents survive the swap. Built capital, not
                rented intelligence.
              </p>
              <p>
                <strong>And it is why they stay.</strong> Integration lock-in is dying: a competitor can
                have agents rewrite connectors in an afternoon, and we won't claim otherwise. What
                can't be rewritten is{' '}
                <strong>what a company's own people taught the environment</strong>. Two years of
                corrections and exception handling take another two years to earn.
              </p>
              <ChipRow>
                {['any cloud', 'any model', 'any agent stack', 'your infra', 'your data'].map((c) => (
                  <Chip key={c} tone="violet" mono>{c}</Chip>
                ))}
              </ChipRow>
            </div>
          </div>
          <Callout tone="indigo" fill="neutral" className="dk-gap-sm" label="Why us">
            This layer is the intersection of three disciplines: agentic analytics and semantic layers,
            on-prem enterprise infrastructure, and enterprise go-to-market in this region.{' '}
            <strong>And the pattern rhymes:</strong> the last time enterprises faced a transformation
            they could not execute alone, the platform that carried them across was on-prem-first,
            solved genuinely hard infrastructure problems, and stayed deliberately neutral to the layer
            above: hypervisors then, models now. A structural parallel rather than an identity claim.
          </Callout>
        </SlideFrame>
      ),
    },
  ]
}
