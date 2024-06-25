import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactRec,
  getContactDetais,
  getContactsList,
} from "../../../redux/services/contact";
import Loader from "../../../components/Loader/Loader";
import { FaEye, FaStar } from "react-icons/fa";
import { getUsers } from "../../../redux/services/users";
import moment from "moment/moment";
import Popup from "reactjs-popup";

const RecordingList = ({ isEdit, recordingsData }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.calling);
  useEffect(() => {
    if (token) {
      dispatch(getContactsList(token));
      dispatch(getUsers(token));
    }
  }, [dispatch, token]);
  const twilioErrorCodes = {
    21601:
      "The From phone number is invalid or not a valid, SMS-capable Twilio number.",
    21602: "The To phone number is not a valid phone number.",
    21603: "The Body of the message is required and cannot be empty.",
    21604: "The From phone number is required to send a message.",
    21605: "The StatusCallback URL is not a valid URL.",
    21606: "The MessageSid provided is not valid.",
    21610:
      "The To phone number has opted out of receiving messages from your Twilio number.",
    21612: "The To phone number is not currently reachable via SMS.",
    21614: "The To phone number is not a valid mobile number.",
    21617: "The From phone number has not been enabled for SMS.",
    21618: "The MessageSid does not exist.",
    21620: "The MessagingServiceSid is not valid.",
    21621: "The MessageBody exceeds the maximum allowed length.",
    21622: "The Message contains prohibited content.",
    21627: "The From phone number is not a valid, SMS-capable phone number.",
    21629: "Cannot send message content due to the carrier filter.",
    21630: "The From phone number is not enabled for messaging.",
    21631: "The From phone number is not valid.",
    21632: "The Message content is too long.",
    21633: "The From phone number is not a valid Twilio number.",
    30032:
      "Your toll-free number has not been Verified to allow sending of traffic in USA and Canada",
    // Add more error codes as needed
  };
  function getTwilioErrorMessage(errorCode) {
    return twilioErrorCodes[errorCode] || "Unknown error code";
  }
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
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Text</th>
                  <th>Direction</th>
                  <th>Error Message</th>
                  <th>Price</th>
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
                      <td>{recording?.from}</td>
                      <td>{recording?.to}</td>
                      <td>{recording?.status}</td>
                      <td>
                        <Popup
                          // open={isDialerOpen}
                          trigger={
                            <button
                              className="btn btn-icon btn-floating btn-light btn-sm btn-rounded shadow-lg"
                              id="dialer_button"
                            >
                              <FaEye
                                size={"18"}
                                style={{ marginTop: "-15%" }}
                              />
                            </button>
                          }
                          position="bottom right"
                        >
                          <p className="">{recording?.body}</p>
                        </Popup>
                      </td>
                      <td>{recording?.direction}</td>
                      <td>
                        {recording?.errorCode && (
                          <Popup
                            // open={isDialerOpen}
                            trigger={
                              <button
                                className="btn btn-icon btn-floating btn-light btn-sm btn-rounded shadow-lg"
                                id="dialer_button"
                              >
                                <FaEye
                                  color="red"
                                  size={"18"}
                                  style={{ marginTop: "-15%" }}
                                />
                              </button>
                            }
                            position="bottom right"
                          >
                            <p className="">
                              {recording?.errorCode &&
                                getTwilioErrorMessage(recording.errorCode)}
                            </p>
                          </Popup>
                        )}
                      </td>
                      <td>{recording?.price}</td>
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
