import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Leaderboard from "./LeaderBoard";
import { Game } from "./Game";
import UserData from "./UserData";

function App() {
  return (
    <Router>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-900 via-green-900 to-black text-white flex flex-col items-center justify-center overflow-hidden">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/registration" />} />

          {/* Registration Page */}
          <Route path="/registration" element={<Registration />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* User data */}
          <Route path="/profile" element={<UserData />} />

          {/* Leaderboard Page */}
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* 404 Page */}
          <Route path="*" element={<div>404</div>} />

          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
