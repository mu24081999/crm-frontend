import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SubscriptionList from "./components/SubscriptionList";
import AddContactList from "./components/AddContactList";
import { useDispatch, useSelector } from "react-redux";
import ContactDetails from "./components/ContactDetails";
import "./contact.css";
import SubscriptionCard from "./components/SubscriptionCard";
import { SocketContext } from "../../Context";
import { getSubscriptionsList } from "../../redux/services/subscription";
import { getUsers } from "../../redux/services/users";
const SubscriptionContent = () => {
  const { handleToggleShowLeadDetail, showLeadDetails } =
    useContext(SocketContext);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { contactDetails } = useSelector((state) => state.contact);
  const [data, setData] = useState([]);
  const [data_, setData_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [view, setView] = useState("list");
  const { subscriptions } = useSelector((state) => state.subscription);
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    if (subscriptions?.length > 0) {
      const filterData = [];
      subscriptions?.map((sub) => {
        const user = users?.filter((user) => user.id === sub?.customer_id)[0];
        const data = {
          ...sub,
          customer_details: user,
        };
        return filterData?.push(data);
      });
      setData(filterData);
      setData_(filterData);
    }
  }, [subscriptions, users]);
  useEffect(() => {
    dispatch(getUsers(token));
    dispatch(getSubscriptionsList(token));
  }, [token, dispatch]);
  const handleReceiveData = (receivedData) => {
    setData(receivedData);
  };
  const handleToggleEdit = (value) => {
    // setIsEdit(value);
  };
  const handleViewDataFromHeader = (value) => {
    setView(value);
  };

  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="contactapp-content">
            <Sidebar
              onSendData={handleReceiveData}
              onToggleEdit={handleToggleEdit}
              subscriptions={data_}
            />
            {showLeadDetails && (
              <ContactDetails
                isEdit={isEdit}
                contactDetails={contactDetails}
                dispatch={dispatch}
                token={token}
                authUser={user}
              />
            )}

            {!showLeadDetails && (
              <div className="contactapp-detail-wrap">
                <Header
                  onDataFromChild={handleViewDataFromHeader}
                  activeBar={view}
                />
                <div className="contact-body">
                  <div className="nicescroll-bar">
                    {view === "list" ? (
                      <SubscriptionList
                        subscriptionsArray={data}
                        onToggleEdit={handleToggleEdit}
                        isEdit={isEdit}
                      />
                    ) : (
                      <SubscriptionCard
                        subscriptionArray={data}
                        onToggleEdit={handleToggleEdit}
                        isEdit={isEdit}
                        dispatch={dispatch}
                        token={token}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* <!-- Contact Details --> */}
            {/* <div
              id="contact_detail"
              class="modal fade"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-dialog-centered modal-xl contact-detail-modal"
                role="document"
              >
                <div class="modal-content">
                  <div class="modal-body p-0">
                    <header class="contact-header">
                      <div class="d-flex align-items-center">
                        <div class="dropify-circle edit-img me-3">
                          <input
                            type="file"
                            class="dropify-1"
                            data-default-file="dist/img/avatar2.jpg"
                          />
                        </div>
                        <div>
                          <div class="cp-name text-truncate">
                            Mendaline Shane
                          </div>
                          <p>No phone calls Always busy</p>
                          <div
                            class="rating rating-yellow my-rating-4"
                            data-rating="3"
                          ></div>
                        </div>
                      </div>
                      <div class="contact-options-wrap">
                        <ul class="hk-list hk-list-sm justify-content-center d-xl-flex d-none">
                          <li>
                            <a
                              class="btn btn-icon btn-soft-primary btn-rounded"
                              href="#"
                            >
                              <span class="btn-icon-wrap">
                                <span class="feather-icon">
                                  <i data-feather="mail"></i>
                                </span>
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              class="btn btn-icon btn-soft-success btn-rounded"
                              href="#"
                            >
                              <span class="btn-icon-wrap">
                                <span class="feather-icon">
                                  <i data-feather="phone"></i>
                                </span>
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              class="btn btn-icon btn-soft-danger btn-rounded"
                              href="#"
                            >
                              <span class="btn-icon-wrap">
                                <span class="feather-icon">
                                  <i data-feather="video"></i>
                                </span>
                              </span>
                            </a>
                          </li>
                        </ul>
                        <div class="dropdown mx-3  d-xl-block d-none">
                          <button
                            aria-expanded="false"
                            data-bs-toggle="dropdown"
                            class="btn btn-light dropdown-toggle "
                            type="button"
                          >
                            Action
                          </button>
                          <div role="menu" class="dropdown-menu">
                            <a class="dropdown-item" href="#">
                              Action
                            </a>
                            <a class="dropdown-item" href="#">
                              Another action
                            </a>
                            <a class="dropdown-item" href="#">
                              Something else here
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                              Separated link
                            </a>
                          </div>
                        </div>
                        <div class="align-items-center d-xl-flex d-none">
                          1 - 10 of 30
                        </div>
                        <a
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle  d-xl-inline-block d-none"
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Previous"
                        >
                          <span class="btn-icon-wrap">
                            <span class="feather-icon">
                              <i data-feather="chevron-left"></i>
                            </span>
                          </span>
                        </a>
                        <a
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle  d-xl-inline-block d-none"
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Next"
                        >
                          <span class="btn-icon-wrap">
                            <span class="feather-icon">
                              <i data-feather="chevron-right"></i>
                            </span>
                          </span>
                        </a>
                        <a
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret  d-xl-inline-block d-nonet"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <span class="btn-icon-wrap">
                            <span class="feather-icon">
                              <i data-feather="more-vertical"></i>
                            </span>
                          </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                          <a class="dropdown-item" href="profile.html">
                            <span class="feather-icon dropdown-icon">
                              <i data-feather="star"></i>
                            </span>
                            <span>Stared Messages</span>
                          </a>
                          <a class="dropdown-item" href="#">
                            <span class="feather-icon dropdown-icon">
                              <i data-feather="archive"></i>
                            </span>
                            <span>Archive Messages</span>
                          </a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="email.html">
                            <span class="feather-icon dropdown-icon">
                              <i data-feather="slash"></i>
                            </span>
                            <span>Block Content</span>
                          </a>
                          <a
                            class="dropdown-item"
                            href="email.html"
                            data-bs-dismiss="modal"
                          >
                            <span class="feather-icon dropdown-icon">
                              <i data-feather="x-square"></i>
                            </span>
                            <span>Close</span>
                          </a>
                        </div>
                      </div>
                    </header>
                    <div class="contact-body contact-detail-body">
                      <div data-simplebar class="nicescroll-bar">
                        <div class="d-flex flex-xl-nowrap flex-wrap">
                          <div class="contact-info w-xl-35 w-100">
                            <div class="dropdown action-btn">
                              <button
                                aria-expanded="false"
                                data-bs-toggle="dropdown"
                                class="btn btn-light dropdown-toggle "
                                type="button"
                              >
                                Action
                              </button>
                              <div role="menu" class="dropdown-menu">
                                <a class="dropdown-item" href="#">
                                  Action
                                </a>
                                <a class="dropdown-item" href="#">
                                  Another action
                                </a>
                                <a class="dropdown-item" href="#">
                                  Something else here
                                </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">
                                  Separated link
                                </a>
                              </div>
                            </div>
                            <div class="card">
                              <div class="card-header">
                                <a href="#">Profile Information</a>
                                <button
                                  class="btn btn-xs btn-icon btn-rounded btn-light"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title=""
                                  data-bs-original-title="Edit"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="edit-2"></i>
                                    </span>
                                  </span>
                                </button>
                              </div>
                              <div class="card-body">
                                <ul class="cp-info">
                                  <li>
                                    <span>First name</span>
                                    <span>Morgan</span>
                                  </li>
                                  <li>
                                    <span>Last name</span>
                                    <span>Freeman</span>
                                  </li>
                                  <li>
                                    <span>Email</span>
                                    <span>morgan@flights.com</span>
                                  </li>
                                  <li>
                                    <span>Phone</span>
                                    <span>+912-4532-1234</span>
                                  </li>
                                  <li>
                                    <span>Location</span>
                                    <span>Newyork</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="separator-full"></div>
                            <div class="card">
                              <div class="card-header">
                                <a href="#">More Info</a>
                                <button
                                  class="btn btn-xs btn-icon btn-rounded btn-light"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title=""
                                  data-bs-original-title="Edit"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="edit-2"></i>
                                    </span>
                                  </span>
                                </button>
                              </div>
                              <div class="card-body">
                                <ul class="cp-info">
                                  <li>
                                    <span>Designation</span>
                                    <span>Morgan</span>
                                  </li>
                                  <li>
                                    <span>Company</span>
                                    <span>Freeman</span>
                                  </li>
                                  <li>
                                    <span>Language</span>
                                    <span>morgan@flights.com</span>
                                  </li>
                                  <li>
                                    <span>Birthday</span>
                                    <span>-</span>
                                  </li>
                                  <li>
                                    <span>Location</span>
                                    <span>Newyork</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="separator-full"></div>
                            <div class="card">
                              <div class="card-header">
                                <a href="#">Tags</a>
                                <button
                                  class="btn btn-xs btn-icon btn-rounded btn-light"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title=""
                                  data-bs-original-title="Add Tags"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="plus"></i>
                                    </span>
                                  </span>
                                </button>
                              </div>
                              <div class="card-body">
                                <span class="badge badge-soft-violet">
                                  Collaboration
                                </span>
                                <span class="badge badge-soft-danger">
                                  React Developer
                                </span>
                              </div>
                            </div>
                            <div class="separator-full"></div>
                            <div class="card">
                              <div class="card-header">
                                <a href="#">Social Profile</a>
                              </div>
                              <div class="card-body">
                                <ul class="hk-list hk-list-sm">
                                  <li>
                                    <button class="btn btn-icon btn-rounded btn-primary">
                                      <span class="icon">
                                        <i class="fab fa-behance"></i>
                                      </span>
                                    </button>
                                  </li>
                                  <li>
                                    <button class="btn btn-icon btn-rounded btn-warning">
                                      <span class="icon">
                                        <i class="fab fa-google-drive"></i>
                                      </span>
                                    </button>
                                  </li>
                                  <li>
                                    <button class="btn btn-icon btn-rounded btn-info">
                                      <span class="icon">
                                        <i class="fab fa-dropbox"></i>
                                      </span>
                                    </button>
                                  </li>
                                  <li>
                                    <button class="btn btn-icon btn-rounded btn-dark">
                                      <span class="icon">
                                        <i class="fab fa-github"></i>
                                      </span>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="separator-full"></div>
                            <div class="card">
                              <div class="card-header">
                                <a href="#">Biography</a>
                                <button
                                  class="btn btn-xs btn-icon btn-rounded btn-light"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title=""
                                  data-bs-original-title="Edit"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="edit-2"></i>
                                    </span>
                                  </span>
                                </button>
                              </div>
                              <div class="card-body">
                                <p>
                                  Hello there, Morgan Freeman is a full-stack
                                  frontend developer working under pressure is
                                  his quality.
                                </p>
                              </div>
                            </div>
                            <div class="separator-full"></div>
                            <div class="card">
                              <div class="card-header">
                                <a href="#">Settings</a>
                              </div>
                              <div class="card-body">
                                <ul class="cp-action">
                                  <li>
                                    <a href="javascript:void(0);">
                                      <span class="cp-icon-wrap">
                                        <span class="feather-icon">
                                          <i data-feather="upload"></i>
                                        </span>
                                      </span>
                                      Share Contact
                                    </a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0);">
                                      <span class="cp-icon-wrap">
                                        <span class="feather-icon">
                                          <i data-feather="heart"></i>
                                        </span>
                                      </span>
                                      Add to Favourites
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0);"
                                      class="link-danger"
                                    >
                                      <span class="cp-icon-wrap">
                                        <span class="feather-icon">
                                          <i data-feather="trash"></i>
                                        </span>
                                      </span>
                                      Delete Contact
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="contact-more-info">
                            <ul class="nav nav-tabs nav-line nav-icon nav-light">
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  data-bs-toggle="tab"
                                  href="#tab_summery"
                                >
                                  <span class="nav-icon-wrap">
                                    <span class="feather-icon">
                                      <i data-feather="zap"></i>
                                    </span>
                                  </span>
                                  <span class="nav-link-text">Summery</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#"
                                >
                                  <span class="nav-icon-wrap">
                                    <span class="feather-icon">
                                      <i data-feather="activity"></i>
                                    </span>
                                  </span>
                                  <span class="nav-link-text">Activity</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#"
                                >
                                  <span class="nav-icon-wrap">
                                    <span class="feather-icon">
                                      <i data-feather="edit-3"></i>
                                    </span>
                                  </span>
                                  <span class="nav-link-text">Notes</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#"
                                >
                                  <span class="nav-icon-wrap">
                                    <span class="feather-icon">
                                      <i data-feather="mail"></i>
                                    </span>
                                  </span>
                                  <span class="nav-link-text">Email</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#"
                                >
                                  <span class="nav-icon-wrap">
                                    <span class="feather-icon">
                                      <i data-feather="phone"></i>
                                    </span>
                                  </span>
                                  <span class="nav-link-text">Calls</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#"
                                >
                                  <span class="nav-icon-wrap">
                                    <span class="feather-icon">
                                      <i data-feather="check-square"></i>
                                    </span>
                                  </span>
                                  <span class="nav-link-text">Tasks</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#"
                                >
                                  <span class="nav-icon-wrap">
                                    <span class="feather-icon">
                                      <i data-feather="clock"></i>
                                    </span>
                                  </span>
                                  <span class="nav-link-text">Schedule</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#"
                                >
                                  <span class="nav-icon-wrap">
                                    <span class="feather-icon">
                                      <i data-feather="shield"></i>
                                    </span>
                                  </span>
                                  <span class="nav-link-text">Sales</span>
                                </a>
                              </li>
                            </ul>
                            <div class="tab-content mt-7">
                              <div
                                class="tab-pane fade show active"
                                id="tab_summery"
                              >
                                <form>
                                  <div class="row">
                                    <div class="col-md-12 form-group">
                                      <div class="form-label-group">
                                        <label>Write a Note</label>
                                        <small class="text-muted">1200</small>
                                      </div>
                                      <textarea
                                        class="form-control"
                                        rows="8"
                                        placeholder="Write an internal note"
                                      ></textarea>
                                    </div>
                                  </div>
                                  <button class="btn btn-outline-light mt-2">
                                    Add Note
                                  </button>
                                </form>
                              </div>
                            </div>
                            <div class="pipeline-status-wrap mt-7">
                              <div class="title-lg mb-3">
                                Lead Pipeline Status
                              </div>
                              <ul class="pipeline-stutus">
                                <li class="completed">
                                  <span>In Pipeline</span>
                                </li>
                                <li class="active">
                                  <span>Follow Up</span>
                                </li>
                                <li>
                                  <span>Scheduled Service</span>
                                </li>
                                <li>
                                  <span>Conversation</span>
                                </li>
                                <li>
                                  <span>Win/Lost</span>
                                </li>
                              </ul>
                              <div class="clearfix"></div>
                            </div>
                            <div class="activity-wrap mt-7">
                              <div class="d-flex align-items-center justify-content-between mb-4">
                                <div class="title-lg mb-0">Activity</div>
                                <select class="form-select mw-150p">
                                  <option selected="">All Activity</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                              <div class="title-sm text-primary mb-3">
                                June 24
                              </div>
                              <ul class="activity-thread">
                                <li>
                                  <div class="media">
                                    <div class="media-head">
                                      <div class="avatar avatar-icon avatar-sm avatar-primary avatar-rounded">
                                        <span class="initial-wrap">
                                          <span class="feather-icon">
                                            <i data-feather="mail"></i>
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                    <div class="media-body">
                                      <div>
                                        <div class="activity-text">
                                          You sent{" "}
                                          <span class="text-dark text-capitalize">
                                            1 message
                                          </span>{" "}
                                          to the contact.
                                        </div>
                                        <div class="activity-time">
                                          10.00 pm
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div class="media">
                                    <div class="media-head">
                                      <div class="avatar avatar-sm avatar-soft-danger avatar-rounded">
                                        <span class="initial-wrap">M</span>
                                      </div>
                                    </div>
                                    <div class="media-body">
                                      <div>
                                        <div class="activity-text">
                                          <span class="text-dark text-capitalize">
                                            Morgan Freeman
                                          </span>{" "}
                                          as it is sometimes known, is dummy
                                          text used in laying out print, graphic
                                          or web designs. The passage is
                                          attributed to an unknown typesetter in
                                          the 15th century who is thought to
                                          have scrambled.
                                        </div>
                                        <div class="activity-time">
                                          10.00 pm
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div class="media">
                                    <div class="media-head">
                                      <div class="avatar  avatar-icon avatar-sm avatar-info avatar-rounded">
                                        <span class="initial-wrap">
                                          <span class="feather-icon">
                                            <i data-feather="shield"></i>
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                    <div class="media-body">
                                      <div>
                                        <div class="activity-text">
                                          Your deal value{" "}
                                          <span class="text-dark">$208.15</span>{" "}
                                          is paid through PayU Money online on{" "}
                                          <span class="text-dark">
                                            02.12.18
                                          </span>{" "}
                                          at{" "}
                                          <span class="text-dark">
                                            15:30, Monday
                                          </span>
                                        </div>
                                        <div class="activity-time">
                                          10.00 pm
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <div class="title-sm text-primary mt-5 mb-3">
                                June 25
                              </div>
                              <ul class="activity-thread">
                                <li>
                                  <div class="media">
                                    <div class="media-head">
                                      <div class="avatar avatar-sm avatar-soft-danger avatar-rounded">
                                        <span class="initial-wrap">M</span>
                                      </div>
                                    </div>
                                    <div class="media-body">
                                      <div>
                                        <div class="activity-text">
                                          <span class="text-dark">
                                            Morgan Freeman
                                          </span>{" "}
                                          responded to your appointment schedule
                                          question.{" "}
                                        </div>
                                        <div class="activity-time">
                                          10.00 pm
                                        </div>
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
            </div> */}
            {/* <!-- /Contact Details --> */}
            {/* <!-- Edit Info --> */}
            {/* <div
              id="add_new_contact"
              className="modal fade add-new-contact"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Add New Contact
                    </span>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <AddContactList />
                  </div>
                </div>
              </div>
            </div> */}
            {/* <!-- /Edit Info --> */}
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default SubscriptionContent;
