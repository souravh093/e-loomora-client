import { QueryItem } from "@/types/global.types";
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Products"],
    }),
    getPrioritizeProducts: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/products/prioritize",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    createProductImage: builder.mutation({
      query: (data) => ({
        url: `/products/product-image`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProductImage: builder.mutation({
      query: (id) => ({
        url: `/products/product-image/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useCreateProductImageMutation,
  useDeleteProductImageMutation,
  useGetPrioritizeProductsQuery,
} = userApi;
