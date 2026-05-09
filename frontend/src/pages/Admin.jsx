import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div>
      <h1 className="text-3xl mb-6">⚙️ Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/create-draw" className="bg-gray-800 p-6 rounded">🎯 Create Draw</Link>
        <Link to="/run-draw" className="bg-gray-800 p-6 rounded">▶️ Run Draw</Link>
        <Link to="/add-score" className="bg-gray-800 p-6 rounded">➕ Add Score</Link>
        <Link to="/verify-winners" className="bg-gray-800 p-6 rounded">✅ Verify Winners</Link>
        <Link to="/add-charity" className="bg-gray-800 p-6 rounded">❤️ Add Charity</Link>
      </div>
    </div>
  );
}