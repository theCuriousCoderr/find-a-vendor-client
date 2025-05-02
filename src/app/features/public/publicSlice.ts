import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAvailableProducts,
  getAvailableVendors,
  getFilteredProducts,
  getFilteredVendors,
  getMostOrderedProducts,
  getPublicProduct,
  getPublicVendor,
} from "./thunk";
import { Product, Vendor } from "@/types";
import {
  FetchAProductResponseType,
  FetchAVendorResponseType,
  FetchProductsResponseType,
  FetchVendorsResponseType,
  PublicSliceState,
} from "./interface";
import { AxiosError } from "axios";
import { FetchAProductReviewsResponseType } from "../review/interface";

const initialState: PublicSliceState = {
  mostOrderedProducts: null,
  loadingMostOrderedProducts: true,
  availableVendors: null,
  availableProducts: null,
  filteredVendors: null,
  filteredProducts: null,
  isVendorsListFilterActive: false,
  isProductsListFilterActive: false,
  vendorsList: null,
  productsList: null,
  selectedVendor: null,
  selectedVendorProducts: null,
  selectedVendorCompletedOrders: 0,
  selectedProduct: null,
  selectedProductReviews: [],
  loadingVendors: true,
  loadingProducts: true,
  loadingVendor: true,
  loadingProduct: true,
  vendorsRound: 1,
  productsRound: 1,
  slice: 15,
};

