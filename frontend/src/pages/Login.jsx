import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-2">🏌️ Golf Platform</h1>
        <p className="text-gray-400 text-center mb-6">Welcome back</p>

        <input
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 p-2 rounded hover:bg-green-600"
        >
          Login
        </button>

        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <Link to="/forgot-password" className="hover:text-green-400">
            Forgot Password?
          </Link>

          <Link to="/" className="hover:text-green-400">
            Signup
          </Link>
        </div>

      </div>
    </div>
  );
}