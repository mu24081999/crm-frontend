import React from "react";

const Header = () => {
  return (
    <header className="gallery-header">
      <div className="d-flex align-items-center flex-grow-1">
        <a
          className="galleryapp-title dropdown-toggle link-dark"
          data-bs-toggle="dropdown"
          href="/"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <h1>Media Gallery</h1>
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="hard-drive"></i>
            </span>
            <span>Gallery</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="folder"></i>
            </span>
            <span>Collections</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="upload"></i>
            </span>
            <span>Shared with me</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="star"></i>
            </span>
            <span>Favorite</span>
          </a>
        </div>
        <form className="mx-3 flex-grow-1 mw-400p" role="search">
          <input
            type="text"
            className="form-control"
            placeholder="Search media by Name"
          />
        </form>
      </div>
      <div className="gallery-options-wrap">
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-file-download disabled d-xl-inline-block d-none"
          href="/"
        >
          <span className="icon">
            <span className="feather-icon">
              <i data-feather="download"></i>
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
              <i data-feather="folder-plus"></i>
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
              <i data-feather="upload-cloud"></i>
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
              <i data-feather="list"></i>
            </span>
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item active" href="file-manager-list.html">
            <span className="feather-icon dropdown-icon">
              <i data-feather="list"></i>
            </span>
            <span>List View</span>
          </a>
          <a className="dropdown-item" href="file-manager-grid.html">
            <span className="feather-icon dropdown-icon">
              <i data-feather="grid"></i>
            </span>
            <span>Grid View</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="server"></i>
            </span>
            <span>Compact View</span>
          </a>
        </div>
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Collapse"
        >
          <span className="icon">
            <span className="feather-icon">
              <i data-feather="chevron-up"></i>
            </span>
            <span className="feather-icon d-none">
              <i data-feather="chevron-down"></i>
            </span>
          </span>
        </a>
      </div>
      <div className="hk-sidebar-togglable"></div>
    </header>
  );
};

export default Header;
