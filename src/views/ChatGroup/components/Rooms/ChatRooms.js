import _ from "lodash";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";

const ChatRooms = ({
  rooms,
  authUser,
  socket,
  onDataFromChild,
  messages,
  deleteChatRecord,
}) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const sendDataToParent = () => {
    // Call the callback function with the data from the child
    onDataFromChild(selectedRoom);
  };
  function extractCharactersFromArray(str) {
    const firstCharacter = str?.charAt(0);
    const spaceIndex = str?.indexOf(" ");
    const characterAfterSpace =
      spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : "";
    return { firstCharacter, characterAfterSpace };
  }
  const roomClickHandler = (room) => {
    onDataFromChild(room);
    socket.emit("joinRoom", { roomId: room.room_id });
  };
  function formatRelativeDate(date) {
    const inputDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (inputDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (inputDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return inputDate.toLocaleDateString("en-US", options);
    }
  }
  const handleDeleteChat = (room_id) => {
    console.log("🚀 ~ handleDeleteChat ~ room_id:", room_id);
    deleteChatRecord(room_id);
  };
  return (
    <div>
      {" "}
      <ul class="chat-contacts-list list-group list-group-flush">
        {rooms?.length > 0 ? (
          rooms?.map((room, index) => {
            const messageArray = messages?.filter(
              (msg) => msg.room === room.room_id
            );
            const lastMessage = messageArray[messageArray.length - 1];
            return (
              <li
                class="list-group-item"
                key={index}
                onClick={() => roomClickHandler(room)}
              >
                <div class="media">
                  <div class="media-head">
                    <div class="avatar avatar-sm avatar-rounded position-relative">
                      <span
                        class="initial-wrap bg-primary"
                        style={{ color: "white" }}
                      >
                        {_.capitalize(
                          extractCharactersFromArray(room?.name).firstCharacter
                        ) +
                          _.capitalize(
                            extractCharactersFromArray(room?.name)
                              .characterAfterSpace
                          )}
                      </span>
                      <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                    </div>
                  </div>
                  <div class="media-body">
                    <div>
                      <div class="user-name">{_.capitalize(room?.name)}</div>
                      <div class="user-last-chat">
                        {/* Please send some insights of presentation */}
                        {lastMessage !== undefined && lastMessage.message}
                      </div>
                    </div>
                    <div>
                      <div class="last-chat-time">
                        {lastMessage?.created_at
                          ? formatRelativeDate(
                              lastMessage?.created_at || new Date()
                            )
                          : "..."}
                      </div>
                      {/* <div class="badge badge-primary badge-sm badge-pill">
                        15
                      </div> */}
                      {/* <div class="dropdown action-drp">
                        <a
                          href="/"
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          data-bs-toggle="dropdown"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <CiMenuKebab />
                            </span>
                          </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                          <a class="dropdown-item" href="/">
                            Mute Chat
                          </a>
                          <a class="dropdown-item" href="/">
                            Archive Chat
                          </a>
                          <a
                            class="dropdown-item"
                            onClick={() => handleDeleteChat(room.room_id)}
                          >
                            Delete Chat
                          </a>
                          <a class="dropdown-item link-danger" href="/">
                            Block
                          </a>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <li>No rooms till.</li>
        )}
      </ul>
    </div>
  );
};

export default ChatRooms;
