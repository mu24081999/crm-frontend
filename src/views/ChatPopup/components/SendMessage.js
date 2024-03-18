import React, { useContext, useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { SocketContext } from "../../../Context";
const SendMessage = ({ selectedContact, authUser }) => {
  const [message, setMessage] = useState("");
  const { sendTextMessage } = useContext(SocketContext);
  const handleSendMessage = (event) => {
    if (event.key === "Enter") {
      const messageData = {
        from: {
          phone: authUser.phone,
          name: authUser.name,
          avatar: authUser.avatar,
          socket_id: authUser.socket_id,
        },
        to: {
          phone: selectedContact.phone,
          name: selectedContact.firstname + selectedContact?.lastname,
          avatar: selectedContact.avatar,
        },
        // to: "+923174660027",
        message: message,
      };
      sendTextMessage(messageData);

      setMessage("");
    }
  };
  return (
    <footer>
      <div className="input-group">
        <div className="input-group-text overflow-show border-0">
          <button
            className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded dropdown-toggle no-caret"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="icon">
              <span className="feather-icon">
                <i data-feather="share"></i>
              </span>
            </span>
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              <div className="d-flex align-items-center">
                <div className="avatar avatar-icon avatar-xs avatar-soft-primary avatar-rounded me-3">
                  <span className="initial-wrap">
                    <i className="ri-image-line"></i>
                  </span>
                </div>
                <div>
                  <span className="h6 mb-0">Photo or Video Library</span>
                </div>
              </div>
            </a>
            <a className="dropdown-item" href="#">
              <div className="d-flex align-items-center">
                <div className="avatar avatar-icon avatar-xs avatar-soft-info avatar-rounded me-3">
                  <span className="initial-wrap">
                    <i className="ri-file-4-line"></i>
                  </span>
                </div>
                <div>
                  <span className="h6 mb-0">Documents</span>
                </div>
              </div>
            </a>
            <a className="dropdown-item" href="#">
              <div className="d-flex align-items-center">
                <div className="avatar avatar-icon avatar-xs avatar-soft-success avatar-rounded me-3">
                  <span className="initial-wrap">
                    <i className="ri-map-pin-line"></i>
                  </span>
                </div>
                <div>
                  <span className="h6 mb-0">Location</span>
                </div>
              </div>
            </a>
            <a className="dropdown-item" href="#">
              <div className="d-flex align-items-center">
                <div className="avatar avatar-icon avatar-xs avatar-soft-blue avatar-rounded me-3">
                  <span className="initial-wrap">
                    <i className="ri-contacts-line"></i>
                  </span>
                </div>
                <div>
                  <span className="h6 mb-0">Contact</span>
                </div>
              </div>
            </a>
          </div>
        </div>
        <input
          type="text"
          //   id="input_msg_chat_popup"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyUp={(e) => handleSendMessage(e)}
          name="send-msg"
          className="input-msg-send form-control border-0 shadow-none"
          placeholder="Type something..."
        />
        <div className="input-group-text overflow-show border-0">
          <button className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded">
            <span className="icon">
              <span className="feather-icon">
                {/* <i data-feather="smile"></i> */}
                <FaRegSmile />
              </span>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default SendMessage;
