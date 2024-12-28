import { baseApi } from "../baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscriptions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscriptions"],
    }),
    getSubscriptions: builder.query({
      query: () => ({
        url: "/subscriptions",
        method: "GET",
      }),
      providesTags: ["Subscriptions"],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriptions"],
    }),
  }),
});

export const {
  useAddSubscriptionMutation,
  useGetSubscriptionsQuery,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
