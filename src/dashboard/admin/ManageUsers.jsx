import { FaUserShield, FaUtensils, FaHandHoldingHeart, FaTrash } from "react-icons/fa";
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import LoadingComp from "../../components/LoadingComp";




const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })



    const handleSetRole = async (id, role) => {
        const res = await axiosSecure.patch(`/set-role/${id}`, { role }); 
        if (res?.data.message === 'update') {
            refetch();
        }
    };

    const handleDelete = async (id) => {
        const res = await axiosSecure.delete(`/delete-user/${id}`)
        if(res?.data.message === "delete"){
            refetch()
        }
    }


    if (isLoading || isPending) {
        return <LoadingComp />
    }

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <table className="table w-full border border-gray-300">
                <thead className="bg-base-200">
                    <tr>
                        <th>Image</th>
                        <th>Name & Email</th>
                        <th>Role</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-circle w-12 h-12">
                                        <img src={user.image} alt={user.name} />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className="font-semibold">{user.name}</div>
                                    <div className="text-sm opacity-70">{user.email}</div>
                                </div>
                            </td>
                            <td>
                                <span
                                    className={`badge badge-sm ${user.role === "admin"
                                        ? "badge-success"
                                        : user.role === "restaurant"
                                            ? "badge-warning"
                                            : user.role === "charity"
                                                ? "badge-accent"
                                                : "badge-secondary"
                                        }`}
                                >
                                    {user.role}
                                </span>
                            </td>
                            <td className="flex flex-wrap gap-2 justify-center">
                                <button
                                    onClick={() => handleSetRole(user._id, "admin")}
                                    className="btn btn-sm btn-success"
                                    disabled={user.role !== "user"}
                                >
                                    <FaUserShield /> Admin
                                </button>

                                <button
                                    onClick={() => handleSetRole(user._id, "restaurant")}
                                    className="btn btn-sm btn-warning"
                                    disabled={user.role !== "user"}
                                >
                                    <FaUtensils /> Restaurant
                                </button>

                                <button
                                    onClick={() => handleSetRole(user._id, "charity")}
                                    className="btn btn-sm btn-accent"
                                    disabled={user.role !== "user"}
                                >
                                    <FaHandHoldingHeart /> Charity
                                </button>

                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="btn btn-sm btn-error"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </td>



                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
