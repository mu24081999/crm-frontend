import React, { useEffect, useState } from "react";
import InputField from "../../../components/FormFields/InputField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";

import { useForm } from "react-hook-form";
import ReactColorInput from "../../../components/FormFields/reactColorInput";
import FileField from "../../../components/FormFields/fileField";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardDetails,
  storeBoard,
  updateBoardRec,
} from "../../../redux/services/board";
import { FaPlus, FaTrash } from "react-icons/fa";

const AddNewTask = ({ agents, boardDetails }) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [statusArray, setStatusArray] = useState([
    {
      id: 1,
    },
  ]);
  const handleAddStatus = () => {
    const newObject = {
      id: statusArray.length + 1, // Example id, adjust as needed
      // Add more properties here
    };
    setStatusArray((prevStatusArray) => [...prevStatusArray, newObject]);
  };
  const removeObjectFromArray = (id) => {
    setStatusArray((prevStatusArray) =>
      prevStatusArray?.filter((status) => status.id !== id)
    );
  };
  useEffect(() => {
    if (boardDetails?.name) {
      setValue("name", boardDetails?.name);
      setValue("visibility", {
        label: boardDetails?.visibility,
        value: boardDetails?.visibility,
      });
      setValue("avatar_text", {
        label: boardDetails?.avatar_text,
        value: boardDetails?.avatar_text,
      });
      setValue("avatar_color", boardDetails?.avatar_color);
      setValue(
        "team_members",
        boardDetails?.team_members &&
          JSON.parse(boardDetails?.team_members)?.team
      );
      const stages = [];
      boardDetails?.pipeline_status_array &&
        JSON.parse(boardDetails?.pipeline_status_array)?.status_array?.map(
          (status, index) => {
            return stages?.push({
              id: index + 1,
              value: status?.stage,
              color: status?.color,
            });
          }
        );
      console.log("🚀 ~ useEffect ~ stages:", stages);
      setStatusArray(stages);
      stages?.forEach((stage) => {
        setValue(`status-${stage?.id}`, stage?.value);
        setValue(`status-color-${stage?.id}`, stage?.color);
      });
    }
  }, [boardDetails, setValue]);
  const handleAddBoard = async (data) => {
    const element = document.getElementById("close_task_button");
    console.log("🚀 ~ handleAddBoard ~ data:", boardDetails);
    const newData = {
      name: data.name,
      image: data.image,
      visibility: data?.visibility?.value,
      avatar_text: data?.avatar_text?.value,
      avatar_color: data.avatar_color,
      team_members: data.team_members,
    };
    const pipeline_status_array = [];
    for (let i = 0; i < statusArray?.length; i++) {
      const element = statusArray[i];
      const status_ = watch(`status-${element.id}`);
      const status_color = watch(`status-color-${element.id}`);
      pipeline_status_array.push({
        stage: status_,
        color: status_color,
      });
    }
    const formData = {
      ...newData,
      pipeline_status_array,
    };
    if (boardDetails?.id) {
      await dispatch(updateBoardRec(token, boardDetails?.id, formData));
      await dispatch(getBoardDetails(token, boardDetails?.id));
    } else {
      await dispatch(storeBoard(token, formData));
    }
    element.click();
    return reset();
  };
  return (
    <div
      id="add_new_board"
      className="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title" style={{ color: "white" }}>
              Pipeline Form
            </h5>
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
            <form onSubmit={handleSubmit(handleAddBoard)}>
              <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                <span>Pipeline Details</span>
              </div>
              <div className="row gx-3">
                <div className="row">
                  <div className="col-sm-5 pt-1">
                    <ReactColorInput
                      name="avatar_color"
                      placeholder="Avatar Color"
                      // label="Avatar Color"

                      mb={true}
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
                  <div className="col-sm-7 ps-2">
                    <ReactSelectField
                      name="visibility"
                      placeholder="Visibility"
                      // label="Visibility"
                      control={control}
                      options={[
                        { label: "Public", value: "public" },
                        { label: "Private", value: "private" },
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
                </div>
                <div className="col-sm-12">
                  <InputField
                    name="name"
                    placeholder="Name"
                    // label="Name"
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

                <div className="col-sm-12">
                  <ReactSelectField
                    name="team_members"
                    placeholder="Team Members"
                    // label="Team Members"
                    isMulti={true}
                    control={control}
                    options={
                      agents?.length > 0
                        ? agents?.map((member) => {
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
              </div>
              <div className="col-sm-12">
                <ReactSelectField
                  name="avatar_text"
                  placeholder="Avatar Text"
                  control={control}
                  options={[
                    { label: "A", value: "A" },
                    { label: "B", value: "B" },
                    { label: "C", value: "C" },
                    { label: "D", value: "D" },
                    { label: "E", value: "E" },
                    { label: "F", value: "F" },
                    { label: "G", value: "G" },
                    { label: "H", value: "H" },
                    { label: "I", value: "I" },
                    { label: "J", value: "J" },
                    { label: "K", value: "K" },
                    { label: "L", value: "L" },
                    { label: "M", value: "M" },
                    { label: "N", value: "N" },
                    { label: "O", value: "O" },
                    { label: "O", value: "O" },
                    { label: "P", value: "P" },
                    { label: "Q", value: "Q" },
                    { label: "R", value: "R" },
                    { label: "S", value: "S" },
                    { label: "T", value: "T" },
                    { label: "U", value: "U" },
                    { label: "V", value: "V" },
                    { label: "W", value: "W" },
                    { label: "X", value: "X" },
                    { label: "Y", value: "Y" },
                    { label: "Z", value: "Z" },
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
              {/* <div className="col-sm-12">
                <div className="col-sm-12">
                  {!boardDetails && (
                    <FileField
                      control={control}
                      errors={errors}
                      multiple={false}
                      name="image"
                      type="file"
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />
                  )}
                </div>
              </div> */}
              <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                <span>Pipeline Stages</span>
              </div>

              <div className="">
                {statusArray?.length > 0 ? (
                  statusArray?.map((status, index) => (
                    <div className="col-12 d-flex gap-2" key={index}>
                      <div className="col-5 py-2">
                        <InputField
                          name={`status-${status?.id}`}
                          placeholder="Name"
                          // label="Name"
                          mb={true}
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
                      <div className="col-5 py-2">
                        <ReactColorInput
                          name={`status-color-${status?.id}`}
                          placeholder="Status Color"
                          // label="Avatar Color"

                          mb={true}
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
                      <span
                        className="col-1 p-2 btn btn-icon btn-sm mt-2 btn-danger"
                        onClick={() => removeObjectFromArray(status.id)}
                      >
                        <FaTrash className="mb-2" />
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No stage added</p>
                )}
              </div>
              <div className=" py-2">
                <button
                  onClick={handleAddStatus}
                  type="button"
                  className="btn btn-icon btn-primary btn-xs mb-2"
                >
                  <span>
                    <FaPlus />
                  </span>{" "}
                </button>
                <span className="text-primary" style={{ fontSize: "13px" }}>
                  {" "}
                  Add Stage
                </span>
              </div>
              <div className="modal-footer">
                <button
                  id="close_task_button"
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Done
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
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
