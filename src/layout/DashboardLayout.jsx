import {
  FaHome,
  FaUser,
  FaUsers,
  FaHandHoldingHeart,
  FaGift,
  FaListAlt,
  FaClipboardList,
  FaWallet,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import {
  MdRequestPage,
  MdReviews,
  MdAddShoppingCart,
  MdLocalDining,
} from "react-icons/md";
import { Link, Outlet, NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useRole from "./../hooks/useRole";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const { data } = useRole();

  const sidebarItems = {
    admin: [
      {
        name: "Admin Profile",
        path: "/dashboard/admin/profile",
        icon: <FaUser />,
      },
      {
        name: "Manage Donations",
        path: "/dashboard/admin/manage-donations",
        icon: <FaGift />,
      },
      {
        name: "Manage Users",
        path: "/dashboard/admin/manage-users",
        icon: <FaUsers />,
      },
      {
        name: "Manage Role Requests",
        path: "/dashboard/admin/manage-role-requests",
        icon: <FaHandHoldingHeart />,
      },
      {
        name: "Manage Requests",
        path: "/dashboard/admin/manage-requests",
        icon: <MdRequestPage />,
      },
      {
        name: "Feature Donations",
        path: "/dashboard/admin/feature-donations",
        icon: <FaListAlt />,
      },
    ],
    user: [
      { name: "My Profile", path: "/dashboard/user/profile", icon: <FaUser /> },
      {
        name: "Request Charity Role",
        path: "/dashboard/user/request-charity-role",
        icon: <FaHandHoldingHeart />,
      },
      {
        name: "Favorites",
        path: "/dashboard/user/favorites",
        icon: <FaGift />,
      },
      {
        name: "My Reviews",
        path: "/dashboard/user/my-reviews",
        icon: <MdReviews />,
      },
      {
        name: "Transaction History",
        path: "/dashboard/user/transaction-history",
        icon: <FaWallet />,
      },
    ],
    restaurant: [
      {
        name: "Restaurant Profile",
        path: "/dashboard/restaurant/profile",
        icon: <FaUser />,
      },
      {
        name: "Add Donation",
        path: "/dashboard/restaurant/add-donation",
        icon: <MdAddShoppingCart />,
      },
      {
        name: "My Donations",
        path: "/dashboard/restaurant/my-donations",
        icon: <FaGift />,
      },
      {
        name: "Requested Donations",
        path: "/dashboard/restaurant/requested-donations",
        icon: <MdLocalDining />,
      },
    ],
    charity: [
      {
        name: "Charity Profile",
        path: "/dashboard/charity/profile",
        icon: <FaUser />,
      },
      {
        name: "My Requests",
        path: "/dashboard/charity/my-requests",
        icon: <MdRequestPage />,
      },
      {
        name: "My Pickups",
        path: "/dashboard/charity/my-pickups",
        icon: <MdLocalDining />,
      },
      {
        name: "Received Donations",
        path: "/dashboard/charity/received-donations",
        icon: <FaGift />,
      },
      {
        name: "Transaction History",
        path: "/dashboard/charity/transaction-history",
        icon: <FaWallet />,
      },
    ],
  };

  const role = data?.role;
  const items = sidebarItems[role] || [];

  // ------------------

  const [currentToggole, setCurrentToggole] = useState(false);

  useEffect(() => {
    const toggle = localStorage.getItem("toogle");
    setCurrentToggole(toggle === "true");
    document
      .querySelector("html")
      .setAttribute("data-theme", toggle === "true" ? "dark" : "light");
  }, []);

  const handleThemeChange = () => {
    const newToggle = !currentToggole;
    setCurrentToggole(newToggle);
    localStorage.setItem("toogle", newToggle);
    document
      .querySelector("html")
      .setAttribute("data-theme", newToggle ? "dark" : "light");
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn text-lg flex justify-start drawer-button lg:hidden"
        >
          <IoMdMenu /> Open Menu
        </label>

        {/* Main content here */}
        <div className="min-h-screen bg-base-200 ">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu  w-80 min-h-full dark:border-r-1 dark:border-gray-600 flex flex-col justify-between bg-base-300 dark:bg-gray-900 text-base-content">
          <div>
            <li>
              <button
                onClick={handleThemeChange}
                className="btn btn-ghost btn-circle dark:bg-white text-xl"
              >
                {currentToggole ? <FaMoon /> : <FaSun />}
              </button>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "btn-primary flex items-center gap-2 dark:text-white"
                    : "btn btn-ghost flex justify-start items-center gap-2 dark:text-white dark:hover:text-black"
                }
              >
                <FaHome />
                <span >
                  <h1 className="">FoodLink</h1> <img />{" "}
                </span>
              </NavLink>
            </li>
            {items.map((item) => (
              <li className=" dark:text-white " key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "btn-primary dark:text-white flex items-center gap-2"
                      : "btn btn-ghost flex justify-start items-center gap-2"
                  }
                >
                  {item.icon} {item.name}
                </NavLink>
              </li>
            ))}
          </div>

          <li>
            <Link
              to="/"
              className="flex items-center  btn-secondary mb-8 gap-2"
            >
              Back Home
            </Link>
          </li>
        </ul>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
