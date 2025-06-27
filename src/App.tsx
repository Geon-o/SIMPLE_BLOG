import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "@components/navigation/Navigation.tsx";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
