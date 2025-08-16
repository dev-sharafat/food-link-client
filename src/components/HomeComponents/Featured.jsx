import { Typewriter } from "react-simple-typewriter";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingComp from "../LoadingComp";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Featured = () => {
  const axiosPublic = useAxiosPublic();
  const { data: featuredDonations = [] } = useQuery({
    queryKey: ["donations-featured"],
    queryFn: async () => {
      const res = await axiosPublic("/donations-featured");
      return res.data;
    },
  });

  return (
    <div className="pt-8 md:pt-10 lg:pt-12 xl:pt-14 bg-base-300 dark:bg-gray-600 pb-8 lg:pb-10 xl:pb-14 mt-5 rounded-sm  px-4 md:px-8">
      <h1 className="text-2xl lg:text-3xl text-center  font-bold dark:text-black"> Featured Food Donations</h1>
     <section className="pt-12">
      <div className="container mx-auto px-4">
        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {featuredDonations?.slice(0, 4).map((donation, index) => (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="card bg-white dark:bg-gray-800 shadow-xl rounded-lg 
                        transition duration-300  "
            >
              <figure className="h-48 overflow-hidden rounded-t-lg">
                <motion.img
                  src={donation.image}
                  alt={donation.foodType}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg font-bold text-gray-900 dark:text-gray-100">
                  {donation.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Restaurant:</span>{" "}
                  {donation.restaurantName}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Location:</span>{" "}
                  {donation.location}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${
                        donation.donationStatus === "Available"
                          ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300"
                          : donation.donationStatus === "Requested"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300"
                      }`}
                  >
                    {donation.donationStatus}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantity: {donation.quantity}
                  </span>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/donation/${donation._id}`}
                    className="btn-primary flex justify-center items-center gap-2"
                  >
                    Details <FaExternalLinkAlt />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/all-donations">
            <button className="btn-primary">View All Donations</button>
          </Link>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default Featured;
