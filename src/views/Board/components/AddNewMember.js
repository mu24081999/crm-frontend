import React from "react";
import { useForm } from "react-hook-form";
import FileField from "../../../components/FormFields/fileField";
import InputField from "../../../components/FormFields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { storeBoardTeam } from "../../../redux/services/boardTeam";

const AddNewMember = () => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const handleAddMember = (data) => {
    console.log("🚀 ~ handleAddMember ~ data:", data);
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    // formdata.append("image", data.image);
    dispatch(storeBoardTeam(token, formdata));
    return reset();
  };
  return (
    <div
      id="add_new_team"
      className="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title" style={{ color: "white" }}>
              Add New Member
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
            <form onSubmit={handleSubmit(handleAddMember)}>
              <div className="row gx-3">
                <div className="col-sm-12">
                  <InputField
                    name="name"
                    placeholder="Member name"
                    // label="Name"
                    control={control}
                    // mb={true}
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
                  <InputField
                    name="email"
                    placeholder="Member email address"
                    // label="Email"
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
                {/* <div className="col-sm-12">

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
                </div> */}
              </div>
              <div className="modal-footer ">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Done
                </button>
                <button type="submit" className="btn btn-primary">
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

export default AddNewMember;
