import React, { useState } from "react";
import {
  FaLayerGroup,
  FaLock,
  FaPlus,
  FaStar,
  FaTrash,
  FaUserCheck,
} from "react-icons/fa";
import { addBoardHelper, updateBoard } from "../../../redux/slices/board";
const SideNav = ({
  boardsData,
  onDataFromChild,
  dispatch,
  onToggleDataFromChild,
}) => {
  const [activeBar, setActiveBar] = useState("all");
  const onAllClick = () => {
    setActiveBar("all");
    onToggleDataFromChild(false);
    const data = boardsData?.filter((board) => board.visibility !== "deleted");
    onDataFromChild(data);
  };
  const onStaredClick = () => {
    onToggleDataFromChild(false);

    setActiveBar("stared");
    const data = boardsData?.filter((board) => board.visibility === "stared");
    onDataFromChild(data);
  };
  const onPublicClick = () => {
    onToggleDataFromChild(false);

    setActiveBar("public");
    const data = boardsData?.filter((board) => board.visibility === "public");
    onDataFromChild(data);
  };
  const onPrivateClick = () => {
    onToggleDataFromChild(false);

    setActiveBar("private");
    const data = boardsData?.filter((board) => board.visibility === "private");
    onDataFromChild(data);
  };
  const onDeletedClick = () => {
    onToggleDataFromChild(false);

    setActiveBar("deleted");
    const data = boardsData?.filter((board) => board.visibility === "deleted");
    onDataFromChild(data);
  };
  const handleAddBoard = () => {
    dispatch(addBoardHelper(null));
  };
  return (
    <nav className="taskboardapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <button
            className="btn btn-primary btn-rounded btn-block mb-4"
            data-bs-toggle="modal"
            data-bs-target="#add_new_board"
            onClick={handleAddBoard}
          >
            Add New Pipeline
          </button>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className={`nav-item ${activeBar === "all" ? "active" : ""}`}>
                <button className="nav-link btn-block" onClick={onAllClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="layout"></i> */}
                      <FaLayerGroup />
                    </span>
                  </span>
                  <span className="nav-link-text">All</span>
                </button>
              </li>
              <li
                className={`nav-item ${activeBar === "stared" ? "active" : ""}`}
              >
                <button className="nav-link btn-block" onClick={onStaredClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="star"></i> */}
                      <FaStar />
                    </span>
                  </span>
                  <span className="nav-link-text">Stared</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "private" ? "active" : ""
                }`}
              >
                <button className="nav-link btn-block" onClick={onPrivateClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="lock"></i> */}
                      <FaLock />
                    </span>
                  </span>
                  <span className="nav-link-text">Private</span>
                </button>
              </li>
              <li
                className={`nav-item ${activeBar === "public" ? "active" : ""}`}
              >
                <button className="nav-link btn-block" onClick={onPublicClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="user-check"></i> */}
                      <FaUserCheck />
                    </span>
                  </span>
                  <span className="nav-link-text">Public</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "deleted" ? "active" : ""
                }`}
              >
                <button className="nav-link btn-block" onClick={onDeletedClick}>
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
          <div className="separator separator-light"></div>
          {/* <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="title-sm text-primary mb-0">Favourite</div>
            <a
              href="/"
              className="btn btn-xs btn-icon btn-rounded btn-light"
              data-bs-toggle="modal"
              data-bs-target="#add_fav_board"
            >
              <span
                className="icon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Add Board"
              >
                <span className="feather-icon">
                  <FaPlus />
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
          <div className="alert alert-warning mt-5" role="alert">
            <h6 className="heading-wth-icon alert-heading">
              <span className="head-icon">
                <span className="feather-icon">
                  <i data-feather="zap-off"></i>
                </span>
              </span>
              Trial Ends on 14 Jan
            </h6>
            <p className="fs-7">
              Last 3 days left for your trial to end. Renew now to stay
              connected.
            </p>
          </div> */}
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="taskboardapp-fixednav">
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

export default SideNav;
