import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import {
  FaArchive,
  FaChevronDown,
  FaChevronUp,
  FaCog,
  FaExternalLinkAlt,
  FaList,
  FaRecycle,
  FaRegIdCard,
  FaStar,
  FaUserSlash,
} from "react-icons/fa";

const Header = ({ onDataFromChild, activeBar }) => {
  return (
    <header className="contact-header">
      <div className="d-flex align-items-center">
        <div className="dropdown">
          <a
            className="contactapp-title dropdown-toggle link-dark"
            // data-bs-toggle="dropdown"
            // href="/"
            role="button"
            // aria-haspopup="true"
            // aria-expanded="false"
          >
            <h1>Users</h1>
          </a>
          {/* <div className="dropdown-menu">
            <a className="dropdown-item" href="/">
              <span className="feather-icon dropdown-icon">
                <i data-feather="users"></i>
              </span>
              <span>All Users</span>
            </a>
            <a className="dropdown-item" href="/">
              <span className="feather-icon dropdown-icon">
                <i data-feather="star"></i>
              </span>
              <span>Important</span>
            </a>
            <a className="dropdown-item" href="/">
              <span className="feather-icon dropdown-icon">
                <i data-feather="archive"></i>
              </span>
              <span>Archive</span>
            </a>
            <a className="dropdown-item" href="/">
              <span className="feather-icon dropdown-icon">
                <i data-feather="edit"></i>
              </span>
              <span>Pending</span>
            </a>
            <a className="dropdown-item" href="/">
              <span className="feather-icon dropdown-icon">
                <i data-feather="trash-2"></i>
              </span>
              <span>Deleted</span>
            </a>
          </div> */}
        </div>
        {/* <div className="dropdown ms-3">
          <button
            className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block d-none"
            data-bs-toggle="dropdown"
          >
            Create New
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="/">
              Add New Contact
            </a>
            <a className="dropdown-item" href="/">
              Add New Department
            </a>
            <a className="dropdown-item" href="/">
              Add Category
            </a>
            <a className="dropdown-item" href="/">
              Add New Tag
            </a>
          </div>
        </div> */}
      </div>
      <div className="contact-options-wrap">
        <a
          className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active"
          // href="/"
          data-bs-toggle="dropdown"
        >
          <span className="icon">
            <span className="feather-icon">
              {/* <i data-feather="list"></i> */}
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
              {/* <i data-feather="list"></i> */}
              <FaList />
            </span>
            <span>List View</span>
          </a>
          <a
            className={`dropdown-item ${activeBar === "grid" ? "active" : ""}`}
            onClick={() => onDataFromChild("grid")}
          >
            <span className="feather-icon dropdown-icon">
              {/* <i data-feather="grid"></i> */}
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
              {/* <i data-feather="refresh-cw"></i> */}
              <FaRecycle />
            </span>
          </span>
        </a>
        <div className="v-separator d-lg-block d-none"></div>
        <a
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
              {/* <i data-feather="settings"></i> */}
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
              {/* <i data-feather="more-vertical"></i> */}
              <CiMenuKebab />
            </span>
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-end">
          <a className="dropdown-item" href="profile.html">
            <span className="feather-icon dropdown-icon">
              {/* <i data-feather="star"></i> */}
              <FaStar />
            </span>
            <span>Stared Contacts</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              {/* <i data-feather="archive"></i> */}
              <FaArchive />
            </span>
            <span>Archive Contacts</span>
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="email.html">
            <span className="feather-icon dropdown-icon">
              {/* <i data-feather="slash"></i> */}
              <FaUserSlash />
            </span>
            <span>Block Content</span>
          </a>
          <a className="dropdown-item" href="email.html">
            <span className="feather-icon dropdown-icon">
              {/* <i data-feather="external-link"></i> */}
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
              {/* <i data-feather="chevron-up"></i> */}
              <FaChevronUp />
            </span>
            <span className="feather-icon d-none">
              {/* <i data-feather="chevron-down"></i> */}
              <FaChevronDown />
            </span>
          </span>
        </a>
      </div>
      <div className="hk-sidebar-togglable"></div>
    </header>
  );
};

export default Header;
