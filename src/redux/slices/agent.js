import { createSlice } from "@reduxjs/toolkit";

export const agentSlice = createSlice({
  name: "agent",
  initialState: {
    isLoading: false,
    agents: [],
    agentDetails: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    agentRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.agents = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllAgents: (state, action) => {
      state.isLoading = false;
      state.agents = action.payload;
      state.message = "success";
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    addAgent: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    updateAgent: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    readAgent: (state, action) => {
      state.isLoading = false;
      state.agentDetails = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    deleteAgent: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
  },
});

export default agentSlice.reducer;
export const {
  agentRequestLoading,
  addAgent,
  invalidRequest,
  getAllAgents,
  readAgent,
  deleteAgent,
  updateAgent,
} = agentSlice.actions;
