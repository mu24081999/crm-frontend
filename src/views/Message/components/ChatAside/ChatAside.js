import React from "react";
import ChatRooms from "../Rooms/ChatRooms";
import { MdConnectWithoutContact } from "react-icons/md";

const ChatAside = ({
  rooms,
  authUser,
  socket,
  onDataFromChild,
  messages,
  deleteChatRecord,
  updateChat,
  onMessagesDataFromChild,
  a2pVerified,
  roomsLoading,
}) => {
  return (
    <div>
      {" "}
      <div class="chatapp-aside">
        <header class="aside-header">
          <h1 className="fs-5 fw-bold">
            <span className="pe-2">
              <MdConnectWithoutContact size={30} color="#007D88" />

              {/* <FaEnvelope  /> */}
            </span>
            Conversation
          </h1>
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
            roomsLoading={roomsLoading}
            authUser={authUser}
            socket={socket}
            onDataFromChild={onDataFromChild}
            messages={messages}
            onMessagesDataFromChild={onMessagesDataFromChild}
            deleteChatRecord={deleteChatRecord}
            updateChat={updateChat}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAside;
