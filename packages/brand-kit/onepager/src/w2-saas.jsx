/*
 * 1pager-w2-saas — the page for a software company making its own product agent-native.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word below is the shipped page's own
 * (`synos-gtm/pitch-materials/1pager-w2-saas.html`).
 *
 * Same family as `human-agent-operating-layer` and shares four of its shapes (the dense register,
 * the micro-step rows, the small tile, the red gap band). Three things are its own:
 *
 *   - FOUR PILLARS across the top, one per hue. They are what you plug in, and the four hues are
 *     doing real work — this is the only place in the corpus where all four brand colours appear as
 *     peers rather than as a hierarchy.
 *   - THREE PRODUCT COLUMNS, each ending on its commercial line. That line is the argument (an
 *     upsell tier, seconds not minutes, customisation without a fork) and is pinned level across
 *     the three with `margin-top: auto`, because three claims at three different heights read as
 *     three different kinds of claim.
 *   - A TWO-UP FOOT: what it plugs into beside what makes it enterprise-ready. HAL runs both of
 *     those as full-width rows; this page is one block shorter and can afford the pairing.
 *
 * Where it differs from HAL and is NOT normalised: the flywheel row is indigo here and violet
 * there. On this page the flywheel is part of the product argument and belongs in the indigo run;
 * on HAL it is the layer underneath everything else and is deliberately a different colour from
 * what sits above it.
 */
