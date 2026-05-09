import { useEffect, useState } from "react";
import API from "../api/api";
import LeaderboardChart from "../components/LeaderboardChart";
import { useRealtime } from "../hooks/useRealtime";
import { getUser } from "../utils/auth";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [winnings, setWinnings] = useState([]);
  const [history, setHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalAmount = winnings.reduce(
    (sum, w) => sum + (w.prize_amount || 0),
    0
  );
  const user = getUser();
  const index = leaderboard.findIndex(l => l.user_id === user?.id);
  const userRank = index >= 0 ? index + 1 : 0;

  useRealtime(setLeaderboard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [w, h, l] = await Promise.all([
          API.get("/user/winnings"),
          API.get("/user/history"),
          API.get("/user/leaderboard"),
        ]);

        setWinnings(w.data || []);
        setHistory(h.data || []);
        setLeaderboard(l.data || []);
      } catch (err) {
        console.error(err);
      } finally {
          setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🏌️ Golf Dashboard</h1>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <StatCard title="Total Winnings" value={`₹${totalAmount}`} />
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <StatCard title="Draws Played" value={history.length.toString()} />
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <StatCard title="Leaderboard Rank" value={userRank > 0 ? `#${userRank}` : "-"} />
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* WINNINGS */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl mb-4">🏆 My Winnings</h2>

          {winnings.length === 0 ? (
            <p className="text-gray-400">No winnings yet</p>
          ) : (
            winnings.map((w, i) => (
              <div
                key={i}
                className="p-3 bg-gray-700 rounded-lg mb-2 flex justify-between">
                <div>
                  <p className="font-semibold">{w.match_type} matches</p>
                  <p className="text-xs text-gray-400">
                    Draw ID: {w.draw_id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-400 font-bold">
                    ₹{Number(w.prize_amount || 0).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">Prize</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* HISTORY */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl mb-4">📜 Draw History</h2>

          {history.length === 0 ? (
            <p className="text-gray-400">No history</p>
          ) : (
            [...history]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((d) => (
                <div
                  key={d.id}
                  className="p-3 bg-gray-700 rounded-lg mb-2"
                >
                  <p><span className="font-semibold">Draw ID:</span> {d.id}</p>
                  <p><span className="font-semibold">Status:</span> {d.status}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(d.created_at).toLocaleString()}
                  </p>
                </div>
              ))
          )}
        </div>

      </div>

      {/* LEADERBOARD */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow mt-8">
        <h2 className="text-xl mb-4">🥇 Leaderboard</h2>

        {leaderboard.length === 0 ? (
          <p className="text-gray-400">No leaderboard data yet. Play to rank!</p>
        ) : (
          <LeaderboardChart data={leaderboard.slice(0, 10)} />
        )}
      </div>

    </div>
  );
}