import React, { useContext, useEffect, useState } from "react";
import TaskHeader from "./components/TaskHeader";
import TaskHeading from "./components/TaskHeading";
import { CiMenuKebab } from "react-icons/ci";

import moment from "moment";
import {
  FaEdit,
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaTrash,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getTaskDetails } from "../../redux/services/project-task";
import { updateContactRec } from "../../redux/services/contact";
import { Link } from "react-router-dom";
import { SocketContext } from "../../Context";
const TasksContent = ({ tasksData, token, contactsData, boardDetails }) => {
  const { handleToggleShowLeadDetail } = useContext(SocketContext);
  const [updateTaskData, setUpdateTaskData] = useState({});
  const dispatch = useDispatch();
  const [pendingData, setPendingData] = useState();
  const [inProgressData, setInProgressData] = useState();
  const [completedData, setCompletedData] = useState();
  useEffect(() => {
    const pending = contactsData?.filter(
      (task) =>
        task.board_status === "pending" && task.board_id === boardDetails?.id
    );
    setPendingData(pending);
    const inProgress = contactsData?.filter(
      (task) =>
        task.board_status === "in-progress" &&
        task.board_id === boardDetails?.id
    );
    setInProgressData(inProgress);
    const completed = contactsData?.filter(
      (task) =>
        task.board_status === "completed" && task.board_id === boardDetails?.id
    );
    setCompletedData(completed);
  }, [contactsData, boardDetails]);
  // const pendingData =
  //   contactsData?.length > 0 &&
  //   contactsData?.filter(
  //     (task) =>
  //       task.board_status === "pending" && task.board_id === boardDetails?.id
  //   );
  // const inProgressData =
  //   contactsData?.length > 0 &&
  //   contactsData?.filter(
  //     (task) =>
  //       task.board_status === "in-progress" &&
  //       task.board_id === boardDetails?.id
  //   );
  // const completedData =
  //   contactsData?.length > 0 &&
  //   contactsData?.filter(
  //     (task) =>
  //       task.board_status === "completed" && task.board_id === boardDetails?.id
  //   );
  const handleUpdateTask = (id) => {
    dispatch(getTaskDetails(token, id));
  };
  const handleDragStart = (event, taskId) => {
    setUpdateTaskData({ task_id: taskId });
    // const element = document.querySelector("#boardTaskList");
    // element.style.backgroundColor = "black";
    // element.style.color = "white";
  };
  const handleDrop = (event, status) => {
    event.preventDefault();
    dispatch(
      updateContactRec(token, updateTaskData?.task_id, { board_status: status })
    );
    setUpdateTaskData({});
  };
  return (
    <div>
      {/* <div className="taskboardapp-detail-wrap"> */}
      <div>
        <TaskHeader />
        <div className="taskboard-body">
          <div>
            {/* <TaskHeading /> */}
            {/* <Kanban /> */}
            <div id="kb_scroll" className="tasklist-scroll position-relative">
              <div id="tasklist_wrap" className="tasklist-wrap">
                {/* <div className="card card-simple card-border tasklist">
                  <div className="card-header  bg-primary  d-flex">
                    <h6 className="text-uppercase fw-bold mb-0 d-flex justify-content-between w-100">
                      <span className="" style={{ color: "white" }}>
                        All Modules
                      </span>
                      <span className="badge badge-pill badge-soft-violet">
                        {contactsData?.length}
                      </span>
                    </h6>
                  </div>
                  <div data-simplebar className="card-body">
                    <div style={{ height: "500px", overflow: "scroll" }}>
                      {contactsData?.length > 0 &&
                        contactsData.map((task, index) => (
                          <Link
                            className="card card-border card-simple tasklist-card"
                            key={index}
                            to={"/contacts"}
                            onClick={() =>
                              handleToggleShowLeadDetail(true, task.id, token)
                            }
                          >
                            <div className="card-header card-header-action">
                              <h6 className="fw-bold">
                                {task?.firstname +
                                  " " +
                                  task?.middlename +
                                  "" +
                                  task?.lastname}
                              </h6>
                              <div className="card-action-wrap">
                                <a
                                  className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  href="/"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <CiMenuKebab />
                                    </span>
                                  </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <button
                                    className="dropdown-item"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit_project_task"
                                    onClick={() => handleUpdateTask(task?.id)}
                                  >
                                    <span className="feather-icon dropdown-icon">
                                      <FaEdit />
                                    </span>
                                    <span>Edit</span>
                                  </button>

                                  <a
                                    className="dropdown-item delete-task"
                                    href="/"
                                  >
                                    <span className="feather-icon dropdown-icon">
                                      <FaTrash />
                                    </span>
                                    <span>Delete</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="">
                                {task?.biography?.slice(0, 150)}...
                              </div>

                              <div className="d-flex justify-content-end">
                                {task?.social_links?.map((link, index) => (
                                  <div key={index}>
                                    {link?.name === "facebook" && (
                                      <a
                                        href={link?.link}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaFacebook size={20} />
                                      </a>
                                    )}
                                    {link?.name === "linkedin" && (
                                      <a
                                        href={link?.linkedin}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaLinkedin size={20} />
                                      </a>
                                    )}
                                    {link?.name === "gmail" && (
                                      <a
                                        href={link?.link}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaGoogle size={20} />
                                      </a>
                                    )}
                                    {link?.name === "linkedin" && (
                                      <a
                                        href={link?.linkedin}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaTwitter size={20} />
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                               <div className="avatar-group avatar-group-overlapped">
                                {task.asign_to?.members?.map(
                                  (member, index) => (
                                    <div
                                      key={index}
                                      className="avatar avatar-rounded"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-bs-original-title="Dean"
                                    >
                                      <img
                                        src={member.image}
                                        alt="user"
                                        className="avatar-img"
                                      />
                                    </div>
                                  )
                                )}
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
                                <span className="task-deadline">
                                  {moment(task?.created_at).format(
                                    "DD MMM YYYY"
                                  )}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div> */}
                <div
                  className="card card-simple card-border tasklist"
                  onDrop={(event) => handleDrop(event, "pending")}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <div className="card-header  bg-primary  d-flex">
                    <h6 className="text-uppercase fw-bold mb-0 d-flex justify-content-between w-100">
                      <span className="" style={{ color: "white" }}>
                        Pending
                      </span>
                      <span className="badge badge-pill badge-soft-violet">
                        {pendingData?.length}
                      </span>
                    </h6>
                  </div>
                  <div data-simplebar className="card-body">
                    <div style={{ height: "500px", overflow: "scroll" }}>
                      {pendingData?.length > 0 &&
                        pendingData.map((task, index) => (
                          <Link
                            className="card card-border card-simple tasklist-card"
                            id="boardTaskList"
                            key={index}
                            draggable
                            to={"/contacts"}
                            onClick={() =>
                              handleToggleShowLeadDetail(true, task.id, token)
                            }
                            onDragStart={(event) =>
                              handleDragStart(event, task.id)
                            }
                            // onDragStart={(e) => onDragStart(e, task.id)}
                            // onDragEnd={(e) => onDragEnd(e)}
                          >
                            <div className="card-header card-header-action">
                              <h6 className="fw-bold">
                                {task?.firstname +
                                  " " +
                                  task?.middlename +
                                  "" +
                                  task?.lastname}
                              </h6>{" "}
                              <div className="card-action-wrap">
                                <a
                                  className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  href="/"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      {/* <i data-feather="more-vertical"></i> */}
                                      <CiMenuKebab />
                                    </span>
                                  </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <button
                                    className="dropdown-item"
                                    // data-bs-toggle="modal"
                                    // data-bs-target="#edit_project_task"
                                    onClick={() => handleUpdateTask(task.id)}
                                  >
                                    <span className="feather-icon dropdown-icon">
                                      {/* <i data-feather="edit-2"></i> */}
                                      <FaEdit />
                                    </span>
                                    <span>Edit</span>
                                  </button>

                                  <a
                                    className="dropdown-item delete-task"
                                    href="/"
                                  >
                                    <span className="feather-icon dropdown-icon">
                                      {/* <i data-feather="trash-2"></i> */}
                                      <FaTrash />
                                    </span>
                                    <span>Delete</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="avatar-group avatar-group-overlapped">
                                {task.asign_to?.members?.map(
                                  (member, index) => (
                                    <div
                                      key={index}
                                      className="avatar avatar-rounded"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-bs-original-title="Dean"
                                    >
                                      <img
                                        src={member.image}
                                        alt="user"
                                        className="avatar-img"
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                              <div>{task?.biography?.slice(0, 150)}...</div>
                              <div className="d-flex justify-content-end">
                                {task?.social_links?.map((link, index) => (
                                  <div key={index}>
                                    {link?.name === "facebook" && (
                                      <a
                                        href={link?.link}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaFacebook size={20} />
                                      </a>
                                    )}
                                    {link?.name === "linkedin" && (
                                      <a
                                        href={link?.linkedin}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaLinkedin size={20} />
                                      </a>
                                    )}
                                    {link?.name === "gmail" && (
                                      <a
                                        href={link?.link}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaGoogle size={20} />
                                      </a>
                                    )}
                                    {link?.name === "linkedin" && (
                                      <a
                                        href={link?.linkedin}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaTwitter size={20} />
                                      </a>
                                    )}
                                  </div>
                                ))}
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
                                <span className="task-deadline">
                                  {moment(task.created_at).format(
                                    "DD MMM YYYY"
                                  )}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
                <div
                  className="card card-simple card-border tasklist"
                  onDrop={(event) => handleDrop(event, "in-progress")}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <div className="card-header  bg-primary  d-flex">
                    <h6 className="text-uppercase fw-bold mb-0 d-flex justify-content-between w-100">
                      <span className="" style={{ color: "white" }}>
                        In Progress{" "}
                      </span>
                      <span className="badge badge-pill badge-soft-violet">
                        {inProgressData?.length}
                      </span>
                    </h6>
                  </div>
                  <div data-simplebar className="card-body">
                    <div style={{ height: "500px", overflow: "scroll" }}>
                      {inProgressData?.length > 0 &&
                        inProgressData.map((task, index) => (
                          <Link
                            className="card card-border card-simple tasklist-card"
                            id="boardTaskList"
                            key={index}
                            draggable
                            onDragStart={(event) =>
                              handleDragStart(event, task.id)
                            }
                            to={"/contacts"}
                            onClick={() =>
                              handleToggleShowLeadDetail(true, task.id, token)
                            }

                            // onDragStart={(e) => onDragStart(e, task.id)}
                            // onDragEnd={(e) => onDragEnd(e)}
                          >
                            <div className="card-header card-header-action">
                              <h6 className="fw-bold">
                                {task?.firstname +
                                  " " +
                                  task?.middlename +
                                  "" +
                                  task?.lastname}
                              </h6>{" "}
                              <div className="card-action-wrap">
                                <a
                                  className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  href="/"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      {/* <i data-feather="more-vertical"></i> */}
                                      <CiMenuKebab />
                                    </span>
                                  </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <button
                                    className="dropdown-item"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit_project_task"
                                    onClick={() => handleUpdateTask(task.id)}
                                  >
                                    <span className="feather-icon dropdown-icon">
                                      {/* <i data-feather="edit-2"></i> */}
                                      <FaEdit />
                                    </span>
                                    <span>Edit</span>
                                  </button>

                                  <a
                                    className="dropdown-item delete-task"
                                    href="/"
                                  >
                                    <span className="feather-icon dropdown-icon">
                                      {/* <i data-feather="trash-2"></i> */}
                                      <FaTrash />
                                    </span>
                                    <span>Delete</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="avatar-group avatar-group-overlapped">
                                {task.asign_to?.members?.map(
                                  (member, index) => (
                                    <div
                                      key={index}
                                      className="avatar avatar-rounded"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-bs-original-title="Dean"
                                    >
                                      <img
                                        src={member.image}
                                        alt="user"
                                        className="avatar-img"
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                              <div>{task?.biography?.slice(0, 150)}...</div>
                              <div className="d-flex justify-content-end">
                                {task?.social_links?.map((link, index) => (
                                  <div key={index}>
                                    {link?.name === "facebook" && (
                                      <a
                                        href={link?.link}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaFacebook size={20} />
                                      </a>
                                    )}
                                    {link?.name === "linkedin" && (
                                      <a
                                        href={link?.linkedin}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaLinkedin size={20} />
                                      </a>
                                    )}
                                    {link?.name === "gmail" && (
                                      <a
                                        href={link?.link}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaGoogle size={20} />
                                      </a>
                                    )}
                                    {link?.name === "linkedin" && (
                                      <a
                                        href={link?.linkedin}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaTwitter size={20} />
                                      </a>
                                    )}
                                  </div>
                                ))}
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
                                <span className="task-deadline">
                                  {moment(task.created_at).format(
                                    "DD MMM YYYY"
                                  )}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
                <div
                  className="card card-simple card-border tasklist"
                  onDrop={(event) => handleDrop(event, "completed")}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <div className="card-header  bg-primary  d-flex">
                    <h6 className="text-uppercase fw-bold mb-0 d-flex justify-content-between w-100">
                      <span className="" style={{ color: "white" }}>
                        Completed
                      </span>
                      <span className="badge badge-pill badge-soft-violet">
                        {completedData?.length}
                      </span>
                    </h6>
                  </div>
                  <div data-simplebar className="card-body">
                    <div style={{ height: "500px", overflow: "scroll" }}>
                      {completedData?.length > 0 &&
                        completedData.map((task, index) => (
                          <Link
                            className="card card-border card-simple tasklist-card"
                            id="boardTaskList"
                            key={index}
                            draggable
                            onDragStart={(event) =>
                              handleDragStart(event, task.id)
                            }
                            to={"/contacts"}
                            onClick={() =>
                              handleToggleShowLeadDetail(true, task.id, token)
                            }
                            // onDragStart={(e) => onDragStart(e, task.id)}
                            // onDragEnd={(e) => onDragEnd(e)}
                          >
                            <div className="card-header card-header-action">
                              <h6 className="fw-bold">
                                {task?.firstname +
                                  " " +
                                  task?.middlename +
                                  "" +
                                  task?.lastname}
                              </h6>{" "}
                              <div className="card-action-wrap">
                                <a
                                  className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  href="/"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      {/* <i data-feather="more-vertical"></i> */}
                                      <CiMenuKebab />
                                    </span>
                                  </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <button
                                    className="dropdown-item"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit_project_task"
                                    onClick={() => handleUpdateTask(task.id)}
                                  >
                                    <span className="feather-icon dropdown-icon">
                                      {/* <i data-feather="edit-2"></i> */}
                                      <FaEdit />
                                    </span>
                                    <span>Edit</span>
                                  </button>

                                  <a
                                    className="dropdown-item delete-task"
                                    href="/"
                                  >
                                    <span className="feather-icon dropdown-icon">
                                      {/* <i data-feather="trash-2"></i> */}
                                      <FaTrash />
                                    </span>
                                    <span>Delete</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="avatar-group avatar-group-overlapped">
                                {task.asign_to?.members?.map(
                                  (member, index) => (
                                    <div
                                      key={index}
                                      className="avatar avatar-rounded"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-bs-original-title="Dean"
                                    >
                                      <img
                                        src={member.image}
                                        alt="user"
                                        className="avatar-img"
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                              <div>{task?.biography?.slice(0, 150)}...</div>
                              <div className="d-flex justify-content-end">
                                {task?.social_links?.map((link, index) => (
                                  <div key={index}>
                                    {link?.name === "facebook" && (
                                      <a
                                        href={link?.link}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaFacebook size={20} />
                                      </a>
                                    )}
                                    {link?.name === "linkedin" && (
                                      <a
                                        href={link?.linkedin}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaLinkedin size={20} />
                                      </a>
                                    )}
                                    {link?.name === "gmail" && (
                                      <a
                                        href={link?.link}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaGoogle size={20} />
                                      </a>
                                    )}
                                    {link?.name === "linkedin" && (
                                      <a
                                        href={link?.linkedin}
                                        className="btn btn-icon btn-rounded"
                                      >
                                        <FaTwitter size={20} />
                                      </a>
                                    )}
                                  </div>
                                ))}
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
                                <span className="task-deadline">
                                  {moment(task.created_at).format(
                                    "DD MMM YYYY"
                                  )}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
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
