import React, { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch, useSelector } from "react-redux";
import "./file.css";
import { addContact } from "../../../redux/services/contact";
import { getBoardList } from "../../../redux/services/board";
import { SocketContext } from "../../../Context";
import countryList from "react-select-country-list";
const AddContactList = () => {
  const { messageError } = useContext(SocketContext);
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { token } = useSelector((state) => state.auth);
  const { boards } = useSelector((state) => state.board);
  const countryWatcher = watch("country_array");
  const stateWatcher = watch("state_array");
  const cityWatcher = watch("city_array");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBoardList(token));
  }, [dispatch, token]);
  useEffect(() => {
    if (countryWatcher !== undefined) {
      setValue("country", countryWatcher.value);
    }
  }, [countryWatcher, setValue]);
  // useEffect(() => {
  //   if (stateWatcher !== undefined) {
  //     setValue("state", stateWatcher.value);
  //   }
  // }, [stateWatcher, setValue]);
  // useEffect(() => {
  //   if (cityWatcher !== undefined) {
  //     setValue("city", cityWatcher.value);
  //   }
  // }, [cityWatcher, setValue]);
  const handleAddContact = (data) => {
    const formData = {
      board_id: data?.board_id?.value,
      firstname: data?.firstname,
      middlename: data?.middlename,
      lastname: data?.lastname,
      biography: data?.biography,
      phone: data?.phone,
      file: data?.file,
      email: data?.email,
      country: data?.country,
      state: data?.state,
      city: data?.city,
      company_name: data?.company_name,
      designation: data?.designation,
      website: data?.website,
      work_phone: data?.work_phone,
      tags: JSON.stringify([
        {
          name: "Collaborator",
        },
      ]),

      social_links: JSON.stringify([
        {
          name: "facebook",
          link: data?.facebook,
        },
        {
          name: "linkedin",
          link: data?.linkedin,
        },
        {
          name: "gmail",
          link: data?.gmail,
        },
        {
          name: "twitter",
          link: data?.twitter,
        },
      ]),
    };
    console.log("🚀 ~ handleAddContact ~ data:", data.file);
    dispatch(addContact(token, formData));
  };
  const handleChangeImage = (e) => {
    setValue("file", e.currentTarget.files[0]);
    console.log("🚀 ~ handleChangeImage ~ e:", e.currentTarget.files[0]);
  };
  return (
    <form onSubmit={handleSubmit(handleAddContact)}>
      <div className="row gx-3">
        <div className="col-sm-2 form-group">
          <div class="frame pt-3">
            <div class="center">
              <div class="dropzone">
                <img
                  src="http://100dayscss.com/codepen/upload.svg"
                  class="upload-icon"
                />
                <p className=" fs-5 fw-bolder text-center">Upload Photo</p>

                <input
                  type="file"
                  class="upload-input"
                  onChange={(e) => {
                    handleChangeImage(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-10 form-group">
          <TextAreaField
            name="biography"
            placeholder="Biography"
            rows={5}
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: "Field required!",
            //   },
            // }}
            errors={errors}
          />
        </div>
      </div>
      <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
        <span>Basic Info</span>
      </div>
      <div className="row gx-3">
        <div className="col-sm-4">
          <InputField
            name="firstname"
            placeholder="First name"
            // label="First Name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
        </div>
        <div className="col-sm-4">
          <InputField
            name="middlename"
            placeholder="Middlename"
            // label="Middle Name"
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: "Field required!",
            //   },
            // }}
            errors={errors}
          />
        </div>
        <div className="col-sm-4">
          <InputField
            name="lastname"
            placeholder="Lastname"
            // label="Last Name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
        </div>
      </div>
      <div className="row gx-3">
        <div className="col-sm-6">
          <InputField
            name="email"
            type="email"
            placeholder="example@example.com"
            // label="Email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="phone"
            placeholder="Phone number"
            // label="Phone Number"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
        </div>
      </div>

      <div className="row gx-3">
        <div className="col-sm-6 col-md-6">
          <ReactSelectField
            name="board_id"
            placeholder="Lead Pipeline"
            // label="City"
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: "Field required!",
            //   },
            // }}
            options={
              boards?.length > 0
                ? boards?.map((board, index) => {
                    return {
                      label: board?.name,
                      value: board?.id,
                    };
                  })
                : []
            }
            errors={errors}
          />
        </div>
        <div className="col-sm-6 col-md-6">
          <ReactSelectField
            name="country_array"
            placeholder="Country"
            // label="Country"
            control={control}
            options={countryList().getData() || []}
            errors={errors}
          />
        </div>
        <div className="col-sm-6 col-md-6">
          <InputField
            name="city"
            placeholder="City"
            // label="Phone Number"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
        </div>
        <div className="col-sm-6 col-md-6">
          <InputField
            name="state"
            placeholder="State"
            // label="Phone Number"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
        </div>
        <div className="col-sm-6 col-md-12">
          <InputField
            name="street_address"
            placeholder="Streat 1, apt. # 3038"
            control={control}
            errors={errors}
          />
        </div>
      </div>
      {/* <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
        <span>Company Info</span>
      </div>
      <div className="row gx-3">
        <div className="col-sm-6">
          <InputField
            name="company_name"
            placeholder="Company Name"
            // label="Company Name"
            control={control}
            errors={errors}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="designation"
            placeholder="Your designation "
            // label="Desgnation"
            control={control}
            errors={errors}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="website"
            placeholder="Your website link"
            // label="Website"
            control={control}
            errors={errors}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="work_phone"
            placeholder="Your work phone number"
            // label="Work Phone Number"
            control={control}
            errors={errors}
          />
        </div>
      </div> */}
      <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
        <span>Additional Info</span>
      </div>
      <div className="row gx-3">
        <div className="col-sm-6">
          <InputField
            name="facebook"
            placeholder="Your facebook"
            // label="Facebook"
            control={control}
            errors={errors}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="twitter"
            placeholder="Your twitter"
            // label="Twitter"
            control={control}
            errors={errors}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="linkedin"
            placeholder="Your linkedin"
            // label="LinkedIn"
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: "Field required!",
            //   },
            // }}
            errors={errors}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="gmail"
            placeholder="Your gmail"
            // label="Gmail"
            control={control}
            errors={errors}
          />
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
        <button
          type="submit"
          className="btn btn-primary"
          // data-bs-dismiss="modal"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddContactList;
