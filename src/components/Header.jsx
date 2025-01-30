import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Header = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="flex items-center justify-between w-full max-w-md absolute top-0 left-0 right-0 p-4">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-green-500">5</div>
          <h1 className="text-lg font-semibold">Пятёрочка</h1>
        </div>
        {!open ? (
          <button className=" text-2xl" onClick={() => setOpen(true)}>
            ☰
          </button>
        ) : (
          <button className=" text-2xl" onClick={() => setOpen(false)}>
            ✖
          </button>
        )}
      </header>
      {open ? (
        <div>
          <div className="mt-8 w-full bg-black/50 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <ul className="space-y-4 text-center w-full">
              <li
                className="text-lg font-medium w-full"
                onClick={() => navigate("/leaderboard")}
              >
                Таблица лидеров
              </li>
              <li
                className="text-lg font-medium"
                onClick={() => navigate("/profile")}
              >
                Мои данные
              </li>
              <li>
                <button
                  className="bg-transparent text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600"
                  onClick={() => navigate("/game")}
                >
                  Играть
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};
