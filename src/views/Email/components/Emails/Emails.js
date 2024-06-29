import React from "react";
import EmailsHeader from "./components/EmailsHeader";
import EmailsList from "./components/EmailsList";
import EmailDetails from "./components/EmailDetails";

const Emails = ({
  onDataFromChild,
  onEmailDetail,
  emailsData,
  authUser,
  emailArray,
  emailDetails,
  token,
  dispatch,
  isLoading,
}) => {
  return (
    <div class="emailapp-content">
      <div class="emailapp-aside">
        <EmailsHeader
          emailsData={emailsData}
          authUser={authUser}
          // onDataFromChild={handleDataFromChild}
          onDataFromChild={onDataFromChild}
        />

        <div data-simplebar class="aside-body">
          {/* <form class="aside-search" role="search">
            <input
              type="text"
              class="form-control"
              placeholder="Search inbox"
            />
          </form> */}
          <EmailsList
            emailsData={emailsData}
            emails={emailArray}
            dispatch={dispatch}
            token={token}
            isLoading={isLoading}
            // onEmailDetail={handleEmailDetails}
            onEmailDetail={onEmailDetail}
          />
        </div>
      </div>
      <div class="emailapp-single-email">
        {/* <EmailDetailsHeader /> */}
        <EmailDetails
          emailDetails={emailDetails}
          emailsData={emailsData}
          emails={emailArray}
          // onEmailDetail={handleEmailDetails}
          onEmailDetail={onEmailDetail}
        />
      </div>
    </div>
  );
};

export default Emails;
