import { REVIEW } from "@/endpoints";
import { ReviewType } from "@/types";
import api from "@/utils/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchAProductReviewsArgumentsType,
  FetchAProductReviewsResponseType,
} from "./interface";
import { updateProductReviews } from "../public/publicSlice";

export const addReview = createAsyncThunk<void, ReviewType>(
  "review/addReview",
  async (review, thunkAPI) => {
    // simulate async fetching with setTimeout
    try {
      const response = await api.post(REVIEW.add_review, { ...review });
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductReviews = createAsyncThunk<
  FetchAProductReviewsResponseType,
  FetchAProductReviewsArgumentsType
>(
  "review/getProductReviews",
  async ({ vendor_id, category, product_id }, thunkAPI) => {
    try {
      const queryParam = `?vendor_id=${vendor_id}&product_id=${product_id}&category=${category}`;
      const fullEndpoint = `${REVIEW.get_reviews}${queryParam}`;
      const response = await api.get(fullEndpoint);
      const data = response.data as FetchAProductReviewsResponseType;
      thunkAPI.dispatch(updateProductReviews(data));
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
