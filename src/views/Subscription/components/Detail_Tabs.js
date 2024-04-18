import React from "react";

const Detail_Tabs = () => {
  return (
    <ul className="nav nav-tabs nav-line nav-icon nav-light">
      <li className="nav-item">
        <a className="nav-link active" data-bs-toggle="tab" href="#SMS_tab">
          <span className="nav-icon-wrap">
            <span className="feather-icon">
              <i data-feather="zap"></i>
            </span>
          </span>
          <span className="nav-link-text">SMS</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-bs-toggle="tab" href="#Email_tab">
          <span className="nav-icon-wrap">
            <span className="feather-icon">
              <i data-feather="zap"></i>
            </span>
          </span>
          <span className="nav-link-text">Emails</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-bs-toggle="tab" href="#Call_tab">
          <span className="nav-icon-wrap">
            <span className="feather-icon">
              <i data-feather="zap"></i>
            </span>
          </span>
          <span className="nav-link-text">Calls</span>
        </a>
      </li>
    </ul>
  );
};

export default Detail_Tabs;
