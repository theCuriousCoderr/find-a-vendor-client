import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FetchAuthenticatedVendorNotificationsResponseType,
  FetchAuthenticatedVendorOrdersResponseType,
  FetchAuthenticatedVendorResponseType,
  VendorsSliceState,
} from "./interface";
import {
  getAuthenticatedVendor,
  getAuthenticatedVendorNotifications,
  getAuthenticatedVendorOrders,
} from "./thunk";

const initialState: VendorsSliceState = {
  authenticatedVendor: null,
  authenticatedVendorProducts: null,
  authenticatedVendorOrders: [],
  authenticatedVendorNotifications: [],
  loadingAuthenticatedVendor: true,
  loadingAuthenticatedVendorOrders: true,
  loadingAuthenticatedVendorNotifications: true,
  isVendorProfileComplete: false,
};

export const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    updateLoadingAuthenticatedVendor: (
      state,
      action: PayloadAction<{ status: boolean }>
    ) => {
      state.loadingAuthenticatedVendor = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAuthenticatedVendor
      .addCase(getAuthenticatedVendor.pending, (state) => {
        state.loadingAuthenticatedVendor = true;
      })
      .addCase(
        getAuthenticatedVendor.fulfilled,
        (
          state,
          action: PayloadAction<FetchAuthenticatedVendorResponseType>
        ) => {
          state.loadingAuthenticatedVendor = false;
          state.authenticatedVendor = action.payload.vendor;
          state.authenticatedVendorProducts = action.payload.vendorProducts;
          state.isVendorProfileComplete =
            action.payload.isVendorProfileComplete;
        }
      )
      .addCase(getAuthenticatedVendor.rejected, (state) => {
        state.loadingAuthenticatedVendor = false;
        state.authenticatedVendor = null;
      })
      // getAuthenticatedVendorOrders
      .addCase(getAuthenticatedVendorOrders.pending, (state) => {
        state.loadingAuthenticatedVendorOrders = false;
      })
      .addCase(
        getAuthenticatedVendorOrders.fulfilled,
        (
          state,
          action: PayloadAction<FetchAuthenticatedVendorOrdersResponseType>
        ) => {
          state.loadingAuthenticatedVendorOrders = false;
          state.authenticatedVendorOrders = action.payload.vendorOrders;
        }
      )
      .addCase(getAuthenticatedVendorOrders.rejected, (state) => {
        state.loadingAuthenticatedVendorOrders = false;
        state.authenticatedVendorOrders = [];
      })
      // getAuthenticatedVendorNotifications
      .addCase(getAuthenticatedVendorNotifications.pending, (state) => {
        state.loadingAuthenticatedVendorNotifications = true;
      })
      .addCase(
        getAuthenticatedVendorNotifications.fulfilled,
        (
          state,
          action: PayloadAction<FetchAuthenticatedVendorNotificationsResponseType>
        ) => {
          state.loadingAuthenticatedVendorNotifications = false;
          state.authenticatedVendorNotifications =
            action.payload.vendorNotifications;
        }
      )
      .addCase(getAuthenticatedVendorNotifications.rejected, (state) => {
        state.loadingAuthenticatedVendorNotifications = false;
        state.authenticatedVendorNotifications = [];
      });
  },
});

export const { updateLoadingAuthenticatedVendor } = vendorsSlice.actions;
export default vendorsSlice.reducer;
