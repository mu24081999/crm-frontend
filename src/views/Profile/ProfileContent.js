import React from "react";
import Sidebar from "./components/Sidebar";
import EditAccountSetting from "./components/EditAccountSetting";
import AccountSetting from "./components/AccountSetting";
import UpdatePassword from "./components/UpdatePassword";
import CardInformation from "./components/CardInformation";

const ProfileContent = () => {
  return (
    <div>
      <div className="hk-pg-wrapper">
        <div className="container-xxl">
          {/* <!-- Page Header --> */}
          <div className="hk-pg-header pt-7 pb-4">
            <h1 className="pg-title">Edit Profile</h1>
            <p>
              The Avatar component is used to represent a user, and displays the
              profile picture, initials or fallback icon.
            </p>
          </div>
          {/* <!-- /Page Header --> */}

          {/* <!-- Page Body --> */}
          <div className="hk-pg-body">
            <div className="row edit-profile-wrap">
              <Sidebar />
              <div className="col-lg-10 col-sm-9 col-8">
                <div className="tab-content">
                  <EditAccountSetting />
                  <AccountSetting />
                  <CardInformation />
                  <UpdatePassword />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /Page Body -->		 */}
        </div>

        {/* <!-- Page Footer --> */}
        <div className="hk-footer">
          <footer className="container-xxl footer">
            <div className="row">
              <div className="col-xl-8">
                <p className="footer-text">
                  <span className="copy-text">
                    Jampack © 2023 All rights reserved.
                  </span>{" "}
                  <a href="#" className="" target="_blank">
                    Privacy Policy
                  </a>
                  <span className="footer-link-sep">|</span>
                  <a href="#" className="" target="_blank">
                    T&C
                  </a>
                  <span className="footer-link-sep">|</span>
                  <a href="#" className="" target="_blank">
                    System Status
                  </a>
                </p>
              </div>
              <div className="col-xl-4">
                <a href="#" className="footer-extr-link link-default">
                  <span className="feather-icon">
                    <i data-feather="external-link"></i>
                  </span>
                  <u>Send feedback to our help forum</u>
                </a>
              </div>
            </div>
          </footer>
        </div>
        {/* <!-- / Page Footer --> */}
      </div>
    </div>
  );
};

export default ProfileContent;
