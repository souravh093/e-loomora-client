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
    getAllInfo: builder.query({
      query: () => ({
        url: "/orders/all-info",
        method: "GET",
      }),
    }),
    getOrdersByUserId: builder.query({
      query: () => ({
        url: "/orders/payment",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getCustomerOrdersStatus: builder.query({
      query: () => {
        return {
          url: "/orders/customer/status",
          method: "GET",
        };
      },
      providesTags: ["Orders"],
    }),
    getCustomerOrdersCountByDay: builder.query({
      query: () => {
        return {
          url: "/orders/customer/day-of-week",
          method: "GET",
        };
      },
      providesTags: ["Orders"],
    }),
    getCustomerOrdersCountByMonth: builder.query({
      query: () => {
        return {
          url: "/orders/customer/month",
          method: "GET",
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
    getOrderCountByWeek: builder.query({
      query: (shopId) => ({
        url: `/orders/week/${shopId}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getOrderCountByMonth: builder.query({
      query: (shopId) => ({
        url: `/orders/month/${shopId}`,
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
  useGetOrdersByUserIdQuery,
  useGetOrderCountByWeekQuery,
  useGetOrderCountByMonthQuery,
  useGetAllInfoQuery,
  useGetCustomerOrdersStatusQuery,
  useGetCustomerOrdersCountByDayQuery,
  useGetCustomerOrdersCountByMonthQuery,
} = orderApi;
