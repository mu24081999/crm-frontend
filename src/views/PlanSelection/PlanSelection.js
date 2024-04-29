import React from "react";
import Payment from "../../components/PaymentCard/Payment";
import { useForm } from "react-hook-form";
import InputField from "../../components/FormFields/InputField";
import ReactSelectField from "../../components/FormFields/reactSelectField";
import "./plan.css";
import logo from "./../../assets/logo.jpeg";

const PlanSelection = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const handleAddSubscription = () => {};
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
    <div class=" ">
      <div class="container">
        <div className="menu-header text-center">
          <span>
            <a className="navbar-brand flex" href="#">
              <img
                className="brand-img img-fluid"
                src={logo}
                width={300}
                alt="brand"
              />
            </a>
          </span>
        </div>
        <div className="text-center fw-bold fs-1 py-5">
          Select your subscription plan
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-md-4 col-sm-6">
            <div class="pricingTable">
              <div class="pricingTable-header">
                <h3 class="title">Monthly</h3>
                <div class="price-value">
                  <span class="amount">$10</span>
                </div>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>500 Calls</li>
                  <li>500 Emails</li>
                  <li>500 SMS</li>
                  <li class="">Unlimited Support</li>
                </ul>
              </div>
              <button
                className="btn btn-primary btn-block fs-3 fw-bold"
                id="buy_number"
                data-bs-toggle="modal"
                data-bs-target="#add_payment_form"
                data-amount={`10000`}
              >
                Continue
              </button>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="pricingTable pink">
              <div class="pricingTable-header">
                <h3 class="title">Yearly</h3>
                <div class="price-value">
                  <span class="amount">$120</span>
                </div>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>Unlimited Calls</li>
                  <li>Unlimited SMS</li>
                  <li>Unlimited Emails</li>
                  <li>Leads Management</li>
                </ul>
              </div>
              <button
                className="btn btn-primary btn-block fs-3 fw-bold"
                id="buy_number"
                data-bs-toggle="modal"
                data-bs-target="#add_payment_form"
                data-amount={`120000`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <Payment />
    </div>
  );
};

export default PlanSelection;
