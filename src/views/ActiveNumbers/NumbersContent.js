import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const NumbersContent = () => {
  const { dashboardData, isLoading } = useSelector((state) => state.dashboard);

  return (
    <div className="" style={{ margin: "7% 10% 7% 10%" }}>
      <div className="card shadow-lg p-0 ">
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
                  {dashboardData?.numbers?.map((number, index) => (
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
    </div>
  );
};

export default NumbersContent;
