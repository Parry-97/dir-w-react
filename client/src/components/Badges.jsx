import { Divider, Heading, SimpleGrid } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { queryClient } from '../query-client'
import AddBadge from './AddBadge'
import Badge from './Badge'
import { toast } from './Toast'

const Badges = ({ employee }) => {
  // const queryClient = useQueryClient();
  const { mutate: addBadgeMutate } = useMutation({
    mutationKey: ["addbadge"],
    mutationFn: async (badgeId) => {
      const response = await axios.patch(`http://localhost:3030/employees/${employee.id}/badges?badgeId=${badgeId}`)
      return response;
    },
    onError: (error) => {
      toast({
        title: "Failed to add badge",
        // @ts-ignore
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['employee'])

      toast({
        title: "Badge Added",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
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
