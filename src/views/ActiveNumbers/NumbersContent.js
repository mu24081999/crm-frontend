import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import {
  getAllClaimedNumbers,
  getMainAccountClaimedNumbers,
} from "../../redux/services/calling";
import { SocketContext } from "../../Context";

const NumbersContent = () => {
  const { checkLastFetchedValid } = useContext(SocketContext);
  const { dashboardData } = useSelector((state) => state.dashboard);
  const { token, accountAuthToken, accountSid, user } = useSelector(
    (state) => state.auth
  );
  console.log(user?.twilio_numbers?.numbers);
  const { claimedNumbers, isLoading, lastFetched } = useSelector(
    (state) => state.calling
  );
  const active_numbers =
    user?.role === "AGENT" ? user?.twilio_numbers?.numbers : claimedNumbers;

  const dispatch = useDispatch();
  useEffect(() => {
    const shouldFetch = checkLastFetchedValid(lastFetched, 60000 * 15);
    if (shouldFetch) dispatch(getMainAccountClaimedNumbers(token));
  }, [
    token,
    dispatch,
    accountSid,
    accountAuthToken,
    lastFetched,
    checkLastFetchedValid,
  ]);

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
                  <tr className=" border p-1 shadow-lg p-3 mb-5 bg-white rounded">
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
    </div>
  );
};

export default NumbersContent;
