import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Header } from "./components/Header";

export default function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Redirect to menu if user is already signed in
    if (auth.currentUser) {
      navigate("/game");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Firebase registration
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      navigate("/game"); // Redirect to menu on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="  text-white flex flex-col items-center justify-center px-4">
      <Header>
        <div className="mt-8 w-full max-w-md bg-black/50 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Регистрация <span className="text-green-400">Account</span>
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="name"
              placeholder="ФИО"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
            >
              Вход
            </button>
          </form>
        </div>
      </Header>
    </div>
  );
}
