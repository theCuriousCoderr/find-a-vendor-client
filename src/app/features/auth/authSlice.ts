import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthType, Customer } from "./interface";
import { renewToken, signOut } from "./thunk";
import { Vendor } from "@/types";
import getCacheIsAuthenticated from "@/utils/getCacheIsAuthenticated";

const initialState: AuthType = {
  isAuthenticated: getCacheIsAuthenticated(),
  customer: null,
  vendor: null,
  loggingOut: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("cacheIsAuthenticated", JSON.stringify({isAuthenticated : action.payload }))
      state.isAuthenticated = action.payload;
    },
    setCustomer: (state, action: PayloadAction<{ customer: Customer }>) => {
      state.customer = action.payload.customer;
    },
    setVendor: (state, action: PayloadAction<{ vendor: Vendor }>) => {
      state.vendor = action.payload.vendor;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOut.pending, (state) => {
        state.loggingOut = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loggingOut = false;
        state.isAuthenticated = false;
        state.customer = null;
        state.vendor = null;
      })
      .addCase(signOut.rejected, (state) => {
        state.loggingOut = false;
      }).addCase(renewToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
  },
});

export const { setIsAuthenticated, setCustomer, setVendor } = authSlice.actions;
export default authSlice.reducer;
