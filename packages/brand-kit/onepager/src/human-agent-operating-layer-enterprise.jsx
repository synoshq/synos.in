/*
 * 1pager-human-agent-operating-layer-enterprise — the page for an enterprise that runs AI on its
 * own operations and wants to end up training AI of its own.
 *
 * WHY THIS IS NOT `human-agent-operating-layer.jsx`. That page is Door 1: a product company that
 * already ships agents and needs the layer under its product, so its whole argument is about
 * per-tenant knowledge and white-labelling over MCP. This is Door 2: the buyer runs the operations,
 * not a platform, and the argument he is buying is the arc — a Company Brain that makes AI work on
 * his systems today, the same install becoming the training environment for models of his own, and
 * the autonomous enterprise that the first two compound into. Two pages that share the brain grid
 * and nothing else is not a template; it is two pages.
 *
 * SOURCES, so this is derivation rather than invention:
 *   - synos-gtm/presentations/synos-vc-deck-v9.html — the August narrative. `the-layer` (what it
 *     is), `the-second-job` (the today/tomorrow table, carried nearly verbatim because it IS the
 *     argument), `the-loop` (why it compounds), and the honest-status discipline.
 *   - synos-gtm/presentations/MONEYVIEW_DECK.html — the accuracy journey with its measurements, and
 *     the Stage 3 honesty (fine-tuning teaches form, not fresh facts). That deck is where this
 *     buyer's questions were actually answered, so its numbers travel with the claim.
 *   - synos-gtm/pitch-materials/1pager-human-agent-operating-layer.html — the Company Brain grid.
 *
 * THIS PAGE IS ONE PAGE AND HAS TO STAY ONE PAGE. Eight blocks in the `.op-dense` register, the
 * same register the three infrastructure pages already run in. The block count was set by dropping
 * the "rest of the operating layer" tile row: the today/tomorrow table names the same five pieces
 * and says what each becomes, so the tile row was repeating the left column of a table it sat
 * above.
 */
