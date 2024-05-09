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
  const { users } = useSelector((state) => state.user);
  function extractCharactersFromArray(str) {
    const firstCharacter = str?.charAt(0);
    const spaceIndex = str?.indexOf(" ");
    const characterAfterSpace =
      spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : "";
    return { firstCharacter, characterAfterSpace };
  }
  const handleFilterData = (status) => {
    const data =
      rooms_?.length > 0 && rooms_?.filter((room) => room.status === status);
    onFilterDataFromChild(data);
  };
  const handleSearchRoom = (e) => {
    const data =
      rooms_?.length > 0 &&
      rooms_?.filter((room) =>
        // room.user_name_1?.includes(e.target.value) ||
        room.user_name_2?.includes(e.target.value)
      );
  };
  return (
    <div>
      {" "}
      <div class="chatapp-aside">
        <header class="aside-header">
          {/* <a
            class="chatapp-title dropdown-toggle link-dark"
            data-bs-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
          </a> */}

          <h1 className="fs-5 fw-bold">
            <span className="pe-2">
              <FaEnvelope size={30} color="#007D88" />
            </span>
            Message
          </h1>
          {/* <a
            href="/"
            class="btn btn-icon btn-rounded show-compose-popup btn-primary"
          >
            <span class="icon">
              <span class="feather-icon">
                <TiMessages />
              </span>
            </span>
          </a> */}

          {/* <div class="dropdown-menu">
            <a class="dropdown-item" onClick={() => handleFilterData("all")}>
              <span class="feather-icon dropdown-icon">
                <IoIosMail />
              </span>
              <span>Chats</span>
            </a>
            <a
              class="dropdown-item"
              onClick={() => handleFilterData("contacts")}
            >
              <span class="feather-icon dropdown-icon">
                <FaBook />
              </span>
              <span>Contacts</span>
            </a>
            <a class="dropdown-item" onClick={() => handleFilterData("Groups")}>
              <span class="feather-icon dropdown-icon">
                <FaUsers />
              </span>
              <span>Groups</span>
            </a>
            <a
              class="dropdown-item"
              onClick={() => handleFilterData("archived")}
            >
              <span class="feather-icon dropdown-icon">
                <FaArchive />
              </span>
              <span>Archived</span>
            </a>
            <a
              class="dropdown-item"
              onClick={() => handleFilterData("favourite")}
            >
              <span class="feather-icon dropdown-icon">
                <FaStar />
              </span>
              <span>Favorites</span>
            </a>
          </div> */}
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
