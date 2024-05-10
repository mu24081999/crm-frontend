import React, { useEffect } from "react";

import Analystics from "./components/Analystics";
import Overview from "./components/Overview";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { FaCalendar, FaCalendarAlt } from "react-icons/fa";
import { getDashboardData } from "../../redux/services/dashboard";

const DashboardContent = () => {
  const dispatch = useDispatch();
  const { token, user, accountSid, accountAuthToken } = useSelector(
    (state) => state.auth
  );
  const { dashboardData, isLoading } = useSelector((state) => state.dashboard);
  useEffect(() => {
    const data = {
      user_id: user.id,
      authToken: accountAuthToken,
      accountSid: accountSid,
      user_email: user.email,
      user_phone: user.phone,
    };
    dispatch(getDashboardData(token, data));
  }, [dispatch, token, accountAuthToken, accountSid, user]);
  //
  return (
    <div>
      {/* <!-- Main Content --> */}
      <div class="hk-pg-wrapper">
        <div class="container-xxl">
          {/* <!-- Page Header --> */}
          <div class="hk-pg-header pg-header-wth-tab pt-7">
            <div class="d-flex">
              <div class="d-flex flex-wrap justify-content-between flex-1">
                <div class="mb-lg-0 mb-2 me-8">
                  <h1 class="pg-title">
                    Welcome back <span>{user?.name}</span>
                  </h1>
                </div>
                <div class="pg-header-action-wrap">
                  <span className="badge bg-primary" style={{ color: "white" }}>
                    <FaCalendarAlt style={{ marginInline: "2%" }} />
                    {moment(Date.now()).format("DD MMM, YYYY")}
                  </span>
                </div>
              </div>
            </div>
            {/* <ul class="nav nav-line nav-light nav-tabs">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-bs-toggle="tab"
                  href="#dashboard_overview_tab"
                >
                  <span class="nav-link-text">Overview</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#dashboard_analystics_tab"
                >
                  <span class="nav-link-text">Analytics</span>
                </a>
              </li>
            </ul> */}
          </div>
          {/* <!-- /Page Header --> */}

          {/* <!-- Page Body --> */}
          <div class="hk-pg-body">
            <div class="tab-content">
              <Overview
                dashboardData={dashboardData}
                isLoading={isLoading}
                user={user}
              />
              {/* <Analystics dashboardData={dashboardData} /> */}
            </div>
          </div>
          {/* <!-- /Page Body -->		 */}
        </div>

        {/* <!-- Page Footer --> */}
        {/* <div class="hk-footer">
          <footer class="container-xxl footer">
            <div class="row">
              <div class="col-xl-8">
                <p class="footer-text">
                  <span class="copy-text">
                    Jampack © 2023 All rights reserved.
                  </span>{" "}
                  <a href="/" class="" target="_blank">
                    Privacy Policy
                  </a>
                  <span class="footer-link-sep">|</span>
                  <a href="/" class="" target="_blank">
                    T&C
                  </a>
                  <span class="footer-link-sep">|</span>
                  <a href="/" class="" target="_blank">
                    System Status
                  </a>
                </p>
              </div>
              <div class="col-xl-4">
                <a href="/" class="footer-extr-link link-default">
                  <span class="feather-icon">
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
      {/* <!-- /Main Content --> */}
    </div>
  );
};

export default DashboardContent;
