import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { SocketContext } from "../../../Context";
import TextAreaField from "../../../components/FormFields/textAreaField";
import { sendSMSBulk } from "../../../redux/services/calling";

export const SmsBulk = ({ dispatch, token, authUser }) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { contactsToModify } = useContext(SocketContext);
  const textWatcher = watch("sms_body");
  useEffect(() => {
    if (textWatcher !== undefined && contactsToModify?.length > 0) {
    }
  }, [textWatcher, contactsToModify]);

  const handleEditBulk = (data) => {
    const messageData = {
      from: {
        phone: authUser.phone,
        name: authUser.name,
        avatar: authUser.avatar,
        socket_id: authUser.socket_id,
        accountSid: authUser?.accountSid,
        authToken: authUser?.authToken,
      },
      to: contactsToModify,
      message: data?.sms_body,
    };
    dispatch(sendSMSBulk(token, messageData));
  };

  return (
    <div>
      {contactsToModify?.length > 0 ? (
        <form onSubmit={handleSubmit(handleEditBulk)}>
          <div className="alert alert-primary">Send SMS Bulk</div>
          <div className="col">
            <TextAreaField
              name="sms_body"
              placeholder="SMS body"
              control={control}
              errors={errors}
              rows="5"
            />
          </div>
          <div className="modal-footer align-items-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Discard
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="alert alert-warning">
          Please select at least one contact.
        </div>
      )}
    </div>
  );
};
