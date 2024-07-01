import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  getUsers,
  updateUserRec,
} from "../../../redux/services/users";
import { setAccount } from "../../../redux/slices/auth";
const BrandDetails = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const handleEditAccount = async (data) => {
    const formData = new FormData();
    formData.append("brand_name", data.brand_name);
    formData.append("avatar", avatar);
    const is_updated = await dispatch(updateUserRec(token, formData, user?.id));
    if (is_updated === true) {
      const new_user = await dispatch(getUserDetails(token, user.id));
      const newUser = {
        ...user,
        name: data.firstname + " " + data.lastname,
        email: data.email,
        location: data.location,
        bio: data.bio,
        personal_phone: data.personal_phone,
        avatar: new_user.avatar,
      };
      await dispatch(setAccount(newUser));
    }
  };
  const handleImage = (e) => {
    let image = e.currentTarget.files[0];
    setAvatar(image);
  };
  return (
    <div className="tab-pane fade show active" id="tab_brand">
      <form onSubmit={handleSubmit(handleEditAccount)}>
        <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Brand Logo</span>
        </div>
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="form-group">
              <div className="media align-items-center">
                <div className="media-head me-5">
                  <div className="avatar avatar-rounded avatar-xxl">
                    <img
                      src={
                        avatar !== null && avatar?.type !== undefined
                          ? URL.createObjectURL(avatar)
                          : user?.avatar !== undefined
                          ? user?.avatar
                          : "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <div className="btn btn-soft-primary btn-file mb-1">
                    Upload Photo
                    <input
                      type="file"
                      className="upload"
                      onChange={handleImage}
                    />
                  </div>
                  <div className="form-text text-muted">
                    For better preview recommended size is 450px x 450px. Max
                    size 5mb.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Personal Info</span>
        </div>
        <div className="row gx-3">
          <div className="col-sm-6">
            <InputField
              name="brand_name"
              placeholder="Brand Name"
              label="Brand Name"
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
              <TextAreaField
                name="details"
                placeholder="Briefly describe your business..."
                label="Business Details"
                rows="5"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
                errors={errors}
              />
              <small className="form-text text-muted">
                Brief details about your business.
              </small>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default BrandDetails;
