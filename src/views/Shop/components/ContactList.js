import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsList } from "../../../redux/services/contact";
import Loader from "../../../components/Loader/Loader";
import { getUsers } from "../../../redux/services/users";
import { paymentIntent } from "../../../redux/services/payment";
import _ from "lodash";

const ContactList = ({
  contactsData,
  numberPricing,
  isEdit,
  onDataFromChild,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.calling);
  useEffect(() => {
    if (token) {
      dispatch(getContactsList(token));
      dispatch(getUsers(token));
    }
  }, [dispatch, token]);
  const handleBuyClick = (phoneNumberData) => {
    onDataFromChild(phoneNumberData?.phoneNumber);
    dispatch(
      paymentIntent(token, {
        currency: "usd",
        amount: parseFloat(numberPricing) * 100,
      })
    );
  };
  return (
    <div className="contact-list-view">
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
                <tr className="sticky-top p-1 shadow-lg p-3 mb-5 bg-white rounded">
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
                          {/* {contact?.phoneNumber?.slice(0, 2)}&nbsp;&nbsp; */}
                          {contact?.phoneNumber}
                        </div>
                        <div className="fs-5">
                          {contact?.locality} ,{contact?.region}{" "}
                          {contact?.isoCountry}
                        </div>
                      </td>
                      <td>Local</td>
                      <td className="">
                        <button className="btn btn-sm btn-primary">
                          {contact?.capabilities?.voice ? "true" : "false"}
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">
                          {contact?.capabilities?.SMS ? "true" : "false"}
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">
                          {contact?.capabilities?.MMS ? "true" : "false"}
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">
                          {contact?.capabilities?.fax ? "true" : "false"}
                        </button>
                      </td>
                      <td>{contact?.addressRequirements}</td>
                      <td className="fw-bold">${numberPricing}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex">
                            {contact?.phoneNumber?.includes("+44") ? (
                              <button
                                type="button"
                                id="bundle_modal_button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#bundle_modal"
                              >
                                Buy
                              </button>
                            ) : (
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
                            )}
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
