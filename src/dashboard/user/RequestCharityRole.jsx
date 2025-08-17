import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./StripeCheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);
import { Elements } from "@stripe/react-stripe-js";

const RequestCharityRole = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 **:dark:text-white">
      <div className="max-w-2xl mx-auto pt-10 p-6  rounded-xl shadow-md ">
        <h2 className="lg:text-4xl text-2xl font-semibold text-center text-gray-800 mb-6">
          Request Charity Role
        </h2>
        {/* Stripe wrapper */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default RequestCharityRole;
