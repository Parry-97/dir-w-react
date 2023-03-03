import { Divider, Heading, SimpleGrid } from '@chakra-ui/react'
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
          </SimpleGrid>
        </>)}
    </div>
  )
}

export default Badges
