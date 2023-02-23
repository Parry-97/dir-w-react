import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { Employee } from "./components/Employee";
import { Header } from "./components/Header";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <>
      <Header>
        <SearchInput></SearchInput>
      </Header>
      <Container pt="6" maxW="container.md">
        {/* route added in project 1 */}
        <Routes>
          <Route path="employees/:id" element={<Employee />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
