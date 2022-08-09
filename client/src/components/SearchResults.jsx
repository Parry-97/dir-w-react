import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { useSearchQuery } from "../hooks/useSearchQuery";
import { EmployeeResult } from "./EmployeeResult";

export const SearchResults = () => {
  const [searchQuery] = useSearchQuery();

  const { data: searchResults, isLoading } = useQuery(
    ["search", searchQuery],
    async () => {
      const response = await fetch(
        `http://localhost:3030/employees?q=${searchQuery}`
      );
      return response.json();
    }
  );

  if (isLoading) return <Text>Loading...</Text>;
  return (
    <>
      <Heading size="md" pb={4}>
        {searchQuery ? "Search Results" : "All Employees"} (
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
