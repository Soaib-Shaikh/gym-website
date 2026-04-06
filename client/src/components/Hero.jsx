import React from "react";
import heroImg from "../assets/images/hero-bg.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full h-screen bg-[#111] flex items-center relative overflow-hidden">

      {/* 🔴 RED SLANTED BACKGROUND */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-red-500 skew-x-[-20deg] origin-top-right"></div>

      {/* 🔥 CONTENT */}
      <div className="max-w-7xl mx-auto w-full px-8 grid md:grid-cols-2 items-center relative z-10">

        {/* LEFT SIDE */}
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            BE SPIRITED FEARLESS AN <br />
            EVERYDAY ATHLETE
          </h1>

          <p className="text-gray-300 mb-6 text-sm md:text-base max-w-md">
            A Certified Running Coach And Personal Trainer For Over A Decade.
            I've Helped Thousands Of Runners Through Personalized Coaching.
          </p>

          <Link to="/pricing">
            <button className="bg-red-500 px-6 py-3 text-sm font-semibold uppercase hover:bg-red-600 transition">
              View Plans
            </button>
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center md:justify-end mt-10 md:mt-0">
          <img
            src={heroImg}
            alt="hero"
            className="w-[80%] md:w-[90%] object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;