import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import loadingGif from '../../assets/loadingSpinner.gif';
import useRole from "../../hooks/useRole";
import { useEffect, useState } from "react";

const RoleBasedRoute = ({ allowedRoles, children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [userRole,setUserRole] = useState()
    const {data, isloading, isPending} = useRole()
    console.log(data);
    useEffect(()=>{
        if(!data){
            return 
        }
        else{
            setUserRole(data?.role)
        }
    },[data])
    if (loading || isloading || isPending) {
        return <>
            <div className='min-h-screen flex justify-center items-center'>
                <img className='w-64' src={loadingGif} alt="" />
            </div>
        </>
    }
    if(!userRole){
        return
    }
    console.log(userRole);
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children ? children : <Outlet />;
};

export default RoleBasedRoute;