export const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    updateLoadingVendor: (
      state,
      action: PayloadAction<{ status: boolean }>
    ) => {
      state.loadingVendor = action.payload.status;
    },
    resetVendorsRound: (state) => {
      state.vendorsRound = 1;
    },
    updateVendorsRound: (state, action: PayloadAction<number | undefined>) => {
      const increment = action.payload ?? 1;
      const vendorsListLength = state.vendorsList?.length || 0;
      const underSlice = vendorsListLength < state.vendorsRound * state.slice;
      if (!underSlice) {
        state.vendorsRound += increment;
      }
    },
    updateProductsRound: (state, action: PayloadAction<number | undefined>) => {
      const increment = action.payload ?? 1;
      const productsListLength = state.productsList?.length || 0;
      const underSlice = productsListLength < state.productsRound * state.slice;
      if (!underSlice) {
        state.productsRound += increment;
      }
    },
    updateFilteredVendors: (
      state,
      action: PayloadAction<{ filteredVendors: Vendor[] }>
    ) => {
      state.filteredVendors = action.payload.filteredVendors;
      state.vendorsList = action.payload.filteredVendors;
    },
    resetFilteredVendors: (state) => {
      state.vendorsList = state.availableVendors;
    },
    updateProductReviews: (state, action: PayloadAction<FetchAProductReviewsResponseType>) => {
      state.selectedProductReviews = action.payload.productReviews
    }
  },
  extraReducers: (builder) => {
    builder
      // getAvailableVendors
      .addCase(getAvailableVendors.pending, (state) => {
        state.loadingVendors = true;
      })
      .addCase(
        getAvailableVendors.fulfilled,
        (state, action: PayloadAction<FetchVendorsResponseType>) => {
          const data = action.payload.vendorsList;
          let updatedList = state.availableVendors
            ? state.availableVendors.concat(data)
            : [...data];
          updatedList = [
            ...new Map(
              updatedList.map((vendor) => [vendor.vendor_id, vendor])
            ).values(),
          ];
          const _updateVendorsList = updateVendorsList(
            data,
            state.availableVendors
          );
          if (_updateVendorsList) {
            state.availableVendors = updatedList;
            state.vendorsList = updatedList;
          }
          state.loadingVendors = false;
        }
      )
      .addCase(getAvailableVendors.rejected, (state) => {
        state.loadingVendors = false;
      })
      // getAvailableProducts
      .addCase(getAvailableProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(
        getAvailableProducts.fulfilled,
        (state, action: PayloadAction<FetchProductsResponseType>) => {
          const data = action.payload.productsList;
          let updatedList = state.availableProducts
            ? state.availableProducts.concat(data)
            : [...data];
          const _updateVendorsList = updateVendorsList(
            data,
            state.availableProducts
          );
          updatedList = [
            ...new Map(
              updatedList.map((product) => [product._id, product])
            ).values(),
          ];
          if (_updateVendorsList) {
            state.availableProducts = updatedList;
            state.productsList = updatedList;
          }
          state.loadingProducts = false;
        }
      )
      .addCase(getAvailableProducts.rejected, (state) => {
        state.loadingProducts = false;
      })
      // getFilteredVendors
      .addCase(getFilteredVendors.pending, (state) => {
        state.loadingVendors = true;
      })
      .addCase(
        getFilteredVendors.fulfilled,
        (state, action: PayloadAction<FetchVendorsResponseType>) => {
          const data = action.payload.vendorsList;
          let updatedList = state.filteredVendors
            ? state.filteredVendors.concat(data)
            : [...data];
          const _updateVendorsList = updateVendorsList(
            data,
            state.filteredVendors
          );
          updatedList = [
            ...new Map(
              updatedList.map((vendor) => [vendor.vendor_id, vendor])
            ).values(),
          ];

          if (_updateVendorsList) {
            state.filteredVendors = updatedList;
            state.vendorsList = updatedList;
          }
          state.loadingVendors = false;
        }
      )
      .addCase(getFilteredVendors.rejected, (state) => {
        state.loadingVendors = false;
      })
      // getFilteredProducts
      .addCase(getFilteredProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(
        getFilteredProducts.fulfilled,
        (state, action: PayloadAction<FetchProductsResponseType>) => {
          const data = action.payload.productsList;
          let updatedList = state.availableProducts
            ? state.availableProducts.concat(data)
            : [...data];
          const _updateVendorsList = updateVendorsList(
            data,
            state.availableProducts
          );
          updatedList = [
            ...new Map(
              updatedList.map((product) => [product._id, product])
            ).values(),
          ];
          if (_updateVendorsList) {
            state.availableProducts = updatedList;
            state.productsList = updatedList;
          }
          state.loadingProducts = false;
        }
      )
      .addCase(getFilteredProducts.rejected, (state) => {
        state.loadingProducts = false;
      })
      // getPublicVendor
      .addCase(getPublicVendor.pending, (state) => {
        state.loadingVendor = true;
      })
      .addCase(
        getPublicVendor.fulfilled,
        (state, action: PayloadAction<FetchAVendorResponseType>) => {
          state.loadingVendor = false;
          state.selectedVendor = action.payload.vendor;
          state.selectedVendorProducts = action.payload.vendorProducts;
          state.selectedVendorCompletedOrders = action.payload.vendorCompletedOrders
        }
      )
      .addCase(getPublicVendor.rejected, (state, action) => {
        const _error = action.payload as AxiosError;
        const data = _error?.response?.data as FetchAVendorResponseType;
        state.loadingVendor = false;
        state.selectedVendor = data.vendor;
        state.selectedVendorProducts = data.vendorProducts;
      })
      // getPublicProduct
      .addCase(getPublicProduct.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(
        getPublicProduct.fulfilled,
        (state, action: PayloadAction<FetchAProductResponseType & FetchAProductReviewsResponseType>) => {
          state.loadingProduct = false;
          state.selectedProduct = action.payload.product;
          state.selectedProductReviews = action.payload.productReviews
        }
      )
      .addCase(getPublicProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        const _error = action.payload as AxiosError;
        const data = _error?.response?.data as FetchAProductResponseType;
        state.loadingProduct = false;
        state.selectedProduct = data.product;
      })
      // getMostOrderedProducts
      .addCase(getMostOrderedProducts.pending, (state) => {
        state.loadingMostOrderedProducts = true;
      })
      .addCase(
        getMostOrderedProducts.fulfilled,
        (state, action: PayloadAction<FetchProductsResponseType>) => {
          state.loadingMostOrderedProducts = false;
          state.mostOrderedProducts = action.payload.productsList;
        }
      )
      .addCase(getMostOrderedProducts.rejected, (state) => {
        state.loadingMostOrderedProducts = false;
      });
  },
});

export const {
  updateLoadingVendor,
  resetVendorsRound,
  updateVendorsRound,
  updateProductsRound,
  updateFilteredVendors,
  resetFilteredVendors,
  updateProductReviews
} = publicSlice.actions;

export default publicSlice.reducer;

function updateVendorsList(
  newData: Vendor[] | Product[],
  referenceData: Vendor[] | Product[] | null
) {
  if (!referenceData) return true; //if this is the first slice batch, update the list

  // if the same data as the one in state is not being returned back, update the list
  return Boolean(
    newData.length &&
      referenceData.length &&
      referenceData[0]._id !== newData[0]._id
  );
}
