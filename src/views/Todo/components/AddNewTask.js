import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import DatePickerFeild from "../../../components/FormFields/datePickerField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../redux/services/users";
import { storeTodo } from "../../../redux/services/todo";
import TagInput from "../../../components/FormFields/reactTagInputComponent";

const AddNewTask = ({ token, usersData }) => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(token));
  }, [token, dispatch]);
  const handleAddTask = (data) => {
    const formData = {
      ...data,
      priority: data.priority.value,
      status: data.status.value,
      category_id: data.category_id.value,
    };
    dispatch(storeTodo(token, formData));
    console.log("formData: ", formData);
  };
  return (
    <div
      id="add_new_task"
      class="modal fade add-new-contact"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <h5 class="mb-4">Add New Task</h5>
            <form onSubmit={handleSubmit(handleAddTask)}>
              <div class="title title-xs title-wth-divider text-primary text-uppercase mt-1 mb-4">
                <span>Basic Info</span>
              </div>
              <div class="row gx-3">
                <div class="col-sm-8">
                  {/* <div class="form-group">
                    <label class="form-label">Name</label>
                    <input class="form-control" type="text" />
                  </div> */}
                  <InputField
                    name="name"
                    placeholder="Enter name for the task"
                    label="Name"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                <div class="col-sm-4">
                  {/* <div class="form-group">
                    <label class="form-label">Code</label>
                    <input class="form-control" type="text" />
                  </div> */}
                  <InputField
                    name="code"
                    type="number"
                    placeholder="Enter code for the task"
                    label="Code"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
              </div>
              <div class="row gx-3">
                <div class="col-md-12">
                  {/* <div class="form-group">
                    <div class="form-label-group">
                      <label class="form-label">Note/Description</label>
                      <small class="text-muted">200</small>
                    </div>
                    <textarea class="form-control" rows="3"></textarea>
                  </div> */}
                  <TextAreaField
                    name="description"
                    placeholder="Note"
                    label="Description/Note"
                    control={control}
                    rows={5}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
              </div>
              <div class="row gx-3">
                <div class="col-sm-6">
                  {/* <div class="form-group">
                    <label class="form-label">Start Date</label>
                    <input
                      class="form-control"
                      name="single-date-pick"
                      type="text"
                    />
                    <div class="form-check form-check-sm mt-2">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        checked=""
                      />
                      <label class="form-check-label">Mark as milestone</label>
                    </div>
                  </div> */}
                  <DatePickerFeild
                    name="start_date"
                    placeholder="Start date"
                    label="Start Date"
                    control={control}
                    showTimeSelect={false}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                <div class="col-sm-6">
                  {/* <div class="form-group">
                    <label class="form-label">Start Time</label>
                    <input
                      class="form-control input-single-timepicker"
                      name="input-timepicker"
                      type="text"
                    />
                  </div> */}
                  <DatePickerFeild
                    name="start_time"
                    placeholder="Start time"
                    label="Start time"
                    control={control}
                    showTimeSelect={true}
                    showTimeSelectOnly={true}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
              </div>
              <div class="row gx-3">
                <div class="col-sm-6">
                  {/* <div class="form-group">
                    <label class="form-label">End Date</label>
                    <input
                      class="form-control"
                      name="single-date-pick"
                      type="text"
                    />
                    <div class="form-check form-check-sm mt-2">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        checked=""
                      />
                      <label class="form-check-label">Mark as milestone</label>
                    </div>
                  </div> */}
                  <DatePickerFeild
                    name="end_date"
                    placeholder="End date"
                    label="End Date"
                    control={control}
                    showTimeSelect={false}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                <div class="col-sm-6">
                  {/* <div class="form-group">
                    <label class="form-label">End Time</label>
                    <input
                      class="form-control input-single-timepicker"
                      type="text"
                    />
                  </div> */}
                  <DatePickerFeild
                    name="end_time"
                    placeholder="End time"
                    label="End time"
                    control={control}
                    showTimeSelect={true}
                    showTimeSelectOnly={true}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
              </div>
              <div class="row gx-3">
                <div class="col-sm-6">
                  {/* <div class="form-group">
                    <label class="form-label">Category</label>
                    <select class="form-control custom-select">
                      <option selected="">Project</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div> */}
                  <ReactSelectField
                    name="category_id"
                    placeholder="Select Category"
                    label="Category"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    options={[
                      {
                        label: "Development",
                        value: "1",
                      },
                    ]}
                    errors={errors}
                  />
                </div>
                <div class="col-sm-6">
                  {/* <div class="form-group">
                    <label class="form-label">Status</label>
                    <select class="form-control custom-select">
                      <option selected="">To-Do</option>
                      <option value="1">On Hold</option>
                      <option value="1">In Progress</option>
                      <option value="2">Done</option>
                      <option value="3">Pending</option>
                    </select>
                  </div> */}
                  <ReactSelectField
                    name="status"
                    placeholder="Select status"
                    label="Status"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    options={[
                      {
                        label: "To-Do",
                        value: "to-do",
                      },
                      {
                        label: "On-Hold",
                        value: "on-hold",
                      },
                      {
                        label: "In-Progress",
                        value: "in-progress",
                      },
                      {
                        label: "Done",
                        value: "done",
                      },
                      {
                        label: "Pending",
                        value: "pending",
                      },
                    ]}
                    errors={errors}
                  />
                </div>
              </div>
              <div class="row gx-3">
                <div class="col-sm-12">
                  <div class="form-inline">
                    {/* <div class="form-group">
                      <label class="form-label">Set priority:</label>
                      <div class="form-check form-check-inline ms-2">
                        <div class="custom-control custom-radio radio-primary">
                          <input
                            type="radio"
                            id="customRadioc2"
                            name="customRadioc2"
                            class="form-check-input"
                          />
                          <label class="form-check-label" for="customRadioc2">
                            High
                          </label>
                        </div>
                      </div>
                      <div class="form-check form-check-inline">
                        <div class="custom-control custom-radio radio-primary">
                          <input
                            type="radio"
                            id="customRadioc3"
                            name="customRadioc2"
                            class="form-check-input"
                          />
                          <label class="form-check-label" for="customRadioc3">
                            Medium
                          </label>
                        </div>
                      </div>
                      <div class="form-check form-check-inline">
                        <div class="custom-control custom-radio radio-primary">
                          <input
                            type="radio"
                            id="customRadioc4"
                            name="customRadioc2"
                            class="form-check-input"
                          />
                          <label class="form-check-label" for="customRadioc4">
                            Low
                          </label>
                        </div>
                      </div>
                    </div> */}
                    <ReactSelectField
                      name="priority"
                      placeholder="Select priority"
                      label="Priority"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      options={[
                        {
                          label: "High",
                          value: "high",
                        },
                        {
                          label: "Medium",
                          value: "medium",
                        },
                        {
                          label: "Low",
                          value: "low",
                        },
                      ]}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              <div class="row gx-3">
                <div class="col-sm-12">
                  <div class="form-inline">
                    <TagInput
                      name="labels"
                      placeholder="Add labels"
                      label="Labels"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              <div class="title title-xs title-wth-divider text-primary text-uppercase my-4">
                <span>Assign to</span>
              </div>
              {/* <div class="repeater">
                <div data-repeater-list="category-group">
                  <div class="d-flex">
                    <div class="row gx-3 flex-1">
                      <div class="col-sm-6 form-group mb-0">
                        <label class="form-label">Add Person</label>
                      </div>
                      <div class="col-sm-6 form-group mb-0">
                        <label class="form-label">Role</label>
                      </div>
                    </div>
                    <a
                      href="/"
                      class="btn btn-xs btn-icon btn-rounded btn-light mb-2"
                      data-repeater-create
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Add Person"
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="plus"></i>
                        </span>
                      </span>
                    </a>
                  </div>
                  <div class="d-flex" data-repeater-item>
                    <div class="row gx-3 flex-1">
                      <div class="col-sm-6 form-group">
                        <input
                          class="form-control"
                          placeholder="--"
                          type="text"
                        />
                      </div>
                      <div class="col-sm-6 form-group">
                        <input
                          class="form-control"
                          placeholder="--"
                          type="text"
                        />
                      </div>
                    </div>
                    <a
                      href="/"
                      class="btn btn-xs btn-icon btn-rounded btn-light ms-2 mt-1"
                      data-repeater-delete
                    >
                      <span class="icon">
                        <i class="ri-delete-bin-6-line"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div> */}
              <ReactSelectField
                name="asign_to"
                placeholder="Asign to"
                label="Asign to"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
                isMulti={true}
                options={
                  usersData?.length > 0 &&
                  usersData.map((user) => {
                    return {
                      label: user.name,
                      value: user.id,
                      ...user,
                    };
                  })
                }
                errors={errors}
              />
              <div class="modal-footer align-items-center">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Discard
                </button>
                <button type="submit" class="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTask;
