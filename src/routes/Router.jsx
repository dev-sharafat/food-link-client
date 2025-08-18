import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../layout/MainLayout';
import Home from './../pages/Home/Home';
import AllDonations from './../pages/AllDonations/AllDonations';
import DashboardLayout from './../layout/DashboardLayout';
import Login from './../pages/auth/Login/Login';
import Registration from './../pages/auth/Registration/Registration';
import PrivateRoute from "./Private/PrivateRoute";
import RoleBasedRoute from "./Private/RoleBasedRoute";
import ManageDonations from './../dashboard/admin/ManageDonations';
import ManageUsers from './../dashboard/admin/ManageUsers';
import ManageRoleRequests from './../dashboard/admin/ManageRoleRequests';
import ManageRequests from './../dashboard/admin/ManageRequests';
import FeatureDonations from './../dashboard/admin/FeatureDonations';
import RequestCharityRole from './../dashboard/user/RequestCharityRole';
import Favorites from './../dashboard/user/Favorites';
import MyReviews from './../dashboard/user/MyReviews';
import UserTransactionHistory from './../dashboard/user/UserTransactionHistory';
import AddDonation from './../dashboard/restaurant/AddDonation';
import RestaurantDonations from './../dashboard/restaurant/RestaurantDonations';
import RequestedDonations from './../dashboard/restaurant/RequestedDonations';
import CharityTransactionHistory from './../dashboard/cherity/CharityTransactionHistory';
import ReceivedDonations from './../dashboard/cherity/ReceivedDonations';
import MyPickups from './../dashboard/cherity/MyPickups';
import MyRequests from './../dashboard/cherity/MyRequests';
import Profile from "../dashboard/user/Profile";
import DonationDetails from "../pages/AllDonations/DonationDetails";
import DashboardRedirect from "../dashboard/DashboardRedirect";
import Error from "../pages/Error/Error";
import AboutUs from "../components/AboutUs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            },
            {
                path: '/all-donations',
                element: <PrivateRoute><AllDonations /></PrivateRoute>
            },
            {
                path: '/donation/:id',
                element: <PrivateRoute><DonationDetails/></PrivateRoute>
            },
            {
                path:"/about",
                element:<AboutUs/>
            }

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // // Default route – role based redirect
            {
                index: true,
                element: <DashboardRedirect />
            },

            // -------- Admin Routes -------- ///
            {
                path: "admin/profile",
                element: <RoleBasedRoute allowedRoles={['admin']}><Profile/></RoleBasedRoute>
            },
            {
                path: "admin/manage-donations",
                element: <RoleBasedRoute allowedRoles={['admin']}><ManageDonations /></RoleBasedRoute>
            },
            {
                path: "admin/manage-users",
                element: <RoleBasedRoute allowedRoles={['admin']}><ManageUsers /></RoleBasedRoute>
            },
            {
                path: "admin/manage-role-requests",
                element: <RoleBasedRoute allowedRoles={['admin']}><ManageRoleRequests /></RoleBasedRoute>
            },
            {
                path: "admin/manage-requests",
                element: <RoleBasedRoute allowedRoles={['admin']}><ManageRequests /></RoleBasedRoute>
            },
            {
                path: "admin/feature-donations",
                element: <RoleBasedRoute allowedRoles={['admin']}><FeatureDonations /></RoleBasedRoute>
            },

            // -------- User Routes --------
            {
                path: "user/profile",
                element: <RoleBasedRoute allowedRoles={['user']}><Profile/></RoleBasedRoute>
            },
            {
                path: "user/request-charity-role",
                element: <RoleBasedRoute allowedRoles={['user']}><RequestCharityRole /></RoleBasedRoute>
            },
            {
                path: "user/favorites",
                element: <RoleBasedRoute allowedRoles={['user']}><Favorites /></RoleBasedRoute>
            },
            {
                path: "user/my-reviews",
                element: <RoleBasedRoute allowedRoles={['user']}><MyReviews /></RoleBasedRoute>
            },
            {
                path: "user/transaction-history",
                element: <RoleBasedRoute allowedRoles={['user']}><UserTransactionHistory /></RoleBasedRoute>
            },

            // -------- Restaurant Routes --------
            {
                path: "restaurant/add-donation",
                element: <RoleBasedRoute allowedRoles={['restaurant']}><AddDonation /></RoleBasedRoute>
            },
            {
                path: "restaurant/profile",
                element: <RoleBasedRoute allowedRoles={['restaurant']}><Profile/></RoleBasedRoute>
            },
            {
                path: "restaurant/my-donations",
                element: <RoleBasedRoute allowedRoles={['restaurant']}><RestaurantDonations /></RoleBasedRoute>
            },
            {
                path: "restaurant/requested-donations",
                element: <RoleBasedRoute allowedRoles={['restaurant']}><RequestedDonations /></RoleBasedRoute>
            },
            

            // -------- Charity Routes --------
            {
                path: "charity/profile",
                element: <RoleBasedRoute allowedRoles={['charity']}><Profile/></RoleBasedRoute>
            },
            {
                path: "charity/my-requests",
                element: <RoleBasedRoute allowedRoles={['charity']}><MyRequests /></RoleBasedRoute>
            },
            {
                path: "charity/my-pickups",
                element: <RoleBasedRoute allowedRoles={['charity']}><MyPickups /></RoleBasedRoute>
            },
            {
                path: "charity/received-donations",
                element: <RoleBasedRoute allowedRoles={['charity']}><ReceivedDonations /></RoleBasedRoute>
            },
            {
                path: "charity/transaction-history",
                element: <RoleBasedRoute allowedRoles={['charity']}><CharityTransactionHistory /></RoleBasedRoute>
            },
        ]
    }

]);

export default router;