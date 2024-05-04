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

const RecordingList = ({
  contactsData,
  onToggleEdit,
  isEdit,
  recordingsData,
}) => {
  const dispatch = useDispatch();
  // const [contactsData, setContactData] = useState();
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.calling);
  useEffect(() => {
    if (token) {
      dispatch(getContactsList(token));
      dispatch(getUsers(token));
    }
  }, [dispatch, token]);
  // useEffect(() => {
  //   if (contacts.length > 0) {
  //     setContactData(contacts);
  //   }
  // }, [contacts]);
  const handleDeleteContact = (contact_id) => {
    console.log("🚀 ~ handleDeleteContact ~ contact_id:", contact_id);
    dispatch(deleteContactRec(token, contact_id));
    onToggleEdit(false);
  };
  const handleToggle = (contact_id) => {
    onToggleEdit(true);
    dispatch(getContactDetais(token, contact_id));
  };
  return (
    <div className="contact-list-view">
      {/* <div className="bg-primary p-2 rounded mb-5">
        <h5 className="pt-2 fw-bold" style={{ color: "white" }}>
          Phone Numbers
        </h5>
      </div> */}
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
                  <th>Duration</th>
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
                      <td>{recording?.duration} sec</td>
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
