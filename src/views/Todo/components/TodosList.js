import moment from "moment";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { deleteTodoRec, getTodoDetails } from "../../../redux/services/todo";
// import Pagination from "../../../components/Pagination/Pagination";

const TodosList = ({
  todosData,
  token,
  dispatch,
  onDataFromChild,
  todosData_,
  paginationDataFromChild,
}) => {
  console.log("🚀 ~ todosData_:", todosData_);
  const handleTaskClick = (task_id) => {
    onDataFromChild(true);
    dispatch(getTodoDetails(token, task_id));
  };
  const handleDeleteTask = (task_id) => {
    dispatch(deleteTodoRec(token, task_id));
  };
  return (
    <div class="container">
      <div class="todo-toolbar">
        <div>
          <select class="form-select form-select-sm">
            <option selected="">Bulk actions</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <button class="btn btn-sm btn-light ms-2">Apply</button>
          <select class="d-xxl-inline-block d-none  form-select form-select-sm mx-2">
            <option selected="">Sort by date</option>
            <option value="1">Sort By Time</option>
            <option value="2">Sort By Category</option>
            <option value="3">Sort By Priority</option>
            <option value="4">Sort By Title</option>
            <option value="5">Sort By Assignee</option>
          </select>
        </div>
        <div>
          <div class="paging-info d-xxl-inline-block d-none">1 - 10 of 30</div>
          <ul class="pagination custom-pagination pagination-simple m-0 ms-3">
            <li
              class="paginate_button page-item previous disabled"
              id="datable_1_previous"
            >
              <a href="/" data-dt-idx="0" tabindex="0" class="page-link">
                <i class="ri-arrow-left-s-line"></i>
              </a>
            </li>
            <li class="paginate_button page-item active">
              <a href="/" data-dt-idx="1" tabindex="0" class="page-link">
                1
              </a>
            </li>
            <li class="paginate_button page-item ">
              <a href="/" data-dt-idx="2" tabindex="0" class="page-link">
                2
              </a>
            </li>
            <li class="paginate_button page-item next" id="datable_1_next">
              <a href="/" data-dt-idx="3" tabindex="0" class="page-link">
                <i class="ri-arrow-right-s-line"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {Object.entries(todosData).map(([date, todosList]) => (
        <div class="collapse-simple mt-4" key={date}>
          <div class="card">
            <div class="card-header">
              <a
                role="button"
                data-bs-toggle="collapse"
                href="/todo_collapse_1"
                aria-expanded="true"
              >
                <h5 class="mb-0">
                  {moment(Date.now()).format("YYYY-MM-DD") === date
                    ? "Recently Assigned"
                    : moment(date).format("MMM DD YYYY")}
                </h5>
              </a>
            </div>
            <div id="todo_collapse_1" class="collapse show">
              <div class="card-body">
                <ul id="todo_list" class="advance-list">
                  {todosList?.map((task, index) => (
                    <li
                      class="advance-list-item single-task-list active-todo"
                      key={index}
                      onClick={() => handleTaskClick(task.id)}
                    >
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                          <div class="form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id="customCheckTodo1"
                            />
                            <label
                              class="form-check-label"
                              for="customCheckTodo1"
                            ></label>
                          </div>
                          <div>
                            <span class="todo-star marked">
                              <span class="feather-icon">
                                {/* <i data-feather="star"></i> */}
                                <FaStar />
                              </span>
                            </span>
                            <span class="badge badge-danger badge-indicator badge-indicator-xl"></span>
                            <span class="todo-text text-dark text-truncate">
                              {task.name}
                            </span>
                            <span class="badge badge-sm badge-outline badge-danger badge-wth-indicator badge-wth-icon ms-3 d-lg-inline-block d-none">
                              <span>
                                <i class="badge-dot ri-checkbox-blank-circle-fill"></i>
                                {task.priority}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div class="d-flex flex-shrink-0 align-items-center ms-3">
                          <span class="todo-time d-lg-inline-block d-none text-primary me-3">
                            {moment(task.end_date).format("YYYY MMM DD") +
                              " " +
                              task.end_time}
                          </span>
                          {/* <div class="avatar avatar-xs avatar-rounded d-md-inline-block d-none">
                            <img
                              src="dist/img/avatar7.jpg"
                              alt="user"
                              class="avatar-img"
                            />
                          </div> */}
                          <div className="avatar-group avatar-group-sm avatar-group-overlapped me-3">
                            {task?.asign_to &&
                              task?.asign_to?.members?.map((member, index) => (
                                <div
                                  className="avatar avatar-rounded"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title=""
                                  data-bs-original-title="Katharine"
                                >
                                  <img
                                    // src="dist/img/avatar8.jpg"
                                    src={member.avatar}
                                    alt="user"
                                    className="avatar-img"
                                  />
                                </div>
                              ))}

                            {task?.asign_to?.members?.length > 3 && (
                              <div
                                className="avatar avatar-soft-danger avatar-rounded"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Tooltip text"
                              >
                                <span className="initial-wrap">
                                  {task?.asign_to?.memebers?.length - 3}+
                                </span>
                              </div>
                            )}
                          </div>

                          {task?.labels?.labels?.map((label, index) => (
                            <span
                              class="badge badge-primary ms-3 d-md-inline-block d-none"
                              key={index}
                            >
                              {label}
                            </span>
                          ))}
                          <div class="dropdown">
                            <button
                              class="btn btn-icon btn-rounded btn-flush-light flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span class="icon">
                                <span class="feather-icon">
                                  {/* <i data-feather="more-vertical"></i> */}
                                  <CiMenuKebab />
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              class="dropdown-menu dropdown-menu-end"
                            >
                              <button
                                class="dropdown-item edit-task"
                                onClick={handleTaskClick}
                              >
                                Edit Task
                              </button>
                              <button
                                class="dropdown-item view-task"
                                onClick={handleTaskClick}
                              >
                                View Task
                              </button>
                              <button
                                class="dropdown-item "
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                Delete Task
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div class="row mt-3">
        <div class="col-sm-12">
          <div class="float-end text-end">
            <ul class="pagination custom-pagination pagination-simple active-theme">
              <li class="paginate_button page-item previous disabled">
                <a href="/" class="page-link">
                  <i class="ri-arrow-left-s-line"></i>
                </a>
              </li>
              <li class="paginate_button page-item active">
                <a href="/" class="page-link">
                  1
                </a>
              </li>
              <li class="paginate_button page-item ">
                <a href="/" class="page-link">
                  2
                </a>
              </li>
              <li class="paginate_button page-item ">
                <a href="/" class="page-link">
                  3
                </a>
              </li>
              <li class="paginate_button page-item next">
                <a href="/" class="page-link">
                  <i class="ri-arrow-right-s-line"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <Pagination
        items={todosData_}
        itemsPerPage={1}
        // totalLength={invoiceData.length}
        dataFromChild={paginationDataFromChild}
      /> */}
    </div>
  );
};

export default TodosList;
