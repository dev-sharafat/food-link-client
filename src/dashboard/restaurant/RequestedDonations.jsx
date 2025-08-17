import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useRole from './../../hooks/useRole';
import LoadingComp from './../../components/LoadingComp';
import toast from 'react-hot-toast';

const RequestedDonations = () => {

    const { data: userData } = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: requestedDonationData = [], isLoading, refetch } = useQuery({
        queryKey: ['donation-requests-restaurant', userData?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests-restaurant/${userData?.email}`)
            return res.data
        }
    })

    const handleAccept = async (id) => {
        try {
            const res = await axiosSecure.patch(`/donation-request-accept/${id}`);
            if (res.data.success) {
                toast.success(res.data.message || "Request Accepted Successfully");
                refetch();
            } else {
                toast.error(res.data.message || "Failed to accept request");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };


    const handleReject = async (id) => {
        try {
            const res = await axiosSecure.patch(`/donation-request-reject/${id}`);
            if (res.data.success) {
                toast.error("Rejected Successfully");
                refetch();
            } else {
                toast.error("Failed to reject");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (isLoading) {
        return <LoadingComp />
    }
    return (
        <div className="p-6 min-h-screen dark:bg-gray-900 **:dark:text-white ">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">Requested Donations</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Donation Title</th>
                            <th>Food Type</th>
                            <th>Charity Name</th>
                            <th>Charity Email</th>
                            <th>Request Description</th>
                            <th>Pickup Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example Row */}
                        {
                            requestedDonationData?.map((data, index) => <tr key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.donationTitle}</td>
                                <td>{data.foodType || "_"}</td>
                                <td>{data.charityName}</td>
                                <td>{data.charityEmail}</td>
                                <td>{data.description}</td>
                                <td>{new Date(data.pickupTime).toLocaleString()}</td>
                                <td><span className={`badge ${data.requestStatus === "Accepted"
                                    ? "badge-success"
                                    : data.requestStatus === "Rejected"
                                        ? "badge-error"
                                        : "badge-warning"
                                    }`}>{data.requestStatus}</span></td>
                                {
                                    data.requestStatus === "Accepted" || data.requestStatus === "Rejected" ?
                                        <td>Action Done</td> :
                                        <td className="flex gap-2 justify-center items-center">
                                            <button onClick={() => handleAccept(data._id)} className="btn btn-xs lg:btn-sm btn-success">Accept</button>
                                            <button onClick={() => handleReject(data._id)} className="btn btn-xs lg:btn-sm btn-error">Reject</button>
                                        </td>
                                }

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >

    );
};

export default RequestedDonations;