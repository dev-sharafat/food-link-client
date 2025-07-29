
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './StripeCheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK); 
import { Elements } from '@stripe/react-stripe-js';

const RequestCharityRole = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-xl shadow-md ">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Request Charity Role
      </h2>
      {/* Stripe wrapper */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default RequestCharityRole;
