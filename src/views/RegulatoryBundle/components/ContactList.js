import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactRec,
  getContactsList,
  permanentDeleteContactRec,
  updateBulkContactRec,
  updateContactRec,
} from "../../../redux/services/contact";
import Loader from "../../../components/Loader/Loader";
import { FaArchive, FaEdit, FaRegStar, FaTrash } from "react-icons/fa";
import moment from "moment";
import { SocketContext } from "../../../Context";
import { ImBlocked } from "react-icons/im";
import Checkbox from "../../../components/FormFields/checkboxField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import exportToCSV from "../../../components/Papaparse/exportCSV";
import _ from "lodash";

const ContactList = ({ data, onToggleEdit, isEdit }) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { handleToggleShowLeadDetail, setContactsToModify, contactsToModify } =
    useContext(SocketContext);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.contact);
  const [searchInput, setSearchInput] = useState(null);
  const [contacts, setContacts] = useState();
  const handleDeleteContact = (contact_id) => {
    dispatch(deleteContactRec(token, contact_id));
    onToggleEdit(false);
  };
  const handleToggle = (contact_id) => {
    // onToggleEdit(true);
    // dispatch(getContactDetais(token, contact_id));
    handleToggleShowLeadDetail(true, contact_id, token);
  };
  const handleUpdateStatus = (contact_id, status) => {
    dispatch(updateContactRec(token, contact_id, { status: status }));
  };
  const handlePermanentDeleteContact = (contact_id) => {
    dispatch(permanentDeleteContactRec(token, contact_id));
    onToggleEdit(false);
  };
  // const handleBulkChange = (event) => {
  //   if (event.target.checked) {
  //     contactsData?.map((contact) => {
  //       return setValue(`contact-${contact.id}`, true);
  //     });
  //     setContactsToModify(contactsData);
  //   } else {
  //     contactsData?.map((contact) => {
  //       return setValue(`contact-${contact.id}`, false);
  //     });
  //     setContactsToModify([]);
  //   }
  // };
  const handleSingleChange = (event, contact) => {
    if (event.target.checked === true) {
      setContactsToModify((prevArray) => [...prevArray, contact]);
    } else {
      setContactsToModify((prevArray) =>
        prevArray.filter((cnt) => cnt.id !== contact.id)
      );
    }
  };
  const handleBulkImportant = () => {
    if (contactsToModify?.length > 0) {
      const modifiedArray = [];

      contactsToModify?.map((contact) => {
        modifiedArray.push({ ...contact, status: "important" });
      });
      const formData = {
        updates: modifiedArray,
        modify_key: "status",
      };
      dispatch(updateBulkContactRec(token, formData));
    } else {
      toast.error("Please select at least one contact.");
    }
  };
  const handleBulkDelete = () => {
    if (contactsToModify?.length > 0) {
      const modifiedArray = [];

      contactsToModify?.map((contact) => {
        modifiedArray.push({ ...contact });
      });
      const formData = {
        updates: modifiedArray,
        modify_key: "contact_delete",
      };
      dispatch(updateBulkContactRec(token, formData));
    } else {
      toast.error("Please select at least one contact.");
    }
  };
  const handleBulkArchieved = () => {
    if (contactsToModify?.length > 0) {
      const modifiedArray = [];

      contactsToModify?.map((contact) => {
        modifiedArray.push({ ...contact, status: "archieved" });
      });
      const formData = {
        updates: modifiedArray,
        modify_key: "status",
      };
      dispatch(updateBulkContactRec(token, formData));
    } else {
      toast.error("Please select at least one contact.");
    }
  };
  // const handleFileExport = () => {
  //   exportToCSV(contactsData, "contacts.csv");
  // };
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  // const handleSearchContact = () => {
  //   const filterData = data?.filter((contact) =>
  //     contact.firstname.includes(searchInput)
  //   );
  //   console.log("🚀 ~ handleSearchContact ~ filterData:", filterData);
  //   setContacts(filterData);
  // };
  return (
    <div
      className="contact-list-view"
      style={{ height: "100vh", overflow: "scroll" }}
    >
      <div className="">
        <div className="p-2">
          <div class="btn-toolbar" role="toolbar" aria-label="Add to pipeline">
            <div className="d-flex justify-content-end w-100">
              <div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Contact"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={handleSearchInputChange}
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      // onClick={handleSearchContact}
                    >
                      Search
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isEdit && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <table className="table w-100 mb-5">
              <thead>
                <tr>
                  {/* <th className="">
                    <div className="px-2">
                      <Checkbox
                        name={`bulk`}
                        control={control}
                        errors={errors}
                        // onChange={handleBulkChange}
                      />
                    </div>
                  </th> */}
                  <th>Bundle Name</th>
                  <th>Country</th>
                  <th>Type & end user</th>
                  <th>Status</th>
                  <th>Status Details</th>
                  <th>Date Created</th>
                </tr>
              </thead>

              <tbody>
                {data?.length > 0 &&
                  data?.map((obj) => (
                    <tr>
                      {/* <td>
                        <div className="px-2">
                          <Checkbox
                            name={`contact-${obj.id}`}
                            control={control}
                            errors={errors}
                            onChange={(e) => handleSingleChange(e, obj)}
                          />
                        </div>
                      </td> */}
                      <td>{obj?.friendly_name}</td>
                      <td className="text-truncate">{obj?.country}</td>
                      <td>
                        <b>{_.capitalize(obj?.end_user_type)}: </b>
                        {obj.firstname + " " + obj?.lastname}
                      </td>
                      <td>{obj?.state ? obj?.status : "Pending"}</td>
                      <td>{obj?.status_description || "..."}</td>
                      <td>{obj?.created_at}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
