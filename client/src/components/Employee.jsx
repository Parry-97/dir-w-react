import { Divider, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Badges from "./Badges";
import { Loading } from "./Loading";

export function Employee() {
  const { id } = useParams();
  const { isError, isLoading, data } = useQuery(["employee", id], async () => {
    const response = await fetch(`http://localhost:3030/employees/${id}`);
    return response.json();
  });


  const currentMutations = useIsMutating()
  if (currentMutations > 0) {
    return <Loading></Loading>
  }

  if (isLoading || isError) return null;



  return (
    <VStack spacing={10}>
      <HStack spacing={10} alignItems="center" justifyContent="center">
        <Image
          boxSize="175px"
          src={`http://localhost:3030/${data.imageFilePath}`}
          alt={`${data.firstName} ${data.lastName}`}
        />
        <VStack alignItems="flex-start">
          <HStack>
            <Heading fontSize="4xl">{data.firstName}</Heading>
            <Text fontSize="2xl">{data.lastName}</Text>
          </HStack>
          <HStack alignItems="baseline">
            <Text fontSize="xl" textAlign="right">
              {data.jobTitle}
            </Text>
            <Text>|</Text>
            <Text fontSize="md" textAlign="right">
              {data.teamName}
            </Text>
          </HStack>

        </VStack>

        <Text color="white" />
      </HStack>
      <Divider orientation="horizontal" borderWidth={"0.5px"} borderColor={"#010119"} />
      <Badges employee={data} />
    </ VStack>
  );
}
