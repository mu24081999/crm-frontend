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

const CardInformation = () => {
  const { token } = useSelector((state) => state.auth);
  const { cards } = useSelector((state) => state.card);
  console.log("🚀 ~ CardInformation ~ cards:", cards);
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
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
    dispatch(storeCard(token, cardData));
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
              <div className="card rounded shadow-lg col-md-3 col-sm-6 my-5">
                <div className="card-header">
                  <div className="card-title">{card?.cardholder_name}</div>
                </div>
                <div className="card-body">
                  <p>
                    <span>
                      <FaRegCreditCard size={25} />
                    </span>
                    <span className="fw-bold"> {card?.card_number}</span>
                  </p>
                  <p className="my-1">
                    <span>
                      <FaRegCalendarAlt size={25} />
                    </span>
                    <span className="fw-bold"> {card?.expiration_date}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
        <form onSubmit={handleSubmit(handleAddCard)}>
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
