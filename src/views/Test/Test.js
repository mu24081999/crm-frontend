import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Device } from "twilio-client";
const Test = () => {
  const socketURL = process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION;
  const socket = useMemo(() => io(socketURL), [socketURL]);
  const [calls, setCalls] = useState([]);
  const [twilioDevice, setTwilioDevice] = useState(null);

  useEffect(() => {
    axios
      .get(socketURL + "/v1/user/calling/get-call-token")
      .then((resp) => {
        const device = new Device();
        device.setup(resp.data.token, {
          logLevel: 1,
          edge: "ashburn",
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
  }, [socketURL]);
  useEffect(() => {
    socket.on("callComming", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      setCalls([...calls, data]);
    });
  }, [calls, socket]);
  const makeCall = () => {
    const params = { To: "+923174660027" };
    const outgoingCall = twilioDevice.connect(params);
    outgoingCall.on("accept", () => console.log("Call accepted"));
    outgoingCall.on("disconnect", () => console.log("Call disconnected"));
  };
  const answerCall = (id) => {
    console.log(id);
    axios.post(socketURL + "/v1/user/calling/answer-call", { callId: id });
  };
  return (
    <div>
      Test Call
      <button onClick={makeCall}>Make Call</button>
      <div>
        {calls?.length > 0 &&
          calls?.map((call, index) => (
            <div key={index}>
              <p>{call?.From}</p>
              <button onClick={() => answerCall(call?.CallSid)}>
                answerCall
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Test;
