import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import categoryService from "./services/categoryService";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import productService from "./services/productService";
import homeProducts from "./services/homeProducts";
import cartReducer from "./reducers/cartReducer";
import paymentService from "./services/paymentService";

const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProducts.reducerPath]: homeProducts.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
    cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      categoryService.middleware,
      productService.middleware,
      homeProducts.middleware,
      paymentService.middleware,
    ]),
});

export default Store;
