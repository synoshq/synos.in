/*
 * 1pager-human-agent-operating-layer — the platform page for a product company that already ships
 * agents and needs the layer underneath.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word below is the shipped page's own
 * (`synos-gtm/pitch-materials/1pager-human-agent-operating-layer.html`).
 *
 * THIS PAGE IS ONE PAGE AND HAS TO STAY ONE PAGE. It is the densest artifact in the corpus: nine
 * blocks on a single A4 at 7.3-9.6px, which is well under the kit's print register (8.6-10.6px).
 * That was measured before the port rather than discovered during it — every font size in the
 * source was scaled by 18% and the page re-measured. It came out 6px over 297mm, so the register
 * fits with room to find 6px in the rhythm. Had it come out 200px over, the honest answer would
 * have been to tell Anoop the page has to become two, not to quietly shrink the type back.
 *
 * The two micro-step rows (the six-step build pipeline, the five-step flywheel) are NOT StepCard.
 * StepCard's print scale is a 26px ringed numeral beside two lines of copy — right for a four-beat
 * walkthrough, and six of them across 188mm would leave each step about 28mm of measure. They take
 * `.op-micro`, which is the shape this page and two others already had.
 */
export const onePager = (K) => {
  const {
    OnePagerPage,
    OnePagerHeader,
    OutcomeCard,
    CtaBar,
    Callout,
    Chip,
    ChipRow,
    Eyebrow,
  } = K

  /* One micro-step. `index` is the mono ordinal, `status` the optional live/in-build/roadmap mark
     the flywheel row carries and the pipeline row does not. */
  const Micro = ({ index, name, desc, status, tone }) => (
    <div className={`op-micro${tone ? ` op-micro--${tone}` : ''}`}>
      <div className="op-micro-i">{index}</div>
      <div className="op-micro-n">{name}</div>
      <div className="op-micro-d">{desc}</div>
      {status ? <div className={`op-micro-s op-micro-s--${status.tone}`}>{status.label}</div> : null}
    </div>
  )

  const BUILD = [
    ['01', 'Connect', 'Warehouse, events, docs, your own APIs as tools'],
    ['02', 'Profile', 'Agents read every table, column, distribution'],
    ['03', 'Ontology', 'Entities, metrics, relationships derived'],
    ['04', 'Resolve', 'One identity across systems'],
    ['05', 'Bind', 'Metrics bound to real SQL, validated'],
    ['06', 'Serve', 'Exposed to any agent over MCP'],
  ]

  /* The status marks are the page's most load-bearing detail and the reason it is credible: it
     says out loud which parts are live, which are in build and which are roadmap. Carried exactly,
     glyphs included. */
  const FLYWHEEL = [
    ['01', 'Trace', 'Inputs, tool calls, decisions, outcome. Full lineage', { label: '● LIVE', tone: 'live' }],
    ['02', 'Label', 'Corrections become labelled examples, in the flow of work', { label: '● LIVE', tone: 'live' }],
    ['03', 'Eval', 'Scored on your outcomes, not public benchmarks', { label: '◐ IN BUILD', tone: 'build' }],
    ['04', 'Dataset', 'Traces that worked, corrections that fixed, evals that prove it', { label: '● ACCUMULATING', tone: 'live' }],
    ['05', 'Own models', 'Fine-tuned, distilled open-weight models on your infra', { label: '◆ ROADMAP', tone: 'road' }],
  ]

  const BRAIN = [
    ['Agentic profiling', <>Agents read every table, column and distribution, then <b>derive the ontology</b>: entities, metrics, relationships. Not a human mapping exercise.</>],
    ['Structured + unstructured', <>Warehouse and events alongside policy docs, contracts, tickets, threads. <b>One graph</b>, not two systems.</>],
    ['Entity resolution', <>Same employee, customer or claim across six systems under <b>one identity</b>. The join no agent can infer on its own.</>],
    ['Stays live', <>Columns and tables appear without warning. <b>Incremental re-profiling</b> detects schema drift, re-derives, and decays what&rsquo;s stale.</>],
    ['Retrieval you can defend', <>Hybrid graph + vector + SQL, <b>assembled per request</b> with citations to source rows. Hallucination at scale is a retrieval problem, not a model one.</>],
    ['Curation loop', <>Every correction from your team or a customer&rsquo;s SME is <b>reviewed, gated and promoted</b> into the brain. Mistakes stop repeating.</>],
  ]

  const INFRA = [
    ['Permission controls', 'Tenant + project + role on every read and write. Agents act under a user’s identity, never a shared key.'],
    ['Natural language → agents', 'Describe the job; it becomes a governed agent with tools, approvals, schedule and a kill switch.'],
    ['Natural language → apps', 'Describe an app or dashboard; generated, AST-scanned, sandboxed, deployed for the team or a client.'],
    ['Skill marketplace', 'Skills authored in plain English by SMEs. Versioned, governed, forkable, reusable across teams and tenants.'],
    ['Agent-native storage', 'Schema-enforced record of what agents produce. Multi-agent writes, validation, approval gates, lineage.'],
    ['Traces & evals', 'Every run traced to source rows. Eval sets your team owns. Accuracy tracked per skill, drift flagged.'],
  ]

  const HARNESSES = ['Your own agents', 'Claude Code', 'Codex', 'Cursor', 'Cowork', 'In-house LangGraph', 'White-label under your brand']

  return {
    title: 'SynOS: the Human-Agent Operating Layer',
    pages: [
      <OnePagerPage key="p1" gap="tight" className="op-dense">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="Infrastructure for products that already ship agents"
          title={
            <>
              The <span className="sk-a">Human-Agent Operating Layer</span>: the knowledge and
              controls your agents run on
            </>
          }
          sub={
            <>
              A self-hosted infrastructure layer under your product: a Context Brain built by agents
              from each customer&rsquo;s structured and unstructured data, plus permission controls,
              natural language to agents, natural language to apps, a skill marketplace and safe
              deploy. Operable by your own agents, or by your clients&rsquo; harnesses over MCP.
            </>
          }
        />

        {/* Red, and first: this is the page's whole reason to exist — the reader has already
            shipped agents, so the argument has to open on why that was the easy part. */}
        <Callout scale="print" tone="red">
          <b>Naming the agents is the easy part.</b> The hard part is that each customer&rsquo;s data
          means something different: their grade structure, their leave rules, their definition of{' '}
          <i>active</i>. Agents that don&rsquo;t know it guess, and a guess you can&rsquo;t explain is
          one you can&rsquo;t ship. Multiply by every tenant, and the bottleneck is the knowledge
          rather than the agent.
        </Callout>

        <Callout scale="print" tone="indigo" label="Context Brain · built by agents · kept live · retrieval you can defend">
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
            How it gets built <span className="op-hint">· per customer, without a data team</span>
          </Eyebrow>
          <div className="op-microrow op-microrow--6">
            {BUILD.map(([i, n, d]) => (
              <Micro key={i} index={i} name={n} desc={d} />
            ))}
          </div>
        </div>

        <div>
          <Eyebrow scale="print">The rest of the operating layer</Eyebrow>
          <div className="op-three op-three--tight">
            {INFRA.map(([n, d]) => (
              <div className="op-tile op-tile--rule-amber" key={n}>
                <div className="op-tile-n">{n}</div>
                <div className="op-tile-d">{d}</div>
              </div>
            ))}
          </div>
        </div>

        <Callout scale="print" tone="emerald" className="op-harness">
          <div className="op-harness-t">
            <b className="op-harness-h">Your agents, or your clients&rsquo;</b>
            Everything above is exposed over MCP, so your product works from your own agents{' '}
            <i>and</i> from whatever your customers already use.
          </div>
          <ChipRow tight className="op-harness-c">
            <Chip scale="print" tone="emerald" mono>MCP</Chip>
            <Chip scale="print" tone="emerald" mono>REST</Chip>
            {HARNESSES.map((h) => (
              <Chip key={h} scale="print" tone="emerald">{h}</Chip>
            ))}
          </ChipRow>
        </Callout>

        <div>
          <Eyebrow scale="print">And underneath, every run becomes your training data</Eyebrow>
          <div className="op-microrow op-microrow--5">
            {FLYWHEEL.map(([i, n, d, s]) => (
              <Micro key={i} index={i} name={n} desc={d} status={s} tone="violet" />
            ))}
          </div>
        </div>

        {/* Neutral fill with a violet rule, not a violet tint: it sits directly under the violet
            flywheel row and a second violet plate would read as part of it. */}
        <Callout scale="print" tone="violet" fill="neutral">
          <b>Why it compounds.</b> The loop runs inside your infrastructure, so nothing trains a
          public model. What accumulates is <b>data no lab can train on</b>, minted from how your
          customers actually operate, and roughly 80% of routine work eventually runs on smaller
          fine-tuned models at a fraction of frontier cost. <b>Honest status:</b> the data layer is
          live and accumulating today; eval and training stack on top. Deliberately data-first,
          because capture is the scarce part.
        </Callout>

        <ChipRow tight>
          <Chip scale="print" tone="indigo" mono>SELF-HOSTED</Chip>
          <Chip scale="print">Your VPC or on-prem · air-gap clean</Chip>
          <Chip scale="print">Model-agnostic, swap by config</Chip>
          <Chip scale="print">Tenant isolation on every storage path</Chip>
          <Chip scale="print">Per-tool-call audit · run traces · cost per run</Chip>
          <Chip scale="print">Snowflake · BigQuery · Redshift · Postgres · Vertica · S3</Chip>
        </ChipRow>

        {/* This page has no footer — the CTA's right block IS the footer, which is why it carries
            the name, the credential and both URLs. */}
        <CtaBar
          tone="indigo"
          title={<>One customer&rsquo;s data. Four weeks. <span className="sk-a">Your infrastructure.</span></>}
          body={
            <>
              We profile one of your customers end to end and stand the brain up behind one agent you
              already ship. Measured on an eval set your team writes, agreed before we start. You keep
              the brain, the harness and the traces either way.
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
