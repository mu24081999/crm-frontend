import React from "react";
import { FaList, FaRecycle, FaRegIdCard } from "react-icons/fa";

const Header = ({ onDataFromChild, activeBar }) => {
  return (
    <header className="contact-header">
      <div className="d-flex align-items-center">
        <div className="dropdown">
          <a
            className="contactapp-title dropdown-toggle link-dark"
            role="button"
          >
            <h1>Subaccounts</h1>
          </a>
        </div>
      </div>
      <div className="contact-options-wrap">
        <a
          className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active"
          data-bs-toggle="dropdown"
        >
          <span className="icon">
            <span className="feather-icon">
              <FaList />
            </span>
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-end">
          <a
            className={`dropdown-item ${activeBar === "list" ? "active" : ""}`}
            onClick={() => onDataFromChild("list")}
          >
            <span className="feather-icon dropdown-icon">
              <FaList />
            </span>
            <span>List View</span>
          </a>
          <a
            className={`dropdown-item ${activeBar === "grid" ? "active" : ""}`}
            onClick={() => onDataFromChild("grid")}
          >
            <span className="feather-icon dropdown-icon">
              <FaRegIdCard />
            </span>
            <span>Grid View</span>
          </a>
        </div>
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret d-sm-inline-block d-none"
          // href="/"
          data-bs-toggle="tooltip"
          data-placement="top"
          title=""
          data-bs-original-title="Refresh"
        >
          <span className="icon">
            <span className="feather-icon">
              <FaRecycle />
            </span>
          </span>
        </a>
        <div className="v-separator d-lg-block d-none"></div>
        {/* <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret  d-lg-inline-block d-none  ms-sm-0"
          // href="/"
          data-bs-toggle="dropdown"
        >
          <span
            className="icon"
            data-bs-toggle="tooltip"
            data-placement="top"
            title=""
            data-bs-original-title="Manage Contact"
          >
            <span className="feather-icon">
              <FaCog />
            </span>
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-end">
          <a className="dropdown-item" href="/">
            Manage Contact
          </a>
          <a className="dropdown-item" href="/">
            Import
          </a>
          <a className="dropdown-item" href="/">
            Export
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/">
            Send Messages
          </a>
          <a className="dropdown-item" href="/">
            Delegate Access
          </a>
        </div>
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret d-lg-inline-block d-none"
          // href="/"
          data-bs-toggle="dropdown"
        >
          <span
            className="icon"
            data-bs-toggle="tooltip"
            data-placement="top"
            title=""
            data-bs-original-title="More"
          >
            <span className="feather-icon">
              <CiMenuKebab />
            </span>
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-end">
          <a className="dropdown-item" href="profile.html">
            <span className="feather-icon dropdown-icon">
              <FaStar />
            </span>
            <span>Stared Contacts</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <FaArchive />
            </span>
            <span>Archive Contacts</span>
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="email.html">
            <span className="feather-icon dropdown-icon">
              <FaUserSlash />
            </span>
            <span>Block Content</span>
          </a>
          <a className="dropdown-item" href="email.html">
            <span className="feather-icon dropdown-icon">
              <FaExternalLinkAlt />
            </span>
            <span>Feedback</span>
          </a>
        </div>
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-sm-inline-block d-none"
          // href="/"
          data-bs-toggle="tooltip"
          data-placement="top"
          title=""
          data-bs-original-title="Collapse"
        >
          <span className="icon">
            <span className="feather-icon">
              <FaChevronUp />
            </span>
            <span className="feather-icon d-none">
              <FaChevronDown />
            </span>
          </span>
        </a> */}
      </div>
      <div className="hk-sidebar-togglable"></div>
    </header>
  );
};

export default Header;
