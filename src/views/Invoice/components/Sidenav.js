import React, { useState } from "react";
import { FaArchive, FaRegEdit, FaStar, FaTrash, FaUsers } from "react-icons/fa";

const Sidenav = ({
  onShowCreateDataFromChild,
  onShowListDataFromChild,
  onShowDetailsDataFromChild,
  onFilterDataFromChild,
  invoiceData,
}) => {
  const [activeBar, setActiveBar] = useState("all");
  const handleCreateClick = () => {
    onShowCreateDataFromChild(true);
    onShowListDataFromChild(false);
    onShowDetailsDataFromChild(false);
  };
  const handleAllClick = () => {
    const data = invoiceData?.filter(
      (inv) => inv.activity !== "blocked" && inv.activity !== "archived"
    );
    setActiveBar("all");
    onFilterDataFromChild(data);
    onShowListDataFromChild(true);
    onShowCreateDataFromChild(false);
    onShowDetailsDataFromChild(false);
  };
  const onDeleteClick = () => {
    const data = invoiceData?.filter((inv) => inv.activity === "blocked");
    setActiveBar("deleted");

    onFilterDataFromChild(data);
    onShowListDataFromChild(true);
    onShowCreateDataFromChild(false);
    onShowDetailsDataFromChild(false);
  };
  const onPendingClick = () => {
    const data = invoiceData?.filter((inv) => inv.status === "draft");
    setActiveBar("draft");

    onFilterDataFromChild(data);
    onShowListDataFromChild(true);
    onShowCreateDataFromChild(false);
    onShowDetailsDataFromChild(false);
  };
  const onArchiveClick = () => {
    const data = invoiceData?.filter((inv) => inv.activity === "archived");
    setActiveBar("archived");

    onFilterDataFromChild(data);
    onShowListDataFromChild(true);
    onShowCreateDataFromChild(false);
    onShowDetailsDataFromChild(false);
  };
  const onSentClick = () => {
    const data = invoiceData?.filter((inv) => inv.activity === "sent");
    setActiveBar("sent");

    onFilterDataFromChild(data);
    onShowListDataFromChild(true);
    onShowCreateDataFromChild(false);
    onShowDetailsDataFromChild(false);
  };
  return (
    <nav className="invoiceapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <button
            type="button"
            aria-expanded="false"
            data-bs-toggle="dropdown"
            className="btn btn-primary btn-rounded btn-block mb-4 dropdown-toggle"
          >
            Create
          </button>
          <div role="menu" className="dropdown-menu">
            <a
              className="dropdown-item"
              // href="create-invoice.html"
              onClick={handleCreateClick}
            >
              Create Invoice
            </a>
            {/* <a className="dropdown-item" href="/">
              Create Estimate
            </a> */}
          </div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className={`nav-item ${activeBar === "all" ? "active" : ""}`}>
                <a className="nav-link" onClick={handleAllClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="users"></i> */}
                      <FaUsers />
                    </span>
                  </span>
                  <span className="nav-link-text">All Invoices</span>
                </a>
              </li>
              <li
                className={`nav-item ${activeBar === "sent" ? "active" : ""}`}
              >
                <a className="nav-link" onClick={onSentClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="star"></i> */}
                      <FaStar />
                    </span>
                  </span>
                  <span className="nav-link-text">Sent</span>
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "archived" ? "active" : ""
                }`}
              >
                <a className="nav-link" onClick={onArchiveClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="archive"></i> */}
                      <FaArchive />
                    </span>
                  </span>
                  <span className="nav-link-text">Archived</span>
                </a>
              </li>
              <li
                className={`nav-item ${activeBar === "draft" ? "active" : ""}`}
              >
                <a className="nav-link" onClick={onPendingClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="edit"></i> */}
                      <FaRegEdit />
                    </span>
                  </span>
                  <span className="nav-link-text">Pending</span>
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeBar === "deleted" ? "active" : ""
                }`}
              >
                <a className="nav-link" onClick={onDeleteClick}>
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="trash-2"></i> */}
                      <FaTrash />
                    </span>
                  </span>
                  <span className="nav-link-text">Deleted</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="menu-gap"></div>
          <div className="nav-header">
            <span>Manage</span>
          </div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="upload"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Manage Invoices</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="download"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Recurring Invoices</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="layers"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Manage Estimate</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="book"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Manage Contacts</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="save"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Saved Templates</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="menu-gap"></div>
          <div className="nav-header">
            <span>Info</span>
          </div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="users"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Business Info</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <span className="nav-link-text">Tax Info</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="invoiceapp-fixednav">
        <div className="hk-toolbar">
          <ul className="nav nav-light">
            <li className="nav-item nav-link">
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Settings"
                href="/"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="settings"></i>
                  </span>
                </span>
              </a>
            </li>
            <li className="nav-item nav-link">
              <a
                href="/"
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Archive"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="archive"></i>
                  </span>
                </span>
              </a>
            </li>
            <li className="nav-item nav-link">
              <a
                href="/"
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Help"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="book"></i>
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <!--/ Sidebar Fixnav--> */}
    </nav>
  );
};

export default Sidenav;
