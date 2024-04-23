import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import { useDispatch, useSelector } from "react-redux";

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

  useEffect(() => {
    if (user) {
      setValue("username", user?.username);
      setValue("email", user?.email);
    }
  }, [user, setValue]);
  const handleBillingSubmit = (data) => {
    console.log("🚀 ~ handleBillingSubmit ~ data:", data);
    //  dispatch(updateUserRec(token, data, user.id));
  };

  return (
    <div className="tab-pane fade" id="tab_block_billing">
      <div className="title-lg fs-4">
        <span>Billing Address</span>
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
