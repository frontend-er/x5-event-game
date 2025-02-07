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
import GameStart from "./GameStart";

function App() {
  return (
    <Router>
      <div
        className="min-h-screen min-w-screen bg-gradient-to-br from-blue-900 via-green-900 to-black text-white flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(0.278turn, rgba(0, 146, 58, 1) 0%, rgba(77, 192, 105, 1) 51%, rgba(21, 165, 70, 1) 100%)",
        }}
      >
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

          <Route path="/gameStart" element={<GameStart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
