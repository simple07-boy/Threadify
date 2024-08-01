import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ProductApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    getProductsBySlug: builder.query({
      query: (id:number) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery,useGetProductsBySlugQuery } = ProductApi;
