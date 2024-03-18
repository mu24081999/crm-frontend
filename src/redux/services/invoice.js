// authActions.js
import axios from "axios";
import {
  invalidRequest,
  invoiceRequestLoading,
  invoiceDetials,
  addInvoice,
  getAllInvoices,
  deleteInvoice,
  updateInvoice,
} from "../slices/invoice";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeInvoice = (token, data) => async (dispatch) => {
  try {
    dispatch(invoiceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/invoice/post-invoice`, data, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addInvoice(response.data.message));
        toast.success(response.data.message);
        dispatch(getInvoiceList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getInvoiceList = (token) => async (dispatch) => {
  try {
    dispatch(invoiceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/invoice/get-invoices`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllInvoices(response.data.data.invoicesData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getInvoiceDetails = (token, invoice_id) => async (dispatch) => {
  try {
    dispatch(invoiceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/invoice/invoice-details/${invoice_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(invoiceDetials(response.data.data.invoiceData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateInvoiceRec =
  (token, invoice_id, data) => async (dispatch) => {
    try {
      dispatch(invoiceRequestLoading());
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      };
      await axios
        .put(
          `${backendURL}/user/invoice/invoice-update/${invoice_id}`,
          data,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.status !== 200) {
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(updateInvoice(response.data.message));
          dispatch(getInvoiceList(token));
          toast.success(response.data.message);
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const updateStatusRec =
  (token, invoice_id, data) => async (dispatch) => {
    try {
      dispatch(invoiceRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .put(
          `${backendURL}/user/invoice/update-activity/${invoice_id}`,
          data,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.status !== 200) {
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(updateInvoice(response.data.message));
          dispatch(getInvoiceList(token));
          toast.success(response.data.message);
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };

export const deleteInvoiceRec = (token, invoice_id) => async (dispatch) => {
  try {
    dispatch(invoiceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/invoice/delete-invoice/${invoice_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteInvoice(response.data.message));
        dispatch(getInvoiceList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
