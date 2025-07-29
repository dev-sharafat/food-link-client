import { FaCheck, FaTimes } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import LoadingComp from './../../components/LoadingComp';
import toast from "react-hot-toast";


const ManageRoleRequests = () => {
    const axiosSecure = useAxiosSecure()

    const { data: requests = [], isLoading, isPending, refetch } = useQuery({
        queryKey: ['cherity-role-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/cherity-role-requests')
            return res.data
        }
    })



    const handleApprove = async (id, userId) => {
        const res = await axiosSecure.patch(`/cherity-role-request/${id}?action=Approved&userId=${userId}`)
        if(res.data.message === "Approved"){
            refetch()
            toast.success('Request Approved and role assigned.')
        }
    };

    const handleReject = async (id, userId) => {
        const res = await axiosSecure.patch(`/cherity-role-request/${id}?action=Rejected&userId=${userId}`)
        if(res.data.message === "Rejected"){
            refetch()
            toast.error('Request Rejected.')
        }
    };


    if (isLoading || isPending) {
        return <LoadingComp />
    }

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Manage Role Requests</h2>
            <table className="table w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Organization</th>
                        <th className="hidden sm:table-cell">Mission</th>
                        <th>Transaction ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests?.map((req) => (
                        <tr key={req._id}>
                            <td>{req.userName}</td>
                            <td>{req.userEmail}</td>
                            <td>{req.organizationName}</td>
                            <td className="w-full min-w-56 max-w-xs whitespace-normal" title={req.missionStatement}>
                                {req.missionStatement}
                            </td>

                            <td className="break-words max-w-[150px]">{req.transactionId}</td>
                            <td>
                                {req.status === "Pending" && (
                                    <span className="badge badge-warning">{req.status}</span>
                                )}
                                {req.status === "Approved" && (
                                    <span className="badge badge-success">{req.status}</span>
                                )}
                                {req.status === "Rejected" && (
                                    <span className="badge badge-error">{req.status}</span>
                                )}
                            </td>
                            <td className="flex gap-2">
                                {req.status === "Pending" && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(req.transactionId, req.userId)}
                                            className="btn-primary btn-sm flex items-center gap-1"
                                        >
                                            <FaCheck /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(req.transactionId, req.userId)}
                                            className="btn btn-error btn-sm flex items-center gap-1"
                                        >
                                            <FaTimes /> Reject
                                        </button>
                                    </>
                                )}
                                {(req.status === "Approved" || req.status === "Rejected") && (
                                    <span className="italic text-gray-500 badge-success"> Action done</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageRoleRequests;