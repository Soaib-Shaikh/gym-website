import React from "react";
import aboutImg from "../assets/images/about2.png"
import trainer1 from "../assets/images/trainer4.png"
import trainer2 from "../assets/images/trainer6.png"
import trainer3 from "../assets/images/trainer5.png"

const About = () => {
  return (
    <div className="bg-[#111] text-white">

      {/* 🔥 HERO ABOUT */}
      <section className="py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT IMAGE */}
        <img
          src={aboutImg}
          alt="gym"
          className="w-full max-w-md h-[400px] object-cover rounded-lg shadow-lg"
        />

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            About Our Fitness Club 💪
          </h2>

          <p className="text-gray-300 mb-4">
            We are a modern fitness club dedicated to helping you achieve your
            dream body. Our certified trainers, personalized programs, and
            high-quality equipment ensure the best results.
          </p>

          <p className="text-gray-400">
            Whether you're a beginner or a professional athlete, we provide
            guidance, motivation, and support to push your limits every day.
          </p>
        </div>

      </section>

      {/* 🔥 STATS SECTION */}
      <section className="bg-red-500 py-16 text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-sm">Happy Clients</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">50+</h3>
            <p className="text-sm">Expert Trainers</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">10+</h3>
            <p className="text-sm">Years Experience</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">100%</h3>
            <p className="text-sm">Success Rate</p>
          </div>

        </div>
      </section>


    </div>
  );
};

export default About;