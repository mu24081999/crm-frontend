import React, { useState } from "react";
import { FaPhone, FaPlus } from "react-icons/fa";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./dialer.css";
import InputField from "../FormFields/InputField";
import { useForm } from "react-hook-form";
import { IoIosKeypad, IoIosRecording } from "react-icons/io";
import { MdOutlineContacts } from "react-icons/md";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Device } from "twilio-client";
import {
  getAllClaimedNumbers,
  resumeCallRecording,
  transferCall,
  addConfressCall,
  updateBalanceAfterCall,
} from "../../redux/services/calling";
import { PiRecordFill } from "react-icons/pi";
import { LuDelete } from "react-icons/lu";
import axios from "axios";
import { getContactsList } from "../../redux/services/contact";
import ReactSelectField from "../FormFields/reactSelectField";
import { BiDialpad, BiLoaderCircle, BiTransferAlt } from "react-icons/bi";
import _ from "lodash";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { GoPlus } from "react-icons/go";

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
  const [callMuted, setCallMuted] = useState(false);
  const [recording, setRecording] = useState(false);
  const dispatch = useDispatch();
  const { token, user, accountSid, accountAuthToken } = useSelector(
    (state) => state.auth
  );
  const { claimedNumbers } = useSelector((state) => state.calling);
  const { contacts } = useSelector((state) => state.contact);
  const { users } = useSelector((state) => state.user);
  // const [activeRecordingSid, setActiveRecordingSid] = useState(null);

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
    setAlertMessage("Call Muted");
    setCallMuted(true);
    if (connection) {
      connection.mute(!connection.isMuted());
    }
  };
  // Function to pause recording
  const pauseRecording = () => {
    setAlertMessage("Call Recording paused.");
    setRecording(false);
    if (activeCallSid) {
      // connection.mediaStream?.pauseRecording();
      // dispatch(
      //   pauseCallRecording(token, {
      //     callSid: activeCallSid,
      //     accountSid: accountSid,
      //     authToken: accountAuthToken,
      //   })
      // );
    }
  };
  const callTransfer = (targetClient) => {
    console.log("🚀 ~ callTransfer ~ targetClient:", targetClient);

    dispatch(
      transferCall(token, {
        callSid: activeCallSid,
        accountSid: accountSid,
        authToken: accountAuthToken,
        targetClient: targetClient,
      })
    );
  };
  const addPersonToCall = (targetClient) => {
    console.log("🚀 ~ callTransfer ~ targetClient:", targetClient);

    dispatch(
      addConfressCall(token, {
        callSid: activeCallSid,
        accountSid: accountSid,
        authToken: accountAuthToken,
        targetClient: targetClient,
      })
    );
  };
  // Function to unmute the call
  const unmuteCall = () => {
    setCallMuted(false);
    if (connection) {
      connection.mute(false);
    }
    setAlertMessage("Call UnMuted");
  };
  const resumeRecording = () => {
    setRecording(true);
    // if (connection && connection?.mediaStream) {
    //   connection?.mediaStream?.resumeRecording();
    // }
    setAlertMessage("Call recording resumed.");
  };
  return (
    <div
      // className=" d-flex justify-content-end btn btn-icon btn-floating btn-primary btn-lg btn-rounded " //btn-popup-open
      className=" d-flex justify-content-end btn btn-icon btn-floating btn-primary btn-md btn-rounded " //btn-popup-open
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
            className="btn btn-icon btn-floating btn-primary btn-md btn-rounded shadow-lg"
            id="dialer_button"
          >
            {" "}
            {<FaPhone className="pb-1" />}
          </button>
        }
        position="bottom right"
      >
        <div style={{ padding: "1%", width: "290px", height: "450px" }}>
          {isDial && (
            <table id="dialer_table">
              <tr style={{ height: "50px" }}>
                <div className="w-100 px-2 pt-1 d-flex">
                  <div className="col-12">
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
                  <div
                    className="position-absolute px-1"
                    onClick={() => dialerClick("delete", "delete")}
                    style={{
                      right: "5%",
                      top: "3%",
                      width: "max-content",
                    }}
                  >
                    <LuDelete color="red" />
                  </div>
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
                <td class="dialer_num" onClick={() => dialerClick("dial", "*")}>
                  <span className="fs-2">*</span>
                  <span className="px-3"></span>
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
            <div style={{ height: "407px" }}>
              <div className="w-100 pb-2">
                {alertMessage !== null && (
                  <p className="badge w-100 bg-warning">{alertMessage}</p>
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
                      inputValue}
                  </span>
                </div>
              </div>
              {callStatus === "STARTED" && (
                <div className="my-1 text-center">
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
                <ReactTooltip id="dialpad" place="bottom" content="Dialpad" />
                {callMuted === false ? (
                  <button
                    className="btn p-3 btn-light rounded-circle"
                    data-tooltip-id="off_mic"
                    onClick={muteCall}
                  >
                    <CiMicrophoneOff size={28} />
                  </button>
                ) : (
                  <button
                    className="btn p-3 btn-light rounded-circle"
                    onClick={unmuteCall}
                    data-tooltip-id="on_mic"
                  >
                    <CiMicrophoneOn size={28} />
                  </button>
                )}
                {recording === true ? (
                  <button
                    className="btn p-3 btn-light rounded-circle"
                    data-tooltip-id="off_record"
                    onClick={pauseRecording}
                  >
                    <PiRecordFill size={25} />
                  </button>
                ) : (
                  <button
                    className="btn p-3 btn-light rounded-circle"
                    data-tooltip-id="on_record"
                    onClick={resumeRecording}
                  >
                    {" "}
                    <PiRecordFill size={25} />
                  </button>
                )}
                <button
                  className="btn p-3 btn-light rounded-circle"
                  data-tooltip-id="dialpad"
                  onClick={() => {
                    setIsDial(true);
                    setShowCall(false);
                    setShowContacts(false);
                    // setUserState("READY");
                  }}
                >
                  {" "}
                  <BiDialpad size={25} />
                </button>
                {/* 
                <div class="dropdown" data-tooltip-id="add_call">
                  <button
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    className="btn p-3 btn-light rounded-circle "
                    type="button"
                  >
                    <GoPlus size={25} />
                  </button>
                  <div role="menu" class="dropdown-menu">
                    {agents?.length > 0 ? (
                      agents?.map((agent, index) => (
                        <a
                          key={index}
                          class="dropdown-item"
                          href="#"
                          onClick={() => addPersonToCall(agent.username)}
                        >
                          {agent.name}({agent.username})
                        </a>
                      ))
                    ) : (
                      <li>No Agents data found.</li>
                    )}
                  </div>
                </div> */}
                <div class="dropdown" data-tooltip-id="call_transfer">
                  <button
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    className="btn p-3 btn-light rounded-circle "
                    type="button"
                  >
                    <BiTransferAlt size={25} />
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
                <div className="d-flex justify-content-center mt-4 mb-2 mx-1">
                  <button
                    className="btn btn-danger rounded-circle p-3"
                    onClick={handleDisconnectCall}
                  >
                    <FaPhone size={24} />
                  </button>
                </div>
                {/* )} */}
                {callStatus === "INCOMING" && (
                  <div className="d-flex justify-content-center mt-4 mb-2 mx-1">
                    <button
                      className="btn btn-success rounded-circle p-3"
                      onClick={handleAcceptCall}
                    >
                      <FaPhone size={24} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* {userState !== "ON_CALL" && ( */}
          <footer className="w-100 d-flex justify-content-between">
            {userState === "ON_CALL" && (
              <>
                <button
                  type="button"
                  style={{
                    borderStartStartRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                  class=" py-1 border-none btn-primary btn-md  w-50 "
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
            {userState !== "ON_CALL" && (
              <button
                type="button"
                style={{
                  borderStartStartRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
                class=" py-1 border-none btn-primary btn-md  w-50 "
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
              style={{
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
              class="py-1 border-none btn-primary btn-md w-50"
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
          </footer>
          {/* )} */}
        </div>
      </Popup>
    </div>
  );
};

export default Dialer;
