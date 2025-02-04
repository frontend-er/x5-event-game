import { useState, useEffect } from "react";
import { auth, leaderboardRef } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Header } from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";

export default function UserData() {
  const [userEmail, setUserEmail] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [userLocation, setUserLocation] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);

        const userDocRef = doc(leaderboardRef, user.email);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserScore(docSnap.data().score);
          setUserLocation(docSnap.data().location);
          setUserName(docSnap.data().name);
        } else {
          setUserScore(0);
        }
      } else {
        setUserEmail("");
        setUserScore(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" text-white">
      <Header>
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center ">
            Мои данные и счет
          </h2>
          <div className="bg-black/50 px-5 py-5 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <ul className="space-y-2">
              <li className="flex justify-between items-center border-b border-white py-2">
                <span className="font-semibold text-lg">{userName}</span>
              </li>
              <li className="flex flex-row  gap-1.5 items-center py-2">
                <span className="font-semibold text-lg">Счет:</span>
                <span className="text-md">{userScore}</span>
              </li>
              <li className="flex  flex-col justify-start items-start py-2">
                <span className="font-semibold text-lg">Email:</span>
                <span className="text-md">{userEmail}</span>
              </li>
              <li className="flex  flex-col justify-start items-start  py-2">
                <span className="font-semibold text-lg">Даркстор:</span>
                <span className="text-md">{userLocation}</span>
              </li>
            </ul>
          </div>
        </div>
      </Header>
    </div>
  );
}
