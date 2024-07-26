import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactRec,
  getContactsList,
  updateContactRec,
} from "../../../../redux/services/contact";
import Loader from "../../../../components/Loader/Loader";
import moment from "moment";
import { SocketContext } from "../../../../Context";
import DatePickerFeild from "../../../../components/FormFields/datePickerField";
import { useForm } from "react-hook-form";
import { updateUserSubscription } from "../../../../redux/services/subscription";

const SubscriptionList = ({
  subscriptionsArray,
  onToggleEdit,
  isEdit,
  users,
}) => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const { handleToggleShowLeadDetail } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.subscription);
  useEffect(() => {
    if (token) {
      dispatch(getContactsList(token));
    }
  }, [dispatch, token]);
  const handleChangeDate = (id, value) => {
    console.log("🚀 ~ handleChangeDate ~ id,value:", id, value);
    dispatch(updateUserSubscription(token, id, { end_date: value }));
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
                  <th>Client</th>
                  <th>Plan</th>
                  <th>Plan Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {subscriptionsArray?.length > 0 &&
                  subscriptionsArray?.map((subscription) => (
                    <tr>
                      <td>
                        <p>
                          {" "}
                          {
                            users?.filter(
                              (usr) => usr.id === subscription?.customer_id
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
                              (usr) => usr.id === subscription?.customer_id
                            )[0]?.email
                          }
                        </p>
                      </td>
                      <td className="">
                        <span style={{ fontSize: "14px" }}>
                          {subscription?.plan}
                        </span>
                      </td>
                      <td>{subscription?.plan_type}</td>
                      <td>
                        {" "}
                        {moment(subscription?.start_date).format(
                          "DD MMM, YYYY"
                        )}
                      </td>

                      <td>
                        {" "}
                        {/* {moment(subscription?.end_date).format("DD MMM, YYYY")} */}
                        <div className="col-sm-6" style={{ width: "200px" }}>
                          <DatePickerFeild
                            name={`end-date-${subscription?.end_date}`}
                            defaultValue={moment(subscription?.end_date).format(
                              "YYYY-MM-DD"
                            )}
                            // label="Start Date"
                            onChange={(e) =>
                              handleChangeDate(
                                subscription?.id,
                                moment(e).format("YYYY-MM-DD")
                              )
                            }
                            errors={errors}
                            control={control}
                          />
                        </div>
                      </td>
                      <td>
                        {new Date(subscription?.end_date) > new Date(Date.now())
                          ? "Active"
                          : "Stopped"}
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
