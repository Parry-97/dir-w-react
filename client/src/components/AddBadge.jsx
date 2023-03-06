import { AddIcon } from '@chakra-ui/icons'
import { Text, IconButton, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Select } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'

const AddBadge = ({ existingBadges, onAdd }) => {
  const [showWarning, setShowWarning] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBadge, setSelectedBadge] = useState(undefined)
  const { data: badges, } = useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3030/badges');
      return response.json()
    },
    select: (data) => {
      return data?.filter(datum => !existingBadges.includes(datum.id))?.sort((a, b) => a.name > b.name)
    },
    onSuccess: (data) => {
      console.log('data', data)
    }
  })

  function onSubmit() {
    if (!selectedBadge) {
      setShowWarning(true)
      return;
    }
    onAdd(selectedBadge);
    setSelectedBadge(undefined)
    setShowWarning(false)
    onClose()
  }

  return (
    <>

      <VStack>
        <IconButton width={"100px"} onClick={onOpen} height={"100px"} aria-label='add-button' isRound={true}>
          <AddIcon ></AddIcon>
        </IconButton>
        <Text>Add new badge</Text>
      </VStack>
      <Modal isOpen={isOpen} onClose={() => { onClose(); setShowWarning(false); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new badge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {showWarning && <Text color={"red"} fontWeight="bold" textAlign={"center"}>Please select a badge</Text>}
            <Select placeholder='Select badge' onChange={(evt) =>
            // @ts-ignore
            { setSelectedBadge(evt.target.value); setShowWarning(false) }}>
              {badges?.filter((badge) => !(badge in existingBadges))?.map((badge) =>
                <option key={badge.id} value={badge.id}>{badge.name}</option>
              )}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onSubmit}>
              Add badge
            </Button>
            <Button colorScheme='gray' mr={3} onClick={() => { onClose(); setShowWarning(false) }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddBadge



