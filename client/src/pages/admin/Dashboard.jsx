import React, { useEffect, useState } from "react";
import axiosApi from "../../api/axiosApi";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const Dashboard = () => {

  const [data, setData] = useState({
    users: [],
    trainers: [],
    payments: [],
    contacts: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, t, p, c] = await Promise.all([
          axiosApi.get("/admin/users"),
          axiosApi.get("/trainers"),
          axiosApi.get("/payment"),
          axiosApi.get("/contact")
        ]);

        setData({
          users: u.data || [],
          trainers: t.data || [],
          payments: p.data || [],
          contacts: c.data || []
        });

      } catch (err) {
        console.log("Dashboard Error:", err);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { name: "Users", value: data.users.length },
    { name: "Trainers", value: data.trainers.length },
    { name: "Payments", value: data.payments.length },
    { name: "Contacts", value: data.contacts.length },
  ];

  return (
    <div className="text-white">

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold mb-8">
        Dashboard Overview 🚀
      </h1>

      {/* 🔥 CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">

        {chartData.map((c, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-6 rounded-2xl border border-white/10 backdrop-blur-xl hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(255,0,0,0.1)]"
          >
            <p className="text-gray-400 text-sm">{c.name}</p>
            <h2 className="text-4xl font-bold mt-2 text-red-500">
              {c.value}
            </h2>
          </div>
        ))}

      </div>

      {/* 🔥 CHARTS */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* BAR CHART */}
        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">
            Data Analytics 📊
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#ff0000" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">
            Distribution 🔥
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={100}>
                {chartData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#ff0000", "#cc0000", "#990000", "#660000"][i]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;