/*
 * 1pager-financial-inclusion-ceo — the first one-pager rebuilt on the brand kit.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word here is the shipped page's own text
 * (`synos-gtm/pitch-materials/1pager-financial-inclusion-ceo.html`, 2026-08-13). If the content
 * moved at the same time as the platform, nobody could tell which caused a difference.
 *
 * The two SVG diagrams are carried across BYTE-FOR-BYTE, injected rather than transcribed into
 * JSX. They are hand-drawn illustrations, not brand vocabulary: the kit has no diagram language
 * and should not grow one for a single page, and re-typing 40 shaped elements into JSX is a way to
 * introduce differences that then get mistaken for design decisions. Their literal colours are the
 * source's own and are the one place in this build that does not read a token.
 *
 * What mapped, what did not, and what the kit gained, is in
 * docs/plans/2026-08-14-onepager-on-kit-report.md.
 */
const SVG_TODAY = "<svg viewBox=\"0 0 300 250\" width=\"100%\" style=\"max-height:80mm\">\n          <defs>\n            <marker id=\"ag\" markerWidth=\"7\" markerHeight=\"7\" refX=\"5.5\" refY=\"3\" orient=\"auto\">\n              <path d=\"M0,0 L6,3 L0,6 z\" fill=\"#94a3b8\"/>\n            </marker>\n          </defs>\n          <g font-family=\"Inter\" font-size=\"9\" font-weight=\"600\" fill=\"#64748b\" text-anchor=\"middle\">\n            <rect x=\"2\"   y=\"4\" width=\"64\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"34\"  y=\"21\">Transactions</text>\n            <rect x=\"71\"  y=\"4\" width=\"58\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"100\" y=\"21\">Settlement</text>\n            <rect x=\"134\" y=\"4\" width=\"46\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"157\" y=\"21\">Support</text>\n            <rect x=\"185\" y=\"4\" width=\"64\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"217\" y=\"21\">Distributors</text>\n            <rect x=\"254\" y=\"4\" width=\"44\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"276\" y=\"21\">Banks</text>\n          </g>\n          <g stroke=\"#cbd5e1\" stroke-width=\"1.4\" fill=\"none\" marker-end=\"url(#ag)\">\n            <path d=\"M34,32  C34,60 130,58 146,84\"/>\n            <path d=\"M100,32 C100,58 138,62 146,84\"/>\n            <path d=\"M157,32 L152,82\"/>\n            <path d=\"M217,32 C217,58 166,62 156,84\"/>\n            <path d=\"M276,32 C276,60 172,58 156,84\"/>\n          </g>\n          <circle cx=\"150\" cy=\"105\" r=\"19\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1.4\"/>\n          <circle cx=\"150\" cy=\"100\" r=\"6\" fill=\"#94a3b8\"/>\n          <path d=\"M138,116 C140,106 160,106 162,116 z\" fill=\"#94a3b8\"/>\n          <text x=\"150\" y=\"143\" font-family=\"Inter\" font-size=\"11\" font-weight=\"600\" fill=\"#64748b\" text-anchor=\"middle\">One person, pulling it</text>\n          <text x=\"150\" y=\"156\" font-family=\"Inter\" font-size=\"11\" font-weight=\"600\" fill=\"#64748b\" text-anchor=\"middle\">together by hand</text>\n          <path d=\"M150,163 L150,177\" stroke=\"#cbd5e1\" stroke-width=\"1.4\" marker-end=\"url(#ag)\"/>\n          <rect x=\"107\" y=\"181\" width=\"86\" height=\"28\" rx=\"6\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n          <text x=\"150\" y=\"199\" font-family=\"Inter\" font-size=\"11\" font-weight=\"600\" fill=\"#64748b\" text-anchor=\"middle\">A report</text>\n          <path d=\"M150,211 L150,226\" stroke=\"#cbd5e1\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/>\n          <text x=\"150\" y=\"240\" font-family=\"Inter\" font-size=\"11\" font-style=\"italic\" fill=\"#94a3b8\" text-anchor=\"middle\">and there it stops</text>\n        </svg>"

