import React from "react";
import { FaFileInvoiceDollar, FaRegEnvelope } from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiGoogleads, SiMinutemailer } from "react-icons/si";
import { IoCallOutline } from "react-icons/io5";
const Overview = () => {
  return (
    <div class="tab-pane fade show active" id="dashboard_overview_tab">
      <div className="row">
        <div className="card col-md-3 p-0">
          <div className="card-header bg-primary">
            <div className="card-title" style={{ color: "white" }}>
              SMS Sent/Revieved
            </div>
          </div>
          <div className="card-body">
            <div className="text-center">
              <FaRegEnvelope size={50} />
            </div>
            <div className="">
              <div className="d-flex justify-content-center py-1">
                <p className="text-left fw-bold" style={{ width: "80px" }}>
                  Sent
                </p>
                <p className="px-2">1000</p>
              </div>
              <div className="d-flex justify-content-center py-1">
                <p className="text-left fw-bold" style={{ width: "80px" }}>
                  Recieved
                </p>
                <p className="px-2">1000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card col-md-3 p-0">
          <div className="card-header bg-primary">
            <div className="card-title" style={{ color: "white" }}>
              Calls sent/Revieved
            </div>
          </div>
          <div className="card-body">
            <div className="text-center">
              <IoCallOutline size={50} />
            </div>
            <div className="">
              <div className="d-flex justify-content-center py-1">
                <p className="text-left fw-bold" style={{ width: "80px" }}>
                  Inbound
                </p>
                <p className="px-2">1000</p>
              </div>
              <div className="d-flex justify-content-center py-1">
                <p className="text-left fw-bold" style={{ width: "80px" }}>
                  Outbound
                </p>
                <p className="px-2">1000</p>
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="card col-md-3 p-0">
          <div className="card-header bg-primary">
            <div className="card-title" style={{ color: "white" }}>
              Emails sent/Recieved
            </div>
          </div>
          <div className="card-body">
            <div className="text-center">
              <SiMinutemailer size={50} />
            </div>
            <div className="">
              <div className="d-flex justify-content-center py-1">
                <p className="text-left fw-bold" style={{ width: "80px" }}>
                  Sent
                </p>
                <p className="px-2">1000</p>
              </div>
              <div className="d-flex justify-content-center py-1">
                <p className="text-left fw-bold" style={{ width: "80px" }}>
                  Recieved
                </p>
                <p className="px-2">1000</p>
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="card col-md-3 p-0">
          <div className="card-header bg-primary">
            <div className="card-title" style={{ color: "white" }}>
              Subscriptions
            </div>
          </div>
          <div className="card-body">
            <div className="text-center">
              <MdOutlineSubscriptions size={50} />
            </div>
            <div className="">
              <div className="d-flex justify-content-center py-1">
                <p className="text-left fw-bold" style={{ width: "80px" }}>
                  Active
                </p>
                <p className="px-2">3</p>
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="card col-md-3 p-0">
          <div className="card-header bg-primary">
            <div className="card-title" style={{ color: "white" }}>
              Invoices
            </div>
          </div>
          <div className="card-body">
            <div className="text-center">
              <FaFileInvoiceDollar size={50} />
            </div>
            <div className="">
              <div className="d-flex justify-content-center py-1">
                <p className="text-left fw-bold" style={{ width: "80px" }}>
                  Sent
                </p>
                <p className="px-2">1000</p>
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="card col-md-3 p-0">
          <div className="card-header bg-primary">
            <div className="card-title" style={{ color: "white" }}>
              Leads
            </div>
          </div>
          <div className="card-body">
            <div className="text-center">
              <SiGoogleads size={50} />
            </div>
            <div className="text-center fs-5 fw-bold">99k</div>
          </div>
        </div>
        <div className="row">
          <div className="card p-0 col-md-6 col-sm-6">
            <div className="card-header w-100 bg-primary">
              <duv className="card-title" style={{ color: "white" }}>
                Sub Accounts
              </duv>
            </div>
            <div className="card-body">
              <div class="contact-list-view">
                <table
                  data-sticky-header
                  className="table table-striped w-100 mb-5"
                >
                  <thead className="table-primary ">
                    <tr className="sticky-top border p-1 shadow-lg p-3 mb-5 bg-white rounded">
                      <th>Account Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Date Created</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Sub Account</td>
                      <td>subaccount@gmail.con</td>
                      <td>subaccount</td>
                      <td>23 Mar,2024</td>
                    </tr>
                    <tr>
                      <td>Sub Account</td>
                      <td>subaccount@gmail.con</td>
                      <td>subaccount</td>
                      <td>23 Mar,2024</td>
                    </tr>
                    <tr>
                      <td>Sub Account</td>
                      <td>subaccount@gmail.con</td>
                      <td>subaccount</td>
                      <td>23 Mar,2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card p-0 col-md-6 col-sm-6">
            <div className="card-header w-100 bg-primary">
              <duv className="card-title" style={{ color: "white" }}>
                Active Numbers
              </duv>
            </div>
            <div className="card-body">
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
                    <tr>
                      <td>+14849993639</td>
                      <td>Local</td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>+14849993639</td>
                      <td>Local</td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>+14849993639</td>
                      <td>Local</td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge bg-primary"
                          style={{ color: "white" }}
                        >
                          active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
