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
  const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
  const { messagesArray } = useContext(SocketContext);
  const [selectedMessages, setSelectedMessages] = useState({});
  const [showForm, setShowForm] = useState(false);
  const { messages: defaultMessages } = useSelector((state) => state.message);
  //Socket connection
  const socket = useMemo(() => io(socketURL), [socketURL]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [contactsData, setContactsData] = useState([]);

  const { user, token } = useSelector((state) => state.auth);
  const [rooms, setRooms] = useState([]);
  const [a2pVerified, setA2pVerified] = useState(false);

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
          obj.user_id === user?.id &&
          obj.direction === "outbound"
        ) {
          uniquePhoneNumbers[obj.to_phone] = true;
          filteredArray.push(obj);
        }
        if (
          !uniquePhoneNumbers[obj.from_phone] &&
          obj.from_phone !== user?.phone &&
          obj.direction === "inbound"
        ) {
          uniquePhoneNumbers[obj.from_phone] = true;
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
                a2pVerified={a2pVerified}
                messages={messages}
                onFilterDataFromChild={handleFilterDataFromChild}
                authUser={user}
                onDataFromChild={handleDataFromChild}
                onMessagesDataFromChild={handleMessagesDataFromChild}
                onShowAddForm={onShowAddForm}
              />
              {selectedRoom?.id && (
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
          {showForm && (
            <div class="emailapp-wrap">
              <div
                id="compose_messages_bulk"
                className="modal fade add-new-contact"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-lg"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header bg-primary">
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        Compose Bulk SMS
                      </span>
                      <button
                        type="button"
                        className="btn-close btn-light"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <ComposeBulk
                        onShowAddForm={onShowAddForm}
                        a2pVerified={a2pVerified}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
