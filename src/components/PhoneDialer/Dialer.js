import React, { useState } from "react";
import {
  FaArrowAltCircleRight,
  FaArrowRight,
  FaPhone,
  FaPhoneSlash,
  FaPlus,
  FaSpeakerDeck,
} from "react-icons/fa";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./dialer.css";
import InputField from "../FormFields/InputField";
import { useForm } from "react-hook-form";
import { IoIosKeypad, IoIosRecording } from "react-icons/io";
import { MdMicExternalOff, MdMicNone, MdOutlineContacts } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Device } from "twilio-client";
import {
  getAllClaimedNumbers,
  transferCall,
  updateBalanceAfterCall,
} from "../../redux/services/calling";

import axios from "axios";
import { getContactsList } from "../../redux/services/contact";
import ReactSelectField from "../FormFields/reactSelectField";
import { BiLoaderCircle } from "react-icons/bi";
import _ from "lodash";
import { TbRecordMailOff } from "react-icons/tb";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { FaMicrophoneLines } from "react-icons/fa6";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FcCallTransfer } from "react-icons/fc";

//Helpers
const Timer = () => {
  const [timer, setTimer] = useState({ mins: 0, sec: 0 });
  const getTime = () => {
    setTimer((state) => ({
      mins: state.sec === 60 ? state.mins + 1 : state.mins,
      sec: state.sec === 60 ? 0 : state.sec + 1,
    }));
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      {`${timer.mins < 9 ? "0" + timer.mins : timer.mins} : ${
        timer.sec < 9 ? "0" + timer.sec : timer.sec
      }`}
    </div>
  );
};

