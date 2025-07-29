import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import LoadingComp from "../../components/LoadingComp";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import RequestDonationModal from "./RequestDonationModal";
import useRole from "./../../hooks/useRole";
import toast from "react-hot-toast";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [commentvalue, setCommetnValue] = useState("");
  const [rating, setRating] = useState(0);

  const { data } = useRole();
  const userRole = data?.role;
  const userEmail = data?.email;
  const name = data?.name;
  const image = data?.image;

  const { data: donation, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation/${id}`);
      return res.data;
    },
  });

  const donationId = donation?._id;

  const { data: favouriteCheck, refetch } = useQuery({
    queryKey: ["favourite-check", donationId, userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get("/favourite-check", {
        params: { donationId, userEmail },
      });
      return res.data;
    },
    enabled: !!donationId && !!userEmail,
  });

  const { data: reviews = [], refetch: reviewReface } = useQuery({
    queryKey: ["get-reviews", donationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-reviews/${donationId}`);
      return res.data;
    },
    enabled: !!donationId,
  });

  const handleSaveToFavorites = async () => {
    const favoutiteInfo = {
      donationId: donation._id,
      image: donation.image,
      title: donation.title,
      RestaurantName: donation.restaurantName,
      RestaurantEmail: donation.restaurantEmail,
      location: donation.location,
      DonationStatus: donation.donationStatus,
      quantity: donation.quantity,
      userEmail: userEmail,
      favourite: true,
    };
    const res = await axiosSecure.post("/favourite", favoutiteInfo);
    if (res.data.insertedId) {
      refetch();
      toast.success("Saved to favourite");
    }
  };

  const handleRequestSubmit = async (formData) => {
    try {
      const res = await axiosSecure.post("/donation-request", formData);
      if (res.data.success) {
        toast.success("Request sent successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(error.message || "Request failed");
    }
  };

  const handleComment = async () => {
    if (!rating) {
      return toast.error("Give a rating first");
    }

    const reviewInfo = {
      comment: commentvalue,
      photo: image,
      image: donation.image,
      reviewName: name,
      reviewEmail: userEmail,
      donationId: donationId,
      reviewRating: rating,
       title: donation.title,
      RestaurantName: donation.restaurantName,
      createdAt: new Date(),
    };

    const res = await axiosSecure.post("/add-reviews", reviewInfo);
    if (res.data?.result.insertedId) {
      toast.success("Review Added");
      setCommetnValue("");
      setRating(0);
      setIsReviewModalOpen(false);
      reviewReface();
    }
  };

  if (isLoading) return <LoadingComp />;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-base-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6">{donation.title}</h2>
        <div>
          {favouriteCheck?.favourite ? (
            <button className="text-3xl text-red-500 font-bold flex items-center">
              <span className="text-sm text-black mr-1">Favorite</span>{" "}
              <FaHeart />
            </button>
          ) : (
            <button
              onClick={handleSaveToFavorites}
              className="text-3xl text-red-500 font-bold flex items-center"
            >
              <span className="text-sm text-black mr-1">Make Favorite</span>{" "}
              <CiHeart />
            </button>
          )}
        </div>
      </div>

      <figure>
        <img
          src={donation.image}
          alt={donation.title}
          className="rounded-lg w-full h-full max-h-[500px] object-cover"
        />
      </figure>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Food Type</h3>
            <p>{donation.foodType || "-"}</p>
          </div>
          <div>
            <h3 className="font-semibold">Quantity</h3>
            <p>{donation.quantity || "-"}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Restaurant</h3>
          <p>
            {donation.restaurantName} - {donation.location}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Pickup Time Window</h3>
          <p>{donation.pickupTime || "Not specified"}</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold mb-1">Status</h3>
            <div
              className={`badge ${
                donation.donationStatus === "Available"
                  ? "badge-success"
                  : donation.donationStatus === "Requested"
                  ? "badge-warning"
                  : "badge-info"
              }`}
            >
              {donation.donationStatus}
            </div>
          </div>

          <button
            className="btn btn-warning btn-sm"
            onClick={() => setIsModalOpen(true)}
            disabled={
              donation.donationStatus !== "Available" || userRole !== "charity"
            }
          >
            Request
          </button>

          <RequestDonationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            donationData={donation}
            onSubmit={handleRequestSubmit}
          />
        </div>
      </div>

      {/* Review Button */}
      <div className="mt-8">
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="btn btn-outline btn-primary"
        >
          Submit Comment
        </button>
      </div>

      {/* DaisyUI Review Modal */}
      {isReviewModalOpen && (
        <div className="modal modal-open z-50">
          <div className="modal-box w-full max-w-lg">
            <h3 className="font-bold text-xl mb-4">Submit Review</h3>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Comment</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Write your review..."
                value={commentvalue}
                onChange={(e) => setCommetnValue(e.target.value)}
              ></textarea>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Rating</span>
              </label>
              <Rating
                style={{ maxWidth: 180 }}
                className="text-yellow-400"
                value={rating}
                onChange={setRating}
              />
            </div>

            <div className="modal-action">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleComment} className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-base-200 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.photo}
                    alt={review.reviewName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{review.reviewName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <Rating
                  style={{ maxWidth: 80 }}
                  value={review.reviewRating}
                  readOnly
                />

                <p className="mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationDetails;
