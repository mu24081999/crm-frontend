import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getContactsListByBoard } from "../../../redux/services/contact";
import { getBoardDetails } from "../../../redux/services/board";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../components/FormFields/reactSelectField";

const TaskHeader = ({ boardsData }) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const { boardDetails } = useSelector((state) => state.board);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleEditBoard = (id) => {
    dispatch(getContactsListByBoard(token, id));

    dispatch(getBoardDetails(token, id, user?.id));
    // if (is_task) onDataFromChild(true);
  };
  const handleOnChangePipeline = async (event) => {
    const board_id = event.value;
    console.log("🚀 ~ handleOnChangePipeline ~ event:", board_id);
    dispatch(getBoardDetails(token, board_id));
  };
  useEffect(() => {
    setValue("pipeline", {
      label: boardDetails?.name,
      value: boardDetails?.id,
    });
  }, [setValue, boardDetails]);
  return (
    <header className="taskboard-header">
      <div className="d-flex align-items-center flex-1">
        <div className="d-flex col-md-8 justify-content-between">
          <a className="taskboardapp-title link-dark" href="/">
            <h1>{boardDetails?.name}</h1>
          </a>
          <div>
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add_new_board"
              onClick={() => handleEditBoard(boardDetails?.id)}
            >
              <FaPlus />
              Opportunity
            </button>
          </div>
        </div>
        <div className=" pt-5 px-3 col-md-4">
          <ReactSelectField
            name="pipeline"
            placeholder="Pipeline"
            md={true}
            // label="Visibility"
            onChange={handleOnChangePipeline}
            control={control}
            options={
              boardsData?.length > 0
                ? boardsData?.map((board, index) => {
                    return {
                      label: board?.name,
                      value: board?.id,
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
    </header>
  );
};

export default TaskHeader;
