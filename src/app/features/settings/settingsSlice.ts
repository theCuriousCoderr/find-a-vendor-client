import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsSliceInitialState } from "./interface";
import { updateVendorDetails } from "./thunk";
import { Customer, Vendor } from "@/types";
// import { updateVendorDetails } from "./thunk";

const initialState: SettingsSliceInitialState = {
  currentEdit: "",
  vendorInfo: null,
  customerInfo: null,
  loading: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateCurrentEdit: (state, action: PayloadAction<{ name: string }>) => {
      state.currentEdit = action.payload.name;
    },
    updateSettingsVendorInfo: (
      state,
      action: PayloadAction<{ vendorInfo: Vendor }>
    ) => {
      state.vendorInfo = action.payload.vendorInfo;
    },
    updateSettingsCustomerInfo: (
      state,
      action: PayloadAction<{ customerInfo: Customer }>
    ) => {
      state.customerInfo = action.payload.customerInfo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateVendorDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVendorDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateVendorDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateCurrentEdit, updateSettingsVendorInfo, updateSettingsCustomerInfo } =
  settingsSlice.actions;
export default settingsSlice.reducer;
