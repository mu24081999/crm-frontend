import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentRec, paymentIntent } from "../../redux/services/payment";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReactSelectField from "../../components/FormFields/reactSelectField";
import { Link } from "react-router-dom";
const PaymentForm = ({ path, afterPayment, description }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const { paymentIntent, isLoading } = useSelector((state) => state.payment);
  const [formData, setFormData] = useState({
    card_holder_name: "",
    user_id: user.id,
    amount: "",
    postal_code: "",
    policy_accepted: "",
    description: description,
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      amount: paymentIntent?.amount,
    }));
  }, [paymentIntent]);
  const stripe = useStripe();
  const elements = useElements();
  const amount_value = document.getElementById("buy_number");
  const close_button = document.getElementById("close_modal");
  const handleSubmit = async (event) => {
    event.preventDefault();
    // await dispatch(
    //   paymentIntent(token, {
    //     currency: "usd",
    //     // amount: 5000,
    //     amount: amount_value ? amount_value.getAttribute("data-amount") : "",
    //   })
    // );
    const amount = paymentIntent?.amount;
    console.log("🚀 ~ handleSubmit ~ amount:", amount);
    // setFormData((prevFormData) => ({ ...prevFormData, amount: amount }));
    console.log(formData);
    const clientSecret = paymentIntent?.client_secret;
    // Confirm the payment on the client side
    if (isLoading === false && paymentIntent?.client_secret !== undefined) {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.error) {
        // Handle error
        toast.error(result.error.message);
      } else {
        // Handle success
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment Successful!");
          afterPayment && (await afterPayment());
          await dispatch(addPaymentRec(token, formData));
          navigate(path);
          close_button?.click();
        }
      }
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, postal_code: e.value.postalCode });
  };
  const handleTermsClick = () => {
    close_button.click();
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
              id="close_modal"
              className="btn-close btn-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {isLoading === true ? (
              <Loader />
            ) : (
              <form onSubmit={handleSubmit} className="p-2" id="payment_form">
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Card Holder Name"
                    style={{ borderTop: "none", borderInline: "none" }}
                    type="text"
                    name="card_holder_name"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        card_holder_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="my-5">
                  <CardElement
                    onChange={(e) => handleChange(e)}
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
                </div>
                <div className=" d-flex gap-2">
                  <input
                    className="form-check"
                    style={{ border: "none" }}
                    type="checkbox"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        policy_accepted: e.target.checked ? true : false,
                      })
                    }
                    required={true}
                    name="policy_accepted"
                  />
                  <Link
                    to="/terms-conditions"
                    className="text-primary text-underlined"
                    onClick={handleTermsClick}
                  >
                    Agreed with terms and conditions
                  </Link>
                </div>

                <div className="pt-4 ">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill"
                    disabled={!stripe}
                  >
                    Pay
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentForm;
