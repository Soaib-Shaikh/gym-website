import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../api/axiosApi.js";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            await axiosApi.post("/auth/send-otp", { email });
            toast.success("OTP Sent 🔥");
            navigate("/verify-otp", { state: { email } });
        } catch (err) {
            console.log("ERROR:", err.response?.data);

            toast.error(
                err.response?.data?.msg || "Something went wrong ❌"
            );
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#111] text-white">

            <div className="bg-black/40 p-8 rounded-xl w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6">Forgot Password 🔑</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 mb-4 bg-transparent border border-gray-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    onClick={handleSendOtp}
                    className="w-full bg-red-500 py-3 hover:bg-red-600"
                >
                    Send OTP
                </button>

            </div>

        </div>
    );
};

export default ForgotPassword;