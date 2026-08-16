/*
 * 1pager-softlink-ceo — the account page for Softlink Global.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word below is the shipped page's own
 * (`synos-gtm/pitch-materials/1pager-softlink-ceo.html`).
 *
 * WHY THIS IS NOT `_ceo-template.jsx`. It was checked against it before a line was written, and it
 * is a different page. The template's two pages are: header, a pair of hand-drawn before/after
 * SVGs, an outcome stack, the four-step walkthrough, three adjacent problems, the six-week phase
 * row, a CTA. This page keeps only the walkthrough, the adjacent row, the phase row and the CTA,
 * and each of the other four positions is genuinely something else:
 *
 *   - The headline is TWO sentences and carries the whole argument, so there is no separate
 *     "Company Brain and Agent Platform" title line.
 *   - The before/after pair is not a diagram. It is the same six chips on both sides with a
 *     paragraph under each — the point being that the systems are identical and only what sits
 *     over them changes. Drawing that as an SVG would say less.
 *   - The outcomes are four cards in a 2x2 split TOPLINE / INTERNAL, which is the page's argument
 *     (this earns revenue AND fixes an internal bottleneck). The template's outcome stack has no
 *     such axis.
 *   - Page two opens on the asset block — the numbers about ICEGATE, the 5,000 businesses, the
 *     30 years of code. That block is the reason this account is worth a bespoke page at all and
 *     there is no position for it in the template.
 *
 * Two near-identical pages earn a template (that is how the CEO and CTO ones were born). One page
 * that shares four positions out of eight does not, and forcing it in would mean either bending the
 * template into slots nobody else uses or dropping the parts that make this page worth sending.
 */
