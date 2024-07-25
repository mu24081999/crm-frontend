import React, { useContext } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit, FaRegStar, FaTrash, FaUserCheck } from "react-icons/fa";
import { SocketContext } from "../../../../Context";
import moment from "moment";
import { deleteUserRec } from "../../../../redux/services/users";
import { loginUser } from "../../../../redux/services/auth";
import { useNavigate } from "react-router-dom";

const ContactCards = ({ contactsData, token, dispatch, onToggleEdit }) => {
  const redirectTo = useNavigate();
  const { handleToggleShowUserDetail } = useContext(SocketContext);
  const handleLoginAccount = (account) => {
    dispatch(loginUser(account?.email, account?.password, true));
    // dispatch(setAccount(account));
    redirectTo("/");
  };
  const handleToggle = (user_id) => {
    // onToggleEdit(true);
    // dispatch(getContactDetais(token, contact_id));
    handleToggleShowUserDetail(true, user_id, token);
  };
  const handleDeleteContact = (contact_id) => {
    dispatch(deleteUserRec(token, contact_id));
    // onToggleEdit(false);
  };
  return (
    <div
      className="contact-card-view"
      style={{ height: "700px", overflow: "scroll" }}
    >
      <div
        className="row w-100 overflow-scroll h-100"
        style={{ maxWidth: "1200px" }}
      >
        {contactsData?.length > 0 &&
          contactsData?.map((contact, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div className="card card-border contact-card">
                <div
                  className="card-header bg-primary"
                  style={{ color: "white" }}
                >
                  {contact?.name}
                  <span
                    className={`badge badge-sm rounded fw-bold ${
                      contact?.status === "active"
                        ? "badge-success"
                        : "badge-danger"
                    }`}
                  >
                    {contact?.status}
                  </span>
                  <div className="card-action-wrap">
                    <a
                      className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                      href="#"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                    >
                      <span className="btn-icon-wrap">
                        <span className="feather-icon">
                          {/* <i data-feather="more-vertical"></i> */}
                          <CiMenuKebab color="white" />
                        </span>
                      </span>
                    </a>
                    <div
                      className="dropdown-menu  dropdown-menu-end"
                      role="menu"
                    >
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        role="menuitem"
                        onClick={() => handleLoginAccount(contact)}
                      >
                        <span className="me-2">
                          <FaUserCheck />
                        </span>
                        Login
                      </a>
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        role="menuitem"
                        onClick={() => handleToggle(contact.id)}
                      >
                        <span className="me-2">
                          <FaEdit />
                        </span>
                        View Detial
                      </a>
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        role="menuitem"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <span className="me-2">
                          <FaTrash />
                        </span>
                        Block User
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body text-center">
                  <div className="avatar avatar-xl avatar-rounded">
                    <img
                      src={
                        contact?.avatar ||
                        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div className="user-name">
                    <span className="contact-star">
                      <span className="feather-icon">
                        {/* <i data-feather="star"></i> */}
                        <FaRegStar />
                      </span>
                    </span>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Name</div>
                    <div>{contact?.name}</div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Email</div>
                    <div>{contact?.email}</div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Phone</div>
                    <div>{contact?.phone}</div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Company Name</div>
                    <div>Desktop</div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Date Joined</div>
                    <div>
                      {moment(contact?.created_at).format("DD, MMM YYYY")}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="fw-bold fs-6">Tags</div>
                    <div className="w-75 gap-1 d-flex flex-wrap justify-content-end">
                      {contact?.tags?.length > 0 &&
                        contact?.tags?.map((tag, index) => (
                          <span className="badge badge-primary ">
                            {" "}
                            {tag.name}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* 
      <div className="row">
        <div className="d-flex align-items-center col-sm-12 col-md-5 justify-content-center justify-content-md-start">
          <div className="dataTables_info">1 - 10 of 30</div>
        </div>
        <div className="col-sm-12 col-md-7">
          <ul className="pagination custom-pagination pagination-simple mb-0 justify-content-center justify-content-md-end">
            <li className="paginate_button page-item previous disabled">
              <a href="#" data-dt-idx="0" tabindex="0" className="page-link">
                <i className="ri-arrow-left-s-line"></i>
              </a>
            </li>
            <li className="paginate_button page-item active">
              <a href="#" data-dt-idx="1" tabindex="0" className="page-link">
                1
              </a>
            </li>
            <li className="paginate_button page-item ">
              <a href="#" data-dt-idx="2" tabindex="0" className="page-link">
                2
              </a>
            </li>
            <li className="paginate_button page-item next">
              <a href="#" data-dt-idx="4" tabindex="0" className="page-link">
                <i className="ri-arrow-right-s-line"></i>
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default ContactCards;
