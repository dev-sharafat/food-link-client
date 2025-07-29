import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from './useAxiosSecure';
import loadingGif from '../assets/loadingSpinner.gif';

const useRole = () => {
    const { user, } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = null, isLoading, isPending } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-role/${user.email}`);
            return res.data;
        }
    });

    if (isPending || isLoading) {
        return <>
            <div className='min-h-screen flex justify-center items-center'>
                <img className='w-64' src={loadingGif} alt="" />
            </div>
        </>
    }

    return { data, isPending, isLoading }
};

export default useRole;
