import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./components/SidebarContact";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContactList from "./components/AddContactList";
import { useDispatch, useSelector } from "react-redux";
import ContactDetails from "./components/ContactDetails";
import "./contact.css";
import ContactCards from "./components/ContactCards";
import { SocketContext } from "../../Context";
import { getUsers } from "../../redux/services/users";
import { MdClose } from "react-icons/md";
import { getAgentsList } from "../../redux/services/agent";
import _ from "lodash";
const AgentContent = () => {
  const { handleToggleShowLeadDetail, showUserDetails } =
    useContext(SocketContext);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { contactDetails } = useSelector((state) => state.contact);
  const [data, setData] = useState([]);
  const [data_, setData_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [view, setView] = useState("list");
  const { contacts } = useSelector((state) => state.contact);
  const { users, userDetails } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (users?.length > 0) {
      const filteredData = users?.filter(
        (usr) =>
          usr.status === "active" &&
          usr.role === "AGENT" &&
          _.toInteger(usr.client_id) === user.id
      );
      setData(filteredData);
      setData_(filteredData);
    }
  }, [users, user]);
  const handleReceiveData = (receivedData) => {
    setData(receivedData);
  };
  const handleToggleEdit = (value) => {
    setIsEdit(value);
  };
  const handleViewDataFromHeader = (value) => {
    setView(value);
  };

  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="contactapp-content">
            <Sidebar
              onSendData={handleReceiveData}
              contactsData={data_}
              onToggleEdit={handleToggleEdit}
            />
            {showUserDetails && (
              <ContactDetails
                isEdit={showUserDetails}
                contactDetails={userDetails}
                dispatch={dispatch}
                token={token}
                authUser={user}
              />
            )}

            {!showUserDetails && (
              <div className="contactapp-detail-wrap">
                <Header
                  onDataFromChild={handleViewDataFromHeader}
                  activeBar={view}
                />
                <div className="contact-body">
                  <div className="nicescroll-bar">
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

                    {view === "list" ? (
                      <ContactList
                        usersData={data}
                        onToggleEdit={handleToggleEdit}
                        isEdit={isEdit}
                      />
                    ) : (
                      <ContactCards
                        contactsData={data}
                        onToggleEdit={handleToggleEdit}
                        isEdit={isEdit}
                        dispatch={dispatch}
                        token={token}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* <!-- Edit Info --> */}
            <div
              id="add_new_agent"
              className="modal fade add-new-contact"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <div className="modal-title">
                      <p className="fs-6 fw-bold" style={{ color: "white" }}>
                        Create New Agent
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <AddContactList />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Edit Info --> */}
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default AgentContent;
