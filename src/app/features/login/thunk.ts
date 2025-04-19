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
import Cookies from "js-cookie";

const secure = process.env.NODE_ENV === "production";
const sameSite = secure ? "None" : "Lax";

// the login endpoint for a customer
export const logInCustomer = createAsyncThunk<
  LoginCustomerResponseType,
  CustomerInfo
>("login/logInCustomer", async (customerInfo, thunkAPI) => {
  try {
    const response = await api.post(AUTH.login.customer, customerInfo);
    const data = response.data as LoginCustomerResponseType;
    console.log(data);

    const { isAuthenticated } = (thunkAPI.getState() as RootState).auth;
    if (!isAuthenticated) {
      thunkAPI.dispatch(setIsAuthenticated(true));
    }
    Cookies.remove("vendor_id");
    Cookies.set("role", data.role, { expires: 30, secure, sameSite });
    Cookies.set("customer_id", data.customer_id, { expires: 7, secure, sameSite  });

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

    Cookies.remove("customer_id");
    Cookies.set("role", data.role, { expires: 30, secure, sameSite  });
    Cookies.set("vendor_id", data.vendor_id, { expires: 7, secure, sameSite  });

    return data;
  } catch (error) {
    const data = (error as AxiosError).response?.data as { message: string };
    const status = (error as AxiosError).response?.status;
    console.error(status, data.message);
    return thunkAPI.rejectWithValue(data);
  }
});
