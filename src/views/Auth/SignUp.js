import React, { useEffect, useState } from "react";
import brand from "../../assets/logo-light.png";
import InputField from "../../components/FormFields/InputField";
import { useForm } from "react-hook-form";
import Checkbox from "../../components/FormFields/checkboxField";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/services/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/3.png";
import Loader from "../../components/Loader/Loader";

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
    };
    setUserEmail(data?.email);

    dispatch(registerUser(formData));
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
                                      placeholder="Enter your name"
                                      label="Full Name"
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
                                      placeholder="Enter username or email"
                                      label="User Name"
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
                                      placeholder="Enter your email id"
                                      label="Email"
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
                                      placeholder="6+ characters"
                                      label="Password"
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
