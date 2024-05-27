import React from "react";
import brand from "../../assets/2.png";
import { Link, useLocation } from "react-router-dom";
import { FaRegEnvelope, FaRegUser, FaWallet } from "react-icons/fa";
import { MdHistory, MdSupportAgent, MdSwapCalls } from "react-icons/md";
import { useSelector } from "react-redux";
import { CiMenuFries, CiWallet } from "react-icons/ci";
import { SiGmail } from "react-icons/si";
import logo from "./../../assets/4.png";
import { MdOutlineSubscriptions } from "react-icons/md";
import { LuPhone, LuUsers } from "react-icons/lu";
import { RiContactsBook2Line, RiTodoLine } from "react-icons/ri";
import { GoFileDirectory } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GrCheckboxSelected } from "react-icons/gr";
import { PiUsersLight } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { IoIosRecording } from "react-icons/io";
import { TbListCheck } from "react-icons/tb";

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
          <div className="menu-gap"></div>
          <div className="menu-group">
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
              {/* For Admin */}

              {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
                <>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/admin/clients" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/admin/clients">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <LuUsers />
                        </span>
                      </span>
                      <span className="nav-link-text">Clients</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/admin/subaccounts" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/admin/subaccounts">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <TbUsers />
                        </span>
                      </span>
                      <span className="nav-link-text">Sub Accounts</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/admin/agents" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/admin/agents">
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
                      location?.pathname === "/admin/active-numbers" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/admin/active-numbers">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <RiContactsBook2Line />
                        </span>
                      </span>
                      <span className="nav-link-text">Active Numbers</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/admin/subscriptions" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/admin/subscriptions">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <GrCheckboxSelected />
                        </span>
                      </span>
                      <span className="nav-link-text">Subscriptions</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/admin/kyc-forms" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/admin/kyc-forms">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <FaRegNoteSticky />
                        </span>
                      </span>
                      <span className="nav-link-text">KYC List</span>
                    </Link>
                  </li>
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
              {/* For Clients */}
              {user?.role === "USER" &&
                user?.client_id === null &&
                user?.parent_id === null && (
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
                        <span className="nav-link-text">Team Chat</span>
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
                    </li>
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
                    <li
                      className={`nav-item ${
                        location?.pathname === "/active-numbers" && "active"
                      }`}
                    >
                      <Link className="nav-link" to="/active-numbers">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <RiContactsBook2Line />
                          </span>
                        </span>
                        <span className="nav-link-text">Active Numbers</span>
                      </Link>
                    </li>
                  </>
                )}
              {/* For Subaccounts */}
              {user?.role === "USER" && user?.parent_id !== null && (
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                            <line x1="12" y1="11" x2="12" y2="11.01" />
                            <line x1="8" y1="11" x2="8" y2="11.01" />
                            <line x1="16" y1="11" x2="16" y2="11.01" />
                          </svg>
                        </span>
                      </span>
                      <span className="nav-link-text">Team Chat</span>
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
                      (location?.pathname === "/emails" ||
                        location?.pathname === "/bulk-emails") &&
                      "active"
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="/"
                      data-bs-toggle="collapse"
                      data-bs-target="#email_section"
                    >
                      <span className="nav-icon-wrap position-relative">
                        {/* <span className="badge badge-sm badge-primary badge-sm badge-pill position-top-end-overflow">
                          3
                        </span> */}
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
                          {/* <li className="nav-item">
                            <Link className="nav-link" to="/bulk-emails">
                              <span className="nav-link-text">Bulk Emails</span>
                            </Link>
                          </li> */}
                        </ul>
                      </li>
                    </ul>
                  </li>
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
                      location?.pathname === "/recordings" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/recordings">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <IoIosRecording />
                        </span>
                      </span>
                      <span className="nav-link-text"> Recordings</span>
                    </Link>
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
                      <span className="nav-link-text">Leads Management</span>
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
                          <LuPhone />
                        </span>
                      </span>
                      <span className="nav-link-text">Phone Numbers</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/active-numbers" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/active-numbers">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <RiContactsBook2Line />
                        </span>
                      </span>
                      <span className="nav-link-text">Active Numbers</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/balance" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/balance">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <CiWallet />
                        </span>
                      </span>
                      <span className="nav-link-text">Wallet</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location?.pathname === "/messages-logs" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/messages-logs">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <TbListCheck />
                        </span>
                      </span>
                      <span className="nav-link-text">Messages Logs</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      (location?.pathname === "/messages" ||
                        location?.pathname === "/messages-bulk") &&
                      "active"
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="/"
                      data-bs-toggle="collapse"
                      data-bs-target="#dash_sms"
                    >
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <FaRegEnvelope />
                        </span>
                      </span>
                      <span className="nav-link-text">SMS</span>
                    </a>
                    <ul
                      id="dash_sms"
                      className="nav flex-column collapse  nav-children"
                    >
                      <li className="nav-item">
                        <ul className="nav flex-column">
                          <li className="nav-item">
                            <Link className="nav-link" to="/messages">
                              <span className="nav-link-text">SMS</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/messages-bulk">
                              <span className="nav-link-text">SMS Bulk</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                  <li
                    className={`nav-item ${
                      location?.pathname === "/call-history" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/call-history">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <MdHistory />
                        </span>
                      </span>
                      <span className="nav-link-text">Call History</span>
                    </Link>
                  </li>
                </>
              )}
              {/* For Agents */}
              {user?.role === "AGENT" && user?.client_id !== null && (
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                            <line x1="12" y1="11" x2="12" y2="11.01" />
                            <line x1="8" y1="11" x2="8" y2="11.01" />
                            <line x1="16" y1="11" x2="16" y2="11.01" />
                          </svg>
                        </span>
                      </span>
                      <span className="nav-link-text">Team Chat</span>
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
                      location?.pathname === "/projects-board" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/projects-board">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <CiMenuFries />
                        </span>
                      </span>
                      <span className="nav-link-text">Leads Management</span>
                    </Link>
                  </li>

                  <li
                    className={`nav-item ${
                      location?.pathname === "/active-numbers" && "active"
                    }`}
                  >
                    <Link className="nav-link" to="/active-numbers">
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <RiContactsBook2Line />
                        </span>
                      </span>
                      <span className="nav-link-text">Active Numbers</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      (location?.pathname === "/messages" ||
                        location?.pathname === "/messages-bulk") &&
                      "active"
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="/"
                      data-bs-toggle="collapse"
                      data-bs-target="#dash_sms"
                    >
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <FaRegEnvelope />
                        </span>
                      </span>
                      <span className="nav-link-text">SMS</span>
                    </a>
                    <ul
                      id="dash_sms"
                      className="nav flex-column collapse  nav-children"
                    >
                      <li className="nav-item">
                        <ul className="nav flex-column">
                          <li className="nav-item">
                            <Link className="nav-link" to="/messages">
                              <span className="nav-link-text">SMS</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/messages-bulk">
                              <span className="nav-link-text">SMS Bulk</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                </>
              )}
              {/* <li
                className={`nav-item ${
                  location?.pathname === "/permissions" && "active"
                }`}
              >
                <Link className="nav-link" to="/permissions">
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <IoSettingsOutline />
                    </span>
                  </span>
                  <span className="nav-link-text">Permission</span>
                </Link>
              </li> */}
              <li
                className={`nav-item ${
                  location?.pathname === "/account-settings" && "active"
                }`}
              >
                <Link className="nav-link" to="/account-settings">
                  <span className="nav-icon-wrap">
                    <span className="svg-icon">
                      <IoSettingsOutline />
                    </span>
                  </span>
                  <span className="nav-link-text">Account Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /Main Menu --> */}
    </div>
  );
};

export default VerticalNavbar;
