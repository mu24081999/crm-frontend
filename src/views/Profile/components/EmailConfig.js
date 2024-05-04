import React, { useEffect } from "react";
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
  useEffect(() => {
    setValue("google_app_password", user?.google_app_password);
  }, [user, setValue]);
  const handleAddPassword = (data) => {
    dispatch(updateUserRec(token, data, user.id));
  };
  return (
    <div className="tab-pane fade" id="tab_email_config">
      <div className="title-lg fs-4">
        <span>Email Configuration</span>
      </div>
      {/* <p className="mb-4">
        The Avatar component is used to represent a user, and displays the
        profile picture, initials or fallback icon.
      </p> */}
      <form onSubmit={handleSubmit(handleAddPassword)}>
        <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Email Configuration</span>
        </div>
        <div>
          <p className="text-primary">Steps for Creating Password</p>
          <ol className="card p-5">
            <li>
              <span className="fw-bold"> Sign in to your Google account:</span>
              <ul>
                <li>
                  Go to{" "}
                  <a
                    href="https://myaccount.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    myaccount.google.com.
                  </a>
                </li>
                <li>Log in with your Google account credentials.</li>
              </ul>
            </li>
            <li>
              <span className="fw-bold"> Go to the "Security" section:</span>
              <ul>
                <li>
                  Once you are logged in, look for the "Security" tab on the
                  left side of the page and click on it.
                </li>
              </ul>
            </li>
            <li>
              <span className="fw-bold">
                {" "}
                Find the "Signing in to Google" section:
              </span>
              <ul>
                <li>
                  In the "Security" section, scroll down until you find "Signing
                  in to Google."
                </li>
              </ul>
            </li>
            <li>
              <span className="fw-bold"> Enable 2-Step Verification:</span>
              <ul>
                <li>
                  If you haven't already set up 2-Step Verification, you must do
                  so before you can generate an app password.
                </li>
                <li>
                  Follow the prompts to set up 2-Step Verification. You may be
                  asked to verify your phone number or use the Google
                  Authenticator app.
                </li>
              </ul>
            </li>
            <li>
              <span className="fw-bold"> Generate an app password:</span>
              <ul>
                <li>
                  Once 2-Step Verification is enabled, return to the "Signing in
                  to Google" section and click on "App passwords."
                </li>
                <li>You may need to sign in again for security reasons.</li>
                <li>
                  On the "App passwords" page, click the "Select app" dropdown
                  and choose the app you want to generate a password for (e.g.,
                  "Mail," "Calendar," etc.).
                </li>
                <li>
                  Then, click the "Select device" dropdown and choose the device
                  you want to generate a password for.
                </li>
                <li>Click "Generate" to create the app password.</li>
              </ul>
            </li>
            <li>
              <span className="fw-bold"> Copy the app password:</span>
              <ul>
                <li>
                  Once the password is generated, copy and paste it below input
                  and save this for email settings.
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <div className="row gx-3 mt-5">
          <div className="col-sm-12">
            <div className="form-group">
              <InputField
                name="google_app_password"
                type="password"
                placeholder="Your Google App Password"
                label="App Password"
                control={control}
                errors={errors}
              />
              <button type="submit" className="btn btn-primary mt-3">
                Submit
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
