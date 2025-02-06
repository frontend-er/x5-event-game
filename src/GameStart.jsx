import { useNavigate } from "react-router-dom";
import { HeaderGame } from "./components/HeaderGame";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const GameStart = () => {
  const navigate = useNavigate();
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
    <div>
      <HeaderGame>
        <div
          className="flex flex-col w-screen gap-5 h-screen p-5 overflow-auto"
          style={{
            marginTop: "110px",
          }}
        >
          <h1
            style={{
              fontFamily: "Sans-Bold",
            }}
          >
            Игра «Мастер сборки»
          </h1>

          <div>
            <img
              src="https://static.tildacdn.com/tild6531-3635-4233-b932-356539616465/_.jpg"
              alt=""
              className="rounded-xl h-[20%] w-[100%] object-cover"
            />
            <div
              style={{
                marginTop: "20px",
              }}
            >
              Представь себя ловким сборщиком заказов в оживленном магазине.
              Перед тобой длинный прилавок, заполненный разнообразными товарами.
              С помощью тапов ты перемещаешься вдоль прилавка, где на разных
              секциях выложены различные продукты.
            </div>
            <ul className="mt-5 space-y-2">
              <li className="">
                <span
                  style={{
                    fontFamily: "Sans-Bold",
                  }}
                  className="font-bold"
                >
                  Собирай заказы:
                </span>{" "}
                кликай на товары, чтобы добавить их в корзину
              </li>
              <li>
                <span
                  style={{
                    fontFamily: "Sans-Bold",
                  }}
                  className="font-semibold"
                >
                  Не теряй время:
                </span>{" "}
                не добавляй в корзину товары которые не в заказе
              </li>
              <li>
                <span
                  style={{
                    fontFamily: "Sans-Bold",
                  }}
                  className="font-semibold"
                >
                  Собери максимальное количество заказов:
                </span>
                за ограниченное время
              </li>
              <li>
                <span
                  style={{
                    fontFamily: "Sans-Bold",
                  }}
                  className="font-semibold"
                >
                  Всего 10 дней:
                </span>
                чтобы показать свои навыки
              </li>
              <li>
                <span
                  style={{
                    fontFamily: "Sans-Bold",
                  }}
                  className="font-semibold"
                >
                  Усложнения:
                </span>
                Больше товаров, больше заказов, меньше времени
              </li>
            </ul>
            {currentUser && (
              <div>
                <button
                  className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600 mb-10"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#e151a1",
                  }}
                  onClick={() => {
                    navigate("/game");
                  }}
                >
                  Начать игру
                </button>
              </div>
            )}
          </div>
        </div>
      </HeaderGame>
    </div>
  );
};

export default GameStart;
