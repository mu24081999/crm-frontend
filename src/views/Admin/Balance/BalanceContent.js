import React, { useContext, useEffect, useState } from "react";
import Payment from "../../../components/PaymentCard/Payment";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAllPayments,
  paymentIntent,
} from "../../../redux/services/payment";
import { toast } from "react-toastify";
import { FiDollarSign } from "react-icons/fi";
import { addBalanceRec, getBalance } from "../../../redux/services/balance";
import moment from "moment/moment";
import { SocketContext } from "../../../Context";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import InputField from "../../../components/FormFields/InputField";
import { useForm } from "react-hook-form";
const BalanceContent = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { pushNotification } = useContext(SocketContext);
  const { user, token } = useSelector((state) => state.auth);
  const { balanceDetails } = useSelector((state) => state.balance);
  const { payments } = useSelector((state) => state.payment);
  const [amount, setAmount] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBalance(token));
    dispatch(getUserAllPayments(token));
  }, [token, dispatch]);
  const afterPayment = async () => {
    const formData = {
      user_id: user.id,
      credit: amount * 100,
    };
    const is_added = await dispatch(addBalanceRec(token, formData));
    if (is_added === true) {
      const data = {
        user_id: user.id,
        notification: `Your account balance has been credited with amount $${amount}`,
        type: "balance_credit",
      };
      pushNotification(data);
    }
  };
  const onAddClick = () => {
    dispatch(
      paymentIntent(token, {
        currency: "usd",
        amount: amount * 100,
        // amount: amount_value ? amount_value.getAttribute("data-amount") : "",
      })
    );
  };
  const handleAsignBalance = (data) => {};

  return (
    <>
      <div className="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div className="hk-pg-body py-0">
          <div className="contactapp-wrap">
            <div className="contactapp-content">
              <div className="d-flex border w-100 justify-content-center">
                <div className="w-50 m-5">
                  <div
                    className="card shadow-lg border-primary"
                    style={{ height: "max-content" }}
                  >
                    <div
                      className="m-5"
                      style={{
                        // fontFamily: "monospace",
                        fontSize: "25px",
                        // color: "white",
                        fontWeight: "bolder",
                      }}
                    >
                      <div className="">
                        <div className="float-start mt-2 me-5">
                          <div class="lh-1 text-white bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
                            <FiDollarSign size={25} />
                          </div>{" "}
                        </div>
                        <p className="fw-bolder">Available Credit </p>
                        <span>
                          $
                          {balanceDetails?.credit > 0
                            ? balanceDetails?.credit / 100
                            : 0}
                        </span>
                      </div>
                      <div className=" d-flex gap-1 justify-content-end">
                        <div className="form-group col-2 pt-1 d-flex">
                          <span>$</span>
                          <input
                            type="number"
                            className="form-control p-1 px-2 "
                            placeholder="Amount"
                            required={true}
                            min={10}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        {amount < 10 ? (
                          <div>
                            <button
                              className="btn btn-primary btn-sm "
                              style={{ paddingInline: "10px" }}
                              onClick={() =>
                                toast.error(
                                  "Please enter credit greater than 10."
                                )
                              }
                            >
                              Add Credit
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#add_payment_form"
                              className="btn btn-primary btn-sm "
                              style={{ paddingInline: "10px" }}
                              onClick={onAddClick}
                            >
                              Add Credit
                            </button>
                          </div>
                        )}
                      </div>
                      <form
                        onSubmit={handleSubmit(handleAsignBalance)}
                        className="border border-primary rounded card-body"
                      >
                        <div className="d-flex gap-3">
                          <div className="col-md-6 col-sm-6">
                            <ReactSelectField
                              name="board_id"
                              placeholder="Asign To"
                              mb={true}
                              control={control}
                              rules={{
                                required: {
                                  value: true,
                                  message: "Field required!",
                                },
                              }}
                              options={[]}
                              errors={errors}
                            />
                          </div>
                          <div className="col-md-5 col-sm-6 pt-1">
                            <InputField
                              name="board_id"
                              type="number"
                              placeholder="Credit Amount"
                              mb={true}
                              control={control}
                              rules={{
                                required: {
                                  value: true,
                                  message: "Field required!",
                                },
                              }}
                              errors={errors}
                            />
                          </div>
                        </div>
                        <div>
                          <button className="btn btn-primary mt-3">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className=" p-0" style={{ height: "100%" }}>
                    <div className="card" style={{ height: "55%" }}>
                      <div className="card-header bg-primary">
                        <div className="card-title text-white fw-bolder">
                          Balance Logs
                        </div>
                      </div>
                      <div
                        className="card-body"
                        style={{
                          height: "480px",
                          overflow: "scroll",
                          scrollBehavior: "smooth",
                        }}
                      >
                        <table class="table table-hover">
                          <thead>
                            <tr className="sticky-top rounded">
                              <th scope="col">#</th>
                              <th scope="col">Description</th>
                              <th scope="col">Amount Payed</th>
                              <th scope="col">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments?.length > 0 ? (
                              payments?.map((payment, index) => (
                                <tr key={index}>
                                  <th scope="row">{index}</th>
                                  <td>{payment?.description}</td>
                                  <td>{payment?.amount / 100}</td>
                                  <td>
                                    {moment(payment?.created_at).format(
                                      "DD MMM,YYYY"
                                    )}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <p>No Record</p>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Payment
            // route="/kyc-form"
            afterPayment={afterPayment}
            description="Credit added"
          />
        </div>
      </div>
    </>
  );
};

export default BalanceContent;
