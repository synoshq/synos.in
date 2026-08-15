/*
 * 1pager-financial-inclusion-ceo — content only. The layout is `_ceo-template.jsx`.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word below is the shipped page's own
 * (`synos-gtm/pitch-materials/1pager-financial-inclusion-ceo.html`, 2026-08-13).
 *
 * This file used to carry the layout too. It was measured at 0.99 identical to the
 * retail-multistore CEO page, so the layout moved into a template and this became what it always
 * was: a content object. The move was verified by rebuilding and diffing — byte-for-byte identical
 * to the version that shipped before it.
 */
import { ceoOnePager } from './_ceo-template.jsx'
import { SVG_TODAY, SVG_SYNOS } from './financial-inclusion-ceo-svgs.js'

export const onePager = (K) =>
  ceoOnePager(K, {
    title: 'SynOS for Distributed Financial Services Networks',
    tag: 'For distributed financial networks',
    lede: 'Your network runs beautifully. Nobody can ask it anything.',
    sub: (
      <>
        Your platform moves the money and settles it. But every question worth asking needs four
        systems at once, so it becomes a week of somebody&rsquo;s time. SynOS gives you{' '}
        <b>one brain that understands how the network behaves</b>, and{' '}
        <b>agents that act on what it finds</b>.
      </>
    ),
    svgToday: SVG_TODAY,
    svgSynos: SVG_SYNOS,
    diagramCap: <>It reads what your team already built.</>,
    outcomes: [
      {
        title: 'Fewer outlets go dormant',
        body: 'Decline gets caught while it is still reversible, and something happens that same week rather than surfacing in the next quarterly review.',
      },
      {
        title: 'Lending losses drop',
        body: 'Credit decisions see behaviour, seasonality and support history, not just three months of transaction volume on its own.',
      },
      {
        title: 'More products per outlet',
        body: 'The right outlet gets offered the right next product at the point it is ready, instead of a blanket push down the whole channel.',
      },
    ],
    whatItTakes: (
      <>
        Read access to the systems your team already runs, and one engineer part time as the point of
        contact. <b>Nothing to migrate, no re-platforming, nobody to hire.</b> Runs inside your own
        environment.
      </>
    ),
    walkthroughSub:
      'Outlet retention. Runs every week, across the whole network, with nobody launching it.',
    steps: [
      {
        title: 'It notices',
        body: (
          <>
            An outlet&rsquo;s volumes are down three weeks running, <b>against its own seasonality</b>{' '}
            rather than a flat threshold.
          </>
        ),
      },
      {
        title: 'It works out why',
        body: (
          <>
            Seasonality and district both check out. It is{' '}
            <b>two failed settlements and an unresolved ticket</b>, and a competitor is courting them.
          </>
        ),
      },
      {
        title: 'It does something',
        body: (
          <>
            Clears the settlement, alerts the distributor with <b>the reason and what to say</b>, and
            holds the credit line rather than cutting it on falling volume.
          </>
        ),
      },
      {
        title: 'It checks it worked',
        body: (
          <>
            Re-measures the following week. Recovered outlets close out.{' '}
            <b>The ones that do not, escalate</b> with the full history attached.
          </>
        ),
      },
    ],
    adjacentSub:
      'You start with one. Each one after that is faster, because the brain is already there. It also sits under whatever your own team builds next.',
    adjacent: [
      {
        title: 'Credit lines',
        body: 'Which outlets can safely take a bigger limit, underwritten on behaviour rather than volume alone.',
      },
      {
        title: 'Failure clusters',
        body: 'Where transaction failures are clustering, and whether it is a bank, a device or a district.',
      },
      {
        title: 'Distributors',
        body: 'Who is genuinely growing their network once you adjust for the territory they were given.',
      },
    ],
    weeks12: <>We connect to the systems your team already runs and build the brain.</>,
    cta: 'Tell us something about the network you wanted answered last month and could not get. We will come with the answer, and with what the agent would do about it.',
  })
