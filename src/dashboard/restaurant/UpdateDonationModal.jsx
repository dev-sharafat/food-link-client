import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

const UpdateDonationModal = ({ isOpen, onClose, donation, onUpdate }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: donation?.title,
            foodType: donation?.foodType,
            quantity: donation?.quantity,
            pickupTime: donation?.pickupTime,
            location: donation?.location,
        }
    });

    const submitHandler = (data) => {
        onUpdate(donation._id, data);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 btn btn-sm btn-circle"
                >
                    <FaTimes />
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Update Donation
                </h2>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

                    <div>
                        <label className="label font-semibold">Donation Title</label>
                        <input
                            {...register("title", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">Food Type</label>
                        <input
                            {...register("foodType", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">Quantity</label>
                        <input
                            type="number"
                            {...register("quantity", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">Pickup Time</label>
                        <input
                            {...register("pickupTime", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">Location</label>
                        <input
                            {...register("location", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateDonationModal;
