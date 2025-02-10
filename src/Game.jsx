import { useState, useEffect, useRef } from "react";
import { auth, leaderboardRef } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { HeaderGame } from "./components/HeaderGame";
import { ProductRow } from "./components/ProductRow";
import { useGameLogic } from "./hooks/useGameLogic";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const levels = [
  {
    name: "День 1",
    time: 80,
    orders: [
      {
        user: "user-1.png",
        products: ["water-1", "water-2", "water-3"],
      },
      {
        user: "user-2.png",
        products: ["snacks-1", "snacks-2", "snacks-3"],
      },
      {
        user: "user-3.png",
        products: ["snacks-3", "snacks-1", "snacks-2"],
      },
      {
        user: "user-4.png",
        products: ["fruits-1", "snacks-2", "fruits-3"],
      },
      {
        user: "user-5.png",
        products: ["snacks-1", "snacks-2", "snacks-3"],
      },
    ],
  },
  {
    name: "День 2",
    time: 80,
    orders: [
      {
        user: "user-1.png",
        products: ["water-1", "water-2", "water-3", "snacks-1"],
      },
      {
        user: "user-2.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-1"],
      },
      {
        user: "user-3.png",
        products: ["snacks-3", "snacks-1", "snacks-2", "fruits-3"],
      },
      {
        user: "user-4.png",
        products: ["fruits-5", "snacks-2", "fruits-7", "water-5"],
      },
      {
        user: "user-5.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-7"],
      },
      {
        user: "user-6.png",
        products: ["snacks-3", "snacks-4", "snacks-2", "fruits-3"],
      },
      {
        user: "user-1.png",
        products: ["fruits-5", "snacks-2", "fruits-3", "water-4"],
      },
      {
        user: "user-3.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-1"],
      },
    ],
  },
  {
    name: "День 3",
    time: 80,
    orders: [
      {
        user: "user-1.png",
        products: ["water-1", "water-4", "water-5", "snacks-1", "snacks-2"],
      },
      {
        user: "user-2.png",
        products: ["snacks-1", "snacks-4", "snacks-3", "fruits-1", "fruits-2"],
      },
      {
        user: "user-3.png",
        products: ["snacks-3", "snacks-1", "snacks-2", "fruits-7", "fruits-5"],
      },
      {
        user: "user-4.png",
        products: ["fruits-6", "snacks-4", "fruits-3", "water-1", "water-2"],
      },
      {
        user: "user-5.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-1", "fruits-2"],
      },
      {
        user: "user-4.png",
        products: ["snacks-3", "snacks-4", "snacks-2", "fruits-3", "fruits-7"],
      },
      {
        user: "user-3.png",
        products: ["fruits-5", "snacks-2", "fruits-3", "water-8", "water-6"],
      },
      {
        user: "user-2.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-1", "fruits-2"],
      },
      {
        user: "user-2.png",
        products: ["fruits-5", "snacks-2", "fruits-3", "water-6", "water-8"],
      },
      {
        user: "user-1.png",
        products: ["snacks-1", "snacks-2", "snacks-4", "fruits-1", "fruits-2"],
      },
      {
        user: "user-2.png",
        products: ["snacks-3", "water-8", "snacks-2", "fruits-3", "fruits-1"],
      },
    ],
  },
  {
    name: "День 4",
    time: 75,
    orders: [
      {
        user: "user-2.png",
        products: ["ice-1", "water-1", "snacks-2"],
      },
      {
        user: "user-1.png",
        products: ["ice-1", "ice-3", "fruits-1"],
      },
      {
        user: "user-3.png",
        products: ["ice-1", "fruits-3", "fruits-1"],
      },
      {
        user: "user-4.png",
        products: ["ice-5", "snacks-1", "snacks-2", "ice-3", "fruits-1"],
      },
      {
        user: "user-5.png",
        products: ["water-8", "snacks-2", "fruits-2"],
      },
      {
        user: "user-3.png",
        products: ["water-8", "snacks-2", "ice-3", "fruits-1", "fruits-2"],
      },
    ],
  },
  {
    name: "День 5",
    time: 75,
    orders: [
      {
        user: "user-2.png",
        products: ["ice-1", "water-1", "snacks-2", "fruits-1"],
      },
      {
        user: "user-1.png",
        products: ["ice-1", "ice-3", "fruits-1", "water-6"],
      },
      {
        user: "user-4.png",
        products: ["ice-2", "snacks-1", "snacks-2", "ice-3", "water-8"],
      },
      {
        user: "user-3.png",
        products: ["fruits-1", "water-7", "ice-3", "fruits-3"],
      },
      {
        user: "user-5.png",
        products: ["snacks-2", "fruits-2", "water-8", "ice-3"],
      },
      {
        user: "user-3.png",
        products: ["water-8", "snacks-2", "ice-3", "fruits-1", "fruits-2"],
      },
      {
        user: "user-3.png",
        products: ["fruits-3", "water-2", "ice-1", "fruits-2"],
      },
      {
        user: "user-5.png",
        products: ["snacks-2", "fruits-3", "water-1", "ice-4"],
      },
    ],
  },
  {
    name: "День 6",
    time: 75,
    orders: [
      {
        user: "user-2.png",
        products: ["ice-1", "water-1", "snacks-2", "fruits-1", "ice-3"],
      },
      {
        user: "user-1.png",
        products: ["ice-1", "ice-5", "fruits-1", "water-6", "ice-3"],
      },
      {
        user: "user-1.png",
        products: ["ice-1", "ice-5", "fruits-1", "water-6", "ice-2"],
      },
      {
        user: "user-3.png",
        products: ["fruits-2", "water-8", "ice-5", "fruits-1", "fruits-4"],
      },
      {
        user: "user-5.png",
        products: ["snacks-2", "fruits-2", "water-8", "ice-3", "ice-1"],
      },
      {
        user: "user-3.png",
        products: ["water-1", "snacks-2", "ice-4", "fruits-1", "fruits-2"],
      },
      {
        user: "user-3.png",
        products: ["fruits-3", "water-2", "ice-1", "fruits-2", "ice-3"],
      },
      {
        user: "user-5.png",
        products: ["snacks-1", "fruits-2", "water-6", "ice-4", "ice-3"],
      },
      {
        user: "user-2.png",
        products: ["ice-2", "water-2", "snacks-3", "fruits-2", "ice-3"],
      },
      {
        user: "user-1.png",
        products: ["ice-5", "ice-4", "ice-3", "ice-2", "ice-1"],
      },
    ],
  },
  {
    name: "День 7",
    time: 75,
    orders: [
      {
        user: "user-2.png",
        products: ["ice-1", "water-1", "snacks-2", "food-1", "ice-3"],
      },
      {
        user: "user-1.png",
        products: ["ice-1", "ice-5", "food-1", "water-3", "food-4"],
      },
      {
        user: "user-4.png",
        products: ["food-2", "snacks-1", "snacks-2", "ice-1", "water-2"],
      },
      {
        user: "user-3.png",
        products: ["fruits-2", "food-3", "ice-5", "food-1", "food-4"],
      },
      {
        user: "user-5.png",
        products: ["food-4", "fruits-2", "water-8", "ice-3", "ice-1"],
      },
    ],
  },
  {
    name: "День 8",
    time: 70,
    orders: [
      {
        user: "user-5.png",
        products: ["food-4", "fruits-2", "ice-3", "ice-1"],
      },
      {
        user: "user-2.png",
        products: ["ice-1", "snacks-2", "food-1", "ice-3"],
      },
      {
        user: "user-1.png",
        products: ["ice-5", "food-1", "food-5", "snacks-4"],
      },
      {
        user: "user-4.png",
        products: ["food-2", "snacks-2", "ice-1", "water-2"],
      },
      {
        user: "user-3.png",
        products: ["fruits-2", "food-3", "food-1", "food-4"],
      },
      {
        user: "user-5.png",
        products: ["food-4", "water-3", "ice-3", "ice-1"],
      },
      {
        user: "user-5.png",
        products: ["food-4", "fruits-2", "ice-3", "ice-1"],
      },
    ],
  },
  {
    name: "День 9",
    time: 70,
    orders: [
      {
        user: "user-5.png",
        products: ["food-4", "fruits-2", "ice-3", "ice-1", "food-1"],
      },
      {
        user: "user-2.png",
        products: ["ice-1", "snacks-2", "food-1", "ice-3", "water-2"],
      },
      {
        user: "user-1.png",
        products: ["ice-1", "ice-5", "food-1", "snacks-4", "water-3"],
      },
      {
        user: "user-4.png",
        products: ["food-2", "snacks-2", "ice-1", "water-2", "water-8"],
      },
      {
        user: "user-3.png",
        products: ["fruits-2", "food-3", "food-1", "food-4", "ice-3"],
      },
      {
        user: "user-5.png",
        products: ["food-4", "water-8", "ice-3", "ice-1", "food-1"],
      },
      {
        user: "user-1.png",
        products: ["snacks-4", "fruits-2", "ice-1", "ice-2", "food-1"],
      },
      {
        user: "user-3.png",
        products: ["food-5", "fruits-1", "ice-3", "ice-1", "food-1"],
      },
      {
        user: "user-2.png",
        products: ["food-5", "fruits-2", "snacks-3", "snacks-1", "food-1"],
      },
      {
        user: "user-4.png",
        products: ["snacks-4", "snacks-2", "ice-4", "water-3", "fruits-7"],
      },
      {
        user: "user-3.png",
        products: ["water-5", "food-1", "water-1", "food-4", "fruits-3"],
      },
    ],
  },
  {
    name: "День 10",
    time: 70,
    orders: [
      {
        user: "user-5.png",
        products: ["food-4", "fruits-2", "ice-3", "ice-1", "food-1"],
      },
      {
        user: "user-2.png",
        products: ["ice-1", "snacks-2", "food-1", "ice-3", "water-2"],
      },
      {
        user: "user-1.png",
        products: ["ice-1", "ice-5", "food-1", "fruits-5", "water-3"],
      },
      {
        user: "user-4.png",
        products: ["food-2", "snacks-2", "ice-1", "water-2", "water-8"],
      },
      {
        user: "user-3.png",
        products: ["fruits-2", "food-3", "food-1", "food-4", "ice-3"],
      },
      {
        user: "user-5.png",
        products: ["food-4", "water-8", "ice-3", "ice-1", "food-1"],
      },
      {
        user: "user-1.png",
        products: ["snacks-4", "fruits-2", "ice-1", "ice-2", "food-1"],
      },
      {
        user: "user-3.png",
        products: ["food-5", "fruits-1", "ice-3", "ice-1", "food-1"],
      },
      {
        user: "user-2.png",
        products: ["food-5", "fruits-2", "ice-3", "ice-1", "food-1"],
      },
      {
        user: "user-4.png",
        products: ["snacks-4", "snacks-2", "ice-4", "water-2", "water-8"],
      },
      {
        user: "user-3.png",
        products: ["water-5", "food-1", "water-1", "food-4", "fruits-3"],
      },
      {
        user: "user-3.png",
        products: ["ice-2", "food-5", "water-3", "fruits-1", "snacks-4"],
      },
    ],
  },
];

