import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Social = () => {
    const { googleLogin, setLoading } = useAuth()
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/"


    const googleLoginBtn = () => {
        googleLogin()
            .then(result => {
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    image: result?.user?.photoURL,
                    role: "user"
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId || res.data.message == "user already exist in db") {
                            setLoading(false)
                        }
                        toast.success("Login Successfully")
                        navigate(`${from}`)
                    })

            })
            .catch(err => {
                toast.error(`${err.message}`)
                setLoading(false)
            })
    }

    return (
        <div className='justify-center items-center flex dark:text-white'>
            <span className='border-l rounded-full pl-2'> Create With</span>
            <div onClick={googleLoginBtn} className='backdrop-blur-4xl text-4xl rounded-full cursor-pointer'>
                <FcGoogle />
            </div>
        </div>
    );
};

export default Social;