import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
  reducerPath: "products",
  tagTypes: "products",
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
            url: "/product",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      updateProduct: builder.mutation({
        query: (data) => {
          return {
            url: `/product`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      deleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["products"],
      }),
      getProducts: builder.query({
        query: (page) => {
          return {
            url: `/products/${page}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getProduct: builder.query({
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
    };
  },
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productService;

export default productService;