export const Game = () => {
  const [userScore, setUserScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const cartRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  const onGameEnd = () => {
    setGameOver(true);
  };

  const {
    currentLevel,
    currentOrder,
    currentProductIndex,
    lives,
    score,
    timeLeft,
    cart,
    levelCompleted,
    handleNextLevelStart,
    handleProductGameClick,
  } = useGameLogic(levels, onGameEnd);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchUserScore(user);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserScore = async (user) => {
    const userDocRef = doc(leaderboardRef, user.email);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      setUserScore(docSnap.data().score);
    } else {
      await setDoc(userDocRef, { score: 0 });
      setUserScore(0);
    }
    setLoading(false);
  };

  const saveUserScore = async (newScore) => {
    if (currentUser) {
      const userDocRef = doc(leaderboardRef, currentUser.email);
      await setDoc(
        userDocRef,
        { score: newScore, email: currentUser.email },
        { merge: true }
      );
      setUserScore(newScore);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const incrementScore = (newScore) => {
    saveUserScore(newScore);
  };

  useEffect(() => {
    if (gameOver === true) {
      incrementScore(score);
    }
  }, [gameOver, incrementScore, score]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Please sign in to play the game.</div>;
  }

  const isOrderCompleted = (order) => {
    return order.products.every((product) => cart.includes(product));
  };

  if (levelCompleted && currentLevel === 9) {
    incrementScore(score);
    return (
      <HeaderGame>
        <div
          style={{
            height: "calc(100dvh - 200px)",
            marginTop: "20px",
          }}
          className="flex flex-col w-screen"
        >
          <div
            className="flex flex-col items-center"
            style={{
              zIndex: 2,
            }}
          >
            <div>
              <img
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "150px",
                  zIndex: "0",
                }}
                src="/images/happy.png"
                alt=""
              />
              <img
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "150px",
                  zIndex: "0",
                }}
                src="/images/happy2.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="/images/win.png"
                alt=""
                style={{
                  width: "150px",
                }}
              />
            </div>
            <div
              className="text-4xl font-bold"
              style={{
                fontFamily: "Sans-Bold",
                marginTop: "20px",
              }}
            >
              Победа! 🎉
            </div>
            <div className="text-xl font-bold mt-2">
              Твой счет {userScore !== null ? userScore : score}
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5"
              onClick={() => navigate("/leaderboard")}
            >
              Таблица лидеров
            </button>

            <i className="text-sx font-medium font- text-blue-100 font-bold mt-5 flex flex-col items-center justify-center text-center ">
              Знай что ты можешь лучше! <br /> Но счет не сохранится!
            </i>
          </div>
          <div>
            <div>
              <img
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  width: "150px",
                  zIndex: "0",
                }}
                src="/images/worker2.png"
                alt=""
              />
              <img
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "150px",
                  zIndex: "0",
                }}
                src="/images/worker.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </HeaderGame>
    );
  }

  if (levelCompleted) {
    if (currentLevel === 2) {
      return (
        <HeaderGame>
          <div
            style={{
              height: "calc(100dvh - 200px)",
              marginTop: "20px",
            }}
            className="flex flex-col  w-screen"
          >
            <div
              className="flex flex-col items-center justify-center mt-12 gap-1"
              style={{
                zIndex: 2,
              }}
            >
              <div
                className="text-4xl font-bold"
                style={{
                  fontFamily: "Sans-Bold",
                }}
              >
                День окончен
              </div>
              <div className="text-xl font-bold">Твой счет {score}</div>
              <div className="text-lg font-bold flex flex-col items-center p-5">
                <span
                  style={{
                    fontFamily: "Sans-Bold",
                  }}
                  className="font-semibold"
                >
                  Новые товары:
                </span>
                <div className="text-center">
                  добавлены новые товары под прилавком
                </div>
                <div
                  style={{
                    fontFamily: "Sans-Bold",
                  }}
                >
                  ЗАМОРОЗКА
                </div>
                <div className="flex flex-row items-center mt-5">
                  <img
                    src="/images/products/ice-1.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                  <img
                    src="/images/products/ice-2.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                  <img
                    src="/images/products/ice-3.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                  <img
                    src="/images/products/ice-4.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                  <img
                    src="/images/products/ice-5.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                </div>
              </div>

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5"
                onClick={() => handleNextLevelStart()}
              >
                Следующий день
              </button>
            </div>
          </div>
        </HeaderGame>
      );
    } else if (currentLevel === 5) {
      return (
        <HeaderGame>
          <div
            style={{
              height: "calc(100dvh - 200px)",
              marginTop: "20px",
            }}
            className="flex flex-col  w-screen"
          >
            <div
              className="flex flex-col items-center justify-center mt-12 gap-1"
              style={{
                zIndex: 2,
              }}
            >
              <div
                className="text-4xl font-bold"
                style={{
                  fontFamily: "Sans-Bold",
                }}
              >
                День окончен
              </div>
              <div className="text-xl font-bold">Твой счет {score}</div>
              <div className="text-lg font-bold flex flex-col items-center p-5">
                <span
                  style={{
                    fontFamily: "Sans-Bold",
                  }}
                  className="font-semibold"
                >
                  Новые товары:
                </span>
                <div className="text-center">
                  добавлены новые товары под прилавком
                </div>
                <div
                  style={{
                    fontFamily: "Sans-Bold",
                  }}
                >
                  БАКАЛЕЯ
                </div>
                <div className="flex flex-row items-center mt-5">
                  <img
                    src="/images/products/food-1.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                  <img
                    src="/images/products/food-2.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                  <img
                    src="/images/products/food-3.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                  <img
                    src="/images/products/food-4.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                  <img
                    src="/images/products/food-5.png"
                    alt=""
                    style={{
                      height: "80px",
                    }}
                  />
                </div>
              </div>

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5"
                onClick={() => handleNextLevelStart()}
              >
                Следующий день
              </button>
            </div>
          </div>
        </HeaderGame>
      );
    } else {
      return (
        <HeaderGame>
          <div
            style={{
              height: "calc(100dvh - 200px)",
              marginTop: "20px",
            }}
            className="flex flex-col  w-screen"
          >
            <div className="flex flex-col items-center justify-center h-full gap-1">
              <div
                className="text-4xl font-bold"
                style={{
                  fontFamily: "Sans-Bold",
                }}
              >
                День окончен
              </div>
              <div className="text-2xl font-bold">Твой счет {score}</div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5"
                onClick={() => handleNextLevelStart()}
              >
                Следующий день
              </button>
            </div>
          </div>
        </HeaderGame>
      );
    }
  }

  if (gameOver) {
    if (lives === 0 || timeLeft === 0 || currentLevel === 9) {
      return (
        <HeaderGame>
          <div
            style={{
              height: "calc(100dvh - 200px)",
              marginTop: "20px",
            }}
            className="flex flex-col w-screen"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div
                className="text-4xl font-bold"
                style={{
                  fontFamily: "Sans-Bold",
                }}
              >
                Game Over
              </div>
              <div className="text-xl font-bold">
                Твой счет {userScore !== null ? userScore : score}
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5"
                onClick={() => window.location.reload()}
              >
                Начать заново
              </button>
              <i className="text-sx font-medium font- text-blue-100 font-bold mt-5 flex flex-col items-center justify-center text-center ">
                Знай что ты можешь лучше! <br /> Но счет не сохранится!
              </i>
            </div>
          </div>
        </HeaderGame>
      );
    } else {
      return (
        <HeaderGame>
          <div
            style={{
              height: "calc(100dvh - 200px)",
              marginTop: "20px",
            }}
            className="flex flex-col w-screen"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div
                className="text-4xl font-bold"
                style={{
                  fontFamily: "Sans-Bold",
                }}
              >
                Game Over
              </div>
              <div className="text-xl font-bold">
                Твой счет {userScore !== null ? userScore : score}
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5"
                onClick={() => window.location.reload()}
              >
                Начать заново
              </button>
              <i className="text-sx font-medium font- text-blue-100 font-bold mt-5 flex flex-col items-center justify-center text-center ">
                Знай что ты можешь лучше! <br /> Но счет не сохранится!
              </i>
            </div>
          </div>
        </HeaderGame>
      );
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <HeaderGame>
      <div
        className="flex flex-col w-screen  "
        style={{
          height: "calc(100dvh - 200px)",
          marginTop: "20px",
          backgroundColor: "#E6F0D7",
        }}
      >
        {/* Header */}
        <div className="h-[50px] md:h-[100px] flex flex-row items-center justify-between p-6 gap-5">
          <div className="text-md font-bold flex flex-row items-center gap-2 text-black">
            <img
              src="/images/lives.png"
              alt=""
              style={{
                width: "25px",
                height: "20px",
                transform: "translateY(2px)",
                opacity: lives >= 1 ? 1 : 0.2,
              }}
            />
            <img
              src="/images/lives.png"
              alt=""
              style={{
                width: "25px",
                height: "20px",
                transform: "translateY(2px)",
                opacity: lives >= 2 ? 1 : 0.2,
              }}
            />
            <img
              src="/images/lives.png"
              alt=""
              style={{
                width: "25px",
                height: "20px",
                transform: "translateY(2px)",
                opacity: lives >= 3 ? 1 : 0.2,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "Sans-Bold",
            }}
            className="text-xs md:text-md font-bold text-black"
          >
            {levels[currentLevel].name}
          </div>
          <div
            style={{
              fontFamily: "Sans-Bold",
            }}
            className="text-xs md:text-md font-bold text-black"
          >
            {formatTime(timeLeft)}
          </div>
          <div
            style={{
              fontFamily: "Sans-Bold",
            }}
            className="text-xs md:text-md font-bold text-black"
          >
            Счет: {score}
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            marginBottom: "190px",
            backgroundColor: "#E6F0D7",
          }}
        >
          <ProductRow
            key={1}
            type={"drinks"}
            cartRef={cartRef}
            handleProductGameClick={handleProductGameClick}
          />
          <ProductRow
            key={2}
            type={"drinks2"}
            cartRef={cartRef}
            handleProductGameClick={handleProductGameClick}
          />
          <ProductRow
            key={3}
            type={"fruits"}
            cartRef={cartRef}
            handleProductGameClick={handleProductGameClick}
          />
          <ProductRow
            key={4}
            type={"fruits2"}
            cartRef={cartRef}
            handleProductGameClick={handleProductGameClick}
          />
          <ProductRow
            key={5}
            type={"snacks"}
            cartRef={cartRef}
            handleProductGameClick={handleProductGameClick}
          />
          {currentLevel > 2 && (
            <ProductRow
              key={6}
              type={"ice"}
              cartRef={cartRef}
              handleProductGameClick={handleProductGameClick}
            />
          )}
          {currentLevel > 5 && (
            <ProductRow
              key={7}
              type={"food"}
              cartRef={cartRef}
              handleProductGameClick={handleProductGameClick}
            />
          )}
        </div>
        {/* Users orders */}
        <div className="fixed bg-[#E6F0D7] bottom-[160px] w-full h-[100px] bg-center bg-no-repeat z-10">
          <div
            className="text-left flex flex-row items-center p-4 gap-2"
            style={{
              width: "max-content",
            }}
          >
            {levels[currentLevel].orders
              .filter((order, orderIndex) => orderIndex >= currentOrder) // Показываем текущий и следующие заказы
              .filter((order) => !isOrderCompleted(order)) // Исключаем завершённые заказы
              .map((order, orderIndex) => {
                const realOrderIndex = orderIndex + currentOrder; // Корректируем индекс
                const isCurrentOrder = realOrderIndex === currentOrder;

                return (
                  <div
                    key={realOrderIndex}
                    className="text-xl font-bold text-white flex flex-row items-center"
                    style={{
                      backgroundColor: isCurrentOrder ? "#7abc4f" : "#b0d693",
                      borderRadius: "20px",
                      border: "2px solid #a2d083",
                      padding: "10px",
                    }}
                  >
                    <img
                      src={`/images/user/${order.user}`}
                      alt={order.user}
                      className="w-10 h-10"
                    />
                    {order.products.map((product, productIndex) => {
                      const isCurrent =
                        productIndex === currentProductIndex &&
                        realOrderIndex === currentOrder;
                      const isUsed = isCurrentOrder
                        ? cart.includes(product)
                        : false;

                      return (
                        <motion.div
                          key={productIndex}
                          className="flex flex-row items-center h-[20px]"
                          style={{
                            opacity: isUsed ? 0.9 : isCurrent ? 1 : 0.2,
                          }}
                          animate={
                            isCurrent
                              ? {
                                  scale: [1, 1.2, 1],
                                  rotate: [0, -5, 5, 0],
                                }
                              : {}
                          }
                          transition={
                            isCurrent
                              ? {
                                  duration: 0.8,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                  ease: "easeInOut",
                                }
                              : {}
                          }
                        >
                          <img
                            src={`/images/products/${product}.png`}
                            alt={product}
                            style={{
                              height: "40px",
                            }}
                            className="m-1"
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
        {/* Bottom Cart */}
        <div className="fixed bottom-0 w-full h-[170px] md:h-[200px] bg-center bg-no-repeat">
          <img
            src="/images/cart-bg.png"
            alt=""
            className="object-center absolute block lg:hidden"
          />
          <motion.img
            ref={cartRef}
            src="/images/empty-cart.png"
            alt="Cart"
            className="absolute w-[100px] h-[100px] z-2 top-[50%]"
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          <img
            src={`/images/user/${levels[currentLevel].orders[currentOrder].user}`}
            alt="User"
            className="block lg:hidden"
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              left: "60%",
              bottom: "50%",
              transform: "translate(-50%, 50%)",
              zIndex: 100,
            }}
          />

          {currentOrder > 0 && (
            <>
              <motion.img
                src="/images/full-cart.png"
                alt="Cart"
                className="absolute w-[115px] h-[100px] z-2 top-[50%]"
                initial={{ left: "50%" }} // Start position (same as first cart)
                animate={{ left: "82%" }} // Move to final position
                transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition
                style={{
                  transform: "translate(-50%, -50%)",
                }}
              />

              <motion.img
                src={`/images/user/${
                  levels[currentLevel].orders[currentOrder - 1].user
                }`}
                alt="User"
                initial={{ left: "60%" }} // Start at the same position as the previous user
                animate={{ left: "90%" }} // Move to the new position
                className="block lg:hidden"
                transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition
                style={{
                  width: "40px",
                  height: "40px",
                  position: "absolute",
                  bottom: "50%",
                  transform: "translate(-50%, 50%)",
                  zIndex: 100,
                }}
              />
            </>
          )}
        </div>
      </div>
    </HeaderGame>
  );
};