const SVG_SYNOS = "<svg viewBox=\"0 0 300 250\" width=\"100%\" style=\"max-height:80mm\">\n          <defs>\n            <marker id=\"ai\" markerWidth=\"7\" markerHeight=\"7\" refX=\"5.5\" refY=\"3\" orient=\"auto\">\n              <path d=\"M0,0 L6,3 L0,6 z\" fill=\"#6366f1\"/>\n            </marker>\n            <marker id=\"ae\" markerWidth=\"7\" markerHeight=\"7\" refX=\"5.5\" refY=\"3\" orient=\"auto\">\n              <path d=\"M0,0 L6,3 L0,6 z\" fill=\"#10b981\"/>\n            </marker>\n          </defs>\n          <g font-family=\"Inter\" font-size=\"9\" font-weight=\"600\" fill=\"#64748b\" text-anchor=\"middle\">\n            <rect x=\"2\"   y=\"4\" width=\"64\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"34\"  y=\"21\">Transactions</text>\n            <rect x=\"71\"  y=\"4\" width=\"58\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"100\" y=\"21\">Settlement</text>\n            <rect x=\"134\" y=\"4\" width=\"46\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"157\" y=\"21\">Support</text>\n            <rect x=\"185\" y=\"4\" width=\"64\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"217\" y=\"21\">Distributors</text>\n            <rect x=\"254\" y=\"4\" width=\"44\" height=\"26\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/><text x=\"276\" y=\"21\">Banks</text>\n          </g>\n          <g stroke=\"#c7d2fe\" stroke-width=\"1.4\" fill=\"none\" marker-end=\"url(#ai)\">\n            <path d=\"M34,32 L34,58\"/><path d=\"M100,32 L100,58\"/><path d=\"M157,32 L157,58\"/>\n            <path d=\"M217,32 L217,58\"/><path d=\"M276,32 L276,58\"/>\n          </g>\n          <rect x=\"2\" y=\"63\" width=\"296\" height=\"34\" rx=\"9\" fill=\"#eef2ff\" stroke=\"#6366f1\" stroke-width=\"1.6\"/>\n          <text x=\"150\" y=\"79\" font-family=\"Plus Jakarta Sans\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" text-anchor=\"middle\">Company Brain</text>\n          <text x=\"150\" y=\"91\" font-family=\"Inter\" font-size=\"9.5\" fill=\"#4338ca\" text-anchor=\"middle\">understands the whole network together</text>\n\n          <g stroke=\"#6366f1\" stroke-width=\"1.4\" fill=\"none\" marker-end=\"url(#ai)\">\n            <path d=\"M62,100 L62,116\"/><path d=\"M150,100 L150,116\"/><path d=\"M238,100 L238,116\"/>\n          </g>\n          <g font-family=\"Inter\" font-size=\"9.5\" font-weight=\"600\" fill=\"#4338ca\" text-anchor=\"middle\">\n            <rect x=\"18\"  y=\"120\" width=\"88\" height=\"30\" rx=\"15\" fill=\"#f5f3ff\" stroke=\"#7c3aed\"/>\n            <text x=\"62\"  y=\"132\">Watches</text><text x=\"62\" y=\"144\">and decides</text>\n            <rect x=\"106\" y=\"120\" width=\"88\" height=\"30\" rx=\"15\" fill=\"#f5f3ff\" stroke=\"#7c3aed\"/>\n            <text x=\"150\" y=\"132\">Then does</text><text x=\"150\" y=\"144\">something</text>\n            <rect x=\"194\" y=\"120\" width=\"88\" height=\"30\" rx=\"15\" fill=\"#f5f3ff\" stroke=\"#7c3aed\"/>\n            <text x=\"238\" y=\"132\">Checks it</text><text x=\"238\" y=\"144\">worked</text>\n          </g>\n\n          <g stroke=\"#10b981\" stroke-width=\"1.6\" fill=\"none\" marker-end=\"url(#ae)\">\n            <path d=\"M62,154 L62,178\"/><path d=\"M150,154 L150,178\"/><path d=\"M238,154 L238,178\"/>\n          </g>\n          <g font-family=\"Inter\" font-size=\"10.5\" font-weight=\"600\" fill=\"#047857\" text-anchor=\"middle\">\n            <rect x=\"14\"  y=\"182\" width=\"96\" height=\"28\" rx=\"6\" fill=\"#ecfdf5\" stroke=\"#6ee7b7\"/><text x=\"62\"  y=\"200\">An outlet</text>\n            <rect x=\"112\" y=\"182\" width=\"76\" height=\"28\" rx=\"6\" fill=\"#ecfdf5\" stroke=\"#6ee7b7\"/><text x=\"150\" y=\"200\">Field team</text>\n            <rect x=\"190\" y=\"182\" width=\"96\" height=\"28\" rx=\"6\" fill=\"#ecfdf5\" stroke=\"#6ee7b7\"/><text x=\"238\" y=\"200\">A distributor</text>\n          </g>\n          <text x=\"150\" y=\"230\" font-family=\"Inter\" font-size=\"11\" font-weight=\"600\" fill=\"#047857\" text-anchor=\"middle\">and something actually changes</text>\n        </svg>"

