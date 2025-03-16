import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./index.css";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
