import React, { useEffect, useMemo, useState } from "react";
import { CallLogsList } from "../../../redux/services/calling";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../../components/Loader/Loader";

const Call_Tab = ({ activeBar, contactDetails, authUser, token, dispatch }) => {
  const { callLogs, isLoading } = useSelector((state) => state.calling);
  const [callsData, setCallsData] = useState([]);
  useMemo(() => {
    dispatch(
      CallLogsList(token, {
        accountSid: authUser?.accountSid,
        authToken: authUser.authToken,
      })
    );
  }, [token, dispatch, authUser]);
  useEffect(() => {
    if (callLogs?.length > 0) {
      const data = callLogs?.filter(
        (call) =>
          call.to === contactDetails.phone || call.from === contactDetails.phone
      );
      setCallsData(data);
    }
  }, [callLogs, authUser, contactDetails]);
  return (
    <div className="tab-content mt-7">
      <div
        className={`tab-pane fade show ${
          activeBar === "Call_tab" ? "active" : ""
        }`}
        id="Call_tab"
        style={{ maxWidth: "800px", overflow: "scroll", maxHeight: "35rem" }}
      >
        {isLoading ? (
          <div className="w-100 border border-primary">
            <Loader />
          </div>
        ) : (
          <table class="table table-striped shadow-lg">
            <thead class="table-primary">
              <tr className="sticky-top rounded">
                <th>From</th>
                <th>To</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Direction</th>
              </tr>
            </thead>

            <tbody>
              <>
                {callsData?.length > 0 &&
                  callsData?.map((call, index) => (
                    <tr key={index}>
                      {/* <td>
                         {call?.accountSid}
                        <hr></hr>
                        {moment(call?.dateCreated).format(
                          "HH:mm:ss YYYY-MM-DD"
                        )}
                      </td> */}
                      <td>{call?.from}</td>
                      <td>{call?.to}</td>
                      <td>{call?.duration} sec</td>
                      <td>{call?.status}</td>
                      <td>{call?.direction}</td>
                    </tr>
                  ))}
              </>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Call_Tab;
