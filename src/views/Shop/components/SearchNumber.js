import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactCountryField from "../../../components/FormFields/countryField";
import Checkbox from "../../../components/FormFields/checkboxField";
import InputField from "../../../components/FormFields/InputField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { searchAvailablePhoneNumber } from "../../../redux/services/calling";

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
    console.log("🚀 ~ handleSearchNumber ~ data:", data);
    const formData = {
      ...data,
      authToken: authToken,
      accountSid: accountSid,
      numberType: data.numberType.value,
    };
    dispatch(searchAvailablePhoneNumber(token, formData));
    onDataFromChild(false);
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
            <div className="col-md-6 col-sm-6">
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
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <ReactSelectField
              name="numberType"
              control={control}
              errors={errors}
              mb={false}
              options={[
                { label: "local", value: "local" },
                { label: "tollFree", value: "tollFree" },
              ]}
              label="Number Type"
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="row px-5 gap-3">
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
          <div className="col-md-6 col-sm-6">
            <InputField
              name="area_code"
              placeholder="Enter Area Code"
              control={control}
              errors={errors}
              mb={false}
              label="Area Code"
            />
            <ReactSelectField
              name="search_criteria"
              control={control}
              errors={errors}
              mb={false}
              options={[
                { label: "Locality", value: "locality" },
                { label: "Number", value: "number" },
              ]}
              label="Criteria"
            />

            {criteria === "locality" ? (
              <InputField
                name="locality"
                placeholder="Enter "
                control={control}
                errors={errors}
                mb={false}
                label="Search by phrases"
              />
            ) : (
              <InputField
                name="number"
                placeholder="Enter "
                control={control}
                errors={errors}
                mb={false}
                label="Search by digits"
              />
            )}
            <div>
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
