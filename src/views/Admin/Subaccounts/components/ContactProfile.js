import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/FormFields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { updateContactRec } from "../../../../redux/services/contact";
import { MdClose } from "react-icons/md";
import ReactSelectField from "../../../../components/FormFields/reactSelectField";
import _ from "lodash";
import { updateUserRec } from "../../../../redux/services/users";

const ContactProfile = ({ contact }) => {
  const { token } = useSelector((state) => state.auth);
  const [logo, setLogo] = useState(null);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (contact) {
      setValue("name", contact.name);
      setValue("username", contact.username);
      setValue("personal_phone", contact.personal_phone);
      setValue("email", contact.email);
      setValue("role", {
        label: contact.role,
        value: contact.role,
      });
      setValue("status", {
        label: _.capitalize(contact.status),
        value: contact.status,
      });
    }
  }, [contact, setValue]);
  const handleUpdateUser = (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("username", data?.username);
    formData.append("email", data?.email);
    formData.append("personal_phone", data?.personal_phone);
    formData.append("status", data?.status?.value);
    formData.append("role", data?.role?.value);
    console.log("🚀 ~ handleUpdateUser ~ data:", data);
    if (logo) {
      formData.append("avatar", logo);
    }
    dispatch(updateUserRec(token, formData, contact.id));
  };
  const handleUpdateBio = (data) => {
    dispatch(updateContactRec(token, contact.id, data));
  };
  const handleChangeImage = (e) => {
    setLogo(e.currentTarget.files[0]);
    console.log("🚀 ~ handleChangeImage ~ e:", e.currentTarget.files[0]);
  };
  return (
    <>
      <div
        className="modal fade"
        id="editInfo"
        //   tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h6 className="modal-title" style={{ color: "white" }}>
                Profile Information
              </h6>
              <button
                type="button"
                className="btn btn-light btn-icon btn-sm"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <MdClose></MdClose>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(handleUpdateUser)}>
                <div className="row gx-3">
                  {/* <div class="frame mb-5">
                    <div class="center">
                      <div class="dropzone">
                        <div>
                          <img
                            src={
                              contact && logo === null
                                ? contact?.avatar
                                : logo && URL.createObjectURL(logo)
                            }
                            alt="Preview"
                            width={100}
                          />
                        </div>
                        <img
                          src="http://100dayscss.com/codepen/upload.svg"
                          class={`upload-icon ${
                            logo || contact?.avatar ? "d-none" : ""
                          }`}
                          alt="default"
                        />

                        <p
                          className={` fs-6 fw-bolder text-center ${
                            logo || contact?.avatar ? "d-none" : ""
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
                  <div className="col-sm-6 col-md-6">
                    <InputField
                      name="name"
                      placeholder="Enter your Full Name"
                      label="Name"
                      // defaultValue={contact?.name}
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
                      name="username"
                      placeholder="Enter username"
                      label="Username"
                      // defaultValue={contact?.username}
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
                      placeholder="Enter your email identity"
                      label="Email Id"
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
                      name="personal_phone"
                      placeholder="Enter your phone number"
                      label="Phone Number"
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
                  {/* <div className="col-sm-6">
                    <TagInput
                      name="tags"
                      label="Tags"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div> */}
                  {/* <div className="col-sm-6 mb-5">
                    <ReactSelectField
                      name={`role`}
                      placeholder="Select"
                      label="Role"
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
                  <div className="col-sm-6 mb-5">
                    <ReactSelectField
                      name={`status`}
                      placeholder="Select"
                      label="Status"
                      mb={true}
                      options={[
                        { label: "Active", value: "active" },
                        { label: "Block", value: "blocked" },
                      ]}
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="modal-footer align-items-center">
                  <button
                    data-bs-dismiss="modal"
                    type="button"
                    className="btn btn-secondary"
                  >
                    Discard
                  </button>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value={"Submit"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- More Info --> */}
      {/* <div
        className="modal fade"
        id="moreContact"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Profile Information</h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row gx-3">
                  <div className="col-sm-6">
                    <InputField
                      name="name"
                      placeholder="Enter Name"
                      label="Name"
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
                      name="lastname"
                      placeholder="Enter your Last Name"
                      label="Lastname"
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
                    <div className="form-group">
                      <label className="form-label">Language</label>
                      <input
                        className="form-control"
                        type="email"
                        value="contct@hencework.com"
                        placeholder="Email Id"
                        name="emailid1"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Birthday</label>
                      <input
                        className="form-control"
                        type="text"
                        value="10/24/1984"
                        placeholder="Phone No"
                        name="birthday1"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer align-items-center">
              <button type="button" className="btn btn-secondary">
                Discard
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- /More Info --> */}

      {/* <!-- Add Bio --> */}
      {/* <div
        className="modal fade"
        id="tagsInput"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Tags</h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row gx-3">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <select
                        id="input_tags"
                        className="form-control"
                        multiple="multiple"
                      >
                        <option selected="selected">Collaborator</option>
                        <option>Designer</option>
                        <option selected="selected">React Developer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer align-items-center">
              <button type="button" className="btn btn-secondary">
                Discard
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- /Tags --> */}

      {/* <!-- Add Bio --> */}
      {/* <div
        className="modal fade"
        id="addBio"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Biography</h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(handleUpdateBio)}>
                <div className="row gx-3">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <TextAreaField
                        control={control}
                        errors={errors}
                        name="biography"
                        rows={5}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer align-items-center">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-secondary"
                  >
                    Discard
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- /Add Bio --> */}
    </>
  );
};

export default ContactProfile;
