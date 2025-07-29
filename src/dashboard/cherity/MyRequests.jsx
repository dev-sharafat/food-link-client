import { MdCancel } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import LoadingComp from "../../components/LoadingComp";
import toast from "react-hot-toast";

const MyRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data } = useRole();
    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['my-requests-donation', data?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-requests-donation/${data?.email}`)
            return res.data
        }
    });

    const handleCancel = async (id) => {
        const res = await axiosSecure.delete(`/my-request-donation/${id}`)
        if (res.data.success) {
            toast.success("Request Canceled");
            refetch()
        } if (res.data.success === false) {
            toast.error(`${res.data.error}`);
            // console.log(res.data);
            refetch()
        }
    }

    if (isLoading) {
        return <LoadingComp />
    }
    return (
        <div>
            <h2 className=" text-3xl text-center my-6 md:my-8 lg:my-10 md:text-4xl font-semibold">My Requests – Track Your Donations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    requests?.map(request => <div key={request._id} className="card bg-base-100 shadow-xl border border-gray-100">
                        <div className="card-body">
                            <h2 className="card-title text-lg font-bold">{request.donationTitle}</h2>
                            <p><span className="font-semibold">Restaurant:</span> {request.restaurantName}</p>
                            <p><span className="font-semibold">Food Type:</span> {request.foodType}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className={`badge badge-sm 
                                    ${request.requestStatus === "Accepted" ? "badge-success" :
                                        request.requestStatus === "Pending" ? "badge-warning" : "badge-error"
                                    }`}>
                                    {request.requestStatus}
                                </span>
                                {
                                    request.requestStatus === "Pending" ? <button onClick={() => handleCancel(request._id)} className="btn btn-error btn-xs text-sm"> <MdCancel /> Cancel</button> : <button disabled className="btn btn-error btn-xs text-sm"> <MdCancel /> Cancel</button>

                                }
                            </div>
                        </div>
                    </div>)
                }

            </div>

        </div>
    );
};

export default MyRequests;