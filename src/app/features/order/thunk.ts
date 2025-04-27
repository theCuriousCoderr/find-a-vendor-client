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
import { getAuthenticatedCustomerNotifications, getAuthenticatedCustomerOrders } from "../customers/thunk";


export const makeOrder = createAsyncThunk<MakeOrderResponseType, OrderType>(
  "order/makeOrder",
  async (orderDetails, thunkAPI) => {
    try {
      const response = await api.post(ORDER.make_order, orderDetails);
      const data = response.data as MakeOrderResponseType;
      thunkAPI.dispatch(getAuthenticatedCustomerOrders())
      thunkAPI.dispatch(getAuthenticatedCustomerNotifications())
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
    const response = await api.post(ORDER.update_order, {
      status,
      order_id,
      vendor_id,
      customer_id,
      vendor_completed_flag,
      customer_completed_flag,
    });
    const data = response.data as UpdateOrderResponseType;
    thunkAPI.dispatch(getAuthenticatedCustomerOrders())
    thunkAPI.dispatch(getAuthenticatedCustomerNotifications())
    return data;
  } catch (error) {
    const data = (error as AxiosError).response;
    return thunkAPI.rejectWithValue(data);
  }
});
