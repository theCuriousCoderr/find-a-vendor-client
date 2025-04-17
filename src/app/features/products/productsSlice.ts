import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductDetails, getProducts, getProductsTopPick } from "./thunk";
import { Product, ProductsSliceType, ProductsTopPick } from "@/types";
import { GetProductsResponseType } from "./interface";

const initialState: ProductsSliceType = {
  products: null,
  filteredProducts: null,
  loadingProducts: true,
  product: null,
  loadingProduct: true,
  loadingTopPicks: true,
  topPicks: null,
  slice: 15,
  round: 1,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductsRound: (state) => {
      state.round++;
    },
    resetFilteredProducts: (state) => {
      state.filteredProducts = state.products;
    },
     updateFilteredProducts: (
          state,
          action: PayloadAction<{ filteredProducts: Product[] }>
        ) => {
          state.filteredProducts = action.payload.filteredProducts;
        },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<GetProductsResponseType>) => {
          state.loadingProducts = false;
          state.products = action.payload.products;
          state.filteredProducts = action.payload.filteredProducts;
        }
      )
      .addCase(getProducts.rejected, (state) => {
        state.loadingProducts = false;
        state.products = null;
        state.filteredProducts = null;
      })
      .addCase(getProductsTopPick.pending, (state) => {
        state.loadingTopPicks = true;
      })
      .addCase(
        getProductsTopPick.fulfilled,
        (state, action: PayloadAction<{ topPicks: ProductsTopPick[] }>) => {
          state.loadingTopPicks = false;
          state.topPicks = action.payload.topPicks;
        }
      )
      .addCase(getProductsTopPick.rejected, (state) => {
        state.loadingTopPicks = false;
        state.topPicks = null;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(
        getProductDetails.fulfilled,
        (state, action: PayloadAction<{ product: Product }>) => {
          state.loadingProduct = false;
          state.product = action.payload.product;
        }
      )
      .addCase(getProductDetails.rejected, (state) => {
        state.loadingProduct = false;
        state.product = null;
      });
  },
});

export const { updateProductsRound, resetFilteredProducts, updateFilteredProducts } = productsSlice.actions;
export default productsSlice.reducer;
