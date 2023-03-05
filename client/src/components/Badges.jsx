import { Divider, Heading, SimpleGrid } from '@chakra-ui/react'
import AddBadge from './AddBadge'
import Badge from './Badge'

const Badges = ({ employee }) => {

  console.log(employee)

  return (
    <div>
      {!employee?.badgeDetails.length && (<> <Heading textAlign={"center"}>No Badges yet</Heading> </>)}
      {employee?.badgeDetails.length > 0 &&
        (<>
          <Heading textAlign={"center"}>Badges</Heading>
          <SimpleGrid mt={5} gap={20} columns={3}>
            {employee.badgeDetails?.map((badge) =>
              <Badge key={badge.id} badge={badge} />
            )}
            <AddBadge existingBadges={employee.badgeDetails.map((badge) => badge.id)} onAdd={(badge) => console.log(`SELECTED BADGE ID: ${badge}`)} />
          </SimpleGrid>
        </>)}
    </div>
  )
}

export default Badges
