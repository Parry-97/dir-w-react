import axios from "axios";

export const getEmployeeById = async function (id) {
  const response = await axios.get(`http://localhost:3030/employees/${id}`);
  return response.data;
};
