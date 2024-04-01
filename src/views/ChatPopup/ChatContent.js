import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Contacts from "./components/Contacts";
import Chat from "./components/Chat";
import { useDispatch, useSelector } from "react-redux";
import SendMessage from "./components/SendMessage";
import { getContactsList } from "../../redux/services/contact";
import { SocketContext } from "../../Context";
import { getMessagesList } from "../../redux/services/message";

const ChatContent = () => {
  const { messagesArray } = useContext(SocketContext);
  const [contactsData, setContactsData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState({});
  const [selectedContact, setSelectedContact] = useState({});
  const [showContact, setShowContact] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const { contacts } = useSelector((state) => state.contact);
  const { messages: defaultMessages } = useSelector((state) => state.message);
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setMessages(messagesArray);
    const categorizeMessagesByDate =
      messagesArray?.length > 0 &&
      messagesArray?.reduce((result, message) => {
        const date = message.created_at.slice(0, 10); // Extract date from created_at
        if (!result[date]) {
          result[date] = []; // Initialize array for the date if it doesn't exist
        }
        result[date].push(message); // Push message to the array for the date
        return result;
      }, {});
    setSelectedMessages(categorizeMessagesByDate);
  }, [messagesArray]);
  useEffect(() => {
    setMessages(defaultMessages);
  }, [defaultMessages]);
  useEffect(() => {
    dispatch(getContactsList(token));
    dispatch(getMessagesList(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (contacts?.length > 0) {
      const groupedUsers = contacts?.reduce((acc, contact) => {
        const firstChar = contact?.firstname?.charAt(0)?.toUpperCase(); // Get the first character and convert to uppercase
        acc[firstChar] = [...(acc[firstChar] || []), contact]; // Add user to corresponding group
        return acc;
      }, {});
      setContactsData(groupedUsers);
    }
  }, [contacts]);
  const handleSelectedDataFromChild = (data) => {
    setSelectedContact(data);
  };
  const handleShowContactsFromChild = (data) => {
    setShowContact(data);
  };
  const handleShowChatFromChild = (data) => {
    setShowChat(data);
  };
  const handleMessagesDataFromChild = (data) => {
    const categorizeMessagesByDate =
      data?.length > 0 &&
      data?.reduce((result, message) => {
        const date = message.created_at.slice(0, 10); // Extract date from created_at
        if (!result[date]) {
          result[date] = []; // Initialize array for the date if it doesn't exist
        }
        result[date].push(message); // Push message to the array for the date
        return result;
      }, {});
    setSelectedMessages(categorizeMessagesByDate);
  };

  return (
    <>
      {/* <!-- Chat Popup --> */}
      <div className="hk-chat-popup d-flex">
        <Header
          selectedContact={selectedContact}
          onContactsDataFromChild={handleShowContactsFromChild}
          onChatDataFromChild={handleShowChatFromChild}
          onSelectedContactDataFromChild={handleSelectedDataFromChild}
        />
        <div className="chat-popup-body">
          <div data-simplebar className="nicescroll-bar">
            <div>
              {showContact && (
                <Contacts
                  contacts={contactsData}
                  messages={messages}
                  authUser={user}
                  onMessagesDataFromChild={handleMessagesDataFromChild}
                  onDataFromChild={handleSelectedDataFromChild}
                  onContactsDataFromChild={handleShowContactsFromChild}
                  onChatDataFromChild={handleShowChatFromChild}
                />
              )}
              {showChat && (
                <Chat
                  selectedContact={selectedContact}
                  selectedMessages={selectedMessages}
                  authUser={user}
                />
              )}
            </div>
          </div>
        </div>
        <SendMessage authUser={user} selectedContact={selectedContact} />
      </div>
      <a
        href="#"
        className="btn btn-icon btn-floating btn-primary btn-lg btn-rounded btn-popup-open"
      >
        <span className="icon">
          <span className="feather-icon">
            <i data-feather="message-circle"></i>
          </span>
        </span>
      </a>
      <div className="chat-popover shadow-xl">
        <p>Try Jampack Chat for free and connect with your customers now!</p>
      </div>
      {/* <!-- /Chat Popup --> */}

      {/* <!-- Main Content --> */}
      <div className="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div className="hk-pg-body py-0"></div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
    </>
  );
};

export default ChatContent;
