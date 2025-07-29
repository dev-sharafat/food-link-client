import { Link } from "react-router";
import Title from "../../components/Title";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingComp from "./../../components/LoadingComp";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";

const AllDonations = () => {
  const axiosPublic = useAxiosPublic();
  const [sortOption, setSortOption] = useState(""); // 🔹 New State for Sorting

  const {
    data: donations = [],
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["donations/verified"],
    queryFn: async () => {
      const res = await axiosPublic("/donations/verified");
      return res.data;
    },
  });

  if (isPending || isLoading) {
    return <LoadingComp />;
  }

  // 🔹 Sorting Function
  const sortDonations = (data) => {
    const sorted = [...data];
    if (sortOption === "quantity-asc") {
      sorted.sort((a, b) => a.quantity - b.quantity);
    } else if (sortOption === "quantity-desc") {
      sorted.sort((a, b) => b.quantity - a.quantity);
    } else if (sortOption === "pickup-asc") {
      sorted.sort((a, b) => new Date(a.pickupTime) - new Date(b.pickupTime));
    } else if (sortOption === "pickup-desc") {
      sorted.sort((a, b) => new Date(b.pickupTime) - new Date(a.pickupTime));
    }
    return sorted;
  };

  const sortedDonations = sortDonations(donations);

  return (
    <div className="section-top section-bottom container mx-auto">
      <span className="text-center">
        <Title title={"Verified Donation Catalogue"} />
      </span>

      {/* 🔹 Sorting Dropdown */}
      <div className="flex justify-center mb-5 mt-10">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-14 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 cursor-pointer hover:border-blue-400 transition-all duration-200"
        >
          <option value="">✨ Sort By</option>
          <option value="quantity-asc">⬆️ Quantity (Low → High)</option>
          <option value="quantity-desc">⬇️ Quantity (High → Low)</option>
          <option value="pickup-asc">⏳ Pickup Time (Earliest First)</option>
          <option value="pickup-desc">⌛ Pickup Time (Latest First)</option>
        </select>
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {sortedDonations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* Image */}
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-48 object-cover"
            />

            {/* Card Content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{donation.title}</h3>
              <p className="text-gray-600 text-sm">
                {donation.restaurantName} - {donation.location}
              </p>

              {donation.charityName && (
                <p className="text-gray-600 text-sm">
                  Charity: {donation.charityName}
                </p>
              )}

              <div className="flex items-center justify-between mt-3 mb-4">
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${
                      donation.donationStatus === "Available"
                        ? "bg-green-100 text-green-600"
                        : donation.donationStatus === "Requested"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                >
                  {donation.donationStatus}
                </span>

                {/* Quantity */}
                <span className="text-sm font-medium text-gray-700">
                  Quantity: {donation.quantity}
                </span>
              </div>

              {/* Details Button */}
              <Link
                to={`/donation/${donation._id}`}
                className="btn-primary flex justify-center items-center gap-2"
              >
                Details <FaExternalLinkAlt />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonations;
