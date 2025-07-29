import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/web-logo.webp';
import useAuth from '../hooks/useAuth';

const Navbar = () => {

    const { user, logoutUser } = useAuth()

    const navLinks = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "text-green-600 font-semibold " : "text-gray-700"
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/all-donations"
                className={({ isActive }) =>
                    isActive ? "text-green-600 font-semibold " : "text-gray-700"
                }
            >
                All Donation
            </NavLink>
        </li>
        <li>
            <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                    isActive ? "text-green-600 font-semibold " : "text-gray-700"
                }
            >
                Dashboard
            </NavLink>
        </li>

    </>

    return (
        <section className='sticky top-0 bg-base-100 z-50'>
            <div className="navbar px-4 container-box">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="font-semibold cursor-pointer text-lg flex items-center gap-1 border border-gray-100 p-1 rounded">
                        FoodLink
                        <img src={logo} className='w-full max-w-8' alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-4 px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="flex justify-center items-center gap-3">
                            <div className="w-10 h-10">
                                <img
                                    className="w-full h-full rounded-full object-cover"
                                    src={user?.photoURL}
                                    alt="User Profile"
                                />
                            </div>
                            <button onClick={logoutUser} className="btn-primary">
                                Logout
                            </button>
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