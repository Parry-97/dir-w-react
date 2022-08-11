import { Container, Text } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { Employee } from "./components/Employee";
import { Header } from "./components/Header";
import { Loading } from "./components/Loading";
import { SearchResults } from "./components/SearchResults";
import { ToastContainer } from "./components/Toast";

function App() {
  return (
    <>
      <Loading />
      <Header />
      <Container pt="6" maxW="container.md">
        <Routes>
          <Route path="/" element={<SearchResults />} />
          <Route path="employees/:id" element={<Employee />} />
        </Routes>
      </Container>
      <Text color="white"></Text>
      <ToastContainer />
    </>
  );
}

export default App;
