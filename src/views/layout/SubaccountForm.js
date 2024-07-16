import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addUserRec, getUsers } from "../../redux/services/users";
import { getUserSubAccountsList } from "../../redux/services/calling";
import InputField from "../../components/FormFields/InputField";
import Loader from "../../components/Loader/Loader";
import _ from "lodash";
import { getUserSubscriptions } from "../../redux/services/subscription";
import ReactSelectField from "../../components/FormFields/reactSelectField";
import countryList from "react-select-country-list";

const SubaccountForm = () => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { isLoading, subAccounts } = useSelector((state) => state.calling);
  const { subscriptions } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(getUserSubAccountsList(token));
    dispatch(getUserSubscriptions(token));
    dispatch(getUsers(token));
  }, [token, dispatch]);
  const [limitSubaccounts, setLimitSubaccounts] = useState(null);
  const [userSubscription, setUserSubscription] = useState({});
  const [subAccountsData, setSubAccountsData] = useState([]);
  useEffect(() => {
    if (subscriptions?.length > 0) {
      setUserSubscription(subscriptions[0]);
    }
  }, [subscriptions]);
  useEffect(() => {
    switch (userSubscription?.plan) {
      case "Solo Starter":
        setLimitSubaccounts(1);
        break;
      case "Growth":
        setLimitSubaccounts(3);
        break;
      case "Enterprise":
        setLimitSubaccounts(1000);
        break;
      default:
        setLimitSubaccounts(0);
        break;
    }
  }, [userSubscription, user]);
  useEffect(() => {
    if (users) {
      const data = users?.filter((ur) => _.toInteger(ur.parent_id) === user.id);
      setSubAccountsData(data);
    }
  }, [users, user, setSubAccountsData]);

  const addSubAccount = (data) => {
    const formData = {
      ...data,
      parent_id: _.toString(user.id),
      role: "USER",
      country: data.country.value,
    };
    dispatch(addUserRec(token, formData));
  };
  return (
    <div
      class="modal fade"
      id="addAccountModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addAccountModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          {subAccountsData?.length > limitSubaccounts ? (
            <div className="modal-body p-0">
              <p className="alert alert-warning m-0">
                You have exeeded your limit
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(addSubAccount)}>
              <div class="modal-header bg-primary ">
                <h5
                  class="modal-title fs-6 fw-bold "
                  style={{ color: "white" }}
                >
                  Add New Sub Account
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <div class="modal-body row">
                  <div className="col-md-6 col-sm-6">
                    <InputField
                      control={control}
                      errors={errors}
                      name="name"
                      placeholder="Name"
                      // label="Name"
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />
                  </div>
                  {/* <div className="col-md-6 col-sm-6">
                <InputField
                  control={control}
                  errors={errors}
                  name="phone"
                  placeholder="Phone Number"
                  label="Phone Number"
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />
              </div> */}

                  <div className="col-md-6 col-sm-6">
                    <InputField
                      control={control}
                      errors={errors}
                      name="username"
                      placeholder="Username"
                      // label="Username"
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <InputField
                      control={control}
                      type="email"
                      errors={errors}
                      name="email"
                      placeholder="Email"
                      // label="Email"
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <InputField
                      type="password"
                      control={control}
                      errors={errors}
                      name="password"
                      placeholder="Password"
                      // label="Password"
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />
                  </div>
                  <div className="col-md-12 col-sm-6">
                    <ReactSelectField
                      name="country"
                      placeholder="Select Country"
                      // label="Country"
                      control={control}
                      errors={errors}
                      mb={false}
                      options={countryList().getData() || []}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <InputField
                      name="state"
                      placeholder="State eg: CA"
                      // label="State"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className="col-lg-6">
                    <InputField
                      name="city"
                      placeholder="Enter your city"
                      // label="City"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className="col-lg-6">
                    <InputField
                      name="postal_code"
                      placeholder="Postal Code"
                      // label="Postal Code"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className="col-lg-12 col-sm-6">
                    <InputField
                      name="location"
                      placeholder="Address eg: LA, street 2, apt # 45434"
                      // label="Address"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                </div>
              )}

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubaccountForm;
