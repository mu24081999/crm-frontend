import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./components/SidebarContact";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContactList from "./components/AddContactList";
import { useDispatch, useSelector } from "react-redux";
import ContactDetails from "./components/ContactDetails";
import "./contact.css";
import ContactCards from "./components/ContactCards";
import { SocketContext } from "../../../Context";
import { getUsers } from "../../../redux/services/users";
import _ from "lodash";
const SubaccountContent = () => {
  const { handleToggleShowLeadDetail, showUserDetails } =
    useContext(SocketContext);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [data_, setData_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [view, setView] = useState("list");
  const { users, userDetails } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (users?.length > 0) {
      const filteredData = users?.filter(
        (usr) =>
          usr.status === "active" &&
          usr.role === "USER" &&
          usr.parent_id !== null &&
          usr.client_id === null
      );
      const allFilteredData = users?.filter(
        (usr) =>
          usr.role === "USER" &&
          usr.parent_id !== null &&
          usr.client_id === null
      );

      setData(filteredData);
      setData_(allFilteredData);
    }
  }, [users, user]);
  const handleReceiveData = (receivedData) => {
    setData(receivedData);
  };
  const handleToggleEdit = (value) => {
    // setIsEdit(value);
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
                isEdit={isEdit}
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
                        allUsers={users}
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
              id="add_new_contact"
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
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Create New Client
                    </span>
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

export default SubaccountContent;
