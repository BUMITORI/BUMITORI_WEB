import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./index.css";
import Main from "./pages/Main";
import NotAdmit from "./pages/Not-admit";
import NotAdmitAdmin from "./pages/Not-Admit-Admin";
import Alarm from "./pages/Alarm";
import OAuthSuccess from "./pages/Oauth-success";
import AdminMain from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/not-admit" element={<NotAdmit />} />
        <Route path="/not-admit-admin/:absentId" element={<NotAdmitAdmin />} />
        <Route path="/admin-main" element={<AdminMain/>} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
