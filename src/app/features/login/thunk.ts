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

const headers = {
  "Content-Type": "application/json",
};

// the login endpoint for a customer
export const logInCustomer = createAsyncThunk<
  LoginCustomerResponseType,
  CustomerInfo
>("login/logInCustomer", async (customerInfo, thunkAPI) => {
  try {
    const response = await api.post(AUTH.login.customer, customerInfo, {
      headers,
    });
    const data = response.data as LoginCustomerResponseType;
    
      const { isAuthenticated } = (thunkAPI.getState() as RootState).auth;
      if (!isAuthenticated) {
        thunkAPI.dispatch(setIsAuthenticated(true));
      }
    
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
    const response = await api.post(AUTH.login.vendor, vendorInfo, {
      headers,
    });
    const data = response.data as LoginVendorResponseType;
    if (response.status === 201) {
      const { isAuthenticated } = (thunkAPI.getState() as RootState).auth;
      if (!isAuthenticated) {
        thunkAPI.dispatch(setIsAuthenticated(true));
      }
    }
    return data;
  } catch (error) {
    const data = (error as AxiosError).response?.data as { message: string };
    const status = (error as AxiosError).response?.status;
    console.error(status, data.message);
    return thunkAPI.rejectWithValue(data);
  }
});
