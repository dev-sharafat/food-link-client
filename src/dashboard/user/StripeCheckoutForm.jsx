import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import useRole from './../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';
import LoadingComp from './../../components/LoadingComp';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [organization, setOrganization] = useState('');
    const [reason, setReason] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false)

    const axiosSecure = useAxiosSecure();
    const price = 25;
    const { data } = useRole();
    const user_id = data?._id;
    const userEmail = data?.email;
    const userName = data?.name;
    const image = data?.image

    // 1. Create payment intent from server
    // Payment intent 
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(err => console.error(err));
    }, [axiosSecure, price]);

    const { data: charityStatus = null, isLoading, refetch } = useQuery({
        queryKey: ['charity-request-status', user_id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/charity-request-status/${user_id}`);
            return res.data;
        },
        enabled: !!user_id
    });


    if (isLoading) {
        return <LoadingComp />
    }


    // 2. Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!organization || !reason) {
            toast.error('Please fill out all fields.');
            return;
        }

        if (!stripe || !elements) return;

        setLoading(true);

        const card = elements.getElement(CardElement);
        if (!card) return;

        // 3. Create payment method
        const { error: pmError } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (pmError) {
            toast.error(pmError.message);
            setLoading(false);
            return;
        }

        // 4. Confirm card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: organization,
                    email: data?.email || 'anonymous',
                },
            },
        });


        if (confirmError) {
            toast.error(confirmError.message);
            setLoading(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            const CharityInfo = {
                userId: user_id,
                userName: userName,
                userEmail: userEmail,
                image: image,
                organizationName: organization,
                missionStatement: reason,
                transactionId: paymentIntent?.id,
                status: 'Pending',
                createdAt: new Date()
            };
            const transactionInfo = {
                userId: user_id,
                transactionId: paymentIntent?.id,
                amount: 25,
                createdAt: new Date(),
                status: 'Pending'
            };

            try {
                // Charity Role Request  sendc in database
                await axiosSecure.post('/cherity-role-request', CharityInfo);
                // Transaction Data save in database
                await axiosSecure.post('/transactions', transactionInfo);
                refetch()
                toast.success('Payment successful & role request submitted!');
                setOrganization('');
                setReason('');
                setDisable(true);
            } catch (error) {
                toast.error('Something went wrong while submitting your request.');
                console.error(error);
            }
        }



        setLoading(false);
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/*  Organization Name */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">Organization Name</label>
                <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Enter your organization name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 text-gray-800"
                />
            </div>

            {/*  Reason */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">Why do you want the charity role?</label>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Write your mission or reason..."
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                />
            </div>

            {/* Stripe Card Input */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-white">Card Information</label>
                <div className="p-3 rounded-md border dark:bg-gray-600 dark:text-white">
                    <CardElement className='dark:text-white' />
                </div>
            </div>

            {/* Submit Button */}
            {
                !charityStatus || charityStatus.status === 'Rejected' ? (
                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret || loading || disable}
                        className="btn btn-success w-full"
                    >
                        {loading ? 'Processing...' : 'Pay $25 & Request Role'}
                    </button>
                ) : (
                    <button
                        disabled
                        className="btn btn-success w-full"
                    >
                        {charityStatus.status}
                    </button>
                )
            }


        </form>
    );
};

export default CheckoutForm;
