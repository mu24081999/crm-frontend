import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ChatAside from "./components/ChatAside/ChatAside";
import SingleChat from "./components/Messages/SingleChat";
import AudioCall from "./components/AudioCall/AudioCall";
import VideoCall from "./components/VideoCall/VideoCall";
import InvitePeople from "./components/InvitePeople/InvitePeople";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/services/users";
import io from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";
import { getContactsList } from "../../redux/services/contact";
import { getMessagesList } from "../../redux/services/message";
import { SocketContext } from "../../Context";

const MessageContent = () => {
  const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
  const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
  const { messagesArray } = useContext(SocketContext);
  const [selectedMessages, setSelectedMessages] = useState({});
  const { messages: defaultMessages } = useSelector((state) => state.message);

  //Socket connection
  const socket = useMemo(() => io(socketURL), [socketURL]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  const [contactsData, setContactsData] = useState([]);

  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const [rooms_, setRooms_] = useState([]);
  const { contacts } = useSelector((state) => state.contact);

  const dispatch = useDispatch();
  useEffect(() => {
    setMessages(defaultMessages);
  }, [defaultMessages]);
  useEffect(() => {
    dispatch(getContactsList(token));
    dispatch(getMessagesList(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (contacts?.length > 0) {
      // const groupedUsers = contacts?.reduce((acc, contact) => {
      //   const firstChar = contact?.firstname?.charAt(0)?.toUpperCase(); // Get the first character and convert to uppercase
      //   acc[firstChar] = [...(acc[firstChar] || []), contact]; // Add user to corresponding group
      //   return acc;
      // }, {});
      setContactsData(contacts);
    }
  }, [contacts]);

  const getRooms = useCallback(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(`${backendURL}/user/chat/get-rooms`, config)
        .then((response) => {
          setRooms_(response.data.data.chatRoomsData);
          const data = response?.data?.data?.chatRoomsData?.filter(
            (room) => room.status !== "blocked" && room.status !== "archived"
          );
          setRooms(data);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendURL, token]);
  const deleteChatRecord = useCallback(
    async (room_id) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        await axios
          .delete(
            `${backendURL}/user/chat/delete-group-chat-history/${room_id}`,
            config
          )
          .then((response) => {
            getRooms();
          });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendURL, token, getRooms]
  );
  const updateChat = useCallback(
    async (room_id, data) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        await axios
          .put(`${backendURL}/user/chat/update-chat/${room_id}`, data, config)
          .then((response) => {
            getRooms();
          });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendURL, token, getRooms]
  );
  // const getChats = useCallback(
  //   async (room) => {
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-access-token": token,
  //         },
  //       };
  //       await axios
  //         .get(
  //           `${backendURL}/user/chat/chat-history/${room?.user_id_1}/${room?.user_id_2}`,
  //           config
  //         )
  //         .then((response) => {
  //           setMessages(response.data?.data.chatData);
  //         });
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   },
  //   [backendURL, token]
  // );
  // useMemo(() => {
  //   if (selectedRoom) {
  //     getChats(selectedRoom);
  //   }
  // }, [getChats, selectedRoom]);
  const getAllChats = useCallback(
    async (room) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        await axios
          .get(`${backendURL}/user/chat/get-chats`, config)
          .then((response) => {
            setAllMessages(response.data?.data.chatData);
          });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendURL, token]
  );
  // useMemo(() => {
  //   if (selectedRoom) {
  //     getChats(selectedRoom);
  //   }
  // }, [getChats, selectedRoom]);
  useEffect(() => {
    if (token) {
      getRooms();
      getAllChats();
      dispatch(getUsers(token));
    }
  }, [token, dispatch, getRooms, getAllChats]);
  // useEffect(() => {
  //   // Listen for incoming messages
  //   socket.on("message_added", (data) => {
  //     // setMessages([...messages, data]);
  //     setMessages(data);
  //   });
  //   socket.on("room_added", (data) => {
  //     setRooms(data);
  //   });

  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, [socket]);
  useEffect(() => {
    setMessages(messagesArray);
    // const categorizeMessagesByDate =
    //   messagesArray?.length > 0 &&
    //   messagesArray?.reduce((result, message) => {
    //     const date = message.created_at.slice(0, 10); // Extract date from created_at
    //     if (!result[date]) {
    //       result[date] = []; // Initialize array for the date if it doesn't exist
    //     }
    //     result[date].push(message); // Push message to the array for the date
    //     return result;
    //   }, {});
    setSelectedMessages(messagesArray);
  }, [messagesArray]);
  const handleDataFromChild = (data) => {
    setSelectedRoom(data);
  };
  const handleFilterDataFromChild = (data) => {
    setRooms(data);
  };
  const handleMessagesDataFromChild = (data) => {
    // const categorizeMessagesByDate =
    //   data?.length > 0 &&
    //   data?.reduce((result, message) => {
    //     const date = message.created_at.slice(0, 10); // Extract date from created_at
    //     if (!result[date]) {
    //       result[date] = []; // Initialize array for the date if it doesn't exist
    //     }
    //     result[date].push(message); // Push message to the array for the date
    //     return result;
    //   }, {});

    setSelectedMessages(data);
  };
  return (
    <div>
      {/* <!-- Wrapper --> */}

      {/* <!-- Main Content --> */}
      <div class="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div class="hk-pg-body py-0">
          <div class="chatapp-wrap chatapp-info-active">
            <div class="chatapp-content">
              <ChatAside
                socket={socket}
                rooms={contactsData}
                messages={messages}
                rooms_={rooms_}
                onFilterDataFromChild={handleFilterDataFromChild}
                authUser={user}
                onDataFromChild={handleDataFromChild}
                onMessagesDataFromChild={handleMessagesDataFromChild}
                deleteChatRecord={deleteChatRecord}
                updateChat={updateChat}
              />
              {selectedRoom?.id && (
                <SingleChat
                  messages={messages}
                  selectedRoom={selectedRoom}
                  selectedMessages={selectedMessages}
                  authUser={user}
                  socket={socket}
                />
              )}
              {/* <AudioCall
                socket={socket}
                authUser={user}
                selectedRoom={selectedRoom}
              />
              <VideoCall
                socket={socket}
                authUser={user}
                selectedRoom={selectedRoom}
              />
              <InvitePeople users={users} authUser={user} socket={socket} /> */}
            </div>
          </div>
        </div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
      {/* <!-- /Wrapper --> */}
    </div>
  );
};

export default MessageContent;
