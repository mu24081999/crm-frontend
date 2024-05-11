import React from "react";

const Header = ({ authUser }) => {
  return (
    <header class="todo-header">
      <div class="d-flex align-items-center">
        {authUser?.parent_id !== null && (
          <button
            className="btn btn-primary me-4"
            data-bs-toggle="modal"
            data-bs-target="#add_new_task"
          >
            Add New Task
          </button>
        )}
        <div className="fw-bold fs-4">Todos</div>
        {/* <a
          class="todoapp-title dropdown-toggle link-dark"
          data-bs-toggle="dropdown"
          href="/"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <h1>All Tasks</h1>
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              <i data-feather="align-center"></i>
            </span>
            <span>All Tasks</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              <i data-feather="list"></i>
            </span>
            <span>My Tasks</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              <i data-feather="clock"></i>
            </span>
            <span>Pending Tasks</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              <i data-feather="droplet"></i>
            </span>
            <span>In Progress Tasks</span>
          </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/">
            Urgent Priority
          </a>
          <a class="dropdown-item" href="/">
            High Priority
          </a>
          <a class="dropdown-item" href="/">
            Low Priority
          </a>
        </div> */}
      </div>
      <div class="todo-options-wrap">
        <form class="d-sm-block d-none" role="search">
          <input type="text" class="form-control" placeholder="Search tasks" />
        </form>
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Collapse"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="chevron-up"></i>
            </span>
            <span class="feather-icon d-none">
              <i data-feather="chevron-down"></i>
            </span>
          </span>
        </a>
      </div>
      <div class="hk-sidebar-togglable"></div>
    </header>
  );
};

export default Header;
