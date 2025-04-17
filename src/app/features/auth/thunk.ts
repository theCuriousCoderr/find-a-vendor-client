import { AUTH } from "@/endpoints";
import api from "@/utils/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SignOutResponseType } from "./interface";

export const renewToken = createAsyncThunk(
  "auth/renewToken",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(AUTH.renewToken);
      // axiosinterceptor handles response with redirect status of 302
      return response.data
    } catch (error) {
      const data = (error as AxiosError).response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const signOut = createAsyncThunk<SignOutResponseType>(
  "auth/signOut",
  async (_, thunkAPI) => {
    try {
      const response = await api.post(AUTH.signOut);
      const data = response.data;
      localStorage.removeItem("cacheIsAuthenticated");
      return data;
    } catch (error) {
      const data = (error as AxiosError).response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);
