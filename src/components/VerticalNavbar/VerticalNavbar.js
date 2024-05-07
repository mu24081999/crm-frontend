import React from "react";
import brand from "../../assets/2.png";
import { Link, useLocation } from "react-router-dom";
import {
  FaCogs,
  FaPhoneAlt,
  FaPhoneSquareAlt,
  FaRegEnvelope,
  FaRegUser,
} from "react-icons/fa";
import { MdSupportAgent, MdSwapCalls } from "react-icons/md";
import { useSelector } from "react-redux";
import { CiMenuFries } from "react-icons/ci";
import { SiGmail } from "react-icons/si";
import logo from "./../../assets/4.png";
import { MdOutlineSubscriptions } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { RiContactsBook2Line, RiTodoLine } from "react-icons/ri";
import { GoFileDirectory } from "react-icons/go";
import { TiMessages } from "react-icons/ti";

const VerticalNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  return (
    <div className="hk-menu">
      {/* <!-- Brand --> */}
      <div className="menu-header">
        <span>
          <Link className="navbar-brand flex" to="/">
            <img
              className="brand-img img-fluid"
              src={brand}
              width={35}
              alt="brand"
            />
            <img
              className="brand-img img-fluid"
              src={logo}
              width={150}
              alt="brand"
            />
          </Link>
          <button className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle">
            <span className="icon">
              <span className="svg-icon fs-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-bar-to-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="10" y1="12" x2="20" y2="12"></line>
                  <line x1="10" y1="12" x2="14" y2="16"></line>
                  <line x1="10" y1="12" x2="14" y2="8"></line>
                  <line x1="4" y1="4" x2="4" y2="20"></line>
                </svg>
              </span>
            </span>
          </button>
        </span>
      </div>
      {/* <!-- /Brand --> */}

      {/* <!-- Main Menu --> */}
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          {/* <div className="menu-group">
            <ul className="navbar-nav flex-column">
              <li className="nav-item active">
                <Link className="nav-link" to={"/"}>
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-template"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="16" height="4" rx="1" />
                        <rect x="4" y="12" width="6" height="8" rx="1" />
                        <line x1="14" y1="12" x2="20" y2="12" />
                        <line x1="14" y1="16" x2="20" y2="16" />
                        <line x1="14" y1="20" x2="20" y2="20" />
                      </svg>
                    </span>
                  </span>
                  <span className="nav-link-text">Dashboard</span>
                  <span className="badge badge-sm badge-soft-pink ms-auto">
                    Hot
                  </span>
                </Link>
              </li>
            </ul>
          </div> */}
          <div className="menu-gap"></div>
          <div className="menu-group">
            {/* <div className="nav-header">
              <span>Apps</span>
            </div> */}
            <ul className="navbar-nav flex-column">
              <li
                className={`nav-item ${location?.pathname === "/" && "active"}`}
              >
                <Link className="nav-link" to={"/"}>
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-template"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="16" height="4" rx="1" />
                        <rect x="4" y="12" width="6" height="8" rx="1" />
                        <line x1="14" y1="12" x2="20" y2="12" />
                        <line x1="14" y1="16" x2="20" y2="16" />
                        <line x1="14" y1="20" x2="20" y2="20" />
                      </svg>
                    </span>
                  </span>
                  <span className="nav-link-text">Dashboard</span>
                </Link>
              </li>

              {(user?.parent_id !== null || user?.client_id !== null) &&
                (user?.role === "ADMIN" ||
                  user?.role === "SUPER_ADMIN" ||
                  user?.role === "USER" ||
                  user?.role === "AGENT") && (
                  <>
                    <li
                      className={`nav-item ${
                        (location?.pathname === "/chats" ||
                          location?.pathname === "/chat-group") &&
                        "active"
                      }`}
                    >
                      <a
                        className="nav-link"
                        href="/"
                        data-bs-toggle="collapse"
                        data-bs-target="#dash_chat"
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-message-dots"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                              <line x1="12" y1="11" x2="12" y2="11.01" />
                              <line x1="8" y1="11" x2="8" y2="11.01" />
                              <line x1="16" y1="11" x2="16" y2="11.01" />
                            </svg>
                          </span>
                        </span>
                        <span className="nav-link-text">Chat</span>
                      </a>
                      <ul
                        id="dash_chat"
                        className="nav flex-column collapse  nav-children"
                      >
                        <li className="nav-item">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <Link to={"/chats"} className="nav-link">
                                <span className="nav-link-text">Chats</span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/chat-group">
                                <span className="nav-link-text">Groups</span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>

                    <li
                      className={`nav-item ${
                        location?.pathname === "/projects-board" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/projects-board">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <CiMenuFries />
                          </span>
                        </span>
                        <span className="nav-link-text">Leads Pipeline</span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/file-manager" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/file-manager">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <GoFileDirectory />
                          </span>
                        </span>
                        <span className="nav-link-text">File Manager</span>
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/"
                      data-bs-toggle="collapse"
                      data-bs-target="#dash_scrumboard"
                    >
                      <span className="nav-icon-wrap position-relative">
                        <span className="badge badge-sm badge-primary badge-sm badge-pill position-top-end-overflow">
                          3
                        </span>
                        <span className="svg-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-layout-kanban"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="4" y1="4" x2="10" y2="4" />
                            <line x1="14" y1="4" x2="20" y2="4" />
                            <rect x="4" y="8" width="6" height="12" rx="2" />
                            <rect x="14" y="8" width="6" height="6" rx="2" />
                          </svg>
                        </span>
                      </span>
                      <span className="nav-link-text">Scrumboard</span>
                    </a>
                    <ul
                      id="dash_scrumboard"
                      className="nav flex-column collapse  nav-children"
                    >
                      <li className="nav-item">
                        <ul className="nav flex-column">
                          <li className="nav-item">
                            <Link className="nav-link" to="/projects-board">
                              <span className="nav-link-text">All Boards</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li> */}

                    <li
                      className={`nav-item ${
                        location?.pathname === "/calendar" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/calendar">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-calendar-time"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
                              <circle cx="18" cy="18" r="4" />
                              <path d="M15 3v4" />
                              <path d="M7 3v4" />
                              <path d="M3 11h16" />
                              <path d="M18 16.496v1.504l1 1" />
                            </svg>
                          </span>
                        </span>
                        <span className="nav-link-text">Calendar</span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/messages" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/messages">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <FaRegEnvelope />
                          </span>
                        </span>
                        <span className="nav-link-text">Message</span>
                      </Link>
                    </li>
                  </>
                )}
              {user?.parent_id === null &&
                user?.client_id === null &&
                (user?.role === "ADMIN" ||
                  user?.role === "SUPER_ADMIN" ||
                  user?.role === "USER") && (
                  <li
                    className={`nav-item ${
                      location?.pathname === "/subscriptions" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/subscriptions">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <MdOutlineSubscriptions />
                        </span>
                      </span>
                      <span className="nav-link-text">Subscription</span>
                    </Link>
                    {/* <li
                    className={`nav-item ${
                      location?.pathname === "/permissions" && "active"
                    }`}
                  >
                    <Link className="nav-link" to={"/permissions"}>
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <GrUserManager />
                        </span>
                      </span>
                      <span className="nav-link-text">Permissions</span>
                    </Link>
                  </li> */}
                  </li>
                )}
              {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
                <>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/clients" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/clients">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <LuUsers />
                        </span>
                      </span>
                      <span className="nav-link-text">Clients</span>
                    </Link>
                  </li>
                </>
              )}
              {/* {(user?.role === "ADMIN" ||
                user?.role === "SUPER_ADMIN" ||
                user?.role === "USER" ||
                user?.role === "AGENT") && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    data-bs-toggle="collapse"
                    data-bs-target="#dash_chatpop"
                  >
                    <span className="nav-icon-wrap">
                      <span className="svg-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-message-circle-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                          <line x1="12" y1="12" x2="12" y2="12.01" />
                          <line x1="8" y1="12" x2="8" y2="12.01" />
                          <line x1="16" y1="12" x2="16" y2="12.01" />
                        </svg>
                      </span>
                    </span>
                    <span className="nav-link-text">Chat Popup</span>
                  </a>

                  <ul
                    id="dash_chatpop"
                    className="nav flex-column collapse  nav-children"
                  >
                    <li className="nav-item">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <Link className="nav-link" to="/messages">
                            <span className="nav-link-text">
                              Direct Message
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              )} */}

              {user?.parent_id !== null && user?.role === "USER" && (
                <>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/agents" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/agents">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <MdSupportAgent />
                        </span>
                      </span>
                      <span className="nav-link-text">Agents</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/shop" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/shop">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <FaPhoneAlt />
                        </span>
                      </span>
                      <span className="nav-link-text">Phone Numbers</span>
                    </Link>
                  </li>
                </>
              )}

              {user?.parent_id !== null &&
                (user?.role === "AGENT" ||
                  user?.role === "USER" ||
                  user?.role === "ADMIN" ||
                  user?.role === "SUPER_ADMIN") && (
                  <>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/emails" ||
                        (location?.pathname === "/bulk-emails" && "active")
                      }`}
                    >
                      <a
                        className="nav-link"
                        href="/"
                        data-bs-toggle="collapse"
                        data-bs-target="#email_section"
                      >
                        <span className="nav-icon-wrap position-relative">
                          <span className="badge badge-sm badge-primary badge-sm badge-pill position-top-end-overflow">
                            3
                          </span>
                          <span className="svg-icon">
                            <SiGmail />
                          </span>
                        </span>
                        <span className="nav-link-text">Email</span>
                      </a>
                      <ul
                        id="email_section"
                        className="nav flex-column collapse  nav-children"
                      >
                        <li className="nav-item">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <Link className="nav-link" to="/emails">
                                <span className="nav-link-text">Emails</span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/bulk-emails">
                                <span className="nav-link-text">
                                  Bulk Emails
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>

                    <li
                      className={`nav-item ${
                        location?.pathname === "/contacts" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/contacts">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <RiContactsBook2Line />
                          </span>
                        </span>
                        <span className="nav-link-text">Contacts</span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/recordings" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/recordings">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <MdSwapCalls />
                          </span>
                        </span>
                        <span className="nav-link-text">Call History</span>
                      </Link>
                    </li>
                  </>
                )}

              {user?.parent_id === null &&
                user?.client_id === null &&
                user?.role === "USER" && (
                  <>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/subaccounts" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/subaccounts">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <FaRegUser />
                          </span>
                        </span>
                        <span className="nav-link-text">Sub Accounts</span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/kyc-form" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/kyc-form">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <RiTodoLine />
                          </span>
                        </span>
                        <span className="nav-link-text">KYC</span>
                      </Link>
                    </li>
                  </>
                )}
              {user?.parent_id === null &&
                user?.client_id === null &&
                user?.role === "ADMIN" && (
                  <>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/posts" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/posts">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <span className="nav-icon-wrap">
                              <span className="svg-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-browser"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="1"
                                  />
                                  <line x1="4" y1="8" x2="20" y2="8" />
                                  <line x1="8" y1="4" x2="8" y2="8" />
                                </svg>
                              </span>
                            </span>{" "}
                          </span>
                        </span>
                        <span className="nav-link-text">Blogs</span>
                      </Link>
                    </li>
                  </>
                )}
              {user?.parent_id !== null &&
                (user?.role === "USER" ||
                  user?.role === "SUPER_ADMIN" ||
                  user?.role === "ADMIN") && (
                  <>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/gallery" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/gallery">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-photo"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <line x1="15" y1="8" x2="15.01" y2="8" />
                              <rect x="4" y="4" width="16" height="16" rx="3" />
                              <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
                              <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
                            </svg>
                          </span>
                        </span>
                        <span className="nav-link-text">Gallery</span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/todos" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/todos">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <RiTodoLine />
                          </span>
                        </span>
                        <span className="nav-link-text">Todo</span>
                      </Link>
                    </li>
                  </>
                )}
              {/* {(user?.role === "SUPER_ADMIN" ||
                user?.role === "ADMIN" ||
                user?.role === "USER") && (
                <li className="nav-item">
                  <li className="nav-item">
                    <Link className="nav-link" to="/todos">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <SiTodoist />
                        </span>
                      </span>
                      <span className="nav-link-text">Todo</span>
                    </Link>
                  </li>
                </li>
              )} */}

              {user?.parent_id !== null &&
                (user?.role === "USER" ||
                  user?.role === "SUPER_ADMIN" ||
                  user?.role === "ADMIN") && (
                  <>
                    <li
                      className={`nav-item ${
                        location?.pathname === "/invoices" && "active"
                      }`}
                    >
                      <a
                        className="nav-link"
                        href="/"
                        data-bs-toggle="collapse"
                        data-bs-target="#dash_invoice"
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-file-digit"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                              <rect x="9" y="12" width="3" height="5" rx="1" />
                              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                              <path d="M15 12v5" />
                            </svg>
                          </span>
                        </span>
                        <span className="nav-link-text">Invoices</span>
                      </a>
                      <ul
                        id="dash_invoice"
                        className="nav flex-column collapse  nav-children"
                      >
                        <li className="nav-item">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <Link className="nav-link" to="/invoices">
                                <span className="nav-link-text">
                                  Invoice List
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>

                    {/* <li
                      className={`nav-item ${
                        location?.pathname === "/posts" && "active"
                      }`}
                    >
                      <a
                        className="nav-link"
                        href="/"
                        data-bs-toggle="collapse"
                        data-bs-target="#dash_blog"
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-browser"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <rect x="4" y="4" width="16" height="16" rx="1" />
                              <line x1="4" y1="8" x2="20" y2="8" />
                              <line x1="8" y1="4" x2="8" y2="8" />
                            </svg>
                          </span>
                        </span>
                        <span className="nav-link-text">Blog</span>
                      </a>
                      <ul
                        id="dash_blog"
                        className="nav flex-column collapse  nav-children"
                      >
                        <li className="nav-item">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <Link className="nav-link" to="/posts">
                                <span className="nav-link-text">Posts</span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li> */}
                  </>
                )}
              {/* {(user?.role === "USER" || user?.role === "SUPER_ADMIN") && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    data-bs-toggle="collapse"
                    data-bs-target="#dash_integ"
                  >
                    <span className="nav-icon-wrap">
                      <span className="svg-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-code"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <polyline points="7 8 3 12 7 16" />
                          <polyline points="17 8 21 12 17 16" />
                          <line x1="14" y1="4" x2="10" y2="20" />
                        </svg>
                      </span>
                    </span>
                    <span className="nav-link-text">Integrations</span>
                  </a>
                  <ul
                    id="dash_integ"
                    className="nav flex-column collapse  nav-children"
                  >
                    <li className="nav-item">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a className="nav-link" href="all-apps.html">
                            <span className="nav-link-text">All Apps</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="integrations-detail.html"
                          >
                            <span className="nav-link-text">App Detail</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="integrations.html">
                            <span className="nav-link-text">Integrations</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              )} */}

              <li
                className={`nav-item ${
                  location?.pathname === "/active-numbers" && "active"
                }`}
              >
                <Link className="nav-link" to="/active-numbers">
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <FaPhoneSquareAlt />
                    </span>
                  </span>
                  <span className="nav-link-text">Active Numbers</span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location?.pathname === "/account-settings" && "active"
                }`}
              >
                <Link className="nav-link" to="/account-settings">
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <FaCogs />
                    </span>
                  </span>
                  <span className="nav-link-text">Account Settings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="menu-group">
            <div className="nav-header">
              <span>Pages</span>
            </div>
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/"
                  data-bs-toggle="collapse"
                  data-bs-target="#dash_pages"
                >
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-user-plus"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 11h6m-3 -3v6" />
                      </svg>
                    </span>
                  </span>
                  <span className="nav-link-text">Authentication</span>
                </a>
                <ul
                  id="dash_pages"
                  className="nav flex-column collapse  nav-children"
                >
                  <li className="nav-item">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/"
                          data-bs-toggle="collapse"
                          data-bs-target="#dash_log"
                        >
                          <span className="nav-link-text">Log In</span>
                        </a>
                        <ul
                          id="dash_log"
                          className="nav flex-column collapse  nav-children"
                        >
                          <li className="nav-item">
                            <ul className="nav flex-column">
                              <li className="nav-item">
                                <a className="nav-link" href="login.html">
                                  <span className="nav-link-text">Login</span>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  href="login-simple.html"
                                >
                                  <span className="nav-link-text">
                                    Login Simple
                                  </span>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  href="login-classNameic.html"
                                >
                                  <span className="nav-link-text">
                                    Login classNameic
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/"
                          data-bs-toggle="collapse"
                          data-bs-target="#dash_sign"
                        >
                          <span className="nav-link-text">Sign Up</span>
                        </a>
                        <ul
                          id="dash_sign"
                          className="nav flex-column collapse  nav-children"
                        >
                          <li className="nav-item">
                            <ul className="nav flex-column">
                              <li className="nav-item">
                                <a className="nav-link" href="signup.html">
                                  <span className="nav-link-text">Signup</span>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  href="signup-simple.html"
                                >
                                  <span className="nav-link-text">
                                    Signup Simple
                                  </span>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  href="signup-classNameic.html"
                                >
                                  <span className="nav-link-text">
                                    Signup classNameic
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="lock-screen.html">
                          <span className="nav-link-text">Lock Screen</span>
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="reset-password.html">
                          <span className="nav-link-text">Reset Password</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="404.html">
                          <span className="nav-link-text">Error 404</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="503.html">
                          <span className="nav-link-text">Error 503</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/"
                  data-bs-toggle="collapse"
                  data-bs-target="#dash_profile"
                >
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-user-search"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h1" />
                        <circle cx="16.5" cy="17.5" r="2.5" />
                        <path d="M18.5 19.5l2.5 2.5" />
                      </svg>
                    </span>
                  </span>
                  <span className="nav-link-text position-relative">
                    Profile
                    <span className="badge badge-danger badge-indicator position-absolute top-0 start-100"></span>
                  </span>
                </a>
                <ul
                  id="dash_profile"
                  className="nav flex-column collapse  nav-children"
                >
                  <li className="nav-item">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="profile.html">
                          <span className="nav-link-text">Profile</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="edit-profile.html">
                          <span className="nav-link-text">Edit Profile</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="account.html">
                          <span className="nav-link-text">Account</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="menu-gap"></div>
          <div className="menu-group">
            <div className="nav-header">
              <span>Documentation</span>
            </div>
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="https://nubra-ui.hencework.com/">
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-file-code-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 12h-1v5h1" />
                        <path d="M14 12h1v5h-1" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                      </svg>
                    </span>
                  </span>
                  <span className="nav-link-text">Documentation</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://nubra-ui.hencework.com/avatar.html"
                >
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-layout"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="6" height="5" rx="2" />
                        <rect x="4" y="13" width="6" height="7" rx="2" />
                        <rect x="14" y="4" width="6" height="16" rx="2" />
                      </svg>
                    </span>
                  </span>
                  <span className="nav-link-text">Components</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="callout card card-flush bg-orange-light-5 text-center mt-5 w-220p mx-auto">
            <div className="card-body">
              <h5 className="h5">Quickly Build Applications</h5>
              <p className="p-sm card-text">
                Exclusively for webapps Based on Bootstrap
              </p>
              <a
                href="https://nubra-ui.hencework.com/"
                className="btn btn-primary btn-block"
              >
                Go Nubra-UI
              </a>
            </div>
          </div> */}
        </div>
      </div>
      {/* <!-- /Main Menu --> */}
    </div>
  );
};

export default VerticalNavbar;
