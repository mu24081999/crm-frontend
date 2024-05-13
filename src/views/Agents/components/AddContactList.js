import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch, useSelector } from "react-redux";
import "./file.css";
import Loader from "../../../components/Loader/Loader";
import { addUserRec } from "../../../redux/services/users";
import { getAgentsList } from "../../../redux/services/agent";
import { getAllClaimedNumbers } from "../../../redux/services/calling";
import _ from "lodash";
const AddContactList = () => {
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
    console.log("🚀 ~ handleAddContact ~ data:", data);
    const formData = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      username: data?.username,
      client_id: _.toString(user?.id),
      role: "AGENT",
      personal_phone: data?.personal_phone,
      accountSid: user?.accountSid,
      authToken: user?.authToken,
      api_key_sid: user?.api_key_sid,
      api_key_secret: user?.api_key_secret,
      twiml_app_sid: user?.twiml_app_sid,
      twilio_numbers: { numbers: data?.twilio_numbers },
    };
    dispatch(addUserRec(token, formData));
    dispatch(getAgentsList(token, user.id));
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
                type="personal_phone"
                control={control}
                errors={errors}
                name="phone"
                placeholder="Personal phone number"
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
              <InputField
                type="password"
                control={control}
                errors={errors}
                name="password"
                placeholder="Password"
                label="Password"
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

export default AddContactList;
