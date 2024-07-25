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
      </div>
      <div className="hk-sidebar-togglable"></div>
    </header>
  );
};

export default Header;
