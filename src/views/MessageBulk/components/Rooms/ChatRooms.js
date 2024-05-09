import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
const ChatRooms = ({
  rooms,
  authUser,
  socket,
  onDataFromChild,
  messages,
  deleteChatRecord,
  onMessagesDataFromChild,
  updateChat,
}) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const sendDataToParent = () => {
    // Call the callback function with the data from the child
    onDataFromChild(selectedRoom);
  };

  const roomClickHandler = (contact) => {
    setSelectedRoom(contact);
    // sendDataToParent();
    onDataFromChild(contact);
    const messagesData =
      messages?.length > 0 &&
      messages?.filter(
        (message) =>
          (message.from_phone === authUser.phone &&
            message.to_phone === contact.to_phone) ||
          (message.to_phone === authUser.phone &&
            message.from_phone === contact.to_phone)
      );
    onMessagesDataFromChild(messagesData);

    // socket.emit("joinRoom", { roomId: contact.name });
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
    deleteChatRecord(room_id);
  };
  const handleEditChat = (room_id, status) => {
    updateChat(room_id, { status: status });
  };
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
      <ul class="chat-contacts-list list-group list-group-flush">
        {rooms?.length > 0 ? (
          rooms?.map((contact, index) => {
            const messageArray = messages?.filter(
              (msg) =>
                msg.from_phone === authUser?.phone &&
                msg.to_phone === contact.to_phone
            );
            const lastMessage = messageArray[messageArray.length - 1];
            return (
              <li
                class="list-group-item"
                key={index}
                onClick={() => roomClickHandler(contact)}
              >
                <div class="media">
                  <div class="media-head">
                    <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                      <span class="initial-wrap">
                        <FaUserAlt />
                      </span>
                    </div>
                  </div>
                  <div class="media-body">
                    <div>
                      <div class="user-name">{contact?.to_phone}</div>
                    </div>
                    <div>
                      <div class="last-chat-time">
                        {lastMessage?.created_at
                          ? formatRelativeDate(
                              lastMessage?.created_at || new Date()
                            )
                          : "..."}
                      </div>
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
