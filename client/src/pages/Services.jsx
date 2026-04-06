import React from "react";
import { FaDumbbell, FaHeartbeat, FaAppleAlt, FaFire, FaSpa, FaWeight } from "react-icons/fa";

const services = [
  {
    title: "Personal Training",
    desc: "Get customized workout plans from expert trainers.",
    icon: <FaDumbbell />,
  },
  {
    title: "Cardio Training",
    desc: "Improve stamina and heart health with cardio sessions.",
    icon: <FaHeartbeat />,
  },
  {
    title: "Nutrition Plan",
    desc: "Personalized diet plans to achieve your goals faster.",
    icon: <FaAppleAlt />,
  },
  {
    title: "Strength Training",
    desc: "Build muscle and increase strength effectively.",
    icon: <FaWeight />,
  },
  {
    title: "Yoga Classes",
    desc: "Enhance flexibility and mental peace with yoga.",
    icon: <FaSpa />,
  },
  {
    title: "Weight Loss",
    desc: "Burn fat and stay fit with guided programs.",
    icon: <FaFire />,
  },
];

const Services = () => {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-6">

      {/* 🔥 HEADING */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Our Services <span className="text-red-500">🔥</span>
        </h2>
        <p className="text-gray-400 mt-4">
          Transform your body with our premium fitness programs
        </p>
      </div>

      {/* 🔥 CARDS */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {services.map((service, index) => (
          <div
            key={index}
            className="group relative bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 
            hover:border-red-500 transition duration-300 hover:-translate-y-3 hover:shadow-[0_10px_40px_rgba(255,0,0,0.3)]"
          >

            {/* ICON */}
            <div className="text-3xl text-red-500 mb-4 group-hover:scale-110 transition">
              {service.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-semibold mb-3 group-hover:text-red-400 transition">
              {service.title}
            </h3>

            {/* DESC */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.desc}
            </p>

            {/* 🔥 HOVER LINE */}
            <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-500 group-hover:w-full transition-all duration-300"></div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Services;