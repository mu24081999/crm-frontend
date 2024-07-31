import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import { updatedMe } from "./redux/slices/auth";

import { getContactDetais } from "./redux/services/contact";
import { getUserDetails } from "./redux/services/users";
import { toast } from "react-toastify";
import notificationSound from "./assets/notification.mp3";
import { IoIosTimer } from "react-icons/io";
const SocketContext = createContext();
const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
const ContextProvider = ({ children }) => {
  const noti_sound = new Audio(notificationSound);
  const socket = useMemo(() => io(socketURL), []);
  const { user_id, user } = useSelector((state) => state.auth);
  const [callAccepted, setCallAccepted] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [type, setType] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const [openCalling, setOpenCalling] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [messagesArray, setMessagesArray] = useState([]);
  const [notificationsArray, setNotificationsArray] = useState([]);
  const [contactsToModify, setContactsToModify] = useState([]);
  const [me, setMe] = useState("");
  //Dialer features
  const [callingDevice, setCallingDevice] = useState({});
  const [showCall, setShowCall] = useState(false);
  const [isDialerOpen, setIsDialerOpen] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [userState, setUserState] = useState("READY");
  const [callStatus, setCallStatus] = useState(null);
  const [isDial, setIsDial] = useState(true);
  const [showContacts, setShowContacts] = useState(false);
  const [connection, setConnection] = useState(false);
  const [activeCallSid, setActiveCallSid] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [kycApproved, setKycApproved] = useState(0);
  const [themeType, setThemeType] = useState("collapsed");
  const [timer, setTimer] = useState({ hours: 0, mins: 0, sec: 0 });
  const Timer = () => {
    const getTime = () => {
      setTimer((state) => ({
        hours: state.mins === 60 ? state.hours + 1 : state.hours,
        mins: state.sec === 60 ? state.mins + 1 : state.mins,
        sec: state.sec === 60 ? 0 : state.sec + 1,
      }));
    };
    useEffect(() => {
      const interval = setInterval(() => getTime(), 1000);
      return () => clearInterval(interval);
    }, []);
    return (
      <div className="badge bg-light badge-lg text-dark">
        <span>
          <IoIosTimer size={16} style={{ marginRight: "4%" }} />
          {`${timer.hours < 9 ? "0" + timer.hours : timer.hours} :
          ${timer.mins < 9 ? "0" + timer.mins : timer.mins} :

           ${timer.sec < 9 ? "0" + timer.sec : timer.sec}`}
        </span>
      </div>
    );
  };
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const dispatch = useDispatch();
  // Assume you have a function to play the ringtone

  const sendTextMessage = (data) => {
    socket.emit("send-message", data);
  };
  const pushNotification = (data) => {
    const { user_id, notification, type, notification_details, email_to } =
      data;
    console.log("🚀 ~ pushNotification ~ data:", data);
    socket.emit("push-notification", {
      user_id,
      notification,
      type,
      notification_details,
      email_to,
    });
  };
  const handleToggleShowLeadDetail = (value, contact_id, token) => {
    if (contact_id && token) {
      dispatch(getContactDetais(token, contact_id));
    }
    setShowLeadDetails(value);
  };
  const handleToggleShowUserDetail = (value, user_id, token) => {
    if (user_id && token) {
      dispatch(getUserDetails(token, user_id));
    }
    setShowUserDetails(value);
  };

  //open dialog
  function clickElementByDataBsTarget(dataBsTarget, type) {
    // var elements = document.querySelectorAll(
    //   '[data-bs-target="' + dataBsTarget + '"]'
    // ); // Get elements with matching data-bs-target value
    var elements = document.querySelectorAll(
      '[data-bs-target="' + dataBsTarget + '"]' &&
        '[data-bs-type="' + type + '"]'
    ); // Get elements with matching data-bs-target value
    if (elements.length > 0) {
      elements.forEach(function (element) {
        element.click(); // Trigger a click event on each matching element
      });
    } else {
      console.error(
        "Element with data-bs-target '" + dataBsTarget + "' not found."
      );
    }
  }
  //close dialog
  function clickElementByDataBsDismiss(dataBsTarget) {
    var elements = document.querySelectorAll(
      '[data-bs-dismiss="' + dataBsTarget + '"]'
    ); // Get elements with matching data-bs-target value
    if (elements.length > 0) {
      elements.forEach(function (element) {
        element.click(); // Trigger a click event on each matching element
      });
    } else {
      console.error(
        "Element with data-bs-target '" + dataBsTarget + "' not found."
      );
    }
  }
  const readyForCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        // Handle the stream appropriately
        setType("video");
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((error) => {
        // Handle errors, e.g., permission denied
        console.error("Error accessing media devices:", error);
      });
  };
  const readyForAudioCall = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((currentStream) => {
        // Handle the stream appropriately
        setType("audio");
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((error) => {
        // Handle errors, e.g., permission denied
        console.error("Error accessing media devices:", error);
      });
  };
  useEffect(() => {
    if (socket) {
      // navigator.mediaDevices
      //   .getUserMedia({ audio: true })
      //   .then((currentStream) => {
      //     setStream(currentStream);
      //     if (myVideo.current) {
      //       myVideo.current.srcObject = currentStream;
      //     }
      //   });
      socket.on("trigger_notification", (notifications) => {
        setNotificationsArray(notifications);
        noti_sound.play();
      });
      socket.on("message_error", (err) => {
        toast.error(err);
      });
      socket.on("message_sent", (messages) => {
        setMessagesArray(messages);
      });
      socket.on("message_recieved", (messages) => {
        setMessagesArray(messages);
      });
      socket.emit("user_connected", user_id);
      socket.on("updated_me", (userData) => {
        dispatch(updatedMe(userData));
      });
      socket.on("me", (id) => setMe(id));
      socket.on("callEnded", (data) => {
        clickElementByDataBsDismiss("modal");
        if (connectionRef.current) {
          connectionRef.current.destroy();
        }
        // Clear the user's video stream
        if (userVideo.current) {
          userVideo.current.srcObject = null;
        }
        // clear my video stream
        if (myVideo.current) {
          myVideo.current.srcObject = null;
        }
        // Reset call state
        setCallEnded(true);
        setCallAccepted(false);
        setIsCalling(false);
        setOpenCalling(false);
        setType(null);
        if (stream) {
          // Stop each track in the stream
          stream.getTracks().forEach((track) => {
            track.stop();
          });
          setStream(null);
        }
        window.location.reload();
      });
      socket.on(
        "callUser",
        ({ from, name: callerName, signal, type, userToCall, to }) => {
          setType(type);

          if (type === "audio") {
            clickElementByDataBsTarget("#video_call", "audio");
          } else if (type === "video") {
            clickElementByDataBsTarget("#video_call", "video");
          }
          setRinging(true);
          setIsCalling(true);
          setCall({
            isReceivingCall: true,
            from,
            name: callerName,
            type,
            signal,
            userToCall,
            to,
          });
        }
      );
    }
    // return () => {
    //   socket.disconnect();
    // };
  }, [socket, user_id, dispatch]);
  const calling = () => {
    setOpenCalling(!openCalling);
  };
  const answerCall = () => {
    setCallAccepted(true);
    setOpenCalling(false);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id, name, type, to_name) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
        type: type,
        to: to_name,
      });
    });
    peer.on("stream", (currentStream) => {
      setRinging(false);

      userVideo.current.srcObject = currentStream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = (to) => {
    // Emit a message to inform the other user that the call is disconnected
    socket.emit("disconnect_call", { to: to });
    // Close the Peer connection
    if (connectionRef.current) {
      connectionRef.current = null;
    }
    // Clear the user's video stream
    if (userVideo.current) {
      userVideo.current.srcObject = null;
    }
    // clear my video stream
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }
    // Reset call state
    setCallEnded(true);
    setCallAccepted(false);
    setIsCalling(false);
    setOpenCalling(false);
    setType(null);

    // Stop the current media stream, if there is one
    if (stream) {
      // Stop each track in the stream
      stream.getTracks().forEach((track) => {
        console.log(track);
        track.stop();
        console.log(track);
      });
      setStream(null);
    }
    window.location.reload();

    // Remove event listeners
    // socket.close();
  };

  return (
    <SocketContext.Provider
      value={{
        authUser: user,
        call,
        callAccepted,
        openCalling,
        isCalling,
        myVideo,
        userVideo,
        ringing,
        stream,
        name,
        type,
        callEnded,
        me,
        timer,
        messagesArray,
        showLeadDetails,
        showUserDetails,
        messageError,
        notificationsArray,
        contactsToModify,
        callingDevice,
        showCall,
        isDialerOpen,
        activeCall,
        userState,
        callStatus,
        isDial,
        showContacts,
        connection,
        activeCallSid,
        inputValue,
        kycApproved,
        themeType,
        Timer,
        setTimer,
        calling,
        readyForCall,
        readyForAudioCall,
        setName,
        callUser,
        leaveCall,
        answerCall,
        sendTextMessage,
        handleToggleShowLeadDetail,
        handleToggleShowUserDetail,
        pushNotification,
        setContactsToModify,
        setCallingDevice,
        setShowCall,
        setIsDialerOpen,
        setActiveCall,
        setUserState,
        setCallStatus,
        setIsDial,
        setShowContacts,
        setConnection,
        setActiveCallSid,
        setInputValue,
        setKycApproved,
        setThemeType,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { ContextProvider, SocketContext };
