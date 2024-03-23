import moment from "moment";
import React from "react";
import { FaArchive, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { updateEmailRec } from "../../../../../redux/services/email";
import _ from "lodash";
const EmailsList = ({ emailsData, emails, onEmailDetail, dispatch, token }) => {
  const handleEmailClick = (id) => {
    const repliesData = emails.filter((email) => email.parent_id === id);
    const selectedEmail = emailsData.filter((email) => email.id === id)[0];
    const data = {
      subject: selectedEmail?.subject,
      selectedEmail: selectedEmail,
      emails: repliesData,
    };
    onEmailDetail(data);
  };
  const handleImportantClick = (email_id, status) => {
    dispatch(updateEmailRec(token, email_id, { isRead: true, status: status }));
    return {};
  };
  function extractCharactersFromArray(str) {
    const firstCharacter = str?.charAt(0);
    const spaceIndex = str?.indexOf(" ");
    const characterAfterSpace =
      spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : "";
    return { firstCharacter, characterAfterSpace };
  }
  return (
    <ul className="email-list list-group list-group-flush">
      {emailsData?.length > 0 &&
        emailsData?.map((email, index) => (
          <li
            onClick={() => handleEmailClick(email.id)}
            className={`list-group-item`}
            key={index}
          >
            <div className="media">
              <div className="media-head">
                {/* <div class="avatar avatar-sm avatar-rounded position-relative">
                  <span
                    class="initial-wrap bg-primary"
                    style={{ color: "white" }}
                  >
                    {_.capitalize(
                      extractCharactersFromArray(email?.sender).firstCharacter
                    ) +
                      _.capitalize(
                        extractCharactersFromArray(email?.sender)
                          .characterAfterSpace
                      )}
                  </span>
                  <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                </div> */}
                <div className="avatar avatar-sm avatar-rounded">
                  <img
                    // src="dist/img/avatar2.jpg"
                    src={email?.sender?.avatar}
                    alt="user"
                    className="avatar-img"
                  />
                </div>
                <span className="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
              </div>
              <div className="media-body">
                <div>
                  <div>
                    <div className="email-head">{email?.sender?.name}</div>
                    <div>
                      <span className="email-star marked">
                        <span className="feather-icon pt-1">
                          {/* <i data-feather="star"></i> */}
                          {email?.status === "important" ? (
                            <FaStar
                              onClick={() =>
                                handleImportantClick(email?.id, "active")
                              }
                            />
                          ) : (
                            <FaRegStar
                              onClick={() =>
                                handleImportantClick(email?.id, "important")
                              }
                            />
                          )}
                        </span>
                        <span className="px-2 pb-1">
                          <FaArchive
                            color="#007d88"
                            onClick={() =>
                              handleImportantClick(email?.id, "archive")
                            }
                          />
                        </span>
                        <span className="px-1 pb-1">
                          <FaTrash
                            color="red"
                            onClick={() =>
                              handleImportantClick(email?.id, "blocked")
                            }
                          />
                        </span>
                      </span>

                      <div className="email-time">
                        {moment(email.created_at, "h:mm A").format("h:mm A")}
                      </div>
                    </div>
                  </div>
                  <div className="email-subject">{email.subject}</div>
                  <div className="email-text">
                    <p>{email?.body?.slice(0, 200)}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default EmailsList;
