import React, { useEffect, useState } from "react";
import { verifyWinner } from "../api/api";
import API from "../api/api";

const VerifyWinners = () => {
  const [winners, setWinners] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // Fetch winners
  const fetchWinners = async () => {
    try {
      const res = await API.get("/winner");

      console.log("WINNERS:", res.data);

      setWinners(Array.isArray(res.data.winners) ? res.data.winners : []);
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
      setWinners([]); // prevents .map crash
    }
  };
  useEffect(() => {
    const loadWinners = async () => {
      await fetchWinners();
    };
    loadWinners();
  }, []);

  // Approve handler
  const handleApprove = async (id) => {
    try {
      setLoadingId(id);
      await verifyWinner(id, "approved");
      await fetchWinners(); // refresh list
    } catch (err) {
      console.error("Approve error:", err);
    } finally {
      setLoadingId(null);
    }
  };

  // Reject handler
  const handleReject = async (id) => {
    try {
      setLoadingId(id);
      await verifyWinner(id, "rejected");
      await fetchWinners(); // refresh list
    } catch (err) {
      console.error("Reject error:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Verify Winners</h2>

      {winners.length === 0 && <p>No winners to verify</p>}

      {winners.map((w) => (
        <div
          key={w.id}
          style={{
            background: "#1e293b",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <p>
            <b>User:</b>{" "}
            {w.users?.name || w.user_id.slice(0, 6) + "..."}
          </p>
          <p><b>Prize:</b> ₹{w.prize_amount}</p>
          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color:
                  w.status === "approved"
                    ? "limegreen"
                    : w.status === "rejected"
                    ? "red"
                    : "orange",
              }}
            >
              {w.status}
            </span>
          </p>

          {/* Buttons */}
          {w.status === "pending" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleApprove(w.id)}
                disabled={loadingId === w.id}
                style={{
                  background: "green",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {loadingId === w.id ? "Processing..." : "Approve"}
              </button>

              <button
                onClick={() => handleReject(w.id)}
                disabled={loadingId === w.id}
                style={{
                  background: "red",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VerifyWinners;