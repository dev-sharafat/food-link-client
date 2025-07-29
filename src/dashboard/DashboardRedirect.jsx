import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const DashboardRedirect = () => {
    const navigate = useNavigate();
    const { data } = useRole();

    useEffect(() => {
        if (!data) return;

        switch (data.role) {
            case "admin":
                navigate("/dashboard/admin/profile", { replace: true });
                break;
            case "user":
                navigate("/dashboard/user/profile", { replace: true });
                break;
            case "restaurant":
                navigate("/dashboard/restaurant/profile", { replace: true });
                break;
            case "charity":
                navigate("/dashboard/charity/profile", { replace: true });
                break;
            default:
                navigate("/", { replace: true });
                break;
        }
    }, [data, navigate]);

    return null;
};

export default DashboardRedirect;
