import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/FormFields/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  ForgotPassword,
  loginUser,
  verifyEmail,
} from "../../redux/services/auth";
import logo from "./../../assets/3.png";
import CountdownTimer from "../../components/Countdown/Countdown";
const VerifyEmailOtp = () => {
  const [showCountdown, setShowCountdown] = useState(true);
  const navigate = useNavigate();
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { email } = useParams();
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.verified === 1) {
      navigate(`/reset_password/${email}`); // Navigate on successful verification
    }
  }, [navigate, user, email]);
  const otpVerificationHandler = async (data) => {
    const formData = {
      email: email,
      otp: data?.otp,
      // password: user.password,
    };
    const verificationSuccess = await dispatch(verifyEmail(formData));
    if (verificationSuccess?.verified === 1) {
      reset();
      // navigate(`/reset_password/${email}`);
      window.location.href = `https://app.desktopcrm.com/reset_password/${email}`;
    }
  };
  const handleResendOTP = () => {
    setShowCountdown(true);

    const data = {
      email: email,
    };
    return dispatch(ForgotPassword(data));
  };

  return (
    <div>
      <div>
        {/* <!-- Wrapper --> */}
        <div class="hk-wrapper hk-pg-auth">
          {/* <!-- Main Content --> */}
          <div class="hk-pg-wrapper pt-0 pb-xl-0 pb-5">
            <div class="hk-pg-body pt-0 pb-xl-0">
              {/* <!-- Container --> */}
              <div class="container-xxl">
                {/* <!-- Row --> */}
                <div class="row">
                  <div class="col-sm-10 position-relative mx-auto">
                    <div class="auth-content py-8">
                      <form
                        class="w-100"
                        onSubmit={handleSubmit(otpVerificationHandler)}
                      >
                        <div class="row">
                          <div class="col-lg-5 col-md-7 col-sm-10 mx-auto">
                            <div className="menu-header text-center">
                              <div className="d-flex justify-content-center pb-3">
                                <img
                                  className=""
                                  src={logo}
                                  width={300}
                                  alt="brand"
                                />
                              </div>
                            </div>

                            <div class="card card-flush">
                              <div class="card-body text-center">
                                <h4>Verify your OTP</h4>
                                <p class="mb-4">
                                  We've mailed 6 digits OTP to your email
                                  address.
                                </p>
                                <div>
                                  {showCountdown ? (
                                    <CountdownTimer
                                      startCount={90}
                                      onCountdownEnd={() =>
                                        setShowCountdown(false)
                                      }
                                    />
                                  ) : (
                                    <button
                                      type="button"
                                      className="float-end btn btn-light btn-xs"
                                      onClick={handleResendOTP}
                                    >
                                      Resend OTP
                                    </button>
                                  )}

                                  <div>
                                    <InputField
                                      name="otp"
                                      placeholder="6 digits otp"
                                      label="OTP"
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
                                <button
                                  type="submit"
                                  class="btn btn-primary btn-uppercase btn-block"
                                >
                                  Verify
                                </button>
                                <p class="p-xs mt-2 text-center">
                                  <Link to="/sign-in">
                                    <u>Back to login!</u>
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailOtp;
