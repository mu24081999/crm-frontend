import React, { useEffect, useState } from "react";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import { useForm } from "react-hook-form";
import { FaEdit, FaPencilAlt, FaRegPlusSquare } from "react-icons/fa";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import moment from "moment";
import { storeInvoice } from "../../../redux/services/invoice";
import Checkbox from "../../../components/FormFields/checkboxField";
import DatePickerFeild from "../../../components/FormFields/datePickerField";

const CreateInvoice = ({
  businessInfo,
  billedInfo,
  authUser,
  token,
  dispatch,
}) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({});
  const [logo, setLogo] = useState(null);
  const [editTitle, setEditTitle] = useState(false);
  const [showShippingForm, setShowShipping] = useState(false);
  const [rowCount, setRowCount] = useState(0); // State to track the number of rows
  const [invoiceItemRowCount, setInvoiceItemRowCount] = useState(1); // State to track the number of rows
  const [termsRowsCount, setTermsRowsCount] = useState(1);
  const extra_discount_watcher = watch("extra_discount_percentage");
  const subtotalArray = [];
  const discountArray = [];
  for (let index = 0; index < invoiceItemRowCount; index++) {
    const item_qty = watch(`item_qty_${index}`);
    const item_price = watch(`item_price_${index}`);
    const item_discount = watch(`item_discount_${index}`);

    if (item_qty !== undefined && item_price !== undefined) {
      const item_total = item_qty * item_price;
      const discount =
        item_discount !== undefined ? (item_total / 100) * item_discount : 0;
      const total = item_total - discount;
      setValue(`item_total_${index}`, total);
      subtotalArray.push(total);
      discountArray.push(discount);
    }
  }
  const subtotal = subtotalArray?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const discount = discountArray?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  useEffect(() => {
    if (subtotal) {
      setValue("subtotal", subtotal);
    }
  }, [subtotal, setValue]);
  useEffect(() => {
    if (discount) {
      setValue("discount", discount);
    }
  }, [discount, setValue]);
  useEffect(() => {
    if (subtotal && extra_discount_watcher === undefined) {
      setValue("total", subtotal);
    } else if (subtotal && extra_discount_watcher !== undefined) {
      setValue("total", subtotal - extra_discount_watcher);
    }
  }, [subtotal, setValue, extra_discount_watcher]);
  useEffect(() => {
    if (extra_discount_watcher !== undefined && discount && subtotal) {
      const discount = (subtotal / 100) * extra_discount_watcher;
      setValue("discount_total", discount);
    }
  }, [extra_discount_watcher, setValue, discount, subtotal]);
  const titleWatcher = watch("title");
  const handleChangeImage = (e) => {
    const selectedLogo = e.currentTarget.files[0];
    setLogo(selectedLogo);
  };
  const onInvoiceSubmit = (data) => {
    const invoiceItems = [];
    const invoiceDetailsEntries = [
      {
        label: data.labelA,
        value: data.valueA,
      },
      {
        label: data.labelB,
        value: data.valueB,
      },
      {
        label: data.labelC,
        value: data.valueC,
      },
    ];
    const invoiceConditions = [];
    for (let index = 0; index < rowCount; index++) {
      const item = {
        label: data[`label${index}`],
        value: data[`value${index}`],
      };
      invoiceDetailsEntries.push(item);
    }
    for (let index = 0; index < termsRowsCount; index++) {
      const item = {
        term: data[`conditions_${index}`],
      };
      invoiceConditions.push(item);
    }
    for (let i = 0; i < invoiceItemRowCount; i++) {
      const item = {
        description: data[`item_description_${i}`],
        discount: data[`item_discount_${i}`],
        discountType: data[`item_discount_type_${i}`],
        name: data[`item_name_${i}`],
        price: data[`item_price_${i}`],
        qty: data[`item_qty_${i}`],
        total: data[`item_total_${i}`],
      };
      invoiceItems.push(item);
    }
    const invoiceDetailsJson = {
      items: invoiceDetailsEntries,
    };
    const invoiceConditionsJson = {
      items: invoiceConditions,
    };
    const invoiceItemsJson = {
      items: invoiceItems,
    };
    const shippingInfoJson = {
      client_business_name: data?.client_business_name,
      address: data?.address,
      city: data?.city,
      postal_code: data?.postal_code,
      state: data?.state,
      country: data?.country,
      GSTIN: data?.GSTIN,
    };
    const invoiceDetailsStringify = JSON.stringify(invoiceDetailsJson);
    const invoiceConditionsStringify = JSON.stringify(invoiceConditionsJson);
    const invoiceItemsStringify = JSON.stringify(invoiceItemsJson);
    const shippingInfoStringify = JSON.stringify(shippingInfoJson);
    const billedInfoStringify = JSON.stringify(billedInfo);
    const businessInfoStringify = JSON.stringify(businessInfo);
    const formData = new FormData();
    formData.append("user_id", authUser.id);
    formData.append("user_name", authUser.name);
    formData.append("user_image", authUser.image);
    formData.append("logo", logo);
    formData.append("title", data.title);
    formData.append("business_info", billedInfoStringify);
    formData.append("invoice_details", invoiceDetailsStringify);
    formData.append("bill_details", businessInfoStringify);
    formData.append("shipping_info", shippingInfoStringify);
    formData.append("invoice_items", invoiceItemsStringify);
    formData.append("conditions", invoiceConditionsStringify);
    formData.append("subtotal", data.subtotal);
    formData.append("discount", data.discount);
    formData.append(
      "extra_discount_percentage",
      data.extra_discount_percentage
    );
    formData.append("discount_total", data.discount_total);
    formData.append("total", data.total);
    formData.append("from_name", data.from_name);
    formData.append("from_label", data.from_label);
    formData.append("personal_memo", data.personal_memo);
    formData.append("note_to_client", data.note_to_client);
    data?.save_to_draft
      ? formData.append("status", "draft")
      : formData.append("status", "unpaid");
    data?.save_to_draft
      ? formData.append("activity", "")
      : formData.append("activity", "sent");
    dispatch(storeInvoice(token, formData));
  };

  const addRow = () => {
    setRowCount(rowCount + 1); // Increment row count on button click
  };
  const addTermRow = () => {
    setTermsRowsCount(termsRowsCount + 1); // Increment row count on button click
  };
  const addInvoiceItem = () => {
    setInvoiceItemRowCount(invoiceItemRowCount + 1); // Increment row count on button click
  };
  const deleteCondition = (index) => {
    setTermsRowsCount(termsRowsCount - 1); // Increment row count on
    setValue(`conditions_${index}`, "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onInvoiceSubmit)}>
        <header className="invoice-header">
          <div className="d-flex align-items-center">
            <a
              className="invoiceapp-title dropdown-toggle link-dark"
              data-bs-toggle="dropdown"
              href="/"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <h1>Standard Template</h1>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="/">
                Simplicity Template
              </a>
              <a className="dropdown-item" href="/">
                Essential Template
              </a>
              <a className="dropdown-item" href="/">
                classNameic Template
              </a>
              <a className="dropdown-item" href="/">
                Pro Forma Template
              </a>
              <a className="dropdown-item" href="/">
                Trade Template
              </a>
              <a className="dropdown-item" href="/">
                Interim Template
              </a>
              <a className="dropdown-item" href="/">
                Primary Template
              </a>
              <a className="dropdown-item" href="/">
                Matt Opel Template
              </a>
              <a className="dropdown-item" href="/">
                Freelancer Template
              </a>
            </div>
          </div>
          <div className="invoice-options-wrap">
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover invoiceapp-setting-toggle active"
              href="/"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="sliders"></i>
                </span>
              </span>
            </a>
            {/* <a
              href="invoice-preview.html"
              className="btn btn-outline-secondary flex-shrink-0 d-md-inline-block d-none"
            >
              Preview
            </a> */}
            <button
              type="submit"
              className="btn btn-primary ms-2 d-sm-inline-block d-none"
            >
              save
            </button>
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-md-inline-block d-none"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Collapse"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="chevron-up"></i>
                </span>
                <span className="feather-icon d-none">
                  <i data-feather="chevron-down"></i>
                </span>
              </span>
            </a>
          </div>
          <div className="hk-sidebar-togglable"></div>
        </header>
        <div className="invoice-body">
          <div
            className="nicescroll-bar"
            style={{ height: "800px", overflow: "scroll" }}
          >
            <div className="container">
              <div className="create-invoice-wrap mt-xxl-5 p-md-5 p-3">
                <div className="row">
                  <div className="col-lg-3 col-md-5 order-md-0 order-1">
                    {/* <div className="upload-logo">
                    <input type="file" className="dropify-2" />
                  </div> */}
                    <div class="frame">
                      <div class="center">
                        <div class="dropzone">
                          {logo ? (
                            <div>
                              <img
                                src={URL.createObjectURL(logo)}
                                alt="Preview"
                                width={100}
                              />
                            </div>
                          ) : (
                            <img
                              src="http://100dayscss.com/codepen/upload.svg"
                              class="upload-icon"
                              alt="default"
                            />
                          )}

                          <p className=" fs-6 fw-bolder text-center">
                            Upload Logo
                          </p>

                          <input
                            type="file"
                            class="upload-input"
                            onChange={(e) => {
                              handleChangeImage(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 offset-lg-5 offset-md-3 col-md-4 mb-md-0 mb-4">
                    <h2 className="d-flex align-items-center justify-content-md-end mb-0 inline-editable-wrap">
                      <a
                        className="btn btn-sm btn-icon btn-flush-light btn-rounded flush-soft-hover edit-tyn ms-md-5"
                        onClick={() => setEditTitle(!editTitle)}
                      >
                        <span className="icon">
                          <span className="feather-icon">
                            {/* <i data-feather="edit-2"></i> */}
                            <FaEdit />
                          </span>
                        </span>
                      </a>
                      {editTitle ? (
                        <InputField
                          name="title"
                          placeholder="Invoice Title"
                          control={control}
                          defaultValue="Invoice"
                          rules={{
                            required: {
                              value: true,
                              message: "Field required!",
                            },
                          }}
                          errors={errors}
                        />
                      ) : (
                        <span className="editable">
                          {titleWatcher || "Invoice"}
                        </span>
                      )}
                    </h2>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-xxl-3">
                    <a
                      className="d-inline-block mb-3"
                      data-bs-toggle="collapse"
                      href="#address_collpase"
                      role="button"
                      aria-expanded="false"
                    >
                      - Your business information
                    </a>
                    <div className="collapse show mt-5" id="address_collpase">
                      {businessInfo && (
                        <div className="address-wrap">
                          <h6>{businessInfo?.company_name}</h6>
                          <p>{businessInfo?.address_line_1}</p>
                          <p>{businessInfo?.address_line_2}</p>
                          <p>{businessInfo?.email}</p>
                        </div>
                      )}
                      <a
                        className="d-inline-flex align-items-center mt-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_info"
                        href="/"
                      >
                        {/* <i className="ri-pencil-line me-1"></i>{" "} */}
                        <FaPencilAlt />
                        {businessInfo?.email ? "Edit" : "Add"} Business Info
                      </a>
                    </div>
                  </div>
                  <div className="col-xxl-4 offset-xxl-5 mt-xxl-0 mt-6">
                    <form>
                      <div className="row">
                        <div className="col-lg-6 form-group">
                          <InputField
                            name={`labelA`}
                            mb={true}
                            control={control}
                            defaultValue="Invoice No*"
                            errors={errors}
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <InputField
                            name={`valueA`}
                            mb={true}
                            control={control}
                            defaultValue="0001"
                            errors={errors}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 form-group">
                          <InputField
                            name={`labelB`}
                            mb={true}
                            control={control}
                            defaultValue="Invoice Date*"
                            errors={errors}
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <DatePickerFeild
                            name="valueB"
                            placeholder="Invoice Date"
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
                      <div className="row">
                        <div className="col-lg-6 form-group">
                          <InputField
                            name={`labelC`}
                            mb={true}
                            control={control}
                            defaultValue="Customer No"
                            errors={errors}
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <InputField
                            name={`valueC`}
                            mb={true}
                            control={control}
                            defaultValue="3224"
                            errors={errors}
                          />
                        </div>
                      </div>
                      {[...Array(rowCount)].map((_, index) => (
                        <div key={index} className="row">
                          <div className="col-lg-6 form-group">
                            <InputField
                              name={`label${index}`}
                              placeholder="Label"
                              mb={true}
                              control={control}
                              errors={errors}
                            />
                          </div>
                          <div className="col-lg-6 form-group">
                            <InputField
                              name={`value${index}`}
                              mb={true}
                              placeholder="Value"
                              control={control}
                              errors={errors}
                            />
                          </div>
                        </div>
                      ))}
                      <a
                        className="d-inline-flex align-items-center cursor-pointer"
                        onClick={addRow}
                      >
                        <FaPencilAlt />
                        Add more fields
                      </a>
                    </form>
                    {/* <form>
                      <div className="row gx-3">
                        <div className="col-lg-6 form-group">
                          <input
                            className="form-control"
                            value="Invoice No*"
                            type="text"
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <input
                            className="form-control"
                            value="0001"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-lg-6 form-group">
                          <input
                            className="form-control"
                            value="Invoice Date*"
                            type="text"
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <input
                            className="form-control"
                            name="single-date-pick"
                            value="24/2/2020"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-lg-6 form-group">
                          <input
                            className="form-control"
                            value="Due date*"
                            type="text"
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <select className="form-select">
                            <option selected="">Due on Reciept</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-lg-6 form-group">
                          <input
                            className="form-control"
                            value="Customer No"
                            type="text"
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <input
                            className="form-control"
                            value="32321"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="repeater">
                        <div data-repeater-list="category-group">
                          <div
                            className="row gx-3"
                            data-repeater-item
                            style={{ display: "none" }}
                          >
                            <div className="col-lg-6 form-group">
                              <input
                                className="form-control"
                                placeholder="Label"
                                type="text"
                              />
                            </div>
                            <div className="col-lg-6 form-group">
                              <input
                                className="form-control"
                                placeholder="Value"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                        <a
                          data-repeater-create
                          className="d-inline-flex align-items-center"
                          href="/"
                        >
                          <i className="ri-add-box-line me-1"></i> Add more
                          fields
                        </a>
                      </div>
                    </form> */}
                  </div>
                </div>
                <div className="separator separator-light"></div>
                <div className="row">
                  <div className="col-xxl-3 mb-xxl-0 mb-4">
                    <h6>Billed To</h6>
                    {/* <form>
                      <div className="form-group">
                        <select className="form-select">
                          <option selected="">Supernova consultant</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <a
                        className="d-inline-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#billed_info"
                        href="/"
                      >
                        <i className="ri-add-box-line me-1"></i> Add new client
                      </a>
                    </form> */}
                    {billedInfo && (
                      <div className="Billto-wrap mt-4">
                        <h6>{billedInfo?.company_name}</h6>
                        <p>{billedInfo?.address_line_1}</p>
                        <p>{billedInfo?.address_line_2}</p>
                        <p>{billedInfo?.email}</p>
                      </div>
                    )}
                    <a
                      className="d-inline-flex align-items-center mt-2"
                      data-bs-toggle="modal"
                      data-bs-target="#billed_info"
                      href="/"
                    >
                      <FaPencilAlt />
                      {billedInfo?.email ? "Edit" : "Add"} Client Info
                    </a>
                  </div>
                  <div className="col-xxl-4 offset-xxl-5">
                    <h6>Ship To</h6>
                    <div className="repeater">
                      <div
                        className="collapse"
                        id="shipto_collpase"
                        style={{ display: "block" }}
                      >
                        {showShippingForm && (
                          <div className="row gx-3">
                            <div className="col-sm-12 form-group">
                              <InputField
                                name={`client_business_name`}
                                mb={true}
                                placeholder="Client business name"
                                control={control}
                                errors={errors}
                              />
                            </div>
                            <div className="col-sm-12 form-group">
                              <InputField
                                name={`address`}
                                mb={true}
                                placeholder="Address"
                                control={control}
                                errors={errors}
                              />
                            </div>
                            <div className="col-lg-6 form-group">
                              <InputField
                                name={`city`}
                                mb={true}
                                placeholder="City"
                                control={control}
                                errors={errors}
                              />
                            </div>
                            <div className="col-lg-6 form-group">
                              <InputField
                                name={`postal_code`}
                                mb={true}
                                placeholder="Postal Code"
                                control={control}
                                errors={errors}
                              />
                            </div>
                            <div className="col-sm-12 form-group">
                              <InputField
                                name={`state`}
                                mb={true}
                                placeholder="State"
                                control={control}
                                errors={errors}
                              />
                            </div>
                            <div className="col-sm-12 form-group">
                              <InputField
                                name={`country`}
                                mb={true}
                                placeholder="Country"
                                control={control}
                                errors={errors}
                              />
                            </div>
                            <div className="col-sm-12 form-group">
                              <InputField
                                name={`GSTIN`}
                                mb={true}
                                placeholder="GSTIN Enter GSTIN here(optional)"
                                control={control}
                                errors={errors}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <a
                        data-bs-toggle="collapse"
                        className="d-inline-flex align-items-center"
                        onClick={() => setShowShipping(!showShippingForm)}
                      >
                        <FaRegPlusSquare /> Add shipping address
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-sm">
                    <form className="form-inline p-3 bg-grey-light-5 rounded">
                      <div className="row gx-3 align-items-center">
                        <div className="col-xl-auto mb-xl-0 mb-2">
                          <label className="form-label mb-xl-0">Filters</label>
                        </div>
                        <div className="col-xl-auto mb-xl-0 mb-2">
                          <select className="form-select">
                            <option selected="">Number format</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-xl-auto mb-xl-0 mb-2">
                          <select className="form-select">
                            <option selected="">Add/Remove columns</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-xl-auto">
                          <select className="form-select">
                            <option selected="">US Dollar ($ USD)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="table-wrap mt-5">
                  <div className="invoice-table-wrap">
                    <table className="table table-bordered invoice-table">
                      <thead className="thead-primary">
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th colspan="2">Discount</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(invoiceItemRowCount)].map((_, index) => (
                          <>
                            <tr className="table-row-gap">
                              <td></td>
                            </tr>
                            <tr>
                              <td className="w-70 rounded-top-start border-end-0 border-bottom-0">
                                <InputField
                                  name={`item_name_${index}`}
                                  placeholder="Item Name"
                                  mb={true}
                                  control={control}
                                  errors={errors}
                                />
                              </td>
                              <td className="border-end-0 border-bottom-0">
                                <InputField
                                  name={`item_qty_${index}`}
                                  type="number"
                                  placeholder="0"
                                  mb={true}
                                  control={control}
                                  errors={errors}
                                />
                              </td>
                              <td className="w-15 border-end-0 border-bottom-0">
                                <InputField
                                  name={`item_price_${index}`}
                                  type="number"
                                  placeholder="0"
                                  mb={true}
                                  control={control}
                                  errors={errors}
                                />
                              </td>
                              <td className="border-end-0 border-bottom-0">
                                <div style={{ width: "60px" }}>
                                  <InputField
                                    name={`item_discount_${index}`}
                                    type="number"
                                    placeholder="0"
                                    mb={true}
                                    control={control}
                                    errors={errors}
                                  />
                                </div>
                              </td>
                              <td className="border-end-0 border-bottom-0">
                                <div className="">
                                  <ReactSelectField
                                    name={`item_discount_type_${index}`}
                                    placeholder="Select"
                                    mb={true}
                                    options={[{ label: "%", value: "%" }]}
                                    control={control}
                                    errors={errors}
                                  />
                                </div>
                              </td>
                              <td
                                className="w-20  rounded-end  bg-primary-light-5 close-over position-relative"
                                rowspan="2"
                              >
                                <InputField
                                  name={`item_total_${index}`}
                                  type="number"
                                  readOnly
                                  placeholder="0"
                                  mb={true}
                                  control={control}
                                  errors={errors}
                                />
                                <button
                                  type="button"
                                  className="close-row btn-close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colspan="5"
                                className="rounded-bottom-start border-end-0"
                              >
                                <InputField
                                  name={`item_description_${index}`}
                                  placeholder="Description"
                                  mb={true}
                                  control={control}
                                  errors={errors}
                                />
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                    <a
                      className="d-inline-flex align-items-center add-new-row"
                      onClick={addInvoiceItem}
                    >
                      <FaRegPlusSquare /> Add new item
                    </a>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-xxl-6 mt-5">
                    <div className="table-wrap">
                      <div className="table-responsive">
                        <table className="table table-bordered subtotal-table">
                          <tbody>
                            <tr>
                              <td
                                colspan="3"
                                className="rounded-top-start border-end-0 border-bottom-0"
                              >
                                Subtotal
                              </td>
                              <td className="rounded-top-end border-bottom-0 w-30 bg-primary-light-5">
                                {/* <input
                                  type="text"
                                  className="form-control bg-transparent border-0 p-0 gross-total"
                                  value=""
                                  readonly
                                /> */}
                                <InputField
                                  name={`subtotal`}
                                  placeholder="0"
                                  mb={true}
                                  readOnly
                                  control={control}
                                  errors={errors}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td
                                colspan="3"
                                className="border-end-0 border-bottom-0"
                              >
                                Item Discount
                              </td>
                              <td className="border-bottom-0  bg-primary-light-5">
                                {/* <input
                                  type="text"
                                  className="form-control bg-transparent border-0 p-0 gross-discount"
                                  value=""
                                  readonly
                                /> */}
                                <InputField
                                  name={`discount`}
                                  placeholder="0"
                                  mb={true}
                                  readOnly
                                  control={control}
                                  errors={errors}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="border-end-0 border-bottom-0">
                                Extra Discount
                              </td>
                              <td className="border-end-0 border-bottom-0 w-25">
                                {/* <input
                                  type="text"
                                  className="form-control extdiscount"
                                  value="0"
                                /> */}
                                <InputField
                                  name={`extra_discount_percentage`}
                                  type="number"
                                  placeholder="0"
                                  mb={true}
                                  control={control}
                                  errors={errors}
                                />
                              </td>
                              <td className="border-end-0 border-bottom-0 w-25">
                                <select className="form-select extra-disc-type">
                                  <option selected value="1">
                                    %
                                  </option>
                                  <option value="2">₹</option>
                                </select>
                              </td>
                              <td className="border-bottom-0  bg-primary-light-5">
                                {/* <input
                                  type="text"
                                  className="form-control bg-transparent border-0 p-0 extdiscount-read"
                                  value="0"
                                  readonly
                                /> */}
                                <InputField
                                  name={`discount_total`}
                                  placeholder="0"
                                  mb={true}
                                  readOnly
                                  control={control}
                                  errors={errors}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td
                                colspan="3"
                                className="rounded-bottom-start border-end-0 bg-primary-light-5"
                              >
                                <span className="text-dark">Total</span>
                              </td>
                              <td className="rounded-bottom-end  bg-primary-light-5">
                                {/* <input
                                  type="text"
                                  className="form-control bg-transparent border-0 p-0 subtotal"
                                  value=""
                                  readonly
                                /> */}
                                <InputField
                                  name={`total`}
                                  placeholder="0"
                                  mb={true}
                                  readOnly
                                  control={control}
                                  errors={errors}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xxl-5 order-2 order-xxl-0">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label">Note to client</label>
                        <small className="text-muted">1400</small>
                      </div>
                      {/* <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Write an internal note"
                      ></textarea> */}
                      <TextAreaField
                        name="note_to_client"
                        placeholder="Write an internal note"
                        rows={7}
                        control={control}
                        errors={errors}
                      />
                      <button className="btn btn-outline-light mt-2">
                        Add Note
                      </button>
                    </div>
                  </div>
                  <div className="col-xxl-4 offset-xxl-3 text-xxl-end mb-xxl-0 mb-3">
                    {/* <div className="btn btn-light btn-link text-primary btn-file bg-transparent p-0 border-0">
                      <span className="d-inline-flex align-items-center">
                        <i className="ri-add-box-line me-1"></i> Add signature
                        (Optional)
                        <input type="file" className="upload" />
                      </span>
                    </div> */}
                    <div>
                      <a
                        className="d-inline-flex align-items-center mt-2"
                        data-bs-toggle="collapse"
                        href="/label_collpase"
                      >
                        <FaRegPlusSquare /> Add Name & Label
                      </a>
                    </div>
                    <div className="collapse show mt-5" id="label_collpase">
                      <div className="form-group close-over">
                        {/* <input
                          type="text"
                          className="form-control"
                          value="Katherine Zeta Jones"
                        /> */}
                        <InputField
                          name={`from_name`}
                          placeholder="Add Name"
                          mb={true}
                          control={control}
                          errors={errors}
                        />
                        <button type="button" className="close-input btn-close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="form-group close-over">
                        {/* <input
                          type="text"
                          className="form-control"
                          value="Co-founder Hencework"
                        /> */}
                        <InputField
                          name={`from_label`}
                          placeholder="Add Label"
                          mb={true}
                          control={control}
                          errors={errors}
                        />
                        <button type="button" className="close-input btn-close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="separator separator-light"></div>
                <h6 className="mb-4">Terms & Condition</h6>
                <div className="repeater">
                  <ol className="ps-3" data-repeater-list="category-group">
                    {[...Array(termsRowsCount)].map((_, index) => (
                      <li className="form-group close-over">
                        {/* <input
                          type="text"
                          className="form-control"
                          value="Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments."
                        /> */}
                        <InputField
                          name={`conditions_${index}`}
                          placeholder="Add Label"
                          mb={true}
                          control={control}
                          errors={errors}
                        />
                        <button
                          type="button"
                          className="close-input btn-close"
                          onClick={() => deleteCondition(index)}
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </li>
                    ))}
                    {/* <li className="form-group close-over">
                      <input
                        type="text"
                        className="form-control"
                        value="Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments."
                      />
                      <button type="button" className="close-input btn-close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </li>
                    <li className="form-group close-over">
                      <input
                        type="text"
                        className="form-control"
                        value="Please quote invoice number when remitting funds."
                      />
                      <button type="button" className="close-input btn-close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </li>
                    <li
                      data-repeater-item
                      style={{ display: "none" }}
                      className="form-group close-over"
                    >
                      <input type="text" className="form-control" />
                      <button type="button" className="close-input btn-close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </li> */}
                  </ol>
                  <a
                    data-repeater-create
                    className="d-inline-flex align-items-center"
                    onClick={addTermRow}
                  >
                    <FaRegPlusSquare /> Add New Term Row
                  </a>
                </div>
                <div className="separator separator-light"></div>
                <div className="btn btn-light btn-file mb-4">
                  Attach files
                  <input type="file" className="upload" />
                </div>
                <div className="my-2">
                  <a
                    className="d-inline-flex align-items-center"
                    data-bs-toggle="collapse"
                    href="/memo_collpase"
                  >
                    <i className="ri-add-box-line me-1"></i> Add a personal memo
                  </a>
                </div>

                <div className="collapse show" id="memo_collpase">
                  <div className="row">
                    <div className="col-xxl-5">
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label">Personal Memo</label>
                          <small className="text-muted">1400</small>
                        </div>
                        {/* <textarea
                          className="form-control"
                          rows="6"
                          placeholder="Write an internal note"
                        ></textarea> */}
                        <TextAreaField
                          name="personal_memo"
                          placeholder="Write an internal note"
                          rows={7}
                          control={control}
                          errors={errors}
                        />
                        <button className="btn btn-outline-light mt-2">
                          Add Note
                        </button>
                      </div>
                    </div>
                    <div className="col-xxl-5 ">
                      <div className="float-end">
                        <Checkbox
                          name="save_to_draft"
                          label="Save to Draft"
                          control={control}
                          errors={errors}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="invoice-settings">
          <div data-simplebar className="nicescroll-bar">
            <button type="button" className="info-close btn-close">
              <span aria-hidden="true">×</span>
            </button>
            <div className="collapse-simple mt-lg-0 mt-2">
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/currency"
                    aria-expanded="true"
                  >
                    Currency
                  </a>
                </div>
                <div id="currency" className="collapse show">
                  <div className="form-group mt-2">
                    <label className="form-label">Currency Symbol</label>
                    <select className="form-select">
                      <option selected="">US Dollar ($ USD)</option>
                      <option value="1">IND Rupees (₹ USD)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/typography"
                    aria-expanded="true"
                  >
                    Typography
                  </a>
                </div>
                <div id="typography" className="collapse show">
                  <div className="form-group mt-2">
                    <label className="form-label">Font</label>
                    <select className="form-select">
                      <option selected="">Arial</option>
                      <option value="1">Times New Roman</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Size</label>
                    <select className="form-select">
                      <option selected="">16px</option>
                      <option value="1">20px</option>
                      <option value="2">24px</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Align</label>
                    <div>
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          <i className="fa fa-align-left text-primary"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          <i className="fa fa-align-center"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          <i className="fa fa-align-right"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          <i className="fa fa-align-justify"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/color"
                    aria-expanded="true"
                  >
                    Color
                  </a>
                </div>
                <div id="color" className="collapse show">
                  <div className="form-group mt-2">
                    <label className="form-label">Accent</label>
                    <div className="input-group color-picker">
                      <div className="input-group-text colorpicker-input-addon">
                        <input type="color" />
                      </div>
                      <input
                        type="text"
                        className="form-control colorpicker-value"
                        value="#007D88"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Heading Color</label>
                    <div className="input-group color-picker">
                      <div className="input-group-text colorpicker-input-addon">
                        <input type="color" />
                      </div>
                      <input
                        type="text"
                        className="form-control colorpicker-value"
                        value="#1F2327"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Text Color</label>
                    <div className="input-group color-picker">
                      <div className="input-group-text colorpicker-input-addon">
                        <input type="color" />
                      </div>
                      <input
                        type="text"
                        className="form-control colorpicker-value"
                        value="#646A71"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/action"
                    aria-expanded="true"
                  >
                    Actions
                  </a>
                </div>
                <div id="action" className="collapse show">
                  <div className="form-group mt-2">
                    <label className="form-label">Schedule send</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/option"
                    aria-expanded="true"
                  >
                    Options
                  </a>
                </div>
                <div id="option" className="collapse show">
                  <div className="button-list">
                    <button className="btn btn-light btn-block">
                      Get Link
                    </button>
                    <button className="btn btn-light btn-block">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoice;
