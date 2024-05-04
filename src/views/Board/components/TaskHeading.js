import React from "react";

const TaskHeading = () => {
  return (
    <div className="taskbar-toolbar">
      <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <button
          className="btn btn-soft-primary flex-shrink-0 btn-add-newlist me-4"
          data-bs-toggle="modal"
          data-bs-target="#add_task_list"
        >
          Create New
        </button>
        <div className="form-check form-switch ms-auto">
          <input
            type="checkbox"
            className="form-check-input"
            id="customDes"
            checked=""
          />
          <label className="form-check-label" for="customDes">
            Show description
          </label>
        </div>
      </div>
      <form role="search" className="d-lg-flex d-none">
        <input
          type="text"
          className="form-control"
          placeholder="Search in conversation"
        />
      </form>
    </div>
  );
};

export default TaskHeading;
