/*
 * 1pager-retail-multistore-ceo — content only. The layout is `_ceo-template.jsx`.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word below is the shipped page's own
 * (`synos-gtm/pitch-materials/1pager-retail-multistore-ceo.html`).
 *
 * This page and the financial-inclusion one measured 0.99 identical as markup, which is what
 * produced the template. The one structural difference between them is real and carried: retail has
 * a FOURTH outcome card, the round-the-clock customer answering. It is not padding — it is the only
 * outcome on either page about the end customer rather than the operator.
 */
import { ceoOnePager } from './_ceo-template.jsx'
import { SVG_TODAY, SVG_SYNOS } from './retail-multistore-ceo-svgs.js'

export const onePager = (K) =>
  ceoOnePager(K, {
    title: 'SynOS for Multi-store Retail Groups',
    tag: 'For multi-store retail groups',
    lede: 'You already have the reports. Nothing happens because of them.',
    sub: (
      <>
        Someone still has to read them and then make sure something follows, store by store, day
        after day. SynOS gives your business <b>one brain that understands how you operate</b>, and{' '}
        <b>agents that act on what it finds</b>.
      </>
    ),
    svgToday: SVG_TODAY,
    svgSynos: SVG_SYNOS,
    diagramCap: <>It reads what you already run.</>,
    outcomes: [
      {
        title: 'Attach rate goes up',
        body: 'Accessories, care plans and finance carry roughly double the margin of the box itself. On thin net margins, a small shift in mix pays for the year.',
      },
      {
        title: 'Less capital sitting still',
        body: 'Ageing stock gets moved, bundled or marked down while it still has margin left in it, rather than after it has gone.',
      },
      {
        title: "Fewer customers walk into somebody else's store",
        body: 'Everyone due a replacement gets reached, with the right offer, at the point they are actually ready to buy it.',
      },
      {
        title: 'Customers get answered, day or night',
        body: 'Repair status, warranty, stock and exchange value answered around the clock, in their language. The ones that are really an upgrade waiting to happen come back to your team.',
      },
    ],
    whatItTakes: (
      <>
        Read access to the systems you already run, and one person part time as the point of contact.{' '}
        <b>Nothing to migrate, nothing to clean up, nobody to hire, and not one existing system
        replaced.</b>
      </>
    ),
    walkthroughSub: 'Attach rate. Runs every week, in every store, with nobody launching it.',
    steps: [
      {
        title: 'It notices',
        body: (
          <>
            One store&rsquo;s accessory and care plan attach has slipped{' '}
            <b>below its own past three months</b>, and below comparable stores.
          </>
        ),
      },
      {
        title: 'It works out why',
        body: (
          <>
            Footfall is normal and stock is fine. It is <b>two people who joined six weeks ago</b>,
            working the same shifts and missing the same attachments.
          </>
        ),
      },
      {
        title: 'It does something',
        body: (
          <>
            Sends those two a short brief <b>on their phone, in their own language</b>: the exact
            products to offer with this month&rsquo;s mix, and what to say.
          </>
        ),
      },
      {
        title: 'It checks it worked',
        body: (
          <>
            Re-measures the next week. If it moved, it moves on.{' '}
            <b>If it did not, it escalates to the manager</b> with what it already tried.
          </>
        ),
      },
    ],
    adjacentSub:
      'You start with one. Each one after that is faster, because the brain is already there.',
    adjacent: [
      {
        title: 'Upgrades',
        body: 'Who is due a replacement, using device age from your service centres, and what to offer each of them.',
      },
      {
        title: 'Ageing stock',
        body: 'What is about to stop earning its margin, and whether to move it, bundle it or discount it.',
      },
      {
        title: 'Where to grow next',
        body: 'Your own numbers set against outside market data, to show where you are already saturated and where your customers are still uncovered.',
      },
    ],
    weeks12: <>We connect to the systems you already run and build the brain.</>,
    cta: 'Tell us something about your business you wanted answered last month and could not get. We will come with the answer, and with what the agent would do about it.',
  })
