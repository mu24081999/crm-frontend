import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRec } from "../../../redux/services/users";

const UpdatePassword = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const handleUpdatePassword = (data) => {
    dispatch(updateUserRec(token, data, user.id));
  };
  return (
    <div className="tab-pane fade" id="tab_block_4">
      <div className="title-lg fs-4">
        <span>Login & Security</span>
      </div>
      {/* <p className="mb-4">
        The Avatar component is used to represent a user, and displays the
        profile picture, initials or fallback icon.
      </p> */}
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Password Settings</span>
        </div>

        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="form-group">
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                control={control}
                errors={errors}
              />
              <button type="submit" className="btn btn-primary mt-3">
                Changes password
              </button>
            </div>
          </div>
        </div>
        {/* <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Additional Security</span>
        </div>
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="form-group">
              <label className="form-label ">2-Step Verification (2FA)</label>
              <small className="form-text text-muted d-block">
                2-step verification drastically reduces the chances of having
                the personal information in your Google account stolen by
                someone else. Why? Because hackers would have to not only get
                your password and your username, they'd have to get a hold of
                your phone. A{" "}
                <a href="#" className="text-primary">
                  6-digit
                </a>{" "}
                code may be sent to a number you’ve previously provided. Codes
                can be sent in a text message (SMS) or through a voice call,
                which depends on the setting you chose. To verify it’s you,
                enter the code on the sign-in screen.
              </small>
              <button type="button" className="btn btn-primary mt-3">
                Add Authentication
              </button>
            </div>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default UpdatePassword;
