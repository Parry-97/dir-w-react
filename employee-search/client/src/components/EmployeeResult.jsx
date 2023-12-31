import { Text, Container, Image, VStack, HStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

const EmployeeResult = ({ employeeData }) => {
  const navigate = useNavigate();

  return (
    <Container
      cursor={"pointer"}
      onClick={() => navigate(`/employees/${employeeData.id}`)}
      boxShadow={"xl"}
    >
      <HStack>
        <Image
          width={105}
          src={`http://localhost:3030/${employeeData.imageFilePath}`}
        ></Image>
        <Container
          display={"flex"}
          flexDir="column"
          gap={1}
          alignItems={"start"}
        >
          <Text fontSize={"2xl"}>
            {employeeData.firstName} {employeeData.lastName}
          </Text>
          <Text fontSize={"xl"}>{employeeData.teamName}</Text>
        </Container>
      </HStack>
    </Container>
  );
};

export default EmployeeResult;
