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
import { getConversationsList } from "../../redux/services/calling";

const MessageContent = () => {
  const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
  const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
  const { messagesArray } = useContext(SocketContext);
  const [selectedMessages, setSelectedMessages] = useState({});
  const { messages: defaultMessages } = useSelector((state) => state.message);
  const { conversations } = useSelector((state) => state.calling);

  //Socket connection
  const socket = useMemo(() => io(socketURL), [socketURL]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const [contactsData, setContactsData] = useState([]);

  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setMessages(defaultMessages);
  }, [defaultMessages]);
  useEffect(() => {
    dispatch(
      getConversationsList(token, {
        authToken: user?.authToken,
        accountSid: user.accountSid,
      })
    );
    dispatch(getMessagesList(token));
  }, [token, dispatch, user]);
  useEffect(() => {
    setContactsData(conversations);
  }, [conversations]);
  useEffect(() => {
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
  }, [messagesArray]);
  const handleDataFromChild = (data) => {
    setSelectedRoom(data);
  };
  const handleFilterDataFromChild = (data) => {
    // setRooms(data);
  };
  const handleMessagesDataFromChild = (data) => {
    console.log("🚀 ~ handleMessagesDataFromChild ~ data:", data);
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
                onFilterDataFromChild={handleFilterDataFromChild}
                authUser={user}
                onDataFromChild={handleDataFromChild}
                onMessagesDataFromChild={handleMessagesDataFromChild}
              />
              {selectedRoom !== null && (
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
        </div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
      {/* <!-- /Wrapper --> */}
    </div>
  );
};

export default MessageContent;
