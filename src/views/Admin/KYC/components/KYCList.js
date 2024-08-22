import React from "react";
import Loader from "../../../../components/Loader/Loader";
import moment from "moment";
import { FaEye } from "react-icons/fa";
import { getKycDetails } from "../../../../redux/services/kyc";

const KYCList = ({ kycArray, dispatch, isEdit, users, isLoading, token }) => {
  const handleFormClick = (form) => {
    dispatch(getKycDetails(token, form?.id));
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
                  <th>Customer</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Nationality</th>
                  <th>Approved</th>
                  <th>Date Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {kycArray?.length > 0 &&
                  kycArray?.map((form) => (
                    <tr>
                      <td>
                        <div className="border-bottom border-dark">
                          {form?.user?.name}
                        </div>
                        <div>{form?.user?.email}</div>
                      </td>
                      <td>{form?.firstname + " " + form?.lastname}</td>
                      <td>{form?.email}</td>
                      <td>{form?.phone}</td>
                      <td>{form?.address}</td>
                      <td>{form?.nationality}</td>
                      <td>{form?.is_approved === 0 ? "false" : "true"}</td>
                      <td>{moment(form?.created_at).format("DD MMM, YYYY")}</td>
                      <td>
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#kyc_form_detail"
                          className="btn btn-primary btn-icon btn-sm"
                          onClick={() => handleFormClick(form)}
                        >
                          <FaEye />
                        </a>
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

export default KYCList;
