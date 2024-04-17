// PaymentForm.js
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
const stripePromise = loadStripe(
  "pk_live_51Ofz4pJKrp7ymIs288jzCaySPlhiAYjB00SGaNzJE7Uo534yJQzIxSmqN0sm6o7u328iQdJG9oZZUXF7PLHdiH7p00a01WvIRZ"
);

console.log("🚀 ~ stripePromise:", stripePromise);
const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
