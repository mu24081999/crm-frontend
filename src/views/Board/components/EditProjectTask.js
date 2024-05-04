import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import InputField from "../../../components/FormFields/InputField";
import DatePickerFeild from "../../../components/FormFields/datePickerField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch } from "react-redux";
import { postTask, updateTaskRec } from "../../../redux/services/project-task";
import moment from "moment";

const EditProjectTask = ({ teamsData, token }) => {
  const { taskDetails } = useSelector((state) => state.board_task);
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  useEffect(() => {
    setValue("name", taskDetails?.name);
    setValue(
      "start_date",
      moment(taskDetails?.start_date).format("YYYY-MM-DD")
    );
    setValue("end_date", moment(taskDetails?.start_date).format("YYYY-MM-DD"));
    setValue("priority", {
      label: taskDetails?.priority,
      value: taskDetails?.priority,
    });
    setValue("status", {
      label: taskDetails?.status,
      value: taskDetails?.status,
    });
    setValue("asign_to", taskDetails?.asign_to?.members);
    setValue("description", taskDetails?.description);
  }, [taskDetails, setValue]);
  const handleAddTask = (data) => {
    const formData = {
      ...data,
      priority: data.priority.value,
      status: data.status.value,
    };
    dispatch(updateTaskRec(token, taskDetails?.id, formData));
    console.log(formData);
  };
  return (
    <div
      id="edit_project_task"
      className="modal fade add-new-task"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
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
            <h5 className="mb-4">Update Card</h5>
            <form onSubmit={handleSubmit(handleAddTask)}>
              <div className="row gx-3">
                <div className="col-sm-12">
                  <InputField
                    name="name"
                    placeholder="Enter task name"
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
                <div className="col-sm-12 row">
                  <div className="col-sm-6">
                    <DatePickerFeild
                      name="start_date"
                      label="Start Date"
                      errors={errors}
                      control={control}
                    />
                  </div>
                  <div className="col-sm-6">
                    <DatePickerFeild
                      name="end_date"
                      label="End Date"
                      errors={errors}
                      control={control}
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-5">
                  <ReactSelectField
                    name="priority"
                    placeholder="Priority"
                    label="Priority"
                    control={control}
                    options={[
                      { label: "High", value: "high" },
                      { label: "Mediom", value: "mediom" },
                      { label: "Low", value: "low" },
                    ]}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                <div className="col-sm-12">
                  <ReactSelectField
                    name="asign_to"
                    placeholder="Asign to"
                    label="Asign to"
                    isMulti={true}
                    control={control}
                    options={
                      teamsData?.length > 0
                        ? teamsData?.map((member) => {
                            return {
                              ...member,
                              label: member.name,
                              value: member.email,
                            };
                          })
                        : []
                    }
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                <div className="col-md-12 mt-5">
                  <ReactSelectField
                    name="status"
                    placeholder="Status"
                    label="Status"
                    control={control}
                    options={[
                      { label: "Pending", value: "pending" },
                      { label: "In-Progress", value: "in-progress" },
                      { label: "Compleded", value: "completed" },
                    ]}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                <div className="col-md-12">
                  <TextAreaField
                    name="description"
                    label="Description"
                    rows={5}
                    errors={errors}
                    control={control}
                  />
                </div>
              </div>
              <div className="modal-footer align-items-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-add-task">
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

export default EditProjectTask;
