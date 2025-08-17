/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from './../../hooks/useRole';
import LoadingComp from "../../components/LoadingComp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const RestaurantDonations = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { data } = useRole();
    const { _id } = data || {};
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const { data: donations = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['my-donation', _id],
        queryFn: async () => {
            if (!_id) return [];
            const res = await axiosSecure.get(`/my-donation/${_id}`)
            return res?.data
        }
    });

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await axiosSecure.delete(`/delete-donation/${id}`);
            if (res?.data.message === 'deleted successfully') {
                toast.success("Deleted successfully");
                refetch();
            }
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const openModal = (donation) => {
        setSelectedId(donation._id);
        reset({
            title: donation.title,
            foodType: donation.foodType,
            quantity: donation.quantity,
            pickupTime: donation.pickupTime,
            location: donation.location
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedId(null);
        reset();
    };

    const handleUpdateSubmit = async (formData) => {
        setLoading(true);
        try {
            const res = await axiosSecure.patch(`/update-donation/${selectedId}`, formData);
            if (res?.data.modifiedCount > 0) {
                await refetch();
                closeModal();
                toast.success("Donation updated successfully");
            }
        } catch (error) {
            // console.log(error);
            toast.error("Update failed!");
        } finally {
            setLoading(false);
        }
    };

    if (isPending || isLoading || loading) {
        return <LoadingComp />;
    }

    return (
        <div className="min-h-screen dark:bg-gray-900  px-4 py-8">
            <h2 className="lg:text-4xl text-2xl font-bold mb-6 dark:text-white ">My Donations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((donation) => (
                    <div key={donation._id} className="card bg-base-100 dark:bg-gray-600 **:dark:text-white shadow-xl">
                        <figure className="h-48">
                            <img
                                src={donation.image}
                                alt={donation.title}
                                className="object-cover w-full h-full"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{donation.title}</h2>
                            <p><span className="font-semibold">Food Type:</span> {donation.foodType}</p>
                            <p><span className="font-semibold">Quantity:</span> {donation.quantity}</p>
                            <p><span className="font-semibold">Restaurant:</span> {donation.restaurantName}</p>
                            <p>
                                <span className="font-semibold">Status:</span>{" "}
                                <span
                                    className={`badge ${donation.status === "Verified"
                                        ? "badge-success"
                                        : donation.status === "Rejected"
                                            ? "badge-error"
                                            : "badge-warning"
                                        }`}
                                >
                                    {donation.status}
                                </span>
                            </p>
                            <div className="card-actions justify-end mt-4">
                                {donation.status !== "Rejected" && (
                                    <button
                                        className="text-sm flex justify-center items-center btn-sm btn-primary"
                                        onClick={() => openModal(donation)}
                                    >
                                        <FaEdit className="mr-1" /> Update
                                    </button>
                                )}
                                <button
                                    className="btn font-semibold btn-sm btn-error"
                                    onClick={() => handleDelete(donation._id)}
                                >
                                    <FaTrash className="mr-1" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <button
                            className="absolute top-2 right-2 btn btn-sm btn-circle"
                            onClick={closeModal}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Update Donation
                        </h2>

                        <form onSubmit={handleSubmit(handleUpdateSubmit)} className="space-y-4">
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
                                    className="btn btn-ghost btn-soft"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default RestaurantDonations;
