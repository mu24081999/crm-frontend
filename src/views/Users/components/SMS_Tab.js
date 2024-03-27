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
          phone: authUser?.phone,
          name: authUser?.name,
          avatar: authUser?.avatar,
          socket_id: authUser?.socket_id,
        },
        to: {
          phone: contactDetails?.phone,
          name: contactDetails?.firstname + contactDetails?.lastname,
          avatar: contactDetails?.avatar,
        },
        // to: "+923174660027",
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
          style={{ height: "550px", overflow: "scroll" }}
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
                        <span className="initial-wrap">
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
                      <div className="alert alert-primary mx-1">
                        <div className="msg-box">
                          <div>
                            <p>{message?.message}</p>
                            <span className="chat-time">
                              {moment(message?.created_at).format("HH:mm a")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li className="media received w-100 d-flex justify-content-end">
                      <div className="rounded-3 d-flex">
                        <div className="alert alert-success mx-1">
                          <div className="msg-box">
                            <div>
                              <p>{message?.message}</p>
                              <span className="chat-time">
                                {moment(message?.created_at).format("HH:mm a")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="avatar avatar-sm avatar-primary position-relative avatar-rounded">
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
                        </div>
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </div>
          ))}
        </ul>

        <footer className="chat-footer fixed-bottom rounded p-2 w-75 d-flex justify-content-end ">
          <div className="d-flex flex-wrap">
            <div className="form-group">
              <span className="input-affix-wrapper">
                <input
                  type="text"
                  //   id="input_msg_chat_popup"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  onKeyUp={(e) => handleSendMessage(e)}
                  name="send-msg"
                  className=" form-control shadow-none"
                  placeholder="Type something..."
                />
                <span className="input-suffix">
                  <button
                    className="btn btn-icon btn-flush-primary btn-rounded btn-send"
                    //   onClick={sendMessage}
                  >
                    <span className="icon">
                      {/* <span className="feather-icon"></span> */}
                      <FaArrowAltCircleRight />
                    </span>
                  </button>
                </span>
              </span>
            </div>
            <div
              className="btn btn-dark rounded-circle btn-file h-75"
              style={{ width: "40px" }}
            >
              {/* Attach files */}
              <FiPaperclip size={20} style={{ marginLeft: "-5px" }} />

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
