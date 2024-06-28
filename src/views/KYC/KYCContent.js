import React, { useEffect, useState } from "react";
import InputField from "../../components/FormFields/InputField";
import DatePicker from "../../components/FormFields/datePickerField";
import RadioInputField from "../../components/FormFields/radioInputField";
import ReactSelectField from "../../components/FormFields/reactSelectField";
import Checkbox from "../../components/FormFields/checkboxField";
import ReactSignaturePad from "../../components/FormFields/reactSignaturePad";
import TextAreaField from "../../components/FormFields/textAreaField";

import { useForm } from "react-hook-form";
import { getUserKYCList, storeKyc } from "../../redux/services/kyc";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import countryList from "react-select-country-list";
const KYCContent = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { kycDetails } = useSelector((state) => state.kyc);
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    dispatch(getUserKYCList(token));
  }, [dispatch, token]);
  useEffect(() => {
    if (kycDetails) {
      setValue("firstname", kycDetails?.firstname);
      setValue("lastname", kycDetails?.lastname);
      setValue("nationality", {
        label: _.toUpper(kycDetails?.nationality),
        value: kycDetails?.nationality,
      });
      setValue("email", kycDetails?.email);
      setValue("phone", kycDetails?.phone);
      setValue("address", kycDetails?.address);
      setValue("city", kycDetails?.city);
      setValue("state", kycDetails?.state);
      setValue("zip_code", kycDetails?.zip_code);
      setValue("company_size", kycDetails?.company_size);
      setValue("company_do", kycDetails?.company_do);
      setValue("company_type", kycDetails?.company_type);
      setValue("company_details", kycDetails?.company_details);
      setValue("document_type", {
        label: _.toUpper(kycDetails?.document_type),
        value: kycDetails?.document_type,
      });
      setValue("is_policy_accepted", kycDetails?.is_policy_accepted);
    }
  }, [kycDetails, setValue]);
  const handleImage = (event) => {
    setError(null);
    const selectedImage = event.target.files[0];

    // Check if image is selected
    if (selectedImage) {
      // Check the size of the image (in bytes)
      if (selectedImage.size > 1000000) {
        // 1 MB
        setError("Image size is too large. Please select a smaller image.");
      } else {
        setImage(selectedImage);
        // Convert image to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Image(reader.result);
        };
        reader.readAsDataURL(selectedImage);
      }
    }
  };
  const handleAddKYC = (data) => {
    // console.log("🚀 ~ handleAddKYC ~ data:", data);
    // console.log("image data", base64Image);
    const formData = {
      ...data,
      nationality: data?.nationality?.value,
      document_type: data?.document_type?.value,
    };

    return dispatch(storeKyc(token, formData));
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
              {/* <div className="d-flex"> */}
              {/* <div>
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
              </div> */}
              {/* <div className="pt-4">
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
              </div> */}

              <div>
                <ReactSelectField
                  name="nationality"
                  errors={errors}
                  control={control}
                  options={countryList().getData() || []}
                  label="Nationality"
                  placeholder="Select ..."
                />
              </div>
              <div>
                <div
                  className="px-3 py-2 rounded mb-3"
                  style={{ backgroundColor: " rgba(0, 128, 128, 0.156)" }}
                >
                  <div className="card-title text-primary fw-bold">Address</div>
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
                <div
                  className="px-3 py-2 rounded mb-3"
                  style={{ backgroundColor: "rgba(0, 128, 128, 0.156)" }}
                >
                  <div className="card-title text-primary fw-bold">
                    Business Details
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-6">
                    <InputField
                      name="company_type"
                      errors={errors}
                      control={control}
                      label="What type of business you own? "
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <InputField
                      name="company_do"
                      errors={errors}
                      control={control}
                      label="What does your company do?"
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <InputField
                      name="company_size"
                      errors={errors}
                      control={control}
                      label="What is the size of your company"
                    />
                  </div>
                  <div className="col-md-12 col-sm-6">
                    <TextAreaField
                      name="company_details"
                      errors={errors}
                      rows="5"
                      control={control}
                      label="Explain Your Business"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="px-3 py-2 rounded mb-3"
                  style={{ backgroundColor: "rgba(0, 128, 128, 0.156)" }}
                >
                  <div className="card-title text-primary fw-bold">
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
                <div className="pb-3">
                  <div
                    className="text-center border border-primary rouded m-auto "
                    style={{ width: "max-content" }}
                  >
                    {image !== null && (
                      <img
                        src={URL.createObjectURL(image)}
                        width={200}
                        className="rounded img-fluid "
                        alt="document"
                      />
                    )}
                  </div>
                </div>
                <div className="media-body">
                  <div className="btn btn-soft-primary btn-block btn-file mb-1">
                    Click to upload file
                    <input
                      type="file"
                      className="upload"
                      onChange={handleImage}
                    />
                  </div>
                  <p className="text-center">
                    The image size must be smaller than 1 mb.
                  </p>
                </div>
                {error !== null && (
                  <div className="alert alert-danger text-center">{error}</div>
                )}
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
              {/* <div>
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
              </div> */}
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
