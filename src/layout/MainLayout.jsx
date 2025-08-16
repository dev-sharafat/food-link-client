import { Outlet } from 'react-router-dom';
import Navbar from './../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import loadingGif from '../assets/loadingSpinner.gif';

const MainLayout = () => {

    const { loading} = useAuth()

    if (loading) {
        return <>
        <div className='min-h-screen flex justify-center items-center'>
            <img className='w-64' src={loadingGif} alt="" />
        </div>
        </>
    }
    
    return (
        <div className=' dark:bg-gray-900'>
            <Navbar/>
            <Outlet/>
            <Footer/>
            <Toaster />
        </div>
    );
};

export default MainLayout;