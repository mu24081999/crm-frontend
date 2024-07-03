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
import Loader from "../../components/Loader/Loader";
const KYCContent = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { kycDetails, isLoading } = useSelector((state) => state.kyc);
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [formToggle, setFormToggle] = useState("form");
  const [error, setError] = useState(null);
  useEffect(() => {
    dispatch(getUserKYCList(token));
  }, [dispatch, token]);
  useEffect(() => {
    if (kycDetails?.id) {
      setFormToggle("details");
    } else if (kycDetails?.id === undefined) {
      setFormToggle("form");
    }
  }, [kycDetails]);
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
      setValue(
        "is_policy_accepted",
        kycDetails?.is_policy_accepted === 1 ? true : false
      );
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
  const handleAddKYC = async (data) => {
    // console.log("🚀 ~ handleAddKYC ~ data:", data);
    // console.log("image data", base64Image);
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("nationality", data?.nationality?.value);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("zip_code", data.zip_code);
    formData.append("company_type", data.company_type);
    formData.append("company_do", data.firstname);
    formData.append("company_size", data.company_size);
    formData.append("company_details", data.company_details);
    formData.append("document_type", data?.document_type?.value);
    formData.append("document", image);
    formData.append(
      "is_policy_accepted",
      data.is_policy_accepted === true ? 1 : 0
    );
    // const formData = {
    //   ...data,
    //   nationality: data?.nationality?.value,
    //   document_type: data?.document_type?.value,
    // };

    const is_added = await dispatch(storeKyc(token, formData));
    if (is_added === true) {
      setFormToggle("details");
    }
  };
  return (
    <div className="container">
      {formToggle === "details" ? (
        <div className="card" style={{ margin: "7% 15% 7% 15%" }}>
          <div className="card-header bg-primary">
            <div className="card-title  text-white fw-bold">
              KYC (Know Your Customer)
            </div>
            <div>
              <button
                className="btn btn-light btn-sm"
                onClick={() => setFormToggle("form")}
              >
                Edit
              </button>
            </div>
          </div>
          <>
            <section>
              <div
                className="rounded-4 px-3 py-2 text-primary fw-bold"
                style={{ backgroundColor: "#00808038" }}
              >
                Personal Details
              </div>
              <div className="p-3">
                <div className="px-2">
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">Firstname:</div>
                    <div>{kycDetails?.firstname}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">Lastname:</div>
                    <div>{kycDetails?.lastname}</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">Email Address:</div>
                    <div>{kycDetails?.email}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">Phone Number:</div>
                    <div>{kycDetails?.phone}</div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div
                className="rounded-4 px-3 py-2 text-primary fw-bold"
                style={{ backgroundColor: "#00808038" }}
              >
                Address
              </div>
              <div className="p-3">
                <div className="px-2">
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">Nationality:</div>
                    <div>{kycDetails?.nationality}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">State:</div>
                    <div>{kycDetails?.state}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">City:</div>
                    <div>{kycDetails?.city}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">Postal/Zip Code:</div>
                    <div>{kycDetails?.zip_code}</div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div
                className="rounded-4 px-3 py-2 text-primary fw-bold"
                style={{ backgroundColor: "#00808038" }}
              >
                Business Details
              </div>
              <div className="p-3">
                <div className="px-2">
                  <div className="">
                    <div className="fw-bold">
                      What type of business you own?
                    </div>
                    <div>{kycDetails?.company_type}</div>
                  </div>
                  <div className="">
                    <div className="fw-bold">What does your company do?</div>
                    <div>{kycDetails?.company_do}</div>
                  </div>
                  <div className="">
                    <div className="fw-bold">
                      What is the size of your company?
                    </div>
                    <div>{kycDetails?.company_size}</div>
                  </div>
                  <div className="">
                    <div className="fw-bold">Explain Your Business?</div>
                    <div>{kycDetails?.company_details}</div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div
                className="rounded-4 px-3 py-2 text-primary fw-bold"
                style={{ backgroundColor: "#00808038" }}
              >
                Declaration
              </div>
              <div className="p-3">
                <div className="px-2">
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">Document Type</div>
                    <div>{kycDetails?.document_type}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">Policy Accepted</div>
                    <div>
                      {kycDetails?.is_policy_accepted === 1 ? "true" : "false"}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <img
                      className="rounded-3 border mt-5 img-fluid"
                      src={kycDetails?.document_url}
                      width={200}
                      alt="id"
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer bg-primary text-white fw-bold">
                {kycDetails?.is_approved === 1
                  ? "Approved"
                  : "Your KYC details are under review. We will soon get back to you"}
              </div>
            </section>
          </>
        </div>
      ) : (
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
                      name="lastname"
                      errors={errors}
                      control={control}
                      label="Last Name"
                      placeholder="John Doe"
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />
                  </div>
                </div>
                <div>
                  <ReactSelectField
                    name="nationality"
                    errors={errors}
                    control={control}
                    options={countryList().getData() || []}
                    label="Nationality"
                    placeholder="Select ..."
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                  />
                </div>
                <div>
                  <div
                    className="px-3 py-2 rounded mb-3"
                    style={{ backgroundColor: " rgba(0, 128, 128, 0.156)" }}
                  >
                    <div className="card-title text-primary fw-bold">
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
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <InputField
                        name="phone"
                        errors={errors}
                        control={control}
                        label="Phone Number"
                        placeholder="+1234567890"
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <InputField
                        name="address"
                        errors={errors}
                        control={control}
                        label="Address"
                        placeholder="Street # 1, apt # 3"
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <InputField
                        name="city"
                        errors={errors}
                        control={control}
                        label="City"
                        placeholder="City"
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <InputField
                        name="state"
                        errors={errors}
                        control={control}
                        label="State/Province"
                        placeholder="State/Province"
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <InputField
                        name="zip_code"
                        errors={errors}
                        control={control}
                        label="Postal/Zip Code"
                        placeholder="Postal Code"
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
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
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <InputField
                        name="company_do"
                        errors={errors}
                        control={control}
                        label="What does your company do?"
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <InputField
                        name="company_size"
                        errors={errors}
                        control={control}
                        label="What is the size of your company"
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-12 col-sm-6">
                      <TextAreaField
                        name="company_details"
                        errors={errors}
                        rows="5"
                        control={control}
                        label="Explain Your Business"
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
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
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
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
                        required
                      />
                    </div>
                    <p className="text-center">
                      The image size must be smaller than 1 mb.
                    </p>
                  </div>
                  {error !== null && (
                    <div className="alert alert-danger text-center">
                      {error}
                    </div>
                  )}
                </div>
                <div className="ps-4">
                  <Checkbox
                    name="is_policy_accepted"
                    errors={errors}
                    control={control}
                    label="I hereby declare that the information provided in this form is accurate and complete. I confirm that if any information is found incorrect and/or incomplete, that leads to a violation of regulations, may initiate legal actions, and I accept that I am the responsible party for any and all charges, penalties and violations."
                    placeholder="John Doe"
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
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
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button className="btn btn-primary">Submit</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCContent;
