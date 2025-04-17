import { CustomerInfo, LogInStateType, RolesType, VendorInfo } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { signUpCustomer, signUpVendor } from "./thunk";
// import { LoginCustomerResponseType } from "./interface";
import {
    LoginCustomerResponseType,
    LoginVendorResponseType,
} from "./interface";
import { logInCustomer, logInVendor } from "./thunk";


const initialState: LogInStateType = {
  activeRole: "",
  oppositeRole: "",
  customer: {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
  },
  vendor: {
    email: "",
    storeName: "",
    storeTag: "",
    password: "",
  },
  loading: false,
  error: "",
  success: "",
  redirect: false,
  isVendorProfileComplete: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLoginRole: (state, action: PayloadAction<{ role: RolesType }>) => {
      const _activeRole = action.payload.role;
      state.activeRole = _activeRole;
      state.oppositeRole = _activeRole === "vendor" ? "customer" : "vendor";
    },
    updateCustomerInfo: (
      state,
      action: PayloadAction<{ customer: CustomerInfo }>
    ) => {
      state.customer = action.payload.customer;
    },
    updateVendorInfo: (
      state,
      action: PayloadAction<{ vendor: VendorInfo }>
    ) => {
      state.vendor = action.payload.vendor;
    },
    updateLogInLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateLoginError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearLoginError: (state) => {
      state.error = "";
    },
    clearLoginSuccess: (state) => {
      state.success = "";
    },
    clearLoginRedirect: (state) => {
      state.redirect = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        logInCustomer.fulfilled,
        (state, action: PayloadAction<LoginCustomerResponseType>) => {
          state.loading = false;
          state.success = action.payload.message;
          state.redirect = true;
        }
      )
      .addCase(logInCustomer.rejected, (state, action) => {
        const data = action.payload as LoginCustomerResponseType;
        state.loading = false;
        state.error = data.message;
      })
      .addCase(logInVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        logInVendor.fulfilled,
        (state, action: PayloadAction<LoginVendorResponseType>) => {
          state.loading = false;
          state.success = action.payload.message;
          state.isVendorProfileComplete = action.payload?.isVendorProfileComplete || false;
          state.redirect = true;
        }
      )
      .addCase(logInVendor.rejected, (state, action) => {
        const data = action.payload as LoginVendorResponseType;
        state.loading = false;
        state.error = data.message;
      });
  },
});

export const {
    updateLoginRole,
    updateLogInLoading,
    updateLoginError,
    clearLoginError,
    clearLoginSuccess,
    clearLoginRedirect
} = loginSlice.actions;
export default loginSlice.reducer;
