import bags_products from "@/static-data/products";
import productsTopPicksCardsInfo from "@/static-data/products-top-picks-cards";
import { Product, ProductFilter, ProductsTopPick } from "@/types";
// import api from "@/utils/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetProductsArgumentsType, GetProductsResponseType } from "./interface";
import { RootState } from "@/app/store";
import products from "@/static-data/products";
import filterProducts from "@/utils/products/filterProducts";

// createAsyncThunk<Service[], void> = createAsyncThunk<Response, Arguments>()

// Fetch Top Picks services, based on most ordered
export const getProductsTopPick = createAsyncThunk(
  "products/getProductsTopPick",
  async (_, { rejectWithValue }) => {
    // simulate async fetching with setTimeout
    try {
      const sliceStop = 9;
      const response = await new Promise<{ topPicks: ProductsTopPick[] }>(
        (resolve) => {
          setTimeout(() => {
            const topPicks = bags_products.slice(0, sliceStop).map((image) => ({
              src: image.images[0],
              vendor_id: image.vendor_id,
            }));
            const _cardsCopy: ProductsTopPick[] = productsTopPicksCardsInfo
              .slice(0, sliceStop)
              .map((item, index) => ({
                ...item,
                src: topPicks[index],
              }));
            resolve({ topPicks: _cardsCopy });
          }, 2000);
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching services:", error);
      return rejectWithValue(error);
    }
  }
);

export const getProductDetails = createAsyncThunk<
  { product: Product },
  ProductFilter
>(
  "products/getProductDetails",
  async (productFilter: ProductFilter, thunkAPI) => {
    const { vendor_id, category, product_id } = productFilter;
    // simulate async fetching with setTimeout
    try {
      const response = await new Promise<{ product: Product }>(
        (resolve, reject) => {
          setTimeout(() => {
            const _product = bags_products.find(
              (product) =>
                product.vendor_id.toString() === vendor_id &&
                product.category === category &&
                product._id.toString() === product_id
            );
            if (_product) {
              resolve({ product: _product as Product });
            } else {
              reject(new Error("No product matches such filter"));
            }
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

export const getProducts = createAsyncThunk<
  GetProductsResponseType,
  GetProductsArgumentsType
>("products/getProducts", async ({ round, slice }, thunkAPI) => {
  // simulate async fetching with setTimeout
  try {
    const { productFilters, productSearch } = (thunkAPI.getState() as RootState)
      .dropdownFilter;
    const response = await new Promise<GetProductsResponseType>((resolve) => {
      setTimeout(() => {
        const _products = products.slice(0, round * slice) as Product[];
        const _filteredProducts = productSearch
          ? filterProducts(_products as Product[], productSearch)
          : filterProducts(_products as Product[], productFilters);
        resolve({ products: _products, filteredProducts: _filteredProducts });
      }, 2000);
    });
    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
    return thunkAPI.rejectWithValue(error);
  }
});