export const onePager = (K) => {
  const {
    OnePagerPage,
    OnePagerHeader,
    OnePagerFooter,
    SectionHeading,
    OutcomeCard,
    OutcomeGrid,
    CtaBar,
    Callout,
    PhaseCard,
    PhaseRow,
    StepCard,
    StepGrid,
    Stack,
    Columns,
  } = K

  const foot = (
    <OnePagerFooter
      name="Anoop Jawahar"
      credential="Founder · Ex-CTO Sundial · 8 yrs Nutanix"
      right="synos.in"
    />
  )

  return {
    title: 'SynOS for Distributed Financial Services Networks',
    pages: [
      <OnePagerPage key="p1" gap="loose">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="For distributed financial networks"
          title={<>Company Brain <span className="sk-a">and Agent Platform</span></>}
          lede="Your network runs beautifully. Nobody can ask it anything."
          sub={
            <>
              Your platform moves the money and settles it. But every question worth asking needs four
              systems at once, so it becomes a week of somebody&rsquo;s time. SynOS gives you{' '}
              <b>one brain that understands how the network behaves</b>, and{' '}
              <b>agents that act on what it finds</b>.
            </>
          }
        />

        <div className="op-diagram">
          <Columns gap="snug">
            <div className="op-side">
              <div className="op-side-label op-side-label--now">Today</div>
              <div dangerouslySetInnerHTML={{ __html: SVG_TODAY }} />
            </div>
            <div className="op-side">
              <div className="op-side-label op-side-label--new">With SynOS</div>
              <div dangerouslySetInnerHTML={{ __html: SVG_SYNOS }} />
            </div>
          </Columns>
          <div className="op-diagram-cap">
            Same systems on both sides. <b>Nothing gets moved or migrated.</b> It reads what your team
            already built.
          </div>
        </div>

        <Stack gap="snug">
          <OutcomeCard
            title="Fewer outlets go dormant"
            body="Decline gets caught while it is still reversible, and something happens that same week rather than surfacing in the next quarterly review."
          />
          <OutcomeCard
            title="Lending losses drop"
            body="Credit decisions see behaviour, seasonality and support history, not just three months of transaction volume on its own."
          />
          <OutcomeCard
            title="More products per outlet"
            body="The right outlet gets offered the right next product at the point it is ready, instead of a blanket push down the whole channel."
          />
        </Stack>

        <Callout scale="print" tone="violet" label="What it takes from you">
          Read access to the systems your team already runs, and one engineer part time as the point
          of contact. <b>Nothing to migrate, no re-platforming, nobody to hire.</b> Runs inside your
          own environment.
        </Callout>

        {foot}
      </OnePagerPage>,

      <OnePagerPage key="p2" gap="loose">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="How it works in practice"
        />

        <div>
          <SectionHeading
            title={<>One of them, <span className="sk-a">start to finish</span></>}
            sub="Outlet retention. Runs every week, across the whole network, with nobody launching it."
          />
          <StepGrid columns={2}>
            <StepCard
              scale="print"
              num="1"
              title="It notices"
              body={<>An outlet&rsquo;s volumes are down three weeks running, <b>against its own seasonality</b> rather than a flat threshold.</>}
            />
            <StepCard
              scale="print"
              num="2"
              title="It works out why"
              body={<>Seasonality and district both check out. It is <b>two failed settlements and an unresolved ticket</b>, and a competitor is courting them.</>}
            />
            <StepCard
              scale="print"
              num="3"
              title="It does something"
              body={<>Clears the settlement, alerts the distributor with <b>the reason and what to say</b>, and holds the credit line rather than cutting it on falling volume.</>}
            />
            <StepCard
              scale="print"
              num="4"
              title="It checks it worked"
              body={<>Re-measures the following week. Recovered outlets close out. <b>The ones that do not, escalate</b> with the full history attached.</>}
            />
          </StepGrid>
        </div>

        <div>
          <SectionHeading
            title={<>The same thing, <span className="sk-a">for other problems</span></>}
            sub="You start with one. Each one after that is faster, because the brain is already there. It also sits under whatever your own team builds next."
          />
          <div className="op-three">
            <OutcomeCard
              tone="violet"
              title="Credit lines"
              body="Which outlets can safely take a bigger limit, underwritten on behaviour rather than volume alone."
            />
            <OutcomeCard
              tone="violet"
              title="Failure clusters"
              body="Where transaction failures are clustering, and whether it is a bank, a device or a district."
            />
            <OutcomeCard
              tone="violet"
              title="Distributors"
              body="Who is genuinely growing their network once you adjust for the territory they were given."
            />
          </div>
        </div>

        <div>
          <SectionHeading title="How the six weeks run" />
          <PhaseRow>
            <PhaseCard
              scale="print"
              when="Weeks 1 to 2"
              body={<>We connect to the systems your team already runs and build the brain. <b>First result by the end of week two.</b></>}
            />
            <PhaseCard
              scale="print"
              position="bridge"
              when="Weeks 3 to 5"
              body={<>The agent goes live proposing rather than acting, so you see what it would do <b>before it does anything</b>.</>}
            />
            <PhaseCard
              scale="print"
              position="far"
              when="Week 6"
              body={<>We measure the outcome <b>on your own reporting</b>, and you decide whether it continues.</>}
            />
          </PhaseRow>
        </div>

        <Callout scale="print" tone="emerald">
          <b>And it stays yours.</b> Everything your team teaches the system stays with you, and over
          time it becomes AI of your own, trained on how your business works.
        </Callout>

        <CtaBar
          tone="indigo"
          title={<>The first conversation is <span className="sk-a">one question.</span></>}
          body="Tell us something about the network you wanted answered last month and could not get. We will come with the answer, and with what the agent would do about it."
        />

        {foot}
      </OnePagerPage>,
    ],
  }
}
