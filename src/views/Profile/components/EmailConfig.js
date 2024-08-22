import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRec } from "../../../redux/services/users";
import { setAccount } from "../../../redux/slices/auth";
import _ from "lodash";

const UpdatePassword = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const emailTypeWatcher = watch("email_type");
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    setValue("google_app_password", user?.google_app_password);
    setValue("mail_provider", user?.mail_provider);
    setValue("email_type", {
      label: user?.email_type,
      value: user?.email_type,
    });
  }, [user, setValue]);
  const handleUpdate = async (data) => {
    const params = {
      google_app_password: data?.google_app_password,
      mail_provider: data?.mail_provider,
      email_type: data?.email_type?.value,
    };
    const updated = await dispatch(updateUserRec(token, params, user.id));
    if (updated) {
      const newUser = {
        ...user,
        google_app_password: data?.google_app_password,
        mail_provider: data?.mail_provider,
        email_type: data?.email_type?.value,
      };
      dispatch(setAccount(newUser));
    }
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
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Email Configuration</span>
        </div>
        <div className="d-flex gap-5">
          <div className="row mt-5 col-6 gap-5">
            <div className="col-sm-12">
              <div className="form-group">
                <div>
                  <ReactSelectField
                    name="email_type"
                    placeholder="Email Type"
                    label="Email Type"
                    options={[
                      {
                        label: "Google_email",
                        value: "google_email",
                      },
                      {
                        label: "Professional_email",
                        value: "professional_email",
                      },
                    ]}
                    control={control}
                    errors={errors}
                  />
                </div>
                {emailTypeWatcher !== undefined &&
                  emailTypeWatcher?.value === "professional_email" && (
                    <InputField
                      name="mail_provider"
                      placeholder="Your Email Service Provider"
                      label="Email Provider"
                      control={control}
                      errors={errors}
                    />
                  )}
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
          {emailTypeWatcher?.value === "professional_email" ? (
            <div className="col-6">
              <p className="text-primary">
                Steps for Setting Up Your Professional Email
              </p>
              <ol className="card p-5">
                <li>
                  <span className="fw-bold">
                    {" "}
                    Access your email provider's settings:
                  </span>
                  <ul>
                    <li>
                      Log in to your professional email account (e.g.,
                      yourname@yourdomain.com) using your provided credentials.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="fw-bold"> Open your email client:</span>
                  <ul>
                    <li>
                      Open your preferred email client (e.g., Outlook,
                      Thunderbird).
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="fw-bold"> Add a new email account:</span>
                  <ul>
                    <li>
                      Go to the account settings or email settings section in
                      your email client.
                    </li>
                    <li>Click on "Add Account" or "New Account."</li>
                  </ul>
                </li>
                <li>
                  <span className="fw-bold">
                    {" "}
                    Enter your email credentials:
                  </span>
                  <ul>
                    <li>
                      In the setup wizard, enter your professional email address
                      (e.g., yourname@yourdomain.com) and the password provided
                      by your email administrator.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="fw-bold">
                    {" "}
                    Configure the mail server settings:
                  </span>
                  <ul>
                    <li>
                      In the incoming mail server section, enter your mail
                      provider's settings:
                      <ul>
                        <li>**Incoming Mail Server:** mail.justcall.com.pk</li>
                        <li>**Port:** 993 for IMAP or 995 for POP3</li>
                        <li>**Security Type:** SSL/TLS</li>
                      </ul>
                    </li>
                    <li>
                      In the outgoing mail server section, enter your provider's
                      SMTP settings:
                      <ul>
                        <li>
                          **Outgoing Mail Server (SMTP):** smtp.justcall.com.pk
                        </li>
                        <li>**Port:** 465 or 587</li>
                        <li>**Security Type:** SSL/TLS</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="fw-bold"> Complete the setup:</span>
                  <ul>
                    <li>
                      Click "Next" or "Finish" to complete the setup process.
                    </li>
                    <li>Test the connection by sending a test email.</li>
                  </ul>
                </li>
                <li>
                  <span className="fw-bold">
                    {" "}
                    Save your email credentials securely:
                  </span>
                  <ul>
                    <li>
                      Ensure that you save your email address, password, and
                      server settings in a secure location for future reference.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          ) : (
            <div className="col-6">
              <p className="text-primary">
                Steps for Creating Password for Google Email
              </p>
              <ol className="card p-5">
                <li>
                  <span className="fw-bold">
                    {" "}
                    Sign in to your Google account:
                  </span>
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
                  <span className="fw-bold">
                    {" "}
                    Go to the "Security" section:
                  </span>
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
                      In the "Security" section, scroll down until you find
                      "Signing in to Google."
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="fw-bold"> Enable 2-Step Verification:</span>
                  <ul>
                    <li>
                      If you haven't already set up 2-Step Verification, you
                      must do so before you can generate an app password.
                    </li>
                    <li>
                      Follow the prompts to set up 2-Step Verification. You may
                      be asked to verify your phone number or use the Google
                      Authenticator app.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="fw-bold"> Generate an app password:</span>
                  <ul>
                    <li>
                      Once 2-Step Verification is enabled, return to the
                      "Signing in to Google" section and click on "App
                      passwords."
                    </li>
                    <li>You may need to sign in again for security reasons.</li>
                    <li>
                      On the "App passwords" page, click the "Select app"
                      dropdown and choose the app you want to generate a
                      password for (e.g., "Mail," "Calendar," etc.).
                    </li>
                    <li>
                      Then, click the "Select device" dropdown and choose the
                      device you want to generate a password for.
                    </li>
                    <li>Click "Generate" to create the app password.</li>
                  </ul>
                </li>
                <li>
                  <span className="fw-bold"> Copy the app password:</span>
                  <ul>
                    <li>
                      Once the password is generated, copy and paste it below
                      input and save this for email settings.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
