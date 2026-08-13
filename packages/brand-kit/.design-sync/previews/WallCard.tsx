import { WallCard } from '@synos/brand-kit'
import { Deck, Stack } from './_lib/kit'

/** Wall 01. The red left rule is fixed — a wall is always pain. */
export const NoSharedContext = () => (
  <Deck>
    <WallCard quote="“Nobody knows what anyone else automated.”" tag="No shared context." />
  </Deck>
)

/** Wall 02. */
export const NoWayToDeploy = () => (
  <Deck>
    <WallCard quote="“It works on my laptop and nowhere else.”" tag="No way to deploy." />
  </Deck>
)

/** Wall 03. */
export const NoAccessControl = () => (
  <Deck>
    <WallCard quote="“I am not letting an agent touch that system.”" tag="No access control." />
  </Deck>
)

/** Three walls stacked, so the rhythm of the block is visible. */
export const Stacked = () => (
  <Deck>
    <Stack gap={10}>
      <WallCard quote="“We rebuilt the same workflow four times.”" tag="Nothing is reusable." />
      <WallCard quote="“Nobody can tell me whether it actually worked.”" tag="Nothing is measured." />
      <WallCard quote="“Every model swap means starting over.”" tag="Nothing is portable." />
    </Stack>
  </Deck>
)
