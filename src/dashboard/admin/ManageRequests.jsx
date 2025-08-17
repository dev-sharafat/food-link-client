import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingComp from './../../components/LoadingComp';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: requests= [], isLoading, refetch } = useQuery({
        queryKey: ['donation-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation-requests')
            return res.data
        }
    })

    const handleDelete = async (id) =>{
        const res = await axiosSecure.delete(`/donation-request/${id}`)
        if(res.data.success){
            refetch()
            toast.success("Deleted Successfully")
        }
    }

    if(isLoading) {
        return <LoadingComp/>
    }

    return (
        <div className="p-6 bg-base-100 shadow-md  dark:bg-gray-900 **:dark:text-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6 ">Manage Requests</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Donation Title</th>
                            <th>Charity Name</th>
                            <th>Charity Email</th>
                            <th>Description</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No requests found.
                                </td>
                            </tr>
                        )}
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td>{request.donationTitle}</td>
                                <td>{request.charityName}</td>
                                <td>{request.charityEmail}</td>
                                <td className="max-w-xs">{request.description}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-error btn-sm text-white"
                                        onClick={() => handleDelete(request._id)}
                                    >
                                        <FaTrash/> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRequests;