export const onePager = (K) => {
  const {
    OnePagerPage,
    OnePagerHeader,
    OnePagerFooter,
    SectionHeading,
    OutcomeCard,
    CtaBar,
    Callout,
    Chip,
    ChipRow,
    Eyebrow,
    PhaseCard,
    PhaseRow,
    StepCard,
    StepGrid,
    Columns,
  } = K

  /* The two pages carry DIFFERENT credential lines — page one leads with the background, page two
     with the address to reply to. That is the source's own choice and is carried, not normalised. */
  const foot = (credential) => (
    <OnePagerFooter name="Anoop Jawahar" credential={credential} right="synos.in" />
  )

  /* The six systems, identical on both sides of the diagram — that identity IS the argument, so
     they are one array rendered twice rather than two lists that could drift apart. */
  const SYSTEMS = ['Logi-Sys', 'Live IMPEX', 'Documents', 'Email', '30 years of code', 'People']
  const systemChips = (tone) => (
    <ChipRow tight>
      {SYSTEMS.map((s) => (
        <Chip key={s} scale="print" tone={tone}>{s}</Chip>
      ))}
    </ChipRow>
  )

  return {
    title: 'SynOS for Softlink Global',
    pages: [
      <OnePagerPage key="p1" gap="loose">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="AI-Native Operating Layer · For Softlink Global"
          title={
            <>
              You have shipped the AI features.<br />
              Becoming an <span className="sk-a">AI-native ERP</span> is a different problem.
            </>
          }
          sub={
            <>
              Boxy, LogiBRAIN and LogiLENS put Softlink ahead of most of this industry. But in
              December CargoWise put an agentic AI workflow engine into every customer&rsquo;s pack
              and removed seat fees entirely, and a generation of AI-native platforms is being built
              with no legacy to carry. <b>AI features are becoming table stakes.</b> What separates
              an AI-native ERP is the layer underneath: <b>a brain for each client that gets more
              accurate every week it is used</b>, and experts and customers who can build what they
              need without going through engineering.
            </>
          }
        />

        {/* Same frame as the CEO template's diagram, different contents: chips over a paragraph
            rather than an SVG. `--text` left-aligns the column, because the centred variant exists
            for a drawing and a wrapping chip row centred on nothing reads as a mistake. */}
        <div className="op-diagram">
          <Columns gap="snug">
            <div className="op-side op-side--text">
              <div className="op-side-label op-side-label--now">Today</div>
              {systemChips('neutral')}
              <div className="op-flow op-flow--now">
                Every conversation starts from zero. What the system learns on Monday is gone by
                Friday. Every change to what an agent does goes back to engineering, and waits.
              </div>
            </div>
            <div className="op-side op-side--text">
              <div className="op-side-label op-side-label--new">With SynOS</div>
              {systemChips('indigo')}
              <div className="op-flow op-flow--new">
                <b>A brain per client</b> that understands how that forwarder actually operates.
                Agents read from it and act. Your experts correct them in plain English.{' '}
                <b>The brain keeps the correction, permanently, for everyone.</b>
              </div>
            </div>
          </Columns>
          <div className="op-diagram-cap">
            Same systems on both sides. <b>Nothing is moved, migrated or replaced.</b> It reads what
            you already run, inside your own environment.
          </div>
        </div>

        <div>
          <SectionHeading title={<>What it is worth to <span className="sk-a">Softlink</span></>} />
          {/* TOPLINE / INTERNAL is the page's argument, so the kicker is not decoration and the two
              hues have to stay distinguishable: emerald cards for revenue, violet for the internal
              bottleneck. */}
          <div className="op-two">
            <OutcomeCard
              title={
                <>
                  <Eyebrow scale="print" tone="emerald">Topline</Eyebrow>
                  A premium tier where customers build their own
                </>
              }
              body={
                <>
                  Your customers describe the workflow, report or dashboard they need in plain
                  English and get it, <b>on their own data, inside Logi-Sys, without a
                  developer</b>. Custom requirements stop becoming custom projects. It is a tier,
                  not a feature, and it upsells into <b>5,000 businesses already on the
                  platform</b>.
                </>
              }
            />
            <OutcomeCard
              title={
                <>
                  <Eyebrow scale="print" tone="emerald">Topline</Eyebrow>
                  Answers that get better the longer a customer stays
                </>
              }
              body={
                <>
                  Generic AI gives every forwarder the same answer. A brain that has absorbed{' '}
                  <b>one client&rsquo;s exceptions, rates and standing arrangements</b> gives that
                  client answers nobody else can. That is a renewal argument, and it strengthens
                  every year they stay.
                </>
              }
            />
            <OutcomeCard
              tone="violet"
              title={
                <>
                  <Eyebrow scale="print" tone="violet">Internal</Eyebrow>
                  Your experts change what agents do. Not your engineers.
                </>
              }
              body={
                <>
                  Someone who knows a filing rule or a client exception should be able to teach it
                  to the system directly, in plain English. Today that is a ticket, a sprint and a
                  release. <b>Engineering sets the rails once; the people with the knowledge do the
                  rest.</b>
                </>
              }
            />
            <OutcomeCard
              tone="violet"
              title={
                <>
                  <Eyebrow scale="print" tone="violet">Internal</Eyebrow>
                  Three decades of platform knowledge stops walking out of the door
                </>
              }
              body={
                <>
                  A long-lived product carries knowledge that lives in a few people rather than
                  anywhere readable. <b>Captured once, it becomes something a new joiner can ask</b>{' '}
                  so the platform gets easier to change rather than harder, without anything being
                  rewritten.
                </>
              }
            />
          </div>
        </div>

        <Callout scale="print" tone="violet" label="What it takes from you">
          Read access to the systems you already run, and <b>one person part time</b> as the point
          of contact. Nothing to migrate, nothing to clean up, nobody to hire, and not one existing
          system replaced. <b>It runs inside your own environment, and no client data moves
          anywhere.</b>
        </Callout>

        {foot('Founder, Synos Labs · Ex-CTO Sundial · 8 yrs Nutanix')}
      </OnePagerPage>,

      <OnePagerPage key="p2" gap="loose">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="Softlink Global · page 2"
        />

        {/* The asset block. Its first line is a real headline rather than a label, which is why it
            takes `.op-asset-h` and not the layer callout's inline heading. */}
        <Callout scale="print" tone="indigo" label="The part nobody else can buy">
          <b className="op-asset-h">
            You are sitting on the largest record of how Indian trade actually moves, and today
            none of it compounds.
          </b>
          A model trained on the internet knows what a bill of lading is. It does not know how{' '}
          <b>this</b> forwarder handles a short-shipped container, which charges <b>that</b> client
          has agreed to absorb, or the filing convention a broker learned in 2013. That knowledge
          lives in your code, your data, and the heads of people who will eventually retire.{' '}
          <b>Capture it first and you stop competing on features.</b>
          <div className="op-stat-row">
            <div className="op-stat">
              <div className="op-stat-n">~80%</div>
              <div className="op-stat-l">of Indian ICEGATE filings run through Live IMPEX</div>
            </div>
            <div className="op-stat">
              <div className="op-stat-n">5,000+</div>
              <div className="op-stat-l">logistics businesses on the platform</div>
            </div>
            <div className="op-stat">
              <div className="op-stat-n">50+</div>
              <div className="op-stat-l">countries, one million-plus users</div>
            </div>
            <div className="op-stat">
              <div className="op-stat-n">30 yrs</div>
              <div className="op-stat-l">of freight logic already written down in code</div>
            </div>
          </div>
        </Callout>

        <div>
          <SectionHeading title={<>One of them, <span className="sk-a">start to finish</span></>} />
          <StepGrid columns={2}>
            <StepCard
              scale="print"
              num="1"
              title="It answers"
              body={
                <>
                  A user asks why a charge appeared on an invoice. The agent answers correctly from
                  the ERP, <b>and misses that this client has a standing waiver</b> that was never
                  written down anywhere.
                </>
              }
            />
            <StepCard
              scale="print"
              num="2"
              title="Someone corrects it"
              body={
                <>
                  The operations lead types one sentence explaining the waiver. <b>No ticket, no
                  engineer, no release.</b> She is asked to confirm it, and it is recorded against
                  her name.
                </>
              }
            />
            <StepCard
              scale="print"
              num="3"
              title="It becomes knowledge"
              body={
                <>
                  That exception enters <b>that client&rsquo;s brain</b>. Every answer after it,
                  every user, every channel, including the customer&rsquo;s own portal, already
                  knows.
                </>
              }
            />
            {/* The fourth step lands the sequence, so the source turns it emerald. The kit has no
                "resolved" variant of a step and one page is not evidence that it should — carried
                as page furniture. */}
            <StepCard
              className="op-step-done"
              scale="print"
              num="4"
              title="And you can see it"
              body={
                <>
                  Accuracy for that client is scored weekly against questions your own experts
                  wrote. <b>The number goes up, and you can show a customer that it went up.</b>
                </>
              }
            />
          </StepGrid>
        </div>

        <div>
          <SectionHeading
            title={<>The same thing, <span className="sk-a">for the rest of it</span></>}
            sub="You start with one. Each one after that is faster, because the brain is already there."
          />
          <div className="op-three">
            <OutcomeCard
              tone="violet"
              title="A brain for your product team"
              body="What was decided, why, and what has already been tried, so a PRD starts from institutional memory rather than from whoever remembers."
            />
            <OutcomeCard
              tone="violet"
              title="A brain for engineering"
              body="Thirty years of Logi-Sys, answerable in plain English. New engineers stop being blocked on the few who were there when it was written."
            />
            <OutcomeCard
              tone="violet"
              title="Agents your customers build"
              body="A forwarder describes the report or automation they want in their own words, and gets it, inside Logi-Sys, on their own data. Custom work without custom work."
            />
          </div>
        </div>

        <div>
          <SectionHeading title={<>Six weeks, <span className="sk-a">one outcome</span></>} />
          <PhaseRow>
            <PhaseCard
              scale="print"
              when="Weeks 1–2"
              body={
                <>
                  We connect to the systems you already run and build the brain for <b>one client
                  and one team</b>. First result by the end of week two.
                </>
              }
            />
            <PhaseCard
              scale="print"
              position="bridge"
              when="Weeks 3–5"
              body={
                <>
                  Agents go live <b>proposing rather than acting</b>, so you see exactly what they
                  would do before anything is done. Your experts correct; the brain absorbs.
                </>
              }
            />
            <PhaseCard
              scale="print"
              position="far"
              when="Week 6"
              body={
                <>
                  We measure accuracy <b>on questions your own people wrote</b>, show whether it
                  improved over the six weeks, and you decide whether it continues.
                </>
              }
            />
          </PhaseRow>
        </div>

        <CtaBar
          tone="indigo"
          title={<>The first conversation is <span className="sk-a">one question.</span></>}
          body={
            <>
              Tell us something a customer asked your team last month that took three people and two
              systems to answer. We will come back with how the brain would have answered it, and
              what it would have learned by doing so. <b>Everything the system is taught stays
              yours</b>. AI of your own, built on how Softlink and your customers actually work,
              and it never leaves your environment.
            </>
          }
        />

        {foot('Founder, Synos Labs · anoop@synos.in')}
      </OnePagerPage>,
    ],
  }
}
