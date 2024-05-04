import React from "react";
import { CiMenuKebab } from "react-icons/ci";

const Contacts = ({
  contacts,
  onDataFromChild,
  onChatDataFromChild,
  onContactsDataFromChild,
  onMessagesDataFromChild,
  messages,
  authUser,
}) => {
  const handleContactClick = (contact) => {
    onDataFromChild(contact);
    onChatDataFromChild(true);
    onContactsDataFromChild(false);
    const messagesData =
      messages?.length > 0 &&
      messages?.filter(
        (message) =>
          (message.from_phone === authUser.phone &&
            message.to_phone === contact.phone) ||
          (message.to_phone === authUser.phone &&
            message.from_phone === contact.phone)
      );
    onMessagesDataFromChild(messagesData);
  };
  function extractCharactersFromArray(str) {
    const firstCharacter = str?.charAt(0);
    const spaceIndex = str?.indexOf(" ");
    const characterAfterSpace =
      spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : "";
    return { firstCharacter, characterAfterSpace };
  }
  return (
    <div className="contact-list-wrap">
      <ul className="chat-contacts-list list-group list-group-flush">
        {Object.entries(contacts)?.map(([char, contacts]) => (
          <li key={char}>
            <div className="title title-wth-divider text-primary my-3">
              <span>{char}</span>
            </div>
            <div>
              {contacts?.map((contact, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="media">
                    <div className="media-head">
                      <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                        <span class="initial-wrap">
                          {extractCharactersFromArray(
                            contact.firstname + " " + contact.lastname
                          ).firstCharacter +
                            extractCharactersFromArray(
                              contact.firstname + " " + contact.lastname
                            ).characterAfterSpace}
                        </span>
                      </div>
                    </div>
                    <div className="media-body">
                      <div>
                        <div className="user-name">
                          {contact?.firstname}&nbsp;
                          {contact?.lastname}
                        </div>
                        <div className="user-status">{contact?.phone}</div>
                      </div>
                      <div>
                        <div className="dropdown action-drp">
                          <a
                            href="#"
                            className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                            data-bs-toggle="dropdown"
                          >
                            <span className="icon">
                              <span className="feather-icon">
                                {/* <i data-feather="more-horizontal"></i> */}
                                <CiMenuKebab />
                              </span>
                            </span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">
                              Delete Chat
                            </a>
                            <a className="dropdown-item link-danger" href="#">
                              Block
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
