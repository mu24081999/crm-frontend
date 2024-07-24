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
import { readPackage } from "../../redux/services/package";

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
  const { packageDetails, isLoading } = useSelector((state) => state.package);
  // const [amount, setAmount] = useState({
  //   starter: parseFloat(planRates?.starter),
  //   growth: parseFloat(planRates?.growth),
  //   enterprise: parseFloat(planRates?.enterprise),
  // });
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
    // dispatch(readRateRec(token, 1));
    dispatch(readPackage(token, 1));
  }, [token, dispatch]);
  // useEffect(() => {
  //   setAmount({
  //     starter: parseFloat(planRates?.starter),
  //     growth: parseFloat(planRates?.growth),
  //     enterprise: parseFloat(planRates?.enterprise),
  //   });
  // }, [planRates]);
  const onSecondClick = (amount) => {
    console.log("🚀 ~ onSecondClick ~ amount:", amount);
    dispatch(
      paymentIntent(token, {
        currency: "usd",
        amount: Math.floor(amount),
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
      // setAmount({
      //   starter: planRates?.starter - (planRates?.starter / 100) * 10,
      //   growth: planRates?.growth - (planRates?.growth / 100) * 10,
      //   enterprise: planRates?.enterprise - (planRates?.enterprise / 100) * 10,
      // });
      setShowDiscount(true);
    } else {
      // setAmount({
      //   starter: planRates?.starter,
      //   growth: planRates?.growth,
      //   enterprise: planRates?.enterprise,
      // });
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
            <div className="row d-flex justify-content-center gap-5">
              {packageDetails?.packages &&
                JSON.parse(packageDetails?.packages)?.packagesDetails?.map(
                  (obj, index) => (
                    <div
                      className="col-lg-3 card shadow-lg rounded-4 p-4"
                      data-aos="fade-up"
                      data-aos-delay="100"
                      key={index}
                      // style={{ borderTop: "5px solid gold" }}
                    >
                      <div className="">
                        <h3 className="text-light py-2">{obj?.name}</h3>
                        <h4 className="text-primary">
                          <div className="d-flex gap-2">
                            <div>
                              <sup className="fs-3">$</sup>
                              <span className="fs-1">
                                {showDiscount
                                  ? _.toString(
                                      obj?.price -
                                        (obj?.price / 100) * obj.discount
                                    )
                                  : _.toString(obj?.price).slice(0, 5)}
                              </span>
                              <p style={{ fontSize: "16px" }}>per month</p>
                            </div>
                            {showDiscount && (
                              <div>
                                <p className="fs-5">( 10% Off )</p>
                                <p className="fs-5">
                                  <span>
                                    ( $
                                    {_.toString(
                                      obj?.price * 12 -
                                        ((obj?.price * 12) / 100) *
                                          obj?.discount
                                    )?.slice(0, 5)}{" "}
                                    )
                                  </span>
                                  <span className="text-primary"> / Year</span>
                                </p>
                              </div>
                            )}
                          </div>
                        </h4>
                        <ul
                          className="p-0"
                          style={{ maxHeight: "40vh", overflow: "scroll" }}
                        >
                          {obj?.content?.map((content, index) => (
                            <li key={index}>
                              <div className=" text-light d-flex">
                                <FaCheck
                                  color="green"
                                  size={34}
                                  className="pe-2"
                                />
                                <div>{content}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div
                        className="card-footer px-0"
                        style={{ paddingTop: "5%" }}
                      >
                        <button
                          className="btn btn-block btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#add_payment_form"
                          data-amount={`120000`}
                          onClick={() => {
                            onSecondClick(
                              showDiscount
                                ? (obj?.price * 12 -
                                    ((obj?.price * 12) / 100) * obj?.discount) *
                                    100
                                : obj?.price * 100
                            );
                            setPlanData({
                              customer_id: user_id,
                              plan: obj?.name,
                              amount_payed: showDiscount
                                ? (obj?.price * 12 -
                                    ((obj?.price * 12) / 100) * obj?.discount) *
                                  100
                                : obj?.price * 100,
                              plan_type: showDiscount ? "yearly" : "monthly",
                              start_date: moment(currentDate).format(
                                "YYYY-MM-DD HH:mm:ss"
                              ),
                              end_date: showDiscount
                                ? moment(addYearsToDate(currentDate, 1)).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                  )
                                : moment(
                                    addMonthsToDate(currentDate, 1)
                                  ).format("YYYY-MM-DD HH:mm:ss"),
                            });
                          }}
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  )
                )}

              {/* <div
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
                        <span className="fs-1">
                          {_.toString(amount?.growth).slice(0, 5)}
                        </span>
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
                        Leads Management
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Voice Calling
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Voice Recording
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
                        Send SMS
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Send Emails
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        $15 Credit per month
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />3
                        Sub-Accounts
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />3
                        Agent Accounts
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        To-Do's
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Calender
                      </div>
                    </li>

                  </ul>
                </div>
                <div className="card-footer px-0" style={{ paddingTop: "23%" }}>
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
                // style={{ borderTop: "5px solid red" }}
              >
                <div className="">
                  <h3 className="text-gold py-2">Enterprise</h3>
                  <h4 className="text-primary">
                    <div className="d-flex gap-2">
                      <div>
                        <sup className="fs-3">$</sup>
                        <span className="fs-1">
                          {_.toString(amount?.enterprise).slice(0, 5)}
                        </span>
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
                        Leads Management
                      </div>
                    </li>
                    <li>
                      <div className="d-flex text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        <div> Voice Calling</div>
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Voice Recording
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
                        Send SMS
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Send Emails
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        $50 Credit per month
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Unlimited Sub-Accounts
                      </div>
                    </li>
                    <li>
                      <div className=" text-light d-flex">
                        <FaCheck color="green" size={34} className="pe-2" />
                        <div>10 Agent Accounts on each Sub-Account</div>
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        To-Do's
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        Calender
                      </div>
                    </li>
                    <li>
                      <div className=" text-light">
                        <FaCheck color="green" size={34} className="pe-2" />
                        White-Lable Dashboard
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
              </div> */}
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
