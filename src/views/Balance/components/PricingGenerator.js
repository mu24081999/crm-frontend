import React from "react";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import countryList from "react-select-country-list";
import { getPricingServices } from "../../../redux/services/pricing";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";

const PricingGenerator = ({ authUser, dispatch, token }) => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const { pricing, isLoading } = useSelector((state) => state.pricing);
  const handlePriceGeneration = (data) => {
    const formData = {
      accountSid: authUser.accountSid,
      authToken: authUser.authToken,
      country_code: data.country.value,
    };
    dispatch(getPricingServices(token, formData));
    console.log("🚀 ~ handlePriceGeneration ~ data:", formData);
  };
  return (
    <div
      className="card shadow-lg  m-5"
      style={{ height: "50%", overflow: "scroll" }}
    >
      <div className="card-header bg-primary">
        <div className="card-title text-white">Pricing Generator</div>
      </div>
      <div className="card-body">
        <form
          onSubmit={handleSubmit(handlePriceGeneration)}
          className="d-flex gap-3 card-body pb-0"
        >
          <div className="col-md-10 col-sm-6">
            <ReactSelectField
              name="country"
              placeholder="Select Country"
              label="Generate Pricing by selecting desired country"
              control={control}
              errors={errors}
              mb={false}
              options={countryList().getData() || []}
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
            />
          </div>
          <div className="pt-5">
            {isLoading ? (
              <Loader />
            ) : (
              <button className="btn btn-primary">Submit</button>
            )}
          </div>
        </form>
        {!isLoading && pricing && (
          <div>
            <div className="card-body pt-0">
              <div className="d-flex gap-2">
                <div className="col-md-6 col-sm-6">
                  <div className="bg-primary p-2 rounded-top text-white text-center fw-bold">
                    Voice
                  </div>
                  <div className="border border-primary">
                    <div className="d-flex">
                      <div className="border col-6 text-center p-1">
                        Inbound Call
                      </div>
                      <div className="border col-6 text-center p-1">
                        {parseFloat(
                          pricing?.voicePricing?.inboundCallPrices[0]
                            ?.base_price
                        ) * 2 || 0}
                      </div>
                    </div>
                  </div>
                  <div className="border border-primary">
                    <div className="d-flex">
                      <div className="border col-6 text-center p-1">
                        Outbound Call
                      </div>
                      <div className="border col-6 text-center p-1">
                        {" "}
                        {parseFloat(
                          pricing?.voicePricing?.outboundPrefixPrices[0]
                            ?.base_price
                        ) * 2 || 0}
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="bg-primary p-2 rounded-top text-white text-center fw-bold">
                    SMS
                  </div>
                  <div className="border border-primary">
                    <div className="d-flex">
                      <div className="border col-6 text-center p-1">
                        Inbound SMS
                      </div>
                      <div className="border col-6 text-center p-1">
                        {" "}
                        {parseFloat(
                          pricing?.smsPricing?.inboundSmsPrices[0]?.base_price
                        ) * 2 || 0}
                      </div>
                    </div>
                  </div>
                  <div className="border border-primary">
                    <div className="d-flex">
                      <div className="border col-6 text-center p-1">
                        Outbound SMS
                      </div>
                      <div className="border col-6 text-center p-1">
                        {parseFloat(
                          pricing?.smsPricing?.outboundSmsPrices[0]?.prices[0]
                            ?.base_price
                        ) * 2 || 0}
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingGenerator;
