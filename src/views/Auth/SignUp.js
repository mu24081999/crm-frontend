import React, { useEffect, useState } from "react";
import brand from "../../assets/logo-light.png";
import InputField from "../../components/FormFields/InputField";
import { useForm } from "react-hook-form";
import Checkbox from "../../components/FormFields/checkboxField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../redux/services/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/3.png";
import Loader from "../../components/Loader/Loader";
import GoogleLoginButton from "../../components/Auth/GoogleAuth";
import ReactSelectField from "../../components/FormFields/reactSelectField";
import countryList from "react-select-country-list";

const SignUp = () => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [userEmail, setUserEmail] = useState(null);
  const redirectTo = useNavigate();
  const dispatch = useDispatch();
  const handleSingUp = (data) => {
    const formData = {
      ...data,
      role: "USER",
      country: data?.country?.value,
    };
    setUserEmail(data?.email);

    dispatch(registerUser(formData));
  };
  const handleSuccess = (response) => {
    // Handle successful sign-in
    dispatch(
      loginUser(response.email, "1234567890", false, "google", response)
    );
    console.log("Logged in successfully!", response);
  };
  const handleFailure = (error) => {
    // Handle sign-in failure
    console.error("Login failed:", error);
  };
  useEffect(() => {
    switch (isAuthenticated) {
      case true:
        return redirectTo(`/email-verification/${userEmail}`);
      default:
        break;
    }
  }, [redirectTo, isAuthenticated, userEmail]);
  return (
    <div>
      {/* <!-- Wrapper --> */}
      <div class="hk-wrapper hk-pg-auth" data-footer="simple">
        {/* <!-- Main Content --> */}
        <div class="hk-pg-wrapper pt-0 pb-xl-0 pb-5">
          <div class="hk-pg-body pt-0 pb-xl-0">
            {/* <!-- Container --> */}
            <div class="container-xxl">
              {/* <!-- Row --> */}
              <div class="row">
                <div class="col-sm-10 position-relative mx-auto">
                  <div class="auth-content py-8">
                    <form class="w-100" onSubmit={handleSubmit(handleSingUp)}>
                      <div class="row">
                        <div class="col-xxl-5 col-xl-7 col-lg-8 col-sm-10 mx-auto">
                          <div class="card card-border">
                            <div class="card-body">
                              <div className="d-flex justify-content-center pb-2">
                                <img
                                  className=" "
                                  src={logo}
                                  width={300}
                                  alt="brand"
                                />
                              </div>
                              <h4 class="text-center mb-0">
                                Sign Up to Desktopcrm
                              </h4>
                              <p class="p-xs mt-2 mb-4 text-center">
                                Already a member ?{" "}
                                <Link to="/sign-in">
                                  <u>Sign In</u>
                                </Link>
                              </p>
                              {isLoading === true ? (
                                <Loader />
                              ) : (
                                <div class="row gx-3">
                                  <div className="col-lg-6">
                                    <InputField
                                      name="name"
                                      placeholder="Your Full Name"
                                      // label="Full Name"
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
                                  <div className="col-lg-6">
                                    <InputField
                                      name="username"
                                      placeholder="Username"
                                      // label="User Name"
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
                                  <div className="col-lg-12">
                                    <InputField
                                      name="email"
                                      type="email"
                                      placeholder="Email Address"
                                      // label="Email"
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
                                  <div className="col-lg-12">
                                    <InputField
                                      name="password"
                                      type="password"
                                      placeholder="Password containing 8+ characters"
                                      // label="Password"
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
                                  {/* <div className="col-md-12 col-sm-6">
                                    <ReactSelectField
                                      name="country"
                                      placeholder="Select Country"
                                      // label="Country"
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
                                  </div> */}
                                  <div className="col-lg-12 col-sm-6">
                                    <InputField
                                      name="personal_phone"
                                      type="string"
                                      placeholder="Phone Number eg: '+14849993639'"
                                      // label="Phone Number"
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
                                  {/* 
                                  <div className="col-lg-6">
                                    <InputField
                                      name="state"
                                      placeholder="State eg: CA"
                                      // label="State"
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
                                  <div className="col-lg-6">
                                    <InputField
                                      name="city"
                                      placeholder="Enter your city"
                                      // label="City"
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
                                  <div className="col-lg-6">
                                    <InputField
                                      name="postal_code"
                                      placeholder="Postal Code"
                                      // label="Postal Code"
                                      control={control}
                                      rules={{
                                        required: {
                                          value: true,
                                          message: "Field required!",
                                        },
                                      }}
                                      errors={errors}
                                    />
                                  </div> */}
                                  <div className="col-lg-12 col-sm-6">
                                    <InputField
                                      name="location"
                                      placeholder="Address eg: LA, street 2, apt # 45434"
                                      // label="Address"
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
                              )}

                              <button
                                type="submit"
                                class="btn btn-primary btn-rounded btn-uppercase btn-block"
                              >
                                Create account
                              </button>
                              <div className="text-center py-2">OR</div>
                              <div className="d-flex justify-content-center">
                                <GoogleLoginButton
                                  onSuccess={handleSuccess}
                                  onFailure={handleFailure}
                                  text={"signup_with"}
                                  auto_select={false}
                                  useOneTap={false}
                                />
                              </div>
                              {/* <p class="p-xs mt-2 text-center">
                                <Link to="/sign-in">
                                  <u>Already have an account!</u>
                                </Link>
                              </p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- /Row --> */}
            </div>
            {/* <!-- /Container --> */}
          </div>
          {/* <!-- /Page Body --> */}

          {/* <!-- Page Footer --> */}
          {/* <div class="hk-footer border-0">
            <footer class="container-xxl footer">
              <div class="row">
                <div class="col-xl-8 text-center">
                  <p class="footer-text pb-0">
                    <span class="copy-text">
                      Jampack © 2023 All rights reserved.
                    </span>{" "}
                    <a href="/" class="" target="_blank">
                      Privacy Policy
                    </a>
                    <span class="footer-link-sep">|</span>
                    <a href="/" class="" target="_blank">
                      T&C
                    </a>
                    <span class="footer-link-sep">|</span>
                    <a href="/" class="" target="_blank">
                      System Status
                    </a>
                  </p>
                </div>
              </div>
            </footer>
          </div> */}
          {/* <!-- / Page Footer --> */}
        </div>
        {/* <!-- /Main Content --> */}
      </div>
      {/* <!-- /Wrapper --> */}
    </div>
  );
};

export default SignUp;
