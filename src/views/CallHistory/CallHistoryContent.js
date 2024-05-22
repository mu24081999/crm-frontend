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

const CallHistoryContent = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const [data, setData] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneNumbers_, setPhoneNumbers_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const { contacts } = useSelector((state) => state.contact);
  const { availableNumbers, recordings } = useSelector(
    (state) => state.calling
  );
  const { token, accountSid, accountAuthToken } = useSelector(
    (state) => state.auth
  );
  const { callLogs, isLoading } = useSelector((state) => state.calling);

  const dispatch = useDispatch();
  useMemo(() => {
    dispatch(
      CallLogsList(token, {
        accountSid: accountSid,
        authToken: accountAuthToken,
      })
    );
  }, [token, dispatch, accountAuthToken, accountSid]);
  useEffect(() => {
    if (callLogs.length > 0) {
      setData(callLogs);
    }
  }, [callLogs]);
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
                      recordingsData={data}
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

export default CallHistoryContent;