const Dialer = () => {
  const {
    // handleSubmit,
    watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm();
  const [inputValue, setInputValue] = useState("");
  const [isDial, setIsDial] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [isDialerOpen, setIsDialerOpen] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  const [twilioDevice, setTwilioDevice] = useState(null);
  const [userState, setUserState] = useState("READY");
  const [showCall, setShowCall] = useState(false);
  const [connection, setConnection] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [activeCallSid, setActiveCallSid] = useState(null);
  const [active, setActive] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [agents, setAgents] = useState([]);
  const dispatch = useDispatch();
  const { token, user, accountSid, accountAuthToken } = useSelector(
    (state) => state.auth
  );
  const { claimedNumbers } = useSelector((state) => state.calling);
  const { contacts } = useSelector((state) => state.contact);
  const { users } = useSelector((state) => state.user);
  const backendURL = process.env.REACT_APP_BACKEND_URL_PRODUCTION;
  useEffect(() => {
    if (users?.length > 0 && user?.role === "USER") {
      const data = users?.filter(
        (usr) => _.toInteger(usr.client_id) === user?.id
      );
      setAgents(data);
    } else if (users?.length > 0 && user?.role === "AGENT") {
      const data = users?.filter(
        (usr) => _.toInteger(usr.client_id) === _.toInteger(user?.client_id)
      );
      setAgents(data);
    }
  }, [users, user]);
  const selectedNumberWatcher = watch("my_numbers");
  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        backendURL + "/user/calling/get-call-token",
        {
          from_phone: selectedNumberWatcher?.value,
          accountSid: accountSid,
          identity: user.username,
          authToken: accountAuthToken,
          api_key_sid: user.api_key_sid,
          api_key_secret: user.api_key_secret,
          twiml_app_sid: user.twiml_app_sid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((resp) => {
        setIsLoading(false);
        const device = new Device();
        device.setup(resp.data.token, {
          logLevel: 1,
          edge: "ashburn",
          debug: true,
        });
        console.log("device setup: " + device);
        setTwilioDevice(device);
      })
      .catch((err) => console.error(err));
    return () => {
      if (twilioDevice) {
        twilioDevice.disconnectAll();
        twilioDevice.destroy();
      }
    };
  }, [
    backendURL,
    accountSid,
    accountAuthToken,
    user,
    token,
    selectedNumberWatcher,
  ]);
  useEffect(() => {
    if (twilioDevice) {
      twilioDevice.on("incoming", (call) => {
        setShowCall(true);
        setIsDialerOpen(true);
        setActiveCall(call);
        setUserState("ON_CALL");
        setCallStatus("INCOMING");
        setIsDial(false);
        setShowContacts(false);
        console.log("Call comming");
      });

      twilioDevice.on("connect", (conn) => {
        console.log("Call connected");
        setConnection(conn);
      });
    }
  }, [twilioDevice]);

  useEffect(() => {
    // dispatch(getUsers(token));
    dispatch(getContactsList(token));
    dispatch(
      getAllClaimedNumbers(token, { accountSid, authToken: accountAuthToken })
    );
  }, [dispatch, token, accountAuthToken, accountSid]);
  const makeCall = () => {
    const params = { To: inputValue };
    const outgoingCall = twilioDevice?.connect(params);
    outgoingCall.on("accept", (call) => {
      console.log(call, "call accepted");
      setShowCall(true);
      setActiveCall(call);
      setUserState("ON_CALL");
      setIsDial(false);
      setShowContacts(false);
      setCallStatus("STARTED");
      console.log("Call accepted");
      // Capture callSid from the accepted call
      const callSid = call.parameters.CallSid;
      setActiveCallSid(callSid);
    });

    outgoingCall.on("reject", () => {
      setShowCall(false);
      setUserState("READY");
      setIsDial(true);
      setShowContacts(false);
      setCallStatus(null);

      console.log("Call accepted");
    });
    outgoingCall.on("disconnect", () => {
      dispatch(
        updateBalanceAfterCall(token, {
          accountSid: accountSid,
          authToken: accountAuthToken,
          user_id: user.id,
        })
      );
      setShowCall(false);
      setUserState("READY");
      setIsDial(true);
      setShowContacts(false);
      console.log("Call disconnected");
      setCallStatus(null);
    });

    // dispatch(
    //   makeUserToCall(token, {
    //     from: "+14849993639",
    //     // from: "+12059903341",
    //     accountSid: "AC1237366c79ad62eb76b0e0775cf053d3",
    //     authToken: "39a1a699c20634690e6e1c935cfeda9d",
    //     to: "+923174660027",
    //   })
    // );
  };
  const dialerClick = (type, value) => {
    if (type === "dial") {
      setInputValue((prevValue) => prevValue + value);
      userState === "ON_CALL" && sendDigit(value);
    } else if (type === "delete") {
      setInputValue((prevValue) =>
        prevValue.substring(0, prevValue.length - 1)
      );
    } else if (type === "clear") {
      setInputValue("");
    }
  };
  const handleDisconnectCall = () => {
    if (activeCall) {
      activeCall.disconnect(); // Disconnect the active call
      setShowCall(false);
      setActiveCall(null); // Reset active call state
      setIsDial(true);
      setShowContacts(false);
      setUserState("READY");
    }
  };
  const handleAcceptCall = () => {
    if (activeCall) {
      activeCall.accept(); // Disconnect the active call
      setShowCall(true);
      setCallStatus("STARTED");
      setUserState("ON_CALL");
    }
  };
  function extractCharactersFromArray(str) {
    const firstCharacter = str?.charAt(0);
    const spaceIndex = str?.indexOf(" ");
    const characterAfterSpace =
      spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : "";
    return { firstCharacter, characterAfterSpace };
  }
  const sendDigit = (digit) => {
    if (connection) {
      connection.sendDigits(_.toString(digit));
    }
  };
  // Function to mute the call
  const muteCall = () => {
    if (connection) {
      setAlertMessage("Call Muted");
      connection.mute(!connection.isMuted());
    }
  };
  // Function to pause recording
  const pauseRecording = () => {
    if (connection) {
      setAlertMessage("Call Recording paused.");
      connection.mediaStream?.pauseRecording();
    }
  };
  const callTransfer = (targetClient) => {
    console.log("🚀 ~ callTransfer ~ targetClient:", targetClient);
    dispatch(
      transferCall(token, {
        accountSid: accountSid,
        authToken: accountAuthToken,
        callSid: activeCallSid,
        targetClient: targetClient,
      })
    );
  };
  // Function to unmute the call
  const unmuteCall = () => {
    if (connection) {
      connection.mute(false);
      setAlertMessage("Call UnMuted");
    }
  };
  const resumeRecording = () => {
    if (connection && connection.mediaStream) {
      connection.mediaStream.resumeRecording();
      setAlertMessage("Call recording resumed.");
    }
  };
  return (
    <div
      className=" d-flex justify-content-end btn btn-icon btn-floating btn-primary btn-lg btn-rounded btn-popup-open"
      // style={{
      //   bottom: "80px",
      //   position: "absolute",
      //   width: "100%",
      //   paddingRight: "1.6%",
      // }}
    >
      <Popup
        contentStyle={{ position: "fixed" }}
        open={isDialerOpen}
        trigger={
          <button
            className="btn btn-icon btn-floating btn-primary btn-lg btn-rounded shadow-lg"
            id="dialer_button"
          >
            {" "}
            {<FaPhone />}
          </button>
        }
        position="top right"
      >
        <div style={{ padding: "1%", width: "290px" }}>
          {isDial && (
            <table id="dialer_table">
              <tr style={{ height: "50px" }}>
                <div className="w-100 px-2">
                  <InputField
                    style={{ height: "50px", fontSize: "18px" }}
                    name="subject"
                    mb={true}
                    placeholder="Phone Number"
                    control={control}
                    onChange={(e) => setInputValue(e.target.value)}
                    errors={errors}
                    value={inputValue}
                  />
                </div>
              </tr>
              <tr class="dialer_num_tr">
                <td class="dialer_num" onClick={() => dialerClick("dial", 1)}>
                  <span>1</span>
                  <span className="fs-6 px-3"></span>
                </td>
                <td class="dialer_num" onClick={() => dialerClick("dial", 2)}>
                  2
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    ABC
                  </span>
                </td>
                <td class="dialer_num" onClick={() => dialerClick("dial", 3)}>
                  3
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    DEF
                  </span>
                </td>
              </tr>
              <tr class="dialer_num_tr">
                <td class="dialer_num" onClick={() => dialerClick("dial", 4)}>
                  4
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    GHI
                  </span>
                </td>
                <td class="dialer_num" onClick={() => dialerClick("dial", 5)}>
                  5
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    JKL
                  </span>
                </td>
                <td class="dialer_num" onClick={() => dialerClick("dial", 6)}>
                  6
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    MNO
                  </span>
                </td>
              </tr>
              <tr class="dialer_num_tr">
                <td class="dialer_num" onClick={() => dialerClick("dial", 7)}>
                  7
                  <span
                    className=" px-1 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    PQRS
                  </span>
                </td>
                <td class="dialer_num" onClick={() => dialerClick("dial", 8)}>
                  8
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    TUV
                  </span>
                </td>
                <td class="dialer_num" onClick={() => dialerClick("dial", 9)}>
                  9
                  <span
                    className=" px-1 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    WXYZ
                  </span>
                </td>
              </tr>
              <tr class="dialer_num_tr">
                <td class="dialer_num" onClick={() => dialerClick("dial", "+")}>
                  +<span className="px-2">,.:</span>
                </td>
                <td class="dialer_num" onClick={() => dialerClick("dial", 0)}>
                  0<span className="px-3"></span>
                </td>
                <td class="dialer_del_td">
                  <img
                    alt="delete"
                    onClick={() => dialerClick("delete", "delete")}
                    src="data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJiYWNrc3BhY2UiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNjQwIDUxMiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWJhY2tzcGFjZSBmYS13LTIwIGZhLTd4Ij48cGF0aCBmaWxsPSIjREMxQTU5IiBkPSJNNDY5LjY1IDE4MS42NWwtMTEuMzEtMTEuMzFjLTYuMjUtNi4yNS0xNi4zOC02LjI1LTIyLjYzIDBMMzg0IDIyMi4wNmwtNTEuNzItNTEuNzJjLTYuMjUtNi4yNS0xNi4zOC02LjI1LTIyLjYzIDBsLTExLjMxIDExLjMxYy02LjI1IDYuMjUtNi4yNSAxNi4zOCAwIDIyLjYzTDM1MC4wNiAyNTZsLTUxLjcyIDUxLjcyYy02LjI1IDYuMjUtNi4yNSAxNi4zOCAwIDIyLjYzbDExLjMxIDExLjMxYzYuMjUgNi4yNSAxNi4zOCA2LjI1IDIyLjYzIDBMMzg0IDI4OS45NGw1MS43MiA1MS43MmM2LjI1IDYuMjUgMTYuMzggNi4yNSAyMi42MyAwbDExLjMxLTExLjMxYzYuMjUtNi4yNSA2LjI1LTE2LjM4IDAtMjIuNjNMNDE3Ljk0IDI1Nmw1MS43Mi01MS43MmM2LjI0LTYuMjUgNi4yNC0xNi4zOC0uMDEtMjIuNjN6TTU3NiA2NEgyMDUuMjZDMTg4LjI4IDY0IDE3MiA3MC43NCAxNjAgODIuNzRMOS4zNyAyMzMuMzdjLTEyLjUgMTIuNS0xMi41IDMyLjc2IDAgNDUuMjVMMTYwIDQyOS4yNWMxMiAxMiAyOC4yOCAxOC43NSA0NS4yNSAxOC43NUg1NzZjMzUuMzUgMCA2NC0yOC42NSA2NC02NFYxMjhjMC0zNS4zNS0yOC42NS02NC02NC02NHptMTYgMzIwYzAgOC44Mi03LjE4IDE2LTE2IDE2SDIwNS4yNmMtNC4yNyAwLTguMjktMS42Ni0xMS4zMS00LjY5TDU0LjYzIDI1NmwxMzkuMzEtMTM5LjMxYzMuMDItMy4wMiA3LjA0LTQuNjkgMTEuMzEtNC42OUg1NzZjOC44MiAwIDE2IDcuMTggMTYgMTZ2MjU2eiIgY2xhc3M9IiI+PC9wYXRoPjwvc3ZnPg=="
                    width="25px"
                    title="Delete"
                  />
                </td>
              </tr>
              <tr className="mt-5 p-0">
                <td colspan="3">
                  <div>
                    {isLoading ? (
                      <BiLoaderCircle />
                    ) : (
                      <button
                        className="btn btn-primary rounded-pill btn-lg"
                        onClick={makeCall}
                      >
                        Call
                      </button>
                    )}
                  </div>
                  {/* {user?.parent_id !== null && user?.client_id === null && ( */}
                  <div className="w-100 mt-2 mb-2">
                    <ReactSelectField
                      name="my_numbers"
                      placeholder="Call From"
                      control={control}
                      errors={errors}
                      mb={true}
                      options={
                        claimedNumbers?.length > 0 &&
                        user?.role === "USER" &&
                        user.parent_id !== null &&
                        user?.client_id === null
                          ? claimedNumbers?.map((key, index) => {
                              return {
                                label: key?.phoneNumber,
                                value: key?.phoneNumber,
                              };
                            })
                          : user?.role === "AGENT" &&
                            user?.twilio_numbers?.numbers?.length > 0
                          ? user?.twilio_numbers?.numbers?.map((key, index) => {
                              return {
                                label: key?.phoneNumber,
                                value: key?.phoneNumber,
                              };
                            })
                          : []
                      }
                    />
                  </div>
                  {/* )} */}
                </td>
              </tr>
            </table>
          )}
          {showContacts === true && (
            <>
              {/* <header>
                <InputField
                  name="firstname"
                  placeholder="Your name"
                  // label="First Name"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                  errors={errors}
                />{" "}
              </header> */}
              <div
                className="list-group"
                style={{ height: "407px", overflow: "scroll" }}
              >
                {contacts?.length > 0 &&
                  contacts?.map((contact, index) => (
                    <button
                      key={index}
                      className={`list-group-item list-group-item-action ${
                        // active ? "active" : ""
                        ""
                      }`}
                      aria-current="true"
                      onClick={() => {
                        setActive(!active);
                        // setSelectedNumber(contact.phone);
                        setShowContacts(false);
                        setIsDial(true);
                        setInputValue(contact.phone);
                      }}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                          <span class="initial-wrap">
                            {extractCharactersFromArray(contact.firstname)
                              .firstCharacter +
                              extractCharactersFromArray(contact.lastname)
                                .characterAfterSpace}
                          </span>
                        </div>
                        <div className="w-75">
                          <h5 className="mb-1 fs-6">
                            {contact?.firstname?.slice(0, 20)}&nbsp;
                            {contact?.lastname}
                            {/* {contact?.name?.length > 20 ? "..." : ""} */}
                          </h5>
                          <p>{contact?.phone}</p>
                        </div>

                        {/* <small>3 days ago</small> */}
                      </div>
                    </button>
                  ))}
              </div>
            </>
          )}
          {userState === "ON_CALL" && showCall && (
            <div style={{ height: "450px" }}>
              <div className="w-100 py-2">
                {alertMessage !== null && (
                  <p className="badge w-100 bg-warning">Call Muted</p>
                )}
              </div>
              <div>
                <div>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
                    alt="new"
                    width={90}
                  />
                  <span>
                    {activeCall?.parameters?.From ||
                      activeCall?.parameters?.To ||
                      "0343094394093"}
                  </span>
                </div>
              </div>
              {callStatus === "STARTED" && (
                <div className="my-3 text-center">
                  <Timer />
                </div>
              )}

              <div
                className="d-flex justify-content-center flex-wrap gap-5
            "
              >
                <ReactTooltip
                  id="on_mic"
                  place="bottom"
                  content="Turn on microphone"
                />
                <ReactTooltip
                  id="off_mic"
                  place="bottom"
                  content="Turn off microphone"
                />
                <ReactTooltip
                  id="on_record"
                  place="bottom"
                  content="Turn on recording"
                />
                <ReactTooltip
                  id="off_record"
                  place="bottom"
                  content="Turn off recording"
                />
                <ReactTooltip
                  id="call_transfer"
                  place="bottom"
                  content="Transfer Call"
                />
                <ReactTooltip
                  id="add_call"
                  place="bottom"
                  content="Add Person in the call"
                />
                <button
                  className="btn p-3 btn-light rounded-circle"
                  data-tooltip-id="off_mic"
                  onClick={muteCall}
                >
                  <AiOutlineAudioMuted size={22} />
                </button>
                <button
                  className="btn p-3 btn-light rounded-circle"
                  onClick={unmuteCall}
                  data-tooltip-id="on_mic"
                >
                  <MdMicNone size={22} />
                </button>
                <button
                  className="btn p-3 btn-light rounded-circle"
                  data-tooltip-id="off_record"
                  onClick={pauseRecording}
                >
                  <TbRecordMailOff size={22} />
                </button>
                <button
                  className="btn p-3 btn-light rounded-circle"
                  data-tooltip-id="on_record"
                  onClick={resumeRecording}
                >
                  <IoIosRecording size={22} />
                </button>
                <button
                  className="btn p-3 btn-light rounded-circle disabled"
                  data-tooltip-id="add_call"
                  // onClick={resumeRecording}
                >
                  <FaPlus size={22} />
                </button>
                <div class="dropdown" data-tooltip-id="call_transfer">
                  <button
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    className="btn p-3 btn-light rounded-circle dropdown-toggle"
                    type="button"
                  >
                    <FcCallTransfer size={15} />
                  </button>
                  <div role="menu" class="dropdown-menu">
                    {agents?.length > 0 ? (
                      agents?.map((agent, index) => (
                        <a
                          key={index}
                          class="dropdown-item"
                          href="#"
                          onClick={() => callTransfer(agent.username)}
                        >
                          {agent.name}({agent.username})
                        </a>
                      ))
                    ) : (
                      <li>No Agents data found.</li>
                    )}
                  </div>
                </div>
                {/* <Popup
                  trigger={
                    <button
                      className="btn btn-light rounded-circle"
                      id="transfer_button"
                    >
                      {" "}
                      {<FcCallTransfer size={22} />}
                    </button>
                  }
                  position="top right"
                >
                  <div className="">
                    <h5 className="bg-primary text-white rounded px-3 py-2">
                      Transfer To
                    </h5>
                    <ul
                      className="p-0 row gap-2"
                      style={{
                        maxHeight: "200px",
                        overflow: "scroll",
                        textDecoration: "none",
                      }}
                    >
                      {agents?.length > 0 ? (
                        agents?.map((agent, index) => (
                          <li
                            className="px-5"
                            key={index}
                            onClick={() => callTransfer(agent.username)}
                          >
                            <a className="" style={{ cursor: "pointer" }}>
                              {agent.name}({agent.username})
                            </a>
                          </li>
                        ))
                      ) : (
                        <li>No Agents data found.</li>
                      )}
                    </ul>
                  </div>
                </Popup> */}
                {/* <button
                className="btn p-3 btn-light rounded-circle"
                data-tooltip-id="call_transfer"
                onClick={callTransfer}
              >
                <FcCallTransfer size={22} />
              </button> */}
              </div>
              <div className="d-flex justify-content-around ">
                {/* {callStatus === "INCOMING" && ( */}
                <div className="d-flex justify-content-center my-5 mx-1">
                  <button
                    className="btn btn-danger rounded-circle p-3"
                    onClick={handleDisconnectCall}
                  >
                    <FaPhone size={22} />
                  </button>
                </div>
                {/* )} */}
                {callStatus === "INCOMING" && (
                  <div className="d-flex justify-content-center my-5 mx-1">
                    <button
                      className="btn btn-success rounded-circle p-3"
                      onClick={handleAcceptCall}
                    >
                      <FaPhone size={22} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* {userState !== "ON_CALL" && ( */}
          <footer className="w-100 d-flex justify-content-between p-1 gap-1">
            {userState !== "ON_CALL" && (
              <button
                type="button"
                class="btn btn-primary btn-md "
                onClick={() => {
                  setIsDial(false);
                  setShowCall(false);
                  setShowContacts(true);
                  setUserState("READY");
                }}
              >
                <MdOutlineContacts />
                &nbsp; Contacts
              </button>
            )}
            <button
              type="button"
              class="btn btn-primary btn-md w-50"
              onClick={() => {
                setIsDial(true);
                setShowCall(false);
                setShowContacts(false);
                // setUserState("READY");
              }}
            >
              <IoIosKeypad className="mb-1" />
              &nbsp; Dial
            </button>
            {userState === "ON_CALL" && (
              <>
                <button
                  type="button"
                  class="btn btn-primary btn-md w-50"
                  onClick={() => {
                    setShowCall(!showCall);
                    setIsDial(false);
                    setShowContacts(false);
                  }}
                >
                  <FaPhone className="mb-1" />
                  &nbsp; Show Call
                </button>
              </>
            )}
          </footer>
          {/* )} */}
        </div>
      </Popup>
    </div>
  );
};

export default Dialer;
