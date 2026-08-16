/*
 * 1pager-department-brains — the page that sells one brain per team rather than one platform.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word below is the shipped page's own
 * (`synos-gtm/pitch-materials/1pager-department-brains.html`).
 *
 * THE ONE THAT DID NOT CLEAR THE REGISTER TEST. Scaling every source font size by 18% put the
 * other three dense pages within 12px of one A4; this one came out 224px over. The reason is the
 * twelve `.ask` lines — four quoted questions inside each of three brain columns, each one its own
 * ruled line. They are also the best thing on the page: a reader recognises their own job in
 * "Which accounts have gone quiet and why?" in a way no feature list achieves.
 *
 * So the port does not touch them, and does not shrink the type back to reclaim the room. It uses
 * `.op-ask--tight` (the CTO page's quoted-question line at the dense page's measure) and lets the
 * rhythm absorb the rest. If it still does not fit, the honest options are Anoop's, not mine:
 * three questions per brain instead of four, or a second page. Neither is a layout decision.
 */
export const onePager = (K) => {
  const { OnePagerPage, OnePagerHeader, CtaBar, Callout, Chip, ChipRow, Eyebrow } = K

  const BRAINS = [
    {
      tone: 'indigo',
      name: 'Product Brain',
      who: 'Product · engineering · support',
      plug: <>Plugs into <b>Jira, your codebase, release notes, support tickets, customer calls</b></>,
      asks: [
        'Why does this module behave this way, and who decided it?',
        'Which customers are affected if we change this?',
        'Draft the release note from what actually shipped.',
        'What did we promise this customer, and did we ship it?',
      ],
      win: <>The context that lives in <b>two people&rsquo;s heads</b> becomes something the whole team can ask.</>,
    },
    {
      tone: 'violet',
      name: 'Sales Brain',
      who: 'Sales · pre-sales · account teams',
      plug: <>Plugs into <b>your CRM, proposals, pricing sheets, email, past deals</b></>,
      asks: [
        'What did we quote a customer like this, and what did they push back on?',
        'Build the proposal from the three closest deals we’ve won.',
        'Which accounts have gone quiet and why?',
        'Answer this RFP from what we’ve already answered before.',
      ],
      win: <>A new rep starts with <b>everything the team has learned</b>, not a folder of decks.</>,
    },
    {
      tone: 'emerald',
      name: 'Marketing Brain',
      who: 'Marketing · growth · content',
      plug: <>Plugs into <b>your campaign tools, analytics, website, ad accounts, brand guidelines</b></>,
      asks: [
        'Which campaigns actually worked for this segment last year?',
        'Write this in our voice, using rules we’ve already agreed.',
        'Flag what’s underperforming before the month closes.',
        'Who are we actually reaching, and who are we missing?',
      ],
      win: <>The team ships <b>without waiting on analysts</b> for every number.</>,
    },
  ]

  const BUILD = [
    ['01', 'Connect', 'Point it at the systems that team already uses. Nothing is copied out or moved.'],
    ['02', 'It reads everything', 'Spreadsheets and databases alongside documents, tickets and threads.'],
    ['03', 'It maps how you work', 'Your customers, your products, your terms, including where the same thing has five names.'],
    ['04', 'Your experts correct it', 'The people who know the rules fix what’s wrong, in plain English. It remembers.'],
    ['05', 'It stays current', 'New data, new decisions and new corrections keep folding in, so it doesn’t go stale.'],
  ]

  const DIFF = [
    ['It goes and looks', 'It reads your live systems directly, so answers reflect today, not the day someone last exported a file.'],
    ['It knows the joins', 'The same customer under four different IDs across four systems is one customer here. Search can’t do that.'],
    ['It learns from corrections', 'Fix it once and it stays fixed, for everyone, including whoever joins next year.'],
    ['It captures the unwritten', 'The exceptions and judgment calls that were never in a document get captured from the people who hold them.'],
  ]

  const MORE = ['Finance Brain', 'Operations Brain', 'Support Brain', 'HR Brain', 'Cloud & DevOps Brain', 'One company-wide brain, with each team’s view of it']

  return {
    title: 'SynOS: give every team its own brain',
    pages: [
      <OnePagerPage key="p1" gap="tight" className="op-dense">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="Make your teams AI-native, one department at a time"
          title={<>Give every team <span className="sk-a">its own brain.</span></>}
          sub={
            <>
              A Product Brain. A Sales Brain. A Marketing Brain. Each one connects to the systems
              that team already runs on, learns how that team actually works, and then answers their
              questions and does their repetitive work. Built in weeks rather than quarters, and your data
              never leaves your own servers.
            </>
          }
        />

        <Callout scale="print" tone="red">
          <b>Your people are already using AI. It just doesn&rsquo;t know anything about your
          company.</b> So every question starts from zero, every answer has to be checked, and the
          one person who knows the real rules keeps getting interrupted. The usual fix, gathering the
          documents into one place and searching them, goes stale the week after you build it, and it
          was never the hard part. The hard part is everything that was never written down.
        </Callout>

        <div>
          <Eyebrow scale="print">
            Start with one team <span className="op-hint">· then add the next</span>
          </Eyebrow>
          <div className="op-three op-three--tight">
            {BRAINS.map((b) => (
              <Callout key={b.name} scale="print" tone={b.tone} accent="top" fill="neutral" className="op-col">
                <b className="op-lay-h">{b.name}</b>
                <div className="op-who">{b.who}</div>
                <div className="op-tile-d">{b.plug}</div>
                {/* The four questions. This is what the reader recognises themselves in, and the
                    reason this page is worth more than a feature list. */}
                <div className="op-asks">
                  {b.asks.map((a) => (
                    <div className="op-ask op-ask--tight" key={a}>{a}</div>
                  ))}
                </div>
                <div className={`op-win${b.tone === 'indigo' ? '' : ` op-win--${b.tone}`}`}>{b.win}</div>
              </Callout>
            ))}
          </div>
        </div>

        <div className="op-more">
          <span className="op-more-t">Same layer, any team:</span>
          <ChipRow tight>
            {MORE.map((m) => (
              <Chip key={m} scale="print">{m}</Chip>
            ))}
          </ChipRow>
        </div>

        <div>
          <Eyebrow scale="print">
            How a brain gets built <span className="op-hint">· weeks, and no data team required</span>
          </Eyebrow>
          <div className="op-microrow op-microrow--5">
            {BUILD.map(([i, n, d]) => (
              <div className="op-micro" key={i}>
                <div className="op-micro-i">{i}</div>
                <div className="op-micro-n">{n}</div>
                <div className="op-micro-d">{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Eyebrow scale="print">What that team can do once it has one</Eyebrow>
          <div className="op-three op-three--tight">
            <div className="op-tile">
              <div className="op-tile-n">Ask, and get an answer you can check</div>
              <div className="op-tile-d">
                In plain language, from Slack, WhatsApp or a browser. Every answer{' '}
                <b>shows where it came from</b>, so nobody has to take it on faith.
              </div>
            </div>
            <div className="op-tile">
              <div className="op-tile-n">Hand over the repetitive work</div>
              <div className="op-tile-d">
                The weekly report, the reconciliation, the chasing. It{' '}
                <b>proposes first and acts once trusted</b>, and runs without anyone present.
              </div>
            </div>
            <div className="op-tile">
              <div className="op-tile-n">Build their own tools</div>
              <div className="op-tile-d">
                Someone describes the dashboard or the checklist they need and it gets built,{' '}
                <b>no ticket, no waiting on engineering</b>.
              </div>
            </div>
          </div>
        </div>

        <Callout scale="print" tone="indigo" label="Why this is different from putting your documents in one place · the part that usually fails without anyone noticing">
          <div className="op-four">
            {DIFF.map(([n, d]) => (
              <div className="op-brain-f" key={n}>
                <div className="op-brain-n">{n}</div>
                <div className="op-brain-d">{d}</div>
              </div>
            ))}
          </div>
        </Callout>

        <ChipRow tight>
          <Chip scale="print" tone="indigo" mono>YOUR SERVERS</Chip>
          <Chip scale="print">Your cloud or on-premise · your data never leaves</Chip>
          <Chip scale="print">Each team sees only what it should</Chip>
          <Chip scale="print">Every answer traceable to its source</Chip>
          <Chip scale="print">Works with the AI tools your people already use · no lock-in to one provider</Chip>
        </ChipRow>

        <CtaBar
          tone="indigo"
          title={<>Pick one team. One brain. <span className="sk-a">Four to six weeks.</span></>}
          body={
            <>
              We agree what success looks like before we start, usually that the team uses it daily
              without anyone from engineering in the loop. You keep the brain and everything built on
              it, whether or not you continue.
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
