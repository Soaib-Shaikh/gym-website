import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../api/axiosApi";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const Profile = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosApi.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="text-white p-10">Loading...</p>;

  // 🔥 GRAPH DATA (dynamic)
  const progressData = [
    { day: "Start", weight: user.weight + 4 || 80 },
    { day: "Week 1", weight: user.weight + 2 || 78 },
    { day: "Week 2", weight: user.weight + 1 || 76 },
    { day: "Now", weight: user.weight || 75 },
    { day: "Target", weight: user.targetWeight || 70 },
  ];

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen py-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl flex items-center justify-between mb-8">

          <div className="flex items-center gap-5">

            <div className="relative group">
              <label htmlFor="profileImage">
                <img
                  src={user.image || "/default-user.png"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-500 cursor-pointer"
                  alt="profile"
                />
              </label>

              <input
                type="file"
                id="profileImage"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  try {
                    const formData = new FormData();
                    formData.append("image", file);

                    const res = await axiosApi.put("/auth/profile", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data"
                      }
                    });

                    setUser(res.data);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            </div>

            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>

          </div>

          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600"
          >
            Edit Profile
          </button>

        </div>

        {/* 🔥 STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-[#1a1a1a] p-6 rounded-xl">
            <p className="text-gray-400">Current Plan</p>
            <h2 className="text-xl text-red-500 mt-2">
              {user.plan || "No Plan"}
            </h2>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl">
            <p className="text-gray-400">Status</p>
            <h2 className="text-green-400 mt-2">
              {user.plan ? "Active" : "Inactive"}
            </h2>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl">
            <p className="text-gray-400">Goal</p>
            <h2 className="mt-2">
              {user.goal || "-"}
            </h2>
          </div>

        </div>

        {/* 🔥 GRAPH SECTION */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl mb-8">
          <h3 className="mb-4 font-semibold text-lg">
            Progress Chart 📊
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#ff0000"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🔥 PROFILE DETAILS */}
        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-[#1a1a1a] p-6 rounded-xl">
            <h3 className="mb-4 font-semibold">Personal Info</h3>
            <p>Gender: {user.gender || "-"}</p>
            <p>Address: {user.address || "-"}</p>
            <p>Trainer: {user.trainer || "-"}</p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl">
            <h3 className="mb-4 font-semibold">Fitness Info</h3>
            <p>Height: {user.height || "-"} cm</p>
            <p>Weight: {user.weight || "-"} kg</p>
            <p>Target: {user.targetWeight || "-"} kg</p>
          </div>

        </div>

        {/* 🔥 ACTIVITY */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl mt-8">
          <h3 className="mb-4 font-semibold">Activity</h3>

          <ul className="text-gray-400 text-sm space-y-2">
            <li>✔ Joined {user.plan || "Basic"} Plan</li>
            <li>✔ Profile Updated</li>
            <li>✔ Fitness Tracking Started</li>
          </ul>
        </div>

      </div>

    </div>
  );
};

export default Profile;