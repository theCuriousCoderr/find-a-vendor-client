import { RootState } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  UpdateCustomerDetailsArgumentType,
  UpdateCustomerDetailsResponseType,
  UpdateVendorDetailsArgumentType,
  UpdateVendorDetailsResponseType,
} from "./interface";
import api from "@/utils/axios/api";
import { CUSTOMER, VENDOR } from "@/endpoints";
import { AxiosError } from "axios";
import { updateStatusError } from "../status/statusSlice";
import {
  updateSettingsCustomerInfo,
  updateSettingsVendorInfo,
} from "./settingsSlice";
import { Customer, Vendor } from "@/types";
import { getAuthenticatedVendor } from "../vendors/thunk";
import { getAuthenticatedCustomer } from "../customers/thunk";
// import { Vendor } from "../vendors/interface";

export const updateVendorDetails = createAsyncThunk<
  UpdateVendorDetailsResponseType,
  UpdateVendorDetailsArgumentType
>("settings/updateVendorDetails", async ({ vendorInfo }, thunkAPI) => {
  const _vendorInfo = (thunkAPI.getState() as RootState).settings.vendorInfo;

  vendorInfo = vendorInfo ? vendorInfo : (_vendorInfo as Vendor);

  try {
    const vendor = (thunkAPI.getState() as RootState).vendors
      .authenticatedVendor;
    if (JSON.stringify(vendor) === JSON.stringify(vendorInfo)) return;
    const response = await api.put(VENDOR.update_vendor, {
      ...vendorInfo,
    });
    await thunkAPI.dispatch(getAuthenticatedVendor());
    thunkAPI.dispatch(updateSettingsVendorInfo({ vendorInfo }));
    return response.data;
  } catch (error) {
    const data = (error as AxiosError).response?.data as { message: string };
    console.error("Error Updating Vendor Details:", error);
    thunkAPI.dispatch(updateStatusError({ error: data.message }));
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateCustomerDetails = createAsyncThunk<
  UpdateCustomerDetailsResponseType,
  UpdateCustomerDetailsArgumentType
>("settings/updateVendorDetails", async ({ customerInfo }, thunkAPI) => {
  const _customerInfo = (thunkAPI.getState() as RootState).settings
    .customerInfo;

  customerInfo = customerInfo ? customerInfo : (_customerInfo as Customer);

  try {
    const customer = (thunkAPI.getState() as RootState).customers
      .authenticatedCustomer;
    if (JSON.stringify(customer) === JSON.stringify(customerInfo)) return;
    const response = await api.put(CUSTOMER.update_customer, {
      ...customerInfo,
    });
    await thunkAPI.dispatch(getAuthenticatedCustomer());
    thunkAPI.dispatch(updateSettingsCustomerInfo({ customerInfo }));
    return response.data;
  } catch (error) {
    const data = (error as AxiosError).response
      ?.data as UpdateCustomerDetailsResponseType;
    console.error("Error Updating Vendor Details:", error);
    thunkAPI.dispatch(updateStatusError({ error: data.message }));
    return thunkAPI.rejectWithValue(error);
  }
});
