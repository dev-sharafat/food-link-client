import { Link } from "react-router";
import Title from "../../components/Title";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingComp from "./../../components/LoadingComp";
import { FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
const AllDonations = () => {
  const axiosPublic = useAxiosPublic();
  const [sortOption, setSortOption] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 

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

  // 🔹 Filter Donations (by location)
  const filteredDonations = sortedDonations.filter((donation) =>
    donation.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Donations | FoodLink</title>
      </Helmet>
      <div className="section-top section-bottom container min-h-screen mx-auto px-4">
        <span className="text-center block mb-6">
          <Title title={"Verified Donation Catalogue"} />
        </span>

        {/* 🔹 Search + Sort Controls */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-100 dark:border-none dark:bg-gray-600 dark:text-white
                         bg-white shadow-sm focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 text-gray-700 transition-all duration-200"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-600 dark:text-white dark:border-none shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
                         cursor-pointer hover:border-blue-400 transition-all duration-200"
            >
              <option value="">Sort By</option>
              <option value="quantity-asc">Quantity (Low → High)</option>
              <option value="quantity-desc">Quantity (High → Low)</option>
              <option value="pickup-asc">Pickup Time (Earliest First)</option>
              <option value="pickup-desc">Pickup Time (Latest First)</option>
            </select>
          </div>
        </div>

        {/* Donations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredDonations.length > 0 ? (
    filteredDonations.map((donation, index) => (
      <motion.div
        key={donation._id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white dark:bg-gray-600 dark:text-white rounded-xl shadow-md 
                   hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
      >
        {/* Image */}
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full h-48 object-cover"
        />

        {/* Card Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-1 dark:text-white text-gray-800">
            {donation.title}
          </h3>
          <p className="text-gray-600 dark:text-white text-sm mb-1">
            {donation.restaurantName} -{" "}
            <span className="font-medium">{donation.location}</span>
          </p>

          {donation.charityName && (
            <p className="text-gray-600 text-sm mb-1">
              Charity: {donation.charityName}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto mb-4">
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
            <span className="text-sm font-medium dark:text-white text-gray-700">
              Qty: {donation.quantity}
            </span>
          </div>

          {/* Details Button */}
          <Link
            to={`/donation/${donation._id}`}
            className="mt-auto w-full inline-flex justify-center items-center gap-2 
                       px-4 py-2 rounded-lg bg-blue-500 text-white font-medium 
                       hover:bg-blue-600 transition-colors"
          >
            Details <FaExternalLinkAlt />
          </Link>
        </div>
      </motion.div>
    ))
  ) : (
    <p className="text-center col-span-full text-gray-500 mt-10 text-lg">
      ❌ No donations found for "<span className="font-semibold">{searchQuery}</span>"
    </p>
  )}
</div>
      </div>
    </>
  );
};

export default AllDonations;
