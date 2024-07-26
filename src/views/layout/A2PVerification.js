import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/FormFields/InputField";
import TextAreaField from "../../components/FormFields/textAreaField";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { storeTicket } from "../../redux/services/ticket";
import ReactSelectField from "../../components/FormFields/reactSelectField";
import countryList from "react-select-country-list";
import {
  getVerificationDetails,
  storeVerification,
  updateVerificationRec,
} from "../../redux/services/verification";
import Payment from "../../components/PaymentCard/Payment";
import { paymentIntent } from "../../redux/services/payment";

const A2PVerification = () => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch({});
  const { token, user } = useSelector((state) => state.auth);
  const { isLoading, verificationDetails } = useSelector(
    (state) => state.verification
  );
  useEffect(() => {
    dispatch(getVerificationDetails(token, user?.id));
  }, [token, user, dispatch]);
  const a2pverification = (data) => {
    const formData = {
      ...data,
      user_id: user.id,
      business_type: data.business_type.value,
      business_registration_id_type: data.business_registration_id_type.value,
      business_industry: data.business_industry.value,
      business_region: data.business_region.value,
      country: data.country.value,
      brand_type: data.brand_type.value,
      email: user.email,
      phone_number: user.phone,
      name: user.name,
      username: user.username,
      amount_paid: "0",
    };
    console.log(formData);
    dispatch(storeVerification(token, formData));
  };
  const afterPayment = () => {
    dispatch(
      updateVerificationRec(token, verificationDetails?.id, {
        amount_paid: 10,
        payment_status: "paid",
        user_id: user.id,
      })
    );
  };
  const handleAddPayment = () => {
    dispatch(
      paymentIntent(token, {
        currency: "usd",
        amount: 10 * 100,
      })
    );
  };
  return (
    <div>
      {" "}
      <div
        class="modal fade"
        id="a2p-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="submitTicket"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-lg modal-dialog-centered "
          role="document"
        >
          <div class="modal-content">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div class="modal-header bg-primary ">
                  <h5
                    class="modal-title fs-6 fw-bold "
                    style={{ color: "white" }}
                  >
                    A2P Details
                  </h5>
                  <button
                    type="button"
                    class="btn-close btn-light"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                {verificationDetails &&
                verificationDetails?.payment_status === "pending" ? (
                  <>
                    <div className="modal-body">
                      <div className="alert alert-success">
                        You have successfully added your A2P Details now you
                        need to pay registration fee of $10.
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddPayment()}
                        data-bs-toggle="modal"
                        data-bs-target="#add_payment_form"
                      >
                        Add Payment
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {verificationDetails?.payment_status === "paid" &&
                      verificationDetails?.status === "pending" && (
                        <div className="modal-body">
                          <div className="alert alert-success">
                            Your Details are in process, we'll update you soon.
                          </div>
                        </div>
                      )}
                    {!verificationDetails && (
                      <form onSubmit={handleSubmit(a2pverification)}>
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <div class="modal-body row">
                            <div className="col-md-12 col-sm-6">
                              <InputField
                                control={control}
                                errors={errors}
                                name="legal_business_name"
                                mb="true"
                                label="Legal Business Name"
                                placeholder="Legal Business Name"
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                              <p className="mb-5">
                                If you're registering a US entity, please enter
                                the exact legal business name as registered with
                                the EIN, which can be found on the CP 575 EIN
                                Confirmation Letter.
                              </p>
                            </div>

                            <div className="col-md-12 col-sm-6">
                              <ReactSelectField
                                name="business_type"
                                placeholder="Business Type"
                                label="Business Type"
                                control={control}
                                errors={errors}
                                mb={false}
                                options={[
                                  {
                                    label: "Partnership",
                                    value: "partnership",
                                  },
                                  {
                                    label: "Corporation",
                                    value: "corporation",
                                  },
                                  {
                                    label: "Co-operative",
                                    value: "cooperative",
                                  },
                                  {
                                    label: "Limited Liability Corporation",
                                    value: "limited_liability_corporation",
                                  },
                                  {
                                    label: "Non-profit Corporation",
                                    value: "non-profit-corporation",
                                  },
                                ]}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>
                            <div className="col-md-12 col-sm-6">
                              <ReactSelectField
                                name="business_registration_id_type"
                                placeholder="Business Registration ID Type"
                                label="Business Registration ID Type"
                                control={control}
                                errors={errors}
                                //   mb={false}
                                options={[
                                  {
                                    label:
                                      "USA: Employer Identification Number",
                                    value: "usa_ein",
                                  },
                                  {
                                    label: "CANADA: Canada Business Number",
                                    value: "canada_cbn",
                                  },
                                  {
                                    label: "Great Britian: Business Number",
                                    value: "britian-bn",
                                  },
                                  {
                                    label:
                                      "Australia: Company Number from ASIC (ACN)",
                                    value: "australia-cn",
                                  },
                                  {
                                    label: "India: Corporate Identity Number",
                                    value: "india-cin",
                                  },
                                  {
                                    label: "VAT Number",
                                    value: "vat-number",
                                  },
                                  {
                                    label: "Israel: Registration Number",
                                    value: "israel",
                                  },
                                  {
                                    label: "Other",
                                    value: "other",
                                  },
                                ]}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>

                            <div className="col-md-12 col-sm-6">
                              <InputField
                                control={control}
                                errors={errors}
                                name="business_reg_no"
                                mb="true"
                                label="Business Registration Number"
                                placeholder="Business Registration Number"
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                              <p className="mb-5">
                                Enter the EIN / Tax ID as it appears in the EIN
                                listing
                              </p>
                            </div>
                            <div className="col-md-12 col-sm-6">
                              <ReactSelectField
                                name="business_industry"
                                placeholder="Business Industry"
                                label="Business Industry"
                                control={control}
                                errors={errors}
                                //   mb={false}
                                options={[
                                  {
                                    label: "Advertising and Marketing",
                                    value: "advertising_marketing",
                                  },
                                  {
                                    label: "Automotive",
                                    value: "automotive",
                                  },
                                  {
                                    label: "Consumer Services",
                                    value: "consumer_services",
                                  },
                                  {
                                    label: "Education",
                                    value: "education",
                                  },
                                  {
                                    label: "Financial Services",
                                    value: "financial_services",
                                  },
                                  {
                                    label: "Gaming",
                                    value: "gaming",
                                  },
                                  {
                                    label: "Government and Public Sector",
                                    value: "government_public_sector",
                                  },
                                  {
                                    label: "Healthcare",
                                    value: "healthcare",
                                  },
                                  {
                                    label: "Hospitality and Travel",
                                    value: "hospitality_travel",
                                  },
                                  {
                                    label: "Insurance",
                                    value: "insurance",
                                  },
                                  {
                                    label: "Media and Entertainment",
                                    value: "media_entertainment",
                                  },
                                  {
                                    label: "Real Estate",
                                    value: "real_estate",
                                  },
                                  {
                                    label: "Retail",
                                    value: "retail",
                                  },
                                  {
                                    label: "Technology",
                                    value: "technology",
                                  },
                                  {
                                    label: "Telecommunications",
                                    value: "telecommunications",
                                  },
                                  {
                                    label: "Transportation and Logistics",
                                    value: "transportation_logistics",
                                  },
                                  {
                                    label: "Utilities",
                                    value: "utilities",
                                  },
                                  {
                                    label: "Other",
                                    value: "other",
                                  },
                                ]}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>

                            <div className="col-md-12 col-sm-6">
                              <InputField
                                control={control}
                                errors={errors}
                                name="website_url"
                                mb="true"
                                label="Website URL"
                                placeholder="Website URL"
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                              <p className="mb-5">
                                The provided website should be reflective of the
                                registered brand and accessible.
                              </p>
                            </div>
                            <div className="col-md-12 col-sm-6">
                              <ReactSelectField
                                name="business_region"
                                placeholder="Business Rigion"
                                label="Business Rigion"
                                control={control}
                                errors={errors}
                                //   mb={true}
                                options={[
                                  {
                                    label: "Africe",
                                    value: "africa",
                                  },
                                  {
                                    label: "Asia",
                                    value: "asia",
                                  },
                                  {
                                    label: "Europe",
                                    value: "europe",
                                  },
                                  {
                                    label: "Canada and USA",
                                    value: "canada_usa",
                                  },
                                  {
                                    label: "Latin America",
                                    value: "latin_america",
                                  },
                                ]}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>
                            <div className="col-md-12 col-sm-6">
                              <ReactSelectField
                                name="country"
                                placeholder="Select Country"
                                label="Country"
                                control={control}
                                errors={errors}
                                //   mb={true}
                                options={countryList().getData() || []}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>
                            <div className="col-md-12 col-sm-6">
                              <InputField
                                control={control}
                                errors={errors}
                                name="street"
                                //   mb="true"
                                label="Street Address"
                                placeholder="Street Address"
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>
                            <div className="col-md-12 col-sm-6">
                              <InputField
                                control={control}
                                errors={errors}
                                name="city"
                                //   mb="true"
                                label="City"
                                placeholder="City"
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>
                            <div className="col-md-12 col-sm-6">
                              <InputField
                                control={control}
                                errors={errors}
                                name="rigion"
                                //   mb="true"
                                label="Rigion/State/Province"
                                placeholder="Rigion"
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>
                            <div className="col-md-12 col-sm-6">
                              <InputField
                                control={control}
                                errors={errors}
                                name="postal_code"
                                //   mb="true"
                                label="Zip/Postal Code"
                                placeholder="Postal Code"
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>
                            <div className="col-md-12 col-sm-6">
                              <ReactSelectField
                                name="brand_type"
                                placeholder="Brand Type"
                                label="Brand Type"
                                control={control}
                                errors={errors}
                                //   mb={true}
                                options={[
                                  {
                                    label:
                                      "Low Volume Standard Brand $10 one time fee. 600 sms per day",
                                    value: "standard",
                                  },
                                  // {
                                  //   label:
                                  //     "Standard $44 one type fee. 2000-20000 sms per day.",
                                  //   value: "enterprice",
                                  // },
                                ]}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Field required!",
                                  },
                                }}
                              />
                            </div>
                          </div>
                        )}

                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Payment afterPayment={afterPayment} />
    </div>
  );
};

export default A2PVerification;
