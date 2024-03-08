import React from "react";

const Gunt = () => {
  return (
    <div className="hk-pg-wrapper pb-0">
      <div className="todoapp-wrap ganttapp-wrap">
        <nav className="todoapp-sidebar">
          <div data-simplebar className="nicescroll-bar">
            <div className="menu-content-wrap">
              <button
                className="btn btn-primary btn-rounded btn-block mb-4"
                data-bs-toggle="modal"
                data-bs-target="#add_new_task"
              >
                Add Task
              </button>
              <div className="menu-group">
                <ul className="nav nav-light navbar-nav flex-column">
                  <li className="nav-item active">
                    <a className="nav-link" href="javascript:void(0);">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="git-pull-request"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Gantt</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(0);">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="list"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">My Tasks</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(0);">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="calendar"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Calendar</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(0);">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="file"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Files</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(0);">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="activity"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Activity</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="separator separator-light"></div>
              <div className="title-sm text-primary">Priority</div>
              <div className="menu-group">
                <ul className="nav nav-light navbar-nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link link-with-badge" href="#">
                      <span className="badge badge-danger badge-indicator badge-indicator-lg me-2"></span>
                      <span className="nav-link-text">Urgent</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link link-with-badge" href="#">
                      <span className="badge badge-orange badge-indicator badge-indicator-lg me-2"></span>
                      <span className="nav-link-text">High</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link link-with-badge" href="#">
                      <span className="badge badge-yellow badge-indicator badge-indicator-lg me-2"></span>
                      <span className="nav-link-text">Medium</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link link-with-badge" href="#">
                      <span className="badge badge-gold badge-indicator badge-indicator-lg me-2"></span>
                      <span className="nav-link-text">Low</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="separator separator-light"></div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="title-sm text-primary mb-0">Projects</div>
                <a
                  href="#"
                  className="btn btn-xs btn-icon btn-rounded btn-light"
                  data-bs-toggle="modal"
                  data-bs-target="#add_proj_board"
                >
                  <span
                    className="icon"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Add Project"
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
                    <div>
                      <div className="media d-flex align-items-center">
                        <div className="media-head me-2">
                          <div className="avatar avatar-xs avatar-primary avatar-rounded">
                            <span className="initial-wrap">J</span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="name">Jampack</div>
                          </div>
                        </div>
                      </div>
                      <div className="ms-auto">
                        <button className="btn btn-sm btn-icon btn-rounded btn-flush-light flush-soft-hover">
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="lock"></i>
                            </span>
                          </span>
                        </button>
                        <button className="btn btn-sm btn-icon btn-rounded btn-flush-light flush-soft-hover">
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-vertical"></i>
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div>
                      <div className="media d-flex align-items-center">
                        <div className="media-head me-2">
                          <div className="avatar avatar-xs avatar-pink avatar-rounded">
                            <span className="initial-wrap">H</span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="name">Hencework</div>
                          </div>
                        </div>
                      </div>
                      <div className="ms-auto">
                        <button className="btn btn-sm btn-icon btn-rounded btn-flush-light flush-soft-hover">
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="globe"></i>
                            </span>
                          </span>
                        </button>
                        <button className="btn btn-sm btn-icon btn-rounded btn-flush-light flush-soft-hover">
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-vertical"></i>
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!--Sidebar Fixnav--> */}
          <div className="todoapp-fixednav">
            <div className="hk-toolbar">
              <ul className="nav nav-light">
                <li className="nav-item nav-link">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Settings"
                    href="#"
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
                    href="#"
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
                    href="#"
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
        <div className="todoapp-content">
          <div className="todoapp-detail-wrap">
            <header className="todo-header">
              <div className="d-flex align-items-center flex-1">
                <div className="d-flex">
                  <a className="todoapp-title link-dark" href="#">
                    <h1>
                      Jampack
                      <span className="task-star marked">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                    </h1>
                  </a>
                  <div className="mx-3">
                    <div className="input-group">
                      <span className="input-affix-wrapper">
                        <span className="input-prefix">
                          <i className="ri-lock-line"></i>
                        </span>
                        <select className="form-select">
                          <option selected="" value="1">
                            Private Board
                          </option>
                          <option value="2">Public Board</option>
                        </select>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="btn-group  d-md-inline-flex d-none"
                role="group"
                id="modes-filter"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="modes"
                  id="qday"
                  value="Quarter Day"
                />
                <label className="btn btn-outline-light" for="qday">
                  Quarter Day
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="modes"
                  id="hday"
                  value="Half Day"
                />
                <label className="btn btn-outline-light" for="hday">
                  Half Day
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="modes"
                  id="day"
                  value="Day"
                />
                <label className="btn btn-outline-light" for="day">
                  Day
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="modes"
                  id="week"
                  value="Week"
                  checked
                />
                <label className="btn btn-outline-light" for="week">
                  Week
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="modes"
                  id="month"
                  value="Month"
                />
                <label className="btn btn-outline-light" for="month">
                  Month
                </label>
              </div>

              <div className="todo-options-wrap flex-lg-grow-1 flex-lg-shrink-1 flex-basis-0">
                <div className="d-flex ms-auto">
                  <div className="avatar-group avatar-group-overlapped d-xl-flex d-none me-3">
                    <div
                      className="avatar avatar-rounded"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Katharine"
                    >
                      <img
                        src="dist/img/avatar8.jpg"
                        alt="user"
                        className="avatar-img"
                      />
                    </div>
                    <div
                      className="avatar avatar-rounded"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Dean"
                    >
                      <img
                        src="dist/img/avatar13.jpg"
                        alt="user"
                        className="avatar-img"
                      />
                    </div>
                    <div
                      className="avatar avatar-xs avatar-soft-danger avatar-rounded"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Tom"
                    >
                      <span className="initial-wrap">T</span>
                    </div>
                    <div
                      className="avatar avatar-rounded"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Morgan"
                    >
                      <img
                        src="dist/img/avatar2.jpg"
                        alt="user"
                        className="avatar-img"
                      />
                    </div>
                    <div
                      className="avatar avatar-icon avatar-primary avatar-rounded"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Add New"
                    >
                      <span className="initial-wrap">
                        <span className="feather-icon">
                          <i data-feather="plus"></i>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="v-separator  d-lg-inline-block d-none"></div>
                  <a
                    className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active ms-0  d-lg-inline-block d-none"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="columns"></i>
                      </span>
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end mnw-0">
                    <a className="dropdown-item" href="#">
                      <span className="feather-icon dropdown-icon me-0">
                        <i data-feather="sidebar"></i>
                      </span>
                    </a>
                    <a className="dropdown-item active" href="#">
                      <span className="feather-icon dropdown-icon me-0">
                        <i data-feather="columns"></i>
                      </span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="feather-icon dropdown-icon me-0 icon-flip-y">
                        <i data-feather="sidebar"></i>
                      </span>
                    </a>
                  </div>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover full-screenapp"
                    href="#"
                  >
                    <span className="icon">
                      <span
                        className="feather-icon"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Maximize"
                      >
                        <i data-feather="maximize"></i>
                      </span>
                      <span
                        className="feather-icon d-none"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Miniimize"
                      >
                        <i data-feather="minimize"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-lg-inline-block d-none"
                    href="#"
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
              </div>
              <div className="hk-sidebar-togglable"></div>
            </header>

            <div className="todo-body">
              <div className="nicescroll-bar">
                <div className="split-wrap">
                  <div
                    data-simplebar
                    data-simplebar-auto-hide="false"
                    className="split"
                    id="split_1"
                  >
                    <div className="table-wrap">
                      <table
                        id="datable_1t"
                        className="table table-bordered nowrap gt-todo-table"
                      >
                        <thead>
                          <tr>
                            <th className="w-25" rowspan="2">
                              <div className="d-flex align-items-center">
                                <span className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input check-select-all"
                                    id="customCheck1"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="customCheck1"
                                  ></label>
                                </span>
                                <span>Task</span>
                              </div>
                            </th>
                            <th colspan="2">HR Information</th>
                            <th colspan="4">Contact</th>
                          </tr>
                          <tr>
                            <th className="w-10">Priority</th>
                            <th className="w-10">Time</th>
                            <th className="w-15">Assignee</th>
                            <th className="w-10">Due date</th>
                            <th className="w-10">Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star marked">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Video conference with Canada Team
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-danger">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  High
                                </span>
                              </span>
                            </td>
                            <td>Recently Assigned</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar7.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">Tom Cruz</div>
                              </div>
                            </td>
                            <td>
                              <span className="text-theme">Tomorrow</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-secondary btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  To-Do
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Client objective meeting
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-danger">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  High
                                </span>
                              </span>
                            </td>
                            <td>Recently Assigned</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar9.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">
                                  Katherine Jones
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="text-danger">Yesterday</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-warning btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  In Progress
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Target market trend analysis on the go
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td></td>
                            <td>Recently Assigned</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar7.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">Tom Cruz</div>
                              </div>
                            </td>
                            <td>
                              <span className="text-theme">Today</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-primary btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  Done
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star marked">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Send revised proposal to Mr. Dow Jones
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-warning">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  Low
                                </span>
                              </span>
                            </td>
                            <td>Recently Assigned</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar10.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">
                                  Martin Lutherking
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>Saturday</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-smoke btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  On Hold
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Set up first call for demo
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td></td>
                            <td>Recently Assigned</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-primary avatar-rounded">
                                    <span className="initial-wrap">H</span>
                                  </div>
                                </div>
                                <div className="media-body">Hencework</div>
                              </div>
                            </td>
                            <td>
                              <span>Sunday</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-warning btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  In Progress
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    className="dropdown-item edit-task"
                                    href="#"
                                  >
                                    Edit Task
                                  </a>
                                  <a
                                    className="dropdown-item view-task"
                                    href="#"
                                  >
                                    View Task
                                  </a>
                                  <a
                                    className="dropdown-item delete-task"
                                    href="#"
                                  >
                                    Delete Task
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star marked">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Upgrade dependency on resouces
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-orange">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  Medium
                                </span>
                              </span>
                            </td>
                            <td>Recently Assigned</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar15.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">Boss Baby</div>
                              </div>
                            </td>
                            <td>
                              <span>27 Nov, 2020</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-danger btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  Pending
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    className="dropdown-item edit-task"
                                    href="#"
                                  >
                                    Edit Task
                                  </a>
                                  <a
                                    className="dropdown-item view-task"
                                    href="#"
                                  >
                                    View Task
                                  </a>
                                  <a
                                    className="dropdown-item delete-task"
                                    href="#"
                                  >
                                    Delete Task
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Update contribution guidelines and licence
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td></td>
                            <td>Recently Assigned</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar15.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">Boss Baby</div>
                              </div>
                            </td>
                            <td>
                              <span className="text-theme">Today</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-primary btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  Done
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    className="dropdown-item edit-task"
                                    href="#"
                                  >
                                    Edit Task
                                  </a>
                                  <a
                                    className="dropdown-item view-task"
                                    href="#"
                                  >
                                    View Task
                                  </a>
                                  <a
                                    className="dropdown-item delete-task"
                                    href="#"
                                  >
                                    Delete Task
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Fix tooltip word wrap/break rules
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-danger">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  High
                                </span>
                              </span>
                            </td>
                            <td>Yesterday</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar2.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">Morgan Freeman</div>
                              </div>
                            </td>
                            <td>
                              <span className="text-danger">4 Days ago</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-warning btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  In Progress
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    className="dropdown-item edit-task"
                                    href="#"
                                  >
                                    Edit Task
                                  </a>
                                  <a
                                    className="dropdown-item view-task"
                                    href="#"
                                  >
                                    View Task
                                  </a>
                                  <a
                                    className="dropdown-item delete-task"
                                    href="#"
                                  >
                                    Delete Task
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Redesigning the base model
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-danger">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  Urgent
                                </span>
                              </span>
                            </td>
                            <td>Yesterday</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar2.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">
                                  Charlie Chaplin
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>3 Aug, 2020</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-warning btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  In Progress
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    className="dropdown-item edit-task"
                                    href="#"
                                  >
                                    Edit Task
                                  </a>
                                  <a
                                    className="dropdown-item view-task"
                                    href="#"
                                  >
                                    View Task
                                  </a>
                                  <a
                                    className="dropdown-item delete-task"
                                    href="#"
                                  >
                                    Delete Task
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star marked">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Configure security analysis feature
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-orange">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  Medium
                                </span>
                              </span>
                            </td>
                            <td>Yesterday</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar2.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">Tom Cruz</div>
                              </div>
                            </td>
                            <td>
                              <span>8 Aug, 2020</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-smoke btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  On Hold
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    className="dropdown-item edit-task"
                                    href="#"
                                  >
                                    Edit Task
                                  </a>
                                  <a
                                    className="dropdown-item view-task"
                                    href="#"
                                  >
                                    View Task
                                  </a>
                                  <a
                                    className="dropdown-item delete-task"
                                    href="#"
                                  >
                                    Delete Task
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Remove notifications panel from inbox
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-danger">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  Urgent
                                </span>
                              </span>
                            </td>
                            <td>Yesterday</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar2.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">Boss Baby</div>
                              </div>
                            </td>
                            <td>
                              <span>24 Sep, 2020</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-secondary btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  To-Do
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    className="dropdown-item edit-task"
                                    href="#"
                                  >
                                    Edit Task
                                  </a>
                                  <a
                                    className="dropdown-item view-task"
                                    href="#"
                                  >
                                    View Task
                                  </a>
                                  <a
                                    className="dropdown-item delete-task"
                                    href="#"
                                  >
                                    Delete Task
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Send an invite to join project
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-warning">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  Low
                                </span>
                              </span>
                            </td>
                            <td>15 July, 20</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar7.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">Tom Cruz</div>
                              </div>
                            </td>
                            <td>
                              <span className="text-danger">Yesterday</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-warning btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  In Progress
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    className="dropdown-item edit-task"
                                    href="#"
                                  >
                                    Edit Task
                                  </a>
                                  <a
                                    className="dropdown-item view-task"
                                    href="#"
                                  >
                                    View Task
                                  </a>
                                  <a
                                    className="dropdown-item delete-task"
                                    href="#"
                                  >
                                    Delete Task
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Connect to software tools
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-danger">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  High
                                </span>
                              </span>
                            </td>
                            <td>15 July, 20</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar10.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">
                                  Martin Lutherking
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>Saturday</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-primary btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  Done
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    className="dropdown-item edit-task"
                                    href="#"
                                  >
                                    Edit Task
                                  </a>
                                  <a
                                    className="dropdown-item view-task"
                                    href="#"
                                  >
                                    View Task
                                  </a>
                                  <a
                                    className="dropdown-item delete-task"
                                    href="#"
                                  >
                                    Delete Task
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gt-single-task">
                                <div>
                                  <span className="todo-star">
                                    <span className="feather-icon">
                                      <i data-feather="star"></i>
                                    </span>
                                  </span>
                                  <span className="todo-text">
                                    Speed up project review with planner
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-outline badge-danger">
                                <span>
                                  <i className="badge-dot ri-checkbox-blank-circle-fill"></i>
                                  High
                                </span>
                              </span>
                            </td>
                            <td>15 July, 20</td>
                            <td>
                              <div className="media align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar9.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">
                                  Katherine Jones
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>15 Oct, 2020</span>
                            </td>
                            <td>
                              <div className="dropdown selectable-dropdown">
                                <button
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="btn btn-primary btn-rounded dropdown-toggle "
                                  type="button"
                                >
                                  Done
                                </button>
                                <div role="menu" className="dropdown-menu">
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <div
                                    className="dropdown-item"
                                    data-color="#5e7d8a"
                                  >
                                    On Hold
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FFC400"
                                  >
                                    In Progress
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#9e9e9e"
                                  >
                                    To-Do
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#007D88"
                                  >
                                    Done
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    data-color="#FF0101"
                                  >
                                    Pending
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    data-simplebar
                    data-simplebar-auto-hide="false"
                    className="split"
                    id="split_2"
                  >
                    <div className="gantt-wrap">
                      <svg id="gantt"></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Edit Info --> */}
          <div
            id="add_new_task"
            className="modal fade add-new-contact"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <h5 className="mb-4">Add New Task</h5>
                  <form>
                    <div className="title title-xs title-wth-divider text-primary text-uppercase mt-1 mb-4">
                      <span>Basic Info</span>
                    </div>
                    <div className="row gx-3">
                      <div className="col-sm-8">
                        <div className="form-group">
                          <label className="form-label">Name</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="form-label">Code</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                    <div className="row gx-3">
                      <div className="col-md-12">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label">
                              Note/Description
                            </label>
                            <small className="text-muted">200</small>
                          </div>
                          <textarea
                            className="form-control"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row gx-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Start Date</label>
                          <input
                            className="form-control"
                            name="single-date-pick"
                            type="text"
                          />
                          <div className="form-check form-check-sm mt-2">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked=""
                            />
                            <label className="form-check-label">
                              Mark as milestone
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Start Time</label>
                          <input
                            className="form-control input-single-timepicker"
                            name="input-timepicker"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row gx-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">End Date</label>
                          <input
                            className="form-control"
                            name="single-date-pick"
                            type="text"
                          />
                          <div className="form-check form-check-sm mt-2">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked=""
                            />
                            <label className="form-check-label">
                              Mark as milestone
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">End Time</label>
                          <input
                            className="form-control input-single-timepicker"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row gx-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <select className="form-control custom-select">
                            <option selected="">Project</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Status</label>
                          <select className="form-control custom-select">
                            <option selected="">To-Do</option>
                            <option value="1">On Hold</option>
                            <option value="1">In Progress</option>
                            <option value="2">Done</option>
                            <option value="3">Pending</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row gx-3">
                      <div className="col-sm-12">
                        <div className="form-inline">
                          <div className="form-group">
                            <label className="form-label">Set priority:</label>
                            <div className="form-check form-check-inline ms-2">
                              <div className="custom-control custom-radio radio-primary">
                                <input
                                  type="radio"
                                  id="customRadioc2"
                                  name="customRadioc2"
                                  className="form-check-input"
                                />
                                <label
                                  className="form-check-label"
                                  for="customRadioc2"
                                >
                                  High
                                </label>
                              </div>
                            </div>
                            <div className="form-check form-check-inline">
                              <div className="custom-control custom-radio radio-primary">
                                <input
                                  type="radio"
                                  id="customRadioc3"
                                  name="customRadioc2"
                                  className="form-check-input"
                                />
                                <label
                                  className="form-check-label"
                                  for="customRadioc3"
                                >
                                  Medium
                                </label>
                              </div>
                            </div>
                            <div className="form-check form-check-inline">
                              <div className="custom-control custom-radio radio-primary">
                                <input
                                  type="radio"
                                  id="customRadioc4"
                                  name="customRadioc2"
                                  className="form-check-input"
                                />
                                <label
                                  className="form-check-label"
                                  for="customRadioc4"
                                >
                                  Low
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                      <span>Assign to</span>
                    </div>
                    <div className="repeater">
                      <div data-repeater-list="category-group">
                        <div className="d-flex">
                          <div className="row gx-3 flex-1">
                            <div className="col-sm-6 form-group mb-0">
                              <label className="form-label">Add Person</label>
                            </div>
                            <div className="col-sm-6 form-group mb-0">
                              <label className="form-label">Role</label>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="btn btn-xs btn-icon btn-rounded btn-light mb-2"
                            data-repeater-create
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Add Person"
                          >
                            <span className="icon">
                              <span className="feather-icon">
                                <i data-feather="plus"></i>
                              </span>
                            </span>
                          </a>
                        </div>
                        <div className="d-flex" data-repeater-item>
                          <div className="row gx-3 flex-1">
                            <div className="col-sm-6 form-group">
                              <input
                                className="form-control"
                                placeholder="--"
                                type="text"
                              />
                            </div>
                            <div className="col-sm-6 form-group">
                              <input
                                className="form-control"
                                placeholder="--"
                                type="text"
                              />
                            </div>
                          </div>
                          <a
                            href="#"
                            className="btn btn-xs btn-icon btn-rounded btn-light ms-2 mt-1"
                            data-repeater-delete
                          >
                            <span className="icon">
                              <i className="ri-delete-bin-6-line"></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer align-items-center">
                  <button type="button" className="btn btn-secondary">
                    Discard
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /Edit Info --> */}

          {/* <!-- Add Project --> */}
          <div
            className="modal fade"
            id="add_proj_board"
            tabindex="-1"
            role="dialog"
          >
            <div
              className="modal-dialog modal-dialog-centered mw-400p"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header header-wth-bg-inv">
                  <h5 className="modal-title">Add Projects</h5>
                  <button
                    type="button"
                    className="btn-close text-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body p-0">
                  <div>
                    <div data-simplebar className="nicescroll-bar h-350p">
                      <ul className="p-3 pb-0">
                        <li className="d-flex align-items-center justify-content-between mb-3">
                          <div className="media d-flex align-items-center">
                            <div className="media-head me-2">
                              <div className="avatar avatar-xs avatar-primary avatar-rounded">
                                <span className="initial-wrap">J</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="name">Jampack</div>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck2"
                              checked
                            />
                          </div>
                        </li>
                        <li className="d-flex align-items-center justify-content-between mb-3">
                          <div className="media d-flex align-items-center">
                            <div className="media-head me-2">
                              <div className="avatar avatar-xs avatar-danger avatar-rounded">
                                <span className="initial-wrap">H</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="name">Hencework</div>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck3"
                              checked
                            />
                          </div>
                        </li>
                        <li className="d-flex align-items-center justify-content-between mb-3">
                          <div className="media d-flex align-items-center">
                            <div className="media-head me-2">
                              <div className="avatar avatar-xs avatar-info avatar-rounded">
                                <span className="initial-wrap">G</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="name">Griffin</div>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck4"
                            />
                          </div>
                        </li>
                        <li className="d-flex align-items-center justify-content-between mb-3">
                          <div className="media d-flex align-items-center">
                            <div className="media-head me-2">
                              <div className="avatar avatar-xs avatar-warning avatar-rounded">
                                <span className="initial-wrap">R</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="name">React - Jampack</div>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck5"
                              checked
                            />
                          </div>
                        </li>
                        <li className="d-flex align-items-center justify-content-between mb-3">
                          <div className="media d-flex align-items-center">
                            <div className="media-head me-2">
                              <div className="avatar avatar-xs avatar-primary avatar-rounded">
                                <span className="initial-wrap">P</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="name">Pangong</div>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck6"
                              checked
                            />
                          </div>
                        </li>
                        <li className="d-flex align-items-center justify-content-between mb-3">
                          <div className="media d-flex align-items-center">
                            <div className="media-head me-2">
                              <div className="avatar avatar-xs avatar-success avatar-rounded">
                                <span className="initial-wrap">A</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="name">Angular - Jampack</div>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck7"
                              checked
                            />
                          </div>
                        </li>
                        <li className="d-flex align-items-center justify-content-between mb-3">
                          <div className="media d-flex align-items-center">
                            <div className="media-head me-2">
                              <div className="avatar avatar-xs avatar-warning avatar-rounded">
                                <span className="initial-wrap">R</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="name">React - Jampack</div>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck8"
                            />
                          </div>
                        </li>
                        <li className="d-flex align-items-center justify-content-between mb-3">
                          <div className="media d-flex align-items-center">
                            <div className="media-head me-2">
                              <div className="avatar avatar-xs avatar-primary avatar-rounded">
                                <span className="initial-wrap">P</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="name">Pangong</div>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck9"
                            />
                          </div>
                        </li>
                        <li className="d-flex align-items-center justify-content-between mb-3">
                          <div className="media d-flex align-items-center">
                            <div className="media-head me-2">
                              <div className="avatar avatar-xs avatar-success avatar-rounded">
                                <span className="initial-wrap">A</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="name">Angular - Jampack</div>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck10"
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    type="button"
                    className="btn flex-fill btn-light flex-1"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn flex-fill btn-primary flex-1"
                    data-bs-dismiss="modal"
                  >
                    Add Projects
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /Add Project --> */}
        </div>
      </div>
    </div>
  );
};

export default Gunt;
