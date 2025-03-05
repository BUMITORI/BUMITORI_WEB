import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginMain from "./pages/LoginMain";
import HeaderPage from "./pages/HeaderPage";
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginMain />} />
        <Route path="/header" element={<HeaderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
