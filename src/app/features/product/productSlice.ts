import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  appStatusError: "",
  appStatusSuccess: "",
};

export const productSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    updateStatusError: (state, action: PayloadAction<{ error: string }>) => {
      state.appStatusError = action.payload.error;
    },
    updateStatusSuccess: (
      state,
      action: PayloadAction<{ success: string }>
    ) => {
      state.appStatusSuccess = action.payload.success;
    },
    clearStatusError: (state) => {
      state.appStatusError = "";
    },
    clearStatusSuccess: (state) => {
      state.appStatusSuccess = "";
    },
  },
});

export const {
  updateStatusError,
  updateStatusSuccess,
  clearStatusError,
  clearStatusSuccess,
} = productSlice.actions;
export default productSlice.reducer;
