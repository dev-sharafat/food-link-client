import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../Title";
import { FaHandsHelping } from "react-icons/fa";

const CherityRequest = () => {

    const axiosPublic = useAxiosPublic();
    const { data: charityRequests = [], } = useQuery({
        queryKey: ['charity-requests-latest',],
        queryFn: async () => {
            const res = await axiosPublic('/charity-requests-latest');
            return res.data;
        }
    })
    console.log(charityRequests);

    return (
        <section className="section-bottom section-top">
            <Title title={"New Charity Requests →"}></Title>
            <div className="grid gap-6 md:grid-cols-3 my-6">
                {charityRequests?.slice(0, 3).map((request) => (
                    <div
                        key={request._id}
                        className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
                    >
                        <figure className="px-6 pt-6">
                            {request.image ? (
                                <img
                                    src={request.image}
                                    alt={`${request.CharityName} logo`}
                                    className="w-24 h-24 rounded-full object-cover mx-auto"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                                    <FaHandsHelping className="text-4xl text-white" />
                                </div>
                            )}
                        </figure>

                        <div className="card-body items-center text-center">
                            <h3 className="card-title text-xl font-semibold">
                                {request.organizationName}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3 px-2">
                                {request.missionStatement?.length > 100
                                    ? request.missionStatement.slice(0, 100) + "..."
                                    : request.missionStatement}
                            </p>
                            <p className="font-semibold mt-2">
                                Status:{" "}
                                <span
                                    className={`${request.status === "Approved"
                                        ? "text-green-500"
                                        : "text-yellow-500"
                                        }`}
                                >
                                    {request.status}
                                </span>
                            </p>
                            <p className="text-xs text-gray-400">
                                Created: {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CherityRequest;
