import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactRec,
  getContactDetais,
  getContactsList,
} from "../../../redux/services/contact";
import Loader from "../../../components/Loader/Loader";
import { FaStar } from "react-icons/fa";
import { getUsers } from "../../../redux/services/users";
import Payment from "../../../components/PaymentCard/Payment";
import { paymentIntent } from "../../../redux/services/payment";

const ContactList = ({
  contactsData,
  onToggleEdit,
  isEdit,
  onDataFromChild,
}) => {
  const dispatch = useDispatch();
  // const [contactsData, setContactData] = useState();
  const { token } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState(null);
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
  const handleBuyClick = (phoneNumberData) => {
    console.log("🚀 ~ handleBuyClick ~ phoneNumberData:", phoneNumberData);
    onDataFromChild(phoneNumberData?.phoneNumber);
    dispatch(
      paymentIntent(token, {
        currency: "usd",
        amount: 250,
        // amount: amount_value ? amount_value.getAttribute("data-amount") : "",
      })
    );
  };
  return (
    <div className="contact-list-view">
      {/* <div className="bg-primary p-2 rounded mb-5">
        <h5 className="pt-2 fw-bold" style={{ color: "white" }}>
          Phone Numbers
        </h5>
      </div> */}
      {!isEdit && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <table
              data-sticky-header
              className="table table-striped w-100 mb-5"
            >
              <thead className="table-primary ">
                <tr className="sticky-top border p-1 shadow-lg p-3 mb-5 bg-white rounded">
                  <th>Number</th>
                  <th>Type</th>
                  <th>Voice</th>
                  <th>SMS</th>
                  <th>MMS</th>
                  <th>FAX</th>
                  <th>Address Requirement</th>
                  <th>Monthly Fee</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contactsData?.length > 0 &&
                  contactsData?.map((contact) => (
                    <tr className="shadow ">
                      <td>
                        <div className="fw-bold">
                          {contact?.phoneNumber?.slice(0, 2)}&nbsp;&nbsp;
                          {contact?.friendlyName}
                        </div>
                        <div className="fs-5">
                          {contact?.locality} ,{contact?.region}{" "}
                          {contact?.isoCountry}
                        </div>
                      </td>
                      <td>Local</td>
                      <td className="">
                        {" "}
                        <input
                          className=""
                          type="radio"
                          checked={contact?.capabilities?.voice}
                        />
                      </td>
                      <td>
                        <input
                          className=""
                          type="radio"
                          checked={contact?.capabilities?.SMS}
                        />
                      </td>
                      <td>
                        <input
                          className=""
                          type="radio"
                          checked={contact?.capabilities?.MMS}
                        />
                      </td>
                      <td>
                        <input
                          className=""
                          type="radio"
                          checked={contact?.capabilities?.fax}
                        />
                      </td>
                      <td>{contact?.addressRequirements}</td>
                      <td className="fw-bold">$2.5</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex">
                            <button
                              className="btn btn-primary"
                              id="buy_number"
                              data-bs-toggle="modal"
                              data-bs-target="#add_payment_form"
                              data-amount={`7000`}
                              onClick={() => handleBuyClick(contact)}
                            >
                              Buy
                            </button>
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
