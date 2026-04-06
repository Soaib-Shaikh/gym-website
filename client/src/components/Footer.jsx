import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0d0d0d] text-gray-300 pt-16 pb-8 px-8">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* LOGO + ABOUT */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            FITNESS <span className="text-red-500">CLUB</span>
          </h2>
          <p className="text-sm text-gray-400">
            Transform your body with our premium fitness programs and expert trainers.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">

            <li>
              <Link to="/" className="hover:text-red-500 transition">Home</Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-red-500 transition">About</Link>
            </li>

            <li>
              <Link to="/services" className="hover:text-red-500 transition">Services</Link>
            </li>

            <li>
              <Link to="/trainers" className="hover:text-red-500 transition">Trainers</Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
            </li>

          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-500 cursor-pointer">Personal Training</li>
            <li className="hover:text-red-500 cursor-pointer">Cardio Training</li>
            <li className="hover:text-red-500 cursor-pointer">Yoga Classes</li>
            <li className="hover:text-red-500 cursor-pointer">Weight Loss</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4">

            <a href="#" className="p-3 bg-[#1a1a1a] rounded-full hover:bg-red-500 transition">
              <FaFacebookF />
            </a>

            <a href="#" className="p-3 bg-[#1a1a1a] rounded-full hover:bg-red-500 transition">
              <FaInstagram />
            </a>

            <a href="#" className="p-3 bg-[#1a1a1a] rounded-full hover:bg-red-500 transition">
              <FaTwitter />
            </a>

            <a href="#" className="p-3 bg-[#1a1a1a] rounded-full hover:bg-red-500 transition">
              <FaYoutube />
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Fitness Club. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;