import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../Context";
import { updateBulkContactRec } from "../../../redux/services/contact";

export const EditBulkContact = ({ token, dispatch, boards }) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { contactsToModify } = useContext(SocketContext);
  const [modifiedContacts, setModifiedContacts] = useState([]);
  const pipelineWatcher = watch("pipeline");
  useEffect(() => {
    if (pipelineWatcher !== undefined && contactsToModify?.length > 0) {
      const modifiedArray = [];
      contactsToModify?.map((contact) => {
        return modifiedArray?.push({
          ...contact,
          board_id: pipelineWatcher?.value,
        });
      });
      console.log(modifiedArray);
      setModifiedContacts(modifiedArray);
    }
  }, [pipelineWatcher, contactsToModify]);

  const handleEditBulk = (data) => {
    const formData = {
      updates: modifiedContacts,
      modify_key: "board_id",
    };
    dispatch(updateBulkContactRec(token, formData));
  };

  return (
    <div>
      {contactsToModify?.length > 0 ? (
        <form onSubmit={handleSubmit(handleEditBulk)}>
          <div className="alert alert-primary">Add To Pipeline</div>
          <div className="col">
            <ReactSelectField
              name="pipeline"
              placeholder="Select pipeline "
              label="Pipeline"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
              options={
                boards?.length > 0
                  ? boards?.map((board) => {
                      return { label: board?.name, value: board?.id };
                    })
                  : []
              }
              errors={errors}
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
