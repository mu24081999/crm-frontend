import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactRec,
  getContactDetais,
  getContactsList,
} from "../../../redux/services/contact";
import Loader from "../../../components/Loader/Loader";
import {
  FaArchive,
  FaArrowDown,
  FaCopy,
  FaEdit,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import { getUsers } from "../../../redux/services/users";

const ContactList = ({ contactsData, onToggleEdit, isEdit }) => {
  const dispatch = useDispatch();
  // const [contactsData, setContactData] = useState();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, contacts } = useSelector((state) => state.contact);
  useEffect(() => {
    if (token) {
      dispatch(getContactsList(token));
      dispatch(getUsers(token));
    }
  }, [dispatch, token]);
  // useEffect(() => {
  //   if (contacts.length > 0) {
  //     setContactData(contacts);
  //   }
  // }, [contacts]);
  const handleDeleteContact = (contact_id) => {
    console.log("🚀 ~ handleDeleteContact ~ contact_id:", contact_id);
    dispatch(deleteContactRec(token, contact_id));
    onToggleEdit(false);
  };
  const handleToggle = (contact_id) => {
    onToggleEdit(true);
    dispatch(getContactDetais(token, contact_id));
  };
  return (
    <div className="contact-list-view">
      {!isEdit && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <table id="datable_1" className="table nowrap w-100 mb-5">
              <thead>
                <tr>
                  <th>
                    <span className="form-check mb-0">
                      <input
                        type="checkbox"
                        className="form-check-input check-select-all"
                        id="customCheck1"
                      />
                      <label
                        className="form-check-label"
                        for="customCheck1"
                      ></label>
                    </span>
                  </th>
                  <th>Prefix</th>
                  <th>Country Code</th>
                  <th>Number</th>
                  <th>Voice</th>
                  <th>Chat</th>
                  <th>Status</th>
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
                              <FaStar />
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>744</td>
                      <td>🏴+51</td>
                      <td className="">5454343</td>
                      <td>
                        <input type="radio" checked />
                      </td>
                      <td>
                        <input type="radio" disabled />
                      </td>
                      <td className="text-success">Available</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex">
                            <button className="btn btn-primary">Get</button>
                          </div>
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
