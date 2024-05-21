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
        <span className="fs-5 fw-bold">Contacts</span>
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
        <div className="v-separator d-lg-block d-none"></div>

        {/* <a
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
      {/* <div className="hk-sidebar-togglable"></div> */}
    </header>
  );
};

export default Header;
