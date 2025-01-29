import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default function Menu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/registration");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-900 to-black text-white flex flex-col items-center justify-center px-4">
      <header className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-green-500">5</div>
          <h1 className="text-lg font-semibold">Пятёрочка</h1>
        </div>
        <button className="text-white text-2xl" onClick={handleLogout}>
          ✖
        </button>
      </header>

      <div className="mt-8 w-full max-w-md bg-black/50 rounded-xl p-6 shadow-lg">
        <ul className="space-y-4 text-center">
          <li className="text-lg font-medium">Таблица лидеров</li>
          <li className="text-lg font-medium">Мои данные</li>
          <li>
            <button
              className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600"
              onClick={() => alert("Начинаем игру!")}
            >
              Играть
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
