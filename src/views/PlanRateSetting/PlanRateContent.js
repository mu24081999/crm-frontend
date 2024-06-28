import React, { useEffect } from "react";
import InputField from "../../components/FormFields/InputField";

import { useForm } from "react-hook-form";
import { getUserKYCList, storeKyc } from "../../redux/services/kyc";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  addPlanRateRec,
  readRateRec,
  updatePlanRec,
} from "../../redux/services/plan-rates";
const PlanRateContent = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  const { planRates } = useSelector((state) => state.plan_rate);
  useEffect(() => {
    dispatch(readRateRec(token, 1));
  }, [dispatch, token]);
  useEffect(() => {
    if (planRates) {
      setValue("starter", planRates?.starter);
      setValue("growth", planRates?.growth);
      setValue("enterprise", planRates?.enterprise);
    }
  }, [planRates, setValue]);
  const handleAddRates = (data) => {
    const formData = {
      starter: data.starter,
      growth: data.growth,
      enterprise: data.enterprise,
      user_id: user_id,
    };
    if (planRates?.id !== undefined)
      return dispatch(updatePlanRec(token, planRates?.id, formData));
    else return dispatch(addPlanRateRec(token, formData));
  };
  return (
    <div className="container">
      <div className="card" style={{ margin: "7% 15% 7% 15%" }}>
        <div className="card-header bg-primary">
          <div className="card-title" style={{ color: "white" }}>
            Plan Rate Setting
          </div>
        </div>
        <div className="card-body">
          <div className="form">
            <form onSubmit={handleSubmit(handleAddRates)}>
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <InputField
                    name="starter"
                    errors={errors}
                    control={control}
                    label="Starter"
                    placeholder="Starter plan rate"
                  />
                </div>

                <div className="col-md-4 col-sm-6">
                  <InputField
                    name="growth"
                    errors={errors}
                    control={control}
                    label="Growth"
                    placeholder="Growth plan rate"
                  />
                </div>
                <div className="col-md-4 col-sm-6">
                  <InputField
                    name="enterprise"
                    errors={errors}
                    control={control}
                    label="Enterprise"
                    placeholder="Enterprise plan rate"
                  />
                </div>
              </div>
              <div className=" float-end">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanRateContent;
