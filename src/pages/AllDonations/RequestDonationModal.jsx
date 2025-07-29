import { useState } from "react";
import useRole from "../../hooks/useRole";

const RequestDonationModal = ({ isOpen, onClose, donationData, onSubmit }) => {
    const [pickupTime, setPickupTime] = useState("");
    const [description, setDescription] = useState("");
    const { data } = useRole()

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            donationId: donationData._id,
            donationTitle: donationData.title,
            restaurantName: donationData.restaurantName,
            restaurantEmail: donationData.restaurantEmail,
            foodType: donationData.foodType,
            location: donationData.location,
            quantity: donationData.quantity,
            charityName: data?.name,
            charityEmail: data?.email,
            pickupTime,
            description,
            requestStatus: "Pending",
            createdAt: new Date().toISOString()
        });

        setPickupTime("");
        setDescription("");
        onClose();
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-3">Request Donation</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">Donation Title</label>
                        <input
                            type="text"
                            value={donationData?.title}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="label">Restaurant Name</label>
                        <input
                            type="text"
                            value={donationData?.restaurantName}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="label">Charity Name</label>
                        <input
                            type="text"
                            value={data?.name}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="label">Charity Email</label>
                        <input
                            type="text"
                            value={data?.email}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="label">Request Description</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="label">Pickup Time</label>
                        <input
                            type="datetime-local"
                            className="input input-bordered w-full"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                        Submit Request
                    </button>
                </form>

                <div className="modal-action">
                    <button className="btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default RequestDonationModal;
