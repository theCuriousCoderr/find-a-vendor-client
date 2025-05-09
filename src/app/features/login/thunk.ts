import { AUTH } from "@/endpoints";
import { CustomerInfo, VendorInfo } from "@/types";
import api from "@/utils/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  LoginCustomerResponseType,
  LoginVendorResponseType,
} from "./interface";
import { RootState } from "@/app/store";
import { setIsAuthenticated } from "../auth/authSlice";
import { getAuthenticatedCustomerNotifications } from "../customers/thunk";
import { getAuthenticatedVendorNotifications } from "../vendors/thunk";



// the login endpoint for a customer
export const logInCustomer = createAsyncThunk<
  LoginCustomerResponseType,
  CustomerInfo
>("login/logInCustomer", async (customerInfo, thunkAPI) => {
  try {
    const response = await api.post(AUTH.login.customer, customerInfo);
    const data = response.data as LoginCustomerResponseType;

    const { isAuthenticated } = (thunkAPI.getState() as RootState).auth;
    if (!isAuthenticated) {
      thunkAPI.dispatch(setIsAuthenticated(true));
    }
    await thunkAPI.dispatch(getAuthenticatedCustomerNotifications());
    localStorage.removeItem("vendor_id");
    localStorage.setItem("customer_id", data.customer_id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("refresh_token", data.refresh_token);
    return data;
  } catch (error) {
    const data = (error as AxiosError).response?.data as { message: string };
    const status = (error as AxiosError).response?.status;
    console.error(status, data.message);
    return thunkAPI.rejectWithValue(data);
  }
});

// the login endpoint for a vendor
export const logInVendor = createAsyncThunk<
  LoginVendorResponseType,
  VendorInfo
>("login/logInVendor", async (vendorInfo, thunkAPI) => {
  try {
    const response = await api.post(AUTH.login.vendor, vendorInfo);
    const data = response.data as LoginVendorResponseType;

    const { isAuthenticated } = (thunkAPI.getState() as RootState).auth;
    if (!isAuthenticated) {
      thunkAPI.dispatch(setIsAuthenticated(true));
    }
    await thunkAPI.dispatch(getAuthenticatedVendorNotifications());
    localStorage.removeItem("customer_id");
    localStorage.setItem("vendor_id", data.vendor_id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("refresh_token", data.refresh_token);

    return data;
  } catch (error) {
    const data = (error as AxiosError).response?.data as { message: string };
    const status = (error as AxiosError).response?.status;
    console.error(status, data.message);
    return thunkAPI.rejectWithValue(data);
  }
});
