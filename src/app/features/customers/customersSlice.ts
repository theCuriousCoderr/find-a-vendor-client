import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CustomersSliceState,
  FetchAuthenticatedCustomerNotificationsResponseType,
  FetchAuthenticatedCustomerOrdersResponseType,
  FetchAuthenticatedCustomerResponseType,
} from "./interface";
import {
  getAuthenticatedCustomer,
  getAuthenticatedCustomerNotifications,
  getAuthenticatedCustomerOrders,
} from "./thunk";

const initialState: CustomersSliceState = {
  authenticatedCustomer: null,
  authenticatedCustomerOrders: [],
  authenticatedCustomerNotifications: [],
  loadingAuthenticatedCustomer: true,
  loadingAuthenticatedCustomerOrders: true,
  loadingAuthenticatedCustomerNotifications: true,
  isCustomerProfileComplete: false,
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    updateLoadingAuthenticatedCustomer: (
      state,
      action: PayloadAction<{ status: boolean }>
    ) => {
      state.loadingAuthenticatedCustomer = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAuthenticatedCustomer
      .addCase(getAuthenticatedCustomer.pending, (state) => {
        state.loadingAuthenticatedCustomer = true;
      })
      .addCase(
        getAuthenticatedCustomer.fulfilled,
        (
          state,
          action: PayloadAction<FetchAuthenticatedCustomerResponseType>
        ) => {
          state.loadingAuthenticatedCustomer = false;
          state.authenticatedCustomer = action.payload.customer;
          state.isCustomerProfileComplete =
            action.payload.isCustomerProfileComplete;
        }
      )
      .addCase(getAuthenticatedCustomer.rejected, (state) => {
        state.loadingAuthenticatedCustomer = false;
        state.authenticatedCustomer = null;
      })
      // getAuthenticatedCustomerOrders
      .addCase(getAuthenticatedCustomerOrders.pending, (state) => {
        state.loadingAuthenticatedCustomerOrders = false;
      })
      .addCase(
        getAuthenticatedCustomerOrders.fulfilled,
        (
          state,
          action: PayloadAction<FetchAuthenticatedCustomerOrdersResponseType>
        ) => {
          state.loadingAuthenticatedCustomerOrders = false;
          state.authenticatedCustomerOrders = action.payload.customerOrders;
        }
      )
      .addCase(getAuthenticatedCustomerOrders.rejected, (state) => {
        state.loadingAuthenticatedCustomerOrders = false;
        state.authenticatedCustomerOrders = [];
      })
      // getAuthenticatedCustomerNotifications
      .addCase(getAuthenticatedCustomerNotifications.pending, (state) => {
        state.loadingAuthenticatedCustomerNotifications = true;
      })
      .addCase(
        getAuthenticatedCustomerNotifications.fulfilled,
        (
          state,
          action: PayloadAction<FetchAuthenticatedCustomerNotificationsResponseType>
        ) => {
          state.loadingAuthenticatedCustomerNotifications = false;
          state.authenticatedCustomerNotifications =
            action.payload.customerNotifications;
        }
      )
      .addCase(getAuthenticatedCustomerNotifications.rejected, (state) => {
        state.loadingAuthenticatedCustomerNotifications = false;
        state.authenticatedCustomerNotifications = [];
      });
  },
});

export const { updateLoadingAuthenticatedCustomer } = customersSlice.actions;
export default customersSlice.reducer;
