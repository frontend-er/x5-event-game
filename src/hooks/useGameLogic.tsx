import { useState, useEffect, useRef } from "react";

export const useGameLogic = (levels, onGameEnd) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(levels[currentLevel].time);
  const [cart, setCart] = useState([]);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onGameEnd(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    setCart([]);
  }, [currentOrder, currentLevel]);

  useEffect(() => {
    if (currentLevel) {
      setLives(3);
    }
  }, [currentLevel]);

  useEffect(() => {
    if (!levelCompleted) {
      setTimeLeft(levels[currentLevel].time);
    }
  }, [currentLevel, levelCompleted]);

  const handleProductGameClick = (product) => {
    if (levelCompleted) return; // Блокируем клики, если уровень завершён

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
          setLevelCompleted(true); // Уровень завершён, ждём запуска следующего
          clearInterval(timerRef.current);
        }
      }
    } else {
      setLives((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          onGameEnd(false);
          return 0;
        }
        return prev - 1;
      });
    }
  };

  const handleNextLevelStart = () => {
    if (!levelCompleted) return;

    if (currentLevel + 1 < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setCurrentOrder(0);
      setCurrentProductIndex(0);
      setLevelCompleted(false); // Запуск нового уровня
      setTimeLeft(levels[currentLevel + 1].time);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onGameEnd(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      onGameEnd(true); // Все уровни пройдены
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
    handleNextLevelStart,
    cart,
    levelCompleted, // Можно использовать в UI для показа кнопки "Начать следующий уровень"
  };
};
