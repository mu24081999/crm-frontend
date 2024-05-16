import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactCountryField from "../../../components/FormFields/countryField";
import Checkbox from "../../../components/FormFields/checkboxField";
import InputField from "../../../components/FormFields/InputField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { searchAvailablePhoneNumber } from "../../../redux/services/calling";
import countryList from "react-select-country-list";

const SearchNumber = ({
  dispatch,
  token,
  onDataFromChild,
  accountSid,
  authToken,
}) => {
  const {
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({});
  const [criteria, setCriteria] = useState("");
  const criteriaWatcher = watch("search_criteria");
  useEffect(() => {
    if (criteriaWatcher !== undefined) {
      setCriteria(criteriaWatcher?.value);
    }
  }, [criteriaWatcher]);
  const handleSearchNumber = (data) => {
    console.log("🚀 ~ handleSearchNumber ~ data:", data.country.value);
    const formData = {
      ...data,
      authToken: authToken,
      accountSid: accountSid,
      numberType: data.numberType.value,
      country: data.country.value,
    };
    dispatch(searchAvailablePhoneNumber(token, formData));
    // onDataFromChild(false);
  };
  return (
    <form onSubmit={handleSubmit(handleSearchNumber)}>
      <div className="bg-primary p-2 m-2 rounded mb-5">
        <h5 className="pt-2 px-4 fw-bold" style={{ color: "white" }}>
          Search Phone Number
        </h5>
      </div>
      <div className="m-5 d-flex justify-content-center">
        <div className=" w-100">
          <div className="row">
            {/* <div className="col-md-4 col-sm-6">
              <ReactCountryField
                name="country"
                control={control}
                errors={errors}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div> */}
            <div className="col-md-4 col-sm-6">
              <ReactSelectField
                name="country"
                placeholder="Select Country"
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
            <div className="col-md-4 col-sm-6">
              <ReactSelectField
                name="numberType"
                placeholder="Number Type"
                control={control}
                errors={errors}
                mb={false}
                options={[
                  { label: "local", value: "local" },
                  { label: "tollFree", value: "tollFree" },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <ReactSelectField
                name="search_criteria"
                placeholder="Criteria"
                control={control}
                errors={errors}
                mb={false}
                options={[
                  { label: "Locality", value: "locality" },
                  { label: "Number", value: "number" },
                ]}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="row px-5 pt-2 gap-2">
                <div className="col">
                  <Checkbox
                    control={control}
                    errors={errors}
                    name="voice"
                    label="Voice"
                  />
                </div>
                <div className="col">
                  <Checkbox
                    control={control}
                    errors={errors}
                    name="sms"
                    label="SMS"
                  />
                </div>
                <div className="col">
                  <Checkbox
                    control={control}
                    errors={errors}
                    name="mms"
                    label="MMS"
                  />
                </div>
                <div className="col">
                  <Checkbox
                    control={control}
                    errors={errors}
                    name="fax"
                    label="Fax"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <InputField
                name="area_code"
                placeholder="Area Code (start digits)"
                control={control}
                errors={errors}
                mb={false}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              {criteria === "locality" ? (
                <InputField
                  name="locality"
                  placeholder="Search by Phrase"
                  control={control}
                  errors={errors}
                  mb={false}
                />
              ) : (
                <InputField
                  name="number"
                  placeholder="Search by Digits (last digits)"
                  control={control}
                  errors={errors}
                  mb={false}
                />
              )}
            </div>
            <div className="col-md-4 col-sm-6 d-flex gap-2">
              <button onClick={() => reset()} className="btn btn-secondary">
                Reset
              </button>
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchNumber;
