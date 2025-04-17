import { CustomerInfo, RolesType, SignUpType, VendorInfo } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { signUpCustomer, signUpVendor } from "./thunk";
import {
  SignUpCustomerResponseType,
  SignUpVendorResponseType,
} from "./interface";

const initialState: SignUpType = {
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
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateRole: (state, action: PayloadAction<{ role: RolesType }>) => {
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
    updateSignUpLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateSignUpError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearSignUpError: (state) => {
      state.error = "";
    },
    clearSignUpSuccess: (state) => {
      state.success = "";
    },
    clearSignUpRedirect: (state) => {
      state.redirect = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signUpCustomer.fulfilled,
        (state, action: PayloadAction<SignUpCustomerResponseType>) => {
          state.loading = false;
          state.success = action.payload.message;
        }
      )
      .addCase(signUpCustomer.rejected, (state, action) => {
        const data = action.payload as SignUpCustomerResponseType;
        state.loading = false;
        state.error = data.message;
      })
      .addCase(signUpVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signUpVendor.fulfilled,
        (state, action: PayloadAction<SignUpVendorResponseType>) => {
          state.loading = false;
          state.success = action.payload.message;
          state.redirect = true;
        }
      )
      .addCase(signUpVendor.rejected, (state, action) => {
        const data = action.payload as SignUpVendorResponseType;
        state.loading = false;
        state.error = data.message;
      });
  },
});

export const {
  updateRole,
  updateCustomerInfo,
  updateVendorInfo,
  updateSignUpLoading,
  updateSignUpError,
  clearSignUpError,
  clearSignUpSuccess,
  clearSignUpRedirect,
} = signupSlice.actions;
export default signupSlice.reducer;
