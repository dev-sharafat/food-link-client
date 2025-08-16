import { FaHome } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { Link, Outlet, NavLink } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import useRole from './../hooks/useRole';


const DashboardLayout = () => {

    const { data } = useRole()


    const sidebarItems = {
        admin: [
            { name: "Admin Profile", path: "/dashboard/admin/profile" },
            { name: "Manage Donations", path: "/dashboard/admin/manage-donations" },
            { name: "Manage Users", path: "/dashboard/admin/manage-users" },
            { name: "Manage Role Requests", path: "/dashboard/admin/manage-role-requests" },
            { name: "Manage Requests", path: "/dashboard/admin/manage-requests" },
            { name: "Feature Donations", path: "/dashboard/admin/feature-donations" },
        ],
        user: [
            { name: "My Profile", path: "/dashboard/user/profile" },
            { name: "Request Charity Role", path: "/dashboard/user/request-charity-role" },
            { name: "Favorites", path: "/dashboard/user/favorites" },
            { name: "My Reviews", path: "/dashboard/user/my-reviews" },
            { name: "Transaction History", path: "/dashboard/user/transaction-history" },
        ],
        restaurant: [
            { name: "Restaurant Profile", path: "/dashboard/restaurant/profile" },
            { name: "Add Donation", path: "/dashboard/restaurant/add-donation" },
            { name: "My Donations", path: "/dashboard/restaurant/my-donations" },
            { name: "Requested Donations", path: "/dashboard/restaurant/requested-donations" },
        ],
        charity: [
            { name: "Charity Profile", path: "/dashboard/charity/profile" },
            { name: "My Requests", path: "/dashboard/charity/my-requests" },
            { name: "My Pickups", path: "/dashboard/charity/my-pickups" },
            { name: "Received Donations", path: "/dashboard/charity/received-donations" },
            { name: "Transaction History", path: "/dashboard/charity/transaction-history" },
        ],
    };

    const role = data?.role;
    const items = sidebarItems[role] || [];




    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn text-lg  flex justify-start drawer-button lg:hidden">
                    <IoMdMenu /> Open Menu

                </label>

                {/* Main content here */}
                <div className="min-h-screen bg-base-200 p-4">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full flex justify-between bg-base-300 text-base-content">
                    {/* Sidebar content here */}
                    <div>
                        {
                            items.map(item => (
                                <li className="mt-2" key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            isActive ? "btn-primary" : "btn btn-ghost flex justify-start"
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </div>

                    <li><Link to="/" className="flex items-center btn-secondary mb-8">Back Home <FaHome /></Link></li>
                </ul>

            </div>
            <Toaster />
        </div>

    );
};

export default DashboardLayout;