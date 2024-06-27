import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import DatePickerFeild from "../../../components/FormFields/datePickerField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../redux/services/users";
import { storeTodo } from "../../../redux/services/todo";
import TagInput from "../../../components/FormFields/reactTagInputComponent";
import { SocketContext } from "../../../Context";

const AddNewTask = ({ token, usersData, user }) => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { pushNotification } = useContext(SocketContext);
  useEffect(() => {
    dispatch(getUsers(token));
  }, [token, dispatch]);
  const handleAddTask = async (data) => {
    const formData = {
      ...data,
      priority: data?.priority?.value,
      status: data?.status?.value,
      category_id: data?.category_id?.value,
    };
    const is_added = await dispatch(storeTodo(token, formData));
    if (is_added === true) {
      const memberNames = [];
      for (let i = 0; i < data?.asign_to.length; i++) {
        const element = data?.asign_to[i];
        memberNames.push(element.name);
        const notificationData = {
          user_id: element.id,
          notification: `You have been added in a todo created by  ${user.name}`,
          type: "todo_added",
          notification_details: formData,
          email_to: element.email,
        };
        pushNotification(notificationData);
      }
      const notificationData = {
        user_id: user.id,
        notification: `You have added todo including members ${memberNames}`,
        type: "todo_added",
        notification_details: formData,
        email_to: user.email,
      };
      pushNotification(notificationData);
    }
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
          <div className="modal-header bg-primary">
            <h5 class=" modal-title" style={{ color: "white" }}>
              Add New Task
            </h5>
            <button
              type="button"
              class="btn-close btn-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <form onSubmit={handleSubmit(handleAddTask)}>
              <div class="title title-xs title-wth-divider text-primary text-uppercase mt-1 mb-4">
                <span>Basic Info</span>
              </div>
              <div class="row gx-3">
                <div class="col-sm-8">
                  <InputField
                    name="name"
                    placeholder="Name"
                    // label="Name"
                    mb="true"
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
                  <InputField
                    name="code"
                    type="number"
                    mb="true"
                    placeholder="Code"
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
                  <TextAreaField
                    name="description"
                    placeholder="Note"
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
                  <DatePickerFeild
                    name="start_date"
                    label="Start date"
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
                  <DatePickerFeild
                    name="start_time"
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
                  <DatePickerFeild
                    name="end_date"
                    label="End date"
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
                  <DatePickerFeild
                    name="end_time"
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
              <div class="row mt-3">
                {/* <div class="col-sm-6">
                  
                  <ReactSelectField
                    name="category_id"
                    placeholder=" Category"
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
                      {
                        label: "Development",
                        value: "1",
                      },
                      {
                        label: "Development",
                        value: "1",
                      },
                      {
                        label: "Development",
                        value: "1",
                      },
                    ]}
                    errors={errors}
                  />
                </div> */}
                <div class="col-sm-6 col-md-6">
                  <ReactSelectField
                    name="status"
                    placeholder="Select status"
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
                <div class="col-md-6 col-sm-6">
                  <div class="form-inline">
                    <ReactSelectField
                      name="priority"
                      placeholder="Select priority"
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
              <div class="row gx-3"></div>
              <div class="row gx-3">
                <div class="col-sm-12">
                  <div class="form-inline">
                    <TagInput
                      name="labels"
                      placeholder="labels"
                      label="Labels"
                      mb="true"
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

              <ReactSelectField
                name="asign_to"
                placeholder="Asign to"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
                isMulti={true}
                options={
                  usersData?.length > 0
                    ? usersData?.map((user) => {
                        return {
                          label: user?.name,
                          value: user?.id,
                          ...user,
                        };
                      })
                    : []
                }
                errors={errors}
              />
              <div class="modal-footer align-items-center">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Done
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
