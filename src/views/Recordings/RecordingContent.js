import React, { useEffect, useState } from "react";
import Sidebar from "./components/SidebarContact";
import Header from "./components/Header";
import RecordingList from "./components/RecordingList";
import SearchNumber from "./components/SearchNumber";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvailableNumbers,
  recordingsList,
} from "../../redux/services/calling";
import { useForm } from "react-hook-form";

const ContactsContent = () => {
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
  console.log("🚀 ~ ContactsContent ~ recordings:", recordings);
  const { token, accountSid, accountAuthToken } = useSelector(
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
                    <div className="collapse" id="collapseQuick">
                      <div className="quick-access-form-wrap">
                        <form className="quick-access-form border">
                          <div className="row gx-3">
                            <div className="col-xxl-10">
                              <div className="position-relative">
                                <div className="dropify-square">
                                  <input type="file" className="dropify-1" />
                                </div>
                                <div className="col-md-12">
                                  <div className="row gx-3">
                                    <div className="col-lg-4">
                                      <div className="form-group">
                                        <input
                                          className="form-control"
                                          placeholder="First name*"
                                          value=""
                                          type="text"
                                        />
                                      </div>
                                      <div className="form-group">
                                        <input
                                          className="form-control"
                                          placeholder="Last name*"
                                          value=""
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-4">
                                      <div className="form-group">
                                        <input
                                          className="form-control"
                                          placeholder="Email Id*"
                                          value=""
                                          type="text"
                                        />
                                      </div>
                                      <div className="form-group">
                                        <input
                                          className="form-control"
                                          placeholder="Phone"
                                          value=""
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-4">
                                      <div className="form-group">
                                        <input
                                          className="form-control"
                                          placeholder="Department"
                                          value=""
                                          type="text"
                                        />
                                      </div>
                                      <div className="form-group">
                                        <select
                                          id="input_tags"
                                          className="form-control"
                                          multiple="multiple"
                                        >
                                          <option selected="selected">
                                            Collaborator
                                          </option>
                                          <option>Designer</option>
                                          <option selected="selected">
                                            Developer
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xxl-2">
                              <div className="form-group">
                                <button
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseExample"
                                  aria-expanded="false"
                                  className="btn btn-block btn-primary "
                                >
                                  Create New
                                </button>
                              </div>
                              <div className="form-group">
                                <button
                                  data-bs-toggle="collapse"
                                  disabled
                                  data-bs-target="#collapseExample"
                                  aria-expanded="false"
                                  className="btn btn-block btn-secondary"
                                >
                                  Discard
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <RecordingList
                      contactsData={phoneNumbers}
                      onToggleEdit={handleToggleEdit}
                      isEdit={isEdit}
                      recordingsData={recordings}
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
