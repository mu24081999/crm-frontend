import React, { useContext } from "react";
import { FaRegStar } from "react-icons/fa";
import moment from "moment";
import { SocketContext } from "../../../../Context";

const SubscriptionCard = ({ subscriptionArray, token }) => {
  const { handleToggleShowLeadDetail } = useContext(SocketContext);
  const handleToggle = (contact_id) => {
    // onToggleEdit(true);
    // dispatch(getContactDetais(token, contact_id));
    handleToggleShowLeadDetail(true, contact_id, token);
  };
  return (
    <div className="contact-card-view overflow-scroll h-100">
      <div className="row">
        <div className="col-7 mb-3">
          <div className="contact-toolbar-left">
            <div className="d-xxl-flex d-none align-items-center form-group mb-0">
              <select className="form-select form-select-sm w-120p">
                <option selected="">Bulk actions</option>
                <option value="1">Edit</option>
                <option value="2">Move to trash</option>
              </select>
              <button className="btn btn-sm btn-light ms-2">Apply</button>
            </div>
            <div className="d-xxl-flex d-none align-items-center form-group mb-0">
              <label className="flex-shrink-0 mb-0 me-2">Sort by:</label>
              <select className="form-select form-select-sm w-130p">
                <option selected="">Date Created</option>
                <option value="1">Date Edited</option>
                <option value="2">Frequent Contacts</option>
                <option value="3">Recently Added</option>
              </select>
            </div>
            <select className="d-flex align-items-center w-130p form-select form-select-sm">
              <option selected="">Export to CSV</option>
              <option value="2">Export to PDF</option>
              <option value="3">Send Message</option>
              <option value="4">Delegate Access</option>
            </select>
          </div>
        </div>
        <div className="col-5 mb-3">
          <div className="contact-toolbar-right">
            <div id="datable_1_filter" className="dataTables_filter">
              <label>
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search"
                />
              </label>
            </div>
            <div className="dataTables_length" id="datable_1_length">
              <label>
                View
                <select
                  name="datable_1_length"
                  className="form-select form-select-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </label>
            </div>
            <div
              className="dataTables_info"
              id="datable_1_info"
              role="status"
              aria-live="polite"
            >
              1 - 10 of 11
            </div>
            <div
              className="dataTables_paginate paging_simple_numbers"
              id="datable_1_paginate"
            >
              <ul className="pagination custom-pagination pagination-simple m-0">
                <li
                  className="paginate_button page-item previous disabled"
                  id="datable_1_previous"
                >
                  <a
                    href="#"
                    data-dt-idx="0"
                    tabindex="0"
                    className="page-link"
                  >
                    <i className="ri-arrow-left-s-line"></i>
                  </a>
                </li>
                <li className="paginate_button page-item active">
                  <a
                    href="#"
                    data-dt-idx="1"
                    tabindex="0"
                    className="page-link"
                  >
                    1
                  </a>
                </li>
                <li className="paginate_button page-item ">
                  <a
                    href="#"
                    data-dt-idx="2"
                    tabindex="0"
                    className="page-link"
                  >
                    2
                  </a>
                </li>
                <li
                  className="paginate_button page-item next"
                  id="datable_1_next"
                >
                  <a
                    href="#"
                    data-dt-idx="3"
                    tabindex="0"
                    className="page-link"
                  >
                    <i className="ri-arrow-right-s-line"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {subscriptionArray?.length > 0 &&
          subscriptionArray?.map((sub, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div className="card card-border contact-card">
                <div
                  className="card-header bg-primary"
                  style={{ color: "white" }}
                >
                  {sub?.customer_details?.name}

                  <span
                    className={`badge badge-sm rounded fw-bold ${
                      sub?.status === "active"
                        ? "badge-success"
                        : "badge-danger"
                    }`}
                  >
                    {sub?.status}
                  </span>
                </div>
                <div className="card-body text-center">
                  <div className="avatar avatar-xl avatar-rounded">
                    <img
                      src={
                        sub?.avatar ||
                        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div className="user-name">
                    <span className="contact-star">
                      <span className="feather-icon">
                        {/* <i data-feather="star"></i> */}
                        <FaRegStar />
                      </span>
                    </span>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Name</div>
                    <div>{sub?.customer_details?.name}</div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Email</div>
                    <div>{sub?.customer_details?.email}</div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Plan</div>
                    <div>{sub?.plan}</div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Date Started</div>
                    <div>{moment(sub?.start_date).format("DD, MMM YYYY")}</div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Expire Date</div>
                    <div>{moment(sub?.end_date).format("DD, MMM YYYY")}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="row">
        <div className="d-flex align-items-center col-sm-12 col-md-5 justify-content-center justify-content-md-start">
          <div className="dataTables_info">1 - 10 of 30</div>
        </div>
        <div className="col-sm-12 col-md-7">
          <ul className="pagination custom-pagination pagination-simple mb-0 justify-content-center justify-content-md-end">
            <li className="paginate_button page-item previous disabled">
              <a href="#" data-dt-idx="0" tabindex="0" className="page-link">
                <i className="ri-arrow-left-s-line"></i>
              </a>
            </li>
            <li className="paginate_button page-item active">
              <a href="#" data-dt-idx="1" tabindex="0" className="page-link">
                1
              </a>
            </li>
            <li className="paginate_button page-item ">
              <a href="#" data-dt-idx="2" tabindex="0" className="page-link">
                2
              </a>
            </li>
            <li className="paginate_button page-item next">
              <a href="#" data-dt-idx="4" tabindex="0" className="page-link">
                <i className="ri-arrow-right-s-line"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
