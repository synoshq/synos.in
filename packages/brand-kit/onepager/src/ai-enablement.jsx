/*
 * 1pager-ai-enablement — the page for a company whose AI programme has stalled everywhere except
 * engineering.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word below is the shipped page's own
 * (`synos-gtm/pitch-materials/1pager-ai-enablement.html`).
 *
 * Third of the dense family and the one that needed no new shapes at all — it is built entirely
 * from what `human-agent-operating-layer` and `w2-saas` already established. That is the payoff of
 * having ported those two first, and it is also the evidence that `.op-micro`, `.op-tile`,
 * `.op-win` and the harness band were the right level of abstraction rather than three pages of
 * furniture that happened to be filed together.
 *
 * One thing distinguishes it and is carried whole: the PROOF block. It is the only page in the
 * corpus that names a live deployment with a real number in it (56,000+ rows, 6:30am, six weeks).
 * That paragraph is the reason a sceptical reader keeps reading, so it stays verbatim.
 */
export const onePager = (K) => {
  const { OnePagerPage, OnePagerHeader, CtaBar, Callout, Chip, ChipRow, Eyebrow } = K

  const OUTCOMES = [
    ['Adoption moves past the early adopters', 'The laggard 80% get a surface they can actually use, not another training deck.'],
    ['Engineering stops being the queue', 'Access, deploy and guardrails are set once as rails, not per request.'],
    ['Wins stop dying on a laptop', 'One person’s workflow becomes the team’s starting point, versioned and reusable.'],
    ['You can finally see the programme', 'What’s running, who uses it, what it costs, and what nobody has flagged yet.'],
  ]

  const BRAIN = [
    ['Agentic profiling', 'Agents read your systems and derive the ontology: entities, metrics, the words your business actually uses.'],
    ['Structured + unstructured', 'Warehouse and tickets alongside policy docs, decks and threads. One graph.'],
    ['Stays live', 'Incremental re-profiling catches schema drift and decays what’s stale, so it doesn’t rot.'],
    ['Curation loop', 'Every correction reviewed, gated and promoted, so knowledge survives turnover.'],
  ]

  const RAILS = [
    ['Permission controls', 'Scoped, audited access to real systems. Agents act under a person’s identity, never a shared key on a laptop.'],
    ['Safe deploy sandboxes', 'AST-scanned builds, egress proxy, kill switch, token budgets. Somewhere for non-engineers’ work to actually run.'],
    ['Agent-native storage', 'Schema-enforced record of what agents produce, instead of output scattering into Sheets and chat.'],
    ['Skill marketplace', 'Publish, fork, version and reuse across teams. Analytics per skill: runs, cost, where corrections cluster.'],
    ['Traces & evals', 'Every run traced to source rows. Eval sets you own. Drift flagged before someone notices it downstream.'],
    ['Observability', 'Usage, cost per run, per-tool-call audit. The answer when finance asks what this returned.'],
  ]

  const HARNESSES = ['Claude Code', 'Cowork', 'Codex', 'Cursor', 'In-house LangGraph', 'Any model, swap by config']

  return {
    title: 'SynOS: AI enablement beyond engineering',
    pages: [
      <OnePagerPage key="p1" gap="tight" className="op-dense">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="AI enablement beyond engineering"
          title={<>Your engineers are flying. <span className="sk-a">Everyone else is filing tickets.</span></>}
          sub={
            <>
              SynOS is the layer that lets non-engineering teams actually use Claude Code, Cowork and
              Codex on real company systems, with permissions, safe deployment, a shared Company
              Brain and an audit trail, so the work stops routing through your engineering backlog.
              Self-hosted, any model, any harness.
            </>
          }
        />

        <Callout scale="print" tone="red">
          <b>The adoption number stops moving, and it isn&rsquo;t a training problem.</b> You bought
          the licences, ran the sessions, named the champions. Engineering compounds; the other
          eighty percent stall at the same three places. They can&rsquo;t reach real data,
          there&rsquo;s nowhere to put what they built, and the best workflow in the company is
          trapped on one laptop. No amount of enablement fixes infrastructure.
        </Callout>

        {/* Outcomes come FIRST on this page, before any description of the product. The reader is
            an executive whose adoption number has stalled, and the page opens on what moves. */}
        <div>
          <Eyebrow scale="print">
            What changes <span className="op-hint">· the numbers you report upward</span>
          </Eyebrow>
          <div className="op-four">
            {OUTCOMES.map(([n, d]) => (
              <div className="op-tile" key={n}>
                <div className="op-tile-n">{n}</div>
                <div className="op-tile-d">{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Eyebrow scale="print">What your teams ship on it</Eyebrow>
          <div className="op-three op-three--tight">
            <Callout scale="print" tone="indigo" accent="top" fill="neutral" className="op-col">
              <b className="op-lay-h">Agents that just run</b>
              <div className="op-who">Ops · finance · support</div>
              <div className="op-tile-d">
                Scheduled work that needs no one present: exception digests, reconciliations, weekly
                reports, <b>proposing first, acting once trusted</b>.
              </div>
              <div className="op-win"><b>Runs at 6:30am</b> without anyone opening a terminal.</div>
            </Callout>
            <Callout scale="print" tone="violet" accent="top" fill="neutral" className="op-col">
              <b className="op-lay-h">Apps &amp; dashboards</b>
              <div className="op-who">Anyone who can describe it</div>
              <div className="op-tile-d">
                Describe a review queue or a scorecard; it&rsquo;s generated, scanned, sandboxed and
                deployed <b>for the whole team</b>, not a personal script.
              </div>
              <div className="op-win op-win--violet"><b>No sprint, no backlog ticket.</b></div>
            </Callout>
            <Callout scale="print" tone="emerald" accent="top" fill="neutral" className="op-col">
              <b className="op-lay-h">Shared skills</b>
              <div className="op-who">SMEs across functions</div>
              <div className="op-tile-d">
                The person who knows the rules writes them in plain English. Versioned, governed,{' '}
                <b>forkable by the next team</b>.
              </div>
              <div className="op-win op-win--emerald">
                <b>Corrections stick</b>, so the same mistake stops recurring.
              </div>
            </Callout>
          </div>
        </div>

        <Callout scale="print" tone="indigo" label="Underneath it all, the Company Brain · built by agents · kept live · answers you can trace">
          <div className="op-four">
            {BRAIN.map(([n, d]) => (
              <div className="op-brain-f" key={n}>
                <div className="op-brain-n">{n}</div>
                <div className="op-brain-d">{d}</div>
              </div>
            ))}
          </div>
        </Callout>

        <div>
          <Eyebrow scale="print">The rails engineering sets once</Eyebrow>
          <div className="op-three op-three--tight">
            {RAILS.map(([n, d]) => (
              <div className="op-tile op-tile--rule-amber" key={n}>
                <div className="op-tile-n">{n}</div>
                <div className="op-tile-d">{d}</div>
              </div>
            ))}
          </div>
        </div>

        <Callout scale="print" tone="emerald" className="op-harness">
          <div className="op-harness-t">
            <b className="op-harness-h">Works with what your people already opened</b>
            Exposed over MCP, so the same brain, permissions and audit apply no matter which harness
            a team picks next year.
          </div>
          <ChipRow tight className="op-harness-c">
            <Chip scale="print" tone="emerald" mono>MCP</Chip>
            {HARNESSES.map((h) => (
              <Chip key={h} scale="print" tone="emerald">{h}</Chip>
            ))}
          </ChipRow>
        </Callout>

        {/* The one paragraph on this page that is evidence rather than argument. Verbatim. */}
        <Callout scale="print" tone="emerald" fill="neutral" label="Running today">
          Inside a healthtech company, marketing operations moved onto this layer in{' '}
          <b>six weeks</b>: a shared ledger of <code>56,000+ rows</code> as the team&rsquo;s source
          of truth, a hygiene agent posting findings to Slack at 6:30 every morning with nobody
          running it, review apps the team uses directly, and an operator agent that proposes changes
          on a live ad account and waits for a human to approve. The same substrate runs
          cloud-operations agents at an auto manufacturer and a US database company, and
          client-facing agents inside a martech platform.
        </Callout>

        <ChipRow tight>
          <Chip scale="print" tone="indigo" mono>SELF-HOSTED</Chip>
          <Chip scale="print">Your VPC or on-prem · air-gap clean</Chip>
          <Chip scale="print">Tenant + project + role on every read and write</Chip>
          <Chip scale="print">Per-tool-call audit · run traces · cost per run</Chip>
          <Chip scale="print">Snowflake · BigQuery · Redshift · Postgres · S3 · Slack · Jira</Chip>
        </ChipRow>

        <CtaBar
          tone="indigo"
          title={
            <>
              One team. One workflow they&rsquo;re already blocked on.{' '}
              <span className="sk-a">Four weeks.</span>
            </>
          }
          body={
            <>
              Success agreed up front, usually that a named non-engineer runs it end to end with no
              engineer in the loop. You keep the deployment, the brain and everything built on it,
              whether or not you continue.
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
