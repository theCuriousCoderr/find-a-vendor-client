import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddAuthenticatedVendorProductArgumentsType,
  FetchAuthenticatedVendorNotificationsResponseType,
  FetchAuthenticatedVendorOrdersResponseType,
  FetchAuthenticatedVendorResponseType,
  FetchCustomerInfoArgumentType,
  FetchCustomerInfoResponseType,
} from "./interface";
import api from "@/utils/axios/api";
import { PRODUCT, VENDOR } from "@/endpoints";
import { updateSettingsVendorInfo } from "../settings/settingsSlice";
import { setIsAuthenticated } from "../auth/authSlice";
import { Vendor } from "@/types";
import { AxiosError } from "axios";
import { updateStatusError } from "../status/statusSlice";

export const getAuthenticatedVendor = createAsyncThunk<
  FetchAuthenticatedVendorResponseType
>("vendors/getAuthenticatedVendor", async (_, thunkAPI) => {
  try {
    const response = await api.get(VENDOR.get_vendor);
    const data = response.data as FetchAuthenticatedVendorResponseType;
    thunkAPI.dispatch(getAuthenticatedVendorNotifications())
    thunkAPI.dispatch(getAuthenticatedVendorOrders())
    thunkAPI.dispatch(updateSettingsVendorInfo({ vendorInfo: data.vendor }));
    thunkAPI.dispatch(setIsAuthenticated(true));
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    const _error = error as AxiosError;
    const data = _error?.response?.data as FetchAuthenticatedVendorResponseType;
    thunkAPI.dispatch(updateStatusError({ error: data.message }));
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAuthenticatedVendorOrders =
  createAsyncThunk<FetchAuthenticatedVendorOrdersResponseType>(
    "vendors/getAuthenticatedVendorOrders",
    async (_, thunkAPI) => {
      try {
        const response = await api.get(VENDOR.get_orders);
        const data =
          response.data as FetchAuthenticatedVendorOrdersResponseType;
        return data;
      } catch (error) {
        console.error("Error fetching services:", error);
        const _error = error as AxiosError;
        const data = _error?.response
          ?.data as FetchAuthenticatedVendorOrdersResponseType;
        thunkAPI.dispatch(updateStatusError({ error: data.message }));
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getAuthenticatedVendorNotifications =
  createAsyncThunk<FetchAuthenticatedVendorNotificationsResponseType>(
    "vendors/getAuthenticatedVendorNotifications",
    async (_, thunkAPI) => {
      try {
        // const endpoint = `${VENDOR.get_orders}/${vendor_id}`;
        const response = await api.get(VENDOR.get_notifications);
        const data =
          response.data as FetchAuthenticatedVendorNotificationsResponseType;
        return data;
      } catch (error) {
        console.error("Error fetching services:", error);
        const _error = error as AxiosError;
        const data = _error?.response
          ?.data as FetchAuthenticatedVendorNotificationsResponseType;
        thunkAPI.dispatch(updateStatusError({ error: data.message }));
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const addAuthenticatedVendorProduct = createAsyncThunk<
  { message: string },
  AddAuthenticatedVendorProductArgumentsType
>("vendors/addAuthenticatedVendorProduct", async (productToAdd, thunkAPI) => {
  try {
    const response = await api.post(PRODUCT.add_product, productToAdd);
    const data = response.data;
    await thunkAPI.dispatch(getAuthenticatedVendor());
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const editAuthenticatedVendorProduct = createAsyncThunk<
  { message: string },
  AddAuthenticatedVendorProductArgumentsType
>("vendors/addAuthenticatedVendorProduct", async (productToEdit, thunkAPI) => {
  try {
    const response = await api.put(PRODUCT.edit_product, productToEdit);
    const data = response.data;
    await thunkAPI.dispatch(getAuthenticatedVendor());
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteAuthenticatedVendorProduct = createAsyncThunk<
  { message: string },
  AddAuthenticatedVendorProductArgumentsType
>("vendors/addAuthenticatedVendorProduct", async (productToDelete, thunkAPI) => {
  try {
    const { category, vendor_id, product_id } = productToDelete;
    const response = await api.post(PRODUCT.delete_product, { category, vendor_id, product_id });
    const data = response.data;
    await thunkAPI.dispatch(getAuthenticatedVendor());
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteAuthenticatedVendorCategory = createAsyncThunk<
  { message: string },
  { category: string; vendor: Vendor }
>(
  "vendors/deleteAuthenticatedVendorCategory",
  async ({ category, vendor }, thunkAPI) => {
    try {
      const response = await api.post(PRODUCT.delete_category, {
        category,
        vendor,
      });

      const data = response.data;
      await thunkAPI.dispatch(getAuthenticatedVendor());
      return data;
    } catch (error) {
      console.error("Error fetching services:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCustomerInfo = createAsyncThunk<
  FetchCustomerInfoResponseType,
  FetchCustomerInfoArgumentType
>("vendors/getCustomerInfo", async ({ customer_id }, thunkAPI) => {
  try {
    const endpoint = `${VENDOR.get_customer}/${customer_id}`;
    const response = await api.get(endpoint);
    const data = response.data as FetchCustomerInfoResponseType;
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    const _error = error as AxiosError;
    const data = _error?.response?.data as FetchCustomerInfoResponseType;
    thunkAPI.dispatch(updateStatusError({ error: data.message }));
    return thunkAPI.rejectWithValue(error);
  }
});
