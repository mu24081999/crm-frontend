import React, { useEffect, useMemo, useState } from "react";
import { getUserSubAccountsList } from "../../../../redux/services/calling";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../../../components/Loader/Loader";
import { CiMenuKebab } from "react-icons/ci";
import {
  FaEdit,
  FaList,
  FaRegIdCard,
  FaRegStar,
  FaTrash,
  FaUserCheck,
} from "react-icons/fa";
import _ from "lodash";
import { deleteUserRec } from "../../../../redux/services/users";
import { loginUser } from "../../../../redux/services/auth";
import { useNavigate } from "react-router-dom";

const SUB_Accounts_tab = ({ activeBar, contactDetails, token, dispatch }) => {
  const { users, isLoading } = useSelector((state) => state.user);
  const [subAccountsData, setSubAccountsData] = useState([]);
  const [showList, setShowList] = useState(false);
  const redirect = useNavigate();
  useMemo(() => {
    dispatch(getUserSubAccountsList(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (users?.length > 0) {
      const data = users?.filter(
        (user) => _.toInteger(user.client_id) === contactDetails.id
      );
      setSubAccountsData(data);
    }
  }, [contactDetails, users]);
  const handleDeleteContact = (contact_id) => {
    dispatch(deleteUserRec(token, contact_id));
  };
  const handleLogin = (account) => {
    dispatch(loginUser(account?.username, account?.password, true));
    redirect("/");
  };
  return (
    <div
      className="tab-content mt-7"
      style={{ height: "700px", overflow: "scroll" }}
    >
      <div
        className={`tab-pane fade show ${
          activeBar === "SUB_Accounts_tab" ? "active" : ""
        }`}
        id="SUB_Accounts_tab"
        style={{ maxWidth: "800px", overflow: "scroll", maxHeight: "670px" }}
      >
        <div>
          <a
            className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active float-end"
            // href="/"
            data-bs-toggle="dropdown"
          >
            <span className="icon">
              <span className="feather-icon">
                <FaList />
              </span>
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <a
              className={`dropdown-item ${
                activeBar === "list" ? "active" : ""
              }`}
              onClick={() => setShowList(true)}
            >
              <span className="feather-icon dropdown-icon">
                {/* <i data-feather="list"></i> */}
                <FaList />
              </span>
              <span>List View</span>
            </a>
            <a
              className={`dropdown-item ${
                activeBar === "grid" ? "active" : ""
              }`}
              onClick={() => setShowList(false)}
            >
              <span className="feather-icon dropdown-icon">
                <FaRegIdCard />
              </span>
              <span>Grid View</span>
            </a>
          </div>
        </div>
        {isLoading ? (
          <div className="w-100">
            <Loader />
          </div>
        ) : (
          <>
            {showList === true ? (
              <table class="table table-striped">
                <thead class="table-primary">
                  <tr className=" rounded">
                    <th>Name </th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Date Created</th>
                  </tr>
                </thead>

                <tbody>
                  <>
                    {subAccountsData?.length > 0 &&
                      subAccountsData?.map((account, index) => (
                        <tr key={index}>
                          <td>{account?.name}</td>
                          <td>{account?.email}</td>
                          <td>{account?.username}</td>
                          <td>{account?.status}</td>
                          <td>
                            {moment(account?.created_at).format(
                              "DD, MMM, YYYY"
                            )}{" "}
                          </td>
                        </tr>
                      ))}
                  </>
                </tbody>
              </table>
            ) : (
              <div>
                <div className="row gx-3 row-cols-xxl-2 row-cols-xl-2 row-cols-lg-2 row-cols-md-1 row-cols-1 mb-5">
                  {subAccountsData?.length > 0 &&
                    subAccountsData?.map((contact, index) => (
                      <div key={index}>
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
                                  onClick={() => handleLogin(contact)}
                                >
                                  <span className="me-2">
                                    <FaUserCheck />
                                  </span>
                                  Login
                                </a>
                                <a
                                  className="dropdown-item"
                                  role="menuitem"
                                  onClick={() =>
                                    handleDeleteContact(contact.id)
                                  }
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
                              <div className="fw-bold fs-6">Phone Number</div>
                              <div>{contact?.personal_phone}</div>
                            </div>
                            <div className="d-flex justify-content-between py-1">
                              <div className="fw-bold fs-6">Date Joined</div>
                              <div>
                                {moment(contact?.created_at).format(
                                  "DD, MMM YYYY"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SUB_Accounts_tab;
