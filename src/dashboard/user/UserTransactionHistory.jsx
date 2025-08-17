import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingComp from "../../components/LoadingComp";

const UserTransactionHistory = () => {

    const { data } = useRole();
    const id = data?._id;
    const axiosSecure = useAxiosSecure()


    const { data: transactions = [], isLoading, isPending } = useQuery({
        queryKey: ['transaction', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/transaction/${id}`)
            return res.data
        }
    })

    if (isLoading || isPending) {
        return <LoadingComp />
    }

    const statusIcon = (status) => {
        switch (status) {
            case "Approved":
                return <FaCheckCircle className="text-green-500 text-lg" />;
            case "Rejected":
                return <FaTimesCircle className="text-red-500 text-lg" />;
            default:
                return <FaClock className="text-yellow-500 text-lg" />;
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold  lg:text-3xl my-6">Transaction History</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full ">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Amount ($)</th>
                            <th>Request Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.map((transaction, index) => (
                            <tr key={transaction.transactionId}>
                                <td>{index + 1}</td>
                                <td className="font-mono">{transaction.transactionId}</td>
                                <td>${transaction.amount}</td>
                                <td>
                                    {new Date(transaction.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                </td>
                                <td className="flex items-center gap-2">
                                    {statusIcon(transaction.status)}
                                    <span>{transaction.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserTransactionHistory;