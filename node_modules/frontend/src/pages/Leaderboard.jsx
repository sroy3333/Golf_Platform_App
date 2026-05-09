import { useEffect, useState } from "react";
import API from "../api/api";
import LeaderboardChart from "../components/LeaderboardChart";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/user/leaderboard").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">🥇 Leaderboard</h1>
      <LeaderboardChart data={data} />
    </div>
  );
}