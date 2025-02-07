import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, leaderboardRef } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Header } from "./components/Header";

export default function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const locations = [
    "Саларьево (Vprok.ru)",
    "Вешки (Vprok.ru)",
    "Троицкий (Vprok.ru)",
    "Даркстор X5 Доставка",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user) {
      navigate("/gameStart");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
        form.phone
      );
      const currentUser = userCredential.user;

      const saveUser = async () => {
        if (currentUser) {
          const userDocRef = doc(leaderboardRef, currentUser.email);
          await setDoc(
            userDocRef,
            {
              name: form.name,
              location: form.location,
              email: form.email,
              phone: form.phone,
              score: 0,
            },
            { merge: true }
          );
        }
      };

      await saveUser();

      navigate("/gameStart");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="text-white flex flex-col items-center justify-center px-4">
      <Header>
        <div
          style={{
            height: "calc(100dvh - 200px)",
          }}
          className="w-full max-w-md bg-black/50 rounded-xl p-6 shadow-lg overflow-scroll mt-[120px] mb-[120px] h-full"
        >
          <h2
            className="text-2xl font-semibold mb-4"
            style={{
              fontFamily: "Sans-Bold",
            }}
          >
            Регистрация{" "}
            <span className="text-green-400">
              {" "}
              <br />
              Account
            </span>
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-600 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="name"
              placeholder="ФИО"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-600 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full bg-gray-600 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Выберите локацию
              </option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-600 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Телефон"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-gray-600 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
            >
              Регистрация
            </button>
            <button
              type="button"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
              onClick={() => navigate("/login")}
            >
              Уже есть аккаунт? Войти
            </button>
            <div>
              <input
                className="mr-4"
                type="checkbox"
                id="terms"
                name="terms"
                required
              />
              <label htmlFor="terms" className="text-white">
                Я даю согласие на обработку моих данных в соответствии с{" "}
                <a
                  href="https://x5staff.ru/konfidence/"
                  className="text-green-400"
                >
                  Политикой конфиденциальности
                </a>
              </label>
            </div>
            <div>
              <input
                className="mr-4"
                type="checkbox"
                id="terms"
                name="terms"
                required
              />
              <label htmlFor="terms" className="text-white">
                Я соглашаюсь с
                <a href="/gameStart" className="text-white ml-1">
                  правилами игры
                </a>
              </label>
            </div>
          </form>
        </div>
      </Header>
    </div>
  );
}