export const onePager = (K) => {
  const {
    OnePagerPage,
    OnePagerHeader,
    CtaBar,
    Callout,
    Chip,
    ChipRow,
    Eyebrow,
  } = K

  /* One micro-step of the capture flywheel, with the live / in-build / roadmap mark. Same shape as
     the Door 1 page's, and for the same reason: the status marks are what make the roadmap claim
     survivable in a room. */
  const Micro = ({ index, name, desc, status }) => (
    <div className="op-micro op-micro--violet">
      <div className="op-micro-i">{index}</div>
      <div className="op-micro-n">{name}</div>
      <div className="op-micro-d">{desc}</div>
      <div className={`op-micro-s op-micro-s--${status.tone}`}>{status.label}</div>
    </div>
  )

  const BRAIN = [
    ['Agentic profiling', <>Agents read every table, column and distribution, then <b>derive the ontology</b>: entities, metrics, relationships. Not a mapping exercise you have to staff.</>],
    ['Structured and unstructured', <>Warehouse, ledgers and events alongside policy documents, contracts, tickets and call transcripts. <b>One brain</b>, not two systems.</>],
    ['Entity resolution', <>The same customer, account or claim across six systems under <b>one identity</b>. The join no agent can infer on its own.</>],
    ['Stays live', <>Columns and tables appear without warning. <b>Incremental re-profiling</b> catches the drift, re-derives, and decays what is stale.</>],
    ['Retrieval you can defend', <>Hybrid SQL, vector and graph, <b>assembled per request</b>, cited to source rows. Hallucination at scale is a retrieval problem first.</>],
    ['Correction loop', <>Every correction your experts make is <b>reviewed, gated and promoted</b> into the brain. The same mistake stops arriving twice.</>],
  ]

  /* Carried from the v9 deck's `the-second-job` slide. The left column is the platform your teams
     use on Monday; the right column is what the identical artifact is worth to a training run. The
     point of the table is that the right column costs nothing extra to reach. */
  const SECOND_JOB = [
    ['Company Brain', 'Grounded context, so answers cite your company rather than guess.', 'The curated corpus behind supervised fine-tuning.'],
    ['Governed access', 'Safe, audited actions inside real systems. No raw credentials in a chat window.', 'The RL environment: an agent acts on the real thing and is scored on it.'],
    ['Sandboxes', 'Somewhere an expert ships an app or an agent without raising a ticket.', 'Where rollouts run. Thousands of episodes, repeatable, nothing broken.'],
    ['Traces and corrections', 'What ran, what it touched, what a person fixed afterwards.', 'Labelled data: accepted runs, corrected runs, and the preference between them.'],
    ['Private evals', 'Did this workflow actually work, measured on your outcome.', 'The reward signal, and the bar a candidate model has to clear to ship.'],
  ]

  const FLYWHEEL = [
    ['01', 'Trace', 'Inputs, tool calls, decisions, outcome. Full lineage', { label: '● LIVE', tone: 'live' }],
    ['02', 'Label', 'Corrections become labelled examples, in the flow of work', { label: '● LIVE', tone: 'live' }],
    ['03', 'Eval', 'Scored on your outcomes, not public benchmarks', { label: '◐ IN BUILD', tone: 'build' }],
    ['04', 'Dataset', 'Runs that worked, corrections that fixed, evals that prove it', { label: '● ACCUMULATING', tone: 'live' }],
    ['05', 'Models of your own', 'Fine-tuned and distilled open-weight models, on your infrastructure', { label: '◆ ROADMAP', tone: 'road' }],
  ]

  return {
    title: 'SynOS: the Human-Agent Operating Layer',
    pages: [
      <OnePagerPage key="p1" gap="tight" className="op-dense">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="For enterprises building AI of their own"
          title={
            <>
              The <span className="sk-a">Human-Agent Operating Layer</span>: where your company
              builds, trains and eventually fine-tunes AI of its own
            </>
          }
          sub={
            <>
              A self-hosted layer that installs under the AI tools your teams already use: a{' '}
              <b>Company Brain</b> over the systems that run the business, governed access so agents
              can act inside them safely, sandboxes to ship what gets built, and traces, corrections
              and evals over everything that runs. Your systems are profiled where they sit and
              queried live, so <b>nothing is migrated</b>. Engineering sets the rails once, then the
              people who know the work operate it.
            </>
          }
        />

        {/* Red, and first. This reader has already handed AI tools to his teams and watched them
            stall, so the page has to open on why that happened rather than on what we sell. */}
        <Callout scale="print" tone="red">
          <b>The models learned the internet. They never learned how you operate.</b> Your customers,
          your policies, your exceptions, the judgment your best people apply without writing it
          down: none of it is on the internet, and it is exactly where every agent stalls. So the
          tools went out and the walls arrived. No shared company knowledge, no safe door into the
          systems of record, nowhere governed to deploy what gets built, every change back through
          the engineering queue and every correction lost in a chat history.{' '}
          <b>Nothing compounded.</b>
        </Callout>

        <Callout
          scale="print"
          tone="indigo"
          label="Company Brain · built by agents · kept live · read from your systems, not copied out of them"
        >
          <div className="op-three op-three--tight">
            {BRAIN.map(([n, d]) => (
              <div className="op-brain-f" key={n}>
                <div className="op-brain-n">{n}</div>
                <div className="op-brain-d">{d}</div>
              </div>
            ))}
          </div>
        </Callout>

        <div>
          <Eyebrow scale="print">
            The five pieces, and their second job{' '}
            <span className="op-hint">· the platform your teams use is the training stack</span>
          </Eyebrow>
          <div className="op-tt">
            <div className="op-tt-head">
              <div />
              <div className="op-tt-when">Today · make AI work on your systems</div>
              <div className="op-tt-when op-tt-when--next">Tomorrow · train AI of your own</div>
            </div>
            {SECOND_JOB.map(([n, today, tomorrow]) => (
              <div className="op-tt-row" key={n}>
                <div className="op-tt-n">{n}</div>
                <div className="op-tt-a">{today}</div>
                <div className="op-tt-b">{tomorrow}</div>
              </div>
            ))}
          </div>
          <div className="op-tt-foot">
            Fine-tuning needs data. Reinforcement learning needs an environment. Both need a bar to
            clear. <b>All three fall out of work that is already running here.</b>
          </div>
        </div>

        <div>
          <Eyebrow scale="print">
            The accuracy journey <span className="op-hint">· where the unlock actually is</span>
          </Eyebrow>
          <div className="op-three op-three--tight">
            <div className="op-stage">
              <div className="op-stage-k">Stage 1 · where everyone starts</div>
              <div className="op-stage-n">Prompts, tools and a bigger model</div>
              <div className="op-stage-d">
                Prompt engineering, few-shot, tool calling, MCP servers, long-context stuffing.
                <b> The ceiling here is measured, not a matter of taste:</b> accuracy degrades as
                context grows, and usable context is often several times below the advertised window.
              </div>
            </div>
            <div className="op-stage op-stage--now">
              <div className="op-stage-k">Stage 2 · the unlock, and it is now</div>
              <div className="op-stage-n">Context engineering plus the eval layer</div>
              <div className="op-stage-d">
                Curated retrieval, reranking, entity resolution, guardrails, and measurement:
                tracing, golden sets from real runs, corrections captured in the flow.
                <b> Retrieval quality is additive and ordered</b>, NDCG@3 of 40.6 on keyword, 48.4
                hybrid, 60.1 with a reranker. No model change, so every price drop stays yours.
              </div>
            </div>
            <div className="op-stage">
              <div className="op-stage-k">Stage 3 · later, and narrow</div>
              <div className="op-stage-n">Weight space: SFT, LoRA, DPO, GRPO, distillation</div>
              <div className="op-stage-d">
                <b>It teaches behaviour, not fresh facts.</b> Format, tone and consistency, yes. New
                knowledge, no. It needs a working eval harness first, which is why it lands after
                Stage 2, and it pays when a proven behaviour is distilled into a small cheap model at
                volume.
              </div>
            </div>
          </div>
          <div className="op-tt-foot">
            <b>It is a diagnostic, not a staircase.</b> Stale knowledge is a context problem, wrong
            behaviour is a weights problem, too costly is a distillation problem. You can only pick
            the lever if you can measure the failure, and roughly one in four teams running agents in
            production have no evals at all. That layer is what we build, and it is what makes the
            day you fine-tune cheap rather than a research project.
          </div>
        </div>

        <div>
          <Eyebrow scale="print">And underneath, every run becomes your training data</Eyebrow>
          <div className="op-microrow op-microrow--5">
            {FLYWHEEL.map(([i, n, d, s]) => (
              <Micro key={i} index={i} name={n} desc={d} status={s} />
            ))}
          </div>
        </div>

        {/* Neutral fill with a violet rule, not a violet tint: it sits directly under the violet
            flywheel row and a second violet plate would read as part of it. */}
        <Callout scale="print" tone="violet" fill="neutral">
          <b>Why it compounds, and where it ends.</b> The loop runs inside your infrastructure, so
          nothing trains a public model. What accumulates is <b>data no lab can train on</b>, minted
          from your corrections, your systems and your measured outcomes. One environment at three
          depths: your people and agents do the expensive work on it today, you train models of your
          own on what that work captured, and the two compound into an <b>autonomous enterprise</b>,
          a small number of people running the business at the edge of what AI can do, with the
          judgment that got you there encoded rather than leaving with the person who held it.{' '}
          <b>Honest status:</b> capture is live and accumulating today, evals and training stack on
          top of it.
        </Callout>

        <ChipRow tight>
          <Chip scale="print" tone="indigo" mono>SELF-HOSTED</Chip>
          <Chip scale="print">Your VPC or on-prem · air-gap clean</Chip>
          <Chip scale="print">Any model, any agent harness</Chip>
          <Chip scale="print">No migration</Chip>
          <Chip scale="print">Per-tool-call audit · run traces · cost per run</Chip>
        </ChipRow>

        {/* This page has no footer: the CTA's right block IS the footer, which is why it carries the
            name, the credential and the URLs. Same call as the Door 1 page. */}
        <CtaBar
          tone="indigo"
          title={<>One expensive workflow. Four weeks. <span className="sk-a">Your infrastructure.</span></>}
          body={
            <>
              Pick the workflow where the cost or the queue hurts most. We stand the brain up behind
              it, put agents on governed rails, and measure it on an eval set your team writes and we
              agree before we start. You keep the brain, the traces and the eval set either way.
            </>
          }
          right={
            <>
              <b>Anoop Jawahar</b> · Founder<br />
              Ex-CTO Sundial · 8 yrs Nutanix<br />
              synos.in · linkedin.com/in/anoopjawahar
            </>
          }
        />
      </OnePagerPage>,
    ],
  }
}
