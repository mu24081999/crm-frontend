import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import moment from "moment/moment";
import SearchNumber from "./SearchNumber";
import "./audio.css";
import _ from "lodash";
const RecordingList = ({ isEdit, recordingsData, dispatch, user, token }) => {
  const { isLoading } = useSelector((state) => state.calling);
  return (
    <div className="contact-list-view">
      <SearchNumber user={user} token={token} dispatch={dispatch} />
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
                  <th>Duration</th>
                  <th>Direction</th>
                  <th>Recording</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {recordingsData?.length > 0 &&
                  recordingsData?.map((recording, index) => (
                    <tr key={index}>
                      <td>
                        {moment(recording?.call?.dateCreated).format(
                          "HH:mm:ss YYYY-MM-DD"
                        )}
                      </td>
                      <td>{recording?.call?.from}</td>
                      <td>
                        {recording?.call?.from?.includes("client")
                          ? recordingsData[index - 1]?.call?.to
                          : recording?.call?.to}
                      </td>
                      <td>{recording?.call?.status}</td>
                      <td>{recording?.call?.duration} sec</td>
                      <td>
                        {recording?.call?.from?.includes("client")
                          ? "outbound-dial"
                          : recording?.call?.direction}
                      </td>
                      <td>
                        {recording?.recording?.mediaUrl ? (
                          <audio controls className="custom-audio-player">
                            <source
                              src={recording?.recording?.mediaUrl}
                              type="audio/x-wav"
                            />
                          </audio>
                        ) : (
                          <p>nill</p>
                        )}
                      </td>
                      <td>{parseFloat(recording?.call?.price) * 2 || 0}</td>
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
