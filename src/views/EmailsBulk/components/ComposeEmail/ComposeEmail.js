import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/FormFields/InputField";
import TextAreaField from "../../../../components/FormFields/textAreaField";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/services/users";
import { sendEmailBulk, sendEmailRec } from "../../../../redux/services/email";
import EditorField from "../../../../components/FormFields/Editor";
import { toast } from "react-toastify";

const ComposeEmail = () => {
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
  const [usersData, setUsersData] = useState([]);
  const [emails, setEmails] = useState([]);
  const [firstnames, setFirstNames] = useState([]);
  const [lastNames, setLastNames] = useState([]);
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
  const handleSendEmail = async (data) => {
    console.log(user?.mail_provider);
    if (user?.google_app_password) {
      // const textEmails = data?.to?.split("\n");
      // textEmails?.length > 0
      //   ? textEmails?.map((email, index) => {
      //       const formData = new FormData();
      //       // Append other form fields
      //       formData.append("subject", data.subject);
      //       formData.append("body", data.body);
      //       formData.append("type", "email");
      //       formData.append("from", user?.email);
      //       formData.append("from_name", user?.name);
      //       formData.append("google_app_password", user?.google_app_password);
      //       formData.append("to", email);
      //       data?.files &&
      //         data?.files.forEach((element) => {
      //           formData.append("files", element);
      //         });
      //       dispatch(sendEmailBulk(token, formData));
      //     })
      //   : emails?.length > 0 &&
      //     emails?.map((email, index) => {
      //       const formData = new FormData();
      //       // Append other form fields
      //       formData.append("subject", data.subject);
      //       formData.append("body", data.body);
      //       formData.append("type", "email");
      //       formData.append("from", user?.email);
      //       formData.append("from_name", user?.name);
      //       formData.append("google_app_password", user?.google_app_password);
      //       formData.append("to", email);
      //       data?.files &&
      //         data?.files.forEach((element) => {
      //           formData.append("files", element);
      //         });
      //       dispatch(sendEmailBulk(token, formData));
      //     });
      // reset();
      const formData = new FormData();

      // Append other form fields
      formData.append("subject", data.subject);
      formData.append("body", data.body);
      formData.append("type", "email");
      formData.append("from", user?.email);
      formData.append("from_name", user?.name);
      formData.append("google_app_password", user?.google_app_password);
      formData.append("email_type", user?.email_type);
      formData.append("mail_provider", user?.mail_provider);
      firstnames?.forEach((element) => {
        formData.append("to_name", element);
      });
      if (emails.length > 0) {
        // if (emails?.length <= 100) {
        emails?.forEach((element) => {
          formData.append("to", element);
        });

        // } else {
        //   return toast.error("You can only send 100 emails on per request ");
        // }
      } else {
        const textEmails = data?.to?.split("\n");
        // if (textEmails?.length <= 100) {
        textEmails?.forEach((element) => {
          formData.append("to", element);
        });
        // } else {
        //   toast.error("You can only send 100 emails on per request");
        // }
      }
      data?.files &&
        data?.files.forEach((element) => {
          formData.append("files", element);
        });

      await dispatch(sendEmailBulk(token, formData));
      reset();
    } else {
      toast.error("Email not sent. Please configure your account.");
    }
  };
  // Function to extract email addresses from CSV contents
  // Function to extract all columns and their data from CSV contents
  // const extractColumnsFromCSV = (csvContent) => {
  //   const columnsData = {};

  //   // Split CSV content by lines
  //   const lines = csvContent.split("\n");

  //   // Extract headers (first line)
  //   const headers = lines[0].split(",").map((header) => header.trim());

  //   // Initialize columnsData object with empty arrays for each column
  //   headers.forEach((header) => {
  //     columnsData[header] = [];
  //   });

  //   // Iterate over each row (starting from the second line)
  //   for (let i = 1; i < lines.length; i++) {
  //     const columns = lines[i].split(",");
  //     console.log("🚀 ~ extractColumnsFromCSV ~ columns:", columns);
  //     // Iterate over each column
  //     for (let j = 0; j < headers.length && j < columns.length; j++) {
  //       // Trim the data and push it to the corresponding column array
  //       columnsData[headers[j]].push(columns[j].trim());
  //     }
  //   }
  //   // // Validation: Ensure exactly 100 entries are selected from the 'emails' column
  //   // if (columnsData?.emails?.length !== 100) {
  //   //   return toast.error(
  //   //     `Expected exactly 100 emails, but found ${columnsData.emails.length}`
  //   //   );
  //   // }
  //   console.log(columnsData);
  //   return columnsData?.emails;
  // };
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

    // Extract the emails array from columnsData
    const emails = columnsData.emails || [];

    // Return both the emails array and the full columnsData object
    console.log("🚀 ~ extractColumnsFromCSV ~ columnsData:", columnsData);
    return { emails, columnsData };
  };

  const handleChangeCsvFile = (event) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result;
      console.log("🚀 ~ handleChangeCsvFile ~ contents:", contents);
      const data = extractColumnsFromCSV(contents);
      setEmails(data.emails);
      setFirstNames(data?.columnsData?.fistname);
      setValue("to", data?.emails);
    };

    reader.readAsText(file);
  };
  return (
    <div class="">
      <div class="d-flex flex-column">
        {/* {isLoading ? (
          <Loader />
        ) : ( */}
        <form
          onSubmit={handleSubmit(handleSendEmail)}
          style={{
            maxHeight: "600px",
            overflow: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          <div className="w-100">
            <InputField
              name="subject"
              placeholder="Subject"
              control={control}
              mb={true}
              errors={errors}
            />
          </div>
          <div className="w-100">
            <TextAreaField
              name="to"
              height="150px"
              placeholder="Enter list of email address"
              rows={2}
              control={control}
              errors={errors}
            />
          </div>
          <div className="w-100 form-group">
            <label className="form-label">Upload CSV for emails</label>
            <input
              type="file"
              className="form-control"
              name="emails"
              onChange={handleChangeCsvFile}
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
          <div className="form-group">
            <label className="form-label">Attachments</label>
            <input
              type="file"
              name="file"
              className="form-control"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div class="compose-email-footer ">
            <div className="w-100">
              <button class="btn btn-primary float-end" type="submit">
                Send
              </button>
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
