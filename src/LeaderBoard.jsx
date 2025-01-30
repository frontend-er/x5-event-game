import { useState, useEffect } from "react";
import { leaderboardRef } from "./firebase";
import { getDocs } from "firebase/firestore";
import { Header } from "./components/Header";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const snapshot = await getDocs(leaderboardRef);

      const leaderboardData = snapshot.docs.map((doc) => ({
        email: doc.data().userName,
        score: doc.data().score,
      }));
      setLeaderboard(leaderboardData);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <Header>
        <div className=" text-white flex flex-col items-center justify-center px-4">
          <h2 className="text-center text-2xl font-semibold">Leaderboard</h2>
          <ul className="space-y-4 text-center">
            {leaderboard.map((user, index) => (
              <li key={index} className="flex justify-between">
                <span className="font-semibold">{user.email}</span>
                <span>{user.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </Header>
    </div>
  );
}
