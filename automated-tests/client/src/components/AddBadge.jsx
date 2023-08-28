import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { toast } from "./Toast";

export const AddBadge = ({ employee }) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [badgeSelectionError, setBadgeSelectionError] = useState(false);
  const [newBadgeId, setNewBadgeId] = useState();

  const handleSelectChange = (event) => {
    setBadgeSelectionError(false);
    setNewBadgeId(event.target.value);
  };

  // stable function to prevent re-running the selector if data hasn't changed
  const alphabetize = (data) => data.sort((a, b) => (b.name > a.name ? -1 : 1));

  const { isLoading, data: allBadges } = useQuery(
    ["badges", "all"],
    async () => {
      const response = await fetch("http://localhost:3030/badges");
      return response.json();
    },
    { select: alphabetize }
  );

  const { mutate: addBadge } = useMutation(
    async ({ badgeId, employeeId }) => {
      const response = await fetch(
        `http://localhost:3030/employees/${employeeId}/badges?badgeId=${badgeId}`,
        { method: "PATCH" }
      );
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
    },
    {
      onError: (error) => {
        toast({
          title: "Failed to add badge",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["employee", employee.id.toString()]);
        toast({
          title: "Badge added!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = () => {
    if (!newBadgeId && newBadgeId !== 0) {
      // don't submit if no badge has been selected
      setBadgeSelectionError(true);
    } else {
      addBadge({ badgeId: newBadgeId, employeeId: employee.id });
      setNewBadgeId(undefined);
      onClose();
    }
  };

  const onCancel = () => {
    setNewBadgeId(undefined);
    setBadgeSelectionError(false);
    onClose();
  };

  return (
    <>
      <VStack>
        <IconButton
          onClick={onOpen}
          width="100px"
          height="100px"
          isRound
          icon={<AddIcon />}
          aria-label="add new badge"
        />
        <Text size="lg">Add new badge</Text>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Badge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {badgeSelectionError ? (
              <Text textAlign="center" color="red" fontWeight={800}>
                Please select badge
              </Text>
            ) : null}
            <Select
              id="badge"
              placeholder="Select badge"
              value={newBadgeId}
              onChange={handleSelectChange}
            >
              {isLoading
                ? "Loading..."
                : allBadges
                    .filter((badge) => !employee.badgeIds.includes(badge.id))
                    .map((badge) => (
                      <option key={badge.id} value={badge.id}>
                        {badge.name}
                      </option>
                    ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSubmit}>
              Add badge
            </Button>
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
