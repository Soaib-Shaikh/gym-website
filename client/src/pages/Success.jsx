import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-white">

      <div className="text-6xl animate-bounce">🎉</div>

      <h1 className="text-4xl font-bold mt-6">
        Payment Successful!
      </h1>

      <p className="text-gray-400 mt-3">
        Your fitness journey starts now 💪
      </p>

      <Link
        to="/"
        className="mt-6 bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600"
      >
        Go Home
      </Link>

    </div>
  );
};

export default Success;