import { NOTIFICATION } from "@/endpoints";
import api from "@/utils/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";



export const readNotification = createAsyncThunk<
  {message: string},
  { notification_id: string }
>("notification/readNotification", async ({ notification_id }, thunkAPI) => {
  try {
    const response = await api.post(NOTIFICATION.read_notification, {
      notification_id,
    });
    return response.data as {message: string};
  } catch (error) {
    const data = (error as AxiosError).response;
    return thunkAPI.rejectWithValue(data);
  }
});
