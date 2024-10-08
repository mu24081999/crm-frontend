import React from "react";
import { FaEnvelope, FaPhoneAlt, FaUserAstronaut } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const Detail_Tabs = () => {
  return (
    <ul className="nav nav-tabs nav-line nav-icon nav-light">
      <li className="nav-item">
        <a className="nav-link" data-bs-toggle="tab" href="#SUB_Accounts_tab">
          <span className="nav-icon-wrap">
            <span className="feather-icon">
              <FaUserAstronaut />
            </span>
          </span>
          <span className="nav-link-text">Sub Accounts</span>
        </a>
      </li>
    </ul>
  );
};

export default Detail_Tabs;
