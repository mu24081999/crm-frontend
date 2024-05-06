import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactRec,
  getContactDetais,
  getContactsList,
  updateContactRec,
} from "../../../redux/services/contact";
import Loader from "../../../components/Loader/Loader";
import {
  FaArchive,
  FaArrowDown,
  FaCopy,
  FaEdit,
  FaRegStar,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import { SocketContext } from "../../../Context";

const ContactList = ({ contactsData, onToggleEdit, isEdit }) => {
  const { handleToggleShowLeadDetail, showLeadDetails } =
    useContext(SocketContext);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.contact);
  useEffect(() => {
    if (token) {
      dispatch(getContactsList(token));
    }
  }, [dispatch, token]);
  const handleDeleteContact = (contact_id) => {
    dispatch(deleteContactRec(token, contact_id));
    onToggleEdit(false);
  };
  const handleToggle = (contact_id) => {
    // onToggleEdit(true);
    // dispatch(getContactDetais(token, contact_id));
    handleToggleShowLeadDetail(true, contact_id, token);
  };
  const handleUpdateStatus = (contact_id, status) => {
    dispatch(updateContactRec(token, contact_id, { status: status }));
  };

  return (
    <div className="contact-list-view">
      {!isEdit && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <table className="table w-100 mb-5">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Phone</th>
                  <th>Tags</th>
                  <th>Labels</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contactsData?.length > 0 &&
                  contactsData?.map((contact) => (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="contact-star marked">
                            <span className="feather-icon">
                              {/* <i data-feather="star"></i> */}
                              {contact?.status === "important" ? (
                                <FaStar
                                  onClick={() =>
                                    handleUpdateStatus(contact?.id, "active")
                                  }
                                />
                              ) : (
                                <FaRegStar
                                  onClick={() =>
                                    handleUpdateStatus(contact?.id, "important")
                                  }
                                />
                              )}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs avatar-rounded">
                              <img
                                src={
                                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj0HSlpGrcoSJqHfu9TPqo_WhhuWwq8t8zb5lbp5ES8w&s" ||
                                  contact?.avatar
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
                              onClick={() => handleToggle(contact?.id)}
                            >
                              <span
                                className="d-block text-high-em text-primary border-bottom"
                                style={{ width: "max-content" }}
                              >
                                {contact?.firstname +
                                  " " +
                                  contact?.middlename +
                                  " " +
                                  contact?.lastname +
                                  " "}
                              </span>
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="text-truncate">{contact?.email}</td>
                      <td>{contact?.phone}</td>
                      <td>
                        {/* {contact?.tags &&
                          contact?.tags?.length > 0 &&
                          contact?.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="badge badge-soft-danger  my-1  me-2"
                            >
                              {tag.name}
                            </span>
                          ))} */}
                      </td>
                      <td>{contact?.designation}</td>
                      <td>
                        {moment(contact?.created_at).format("DD MMM, YYYY")}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex">
                            <a
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-bs-original-title="Archive"
                              // href="/"
                              onClick={() =>
                                handleUpdateStatus(contact?.id, "archived")
                              }
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  {/* <i data-feather="archive"></i> */}
                                  <FaArchive />
                                </span>
                              </span>
                            </a>
                            <a
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-bs-original-title="Edit"
                              onClick={() => handleToggle(contact?.id)}
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
                              onClick={() => handleDeleteContact(contact?.id)}
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
