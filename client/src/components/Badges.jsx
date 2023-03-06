import { Divider, Heading, SimpleGrid } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import AddBadge from './AddBadge'
import Badge from './Badge'

const Badges = ({ employee }) => {
  const queryClient = useQueryClient();
  const { mutate: addBadgeMutate } = useMutation({
    mutationKey: ["addbadge"],
    mutationFn: async (badgeId) => {
      const response = await axios.patch(`http://localhost:3030/employees/${employee.id}/badges?badgeId=${badgeId}`)
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['employee'])
    }
  })
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
            <AddBadge existingBadges={employee.badgeDetails.map((badge) => badge.id)} onAdd={addBadgeMutate} />
          </SimpleGrid>
        </>)}
    </div>
  )
}

export default Badges
