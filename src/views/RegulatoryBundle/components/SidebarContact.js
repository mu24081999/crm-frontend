import React, { useContext, useState } from "react";
import { FaArchive, FaStar, FaUserClock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../Context";
import { ImBlocked } from "react-icons/im";

const ContactSidebar = ({ onSendData, contactsData, onToggleEdit }) => {
  const { contacts } = useSelector((state) => state.contact);
  const [activeBar, setActiveBar] = useState("all");
  const { handleToggleShowLeadDetail } = useContext(SocketContext);

  return (
    <nav className="contactapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <button
            type="button"
            className="btn btn-primary btn-rounded btn-block mb-4"
            data-bs-toggle="modal"
            data-bs-target="#add_new_bundle"
          >
            Add new bundle
          </button>
          <div className="menu-group p-1">
            <ul className="nav nav-light navbar-nav flex-column">
              <li
                id="all_contacts"
                className={`nav-item ${activeBar === "all" ? "active" : ""}`}
              >
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <FaUserClock />
                    </span>
                  </span>
                  <span className="nav-link-text">All Bundles</span>
                </button>
              </li>
              {/* <li
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
                      <FaArchive />
                    </span>
                  </span>
                  <span className="nav-link-text">Archive</span>
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
                      <ImBlocked />
                    </span>
                  </span>
                  <span className="nav-link-text">Blocked</span>
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ContactSidebar;
