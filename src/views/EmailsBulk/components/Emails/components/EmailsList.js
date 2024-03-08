import moment from "moment";
import React from "react";
import { FaArchive, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { updateEmailRec } from "../../../../../redux/services/email";
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
  return (
    <ul class="email-list list-group list-group-flush">
      {emailsData?.length > 0 &&
        emailsData?.map((email, index) => (
          <li
            onClick={() => handleEmailClick(email.id)}
            class="list-group-item"
            key={index}
          >
            <div class="media">
              <div class="media-head">
                <div class="avatar avatar-sm avatar-rounded">
                  <img
                    // src="dist/img/avatar2.jpg"
                    src={email?.sender?.avatar}
                    alt="user"
                    class="avatar-img"
                  />
                </div>
                <span class="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
              </div>
              <div class="media-body">
                <div>
                  <div>
                    <div class="email-head">{email?.sender?.name}</div>
                    <div>
                      <span class="email-star marked">
                        <span class="feather-icon pt-1">
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

                      <div class="email-time">
                        {moment(email.created_at, "h:mm A").format("h:mm A")}
                      </div>
                    </div>
                  </div>
                  <div class="email-subject">{email.subject}</div>
                  <div class="email-text">
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
