import { createContext, useState, useRef, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import { updatedMe } from "./redux/slices/auth";
import ringTone from "./assets/ringtone.mp3";
import ringingTone from "./assets/ringing.mp3";
import { getContactDetais } from "./redux/services/contact";
import { getUserDetails } from "./redux/services/users";

const SocketContext = createContext();
const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
const ContextProvider = ({ children }) => {
  const ringtone = new Audio(ringingTone);

  const socket = useMemo(() => io(socketURL), []);
  const { user_id, user } = useSelector((state) => state.auth);
  const [callAccepted, setCallAccepted] = useState(false);
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
  const [me, setMe] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const dispatch = useDispatch();

  const sendTextMessage = (data) => {
    socket.emit("send-message", data);
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

          // ringtone.play();
          // setTimeout(() => {
          //   ringtone.pause();
          // }, 5000);
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
      console.log("🚀 ~ peer.on ~ currentStream:", currentStream);
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
        track.enabled = false;
        console.log("🚀 ~ stream.getTracks ~ track:", track);
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
        messagesArray,
        showLeadDetails,
        showUserDetails,
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { ContextProvider, SocketContext };
