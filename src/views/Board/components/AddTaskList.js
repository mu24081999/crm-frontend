import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import { useDispatch } from "react-redux";
import { postTaskBoard } from "../../../redux/services/project-task-board";
import { useSelector } from "react-redux";

const AddTaskList = () => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const onAddList = (data) => {
    console.log(data);
    const formData = {
      ...data,
      board_id: 1,
    };
    dispatch(postTaskBoard(token, data));
  };
  return (
    <div
      id="add_task_list"
      className="modal fade add-tasklist-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
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
            <h5 className="mb-4">Add Task List</h5>
            <form onSubmit={handleSubmit(onAddList)}>
              <div className="row gx-3">
                <div className="col-sm-12">
                  {/* <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" />
                  </div> */}
                  <InputField
                    name="name"
                    placeholder="Enter list name"
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
              </div>
              <div className="modal-footer align-items-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-add-tasklist"
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

export default AddTaskList;
