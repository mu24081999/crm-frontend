import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaClipboard, FaEdit, FaMinus, FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CiMinimize1 } from "react-icons/ci";
import { CgMaximize } from "react-icons/cg";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/services/users";
import { sendEmailRec } from "../../../redux/services/email";
import EditorField from "../../../components/FormFields/Editor";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";

const ComposeBulk = () => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.email);
  const [usersData, setUsersData] = useState([]);
  const [emails, setEmails] = useState([]);
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
    if (user?.google_app_password) {
      const formData = new FormData();

      // Append other form fields
      formData.append("subject", data.subject);
      formData.append("body", data.body);
      formData.append("type", "email");
      formData.append("from", user?.email);
      formData.append("google_app_password", user?.google_app_password);
      if (emails.length > 0) {
        emails?.forEach((element) => {
          formData.append("to", element);
        });
      } else {
        const textEmails = data?.to?.split("\n");
        console.log("🚀 ~ handleSendEmail ~ textEmails:", textEmails);
        textEmails?.forEach((element) => {
          formData.append("to", element);
        });
      }
      data?.files &&
        data?.files.forEach((element) => {
          formData.append("files", element);
        });

      dispatch(sendEmailRec(token, formData));
      reset();
    } else {
      toast.error("You are not allowed to send email!");
    }
  };
  // Function to extract email addresses from CSV contents
  // Function to extract all columns and their data from CSV contents
  const extractColumnsFromCSV = (csvContent) => {
    const columnsData = {};

    // Split CSV content by lines
    const lines = csvContent.split("\n");

    // Extract headers (first line)
    const headers = lines[0].split(",").map((header) => header.trim());

    // Initialize columnsData object with empty arrays for each column
    headers.forEach((header) => {
      columnsData[header] = [];
    });

    // Iterate over each row (starting from the second line)
    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(",");
      // Iterate over each column
      for (let j = 0; j < headers.length && j < columns.length; j++) {
        // Trim the data and push it to the corresponding column array
        columnsData[headers[j]].push(columns[j].trim());
      }
    }
    return columnsData?.Numbers;
    // console.log(columnsData);
  };
  const handleChangeCsvFile = (event) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result;
      const emailsArray = extractColumnsFromCSV(contents);
      const resultString = emailsArray.join("\n");

      // console.log("🚀 ~ handleChangeCsvFile ~ emailsArray:", resultString);
      setEmails(emailsArray);
      setValue("to", resultString);
    };

    reader.readAsText(file);
  };
  return (
    <div class="compose-email-popup">
      <div class="d-flex flex-column">
        <header class="d-flex align-items-center justify-content-between">
          <h6 class="text-white mb-0">Compose Bulk</h6>
          <div class="d-flex">
            <button
              id="min_compose_popup"
              class="btn btn-sm btn-icon btn-dark btn-rounded d-lg-block d-none"
            >
              <span class="icon">
                <span class="feather-icon">
                  <FaMinus />
                </span>
              </span>
            </button>
            <button
              id="max_compose_popup"
              class="btn btn-sm btn-icon btn-dark btn-rounded d-lg-block d-none"
            >
              <span class="icon">
                <span class="feather-icon">
                  <CgMaximize />
                </span>
                <span class="feather-icon">
                  <CiMinimize1 />
                </span>
              </span>
            </button>
            <button
              id="close_compose_popup"
              class="btn btn-sm btn-icon btn-dark btn-rounded"
            >
              <span class="icon">
                <span class="feather-icon">
                  <RxCross2 />
                </span>
              </span>
            </button>
          </div>
        </header>
        {isLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleSubmit(handleSendEmail)}
            style={{
              maxHeight: "600px",
              overflow: "scroll",
              scrollBehavior: "smooth",
            }}
          >
            <div className="w-100">
              <TextAreaField
                name="to"
                height="150px"
                placeholder="Enter list of phone numbers in format +14849993639"
                rows={2}
                control={control}
                errors={errors}
              />
            </div>
            <div className="w-100 form-group">
              <label className="form-label">
                Upload CSV including column <strong>`Numbers`</strong>
              </label>
              <input
                type="file"
                className="form-control"
                name="emails"
                onChange={handleChangeCsvFile}
              />
            </div>
            <div className="w-100">
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
            {/* <div className="form-group">
              <label className="form-label">Attachments</label>
              <input
                type="file"
                name="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
              />
            </div> */}
            <div class="modal-footer ">
              <div className="w-100">
                <button class="btn btn-primary float-end" type="submit">
                  Send
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ComposeBulk;
