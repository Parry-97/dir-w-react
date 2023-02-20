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

  return <div>Employee</div>;
};

export default Employee;
