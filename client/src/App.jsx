import { Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Employee from "./components/Employee";

function App() {
  return (
    <>
      <Header />
      <Container pt="6" maxW="container.md">
        {/* add non-header content here */}
        <Router>
          <Routes>
            <Route path="/employees/:id" element={<Employee />}></Route>
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
