import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ManageDonations = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: donations = [] } = useQuery({
        queryKey: ['manage-donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/manage-donations');
            return res.data;
        }
    });

    const updateStatus = async (id, status) => {
        try {
            queryClient.setQueryData(['manage-donations'], (oldDonations = []) =>
                oldDonations.map((item) =>
                    item._id === id ? { ...item, status } : item
                )
            );
            const res = await axiosSecure.patch(`/manage-donation-status/${id}`, { status });

            if (res?.data.success) {
                toast.success(res?.data.message);
            } else {
                toast.error("Donation not found or status not changed");
                queryClient.invalidateQueries(['manage-donations']);
            }
        } catch (error) {
            toast.error(error.message);
            queryClient.invalidateQueries(['manage-donations']);
        }
    };

    return (
        <div className=" px-4 py-8  dark:bg-gray-900 min-h-screen **:dark:text-white">
            <h2 className="lg:text-3xl font-bold mb-6  text-2xl ">Manage Donations</h2>
            <div className="overflow-x-auto p-4 max-w-full">
                <table className="min-w-full border border-gray-300 rounded-md ">
                    <thead className="bg-gray-100 dark:bg-gray-900">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Food Type</th>
                            <th className="p-3 text-left ">Restaurant Name</th>
                            <th className="p-3 text-left ">Restaurant Email</th>
                            <th className="p-3 text-left ">Quantity</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, index) => (
                            <tr key={donation._id} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{donation.title}</td>
                                <td className="p-3 ">{donation.foodType}</td>
                                <td className="p-3 ">{donation.restaurantName}</td>
                                <td className="p-3 ">{donation.restaurantEmail}</td>
                                <td className="p-3 ">{donation.quantity}</td>
                                <td className="p-3">
                                    <span
                                        className={`badge badge-sm ${donation.status === "Verified"
                                            ? "badge-success"
                                            : donation.status === "Rejected"
                                                ? "badge-error"
                                                : "badge-warning"
                                            }`}
                                    >
                                        {donation.status}
                                    </span>
                                </td>
                                <td className="p-3 text-center flex items-center flex-wrap gap-2">
                                    {donation.status === "Pending" ? (
                                        <>
                                            <button
                                                onClick={() => updateStatus(donation._id, "Verified")}
                                                className="btn-primary text-[12px] font-normal"
                                            >
                                                Verify
                                            </button>
                                            <button
                                                onClick={() => updateStatus(donation._id, "Rejected")}
                                                className="btn btn-error bg-red-500 btn-sm font-semibold text-white"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-500 italic">No actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDonations;
