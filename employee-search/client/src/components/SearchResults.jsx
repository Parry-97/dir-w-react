import { Container, Text, HStack, VStack, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmployeeResult from "./EmployeeResult";

function useDebounceValue(value, time = 250) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debounceValue;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams({ q: "" });
  const debouncedSearchParam = useDebounceValue(searchParams.get("q"));

  const {
    data: employeeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees", debouncedSearchParam],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3030/employees?q=${debouncedSearchParam}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container marginTop={"10"} maxW={"6xl"}>
      <Heading fontSize={"2xl"}>
        {searchParams.get("q")
          ? `Search Results (${employeeData?.length})`
          : `All Employees (${employeeData?.length})`}
      </Heading>
      <Container
        marginTop={10}
        gridTemplateColumns="1fr 1fr"
        maxW={"5xl"}
        rowGap={10}
        columnGap={10}
        display={"grid"}
      >
        {employeeData?.map((employee) => (
          <EmployeeResult key={employee.id} employeeData={employee} />
        ))}
      </Container>
    </Container>
  );
};

export default SearchResults;
