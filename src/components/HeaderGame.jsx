import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

// eslint-disable-next-line react/prop-types
export const HeaderGame = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out user
      localStorage.clear(); // Clear local storage

      // Clear cookies
      const cookies = document.cookie.split(";"); // Get all cookies
      cookies.forEach((cookie) => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`; // Set expiration date to past
      });

      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <header className="flex items-center justify-between absolute top-0 left-0 right-0 p-4 border-1 border-gray-500 m-5 rounded-2xl">
        <div className="flex items-center space-x-2s gap-1">
          <img src="/images/logo-x5.png" alt="logo" className="w-[120px]" />
          <img
            className="w-[120px]"
            src="https://www.vprok.ru/src/upload/full/image/36/02/320236.svg"
            alt="logo Vprok.ru"
          ></img>
        </div>
        {!open ? (
          <button
            style={{
              borderRadius: "50px",
              padding: "10px",
              backgroundColor: "#487238",
              width: "50px",
              height: "50px",
            }}
            className="text-2xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        ) : (
          <button
            style={{
              borderRadius: "50px",
              padding: "10px",
              backgroundColor: "#487238",
              width: "50px",
              height: "50px",
            }}
            className="text-2xl"
            onClick={() => setOpen(false)}
          >
            ✖
          </button>
        )}
      </header>
      {open ? (
        <div>
          <div className="mt-8 w-full bg-black/50 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <ul className="space-y-4 text-center w-full">
              <li
                className="text-lg font-medium w-full cursor-pointer"
                onClick={() => navigate("/leaderboard")}
              >
                Таблица лидеров
              </li>
              <li
                className="text-lg font-medium cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Мои данные
              </li>
              {currentUser && (
                <li
                  className="text-lg font-medium cursor-pointer"
                  onClick={handleLogout} // Use handleLogout here
                >
                  Выход
                </li>
              )}
              <li>
                <button
                  className="bg-transparent text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600"
                  onClick={() => navigate("/gameStart")}
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
