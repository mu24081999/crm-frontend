import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SocketContext } from "../../../../Context";

import { FaInfo, FaPhone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/services/users";
import "./video.css";
import { FaMaximize, FaMinimize } from "react-icons/fa6";
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
const VideoCall = ({ selectedRoom, authUser, socket }) => {
  const {
    isCalling,
    callAccepted,
    stream,
    myVideo,
    call,
    answerCall,
    ringing,
    userVideo,
    callEnded,
    leaveCall,
    openCalling,
    callUser,
    readyForCall,
    type,
  } = useContext(SocketContext);
  console.log("🚀 ~ VideoCall ~ call:", call);

  const [selectedUser, setSelectedUser] = useState(null);
  const [usersArray, setUsersArray] = useState(null);
  const { users } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   readyForCall();
  // }, [readyForCall]);
  const callToUser = useCallback(() => {
    if (!isCalling && !call.isRecieving && openCalling) {
      callUser(
        selectedUser?.socket_id,
        authUser.name,
        type,
        selectedUser?.name
      );
    }
  }, [callUser, selectedUser, authUser, isCalling, call, openCalling, type]);
  useMemo(() => {
    callToUser();
  }, [callToUser]);
  useEffect(() => {
    if (users?.length > 0) {
      setUsersArray(users);
    }
  }, [users]);

  useEffect(() => {
    if (token) {
      dispatch(getUsers(token));
    }
  }, [token, dispatch]);
  useEffect(() => {
    const selectedId =
      selectedRoom.user_id_1 === authUser.id
        ? selectedRoom.user_id_2
        : selectedRoom.user_id_1;
    if (usersArray?.length > 0) {
      const response = usersArray?.filter((user) => user.id === selectedId);
      setSelectedUser(response[0]);
    }
  }, [usersArray, authUser, selectedRoom]);
  return (
    <div>
      <div
        id="video_call"
        class="modal"
        tabIndex="-1"
        role="dialog"
        togg="modal"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-xl chatapp-call-window"
          role="document"
        >
          <div
            class={`modal-content ${
              type === "video" ? "bg-primary-dark-5" : "bg-light"
            } `}
          >
            <div class="modal-header header-wth-bg bg-primary-dark-3">
              <h6 class="modal-title" style={{ color: "white" }}>
                {type === "video" ? "Video" : "Audio"} Call
              </h6>
              <div class="modal-action">
                <a
                  href="/"
                  class="btn btn-xs btn-icon btn-rounded btn-link link-secondary modal-fullscreen-togglable"
                >
                  <span class="icon">
                    <span class="feather-icon">
                      {/* <i data-feather="maximize"></i> */}
                      <FaMinimize />
                    </span>
                    <span class="feather-icon d-none">
                      {/* <i data-feather="minimize"></i> */}
                      <FaMaximize />
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div class="text-center m-auto">
              {type === "audio" && (
                <div
                  class="avatar avatar-xxxl avatar-rounded d-20 "
                  style={{ marginTop: "10%" }}
                >
                  <img
                    src={
                      (selectedRoom.user_id_1 === authUser?.id
                        ? selectedRoom.user_image_2
                        : selectedRoom.user_image_1) ||
                      "https://static-00.iconduck.com/assets.00/profile-default-icon-1024x1023-4u5mrj2v.png"
                    }
                    alt="user"
                    className="avatar-img m-auto"
                  />
                </div>
              )}
            </div>
            {/* user's video */}
            {callAccepted && !callEnded && (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{}}
                className="video-container"
                // controls="true"
              />
            )}
            <div class="modal-footer position-absolute bottom-0 w-100">
              <div className="d-flex justify-content-center w-100">
                <ul class="chatapp-call-action hk-list">
                  {/* <li>
                    <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="mic"></i>
                        </span>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="video"></i>
                        </span>
                      </span>
                    </button>
                  </li> */}
                  {call.isReceivingCall === true &&
                  // authUser.socket_id === call.from &&
                  ringing &&
                  call.userToCall === authUser.socket_id &&
                  !callAccepted ? (
                    <li>
                      <button
                        class="btn btn-icon btn-lg btn-rounded btn-success"
                        // data-bs-dismiss="modal"
                        onClick={answerCall}
                      >
                        <span class="icon">
                          <span class="feather-icon">
                            {/* <i data-feather="phone"></i> */}
                            <FaPhone />
                          </span>
                        </span>
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button
                        class="btn btn-icon btn-lg btn-rounded btn-danger"
                        data-bs-dismiss="modal"
                        onClick={() => leaveCall(selectedUser.socket_id)}
                      >
                        <span class="icon">
                          <span class="feather-icon">
                            {/* <i data-feather="phone"></i> */}
                            <FaPhone />
                          </span>
                        </span>
                      </button>
                    </li>
                  )}

                  {/* <li>
                    <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="user-plus"></i>
                        </span>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="more-vertical"></i>
                        </span>
                      </span>
                    </button>
                  </li> */}
                </ul>
                <div class="avatar avatar-lg avatar-rounded chatapp-caller-img ">
                  {/* {type === "video" && ( */}
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    width="140"
                    height="150"
                    // controls="true"
                  />
                  {/* )} */}

                  {type === "audio" && (
                    <img
                      src={
                        (selectedRoom.user_id_1 === authUser?.id
                          ? selectedRoom.user_image_1
                          : selectedRoom.user_image_2) ||
                        "https://static-00.iconduck.com/assets.00/profile-default-icon-1024x1023-4u5mrj2v.png"
                      }
                      alt="user"
                      className="avatar-img"
                    />
                  )}
                </div>
              </div>
              <div className="text-center">
                <h3
                  className={`mt-3`}
                  style={{ color: type === "audio" ? "black" : "white" }}
                >
                  {/* {selectedRoom.user_id_1 === authUser?.id
                    ? selectedRoom.user_name_2
                    : selectedRoom.user_name_1} */}
                  {selectedUser?.name || call?.name}
                </h3>
                {!callAccepted ? (
                  <p style={{ color: type === "audio" ? "black" : "white" }}>
                    {type === "audio" ? "Audio" : "Video"} Calling
                    <span class="one">.</span>
                    <span class="two">.</span>
                    <span class="three">.</span>
                  </p>
                ) : (
                  <Timer />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
