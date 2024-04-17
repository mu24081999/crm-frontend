import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { paymentIntent } from "../../redux/services/payment";
const PaymentForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { paymentIntent: intent } = useSelector((state) => state.payment);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      paymentIntent(token, {
        currency: "usd",
        amount: 5000,
      })
    );

    // Confirm the payment on the client side
    const result = await stripe.confirmCardPayment(intent?.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log("🚀 ~ handleSubmit ~ result:", result);

    if (result.error) {
      // Handle error
      console.error(result.error.message);
    } else {
      // Handle success
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};
export default PaymentForm;
