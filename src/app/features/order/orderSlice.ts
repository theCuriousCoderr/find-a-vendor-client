import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  vendor_count: null,
  customer_count: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
   
  },
 
});

export const {  } = orderSlice.actions;
export default orderSlice.reducer;
