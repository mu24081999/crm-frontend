import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { SocketContext } from "../../../Context";
import {
  addBulkContact,
  updateBulkContactRec,
} from "../../../redux/services/contact";
import { toast } from "react-toastify";
import Papa from "papaparse";

export const UploadCSVContact = ({ token, dispatch, authUser }) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { contactsToModify } = useContext(SocketContext);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const handleUploadCSV = () => {
    if (data?.length > 0) {
      dispatch(
        addBulkContact(token, { contactsArray: data, user_id: authUser.id })
      );
    } else {
      return toast.error("There is no contacts in the list.");
    }
  };
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file.type !== "text/csv") {
      return toast.error("Please select a CSV file.");
    }
    setFile(file);
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("🚀 ~ handleFileChange ~ results:", results.data.length);
        if (results.data.length > 100) {
          setData(results.data.slice(0, 100));
        } else {
          setData(results.data);
        }
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleUploadCSV)}>
        <div className="alert alert-primary text-center">
          Upload CSV file of contacts
        </div>
        <div className="m-5">
          <div class="mb-4 d-flex justify-content-center p-5 border border-primary border-2 rounded-5">
            <div className="text-center">
              {file !== null ? (
                <p>{file.name}</p>
              ) : (
                <img
                  id="selectedImage"
                  src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118928_960_720.png"
                  alt="example placeholder"
                  style={{ width: "50px" }}
                />
              )}
              <br />
              <br />
              <span>Upload CSV file</span>
            </div>
          </div>
          <div
            class="d-flex justify-content-center"
            style={{ marginTop: "-20%" }}
          >
            <div
              class="btn btn-primary btn-rounded "
              style={{ cursor: "pointer" }}
            >
              <label class="form-label text-white m-1" for="customFile1">
                Choose file
              </label>

              <input
                type="file"
                class="form-control d-none"
                id="customFile1"
                onChange={handleFileChange}
              />
            </div>
          </div>
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
    </div>
  );
};
