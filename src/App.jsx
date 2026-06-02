import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import ProblemDetail from "./pages/ProblemDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/problem/:slug"
          element={<ProblemDetail />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;