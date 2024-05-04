import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import DatePickerField from "../../../components/FormFields/datePickerField";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "./file.css";
import { addContact } from "../../../redux/services/contact";
import Loader from "../../../components/Loader/Loader";
import { addUserRec } from "../../../redux/services/users";
const AddContactList = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { token, isLoading } = useSelector((state) => state.auth);
  const [logo, setLogo] = useState(null);
  const countryWatcher = watch("country_array");
  const stateWatcher = watch("state_array");
  const cityWatcher = watch("city_array");
  const dispatch = useDispatch();
  useEffect(() => {
    if (countryWatcher !== undefined) {
      setValue("country", countryWatcher.value);
    }
  }, [countryWatcher, setValue]);
  useEffect(() => {
    if (stateWatcher !== undefined) {
      setValue("state", stateWatcher.value);
    }
  }, [stateWatcher, setValue]);
  useEffect(() => {
    if (cityWatcher !== undefined) {
      setValue("city", cityWatcher.value);
    }
  }, [cityWatcher, setValue]);
  const handleAddContact = (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    formData.append("username", data?.username);
    formData.append("role", "USER");
    formData.append("avatar", logo && logo);
    console.log("🚀 ~ handleAddContact ~ data:", data, logo);
    // dispatch(addContact(token, formData));
    dispatch(addUserRec(formData));
  };
  const handleChangeImage = (e) => {
    setLogo(e.currentTarget.files[0]);
    console.log("🚀 ~ handleChangeImage ~ e:", e.currentTarget.files[0]);
  };
  return (
    <form onSubmit={handleSubmit(handleAddContact)}>
      {isLoading ? (
        <Loader />
      ) : (
        <div class="modal-body">
          {/* <div class="frame mb-5">
            <div class="center">
              <div class="dropzone">
                <div>
                  <img
                    src={
                      logo && URL.createObjectURL(logo)
                    }
                    alt="Preview"
                    width={100}
                  />
                </div>
                <img
                  src="http://100dayscss.com/codepen/upload.svg"
                  class={`upload-icon ${logo ? "d-none" : ""}`}
                  alt="default"
                />

                <p
                  className={` fs-6 fw-bolder text-center ${
                    logo ? "d-none" : ""
                  }`}
                >
                  Upload Logo
                </p>

                <input
                  type="file"
                  class="upload-input"
                  onChange={(e) => {
                    handleChangeImage(e);
                  }}
                />
              </div>
            </div>
          </div> */}
          <div className="row">
            {/* <div className="col-md-6 col-sm-6">
              <ReactSelectField
                name={`role`}
                placeholder="Role"
                mb={true}
                options={[
                  { label: "User", value: "USER" },
                  { label: "Admin", value: "ADMIN" },
                  { label: "Super Admin", value: "SUPER_ADMIN" },
                ]}
                control={control}
                errors={errors}
              />
            </div> */}
            <div className="col-md-6 col-sm-6">
              <InputField
                control={control}
                errors={errors}
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="col-md-6 col-sm-6">
              <InputField
                control={control}
                errors={errors}
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="col-md-6 col-sm-6">
              <InputField
                control={control}
                type="email"
                errors={errors}
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="col-md-6 col-sm-6">
              <InputField
                type="password"
                control={control}
                errors={errors}
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
        </div>
      )}

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddContactList;
