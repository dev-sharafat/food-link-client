import { FaHome } from 'react-icons/fa';
import error from '../../assets/404.gif';
import { Link } from 'react-router-dom';

const Error = () => {

    return (
        <div className='flex justify-center items-center min-h-screen '>
            <div>
                <img className='w-full max-w-2xl' src={error} alt="" />
                <Link to={"/"} className='btn-secondary flex justify-center items-center gap-2 w-full max-w-24'>Home <FaHome/></Link>
            </div>
        </div>
    );
};

export default Error;