import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { useSearchTerm } from "../hooks/useSearchTerm";
import { EmployeeResult } from "./EmployeeResult";

export const SearchResults = () => {
  const [searchTerm] = useSearchTerm();

  const { data: searchResults, isLoading } = useQuery(
    ["search", searchTerm],
    async () => {
      const response = await fetch(
        `http://localhost:3030/employees?q=${searchTerm}`
      );
      return response.json();
    }
  );

  if (isLoading) return <Text>Loading...</Text>;
  return (
    <>
      <Heading size="md" pb={4}>
        {searchTerm ? "Search Results" : "All Employees"} (
        {searchResults.length})
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        {searchResults.map((employee) => (
          <EmployeeResult key={employee.id} employee={employee} />
        ))}
      </SimpleGrid>
    </>
  );
};
