import { useState, useEffect } from "react";
import { auth, leaderboardRef } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Header } from "./components/Header";
import { motion, AnimatePresence } from "framer-motion";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [userScore, setUserScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [productPosition, setProductPosition] = useState(null);

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

  const incrementScore = () => {
    const newScore = score + 100;
    setScore(newScore);
    saveUserScore(newScore);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Please sign in to play the game.</div>;
  }

  const handleProductClick = (event, productId) => {
    const rect = event.target.getBoundingClientRect();
    setProductPosition(rect);
    setSelectedProduct(productId);
    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  return (
    <div>
      <Header>
        <div className="text-white flex flex-col gap-10">
          <div
            style={{
              height: "100%",
            }}
            className="min-w-screen flex flex-row items-center justify-between p-6 gap-5.5"
          >
            <div className="text-2xl font-bold">День 1/10</div>
            <div className="text-2xl font-bold">Время 1:59</div>
            <div className="text-2xl font-bold">
              Score: {userScore !== null ? userScore : score}
            </div>
          </div>
          <div
            style={{
              height: window.innerHeight - 500,
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              alignItems: "start",
              textAlign: "left",
            }}
            className="bg-black/50"
          >
            <div
              style={{
                backgroundColor: "#969CA1",
                textAlign: "left",
              }}
              className="min-w-screen flex flex-row items-center gap-10 p-2"
            >
              <div className="text-xl font-bold">Напитки</div>
            </div>
            <div
              className="relative"
              style={{
                width: "100%",
                height: "300px", // Adjust based on your requirements
              }}
            >
              <img
                style={{
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                src="public/images/product-bg.png"
                alt="Background"
              />
              <div
                className="product-list flex flex-row gap-5 absolute top-0 left-0 w-full"
                style={{
                  zIndex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {[1, 2, 3].map((productId) => (
                  <div
                    key={productId}
                    className="product"
                    style={{
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={(e) => handleProductClick(e, productId)}
                  >
                    <motion.img
                      src={
                        selectedProduct === productId
                          ? "public/images/products/water-1.png"
                          : "public/images/products/water-all.png"
                      }
                      alt={`Product ${productId}`}
                      initial={{ scale: 1 }}
                      animate={{
                        scale: selectedProduct === productId ? 0.5 : 1,
                        y: selectedProduct === productId ? -150 : 0, // Jump upwards
                        opacity: selectedProduct === productId ? 0 : 1, // Fade out
                      }}
                      transition={{
                        duration: 1.5, // Slow animation
                        ease: "easeOut",
                      }}
                      style={{
                        width: "50px", // Adjust size
                        height: "50px", // Adjust size
                      }}
                    />
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {isAddedToCart && productPosition && (
                  <motion.div
                    style={{
                      position: "absolute",
                      top: productPosition.top,
                      left: productPosition.left,
                      width: "50px",
                      height: "50px",
                      background:
                        "url('public/images/products/water-1.png') no-repeat center center",
                      backgroundSize: "contain",
                      zIndex: 10,
                    }}
                    initial={{ opacity: 1 }}
                    animate={{
                      y: window.innerHeight - 100, // Cart position
                      opacity: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};
