import {
  Heading,
  HStack,
  VStack,
  Image,
  Text,
  Container,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { getEmployeeById } from "../services/employees";

const Employee = () => {
  const employeeId = useParams().id;
  const {
    data: employeeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId),
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>No Employee found</div>;
  }

  return (
    <div>
      <HStack
        direction="row"
        justify="flex-start"
        align="center"
        spacing={8}
        // boxShadow="md"
        p={2}
        w="100vw"
      >
        <Image
          width={175}
          src={`http://localhost:3030/${employeeData.imageFilePath}`}
        ></Image>
        <VStack>
          <Container display={"flex"} gap={2}>
            <Heading as="h1" display={"inline"} size="lg">
              {employeeData.firstName}
            </Heading>
            <Text fontSize={"2xl"}>{employeeData.lastName}</Text>
          </Container>
          <Container display={"flex"} alignItems="center" gap={2}>
            <Text fontSize="xl">{employeeData.jobTitle}</Text>
            <Text>|</Text>
            <Text>{employeeData.teamName}</Text>
          </Container>
          <Text></Text>
        </VStack>
      </HStack>
    </div>
  );
};

export default Employee;
