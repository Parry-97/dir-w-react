import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { useSearchTerm } from "../hooks/useSearchTerm";
import { EmployeeResult } from "./EmployeeResult";

export const SearchResults = () => {
  const [searchTerm] = useSearchTerm();

  const {
    data: searchResults,
    isLoading,
    isFetching,
  } = useQuery(
    ["search", searchTerm],
    async () => {
      const response = await fetch(
        `http://localhost:3030/employees?q=${searchTerm}`
      );
      return response.json();
    },
    { refetchOnWindowFocus: false }
  );

  if (isFetching) {
    return (
      <Spinner
        position={"fixed"}
        top={"50%"}
        margin="auto"
        left={0}
        right={0}
      ></Spinner>
    );
  }

  return (
    <>
      <Heading size="md" pb={4}>
        {searchTerm ? "Search Results" : "All Employees"} (
        {searchResults && searchResults.length})
      </Heading>

      <SimpleGrid columns={2} spacing={4}>
        {searchResults &&
          searchResults.map((employee) => (
            <EmployeeResult key={employee.id} employee={employee} />
          ))}
      </SimpleGrid>
    </>
  );
};
