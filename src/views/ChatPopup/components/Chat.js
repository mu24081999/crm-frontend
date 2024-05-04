import moment from "moment";
import React from "react";

const Chat = ({ selectedMessages, authUser, selectedContact }) => {
  console.log("🚀 ~ Chat ~ selectedMessages:", selectedMessages);
  function extractCharactersFromArray(str) {
    const firstCharacter = str?.charAt(0);
    const spaceIndex = str?.indexOf(" ");
    const characterAfterSpace =
      spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : "";
    return { firstCharacter, characterAfterSpace };
  }
  return (
    <ul className="list-unstyled">
      {Object.entries(selectedMessages).map(([date, messages]) => (
        <div key={date}>
          <li className="day-sep">
            <span>{date}</span>
          </li>
          {messages?.map((message, index) => (
            <div key={index}>
              {message?.from_phone !== authUser.phone ? (
                <li className="media received">
                  <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                    <span class="initial-wrap">
                      {extractCharactersFromArray(
                        selectedContact.firstname +
                          " " +
                          selectedContact.lastname
                      ).firstCharacter +
                        extractCharactersFromArray(
                          selectedContact.firstname +
                            " " +
                            selectedContact.lastname
                        ).characterAfterSpace}
                    </span>
                  </div>
                  <div className="media-body">
                    <div className="msg-box">
                      <div>
                        <p>{message?.message}</p>
                        <span className="chat-time">
                          {moment(message?.created_at).format("HH:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li className="media sent">
                  <div className="media-body">
                    <div className="msg-box">
                      <div>
                        <p>{message?.message}</p>
                        <span className="chat-time">
                          {moment(message?.created_at).format("HH:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </div>
          ))}
        </div>
      ))}
      {/* <li className="media received">
        <div className="avatar avatar-xs avatar-rounded">
          <img src="dist/img/avatar8.jpg" alt="user" className="avatar-img" />
        </div>
        <div className="media-body">
          <div className="msg-box">
            <div>
              <p>Cool, lets talk about it tomorrow</p>
              <span className="chat-time">10:52 PM</span>
              <div className="msg-action">
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    Reply
                  </a>
                  <a className="dropdown-item" href="#">
                    Forward
                  </a>
                  <a className="dropdown-item" href="#">
                    Copy
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="msg-box">
            <div>
              <p>Images for new marketing pages have been sent</p>
              <span className="chat-time">10:53 PM</span>
              <div className="msg-action">
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    Reply
                  </a>
                  <a className="dropdown-item" href="#">
                    Forward
                  </a>
                  <a className="dropdown-item" href="#">
                    Copy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="day-sep">
        <span>Today</span>
      </li>
      <li className="media media-attachment received">
        <div className="avatar avatar-xs avatar-rounded">
          <img src="dist/img/avatar8.jpg" alt="user" className="avatar-img" />
        </div>
        <div className="media-body msg-docs">
          <div className="msg-box">
            <div>
              <div className="media">
                <div className="avatar avatar-icon avatar-sm avatar-blue">
                  <span className="initial-wrap fs-3">
                    <i className="ri-file-excel-2-fill"></i>
                  </span>
                </div>
                <div className="media-body">
                  <p className="file-name">Website_content.xls</p>
                  <p className="file-size">2,635 KB</p>
                </div>
              </div>
              <div className="file-overlay">
                <button className="btn btn-sm btn-icon btn-rounded btn-primary">
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="arrow-down"></i>
                    </span>
                  </span>
                </button>
              </div>
              <div className="msg-action">
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    Reply
                  </a>
                  <a className="dropdown-item" href="#">
                    Forward
                  </a>
                  <a className="dropdown-item" href="#">
                    Copy
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="msg-box">
            <div>
              <div className="media">
                <div className="avatar avatar-icon avatar-sm avatar-warning">
                  <span className="initial-wrap fs-3">
                    <i className="ri-file-zip-fill"></i>
                  </span>
                </div>
                <div className="media-body">
                  <p className="file-name">themeforest-pack.zip</p>
                  <p className="file-size">2.45 GB</p>
                </div>
              </div>
              <div className="file-overlay">
                <button className="btn btn-sm btn-icon btn-rounded btn-primary">
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="arrow-down"></i>
                    </span>
                  </span>
                </button>
              </div>
              <div className="msg-action">
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    Reply
                  </a>
                  <a className="dropdown-item" href="#">
                    Forward
                  </a>
                  <a className="dropdown-item" href="#">
                    Copy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="media sent">
        <div className="media-body">
          <div className="msg-box">
            <div>
              <p>
                Anyways, I am working on something that you would like to know.
              </p>
              <span className="chat-time">11:52 PM</span>
              <div className="msg-action">
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    Reply
                  </a>
                  <a className="dropdown-item" href="#">
                    Forward
                  </a>
                  <a className="dropdown-item" href="#">
                    Copy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="media media-attachment received">
        <div className="avatar avatar-xs avatar-rounded">
          <img src="dist/img/avatar8.jpg" alt="user" className="avatar-img" />
        </div>
        <div className="media-body msg-imgs">
          <div className="msg-box">
            <div>
              <img
                className="d-block img-fluid"
                src="dist/img/giphy.gif"
                alt="gif"
              />
              <div className="msg-action">
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    Reply
                  </a>
                  <a className="dropdown-item" href="#">
                    Forward
                  </a>
                  <a className="dropdown-item" href="#">
                    Copy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="media sent">
        <div className="media-body">
          <div className="msg-box">
            <div>
              <p>Haha, this is joke 😍</p>
              <span className="chat-time">10:52 PM</span>
              <div className="msg-action">
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-vertical"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    Reply
                  </a>
                  <a className="dropdown-item" href="#">
                    Forward
                  </a>
                  <a className="dropdown-item" href="#">
                    Copy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="media received typing-wrap">
        <div className="avatar avatar-xs avatar-rounded">
          <img src="dist/img/avatar8.jpg" alt="user" className="avatar-img" />
        </div>
        <div className="media-body">
          <div className="msg-box">
            <div>
              <div className="typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        </div>
      </li> */}
    </ul>
  );
};

export default Chat;
