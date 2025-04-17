import { configureStore } from "@reduxjs/toolkit";
import dropdownFilterReducer from "./features/dropdownFilter/dropdownFilterSlice";
import signupReducer from "./features/signup/signupSlice";
import loginReducer from "./features/login/loginSlice"
import productsReducer from "./features/products/productsSlice"
import vendorsReducer from "./features/vendors/vendorsSlice"
import authReducer from "./features/auth/authSlice"
import notificationReducer from "./features/notification/notificationSlice"
import orderReducer from "./features/order/orderSlice"
import settingsReducer from "./features/settings/settingsSlice"
import statusReducer from "./features/status/statusSlice"
import publicReducer from "./features/public/publicSlice"
import customersReducer from "./features/customers/customersSlice"

export const store = configureStore({
  reducer: {
    dropdownFilter: dropdownFilterReducer,
    customers: customersReducer,
    signup: signupReducer,
    login:loginReducer,
    products: productsReducer,
    vendors: vendorsReducer,
    auth: authReducer,
    notification: notificationReducer,
    order: orderReducer,
    settings: settingsReducer,
    status: statusReducer,
    public: publicReducer,

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
