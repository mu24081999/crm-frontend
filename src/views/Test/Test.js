import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Device } from "twilio-client";
import { useSelector } from "react-redux";
const Test = () => {
  const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
  const socket = useMemo(() => io(socketURL), [socketURL]);
  const [calls, setCalls] = useState([]);
  const [twilioDevice, setTwilioDevice] = useState(null);
  console.log("🚀 ~ Test ~ twilioDevice:", twilioDevice);
  const { token, user, accountSid, accountAuthToken } = useSelector(
    (state) => state.auth
  );

  const backendURL = process.env.REACT_APP_BACKEND_URL_PRODUCTION;
  useEffect(() => {
    axios
      .post(
        backendURL + "/user/calling/get-call-token",
        {
          from_phone: user.phone,
          accountSid: accountSid,
          identity: user.name,
          authToken: accountAuthToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((resp) => {
        const device = new Device();
        device.setup(resp.data.token, {
          logLevel: 1,
          edge: "ashburn",
          debug: true,
        });
        setTwilioDevice(device);
      })
      .catch((err) => console.error(err));
    return () => {
      if (twilioDevice) {
        twilioDevice.disconnectAll();
        twilioDevice.destroy();
      }
    };
  }, [backendURL]);
  // useEffect(() => {
  //   socket.on("callComming", (data) => {
  //     console.log("🚀 ~ socket.on ~ data:", data);
  //     twilioDevice?.on("incoming", (call) => {
  //       console.log("Incoming call:", call);
  //       // Handle incoming call, e.g., display a modal or notification
  //       call.answer(); // Automatically answer the call (optional)
  //     });
  //     setCalls([...calls, data]);
  //   });
  // }, [calls, socket, twilioDevice]);
  useEffect(() => {
    if (twilioDevice) {
      // Handle incoming calls
      twilioDevice.on("incoming", (connection) => {
        console.log("Incoming connection:", connection);
        // You can handle the incoming call here, e.g., display a modal or notification
        connection.accept();
      });
      twilioDevice.on("accept", () => console.log("Call accepted"));
      twilioDevice.on("disconnect", () => console.log("Call disconnected"));
      twilioDevice.on("error", (error) => {
        console.error("Twilio client error:", error);
      });
    }
  }, [twilioDevice]);
  const makeCall = () => {
    const params = { To: "+923174660027" };
    const outgoingCall = twilioDevice.connect(params);
  };
  const handleAnswerCall = (call) => {
    if (twilioDevice) {
      // Answer the incoming call
      twilioDevice.activeConnection().accept();
    }
  };

  // const answerCall = (id) => {
  //   console.log(id);
  //   axios.post(socketURL + "/v1/user/calling/answer-call", { callId: id });
  // };

  return (
    <div>
      Test Call
      <button onClick={makeCall}>Make Call</button>
      <div>
        {calls?.length > 0 &&
          calls?.map((call, index) => (
            <div key={index}>
              <p>{call?.From}</p>
              {/* <button onClick={() => answerCall(call?.CallSid)}>
                answerCall
              </button> */}
              <button onClick={() => handleAnswerCall(call)}>
                Answer Call
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Test;
