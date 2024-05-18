import React from "react";
import ChatRooms from "../Rooms/ChatRooms";
import {
  FaArchive,
  FaBook,
  FaCog,
  FaEnvelope,
  FaPlus,
  FaStar,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoIosMail } from "react-icons/io";
import { TiMessages } from "react-icons/ti";

const ChatAside = ({
  rooms,
  authUser,
  socket,
  onDataFromChild,
  messages,
  deleteChatRecord,
  updateChat,
  onFilterDataFromChild,
  onMessagesDataFromChild,
  rooms_,
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
            SMS
          </h1>
        </header>
        <div data-simplebar class="aside-body">
          <form class="aside-search" role="search">
            <input
              type="text"
              class="form-control"
              placeholder="Search Chats"
              // onKeyUp={handleSearchRoom}
            />
          </form>
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
