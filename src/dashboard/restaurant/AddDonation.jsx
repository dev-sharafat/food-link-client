import { useForm } from "react-hook-form";
import useRole from "./../../hooks/useRole";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const AddDonation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { data } = useRole();
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { name, email, _id: id } = data || {};

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = "";
      const imageFile = data.image?.[0];
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );
        imageUrl = res.data?.data?.url || "";
      }

      const donationInfo = {
        ...data,
        status: "Pending",
        restaurantName: name,
        restaurantEmail: email,
        userId: id,
        image: imageUrl,
        donationStatus: "Available",
      };

      const res = await axiosSecure.post("/add-donation", donationInfo);
      if (res.data.message === "Success") {
        toast.success("Donation added successfully!");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add donation!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="   bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Donation</h2>
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Donation Title */}
    <div>
      <label className="label font-semibold">Donation Title</label>
      <input
        className="input input-bordered w-full"
        {...register("title", { required: "Donation title is required" })}
        placeholder="e.g., Surplus Pastries"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
    </div>

    {/* Food Type */}
    <div>
      <label className="label font-semibold">Food Type</label>
      <input
        className="input input-bordered w-full"
        {...register("foodType", { required: "Food type is required" })}
        placeholder="e.g., Bakery, Produce"
      />
      {errors.foodType && <p className="text-red-500">{errors.foodType.message}</p>}
    </div>

    {/* Quantity */}
    <div>
      <label className="label font-semibold">Quantity (kg or portions)</label>
      <input
        type="number"
        className="input input-bordered w-full"
        {...register("quantity", {
          required: "Quantity is required",
          min: { value: 1, message: "Minimum 1 is required" }
        })}
        placeholder="e.g., 5"
      />
      {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
    </div>

    {/* Pickup Time */}
    <div>
      <label className="label font-semibold">Pickup Time Window</label>
      <input
        type="text"
        className="input input-bordered w-full"
        {...register("pickupTime", { required: "Pickup time is required" })}
        placeholder="e.g., 4 PM - 6 PM"
      />
      {errors.pickupTime && <p className="text-red-500">{errors.pickupTime.message}</p>}
    </div>

    {/* Location */}
    <div className="md:col-span-2">
      <label className="label font-semibold">Location</label>
      <input
        className="input input-bordered w-full"
        {...register("location", { required: "Location is required" })}
        placeholder="e.g., 123 Main Street, City"
      />
      {errors.location && <p className="text-red-500">{errors.location.message}</p>}
    </div>

    {/* Image Upload */}
    <div className="md:col-span-2">
      <label className="label font-semibold">Image Upload</label>
      <input
        type="file"
        className="file-input file-input-bordered w-full"
        {...register("image", { required: "Image is required" })}
      />
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}
    </div>
  </div>

  <div>
    <button disabled={loading} className="btn btn-primary w-full">
      {loading ? "Submitting..." : "Add Donation"}
    </button>
  </div>
</form>

    </div>
  );
};

export default AddDonation;
