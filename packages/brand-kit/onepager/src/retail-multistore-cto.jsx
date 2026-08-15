/*
 * 1pager-retail-multistore-cto — content only. The layout is `_cto-template.jsx`.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word below is the shipped page's own
 * (`synos-gtm/pitch-materials/1pager-retail-multistore-cto.html`).
 *
 * Two real differences from the financial-inclusion CTO page, both carried rather than normalised:
 * this page asks SIX plain-English questions instead of four, and it has no "and it stays yours"
 * line — its close is the proof block. `ownLine` is therefore optional in the template.
 */
import { ctoOnePager } from './_cto-template.jsx'

export const onePager = (K) =>
  ctoOnePager(K, {
    title: 'SynOS for Multi-store Retail Groups — technical brief',
    tag: 'For multi-store retail groups',
    lede: (
      <>
        You already have the reports. <span className="sk-a">Nothing happens because of them.</span>
      </>
    ),
    sub: (
      <>
        Someone still has to read them and then make sure something actually happens, store by store,
        day after day. And a question that falls outside what your systems were built to answer costs
        two weeks of somebody&rsquo;s time, so it never gets asked at all. SynOS gives your business{' '}
        <b>a Company Brain that understands how you operate</b>, and{' '}
        <b>agents that act on what it finds</b>.
      </>
    ),
    stakes: (
      <>
        <b>
          This is where the margin goes. Four in five retailers lose{' '}
          <span className="op-fig">5%+ of operating margin</span> to problems that were visible and
          never acted on. The stock transfer nobody raised. The ageing units nobody moved. On a
          business running <span className="op-fig">4 to 8% net margin</span>, that is most of the
          profit, and more dashboards have not fixed it. The information was already there.
        </b>
      </>
    ),
    outcomesTitle: <>What changes, <span className="sk-a">in your P&amp;L</span></>,
    outcomesSub: (
      <>
        The pilot moves <b>one of these, chosen by you, measured on your own reporting</b>. Not all
        four at once.
      </>
    ),
    outcomes: [
      { title: 'Attach rate goes up', body: 'Accessories, care plans and finance carry roughly double the margin of the box itself. On thin net margins, a small shift in mix pays for the year.' },
      { title: 'Less capital sitting still', body: 'Ageing stock gets moved, bundled or marked down while it still has margin left in it, rather than after it has gone.' },
      { title: 'Upgrades stop being missed', body: "Every customer due a replacement gets reached, with the right offer at the right moment, before they walk into somebody else's store." },
      { title: 'Store quality stops depending on who is on shift', body: 'New staff sell the way your best staff sell, in their own language, from their first week rather than their sixth month.' },
    ],
    layersTitle: (
      <>
        What you are actually getting: <span className="sk-a">a Company Brain, and agents that act on it</span>
      </>
    ),
    layersSub: 'Two layers. The brain understands your business. The agents do something about what it sees.',
    layers: [
      {
        kicker: 'Layer 1 · the infrastructure',
        tone: 'indigo',
        title: 'A Company Brain',
        body: (
          <>
            {' '}One place that understands your whole business: every store, every brand, and the
            language your business actually uses for things. It reads the systems you already run and
            works out where the truth for each thing lives. <b>Nothing gets moved or migrated.</b>
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
        The first agent takes six weeks because the brain gets built alongside it. The ones after that
        take days. And you are not buying six separate tools, each needing its own integration and its
        own explanation of how your business works.
      </>
    ),
    actsTitle: <>What <span className="sk-a">“acts” means: one agent, start to finish</span></>,
    actsSub: 'Attach rate. Runs every week, in every store, with nobody launching it.',
    steps: [
      { title: 'Notices', body: <>One store&rsquo;s accessory and care plan attach has slipped <b>below its own past three months</b>, and below comparable stores.</> },
      { title: 'Works out why', body: <>Footfall is normal and stock is fine. It is <b>two people who joined six weeks ago</b>, working the same shifts and missing the same attachments.</> },
      { title: 'Does something', body: <>Sends those two a short brief <b>on their phone, in their language</b>: the exact products to offer with this month&rsquo;s mix, and what to say.</> },
      { title: 'Checks it worked', body: <>Re-measures next week. If it moved, it moves on. <b>If it did not, it escalates to the manager</b> with what it already tried.</> },
    ],
    objectionsTitle: <>Why this is not something <span className="sk-a">you already have</span></>,
    objectionsSub: 'Three fair objections, answered directly.',
    objections: [
      { q: '“Our ERP already does reorder points and transfers.”', a: <>It does, and you should keep it. That is a threshold on one system, and a person still has to raise the indent and chase it. <b>This works across billing, service, rosters and finance at the same time, and it does the chasing.</b></> },
      { q: '“We have dashboards and reports already.”', a: <>Everyone does, and that is the point. <b>Four in five retailers still lose margin to things the dashboard already showed them.</b> Reports do not act. Nobody has spare hours to read one per store per day.</> },
      { q: '“We could just hire two more analysts.”', a: <>Two analysts can tell you what happened last month. <b>They cannot tell the person at the counter what to say right now</b>, in their language, in every store, every day. And each new question is another week of their time.</> },
    ],
    ctaTitle: <>Pick one number you want moved. <span className="sk-a">Six weeks.</span></>,
    ctaBody:
      'We agree what success looks like before we start, and measure it against your own reporting rather than ours. You keep everything built, whether or not you continue.',
    brainTitle: <>The Company Brain: <span className="sk-a">how it knows your business</span></>,
    brainSub:
      'This is the part that takes six months and a specialist team to build in house, and it is what the agents run on.',
    brain: [
      { title: 'It reads your systems directly', body: <>Billing, stock, service centres, rosters, loyalty, finance partners. It learns where the truth for each thing lives and goes there when asked. <b>No warehouse project, no cleanup exercise, nothing copied out.</b></> },
      { title: 'It learns how you talk', body: <>Your brands, your store codes, your categories, the names your business actually uses for things. So a question asked in plain English <b>lands on the right data and comes back right</b>.</> },
      { title: 'It stays current on its own', body: <>A new store, a new brand, a changed system: it picks that up and carries on, <b>instead of decaying into something that needs rebuilding next year</b>.</> },
      { title: 'It keeps what your people know', body: <>The rules, exceptions and judgement calls that live in your best managers&rsquo; heads get captured once and stay in the business, <b>including after those people leave</b>.</> },
    ],
    asksTitle: <>Things you can just ask it, <span className="sk-a">in plain English</span></>,
    asksSub:
      'Not a fixed set of reports. Any question about your business, answered in minutes rather than as a two week project. These each need three or four of your systems at once, which is why nobody asks them today.',
    asks: [
      '“Which customers who bought two years ago have not been back, and what is the right offer for each of them?”',
      '“Why did attach rate drop in Kochi last month, and is it the same reason as Coimbatore?”',
      '“Which stores run out of what before the weekend, and who nearby is holding spare?”',
      '“What is sitting in stock past ninety days that we could still move at full margin?”',
      '“Which of my new joiners are behind, and on which products specifically?”',
      '“If we run an exchange offer next month, which stores and which customers should we aim it at?”',
    ],
    agentsTitle: 'Agents you can run on it',
    agentsSub:
      'These fit most retail groups. If the problem you care about is not on this list, that is fine. The agents get built on the brain, so they follow your business rather than a product roadmap.',
    agents: [
      { title: 'Attach rate coach', body: <>Finds where accessories, care plans and finance are being left on the table, works out which person or shift it is, and <b>coaches them directly</b>. The example on page one.</> },
      { title: 'Upgrade and exchange', body: <>Who is due a replacement, from purchase date, <b>device age out of your service centres</b>, stock on hand and finance eligibility. Produces the call list, the offer and the script.</> },
      { title: 'Launch allocation', body: <>Splits launch stock across stores on real demand signal rather than gut feel, then <b>rebalances daily</b> through launch week as the actual numbers land.</> },
      { title: 'Ageing stock', body: <>Flags units past the point where they still earn their margin and proposes <b>move it, bundle it, or mark it down</b>, with the rupee impact of each option.</> },
      { title: "Store manager's morning brief", body: <>One message per manager: <b>the three things that changed in their store</b> overnight, and what to do about each. Not another dashboard nobody opens.</> },
      { title: 'Counter assistant', body: <>Staff ask anything, from stock to policy to exchange value, and get a real answer <b>in their own language</b>, from live data rather than a printed FAQ.</> },
    ],
    plugTitle: 'It reads what you already run',
    plugBody:
      'No migration, no cleanup project, no replacing anything. Keep every system you have, and anything you buy later reads from the same brain.',
    plugChips: [
      'Your POS and billing',
      'ERP and inventory',
      'Service centre systems',
      'Loyalty and CRM',
      'Staff rosters',
      'Finance and EMI partners',
    ],
    moneyTitle: <>What it takes from you, <span className="sk-a">and how the six weeks run</span></>,
    provide: 'Read access to the systems you already run, and one person part time as the point of contact.',
    doNot: 'Migrate data. Clean data. Hire anyone. Change or replace a single existing system.',
    whereItRuns: 'Inside your own environment, if that is what you prefer.',
    weeks12: (
      <>
        We connect to the systems you already run and build the brain.{' '}
        <b>First result by the end of week two.</b>
      </>
    ),
    proof: (
      <>
        The same system is running today inside <b>an auto manufacturer</b> (operations and cost agents
        across their cloud estate), <b>a US database company</b>, <b>a marketing technology platform</b>{' '}
        serving its own clients, and <b>a healthtech company</b>, where one team moved onto it in six
        weeks: a shared source of truth the team works from, a checking agent that posts what needs
        attention at 6:30 every morning with nobody running it, and an agent that proposes changes on a
        live account and waits for a person to approve. Anoop&rsquo;s previous company built systems of
        this kind for <b>OpenAI and Character.AI</b>.
      </>
    ),
    closingAsk:
      'Tell us something about your business you wanted answered last month and could not get. We will show you the answer, and what the agent would do about it.',
  })
