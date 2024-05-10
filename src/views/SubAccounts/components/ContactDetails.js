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
                  <a href="contact.html">Sub Account Details</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {contactDetails?.firstname} {contactDetails?.middlename}{" "}
                  {contactDetails?.lastname}
                </li>
              </ol>
            </nav>
          </div>
        </header>

        <div className="contact-body contact-detail-body">
          <div className="nicescroll-bar">
            <div className="d-flex flex-xxl-nowrap flex-wrap">
              <div
                className="contact-info w-xxl-30 w-100"
                style={{ maxHeight: "1000px", overflow: "scroll" }}
              >
                <div className="text-center mt-5">
                  <div className="dropify-circle edit-img">
                    <img
                      src={
                        contactDetails?.avatar ||
                        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      alt={contactDetails?.name}
                      className="dropify-1 rounded-circle"
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
                      {/* <li>
                        <span>Role</span>
                        <span>{contactDetails?.role}</span>
                      </li> */}
                      <li>
                        <span>Phone</span>
                        <span>{contactDetails?.personal_phone}</span>
                      </li>
                      <li>
                        <span>Location</span>
                        <span>
                          {contactDetails?.location
                            ? contactDetails?.location
                            : ""}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="separator-full"></div>
              </div>
              {/* <div className="contact-more-info">
                <Detail_Tabs
                  contactDetails={contactDetails}
                  onDataFromChild={handleActiveBarDataFromChild}
                  activeBar={active}
                />
                <SUB_Accounts_tab
                  contactDetails={contactDetails}
                  activeBar={active}
                  authUser={authUser}
                  dispatch={dispatch}
                  token={token}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <ContactProfile contact={contactDetails} />
    </>
  );
};

export default ContactDetails;
