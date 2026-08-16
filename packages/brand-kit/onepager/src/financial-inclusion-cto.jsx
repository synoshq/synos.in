/*
 * 1pager-financial-inclusion-cto — content only. The layout is `_cto-template.jsx`.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word below is the shipped page's own
 * (`synos-gtm/pitch-materials/1pager-financial-inclusion-cto.html`).
 */
import { ctoOnePager } from './_cto-template.jsx'

export const onePager = (K) =>
  ctoOnePager(K, {
    title: 'SynOS for Distributed Financial Services Networks · technical brief',
    tag: 'For distributed financial services networks',
    lede: (
      <>
        Your network runs beautifully. <span className="sk-a">Nobody can ask it anything.</span>
      </>
    ),
    sub: (
      <>
        Your platform moves the money and settles it. But the questions that decide the business, like
        which outlets are losing volume or who can safely be lent more, each need four systems at
        once. So each one becomes a person building a sheet for a week, and most are never asked.
        SynOS gives you <b>a Company Brain that understands how your network behaves</b>, and{' '}
        <b>agents that act on what it finds</b>.
      </>
    ),
    stakes: (
      <>
        <b>
          In a thin margin network, the outlet is the asset, and the asset walks. Commissions sit
          within a percentage point of every competitor, so nobody retains an outlet on rate. You
          retain it by spotting that its volumes have slid for <span className="op-fig">three weeks</span>{' '}
          and fixing the cause that same day. Across <span className="op-fig">tens of thousands</span> of
          points that almost never happens in time, because spotting it means joining transactions,
          settlement and support data that sit in different places.
        </b>
      </>
    ),
    outcomesTitle: <>What changes, <span className="sk-a">measured on your own numbers</span></>,
    outcomesSub: (
      <>
        The pilot moves <b>one of these, chosen by you, measured the way you already measure it</b>.
        Not all four at once.
      </>
    ),
    outcomes: [
      { title: 'Fewer outlets go dormant', body: 'Decline gets caught while it is still reversible, and something actually happens that week rather than surfacing in the next quarterly review.' },
      { title: 'Lending losses drop', body: 'Credit decisions see behaviour, seasonality and support history, not just three months of transaction volume on its own.' },
      { title: 'More products per outlet', body: 'The right outlet gets offered the right next product at the point it is ready for it, instead of a blanket push down the whole channel.' },
      { title: 'Problems surface earlier', body: 'Unusual patterns, failure clusters and leakage get flagged as they form, at the level of the individual outlet.' },
    ],
    layersTitle: (
      <>
        What you are actually getting: <span className="sk-a">a Company Brain, and agents that act on it</span>
      </>
    ),
    layersSub: 'Two layers. The brain understands your network. The agents do something about what it sees.',
    layers: [
      {
        kicker: 'Layer 1 · the infrastructure',
        tone: 'indigo',
        title: 'A Company Brain',
        body: (
          <>
            {' '}One place that understands the whole network: every outlet, every distributor, and the
            language your business actually uses for things. It reads what your team already built and
            learns where the truth for each thing lives. <b>Nothing gets migrated.</b>
          </>
        ),
      },
      {
        kicker: 'Layer 2 · the work',
        tone: 'violet',
        title: 'Agents that act',
        body: (
          <>
            {' '}On top of that brain, agents that watch for what matters, work out why it is happening,
            do something about it, and check whether it worked.{' '}
            <b>Each one is built around a problem you actually have, rather than picked off a shelf.</b>{' '}
            You start with one and add more as they earn your trust.
          </>
        ),
      },
    ],
    layersJoint: (
      <>
        Because every agent shares the same brain, <b>the second one starts where the first finished</b>.
        The first takes six weeks, because the brain gets built alongside it. The ones after that take
        days.
      </>
    ),
    actsTitle: <>What <span className="sk-a">“acts” means: one agent, start to finish</span></>,
    actsSub: 'Outlet retention. Runs every week, across the whole network, with nobody launching it.',
    steps: [
      { title: 'Notices', body: <>An outlet&rsquo;s volumes are down three weeks running, <b>against its own seasonality rather than a flat threshold</b>, so genuine slow weeks do not trigger it.</> },
      { title: 'Works out why', body: <>Seasonality and district both check out. It is <b>two failed settlements and an unresolved ticket</b> from last month, and a competitor is courting them.</> },
      { title: 'Does something', body: <>Clears the settlement, alerts the distributor with <b>the reason and what to say</b>, and holds the outlet&rsquo;s credit line rather than cutting it on falling volume.</> },
      { title: 'Checks it worked', body: <>Re-measures the following week. Recovered outlets close out. <b>The ones that do not, escalate</b> with the full history attached.</> },
    ],
    objectionsTitle: <>Why this is not something <span className="sk-a">your team would simply build</span></>,
    objectionsSub: 'Three fair objections, answered directly.',
    objections: [
      { q: '“Our engineers could build this.”', a: <>They could, and they should keep building. This is the layer underneath, so <b>whatever they build next starts from a brain that already understands the network</b>. Building this part yourself is six to twelve months and senior hires, all off your roadmap.</> },
      { q: '“We already have MIS and dashboards.”', a: <>A dashboard listing four hundred declining outlets helps nobody. <b>Somebody still has to work out which are recoverable, why, and do something about each one</b>, at a scale no field team covers.</> },
      { q: '“Our platform already has the data.”', a: <>It has the transactions. The questions that matter also need settlement, support history, distributor and field data. <b>We do not move any of it. We read it where it already sits.</b></> },
    ],
    ownLine: (
      <>
        <b>And it stays yours.</b> The same environment captures traces, corrections and evals as your
        team works, the training ground for fine-tuned models you own, on your own infrastructure.
      </>
    ),
    ctaTitle: <>Pick one number you want moved. <span className="sk-a">Six weeks.</span></>,
    ctaBody:
      'We agree what success looks like before we start, and measure it against your own reporting rather than ours. You keep everything built, whether or not you continue.',
    brainTitle: <>The Company Brain: <span className="sk-a">how it knows your network</span></>,
    brainSub:
      'This is the part that takes six months and a specialist team to build in house, and it is what the agents run on.',
    brain: [
      { title: 'It reads your systems directly', body: <>Your transaction platform, settlement, bank interfaces, support, distributor and field data. It learns where the truth for each thing lives and goes there when asked. <b>No warehouse project, nothing copied out.</b></> },
      { title: 'It learns how you talk', body: <>Your outlet codes, distributor hierarchy, product names, the way your business describes a good month. So a question asked in plain English <b>lands on the right data and comes back right</b>.</> },
      { title: 'It stays current on its own', body: <>A new bank partner, a new product down the channel, a changed system: it picks that up and carries on, <b>instead of decaying into something needing a rebuild next year</b>.</> },
      { title: 'It keeps what your people know', body: <>The rules, exceptions and judgement calls your best field and credit people carry in their heads get captured once and stay in the business, <b>including after those people leave</b>.</> },
    ],
    asksTitle: <>Things you can just ask it, <span className="sk-a">in plain English</span></>,
    asksSub:
      'Not a fixed set of reports. These each need three or four of your systems at once, which is why they are not asked today.',
    asks: [
      '“Which outlets look like they are about to leave us, and what is driving it in each case?”',
      '“Which distributors are actually growing their network, once you adjust for territory?”',
      '“Which outlets can safely take a larger credit line this quarter, and why?”',
      '“Where are transaction failures clustering, and is it a bank, a device or a district?”',
    ],
    agentsTitle: 'Agents you can run on it',
    agentsSub:
      'These fit most distributed networks. If your problem is not on the list, that is fine. Agents get built on the brain, so they follow your business rather than a product roadmap.',
    agents: [
      { title: 'Outlet retention', body: <>Catches decline against each outlet&rsquo;s own pattern, works out the cause, fixes what it can and briefs the distributor on the rest. <b>The example on page one.</b></> },
      { title: 'Credit decisions', body: <>Underwrites channel lending on <b>behaviour, seasonality, support history and settlement reliability</b>, not just months of transaction volume. Proposes the limit and the reasoning behind it.</> },
      { title: 'Anomaly and leakage', body: <>Learns each outlet&rsquo;s normal rhythm and flags what breaks it, <b>as it forms and per outlet</b>, rather than in a monthly exception report nobody reads in time.</> },
      { title: 'Next product', body: <>Which outlets are ready for insurance, a wallet or a new service, <b>ranked by likelihood</b>, with the pitch that fits the customer base they actually serve.</> },
      { title: 'Distributor performance', body: <>Which distributors are growing their network and which are coasting, <b>separating territory from effort</b>, so the conversation is about the right thing.</> },
      { title: 'Settlement exceptions', body: <>Chases what is stuck before the outlet notices and calls, since <b>a failed settlement is the fastest way to lose one</b>. Field staff can ask it directly, in their own language.</> },
    ],
    plugTitle: 'It reads what your team already built',
    plugBody:
      'No migration, no re-platforming, no warehouse project. Your platform stays as it is, and anything your team builds next reads from the same brain.',
    plugChips: [
      'Your transaction platform',
      'Settlement and reconciliation',
      'Bank and core banking interfaces',
      'Support and ticketing',
      'Distributor and field data',
      'Reaches people on WhatsApp',
    ],
    moneyTitle: <>What it takes from you, <span className="sk-a">and how the six weeks run</span></>,
    provide: 'Read access to the systems you already run, and one engineer part time as the point of contact.',
    doNot: 'Migrate data. Re-platform. Hire a specialist team. Change anything your engineers have built.',
    whereItRuns:
      'Inside your own environment. Regulated data and audit requirements handled up front, not retrofitted later.',
    weeks12: (
      <>
        We connect to the systems your team already runs and build the brain.{' '}
        <b>First result by the end of week two.</b>
      </>
    ),
    proof: (
      <>
        The same system runs today inside <b>an auto manufacturer</b> (operations and cost agents
        across their cloud estate), <b>a US database company</b>, <b>a marketing technology platform</b>{' '}
        serving its own clients, and <b>a healthtech company</b>, where one team moved onto it in six
        weeks: a shared source of truth the team works from, a checking agent posting what needs
        attention at 6:30 each morning with nobody running it, and an agent that proposes changes on a
        live account and waits for approval. Anoop&rsquo;s previous company built systems of this kind
        for <b>OpenAI and Character.AI</b>.
      </>
    ),
    closingAsk:
      'Tell us something about your network you wanted answered last month and could not get. We will show you the answer, and what the agent would do about it.',
  })
