import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsList } from "../../../../redux/services/contact";
import Loader from "../../../../components/Loader/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment";
import { SocketContext } from "../../../../Context";
import { deleteUserRec, updateUserRec } from "../../../../redux/services/users";
import _ from "lodash";

const ContactList = ({ usersData, onToggleEdit, isEdit, allUsers }) => {
  console.log("🚀 ~ ContactList ~ allUsers:", allUsers);
  const { handleToggleShowUserDetail } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.contact);
  useEffect(() => {
    if (token) {
      dispatch(getContactsList(token));
    }
  }, [dispatch, token]);
  const handleDeleteContact = (contact_id) => {
    dispatch(deleteUserRec(token, contact_id));
    onToggleEdit(false);
  };
  const handleToggle = (user_id) => {
    // onToggleEdit(true);
    // dispatch(getContactDetais(token, contact_id));
    // handleToggleShowLeadDetail(true, contact_id, token);
    handleToggleShowUserDetail(true, user_id, token);
  };
  const handleUpdateStatus = (contact_id, status) => {
    dispatch(updateUserRec(token, { status: status }, contact_id));
  };

  return (
    <div
      className="contact-list-view"
      style={{ height: "100%", overflow: "scroll" }}
    >
      {!isEdit && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <table className="table w-100 mb-5">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Parent Account</th>
                  <th>Email Address</th>
                  <th>Status</th>
                  <th>No of Agents</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {usersData?.length > 0 &&
                  usersData?.map((contact) => (
                    <tr>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs avatar-rounded">
                              <img
                                src={
                                  contact.avatar ||
                                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj0HSlpGrcoSJqHfu9TPqo_WhhuWwq8t8zb5lbp5ES8w&s"
                                }
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div
                            className="media-body"
                            style={{ cursor: "pointer" }}
                          >
                            <a
                              className=" "
                              onClick={() => handleToggle(contact.id)}
                            >
                              <span
                                className="d-block text-high-em text-primary border-bottom"
                                style={{ width: "max-content" }}
                              >
                                {contact.name}
                              </span>
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="">
                        {
                          allUsers?.filter(
                            (usr) => _.toInteger(contact.parent_id) === usr.id
                          )[0]?.name
                        }
                      </td>

                      <td className="text-truncate">{contact.email}</td>
                      <td>
                        <span
                          className={`${
                            contact?.status === "active"
                              ? " badge rounded text-bg-primary "
                              : "badge rounded text-bg-danger"
                          }  justify-content-around mt-3`}
                        >
                          {contact?.status}
                        </span>
                      </td>
                      <td className="text-center">
                        {
                          allUsers?.filter(
                            (usr) => _.toInteger(usr.client_id) === contact.id
                          )?.length
                        }
                      </td>
                      <td>
                        {moment(contact?.created_at).format("DD, MMM YYYY")}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex">
                            <a
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-bs-original-title="Edit"
                              // to={`/edit-contact/${contact.id}`}
                              onClick={() => handleToggle(contact.id)}
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  {/* <i data-feather="edit"></i> */}
                                  <FaEdit />
                                </span>
                              </span>
                            </a>
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  {/* <i data-feather="trash"></i> */}
                                  <FaTrash />
                                </span>
                              </span>
                            </button>
                          </div>
                          {/* <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <FaArrowDown />
                                </span>
                              </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a
                                onClick={() => handleToggle()}
                                className="dropdown-item"
                                // href="edit-contact.html"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <FaEdit />
                                </span>
                                <span>Edit Contact</span>
                              </a>
                              <button
                                onClick={() => handleDeleteContact(contact.id)}
                                className="dropdown-item"
                                href="/"
                              >
                                <span className="feather-icon dropdown-icon">
                                  <FaTrash />
                                </span>
                                <span>Delete</span>
                              </button>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  <FaCopy />
                                </span>
                                <span>Duplicate</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <h6 className="dropdown-header dropdown-header-bold">
                                Change Labels
                              </h6>
                              <a className="dropdown-item" href="/">
                                Design
                              </a>
                              <a className="dropdown-item" href="/">
                                Developer
                              </a>
                              <a className="dropdown-item" href="/">
                                Inventory
                              </a>
                              <a className="dropdown-item" href="/">
                                Human Resource
                              </a>
                            </div>
                          </div> */}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
