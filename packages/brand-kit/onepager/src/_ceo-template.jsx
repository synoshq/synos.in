/*
 * The CEO one-pager template.
 *
 * WHY A TEMPLATE AND NOT A SECOND COPY. Measured before it was written: the financial-inclusion and
 * retail-multistore CEO pages are **0.99 identical** as markup. They are the same two pages with
 * different nouns — same header, same before/after diagram pair, same outcome stack, same
 * four-step walkthrough, same three adjacent problems, same six-week phase row, same CTA. Two
 * hand-maintained copies of that is how one of them quietly stops matching the other after the
 * next edit, and there are more of these to come.
 *
 * So the LAYOUT lives here once and each page supplies only its words. A page file is now a content
 * object, which is also the honest description of what it always was.
 *
 * RE-PLATFORMING, NOT A REWRITE, still holds. Extracting this template was verified by rebuilding
 * `financial-inclusion-ceo` and diffing: **byte-for-byte identical** to the version that shipped
 * before the refactor. That check is the whole reason this was safe to do at all.
 *
 * The two SVG diagrams are carried across BYTE-FOR-BYTE, injected rather than transcribed into
 * JSX. They are hand-drawn illustrations, not brand vocabulary: the kit has no diagram language and
 * should not grow one, and re-typing 40 shaped elements is a way to introduce differences that then
 * get mistaken for design decisions. Their literal colours are the source's own and are the one
 * place in this build that does not read a token.
 */

/**
 * @param K the built brand-kit module.
 * @param c the page's content. Every field is the source page's own words.
 */
export const ceoOnePager = (K, c) => {
  const {
    OnePagerPage,
    OnePagerHeader,
    OnePagerFooter,
    SectionHeading,
    OutcomeCard,
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
    title: c.title,
    pages: [
      <OnePagerPage key="p1" gap="loose">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag={c.tag}
          title={<>Company Brain <span className="sk-a">and Agent Platform</span></>}
          lede={c.lede}
          sub={c.sub}
        />

        <div className="op-diagram">
          <Columns gap="snug">
            <div className="op-side">
              <div className="op-side-label op-side-label--now">Today</div>
              <div dangerouslySetInnerHTML={{ __html: c.svgToday }} />
            </div>
            <div className="op-side">
              <div className="op-side-label op-side-label--new">With SynOS</div>
              <div dangerouslySetInnerHTML={{ __html: c.svgSynos }} />
            </div>
          </Columns>
          <div className="op-diagram-cap">
            Same systems on both sides. <b>Nothing gets moved or migrated.</b> {c.diagramCap}
          </div>
        </div>

        <Stack gap="snug">
          {c.outcomes.map((o) => (
            <OutcomeCard key={o.title} title={o.title} body={o.body} />
          ))}
        </Stack>

        <Callout scale="print" tone="violet" label="What it takes from you">
          {c.whatItTakes}
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
            sub={c.walkthroughSub}
          />
          <StepGrid columns={2}>
            {c.steps.map((s, i) => (
              <StepCard key={s.title} scale="print" num={String(i + 1)} title={s.title} body={s.body} />
            ))}
          </StepGrid>
        </div>

        <div>
          <SectionHeading
            title={<>The same thing, <span className="sk-a">for other problems</span></>}
            sub={c.adjacentSub}
          />
          <div className="op-three">
            {c.adjacent.map((a) => (
              <OutcomeCard key={a.title} tone="violet" title={a.title} body={a.body} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title="How the six weeks run" />
          <PhaseRow>
            <PhaseCard
              scale="print"
              when="Weeks 1 to 2"
              body={
                <>
                  {c.weeks12} <b>First result by the end of week two.</b>
                </>
              }
            />
            <PhaseCard
              scale="print"
              position="bridge"
              when="Weeks 3 to 5"
              body={
                <>
                  The agent goes live proposing rather than acting, so you see what it would do{' '}
                  <b>before it does anything</b>.
                </>
              }
            />
            <PhaseCard
              scale="print"
              position="far"
              when="Week 6"
              body={
                <>
                  We measure the outcome <b>on your own reporting</b>, and you decide whether it
                  continues.
                </>
              }
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
          body={c.cta}
        />

        {foot}
      </OnePagerPage>,
    ],
  }
}
