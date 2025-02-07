import { useState, useEffect } from "react";
import { leaderboardRef } from "./firebase";
import { getDocs } from "firebase/firestore";
import { Header } from "./components/Header";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const snapshot = await getDocs(leaderboardRef);

      const leaderboardData = snapshot.docs
        .map((doc) => ({
          email: doc.data().email,
          score: doc.data().score,
          name: doc.data().name,
        }))
        .sort((a, b) => b.score - a.score);

      setLeaderboard(leaderboardData);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="text-white">
      <Header>
        <div
          style={{
            height: "calc(100dvh - 200px)",
          }}
          className="flex flex-col items-center justify-center py-8 px-4"
        >
          <h2 className="text-3xl font-bold mb-6">Лидерборд</h2>
          <div
            className="overflow-x-auto max-w-4xl w-full mx-auto"
            style={{
              overflow: "scroll",
            }}
          >
            <table className="table-auto w-full text-center bg-black/50 rounded-lg shadow-lg">
              <thead>
                <tr className="text-lg border-b-2 ">
                  <th className="py-3 px-6 text-left">Имя</th>
                  <th className="py-3 px-6">Счет</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard
                  .filter((i) => i.email)
                  .map((user, index) => (
                    <tr key={index} className={` border-b border-white-600`}>
                      <td className="py-3 px-6 text-left text-white">
                        {index + 1}. {user.name}
                      </td>
                      <td className="py-3 px-6 text-white">{user.score}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Header>
    </div>
  );
}
