import React, { useEffect, useState } from "react";

import SideNav from "./components/SideNav";
import BoardHeader from "./components/BoardHeader";
import BoardList from "./components/BoardList";
import AddNewTask from "./components/AddNewTask";
import AddNewMember from "./components/AddNewMember";
import { useDispatch, useSelector } from "react-redux";
import { getBoardList } from "../../redux/services/board";
import { getBoardTeamList } from "../../redux/services/boardTeam";
import TasksContent from "./TasksContent";

const BoardContent = () => {
  const [toggleType, setToggleType] = useState("board");
  const [boardsData, setBoardsData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [isShowTask, setShowTask] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { boards } = useSelector((state) => state.board);
  const { teams } = useSelector((state) => state.board_team);
  const dispatch = useDispatch();
  const handleToggleChange = (value) => {
    setToggleType(value);
  };
  useEffect(() => {
    dispatch(getBoardList(token));
    dispatch(getBoardTeamList(token));
  }, [token, dispatch]);
  useEffect(() => {
    setBoardsData(boards);
  }, [boards]);
  useEffect(() => {
    setTeamsData(teams);
  }, [teams]);
  return (
    <div>
      {/* <!-- Main Content --> */}
      <div className="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div className="hk-pg-body py-0">
          <div className="taskboardapp-wrap">
            <SideNav />

            <div className="taskboardapp-content">
              <div className="taskboardapp-detail-wrap">
                {isShowTask && <TasksContent />}
                {!isShowTask && (
                  <>
                    <BoardHeader onToggle={handleToggleChange} />
                    <div className="taskboard-body">
                      <div data-simplebar className="nicescroll-bar">
                        <div className="container-fluid">
                          <div className="row justify-content-center board-team-wrap">
                            <div className="col-md-8 col-sm-12">
                              <BoardList
                                toggleType={toggleType}
                                boardsData={boardsData}
                                teamsData={teamsData}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* <!-- Add New Task --> */}
              <AddNewTask teamsData={teamsData} />
              {/* <!-- /Add New Task --> */}

              {/* <!-- Add New Member --> */}
              <AddNewMember />
              {/* <!-- /Add New Member -->  */}

              {/* <!-- Add Fav Board --> */}
              <div
                className="modal fade"
                id="add_fav_board"
                tabindex="-1"
                role="dialog"
              >
                <div
                  className="modal-dialog modal-dialog-centered mw-400p"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header header-wth-bg-inv">
                      <h5 className="modal-title">Add Board</h5>
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
                        Add Board
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Add Fav Board --> */}
              {/* <!-- Add New Card --> */}
              <div
                id="add_new_card"
                className="modal fade add-new-task"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
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
                      <h5 className="mb-4">Create New Card</h5>
                      <form>
                        <div className="row gx-3">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Name</label>
                              <input
                                className="form-control task-name"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Start Date</label>
                              <input
                                className="form-control"
                                name="single-date-pick"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">End Date</label>
                              <input
                                className="form-control"
                                name="single-date-pick"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                Note/Description
                              </label>
                              <textarea
                                className="form-control"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group mt-3">
                              <label className="form-label">
                                Set priority:
                              </label>
                              <div className="form-check form-check-inline">
                                <div className="form-check form-check-primary">
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
                                <div className="form-check form-check-primary">
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
                                <div className="form-check form-check-primary">
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
                      </form>
                    </div>
                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-add-task"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Add New Card --> */}
              {/* <!-- Task Details --> */}
              <div
                id="task_detail"
                className="modal fade"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-xl task-detail-modal"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-body p-0">
                      <header className="task-header">
                        <div className="d-flex align-items-center">
                          <div id="sparkline_chart_7"></div>
                          <div className="form-check mx-lg-3 ms-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheckcTask"
                              checked
                            />
                            <label
                              className="form-check-label d-lg-inline d-none"
                              for="customCheckcTask"
                            >
                              Mark as completed
                            </label>
                          </div>
                          <button className="btn btn-flush-light flush-outline-hover d-lg-inline-block d-none">
                            <span>
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="link"></i>
                                </span>
                              </span>
                              <span>Copy Link</span>
                            </span>
                          </button>
                          <button className="btn btn-icon btn-light btn-rounded d-lg-none d-lg-inline-block ms-1">
                            <span>
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="link"></i>
                                </span>
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="task-options-wrap">
                          <span className="task-star marked">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                          <a
                            className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover ms-1 d-lg-inline-block d-none"
                            href="/"
                          >
                            <span className="icon">
                              <span className="feather-icon">
                                <i data-feather="trash-2"></i>
                              </span>
                            </span>
                          </a>
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
                            <h6 className="dropdown-header">Action</h6>
                            <a className="dropdown-item" href="/">
                              <span className="feather-icon dropdown-icon">
                                <i data-feather="edit"></i>
                              </span>
                              <span>Assign to</span>
                            </a>
                            <a className="dropdown-item" href="/">
                              <span className="feather-icon dropdown-icon">
                                <i data-feather="user"></i>
                              </span>
                              <span>Attach files</span>
                            </a>
                            <a className="dropdown-item" href="/">
                              <span className="feather-icon dropdown-icon">
                                <i data-feather="paperclip"></i>
                              </span>
                              <span>Apply Labels</span>
                            </a>
                            <a className="dropdown-item" href="/">
                              <span className="feather-icon dropdown-icon">
                                <i data-feather="tag"></i>
                              </span>
                              <span>Set Due Date</span>
                            </a>
                            <a className="dropdown-item" href="/">
                              <span className="feather-icon dropdown-icon">
                                <i data-feather="calendar"></i>
                              </span>
                              <span>Follow Task</span>
                            </a>
                            <a className="dropdown-item" href="/">
                              <span className="feather-icon dropdown-icon">
                                <i data-feather="bookmark"></i>
                              </span>
                              <span>Set Due Date</span>
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
                      </header>
                      <div className="task-detail-body">
                        <div
                          className="alert alert-primary alert-wth-icon fade show mb-4"
                          role="alert"
                        >
                          <span className="alert-icon-wrap">
                            <span className="feather-icon">
                              <i className="zmdi zmdi-lock"></i>
                            </span>
                          </span>{" "}
                          This task is private for Jampack Team
                        </div>
                        <h4 className="d-flex align-items-center fw-bold mb-0 inline-editable-wrap">
                          <span className="editable">Framworking Building</span>
                          <a
                            className="btn btn-sm btn-icon btn-flush-light btn-rounded flush-soft-hover edit-tyn ms-1"
                            href="/"
                          >
                            <span className="icon">
                              <span className="feather-icon">
                                <i data-feather="edit-2"></i>
                              </span>
                            </span>
                          </a>
                        </h4>
                        <p className="d-flex align-items-center inline-editable-wrap">
                          <span className="editable">
                            Instant rebuilding of assets during development
                          </span>
                          <a
                            className="btn btn-sm btn-icon btn-flush-light btn-rounded flush-soft-hover edit-tyn ms-1"
                            href="/"
                          >
                            <span className="icon">
                              <span className="feather-icon">
                                <i data-feather="edit-2"></i>
                              </span>
                            </span>
                          </a>
                        </p>
                        <div className="avatar-group avatar-group-lg avatar-group-overlapped mt-3">
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
                        <form className="row">
                          <div className="col-md-4">
                            <div className="title title-wth-divider my-4">
                              <span>Assignee</span>
                            </div>
                            <div className="media align-items-center">
                              <div className="media-head">
                                <div className="avatar avatar-sm avatar-primary avatar-rounded">
                                  <span className="initial-wrap">H</span>
                                </div>
                              </div>
                              <div className="media-body">
                                <div className="as-name">Hencework</div>
                                <div className="as-date">
                                  4 july 2022, 8:30pm
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="title title-wth-divider my-4">
                              <span>Due Date</span>
                            </div>
                            <input
                              className="form-control"
                              type="text"
                              name="single-date"
                            />
                          </div>
                          <div className="col-md-4">
                            <div className="title title-wth-divider my-4">
                              <span>Status</span>
                            </div>
                            <div className="dropdown">
                              <button
                                aria-expanded="false"
                                data-bs-toggle="dropdown"
                                className="btn btn-warning btn-rounded dropdown-toggle"
                                type="button"
                              >
                                In Progress
                              </button>
                              <div role="menu" className="dropdown-menu">
                                <a className="dropdown-item" href="/">
                                  Action
                                </a>
                                <a className="dropdown-item" href="/">
                                  Another action
                                </a>
                                <a className="dropdown-item" href="/">
                                  Something else here
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">
                                  Separated link
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="title title-wth-divider my-4">
                              <span>Labels</span>
                            </div>
                            <input
                              type="text"
                              id="exist_values1"
                              className="user-input-tagged form-control"
                              name="tag-3"
                              value="Framework,Html"
                              placeholder="Add Chips"
                            />
                          </div>
                        </form>
                        <ul className="nav nav-justified nav-light nav-tabs nav-segmented-tabs active-theme mt-4">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-bs-toggle="tab"
                              href="/tab_checklist"
                            >
                              <span className="nav-link-text">Checklist</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="/tab_comments"
                            >
                              <span className="nav-link-text badge-on-text">
                                Comments
                              </span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="/tab_files"
                            >
                              <span className="nav-link-text badge-on-text">
                                Files
                              </span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="/tab_activity"
                            >
                              <span className="nav-link-text badge-on-text">
                                Activity
                              </span>
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content mt-7">
                          <div
                            className="tab-pane fade show active"
                            id="tab_checklist"
                          >
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <div className="title title-lg mb-0">
                                <span>Checklist</span>
                              </div>
                              <a
                                href="/"
                                className="btn btn-xs btn-icon btn-rounded btn-light"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Add Category"
                              >
                                <span className="icon">
                                  <span className="feather-icon">
                                    <i data-feather="plus"></i>
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="hk-checklist">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheckList1"
                                  checked=""
                                />
                                <label
                                  className="form-check-label"
                                  for="customCheckList1"
                                >
                                  Video conference with canada Team
                                  <span className="done-strikethrough"></span>
                                </label>
                                <a
                                  href="/"
                                  className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="trash-2"></i>
                                    </span>
                                  </span>
                                </a>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheckList2"
                                  checked=""
                                />
                                <label
                                  className="form-check-label"
                                  for="customCheckList2"
                                >
                                  Client objective meeting
                                  <span className="done-strikethrough"></span>
                                </label>
                                <a
                                  href="/"
                                  className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="trash-2"></i>
                                    </span>
                                  </span>
                                </a>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheckList3"
                                  checked=""
                                />
                                <label
                                  className="form-check-label"
                                  for="customCheckList3"
                                >
                                  Upgrade dependency on resources
                                  <span className="done-strikethrough"></span>
                                </label>
                                <a
                                  href="/"
                                  className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="trash-2"></i>
                                    </span>
                                  </span>
                                </a>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheckList4"
                                />
                                <label
                                  className="form-check-label"
                                  for="customCheckList4"
                                >
                                  Invite jaqueline on video conference
                                  <span className="done-strikethrough"></span>
                                </label>
                                <a
                                  href="/"
                                  className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="trash-2"></i>
                                    </span>
                                  </span>
                                </a>
                              </div>
                              <a
                                href="/"
                                className="d-flex align-items-center add-new-checklist"
                              >
                                <span className="feather-icon fe-x me-2">
                                  <i data-feather="plus-square"></i>
                                </span>
                                <span>New Item</span>
                              </a>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="title title-wth-divider flex-grow-1 my-4 me-2">
                                <span>Canada team task</span>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title=""
                                  data-bs-original-title="Edit"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="edit-2"></i>
                                    </span>
                                  </span>
                                </a>
                                <a
                                  href="/"
                                  className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="trash-2"></i>
                                    </span>
                                  </span>
                                </a>
                              </div>
                            </div>
                            <div className="hk-checklist">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheckList5"
                                  checked=""
                                />
                                <label
                                  className="form-check-label"
                                  for="customCheckList5"
                                >
                                  Upgrade dependency on resources
                                  <span className="done-strikethrough"></span>
                                </label>
                                <a
                                  href="/"
                                  className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="trash-2"></i>
                                    </span>
                                  </span>
                                </a>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheckList6"
                                />
                                <label
                                  className="form-check-label"
                                  for="customCheckList6"
                                >
                                  Invite jaqueline on video conference
                                  <span className="done-strikethrough"></span>
                                </label>
                                <a
                                  href="/"
                                  className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="trash-2"></i>
                                    </span>
                                  </span>
                                </a>
                              </div>
                              <a
                                href="/"
                                className="d-flex align-items-center add-new-checklist"
                              >
                                <span className="feather-icon fe-x me-2">
                                  <i data-feather="plus-square"></i>
                                </span>
                                <span>New Item</span>
                              </a>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-5 mb-2">
                              <div className="title title-lg mb-0">
                                <span>Notes</span>
                              </div>
                              <a
                                href="/"
                                className="btn btn-xs btn-icon btn-rounded btn-light"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Add Category"
                              >
                                <span className="icon">
                                  <span className="feather-icon">
                                    <i data-feather="plus"></i>
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="card card-border note-block bg-orange-light-5">
                              <div className="card-body">
                                <div className="card-action-wrap">
                                  <button
                                    className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                    <a className="dropdown-item" href="/">
                                      Action
                                    </a>
                                    <a className="dropdown-item" href="/">
                                      Another action
                                    </a>
                                    <a className="dropdown-item" href="/">
                                      Something else here
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/">
                                      Separated link
                                    </a>
                                  </div>
                                </div>
                                <div className="media align-items-center">
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
                                    <div>Martin Luther</div>
                                    <div>9 Apr, 20, 7:14 AM</div>
                                  </div>
                                </div>
                                <p>
                                  @
                                  <a href="/" className="fw-medium">
                                    Charlie Darvin
                                  </a>{" "}
                                  From there, you can run grunt compile, grunt
                                  migrate and grunt test to compile your
                                  contracts, deploy those contracts to the
                                  network, and run their associated unit tests.
                                </p>
                              </div>
                            </div>
                            <div className="card card-border note-block bg-orange-light-5">
                              <div className="card-body">
                                <div className="card-action-wrap">
                                  <button
                                    className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                    <a className="dropdown-item" href="/">
                                      Action
                                    </a>
                                    <a className="dropdown-item" href="/">
                                      Another action
                                    </a>
                                    <a className="dropdown-item" href="/">
                                      Something else here
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/">
                                      Separated link
                                    </a>
                                  </div>
                                </div>
                                <div className="media align-items-center">
                                  <div className="media-head">
                                    <div className="avatar avatar-sm avatar-rounded">
                                      <img
                                        src="dist/img/avatar3.jpg"
                                        alt="user"
                                        className="avatar-img"
                                      />
                                    </div>
                                  </div>
                                  <div className="media-body">
                                    <div>Katherine Jones</div>
                                    <div>8 Apr, 20, 5:30 PM</div>
                                  </div>
                                </div>
                                <p>
                                  @
                                  <a href="/" className="fw-medium">
                                    Martin Luther
                                  </a>{" "}
                                  Viscosity ratio for "Appear view" link text is
                                  3.7:1 which is less{" "}
                                </p>
                              </div>
                            </div>
                            <a
                              href="/"
                              className="btn btn-outline-light btn-block"
                            >
                              View more
                            </a>
                          </div>
                          <div className="tab-pane fade" id="tab_comments">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <div className="title title-lg mb-0">
                                <span>3 Responses</span>
                              </div>
                              <a
                                href="/"
                                className="btn btn-xs btn-icon btn-rounded btn-light"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Add Board"
                              >
                                <span className="icon">
                                  <span className="feather-icon">
                                    <i data-feather="plus"></i>
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="comment-block">
                              <div className="media">
                                <div className="media-head">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar4.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div>
                                    <span className="cm-name">
                                      Martin Luther
                                    </span>
                                    <span className="badge badge-soft-violet">
                                      Manager
                                    </span>
                                  </div>
                                  <p>
                                    @
                                    <a href="/" className="fw-medium">
                                      Charlie Darvin
                                    </a>{" "}
                                    From there, you can run truffle compile,
                                    truffle migrate and truffle test to compile
                                    your contracts, deploy those contracts to
                                    the network, and run their associated unit
                                    tests.
                                  </p>
                                  <div className="comment-action-wrap mt-3">
                                    <span>3 hours ago</span>
                                    <span className="comment-dot-sep">●</span>
                                    <a href="/">Reply</a>
                                    <span className="comment-dot-sep">●</span>
                                    <a href="/">Like</a>
                                  </div>
                                </div>
                              </div>
                              <div className="separator separator-light"></div>
                              <div className="media">
                                <div className="media-head">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar2.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div>
                                    <span className="cm-name">
                                      Katherine Jones
                                    </span>
                                  </div>
                                  <p>
                                    Dynamically beautiful work done by @
                                    <a href="/" className="fw-medium">
                                      Ashton Kutcher
                                    </a>
                                  </p>
                                  <div className="comment-action-wrap mt-3">
                                    <span>3 hours ago</span>
                                    <span className="comment-dot-sep">●</span>
                                    <a href="/">Reply</a>
                                    <span className="comment-dot-sep">●</span>
                                    <a href="/">Like</a>
                                  </div>
                                  <div className="media">
                                    <div className="media-head">
                                      <div className="avatar avatar-xs avatar-rounded">
                                        <img
                                          src="dist/img/avatar3.jpg"
                                          alt="user"
                                          className="avatar-img"
                                        />
                                      </div>
                                    </div>
                                    <div className="media-body">
                                      <div>
                                        <span className="cm-name">
                                          Ashton Kutche
                                        </span>
                                        <span className="badge badge-soft-danger">
                                          Designer
                                        </span>
                                      </div>
                                      <p>
                                        @
                                        <a href="/" className="fw-medium">
                                          Katherine Jones
                                        </a>{" "}
                                        Thank you :)
                                      </p>
                                      <div className="comment-action-wrap mt-3">
                                        <span>3 hours ago</span>
                                        <span className="comment-dot-sep">
                                          ●
                                        </span>
                                        <a href="/">Reply</a>
                                        <span className="comment-dot-sep">
                                          ●
                                        </span>
                                        <a href="/">Like</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="separator separator-light"></div>
                              <form>
                                <div className="form-group">
                                  <label className="form-label">
                                    Add Comment
                                  </label>
                                  <textarea
                                    className="form-control"
                                    rows="5"
                                  ></textarea>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <button className="btn btn-primary">
                                    Send
                                  </button>
                                  <small className="form-text text-muted mt-0">
                                    Basic HTML is allowed
                                  </small>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="tab_files">
                            <div className="row">
                              <div className="col-sm">
                                <form
                                  action="#"
                                  className="dropzone"
                                  id="remove_link"
                                >
                                  <div className="fallback">
                                    <input name="file" type="file" multiple />
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div className="mt-5 mb-2">
                              <div className="title title-lg mb-0">
                                <span>Shared files</span>
                              </div>
                            </div>
                            <div className="file-block">
                              <div className="collapse-simple">
                                <div className="card">
                                  <div className="card-header">
                                    <a
                                      role="button"
                                      data-bs-toggle="collapse"
                                      href="/files_collapse"
                                      aria-expanded="true"
                                    >
                                      Yesterday
                                    </a>
                                  </div>
                                  <div
                                    id="files_collapse"
                                    className="collapse show"
                                  >
                                    <div className="card-body">
                                      <ul className="sh-files">
                                        <li>
                                          <div className="media">
                                            <div className="media-head">
                                              <div className="avatar avatar-icon avatar-sm avatar-soft-blue">
                                                <span className="initial-wrap fs-3">
                                                  <i className="ri-file-excel-2-fill"></i>
                                                </span>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <div>
                                                <p className="file-name">
                                                  website_content.exl
                                                </p>
                                                <p className="file-size">
                                                  2,635 KB
                                                </p>
                                              </div>
                                              <div>
                                                <div className="avatar avatar-xs avatar-rounded me-2">
                                                  <img
                                                    src="dist/img/avatar2.jpg"
                                                    alt="user"
                                                    className="avatar-img"
                                                  />
                                                </div>
                                                <a
                                                  href="/"
                                                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Download
                                                  </a>
                                                  <a
                                                    className="dropdown-item ms-0 link-danger"
                                                    href="/"
                                                  >
                                                    Delete
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="media">
                                            <div className="media-head">
                                              <div className="avatar avatar-icon avatar-sm avatar-soft-light">
                                                <span className="initial-wrap fs-3">
                                                  <i className="ri-file-text-fill"></i>
                                                </span>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <div>
                                                <p className="file-name">
                                                  jampack.pdf
                                                </p>
                                                <p className="file-size">
                                                  1.3 GB
                                                </p>
                                              </div>
                                              <div>
                                                <div className="avatar avatar-xs avatar-rounded me-2">
                                                  <img
                                                    src="dist/img/avatar3.jpg"
                                                    alt="user"
                                                    className="avatar-img"
                                                  />
                                                </div>
                                                <a
                                                  href="/"
                                                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Download
                                                  </a>
                                                  <a
                                                    className="dropdown-item ms-0 link-danger"
                                                    href="/"
                                                  >
                                                    Delete
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="media">
                                            <div className="media-head">
                                              <div className="avatar avatar-icon avatar-sm avatar-soft-warning">
                                                <span className="initial-wrap fs-3">
                                                  <i className="ri-file-zip-fill"></i>
                                                </span>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <div>
                                                <p className="file-name">
                                                  themeforest-pack.zip
                                                </p>
                                                <p className="file-size">
                                                  2.45 GB
                                                </p>
                                              </div>
                                              <div>
                                                <div className="avatar avatar-xs avatar-soft-danger avatar-rounded me-2">
                                                  <span className="initial-wrap">
                                                    H
                                                  </span>
                                                </div>
                                                <a
                                                  href="/"
                                                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Download
                                                  </a>
                                                  <a
                                                    className="dropdown-item ms-0 link-danger"
                                                    href="/"
                                                  >
                                                    Delete
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="media">
                                            <div className="media-head">
                                              <div className="avatar avatar-logo avatar-sm">
                                                <span className="initial-wrap">
                                                  <img
                                                    src="dist/img/6image.png"
                                                    alt="user"
                                                  />
                                                </span>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <div>
                                                <p className="file-name">
                                                  bruce-mars-fiEG-Pk6ZASFPk6ZASF
                                                </p>
                                                <p className="file-size">
                                                  4,178 KB
                                                </p>
                                              </div>
                                              <div>
                                                <div className="avatar avatar-xs avatar-rounded me-2">
                                                  <img
                                                    src="dist/img/avatar5.jpg"
                                                    alt="user"
                                                    className="avatar-img"
                                                  />
                                                </div>
                                                <a
                                                  href="/"
                                                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Download
                                                  </a>
                                                  <a
                                                    className="dropdown-item ms-0 link-danger"
                                                    href="/"
                                                  >
                                                    Delete
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="media">
                                            <div className="media-head">
                                              <div className="avatar avatar-logo avatar-sm">
                                                <span className="initial-wrap">
                                                  <img
                                                    src="dist/img/2image.png"
                                                    alt="user"
                                                  />
                                                </span>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <div>
                                                <p className="file-name">
                                                  jonas-kakaroto-KIPqvvTKIPqvvT
                                                </p>
                                                <p className="file-size">
                                                  951 KB
                                                </p>
                                              </div>
                                              <div>
                                                <div className="avatar avatar-xs avatar-rounded me-2">
                                                  <img
                                                    src="dist/img/avatar6.jpg"
                                                    alt="user"
                                                    className="avatar-img"
                                                  />
                                                </div>
                                                <a
                                                  href="/"
                                                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Download
                                                  </a>
                                                  <a
                                                    className="dropdown-item ms-0 link-danger"
                                                    href="/"
                                                  >
                                                    Delete
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
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
                                      href="/files_collapse_1"
                                      aria-expanded="true"
                                    >
                                      23 April
                                    </a>
                                  </div>
                                  <div
                                    id="files_collapse_1"
                                    className="collapse show"
                                  >
                                    <div className="card-body">
                                      <ul className="sh-files">
                                        <li>
                                          <div className="media">
                                            <div className="media-head">
                                              <div className="avatar avatar-icon avatar-sm avatar-soft-light">
                                                <span className="initial-wrap fs-3">
                                                  <i className="ri-keynote-fill"></i>
                                                </span>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <div>
                                                <p className="file-name">
                                                  presentation.keynote
                                                </p>
                                                <p className="file-size">
                                                  20 KB
                                                </p>
                                              </div>
                                              <div>
                                                <div className="avatar avatar-xs avatar-rounded me-2">
                                                  <img
                                                    src="dist/img/avatar5.jpg"
                                                    alt="user"
                                                    className="avatar-img"
                                                  />
                                                </div>
                                                <a
                                                  href="/"
                                                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Download
                                                  </a>
                                                  <a
                                                    className="dropdown-item ms-0 link-danger"
                                                    href="/"
                                                  >
                                                    Delete
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="media">
                                            <div className="media-head">
                                              <div className="avatar avatar-icon avatar-sm avatar-soft-warning">
                                                <span className="initial-wrap fs-3">
                                                  <i className="ri-file-zip-fill"></i>
                                                </span>
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <div>
                                                <p className="file-name">
                                                  PACK-TRIAL.zip
                                                </p>
                                                <p className="file-size">
                                                  2.45 GB
                                                </p>
                                              </div>
                                              <div>
                                                <div className="avatar avatar-xs avatar-rounded me-2">
                                                  <img
                                                    src="dist/img/avatar2.jpg"
                                                    alt="user"
                                                    className="avatar-img"
                                                  />
                                                </div>
                                                <a
                                                  href="/"
                                                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Download
                                                  </a>
                                                  <a
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Delete
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="media">
                                            <div className="media-head">
                                              <div className="avatar avatar-sm">
                                                <img
                                                  src="dist/img/img-thumb1.jpg"
                                                  alt="user"
                                                  className="avatar-img"
                                                />
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <div>
                                                <p className="file-name">
                                                  joel-mott-LaK153ghdigaghdi
                                                </p>
                                                <p className="file-size">
                                                  3,028 KB
                                                </p>
                                              </div>
                                              <div>
                                                <div className="avatar avatar-xs avatar-rounded me-2">
                                                  <img
                                                    src="dist/img/avatar8.jpg"
                                                    alt="user"
                                                    className="avatar-img"
                                                  />
                                                </div>
                                                <a
                                                  href="/"
                                                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
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
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Download
                                                  </a>
                                                  <a
                                                    className="dropdown-item ms-0"
                                                    href="/"
                                                  >
                                                    Delete
                                                  </a>
                                                </div>
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
                          <div className="tab-pane fade" id="tab_activity">
                            <div className="mt-5 mb-2">
                              <div className="title title-lg mb-0">
                                <span>Latest activity</span>
                              </div>
                            </div>
                            <div className="collapse-simple">
                              <div className="card">
                                <div className="card-header">
                                  <a
                                    role="button"
                                    data-bs-toggle="collapse"
                                    href="/activity_1"
                                    aria-expanded="true"
                                  >
                                    Today
                                  </a>
                                </div>
                                <div id="activity_1" className="collapse show">
                                  <div className="card-body">
                                    <ul className="activity-list list-group list-group-flush">
                                      <li className="list-group-item">
                                        <div className="media">
                                          <div className="media-head">
                                            <div className="avatar avatar-sm avatar-primary avatar-rounded">
                                              <span className="initial-wrap">
                                                H
                                              </span>
                                            </div>
                                          </div>
                                          <div className="media-body">
                                            <p>
                                              <span className="text-dark">
                                                Hencework
                                              </span>{" "}
                                              on Documentation link is working
                                              now -{" "}
                                              <a href="/" className="link-url">
                                                <u>
                                                  ttps://hencework.com/theme/jampa
                                                </u>
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
                                              <span className="text-dark">
                                                Morgan Fregman
                                              </span>{" "}
                                              completed react conversion of{" "}
                                              <a
                                                href="/"
                                                className="link-default"
                                              >
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
                                              <span className="text-dark">
                                                Jimmy Carry
                                              </span>
                                              completed side bar menu on{" "}
                                              <a
                                                href="/"
                                                className="link-default"
                                              >
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
                                              <span className="text-dark">
                                                Charlie Chaplin
                                              </span>{" "}
                                              deleted empty cards on{" "}
                                              <a
                                                href="/"
                                                className="link-default"
                                              >
                                                <u>completed</u>
                                              </a>
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
                              <div className="card">
                                <div className="card-header">
                                  <a
                                    role="button"
                                    data-bs-toggle="collapse"
                                    href="/activity_2"
                                    aria-expanded="true"
                                  >
                                    Yesterday
                                  </a>
                                </div>
                                <div id="activity_2" className="collapse show">
                                  <div className="card-body">
                                    <ul className="activity-list list-group list-group-flush">
                                      <li className="list-group-item">
                                        <div className="media">
                                          <div className="media-head">
                                            <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                                              <span className="initial-wrap">
                                                W
                                              </span>
                                            </div>
                                          </div>
                                          <div className="media-body">
                                            <p>
                                              <span className="text-dark">
                                                Winston Churchills
                                              </span>{" "}
                                              created a note on UI components
                                              task list
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
                                              <span className="text-dark">
                                                Morgan Fregman
                                              </span>{" "}
                                              completed react conversion of{" "}
                                              <a
                                                href="/"
                                                className="link-default"
                                              >
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
                                              <span className="text-dark">
                                                Jimmy Carry
                                              </span>
                                              added shared components to{" "}
                                              <a
                                                href="/"
                                                className="link-default"
                                              >
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
                                              <span className="initial-wrap">
                                                H
                                              </span>
                                            </div>
                                          </div>
                                          <div className="media-body">
                                            <p>
                                              <span className="text-dark">
                                                Hencework
                                              </span>{" "}
                                              commented on{" "}
                                              <a
                                                href="/"
                                                className="link-default"
                                              >
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
                                              <span className="text-dark">
                                                Charlie Chaplin
                                              </span>{" "}
                                              moved components from all modules
                                              to in progress
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
                                              <span className="initial-wrap">
                                                W
                                              </span>
                                            </div>
                                          </div>
                                          <div className="media-body">
                                            <p>
                                              <span className="text-dark">
                                                Winston Churchills
                                              </span>{" "}
                                              created a note on UI components
                                              task list
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
                      <div className="task-action-wrap">
                        <div className="nicescroll-bar">
                          <div className="title title-xs text-primary">
                            <span>Action</span>
                          </div>
                          <ul className="nav nav-sm nav-icon nav-vertical nav-light">
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="edit"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">Edit</span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="user"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">Assign to</span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="paperclip"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">
                                  Attach files
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="tag"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">
                                  ApplyLabels
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="calendar"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">
                                  Set Due Date
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="bookmark"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">
                                  Follow Task
                                </span>
                              </a>
                            </li>
                          </ul>
                          <div className="hk-separator hk-separator-sm hk-secondary-separator"></div>
                          <ul className="nav nav-sm nav-icon nav-vertical nav-light">
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="arrow-up"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">
                                  Set as Top Priority
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="repeat"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">
                                  Change Status
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="pocket"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">
                                  Save as Template
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="archive"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">
                                  Move to archive
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">
                                <span className="nav-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="trash-2"></i>
                                  </span>
                                </span>
                                <span className="nav-link-text">Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Task Details --> */}

              {/* <!-- Add New Card --> */}
              <div
                id="add_new_card"
                className="modal fade add-new-task"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
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
                      <h5 className="mb-4">Create New Card</h5>
                      <form>
                        <div className="row gx-3">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Name</label>
                              <input
                                className="form-control task-name"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Start Date</label>
                              <input
                                className="form-control"
                                name="single-date-pick"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">End Date</label>
                              <input
                                className="form-control"
                                name="single-date-pick"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                Note/Description
                              </label>
                              <textarea
                                className="form-control"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group mt-3">
                              <label className="form-label">
                                Set priority:
                              </label>
                              <div className="form-check form-check-inline">
                                <div className="form-check form-check-primary">
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
                                <div className="form-check form-check-primary">
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
                                <div className="form-check form-check-primary">
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
                      </form>
                    </div>
                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-add-task"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Add New Card --> */}

              {/* <!-- Add Task List --> */}
              <div
                id="add_task_list"
                className="modal fade add-tasklist-modal"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-sm"
                  role="document"
                >
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
                      <h5 className="mb-4">Add Task List</h5>
                      <form>
                        <div className="row gx-3">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Name</label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-add-tasklist"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Add Task List --> */}

              {/* <!-- Edit Task List --> */}
              <div
                id="edit_task_list"
                className="modal fade edit-tasklist-modal"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-sm"
                  role="document"
                >
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
                      <h5 className="mb-4">Create Task List</h5>
                      <form>
                        <div className="row gx-3">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Name</label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-edit-tasklist"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Edit Task List --> */}
            </div>
          </div>
        </div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
    </div>
  );
};

export default BoardContent;
