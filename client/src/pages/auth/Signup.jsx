import React, { useState, useEffect } from "react";
import axiosApi from "../../api/axiosApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
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
            await axiosApi.post("/auth/register", user);

            toast.success("Signup Success 🔥");
            navigate("/login");

            setUser({
                name: "",
                email: "",
                password: ""
            });

        } catch (err) {
            toast.error("Signup Failed ❌");
        }
    };

    const handleGoogleLogin = () => {
        window.open(
            `${import.meta.env.VITE_API_URL}/auth/google`,
            "Google Login",
            "width=500,height=600"
        );
    };

    useEffect(() => {
        const handler = (event) => {
            if (event.data.token) {
                localStorage.setItem("token", event.data.token);
                toast.success("Signup with Google Success 🔥");
                navigate("/");
            }
        };

        window.addEventListener("message", handler);

        return () => window.removeEventListener("message", handler);
    }, []);

    return (
        <div className="h-screen flex">

            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#111] text-white px-8">

                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6">Create Account 🔥</h2>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="p-3 bg-transparent border border-gray-600 outline-none"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />

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
                            Sign Up
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
                        Already have an account?{" "}
                        <a href="/login" className="text-red-500">
                            Login
                        </a>
                    </p>
                </div>

            </div>

            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop')",
                }}
            ></div>

        </div>
    );
};

export default Signup;