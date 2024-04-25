import React, { useEffect, useState } from "react";
import CreditCardInput from "react-credit-card-input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCardList, storeCard } from "../../../redux/services/card";
import {
  FaCalendar,
  FaRegCalendar,
  FaRegCalendarAlt,
  FaRegCreditCard,
} from "react-icons/fa";
import InputField from "../../../components/FormFields/InputField";

const CardInformation = () => {
  const { token } = useSelector((state) => state.auth);
  const { cards } = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [cardData, setCardData] = useState({
    cardholder_name: "",
    card_number: "",
    cvc: "",
    expiration_date: "",
  });
  useEffect(() => {
    dispatch(getCardList(token));
  }, [token, dispatch]);
  const handleAddCard = (data) => {
    console.log("🚀 ~ handleAddCard ~ data:", data);
    const formData = {
      ...data,
      cardholder_name: cardData?.cardholder_name,
      card_number: cardData?.card_number,
      cvc: cardData?.cvc,
      expiration_date: cardData?.expiration_date,
    };
    dispatch(storeCard(token, formData));
  };
  return (
    <div>
      <div className="tab-pane fade" id="tab_cards">
        <div className="title-lg fs-4 mb-4">
          <span>Card Information</span>
        </div>
        <div className="row gap-5">
          {cards?.length > 0 &&
            cards?.map((card, index) => (
              <div className="card rounded shadow-lg col-md-4 col-sm-6 my-5 p-0">
                <div className="card-header bg-primary ">
                  <div className="card-title" style={{ color: "white" }}>
                    {card?.cardholder_name}
                  </div>
                </div>
                <div className="card-body">
                  <div
                    className="bg-info py-2 px-3 rounded mb-3"
                    style={{ color: "white" }}
                  >
                    Card Information
                  </div>
                  <div className="ps-3">
                    <p>
                      <span className="pe-1">
                        <FaRegCreditCard size={25} />
                      </span>
                      <span className="fw-bold"> {card?.card_number}</span>
                    </p>
                    <p className="my-1">
                      <span className="pe-1">
                        <FaRegCalendarAlt size={25} />
                      </span>
                      <span className="fw-bold"> {card?.expiration_date}</span>
                    </p>
                  </div>
                  <div
                    className="bg-info py-2 px-3 rounded mt-3"
                    style={{ color: "white" }}
                  >
                    Billing Information
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>First Name:</div>
                      <div>{card?.firstname}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>Last Name:</div>
                      <div>{card?.lastname}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>Address:</div>
                      <div>{card?.address}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>City:</div>
                      <div>{card?.city}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>State:</div>
                      <div>{card?.state}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>Zip/Postal Code:</div>
                      <div>{card?.zip_code}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <form onSubmit={handleSubmit(handleAddCard)}>
          <div
            className="bg-secondary rounded px-3 py-2 my-3"
            style={{ color: "white" }}
          >
            Your Card Details
          </div>
          <div className="row">
            <div className="form-group col-6">
              {/* <label className="form-label">Card Holder Name</label> */}
              <input
                type="text"
                name="cardholder_name"
                placeholder="Card Holder Name"
                className="form-control"
                required
                onChange={(e) =>
                  setCardData({ ...cardData, cardholder_name: e.target.value })
                }
              />
            </div>
            <div className="col-6">
              <CreditCardInput
                onError={({ inputName, err }) =>
                  console.log(`credit card input error: ${err}`)
                }
                cardCVCInputProps={{
                  onBlur: (e) => console.log("cvc blur", e),
                  onChange: (e) =>
                    setCardData({ ...cardData, cvc: e.target.value }),
                  onError: (err) => console.log(`cvc error: ${err}`),
                }}
                cardExpiryInputProps={{
                  onBlur: (e) => console.log("expiry blur", e),
                  onChange: (e) =>
                    setCardData({
                      ...cardData,
                      expiration_date: e.target.value,
                    }),
                  onError: (err) => console.log(`expiry error: ${err}`),
                }}
                cardNumberInputProps={{
                  onBlur: (e) => console.log("number blur", e),
                  onChange: (e) =>
                    setCardData({ ...cardData, card_number: e.target.value }),
                  onError: (err) => console.log(`number error: ${err}`),
                }}
              />
            </div>
          </div>
          <div
            className="bg-secondary rounded px-3 py-2 my-2"
            style={{ color: "white" }}
          >
            Your Billing Information
          </div>
          <div className="row mt-3 gx-3">
            <div className="col-md-4 col-sm-6">
              <InputField
                name="firstname"
                placeholder="Your First Name"
                // label="First Name"
                control={control}
                errors={errors}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <InputField
                name="lastname"
                placeholder="Last Name"
                // label="Last Name"
                control={control}
                errors={errors}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <InputField
                name="address"
                placeholder="Address"
                // label="Address"
                control={control}
                errors={errors}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <InputField
                name="city"
                placeholder="City"
                // label="City"
                control={control}
                errors={errors}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <InputField
                name="state"
                placeholder="State"
                // label="State"
                control={control}
                errors={errors}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <InputField
                name="zip_code"
                placeholder="ZIP/Postal Code"
                // label="Zip/Postal Code"
                control={control}
                errors={errors}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <InputField
                name="country"
                placeholder="Country"
                // label="Country"
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Save Information
          </button>
        </form>
        {/* <form>
          <div className="row gx-3">
            <div className="col-sm-12">
              <div className="form-check form-check-lg">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customChecks1"
                />
                <label className="form-check-label mt-0" for="customChecks1">
                  let others find me by email address
                </label>
                <small className="form-text text-muted d-block">
                  People who have your email address will be able to connect you
                  by Jampack
                </small>
              </div>
              <div className="separator"></div>
              <div className="form-check form-check-lg">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customChecks2"
                />
                <label className="form-check-label mt-0" for="customChecks2">
                  Keep my phone number private
                </label>
                <small className="form-text text-muted d-block">
                  No one can find you by your phone number. Your phone number
                  will not be shared with your contact anymore.
                </small>
              </div>
              <div className="separator"></div>
              <div className="form-check form-check-lg">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customChecks3"
                />
                <label className="form-check-label mt-0" for="customChecks3">
                  All Keep my location sharing on
                </label>
                <small className="form-text text-muted d-block">
                  Jmapack webapp shares your location wherever you go
                </small>
              </div>
              <div className="separator"></div>
              <div className="form-check form-check-lg">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customChecks4"
                />
                <label className="form-check-label mt-0" for="customChecks4">
                  Share data through select partnerships
                </label>
                <small className="form-text text-muted d-block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque condimentum mauris volutpat enim ornare iaculis.
                  Curabitur euismod rutrum lorem id lobortis. Cras ut ex dui.
                  Nulla sed blandit tortor. In quam diam, efficitur sit amet
                  pulvinar eget, consequat placerat arcu.
                </small>
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary mt-5">
            Save Changes
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default CardInformation;
