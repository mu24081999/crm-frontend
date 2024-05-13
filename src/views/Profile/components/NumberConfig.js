import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUserRec } from "../../../redux/services/users";
import { setAccount } from "../../../redux/slices/auth";
const NumberConfig = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { claimedNumbers } = useSelector((state) => state.calling);
  const { users, isLoading } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch, token, user]);
  useEffect(() => {
    if (user) {
      setValue("phone", {
        label: user?.phone,
        value: user?.phone,
      });
    }
  }, [user, setValue]);
  const handleEditAccount = async (data) => {
    const formData = new FormData();
    formData.append("phone", data?.phone?.value);
    const is_updated = await dispatch(updateUserRec(token, formData, user.id));
    if (is_updated === true) {
      const newUser = {
        ...user,
        phone: data?.phone?.value,
      };
      dispatch(setAccount(newUser));
    }
  };
  return (
    <div className="tab-pane fade show" id="number_config">
      <form onSubmit={handleSubmit(handleEditAccount)}>
        <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Set Phone Number Calls and SMS</span>
        </div>
        <div className="row gx-3">
          <div className="col-sm-6">
            <ReactSelectField
              name="phone"
              placeholder="Your Phone Number"
              label="Phone"
              control={control}
              options={
                claimedNumbers?.length > 0 &&
                user?.role === "USER" &&
                user.parent_id !== null &&
                user?.client_id === null
                  ? claimedNumbers?.map((key, index) => {
                      return {
                        label: key?.phoneNumber,
                        value: key?.phoneNumber,
                      };
                    })
                  : user?.role === "AGENT" &&
                    user?.twilio_numbers?.numbers?.length > 0
                  ? user?.twilio_numbers?.numbers?.map((key, index) => {
                      return {
                        label: key?.phoneNumber,
                        value: key?.phoneNumber,
                      };
                    })
                  : []
              }
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
        <button type="submit" className="btn btn-primary mt-5">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default NumberConfig;
