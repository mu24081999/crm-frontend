import React from "react";
import { storeFile } from "../../../redux/services/gallery";

const Sidebar = ({ dispatch, token, authUser }) => {
  const handleFileOnChange = (file) => {
    console.log("🚀 ~ handleFileOnChange ~ file:", file.currentTarget.files);
    const formData = new FormData();
    // Loop through each file and append it to the FormData object
    for (let i = 0; i < file.target.files.length; i++) {
      formData.append("files", file.target.files[i]);
    }
    formData.append("user_id", authUser.id);
    formData.append("user_name", authUser.name);
    dispatch(storeFile(token, formData));
    return {};
  };
  return (
    <nav className="galleryapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <div className="btn btn-primary btn-rounded btn-block btn-file mb-4">
            Upload Images
            <input
              type="file"
              className="upload"
              onChange={handleFileOnChange}
            />
          </div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="hard-drive"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Gallery</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="folder"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Collections</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="upload"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Shared with me</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Favorite</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="trash-2"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Trash</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="separator separator-light"></div>
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
                  <i data-feather="plus"></i>
                </span>
              </span>
            </a>
          </div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-link-text">Images</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-link-text">Videos</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-link-text">Audio</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="galleryapp-fixednav">
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
      </div>
      {/* <!--/ Sidebar Fixnav--> */}
    </nav>
  );
};

export default Sidebar;
