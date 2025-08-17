import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from './../../hooks/useAxiosSecure';
import toast from "react-hot-toast";
import LoadingComp from "../../components/LoadingComp";

const FeatureDonations = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: donations = [], isPending, isLoading } = useQuery({
        queryKey: ['donations/verified',],
        queryFn: async () => {
            const res = await axiosPublic('/donations/verified');
            return res.data;
        }
    });

    const handleFeature = async (id) => {
        const res = await axiosSecure.patch(`/donations-feature/${id}`);
        if (res.data.success) {
            toast.success("Featured Added")
        }
    };


    if (isPending || isLoading) {
        return <LoadingComp />
    }
    return (
        <section className="section-bottom min-h-screen dark:bg-gray-900 **:dark:text-white">
            <h2 className="text-2xl font-bold mb-6 lg:text-3xl pl-4 pt-6 ">Feature Donations</h2>
            <div className="overflow-x-auto w-full ">
                <table className="table w-full">
                    {/* Head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Food Type</th>
                            <th>Restaurant</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Row Example */}
                        {donations?.map((donation) => (
                            <tr key={donation._id}>
                                <td>
                                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                                        <img
                                            src={donation.image || "https://via.placeholder.com/150"}
                                            alt={donation.title}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </td>
                                <td className="font-semibold">{donation.title}</td>
                                <td>{donation.foodType}</td>
                                <td>{donation.restaurantName}</td>
                                <td>
                                    <button onClick={() => handleFeature(donation._id)} className="btn-primary">
                                        Feature
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

    );
};

export default FeatureDonations;