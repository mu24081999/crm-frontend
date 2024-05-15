import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { SocketContext } from "../../../../Context";
import { MdOutlineSubscriptions, MdSubscriptions } from "react-icons/md";
import { PiHourglassLowFill } from "react-icons/pi";

const Sidebar = ({ onSendData, contactsData, onToggleEdit, subscriptions }) => {
  const [activeBar, setActiveBar] = useState("all");
  const { handleToggleShowLeadDetail } = useContext(SocketContext);

  const handleActiveClick = () => {
    const data = subscriptions.filter((sub) => sub.active === 1);
    setActiveBar("active");
    onSendData(data);
    handleToggleShowLeadDetail(false);

    onToggleEdit(false);
  };
  const handleAllClick = () => {
    const filterData = subscriptions;
    setActiveBar("all");
    // onToggleEdit(false);
    handleToggleShowLeadDetail(false);

    onSendData(filterData);
  };
  const onDelayedClick = () => {
    const filterData = subscriptions?.filter(
      (subscription) => subscription.status === "delayed"
    );
    setActiveBar("delayed");
    // onToggleEdit(false);
    handleToggleShowLeadDetail(false);

    onSendData(filterData);
  };
  const onRequiredClick = () => {
    const filterData = subscriptions?.filter(
      (subscription) => subscription.status === "subscription-required"
    );
    setActiveBar("subscription-required");
    // onToggleEdit(false);
    handleToggleShowLeadDetail(false);

    onSendData(filterData);
  };
  return (
    <nav className="contactapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <div className="menu-group p-1">
            <ul className="nav nav-light navbar-nav flex-column">
              <li
                id="all_contacts"
                className={`nav-item ${activeBar === "all" ? "active" : ""}`}
              >
                <button onClick={handleAllClick} className="nav-link btn-block">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="inbox"></i> */}
                      <MdOutlineSubscriptions />
                    </span>
                  </span>
                  <span className="nav-link-text">All Subscriptions</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "delayed" ? "active" : ""
                }`}
              >
                <button className="nav-link btn-block" onClick={onDelayedClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="star"></i> */}
                      <PiHourglassLowFill />
                    </span>
                  </span>
                  <span className="nav-link-text">Delayed</span>
                </button>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "subscription-required" ? "active" : ""
                }`}
              >
                <button
                  className="nav-link btn-block"
                  onClick={onRequiredClick}
                >
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="archive"></i> */}
                      <MdSubscriptions />
                    </span>
                  </span>
                  <span className="nav-link-text">Subscription Required</span>
                </button>
              </li>

              <li
                className={`nav-item ${activeBar === "active" ? "active" : ""}`}
              >
                <button
                  id="deleted_contacts"
                  onClick={handleActiveClick}
                  className="nav-link btn-block"
                >
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="trash-2"></i> */}
                      <FaCheck />
                    </span>
                  </span>
                  <span className="nav-link-text">Active</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="contactapp-fixednav">
        <div className="hk-toolbar"></div>
      </div>
      {/* <!--/ Sidebar Fixnav--> */}
    </nav>
  );
};

export default Sidebar;
