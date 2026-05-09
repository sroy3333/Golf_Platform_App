import { useEffect, useState } from "react";
import API from "../api/api";

export default function AddScore() {
  const [userId, setUserId] = useState("");
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchScores = async () => {
    try {
      const res = await API.get("/score");
      setScores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/score");
        setScores(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await API.post("/score/add", { user_id: userId, score, date });
      alert("Score added");

      setUserId("");
      setScore("");
      setDate("");

      // refresh list
      fetchScores();

    } catch (err)  {
      console.error(err);

      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error adding score"
      );
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Add Score
      </h1>

      {/* FORM */}

      <div className="bg-gray-800 p-4 rounded-lg w-96 mb-8">

        <input
          value={userId}
          placeholder="User ID"
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          value={score}
          type="number"
          placeholder="Score"
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          onChange={(e) => setScore(e.target.value)}
        />

        <input
          value={date}
          type="date"
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </div>

      {/* SCORE LIST */}

      <h2 className="text-2xl font-semibold mb-4">
        Scores List
      </h2>

      <div className="space-y-4">

        {scores.length === 0 ? (
          <p>No scores found</p>
        ) : (
          scores.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-4 rounded-lg"
            >
              <p>
                <strong>User ID:</strong> {item.user_id}
              </p>

              <p>
                <strong>Score:</strong> {item.score}
              </p>

              <p>
                <strong>Date:</strong> {item.date}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}