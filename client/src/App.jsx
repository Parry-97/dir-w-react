import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { Employee } from "./components/Employee";
import { Header } from "./components/Header";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <>
      <Header>
        <SearchInput></SearchInput>
      </Header>
      <Container maxW={"6xl"}>
        {/* route added in project 1 */}
        <Routes>
          <Route path="employees/:id" element={<Employee />} />
          <Route path="/" element={<SearchResults />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
