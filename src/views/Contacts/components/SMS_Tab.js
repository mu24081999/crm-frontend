import _ from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaArrowAltCircleRight,
  FaArrowDown,
  FaClipboard,
  FaFile,
  FaFileAlt,
  FaSmile,
} from "react-icons/fa";
import { SocketContext } from "../../../Context";
import { FiPaperclip } from "react-icons/fi";
import "./sms.css";
const SMS_Tab = ({ selectedMessages, authUser, contactDetails, activeBar }) => {
  const containerRef = useRef(null);
  const { sendTextMessage, messagesArray } = useContext(SocketContext);
  function extractCharactersFromArray(str) {
    const firstCharacter = str?.charAt(0);
    const spaceIndex = str?.indexOf(" ");
    const characterAfterSpace =
      spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : "";
    return { firstCharacter, characterAfterSpace };
  }

  const [message, setMessage] = useState("");
  const handleSendMessage = (event) => {
    if (event.key === "Enter") {
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
          phone: contactDetails?.phone,
          name: contactDetails?.firstname + contactDetails?.lastname,
          avatar: contactDetails?.avatar,
        },
        // to: "+923174660027",
        user_id: authUser?.id,
        message: message,
      };
      sendTextMessage(messageData);

      setMessage("");
      containerRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  useEffect(() => {
    // Scroll to the bottom of the container when the component mounts or updates
    containerRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []); // Empty dependency array ensures this effect runs only once after initial
  return (
    <div className="tab-content mt-7">
      <div
        className={`tab-pane fade show ${
          activeBar === "SMS_tab" ? "active" : ""
        }`}
        id="SMS_tab"
      >
        <ul
          className="list-unstyled"
          style={{ maxHeight: "35rem", overflow: "scroll" }}
        >
          {Object.entries(selectedMessages).map(([date, messages]) => (
            <div key={date}>
              <li className="text-center fs-6 fw-bold p-2">
                <hr data-content="AND" className="hr-text" />
                <span>{date}</span>
              </li>
              {messages?.map((message, index) => (
                <div key={index} ref={containerRef}>
                  {message?.from_phone !== authUser.phone ? (
                    <li className="media received  rounded-3 w-25 ">
                      <div className="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                        <span
                          className="initial-wrap"
                          style={{ width: "48px" }}
                        >
                          {extractCharactersFromArray(
                            contactDetails?.firstname +
                              " " +
                              contactDetails?.lastname
                          ).firstCharacter +
                            extractCharactersFromArray(
                              contactDetails?.firstname +
                                " " +
                                contactDetails?.lastname
                            ).characterAfterSpace}
                        </span>
                      </div>
                      <div className="alert alert-primary mx-1  border border-primary">
                        <div
                          className="msg-box"
                          style={{ width: "max-content" }}
                        >
                          <div>
                            <p>{message?.message}</p>
                            <span
                              className="chat-time float-end"
                              style={{ fontSize: "12px" }}
                            >
                              {moment(message?.created_at).format("HH:mm a")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li className="media sent w-100 d-flex justify-content-end">
                      <div className="rounded-3 d-flex">
                        <div className="alert bg-primary mx-1 border border-primary">
                          <div
                            className="msg-box"
                            style={{ width: "max-content" }}
                          >
                            <div className="text-white">
                              <p>{message?.message}</p>
                              <span
                                className="chat-time float-end"
                                style={{ fontSize: "12px" }}
                              >
                                {moment(message?.created_at).format("HH:mm a")}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <div className="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                          <span className="initial-wrap">
                            {extractCharactersFromArray(
                              contactDetails.firstname +
                                " " +
                                contactDetails.lastname
                            ).firstCharacter +
                              extractCharactersFromArray(
                                contactDetails.firstname +
                                  " " +
                                  contactDetails.lastname
                              ).characterAfterSpace}
                          </span>
                        </div> */}
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </div>
          ))}
        </ul>

        <footer
          className="chat-footer fixed-bottom rounded d-flex  "
          style={{ marginLeft: "50%" }}
        >
          <div className="d-flex flex-wrap">
            <div className="form-group">
              <span className="input-affix-wrapper" style={{ width: "500px" }}>
                <input
                  type="text"
                  //   id="input_msg_chat_popup"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  onKeyUp={(e) => handleSendMessage(e)}
                  name="send-msg"
                  className=" form-control w-100 rounded-pill"
                  placeholder="Type something..."
                />
                <span className="input-suffix" style={{ marginRight: "-10px" }}>
                  <button className="btn btn-icon btn-flush-primary btn-rounded btn-send">
                    <span className="icon">
                      <FaArrowAltCircleRight />
                    </span>
                  </button>
                </span>
              </span>
            </div>
            <div
              className="btn btn-primary shadow rounded-circle btn-file m-1"
              style={{ width: "35px", height: "35px" }}
            >
              {/* Attach files */}
              <FiPaperclip
                size={18}
                style={{ marginLeft: "-8px", marginTop: "-4px" }}
              />

              <input type="file" className="upload" />
            </div>
            {/* <div className="">
              <input type="file" className="form-control" />
            </div> */}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SMS_Tab;
