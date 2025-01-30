import { useState, useEffect } from "react";
import { auth, leaderboardRef } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Header } from "./components/Header";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [userScore, setUserScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

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
      await setDoc(userDocRef, { score: newScore }, { merge: true });
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

  return (
    <div>
      <Header>
        <div className=" text-white flex flex-col items-center justify-center px-4">
          <h1>Game</h1>
          <h2>Score: {userScore !== null ? userScore : score}</h2>
          <button
            onClick={incrementScore} // Example: Increment score by 100
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            Increment Score
          </button>
        </div>
      </Header>
    </div>
  );
};
