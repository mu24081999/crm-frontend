import React from "react";
import { Link } from "react-router-dom";
import notAllowed from "../../assets/not_allowed.jpg";
import { SiAdblock } from "react-icons/si";

const NotFoundContent = () => {
  return (
    <div>
      <div className="hk-pg-wrapper">
        <div className="container-xxl">
          {/* <!-- Page Body --> */}
          <div className="hk-pg-body">
            <div className="d-flex justify-content-center">
              {/* <div className="col-xl-7 col-lg-6 d-lg-block d-none">
                <div className="auth-content py-md-0 py-8">
                  <div className="row">
                    <div className="col-xl-12 text-center">
                      <img
                        // src="dist/img/macaroni-fatal-error.png"
                        src={notAllowed}
                        className="img-fluid w-sm-80 w-50"
                        alt="login"
                      />

                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-xl-5 col-lg-6 col-md-7 col-sm-10">
                <div className="text-center">
                  <SiAdblock size={200} color="teal" />
                </div>
                <div className="auth-content py-md-0 py-8">
                  <div className="w-100">
                    <div className="d-flex justify-content-center mt-5">
                      <div className="col-xxl-9 col-xl-8 col-lg-11">
                        <h1 className="display-4 fw-bold mb-2 text-center">
                          503
                        </h1>
                        <p className="p-lg text-center">
                          Sorry, you are not allowed to request this page.
                        </p>
                        <div className="d-flex justify-content-center">
                          <Link
                            to="/plan-selection"
                            className="btn btn-primary mt-4"
                          >
                            Return back and select your plan
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /Page Body -->		 */}
        </div>

        {/* <!-- Page Footer --> */}
        {/* <div className="hk-footer">
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
        </div> */}
        {/* <!-- / Page Footer --> */}
      </div>
    </div>
  );
};

export default NotFoundContent;
