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
  return (
    <div>
      {" "}
      <div class="chatapp-aside">
        <header class="aside-header">
          <div>
            <p className="fw-bold fs-4">Groups</p>
          </div>
          <div class="d-flex">
            {/* <div class="dropdown">
              <a
                href="/"
                class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                data-bs-toggle="dropdown"
              >
                <span class="icon">
                  <span class="feather-icon">
                    <FaCog />
                  </span>
                </span>
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="/">
                  <span class="feather-icon dropdown-icon">
                    <FaUserCheck />
                  </span>
                  <span>Active Contacts</span>
                </a>
                <a class="dropdown-item" href="/">
                  <span class="feather-icon dropdown-icon">
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
            </div> */}
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
          <div class="frequent-contact">
            {/* <div class="title-sm text-primary">
              <span>Frequent contact</span>
            </div> */}
            <ul class="hk-list">
              {users?.length > 0 &&
                users.map(
                  (user, index) =>
                    index.length <= 4 && (
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
            </ul>
          </div>
          <ChatRooms
            rooms={rooms}
            authUser={authUser}
            socket={socket}
            onDataFromChild={onDataFromChild}
            messages={messages}
            deleteChatRecord={deleteChatRecord}
            roomsLoading={roomsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAside;
