import React from "react";

const Alert = () => {
  return (
    <div
      className="alert alert-warning alert-wth-icon alert-dismissible fade show"
      role="alert"
    >
      <span className="alert-icon-wrap">
        <i className="ri-alert-line"></i>
      </span>
      <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
        You must provide value for account name.
        <a
          href="/"
          className="btn btn-sm btn-warning ms-sm-auto mt-sm-0 mt-2 flex-shrink-0"
        >
          Upgrade Storage
        </a>
      </div>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