export const onePager = (K) => {
  const { OnePagerPage, OnePagerHeader, CtaBar, Callout, Chip, ChipRow, Columns, Eyebrow } = K

  const Micro = ({ index, name, desc, status }) => (
    <div className="op-micro op-micro--indigo">
      <div className="op-micro-i">{index}</div>
      <div className="op-micro-n">{name}</div>
      <div className="op-micro-d">{desc}</div>
      {status ? <div className={`op-micro-s op-micro-s--${status.tone}`}>{status.label}</div> : null}
    </div>
  )
  const Plain = ({ index, name, desc }) => (
    <div className="op-micro">
      <div className="op-micro-i">{index}</div>
      <div className="op-micro-n">{name}</div>
      <div className="op-micro-d">{desc}</div>
    </div>
  )

  const PILLARS = [
    ['indigo', 'Context Brain', 'Hybrid graph + vector + SQL retrieval with citations. Structured and unstructured sources, entity-resolved, freshness-aware, incrementally re-profiled.'],
    ['violet', 'Skill Marketplace', 'Skills authored in plain English by SMEs, versioned and governed. Publish, fork, reuse across teams, and expose to clients over MCP.'],
    ['amber', 'Agent-native storage', 'Schema-enforced record of what agents produce. Multi-agent writes, validation, approval gates, full lineage. Tenant + role on every path.'],
    ['emerald', 'Traces & evals', 'Every run traced to source rows. Eval sets your team owns. Corrections reviewed and promoted, so the same mistake stops recurring.'],
  ]

  const BUILD = [
    ['01', 'Connect', 'Warehouse, events, docs, your APIs as tools'],
    ['02', 'Profile', 'Agents read every table, column, distribution'],
    ['03', 'Ontology', 'Entities, metrics, relationships derived'],
    ['04', 'Resolve', 'One identity across six systems'],
    ['05', 'Bind', 'Metrics bound to real SQL, validated'],
    ['06', 'Serve', 'Exposed to any harness over MCP'],
  ]

  const FLYWHEEL = [
    ['01', 'Trace', 'Inputs, tool calls, decisions, outcome. Full lineage on every run', { label: '● LIVE', tone: 'live' }],
    ['02', 'Label', 'Every human correction becomes a labelled example, in the flow of work', { label: '● LIVE', tone: 'live' }],
    ['03', 'Eval', 'Scored against your outcomes, not public benchmarks', { label: '◐ IN BUILD', tone: 'build' }],
    ['04', 'Dataset', 'Curated: traces that worked, corrections that fixed, evals that prove it', { label: '● ACCUMULATING', tone: 'live' }],
    ['05', 'Own models', 'Fine-tuned and distilled open-weight models for your workflows, on your infra', { label: '◆ ROADMAP', tone: 'road' }],
  ]

  const ENTERPRISE = [
    ['Self-hosted', 'Your VPC or on-prem. Air-gap clean. No data leaves.'],
    ['Model-agnostic', 'Swap providers by config. No vendor holds your layer.'],
    ['Tenant isolation', 'Enforced on every storage path, regression-tested.'],
    ['Full audit', 'Per-tool-call log, run traces, cost per run.'],
  ]

  return {
    title: 'SynOS for software companies going agent-native',
    pages: [
      <OnePagerPage key="p1" gap="tight" className="op-dense">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="For software companies going agent-native"
          title={<>Turn your product <span className="sk-a">agent-native</span> in weeks, on your own infrastructure</>}
          sub={
            <>
              An agent data infrastructure layer you plug into your existing product: a Context Brain
              built automatically from your data sources, natural language to agents and apps, a
              skill marketplace, and MCP exposure, so your SMEs and your clients build what they
              need. Any model, any harness, your tenancy.
            </>
          }
        />

        <Callout scale="print" tone="red">
          <b>The agent is the easy part.</b> Point an agent framework at a warehouse and it guesses
          what <i>active customer</i> means. Big-name platform builds stall for months. And even when
          a demo works you can&rsquo;t ship it, because you can&rsquo;t tell a paying client{' '}
          <b>why it answered the way it did</b>, or prove one tenant can&rsquo;t see another&rsquo;s
          data.
        </Callout>

        <div>
          <Eyebrow scale="print">What you plug in</Eyebrow>
          {/* Four across, one hue each, no accent rule — the tint IS the distinction here and a
              left rule on all four would add a fifth line of noise to each. */}
          <div className="op-four">
            {PILLARS.map(([tone, name, desc]) => (
              <Callout key={name} scale="print" tone={tone} accent="none">
                <b className="op-lay-h">{name}</b>
                {desc}
              </Callout>
            ))}
          </div>
        </div>

        <div>
          <Eyebrow scale="print">What your product can ship on top</Eyebrow>
          <div className="op-three op-three--tight">
            <Callout scale="print" tone="indigo" accent="top" fill="neutral" className="op-col">
              <b className="op-lay-h">Insight agents</b>
              <div className="op-who">For your clients&rsquo; analysts</div>
              <div className="op-tile-d">
                Ask in plain language across their data, grounded, cited and explainable. Surfaces
                what dashboards don&rsquo;t: seasonality, cohort drift, silent failures.
              </div>
              <div className="op-win">
                <b>An upsell tier</b> clients renew on, not a free feature.
              </div>
            </Callout>
            <Callout scale="print" tone="violet" accent="top" fill="neutral" className="op-col">
              <b className="op-lay-h">Workflow agents</b>
              <div className="op-who">For your clients&rsquo; operators</div>
              <div className="op-tile-d">
                Agents that <b>take action</b> inside your product: build the segment, draft the
                campaign, reconcile the exception, proposing first, acting once trusted.
              </div>
              <div className="op-win op-win--violet">
                <b>Rule generation drops from minutes to seconds</b> when the brain already knows the
                schema.
              </div>
            </Callout>
            <Callout scale="print" tone="emerald" accent="top" fill="neutral" className="op-col">
              <b className="op-lay-h">Self-serve build</b>
              <div className="op-who">For your SMEs and your clients</div>
              <div className="op-tile-d">
                Describe an agent, an app or a dashboard; it&rsquo;s generated, AST-scanned,
                sandboxed and deployed. <b>Your domain experts ship it, not your backlog.</b>
              </div>
              <div className="op-win op-win--emerald">
                <b>Per-client customisation</b> without forking your product.
              </div>
            </Callout>
          </div>
        </div>

        <div>
          <Eyebrow scale="print">How the Context Brain gets built, automatically</Eyebrow>
          <div className="op-microrow op-microrow--6">
            {BUILD.map(([i, n, d]) => (
              <Plain key={i} index={i} name={n} desc={d} />
            ))}
          </div>
        </div>

        <div>
          <Eyebrow scale="print">The layer underneath: every run becomes your training data</Eyebrow>
          <div className="op-microrow op-microrow--5">
            {FLYWHEEL.map(([i, n, d, s]) => (
              <Micro key={i} index={i} name={n} desc={d} status={s} />
            ))}
          </div>
        </div>

        <Callout scale="print" tone="indigo" fill="neutral">
          <b>Why this matters commercially.</b> The human, agent and system loop runs on your
          infrastructure, so nothing trains a public model. What accumulates is <b>data no lab can
          train on</b>, minted from how your business actually operates. It funds the future too:
          roughly 80% of routine work runs fine on smaller fine-tuned models, at a fraction of
          frontier-token cost. <b>Honest status:</b> the data layer is live and accumulating today;
          eval and training stack on top of it. Deliberately data-first, because capture is the
          scarce part.
        </Callout>

        <Columns gap="snug">
          <div>
            <Eyebrow scale="print">Plugs into what you already run</Eyebrow>
            <ChipRow tight>
              <Chip scale="print" tone="indigo" mono>MCP</Chip>
              <Chip scale="print" tone="indigo" mono>REST</Chip>
              <Chip scale="print">Claude · GPT · Gemini · open-weight</Chip>
              <Chip scale="print">Claude Code · Codex · Cursor · your own harness</Chip>
              <Chip scale="print">Snowflake · BigQuery · Redshift · Postgres · Vertica</Chip>
              <Chip scale="print">S3 · GCS · object stores</Chip>
              <Chip scale="print">White-label under your brand</Chip>
            </ChipRow>
          </div>
          <div>
            <Eyebrow scale="print">Enterprise from day one</Eyebrow>
            <div className="op-two op-two--tight">
              {ENTERPRISE.map(([n, d]) => (
                <div className="op-tile" key={n}>
                  <div className="op-tile-n">{n}</div>
                  <div className="op-tile-d">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </Columns>

        <CtaBar
          tone="indigo"
          title={<>One use case. Four weeks. <span className="sk-a">Your infrastructure.</span></>}
          body={
            <>
              Measured on an eval set your team writes, agreed before we start. You keep the agents,
              the brain, the eval harness and the traces, whether or not you continue.
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
