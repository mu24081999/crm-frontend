import React from "react";
import ChatRooms from "../Rooms/ChatRooms";
import { FaCog, FaPlus, FaUserCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const ChatAside = ({
  rooms,
  authUser,
  socket,
  onDataFromChild,
  messages,
  deleteChatRecord,
  updateChat,
  onFilterDataFromChild,
  rooms_,
  roomsLoading,
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
    console.log(data);
  };
  return (
    <div>
      {" "}
      <div class="chatapp-aside">
        <header class="aside-header">
          <h1 className="fs-5 fw-bold">Chat</h1>
          <div class="d-flex">
            <div class="dropdown">
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="/">
                  <span class="feather-icon dropdown-icon">
                    {/* <i data-feather="user-check"></i> */}
                    <FaUserCheck />
                  </span>
                  <span>Active Contacts</span>
                </a>
                <a class="dropdown-item" href="/">
                  <span class="feather-icon dropdown-icon">
                    <i data-feather="message-square"></i>
                  </span>
                  <span>Chat Requests</span>
                </a>
                <a class="dropdown-item" href="/">
                  <span class="feather-icon dropdown-icon">
                    <i data-feather="archive"></i>
                  </span>
                  <span>Archived Chats</span>
                </a>
                <a class="dropdown-item" href="/">
                  <span class="feather-icon dropdown-icon">
                    <i data-feather="toggle-right"></i>
                  </span>
                  <span>Unread Chats</span>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/">
                  Settings
                </a>
                <a class="dropdown-item" href="/">
                  Help
                </a>
                <a class="dropdown-item" href="/">
                  Report a problem{" "}
                </a>
              </div>
            </div>
            <a
              href="/"
              class="btn btn-icon btn-rounded btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#invite_people"
            >
              <span class="icon">
                <span class="feather-icon">
                  {/* <i data-feather="plus"></i> */}
                  <FaPlus />
                </span>
              </span>
            </a>
          </div>
        </header>
        <div data-simplebar class="aside-body">
          <ChatRooms
            rooms={rooms}
            authUser={authUser}
            socket={socket}
            onDataFromChild={onDataFromChild}
            messages={messages}
            deleteChatRecord={deleteChatRecord}
            updateChat={updateChat}
            roomsLoading={roomsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAside;
