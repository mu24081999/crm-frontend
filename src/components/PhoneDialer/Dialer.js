import React, { useContext, useState } from "react";
import { FaPhone, FaPlus, FaTimes } from "react-icons/fa";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./dialer.css";
import InputField from "../FormFields/InputField";
import { useForm } from "react-hook-form";
import { IoIosKeypad, IoIosRecording, IoIosTimer } from "react-icons/io";
import { MdOutlineContacts } from "react-icons/md";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Device } from "twilio-client";
import {
  getAllClaimedNumbers,
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
import Loader from "../Loader/Loader";
import { updateUserRec } from "../../redux/services/users";
import { setAccount } from "../../redux/slices/auth";
import { SocketContext } from "../../Context";
import { getBalance } from "../../redux/services/balance";
import { toast } from "react-toastify";
//Helpers

const Dialer = () => {
  const {
    setCallingDevice,
    isDial,
    setIsDial,
    showCall,
    setShowCall,
    isDialerOpen,
    setIsDialerOpen,
    activeCall,
    setActiveCall,
    userState,
    setUserState,
    callStatus,
    setCallStatus,
    showContacts,
    setShowContacts,
    connection,
    setConnection,
    activeCallSid,
    setActiveCallSid,
    inputValue,
    setInputValue,
    timer,
    setTimer,
    Timer,
  } = useContext(SocketContext);
  console.log("🚀 ~ Dialer ~ callStatus:", callStatus);
  const {
    // handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  // const [inputValue, setInputValue] = useState("");
  // const [isDial, setIsDial] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [showContacts, setShowContacts] = useState(false);
  // const [isDialerOpen, setIsDialerOpen] = useState(false);
  // const [callStatus, setCallStatus] = useState(null);
  const [twilioDevice, setTwilioDevice] = useState(null);
  // const [userState, setUserState] = useState("READY");
  // const [showCall, setShowCall] = useState(false);
  // const [connection, setConnection] = useState(false);
  // const [activeCall, setActiveCall] = useState(null);
  // const [activeCallSid, setActiveCallSid] = useState(null);
  const [anotherActiveCall, setAnotherActiveCall] = useState(null);
  const [active, setActive] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [agents, setAgents] = useState([]);
  const [callMuted, setCallMuted] = useState(false);
  const [recording, setRecording] = useState(false);
  // const [timer, setTimer] = useState({ hours: 0, mins: 0, sec: 0 });

  const dispatch = useDispatch();
  const { token, user, accountSid, accountAuthToken } = useSelector(
    (state) => state.auth
  );
  const { claimedNumbers } = useSelector((state) => state.calling);
  const { contacts } = useSelector((state) => state.contact);
  const { balanceDetails } = useSelector((state) => state.balance);
  const { users, isLoading: userLoading } = useSelector((state) => state.user);
  // const [activeRecordingSid, setActiveRecordingSid] = useState(null);
  const backendURL = process.env.REACT_APP_BACKEND_URL_PRODUCTION;
  const selectedNumberWatcher = watch("my_numbers");
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
  useEffect(() => {
    if (selectedNumberWatcher?.value === undefined) {
      setValue("my_numbers", {
        label: user?.phone,
        value: user?.phone,
      });
    }
  }, [selectedNumberWatcher, user, setValue]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        backendURL + "/user/calling/get-call-token",
        {
          from_phone:
            selectedNumberWatcher?.value !== undefined
              ? selectedNumberWatcher.value
              : user?.phone,
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
        setCallingDevice(device);
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
        if (activeCall !== null) {
          console.log("🚀 ~ twilioDevice.on ~ activeCall:", activeCall);
          call.reject();
        } else {
          setActiveCall(call);
          setShowCall(true);
          setIsDialerOpen(true);
          setUserState("ON_CALL");
          setCallStatus("INCOMING");
          setIsDial(false);
          setShowContacts(false);
          console.log("Call comming");
        }
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
    dispatch(getBalance(token));
    dispatch(
      getAllClaimedNumbers(token, { accountSid, authToken: accountAuthToken })
    );
  }, [dispatch, token, accountAuthToken, accountSid]);
  const makeCall = () => {
    const params = { To: inputValue };
    if (_.toInteger(balanceDetails?.credit) <= 0) {
      toast.error("You have insufficient credit to make this call.");
    } else {
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
        setTimer({ hours: 0, mins: 0, sec: 0 });
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
        setTimer({ hours: 0, mins: 0, sec: 0 });
        setShowCall(false);
        setUserState("READY");
        setIsDial(true);
        setShowContacts(false);
        setCallStatus(null);
      });
    }

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
      setAlertMessage(null);
      setTimer({ hours: 0, mins: 0, sec: 0 });
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
  const pauseRecording = async () => {
    setAlertMessage("Call Recording paused.");
    setRecording(false);
    console.log("pause", recording);
    const is_updated = await dispatch(
      updateUserRec(token, { user_id: user.id, recording: 0 }, user.id)
    );
    console.log("🚀 ~ pauseRecording ~ is_updated:", is_updated);
    if (is_updated === true) {
      const newUser = {
        ...user,
        recording: recording,
      };
      dispatch(setAccount(newUser));
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
  const resumeRecording = async () => {
    setRecording(true);

    const is_updated = await dispatch(
      updateUserRec(token, { user_id: user.id, recording: 1 }, user.id)
    );
    console.log("🚀 ~ pauseRecording ~ is_updated:", is_updated);
    if (is_updated === true) {
      const newUser = {
        ...user,
        recording: recording,
      };
      dispatch(setAccount(newUser));
    }
    // if (connection && connection?.mediaStream) {
    //   connection?.mediaStream?.resumeRecording();
    // }
    setAlertMessage("Call recording resumed.");
  };

  // const [timer, setTimer] = useState({ hours: 0, mins: 0, sec: 0 });
  // const Timer = () => {
  //   const getTime = () => {
  //     setTimer((state) => ({
  //       hours: state.mins === 60 ? state.hours + 1 : state.hours,
  //       mins: state.sec === 60 ? state.mins + 1 : state.mins,
  //       sec: state.sec === 60 ? 0 : state.sec + 1,
  //     }));
  //   };
  //   useEffect(() => {
  //     const interval = setInterval(() => getTime(), 1000);
  //     return () => clearInterval(interval);
  //   }, []);
  //   return (
  //     <div className="badge bg-light badge-lg text-dark">
  //       <span>
  //         <IoIosTimer size={16} style={{ marginRight: "4%" }} />
  //         {`${timer.hours < 9 ? "0" + timer.hours : timer.hours} :
  //         ${timer.mins < 9 ? "0" + timer.mins : timer.mins} :

  //          ${timer.sec < 9 ? "0" + timer.sec : timer.sec}`}
  //       </span>
  //     </div>
  //   );
  // };
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
        {/* <div className="dropdown-menu dropdown-menu-end p-0"> */}
        <div
          style={{
            padding: "1%",
            width: "290px",
            height: isDial || showContacts ? "450px" : "400px",
          }}
        >
          {(callStatus === "STARTED" || userState === "ON_CALL") && (
            <div
              className="  position-absolute"
              style={{
                visibility: showCall ? "unset" : "hidden",
                marginTop: "57%",
                marginLeft: "31%",
              }}
            >
              <Timer />
            </div>
          )}
          {isDial && (
            <table id="dialer_table">
              <tr style={{ height: "50px" }}>
                <div className="w-100 px-2 pt-2 d-flex">
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
                      top: "4%",
                      width: "max-content",
                    }}
                  >
                    <LuDelete color="teal" />
                  </div>
                </div>
              </tr>
              <tr className="dialer_num_tr pt-2">
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 1)}
                >
                  <span>1</span>
                  <span className="fs-6 px-3"></span>
                </td>
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 2)}
                >
                  2
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    ABC
                  </span>
                </td>
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 3)}
                >
                  3
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    DEF
                  </span>
                </td>
              </tr>
              <tr className="dialer_num_tr">
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 4)}
                >
                  4
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    GHI
                  </span>
                </td>
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 5)}
                >
                  5
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    JKL
                  </span>
                </td>
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 6)}
                >
                  6
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    MNO
                  </span>
                </td>
              </tr>
              <tr className="dialer_num_tr">
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 7)}
                >
                  7
                  <span
                    className=" px-1 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    PQRS
                  </span>
                </td>
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 8)}
                >
                  8
                  <span
                    className=" px-2 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    TUV
                  </span>
                </td>
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 9)}
                >
                  9
                  <span
                    className=" px-1 text-light"
                    style={{ fontSize: "12px" }}
                  >
                    WXYZ
                  </span>
                </td>
              </tr>
              <tr className="dialer_num_tr">
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", "+")}
                >
                  +<span className="px-2">,.:</span>
                </td>
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", 0)}
                >
                  0<span className="px-3"></span>
                </td>
                <td
                  className="dialer_num"
                  onClick={() => dialerClick("dial", "*")}
                >
                  <span className="fs-2">*</span>
                  <span className="px-3"></span>
                </td>
              </tr>
              <tr className="mt-5 p-0">
                <td colspan="3">
                  <div className="d-flex py-3">
                    {/* {user?.parent_id !== null && user?.client_id === null && ( */}
                    <div className="w-100 mt-2 mb-2 px-2">
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
                                  label: key?.friendlyName,
                                  value: key?.phoneNumber,
                                };
                              })
                            : user?.role === "AGENT" &&
                              user?.twilio_numbers?.numbers?.length > 0
                            ? user?.twilio_numbers?.numbers?.map(
                                (key, index) => {
                                  return {
                                    label: key?.friendlyName,
                                    value: key?.phoneNumber,
                                  };
                                }
                              )
                            : []
                        }
                      />
                    </div>
                    {/* )} */}
                    <div className="mt-2 pe-2">
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <button
                          className="btn btn-primary rounded-pill btn-lg"
                          onClick={makeCall}
                        >
                          Call
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          )}
          {showContacts && (
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
                        <div className="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                          <span className="initial-wrap">
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
            <div className="py-3" style={{ backgroundColor: "#00808017" }}>
              {/* <div className="w-100 pb-2">
              {alertMessage !== null && (
                <p className="badge w-100 bg-light text-dark">{alertMessage}</p>
              )}
            </div> */}
              <div>
                <div className="d-flex justify-content-center">
                  <img
                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                    alt="new"
                    width={120}
                    className="rounded-circle p-0"
                  />
                </div>
                <div className="text-center">
                  {activeCall?.parameters?.From ||
                    activeCall?.parameters?.To ||
                    inputValue ||
                    "090078609"}
                </div>
              </div>

              <div className="pt-5">
                <ReactTooltip
                  id="off_mic"
                  place="top"
                  content="Turn off/on microphone"
                />
                <ReactTooltip
                  id="off_record"
                  place="top"
                  content="Turn off/on recording"
                />
                <ReactTooltip
                  id="call_transfer"
                  place="bottom"
                  content="Transfer Call"
                />
                <ReactTooltip id="dialpad" place="bottom" content="Dialpad" />
                <div className="d-flex justify-content-center gap-3 pt-5">
                  <button
                    className={`btn p-2 rounded`}
                    style={{
                      backgroundColor:
                        callMuted === false ? "#eaeaea" : "#ff7270",
                      color: callMuted === true ? "white" : "#262a2e",
                    }}
                    data-tooltip-id="off_mic"
                    onClick={callMuted === false ? muteCall : unmuteCall}
                  >
                    <CiMicrophoneOn size={28} />
                  </button>
                  <button
                    className={`btn p-2 rounded`}
                    style={{
                      backgroundColor: user.recording ? "#ff7270" : "#eaeaea",
                      color: user.recording === 0 ? "#262a2e" : "white",
                    }}
                    data-tooltip-id="off_record"
                    onClick={user?.recording ? pauseRecording : resumeRecording}
                  >
                    {userLoading ? <Loader /> : <PiRecordFill size={25} />}
                  </button>
                  <button
                    className="btn p-2 btn-light rounded"
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
                  <div className="dropdown" data-tooltip-id="call_transfer">
                    <button
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      className="btn p-2 btn-light rounded "
                      type="button"
                    >
                      <BiTransferAlt size={25} />
                    </button>
                    <div role="menu" className="dropdown-menu">
                      {agents?.length > 0 ? (
                        agents?.map((agent, index) => (
                          <a
                            key={index}
                            className="dropdown-item"
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
                </div>
                <div className="d-flex justify-content-center gap-3 pt-3"></div>
              </div>
              <div
                className={`d-flex justify-content-${
                  callStatus === "INCOMING" ? "between" : "center"
                } mx-5 gap-3 `}
              >
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
            {userState === "ON_CALL" && isDial && (
              <>
                <button
                  type="button"
                  style={{
                    borderStartStartRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                  className=" py-1 border-none btn-primary btn-md btn-block "
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
              <>
                <button
                  type="button"
                  style={{
                    borderStartStartRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                  className=" py-1 border-none btn-primary btn-md  w-50 "
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
                <button
                  type="button"
                  style={{
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                  className="py-1 border-none btn-primary btn-md w-50"
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
              </>
            )}
          </footer>
          {/* )} */}
        </div>
        {/* </div> */}
      </Popup>
    </div>
  );
};

export default Dialer;
