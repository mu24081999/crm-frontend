import React, { useState } from "react";
import { FaPhone, FaPhoneSlash, FaSpeakerDeck } from "react-icons/fa";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./dialer.css";
import InputField from "../FormFields/InputField";
import { useForm } from "react-hook-form";
import { IoIosKeypad } from "react-icons/io";
import { MdOutlineContacts } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/services/users";
import { useSelector } from "react-redux";
import { Device } from "twilio-client";
import {
  getAllClaimedNumbers,
  makeUserToCall,
} from "../../redux/services/calling";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import axios from "axios";
import { getContactsList } from "../../redux/services/contact";
import ReactSelectField from "../FormFields/reactSelectField";

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
  const [showContacts, setShowContacts] = useState(false);
  const [isDialerOpen, setIsDialerOpen] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  const [twilioDevice, setTwilioDevice] = useState(null);
  const [userState, setUserState] = useState("READY");
  const [activeCall, setActiveCall] = useState(null);
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();
  const { token, user, accountSid, accountAuthToken } = useSelector(
    (state) => state.auth
  );
  const { claimedNumbers } = useSelector((state) => state.calling);
  const { contacts } = useSelector((state) => state.contact);
  const backendURL = process.env.REACT_APP_BACKEND_URL_PRODUCTION;

  const selectedNumberWatcher = watch("my_numbers");
  useEffect(() => {
    axios
      .post(
        backendURL + "/user/calling/get-call-token",
        {
          from_phone: selectedNumberWatcher?.value,
          accountSid: accountSid,
          identity: user.username,
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
        setIsDialerOpen(true);
        setActiveCall(call);
        setUserState("ON_CALL");
        setCallStatus("INCOMING");
        setIsDial(false);
        setShowContacts(false);
        console.log("Call comming");
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
      setActiveCall(call);
      setUserState("ON_CALL");
      setIsDial(false);
      setShowContacts(false);
      setCallStatus("STARTED");
      console.log("Call accepted");
    });
    outgoingCall.on("reject", () => {
      setUserState("READY");
      setIsDial(true);
      setShowContacts(false);
      setCallStatus(null);

      console.log("Call accepted");
    });
    outgoingCall.on("disconnect", () => {
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
      setActiveCall(null); // Reset active call state
      setIsDial(true);
      setShowContacts(false);
      setUserState("READY");
    }
  };
  const handleAcceptCall = () => {
    if (activeCall) {
      activeCall.accept(); // Disconnect the active call
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
                  <button
                    className="btn btn-primary rounded-pill btn-lg"
                    onClick={makeCall}
                  >
                    Call
                  </button>
                  {/* <div className="w-100 d-flex flex-wrap gap-2 mt-4">
                    <p className="fs-6 pt-3">Call From</p>
                    <InputField
                      name="subject"
                      placeholder="Phone Number"
                      control={control}
                      errors={errors}
                      value={user.phone}
                      isDisabled={true}
                    />
                  </div> */}
                  <div className="w-100 mt-2">
                    <ReactSelectField
                      name="my_numbers"
                      placeholder="Call From"
                      control={control}
                      errors={errors}
                      options={
                        claimedNumbers?.length > 0 &&
                        claimedNumbers?.map((key, index) => {
                          return {
                            label: key?.phoneNumber,
                            value: key?.phoneNumber,
                          };
                        })
                      }
                    />
                  </div>
                </td>
              </tr>
            </table>
          )}
          {showContacts && (
            <>
              <header>
                {/* <div className="row p-3">
                <button className="col-6 btn btn-primary ">All Contacts</button>
                <button className="btn btn-primary col-6">Recent</button>
              </div> */}
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
              </header>
              <div
                className="list-group"
                style={{ height: "400px", overflow: "scroll" }}
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
          {userState === "ON_CALL" && (
            <div>
              <div className="rounded-circle mb-5">
                <div className="m-auto w-50">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
                    alt="new"
                    width={150}
                  />
                  <p>{activeCall?.parameters?.From}</p>
                </div>
              </div>
              {callStatus === "STARTED" && (
                <div className="my-5 text-center">
                  <Timer />
                </div>
              )}
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

          <footer className="w-100 d-flex justify-content-between p-1 gap-1">
            <button
              type="button"
              class="btn btn-primary btn-md "
              onClick={() => {
                setIsDial(false);
                setShowContacts(true);
                setUserState("READY");
              }}
            >
              <MdOutlineContacts />
              &nbsp; Contacts
            </button>
            <button
              type="button"
              class="btn btn-primary btn-md w-50"
              onClick={() => {
                setIsDial(true);
                setShowContacts(false);
                setUserState("READY");
              }}
            >
              <IoIosKeypad className="mb-1" />
              &nbsp; Dial
            </button>
          </footer>
        </div>
      </Popup>
    </div>
  );
};

export default Dialer;
