import { Link, NavLink } from "react-router-dom";
import logo from "../assets/web-logo.webp";
import useAuth from "../hooks/useAuth";
import { FaHome, FaHandsHelping, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserAvatar from "./useAvatar";
import { MdDashboardCustomize } from "react-icons/md";

const Navbar = () => {
  const { user } = useAuth();
  const [currentToggole, setCurrentToggole] = useState(false);

  useEffect(() => {
    const toggle = localStorage.getItem("toogle");
    setCurrentToggole(toggle === "true");
    document
      .querySelector("html")
      .setAttribute("data-theme", currentToggole ? "dark" : "light");
  }, [currentToggole]);

  // handle theme change

  const handleThemeChange = () => {
    const newToggle = !currentToggole;
    setCurrentToggole(newToggle);
    localStorage.setItem("toogle", newToggle);
  };
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive
                ? "bg-primary text-white font-semibold"
                : "text-gray-700 hover:text-primary dark:text-gray-200"
            }`
          }
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-donations"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive
                ? "bg-primary text-white font-semibold"
                : "text-gray-700 hover:text-primary dark:text-gray-200"
            }`
          }
        >
          <FaHandsHelping /> All Donations
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive
                ? "bg-primary text-white font-semibold"
                : "text-gray-700 hover:text-primary dark:text-gray-200"
            }`
          }
        >
          <MdDashboardCustomize/> Dashboard
        </NavLink>
      </li>
      
    </>
  );

  return (
    <section className="sticky top-0 bg-base-100 dark:bg-gray-500 dark:text-white z-50 ">
      <div className="navbar  container lg:mx-auto  lg:px-0">
        <div className="navbar-start">
          <div className="dropdown dark:text-white">
            <div tabIndex={0} role="button" className=" lg:hidden ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content dark:bg-gray-300  dark:text-white text-black rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to="/"
            className="font-bold cursor-pointer text-lg flex gap-2 items-center pl-1 rounded"
          >
            FoodLink
            <img src={logo} className="w-full max-w-8" alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex dark:text-white">
          <ul className="flex gap-4 px-1 dark:text-white ">{navLinks}</ul>
        </div>
        <div className="navbar-end ">
          <label className="swap swap-rotate pr-4">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleThemeChange}
              checked={currentToggole}
              className="theme-controller"
            />

            {/* sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          {user ? (
            <div className="flex justify-center items-center gap-3">
              <UserAvatar></UserAvatar>
            </div>
          ) : (
            <Link to="/login" className="btn-primary ">
              Login
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
