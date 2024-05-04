import React from "react";
import { storeFile } from "../../../redux/services/gallery";
import { FaFileAlt, FaGoogleDrive } from "react-icons/fa";

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
    <nav className="fmapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          {/* <div className="btn btn-primary btn-rounded btn-block btn-file mb-4">
            Upload
            <input
              type="file"
              className="upload"
              onChange={handleFileOnChange}
            />
          </div> */}
          {/* 
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item active">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <FaGoogleDrive />
                    </span>
                  </span>
                  <span className="nav-link-text">My Space</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <FaFileAlt />
                    </span>
                  </span>
                  <span className="nav-link-text">All Files</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="folder"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Folders</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="upload"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Shared</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Starred</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="trash-2"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Trash</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="separator separator-light"></div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="image"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Images</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="video"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Videos</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="play"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Audio</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="file-text"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Documents</span>
                </button>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      <div className="fmapp-storage">
        <p className="p-sm">
          Storage is 85% full. 78.5 GB of 1 TB used. You can buy more space.
        </p>
        <div className="progress-lb-wrap my-2">
          <label className="progress-label text-uppercase fs-8 fw-medium">
            78.5 GB of 1 TB
          </label>
          <div className="progress progress-bar-rounded progress-bar-xs">
            <div
              className="progress-bar bg-danger w-85"
              role="progressbar"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        <a className="fs-7">
          <u>Buy Storage</u>
        </a>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="fmapp-fixednav">
        <div className="hk-toolbar">
          <ul className="nav nav-light">
            <li className="nav-item nav-link">
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Settings"
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
