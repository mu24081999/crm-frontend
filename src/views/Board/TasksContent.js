import React from "react";
const TasksContent = () => {
  return (
    <div>
      {/* <div className="taskboardapp-detail-wrap"> */}
      <div>
        <header className="taskboard-header">
          <div className="d-flex align-items-center flex-1">
            <div className="d-flex">
              <a className="taskboardapp-title link-dark" href="/">
                <h1>
                  Jampack
                  <span className="task-star marked">
                    <span className="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                </h1>
              </a>
              <div className="ms-3">
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
          <select className="form-select d-xxl-none flex-1 mx-3">
            <option selected="" value="1">
              Task Board
            </option>
            <option value="2">Conversation</option>
            <option value="3">To Do List</option>
            <option value="4">Files</option>
            <option value="5">Links</option>
          </select>
          <ul className="nav nav-pills nav-pills-rounded active-theme nav-light px-2 flex-shrink-0 d-xxl-flex d-none">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <span className="nav-link-text">Task Board</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                <span className="nav-link-text">Conversation</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                <span className="nav-link-text">To Do List</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                <span className="nav-link-text">Files</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                <span className="nav-link-text">Links</span>
              </a>
            </li>
          </ul>
          <div className="taskboard-options-wrap flex-1">
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
                  data-bs-original-title="Tooltip text"
                >
                  <span className="initial-wrap">
                    <span className="feather-icon">
                      <i data-feather="plus"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div className="v-separator d-xl-flex d-none"></div>
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover taskboardapp-info-toggle ms-xl-0"
                href="/"
              >
                <span
                  className="icon"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="Info"
                >
                  <span className="feather-icon">
                    <i data-feather="info"></i>
                  </span>
                </span>
              </a>
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
          </div>
          <div className="hk-sidebar-togglable"></div>
        </header>
        <div className="taskboard-body">
          <div>
            <div className="taskbar-toolbar">
              <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                <button
                  className="btn btn-soft-primary flex-shrink-0 btn-add-newlist me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#add_task_list"
                >
                  Create New
                </button>
                <div className="form-check form-switch ms-auto">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customDes"
                    checked=""
                  />
                  <label className="form-check-label" for="customDes">
                    Show description
                  </label>
                </div>
              </div>
              <form role="search" className="d-lg-flex d-none">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search in conversation"
                />
              </form>
            </div>
            {/* <Kanban /> */}
            <div id="kb_scroll" className="tasklist-scroll position-relative">
              <div id="tasklist_wrap" className="tasklist-wrap">
                <div className="card card-simple card-border tasklist">
                  <div className="card-header card-header-action">
                    <div className="tasklist-handle">
                      <h6 className="text-uppercase fw-bold  d-flex align-items-center mb-0">
                        <span className="tasklist-name">All Modules</span>
                        <span className="badge badge-pill badge-soft-violet ms-2">
                          19
                        </span>
                      </h6>
                      <div className="card-action-wrap">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div
                          role="menu"
                          className="dropdown-menu dropdown-menu-end"
                        >
                          <a
                            className="dropdown-item edit-tasklist"
                            href="/"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_task_list"
                          >
                            Edit
                          </a>
                          <a className="dropdown-item delete-tasklist" href="/">
                            Delete
                          </a>
                          <a className="dropdown-item clear-tasklist" href="/">
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-white btn-block btn-add-newtask"
                      data-bs-toggle="modal"
                      data-bs-target="#add_new_card"
                    >
                      <span>
                        <span className="icon">
                          <span className="feather-icon">
                            <i data-feather="plus"></i>
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div data-simplebar className="card-body">
                    <div id="i1" className="tasklist-cards-wrap">
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Application Pages</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="avatar-group avatar-group-overlapped">
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
                              <span className="initial-wrap">B</span>
                            </div>
                            <div
                              className="avatar avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Danial"
                            >
                              <img
                                src="dist/img/avatar2.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>4/8</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>24</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">22 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Authentication</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>12/18</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>24</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">22 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Menu Modules</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Content</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="avatar-group avatar-group-overlapped">
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
                              className="avatar avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Winston"
                            >
                              <img
                                src="dist/img/avatar10.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>0/3</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>24</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">24 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Utilities</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Forms</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>18/18</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">28 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Tables</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>1/9</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>5</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">30 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Charts</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Maps</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Final Package</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="avatar-group avatar-group-overlapped">
                            <div
                              className="avatar avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Danial"
                            >
                              <img
                                src="dist/img/avatar2.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>40/127</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>24</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">15 Oct, 20</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-simple card-border tasklist">
                  <div className="card-header card-header-action">
                    <div className="tasklist-handle">
                      <h6 className="text-uppercase fw-bold  d-flex align-items-center mb-0">
                        <span className="tasklist-name">In progress</span>
                        <span className="badge badge-pill badge-soft-violet ms-2">
                          6
                        </span>
                      </h6>
                      <div className="card-action-wrap">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div
                          role="menu"
                          className="dropdown-menu dropdown-menu-end"
                        >
                          <a
                            className="dropdown-item edit-tasklist"
                            href="/"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_task_list"
                          >
                            Edit
                          </a>
                          <a className="dropdown-item delete-tasklist" href="/">
                            Delete
                          </a>
                          <a className="dropdown-item clear-tasklist" href="/">
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-white btn-block btn-add-newtask"
                      data-bs-toggle="modal"
                      data-bs-target="#add_new_card"
                    >
                      <span>
                        <span className="icon">
                          <span className="feather-icon">
                            <i data-feather="plus"></i>
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div data-simplebar className="card-body">
                    <div id="i2" className="tasklist-cards-wrap">
                      <div className="card card-border card-wth-progress card-simple tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-warning w-45"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>

                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Profile Pages</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="avatar-group avatar-group-overlapped">
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
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>4/8</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">18 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-wth-progress card-simple tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-primary w-85"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>

                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Advance Tables</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>4/8</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>24</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">22 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-wth-progress card-simple tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-primary w-60"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">CSS Compilation</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="avatar-group avatar-group-overlapped">
                            <div
                              className="avatar avatar-soft-success avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Huma"
                            >
                              <span className="initial-wrap">
                                <span>A</span>
                              </span>
                            </div>
                            <div
                              className="avatar avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Danial"
                            >
                              <img
                                src="dist/img/avatar2.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="badge badge-soft-primary my-1">
                              Priority
                            </span>
                            <span className="badge badge-soft-danger my-1">
                              Angular
                            </span>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>4/8</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">18 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-wth-progress card-simple tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-primary w-20"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Lists</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>18/18</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">28 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-wth-progress card-simple tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-danger w-10"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Dashboards</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>18/18</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>24</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">28 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-wth-progress card-simple tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-primary w-70"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Detail Pages</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="avatar-group avatar-group-overlapped">
                            <div
                              className="avatar avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Danial"
                            >
                              <img
                                src="dist/img/avatar2.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>18/18</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>24</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">28 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-simple card-border tasklist">
                  <div className="card-header card-header-action">
                    <div className="tasklist-handle">
                      <h6 className="text-uppercase fw-bold  d-flex align-items-center mb-0">
                        <span className="tasklist-name">Completed</span>
                        <span className="badge badge-pill badge-soft-violet ms-2">
                          4
                        </span>
                      </h6>
                      <div className="card-action-wrap">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div
                          role="menu"
                          className="dropdown-menu dropdown-menu-end"
                        >
                          <a
                            className="dropdown-item edit-tasklist"
                            href="/"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_task_list"
                          >
                            Edit
                          </a>
                          <a className="dropdown-item delete-tasklist" href="/">
                            Delete
                          </a>
                          <a className="dropdown-item clear-tasklist" href="/">
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-white btn-block btn-add-newtask"
                      data-bs-toggle="modal"
                      data-bs-target="#add_new_card"
                    >
                      <span>
                        <span className="icon">
                          <span className="feather-icon">
                            <i data-feather="plus"></i>
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div data-simplebar className="card-body">
                    <div id="i3" className="tasklist-cards-wrap">
                      <div className="card card-border card-simple card-wth-progress tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-success w-100"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Forms</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <p>
                            Form validation works only online. Check by
                            activating local server.
                          </p>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>18/18</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">28 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple card-wth-progress tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-success w-100"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Tables</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>1/9</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>5</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">30 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple card-wth-progress tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-success w-100"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>

                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Application Pages</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="avatar-group avatar-group-overlapped">
                            <div
                              className="avatar avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Danial"
                            >
                              <img
                                src="dist/img/avatar9.jpg"
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
                                src="dist/img/avatar3.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                            <div
                              className="avatar avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Huma"
                            >
                              <img
                                src="dist/img/avatar7.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                            <div
                              className="avatar avatar-soft-info avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Huma"
                            >
                              <span className="initial-wrap">
                                <span>C</span>
                              </span>
                            </div>
                            <div
                              className="avatar avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Charlie"
                            >
                              <img
                                src="dist/img/avatar13.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>4/8</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">18 Sep, 22</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple card-wth-progress tasklist-card">
                        <div className="progress progress-bar-xs">
                          <div
                            className="progress-bar bg-success w-100"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Authentication</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>1/9</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>5</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">30 Sep, 20</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-simple card-border tasklist">
                  <div className="card-header card-header-action">
                    <div className="tasklist-handle">
                      <h6 className="text-uppercase fw-bold  d-flex align-items-center mb-0">
                        <span className="tasklist-name">Pending</span>
                        <span className="badge badge-pill badge-soft-violet ms-2">
                          7
                        </span>
                      </h6>
                      <div className="card-action-wrap">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div
                          role="menu"
                          className="dropdown-menu dropdown-menu-end"
                        >
                          <a
                            className="dropdown-item edit-tasklist"
                            href="/"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_task_list"
                          >
                            Edit
                          </a>
                          <a className="dropdown-item delete-tasklist" href="/">
                            Delete
                          </a>
                          <a className="dropdown-item clear-tasklist" href="/">
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-white btn-block btn-add-newtask"
                      data-bs-toggle="modal"
                      data-bs-target="#add_new_card"
                    >
                      <span>
                        <span className="icon">
                          <span className="feather-icon">
                            <i data-feather="plus"></i>
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div data-simplebar className="card-body">
                    <div id="i4" className="tasklist-cards-wrap">
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Authentication</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div>
                            <span className="badge badge-soft-light my-1">
                              Unassigned
                            </span>
                            <span className="badge badge-soft-danger my-1">
                              Collaborator
                            </span>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>12/18</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>24</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">22 Sep, 20</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Menu Modules</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Content</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="avatar-group avatar-group-overlapped">
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
                              className="avatar avatar-rounded"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Winston"
                            >
                              <img
                                src="dist/img/avatar10.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>0/3</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>24</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">24 Sep, 20</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Utilities</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Forms</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>18/18</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">28 Sep, 20</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Tables</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-muted justify-content-between">
                          <div>
                            <span className="task-counter">
                              <span>
                                <i className="ri-checkbox-line"></i>
                              </span>
                              <span>1/9</span>
                            </span>
                            <span className="task-discuss">
                              <span>
                                <i className="ri-message-3-line"></i>
                              </span>
                              <span>5</span>
                            </span>
                          </div>
                          <div>
                            <span className="task-deadline">30 Sep, 20</span>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Charts</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-border card-simple tasklist-card">
                        <div className="card-header card-header-action">
                          <h6 className="fw-bold">Maps</h6>
                          <div className="card-action-wrap">
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                              <a
                                className="dropdown-item"
                                href="/"
                                data-bs-toggle="modal"
                                data-bs-target="#task_detail"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="edit-2"></i>
                                </span>
                                <span>Edit</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="user"></i>
                                </span>
                                <span>Assign to</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                                <span>Attach files</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="tag"></i>
                                </span>
                                <span>Apply Labels</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="calendar"></i>
                                </span>
                                <span>Set Due Date</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="bookmark"></i>
                                </span>
                                <span>Follow Task</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="arrow-up"></i>
                                </span>
                                <span>Set as Top Priority</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="repeat"></i>
                                </span>
                                <span>Change Status</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="pocket"></i>
                                </span>
                                <span>Save as Template</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="archive"></i>
                                </span>
                                <span>Move to archive</span>
                              </a>
                              <a className="dropdown-item delete-task" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-simple card-border tasklist add-new-task">
                  <button
                    className="btn btn-soft-primary btn-add-newlist flex-shrink-0"
                    data-bs-toggle="modal"
                    data-bs-target="#add_task_list"
                  >
                    Add New List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="taskboard-info">
          <div data-simplebar className="nicescroll-bar">
            <button type="button" className="info-close btn-close mb-10">
              <span aria-hidden="true">×</span>
            </button>
            <form role="search" className="mt-xl-0 mt-5">
              <input
                type="text"
                className="form-control"
                placeholder="Search in conversation"
              />
            </form>
            <div className="collapse-simple mt-4">
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/members"
                    aria-expanded="true"
                  >
                    Members
                  </a>
                </div>
                <div id="members" className="collapse show">
                  <div className="card-body">
                    <ul className="hk-list">
                      <li>
                        <div
                          className="avatar avatar-sm avatar-primary avatar-rounded"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Hencework"
                        >
                          <span className="initial-wrap">H</span>
                        </div>
                      </li>
                      <li>
                        <div
                          className="avatar avatar-sm avatar-rounded"
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
                      </li>
                      <li>
                        <div
                          className="avatar avatar-sm avatar-rounded"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Charlie"
                        >
                          <img
                            src="dist/img/avatar13.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                        </div>
                      </li>
                      <li>
                        <div
                          className="avatar avatar-sm avatar-rounded position-relative"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Tom"
                        >
                          <img
                            src="dist/img/avatar7.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                          <span className="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                        </div>
                      </li>
                      <li>
                        <div
                          className="avatar avatar-sm avatar-rounded"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Katherine"
                        >
                          <img
                            src="dist/img/avatar9.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                        </div>
                      </li>
                      <li>
                        <div
                          className="avatar avatar-sm avatar-rounded position-relative"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Danial"
                        >
                          <img
                            src="dist/img/avatar10.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                          <span className="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                        </div>
                      </li>
                      <li>
                        <div
                          className="avatar avatar-sm avatar-rounded position-relative"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Boss"
                        >
                          <img
                            src="dist/img/avatar15.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                          <span className="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                        </div>
                      </li>
                      <li>
                        <div
                          className="avatar avatar-sm avatar-soft-danger avatar-rounded"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Winston"
                        >
                          <span className="initial-wrap">W</span>
                        </div>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="avatar avatar-sm avatar-icon avatar-soft-light avatar-rounded"
                          data-bs-toggle="modal"
                          data-bs-target="#invite_people"
                        >
                          <span
                            className="initial-wrap"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Add New"
                          >
                            <span className="feather-icon">
                              <i data-feather="plus"></i>
                            </span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/activity"
                    aria-expanded="true"
                  >
                    Latest Activity
                  </a>
                </div>
                <div id="activity" className="collapse show">
                  <div className="card-body">
                    <ul className="activity-list list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-primary avatar-rounded">
                              <span className="initial-wrap">H</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Hencework</span> on
                              Documentation link is working now -{" "}
                              <a href="/" className="link-url">
                                <u>ttps://hencework.com/theme/jampa</u>
                              </a>
                            </p>
                            <div className="last-activity-time">
                              Oct 15, 2021, 12:34 PM
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-rounded">
                              <img
                                src="dist/img/avatar2.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Morgan Fregman</span>{" "}
                              completed react conversion of{" "}
                              <a href="/" className="link-default">
                                <u>components</u>
                              </a>
                            </p>
                            <div className="last-activity-time">
                              Sep 16, 2021, 4:54 PM
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-rounded">
                              <img
                                src="dist/img/avatar13.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Jimmy Carry</span>
                              completed side bar menu on{" "}
                              <a href="/" className="link-default">
                                <u>elements</u>
                              </a>
                            </p>
                            <div className="last-activity-time">
                              Sep 10, 2021, 10:13 AM
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-rounded">
                              <img
                                src="dist/img/avatar7.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Charlie Chaplin</span>{" "}
                              deleted empty cards on{" "}
                              <a href="/" className="link-default">
                                <u>completed</u>
                              </a>
                            </p>
                            <div className="last-activity-time">
                              Sep 10, 2021, 10:13 AM
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                              <span className="initial-wrap">W</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">
                                Winston Churchills
                              </span>{" "}
                              created a note on UI components task list
                            </p>
                            <div className="last-activity-time">
                              Sep 2, 2021, 9:23 AM
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-rounded">
                              <img
                                src="dist/img/avatar2.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Morgan Fregman</span>{" "}
                              completed react conversion of{" "}
                              <a href="/" className="link-default">
                                <u>components</u>
                              </a>
                            </p>
                            <div className="last-activity-time">
                              Sep 16, 2021, 4:54 PM
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-rounded">
                              <img
                                src="dist/img/avatar13.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Jimmy Carry</span>
                              added shared components to{" "}
                              <a href="/" className="link-default">
                                <u>basic structure</u>
                              </a>
                            </p>
                            <div className="last-activity-time">
                              Sep 10, 2021, 10:13 AM
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-primary avatar-rounded">
                              <span className="initial-wrap">H</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Hencework</span>{" "}
                              commented on{" "}
                              <a href="/" className="link-default">
                                <u>basic structure</u>
                              </a>
                            </p>
                            <div className="last-activity-time">
                              Sep 10, 2021, 10:13 AM
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-rounded">
                              <img
                                src="dist/img/avatar7.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Charlie Chaplin</span>{" "}
                              moved components from all modules to in progress
                            </p>
                            <div className="last-activity-time">
                              Sep 10, 2021, 10:13 AM
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                              <span className="initial-wrap">W</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">
                                Winston Churchills
                              </span>{" "}
                              created a note on UI components task list
                            </p>
                            <div className="last-activity-time">
                              Sep 10, 2021, 10:13 AM
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksContent;
