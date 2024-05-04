import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaBell, FaUsers } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { GiSpeakerOff } from "react-icons/gi";

const Header = ({
  selectedContact,
  onChatDataFromChild,
  onContactsDataFromChild,
  onSelectedContactDataFromChild,
}) => {
  const handleUsersClick = () => {
    console.log("handleUsersClick");
    onContactsDataFromChild(true);
    onChatDataFromChild(false);
  };
  const handleContactsCloseClick = () => {
    console.log("handle Close clicked");
    onContactsDataFromChild(false);
    onChatDataFromChild(false);
    onSelectedContactDataFromChild({});
  };
  function extractCharactersFromArray(str) {
    const firstCharacter = str?.charAt(0);
    const spaceIndex = str?.indexOf(" ");
    const characterAfterSpace =
      spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : "";
    return { firstCharacter, characterAfterSpace };
  }
  return (
    <header>
      <div className="input-group contact-search-wrap d-none">
        <input
          type="text"
          className="form-control contact-search shadow-none"
          placeholder="Search contact"
        />
        <a
          href="javascript:void(0);"
          id="contact_list_close"
          className="btn btn-sm btn-icon btn-dark btn-rounded"
        >
          <span className="icon">
            <span className="feather-icon">
              {/* <i data-feather="x"></i> */}
              <IoCloseSharp />
            </span>
          </span>
        </a>
      </div>
      {selectedContact?.id && (
        <div className="media-wrap">
          <div className="media">
            <div className="media-head">
              <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                <span class="initial-wrap">
                  {extractCharactersFromArray(
                    selectedContact.firstname + " " + selectedContact.lastname
                  ).firstCharacter +
                    extractCharactersFromArray(
                      selectedContact.firstname + " " + selectedContact.lastname
                    ).characterAfterSpace}
                </span>
              </div>
            </div>
            <div className="media-body">
              <div className="user-name">
                {selectedContact?.firstname}&nbsp;{selectedContact?.lastname}
              </div>
              <div className="user-status">{selectedContact?.phone}</div>
            </div>
          </div>
        </div>
      )}
      <div className="chat-popup-action d-flex">
        <a
          href="javascript:void(0);"
          data-bs-toggle="dropdown"
          className="btn btn-sm btn-icon btn-dark btn-rounded"
        >
          <span className="icon">
            <span className="feather-icon">
              {/* <i data-feather="more-vertical"></i> */}
              <CiMenuKebab />
            </span>
          </span>
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#">
            {/* <i className="dropdown-icon zmdi zmdi-notifications-active"></i> */}
            <FaBell />
            <span>Send push notifications</span>
          </a>
          <a className="dropdown-item" href="#">
            {/* <i className="dropdown-icon zmdi zmdi-volume-off"></i> */}
            <GiSpeakerOff size={24} />

            <span>Mute Chat</span>
          </a>
        </div>
        <a
          //   href="javascript:void(0);"
          //   id="user_list"
          onClick={handleUsersClick}
          className="btn btn-sm btn-icon btn-dark btn-rounded"
        >
          <span className="icon">
            <span className="feather-icon">
              {/* <i data-feather="users"></i> */}
              <FaUsers />
            </span>
          </span>
        </a>
        <a
          href="javascript:void(0);"
          //   id="close_popup"
          onClick={handleContactsCloseClick}
          className="btn btn-sm btn-icon btn-dark btn-rounded"
        >
          <span className="icon">
            <span className="feather-icon">
              {/* <i data-feather="x"></i> */}
              <IoCloseSharp />
            </span>
          </span>
        </a>
      </div>
    </header>
  );
};

export default Header;
