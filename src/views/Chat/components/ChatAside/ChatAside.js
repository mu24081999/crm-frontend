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
          {/* <a
            class="chatapp-title dropdown-toggle link-dark"
            data-bs-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
          </a> */}
          <h1 className="fs-5 fw-bold">Chat</h1>
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
          {/* <form class="aside-search" role="search">
            <input
              type="text"
              class="form-control"
              placeholder="Search Chats"
              onKeyUp={handleSearchRoom}
            />
          </form> */}
          {/* <div class="frequent-contact">
            <div class="title-sm text-primary">
              <span>Frequent contact</span>
            </div>
            <ul class="hk-list">
              {users?.length > 0 &&
                users.map(
                  (user, index) =>
                    index <= 4 && (
                      <li key={index}>
                        <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                          <span class="initial-wrap">
                            {extractCharactersFromArray(user.name)
                              .firstCharacter +
                              extractCharactersFromArray(user.name)
                                .characterAfterSpace}
                          </span>
                          <div class="badge-icon badge-circle badge-icon-xxs text-white position-bottom-end-overflow-1">
                            <div class="badge-icon-wrap">
                              <i class="ri-group-fill text-light"></i>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 127 127"
                            >
                              <g
                                data-name="Ellipse 302"
                                transform="translate(8 8)"
                                stroke-width="3"
                              >
                                <circle
                                  cx="55.5"
                                  cy="55.5"
                                  r="55.5"
                                  stroke="currentColor"
                                ></circle>
                                <circle
                                  cx="55.5"
                                  cy="55.5"
                                  r="59.5"
                                  fill="currentColor"
                                ></circle>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </li>
                    )
                )}
              {/* <li>
                <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                  <img
                    src="dist/img/avatar1.jpg"
                    alt="user"
                    class="avatar-img"
                  />
                  <div class="badge-icon badge-circle badge-icon-xxs text-white position-bottom-end-overflow-1">
                    <div class="badge-icon-wrap">
                      <i class="ri-group-fill text-light"></i>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 127 127"
                    >
                      <g
                        data-name="Ellipse 302"
                        transform="translate(8 8)"
                        stroke-width="3"
                      >
                        <circle
                          cx="55.5"
                          cy="55.5"
                          r="55.5"
                          stroke="currentColor"
                        ></circle>
                        <circle
                          cx="55.5"
                          cy="55.5"
                          r="59.5"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </div>
                </div>
              </li>
              <li>
                <div class="avatar avatar-sm avatar-soft-danger avatar-rounded position-relative">
                  <span class="initial-wrap">W</span>
                  <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                </div>
              </li>
              <li>
                <div class="avatar avatar-sm avatar-rounded position-relative">
                  <img
                    src="dist/img/avatar8.jpg"
                    alt="user"
                    class="avatar-img"
                  />
                  <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                </div>
              </li>
              <li>
                <div class="avatar avatar-sm avatar-rounded">
                  <img
                    src="dist/img/avatar15.jpg"
                    alt="user"
                    class="avatar-img"
                  />
                </div>
              </li> 
            </ul>
          </div> */}
          <ChatRooms
            rooms={rooms}
            authUser={authUser}
            socket={socket}
            onDataFromChild={onDataFromChild}
            messages={messages}
            deleteChatRecord={deleteChatRecord}
            updateChat={updateChat}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAside;
