// PaymentForm.js
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
const stripePromise =
  process.env.REACT_APP_STRIPE_PUBLISH_KEY_SANDBOX &&
  loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY_SANDBOX);

const Payment = ({ route, afterPayment, description }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm
      path={route}
      afterPayment={afterPayment}
      description={description}
    />
  </Elements>
);

export default Payment;
