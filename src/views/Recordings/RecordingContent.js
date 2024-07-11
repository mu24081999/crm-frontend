import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/SidebarContact";
import Header from "./components/Header";
import RecordingList from "./components/RecordingList";
import SearchNumber from "./components/SearchNumber";
import { useDispatch, useSelector } from "react-redux";
import {
  CallLogsList,
  getAvailableNumbers,
  recordingsList,
} from "../../redux/services/calling";
import { useForm } from "react-hook-form";
import Pagination from "../../components/Pagination/Pagination";

const ContactsContent = () => {
  const [data, setData] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneNumbers_, setPhoneNumbers_] = useState([]);
  const [callRecordingsData, setCallRecordingsData] = useState([]);
  const [callRecordingsData_, setCallRecordingsData_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const { contacts } = useSelector((state) => state.contact);
  const { availableNumbers, recordings, callLogs } = useSelector(
    (state) => state.calling
  );
  const { token, accountSid, accountAuthToken, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (contacts.length > 0) {
      const filterData = contacts.filter(
        (contact) => contact.status !== "blocked"
      );
      setData(filterData);
    }
  }, [contacts]);
  useMemo(() => {
    setCallRecordingsData(recordings);
    setCallRecordingsData_(recordings);
  }, [recordings]);
  useEffect(() => {
    if (availableNumbers.length > 0) {
      setPhoneNumbers(availableNumbers);
      setPhoneNumbers_(availableNumbers);
    }
  }, [availableNumbers]);
  useEffect(() => {
    // dispatch(getAvailableNumbers(token));
    dispatch(
      recordingsList(token, {
        accountSid: accountSid,
        authToken: accountAuthToken,
      })
    );
    dispatch(
      CallLogsList(token, {
        accountSid: accountSid,
        authToken: accountAuthToken,
      })
    );
  }, [dispatch, token, accountSid, accountAuthToken]);
  const handleToggleEdit = (value) => {
    setIsEdit(value);
  };
  const handleDataFromPagination = (newData) => {
    console.log("🚀 ~ handleDataFromPagination ~ data:", newData);
    setCallRecordingsData(newData);
  };
  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="contactapp-content">
            {/* <Sidebar
              onSendData={handleReceiveData}
              contactsData={contacts}
              onToggleEdit={handleToggleEdit}
            /> */}
            {!isEdit && (
              <div className="contactapp-detail-wrap">
                <Header />

                <div className="contact-body">
                  <div data-simplebar className="nicescroll-bar">
                    <RecordingList
                      contactsData={phoneNumbers}
                      onToggleEdit={handleToggleEdit}
                      isEdit={isEdit}
                      recordingsData={callRecordingsData}
                      user={user}
                    />
                  </div>
                  <div>
                    <Pagination
                      itemsPerPage={20}
                      dataFromChild={handleDataFromPagination}
                      items={callRecordingsData_}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default ContactsContent;
