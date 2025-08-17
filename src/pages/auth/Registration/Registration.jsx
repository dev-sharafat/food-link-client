import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import axios from "axios";
import useAuth from './../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import Social from '../Social/Social';



const Registration = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const { registerUser, updateUserProfile } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const location = useLocation();
    const from  = location?.state?.from?.pathname || "/";

    

    // use react hook form 
    const onSubmit = async (data) => {
        try {
            let imageUrl = "";
            const imageFile = data.photo?.[0];
            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                    formData
                );
                imageUrl = res.data?.data?.url;
            }

            const name = data.name;
            const email = data.email;
            const password = data.password;
            const image = imageUrl || null;

            // Register user in Firebase
            registerUser(email, password)
                .then(() => {
                    // Update profile
                    updateUserProfile(name, image)
                        .then(() => {
                            // Save user informaiton in database
                            const userInfo = {
                                name,
                                email,
                                image,
                                role: "user"
                            };
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        toast.success('Account Created Successfully');
                                        navigate(from || "/");
                                        reset();
                                    }
                                });
                        });
                })
                .catch(error => {
                    console.error("Registration error:", error);
                    toast.error("Registration failed! Try again 😢");
                });

        } catch (err) {
            console.error("Error uploading image:", err);
            toast.error("Image upload failed");
        }
    };


    return (
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden ">


            {/* Form Card */}
            <div className="relative z-10 w-full max-w-sm backdrop-blur-sm bg-opacity-60 dark:bg-gray-600 dark:text-white shadow-2xl rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4 ">Create Account</h2>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* Name */}
                    <div>
                        <label className="label ">Name</label>
                        <input className="input input-bordered w-full dark:text-black" {...register("name", { required: "Name is required" })} placeholder='Name' />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label  ">Email</label>
                        <input
                            className="input input-bordered w-full dark:text-black"
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
                        <label className="label  ">Password</label>
                        <input
                            className="input input-bordered w-full dark:text-black"
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

                    {/* Image */}
                    <div>
                        <label className="label  ">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full dark:text-black"
                            {...register("photo", { required: "Image is required" })}
                        />
                    </div>


                    <input className="btn btn-neutral w-full" type="submit" value="Create" />
                    <Social/>
                    <p className="text-end pb-6 pr-10">Don&apos;t have Account? <Link to="/login" className="font-bold underline">Login</Link> </p>
                </form>
            </div>
        </div>
    );
};

export default Registration;