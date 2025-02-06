import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/gameStart");
    }
  }, [user]);

  return (
    <div className="text-white flex flex-col items-center justify-center px-4">
      <Header>
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-900 to-black text-white flex flex-col items-center justify-center px-4">
          <div className="mt-8 w-full max-w-md bg-black/50 rounded-xl p-6 shadow-lg">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{
                fontFamily: "Sans-Bold",
              }}
            >
              Логин <span className="text-green-400">Account</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
              >
                Вход
              </button>
              <button
                onClick={() => navigate("/registration")}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
              >
                Регистрация
              </button>
            </form>
          </div>
        </div>
      </Header>
    </div>
  );
}
