import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRec } from "../../../redux/services/users";
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
    if (user) {
      setValue("phone", user?.phone);
    }
  }, [user, setValue]);
  const handleEditAccount = async (data) => {
    const formData = new FormData();
    formData.append("phone", data?.phone?.value);
    const is_updated = await dispatch(updateUserRec(token, formData, user.id));

    console.log("is)updated", is_updated);

    if (is_updated === true) {
      const updatedUser = users?.filter((usr) => usr.email === user.email)[0];
      console.log("🚀 ~ handleEditAccount ~ updatedUser:", updatedUser);
      dispatch(setAccount(updatedUser));
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
                claimedNumbers?.length > 0
                  ? claimedNumbers?.map((number, index) => {
                      return {
                        label: number?.phoneNumber,
                        value: number.phoneNumber,
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
