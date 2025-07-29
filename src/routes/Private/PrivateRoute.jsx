import { Navigate, useLocation } from "react-router-dom";
import loadingGif from "../../assets/loadingSpinner.gif";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(user);
    if (loading) {
        return <>
            <div className='min-h-screen flex justify-center items-center'>
                <img className='w-64' src={loadingGif} alt="" />
            </div>
        </>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};
export default PrivateRoute;
