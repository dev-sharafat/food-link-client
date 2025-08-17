import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingComp from "../../components/LoadingComp";

const MyReviews = () => {
  const { data } = useRole();
  const userEmail = data?.email;
  const axiosSecure = useAxiosSecure();

  const {
    data: myReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-review", userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-review/${userEmail}`);
      return res.data;
    },
  });
  console.log(myReviews);
  const handleDelete = async (reviewId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/delete-review/${reviewId}`);
      console.log(res.data);
      if (res.data?.result.deletedCount > 0) {
        toast.success("Review deleted successfully");
        refetch();
      }
    }
  };

  if (isLoading) return <LoadingComp />;

  return (
    <div className="min-h-screen  p-6  bg-base-100 dark:bg-gray-900 **:dark:text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

      {myReviews?.length === 0 ? (
        <p className="text-gray-500 text-lg">
          You haven't reviewed any donations yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {myReviews?.map((review) => (
            <div
              key={review._id}
              className="p-4 rounded-lg border border-base-300 bg-base-200 shadow-md flex flex-col sm:flex-row gap-4 dark:bg-gray-600"
            >
              {/* Image */}
              <img
                src={review.image || "https://via.placeholder.com/150"}
                alt={review.title}
                className="w-full sm:w-40 h-40 object-cover rounded-lg"
              />

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">
                        {review.title || "Untitled Donation"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Restaurant:{" "}
                        <span className="font-medium">
                          {review.RestaurantName || "N/A"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Reviewed on:{" "}
                        <span className="font-medium">
                          {new Date(review.createdAt).toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mt-3">
                    <Rating
                      value={review.reviewRating || 0}
                      readOnly
                      style={{ maxWidth: 120 }}
                    />
                    <p className="mt-2 text-sm">
                      {review.comment || "No comment provided."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
