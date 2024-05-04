import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import InputField from "../../../components/FormFields/InputField";
import DatePickerFeild from "../../../components/FormFields/datePickerField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch } from "react-redux";
import { postTask } from "../../../redux/services/project-task";

const AddNewProjectTask = ({ teamsData, token }) => {
  const { boardDetails } = useSelector((state) => state.board);
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const handleAddTask = (data) => {
    const formData = {
      ...data,
      priority: data.priority.value,
      board_id: boardDetails.id,
    };
    dispatch(postTask(token, formData));
    console.log(formData);
  };
  return (
    <div
      id="add_new_card"
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
            <h5 className="mb-4">Create New Card</h5>
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
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProjectTask;
