import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import LoadingComp from "../../components/LoadingComp";
import toast from "react-hot-toast";

const MyPickups = () => {

    const { data: userData } = useRole();
    const axiosSecure = useAxiosSecure();
    const { data: pickups = [], isLoading, refetch } = useQuery({
        queryKey: ['my-request-pickups', userData?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-request-pickups/${userData?.email}`)
            return res.data
        }
    })

    const handlePickup = async (id) => {
        const res = await axiosSecure.patch(`/pickup-status/${id}`)
        if (res.data.success) {
            toast.success("Picked Up");
            refetch()
        } else {
            toast.error("Something went wrong! ")
        }
    }

    if (isLoading) {
        return <LoadingComp />
    }
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">My Pickups</h2>
            {
                pickups.length !== 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {
                        pickups?.map(pickup => <div key={pickup._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{pickup.donationTitle}</h2>
                                <p><span className="font-semibold">Restaurant:</span>{pickup.restaurantName}</p>
                                <p><span className="font-semibold">Location:</span>{pickup.location}</p>
                                <p><span className="font-semibold">Food Type:</span>{pickup.foodType}</p>
                                <p><span className="font-semibold">Quantity:</span>{pickup.quantity}</p>
                                <p><span className="font-semibold">Pickup Time:</span> {new Date(pickup.pickupTime).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Status: </span>{pickup.pickedUpStatus || "Assigned"}  </p>
                                <div className="card-actions justify-end">
                                    {
                                        pickup?.pickedUpStatus === "Picked Up" ? <button disabled className="btn btn-success btn-sm"> Picked Up</button> : <button onClick={() => handlePickup(pickup._id)} className="btn-primary text-sm">Confirm Pickup</button>
                                    }
                                </div>
                            </div>
                        </div>)
                    }
                </div> : <h2 className=" text-xl ml-4">
                    No Pick Up History
                </h2>
                }

        </div>
    );
};

export default MyPickups;