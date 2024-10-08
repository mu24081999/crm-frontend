import React, { useEffect } from "react";
// import FormRender from "../../components/FormRender";
import InputField from "../../components/FormFields/InputField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/services/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/3.png";
import Loader from "../../components/Loader/Loader";
import GoogleLoginButton from "../../components/Auth/GoogleAuth";

const SignIn = () => {
  const dispatch = useDispatch();
  const redirectTo = useNavigate();
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );
  const handleSuccess = (response) => {
    // Handle successful sign-in
    dispatch(
      loginUser(response.email, "1234567890", false, "google", response)
    );
  };

  const handleFailure = (error) => {
    // Handle sign-in failure
    console.error("Login failed:", error);
  };
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (isAuthenticated && user?.verified === 1) {
      redirectTo("/");
    }
  }, [isAuthenticated, redirectTo, user]);
  const signInHandler = async (data) => {
    const logged_user = await dispatch(
      loginUser(data?.username, data?.password)
    );
    if (logged_user) {
      console.log("🚀 ~ signInHandler ~ logged_user:", logged_user);
      // redirectTo(`/email-verification/${logged_user.email}`);
      window.location.href = `https://app.desktopcrm.com/two-fa-verification/${logged_user.email}`;
    }
  };
  // const formConfig = [
  //   { name: "firstName", label: "First Name", initialValue: "" },
  //   { name: "lastName", label: "Last Name", initialValue: "" },
  //   { name: "email", label: "Email", type: "email", initialValue: "" },
  // ];

  return (
    <div>
      {/* <!-- Wrapper --> */}
      <div className="hk-wrapper hk-pg-auth" data-footer="simple">
        {/* <!-- Main Content --> */}
        <div className="hk-pg-wrapper pt-0 pb-xl-0 pb-5">
          <div className="hk-pg-body pt-0 pb-xl-0">
            {/* <!-- Container --> */}
            <div className="container-xxl">
              {/* <!-- Row --> */}
              <div className="row">
                <div className="col-sm-10 position-relative mx-auto">
                  <div className="auth-content py-8">
                    <form
                      className="w-100"
                      onSubmit={handleSubmit(signInHandler)}
                    >
                      <div className="row">
                        <div className="col-lg-5 col-md-7 col-sm-10 mx-auto">
                          {/* <div className="text-center mb-7">
                            <Link className="navbar-brand me-0" to="/">
                              <img
                                className="brand-img d-inline-block"
                                src={brand}
                                alt="brand"
                              />
                            </Link>
                          </div> */}

                          <div className="card card-lg card-border">
                            <div className="card-body">
                              <div className="d-flex justify-content-center pb-2">
                                <img
                                  className=" "
                                  src={logo}
                                  width={300}
                                  alt="brand"
                                />
                              </div>
                              <h4 className="mb-4 text-center">
                                Sign in to your account
                              </h4>

                              {isLoading === true ? (
                                <Loader />
                              ) : (
                                <div>
                                  <div className="row gx-3">
                                    <div>
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
                                    <div className="">
                                      <div className="float-end">
                                        <Link
                                          to="/reset-password"
                                          className="fs-7 fw-medium"
                                        >
                                          Forgot Password ?
                                        </Link>
                                      </div>
                                      <InputField
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
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
                                </div>
                              )}
                              <input
                                type="submit"
                                className="btn btn-primary btn-uppercase btn-block bg-primary"
                                value="Login"
                              />
                              <div className="text-center py-2">OR</div>
                              <div className="d-flex justify-content-center">
                                <GoogleLoginButton
                                  onSuccess={handleSuccess}
                                  onFailure={handleFailure}
                                  text={"signin_with"}
                                  auto_select={true}
                                  useOneTap={true}
                                />
                              </div>
                              {/* <div className="d-flex justify-content-center">
                                <a
                                  href="https://desktopcrm.com:51/v1/auth/google"
                                  className="btn btn-outline-primary  btn-block"
                                >
                                  <FaGoogle
                                    style={{
                                      marginTop: "-1%",
                                      marginInline: "2%",
                                    }}
                                  />
                                  Login with Google
                                </a>
                              </div> */}
                              <p className="p-xs mt-2 text-center">
                                New to DesktopCRM?{" "}
                                <Link to="/sign-up">
                                  <u>Create new account</u>
                                </Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* <FormRender formConfig={formConfig} /> */}
                  </div>
                </div>
              </div>
              {/* <!-- /Row --> */}
            </div>
            {/* <!-- /Container --> */}
          </div>
          {/* <!-- /Page Body --> */}

          {/* <!-- Page Footer --> */}
          {/* <div className="hk-footer border-0">
            <footer className="container-xxl footer">
              <div className="row">
                <div className="col-xl-8 text-center">
                  <p className="footer-text pb-0">
                    <span className="copy-text">
                      Jampack © 2023 All rights reserved.
                    </span>{" "}
                    <a href="/" className="" target="_blank">
                      Privacy Policy
                    </a>
                    <span className="footer-link-sep">|</span>
                    <a href="/" className="" target="_blank">
                      T&C
                    </a>
                    <span className="footer-link-sep">|</span>
                    <a href="/" className="" target="_blank">
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

export default SignIn;
