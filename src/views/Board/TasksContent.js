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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialItems = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
];
const SortableItem = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "16px",
    margin: "0 0 8px 0",
    backgroundColor: "#fff",
    border: "1px solid lightgrey",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </div>
  );
};
const TasksContent = ({ tasksData, token, contactsData, boardDetails }) => {
  const { handleToggleShowLeadDetail } = useContext(SocketContext);
  const [updateTaskData, setUpdateTaskData] = useState({});
  const dispatch = useDispatch();
  const [pendingData, setPendingData] = useState();
  const [inProgressData, setInProgressData] = useState();
  const [completedData, setCompletedData] = useState();
  const [statusArray, setStatusArray] = useState();
  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  useEffect(() => {
    const array = boardDetails?.pipeline_status_array?.status_array;
    setStatusArray(array);
  }, [boardDetails]);
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
            <div id="kb_scroll" className="tasklist-scroll position-relative">
              <div id="tasklist_wrap" className="tasklist-wrap border">
                <div className="d-flex">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={items}
                      strategy={verticalListSortingStrategy}
                    >
                      {items.map((item) => (
                        <SortableItem
                          key={item.id}
                          id={item.id}
                          content={item.content}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
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
