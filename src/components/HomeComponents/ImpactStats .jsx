import React from "react";
import { FaAppleAlt, FaLeaf, FaUtensils, FaHandsHelping } from "react-icons/fa";
import CountUp from "react-countup";

const ImpactStats = ({ stats }) => {
  // Example fallback stats
  const defaultStats = [
    { icon: <FaAppleAlt />, value: stats?.totalFood ?? 5200, label: "Food Donated", suffix: " kg" },
    { icon: <FaUtensils />, value: stats?.mealsServed ?? 8500, label: "Meals Served", suffix: "+" },
    { icon: <FaHandsHelping />, value: stats?.charities ?? 120, label: "Active Charities", suffix: "+" },
    { icon: <FaLeaf />, value: stats?.co2Saved ?? 3200, label: "CO₂ Reduced", suffix: " kg" },
  ];

  return (
    <section className=" py-16 rounded-sm bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-600 dark:to-gray-700">
      <h2 className="md:text-3xl text-2xl dark:text-white  font-extrabold text-center mb-12">
        Our Platform Impact
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {defaultStats.map((item, i) => (
          <div
            key={i}
            className="group bg-white shadow-md rounded-2xl p-8 flex flex-col items-center 
            hover:scale-105 hover:shadow-lg transition-all duration-300 dark:bg-gray-900 dark:text-white"
          >
            <div className="text-green-600 text-5xl mb-3 group-hover:text-green-700">
              {item.icon}
            </div>
            <h3 className="text-3xl font-bold">
              <CountUp
                end={item.value}
                duration={2.5}
                separator=","
                enableScrollSpy
                scrollSpyOnce
              />
              {item.suffix}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
