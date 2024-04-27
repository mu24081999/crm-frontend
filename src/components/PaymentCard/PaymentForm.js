import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { paymentIntent } from "../../redux/services/payment";
const PaymentForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { paymentIntent: intent, isLoading } = useSelector(
    (state) => state.payment
  );
  const stripe = useStripe();
  const elements = useElements();
  const amount_value = document.getElementById("buy_number");

  //   console.log(
  //     "Oyeeee",
  //     document.getElementById("buy_number").getAttribute("data-amount")
  //   );
  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      paymentIntent(token, {
        currency: "usd",
        // amount: 5000,
        amount: amount_value ? amount_value.getAttribute("data-amount") : "",
      })
    );

    console.log(
      "🚀 ~ handleSubmit ~ intent?.client_secret:",
      intent?.client_secret,
      isLoading
    );
    const clientSecret = intent?.client_secret;
    // Confirm the payment on the client side
    if (isLoading === false && clientSecret) {
      const result = await stripe.confirmCardPayment(clientSecret, {
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
          console.log(result);
        }
      }
    }
  };

  return (
    <div
      id="add_payment_form"
      className="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title" style={{ color: "white" }}>
              Card Payment
            </h5>
            <button
              type="button"
              className="btn-close btn-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="p-5">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "18px",
                      color: "#32325d",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#fa755a",
                    },
                  },
                }}
              />
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill"
                  disabled={!stripe}
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentForm;
