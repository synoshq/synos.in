import { SectionHeading, OutcomeGrid, OutcomeCard } from '@synos/brand-kit'
import { PrintFit } from './_lib/kit'

/** With the accented word and a sub — the shipped one-pager heading. */
export const WithSub = () => (
  <PrintFit width={620} style={{ padding: '20px 24px' }}>
    <SectionHeading
      title={
        <>
          What changes for <span className="sk-a">your team</span>
        </>
      }
      sub="Measured on the P&L, not on a dashboard."
    />
  </PrintFit>
)

/** Title only. */
export const TitleOnly = () => (
  <PrintFit width={620} style={{ padding: '20px 24px' }}>
    <SectionHeading title="What lands in week one" />
  </PrintFit>
)

/** In place: heading over the block it introduces. */
export const OverAGrid = () => (
  <PrintFit width={620} style={{ padding: '20px 24px' }}>
    <SectionHeading
      title={
        <>
          Where it <span className="sk-a">already works</span>
        </>
      }
      sub="Three engagements live, one of them paid."
    />
    <OutcomeGrid>
      <OutcomeCard title="Store managers stop chasing numbers" body="The brain answers, with the working shown." />
      <OutcomeCard title="Ops stops rebuilding the same report" body="One skill, versioned, reused across every region." />
    </OutcomeGrid>
  </PrintFit>
)
