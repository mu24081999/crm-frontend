import React from "react";
import Sidebar from "./components/Sidebar";
import EditAccountSetting from "./components/EditAccountSetting";
import AccountSetting from "./components/AccountSetting";
import UpdatePassword from "./components/UpdatePassword";

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
                  <div className="tab-pane fade" id="tab_block_3">
                    <div className="title-lg fs-4 mb-4">
                      <span>Privacy Settings</span>
                    </div>
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-check form-check-lg">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customChecks1"
                            />
                            <label
                              className="form-check-label mt-0"
                              for="customChecks1"
                            >
                              let others find me by email address
                            </label>
                            <small className="form-text text-muted d-block">
                              People who have your email address will be able to
                              connect you by Jampack
                            </small>
                          </div>
                          <div className="separator"></div>
                          <div className="form-check form-check-lg">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customChecks2"
                            />
                            <label
                              className="form-check-label mt-0"
                              for="customChecks2"
                            >
                              Keep my phone number private
                            </label>
                            <small className="form-text text-muted d-block">
                              No one can find you by your phone number. Your
                              phone number will not be shared with your contact
                              anymore.
                            </small>
                          </div>
                          <div className="separator"></div>
                          <div className="form-check form-check-lg">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customChecks3"
                            />
                            <label
                              className="form-check-label mt-0"
                              for="customChecks3"
                            >
                              All Keep my location sharing on
                            </label>
                            <small className="form-text text-muted d-block">
                              Jmapack webapp shares your location wherever you
                              go
                            </small>
                          </div>
                          <div className="separator"></div>
                          <div className="form-check form-check-lg">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customChecks4"
                            />
                            <label
                              className="form-check-label mt-0"
                              for="customChecks4"
                            >
                              Share data through select partnerships
                            </label>
                            <small className="form-text text-muted d-block">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Pellentesque condimentum mauris volutpat
                              enim ornare iaculis. Curabitur euismod rutrum
                              lorem id lobortis. Cras ut ex dui. Nulla sed
                              blandit tortor. In quam diam, efficitur sit amet
                              pulvinar eget, consequat placerat arcu.
                            </small>
                          </div>
                        </div>
                      </div>
                      <button type="button" className="btn btn-primary mt-5">
                        Save Changes
                      </button>
                    </form>
                  </div>
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
