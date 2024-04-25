import React from "react";

const Sidebar = () => {
  return (
    <div className="col-lg-2 col-sm-3 col-4">
      <div className="nav-profile mt-4">
        <div className="nav-header">
          <span>Account</span>
        </div>
        <ul className="nav nav-light nav-vertical nav-tabs">
          <li className="nav-item">
            <a
              data-bs-toggle="tab"
              href="#tab_block_1"
              className="nav-link active"
            >
              <span className="nav-link-text">Public Profile</span>
            </a>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="tab" href="#tab_block_2" className="nav-link">
              <span className="nav-link-text">Account Settings</span>
            </a>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="tab" href="#tab_cards" className="nav-link">
              <span className="nav-link-text">Card Information</span>
            </a>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="tab" href="#tab_block_4" className="nav-link">
              <span className="nav-link-text">Login & Security</span>
            </a>
          </li>
          {/* <li className="nav-item">
            <a
              data-bs-toggle="tab"
              href="#tab_block_billing"
              className="nav-link"
            >
              <span className="nav-link-text">Billing Address</span>
            </a>
          </li> */}
          <li className="nav-item">
            <a
              data-bs-toggle="tab"
              href="#tab_email_config"
              className="nav-link"
            >
              <span className="nav-link-text">Email Configuration</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
