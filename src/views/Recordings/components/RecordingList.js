import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactRec,
  getContactDetais,
  getContactsList,
} from "../../../redux/services/contact";
import Loader from "../../../components/Loader/Loader";
import { FaStar } from "react-icons/fa";
import { getUsers } from "../../../redux/services/users";
import moment from "moment/moment";
import { CallLogsList } from "../../../redux/services/calling";

const RecordingList = ({ isEdit, recordingsData, user }) => {
  const dispatch = useDispatch();
  const { token, accountAuthToken, accountSid } = useSelector(
    (state) => state.auth
  );
  const { isLoading, callLogs } = useSelector((state) => state.calling);
  useEffect(() => {
    if (token) {
      dispatch(getContactsList(token));

      dispatch(getUsers(token));
    }
  }, [dispatch, token, accountSid, accountAuthToken]);

  return (
    <div className="contact-list-view">
      {!isEdit && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <table
              data-sticky-header
              className="table table-responsive w-100 mb-5"
            >
              <thead className="table-primary shadow-lg">
                <tr className="sticky-top border rounded">
                  <th>Date</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Duration</th>
                  <th>Direction</th>
                  <th>Recording</th>
                </tr>
              </thead>

              <tbody>
                {recordingsData?.length > 0 &&
                  recordingsData?.map((recording) => (
                    <tr>
                      <td>
                        {moment(recording?.dateCreated).format(
                          "HH:mm:ss YYYY-MM-DD"
                        )}
                      </td>
                      <td>{recording?.source}</td>
                      <td>{recording?.status}</td>
                      <td>{recording?.fromNumber}</td>
                      <td>{recording?.toNumber}</td>
                      <td>{recording?.duration} sec</td>
                      <td>{recording?.direction}</td>
                      <td>
                        <audio controls>
                          <source
                            src={recording?.mediaUrl}
                            type="audio/x-wav"
                          />
                        </audio>
                        {/* <audio controls>
                          <source src={recording?.mediaUrl} type="audio/mpeg" />
                        </audio> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default RecordingList;
