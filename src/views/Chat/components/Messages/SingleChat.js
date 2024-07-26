import _ from "lodash";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaArrowDown, FaUserPlus } from "react-icons/fa";
import FilePreview from "../../../../components/FilePreview/FilePreview";
import { SocketContext } from "../../../../Context";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/services/users";
import { FiPaperclip } from "react-icons/fi";
import { saveAs } from "file-saver";
import axios from "axios";
const SingleChat = ({ messages, selectedRoom, authUser, socket }) => {
  const { pushNotification } = useContext(SocketContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersArray, setUsersArray] = useState(null);
  const { users } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const getUser = (user_id) => {
    const user = users?.filter((user) => user.id === parseInt(user_id))[0];
    return user;
  };
  useEffect(() => {
    if (messages?.length > 0) {
      document
        .getElementById("dummy_avatar")
        .scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  // useEffect(() => {
  //   if (selectedUser && me && token) {
  //     callUser(selectedUser?.socket_id, authUser.name, type,       selectedUser?.name
  //     );
  //   }
  // }, [selectedUser, authUser, callUser, call, me, token]);
  const downloadFile = async (url, filename) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob", // Important
      });

      const blob = new Blob([response.data]);
      saveAs(blob, filename);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDownload = (url, filename) => {
    downloadFile(url, filename);
  };
  useEffect(() => {
    if (users?.length > 0) {
      setUsersArray(users);
    }
  }, [users]);

  useEffect(() => {
    if (token) {
      dispatch(getUsers(token));
    }
  }, [token, dispatch]);
  useEffect(() => {
    const selectedId =
      selectedRoom.user_id_1 === authUser.id
        ? selectedRoom.user_id_2
        : selectedRoom.user_id_1;
    if (usersArray?.length > 0) {
      const response = usersArray?.filter((user) => user.id === selectedId);
      setSelectedUser(response[0]);
    }
  }, [usersArray, authUser, selectedRoom]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile_, setSelectedFile_] = useState(null);
  const [files, setFiles] = useState([]);

  const [message, setMessage] = useState();

  const sendMessage = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      let formData;
      let fileData;
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        reader.onload = async (e) => {
          const buffer = e.target.result;
          const fileData = {
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
            data: buffer,
          };
          setSelectedFile(fileData);
        };

        formData = {
          sender:
            selectedRoom && selectedRoom?.user_id_1 === authUser?.id
              ? selectedRoom.user_id_1
              : selectedRoom?.user_id_2,
          recipient:
            selectedRoom && selectedRoom?.user_id_1 === authUser?.id
              ? selectedRoom.user_id_2
              : selectedRoom?.user_id_1,
          room: selectedRoom?.name,
          file: selectedFile,
          file_name: selectedFile.name,
          file_data: selectedFile,
          file_size: selectedFile.size,
          file_type: selectedFile.type,
          type: "file",
        };
      } else {
        formData = {
          sender:
            selectedRoom && selectedRoom?.user_id_1 === authUser?.id
              ? selectedRoom.user_id_1
              : selectedRoom?.user_id_2,
          recipient:
            selectedRoom && selectedRoom?.user_id_1 === authUser?.id
              ? selectedRoom.user_id_2
              : selectedRoom?.user_id_1,
          room: selectedRoom?.name,
          message: message,
          type: "text",
        };
      }
      socket.emit("chat_message", formData);
      const recipient = getUser(formData?.recipient);
      const sender = getUser(formData?.sender);
      // if (recipient?.connected === 0) {
      pushNotification({
        user_id: recipient?.id,
        notification: `You have a team message from ${sender.name}`,
        type: "team_message",
      });
      // socket.emit("chat_message", messageData);
      setMessage("");
      setSelectedFile(null);
      setSelectedFile_(null);
      document
        .getElementById("dummy_avatar")
        .scrollIntoView({ behavior: "smooth", block: "end" });

      // }
    }
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedFile_(event.target.files[0]);
  };

  // useEffect(() => {
  //   document
  //     .getElementById("dummy_avatar")
  //     .scrollIntoView({ behavior: "smooth", block: "end" });
  //   // Configure AWS
  //   AWS.config.update({
  //     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  //     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  //     region: process.env.REACT_APP_AWS_REGION,
  //   });

  //   // Create S3 service object
  //   const s3 = new AWS.S3();

  //   const fetchObjects = async () => {
  //     const params = {
  //       Bucket: "jampackcrm",
  //     };
  //     try {
  //       const data = await s3.listObjectsV2(params).promise();
  //       setFiles(data.Contents);
  //     } catch (error) {
  //       console.error("Error fetching objects:", error);
  //     }
  //   };

  //   fetchObjects();
  // }, []);
  // const downloadFile = async (bucketName, objectKey) => {
  //   const s3 = new AWS.S3();
  //   const params = {
  //     Bucket: bucketName,
  //     Key: objectKey,
  //   };
  //   try {
  //     const data = await s3.getObject(params).promise();
  //     const url = URL.createObjectURL(new Blob([data.Body]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", objectKey);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };
  const getFile = (key) => {
    const file = files?.filter((fl) => fl.Key === key);
    return file;
  };
  // Function to extract file extension from the file name
  function getFileExtension(filename) {
    const resp = filename?.split(".").pop().toLowerCase();
    return resp;
  }
  // Function to convert bytes to gigabytes (GB)
  function bytesToGigabytes(bytes) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
  }

  // Function to convert bytes to megabytes (MB)
  function bytesToMegabytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }

  return (
    <div class="chatapp-single-chat">
      <header class="chat-header">
        <a
          id="back_user_list"
          class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover back-user-list"
          href="/"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="chevron-left"></i>
            </span>
          </span>
        </a>
        <div class="media">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-rounded position-relative">
              <img
                src={
                  (selectedRoom?.user_id_1 === authUser?.id
                    ? selectedRoom?.user_image_2
                    : selectedRoom?.user_image_1) ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="user"
                class="avatar-img"
              />
              {getUser(
                selectedRoom.user_id_1 === authUser?.id
                  ? selectedRoom.user_id_2
                  : selectedRoom.user_id_1
              )?.connected === 1 && (
                <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
              )}
            </div>
          </div>
          <div class="media-body">
            <div class="user-name">
              {" "}
              {selectedRoom?.user_id_1 === authUser?.id
                ? selectedRoom?.user_name_2
                : selectedRoom?.user_name_1}
            </div>
            {/* <div class="user-status">
              Typing<span class="one">.</span>
              <span class="two">.</span>
              <span class="three">.</span>
            </div> */}
          </div>
        </div>
        <div class="chat-options-wrap">
          <a
            class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret d-none d-xl-block"
            href="/"
            data-bs-toggle="modal"
            data-bs-target="#invite_people"
          >
            <span
              class="icon"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Invite people"
            >
              <span class="feather-icon">
                <FaUserPlus />
              </span>
            </span>
          </a>
        </div>
      </header>
      <div data-simplebar id="chat_body" class="chat-body">
        <ul id="dummy_avatar" class="list-unstyled chat-single-list">
          {messages?.length > 0 ? (
            messages.map((msg, index) =>
              _.toInteger(msg?.sender) !== authUser?.id ? (
                <li class="media received" key={index}>
                  <div class="avatar avatar-xs avatar-rounded">
                    <img
                      //   src="dist/img/avatar8.jpg"
                      src={
                        (_.toInteger(msg.recipient) === selectedRoom.user_id_1
                          ? selectedRoom?.user_image_1?.includes("https") &&
                            selectedRoom?.user_image_1
                          : selectedRoom?.user_image_2?.includes("https") &&
                            selectedRoom?.user_image_2) ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
                      }
                      alt="user"
                      class="avatar-img"
                    />
                  </div>
                  <div class="media-body">
                    <div class="msg-box">
                      <div>
                        {msg?.file_key && (
                          <button
                            style={{ border: "none", background: "none" }}
                            onClick={() =>
                              downloadFile(
                                "jampackcrm",
                                getFile(msg.file_key)[0]?.Key
                              )
                            }
                          >
                            <FilePreview
                              fileType={getFileExtension(msg?.file_key)}
                              fileUrl={`https://s3.eu-west-2.amazonaws.com/jampackcrm/${msg?.file_key}`}
                            />
                          </button>
                        )}
                        <p>{msg.message}</p>
                        <span class="chat-time">
                          {moment(msg?.created_at).format("YYYY-MM-DD h:mm A")}
                          <span className="float-end">
                            {" "}
                            {msg?.file_key &&
                              (msg?.file_size / (1024 * 1024)).toFixed(2) +
                                " mb"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li class="media sent" key={index}>
                  <div class="media-body">
                    <div class="msg-box">
                      <div>
                        {msg?.file_key && (
                          <>
                            <a
                              style={{ border: "none", background: "none" }}
                              href={msg?.file_url}
                            >
                              <FilePreview
                                fileType={getFileExtension(msg?.file_key)}
                                fileUrl={`https://s3.eu-west-2.amazonaws.com/jampackcrm/${msg?.file_key}`}
                              />
                            </a>
                          </>
                        )}
                        <p>{msg.message}</p>
                        <span class="chat-time">
                          {moment(msg?.created_at).format("YYYY-MM-DD h:mm A")}
                          <span className="float-end">
                            {" "}
                            {msg?.file_key &&
                              (msg?.file_size / (1024 * 1024)).toFixed(2) +
                                " mb"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            )
          ) : (
            <li> No Messages</li>
          )}
        </ul>
      </div>

      <footer class="chat-footer d-flex gap-2">
        <div>
          {selectedFile_ !== null && (
            <div className="rounded">
              <img
                src={selectedFile_ ? URL.createObjectURL(selectedFile_) : ""}
                alt="image"
                className="avatar-img"
                width={50}
              />
            </div>
          )}
        </div>
        <div>
          <button
            className="btn btn-secondary shadow rounded-circle  float-end"
            style={{ width: "35px", height: "35px" }}
            onClick={() =>
              document
                .getElementById("dummy_avatar")
                .scrollIntoView({ behavior: "smooth", block: "end" })
            }
          >
            <FaArrowDown style={{ marginLeft: "-7px", marginBottom: "4px" }} />
          </button>
          {/* <span className="badge badge-danger badge-sm rounded-circle w-25 fw-bold">
            <span style={{ paddingRight: "12px" }}>3</span>
          </span> */}
        </div>
        <div
          className="btn shadow btn-primary rounded-circle btn-file"
          style={{ width: "30px", height: "35px" }}
        >
          <FiPaperclip
            size={17}
            style={{ marginLeft: "-8px", marginBottom: "6px" }}
          />
          <input type="file" className="upload" onChange={handleFileChange} />
        </div>

        <div class="input-group">
          <span class="input-affix-wrapper">
            <input
              type="text"
              //   id="input_msg_send_chatapp"
              name="send-msg"
              class="input-msg-send form-control rounded-input"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && sendMessage(e)}
            />
            <span class="input-suffix">
              <button
                class="btn btn-icon btn-flush-primary btn-rounded btn-send"
                onClick={(e) => sendMessage(e)}
              >
                <span class="icon">
                  {/* <span class="feather-icon"></span> */}
                  <FaArrowAltCircleRight />
                </span>
              </button>
            </span>
          </span>
        </div>
      </footer>
      <div class="chat-info">
        <div data-simplebar class="nicescroll-bar">
          <button type="button" class="info-close btn-close">
            <span aria-hidden="true">×</span>
          </button>
          <div class="text-center">
            <div class="avatar avatar-xxl avatar-rounded">
              <img
                src={
                  (selectedRoom?.user_id_1 === authUser?.id
                    ? selectedRoom?.user_image_2
                    : selectedRoom?.user_image_1) ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="user"
                class="avatar-img"
              />
            </div>
            <div class="cp-name text-truncate mt-2">
              {" "}
              {selectedRoom?.user_id_1 === authUser?.id
                ? selectedRoom?.user_name_2
                : selectedRoom?.user_name_1}
            </div>
            <p class="text-truncate">No phone calls Always busy</p>
          </div>

          <ul class="nav nav-justified nav-light nav-tabs nav-segmented-tabs active-theme mt-4">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#tab_info">
                <span class="nav-link-text">Info</span>
              </a>
            </li>
          </ul>
          <div class="tab-content mt-4">
            <div class="tab-pane fade show active" id="tab_info">
              <div class="collapse-simple mt-3">
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/gn_info"
                      aria-expanded="true"
                    >
                      General Info
                    </a>
                  </div>
                  <div id="gn_info" class="collapse show">
                    <div class="card-body">
                      <ul class="cp-info">
                        <li className="d-flex justify-content-between">
                          <span className="fw-bold fs-6">Name</span>
                          <span>{selectedUser?.name}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className="fw-bold fs-6">Email</span>
                          <span>{selectedUser?.email}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className="fw-bold fs-6">Phone</span>
                          <span>{selectedUser?.phone}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className="fw-bold fs-6">Username</span>
                          <span>{selectedUser?.username}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
