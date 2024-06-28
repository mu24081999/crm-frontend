import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUserRec } from "../../../redux/services/users";
import { setAccount } from "../../../redux/slices/auth";
const EditAccountSetting = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { users, isLoading } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  console.log("🚀 ~ EditAccountSetting ~ avatar:", avatar);
  useEffect(() => {
    setValue("firstname", user?.name?.split(" ")[0]);
    setValue("lastname", user?.name?.split(" ")[1]);
    setValue("location", user?.location);
    setValue("bio", user?.bio);
    setValue("personal_phone", user?.personal_phone);
    // setAvatar(user?.avatar);
  }, [user, setValue, users]);
  const handleEditAccount = async (data) => {
    const formData = new FormData();
    formData.append("name", data.firstname + " " + data.lastname);
    formData.append("avatar", avatar);
    formData.append("location", data.location);
    formData.append("bio", data.bio);
    formData.append("personal_phone", data.personal_phone);
    const is_updated = await dispatch(updateUserRec(token, formData, user?.id));
    if (is_updated === true) {
      const newUser = {
        ...user,
        name: data.firstname + " " + data.lastname,
        email: data.email,
        location: data.location,
        bio: data.bio,
        personal_phone: data.personal_phone,
      };
      console.log("🚀 ~ handleEditAccount ~ newUser:", newUser);

      await dispatch(setAccount(newUser));
    }
  };
  const handleImage = (e) => {
    let image = e.currentTarget.files[0];
    setAvatar(image);
  };
  return (
    <div className="tab-pane fade show active" id="tab_block_1">
      <form onSubmit={handleSubmit(handleEditAccount)}>
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
              name="firstname"
              placeholder="First Name"
              label="First Name"
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
              name="lastname"
              placeholder="Last Name"
              label="Last Name"
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
              name="personal_phone"
              placeholder="Your Phone Number"
              label="Phone"
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
              name="location"
              placeholder="Location"
              label="Location"
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
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="form-group">
              <TextAreaField
                name="bio"
                placeholder="Briefly describe yourself..."
                label="Bio"
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
                Brief bio about yourself. This will be displayed on your profile
                page.
              </small>
            </div>
          </div>
        </div>
        {/* <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Additional Info</span>
        </div>
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="form-group">
              <InputField
                name="phone"
                placeholder="Your Phone Number"
                label="Phone"
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
        </div> */}
        <button type="submit" className="btn btn-primary mt-5">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAccountSetting;
