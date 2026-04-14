import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axiosApi from "../../api/axiosApi.js";

const ResetPassword = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      await axiosApi.post("/auth/reset-password", {
        email,
        newPassword: password
      });

      toast.success("Password Reset Success 🔥");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.msg || "Error ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#111] text-white">

      <div className="bg-black/40 p-8 rounded-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">Reset Password 🔐</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-4 bg-transparent border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-red-500 py-3 hover:bg-red-600"
        >
          Reset Password
        </button>

      </div>

    </div>
  );
};

export default ResetPassword;