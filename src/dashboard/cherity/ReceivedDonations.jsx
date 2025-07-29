import { useQuery } from "@tanstack/react-query";
import LoadingComp from "../../components/LoadingComp";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { useState } from "react";
import toast from "react-hot-toast";

const ReceivedDonations = () => {
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [reviewField, setReviewField] = useState(null)
    const axiosSecure = useAxiosSecure();
    const { data } = useRole();
    const { data: myPickups = [], isLoading, refetch } = useQuery({
        queryKey: ['pickup-donations', data?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pickup-donations/${data?.email}`)
            return res.data
        }
    });


    const handleSubmitReview = async () => {
        const reviewData = {
            pickupId: selectedPickup._id,
            reviewerEmail: data?.email,
            reviewText: reviewField,
            donationId: selectedPickup.donationId,
            reviewTime: new Date()
        };
        const res = await axiosSecure.post("/reviews", reviewData);
        // console.log(res.data);
        if(res.data.result.insertedId) {
            toast.success("Review Submit Successfully")
        }
        refetch();
        setSelectedPickup(null);
    };



    if (isLoading) {
        return <LoadingComp />
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center mt-6">Recieved Donation</h2>
            {
                myPickups.length !== 0 ? 
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {myPickups?.map((pickup) => (
                    <div key={pickup._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-lg font-bold">
                                {pickup.donationTitle}
                            </h2>
                            <p><span className="font-semibold">Restaurant:</span> {pickup.restaurantName}</p>
                            <p><span className="font-semibold">Location:</span> {pickup.location}</p>
                            <p><span className="font-semibold">Food Type:</span> {pickup.foodType}</p>
                            <p><span className="font-semibold">Quantity:</span> {pickup.quantity}</p>
                            <p><span className="font-semibold">Pickup Time:</span> {pickup.pickupTime}</p>
                            <p><span className="font-semibold">Status:</span> {pickup.pickedUpStatus}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn-primary"
                                    onClick={() => setSelectedPickup(pickup)}
                                >
                                    Give Review
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div> : 
            <h2 className="text-xl ml-6">
                No Recieved Donation 
            </h2>
            }

            {/* review modal  */}
            {selectedPickup && (
                <dialog id="review-modal" open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">
                            Review for {selectedPickup.donationTitle}
                        </h3>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write your review"
                            onChange={e => setReviewField(e.target.value)}
                        ></textarea>
                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={handleSubmitReview}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ReceivedDonations;