import { CtaBar } from '@synos/brand-kit'
import { PrintFit } from './_lib/kit'

/** The newest treatment: indigo → teal gradient, teal border. */
export const Teal = () => (
  <PrintFit width={620} style={{ padding: 22 }}>
    <CtaBar
      title="Start with one team."
      body="Two weeks to a working Company Brain on your own cloud, with your own data, under your own access rules."
      right={
        <span>
          <b>hello@synos.in</b>
          <br />
          synos.in
        </span>
      }
    />
  </PrintFit>
)

/** `tone="indigo"` — the CTO pair. */
export const Indigo = () => (
  <PrintFit width={620} style={{ padding: 22 }}>
    <CtaBar
      tone="indigo"
      title="Book the technical walkthrough."
      body="Thirty minutes, your architecture on the screen, no slides."
      right={
        <span>
          <b>hello@synos.in</b>
          <br />
          synos.in
        </span>
      }
    />
  </PrintFit>
)

/** Title only — the compact closer. */
export const TitleOnly = () => (
  <PrintFit width={620} style={{ padding: 22 }}>
    <CtaBar title="Start with one team." right={<b>hello@synos.in</b>} />
  </PrintFit>
)
