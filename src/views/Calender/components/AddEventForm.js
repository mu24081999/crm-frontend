import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import DatePickerFeild from "../../../components/FormFields/datePickerField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import ReactColorInput from "../../../components/FormFields/reactColorInput";
import { storeEvent } from "../../../redux/services/calendar_event";

const AddEventForm = ({
  dispatch,
  token,
  authUser,
  onDataFromChild,
  usersData,
}) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const [formType, setFormType] = useState(null);
  const typeWatcher = watch("type");

  const handleAddEvent = (data) => {
    const formData = {
      ...data,
      type: data?.type?.value,
      priority: data?.priority?.value,
      visibility: data?.visibility?.value,
      user_id: authUser?.id,
      user_image: authUser?.avatar,
      user_name: authUser?.name,
    };
    dispatch(storeEvent(token, formData));
    reset();
    onDataFromChild();
    return {};
  };
  useEffect(() => {
    if (typeWatcher !== undefined) {
      setFormType(typeWatcher?.value);
    }
  }, [typeWatcher]);
  return (
    <div
      id="create_new_event"
      className="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="mb-4">Create New Event</h5>
            <form onSubmit={handleSubmit(handleAddEvent)}>
              <div>
                <ReactSelectField
                  name="type"
                  placeholder="Select "
                  label="Type"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                  options={[
                    {
                      label: "Event",
                      value: "event",
                    },
                    {
                      label: "Reminder",
                      value: "reminder",
                    },
                  ]}
                  errors={errors}
                />
              </div>
              <div className="row gx-3">
                {/* <div className="col-sm-12 form-group">
                  <label className="form-label">Name</label>
                  <input className="form-control  cal-event-name" type="text" />
                </div> */}
                <InputField
                  name="name"
                  placeholder="Enter event name"
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
              <div className="row gx-3">
                {/* <div className="col-sm-12 form-group">
                  <div className="form-label-group">
                    <label>Note/Description</label>
                    <small className="text-muted">200</small>
                  </div>
                  <textarea className="form-control" rows="3"></textarea>
                </div> */}
                <TextAreaField
                  name="description"
                  placeholder="Description"
                  label="Note/Description"
                  rows={5}
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
              <div className="row gx-3 my-3">
                <div className="col-sm-6">
                  {/* <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      className="form-control cal-event-date-start"
                      name="single-date-pick"
                      type="text"
                    />
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
                <div className="col-sm-6">
                  {/* <div className="form-group">
                    <label className="form-label">Start Time</label>
                    <input
                      className="form-control input-single-timepicker"
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
              {formType === "event" && (
                <>
                  <div className="row gx-3 my-3">
                    <div className="col-sm-6">
                      <DatePickerFeild
                        name="end_date"
                        placeholder="End date"
                        label="End Date"
                        control={control}
                        showTimeSelect={false}
                        errors={errors}
                      />
                    </div>
                    <div className="col-sm-6">
                      <DatePickerFeild
                        name="end_time"
                        placeholder="End time"
                        label="End time"
                        control={control}
                        showTimeSelect={true}
                        showTimeSelectOnly={true}
                        errors={errors}
                      />
                    </div>
                  </div>
                  <div className="row gx-3">
                    <InputField
                      name="location"
                      type="text"
                      placeholder="Location"
                      label="Location"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="row gx-3">
                    <InputField
                      name="category"
                      placeholder="Category"
                      label="Category"
                      control={control}
                      errors={errors}
                    />
                    <div className="col-sm-7">
                      <ReactSelectField
                        name="visibility"
                        placeholder="Select visibility"
                        label="Visibility"
                        control={control}
                        options={[
                          {
                            label: "Public",
                            value: "public",
                          },
                          {
                            label: "Private",
                            value: "private",
                          },
                        ]}
                        errors={errors}
                      />
                    </div>
                    <div className="col-sm-3">
                      <ReactColorInput
                        name="event_color"
                        label="Event Color"
                        control={control}
                        errors={errors}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <ReactSelectField
                      name="team_members"
                      placeholder="Select members..."
                      label="Team Members"
                      control={control}
                      isMulti={true}
                      options={
                        usersData?.length > 0 &&
                        usersData?.map((user, index) => {
                          return {
                            label: user.name,
                            value: user.id,
                            ...user,
                          };
                        })
                      }
                      errors={errors}
                    />
                  </div>
                  <div className="row gx-3">
                    <div className="col-sm-12">
                      <ReactSelectField
                        name="priority"
                        placeholder="Select priority"
                        label="Priority"
                        control={control}
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
                </>
              )}
              <div className="modal-footer align-items-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Discard
                </button>
                <button
                  id="add_event"
                  type="submit"
                  className="btn btn-primary fc-addEventButton-button"
                  data-bs-dismiss="modal"
                >
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

export default AddEventForm;
