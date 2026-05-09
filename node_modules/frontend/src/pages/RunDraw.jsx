import { useState } from "react";
import API from "../api/api";

export default function RunDraw() {
  const [drawId, setDrawId] = useState("");

  const handleRun = async () => {
    try {
      const res = await API.post("/draw/run", { drawId });
      alert("Draw completed!");
      console.log(res.data);
    } catch {
      alert("Error running draw");
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Run Draw</h1>

      <input
        placeholder="Draw ID"
        className="p-2 mb-2 bg-gray-700 rounded"
        onChange={e => setDrawId(e.target.value)}
      />

      <button
        onClick={handleRun}
        className="bg-green-500 px-4 py-2 rounded"
      >
        Run Draw
      </button>
    </div>
  );
}