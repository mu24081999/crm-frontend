import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegStar, FaStar, FaUserCheck } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { getContactDetais } from "../../../redux/services/contact";
const ContactCards = ({ contactsData, token, dispatch, onToggleEdit }) => {
  const handleToggle = (contact_id) => {
    onToggleEdit(true);
    dispatch(getContactDetais(token, contact_id));
  };
  return (
    <div className="contact-card-view">
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
      <div className="row gx-3 row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 mb-5">
        {contactsData?.length > 0 &&
          contactsData?.map((contact, index) => (
            <div className="col" key={index}>
              <div className="card card-border contact-card">
                <div className="card-body text-center">
                  <div className="card-action-wrap">
                    <a
                      className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                      href="#"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                    >
                      <span className="btn-icon-wrap">
                        <span className="feather-icon">
                          {/* <i data-feather="more-vertical"></i> */}
                          <CiMenuKebab />
                        </span>
                      </span>
                    </a>
                    <div
                      className="dropdown-menu  dropdown-menu-end"
                      role="menu"
                    >
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        role="menuitem"
                      >
                        <i className="icon wb-reply" aria-hidden="true"></i>
                        Reply
                      </a>
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        role="menuitem"
                      >
                        <i className="icon wb-share" aria-hidden="true"></i>
                        Forward
                      </a>
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        role="menuitem"
                      >
                        <i className="icon wb-trash" aria-hidden="true"></i>
                        Delete
                      </a>
                    </div>
                  </div>
                  <div className="avatar avatar-xl avatar-rounded">
                    <img
                      src={contact?.avatar}
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
                    {contact?.firstname} {contact?.lastname}
                  </div>
                  <div className="user-email">{contact?.email}</div>
                  <div className="user-contact">{contact?.phone}</div>
                  <div className="user-desg">
                    <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>{" "}
                    Design
                  </div>
                </div>
                <div className="card-footer text-muted position-relative">
                  <a href="#" className="d-flex align-items-center">
                    <span className="feather-icon me-2">
                      {/* <i data-feather="inbox"></i> */}
                      <FaMessage />
                    </span>
                    <span className="fs-7 lh-1">Message</span>
                  </a>
                  <div className="v-separator-full m-0"></div>
                  <a
                    className="d-flex align-items-center"
                    // data-bs-toggle="modal"
                    // data-bs-target="#contact_detail"
                    onClick={() => handleToggle(contact.id)}
                  >
                    <span className="feather-icon me-2">
                      {/* <i data-feather="user-check"></i> */}
                      <FaUserCheck />
                    </span>
                    <span className="fs-7 lh-1">Profile</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

        {/* <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar9.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Huma Therman
              </div>
              <div className="user-email">huma@clariesup.au</div>
              <div className="user-contact">+234 48 2365</div>
              <div className="user-desg">
                <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>{" "}
                Developer
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-soft-primary avatar-rounded">
                <span className="initial-wrap">C</span>
              </div>
              <div className="user-name">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Charlie Chaplin
              </div>
              <div className="user-email">charlie@leernoca.monster</div>
              <div className="user-contact">+741 56 1916</div>
              <div className="user-desg">
                <span className="badge badge-danger badge-indicator badge-indicator-lg me-2"></span>{" "}
                Inventory
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar10.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Winston Churchil
              </div>
              <div className="user-email">winston@worthniza.ga</div>
              <div className="user-contact">+145 52 5463</div>
              <div className="user-desg">
                <span className="badge badge-danger badge-indicator badge-indicator-lg me-2"></span>{" "}
                Human Resource
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar3.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Jaquiline Joker
              </div>
              <div className="user-email">contact@hencework.com</div>
              <div className="user-contact">+91-34-2636-1916</div>
              <div className="user-desg">
                <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>{" "}
                Design
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar7.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Tom Cruz
              </div>
              <div className="user-email">tomcz@jampack.com</div>
              <div className="user-contact">+456 52 4862</div>
              <div className="user-desg">
                <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>{" "}
                Developer
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-soft-danger avatar-rounded">
                <span className="initial-wrap">D</span>
              </div>
              <div className="user-name">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Daniel Craig
              </div>
              <div className="user-email">danialc@jampack.com</div>
              <div className="user-contact">+145 52 1916</div>
              <div className="user-desg">
                <span className="badge badge-success badge-indicator badge-indicator-lg me-2"></span>{" "}
                Design
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar8.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Katharine Jones
              </div>
              <div className="user-email">joneskath@jampack.com</div>
              <div className="user-contact">+741 56 1916</div>
              <div className="user-desg">
                <span className="badge badge-danger badge-indicator badge-indicator-lg me-2"></span>{" "}
                Inventory
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-primary avatar-rounded">
                <span className="initial-wrap">H</span>
              </div>
              <div className="user-name">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Hencework
              </div>
              <div className="user-email">contact@hencework.com</div>
              <div className="user-contact">+145 52 5478</div>
              <div className="user-desg">
                <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>{" "}
                Design
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar13.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Daniel Raynolds
              </div>
              <div className="user-email">danialraynolds@hencework.com</div>
              <div className="user-contact">+145 36 1916</div>
              <div className="user-desg">
                <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>{" "}
                Design
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-light avatar-rounded">
                <span className="initial-wrap">J</span>
              </div>
              <div className="user-name">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                John Brother
              </div>
              <div className="user-email">john@cryodrakan.info</div>
              <div className="user-contact">+456 52 1916</div>
              <div className="user-desg">
                <span className="badge badge-danger badge-indicator badge-indicator-lg me-2"></span>{" "}
                Human Resource
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar15.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Dean Shaw
              </div>
              <div className="user-email">dean-shaw@pown.me</div>
              <div className="user-contact">+234 48 1916</div>
              <div className="user-desg">
                <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>{" "}
                Design
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar11.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Cavin Spancy
              </div>
              <div className="user-email">cavins11@budgequot.press</div>
              <div className="user-contact">+234 48 1916</div>
              <div className="user-desg">
                <span className="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>{" "}
                Design
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar14.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Justin Bieber
              </div>
              <div className="user-email">justin@tulberga.ga</div>
              <div className="user-contact">+745 56 1916</div>
              <div className="user-desg">
                <span className="badge badge-danger badge-indicator badge-indicator-lg me-2"></span>{" "}
                Inventory
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-border contact-card">
            <div className="card-body text-center">
              <div className="card-action-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="#"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="btn-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu  dropdown-menu-end" role="menu">
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-reply" aria-hidden="true"></i>Reply
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-share" aria-hidden="true"></i>Forward
                  </a>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    role="menuitem"
                  >
                    <i className="icon wb-trash" aria-hidden="true"></i>Delete
                  </a>
                </div>
              </div>
              <div className="avatar avatar-xl avatar-rounded">
                <img
                  src="dist/img/avatar5.jpg"
                  alt="user"
                  className="avatar-img"
                />
              </div>
              <div className="user-name">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
                Auston Kutcher
              </div>
              <div className="user-email">auston@cutcher.com</div>
              <div className="user-contact">+145 52 1916</div>
              <div className="user-desg">
                <span className="badge badge-warning badge-indicator badge-indicator-lg me-2"></span>{" "}
                Human Resource
              </div>
            </div>
            <div className="card-footer text-muted position-relative">
              <a href="#" className="d-flex align-items-center">
                <span className="feather-icon me-2">
                  <i data-feather="inbox"></i>
                </span>
                <span className="fs-7 lh-1">Message</span>
              </a>
              <div className="v-separator-full m-0"></div>
              <a
                href="#"
                className="d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#contact_detail"
              >
                <span className="feather-icon me-2">
                  <i data-feather="user-check"></i>
                </span>
                <span className="fs-7 lh-1">Profile</span>
              </a>
            </div>
          </div>
        </div> */}
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

export default ContactCards;
