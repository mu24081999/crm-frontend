import React, { useEffect } from "react";
import InputField from "../../../components/FormFields/InputField";
import { useForm } from "react-hook-form";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  addSettingRec,
  readSettingRec,
  updateSettingRec,
} from "../../../redux/services/generalSetting";

const PhoneNumberRatesContent = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { isLoading, settingDetails } = useSelector((state) => state.setting);
  useEffect(() => {
    dispatch(readSettingRec(token, 1));
  }, [dispatch, token]);
  useEffect(() => {
    if (settingDetails?.id) {
      setValue(
        "toll_free_number_price",
        settingDetails?.toll_free_number_price
      );
      setValue("local_number_price", settingDetails?.local_number_price);
    }
  }, [settingDetails]);
  const handleAdd = (data) => {
    console.log("🚀 ~ handleAdd ~ data:", data);
    const formdata = {
      ...data,
      user_id: user.id,
    };
    if (settingDetails?.id) {
      dispatch(updateSettingRec(token, settingDetails?.id, formdata));
    } else {
      dispatch(addSettingRec(token, formdata));
    }
  };
  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="border border-1 rounded">
            <header className="taskboard-header pt-3 pb-2 px-4">
              <div className="d-flex justify-content-between">
                <div className="taskboardapp-title link-dark" href="/">
                  <h3>DID Rates Setting</h3>
                </div>
              </div>
            </header>
          </div>
          <div className="contactapp-content">
            <form className="p-5 w-100" onSubmit={handleSubmit(handleAdd)}>
              <div className="col-md-6 col-sm-6">
                <InputField
                  control={control}
                  errors={errors}
                  name="toll_free_number_price"
                  placeholder="Toll Free Number Price"
                  label="Toll Free Number Price"
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
                  name="local_number_price"
                  placeholder="Local Number Price"
                  label="Local Number Price"
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />
              </div>
              <div className="">
                <button className="btn btn-primary">
                  {isLoading ? <Loader /> : "Submit"}
                </button>
              </div>{" "}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberRatesContent;
