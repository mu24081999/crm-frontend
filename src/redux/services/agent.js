// authActions.js
import axios from "axios";
import {
  invalidRequest,
  getAllAgents,
  addAgent,
  agentRequestLoading,
  readAgent,
  deleteAgent,
  updateAgent,
} from "../slices/agent";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getAgentsList = (token, user_id) => async (dispatch) => {
  try {
    dispatch(agentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/agents/get-agents/${user_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllAgents(response.data.data.agentsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getAgentDetails = (token, agent_id) => async (dispatch) => {
  try {
    dispatch(agentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/agents/agent-details/${agent_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(readAgent(response.data.data.agentData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteAgentRec = (token, agent_id) => async (dispatch) => {
  try {
    dispatch(agentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/agents/delete-agent/${agent_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteAgent(response.data.message));
        dispatch(getAgentsList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addAgentRec = (token, data) => async (dispatch) => {
  try {
    dispatch(agentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(`${backendURL}/user/agents/add-agent`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }

        toast.success(response.data.message);
        dispatch(addAgent(response.data.message));
        dispatch(getAgentsList(token));
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateAgentRec = (token, data, agent_id) => async (dispatch) => {
  try {
    dispatch(agentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .put(
        `${backendURL}/user/agents/update-agent-details/${agent_id}`,
        data,
        config
      )
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }

        toast.success(response.data.message);
        dispatch(updateAgent(response.data.message));
        dispatch(getAgentsList(token));
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
