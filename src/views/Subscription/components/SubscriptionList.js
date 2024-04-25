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

const SubscriptionList = ({ subscriptionsArray, onToggleEdit, isEdit }) => {
  console.log(
    "🚀 ~ SubscriptionList ~ subscriptionsArray:",
    subscriptionsArray
  );
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
                  {/* <th>Customer</th> */}
                  <th>Subscription Plan</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Date Created</th>
                </tr>
              </thead>

              <tbody>
                {subscriptionsArray?.length > 0 &&
                  subscriptionsArray?.map((subscription) => (
                    <tr>
                      {/* <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs avatar-rounded">
                              <img
                                src={
                                  subscription?.customer_details?.avatar ||
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
                              onClick={() => handleToggle(subscription?.id)}
                            >
                              <span
                                className="d-block text-high-em text-primary border-bottom"
                                style={{ width: "max-content" }}
                              >
                                {subscription?.customer_details?.name}
                              </span>
                              <p>{subscription?.customer_details?.email}</p>
                            </a>
                          </div>
                        </div>
                      </td> */}
                      <td className="text-center">
                        <span
                          className={`badge badge-sm  ${
                            subscription?.plan === "monthly"
                              ? "bg-primary"
                              : "bg-warning"
                          }`}
                          style={{ fontSize: "14px" }}
                        >
                          {subscription?.plan}
                        </span>
                      </td>
                      <td>
                        {" "}
                        {moment(subscription?.start_date).format(
                          "DD MMM, YYYY"
                        )}
                      </td>

                      <td>
                        {" "}
                        {moment(subscription?.end_date).format("DD MMM, YYYY")}
                      </td>
                      <td>{subscription?.status}</td>
                      <td>
                        {moment(subscription?.created_at).format(
                          "DD MMM, YYYY"
                        )}
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

export default SubscriptionList;
