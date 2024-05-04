import React from "react";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import {
  FaChevronDown,
  FaChevronUp,
  FaCloud,
  FaFolderPlus,
  FaList,
} from "react-icons/fa";

const Header = ({ onDataFromChild, view }) => {
  return (
    <header className="fm-header">
      <div className="d-flex align-items-center flex-grow-1">
        <a
          className="fmapp-title dropdown-toggle link-dark"
          data-bs-toggle="dropdown"
          href="/"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <h1>My Space</h1>
        </a>
        {/* <div className="dropdown-menu">
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="file"></i>
            </span>
            <span>All Files</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="file-plus"></i>
            </span>
            <span>Synced Files</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="upload-cloud"></i>
            </span>
            <span>Cloud Document</span>
          </a>
        </div> */}
        <form className="mx-3 flex-grow-1 mw-400p" role="search">
          <input
            type="text"
            className="form-control"
            placeholder="Search files and folders"
          />
        </form>
      </div>
      {/* <div className="fm-options-wrap">
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover disabled d-xl-inline-block d-none"
          href="/"
        >
          <span className="icon">
            <span className="feather-icon">
              <i data-feather="user-plus"></i>
            </span>
          </span>
        </a>
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover fmapp-info-toggle"
          href="/"
        >
          <span className="icon">
            <span className="feather-icon">
              <i data-feather="info"></i>
            </span>
          </span>
        </a>
        <div className="v-separator d-xl-inline-block d-none"></div>
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover ms-0 d-xl-inline-block d-none"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Add New Folder"
        >
          <span className="icon">
            <span className="feather-icon">
              <FaFolderPlus />
            </span>
          </span>
        </a>
        <a
          className="btn btn-icon btn-flush-dark btn-rounded btn-file flush-soft-hover  d-md-inline-block d-none"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Upload"
        >
          <span className="icon">
            <span className="feather-icon">
              <FaCloud />
            </span>
          </span>
        </a>
        <div className="v-separator d-lg-inline-block d-none"></div>
        <a
          className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active ms-lg-0 d-sm-inline-block d-none"
          href="/"
          data-bs-toggle="dropdown"
        >
          <span className="icon">
            <span className="feather-icon">
              <CiMenuBurger />
            </span>
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <button
            className={`dropdown-item ${view === "List" ? "active" : ""}`}
            onClick={() => onDataFromChild("List")}
          >
            <span className="feather-icon dropdown-icon">
              <FaList />
            </span>
            <span>List View</span>
          </button>
          <button
            className={`dropdown-item ${view === "Grid" ? "active" : ""}`}
            onClick={() => onDataFromChild("Grid")}
          >
            <span className="feather-icon dropdown-icon">
              <CiMenuFries />
            </span>
            <span>Grid View</span>
          </button>
        </div>
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-lg-inline-block d-none"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
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
        </a>
      </div> */}
      <div className="hk-sidebar-togglable"></div>
    </header>
  );
};

export default Header;
