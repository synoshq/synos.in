import { WallGrid, WallCard } from '@synos/brand-kit'
import { DeckFit, SLIDE_BODY } from './_lib/kit'

/** The six walls, as the deck draws them: two rows of three. */
export const SixWalls = () => (
  <DeckFit width={SLIDE_BODY}>
    <WallGrid>
      <WallCard quote="“Nobody knows what anyone else automated.”" tag="No shared context." />
      <WallCard quote="“It works on my laptop and nowhere else.”" tag="No way to deploy." />
      <WallCard quote="“I am not letting an agent touch that system.”" tag="No access control." />
      <WallCard quote="“We rebuilt the same workflow four times.”" tag="Nothing is reusable." />
      <WallCard quote="“Nobody can tell me whether it actually worked.”" tag="Nothing is measured." />
      <WallCard quote="“Every model swap means starting over.”" tag="Nothing is portable." />
    </WallGrid>
  </DeckFit>
)

/** One row of three — the short version, when the slide only has room for half. */
export const ThreeUp = () => (
  <DeckFit width={SLIDE_BODY}>
    <WallGrid>
      <WallCard quote="“Nobody knows what anyone else automated.”" tag="No shared context." />
      <WallCard quote="“It works on my laptop and nowhere else.”" tag="No way to deploy." />
      <WallCard quote="“I am not letting an agent touch that system.”" tag="No access control." />
    </WallGrid>
  </DeckFit>
)
