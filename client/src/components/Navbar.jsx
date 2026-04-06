import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  // 🔥 Separate states
  const [serviceOpen, setServiceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center text-white">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 border-l-4 border-white"></div>
          <h1 className="text-lg font-semibold tracking-widest">
            FITNESS <span className="text-red-500">CLUB</span>
          </h1>
        </Link>

        {/* MENU */}
        <ul className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest">

          <li>
            <Link to="/" className="hover:text-yellow-400 transition text-sm">Home</Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-yellow-400 transition text-sm">About</Link>
          </li>

          {/* 🔥 SERVICES DROPDOWN */}
          <li
            className="relative"
            onMouseEnter={() => setServiceOpen(true)}
            onMouseLeave={() => setServiceOpen(false)}
          >
            <span className="cursor-pointer 1white transition text-sm">
              Services ▾
            </span>

            {serviceOpen && (
              <div className="absolute top-6 left-0 bg-[#1a1a1a] rounded-lg shadow-lg border border-white/10 overflow-hidden min-w-[150px]">

                <Link
                  to="/services"
                  className="block px-4 py-2 text-sm hover:bg-red-500"
                >
                  All Services
                </Link>

                <Link
                  to="/trainers"
                  className="block px-4 py-2 text-sm hover:bg-red-500"
                >
                  Trainers
                </Link>

                <Link to="/book-trainer" className="block px-4 py-2 text-sm hover:bg-red-500">
                    Book Trainer
                </Link>

              </div>
            )}
          </li>

          <li>
            <Link to="/pricing" className="hover:text-yellow-400 transition text-sm">Pricing</Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-yellow-400 transition text-sm">Contact</Link>
          </li>

        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 relative">

          {!token ? (
            <>
              <Link
                to="/login"
                className="border border-white px-5 py-2 text-xs font-semibold uppercase hover:bg-white hover:text-black transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-red-500 px-5 py-2 text-xs font-semibold uppercase hover:bg-red-600 transition"
              >
                Join Now
              </Link>
            </>
          ) : (
            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/20"
              >
                👤 {user?.name || "User"}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-[#1a1a1a] rounded-xl shadow-lg border border-white/10 overflow-hidden">

                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-sm hover:bg-red-500"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/my-bookings"
                    className="block px-4 py-3 text-sm hover:bg-red-500 transition"
                    onClick={() => setOpen(false)}
                  >
                    My Bookings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-red-500"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;