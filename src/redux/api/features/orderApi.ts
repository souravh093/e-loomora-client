import { QueryItem } from "@/types/global.types";
import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getOrderByUserId: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/orders/user",
          method: "GET",
          params: params,
        };
      },
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useGetOrderByUserIdQuery,
} = orderApi;
