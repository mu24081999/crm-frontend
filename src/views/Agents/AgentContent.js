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
import _ from "lodash";
import UpdateAgentInfo from "./components/UpdateAgentInfo";
import { getSubscriptionsList } from "../../redux/services/subscription";
const AgentContent = () => {
  const { checkLastFetchedValid, showUserDetails } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { subscriptions } = useSelector((state) => state.subscription);
  const [data, setData] = useState([]);
  const [parentAccount, setParentAccount] = useState({});
  const [parentSubscription, setParentSubscription] = useState({});
  const [limitAgentAccounts, setLimitAgentAccounts] = useState(null);
  const [data_, setData_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [view, setView] = useState("list");
  const {
    users,
    userDetails,
    lastFetched: userLastFetched,
  } = useSelector((state) => state.user);
  useEffect(() => {
    // dispatch(getUsers(token));
    dispatch(getSubscriptionsList(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (users?.length > 0) {
      const filteredData = users?.filter(
        (usr) =>
          // usr.status === "active" &&
          usr.role === "AGENT" && _.toInteger(usr.client_id) === user.id
      );
      const parent = users?.filter(
        (usr) => usr.id === _.toInteger(user?.parent_id)
      )[0];
      setParentAccount(parent);
      setData(filteredData);
      setData_(filteredData);
    }
  }, [users, user]);
  useEffect(() => {
    const parentSubscription = subscriptions?.filter(
      (sub) => sub.customer_id === parentAccount?.id
    )[0];
    setParentSubscription(parentSubscription);
  }, [subscriptions, parentAccount]);
  useEffect(() => {
    switch (parentSubscription?.plan) {
      case "Solo Starter":
        setLimitAgentAccounts(1);
        break;
      case "Growth":
        setLimitAgentAccounts(3);
        break;
      case "Enterprise":
        setLimitAgentAccounts(1000);
        break;
      default:
        setLimitAgentAccounts(0);
        break;
    }
  }, [parentSubscription, user]);
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
            {/* <!-- Add Info --> */}
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
                  {data?.length > limitAgentAccounts ? (
                    <div className="modal-body p-0">
                      <p className="alert alert-warning m-0">
                        You have exeeded your limit
                      </p>
                    </div>
                  ) : (
                    <div className="modal-body">
                      <AddContactList />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <!-- /Add Info --> */}
            {/* <!-- Edit Info --> */}
            <div
              id="update_agent_info"
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
                        Update Agent
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
                    <UpdateAgentInfo agentDetails={userDetails} />
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
