import React, { useContext, useState } from "react";
import {
  FaArchive,
  FaBars,
  FaBook,
  FaEdit,
  FaFileDownload,
  FaPlus,
  FaPrint,
  FaStar,
  FaTrash,
  FaUpload,
  FaUserCheck,
  FaUserClock,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../Context";

const ContactSidebar = ({ onSendData, contactsData, onToggleEdit }) => {
  const { users } = useSelector((state) => state.user);
  const [activeBar, setActiveBar] = useState("all");
  const { handleToggleShowUserDetail } = useContext(SocketContext);

  const handleDeleteClick = () => {
    const data = contactsData.filter((cntct) => cntct.status === "blocked");
    setActiveBar("blocked");
    onSendData(data);
    handleToggleShowUserDetail(false);

    onToggleEdit(false);
  };
  const handleAllClick = () => {
    const filterData = contactsData;
    setActiveBar("all");
    // onToggleEdit(false);
    handleToggleShowUserDetail(false);

    onSendData(filterData);
  };
  const onImportantClick = () => {
    const filterData = users?.filter(
      (contact) => contact.status === "important"
    );
    setActiveBar("important");
    // onToggleEdit(false);
    handleToggleShowUserDetail(false);

    onSendData(filterData);
  };
  const handleActiveClick = () => {
    const filterData = contactsData?.filter(
      (contact) => contact.status === "active"
    );
    setActiveBar("active");
    // onToggleEdit(false);
    handleToggleShowUserDetail(false);

    onSendData(filterData);
  };
  const onArchiveClick = () => {
    const filterData = users?.filter(
      (contact) => contact.status === "archived"
    );
    setActiveBar("archived");
    // onToggleEdit(false);
    handleToggleShowUserDetail(false);

    onSendData(filterData);
  };
  const onPendingClick = () => {
    const filterData = users?.filter((contact) => contact.status === "pending");
    setActiveBar("pending");
    // onToggleEdit(false);
    handleToggleShowUserDetail(false);

    onSendData(filterData);
  };
  return (
    <nav className="contactapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <button
            type="button"
            className="btn btn-primary btn-rounded btn-block mb-4"
            data-bs-toggle="modal"
            data-bs-target="#add_new_contact"
          >
            Add new Client
          </button>
          <div className="menu-group p-1">
            <ul className="nav nav-light navbar-nav flex-column">
              <li
                id="all_contacts"
                className={`nav-item ${activeBar === "all" ? "active" : ""}`}
              >
                <button onClick={handleAllClick} className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="inbox"></i> */}
                      <FaUserClock />
                    </span>
                  </span>
                  <span className="nav-link-text">All Clients</span>
                </button>
              </li>

              <li
                className={`nav-item ${activeBar === "active" ? "active" : ""}`}
              >
                <button
                  id="deleted_contacts"
                  onClick={handleActiveClick}
                  className="nav-link btn-block"
                >
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="trash-2"></i> */}
                      <FaUserCheck />
                    </span>
                  </span>
                  <span className="nav-link-text">Active</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "blocked" ? "active" : ""
                }`}
              >
                <button
                  id="deleted_contacts"
                  onClick={handleDeleteClick}
                  className="nav-link btn-block"
                >
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="trash-2"></i> */}
                      <FaTrash />
                    </span>
                  </span>
                  <span className="nav-link-text">Blocked</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="contactapp-fixednav">
        <div className="hk-toolbar">
          <ul className="nav nav-light">
            <li className="nav-item nav-link">
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Settings"
                href="/"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="settings"></i>
                    <FaBars />
                  </span>
                </span>
              </a>
            </li>
            <li className="nav-item nav-link">
              <a
                href="/"
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Archive"
              >
                <span className="icon">
                  <span className="feather-icon">
                    {/* <i data-feather="archive"></i> */}
                    <FaArchive />
                  </span>
                </span>
              </a>
            </li>
            <li className="nav-item nav-link">
              <a
                href="/"
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Help"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="book"></i>
                    <FaBook />
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <!--/ Sidebar Fixnav--> */}
    </nav>
  );
};

export default ContactSidebar;
