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
        accountSid: "AC1237366c79ad62eb76b0e0775cf053d3",
        authToken: "39a1a699c20634690e6e1c935cfeda9d",
      })
    );
  }, [token, dispatch]);
  useEffect(() => {
    if (callLogs?.length > 0) {
      const data = callLogs?.filter(
        (call) =>
          (call.from === authUser.phone && call.to === contactDetails.phone) ||
          (call.from === contactDetails.phone && call.to === authUser.phone)
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
        style={{ maxWidth: "800px", overflow: "scroll", maxHeight: "670px" }}
      >
        {isLoading ? (
          <div className="w-100 border border-primary">
            <Loader />
          </div>
        ) : (
          <table class="table table-striped">
            <thead class="table-success">
              <tr className="sticky-top border rounded">
                <th>Call SID and Date </th>
                <th>Status</th>
                <th>Direction</th>
                <th>From</th>
                <th>To</th>
                <th>Call Type </th>
                <th>Duration</th>
                <th>STIR Status</th>
              </tr>
            </thead>

            <tbody>
              <>
                {callsData?.length > 0 &&
                  callsData?.map((call, index) => (
                    <tr key={index}>
                      <td>
                        {call?.accountSid}
                        <hr></hr>
                        {moment(call?.dateCreated).format(
                          "HH:mm:ss YYYY-MM-DD"
                        )}
                      </td>
                      <td>{call?.status}</td>
                      <td>{call?.direction}</td>
                      <td>{call?.from}</td>
                      <td>{call?.to}</td>
                      <td>Phone</td>
                      <td>{call?.duration} sec</td>
                      <td>...</td>
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
