import React, { useEffect, useState } from "react";
import Payment from "../../components/PaymentCard/Payment";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAllPayments,
  paymentIntent,
} from "../../redux/services/payment";
import { toast } from "react-toastify";
import { FiDollarSign } from "react-icons/fi";
import { addBalanceRec, getBalance } from "../../redux/services/balance";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const BalanceContent = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { balanceDetails } = useSelector((state) => state.balance);
  const { payments } = useSelector((state) => state.payment);
  const [amount, setAmount] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBalance(token));
    dispatch(getUserAllPayments(token));
  }, [token, dispatch]);
  const afterPayment = () => {
    const formData = {
      user_id: user.id,
      credit: amount * 100,
    };
    dispatch(addBalanceRec(token, formData));
  };
  const onAddClick = () => {
    dispatch(
      paymentIntent(token, {
        currency: "usd",
        amount: amount * 100,
        // amount: amount_value ? amount_value.getAttribute("data-amount") : "",
      })
    );
  };
  return (
    <>
      <div className="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div className="hk-pg-body py-0">
          <div className="contactapp-wrap">
            <div className="contactapp-content">
              <div className="d-flex border w-100">
                <div className="w-50 m-5">
                  <div
                    className="card shadow-lg border-primary"
                    style={{ height: "max-content" }}
                  >
                    <div
                      className="m-5"
                      style={{
                        // fontFamily: "monospace",
                        fontSize: "25px",
                        // color: "white",
                        fontWeight: "bolder",
                      }}
                    >
                      <div className="">
                        <div className="float-start mt-2 me-5">
                          <div class="lh-1 text-white bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
                            <FiDollarSign size={25} />
                          </div>{" "}
                        </div>
                        <p className="fw-bolder">Available Credit </p>
                        <span>
                          $
                          {balanceDetails?.credit > 0
                            ? balanceDetails?.credit / 100
                            : 0}
                        </span>
                      </div>
                      <div className="float-end d-flex gap-1 justify-content-end">
                        <div className="form-group col-6 pt-1 d-flex">
                          <span>$</span>
                          <input
                            type="number"
                            className="form-control p-1 px-2 "
                            placeholder="Amount"
                            required={true}
                            min={10}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        {amount < 10 ? (
                          <div>
                            <button
                              className="btn btn-primary btn-sm "
                              style={{ paddingInline: "10px" }}
                              onClick={() =>
                                toast.error(
                                  "Please enter credit greater than 10."
                                )
                              }
                            >
                              Add Credit
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#add_payment_form"
                              className="btn btn-primary btn-sm "
                              style={{ paddingInline: "10px" }}
                              onClick={onAddClick}
                            >
                              Add Credit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" p-0" style={{ height: "100%" }}>
                    <div className="card" style={{ height: "72%" }}>
                      <div className="card-header bg-primary">
                        <div className="card-title text-white fw-bolder">
                          Balance Logs
                        </div>
                      </div>
                      <div
                        className="card-body"
                        style={{
                          height: "480px",
                          overflow: "scroll",
                          scrollBehavior: "smooth",
                        }}
                      >
                        <table class="table table-hover">
                          <thead>
                            <tr className="sticky-top rounded">
                              <th scope="col">#</th>
                              <th scope="col">Description</th>
                              <th scope="col">Amount Payed</th>
                              <th scope="col">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments?.length > 0 ? (
                              payments?.map((payment, index) => (
                                <tr key={index}>
                                  <th scope="row">{index}</th>
                                  <td>{payment?.description}</td>
                                  <td>{payment?.amount / 100}</td>
                                  <td>
                                    {moment(payment?.created_at).format(
                                      "DD MMM,YYYY"
                                    )}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <p>No Record</p>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-50" style={{ height: "100%" }}>
                  <div
                    className="card shadow-lg  m-5"
                    style={{ height: "50%" }}
                  >
                    <div className="card-header bg-primary">
                      <div className="card-title text-white">
                        Pricing SMS/Calls
                      </div>
                    </div>
                    <div className="card-body">
                      <table class="table table-hover">
                        <thead>
                          <tr className="sticky-top rounded">
                            <th scope="col">Country</th>
                            <th scope="col">Call Outbound Price / minute</th>
                            <th scope="col">Call Inbound Price / minute</th>
                            <th scope="col">SMS Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={1}>
                            <td>United States</td>
                            <td>$0.0140 / min</td>
                            <td>$0.0085 / min</td>
                            <td>$0.0079</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card shadow-lg m-5" style={{ height: "38%" }}>
                    <div className="card-header bg-primary">
                      <div className="card-title text-white">Usage</div>
                    </div>
                    <div className="card-body">
                      <div
                        id="accordionSimpleExample"
                        class="accordion accordion-simple single-email-thread"
                      >
                        <div class="accordion-item">
                          <div id="simple-headingOne" class="accordion-header">
                            <div
                              data-bs-toggle="collapse"
                              data-bs-target={`#call_usage`}
                              role="button"
                              aria-expanded="false"
                              className="px-3 py-3 border fw-bold "
                            >
                              Call Usage
                            </div>
                          </div>
                          <div
                            id={`call_usage`}
                            class="accordion-collapse collapse"
                          >
                            <div class="accordion-body">
                              {" "}
                              <Link to={"#"}>Check Call Usage Logs</Link>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <div id="simple-headingOne" class="accordion-header">
                            <div
                              data-bs-toggle="collapse"
                              data-bs-target={`#sms_usage`}
                              role="button"
                              aria-expanded="false"
                              className="px-3 py-3 border fw-bold "
                            >
                              SMS Usage
                            </div>
                          </div>
                          <div
                            id={`sms_usage`}
                            class="accordion-collapse collapse"
                          >
                            <div class="accordion-body">
                              {" "}
                              <Link to={"#"}>Check SMS Usage Logs</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Payment
            // route="/kyc-form"
            afterPayment={afterPayment}
            description="Credit added"
          />
        </div>
      </div>
    </>
  );
};

export default BalanceContent;
