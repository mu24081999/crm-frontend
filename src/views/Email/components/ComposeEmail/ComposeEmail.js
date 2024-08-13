import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../../components/FormFields/reactSelectField";
import { FaClipboard, FaEdit, FaMinus, FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CiMinimize1 } from "react-icons/ci";
import { CgMaximize } from "react-icons/cg";
import InputField from "../../../../components/FormFields/InputField";
import TextAreaField from "../../../../components/FormFields/textAreaField";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/services/users";
import { sendEmailRec } from "../../../../redux/services/email";
import ReactTagInputComponent from "../../../../components/FormFields/reactTagInputComponent";
import Loader from "../../../../components/Loader/Loader";
import EditorField from "../../../../components/FormFields/Editor";
import { FiPaperclip } from "react-icons/fi";
import { toast } from "react-toastify";

const ComposeEmail = () => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.email);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    // if (token) {
    dispatch(getUsers(token));
    // }
  }, [token, dispatch]);
  useEffect(() => {
    if (users?.length > 0) {
      setUsersData(users);
    }
  }, [users]);
  const handleFileChange = (e) => {
    setValue("files", e.currentTarget.files);
  };
  const handleSendEmail = (data) => {
    // const formData = {
    //   ...data,
    //   from: user.email,
    //   type: "email",
    //   files: data.files,
    // };
    if (user?.google_app_password) {
      const formData = new FormData();

      // Append other form fields
      formData.append("subject", data.subject);
      formData.append("body", data.body);
      formData.append("type", "email");
      formData.append("from", user.email);
      formData.append("from_name", user.name);
      formData.append("google_app_password", user?.google_app_password);
      formData.append("email_type", user?.email_type);
      formData.append("mail_provider", user?.mail_provider);
      data?.to?.forEach((element) => {
        formData.append("to", element);
      });
      data.files &&
        data.files.forEach((element) => {
          formData.append("files", element);
        });
      dispatch(sendEmailRec(token, formData));
    } else {
      toast.error("Email not sent. Please configure your account.");
    }
  };
  return (
    <div class="">
      <div class="d-flex flex-column h-100">
        {/* {isLoading ? (
          <Loader />
        ) : ( */}
        <form onSubmit={handleSubmit(handleSendEmail)}>
          <div className="w-100">
            <InputField
              name="subject"
              // mb={true}
              placeholder="Subject"
              control={control}
              errors={errors}
            />
          </div>
          <div className="w-100">
            {/* <ReactSelectField
            name="to"
            placeholder="Select"
            control={control}
            isMulti={true}
            optionData={
              usersData.length > 0
                ? usersData?.map((user, index) => {
                    return {
                      label: user.name,
                      value: user.email,
                      ...user,
                    };
                  })
                : []
            }
            errors={errors}
          /> */}
            <ReactTagInputComponent
              errors={errors}
              control={control}
              placeHolder="Enter email and press enter"
              name="to"
            />
          </div>
          <div className="w-100">
            {/* <TextAreaField
                name="body"
                placeholder="Text"
                control={control}
                errors={errors}
              /> */}
            <EditorField
              name="body"
              placeholder="Body text"
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
          <div className="mb-2">
            <div
              className="btn shadow btn-secondary rounded-circle btn-file"
              style={{ width: "30px", height: "35px" }}
            >
              <FiPaperclip
                size={17}
                style={{ marginLeft: "-8px", marginBottom: "6px" }}
              />
              <input
                type="file"
                className="upload"
                onChange={handleFileChange}
              />
            </div>
            <span className="px-2">Attach files</span>
          </div>
          <div class="compose-email-footer">
            <div className="w-100">
              <button class="btn btn-primary float-end" type="submit">
                Send
              </button>
              {/* <input
                  type="file"
                  name="file"
                  multiple
                  onChange={handleFileChange}
                /> */}

              {/* <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
                  <span
                    class="icon"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add flag"
                    data-bs-original-title="Add flag"
                  >
                    <span class="feather-icon">
                      <FaClipboard />
                    </span>
                  </span>
                </button> */}
            </div>
            {/* <div>
                <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
                  <span
                    class="icon"
                    data-bs-toggle="Save Draft"
                    data-bs-placement="top"
                    title="Save Draft"
                    data-bs-original-title="Save Draft"
                  >
                    <span class="feather-icon">
                      <FaEdit />
                    </span>
                  </span>
                </button>
                <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
                  <span
                    class="icon"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete"
                    data-bs-original-title="Delete"
                  >
                    <span class="feather-icon">
                      <FaTrash />
                    </span>
                  </span>
                </button>
              </div> */}
          </div>
        </form>
        {/* )} */}
      </div>
    </div>
  );
};

export default ComposeEmail;
