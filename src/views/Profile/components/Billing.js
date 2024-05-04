import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  addBillingRec,
  getBillingsList,
} from "../../../redux/services/billing";

const Billing = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { billings } = useSelector((state) => state.billing);
  useEffect(() => {
    dispatch(getBillingsList(token));
  }, [dispatch, token]);
  const handleBillingSubmit = (data) => {
    console.log("🚀 ~ handleBillingSubmit ~ data:", data);
    dispatch(addBillingRec(token, data));
  };

  return (
    <div className="tab-pane fade" id="tab_block_billing">
      <div className="title-lg fs-4">
        <span>Billing Address</span>
      </div>
      <div className="row">
        {billings?.length > 0 ? (
          billings?.map((billing, index) => (
            <div className="col-md-4 col-sm-6 card shadow-lg">
              {/* <div className="card-header">
              <div className="card-title">{billing?.firstname + " "+ billing?.lastname}</div>
            </div> */}
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>First Name:</div>
                  <div>{billing?.firstname}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>Last Name:</div>
                  <div>{billing?.lastname}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>Address:</div>
                  <div>{billing?.address}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>City:</div>
                  <div>{billing?.city}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>State:</div>
                  <div>{billing?.state}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>Zip/Postal Code:</div>
                  <div>{billing?.zip_code}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Not added yet!</p>
        )}
      </div>
      <form onSubmit={handleSubmit(handleBillingSubmit)}>
        <div className="row gx-3">
          <div className="col-md-4 col-sm-6">
            <InputField
              name="firstname"
              placeholder="Your First Name"
              label="First Name"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <InputField
              name="lastname"
              placeholder="Last Name"
              label="Last Name"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <InputField
              name="address"
              placeholder="Address"
              label="Address"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <InputField
              name="city"
              placeholder="City"
              label="City"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <InputField
              name="state"
              placeholder="State"
              label="State"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <InputField
              name="zip_code"
              placeholder="ZIP/Postal Code"
              label="Zip/Postal Code"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <InputField
              name="country"
              placeholder="Country"
              label="Country"
              control={control}
              errors={errors}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Billing;
