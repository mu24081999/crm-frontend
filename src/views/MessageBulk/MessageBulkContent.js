import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ChatAside from "./components/ChatAside/ChatAside";
import SingleChat from "./components/Messages/SingleChat";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/services/users";
import io from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";
import { getContactsList } from "../../redux/services/contact";
import { getMessagesList } from "../../redux/services/message";
import { SocketContext } from "../../Context";
import ComposeBulk from "./components/ComposeBulk";

const MessageContent = () => {
  const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
  const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
  const { messagesArray } = useContext(SocketContext);
  const [selectedMessages, setSelectedMessages] = useState({});
  const [showForm, setShowForm] = useState(false);
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
    if (defaultMessages?.length > 0) {
      let uniquePhoneNumbers = {}; // Object to store unique phone numbers
      let filteredArray = [];

      defaultMessages?.forEach((obj) => {
        if (
          !uniquePhoneNumbers[obj.to_phone] &&
          obj.to_phone !== user?.phone &&
          obj.user_id === user?.id
        ) {
          uniquePhoneNumbers[obj.to_phone] = true;
          filteredArray.push(obj);
        }
      });
      setContactsData(filteredArray);
    }
  }, [defaultMessages, user]);
  useEffect(() => {
    if (messagesArray?.length > 0) {
      let uniquePhoneNumbers = {}; // Object to store unique phone numbers
      let filteredArray = [];

      messagesArray?.forEach((obj) => {
        if (
          !uniquePhoneNumbers[obj.to_phone] &&
          obj.to_phone !== user?.phone &&
          obj.user_id === user?.id
        ) {
          uniquePhoneNumbers[obj.to_phone] = true;
          filteredArray.push(obj);
        }
      });
      setContactsData(filteredArray);
    }
  }, [messagesArray, user]);
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
  useEffect(() => {
    if (token) {
      getRooms();
      getAllChats();
      dispatch(getUsers(token));
    }
  }, [token, dispatch, getRooms, getAllChats]);
  useEffect(() => {
    if (messagesArray?.length > 0) {
      setMessages(messagesArray);
      const messagesData =
        messagesArray?.length > 0 &&
        messagesArray?.filter(
          (message) =>
            (message.from_phone === user?.phone &&
              message.to_phone === selectedRoom?.to_phone &&
              message.user_id === user?.id) ||
            (message.to_phone === user?.phone &&
              message.from_phone === selectedRoom?.from_phone &&
              message.user_id === user?.id)
        );
      setSelectedMessages(messagesData);
      console.log("🚀 ~ useEffect ~ messagesData:", messagesData);
    }
  }, [messagesArray, selectedRoom, user]);
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
  const onShowAddForm = (data) => {
    setShowForm(data);
  };
  return (
    <div>
      {/* <!-- Wrapper --> */}

      {/* <!-- Main Content --> */}
      <div class="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div
          class="hk-pg-body py-0"
          style={{ maxHeight: "100%", overflow: "hidden" }}
        >
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
                onShowAddForm={onShowAddForm}
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
            </div>
          </div>
          {showForm && (
            <div class="emailapp-wrap">
              <ComposeBulk onShowAddForm={onShowAddForm} />
            </div>
          )}
        </div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
      {/* <!-- /Wrapper --> */}
    </div>
  );
};

export default MessageContent;
