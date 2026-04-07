import React, { useState } from "react";
import axiosApi from "../../api/axiosApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loginImg from "../../assets/images/login.png"

const Login = () => {
    console.log(import.meta.env.VITE_API_URL);


    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 🔥 API CALL
            const res = await axiosApi.post("/auth/login", user);

            // 🔐 TOKEN SAVE
            localStorage.setItem("token", res.data.token);

            // 👤 USER SAVE (optional but useful)
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Login Success 🔥");

            // 🔁 redirect (home ya dashboard)

            if (res.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            console.log(err.response?.data || err.message);
            toast.error("Invalid Credentials ❌");
        }
    };

    return (
        <div className="h-screen flex">

            {/* LEFT IMAGE */}
            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${loginImg})`
                }}
            ></div>

            {/* RIGHT FORM */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#111] text-white px-8">

                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6">Welcome Back 💪</h2>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        <input
                            type="email"
                            placeholder="Email"
                            className="p-3 bg-transparent border border-gray-600 outline-none"
                            name="email"
                            value={user.email || ''}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="p-3 bg-transparent border border-gray-600 outline-none"
                            name="password"
                            value={user.password || ''}
                            onChange={handleChange}
                        />

                        <button className="bg-red-500 py-3 font-semibold hover:bg-red-600">
                            Login
                        </button>

                    </form>

                    <p className="mt-4 text-sm text-gray-400">
                        Don't have an account?{" "}
                        <a href="/register" className="text-red-500">
                            Sign Up
                        </a>
                    </p>
                </div>

            </div>

        </div>
    );
};

export default Login;