import React, { useState } from "react";
import ContactProfile from "./ContactProfile";
import { FaEdit, FaMailBulk, FaPhone, FaPlus } from "react-icons/fa";
import Detail_Tabs from "./Detail_Tabs";

import { FaMessage } from "react-icons/fa6";
import SUB_Accounts_tab from "./SUB_Accounts";

const ContactDetails = ({ contactDetails, dispatch, token, authUser }) => {
  const [active, setActive] = useState("SMS_tab");
  const handleActiveBarDataFromChild = (data) => {
    setActive(data);
  };

  return (
    <>
      <div className="contactapp-detail-wrap">
        <header className="contact-header">
          <div className="d-flex align-items-center">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb  mb-0">
                <li className="breadcrumb-item">
                  <a href="contact.html">Contacts</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {contactDetails?.firstname} {contactDetails?.middlename}{" "}
                  {contactDetails?.lastname}
                </li>
              </ol>
            </nav>
          </div>
          <div className="contact-options-wrap">
            <div className="d-flex fs-7 align-items-center">1 of 30</div>
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Previous"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="chevron-left"></i>
                </span>
              </span>
            </a>
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Next"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="chevron-right"></i>
                </span>
              </span>
            </a>
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Collapse"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="chevron-up"></i>
                </span>
                <span className="feather-icon d-none">
                  <i data-feather="chevron-down"></i>
                </span>
              </span>
            </a>
          </div>
          <div className="hk-sidebar-togglable"></div>
        </header>

        <div className="contact-body contact-detail-body">
          <div className="nicescroll-bar">
            <div className="d-flex flex-xxl-nowrap flex-wrap">
              <div
                className="contact-info w-xxl-30 w-100"
                style={{ maxHeight: "1000px", overflow: "scroll" }}
              >
                <div className="dropdown action-btn">
                  <button
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    className="btn btn-light dropdown-toggle "
                    type="button"
                  >
                    Action
                  </button>
                  <div role="menu" className="dropdown-menu">
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/">
                      Separated link
                    </a>
                  </div>
                </div>
                <div className="text-center mt-5">
                  <div className="dropify-circle edit-img">
                    <img
                      src={contactDetails?.avatar}
                      alt={contactDetails?.name}
                      className="dropify-1"
                      width={100}
                    />
                  </div>
                  <div className="cp-name text-truncate mt-3">
                    {/* Mendaline Shane */}
                    {contactDetails?.name}
                  </div>
                  <p>No phone calls Always busy</p>

                  <div
                    className="rating rating-yellow my-rating-4"
                    data-rating="3"
                  ></div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a href="/">Profile Information</a>
                    <button
                      className="btn btn-xs btn-icon btn-rounded btn-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Edit"
                    >
                      <span
                        className="icon"
                        data-bs-toggle="modal"
                        data-bs-target="#editInfo"
                      >
                        <span className="feather-icon">
                          <FaEdit />
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="card-body">
                    <ul className="cp-info">
                      <li>
                        <span>Full Name</span>
                        <span>{contactDetails?.name}</span>
                      </li>
                      <li>
                        <span>Username</span>
                        <span>{contactDetails?.username}</span>
                      </li>
                      <li>
                        <span>Email</span>
                        <span>
                          {contactDetails?.email?.slice(0, 20)}
                          {contactDetails?.email?.length > 20 ? "..." : ""}
                        </span>
                      </li>
                      <li>
                        <span>Role</span>
                        <span>{contactDetails?.role}</span>
                      </li>
                      <li>
                        <span>Phone</span>
                        <span>{contactDetails?.phone}</span>
                      </li>
                      <li>
                        <span>Location</span>
                        <span>Newyork</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="separator-full"></div>
                <div className="card">
                  <div className="card-header">
                    <a href="/">Tags</a>
                    <button
                      className="btn btn-xs btn-icon btn-rounded btn-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Add Tags"
                    >
                      <span
                        className="icon"
                        data-bs-toggle="modal"
                        data-bs-target="#tagsInput"
                      >
                        <span className="feather-icon">
                          {/* <i data-feather="plus"></i> */}
                          <FaPlus />
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="card-body">
                    {contactDetails?.tags?.map((tag, index) => (
                      <span key={index} className="badge badge-soft-violet">
                        {tag.name}
                      </span>
                    ))}

                    <span className="badge badge-soft-danger">
                      React Developer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactProfile contact={contactDetails} />
    </>
  );
};

export default ContactDetails;
