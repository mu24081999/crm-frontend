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

const CallHistoryContent = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const [data, setData] = useState([]);
  const [data_, setData_] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneNumbers_, setPhoneNumbers_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const { availableNumbers, callLogs, recordings } = useSelector(
    (state) => state.calling
  );
  const { token, accountSid, accountAuthToken, user } = useSelector(
    (state) => state.auth
  );
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
    setData(callLogs);
    setData_(callLogs);
  }, [callLogs, recordings]);

  const handleDataFromPagination = (newData) => {
    console.log("🚀 ~ handleDataFromPagination ~ data:", newData);
    setData(newData);
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
                  <div
                    className="border border-success"
                    style={{ overflow: "scroll", maxHeight: "98%" }}
                  >
                    <RecordingList
                      contactsData={phoneNumbers}
                      isEdit={isEdit}
                      recordingsData={data}
                      dispatch={dispatch}
                      token={token}
                      user={user}
                    />
                    <div>
                      <Pagination
                        itemsPerPage={20}
                        dataFromChild={handleDataFromPagination}
                        items={data_}
                      />
                    </div>
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
