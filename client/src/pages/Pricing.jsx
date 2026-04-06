import React, { useState } from "react";
import axiosApi from "../api/axiosApi";

const plans = [
  {
    name: "Basic",
    price: 999,
    features: [
      "Gym Access",
      "Basic Equipment",
      "Cardio Training",
      "Weight Loss Program",
    ],
  },
  {
    name: "Standard",
    price: 1999,
    features: [
      "All Basic Features",
      "Personal Trainer",
      "Diet Plan",
      "Muscle Gain Program",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: 2999,
    features: [
      "All Features",
      "Dedicated Coach",
      "Advanced Strength Training",
      "Weight Gain + Fat Loss",
    ],
  },
  {
    name: "Elite 🔥",
    price: 4999,
    features: [
      "Everything in Premium",
      "1-on-1 Personal Coach",
      "Custom Workout + Diet",
      "Priority Support",
      "Monthly Progress Tracking",
    ],
  },
];

const Pricing = () => {

  const [billing, setBilling] = useState("monthly");

  const profile = JSON.parse(localStorage.getItem("profile")) || {};

  // 🔥 price logic
  const getPrice = (price) => {
    return billing === "yearly"
      ? Math.floor(price * 12 * 0.8)
      : price;
  };

  // 🤖 recommended logic
  const getRecommendedPlan = () => {
    if (!profile.plan) return "Standard";
    if (profile.plan === "Basic") return "Standard";
    return "Premium";
  };

  const handlePayment = async (plan) => {
    try {
      const finalAmount = getPrice(plan.price);

      const { data } = await axiosApi.post("/payment/create-order", {
        amount: finalAmount,
      });

      const options = {
        key: "rzp_test_SY8maWhUGXo54x",
        amount: data.amount,
        currency: data.currency,
        name: "Fitness Club",
        description: plan.name,
        order_id: data.id,

        handler: async function (response) {
          await axiosApi.post("/payment/verify", {
            ...response,
            plan: plan.name
          });

          const updatedProfile = { ...profile, plan: plan.name };
          localStorage.setItem("profile", JSON.stringify(updatedProfile));

          window.location.href = "/success";
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Payment Failed ❌");
    }
  };

  return (
    <section className="bg-[#0b0b0b] text-white py-24 px-6">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold">
          Pricing Plans 💰
        </h2>
        <p className="text-gray-400 mt-4 text-lg">
          Choose your perfect fitness plan
        </p>
      </div>

      {/* 🔥 TOGGLE */}
      <div className="flex justify-center mb-16">
        <div className="bg-[#1a1a1a] p-1 rounded-full flex">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 rounded-full text-sm ${billing === "monthly" ? "bg-red-500" : ""
              }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-6 py-2 rounded-full text-sm ${billing === "yearly" ? "bg-red-500" : ""
              }`}
          >
            Yearly (20% OFF)
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-4 gap-10 max-w-7xl mx-auto">

        {plans.map((plan, index) => {

          const isActive = profile.plan === plan.name;
          const isRecommended = getRecommendedPlan() === plan.name;

          return (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border backdrop-blur-xl
              ${plan.highlight ? "border-red-500 scale-105" : "border-white/10"}
              ${isActive ? "border-green-500" : ""}
              bg-[#141414]
              hover:scale-105 transition duration-300`}
            >

              {/* 🔥 TAGS */}
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-xs px-4 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}

              {isRecommended && (
                <span className="absolute top-3 left-3 bg-blue-500 text-xs px-2 py-1 rounded">
                  Recommended
                </span>
              )}

              {billing === "yearly" && (
                <span className="absolute top-3 right-3 bg-green-500 text-xs px-2 py-1 rounded">
                  20% OFF
                </span>
              )}

              {/* ACTIVE PLAN */}
              {isActive && (
                <span className="text-green-400 text-xs absolute bottom-3 left-3">
                  ✔ Active
                </span>
              )}

              {/* NAME */}
              <h3 className="text-2xl font-bold mb-3 text-center">
                {plan.name}
              </h3>

              {/* PRICE */}
              <p className="text-4xl font-extrabold text-center text-red-500 mb-6">
                ₹{getPrice(plan.price)}
                <span className="text-sm text-gray-400">
                  {billing === "monthly" ? " /month" : " /year"}
                </span>
              </p>

              {/* FEATURES */}
              <ul className="mb-8 space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="text-gray-300 text-sm flex gap-2">
                    <span className="text-green-400">✔</span> {f}
                  </li>
                ))}
              </ul>

              {/* BUTTON */}
              <button
                disabled={isActive}
                onClick={() => handlePayment(plan)}
                className={`w-full py-3 text-sm font-semibold rounded-xl ${isActive
                    ? "bg-gray-600 cursor-not-allowed"
                    : plan.highlight
                      ? "bg-red-500 hover:bg-red-600"
                      : "border border-white/20 hover:bg-white hover:text-black"
                  } transition`}
              >
                {isActive ? "Current Plan" : "Choose Plan 🚀"}
              </button>

            </div>
          );
        })}

      </div>
    </section>
  );
};

export default Pricing;