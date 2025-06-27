import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "@components/navigation/Navigation.tsx";
import {Container} from "@chakra-ui/react";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="*" element={
          <Container maxW={'1423px'}>
            <h1>404</h1>
          </Container>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
