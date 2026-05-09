import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: ""
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/login"); // better than window.location
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg">

        {/* ✅ BRANDING */}
        <h1 className="text-3xl font-bold text-center mb-2">
          🏌️ Golf Platform
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Create new password
        </p>

        <p className="text-center text-gray-400 mb-6">
          Create your account
        </p>

        {/* INPUTS */}
        <input
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 p-2 rounded hover:bg-green-600"
        >
          Signup
        </button>

        {/* ✅ LOGIN LINK */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}