import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/FormFields/InputField";
import TextAreaField from "../../components/FormFields/textAreaField";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { storeTicket } from "../../redux/services/ticket";

const Ticket = () => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch({});
  const { token, user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.ticket);
  const addTicket = (data) => {
    const formData = {
      ...data,
      user_id: user.id,
      user_name: user.name,
      user_email: user.email,
    };
    dispatch(storeTicket(token, formData));
  };
  return (
    <div>
      {" "}
      <div
        class="modal fade"
        id="submitTicket"
        tabindex="-1"
        role="dialog"
        aria-labelledby="submitTicket"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form onSubmit={handleSubmit(addTicket)}>
              <div class="modal-header bg-primary ">
                <h5
                  class="modal-title fs-6 fw-bold "
                  style={{ color: "white" }}
                >
                  Submit Ticket
                </h5>
                <button
                  type="button"
                  class="btn-close btn-light"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <div class="modal-body row">
                  <div className="col-md-12 col-sm-6">
                    <InputField
                      control={control}
                      errors={errors}
                      name="subject"
                      mb="true"
                      placeholder="Subject"
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                    />
                  </div>

                  <div className="col-md-12 col-sm-6">
                    <TextAreaField
                      control={control}
                      errors={errors}
                      name="problem"
                      rows={5}
                      placeholder="Describe problem you are facing."
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
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

export default Ticket;
