import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch, useSelector } from "react-redux";
import "./file.css";
import Loader from "../../../components/Loader/Loader";
import { addUserRec, updateUserRec } from "../../../redux/services/users";
import { getAgentsList } from "../../../redux/services/agent";
import { getAllClaimedNumbers } from "../../../redux/services/calling";
import _ from "lodash";
const UpdateAgentInfo = ({ agentDetails }) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { token, isLoading, user, accountSid, accountAuthToken } = useSelector(
    (state) => state.auth
  );
  const { claimedNumbers } = useSelector((state) => state.calling);
  console.log("🚀 ~ AddContactList ~ claimedNumbers:", claimedNumbers);

  const [logo, setLogo] = useState(null);
  const countryWatcher = watch("country_array");
  const stateWatcher = watch("state_array");
  const cityWatcher = watch("city_array");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllClaimedNumbers(token, { accountSid, authToken: accountAuthToken })
    );
  }, [dispatch, token, accountAuthToken, accountSid]);
  useEffect(() => {
    setValue("name", agentDetails?.name);
    setValue("username", agentDetails?.username);
    setValue("email", agentDetails?.email);
    setValue("personal_phone", agentDetails?.personal_phone);
    setValue("twilio_numbers", agentDetails?.twilio_numbers?.numbers);
  }, [agentDetails, setValue]);
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
  const handleUpdateInfo = (data) => {
    console.log("🚀 ~ handleUpdateInfo ~ data:", data);
    const formData = {
      name: data?.name,
      email: data?.email,
      username: data?.username,
      personal_phone: data?.personal_phone,
      accountSid: user?.accountSid,
      twilio_numbers: { numbers: data?.twilio_numbers },
    };
    dispatch(updateUserRec(token, formData, user.id));
    dispatch(getAgentsList(token, user.id));
  };
  const handleChangeImage = (e) => {
    setLogo(e.currentTarget.files[0]);
    console.log("🚀 ~ handleChangeImage ~ e:", e.currentTarget.files[0]);
  };
  return (
    <form onSubmit={handleSubmit(handleUpdateInfo)}>
      {isLoading ? (
        <Loader />
      ) : (
        <div class="modal-body">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <InputField
                control={control}
                errors={errors}
                name="name"
                placeholder="Name"
                label="Name"
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
                control={control}
                errors={errors}
                name="username"
                placeholder="Username"
                label="Username"
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
                control={control}
                type="email"
                errors={errors}
                name="email"
                placeholder="Email"
                label="Email"
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
                type="text"
                control={control}
                errors={errors}
                name="personal_phone"
                placeholder="Phone Number"
                label="Phone Number"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>

            <div className="col-md-6 col-sm-6">
              <ReactSelectField
                name="twilio_numbers"
                control={control}
                errors={errors}
                placeholder="Asign Number"
                label="Asign Claimed Number"
                isMulti={true}
                options={
                  claimedNumbers?.length > 0
                    ? claimedNumbers?.map((number, index) => {
                        return {
                          label: number.friendlyName,
                          value: number.phoneNumber,
                          ...number,
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

export default UpdateAgentInfo;
