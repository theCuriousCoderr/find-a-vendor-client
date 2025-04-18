import { AUTH } from "@/endpoints";
import { CustomerInfo, VendorInfo } from "@/types";
import api from "@/utils/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  SignUpCustomerResponseType,
  SignUpVendorResponseType,
} from "./interface";
import { RootState } from "@/app/store";
import { setIsAuthenticated } from "../auth/authSlice";

// the signup endpoint for a customer
export const signUpCustomer = createAsyncThunk<
  SignUpCustomerResponseType,
  CustomerInfo
>("signup/signUpCustomer", async (customerInfo, thunkAPI) => {
  try {
    const response = await api.post(AUTH.signup.customer, customerInfo);
    const data = response.data as SignUpCustomerResponseType;
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

// the signup endpoint for a customer
export const signUpVendor = createAsyncThunk<
  SignUpVendorResponseType,
  VendorInfo
>("signup/signUpVendor", async (vendorInfo, thunkAPI) => {
  try {
    const response = await api.post(AUTH.signup.vendor, vendorInfo);
    const data = response.data as SignUpVendorResponseType;
    if (response.status === 201) {
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
