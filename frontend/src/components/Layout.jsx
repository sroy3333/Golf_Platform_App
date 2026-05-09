import { Link, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";


export default function Layout() {
  const user = getUser();

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 p-6 space-y-6">
        <h2 className="text-2xl font-bold">🏌️ Golf</h2>

        <nav className="flex flex-col space-y-4">
          <Link to="/dashboard" className="hover:text-green-400">Dashboard</Link>
          <Link to="/history" className="hover:text-green-400">History</Link>
          <Link to="/leaderboard" className="hover:text-green-400">Leaderboard</Link>
          <Link to="/subscription" className="hover:text-green-400">Subscription</Link>
          <Link to="/winners" className="hover:text-green-400">Winners</Link>
          {user?.role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-green-400">Admin Panel</Link>
            </>
          )}
        </nav>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="mt-10 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}