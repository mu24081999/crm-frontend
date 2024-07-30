import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch, useSelector } from "react-redux";
import "./file.css";
import countryList from "react-select-country-list";
import { addBundleRec } from "../../../redux/services/bundles";
import Loader from "../../../components/Loader/Loader";
const CreateRegulatoryBundle = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const [file, setFile] = useState(null);
  const end_user_type_watcher = watch("end_user_type");
  const { user_id, token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.bundle);
  const countryWatcher = watch("country_array");
  const dispatch = useDispatch();

  useEffect(() => {
    if (countryWatcher !== undefined) {
      setValue("country", countryWatcher.value);
    }
  }, [countryWatcher, setValue]);
  const handleCreateBundle = (data) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("country", data?.country_array?.value);
    formData.append("number_type", data?.number_type?.value);
    formData.append("end_user_type", data?.end_user_type?.value);
    formData.append("firstname", data?.firstname);
    formData.append("lastname", data?.lastname);
    formData.append("email", data?.email);
    formData.append("phone_number", data?.phone_number);
    formData.append("purpose_phone", data?.purpose_phone);
    formData.append("supporting_document", file);
    formData.append("friendly_name", data.friendly_name);
    formData.append("business_name", data.business_name);
    formData.append("business_ein", data.business_ein);
    dispatch(addBundleRec(token, formData));
  };
  const handleChangeImage = (e) => {
    setFile(e.currentTarget.files[0]);
  };
  const oneNextItem = () => {
    const stepOne = document.getElementById("step_one");
    const stepTwo = document.getElementById("step_two");

    if (stepOne && stepTwo) {
      stepOne.classList.remove("show");
      stepTwo.classList.add("show");
    }
  };
  const twoNextItem = () => {
    const stepOne = document.getElementById("step_two");
    const stepTwo = document.getElementById("step_three");

    if (stepOne && stepTwo) {
      stepOne.classList.remove("show");
      stepTwo.classList.add("show");
    }
  };
  const threeNextItem = () => {
    const stepOne = document.getElementById("step_three");
    const stepTwo = document.getElementById("step_four");

    if (stepOne && stepTwo) {
      stepOne.classList.remove("show");
      stepTwo.classList.add("show");
    }
  };
  const fourNextItem = () => {
    const stepOne = document.getElementById("step_four");
    const stepTwo = document.getElementById("step_five");

    if (stepOne && stepTwo) {
      stepOne.classList.remove("show");
      stepTwo.classList.add("show");
    }
  };
  return (
    <form onSubmit={handleSubmit(handleCreateBundle)}>
      <div className="row">
        <div
          id="accordionSimpleExample"
          class="accordion accordion-simple single-email-thread"
        >
          <div class="accordion-item">
            <div id="simple-headingOne" class="accordion-header">
              <div
                data-bs-toggle="collapse"
                data-bs-target={`#step_one`}
                role="button"
                aria-expanded="false"
                className="px-3 py-3 border fw-bold bg-primary text-white"
              >
                1. Choose Country & Type of phone number that needs to be
                compliant{" "}
              </div>
            </div>
            <div id={`step_one`} class="accordion-collapse collapse">
              <div class="accordion-body">
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <ReactSelectField
                      name="country_array"
                      placeholder="Country"
                      label="Country"
                      control={control}
                      options={[
                        { label: "Argentina", value: "AR" },
                        { label: "Australia", value: "AU" },
                        { label: "Austria", value: "AT" },
                        { label: "Belgium", value: "BE" },
                        { label: "Brazil", value: "BR" },
                        { label: "Canada", value: "CA" },
                        { label: "Chile", value: "CL" },
                        { label: "Colombia", value: "CO" },
                        { label: "Croatia", value: "HR" },
                        { label: "Czech Republic", value: "CZ" },
                        { label: "Denmark", value: "DK" },
                        { label: "Dominican Republic", value: "DO" },
                        { label: "Estonia", value: "EE" },
                        { label: "Finland", value: "FI" },
                        { label: "France", value: "FR" },
                        { label: "Germany", value: "DE" },
                        { label: "Greece", value: "GR" },
                        { label: "Hong Kong", value: "HK" },
                        { label: "Hungary", value: "HU" },
                        { label: "Iceland", value: "IS" },
                        { label: "India", value: "IN" },
                        { label: "Indonesia", value: "ID" },
                        { label: "Ireland", value: "IE" },
                        { label: "Israel", value: "IL" },
                        { label: "Italy", value: "IT" },
                        { label: "Japan", value: "JP" },
                        { label: "Latvia", value: "LV" },
                        { label: "Lithuania", value: "LT" },
                        { label: "Luxembourg", value: "LU" },
                        { label: "Malaysia", value: "MY" },
                        { label: "Malta", value: "MT" },
                        { label: "Mexico", value: "MX" },
                        { label: "Netherlands", value: "NL" },
                        { label: "New Zealand", value: "NZ" },
                        { label: "Norway", value: "NO" },
                        { label: "Panama", value: "PA" },
                        { label: "Peru", value: "PE" },
                        { label: "Philippines", value: "PH" },
                        { label: "Poland", value: "PL" },
                        { label: "Portugal", value: "PT" },
                        { label: "Puerto Rico", value: "PR" },
                        { label: "Romania", value: "RO" },
                        { label: "Russia", value: "RU" },
                        { label: "Singapore", value: "SG" },
                        { label: "Slovakia", value: "SK" },
                        { label: "Slovenia", value: "SI" },
                        { label: "South Africa", value: "ZA" },
                        { label: "South Korea", value: "KR" },
                        { label: "Spain", value: "ES" },
                        { label: "Sweden", value: "SE" },
                        { label: "Switzerland", value: "CH" },
                        { label: "Taiwan", value: "TW" },
                        { label: "Thailand", value: "TH" },
                        { label: "Turkey", value: "TR" },
                        { label: "United Arab Emirates", value: "AE" },
                        { label: "United Kingdom", value: "GB" },
                        { label: "United States", value: "US" },
                        { label: "Venezuela", value: "VE" },
                      ]}
                      errors={errors}
                    />
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <ReactSelectField
                      name="number_type"
                      placeholder="Type of Phone Number"
                      label="Type of Phone Number"
                      control={control}
                      options={[
                        { label: "Local", value: "local" },
                        { label: "Toll-Free", value: "toll-free" },
                        { label: "Mobile", value: "mobile" },
                        { label: "National", value: "national" },
                      ]}
                      errors={errors}
                    />
                  </div>
                </div>
                <div>
                  <button onClick={oneNextItem} className="btn btn-primary">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div id="simple-headingOne" class="accordion-header">
              <div
                data-bs-toggle="collapse"
                data-bs-target={`#step_two`}
                role="button"
                aria-expanded="false"
                className="px-3 py-3 border fw-bold bg-primary text-white"
              >
                2. Select the End-User Type
              </div>
            </div>
            <div id={`step_two`} class="accordion-collapse collapse">
              <div class="accordion-body">
                <div className="col-sm-6 col-md-6">
                  <ReactSelectField
                    name="end_user_type"
                    placeholder="End User Type"
                    label="End User Type"
                    control={control}
                    options={[
                      { label: "Business", value: "business" },
                      { label: "Individual", value: "individual" },
                    ]}
                    errors={errors}
                  />
                </div>
                <div>
                  <button className="btn btn-primary" onClick={twoNextItem}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div id="simple-headingOne" class="accordion-header">
              <div
                data-bs-toggle="collapse"
                data-bs-target={`#step_three`}
                role="button"
                aria-expanded="false"
                className="px-3 py-3 border fw-bold bg-primary text-white"
              >
                3. Add{" "}
                {end_user_type_watcher?.value === "individual"
                  ? "Individual"
                  : "Business"}{" "}
                Information
              </div>
            </div>
            <div id={`step_three`} class="accordion-collapse collapse">
              <div class="accordion-body row">
                <div className="col-sm-6 col-md-6">
                  <InputField
                    name="firstname"
                    placeholder="First Name"
                    label="First Name"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="col-sm-6 col-md-6">
                  <InputField
                    name="lastname"
                    placeholder="Last Name"
                    label="Last Name"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="col-sm-6 col-md-6">
                  <InputField
                    name="email"
                    placeholder="Email address"
                    label="Email"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="col-sm-6 col-md-6">
                  <InputField
                    name="phone_number"
                    placeholder="Phone Number"
                    label="Phone Number"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="col-sm-6 col-md-12">
                  <InputField
                    name="purpose_phone"
                    placeholder="Purpose Of Phone"
                    label="Purpose Of Phone"
                    control={control}
                    errors={errors}
                  />
                </div>
                {end_user_type_watcher?.value === "business" && (
                  <div className="row">
                    <div className="col-sm-6 col-md-6">
                      <InputField
                        name="business_name"
                        placeholder="Business Name"
                        label="Business Name"
                        control={control}
                        errors={errors}
                      />
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <InputField
                        name="business_ein"
                        placeholder="Business EIN "
                        label="Business EIN"
                        control={control}
                        errors={errors}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <button className="btn btn-primary" onClick={threeNextItem}>
                    {" "}
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div id="simple-headingOne" class="accordion-header">
              <div
                data-bs-toggle="collapse"
                data-bs-target={`#step_four`}
                role="button"
                aria-expanded="false"
                className="px-3 py-3 border fw-bold bg-primary text-white"
              >
                4. Upload Supporting Document
              </div>
            </div>
            <div id={`step_four`} class="accordion-collapse collapse">
              <div class="accordion-body">
                <div className=" gx-3">
                  <div className="col-sm-12">
                    <div className="">
                      <img
                        src={
                          file !== null
                            ? URL.createObjectURL(file)
                            : "https://t3.ftcdn.net/jpg/02/50/61/18/360_F_250611897_ohgStPhSHRAUoEi8EJZe5b6FIMvynvMR.jpg"
                        }
                        alt="user"
                        className="img-fluid"
                        style={{ height: "300px", width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="media-body">
                    <div className="btn btn-soft-primary btn-file mb-1">
                      Upload Photo
                      <input
                        type="file"
                        className="upload"
                        onChange={handleChangeImage}
                      />
                    </div>
                    <div className="form-text text-muted">
                      For better preview recommended size is 450px x 450px. Max
                      size 5mb.
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn btn-primary" onClick={fourNextItem}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div id="simple-headingOne" class="accordion-header">
              <div
                data-bs-toggle="collapse"
                data-bs-target={`#step_five`}
                role="button"
                aria-expanded="false"
                className="px-3 py-3 border fw-bold bg-primary text-white"
              >
                5. Give this Regulatory Bundle a Friendly Name.
              </div>
            </div>
            <div id={`step_five`} class="accordion-collapse collapse">
              <div class="accordion-body">
                <div className="col-sm-6 col-md-12">
                  <InputField
                    name="friendly_name"
                    placeholder="Friendly Name"
                    label="Give Regulatory Bundle a Friendly Name"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer align-items-center">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Done
        </button>
        {isLoading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="btn btn-primary"
            // data-bs-dismiss="modal"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateRegulatoryBundle;
