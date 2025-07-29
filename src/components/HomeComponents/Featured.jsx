import { Typewriter } from "react-simple-typewriter";
import Title from "../Title";
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
    <div className="pt-8 md:pt-10 lg:pt-12 xl:pt-14 pb-8 lg:pb-10 xl:pb-14 bg-base-200 px-4 md:px-8">
      <Title title={"Featured Food Donations →"}></Title>
      <section className="pt-12 ">
        <div className="container mx-auto px-4">
          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredDonations?.slice(0, 4).map((donation) => (
              <div
                key={donation._id}
                className="card bg-white shadow-xl rounded-lg transition duration-300"
              >
                <figure className="h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={donation.image}
                    alt={donation.foodType}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg font-bold">
                    {donation.title}
                  </h3>
                  <p>
                    <span className="font-semibold">Restaurant:</span>{" "}
                    {donation.restaurantName}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {donation.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium 
                                        ${
                                          donation.donationStatus ===
                                          "Available"
                                            ? "bg-green-100 text-green-600"
                                            : donation.donationStatus ===
                                              "Requested"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-blue-100 text-blue-600"
                                        }`}
                    >
                      {donation.donationStatus}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
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
              </div>
            ))}
          </div>

          {/* Optional View All Button */}
          <div className="text-center mt-12">
            <Link  to="/all-donations">
              <button className="btn-primary">View All Donations</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featured;
