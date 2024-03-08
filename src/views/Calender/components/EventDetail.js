import moment from "moment";
import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import {
  FaAudioDescription,
  FaCalendar,
  FaCheckSquare,
  FaClock,
  FaEye,
  FaMap,
  FaMapMarked,
  FaUsers,
} from "react-icons/fa";

const EventDetail = ({ rightValue, onDataFromChild, eventDetails }) => {
  return (
    <div
      className="hk-drawer calendar-drawer drawer-right"
      style={{ right: rightValue }}
    >
      <div>
        <div className="drawer-header">
          <div className="drawer-header-action">
            <a
              href="/"
              id="edit_event"
              className="btn btn-sm btn-icon btn-flush-secondary btn-rounded flush-soft-hover"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="edit-2"></i>
                </span>
              </span>
            </a>
            <a
              href="/"
              id="del_event"
              className="btn btn-sm btn-icon btn-flush-secondary btn-rounded flush-soft-hover"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="trash-2"></i>
                </span>
              </span>
            </a>
            <a
              href="/"
              className="btn btn-sm btn-icon btn-flush-secondary btn-rounded flush-soft-hover me-2"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="external-link"></i>
                </span>
              </span>
            </a>
            <button
              type="button"
              className="drawer-close btn-close"
              onClick={() => onDataFromChild("-370px")}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <div className="drawer-body">
          <div data-simplebar className="nicescroll-bar">
            <div className="drawer-content-wrap">
              <div className="event-head mb-4">
                <span
                  className="badge  badge-indicator badge-indicator-xl flex-shrink-0 me-2"
                  style={{ backgroundColor: eventDetails?.event_color }}
                ></span>
                <div>
                  <div className="event-name">{eventDetails?.name}</div>
                  <span>Event</span>
                </div>
              </div>
              <ul className="event-detail">
                <li>
                  <span className="ev-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="calendar"></i> */}
                      <FaCalendar />
                    </span>
                  </span>
                  {moment(eventDetails?.start_date).format("DD MMM YYYY")} -{" "}
                  {moment(eventDetails?.end_date).format("DD MMM YYYY")}
                </li>
                <li>
                  <span className="ev-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="clock"></i> */}
                      <FaClock />
                    </span>
                  </span>
                  {moment(
                    moment(eventDetails?.start_date).format("YYYY-MM-DD") +
                      "T" +
                      eventDetails?.start_time
                  ).format("HH:MM a")}{" "}
                  -
                  {moment(
                    moment(eventDetails?.end_date).format("YYYY-MM-DD") +
                      "T" +
                      eventDetails?.end_time
                  ).format("HH:MM a")}
                  {/* 8:40 AM - 5:40 PM */}
                </li>
                <li>
                  <span className="ev-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="map-pin"></i> */}
                      <FaMapMarked />
                    </span>
                  </span>
                  {/* Oslo, Canada */}
                  {eventDetails?.location}
                </li>
                <li>
                  <span className="ev-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="check-square"></i> */}
                      <FaCheckSquare />
                    </span>
                  </span>
                  {/* Meetings */}
                  {eventDetails?.category}
                </li>
                <li>
                  <span className="ev-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="eye"></i> */}
                      <FaEye />
                    </span>
                  </span>
                  {eventDetails?.visibility}
                </li>
                <li>
                  <span className="ev-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="eye"></i> */}
                      <FaUsers />
                    </span>
                  </span>
                  <div className="avatar-group avatar-group-sm avatar-group-overlapped me-3">
                    {eventDetails?.team_members &&
                      eventDetails?.team_members?.members?.map(
                        (member, index) => (
                          <div
                            className="avatar avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Katharine"
                          >
                            <img
                              // src="dist/img/avatar8.jpg"
                              src={member.avatar}
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        )
                      )}

                    {eventDetails?.team_members?.members?.length > 3 && (
                      <div
                        className="avatar avatar-soft-danger avatar-rounded"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Tooltip text"
                      >
                        <span className="initial-wrap">
                          {eventDetails?.team_members?.memebers?.length - 3}+
                        </span>
                      </div>
                    )}
                  </div>
                </li>
                <li>
                  <span className="ev-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="menu"></i> */}
                      <FaAudioDescription />
                    </span>
                  </span>
                  {eventDetails?.description}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="d-none">
        <div className="drawer-header">
          <div className="drawer-header-action">
            <a
              href="/"
              className="btn btn-sm btn-icon btn-flush-secondary btn-rounded flush-soft-hover me-2"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="external-link"></i>
                </span>
              </span>
            </a>
            <button type="button" className="drawer-edit-close btn-close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <div className="drawer-body">
          <div data-simplebar className="nicescroll-bar">
            <div className="drawer-content-wrap">
              <div className="event-head mb-4">
                <span className="badge badge-violet badge-indicator badge-indicator-xl flex-shrink-0 me-2"></span>
                <div>
                  <div className="event-name" contenteditable="true">
                    Jampack Team Meet
                  </div>
                  <div className="form-group mt-2 mb-0">
                    <div className="form-check form-check-inline ps-0">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="event_1"
                          name="eventSelect"
                          className="form-check-input"
                          checked=""
                        />
                        <label className="form-check-label" for="event_1">
                          Event
                        </label>
                      </div>
                    </div>
                    <div className="form-check form-check-inline ps-0">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="reminder_1"
                          name="eventSelect"
                          className="form-check-input"
                        />
                        <label className="form-check-label" for="reminder_1">
                          Reminder
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-affix-wrapper">
                      <span className="input-prefix">
                        <span className="feather-icon">
                          <i data-feather="calendar"></i>
                        </span>
                      </span>
                      <input
                        className="form-control form-wth-icon"
                        name="datetimes"
                        value="Aug 18,2020 - Aug 19, 2020"
                      />
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-affix-wrapper">
                      <span className="input-prefix">
                        <span className="feather-icon">
                          <i data-feather="clock"></i>
                        </span>
                      </span>
                      <input
                        type="text"
                        className="form-control form-wth-icon input-timepicker"
                        value="8:40 AM - 5:40 PM"
                      />
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-affix-wrapper">
                      <span className="input-prefix">
                        <span className="feather-icon">
                          <i data-feather="map-pin"></i>
                        </span>
                      </span>
                      <input
                        type="text"
                        className="form-control form-wth-icon"
                        value="Oslo, Canada"
                      />
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-affix-wrapper">
                      <span className="input-prefix">
                        <span className="feather-icon">
                          <i data-feather="check-square"></i>
                        </span>
                      </span>
                      <select className="form-select">
                        <option selected="" value="1">
                          All Time
                        </option>
                        <option value="2">Half Day</option>
                        <option value="3">9 to 5</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-affix-wrapper">
                      <span className="input-prefix">
                        <span className="feather-icon">
                          <i data-feather="eye"></i>
                        </span>
                      </span>
                      <select className="form-select">
                        <option selected="">Default Visibility</option>
                        <option value="1">Private</option>
                        <option value="2">Public</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group color-picker">
                    <span className="input-group-text colorpicker-input-addon">
                      <i></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      value="#007D88"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="d-flex flex-wrap">
                    <div className="chip chip-primary chip-dismissable user-chip mb-2 me-2">
                      <span>
                        <span className="avatar">
                          <img
                            src="dist/img/avatar11.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                        </span>
                        <span className="chip-text">Morgan</span>
                        <button type="button" className="btn-close"></button>
                      </span>
                    </div>
                    <div className="chip chip-primary chip-dismissable user-chip mb-2 me-2">
                      <span>
                        <span className="avatar">
                          <img
                            src="dist/img/avatar12.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                        </span>
                        <span className="chip-text">Charlie</span>
                        <button type="button" className="btn-close"></button>
                      </span>
                    </div>
                    <div className="chip chip-primary chip-dismissable user-chip mb-2 me-2">
                      <span>
                        <span className="avatar">
                          <img
                            src="dist/img/avatar13.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                        </span>
                        <span className="chip-text">Winston</span>
                        <button type="button" className="btn-close"></button>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control border-0 p-0 shadow-none flex-1 mb-2 me-2"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea className="form-control" rows="4">
                    Annual meeting with global branch teams & bosses about
                    growth planning and fiscal year reports
                  </textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="drawer-footer d-flex justify-content-end">
          <button className="btn btn-secondary drawer-edit-close me-2">
            discard
          </button>
          <button className="btn btn-primary drawer-edit-close">save</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
