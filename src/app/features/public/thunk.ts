import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchAProductArgumentsType,
  FetchAProductResponseType,
  FetchAVendorArgumentsType,
  FetchAVendorResponseType,
  FetchProductsArgumentsType,
  FetchProductsResponseType,
  FetchVendorsArgumentsType,
  FetchVendorsResponseType,
} from "./interface";
import { RootState } from "@/app/store";
import { Product, Vendor } from "@/types";
// import vendors from "@/static-data/vendors";
import filterVendors from "@/utils/vendors/filterVendors";
import vendorProducts from "@/static-data/products";
import filterProducts from "@/utils/products/filterProducts";
import api from "@/utils/axios/api";
import { PUBLIC } from "@/endpoints";
import { AxiosError } from "axios";
import { updateStatusError } from "../status/statusSlice";

// populate vendors list on /vendors by scrolling
// get list of vendors by default (as you scroll)
export const getAvailableVendors = createAsyncThunk<
  FetchVendorsResponseType,
  FetchVendorsArgumentsType
>("public/getAvailableVendors", async ({ round, slice }, thunkAPI) => {
  // simulate async fetching with setTimeout
  try {
    const queryParam = `?round=${round}&slice=${slice}`;
    const fullEndpoint = `${PUBLIC.get_vendors}${queryParam}`;
    const response = await api.get(fullEndpoint);
    const data = response.data as FetchVendorsResponseType;
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

// populate products list on /products/all by scrolling
// get list of products by default (as you scroll)
export const getAvailableProducts = createAsyncThunk<
  FetchProductsResponseType,
  FetchProductsArgumentsType
>("public/getAvailableProducts", async ({ round, slice }, thunkAPI) => {
  // simulate async fetching with setTimeout
  try {
    const queryParam = `?round=${round}&slice=${slice}`;
    const fullEndpoint = `${PUBLIC.get_products}${queryParam}`;
    const response = await api.get(fullEndpoint);
    const { productsList } = response.data as FetchProductsResponseType;
    return { productsList };
  } catch (error) {
    console.error("Error fetching services:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

// populate vendors list on /vendors by filter
// get list of vendors by using a filter
export const getFilteredVendors = createAsyncThunk<
  FetchVendorsResponseType,
  FetchVendorsArgumentsType
>("public/getFilteredVendors", async ({ round, slice }, thunkAPI) => {
  // simulate async fetching with setTimeout
  try {
    const { vendorFilters, vendorSearch } = (thunkAPI.getState() as RootState)
      .dropdownFilter;

    const queryParam = `?round=${round}&slice=${slice}`;
    const fullEndpoint = `${PUBLIC.get_vendors}${queryParam}`;
    const response = await api.get(fullEndpoint);
    const { message, vendorsList } = response.data as FetchVendorsResponseType;
    const _filteredVendors = vendorSearch
      ? filterVendors(vendorsList as Vendor[], vendorSearch)
      : filterVendors(vendorsList as Vendor[], vendorFilters);
    return { message, vendorsList: _filteredVendors };
  } catch (error) {
    console.error("Error fetching services:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

// populate products list on /products/all by filter
// get list of products by using a filter
export const getFilteredProducts = createAsyncThunk<
  FetchProductsResponseType,
  FetchProductsArgumentsType
>("public/getFilteredProducts", async ({ round, slice }, thunkAPI) => {
  // simulate async fetching with setTimeout
  try {
    const { productFilters, productSearch } = (thunkAPI.getState() as RootState)
      .dropdownFilter;
    const response = await new Promise<FetchProductsResponseType>((resolve) => {
      setTimeout(() => {
        const sliceStart = (round - 1) * slice;
        const sliceEnd = round * slice;
        const _products = vendorProducts.slice(
          sliceStart,
          sliceEnd
        ) as Product[];
        const _filteredProducts = productSearch
          ? filterProducts(_products as Product[], productSearch)
          : filterProducts(_products as Product[], productFilters);
        resolve({ productsList: _filteredProducts });
      }, 2000);
    });
    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

// get details about a vendor using vendor_id
export const getPublicVendor = createAsyncThunk<
  FetchAVendorResponseType,
  FetchAVendorArgumentsType
>("public/getPublicVendor", async ({ vendor_id }, thunkAPI) => {
  try {
    const endpoint = `${PUBLIC.get_vendor}/${vendor_id}`;
    const response = await api.get(endpoint);
    const data = response.data as FetchAVendorResponseType;
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

// get details about a product using search params
export const getPublicProduct = createAsyncThunk<
  FetchAProductResponseType,
  FetchAProductArgumentsType
>(
  "public/getPublicProduct",
  async ({ vendor_id, category, product_id }, thunkAPI) => {
    // simulate async fetching with setTimeout
    try {
      const queryParam = `?vendor_id=${vendor_id}&product_id=${product_id}&category=${category}`;
      const fullEndpoint = `${PUBLIC.get_product}${queryParam}`;
      const response = await api.get(fullEndpoint);
      const data = response.data as FetchAProductResponseType;
      return data;
    } catch (error) {
      console.error("Error fetching services:", error);
      const _error = error as AxiosError;
      const data = _error?.response?.data as FetchAProductResponseType;
      thunkAPI.dispatch(updateStatusError({ error: data.message }));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// get most ordered products to display on the landing page
export const getMostOrderedProducts =
  createAsyncThunk<FetchProductsResponseType>(
    "public/getMostOrderedProducts1",
    async (_, thunkAPI) => {
      // simulate async fetching with setTimeout
      try {
        const response = await new Promise<FetchProductsResponseType>(
          (resolve) => {
            setTimeout(() => {
              const _products = vendorProducts.slice(0, 10) as Product[];
              resolve({ productsList: _products });
            }, 2000);
          }
        );

        return response;
      } catch (error) {
        console.error("Error fetching services:", error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
