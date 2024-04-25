import React from "react";
import InputField from "../../components/FormFields/InputField";
import DatePicker from "../../components/FormFields/datePickerField";
import RadioInputField from "../../components/FormFields/radioInputField";
import ReactSelectField from "../../components/FormFields/reactSelectField";
import Checkbox from "../../components/FormFields/checkboxField";
import ReactSignaturePad from "../../components/FormFields/reactSignaturePad";

import { useForm } from "react-hook-form";

const KYCContent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const handleAddKYC = (data) => {
    console.log("🚀 ~ handleAddKYC ~ data:", data);
    return {};
  };
  return (
    <div className="container">
      <div className="card" style={{ margin: "7% 15% 7% 15%" }}>
        <div className="card-header bg-primary">
          <div className="card-title" style={{ color: "white" }}>
            KYC - Know Your Customer Form
          </div>
        </div>
        <div className="card-body">
          <div className="form">
            <form onSubmit={handleSubmit(handleAddKYC)}>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <InputField
                    name="firstname"
                    errors={errors}
                    control={control}
                    label="First Name"
                    placeholder="John Doe"
                  />
                </div>

                <div className="col-md-6 col-sm-6">
                  <InputField
                    name="lastname"
                    errors={errors}
                    control={control}
                    label="Last Name"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="d-flex">
                <div>
                  <div className="form-label" style={{ color: "black" }}>
                    Martial Status
                  </div>
                  <div className="d-flex gap-4 pt-3 px-4">
                    <div>
                      <RadioInputField
                        name="martial_status"
                        errors={errors}
                        control={control}
                        title="Single"
                        value="single"
                      />
                    </div>
                    <div>
                      <RadioInputField
                        name="martial_status"
                        errors={errors}
                        control={control}
                        title="Married"
                        value="married"
                      />
                    </div>
                    <div>
                      <RadioInputField
                        name="martial_status"
                        errors={errors}
                        control={control}
                        title="Separated"
                        value="separated"
                      />
                    </div>
                    <div>
                      <RadioInputField
                        name="martial_status"
                        errors={errors}
                        control={control}
                        title="Divorced"
                        value="divorced"
                      />
                    </div>
                    <div>
                      <RadioInputField
                        name="martial_status"
                        errors={errors}
                        control={control}
                        title="Widowed"
                        value="widowed"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <DatePicker
                      name="date_of_birth"
                      errors={errors}
                      label="Date of Birth"
                      maxDate={Date.now()}
                      control={control}
                      title="Non-binary"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <div className="form-label " style={{ color: "black" }}>
                  Gender
                </div>
                <div className="d-flex px-4 gap-4 py-3">
                  <div>
                    <RadioInputField
                      name="gender"
                      errors={errors}
                      control={control}
                      title="Female"
                      value="female"
                    />
                  </div>
                  <div>
                    <RadioInputField
                      name="gender"
                      errors={errors}
                      control={control}
                      title="Male"
                      value="male"
                    />
                  </div>
                  <div>
                    <RadioInputField
                      name="gender"
                      errors={errors}
                      control={control}
                      title="Non-binary"
                      value="non-binary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <ReactSelectField
                  name="Natinality"
                  errors={errors}
                  control={control}
                  options={[
                    { label: "USA", value: "US" },
                    { label: "Pakistan", value: "PK" },
                  ]}
                  label="Nationality"
                  placeholder="Select ..."
                />
              </div>
              <div>
                <div className="px-3 py-2 rounded bg-secondary mb-3">
                  <div className="card-title " style={{ color: "white" }}>
                    Address
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-6">
                    <InputField
                      name="email"
                      type="email"
                      errors={errors}
                      control={control}
                      label="Email"
                      placeholder="jon@example.com"
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <InputField
                      name="phone"
                      errors={errors}
                      control={control}
                      label="Phone Number"
                      placeholder="+1234567890"
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <InputField
                      name="address"
                      errors={errors}
                      control={control}
                      label="Address"
                      placeholder="Street # 1, apt # 3"
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <InputField
                      name="city"
                      errors={errors}
                      control={control}
                      label="City"
                      placeholder="City"
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <InputField
                      name="state"
                      errors={errors}
                      control={control}
                      label="State/Province"
                      placeholder="State/Province"
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <InputField
                      name="zip_code"
                      errors={errors}
                      control={control}
                      label="Postal/Zip Code"
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="px-3 py-2 rounded bg-secondary mb-3">
                  <div className="card-title " style={{ color: "white" }}>
                    Declaration
                  </div>
                </div>
              </div>
              <div>
                <ReactSelectField
                  name="document_type"
                  errors={errors}
                  control={control}
                  options={[
                    { label: "Driving License", value: "driving_license" },
                    { label: "ID Card", value: "id_card" },
                  ]}
                  label="Document Type"
                  placeholder="Select ..."
                />
              </div>
              <div className="py-2">
                <div className="media-body">
                  <div className="btn btn-soft-primary btn-block btn-file mb-1">
                    Click to upload file
                    <input
                      type="file"
                      className="upload"
                      // onChange={handleImage}
                    />
                  </div>
                </div>
              </div>
              <div className="ps-4">
                <Checkbox
                  name="country"
                  errors={errors}
                  control={control}
                  label="I hereby declare that the information provided in this form is accurate and complete. I confirm that if any information is found incorrect and/or incomplete, that leads to a violation of regulations, may initiate legal actions, and I accept that I am the responsible party for any and all charges, penalties and violations."
                  placeholder="John Doe"
                />
              </div>
              <div>
                <div className="form-label" style={{ color: "black" }}>
                  Signature
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="border border-primary rounded"
                    style={{ width: "max-content" }}
                  >
                    <ReactSignaturePad
                      name="signature"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              <div className=" float-end">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCContent;
