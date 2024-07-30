import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./components/SidebarContact";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import CreateRegulatoryBundle from "./components/CreateRegulatoryBundle";
import { useDispatch, useSelector } from "react-redux";
import ContactDetails from "./components/ContactDetails";
import "./contact.css";
import ContactCards from "./components/ContactCards";
import { SocketContext } from "../../Context";
import { EditBulkContact } from "./components/EditBulkContact";
import { getBoardList } from "../../redux/services/board";
import { SmsBulk } from "./components/SmsBulk";
import { UploadCSVContact } from "./components/UploadCSVContact";
import Pagination from "../../components/Pagination/Pagination";
import { getUserBundlesList } from "../../redux/services/bundles";

const RegulatoryBundleContent = () => {
  const { showLeadDetails } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { token, user, user_id } = useSelector((state) => state.auth);
  const { contactDetails } = useSelector((state) => state.contact);
  const { bundles } = useSelector((state) => state.bundle);
  const [data, setData] = useState([]);
  const [data_, setData_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [view, setView] = useState("list");
  const { boards } = useSelector((state) => state.board);
  useEffect(() => {
    dispatch(getUserBundlesList(token, user_id));
  }, [dispatch, token, user_id]);
  useEffect(() => {
    setData(bundles);
    setData_(bundles);
  }, [bundles]);
  const handleReceiveData = (receivedData) => {
    setData(receivedData);
  };
  const handleToggleEdit = (value) => {
    // setIsEdit(value);
  };
  const handleViewDataFromHeader = (value) => {
    setView(value);
  };
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
            <Sidebar
              onSendData={handleReceiveData}
              onToggleEdit={handleToggleEdit}
            />
            {showLeadDetails && (
              <ContactDetails
                isEdit={isEdit}
                contactDetails={contactDetails}
                dispatch={dispatch}
                token={token}
                authUser={user}
              />
            )}

            {!showLeadDetails && (
              <div className="contactapp-detail-wrap">
                <Header
                  onDataFromChild={handleViewDataFromHeader}
                  activeBar={view}
                />
                <div
                  className="contact-body"
                  style={{ height: "100vh", overflow: "scroll" }}
                >
                  <div className="nicescroll-bar">
                    <ContactList
                      data={data}
                      onToggleEdit={handleToggleEdit}
                      isEdit={isEdit}
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
            {/* <!-- Edit Info --> */}
            <div
              id="add_new_bundle"
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
                      Create Regulatory Bundle
                    </span>
                    <button
                      type="button"
                      className="btn-close btn-light"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <CreateRegulatoryBundle />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Edit Info --> */}
            <div
              id="edit-bulk-contact"
              className="modal fade add-new-contact"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-md"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Bulk Action
                    </span>
                    <button
                      type="button"
                      className="btn-close btn-light"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <EditBulkContact
                      dispatch={dispatch}
                      token={token}
                      boards={boards}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              id="send-sms-bulk"
              className="modal fade add-new-contact"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-md"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Bulk Action
                    </span>
                    <button
                      type="button"
                      className="btn-close btn-light"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <SmsBulk
                      dispatch={dispatch}
                      token={token}
                      boards={boards}
                      authUser={user}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              id="upload_contact_csv"
              className="modal fade add-new-contact"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-md"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Bulk Action
                    </span>
                    <button
                      type="button"
                      className="btn-close btn-light"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <UploadCSVContact
                      dispatch={dispatch}
                      token={token}
                      boards={boards}
                      authUser={user}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default RegulatoryBundleContent;
