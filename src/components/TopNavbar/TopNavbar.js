import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../redux/services/auth";
import _ from "lodash";
import Dialer from "../PhoneDialer/Dialer";
import {
  FaBell,
  FaCogs,
  FaCreditCard,
  FaPlus,
  FaRegUser,
  FaUserAstronaut,
} from "react-icons/fa";
import { getUserSubAccountsList } from "../../redux/services/calling";
import { setAccount } from "../../redux/slices/auth";
import { getUserDetails, getUsers } from "../../redux/services/users";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdEventAvailable, MdOutlineAddTask } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { updateNotificationRec } from "../../redux/services/notification";
import { SocketContext } from "../../Context";

const TopNavbar = ({ notificationsData }) => {
  const redirectTo = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { users, userDetails } = useSelector((state) => state.user);
  const { subscription } = useSelector((state) => state.subscription);
  const { kycApproved } = useContext(SocketContext);
  const [selectedAccount, setSelectedAccount] = useState(user);
  const [parentAccount, setParentAccount] = useState(user);
  const [subAccounts, setSubAccounts] = useState([]);
  const [userAgents, setUserAgents] = useState([]);
  const [limitSubaccounts, setLimitSubaccounts] = useState(null);

  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  useMemo(() => {
    for (let n = 0; n < notificationsData.length; n++) {
      const element = notificationsData[n];
      if (element.is_read === "false") {
        setUnreadNotificationCount((prev) => prev + 1);
      }
    }
  }, [notificationsData]);
  useEffect(() => {
    switch (subscription?.plan) {
      case "Solo Starter":
        setLimitSubaccounts(1);
        break;
      case "Growth":
        setLimitSubaccounts(3);
        break;
      case "Enterprise":
        setLimitSubaccounts(1000);
        break;
      default:
        setLimitSubaccounts(0);
        break;
    }
  }, [subscription, user]);
  useEffect(() => {
    if (selectedAccount?.parent_id) {
      const parent = users?.filter(
        (user) => user.id === selectedAccount?.parent_id
      )[0];
      setParentAccount(parent);
    }
  }, [selectedAccount, users]);
  const handleLogOut = () => {
    dispatch(logoutUser(token));
  };
  useEffect(() => {
    dispatch(getUserSubAccountsList(token));
    dispatch(getUserDetails(token, user.id));
  }, [token, user, dispatch]);
  const username = user?.username;
  const avatarHeading = _.toUpper(username?.slice(0, 2));
  const handleAccountClick = (account) => {
    setSelectedAccount(account);
    dispatch(loginUser(account?.username, account?.password, true));
    redirectTo("/");
    // dispatch(setAccount(account));
  };
  useEffect(() => {
    dispatch(getUsers(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (users?.length > 0) {
      const data = users?.filter(
        (usr) => _.toInteger(usr.parent_id) === user.id
      );
      setSubAccounts(data);
    }
  }, [user, users]);
  useEffect(() => {
    if (users?.length > 0) {
      const data = users?.filter(
        (usr) => _.toInteger(usr.client_id) === user.id
      );
      setUserAgents(data);
    }
  }, [user, users]);
  const updateNotificationData = (not_id) => {
    dispatch(updateNotificationRec(token, not_id, true, user.id));
  };
  return (
    <nav className="hk-navbar navbar navbar-expand-xl navbar-light fixed-top">
      <div className="container-fluid">
        {/* <!-- Start Nav --> */}
        <div className="nav-start-wrap">
          <button className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle d-xl-none">
            <span className="icon">
              <span className="feather-icon">
                <i data-feather="align-left"></i>
              </span>
            </span>
          </button>

          {/* <!-- Search --> */}
          {/* <form className="dropdown navbar-search">
            <div
              className="dropdown-toggle no-caret"
              data-bs-toggle="dropdown"
              data-dropdown-animation
              data-bs-auto-close="outside"
            >
              <a
                href=""
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover  d-xl-none"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="search"></i>
                  </span>
                </span>
              </a>
              <div className="input-group d-xl-flex d-none">
                <span className="input-affix-wrapper input-search affix-border">
                  <input
                    type="text"
                    className="form-control  bg-transparent"
                    data-navbar-search-close="false"
                    placeholder="Search..."
                    aria-label="Search"
                  />

                  <span className="input-suffix">
                    <span>/</span>
                    <span className="btn-input-clear">
                      <i className="bi bi-x-circle-fill"></i>
                    </span>
                    <span
                      className="spinner-border spinner-border-sm input-loader text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <div className="dropdown-menu p-0">
              <div className="dropdown-item d-xl-none bg-transparent">
                <div className="input-group mobile-search">
                  <span className="input-affix-wrapper input-search">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      aria-label="Search"
                    />
                    <span className="input-suffix">
                      <span className="btn-input-clear">
                        <i className="bi bi-x-circle-fill"></i>
                      </span>
                      <span
                        className="spinner-border spinner-border-sm input-loader text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <div data-simplebar className="dropdown-body p-2">
                <h6 className="dropdown-header">Recent Search</h6>
                <div className="dropdown-item bg-transparent">
                  <a href="" className="badge badge-pill badge-soft-secondary">
                    Grunt
                  </a>
                  <a href="" className="badge badge-pill badge-soft-secondary">
                    Node JS
                  </a>
                  <a href="" className="badge badge-pill badge-soft-secondary">
                    SCSS
                  </a>
                </div>
                <div className="dropdown-divider"></div>
                <h6 className="dropdown-header">Help</h6>
                <a href="" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-icon avatar-xs avatar-soft-light avatar-rounded">
                        <span className="initial-wrap">
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-corner-down-right"
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
                              ></path>
                              <path d="M6 6v6a3 3 0 0 0 3 3h10l-4 -4m0 8l4 -4"></path>
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="media-body">How to setup theme?</div>
                  </div>
                </a>
                <a href="" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-icon avatar-xs avatar-soft-light avatar-rounded">
                        <span className="initial-wrap">
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-corner-down-right"
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
                              ></path>
                              <path d="M6 6v6a3 3 0 0 0 3 3h10l-4 -4m0 8l4 -4"></path>
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="media-body">View detail documentation</div>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <h6 className="dropdown-header">Users</h6>
                <a href="" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-xs avatar-rounded">
                        <img
                          src="dist/img/avatar3.jpg"
                          alt="user"
                          className="avatar-img"
                        />
                      </div>
                    </div>
                    <div className="media-body">Sarah Jone</div>
                  </div>
                </a>
                <a href="" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-xs avatar-soft-primary avatar-rounded">
                        <span className="initial-wrap">J</span>
                      </div>
                    </div>
                    <div className="media-body">Joe Jackson</div>
                  </div>
                </a>
                <a href="" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-xs avatar-rounded">
                        <img
                          src="dist/img/avatar4.jpg"
                          alt="user"
                          className="avatar-img"
                        />
                      </div>
                    </div>
                    <div className="media-body">Maria Richard</div>
                  </div>
                </a>
              </div>
              <div className="dropdown-footer d-xl-flex d-none">
                <a href="">
                  <u>Search all</u>
                </a>
              </div>
            </div>
          </form> */}
          {/* <!-- /Search --> */}
        </div>
        {/* <!-- /Start Nav --> */}

        {/* <!-- End Nav --> */}
        <div className="nav-end-wrap">
          <ul className="navbar-nav flex-row">
            {/* <li className="nav-item">
              <a
                href="#"
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
              >
                <span className="icon">
                  <span className=" position-relative">
                    <span className="feather-icon">
                      <FaInbox />
                    </span>
                    <span className="badge badge-sm badge-soft-primary badge-sm badge-pill position-top-end-overflow-1">
                      4
                    </span>
                  </span>
                </span>
              </a>
            </li> */}
            <li className="nav-item">
              {(user?.parent_id !== null || user?.client_id !== null) && (
                <Dialer />
              )}
            </li>

            <li className="nav-item">
              <div className="dropdown dropdown-notifications">
                <a
                  href="#"
                  className="btn btn-icon btn-rounded  dropdown-toggle btn-primary ms-2 shadow-lg"
                  data-bs-toggle="dropdown"
                  data-dropdown-animation
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="icon pb-1">
                    <span className="position-relative">
                      <span className="feather-icon">
                        <FaBell />
                      </span>
                      {unreadNotificationCount > 0 && (
                        <span className="badge badge-success badge-indicator position-top-end-overflow-1"></span>
                      )}
                    </span>
                  </span>
                </a>

                <div className="dropdown-menu dropdown-menu-end p-0">
                  <h6 className="dropdown-header px-4 fs-6">Notifications</h6>
                  <div
                    className="  p-2"
                    style={{ overflow: "scroll", maxHeight: "428px" }}
                  >
                    {notificationsData?.length > 0 &&
                      notificationsData?.map((notification, index) => (
                        <a
                          href="#"
                          className={`dropdown-item ${
                            notification.is_read === "false"
                              ? "bg-light"
                              : "bg-white"
                          }`}
                          key={index}
                          onClick={() =>
                            updateNotificationData(notification.id)
                          }
                        >
                          <div className="media">
                            <div className="media-head">
                              <div className="rounded-circle avatar avatar-sm bg-primary text-center pt-2">
                                {notification.type === "balance_credit" && (
                                  <LuBadgeDollarSign size={27} color="white" />
                                )}
                                {notification.type === "todo_added" && (
                                  <MdOutlineAddTask size={27} color="white" />
                                )}
                                {notification.type === "reminder_added" && (
                                  <MdEventAvailable size={27} color="white" />
                                )}
                                {notification.type === "incoming_call" && (
                                  <IoCallOutline size={27} color="white" />
                                )}
                              </div>
                            </div>
                            <div className="media-body">
                              <div>
                                <div className="notifications-text">
                                  {notification?.notification}
                                </div>
                                <div className="notifications-info float-end">
                                  <div className="notifications-time">
                                    {moment(notification.created_at).format(
                                      "DD MMM, YYYY"
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}

                    {/* <a href="" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar  avatar-icon avatar-sm avatar-success avatar-rounded">
                            <span className="initial-wrap">
                              <span className="feather-icon">
                                <i data-feather="inbox"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              New message received from Alan Rickman
                            </div>
                            <div className="notifications-info">
                              <div className="notifications-time">
                                Today, 7:51 AM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar  avatar-icon avatar-sm avatar-pink avatar-rounded">
                            <span className="initial-wrap">
                              <span className="feather-icon">
                                <i data-feather="clock"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              You have a follow up with Jampack Head on Friday,
                              Dec 19 at 9:30 am
                            </div>
                            <div className="notifications-info">
                              <div className="notifications-time">
                                Yesterday, 9:25 PM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="" className="dropdown-item">
                      <div className="media">
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
                          <div>
                            <div className="notifications-text">
                              Application of Sarah Williams is waiting for your
                              approval
                            </div>
                            <div className="notifications-info">
                              <div className="notifications-time">
                                Today 10:14 PM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar avatar-sm avatar-rounded">
                            <img
                              src="dist/img/avatar10.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              Winston Churchil shared a document with you
                            </div>
                            <div className="notifications-info">
                              <span className="badge badge-soft-violet">
                                File Manager
                              </span>
                              <div className="notifications-time">
                                2 Oct, 2021
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar  avatar-icon avatar-sm avatar-danger avatar-rounded">
                            <span className="initial-wrap">
                              <span className="feather-icon">
                                <i data-feather="calendar"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              Last 2 days left for the project to be completed
                            </div>
                            <div className="notifications-info">
                              <span className="badge badge-soft-orange">
                                Updates
                              </span>
                              <div className="notifications-time">
                                14 Sep, 2021
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a> */}
                  </div>
                  <div className="dropdown-footer">
                    <a href="#">{/* <u>View all notifications</u> */}</a>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div className="dropdown ps-2">
                <a
                  className=" dropdown-toggle no-caret"
                  href=""
                  role="button"
                  data-bs-display="static"
                  data-bs-toggle="dropdown"
                  data-dropdown-animation
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  {userDetails?.avatar !== "" &&
                  userDetails?.avatar !== null &&
                  userDetails?.avatar !== undefined ? (
                    <div className="media-head me-2">
                      <div
                        className="avatar avatar-sm avatar-rounded"
                        style={{ height: "2.3rem", width: "2.3rem" }}
                      >
                        <img
                          src={userDetails?.avatar}
                          alt="user"
                          className="avatar-img"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      // className="avatar avatar-primary avatar-sm avatar-rounded"
                      className="btn btn-primary btn-sm py-2 btn-rounded shadow-lg"
                    >
                      <span
                        className="initial-wrap fw-bolder"
                        style={{ fontSize: "14px", width: "11px" }}
                      >
                        {_.toUpper(selectedAccount?.username?.slice(0, 1)) ||
                          _.toUpper(selectedAccount?.friendlyName?.slice(0, 1))}
                      </span>
                    </div>
                  )}
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <div className="p-2">
                    <div className="media">
                      {userDetails?.avatar !== "" &&
                      userDetails?.avatar !== null &&
                      userDetails?.avatar !== undefined ? (
                        <div className="media-head me-2">
                          <div
                            className="avatar avatar-sm avatar-rounded"
                            style={{ height: "2.3rem", width: "2.3rem" }}
                          >
                            <img
                              src={userDetails?.avatar}
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          // className="avatar avatar-primary avatar-sm avatar-rounded"
                          className="btn btn-primary btn-sm py-2 btn-rounded shadow-lg"
                        >
                          <span
                            className="initial-wrap fw-bolder"
                            style={{ fontSize: "14px", width: "11px" }}
                          >
                            {_.toUpper(
                              selectedAccount?.username?.slice(0, 1)
                            ) ||
                              _.toUpper(
                                selectedAccount?.friendlyName?.slice(0, 1)
                              )}
                          </span>
                        </div>
                      )}
                      {/* <div className="media-head me-2">
                        <div className="avatar avatar-primary avatar-sm avatar-rounded">
                          <span className="initial-wrap">
                            {_.toUpper(
                              selectedAccount?.username?.slice(0, 1)
                            ) ||
                              _.toUpper(
                                selectedAccount?.friendlyName?.slice(0, 1)
                              )}
                          </span>
                        </div>
                      </div> */}
                      <div className="media-body">
                        {user?.parent_id === null && user.client_id === null ? (
                          <div className="dropdown">
                            <a
                              // href=""
                              className="d-block dropdown-toggle link-dark fw-medium"
                              data-bs-toggle="dropdown"
                              data-dropdown-animation
                              data-bs-auto-close="inside"
                            >
                              {selectedAccount?.username ||
                                selectedAccount?.friendlyName}
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <div className="p-2">
                                <p>
                                  <span
                                    className="text-primary bg-light"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Parent
                                  </span>
                                </p>
                                <p
                                  class="dropdown-divider"
                                  style={{
                                    padding: "0px",
                                    marginTop: "-10px",
                                    marginBottom: "20px",
                                  }}
                                ></p>
                                <div
                                  className="media align-items-center mb-3"
                                  onClick={() =>
                                    handleAccountClick(parentAccount)
                                  }
                                >
                                  <div className="media-head me-2">
                                    <div className="avatar avatar-primary avatar-xs avatar-rounded">
                                      <span className="initial-wrap">
                                        <FaUserAstronaut />
                                      </span>
                                    </div>
                                  </div>
                                  <div className="media-body">
                                    <button
                                      className={`btn-block ${
                                        parentAccount?.email ===
                                        selectedAccount?.email
                                          ? "btn-primary"
                                          : "btn-light"
                                      } btn btn-sm `}
                                    >
                                      {parentAccount?.name?.split(" ")[0]}
                                    </button>
                                  </div>
                                </div>
                                <p>
                                  <span
                                    className="text-primary bg-light"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Sub-Accounts
                                  </span>
                                </p>
                                <p
                                  class="dropdown-divider"
                                  style={{
                                    padding: "0px",
                                    marginTop: "-10px",
                                    marginBottom: "20px",
                                  }}
                                ></p>

                                {subAccounts?.length > 0 &&
                                  subAccounts?.map((account, index) => (
                                    <>
                                      {account?.id !== user?.id && (
                                        <div
                                          className="media align-items-center mb-3"
                                          key={index}
                                          onClick={() =>
                                            handleAccountClick(account)
                                          }
                                        >
                                          <div className="media-head me-2">
                                            <div className="avatar avatar-secondary avatar-xs avatar-rounded">
                                              <span className="initial-wrap">
                                                {_.capitalize(
                                                  account?.name?.slice(0, 1)
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="media-body">
                                            <button
                                              className={`btn-block ${
                                                selectedAccount?.email ===
                                                account?.email
                                                  ? "btn-primary"
                                                  : "btn-light"
                                              } btn btn-sm `}
                                            >
                                              {account?.name?.split(" ")[0]}
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  ))}
                                {!user?.parent_id &&
                                  subAccounts?.length < limitSubaccounts &&
                                  kycApproved === 1 && (
                                    <button
                                      type="button"
                                      class="btn btn-block btn-outline-light btn-sm "
                                      data-bs-toggle="modal"
                                      data-bs-target="#addAccountModal"
                                    >
                                      <FaPlus />
                                      Add Account
                                    </button>
                                  )}
                              </div>
                            </div>
                          </div>
                        ) : user?.parent_id !== null &&
                          user.client_id === null ? (
                          <div className="dropdown">
                            <a
                              // href=""
                              className="d-block dropdown-toggle link-dark fw-medium"
                              data-bs-toggle="dropdown"
                              data-dropdown-animation
                              data-bs-auto-close="inside"
                            >
                              {selectedAccount?.username ||
                                selectedAccount?.friendlyName}
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <div className="p-2">
                                {/* <p>
                                <span
                                  className="text-primary bg-light"
                                  style={{ fontSize: "12px" }}
                                >
                                  Parent
                                </span>
                              </p>
                              <p
                                class="dropdown-divider"
                                style={{
                                  padding: "0px",
                                  marginTop: "-10px",
                                  marginBottom: "20px",
                                }}
                              ></p>
                              <div
                                className="media align-items-center mb-3"
                                onClick={() =>
                                  handleAccountClick(parentAccount)
                                }
                              >
                                <div className="media-head me-2">
                                  <div className="avatar avatar-primary avatar-xs avatar-rounded">
                                    <span className="initial-wrap">
                                      <FaUserAstronaut />
                                    </span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <button
                                    className={`btn-block ${
                                      parentAccount?.email ===
                                      selectedAccount?.email
                                        ? "btn-primary"
                                        : "btn-light"
                                    } btn btn-sm `}
                                  >
                                    {parentAccount?.name?.split(" ")[0]}
                                  </button>
                                </div>
                              </div> */}
                                <p>
                                  <span
                                    className="text-primary bg-light"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Agents
                                  </span>
                                </p>
                                <p
                                  class="dropdown-divider"
                                  style={{
                                    padding: "0px",
                                    marginTop: "-10px",
                                    marginBottom: "20px",
                                  }}
                                ></p>
                                {userAgents?.length > 0 &&
                                  userAgents?.map((account, index) => (
                                    <>
                                      {account?.id !== user?.id && (
                                        <div
                                          className="media align-items-center mb-3"
                                          key={index}
                                          onClick={() =>
                                            handleAccountClick(account)
                                          }
                                        >
                                          <div className="media-head me-2">
                                            <div className="avatar avatar-secondary avatar-xs avatar-rounded">
                                              <span className="initial-wrap">
                                                {_.capitalize(
                                                  account?.name?.slice(0, 1)
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="media-body">
                                            <button
                                              className={`btn-block ${
                                                selectedAccount?.email ===
                                                account?.email
                                                  ? "btn-primary"
                                                  : "btn-light"
                                              } btn btn-sm `}
                                            >
                                              {account?.name?.split(" ")[0]}
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <a
                              // href=""
                              className="d-block link-dark fw-medium"
                            >
                              {selectedAccount?.username ||
                                selectedAccount?.friendlyName}
                            </a>
                          </>
                        )}
                        <div className="fs-7">{selectedAccount?.email}</div>
                        <button
                          onClick={handleLogOut}
                          className="d-block fs-8 link-secondary btn btn-light text-dark btn-sm"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to={"/account-settings"} className="dropdown-item">
                    <span className="pe-2" style={{ paddingTop: "-5px" }}>
                      {" "}
                      <FaRegUser />
                    </span>
                    Profile
                  </Link>
                  {/* <div className="dropdown-divider"></div> */}
                  {/* <h6 className="dropdown-header">Manage Account</h6> */}
                  {(user.parent_id !== null ||
                    (user.client_id === null && user.parent_id === null)) && (
                    <Link to={"/balance"} className="dropdown-item d-flex">
                      <span className="dropdown-icon pt-1 feather-icon">
                        <FaCreditCard />
                      </span>
                      <span>Balance</span>
                    </Link>
                  )}
                  {/* <a className="dropdown-item d-flex">
                    <span className="dropdown-icon pt-1 feather-icon">
                      <FaCheckSquare />
                    </span>
                    <span>Subscriptions</span>
                  </a> */}
                  <Link
                    to={"/account-settings"}
                    className="dropdown-item d-flex"
                  >
                    <span className="dropdown-icon pt-1 feather-icon">
                      <FaCogs />
                    </span>
                    <span>Settings</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to={"/terms-conditions"} className="dropdown-item">
                    Terms & Conditions
                  </Link>
                  <a
                    data-bs-target="#submitTicket"
                    data-bs-toggle="modal"
                    className="dropdown-item"
                  >
                    Help & Support
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* <!-- /End Nav --> */}
      </div>
    </nav>
  );
};

export default TopNavbar;
