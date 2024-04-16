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
          {/* <li className="nav-item">
            <a data-bs-toggle="tab" href="#tab_block_3" className="nav-link">
              <span className="nav-link-text">Privacy Settings</span>
            </a>
          </li> */}
          <li className="nav-item">
            <a data-bs-toggle="tab" href="#tab_block_4" className="nav-link">
              <span className="nav-link-text">Login & Security</span>
            </a>
          </li>
          {/* <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-link-text">Notifications</span>
            </a>
          </li>
          <li className="nav-item">
            <a data-scroll="" href="#" className="nav-link">
              <span className="nav-link-text">Connections</span>
            </a>
          </li>
          <li className="nav-item">
            <a data-scroll="" href="#" className="nav-link">
              <span className="nav-link-text">Billing Info</span>
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
