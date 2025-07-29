import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axiosSecure from "./axiosSecure";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logoutUser, setLoading } = useAuth();

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        await logoutUser();
        navigate('/login');
        setLoading(false);
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
