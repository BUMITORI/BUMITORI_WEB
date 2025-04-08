import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./index.css";
import Main from "./pages/Main";
import NotAdmit from "./pages/Not-admit";
import AdminMain from "./admin/AdminMain";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/not-admit" element={<NotAdmit />} />
        <Route path="/admin-main" element={<AdminMain date="4월 5일" />} />
      </Routes>
    </Router>
  );
}

export default App;
