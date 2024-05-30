// authActions.js
import axios from "axios";
import {
  invalidRequest,
  callingRequestLoading,
  getAllAvailabelNumbers,
  searchAvailableNumber,
  makeCall,
  getCallLogs,
  getRecordings,
  getUserSubAccounts,
  addSubAccount,
  getClaimedNumbers,
} from "../slices/calling";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getAvailableNumbers = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/available-numbers`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(
          getAllAvailabelNumbers(response.data.data.availablePhoneNumbers)
        );
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getAllClaimedNumbers = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/claimed-numbers`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getClaimedNumbers(response.data.data.claimedNumbers));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getMainAccountClaimedNumbers =
  (token, data) => async (dispatch) => {
    try {
      dispatch(callingRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(`${backendURL}/user/calling/main-claimed-numbers`, config)
        .then((response) => {
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(getClaimedNumbers(response.data.data.claimedNumbers));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const getAdminAccountClaimedNumbers =
  (token, data) => async (dispatch) => {
    try {
      dispatch(callingRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(`${backendURL}/user/calling/admin-claimed-numbers`, config)
        .then((response) => {
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(getClaimedNumbers(response.data.data.claimedNumbers));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };

export const CallLogsList = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/call-logs`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCallLogs(response.data.data.callsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const transferCall = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/transfer-call`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        // dispatch(getCallLogs(response.data.data.callsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const addConfressCall = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/add-confress-call`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        // dispatch(getCallLogs(response.data.data.callsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const pauseCallRecording = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/pause-recording`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        toast.success(response.data.message);
        // dispatch(getCallLogs(response.data.data.callsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const resumeCallRecording = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/resume-recording`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        toast.success(response.data.message);
        // dispatch(getCallLogs(response.data.data.callsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateBalanceAfterCall = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/update-balance`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        // dispatch(getCallLogs(response.data.data.callsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const recordingsList = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/call-recordings`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getRecordings(response.data.data.recordingsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const makeUserToCall = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/make-call`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(makeCall(response.data.data.callData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const searchAvailablePhoneNumber = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/search-number`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(
          getAllAvailabelNumbers(response.data.data.availablePhoneNumbers)
        );
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const createSubAccount = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/create-sub-account`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addSubAccount(response.data.data.message));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserSubAccountsList = (token) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/calling/get-sub-accounts`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getUserSubAccounts(response.data.data.subAccountsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
