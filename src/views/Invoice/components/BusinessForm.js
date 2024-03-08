import React from "react";
import InputField from "../../../components/FormFields/InputField";
import { useForm } from "react-hook-form";

const BusinessForm = ({ onDataFromChild }) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const handleAddBusinessForm = (data) => {
    onDataFromChild(data);
    return {};
  };
  return (
    <div
      id="edit_info"
      className="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="mb-5">Edit Info</h5>
            <form
              name="business_form"
              onSubmit={handleSubmit(handleAddBusinessForm)}
            >
              <InputField
                name="company_name"
                placeholder="Company name"
                label="Company Name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
                errors={errors}
              />
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                label="Email Address"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
                errors={errors}
              />
              <InputField
                name="address_line_1"
                placeholder="Address line 1"
                label="Address line 1"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
                errors={errors}
              />
              <InputField
                name="address_line_2"
                placeholder="Address Line 2"
                label="Address Line 2"
                control={control}
                errors={errors}
              />

              <div className="modal-footer align-items-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Discard
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessForm;
