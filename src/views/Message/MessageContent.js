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
import io from "socket.io-client";
import { getMessagesList } from "../../redux/services/message";
import { SocketContext } from "../../Context";
import { getConversationsList } from "../../redux/services/calling";

const MessageContent = () => {
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
  const [a2pVerified, setA2pVerified] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setMessages(defaultMessages);
  }, [defaultMessages]);
  const getRooms = useCallback(async () => {
    setIsLoadingConversations(true);
    await dispatch(
      getConversationsList(token, {
        authToken: user?.authToken,
        accountSid: user?.accountSid,
      })
    );
    setIsLoadingConversations(false);
  }, [dispatch, token, user]);
  useEffect(() => {
    // dispatch(
    //   getConversationsList(token, {
    //     authToken: user?.authToken,
    //     accountSid: user.accountSid,
    //   })
    // );
    getRooms();
    dispatch(getMessagesList(token));
  }, [token, dispatch, user, getRooms]);
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
      {/* <!-- Main Content --> */}
      <div class="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div class="hk-pg-body py-0">
          <div class="chatapp-wrap chatapp-info-active">
            <div class="chatapp-content">
              <ChatAside
                socket={socket}
                a2pVerified={a2pVerified}
                rooms={contactsData}
                roomsLoading={isLoadingConversations}
                messages={messages}
                onFilterDataFromChild={handleFilterDataFromChild}
                authUser={user}
                onDataFromChild={handleDataFromChild}
                onMessagesDataFromChild={handleMessagesDataFromChild}
              />
              {selectedRoom !== null && (
                <SingleChat
                  messages={messages}
                  a2pVerified={a2pVerified}
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
