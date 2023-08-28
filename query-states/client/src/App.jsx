import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { Employee } from "./components/Employee";
import { Header } from "./components/Header";
import { SearchResults } from "./components/SearchResults";
import { ToastContainer } from "./components/Toast";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Container pt="6" maxW="container.md">
        <Routes>
          <Route path="/" element={<SearchResults />} />
          <Route path="employees/:id" element={<Employee />} />
        </Routes>
      </Container>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
