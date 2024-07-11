import React, { useEffect, useMemo, useState } from "react";
import ReactSelectField from "../../components/FormFields/reactSelectField";
import { useForm } from "react-hook-form";
import Checkbox from "../../components/FormFields/checkboxField";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/services/users";
import _ from "lodash";
import {
  getUserPermissionDetails,
  storePermissions,
} from "../../redux/services/permissions";
import Loader from "../../components/Loader/Loader";
const PermissionContent = () => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { isLoading, permissionDetails } = useSelector(
    (state) => state.permission
  );
  const { users } = useSelector((state) => state.user);
  const [subaccounts, setSubaccounts] = useState([]);
  const subaccountWatcher = watch("subaccount");
  console.log("🚀 ~ PermissionContent ~ permissionDetails:", permissionDetails);
  useEffect(() => {
    if (subaccountWatcher !== undefined) {
      dispatch(getUserPermissionDetails(token, subaccountWatcher?.value));
    }
  }, [subaccountWatcher, dispatch, token]);
  useEffect(() => {
    if (permissionDetails) {
      setValue("dashboard", permissionDetails?.dashboard === 1 ? true : false);
      setValue("chat", permissionDetails?.chat === 1 ? true : false);
      setValue(
        "phone_numbers",
        permissionDetails?.phone_numbers === 1 ? true : false
      );
      setValue(
        "group_chat",
        permissionDetails?.group_chat === 1 ? true : false
      );
      setValue("call", permissionDetails?.call === 1 ? true : false);
      setValue("sms", permissionDetails?.sms === 1 ? true : false);
      setValue("email", permissionDetails?.email === 1 ? true : false);
      setValue(
        "bulk_emails",
        permissionDetails?.bulk_emails === 1 ? true : false
      );
      setValue("bulk_sms", permissionDetails?.bulk_sms === 1 ? true : false);
      setValue("sms_logs", permissionDetails?.sms_logs === 1 ? true : false);
      setValue("calendar", permissionDetails?.calendar === 1 ? true : false);
      setValue("todos", permissionDetails?.todos === 1 ? true : false);
      setValue("wallet", permissionDetails?.wallet === 1 ? true : false);
      setValue(
        "leads_pipeline",
        permissionDetails?.leads_pipeline === 1 ? true : false
      );
      setValue("agents", permissionDetails?.agents === 1 ? true : false);
      setValue(
        "call_recordings",
        permissionDetails?.call_recordings === 1 ? true : false
      );
      setValue(
        "file_manager",
        permissionDetails?.file_manager === 1 ? true : false
      );
      setValue("contacts", permissionDetails?.contacts === 1 ? true : false);
    }
  }, [permissionDetails, setValue]);
  useEffect(() => {
    dispatch(getUsers(token));
    dispatch(getUsers(token));
  }, [dispatch, token]);
  useEffect(() => {
    if (users?.length > 0) {
      const data = users?.filter(
        (usr) => _.toInteger(usr.parent_id) === user.id
      );
      setSubaccounts(data);
    }
  }, [users, user]);
  const handlePermission = (data) => {
    const formData = {
      ...data,
      user_id: user.id,
      user_role: user.role,
      subaccount_id: data.subaccount.value,
      subaccount_role: data.subaccount.role,
    };
    dispatch(storePermissions(token, formData));
    console.log("🚀 ~ handlePermission ~ data:", formData);
  };
  return (
    <div>
      <div className="hk-pg-wrapper">
        <div className="container-xxl">
          <div className="hk-pg-header pt-7 pb-4">
            <h1 className="pg-title">Permissions</h1>
          </div>
          <div className="hk-pg-body">
            <div className="row edit-profile-wrap">
              <form onSubmit={handleSubmit(handlePermission)}>
                <div className="col-md-6 col-sm-6">
                  <ReactSelectField
                    control={control}
                    errors={errors}
                    options={
                      subaccounts?.length > 0
                        ? subaccounts?.map((account, index) => {
                            return {
                              ...account,
                              label: account?.name,
                              value: account?.id,
                            };
                          })
                        : []
                    }
                    name="subaccount"
                    placeholder={"Select Account"}
                    label="Account"
                  />
                </div>
                <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                  <span>Permissions</span>
                </div>
                <div
                  className=" py-3 d-flex flex-column flex-wrap gap-5"
                  style={{ height: "350px", paddingInline: "5%" }}
                >
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="dashboard"
                      label="Dashboard"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="wallet"
                      label="Wallet"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="phone_numbers"
                      label="Phone Numbers"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="call"
                      label="Calls"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="sms"
                      label="SMS"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="bulk_sms"
                      label="Bulk SMS"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      options={[]}
                      name="sms_logs"
                      label="SMS Logs"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      options={[]}
                      name="email"
                      label="Email"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      options={[]}
                      name="bulk_emails"
                      label="Bulk Email"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="chat"
                      label="Simple Chat"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="group_chat"
                      label="Group Chat"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="leads_pipeline"
                      label="Leads Pipeline"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="contacts"
                      label="Contacts"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="file_manager"
                      label="File Manager"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="agents"
                      label="Agents"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="call_recordings"
                      label="Call History and Recordings"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="calendar"
                      label="Calendar"
                    />
                  </div>
                  <div>
                    <Checkbox
                      control={control}
                      errors={errors}
                      name="todos"
                      label="Todos"
                    />
                  </div>
                </div>
                <div className="w-100">
                  <button
                    className="btn btn-primary float-end"
                    style={{ marginRight: "20%", marginTop: "5%" }}
                  >
                    {isLoading ? <Loader /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionContent;
