import React from "react";
import ReactSelectField from "../../components/FormFields/reactSelectField";
import { useForm } from "react-hook-form";
import Checkbox from "../../components/FormFields/checkboxField";

const PermissionContent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <div className="hk-pg-wrapper">
        <div className="container-xxl">
          <div className="hk-pg-header pt-7 pb-4">
            <h1 className="pg-title">Permissions</h1>
          </div>
          <div className="hk-pg-body">
            <div className="row edit-profile-wrap">
              <div className="col-md-6 col-sm-6">
                <ReactSelectField
                  control={control}
                  errors={errors}
                  options={[]}
                  name="user"
                  placeholder={"Select Account"}
                  label="Account"
                />
              </div>
              <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                <span>Permissions</span>
              </div>
              <div
                className=" py-3 d-flex flex-column flex-wrap"
                style={{ height: "250px", paddingInline: "5%" }}
              >
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Phone Numbers"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Calls"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="SMS"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Email"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Simple Chat"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Group Chat"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Leads Pipeline"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Contacts"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="File Manager"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Agents"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Call Recordings"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Blogs"
                  />
                </div>
                <div>
                  <Checkbox
                    control={control}
                    errors={errors}
                    options={[]}
                    name="user"
                    label="Todos"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionContent;
