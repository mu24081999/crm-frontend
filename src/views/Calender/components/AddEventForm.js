import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import DatePickerFeild from "../../../components/FormFields/datePickerField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import ReactColorInput from "../../../components/FormFields/reactColorInput";
import { storeEvent } from "../../../redux/services/calendar_event";
import { SocketContext } from "../../../Context";

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
  const { pushNotification } = useContext(SocketContext);

  const handleAddEvent = async (data) => {
    const formData = {
      ...data,
      type: data?.type?.value,
      priority: data?.priority?.value,
      visibility: data?.visibility?.value,
      user_id: authUser?.id,
      user_image: authUser?.avatar,
      user_name: authUser?.name,
    };
    const is_added = await dispatch(storeEvent(token, formData));
    switch (is_added) {
      case true:
        switch (data?.type?.value) {
          case "event":
            const members = [];

            for (let i = 0; i < data?.team_members.length; i++) {
              const element = data?.team_members[i];
              members.push(element.name);
              const eventNot = {
                user_id: element.id,
                notification: `You have been added in an event created by ${authUser.name}.`,
                type: "reminder_added",
              };
              pushNotification(eventNot);
            }
            const eventData = {
              user_id: authUser.id,
              notification: `You added an event including members ${members}.`,
              type: "reminder_added",
            };
            pushNotification(eventData);
            break;
          case "reminder":
            const notificationData = {
              user_id: authUser.id,
              notification: "You added a reminder.",
              type: "reminder_added",
            };
            pushNotification(notificationData);
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }
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
        className="modal-dialog modal-md modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className=" nodal-title text-white">Create Event/Reminder</h5>

            <button
              type="button"
              className="btn-close btn-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(handleAddEvent)}>
              <div>
                <ReactSelectField
                  name="type"
                  placeholder="Type "
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
                <InputField
                  name="name"
                  placeholder="Enter event name"
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
                <TextAreaField
                  name="description"
                  placeholder="Description/Note"
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
                  <DatePickerFeild
                    name="start_date"
                    placeholder="Start date"
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
                  <DatePickerFeild
                    name="start_time"
                    placeholder="Start time"
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
                        control={control}
                        showTimeSelect={false}
                        errors={errors}
                      />
                    </div>
                    <div className="col-sm-6">
                      <DatePickerFeild
                        name="end_time"
                        placeholder="End time"
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
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="row gx-3">
                    <InputField
                      name="category"
                      placeholder="Category"
                      control={control}
                      errors={errors}
                    />
                    <div className="col-sm-7">
                      <ReactSelectField
                        name="visibility"
                        placeholder="Select visibility"
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
                    <div className="col-sm-5">
                      <ReactColorInput
                        name="event_color"
                        control={control}
                        errors={errors}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <ReactSelectField
                      name="team_members"
                      placeholder="Select members..."
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
