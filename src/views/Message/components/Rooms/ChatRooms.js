import React, { useMemo, useState } from "react";
const ChatRooms = ({
  rooms,
  onDataFromChild,
  messages,
  deleteChatRecord,
  onMessagesDataFromChild,
  updateChat,
}) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [prevData, setPrevData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  useMemo(() => {
    setRoomsData(rooms);
    setPrevData(rooms);
  }, [rooms]);
  const roomClickHandler = (contact) => {
    setSelectedRoom(contact);
    // sendDataToParent();
    onDataFromChild(contact);
    const messagesData =
      // messages?.length > 0 &&
      messages?.filter(
        (message) =>
          message.to_phone === contact.phone ||
          message.from_phone === contact.phone
      );
    onMessagesDataFromChild(messagesData);
    document
      .getElementById("dummy_avatar")
      ?.scrollIntoView({ behavior: "smooth", block: "end" });

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
  const handleSearchRoom = (e) => {
    if (e.target.value !== "" || e.target.value !== undefined) {
      const filterData =
        prevData?.length > 0 &&
        prevData?.filter(
          (prev) =>
            prev?.phone?.includes(e.target.value) ||
            prev?.firstname?.includes(e.target.value)
        );
      setRoomsData(filterData);
    } else {
      setRoomsData(prevData);
    }
  };
  return (
    <div>
      {" "}
      <form class="aside-search" role="search">
        <input
          type="text"
          class="form-control"
          placeholder="Search Chats"
          onKeyUp={handleSearchRoom}
        />
      </form>
      <ul class="chat-contacts-list list-group list-group-flush">
        {roomsData?.length > 0 ? (
          roomsData?.map((contact, index) => {
            const messageArray = messages?.filter(
              (msg) => msg.room === contact.name
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
                    {/* <div class="avatar avatar-sm avatar-rounded position-relative">
                      <img
                        //   src="dist/img/avatar2.jpg"
                        src={
                          contact?.avatar ||
                          "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                        }
                        alt="user"
                        class="avatar-img"
                      />
                      <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                    </div> */}
                    <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                      <span class="initial-wrap">
                        {extractCharactersFromArray(
                          contact.firstname + " " + contact.lastname
                        ).firstCharacter +
                          extractCharactersFromArray(
                            contact.firstname + " " + contact.lastname
                          ).characterAfterSpace}
                      </span>
                    </div>
                  </div>
                  <div class="media-body">
                    <div>
                      <div class="user-name">
                        {contact?.firstname +
                          " " +
                          // contact?.middlename +
                          contact?.lastname}
                      </div>
                      <div class="user-last-chat">
                        {/* Please send some insights of presentation */}
                        {/* {lastMessage !== undefined && lastMessage.message} */}
                        {contact?.phone}
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
                          <a
                            class="dropdown-item"
                            onClick={() =>
                              handleEditChat(contact?.firstname, "muted")
                            }
                          >
                            Mute Chat
                          </a>
                          <a
                            class="dropdown-item"
                            onClick={() =>
                              handleEditChat(contact?.firstname, "archived")
                            }
                          >
                            Archive Chat
                          </a>
                          <a
                            class="dropdown-item"
                            onClick={() => handleDeleteChat(contact?.firstname)}
                          >
                            Delete Chat
                          </a>
                          <a
                            class="dropdown-item link-danger"
                            onClick={() =>
                              handleEditChat(contact?.firstname, "blocked")
                            }
                          >
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
