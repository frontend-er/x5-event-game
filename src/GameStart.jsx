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
          className="flex flex-col w-screen gap-5 p-5 "
          style={{
            height: "calc(100dvh - 200px)", // Uses dynamic viewport height, fixing Safari issues
            overflow: "scroll",
            marginTop: "0px",
          }}
        >
          <div
            className="text-3xl"
            style={{
              fontFamily: "Sans-Bold",
            }}
          >
            МАСТЕР СБОРКИ
          </div>

          <div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                fontFamily: "Sans-Regular",
                fontSize: "1rem",
              }}
            >
              Проверь свои навыки сборки и скорость мышления в увлекательной
              игре, где каждая секунда на счету!
            </div>
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
              <span
                className=""
                style={{
                  fontFamily: "Sans-Bold",
                }}
              >
                Твоя задача –
              </span>{" "}
              собрать все заказы за отведенное время, избегая добавления в
              корзину ненужных товаров.
            </div>
            <div
              style={{
                marginTop: "20px",
                fontFamily: "Sans-Bold",
                fontSize: "1.2rem",
                textDecoration: "underline",
              }}
            >
              Правила игры
            </div>
            <ul className="mt-5 space-y-2">
              <li className="">
                Зарабатывай 10 баллов за каждый правильно собранный товар;
              </li>
              <li>
                Пройди все 10 уровней сложности – чем выше уровень, тем больше
                товаров и заказов, но меньше времени;
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
                Не допускай ошибок – на одном уровне можно совершить максимум 2
                ошибки при сборке заказов.
              </li>
            </ul>
            <div
              className="mt-5 text-xl"
              style={{
                fontFamily: "Sans-Bold",
              }}
            >
              Чем быстрее и точнее ты выполняешь заказы, тем больше шансов
              занять призовое место!
            </div>
            <div className="absolute bottom-0">
              {currentUser && (
                <div>
                  <button
                    className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600 mb-8"
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
        </div>
      </HeaderGame>
    </div>
  );
};

export default GameStart;
