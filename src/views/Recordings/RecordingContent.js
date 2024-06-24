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

const ContactsContent = () => {
  const [data, setData] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneNumbers_, setPhoneNumbers_] = useState([]);
  const [callRecordingsData, setCallRecordingsData] = useState([]);
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
    const recordingsData = [];
    // for (let i = 0; i < callLogs.length; i++) {
    //   for (let x = 0; x < recordings.length; x++) {
    //     if (callLogs[i]?.sid === recordings[x]?.callSid) {
    //       var data = {
    //         ...recordings[x],
    //         fromNumber: callLogs[i].from,
    //         toNumber: callLogs[i].to,
    //         direction: callLogs[i].direction,
    //       };
    //       recordingsData.push(data);
    //     }
    //   }
    // }
    setCallRecordingsData(recordings);
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
  const handleReceiveData = (receivedData) => {
    setData(receivedData);
  };
  const handleToggleEdit = (value) => {
    setIsEdit(value);
  };
  const handleNumbersDataFromChild = (data) => {
    setIsSearch(data);
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
