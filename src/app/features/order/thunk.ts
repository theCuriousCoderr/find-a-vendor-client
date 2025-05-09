import { ORDER } from "@/endpoints";
import { OrderType } from "@/types";
import api from "@/utils/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  MakeOrderResponseType,
  UpdateOrderArgumentType,
  UpdateOrderResponseType,
} from "./interface";
import {
  getAuthenticatedCustomerNotifications,
  getAuthenticatedCustomerOrders,
} from "../customers/thunk";
import isUserAuthenticated from "@/utils/isUserAuthenticated";
import {
  getAuthenticatedVendorNotifications,
  getAuthenticatedVendorOrders,
} from "../vendors/thunk";
const _customer_id = isUserAuthenticated()?.customer_id || null;
const _vendor_id = isUserAuthenticated()?.vendor_id || null;

export const makeOrder = createAsyncThunk<MakeOrderResponseType, OrderType>(
  "order/makeOrder",
  async (orderDetails, thunkAPI) => {
    try {
      const response = await api.post(ORDER.make_order, orderDetails);
      const data = response.data as MakeOrderResponseType;
      if (_customer_id) {
        thunkAPI.dispatch(getAuthenticatedCustomerOrders());
        thunkAPI.dispatch(getAuthenticatedCustomerNotifications());
      }

      return data;
    } catch (error) {
      const data = (error as AxiosError).response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const updateOrder = createAsyncThunk<
  UpdateOrderResponseType,
  UpdateOrderArgumentType
>("order/updateOrder", async ({ order }, thunkAPI) => {
  try {
    const {
      status,
      order_id,
      vendor_id,
      customer_id,
      vendor_completed_flag,
      customer_completed_flag,
    } = order;
    const response = await api.put(ORDER.update_order, {
      status,
      order_id,
      vendor_id,
      customer_id,
      vendor_completed_flag,
      customer_completed_flag,
    });
    const data = response.data as UpdateOrderResponseType;
    if (_customer_id) {
      await thunkAPI.dispatch(getAuthenticatedCustomerOrders());
      await thunkAPI.dispatch(getAuthenticatedCustomerNotifications());
    }
    if (_vendor_id) {
      await thunkAPI.dispatch(getAuthenticatedVendorOrders());
      await thunkAPI.dispatch(getAuthenticatedVendorNotifications());
    }
    return data;
  } catch (error) {
    const data = (error as AxiosError).response;
    return thunkAPI.rejectWithValue(data);
  }
});
