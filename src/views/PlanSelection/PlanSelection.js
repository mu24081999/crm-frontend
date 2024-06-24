import React, { useEffect, useState } from "react";
import Payment from "../../components/PaymentCard/Payment";
import { useForm } from "react-hook-form";
import InputField from "../../components/FormFields/InputField";
import ReactSelectField from "../../components/FormFields/reactSelectField";
// import "./plan.css";
import logo from "./../../assets/3.png";
import { useDispatch, useSelector } from "react-redux";
import { paymentIntent } from "../../redux/services/payment";
import { FcApproval } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import { addUserSubscription } from "../../redux/services/subscription";
import moment from "moment/moment";
import { readRateRec } from "../../redux/services/plan-rates";
import _ from "lodash";

const PlanSelection = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  const { planRates } = useSelector((state) => state.plan_rate);
  const [amount, setAmount] = useState({
    starter: parseFloat(planRates?.starter),
    growth: parseFloat(planRates?.growth),
    enterprise: parseFloat(planRates?.enterprise),
  });
  const [planData, setPlanData] = useState({
    customer_id: null,
    plan_type: null,
    plan: null,
    amount_payed: null,
    start_date: null,
    end_date: null,
  });
  const [showDiscount, setShowDiscount] = useState(false);

  useEffect(() => {
    dispatch(readRateRec(token, 1));
  }, [token, dispatch]);
  useEffect(() => {
    setAmount({
      starter: parseFloat(planRates?.starter),
      growth: parseFloat(planRates?.growth),
      enterprise: parseFloat(planRates?.enterprise),
    });
  }, [planRates]);
  const onSecondClick = (amount) => {
    dispatch(
      paymentIntent(token, {
        currency: "usd",
        amount: amount,
        // amount: amount_value ? amount_value.getAttribute("data-amount") : "",
      })
    );
  };
  const afterPayment = async () => {
    const is_added = await dispatch(addUserSubscription(token, planData));
    if (is_added === true) {
      window.location = `${process.env.REACT_APP_HOST}/kyc-form`;
    }
  };
  const handleSwitchClick = (event) => {
    if (event.target.checked) {
      setAmount({
        starter: planRates?.starter - (planRates?.starter / 100) * 10,
        growth: planRates?.growth - (planRates?.growth / 100) * 10,
        enterprise: planRates?.enterprise - (planRates?.enterprise / 100) * 10,
      });
      setShowDiscount(true);
    } else {
      setAmount({
        starter: planRates?.starter,
        growth: planRates?.growth,
        enterprise: planRates?.enterprise,
      });
      setShowDiscount(false);
    }
  };
  const currentDate = new Date();
  // Function to calculate date after adding months
  function addMonthsToDate(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  // Function to calculate date after adding years
  function addYearsToDate(date, years) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
  }
  return (
    // <div className="d-flex justify-content-center">
    //   <div
    //     className="card rounded-lg shadow-lg p-0"
    //     style={{ marginTop: "15%", width: "50%" }}
    //   >
    //     <div className=" card-header bg-primary">
    //       <div className="card-title fw-bold fs-5" style={{ color: "white" }}>
    //         Select your subscription plan.
    //       </div>
    //     </div>
    //     <div className="card-body">
    //       <form onSubmit={handleSubmit(handleAddSubscription)}>
    //         <div className="row">
    //           <div className="col-12">
    //             <ReactSelectField
    //               name="plan"
    //               placeholder="Subscription Plan"
    //               label="Subscription Plan"
    //               options={
    //                 [
    //                   { label: "Monthly", value: "monthly" },
    //                   { label: "Yearly", value: "yearly" },
    //                 ] || []
    //               }
    //               control={control}
    //               errors={errors}
    //             />
    //           </div>
    //           <div className="col-12">
    //             <ReactSelectField
    //               name="plan"
    //               placeholder="Subscription Plan"
    //               label="Subscription Plan"
    //               options={
    //                 [
    //                   { label: "Monthly", value: "monthly" },
    //                   { label: "Yearly", value: "yearly" },
    //                 ] || []
    //               }
    //               control={control}
    //               errors={errors}
    //             />
    //           </div>
    //         </div>

    //         <button type="submit" className="btn btn-primary mt-5">
    //           Save Changes
    //         </button>
    //       </form>
    //       <button
    //         className="btn btn-primary"
    //         id="buy_number"
    //         data-bs-toggle="modal"
    //         data-bs-target="#add_payment_form"
    //         data-amount={`7000`}
    //       >
    //         Buy
    //       </button>
    //       <Payment />
    //     </div>
    //   </div>
    // </div>
    <div className=" ">
      <div className="container">
        <div className="menu-header text-center py-5">
          <span>
            <a className="navbar-brand flex " href="#">
              <img
                className="brand-img img-fluid"
                src={logo}
                width={300}
                alt="brand"
              />
            </a>
          </span>
        </div>
        <section id="pricing" className="pricing">
          <div className="container" data-aos="fade-up">
            {/* <div className="section-title">
              <h2 className="text-center bg-primary text-white p-2 rounded-3">
                Plans
              </h2>
            </div> */}
            <div className="d-flex gap-2 text-center justify-content-center py-3">
              <div className="fw-bold">Monthly</div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onClick={(e) => handleSwitchClick(e)}
                  id="flexSwitchCheckDefault"
                />
              </div>
              <div className="fw-bold">Yearly</div>
            </div>
            <div className="row d-flex justify-content-center gap-2">
              <div
                className="col-lg-3 card shadow-lg rounded-4 p-4"
                data-aos="fade-up"
                data-aos-delay="100"
                style={{ borderTop: "5px solid gold" }}
              >
                <div className="">
                  <h3 className="text-light py-2">Solo Starter</h3>
                  <h4 className="text-primary">
                    <div className="d-flex gap-2">
                      <div>
                        <sup className="fs-3">$</sup>
                        <span className="fs-1">{amount?.starter}</span>
                        <p style={{ fontSize: "16px" }}>per month</p>
                      </div>
                      {showDiscount && (
                        <div>
                          <p className="fs-5">( 10% Off )</p>
                          <p className="fs-5">
                            <span>
                              ( ${_.toString(amount?.starter * 12)?.slice(0, 5)}{" "}
                              )
                            </span>
                            <span className="text-primary"> / Year</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </h4>
                  <ul className="p-0">
                    <li>
                      <div className=" text-light d-flex">
                        <FaCheck color="green" size={34} className="pe-2" />
                        <div>Voice Calling and account services</div>
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Voice recording
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />1
                        Subaccount
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />1
                        Agent
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Caller ID's
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Send & Recieve SMS
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Leads Management
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        To-do's
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Calender{" "}
                      </div>
                    </li>
                    <li>
                      <div
                        className=" text-light"
                        style={{ paddingTop: "8%" }}
                      ></div>
                    </li>
                  </ul>
                </div>
                <div className="card-footer p-0">
                  <button
                    className="btn btn-block btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#add_payment_form"
                    data-amount={`120000`}
                    onClick={() => {
                      onSecondClick(
                        showDiscount
                          ? amount?.starter * 12 * 100
                          : amount?.starter * 100
                      );
                      setPlanData({
                        customer_id: user_id,
                        plan: "Solo Starter",
                        amount_payed: showDiscount
                          ? amount?.starter * 12 * 100
                          : amount?.starter * 100,
                        plan_type: showDiscount ? "yearly" : "monthly",
                        start_date: moment(currentDate).format(
                          "YYYY-MM-DD HH:mm:ss"
                        ),
                        end_date: showDiscount
                          ? moment(addYearsToDate(currentDate, 1)).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          : moment(addMonthsToDate(currentDate, 1)).format(
                              "YYYY-MM-DD HH:mm:ss"
                            ),
                      });
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div
                className="col-lg-3 card shadow-lg rounded-4 p-4"
                data-aos="fade-up"
                data-aos-delay="100"
                style={{ borderTop: "5px solid teal" }}
              >
                <div className="">
                  <h3 className=" py-2 text-light">Growth</h3>
                  <h4 className="text-primary">
                    <div className="d-flex gap-2">
                      <div>
                        <sup className="fs-3">$</sup>
                        <span className="fs-1">{amount?.growth}</span>
                        <p style={{ fontSize: "16px" }}>per month</p>
                      </div>
                      {showDiscount && (
                        <div>
                          <p className="fs-5">( 10% Off )</p>
                          <p className="fs-5">
                            <span>
                              ( ${_.toString(amount?.growth * 12)?.slice(0, 5)}{" "}
                              )
                            </span>
                            <span className="text-primary"> / Year</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </h4>
                  <ul className="p-0">
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Everything In Solo Starter
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />3
                        Subaccount
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />3
                        Agent
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        SMS Marketing
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Email Marketing
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Time Tracking
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Create & Send Invoices
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Create Funnels & Landing Pages
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Team Audio & Video Calling{" "}
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Website Creation
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-footer p-0">
                  <button
                    className="btn btn-block btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#add_payment_form"
                    data-amount={`120000`}
                    onClick={() => {
                      onSecondClick(
                        showDiscount
                          ? amount?.growth * 12 * 100
                          : amount?.growth * 100
                      );
                      setPlanData({
                        customer_id: user_id,
                        plan: "Growth",
                        amount_payed: showDiscount
                          ? amount?.growth * 12 * 100
                          : amount?.growth * 100,
                        plan_type: showDiscount ? "yearly" : "monthly",
                        start_date: moment(currentDate).format(
                          "YYYY-MM-DD HH:mm:ss"
                        ),
                        end_date: showDiscount
                          ? moment(addYearsToDate(currentDate, 1)).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          : moment(addMonthsToDate(currentDate, 1)).format(
                              "YYYY-MM-DD HH:mm:ss"
                            ),
                      });
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div
                className="col-lg-3 card shadow-lg rounded-4 p-4"
                data-aos="fade-up"
                data-aos-delay="100"
                style={{ borderTop: "5px solid red" }}
              >
                <div className="">
                  <h3 className="text-gold py-2">Enterprise</h3>
                  <h4 className="text-primary">
                    <div className="d-flex gap-2">
                      <div>
                        <sup className="fs-3">$</sup>
                        <span className="fs-1">{amount?.enterprise}</span>
                        <p style={{ fontSize: "16px" }}>per month</p>
                      </div>
                      {showDiscount && (
                        <div>
                          <p className="fs-5">( 10% Off )</p>
                          <p className="fs-5">
                            <span>
                              ( $
                              {_.toString(amount?.enterprise * 12)?.slice(0, 4)}{" "}
                              )
                            </span>
                            <span className="text-primary"> / Year</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </h4>
                  <ul className=" p-0">
                    <li className="">
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Everything Growth
                      </div>
                    </li>
                    <li>
                      <div className="d-flex text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        <div> Unlimited Subaccounts</div>
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Unlimited Agents
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        White-Label Dashboard
                      </div>
                    </li>
                    <li>
                      <div
                        className=" text-light"
                        style={{ paddingBottom: "56%" }}
                      >
                        <FaCheck color="green" size={34} className="pe-2" />
                        Send Fax{" "}
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-footer p-0 mt-3">
                  <button
                    className="btn btn-block btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#add_payment_form"
                    data-amount={`120000`}
                    onClick={() => {
                      onSecondClick(
                        showDiscount
                          ? amount?.enterprise * 12 * 100
                          : amount?.enterprise * 100
                      );
                      setPlanData({
                        customer_id: user_id,
                        plan: "Enterprise",
                        amount_payed: showDiscount
                          ? amount?.enterprise * 12 * 100
                          : amount?.enterprise * 100,
                        plan_type: showDiscount ? "yearly" : "monthly",
                        start_date: moment(currentDate).format(
                          "YYYY-MM-DD HH:mm:ss"
                        ),
                        end_date: showDiscount
                          ? moment(addYearsToDate(currentDate, 1)).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          : moment(addMonthsToDate(currentDate, 1)).format(
                              "YYYY-MM-DD HH:mm:ss"
                            ),
                      });
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Payment
        // route="/kyc-form"
        afterPayment={afterPayment}
        description="Plan Selection"
      />
    </div>
  );
};

export default PlanSelection;
