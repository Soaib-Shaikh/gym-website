import React, { useState } from "react";
import axiosApi from "../../api/axiosApi";
import { useNavigate } from "react-router-dom";

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

            const res = await axiosApi.post("/auth/register", user);

            const existingUsers =
                JSON.parse(localStorage.getItem("users")) || [];

            existingUsers.push(res.data.user || user);

            localStorage.setItem("users", JSON.stringify(existingUsers));

            alert("Signup Success 🔥");
            navigate("/login");

            // reset form
            setUser({
                name: "",
                email: "",
                password: ""
            });

        } catch (err) {
            console.log(err.response?.data || err.message);
            alert("Signup Failed ❌");
        }
    };

    return (
        <div className="h-screen flex">

            {/* RIGHT FORM */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#111] text-white px-8">

                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6">Create Account 🔥</h2>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="p-3 bg-transparent border border-gray-600 outline-none"
                            name="name"
                            value={user.name || ''}
                            onChange={handleChange}
                        />

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
                            Sign Up
                        </button>

                    </form>

                    <p className="mt-4 text-sm text-gray-400">
                        Already have an account?{" "}
                        <a href="/login" className="text-red-500">
                            Login
                        </a>
                    </p>
                </div>

            </div>

            {/* LEFT IMAGE */}
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