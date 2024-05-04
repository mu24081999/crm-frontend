import React from "react";
import { readPost } from "../../../redux/slices/post";
import { FaArchive, FaEdit, FaStar, FaTrash, FaUser } from "react-icons/fa";

const Sidebar = ({
  onDataFromChild,
  dispatch,
  deletedPostsData,
  onDeletedDataFromChild,
  postData,
  archivedPostData,
  draftPostData,
  onBarDataFromChild,
  activeBar,
}) => {
  return (
    <nav className="blogapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <button
            onClick={() => {
              onDataFromChild("Create");
              dispatch(readPost(""));
            }}
            className="btn btn-primary btn-rounded btn-block mb-4"
          >
            Create Post
          </button>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className={`nav-item ${activeBar === "All" ? "active" : ""}`}>
                <button
                  className="nav-link btn-block "
                  onClick={() => {
                    onDataFromChild("List");
                    onBarDataFromChild("All");
                    onDeletedDataFromChild(postData);
                  }}
                >
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="users"></i> */}
                      <FaUser />
                    </span>
                  </span>
                  <span className="nav-link-text">Posts</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "Published" ? "active" : ""
                }`}
              >
                <button
                  className="nav-link btn-block"
                  onClick={() => {
                    onDataFromChild("List");
                    onBarDataFromChild("Published");
                    onDeletedDataFromChild(postData);
                  }}
                >
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="star"></i> */}
                      <FaStar />
                    </span>
                  </span>
                  <span className="nav-link-text">Published</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "Archived" ? "active" : ""
                }`}
              >
                <button
                  className="nav-link btn-block"
                  onClick={() => {
                    onDeletedDataFromChild(archivedPostData);
                    onBarDataFromChild("Archived");

                    onDataFromChild("List");
                  }}
                >
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="archive"></i> */}
                      <FaArchive />
                    </span>
                  </span>
                  <span className="nav-link-text">Archived</span>
                </button>
              </li>
              <li
                className={`nav-item ${activeBar === "Draft" ? "active" : ""}`}
              >
                <button
                  className="nav-link btn-block"
                  onClick={() => {
                    onDeletedDataFromChild(draftPostData);
                    onBarDataFromChild("Draft");
                    onDataFromChild("List");
                  }}
                >
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
                className={`nav-item ${
                  activeBar === "Deleted" ? "active" : ""
                }`}
              >
                <button
                  className="nav-link btn-block"
                  onClick={() => {
                    onDeletedDataFromChild(deletedPostsData);
                    onBarDataFromChild("Deleted");
                    onDataFromChild("List");
                  }}
                >
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="trash-2"></i> */}
                      <FaTrash />
                    </span>
                  </span>
                  <span className="nav-link-text">Deleted</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="menu-gap"></div>
          {/* <div className="nav-header">
            <span>Manage</span>
          </div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="flag"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Manage Post</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="grid"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Manage Categories</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="tag"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Manage Tags</span>
                </a>
              </li>
            </ul>
          </div> */}
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
                  <i data-feather="plus"></i>
                </span>
              </span>
            </a>
          </div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item">
                <a className="nav-link link-badge-right" href="/">
                  <span className="nav-link-text">Design</span>
                  <span className="badge badge-pill badge-sm badge-soft-secondary ms-auto">
                    136
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-badge-right" href="/">
                  <span className="nav-link-text">Development</span>
                  <span className="badge badge-pill badge-sm badge-soft-secondary ms-auto">
                    2
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-badge-right" href="/">
                  <span className="nav-link-text">User Interface</span>
                  <span className="badge badge-pill badge-sm badge-soft-secondary ms-auto">
                    86
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-badge-right" href="/">
                  <span className="nav-link-text">Business</span>
                  <span className="badge badge-pill badge-sm badge-soft-secondary ms-auto">
                    34
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="separator separator-light"></div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="title-sm text-primary mb-0">Tags</div>
            <a
              href="/"
              className="btn btn-xs btn-icon btn-rounded btn-light"
              data-bs-toggle="modal"
              data-bs-target="#add_new_tag"
            >
              <span
                className="icon"
                data-bs-toggle="tooltip"
                data-placement="top"
                title=""
                data-bs-original-title="Add Tag"
              >
                <span className="feather-icon">
                  <i data-feather="plus"></i>
                </span>
              </span>
            </a>
          </div>
          <div className="menu-group">
            <div className="tag-cloud">
              <a href="/" className="badge badge-outline badge-light">
                Collaboration
              </a>
              <a href="/" className="badge badge-outline badge-light">
                React Developer
              </a>
              <a href="/" className="badge badge-outline badge-light">
                Angular Developer
              </a>
              <a href="/" className="badge badge-outline badge-light">
                promotion
              </a>
              <a href="/" className="badge badge-outline badge-light">
                Advertisement
              </a>
            </div>
          </div> */}
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="blogapp-fixednav">
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
