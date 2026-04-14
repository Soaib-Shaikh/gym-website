import React, { useState } from "react";
import axiosApi from "../../api/axiosApi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyOtp = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      await axiosApi.post("/auth/verify-otp", { email, otp });

      toast.success("OTP Verified 🔥");

      navigate("/reset-password", { state: { email } });

    } catch (err) {
      toast.error(err.response?.data?.msg || "Invalid OTP ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#111] text-white">
      <div className="bg-black/40 p-8 rounded-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">Verify OTP 🔐</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-3 mb-4 border border-gray-600 bg-transparent"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="w-full bg-red-500 py-3"
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
};

export default VerifyOtp;