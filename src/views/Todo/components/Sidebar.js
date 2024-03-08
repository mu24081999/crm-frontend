import React from "react";

const Sidebar = () => {
  return (
    <nav class="todoapp-sidebar">
      <div data-simplebar class="nicescroll-bar">
        <div class="menu-content-wrap">
          <button
            class="btn btn-primary btn-rounded btn-block mb-4"
            data-bs-toggle="modal"
            data-bs-target="#add_new_task"
          >
            Add Task
          </button>
          <div class="menu-group">
            <ul class="nav nav-light navbar-nav flex-column">
              <li class="nav-item active">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      <i data-feather="layout"></i>
                    </span>
                  </span>
                  <span class="nav-link-text">Overview</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      <i data-feather="list"></i>
                    </span>
                  </span>
                  <span class="nav-link-text">My Tasks</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      <i data-feather="calendar"></i>
                    </span>
                  </span>
                  <span class="nav-link-text">Files</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      <i data-feather="file"></i>
                    </span>
                  </span>
                  <span class="nav-link-text">Activity</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="separator separator-light"></div>
          <div class="title-sm text-primary">Priority</div>
          <div class="menu-group">
            <ul class="nav nav-light navbar-nav flex-column">
              <li class="nav-item">
                <a class="nav-link link-with-badge" href="/">
                  <span class="badge badge-danger badge-indicator badge-indicator-lg me-2"></span>
                  <span class="nav-link-text">Urgent</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link link-with-badge" href="/">
                  <span class="badge badge-orange badge-indicator badge-indicator-lg me-2"></span>
                  <span class="nav-link-text">High</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link link-with-badge" href="/">
                  <span class="badge badge-yellow badge-indicator badge-indicator-lg me-2"></span>
                  <span class="nav-link-text">Medium</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link link-with-badge" href="/">
                  <span class="badge badge-gold badge-indicator badge-indicator-lg me-2"></span>
                  <span class="nav-link-text">Low</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div class="todoapp-fixednav">
        <div class="hk-toolbar">
          <ul class="nav nav-light">
            <li class="nav-item nav-link">
              <a
                class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Settings"
                href="/"
              >
                <span class="icon">
                  <span class="feather-icon">
                    <i data-feather="settings"></i>
                  </span>
                </span>
              </a>
            </li>
            <li class="nav-item nav-link">
              <a
                href="/"
                class="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Archive"
              >
                <span class="icon">
                  <span class="feather-icon">
                    <i data-feather="archive"></i>
                  </span>
                </span>
              </a>
            </li>
            <li class="nav-item nav-link">
              <a
                href="/"
                class="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Help"
              >
                <span class="icon">
                  <span class="feather-icon">
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
