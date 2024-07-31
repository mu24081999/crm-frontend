// PaymentForm.js
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
const stripePromise =
  process.env.REACT_APP_STRIPE_PUBLISH_KEY_SANDBOX &&
  loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISH_KEY_SANDBOX
    // "pk_live_51Ofz4pJKrp7ymIs288jzCaySPlhiAYjB00SGaNzJE7Uo534yJQzIxSmqN0sm6o7u328iQdJG9oZZUXF7PLHdiH7p00a01WvIRZ"
    // "pk_test_51Ofz4pJKrp7ymIs26k0TGRkIE52sj88vLb6Bs0jVUdy0qp5gljvciDjPbOCxqMzTvCiQ7Hz3Q3feMxD2zdudVvsF00aU6KGlR9"
  );
console.log("🚀 ~ stripePromise:", stripePromise);

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
