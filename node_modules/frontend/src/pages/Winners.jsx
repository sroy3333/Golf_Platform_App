import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";

export default function Winners() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/winner").then(res => setData(res.data));
  }, []);

  if (!data) return <Loader />;

  if (data.winners.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center bg-gray-800/60 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-gray-700">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-xl text-white font-semibold mb-2">
            No Winners Yet
          </h2>
          <p className="text-gray-400 text-sm">
            Once users start winning, their names will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-gray-900 to-green-900 p-5 rounded-2xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          🏆 Latest Winners
        </h1>
      </div>

      {/* Winners List */}
      <div className="space-y-4">
        {data.winners.map((w, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gradient-to-r from-green-800/40 to-gray-800/40 border border-green-500/20 p-5 rounded-2xl shadow-md hover:scale-[1.02] transition"
          >
            {/* Left - User */}
            <div className="flex items-center gap-4">
              <div className="bg-green-700 p-3 rounded-full">
                👤
              </div>
              <div>
                <p className="text-gray-300 text-sm">User</p>
                <p className="text-white font-medium break-all">
                  {w.user_id}
                </p>
              </div>
            </div>

            {/* Right - Prize */}
            <div className="text-right">
              <p className="text-gray-400 text-sm">Prize</p>
              <p className="text-green-400 font-bold text-lg">
                ₹{w.prize_amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}