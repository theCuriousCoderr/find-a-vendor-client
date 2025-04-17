import { DropDownFilterState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TypeVariants = "vendors" | "products";

const initialState: DropDownFilterState = {
  vendorFilters: [],
  vendorSearch: "",
  productFilters: [],
  productSearch: "",
};

export const dropdownFilterSlice = createSlice({
  name: "dropdownFilter",
  initialState,
  reducers: {
    addFilterOption: (state, action: PayloadAction<string[]>) => {
      state.vendorFilters = action.payload;
    },
    removeFilterOption: (state, action: PayloadAction<string>) => {
      state.vendorFilters = state.vendorFilters.filter(
        (_option) => _option !== action.payload
      );
    },
    updateFilter: (
      state,
      action: PayloadAction<{ type: TypeVariants; data: string[] }>
    ) => {
      if (action.payload.type === "vendors") {
        state.vendorFilters = action.payload.data;
        state.vendorSearch = "";
      } else {
        state.productFilters = action.payload.data;
        state.productSearch = "";
      }
    },
    updateSearch: (
      state,
      action: PayloadAction<{ type: TypeVariants; data: string }>
    ) => {
      if (action.payload.type === "vendors") {
        state.vendorSearch = action.payload.data;
        state.vendorFilters = [];
      } else {
        state.productSearch = action.payload.data;
        state.productFilters = [];
      }
    },
    resetFilter: (state, action: PayloadAction<{ type: TypeVariants }>) => {
      if (action.payload.type === "vendors") {
        state.vendorFilters = [];
      } else {
        state.productFilters = [];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addFilterOption,
  removeFilterOption,
  updateFilter,
  updateSearch,
  resetFilter,
} = dropdownFilterSlice.actions;

export default dropdownFilterSlice.reducer;
