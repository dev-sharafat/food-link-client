import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCrown, FaEdit, FaUserShield } from "react-icons/fa";
import useRole from './../../hooks/useRole';

const Profile = () => {
    const { data } = useRole()

    return (
        <section className="dark:bg-gray-900 min-h-screen **:dark:text-white">
            {/* Header */}
            <div className="mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Profile</h1>
                    <button className="btn btn-outline btn-primary gap-2">
                        <FaEdit /> Edit Profile
                    </button>
                </div>

                {/* Profile Card */}
                <div className="card lg:card-side bg-base-100 dark:bg-gray-600 shadow-xl  p-6 transition-all">
                    <div className="avatar flex justify-center lg:justify-start">
                        <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                                src={data?.image}
                                alt={data?.name}
                            />
                        </div>
                    </div>

                    <div className="card-body">
                        <h2 className="card-title lg:text-2xl flex items-center gap-2">
                            <FaUser /> {data?.name || "Unknown User"}
                        </h2>

                        <p className="flex items-center gap-2 text-sm lg:text-xl text-gray-500">
                            <FaEnvelope /> {data?.email || "No Email Provided"}
                        </p>


                        {data?.role && data?.role !== "user" && (
                            <p className="flex items-center gap-2 text-lg font-semibold text-gray-500">
                                <FaCrown /> {data?.role}
                            </p>
                        )}
                        {data?.role && data?.role !== "admin" && (
                            <p className="flex items-center gap-2 text-lg font-semibold text-gray-500">
                                <FaUserShield />  {data?.role}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;