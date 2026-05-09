import { useState } from "react";
import API from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = async () => {
    try {
        await API.post("/auth/forgot-password", { email });
        alert("Check your email");
    } catch (err) {
        console.error(err);
        alert("Failed to send reset email");
    }
};

return (
    <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-96">

        <h2 className="text-2xl mb-4 text-center">Reset Password</h2>

        <input
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 p-2 rounded"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
}