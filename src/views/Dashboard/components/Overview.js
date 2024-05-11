import React from "react";
import { FaFileInvoiceDollar, FaRegEnvelope } from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiGmail, SiGoogleads, SiMinutemailer } from "react-icons/si";
import { BsEnvelopeCheck } from "react-icons/bs";
import { TbBrandGmail } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import SyncingChart from "../../../components/ChartComponent/ SyncingChart/SyncingChart";

import { IoCallOutline } from "react-icons/io5";
import moment from "moment";
import LineChart from "../../../components/ChartComponent/LineChart/LineChart";
import Loader from "../../../components/Loader/Loader";
const Overview = ({ dashboardData, isLoading, user }) => {
  const active_numbers =
    user?.parent_id === null && user?.client_id === null
      ? dashboardData?.sub_accounts_data?.numbers
      : dashboardData?.numbers;
  return (
    <div class="tab-pane fade show active" id="dashboard_overview_tab">
      <div className="row p-auto">
        <section class="pb-2">
          <div class="container">
            <div class="row justify-content-center">
              <div class="">
                <div class="row gy-4">
                  <div class="col-md-4 col-sm-6">
                    <div class="card widget-card border-light shadow-lg">
                      <div class="card-body p-4">
                        <div class="row">
                          <div class="col-8">
                            <h5 class="card-title widget-card-title mb-3">
                              SMS
                            </h5>

                            <div className="d-flex ">
                              <div>
                                <div className="d-flex">
                                  <li className="text-left fw-bold">
                                    Recieved
                                  </li>
                                  <p className="px-2">
                                    {user?.parent_id === null &&
                                    user?.client_id === null
                                      ? dashboardData?.sub_accounts_data
                                          ?.messages?.number_of_recieved_sms
                                      : dashboardData?.messages
                                          ?.number_of_recieved_sms}
                                  </p>
                                </div>
                                <div className="d-flex">
                                  <li
                                    className="text-left fw-bold"
                                    style={{ width: "90px" }}
                                  >
                                    Sent
                                  </li>
                                  <p className="px-2">
                                    {user?.parent_id === null &&
                                    user?.client_id === null
                                      ? dashboardData?.sub_accounts_data
                                          ?.messages?.number_of_sent_sms
                                      : dashboardData?.messages
                                          ?.number_of_sent_sms}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-4">
                            <div class="d-flex justify-content-end">
                              <div class="lh-1 text-white bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
                                <BsEnvelopeCheck size={25} />{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="row">
                          <div class="col-12">
                            <div class="d-flex align-items-center mt-3">
                              <span class="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                                <i class="bi bi-arrow-right-short bsb-rotate-45"></i>
                              </span>
                              <div>
                                <p class="fs-7 mb-0">-9%</p>
                                <p class="fs-7 mb-0 text-secondary">
                                  since last week
                                </p>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="card widget-card border-light shadow-lg">
                      <div class="card-body p-4">
                        <div class="row">
                          <div class="col-8">
                            <h5 class="card-title widget-card-title mb-3">
                              Calls
                            </h5>
                            <div>
                              <div className="d-flex">
                                <li className="text-left fw-bold">Inbound</li>
                                <p className="px-2">
                                  {dashboardData?.calls?.number_of_inbound_call}
                                </p>
                              </div>
                              <div className="d-flex">
                                <li className="text-left fw-bold">Outbound</li>
                                <p className="px-2">
                                  {user?.parent_id === null &&
                                  user?.client_id === null
                                    ? dashboardData?.sub_accounts_data?.calls
                                        ?.number_of_outbound_call
                                    : dashboardData?.calls
                                        ?.number_of_outbound_call}
                                </p>
                              </div>
                            </div>{" "}
                          </div>
                          <div class="col-4">
                            <div class="d-flex justify-content-end">
                              <div class="lh-1 text-white bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
                                <IoCallOutline size={25} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="row">
                          <div class="col-12">
                            <div class="d-flex align-items-center mt-3">
                              <span class="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                                <i class="bi bi-arrow-right-short bsb-rotate-n45"></i>
                              </span>
                              <div>
                                <p class="fs-7 mb-0">+26%</p>
                                <p class="fs-7 mb-0 text-secondary">
                                  since last week
                                </p>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="card widget-card border-light shadow-lg">
                      <div class="card-body p-4">
                        <div class="row">
                          <div class="col-8">
                            <h5 class="card-title widget-card-title mb-3">
                              Emails
                            </h5>

                            <div>
                              <div className="d-flex ">
                                <li
                                  className="text-left fw-bold"
                                  style={{ width: "90px" }}
                                >
                                  Sent
                                </li>
                                <p className="px-2">
                                  {user?.parent_id === null &&
                                  user?.client_id === null
                                    ? dashboardData?.sub_accounts_data?.emails
                                        ?.number_of_send_emails
                                    : dashboardData?.emails
                                        ?.number_of_send_emails}
                                </p>
                              </div>
                              <div className="d-flex ">
                                <li className="text-left fw-bold">Recieved</li>
                                <p className="px-2">
                                  {user?.parent_id === null &&
                                  user?.client_id === null
                                    ? dashboardData?.sub_accounts_data?.emails
                                        ?.number_of_emails_recieved
                                    : dashboardData?.emails
                                        ?.number_of_emails_recieved}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-4">
                            <div class="d-flex justify-content-end">
                              <div class="lh-1 text-white bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
                                <SiGmail size={25} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="row">
                          <div class="col-12">
                            <div class="d-flex align-items-center mt-3">
                              <span class="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                                <i class="bi bi-arrow-right-short bsb-rotate-n45"></i>
                              </span>
                              <div>
                                <p class="fs-7 mb-0">+69%</p>
                                <p class="fs-7 mb-0 text-secondary">
                                  since last week
                                </p>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="card widget-card border-light shadow-lg">
                      <div class="card-body p-4">
                        <div class="row">
                          <div class="col-8">
                            <h5 class="card-title widget-card-title mb-3">
                              Subscriptions
                            </h5>
                            <div className="">
                              <div className="d-flex">
                                <li
                                  className="text-left fw-bold"
                                  style={{ width: "80px" }}
                                >
                                  Active
                                </li>
                                <p className="px-2">
                                  {dashboardData?.number_of_subscriptions}
                                </p>
                              </div>
                            </div>{" "}
                          </div>
                          <div class="col-4">
                            <div class="d-flex justify-content-end">
                              <div class="lh-1 text-white bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
                                <MdOutlineSubscriptions size={25} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="row">
                          <div class="col-12">
                            <div class="d-flex align-items-center mt-3">
                              <span class="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                                <i class="bi bi-arrow-right-short bsb-rotate-45"></i>
                              </span>
                              <div>
                                <p class="fs-7 mb-0">-21%</p>
                                <p class="fs-7 mb-0 text-secondary">
                                  since last week
                                </p>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="card widget-card border-light shadow-lg">
                      <div class="card-body p-4">
                        <div class="row">
                          <div class="col-8">
                            <h5 class="card-title widget-card-title mb-3">
                              Invoices
                            </h5>

                            <div>
                              <div className="d-flex ">
                                <li
                                  className="text-left fw-bold"
                                  style={{ width: "90px" }}
                                >
                                  Sent
                                </li>
                                <p className="px-2">
                                  {dashboardData?.number_of_invoices_sent}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-4">
                            <div class="d-flex justify-content-end">
                              <div class="lh-1 text-white bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
                                <LiaFileInvoiceDollarSolid size={25} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="row">
                          <div class="col-12">
                            <div class="d-flex align-items-center mt-3">
                              <span class="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                                <i class="bi bi-arrow-right-short bsb-rotate-n45"></i>
                              </span>
                              <div>
                                <p class="fs-7 mb-0">+69%</p>
                                <p class="fs-7 mb-0 text-secondary">
                                  since last week
                                </p>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="card widget-card border-light shadow-lg">
                      <div class="card-body p-4">
                        <div class="row">
                          <div class="col-8">
                            <h5 class="card-title widget-card-title mb-3">
                              Leads
                            </h5>
                            <div className="d-flex">
                              <li
                                className="text-left fw-bold"
                                style={{ width: "80px" }}
                              >
                                Active
                              </li>
                              <p className="px-2">
                                {user?.parent_id === null &&
                                user?.client_id === null
                                  ? dashboardData?.sub_accounts_data
                                      ?.number_of_leads
                                  : dashboardData?.number_of_leads}
                              </p>
                            </div>
                          </div>
                          <div class="col-4">
                            <div class="d-flex justify-content-end">
                              <div class="lh-1 text-white bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
                                <SiGoogleads size={25} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="row">
                          <div class="col-12">
                            <div class="d-flex align-items-center mt-3">
                              <span class="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                                <i class="bi bi-arrow-right-short bsb-rotate-45"></i>
                              </span>
                              <div>
                                <p class="fs-7 mb-0">-21%</p>
                                <p class="fs-7 mb-0 text-secondary">
                                  since last week
                                </p>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="card col-md-3 rounded-lg p-0">
          <div className="card-header" style={{ backgroundColor: "#08c91ec4" }}>
            <div
              className="card-title text-center w-100"
              style={{ color: "white" }}
            >
              SMS
            </div>
          </div>
          <div className="card-body" style={{ backgroundColor: "#08c91e21" }}>
            <div className="text-center">
              <BsEnvelopeCheck size={50} />
            </div>
            <div className="d-flex justify-content-around ">
              <div>
                <div className="d-flex">
                  <li className="text-left fw-bold">Recieved</li>
                  <p className="px-2">
                    {dashboardData?.messages?.number_of_recieved_sms}
                  </p>
                </div>
                <div className="d-flex">
                  <li className="text-left fw-bold" style={{ width: "90px" }}>
                    Sent
                  </li>
                  <p className="px-2">
                    {dashboardData?.messages?.number_of_sent_sms}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card col-md-3  p-0">
          <div className="card-header" style={{ backgroundColor: "#08c91ec4" }}>
            <div
              className="card-title text-center w-100"
              style={{ color: "white" }}
            >
              Calls
            </div>
          </div>
          <div className="card-body" style={{ backgroundColor: "#08c91e21" }}>
            <div className="text-center">
              <IoCallOutline size={50} />
            </div>
            <div className=" d-flex justify-content-center">
              <div>
                <div className="d-flex">
                  <li className="text-left fw-bold">Inbound</li>
                  <p className="px-2">
                    {dashboardData?.calls?.number_of_inbound_call}
                  </p>
                </div>
                <div className="d-flex">
                  <li className="text-left fw-bold">Outbound</li>
                  <p className="px-2">
                    {dashboardData?.calls?.number_of_outbound_call}
                  </p>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="card col-md-3  p-0">
          <div className="card-header" style={{ backgroundColor: "#08c91ec4" }}>
            <div
              className="card-title text-center w-100"
              style={{ color: "white" }}
            >
              Emails
            </div>
          </div>
          <div className="card-body" style={{ backgroundColor: "#08c91e21" }}>
            <div className="text-center">
              <SiGmail size={50} />
            </div>
            <div className="d-flex justify-content-around">
              <div>
                <div className="d-flex ">
                  <li className="text-left fw-bold" style={{ width: "90px" }}>
                    Sent
                  </li>
                  <p className="px-2">
                    {dashboardData?.emails?.number_of_send_emails}
                  </p>
                </div>
                <div className="d-flex ">
                  <li className="text-left fw-bold">Recieved</li>
                  <p className="px-2">
                    {dashboardData?.emails?.number_of_emails_recieved}
                  </p>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="card col-md-3  p-0">
          <div className="card-header" style={{ backgroundColor: "#08c91ec4" }}>
            <div
              className="card-title text-center w-100"
              style={{ color: "white" }}
            >
              Subscriptions
            </div>
          </div>
          <div className="card-body" style={{ backgroundColor: "#08c91e21" }}>
            <div className="text-center">
              <MdOutlineSubscriptions size={50} />
            </div>
            <div className="">
              <div className="d-flex justify-content-center py-1">
                <li className="text-left fw-bold" style={{ width: "80px" }}>
                  Active
                </li>
                <p className="px-2">{dashboardData?.number_of_subscriptions}</p>
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="card col-md-3  p-0">
          <div className="card-header" style={{ backgroundColor: "#08c91ec4" }}>
            <div
              className="card-title text-center w-100"
              style={{ color: "white" }}
            >
              Invoices
            </div>
          </div>
          <div className="card-body" style={{ backgroundColor: "#08c91e21" }}>
            <div className="text-center">
              <LiaFileInvoiceDollarSolid size={50} />
            </div>
            <div className="">
              <div className="d-flex justify-content-center py-1">
                <li className="text-left fw-bold" style={{ width: "80px" }}>
                  Sent
                </li>
                <p className="px-2">{dashboardData?.number_of_invoices_sent}</p>
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="card col-md-3  p-0">
          <div className="card-header" style={{ backgroundColor: "#08c91ec4" }}>
            <div
              className="card-title text-center w-100"
              style={{ color: "white" }}
            >
              Leads
            </div>
          </div>
          <div className="card-body" style={{ backgroundColor: "#08c91e21" }}>
            <div className="text-center">
              <SiGoogleads size={50} />
            </div>
            <div className="d-flex justify-content-center py-1">
              <li className="text-left fw-bold" style={{ width: "80px" }}>
                Active
              </li>
              <p className="px-2">{dashboardData?.number_of_leads}</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="row gap-4">
        <div className="col-12 d-flex px-4 flex-wrap flex-wrap gap-2">
          <div
            className="card shadow-lg col-md-7 col-sm-6 p-0 "
            style={{ maxWidth: "56%" }}
          >
            <div
              className="card-header w-100 "
              style={{ background: "#45a59d	" }}
            >
              <duv
                className="card-title text-center"
                style={{ color: "white" }}
              >
                SMS Inbound and Outbound
              </duv>
            </div>
            {isLoading === true ? (
              <Loader></Loader>
            ) : (
              <LineChart
                title="Messages Report"
                categories={
                  user?.parent_id === null && user?.client_id === null
                    ? dashboardData?.sub_accounts_data?.messages?.chart
                        ?.categories
                    : dashboardData?.messages?.chart?.categories
                }
                series={
                  user?.parent_id === null && user?.client_id === null
                    ? dashboardData?.sub_accounts_data?.messages?.chart?.series
                    : dashboardData?.messages?.chart?.series
                }
              />
            )}
          </div>
          <div className="card shadow-lg p-0 col-md-5 col-sm-6 ms-3">
            <div
              className="card-header w-100 "
              style={{ backgroundColor: "#45a59d	" }}
            >
              <duv className="card-title" style={{ color: "white" }}>
                Calls Inbound/Outbound
              </duv>
            </div>
            {isLoading === true ? (
              <Loader></Loader>
            ) : (
              <LineChart
                title="Calls Report"
                categories={
                  user?.parent_id === null && user?.client_id === null
                    ? dashboardData?.sub_accounts_data?.calls?.chart?.categories
                    : dashboardData?.calls?.chart?.categories
                }
                series={
                  user?.parent_id === null && user?.client_id === null
                    ? dashboardData?.sub_accounts_data?.calls?.chart?.series
                    : dashboardData?.calls?.chart?.series
                }
              />
            )}
          </div>
        </div>
        <div className="px-4">
          <div className="card p-0 col-md-12 col-sm-6 ">
            <div
              className="card-header w-100 "
              style={{ background: "#45a59d	" }}
            >
              <duv className="card-title" style={{ color: "white" }}>
                Emails Send/Recieved
              </duv>
            </div>
            {isLoading === true ? (
              <Loader></Loader>
            ) : (
              <SyncingChart
                title="Emails Report"
                categories={
                  user?.parent_id === null && user?.client_id === null
                    ? dashboardData?.sub_accounts_data?.emails?.chart
                        ?.categories
                    : dashboardData?.emails?.chart?.categories
                }
                series={
                  user?.parent_id === null && user?.client_id === null
                    ? dashboardData?.sub_accounts_data?.emails?.chart?.series
                    : dashboardData?.emails?.chart?.series
                }
              />
            )}
          </div>
        </div>
        <div className="d-flex gap-4 flex-wrap px-4">
          {user?.client_id === null && (
            <div
              className="card col-md-7 col-sm-6 shadow-lg p-0 "
              style={{ maxWidth: "56%" }}
            >
              <div
                className="card-header w-100"
                style={{ backgroundColor: "#45a59d	" }}
              >
                <duv
                  className="card-title text-center w-100"
                  style={{ color: "white" }}
                >
                  Active Numbers
                </duv>
              </div>
              <div className="card-body">
                {isLoading === true ? (
                  <Loader />
                ) : (
                  <div class="contact-list-view">
                    <table
                      data-sticky-header
                      className="table table-striped w-100 mb-5"
                    >
                      <thead className="table-primary ">
                        <tr className="sticky-top border p-1 shadow-lg p-3 mb-5 bg-white rounded">
                          <th>Number</th>
                          <th>Type</th>
                          <th>Voice</th>
                          <th>SMS</th>
                          <th>MMS</th>
                          <th>FAX</th>
                        </tr>
                      </thead>

                      <tbody>
                        {active_numbers?.map((number, index) => (
                          <tr key={index}>
                            <td>{number?.phoneNumber}</td>
                            <td>Local</td>
                            <td>
                              <span
                                className="badge bg-primary"
                                style={{ color: "white" }}
                              >
                                {number?.capabilities?.voice === true
                                  ? "true"
                                  : "false"}
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge bg-primary"
                                style={{ color: "white" }}
                              >
                                {number?.capabilities?.sms === true
                                  ? "true"
                                  : "false"}
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge bg-primary"
                                style={{ color: "white" }}
                              >
                                {number?.capabilities?.mms === true
                                  ? "true"
                                  : "false"}
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge bg-primary"
                                style={{ color: "white" }}
                              >
                                {number?.capabilities?.fax === true
                                  ? "true"
                                  : "false"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          {user?.parent_id === null && user?.client_id === null && (
            <div
              className="card shadow-lg col-md-5 col-sm-6 p-0"
              style={{ maxWidth: "42%" }}
            >
              <div
                className="card-header w-100 "
                style={{ backgroundColor: "#45a59d	" }}
              >
                <duv
                  className="card-title text-center w-100"
                  style={{ color: "white" }}
                >
                  Sub Accounts
                </duv>
              </div>
              <div className="card-body" style={{ backgroundColor: "" }}>
                {isLoading === true ? (
                  <Loader />
                ) : (
                  <div class="contact-list-view">
                    <table
                      data-sticky-header
                      className="table table-striped w-100 mb-5"
                    >
                      <thead className="table-primary ">
                        <tr className=" border p-1 shadow-lg p-3 mb-5 bg-white rounded">
                          <th>Account Name</th>
                          <th>Email</th>
                          <th>Date Created</th>
                        </tr>
                      </thead>

                      <tbody>
                        {dashboardData?.sub_accounts?.map((account, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>{account?.name}</td>
                                <td>{account?.email}</td>
                                <td>
                                  {moment(account?.created_at)?.format(
                                    "DD MMM,YYYY"
                                  )}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
