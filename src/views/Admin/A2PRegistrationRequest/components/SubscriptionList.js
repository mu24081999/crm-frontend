import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsList } from "../../../../redux/services/contact";
import Loader from "../../../../components/Loader/Loader";
import moment from "moment";
import { SocketContext } from "../../../../Context";
import { FaEdit } from "react-icons/fa";
import ReactSelectField from "../../../../components/FormFields/reactSelectField";
import { useForm } from "react-hook-form";
import { updateVerificationRec } from "../../../../redux/services/verification";

const SubscriptionList = ({
  subscriptionsArray,
  onToggleEdit,
  isEdit,
  users,
}) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.verification);
  const handleOnChangeStatus = (e, id) => {
    console.log("🚀 ~ e:", e);
    const params = {
      status: e.value,
    };
    dispatch(updateVerificationRec(token, id, params));
  };
  return (
    <div style={{ width: "164vh" }}>
      {!isEdit && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="table-responsive">
              <table className="table mb-5">
                <thead>
                  <tr>
                    {/* <th>Customer</th> */}
                    <th>Client</th>
                    <th>Legal Business Name</th>
                    <th>Business Type</th>
                    <th>Business Registration ID Type</th>
                    <th>Business Registration Number</th>
                    <th>Business Industry</th>
                    <th>Website</th>
                    <th>Rigion</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>Postal Code</th>
                    <th>Country</th>
                    <th>Phone Number</th>
                    <th>Brand Type</th>
                    <th>Status</th>
                    <th>Amount Paid</th>
                    <th>Payment Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>

                <tbody>
                  {subscriptionsArray?.length > 0 &&
                    subscriptionsArray?.map((detail) => (
                      <tr>
                        <td>
                          <p>
                            {" "}
                            {
                              users?.filter(
                                (usr) => usr.id === detail?.user_id
                              )[0]?.name
                            }
                          </p>
                          <p
                            className="border-top border-primary"
                            style={{ width: "max-content" }}
                          >
                            {" "}
                            {
                              users?.filter(
                                (usr) => usr.id === detail?.user_id
                              )[0]?.email
                            }
                          </p>
                        </td>
                        <td className="">
                          <span style={{ fontSize: "14px" }}>
                            {detail?.legal_business_name}
                          </span>
                        </td>
                        <td>{detail?.business_type}</td>
                        <td>{detail?.business_registration_id_type}</td>
                        <td>{detail?.business_reg_no}</td>
                        <td>{detail?.business_industry}</td>
                        <td>{detail?.website_url}</td>
                        <td>{detail?.rigion}</td>
                        <td>{detail?.street}</td>
                        <td>{detail?.city}</td>
                        <td>{detail?.postal_code}</td>
                        <td>{detail?.country}</td>
                        <td>{detail?.phone_number}</td>
                        <td>{detail?.brand_type}</td>
                        {/* <td>{detail?.status}</td>
                         */}
                        <td>
                          <div style={{ width: "200px", marginTop: "20px" }}>
                            <ReactSelectField
                              name="status"
                              md={true}
                              // label="Visibility"
                              onChange={(e) =>
                                handleOnChangeStatus(e, detail?.id)
                              }
                              defaultValue={{
                                label: detail?.status,
                                value: detail.status,
                              }}
                              control={control}
                              options={[
                                {
                                  label: "Pending",
                                  value: "pending",
                                },
                                {
                                  label: "Verified",
                                  value: "verified",
                                },
                                {
                                  label: "Rejected",
                                  value: "rejected",
                                },
                              ]}
                              rules={{
                                required: {
                                  value: true,
                                  message: "Field required!",
                                },
                              }}
                              errors={errors}
                            />
                          </div>
                        </td>
                        <td>{detail?.amount_paid}</td>
                        <td>{detail?.payment_status}</td>
                        <td>
                          {" "}
                          {moment(detail?.start_date).format("DD MMM, YYYY")}
                        </td>

                        <td>
                          {" "}
                          {moment(detail?.end_date).format("DD MMM, YYYY")}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SubscriptionList;
