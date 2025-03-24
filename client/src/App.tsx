import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./index.css";
import Main from "./pages/Main";
import AlarmBox from "./shared/components/AlarmBox";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/glgl"
          element={
            <AlarmBox
              isAlarm="알림"
              name="강민지"
              roomNumber={205}
              date="2월 28일(일) 4:55"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
