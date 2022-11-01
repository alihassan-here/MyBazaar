import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3060/api/",
    prepareHeaders: (headers, state) => {
      const allReducers = state.getState();
      const token = allReducers?.authReducer?.adminToken;
      headers.set("Authorization", token ? "Bearer " + token : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      createProduct: builder.mutation({
        query: (data) => {
          return {
            url: "/create-product",
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export const { useCreateProductMutation } = productService;

export default productService;
