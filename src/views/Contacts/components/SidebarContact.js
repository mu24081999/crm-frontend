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
  FaUserClock,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../Context";
import { ImBlocked } from "react-icons/im";

const ContactSidebar = ({ onSendData, contactsData, onToggleEdit }) => {
  const { contacts } = useSelector((state) => state.contact);
  const [activeBar, setActiveBar] = useState("all");
  const { handleToggleShowLeadDetail } = useContext(SocketContext);

  const handleDeleteClick = () => {
    const data = contactsData.filter((cntct) => cntct.status === "blocked");
    setActiveBar("blocked");
    onSendData(data);
    handleToggleShowLeadDetail(false);

    onToggleEdit(false);
  };
  const handleAllClick = () => {
    const filterData = contacts.filter(
      (contact) => contact.status !== "blocked" && contact.status !== "archived"
    );
    setActiveBar("all");
    // onToggleEdit(false);
    handleToggleShowLeadDetail(false);

    onSendData(filterData);
  };
  const onImportantClick = () => {
    const filterData = contacts.filter(
      (contact) => contact.status === "important"
    );
    setActiveBar("important");
    // onToggleEdit(false);
    handleToggleShowLeadDetail(false);

    onSendData(filterData);
  };
  const onArchiveClick = () => {
    const filterData = contacts.filter(
      (contact) => contact.status === "archived"
    );
    setActiveBar("archived");
    // onToggleEdit(false);
    handleToggleShowLeadDetail(false);

    onSendData(filterData);
  };
  const onPendingClick = () => {
    const filterData = contacts.filter(
      (contact) => contact.status === "pending"
    );
    setActiveBar("pending");
    // onToggleEdit(false);
    handleToggleShowLeadDetail(false);

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
            Add new contact
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
                  <span className="nav-link-text">All Contacts</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "important" ? "active" : ""
                }`}
              >
                <button
                  className="nav-link btn-block"
                  onClick={onImportantClick}
                >
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="star"></i> */}
                      <FaStar />
                    </span>
                  </span>
                  <span className="nav-link-text">Important</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "archived" ? "active" : ""
                }`}
              >
                <button className="nav-link btn-block" onClick={onArchiveClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="archive"></i> */}
                      <FaArchive />
                    </span>
                  </span>
                  <span className="nav-link-text">Archive</span>
                </button>
              </li>
              {/* <li
                className={`nav-item ${
                  activeBar === "pending" ? "active" : ""
                }`}
              >
                <a className="nav-link" onClick={onPendingClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <FaEdit />
                    </span>
                  </span>
                  <span className="nav-link-text">Pending</span>
                </a>
              </li> */}
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
                      <ImBlocked />
                    </span>
                  </span>
                  <span className="nav-link-text">Blocked</span>
                </button>
              </li>
            </ul>
          </div>
          {/* <div className="separator separator-light"></div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <FaUpload />
                    </span>
                  </span>
                  <span className="nav-link-text">Export</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <FaFileDownload />
                    </span>
                  </span>
                  <span className="nav-link-text">Import</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <FaPrint />
                    </span>
                  </span>
                  <span className="nav-link-text">Print</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="separator separator-light"></div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="title-sm text-primary mb-0">Labels</div>
            <a
              href="/"
              className="btn btn-xs btn-icon btn-rounded btn-light"
              data-bs-toggle="modal"
              data-bs-target="#add_new_label"
            >
              <span
                className="icon"
                data-bs-toggle="tooltip"
                data-placement="top"
                title=""
                data-bs-original-title="Add Label"
              >
                <span className="feather-icon">
                  <FaPlus />
                </span>
              </span>
            </a>
          </div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item">
                <a className="nav-link link-badge-right" href="/">
                  <span className="nav-link-text">Design</span>
                  <span className="badge badge-pill badge-sm badge-soft-primary ms-auto">
                    136
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-badge-right" href="/">
                  <span className="nav-link-text">Development</span>
                  <span className="badge badge-pill badge-sm badge-soft-primary ms-auto">
                    2
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-badge-right" href="/">
                  <span className="nav-link-text">Inventory</span>
                  <span className="badge badge-pill badge-sm badge-soft-primary ms-auto">
                    86
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-badge-right" href="/">
                  <span className="nav-link-text">Human Resource</span>
                  <span className="badge badge-pill badge-sm badge-soft-primary ms-auto">
                    34
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="separator separator-light"></div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="title-sm text-primary mb-0">Tags</div>
            <a
              href="/"
              className="btn btn-xs btn-icon btn-rounded btn-light"
              data-bs-toggle="modal"
              data-bs-target="#add_new_tag"
            >
              <span
                className="icon"
                data-bs-toggle="tooltip"
                data-placement="top"
                title=""
                data-bs-original-title="Add Tag"
              >
                <span className="feather-icon">
                  <FaPlus />
                </span>
              </span>
            </a>
          </div>
          <div className="tag-cloud">
            <a href="/" className="badge badge-outline badge-light">
              Collaboration
            </a>
            <a href="/" className="badge badge-outline badge-light">
              React Developer
            </a>
            <a href="/" className="badge badge-outline badge-light">
              Angular Developer
            </a>
            <a href="/" className="badge badge-outline badge-light">
              promotion
            </a>
            <a href="/" className="badge badge-outline badge-light">
              Advertisement
            </a>
          </div> */}
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="contactapp-fixednav">
        <div className="hk-toolbar">
          {/* <ul className="nav nav-light">
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
          </ul> */}
        </div>
      </div>
      {/* <!--/ Sidebar Fixnav--> */}
    </nav>
  );
};

export default ContactSidebar;
