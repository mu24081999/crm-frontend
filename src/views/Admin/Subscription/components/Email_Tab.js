import React, { useEffect, useState } from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowDown,
  FaClipboard,
  FaEdit,
  FaPrint,
  FaTrash,
} from "react-icons/fa";
import { getEmailListByEmail } from "../../../redux/services/email";
import { useSelector } from "react-redux";
import moment from "moment";
import { getUsers } from "../../../redux/services/users";
import FilePreview from "../../../components/FilePreview/FilePreview";
const Email_Tab = ({
  contactDetails,
  activeBar,
  dispatch,
  token,
  authUser,
}) => {
  const [emailsData, setEmailsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const { emails } = useSelector((state) => state.email);
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    const data = {
      senderEmail: authUser?.email,
      recieverEmail: contactDetails?.email,
    };
    dispatch(getEmailListByEmail(token, data));
    dispatch(getUsers(token));
  }, [dispatch, token, authUser, contactDetails]);
  useEffect(() => {
    setUsersData(users);
  }, [users]);
  useEffect(() => {
    const data = [];
    if (emails?.length > 0) {
      emails?.map((email, index) => {
        const sender = usersData?.filter(
          (user) => user.email === email.sender
        )[0];
        const reciever = usersData?.filter(
          (user) => user.email === email.reciever
        )[0];
        data.push({ ...email, sender, reciever });
      });
      setEmailsData(data);
    }
  }, [emails, usersData]);
  const downloadFile = async (file_link, file_name) => {
    try {
      const link = document.createElement("a");
      link.href = file_link;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  function getFileExtension(filename) {
    // const resp = filename?.split(".").pop().toLowerCase();
    // Method 1: Using string split
    const filename1 = filename?.split("/").pop(); // Extracts the last segment after splitting by '/'
    const extension1 = filename1.split(".").pop(); // Extracts the file extension after splitting by '.'

    console.log(extension1); // Outputs: jpeg

    // Method 2: Using regular expression
    const filename2 = filename?.match(/\/([^\/?#]+)[^\/]*$/)[1]; // Extracts the last segment using regex
    const extension2 = filename2.split(".").pop(); // Extracts the file extension after splitting by '.'
    console.log(extension2); // Outputs: jpeg

    return extension2; // Outputs: jpeg
  }
  function bytesToMegabytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }
  return (
    <div className="tab-content mt-7">
      <div
        className={`tab-pane fade show ${
          activeBar === "Email_tab" ? "active" : ""
        }`}
        id="Email_tab"
      >
        <div id="accordion">
          {emailsData?.length > 0 ? (
            <div style={{ height: "600px", overflow: "scroll" }}>
              {emailsData?.map((email, index) => (
                <div class="card" key={index}>
                  <div class="card-header">
                    <a class="btn" data-bs-toggle="collapse" href={`#` + index}>
                      <div className="d-flex">
                        <div class="fw-light">{email?.subject}</div>
                        <div class="badge badge-orange badge-sm badge-pill flex-shrink-0 ms-3 pt-2 ">
                          updated now
                        </div>
                      </div>{" "}
                    </a>
                    <div class="single-email-subject">
                      <div class="email-options-wrap">
                        <a
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Print"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              {/* <i data-feather="printer"></i> */}
                              <FaPrint />
                            </span>
                          </span>
                        </a>
                        <a
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Reply"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              {/* <i data-feather="corner-up-left"></i> */}
                              <FaArrowAltCircleLeft />
                            </span>
                          </span>
                        </a>
                        <a
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Forward"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              {/* <i data-feather="arrow-right"></i> */}
                              <FaArrowAltCircleRight />
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div
                    class="card-body collapse"
                    id={index}
                    data-bs-parent={`#` + index}
                  >
                    <div class="media">
                      <div class="media-head">
                        <div class="avatar d-8">
                          <img
                            src={email?.sender?.avatar}
                            alt="user"
                            class="avatar-img rounded-circle"
                          />
                        </div>
                      </div>
                      <div class="media-body">
                        <div>{email?.sender?.name}</div>
                        <div class="fs-7">
                          <span>to</span>
                          <div class="mail-desc-dropdown">
                            <a
                              href="/"
                              class="dropdown-toggle link-dark"
                              data-bs-toggle="dropdown"
                            >
                              me
                            </a>
                            <div class="dropdown-menu">
                              <div>
                                <span>from :</span>
                                <span>
                                  {email?.sender?.name}{" "}
                                  <span>
                                    &lt;
                                    {email?.sender?.email}
                                    &gt;
                                  </span>
                                </span>
                              </div>
                              <div>
                                <span>to :</span>
                                <span>
                                  {email?.reciever?.name}{" "}
                                  <span>
                                    &lt;
                                    {email?.reciever?.email}
                                    &gt;
                                  </span>
                                </span>
                              </div>
                              <div>
                                <span>date :</span>
                                <span>
                                  {moment(email?.created_at, "h:mm A").format(
                                    "h:mm A"
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-body">
                      {email.body}
                      <div class="separator separator-light"></div>
                      {/* <div class="text-end">
                        <a href="/" class="link-theme fs-7">
                          <u>Download All</u>
                        </a>
                      </div>
                      <div class="email-attachment-wrap">
                        {email.files?.map((file, index) => (
                          <div class="attachment-box">
                            <div>
                              <div class="media">
                                <div class="avatar avatar-icon avatar-sm avatar-blue">
                                  <span class="initial-wrap fs-3">
                                    <FilePreview
                                      fileType={getFileExtension(
                                        file?.file_link
                                      )}
                                      fileUrl={file?.file_link}
                                      fileWidth={45}
                                    />
                                  </span>
                                </div>
                                <div class="media-body">
                                  <p class="file-name">
                                    {file?.file_link.split("/").pop()}
                                  </p>
                                  <p class="file-size">
                                    {bytesToMegabytes(file?.size)} MB
                                  </p>
                                </div>
                              </div>
                              <div class="file-overlay">
                                <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                                  <span class="icon">
                                    <button
                                      key={index}
                                      style={{
                                        border: "none",
                                        background: "none",
                                      }}
                                      onClick={() =>
                                        downloadFile(
                                          file.file_link,
                                          file.created_at
                                        )
                                      }
                                    >
                                      <FaArrowDown color="white" />
                                    </button>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div> */}

                      <div class="email-head-action">
                        <div class="email-time">
                          {" "}
                          {moment(email?.created_at, "h:mm A").format("h:mm A")}
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No Emails yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Email_Tab;
