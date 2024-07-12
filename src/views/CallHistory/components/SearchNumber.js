import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactCountryField from "../../../components/FormFields/countryField";
import Checkbox from "../../../components/FormFields/checkboxField";
import InputField from "../../../components/FormFields/InputField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import {
  CallLogsList,
  searchAvailablePhoneNumber,
} from "../../../redux/services/calling";
import { useSelector } from "react-redux";

const SearchNumber = ({ token, user, dispatch }) => {
  const {
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({});
  const { claimedNumbers } = useSelector((state) => state.calling);

  const [criteria, setCriteria] = useState("");
  const criteriaWatcher = watch("search_criteria");
  useEffect(() => {
    if (criteriaWatcher !== undefined) {
      setCriteria(criteriaWatcher?.value);
    }
  }, [criteriaWatcher]);
  const handleSearchNumber = (data) => {
    const formData = {
      phoneNumber: data?.phoneNumber?.value,
      // direction: data?.direction?.value,
      authToken: user.authToken,
      accountSid: user.accountSid,
    };
    dispatch(CallLogsList(token, formData));
  };
  const handleResetButton = () => {
    const formData = {
      authToken: user.authToken,
      accountSid: user.accountSid,
    };
    dispatch(CallLogsList(token, formData));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(handleSearchNumber)}>
      <div className="bg-primary px-4 py-2 m-2 rounded mb-5">
        <h5 className="pt-2 fw-bold" style={{ color: "white" }}>
          Search Logs
        </h5>
      </div>
      <div className="m-5">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <ReactSelectField
              name="phoneNumber"
              placeholder="Phone Number"
              control={control}
              errors={errors}
              // mb={true}
              options={
                claimedNumbers?.length > 0
                  ? claimedNumbers?.map((key, index) => {
                      return {
                        label: key?.friendlyName,
                        value: key?.phoneNumber,
                      };
                    })
                  : []
              }
            />
          </div>
          {/* <div className="col-md-4 col-sm-6">
            <ReactSelectField
              name="direction"
              placeholder="Direction"
              control={control}
              errors={errors}
              mb={false}
              options={[
                { label: "Outbound", value: "outbound-dial" },
                { label: "Inbound", value: "inbound" },
              ]}
            />
          </div> */}
        </div>
        <div>
          <button
            onClick={handleResetButton}
            type="button"
            className="btn btn-secondary"
          >
            Reset
          </button>
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default SearchNumber;
