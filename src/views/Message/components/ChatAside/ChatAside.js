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
          <ChatRooms
            rooms={rooms}
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
