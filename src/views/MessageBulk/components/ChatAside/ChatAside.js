import React from "react";
import ChatRooms from "../Rooms/ChatRooms";
import { FaEnvelope } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

const ChatAside = ({
  rooms,
  authUser,
  socket,
  onDataFromChild,
  messages,
  onMessagesDataFromChild,
  onShowAddForm,
  a2pVerified,
}) => {
  return (
    <div>
      {" "}
      <div class="chatapp-aside">
        <header class="aside-header">
          <h1 className="fs-5 fw-bold">
            <span className="pe-2">
              <FaEnvelope size={30} color="#007D88" />
            </span>
            SMS Marketting
          </h1>
          <a
            href="/"
            class="btn btn-icon btn-rounded show-compose-popup btn-primary"
            onClick={() => onShowAddForm(true)}
          >
            <span class="icon">
              <span class="feather-icon">
                {/* <i data-feather="edit"></i> */}
                <TiMessages />
              </span>
            </span>
          </a>
        </header>
        <div data-simplebar class="aside-body">
          <div className="alert alert-warning">
            {a2pVerified ? (
              <></>
            ) : (
              <p>
                A2P Verfification is required for conversation in
                US/Canada.&nbsp;
                <a
                  href="#"
                  data-bs-target="#a2p-modal"
                  data-bs-toggle="modal"
                  className="text-underline"
                >
                  <ins>Add Details</ins>
                </a>
              </p>
            )}
          </div>
          <ChatRooms
            rooms={rooms}
            authUser={authUser}
            a2pVerified={a2pVerified}
            socket={socket}
            onDataFromChild={onDataFromChild}
            messages={messages}
            onMessagesDataFromChild={onMessagesDataFromChild}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAside;
