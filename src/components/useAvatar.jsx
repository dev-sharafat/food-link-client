import {  useState } from "react";
import { Link, NavLink } from "react-router";

import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const UserAvatar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
   const { user, logoutUser , setUser} = useAuth();
  const handleLogOut = () => {
    logoutUser().then((result) => {
      setUser(result);
      localStorage.removeItem("accessToken")
      Swal.fire({
        position: "buttom",
        icon: "success",
        title: "You are successfully login",
        showConfirmButton: false,
        timer: 1500,
      }).catch((error) => {
        Swal.fire(error.message);
      });
    });
  };
  return (
    <div className="relative inline-block text-left group">
      {/* Avatar + Hover Tooltip */}
      <div
        className="avatar avatar-online cursor-pointer "
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <div className="w-10 rounded-full">
          <img
            src={user.photoURL}
            alt=""
            className=""
          />
          {/* Hover Username Tooltip */}
          
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40  shadow-lg border bg-white dark:bg-gray-400 rounded z-20">
          <ul className="py-2">
            
            <li>
              <NavLink
                onClick={handleLogOut}
                className="px-4 w-full  cursor-pointer"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
