import React, { useState, useEffect } from "react";
import axiosApi from "../../api/axiosApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loginImg from "../../assets/images/login.png";

const Login = () => {

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
            const res = await axiosApi.post("/auth/login", user);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Login Success 🔥");

            if (res.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            toast.error("Invalid Credentials ❌");
        }
    };

    const handleGoogleLogin = () => {
        const width = 500;
        const height = 600;

        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;

        window.open(
            `${import.meta.env.VITE_API_URL}/auth/google`,
            "Google Login",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    useEffect(() => {
        const handler = (event) => {
            if (event.data.token) {
                localStorage.setItem("token", event.data.token);
                toast.success("Google Login Success 🔥");
                navigate("/");
            }
        };

        window.addEventListener("message", handler);

        return () => window.removeEventListener("message", handler);
    }, []);

    return (
        <div className="h-screen flex">

            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${loginImg})` }}
            ></div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#111] text-white px-8">

                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6">Welcome Back 💪</h2>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        <input
                            type="email"
                            placeholder="Email"
                            className="p-3 bg-transparent border border-gray-600 outline-none"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="p-3 bg-transparent border border-gray-600 outline-none"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />

                        <button className="bg-red-500 py-3 font-semibold hover:bg-red-600">
                            Login
                        </button>

                    </form>

                    <p className="text-center my-4 text-gray-400">or</p>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-white text-black py-3 font-semibold border border-gray-300 hover:bg-gray-200"
                    >
                        Continue with Google
                    </button>

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