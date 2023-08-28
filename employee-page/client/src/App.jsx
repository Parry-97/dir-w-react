import { Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Employee from "./components/Employee";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <>
      <Header>
        <SearchInput></SearchInput>
      </Header>
      <Container pt="6" maxW="container.md">
        {/* add non-header content here */}
        <Routes>
          <Route path="/employees/:id" element={<Employee />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
