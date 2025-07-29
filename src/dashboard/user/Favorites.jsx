
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import useRole from './../../hooks/useRole';
import LoadingComp from './../../components/LoadingComp';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Favorites = () => {

    const axiosSecure = useAxiosSecure();
    const { data: userData } = useRole();
    const email = userData?.email;
    const { data: favorites = [], isLoading, refetch } = useQuery({
        queryKey: ["favourites", email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favourites/${email}`)
            return res.data
        }
    })

    const handleDelete = async (id) => {
        const res = await axiosSecure.delete(`/favourite-delete/${id}`)
        if(res.data.success){
            refetch()
            toast.success("Removed Successfully")
        }
    }

    if (isLoading) {
        return <LoadingComp />
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites?.map((item) => (
                    <div key={item._id} className="card bg-base-100 shadow-xl">
                        <figure className="h-40">
                            <img src={item.image} alt={item.donationTitle} className="w-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.donationTitle}</h2>
                            <p><span className="font-semibold">Restaurant:</span> {item.RestaurantName}</p>
                            <p><span className="font-semibold">Location:</span> {item.location}</p>
                            <p><span className="font-semibold">Status:</span> {item.DonationStatus}</p>
                            <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                            <div className="card-actions justify-between mt-4">
                                <Link to={`/donation/${item.donationId}`} className="btn-primary text-sm">Details</Link>
                                <button onClick={() => handleDelete(item._id)} className="btn btn-error btn-sm text-white font-semibold">Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;