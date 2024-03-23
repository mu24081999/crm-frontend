import React, { useEffect } from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import ChatPopup from "../../components/ChatPopup/ChatPopup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/FormFields/InputField";
import { useForm } from "react-hook-form";
import {
  createSubAccount,
  getUserSubAccountsList,
} from "../../redux/services/calling";
import Loader from "../../components/Loader/Loader";
// import Dialer from "../../components/PhoneDialer/Dialer";
const Layout = ({ component }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { isLoading, subAccounts } = useSelector((state) => state.calling);
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const redirectTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSubAccountsList(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (!isAuthenticated) {
      redirectTo("/sign-in");
    }
  }, [isAuthenticated, redirectTo]);
  const addSubAccount = (data) => {
    console.log(data);
    dispatch(createSubAccount(token, data));
  };
  return (
    <div
      class="hk-wrapper"
      data-layout="vertical"
      data-layout-style="collapsed"
      data-menu="light"
      data-footer="simple"
      data-hover="active"
    >
      <TopNavbar subAccounts={subAccounts} />
      <VerticalNavbar />
      <div id="hk_menu_backdrop" className="hk-menu-backdrop"></div>
      {/* <button
        type="button"
        class="btn btn-primary btn-rounded btn-block mb-4 show-compose-popup"
        id="show_compose_popup"
      >
        Compose email
      </button> */}
      <ChatPopup />
      {component}

      <div
        class="modal fade"
        id="addAccountModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addAccountModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form onSubmit={handleSubmit(addSubAccount)}>
              <div class="modal-header">
                <h5 class="modal-title">Add New Account</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <div class="modal-body">
                  <div>
                    <InputField
                      control={control}
                      errors={errors}
                      name="account_name"
                      placeholder="Account Name"
                      label="Account Name"
                    />
                  </div>
                  <div>
                    <InputField
                      control={control}
                      errors={errors}
                      name="name"
                      placeholder="Name"
                      label="Name"
                    />
                  </div>
                  <div>
                    <InputField
                      control={control}
                      errors={errors}
                      name="username"
                      placeholder="Username"
                      label="Username"
                    />
                  </div>
                  <div>
                    <InputField
                      control={control}
                      type="email"
                      errors={errors}
                      name="email"
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  <div>
                    <InputField
                      type="password"
                      control={control}
                      errors={errors}
                      name="password"
                      placeholder="Password"
                      label="Password"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
