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
import {
  addUpdateBrandRec,
  getUserBrandRec,
} from "../../../redux/services/brand";
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
  const { brandDetails } = useSelector((state) => state.brand);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    setValue("brand_name", brandDetails?.brand_name);
    setValue("brand_details", brandDetails?.brand_details);
  }, [brandDetails, setValue]);
  const handleEditAccount = async (data) => {
    const formData = new FormData();
    formData.append("brand_name", data.brand_name);
    formData.append("brand_logo", avatar);
    formData.append("brand_details", data.brand_details);
    formData.append("user_id", user.id);

    const is_updated = await dispatch(addUpdateBrandRec(token, formData));
    if (is_updated === true) {
      await dispatch(getUserBrandRec(token, user.id));
    }
  };
  const handleImage = (e) => {
    let image = e.currentTarget.files[0];
    setAvatar(image);
  };
  return (
    <div className="tab-pane " id="tab_brand">
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
                          : brandDetails?.brand_logo !== undefined
                          ? brandDetails?.brand_logo
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
                name="brand_details"
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
