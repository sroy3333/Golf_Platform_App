import { useEffect, useState } from "react";
import API from "../api/api";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get("/user/history").then(res => setHistory(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">📜 Draw History</h1>

      {history.map(d => (
        <div key={d.id} className="bg-gray-800 p-4 mb-2 rounded">
          {d.id}
        </div>
      ))}
    </div>
  );
}