import { Caption, WallGrid, WallCard } from '@synos/brand-kit'
import { Deck, DeckFit, SLIDE_BODY } from './_lib/kit'

/** The centred line under a body block. `<strong>` goes indigo — that is the convention. */
export const Summary = () => (
  <Deck>
    <Caption>
      Both doors have converted. <strong>The next quarter picks the wedge.</strong>
    </Caption>
  </Deck>
)

/** `italic` — an attributed remark rather than a summary. */
export const Italic = () => (
  <Deck>
    <Caption italic>“We stopped rebuilding the same report in every region.” — Head of Ops, retail multi-store</Caption>
  </Deck>
)

/** In place: the caption doing its job under the block it explains. */
export const UnderABlock = () => (
  <DeckFit width={SLIDE_BODY}>
    <WallGrid>
      <WallCard quote="“Nobody knows what anyone else automated.”" tag="No shared context." />
      <WallCard quote="“It works on my laptop and nowhere else.”" tag="No way to deploy." />
      <WallCard quote="“I am not letting an agent touch that system.”" tag="No access control." />
    </WallGrid>
    <Caption>
      Six walls. <strong>One layer that answers all six.</strong>
    </Caption>
  </DeckFit>
)
