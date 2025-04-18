import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAuthenticatedCustomerNotificationsResponseType, FetchAuthenticatedCustomerOrdersResponseType, FetchAuthenticatedCustomerResponseType } from "./interface";
import { updateStatusError } from "../status/statusSlice";
import { AxiosError } from "axios";
import { CUSTOMER } from "@/endpoints";
import api from "@/utils/axios/api";
import { updateSettingsCustomerInfo } from "../settings/settingsSlice";
import { setIsAuthenticated } from "../auth/authSlice";

export const getAuthenticatedCustomer = createAsyncThunk<
  FetchAuthenticatedCustomerResponseType
>("vendors/getAuthenticatedVendor", async (_, thunkAPI) => {
  try {
    const response = await api.get(CUSTOMER.get_customer);
    const data = response.data as FetchAuthenticatedCustomerResponseType;
    thunkAPI.dispatch(updateSettingsCustomerInfo({ customerInfo: data.customer }));
    thunkAPI.dispatch(setIsAuthenticated(true));
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    const _error = error as AxiosError;
    const data = _error?.response?.data as FetchAuthenticatedCustomerResponseType;
    thunkAPI.dispatch(updateStatusError({ error: data.message }));
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAuthenticatedCustomerNotifications = createAsyncThunk<
  FetchAuthenticatedCustomerNotificationsResponseType
>("vendors/getAuthenticatedVendorNotifications", async (_, thunkAPI) => {
  try {
    const response = await api.get(CUSTOMER.get_notifications);
    const data = response.data as FetchAuthenticatedCustomerNotificationsResponseType;
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    const _error = error as AxiosError;
    const data = _error?.response
      ?.data as FetchAuthenticatedCustomerNotificationsResponseType;
    thunkAPI.dispatch(updateStatusError({ error: data.message }));
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAuthenticatedCustomerOrders = createAsyncThunk<
  FetchAuthenticatedCustomerOrdersResponseType
>("vendors/getAuthenticatedVendorOrders", async (_, thunkAPI) => {
  try {
    const response = await api.get(CUSTOMER.get_orders);
    const data = response.data as FetchAuthenticatedCustomerOrdersResponseType;
    return data
  } catch (error) {
    console.error("Error fetching services:", error);
    const _error = error as AxiosError;
    const data = _error?.response
      ?.data as FetchAuthenticatedCustomerOrdersResponseType;
    thunkAPI.dispatch(updateStatusError({ error: data.message }));
    return thunkAPI.rejectWithValue(error);
  }
});