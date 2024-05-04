import React, { useState } from "react";
import {
  FaArchive,
  FaCheckSquare,
  FaEdit,
  FaInbox,
  FaPlus,
  FaStar,
  FaTrash,
} from "react-icons/fa";

const Sidebar = ({ onDataFromChild, initialData, authUser }) => {
  const [activeBar, setActiveBar] = useState("inbox");
  const onSentClick = () => {
    const data = initialData?.filter(
      (email) => email.sender.id === authUser.id
    );
    onDataFromChild(data);
    setActiveBar("sent");
  };
  const onTrashClick = () => {
    const data = initialData?.filter((email) => email.status === "blocked");
    onDataFromChild(data);
    setActiveBar("trash");
  };
  const onArchiveClick = () => {
    const data = initialData?.filter((email) => email.status === "archive");
    onDataFromChild(data);
    setActiveBar("archive");
  };
  const onImportantClick = () => {
    const data = initialData?.filter((email) => email.status === "important");
    onDataFromChild(data);
    setActiveBar("important");
  };
  const onInboxClick = () => {
    const data = initialData?.filter(
      (email) =>
        (email?.status === "active" && email?.reciever?.id === authUser?.id) ||
        (email?.status === "important" && email?.reciever?.id === authUser?.id)
    );
    onDataFromChild(data);
    setActiveBar("inbox");
  };
  return (
    <nav className="emailapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <button
            type="button"
            className="btn btn-primary btn-rounded btn-block mb-4 show-compose-popup"
            id="show_compose_popup"
          >
            Compose email
          </button>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li
                className={`nav-item ${activeBar === "inbox" ? "active" : ""}`}
              >
                <button className="nav-link btn-block" onClick={onInboxClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="inbox"></i> */}

                      <FaInbox />
                    </span>
                  </span>
                  <span className="nav-link-text">Inbox</span>
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
                className={`nav-item ${activeBar === "sent" ? "active" : ""}`}
              >
                <button className="nav-link btn-block" onClick={onSentClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="send"></i> */}
                      <FaCheckSquare />
                    </span>
                  </span>
                  <span className="nav-link-text">Sent</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "archive" ? "active" : ""
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
              <li
                className={`nav-item ${activeBar === "draft" ? "active" : ""}`}
              >
                <button className="nav-link btn-block" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="edit"></i> */}
                      <FaEdit />
                    </span>
                  </span>
                  <span className="nav-link-text">Draft</span>
                </button>
              </li>
              <li
                className={`nav-item ${activeBar === "trash" ? "active" : ""}`}
              >
                <button className="nav-link btn-block" onClick={onTrashClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="trash-2"></i> */}
                      <FaTrash />
                    </span>
                  </span>
                  <span className="nav-link-text">Trash</span>
                </button>
              </li>
            </ul>
          </div>
          {/* <div className="separator separator-light"></div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="title-sm text-primary mb-0">Categories</div>
            <a
              href="/"
              className="btn btn-xs btn-icon btn-rounded btn-light"
              data-bs-toggle="modal"
              data-bs-target="#add_new_cat"
            >
              <span
                className="icon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Add Category"
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
                <a className="nav-link" href="/">
                  <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>
                  <span className="nav-link-text">Team</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="badge badge-success badge-indicator badge-indicator-lg me-2"></span>
                  <span className="nav-link-text">Support</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="badge badge-orange badge-indicator badge-indicator-lg me-2"></span>
                  <span className="nav-link-text">Updates</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="badge badge-pink badge-indicator badge-indicator-lg me-2"></span>
                  <span className="nav-link-text">Primary</span>
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      {/* <div className="emailapp-fixednav">
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
                    <i data-feather="archive"></i>
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
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div> */}
      {/* <!--/ Sidebar Fixnav--> */}
    </nav>
  );
};

export default Sidebar;
