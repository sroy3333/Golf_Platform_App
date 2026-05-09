import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const handleReset = async () => {
    try {
      await API.post("/auth/reset-password", { token, password });
      alert("Password updated!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-96">

        <h2 className="text-2xl mb-4 text-center">Set New Password</h2>

        <input
          type="password"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          placeholder="New password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-green-500 p-2 rounded"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}