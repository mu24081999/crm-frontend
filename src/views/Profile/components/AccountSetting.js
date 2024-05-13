import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserRec, updateUserRec } from "../../../redux/services/users";
import { logoutUser } from "../../../redux/services/auth";
import { setAccount } from "../../../redux/slices/auth";

const AccountSetting = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setValue("username", user?.username);
      setValue("email", user?.email);
    }
  }, [user, setValue]);
  const handleUpdateSettings = async (data) => {
    const is_updated = await dispatch(updateUserRec(token, data, user.id));
    if (is_updated) {
      const newUser = {
        ...user,
        username: data?.username,
        email: data?.email,
      };
      dispatch(setAccount(newUser));
    }
  };
  const handleCloseAccount = () => {
    dispatch(deleteUserRec(token, user.id));
    dispatch(logoutUser(token));
  };
  return (
    <div className="tab-pane fade" id="tab_block_2">
      <div className="title-lg fs-4">
        <span>Account Settings</span>
      </div>
      {/* <p className="mb-4">
        The Avatar component is used to represent a user, and displays the
        profile picture, initials or fallback icon.
      </p> */}
      <form onSubmit={handleSubmit(handleUpdateSettings)}>
        <div className="row gx-3">
          <div className="col-sm-12">
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
              control={control}
              errors={errors}
            />
          </div>
        </div>
        <div className="row gx-3">
          <div className="col-sm-12">
            <InputField
              name="email"
              placeholder="Email Address"
              label="Email Address"
              control={control}
              type="email"
              errors={errors}
            />
          </div>
        </div>
        <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Account Changes</span>
        </div>
        <div className="row gx-3">
          <div className="col-sm-6">
            <div className="form-group">
              <a href="#" className="h5 d-block mb-0">
                Delete Account
              </a>
              <small className="form-text text-muted">
                Delete account and all your data
              </small>
            </div>
          </div>
          <div className="col-sm-6 text-end">
            <div className="form-group">
              <button
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#close_account_confirmation"
              >
                Close Account
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          Save Changes
        </button>
      </form>
      <div
        id="close_account_confirmation"
        className="modal fade add-new-task"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary ">
              <h5 className=" modal-title" style={{ color: "white" }}>
                Confirmation
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
              <p>Are you sure! you want to delete the account?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                No
              </button>
              <button
                className="btn btn-danger"
                onClick={handleCloseAccount}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
