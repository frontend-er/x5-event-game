import { useState, useEffect, useRef } from "react";

export const useGameLogic = (levels, onGameEnd) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const timerRef = useRef(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onGameEnd(false); // Game over due to time running out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handleProductGameClick = (product) => {
    const order = levels[currentLevel].orders[currentOrder];
    if (product === order.products[currentProductIndex]) {
      setCart((prev) => [...prev, product]);
      setScore((prev) => prev + 10);
      if (currentProductIndex + 1 < order.products.length) {
        setCurrentProductIndex(currentProductIndex + 1);
      } else {
        if (currentOrder + 1 < levels[currentLevel].orders.length) {
          setCurrentOrder(currentOrder + 1);
          setCurrentProductIndex(0);
        } else {
          if (currentLevel + 1 < levels.length) {
            setCurrentLevel(currentLevel + 1);
            setCurrentOrder(0);
            setCurrentProductIndex(0);
          } else {
            clearInterval(timerRef.current);
            onGameEnd(true); // Game won
          }
        }
      }
    } else {
      setLives((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          onGameEnd(false); // Game over due to lives lost
          return 0;
        }
        return prev - 1;
      });
    }
  };

  return {
    currentLevel,
    currentOrder,
    currentProductIndex,
    lives,
    score,
    timeLeft,
    handleProductGameClick,
    cart,
  };
};
