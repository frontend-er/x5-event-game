import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Registration from "./Registration";
import Menu from "./Menu";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-900 to-black text-white">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/registration" />} />

          {/* Registration Page */}
          <Route path="/registration" element={<Registration />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Menu Page */}
          <Route path="/menu" element={<Menu />} />

          {/* Game Page */}
          <Route path="/game" element={<div>Game</div>} />

          {/* 404 Page */}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
