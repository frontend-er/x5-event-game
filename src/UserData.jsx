import { useState, useEffect } from "react";
import { auth, leaderboardRef } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Header } from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";

export default function UserData() {
  const [userEmail, setUserEmail] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch the authenticated user's email and score
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUserEmail(user.email); // Set the user's email

        // Fetch the user's score from Firestore
        const userDocRef = doc(leaderboardRef, user.email);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserScore(docSnap.data().score); // Set the user's score
        } else {
          setUserScore(0); // Default score if no record exists
        }
      } else {
        // User is signed out
        setUserEmail(""); // Clear the email
        setUserScore(0); // Clear the score
      }
      setLoading(false); // Stop loading
    });

    return () => unsubscribe(); // Cleanup the observer on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  return (
    <div>
      <Header>
        <div className="text-white flex flex-col items-center justify-center px-4">
          <h2 className="text-center text-2xl font-semibold">
            Мои данные и счет
          </h2>
          <ul className="space-y-4 text-center">
            <li className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{userEmail}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Счет:</span>
              <span>{userScore}</span>
            </li>
          </ul>
        </div>
      </Header>
    </div>
  );
}
