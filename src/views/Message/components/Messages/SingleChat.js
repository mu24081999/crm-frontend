import _ from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  FaArrowAltCircleRight,
  FaArrowDown,
  FaPhone,
  FaPhoneAlt,
} from "react-icons/fa";
import AWS from "aws-sdk";
import FilePreview from "../../../../components/FilePreview/FilePreview";
import { SocketContext } from "../../../../Context";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/services/users";
import { FiAlertTriangle, FiPaperclip } from "react-icons/fi";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { updateBalanceAfterCall } from "../../../../redux/services/calling";

const SingleChat = ({
  messages,
  selectedRoom,
  authUser,
  socket,
  selectedMessages,
}) => {
  const {
    me,
    call,
    callUser,
    sendTextMessage,
    callingDevice,
    setShowCall,
    setIsDialerOpen,
    setActiveCall,
    setUserState,
    setCallStatus,
    setIsDial,
    setShowContacts,
    setActiveCallSid,
    setInputValue,
  } = useContext(SocketContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [usersArray, setUsersArray] = useState(null);
  const { users } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedMessages?.length > 0) {
      document
        .getElementById("dummy_avatar")
        .scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [selectedMessages]);
  useEffect(() => {
    if (selectedUser && me && token) {
      // callUser(selectedUser?.socket_id, authUser.name);
    }
  }, [selectedUser, authUser, callUser, call, me, token]);
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

  const [files, setFiles] = useState([]);

  const [message, setMessage] = useState();

  const sendMessage = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const messageData = {
        from: {
          phone: authUser.phone,
          name: authUser.name,
          avatar: authUser.avatar,
          socket_id: authUser.socket_id,
          accountSid: authUser?.accountSid,
          authToken: authUser?.authToken,
        },
        to: {
          phone: selectedRoom.phone,
          name: selectedRoom.firstname + selectedRoom?.lastname,
          avatar: selectedRoom.avatar,
        },
        // to: "+923174660027",
        user_id: authUser.id,
        message: message,
      };
      sendTextMessage(messageData);

      setMessage("");
    }
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    document
      .getElementById("dummy_avatar")
      .scrollIntoView({ behavior: "smooth", block: "end" });
    // Configure AWS
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    // Create S3 service object
    const s3 = new AWS.S3();

    const fetchObjects = async () => {
      const params = {
        Bucket: "jampackcrm",
      };
      try {
        const data = await s3.listObjectsV2(params).promise();
        setFiles(data.Contents);
      } catch (error) {
        console.error("Error fetching objects:", error);
      }
    };

    fetchObjects();
  }, []);
  const downloadFile = async (bucketName, objectKey) => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };
    try {
      const data = await s3.getObject(params).promise();
      const url = URL.createObjectURL(new Blob([data.Body]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", objectKey);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
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
  function extractCharactersFromArray(str) {
    const firstCharacter = str?.charAt(0);
    const spaceIndex = str?.indexOf(" ");
    const characterAfterSpace =
      spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : "";
    return { firstCharacter, characterAfterSpace };
  }
  const handleCallUser = (phoneNumber) => {
    const outgoingCall = callingDevice?.connect({ To: phoneNumber });
    outgoingCall.on("accept", (call) => {
      console.log(call, "call accepted");
      setShowCall(true);
      setIsDialerOpen(true);
      setActiveCall(call);
      setUserState("ON_CALL");
      setIsDial(false);
      setShowContacts(false);
      setCallStatus("STARTED");
      setInputValue(phoneNumber);
      console.log("Call accepted");
      // Capture callSid from the accepted call
      const callSid = call.parameters.CallSid;
      setActiveCallSid(callSid);
    });

    outgoingCall.on("reject", () => {
      setShowCall(false);
      setUserState("READY");
      // setTimer({ hours: 0, mins: 0, sec: 0 });
      setIsDial(true);
      setIsDialerOpen(false);
      setShowContacts(false);
      setCallStatus(null);

      console.log("Call accepted");
    });
    outgoingCall.on("disconnect", () => {
      dispatch(
        updateBalanceAfterCall(token, {
          accountSid: authUser.accountSid,
          authToken: authUser.authToken,
          user_id: authUser.id,
        })
      );
      // setTimer({ hours: 0, mins: 0, sec: 0 });
      setShowCall(false);
      setIsDialerOpen(false);
      setUserState("READY");
      setIsDial(true);
      setShowContacts(false);
      console.log("Call disconnected");
      setCallStatus(null);
    });
  };

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
            {/* <div class="avatar avatar-sm avatar-rounded position-relative">
              <img
                src={
                  selectedRoom?.avatar ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="user"
                class="avatar-img"
              />
              <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
            </div> */}
            <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
              <span class="initial-wrap">
                {extractCharactersFromArray(
                  selectedRoom.firstname + " " + selectedRoom.lastname
                ).firstCharacter +
                  extractCharactersFromArray(
                    selectedRoom.firstname + " " + selectedRoom.lastname
                  ).characterAfterSpace}
              </span>
            </div>
          </div>
          <div class="media-body">
            <div class="user-name">
              {" "}
              {selectedRoom?.firstname +
                // " " +
                // selectedRoom?.middlename +
                " " +
                selectedRoom?.lastname}
            </div>
            <div class="user-status">{selectedRoom?.phone}</div>
          </div>
        </div>
        <ReactTooltip
          id="call_user_button"
          place="left"
          content="Call To User"
        />
        <div
          className="btn btn-primary rounded-circle btn-icon float-end"
          style={{ marginRight: "30%" }}
          onClick={() => handleCallUser(selectedRoom?.phone)}
          data-tooltip-id="call_user_button"
        >
          <FaPhone className="pt-2" size={20} />
        </div>
      </header>
      <div data-simplebar id="chat_body" class="chat-body">
        <ul id="dummy_avatar" class="list-unstyled chat-single-list">
          {selectedMessages?.length > 0 ? (
            selectedMessages.map((msg, index) =>
              msg?.from_phone !== authUser?.phone ? (
                <li class="media received" key={index}>
                  <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                    <span class="initial-wrap">
                      {extractCharactersFromArray(
                        selectedRoom.firstname + " " + selectedRoom.lastname
                      ).firstCharacter +
                        extractCharactersFromArray(
                          selectedRoom.firstname + " " + selectedRoom.lastname
                        ).characterAfterSpace}
                    </span>
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
                          {moment(message?.created_at).format("h:mm A")}
                          <span className="float-end">
                            {" "}
                            {msg?.file_key &&
                              (msg?.file_size / (1024 * 1024)).toFixed(2) +
                                " mb"}
                          </span>
                        </span>
                      </div>
                      <div class="msg-action">
                        <a
                          href="/"
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="corner-up-right"></i>
                            </span>
                          </span>
                        </a>
                        <a
                          href="/"
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          data-bs-toggle="dropdown"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                          <a class="dropdown-item" href="/">
                            Forward
                          </a>
                          <a class="dropdown-item" href="/">
                            Copy
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li class="media sent d-flex" key={index}>
                  <div class="media-body" style={{ display: "flex" }}>
                    <div className="d-flex">
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
                            {moment(message?.created_at).format("h:mm A")}
                            <span className="float-end">
                              {" "}
                              {msg?.file_key &&
                                (msg?.file_size / (1024 * 1024)).toFixed(2) +
                                  " mb"}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="">
                        {(msg?.sid === null || msg?.status === "Failed") && (
                          <div class="media-head">
                            <div class="avatar avatar-sm avatar-secondary position-relative avatar-rounded">
                              <Popup
                                // open={isDialerOpen}
                                trigger={
                                  <button
                                    className="btn btn-icon btn-floating btn-secondary btn-lg btn-rounded shadow-lg"
                                    id="dialer_button"
                                  >
                                    <FiAlertTriangle
                                      color="red"
                                      size={"24"}
                                      style={{ marginTop: "-15%" }}
                                    />
                                  </button>
                                }
                                position="bottom right"
                              >
                                <p className="">{msg?.message_error}</p>
                              </Popup>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            )
          ) : (
            <li> No Messages</li>
          )}

          {/* <li class="media media-attachment received">
            <div class="avatar avatar-xs avatar-rounded">
              <img src="dist/img/avatar8.jpg" alt="user" class="avatar-img" />
            </div>
            <div class="media-body msg-docs">
              <div class="msg-box">
                <div>
                  <div class="media">
                    <div class="avatar avatar-icon avatar-sm avatar-blue">
                      <span class="initial-wrap fs-3">
                        <i class="ri-file-excel-2-fill"></i>
                      </span>
                    </div>
                    <div class="media-body">
                      <p class="file-name">Website_content.xls</p>
                      <p class="file-size">2,635 KB</p>
                    </div>
                  </div>
                  <div class="file-overlay">
                    <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="arrow-down"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="msg-box">
                <div>
                  <div class="media">
                    <div class="avatar avatar-icon avatar-sm avatar-warning">
                      <span class="initial-wrap fs-3">
                        <i class="ri-file-zip-fill"></i>
                      </span>
                    </div>
                    <div class="media-body">
                      <p class="file-name">themeforest-pack.zip</p>
                      <p class="file-size">2.45 GB</p>
                    </div>
                  </div>
                  <div class="file-overlay">
                    <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="arrow-down"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>

                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="day-sep">
            <span>Today</span>
          </li>
          <li class="media sent">
            <div class="media-body">
              <div class="msg-box">
                <div>
                  <p>
                    Anyways, I am working on something that you would like to
                    know. This project is based on angular js and you are the
                    keeda in it. I need you help in it.
                  </p>
                  <span class="chat-time">11:52 PM</span>
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="media media-attachment received">
            <div class="avatar avatar-xs avatar-rounded">
              <img src="dist/img/avatar8.jpg" alt="user" class="avatar-img" />
            </div>
            <div class="media-body msg-imgs">
              <div class="msg-box">
                <div>
                  <img
                    class="d-block img-fluid"
                    src="dist/img/giphy.gif"
                    alt="gif"
                  />
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="media sent">
            <div class="media-body">
              <div class="msg-box">
                <div>
                  <p>
                    Haha, this joke is hilarious. Is it what your heart feel
                    about the salary? 😍
                  </p>
                  <span class="chat-time">10:52 PM</span>
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="media received">
            <div class="avatar avatar-xs avatar-rounded">
              <img src="dist/img/avatar8.jpg" alt="user" class="avatar-img" />
            </div>
            <div class="media-body">
              <div class="msg-box">
                <div>
                  <p>
                    Hey Ben, just a reminder that you are coming for the meeting
                    today in the conference. We are proposing a change in the
                    client briefing.
                  </p>
                  <span class="chat-time">9:20 AM</span>
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li> */}
        </ul>
      </div>

      <footer class="chat-footer d-flex gap-2">
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
        {/* <div
          className="btn shadow btn-primary rounded-circle btn-file"
          style={{ width: "30px", height: "35px" }}
        >
          <FiPaperclip
            size={17}
            style={{ marginLeft: "-8px", marginBottom: "6px" }}
          />
          <input type="file" className="upload" onChange={handleFileChange} />
        </div> */}

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
        {/* <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="smile"></i>
            </span>
          </span>
        </button> */}
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
              {selectedRoom?.firstname +
                " " +
                selectedRoom?.middlename +
                " " +
                selectedRoom?.lastname}
            </div>
            <p class="text-truncate">No phone calls Always busy</p>
          </div>

          <ul class="nav nav-justified nav-light nav-tabs nav-segmented-tabs active-theme mt-4">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#tab_info">
                <span class="nav-link-text">Info</span>
              </a>
            </li>
            {/* <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#tab_files">
                <span class="nav-link-text">Files</span>
              </a>
            </li> */}
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
                          <span className="fw-bold fs-6">First Name</span>
                          <span>{selectedRoom?.firstname}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className="fw-bold fs-6">Middle Name</span>
                          <span>{selectedRoom?.middlename}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className="fw-bold fs-6">Last Name</span>
                          <span>{selectedRoom?.lastname}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className="fw-bold fs-6">Email</span>
                          <span>{selectedRoom?.email}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className="fw-bold fs-6">Phone</span>
                          <span>{selectedRoom?.phone}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/social_profile"
                      aria-expanded="true"
                    >
                      Social Profile{" "}
                    </a>
                  </div>
                  <div id="social_profile" class="collapse show">
                    <div class="card-body">
                      <ul class="hk-list hk-list-sm">
                        <li>
                          <button class="btn btn-icon btn-rounded btn-primary">
                            <span class="icon">
                              <i class="fab fa-behance"></i>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-rounded btn-warning">
                            <span class="icon">
                              <i class="fab fa-google-drive"></i>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-rounded btn-info">
                            <span class="icon">
                              <i class="fab fa-dropbox"></i>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-rounded btn-dark">
                            <span class="icon">
                              <i class="fab fa-github"></i>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-rounded btn-danger">
                            <span class="icon">
                              <i class="fab fa-google"></i>
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
                {/* <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/biography"
                      aria-expanded="true"
                    >
                      Biography{" "}
                    </a>
                  </div>
                  <div id="biography" class="collapse show">
                    <div class="card-body">
                      <p>No information</p>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/settings"
                      aria-expanded="true"
                    >
                      Settings{" "}
                    </a>
                  </div>
                  <div id="settings" class="collapse show">
                    <div class="card-body">
                      <ul class="cp-action">
                        <li>
                          <a href="/">Clear Chat</a>
                        </li>
                        <li>
                          <a href="/">
                            <span class="text-danger">Block Contact</span>
                          </a>
                        </li>
                        <li>
                          <a href="/">Somthing's Wrong</a>
                        </li>
                      </ul>
                      <a href="/" class="d-block text-dark fs-7 mb-10">
                        Give feedback and report conversation
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <div class="tab-pane fade" id="tab_files">
              <form role="search">
                <input
                  type="text"
                  class="form-control search-files"
                  placeholder="Search files"
                />
              </form>
              <div class="collapse-simple mt-3">
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/files_collapse"
                      aria-expanded="true"
                    >
                      Yesterday
                    </a>
                  </div>
                  <div id="files_collapse" class="collapse show">
                    <div class="card-body">
                      <ul class="cp-files">
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-blue">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-file-excel-2-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">website_content.exl</p>
                                <p class="file-size">2,635 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-light">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-file-text-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">jampack.pdf</p>
                                <p class="file-size">1.3 GB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-warning">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-file-zip-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">themeforest-pack.zip</p>
                                <p class="file-size">2.45 GB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-logo avatar-sm">
                                <span class="initial-wrap">
                                  <img src="dist/img/6image.png" alt="user" />
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">
                                  bruce-mars-fiEG-Pk6ZASFPk6ZASF
                                </p>
                                <p class="file-size">4,178 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-logo avatar-sm">
                                <span class="initial-wrap">
                                  <img src="dist/img/2image.png" alt="user" />
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">
                                  jonas-kakaroto-KIPqvvTKIPqvvT
                                </p>
                                <p class="file-size">951 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/files_collapse_1"
                      aria-expanded="true"
                    >
                      23 April
                    </a>
                  </div>
                  <div id="files_collapse_1" class="collapse show">
                    <div class="card-body">
                      <ul class="cp-files">
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-light">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-keynote-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">presentation.keynote</p>
                                <p class="file-size">20 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-warning">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-file-zip-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">PACK-TRIAL.zip</p>
                                <p class="file-size">2.45 GB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-sm">
                                <img
                                  src="dist/img/img-thumb1.jpg"
                                  alt="user"
                                  class="avatar-img"
                                />
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">
                                  joel-mott-LaK153ghdigaghdi
                                </p>
                                <p class="file-size">3,028 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
