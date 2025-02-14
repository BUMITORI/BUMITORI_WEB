import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginMain from "./pages/LoginMain";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginMain />} />
      </Routes>
    </Router>
  );
}

export default App;
