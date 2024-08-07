import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Emails from "./components/Emails/Emails";
import ComposeEmail from "./components/ComposeEmail/ComposeEmail";
import AddCategory from "./components/AddCategory/AddCategory";
import { getEmailList } from "../../redux/services/email";
import { getUsers } from "../../redux/services/users";
import { useDispatch, useSelector } from "react-redux";

const EmailContent = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { isLoading, emails } = useSelector((state) => state.email);
  const { users } = useSelector((state) => state.user);
  const [emailData, setEmailData] = useState([]);
  const [emailArray, setEmailArray] = useState([]);
  const [emailsData, setEmailsData] = useState([]);
  const [emailsData_, setEmailsData_] = useState([]);
  const [emailDetails, setEmailDetails] = useState([]);
  const [userData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmailList(token, user?.email, 20, 1));
    dispatch(getUsers(token));
  }, [token, dispatch, user]);
  useEffect(() => {
    // if (emails?.length > 0) {
    const filteredData = emails?.filter((email) => email.parent_id === null);

    const data = [];
    emails?.forEach((email) => {
      const sender = userData?.filter((user) => user.email === email.sender)[0];
      const reciever = userData?.filter(
        (user) => user.email === email.reciever
      )[0];
      data.push({ ...email, sender, reciever });
    });
    setEmailArray(data);
    setEmailData(filteredData);
    // }
  }, [emails, userData]);
  useEffect(() => {
    if (users?.length > 0) {
      setUsersData(users);
    }
  }, [users]);
  useEffect(() => {
    // if (emailData?.length > 0 && userData?.length > 0) {
    const data = [];
    const filteredData = emailData?.filter(
      (email) => email.reciever === user.email
    );
    filteredData?.map((email) => {
      const sender = userData?.filter((user) => user.email === email.sender)[0];
      const reciever = userData?.filter(
        (user) => user.email === email.reciever
      )[0];
      data.push({ ...email, sender, reciever });
    });
    setEmailsData(data);
    // }
  }, [emailData, userData, user]);
  useEffect(() => {
    // if (emailData?.length > 0 && userData?.length > 0) {
    const data = [];
    // const filteredData = emailData?.filter(
    //   (email) => email.reciever === user.email && email.status === "active"
    // );
    emailData?.map((email) => {
      const sender = userData?.filter((user) => user.email === email.sender)[0];
      const reciever = userData?.filter(
        (user) => user.email === email.reciever
      )[0];
      data.push({ ...email, sender, reciever });
    });
    setEmailsData_(data);
    // }
  }, [emailData, userData, user]);
  const handleDataFromChild = (data) => {
    setEmailsData(data);
  };
  const handleEmailDetails = (data) => {
    setEmailDetails(data);
  };
  const handleDataFromSidebar = (data) => {
    setEmailsData(data);
  };
  return (
    <>
      {/* <!-- Main Content --> */}
      <div class="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div class="hk-pg-body py-0">
          <div class="emailapp-wrap">
            <Sidebar
              onDataFromChild={handleDataFromSidebar}
              initialData={emailsData_}
              authUser={user}
            />
            <Emails
              onDataFromChild={handleDataFromChild}
              onEmailDetail={handleEmailDetails}
              authUser={user}
              isLoading={isLoading}
              emailArray={emailArray}
              emailDetails={emailDetails}
              emailsData={emailsData}
              dispatch={dispatch}
              token={token}
            />
            {/* <!-- Compose email --> */}
            <div
              id="compose_email_bulk"
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
                      Compose Email
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
                  <div className="modal-body">
                    <ComposeEmail />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Compose email --> */}

            {/* <!-- Add Category --> */}
            <AddCategory />
            {/* <!-- /Add Category --> */}
          </div>
        </div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
    </>
  );
};

export default EmailContent;
