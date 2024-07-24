import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    isLoading: false,
    settings: [],
    settingDetails: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    settingRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.settings = [];
      state.settingDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllSettings: (state, action) => {
      state.isLoading = false;
      state.settings = action.payload;
      state.message = "success";
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    addSetting: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    updateSetting: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    readSetting: (state, action) => {
      state.isLoading = false;
      state.settingDetails = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
  },
});

export default settingSlice.reducer;
export const {
  settingRequestLoading,
  addSetting,
  invalidRequest,
  getAllSettings,
  readSetting,
  updateSetting,
} = settingSlice.actions;
