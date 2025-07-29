import React from "react";
import { FaAppleAlt, FaLeaf, FaUtensils, FaHandsHelping } from "react-icons/fa";

const ImpactStats = ({ stats }) => {
  // Example fallback stats (can be replaced with dynamic props)
  const defaultStats = [
    { icon: <FaAppleAlt />, value: stats?.totalFood || "5,200 kg", label: "Food Donated" },
    { icon: <FaUtensils />, value: stats?.mealsServed || "8,500+", label: "Meals Served" },
    { icon: <FaHandsHelping />, value: stats?.charities || "120+", label: "Active Charities" },
    { icon: <FaLeaf />, value: stats?.co2Saved || "3,200 kg", label: "CO₂ Reduced" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
      <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12">
        🌱 Our Platform Impact
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {defaultStats.map((item, i) => (
          <div
            key={i}
            className="group bg-white shadow-md rounded-2xl p-8 flex flex-col items-center 
            hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-green-600 text-5xl mb-3 group-hover:text-green-700">
              {item.icon}
            </div>
            <h3 className="text-3xl font-bold">{item.value}</h3>
            <p className="text-gray-600 text-lg">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
