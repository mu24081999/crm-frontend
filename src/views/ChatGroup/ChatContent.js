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
import { SocketContext } from "../../Context";

const ChatContent = () => {
  const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
  const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
  const {
    // me,
    // leaveCall,
    // stream,
    // myVideo,
    // name,
    // setName,
    isCalling,
    // leaveCall,
    readyForCall,
    // callUser,
  } = useContext(SocketContext);
  //Socket connection
  const socket = useMemo(() => io(socketURL), [socketURL]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [messages, setMessages] = useState([]);
  console.log("🚀 ~ ChatContent ~ messages:", messages);
  const [allMessages, setAllMessages] = useState([]);

  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  const getRooms = useCallback(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(`${backendURL}/user/chat/get-group-rooms`, config)
        .then((response) => {
          setRooms(response.data.data.chatRoomsData);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendURL, token]);
  const getChats = useCallback(
    async (room_id) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        await axios
          .get(`${backendURL}/user/chat/group-chat-history/${room_id}`, config)
          .then((response) => {
            setMessages(response.data?.data.chatData);
          });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendURL, token]
  );
  useMemo(() => {
    if (selectedRoom) {
      getChats(selectedRoom?.room_id);
    }
  }, [selectedRoom, getChats]);
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
            console.log("🚀 ~ .then ~ response:", response);
            getRooms();
          });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendURL, token, getRooms]
  );
  useMemo(() => {
    if (selectedRoom?.id) {
      getChats(selectedRoom?.room_id);
    }
  }, [getChats, selectedRoom]);
  useEffect(() => {
    if (token) {
      getRooms();
      getAllChats();
      dispatch(getUsers(token));
    }
  }, [token, dispatch, getRooms, getAllChats]);
  useEffect(() => {
    socket.on("message_added", (data) => {
      setMessages(data);
    });
    socket.on("group_room_added", () => {
      getRooms();
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, [socket, getRooms]);
  const handleDataFromChild = (data) => {
    setSelectedRoom(data);
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
                rooms={rooms}
                authUser={user}
                onDataFromChild={handleDataFromChild}
                messages={allMessages}
                deleteChatRecord={deleteChatRecord}
              />
              {selectedRoom?.id && (
                <SingleChat
                  messages={messages}
                  selectedRoom={selectedRoom}
                  authUser={user}
                  socket={socket}
                />
              )}
              <AudioCall
                socket={socket}
                authUser={user}
                selectedRoom={selectedRoom}
              />
              <VideoCall
                socket={socket}
                authUser={user}
                selectedRoom={selectedRoom}
              />
              <InvitePeople users={users} authUser={user} socket={socket} />
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

export default ChatContent;
