import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import Social from '../Social/Social';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { loginUser, setLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()
    const prevLocation = location?.state?.from?.pathname;
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;

        loginUser(email, password)
            .then((loggedInUser) => {
                const userInfo = {
                    name: loggedInUser?.name || user?.name || "No Name",
                    email: loggedInUser?.email || user?.email || email,
                    image: loggedInUser?.image || user?.image || "",
                    role: "user"
                };

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success('Login Successfully');
                            navigate(prevLocation || "/");   
                            reset();
                        } else {
                            navigate(prevLocation || "/");
                            toast.success('Login Successfully')
                        }
                    })
                    .catch(() => {
                        toast.error("Server error while creating account");
                    });
            })
            .catch(() => {
                toast.error("Invalid email or password");
                setLoading(false);
            });
    };

    return (
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">

            {/* Form Card */}
            <div className="relative z-10 w-full max-w-sm backdrop-blur-sm bg-opacity-60 shadow-2xl rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email */}
                    <div>
                        <label className="label">Email</label>
                        <input
                            className="input input-bordered w-full"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Invalid email format"
                                }
                            })}
                            placeholder='Email'
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label ">Password</label>
                        <input
                            className="input input-bordered w-full"
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                    message: "Password must include at least 1 lowercase and 1 uppercase letter"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    </div>
                    <input className="btn btn-neutral w-full" type="submit" value="Login" />

                    <p className='text-center'>or</p>
                    <Social />

                    <p className="text-end pb-6 pr-10">Don&apos;t have Account? <Link to="/register" className="font-bold underline">Create Account</Link> </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
