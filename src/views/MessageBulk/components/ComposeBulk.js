import React, { useContext, useEffect, useState } from "react";
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
import { SocketContext } from "../../../Context";

const ComposeBulk = ({ onShowAddForm }) => {
  const { sendTextMessage } = useContext(SocketContext);

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const bodyWatcher = watch("body");
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { balanceDetails } = useSelector((state) => state.balance);
  // const { isLoading } = useSelector((state) => state.email);
  const [isLoading, setIsLoading] = useState(false);
  const [toNumbers, setToNumbers] = useState([]);
  useEffect(() => {
    // if (token) {
    dispatch(getUsers(token));
    // }
  }, [token, dispatch]);
  const handleFileChange = (e) => {
    setValue("files", e.currentTarget.files);
  };
  // const handleSendBulkSMS = (data) => {
  //   if (toNumbers.length > 0) {
  //     toNumbers?.forEach((element) => {
  //       const data = {
  //         from: {
  //           phone: user.phone,
  //           name: user.name,
  //           avatar: user.avatar,
  //           socket_id: user.socket_id,
  //           accountSid: user?.accountSid,
  //           authToken: user?.authToken,
  //         },
  //         to: {
  //           phone: element,
  //         },
  //         message: bodyWatcher,
  //       };
  //       console.log(data);
  //       sendTextMessage(data);
  //     });
  //   } else if (data?.to?.split("\n")?.length > 0) {
  //     const to_numbers = data?.to?.split("\n");
  //     to_numbers?.map((element) => {
  //       const data = {
  //         from: {
  //           phone: user.phone,
  //           name: user.name,
  //           avatar: user.avatar,
  //           socket_id: user.socket_id,
  //           accountSid: user?.accountSid,
  //           authToken: user?.authToken,
  //         },
  //         to: {
  //           phone: element,
  //         },
  //         message: bodyWatcher,
  //       };
  //       sendTextMessage(data);
  //     });
  //   }
  // };
  const handleSendBulkSMS = async (data) => {
    try {
      if (
        user?.phone !== null &&
        user?.phone !== undefined &&
        user?.phone !== ""
      ) {
        if (parseInt(balanceDetails?.credit) > 0) {
          setIsLoading(true);
          if (toNumbers.length > 0) {
            await Promise.all(
              toNumbers.map(async (element) => {
                const smsData = {
                  from: {
                    phone: user.phone,
                    name: user.name,
                    avatar: user.avatar,
                    socket_id: user.socket_id,
                    accountSid: user?.accountSid,
                    authToken: user?.authToken,
                  },
                  to: {
                    phone: element,
                  },
                  user_id: user?.id,
                  message: bodyWatcher,
                };
                console.log(smsData);
                await sendTextMessage(smsData);
              })
            );
          } else if (data?.to?.split("\n")?.length > 0) {
            const to_numbers = data?.to?.split("\n");
            const is_completed = await Promise.all(
              to_numbers.map(async (element) => {
                const smsData = {
                  from: {
                    phone: user.phone,
                    name: user.name,
                    avatar: user.avatar,
                    socket_id: user.socket_id,
                    accountSid: user?.accountSid,
                    authToken: user?.authToken,
                  },
                  to: {
                    phone: element,
                  },
                  message: bodyWatcher,
                  user_id: user?.id,
                };
                await sendTextMessage(smsData);
              })
            );
          }
          setIsLoading(false);
          toast.success("SMS are successfully added to pipeline.");
        } else {
          toast.error("You have insufficient balance to send message.");
        }
        // Add any post-processing logic here
      } else {
        toast.error(
          "Please configure you number first, then you are able to send a message."
        );
      }
    } catch (error) {
      console.error("Error sending SMS messages:", error);
      // Handle errors here
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
      const numbersArray = extractColumnsFromCSV(contents);
      const resultString = numbersArray.join("\n");

      // console.log("🚀 ~ handleChangeCsvFile ~ numbersArray:", resultString);
      setToNumbers(numbersArray);
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
              onClick={() => onShowAddForm(false)}
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
            onSubmit={handleSubmit(handleSendBulkSMS)}
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
                placeholder="Enter list of phone numbers in format +1234567890"
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
                name="toNumbers"
                onChange={handleChangeCsvFile}
              />
            </div>
            <div className="w-100">
              <TextAreaField
                name="body"
                placeholder="Body text"
                control={control}
                rows={4}
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
