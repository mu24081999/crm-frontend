import React from "react";

const Header = () => {
  return (
    <header className="blog-header">
      <div className="d-flex align-items-center">
        <a className="blogapp-title link-dark" href="/">
          <h1>Add New Post</h1>
        </a>
      </div>
      <div className="blog-options-wrap">
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
          href="/"
          data-bs-toggle="dropdown"
        >
          <span className="icon">
            <span className="feather-icon">
              <i data-feather="more-vertical"></i>
            </span>
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-end">
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="users"></i>
            </span>
            <span>Posts</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="settings"></i>
            </span>
            <span>Settings</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="slash"></i>
            </span>
            <span>Block Content</span>
          </a>
          <a className="dropdown-item" href="/">
            <span className="feather-icon dropdown-icon">
              <i data-feather="external-link"></i>
            </span>
            <span>Feedback</span>
          </a>
        </div>
        <a
          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-sm-inline-block d-none"
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
