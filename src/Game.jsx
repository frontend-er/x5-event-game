import { useState, useEffect, useRef } from "react";
import { auth, leaderboardRef } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { HeaderGame } from "./components/HeaderGame";
import { ProductRow } from "./components/ProductRow";
import { useGameLogic } from "./hooks/useGameLogic";

const levels = [
  {
    name: "Day 1",
    time: "1:59",
    orders: [
      {
        user: "user-1.png",
        products: ["water-1", "water-2", "water-3", "snacks-1", "snacks-2"],
      },
      {
        user: "user-1.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-1", "fruits-2"],
      },
      {
        user: "user-1.png",
        products: ["snacks-3", "snacks-1", "snacks-2", "fruits-3", "fruits-1"],
      },
      {
        user: "user-1.png",
        products: ["fruits-1", "snacks-2", "fruits-3", "water-1", "water-2"],
      },
      {
        user: "user-1.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-1", "fruits-2"],
      },
    ],
  },
  {
    name: "Day 2",
    time: "1:59",
    orders: [
      {
        user: "user-1.png",
        products: ["water-1", "water-2", "water-3", "snacks-1", "snacks-2"],
      },
      {
        user: "user-1.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-1", "fruits-2"],
      },
      {
        user: "user-1.png",
        products: ["snacks-3", "snacks-1", "snacks-2", "fruits-3", "fruits-1"],
      },
      {
        user: "user-1.png",
        products: ["fruits-1", "snacks-2", "fruits-3", "water-1", "water-2"],
      },
      {
        user: "user-1.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-1", "fruits-2"],
      },
      {
        user: "user-1.png",
        products: ["snacks-3", "snacks-1", "snacks-2", "fruits-3", "fruits-1"],
      },
      {
        user: "user-1.png",
        products: ["fruits-1", "snacks-2", "fruits-3", "water-1", "water-2"],
      },
      {
        user: "user-1.png",
        products: ["snacks-1", "snacks-2", "snacks-3", "fruits-1", "fruits-2"],
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

  if (gameOver) {
    if (lives === 0) {
      return (
        <HeaderGame>
          <div
            style={{
              marginTop: "110px",
            }}
            className="flex flex-col h-screen w-screen"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-4xl font-bold">Game Over</div>
              <div className="text-2xl font-bold">
                Твой счет {userScore !== null ? userScore : score}
              </div>
            </div>
          </div>
        </HeaderGame>
      );
    } else {
      return (
        <HeaderGame>
          <div
            style={{
              marginTop: "110px",
            }}
            className="flex flex-col h-screen w-screen"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-4xl font-bold">Level Completed</div>
              <div className="text-2xl font-bold">
                Твой счет {userScore !== null ? userScore : score}
              </div>
            </div>
          </div>
        </HeaderGame>
      );
    }
  }

  return (
    <HeaderGame>
      <div
        style={{
          marginTop: "110px",
        }}
        className="flex flex-col h-screen w-screen"
      >
        {/* Header */}
        <div className="h-[50px] flex flex-row items-center justify-between p-6 gap-5">
          <div className="text-md font-bold flex flex-row items-center gap-2">
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
          <div className="text-md font-bold">День {currentLevel}/10</div>
          <div className="text-md font-bold">{timeLeft}</div>
          <div className="text-md font-bold">
            Score: {userScore !== null ? userScore : score}
          </div>
        </div>

        {/* Body (Scrollable) */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            marginBottom: "360px",
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
            type={"fruits"}
            cartRef={cartRef}
            handleProductGameClick={handleProductGameClick}
          />
          <ProductRow
            key={3}
            type={"snacks"}
            cartRef={cartRef}
            handleProductGameClick={handleProductGameClick}
          />
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
                        <div
                          key={productIndex}
                          className="flex flex-row items-center h-[20px]"
                          style={{
                            opacity: isUsed ? 0.9 : isCurrent ? 1 : 0.2,
                          }}
                        >
                          <img
                            src={`/images/products/${product}.png`}
                            alt={product}
                            style={{
                              height: "40px",
                            }}
                            className="m-1"
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
        {/* Bottom Cart */}
        <div className="fixed bottom-0 w-full h-[170px] bg-center bg-no-repeat">
          <img
            src="/images/cart-bg.png"
            alt=""
            style={{
              objectPosition: "center",
              position: "absolute",
            }}
          />
          <img
            ref={cartRef}
            src="/images/empty-cart.png"
            alt="Cart"
            className="absolute  w-[100px] h-[100px] z-2"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    </HeaderGame>
  );
};
