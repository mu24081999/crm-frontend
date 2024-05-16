import React, { useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArchive,
  FaBicycle,
  FaCalendar,
  FaCheckSquare,
  FaCog,
  FaCommentSlash,
  FaEdit,
  FaInbox,
  FaRecycle,
  FaSort,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getEmailList } from "../../../../../redux/services/email";
import { getUsers } from "../../../../../redux/services/users";

const EmailsHeader = ({ onDataFromChild, emailsData, authUser }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { token } = useSelector((state) => state.auth);
  const handleSentClick = () => {
    const data = emailsData.filter((data) => data.sender === authUser.email);
    onDataFromChild(data);
  };
  const refresh = () => {
    dispatch(getEmailList(token, authUser.email, 20, 1));
    dispatch(getUsers(token));
  };
  const handleNextClick = () => {
    setPage((newNextPage) => {
      const nextPage = newNextPage + 1;
      dispatch(getEmailList(token, authUser.email, 20, nextPage));
      return nextPage;
    });
  };

  const handlePrevClick = () => {
    setPage((newPrevPage) => {
      const prevPage = newPrevPage - 1;
      dispatch(getEmailList(token, authUser.email, 20, prevPage));
      return prevPage;
    });
  };
  return (
    <header class="aside-header">
      <div>
        <span style={{ cursor: "pointer" }} onClick={handlePrevClick}>
          <FaAngleLeft />
        </span>
        <span onClick={handleNextClick}>
          <FaAngleRight style={{ cursor: "pointer" }} />
        </span>
        <span className="ps-3" style={{ fontSize: "12px" }}>
          1-{emailsData?.length} Page number {page}
        </span>
      </div>
      <div class="d-flex">
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover me-0"
          // href="/"
          onClick={refresh}
        >
          <span class="icon">
            <span class="feather-icon">
              {/* <i data-feather="refresh-cw"></i> */}
              <FaRecycle />
            </span>
          </span>
        </a>
        {/* <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
          // href="/"
          data-bs-toggle="dropdown"
        >
          <span class="icon">
            <span class="feather-icon">
              <FaCog />
            </span>
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              <FaCommentSlash />
            </span>
            <span>Show unread messages</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">

              <FaStar />
            </span>
            <span>Show Starred Messages</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              <FaCalendar />
            </span>
            <span>Sort by Date</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              <FaSort />
            </span>
            <span>Sort by Category</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              <FaCheckSquare />
            </span>
            <span>Mark all as read</span>
          </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/">
            Settings
          </a>
          <a class="dropdown-item" href="/">
            Help
          </a>
          <a class="dropdown-item" href="/">
            Report a problem{" "}
          </a>
        </div> */}
        <a
          href="/"
          class="btn btn-icon btn-rounded show-compose-popup btn-primary"
        >
          <span class="icon">
            <span class="feather-icon">
              {/* <i data-feather="edit"></i> */}
              <FaEdit />
            </span>
          </span>
        </a>
      </div>
      <div class="hk-sidebar-togglable"></div>
    </header>
  );
};

export default EmailsHeader;
