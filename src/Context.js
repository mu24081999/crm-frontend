import { createContext, useState, useRef, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import { updatedMe } from "./redux/slices/auth";
import ringTone from "./assets/ringtone.mp3";
import { getContactDetais } from "./redux/services/contact";

const SocketContext = createContext();
const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
const ContextProvider = ({ children }) => {
  const socket = useMemo(() => io(socketURL), []);
  const { user_id, user } = useSelector((state) => state.auth);
  const [callAccepted, setCallAccepted] = useState(false);
  const [type, setType] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const [openCalling, setOpenCalling] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [messagesArray, setMessagesArray] = useState([]);
  const [me, setMe] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const dispatch = useDispatch();

  const sendTextMessage = (data) => {
    console.log("🚀 ~ sendTextMessage ~ data:", data);
    socket.emit("send-message", data);
  };
  const handleToggleShowLeadDetail = (value, contact_id, token) => {
    if (contact_id && token) {
      dispatch(getContactDetais(token, contact_id));
    }
    setShowLeadDetails(value);
  };

  //open dialog
  function clickElementByDataBsTarget(dataBsTarget) {
    var elements = document.querySelectorAll(
      '[data-bs-target="' + dataBsTarget + '"]'
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
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      })
      .catch((error) => {
        // Handle errors, e.g., permission denied
        console.error("Error accessing media devices:", error);
      });
  };
  const readyForAudioCall = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((currentStream) => {
        // Handle the stream appropriately
        setType("audio");
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
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
      socket.on("message_sent", (messages) => {
        console.log("🚀 ~ socket.on ~ messages:", messages);
        setMessagesArray(messages);
      });
      socket.on("message_recieved", (messages) => {
        console.log("🚀 ~ socket.on ~ messages:", messages);
        setMessagesArray(messages);
      });
      socket.emit("user_connected", user_id);
      socket.on("updated_me", (userData) => {
        dispatch(updatedMe(userData));
      });
      socket.on("me", (id) => setMe(id));
      socket.on("callEnded", (data) => {
        setCallEnded(true);
        setCallAccepted(false);
        setIsCalling(false);
        setCall({});
        setOpenCalling(false);
        // clickElementByDataBsDismiss("modal");
      });
      socket.on(
        "callUser",
        ({ from, name: callerName, signal, type, userToCall }) => {
          setType(type);
          clickElementByDataBsTarget("#video_call");
          setRinging(true);
          // ringtone.play();
          // const ringtone = new Audio(ringTone);

          // ringtone.play();
          // setTimeout(() => {
          //   ringtone.pause();
          // }, 3000);
          setIsCalling(true);
          setCall({
            isReceivingCall: true,
            from,
            name: callerName,
            signal,
            userToCall,
          });
        }
      );
    }
    // return () => {
    //   socket.disconnect();
    // };
  }, [user_id, dispatch, callEnded]);
  const calling = () => {
    setOpenCalling(!openCalling);
  };
  const answerCall = () => {
    setCallAccepted(true);
    setRinging(false);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    if (connectionRef.current) connectionRef.current = peer;
    console.log(connectionRef.current);
  };

  const callUser = (id, name, type) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
        type: type,
      });
    });
    peer.on("stream", (currentStream) => {
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
      connectionRef.current.destroy();
    }

    // Reset call state
    setCallEnded(true);
    setCallAccepted(false);
    setIsCalling(false);
    setOpenCalling(false);

    // Clear the user's video stream
    if (userVideo.current) {
      userVideo.current.srcObject = null;
    }

    // Remove event listeners
    socket.off("callAccepted");
  };

  return (
    <SocketContext.Provider
      value={{
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
        messagesArray,
        showLeadDetails,
        calling,
        readyForCall,
        readyForAudioCall,
        setName,
        callUser,
        leaveCall,
        answerCall,
        sendTextMessage,
        handleToggleShowLeadDetail,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { ContextProvider, SocketContext };
