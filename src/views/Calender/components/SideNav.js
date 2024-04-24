import React from "react";
import ReactCalendar from "../../../components/ReactCalendar/ReactCalendar";
import { FaCalendar } from "react-icons/fa";
import moment from "moment";
import Calender from "../../../components/Calender/Calender";

const SideNav = ({
  upcomingData,
  eventsData,
  isLoading,
  INITIAL_EVENTS,
  onDataFromChild,
  token,
  dispatch,
}) => {
  console.log("🚀 ~ eventsData:", eventsData);
  return (
    <nav className="calendarapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <button
            className="btn btn-primary btn-rounded btn-block  "
            // data-bs-toggle="dropdown"
            data-bs-toggle="modal"
            data-bs-target="#create_new_event"
          >
            <FaCalendar className="mx-1" />
            Create
          </button>
          {/* <ReactCalendar /> */}
          <div className="text-center mt-4">
            <div id="inline_calendar" className="d-inline-block">
              <input
                className="form-control invisible position-absolute"
                type="text"
                name="calendar"
                value=""
              />
            </div>
          </div>
          <div className="separator separator-light"></div>
          <div className="title-sm text-primary">Upcoming Events</div>
          <div className="upcoming-event-wrap">
            <ul className="nav nav-light navbar-nav flex-column">
              {upcomingData?.length > 0 &&
                upcomingData?.map((event, index) => (
                  <li className="nav-item">
                    <a className="nav-link">
                      <div className="d-flex align-items-center">
                        <span className="badge badge-violet badge-indicator badge-indicator-lg me-2"></span>
                        <span className="event-time">
                          {moment(event?.start_date).format("DD MMM,")},{" "}
                          {event?.start_time} onwards
                        </span>
                      </div>
                      <div className="event-name">{event.name}</div>
                    </a>
                  </li>
                ))}

              {/* <li className="nav-item">
                <a className="nav-link" href="/">
                  <div className="d-flex align-items-center">
                    <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>
                    <span className="event-time">Tomorrow, 2:35 PM</span>
                  </div>
                  <div className="event-name">Indigo Flight to Indonesia</div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <div className="d-flex align-items-center">
                    <span className="badge badge-warning badge-indicator badge-indicator-lg me-2"></span>
                    <span className="event-time">24 Jul, 9:30 AM</span>
                  </div>
                  <div className="event-name">Awwwards Conference</div>
                </a>
              </li> */}
            </ul>
          </div>

          <div className="separator separator-light"></div>
          {/* <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="title-sm text-primary mb-0">Categories</div>
            <a
              href="/"
              className="btn btn-xs btn-icon btn-rounded btn-light"
              data-bs-toggle="modal"
              data-bs-target="#add_new_cat"
            >
              <span
                className="icon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Add Category"
              >
                <span className="feather-icon">
                  <i data-feather="plus"></i>
                </span>
              </span>
            </a>
          </div>
          <div className="categories-wrap">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="customChecksc1"
                checked=""
              />
              <label className="form-check-label" for="customChecksc1">
                Meetings
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="customChecksc2"
                checked=""
              />
              <label className="form-check-label" for="customChecksc2">
                Flights
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="customChecksc3"
                checked=""
              />
              <label className="form-check-label" for="customChecksc3">
                Birthday
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="customChecksc4"
              />
              <label className="form-check-label" for="customChecksc4">
                Conferences
              </label>
            </div>
          </div> */}
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="calendarapp-fixednav">
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
