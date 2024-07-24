import React, { useEffect, useState } from "react";
import Sidebar from "./components/SidebarContact";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import SearchNumber from "./components/SearchNumber";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableNumbers } from "../../redux/services/calling";
import { useForm } from "react-hook-form";
import Payment from "../../components/PaymentCard/Payment";
import axios from "axios";
import { toast } from "react-toastify";
import { readSettingRec } from "../../redux/services/generalSetting";

const ContactsContent = () => {
  const {
    formState: { errors },
  } = useForm({});
  const [data, setData] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneNumbers_, setPhoneNumbers_] = useState([]);
  const [numberType, setNumberType] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const { contacts } = useSelector((state) => state.contact);
  const { availableNumbers } = useSelector((state) => state.calling);
  const { user, token, accountSid, accountAuthToken } = useSelector(
    (state) => state.auth
  );
  const backendURL = process.env.REACT_APP_BACKEND_URL_PRODUCTION;
  const dispatch = useDispatch();
  const { isLoading, settingDetails } = useSelector((state) => state.setting);
  useEffect(() => {
    dispatch(readSettingRec(token, 1));
  }, [dispatch, token]);
  useEffect(() => {
    // if (contacts.length > 0) {
    const filterData = contacts?.filter(
      (contact) => contact.status !== "blocked"
    );
    setData(filterData);
    // }
  }, [contacts]);
  useEffect(() => {
    // if (availableNumbers.length > 0) {
    setPhoneNumbers(availableNumbers);
    setPhoneNumbers_(availableNumbers);
    // }
  }, [availableNumbers]);
  useEffect(() => {
    dispatch(
      getAvailableNumbers(token, {
        accountSid: accountSid,
        authToken: accountAuthToken,
      })
    );
  }, [dispatch, token, accountSid, accountAuthToken]);
  const handleReceiveData = (receivedData) => {
    setData(receivedData);
  };
  const handleToggleEdit = (value) => {
    setIsEdit(value);
  };
  const handleNumbersDataFromChild = (data) => {
    setIsSearch(data);
  };
  const handleNumberType = (data) => {
    setNumberType(data);
  };
  const handleSelectedNumber = (data) => {
    setSelectedNumber(data);
  };
  const afterPayment = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };

    const is_added = await axios.post(
      `${backendURL}/user/calling/claim-phone-number`,
      {
        subAccountSid: accountSid,
        subAuthToken: accountAuthToken,
        phoneNumber: selectedNumber,
        addressSid: user?.addressSid,
      },
      config
    );
    if (is_added) toast.success(is_added?.data?.message);
  };
  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="contactapp-content">
            {!isEdit && (
              <div className="contactapp-detail-wrap">
                <Header />
                <div className="px-5 pt-3">
                  <button
                    className="btn btn-primary btn-sm float-end"
                    onClick={() => setIsSearch(!isSearch)}
                  >
                    Search
                  </button>
                </div>
                {isSearch && (
                  <SearchNumber
                    numbersData={phoneNumbers_}
                    onDataFromChild={handleNumberType}
                    dispatch={dispatch}
                    token={token}
                    accountSid={accountSid}
                    authToken={accountAuthToken}
                  />
                )}
                <div className="contact-body">
                  <div data-simplebar className="nicescroll-bar">
                    <ContactList
                      contactsData={phoneNumbers}
                      onToggleEdit={handleToggleEdit}
                      numberPricing={
                        numberType === "tollFree"
                          ? settingDetails?.local_number_price
                          : settingDetails?.toll_free_number_price
                      }
                      isEdit={isEdit}
                      onDataFromChild={handleSelectedNumber}
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              id="bundle_modal"
              className="modal fade add-new-contact"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Create Regulatory Bundle
                    </span>
                    <button
                      type="button"
                      className="btn-close btn-light"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">Yoo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Payment afterPayment={afterPayment} />

      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default ContactsContent;
