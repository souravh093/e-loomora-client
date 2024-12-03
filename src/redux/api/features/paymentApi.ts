import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => {
        return {
          url: "/payments",
          method: "GET",
        };
      },
      providesTags: ["Payments"],
    }),
  }),
});

export const { useGetTransactionsQuery } = paymentApi;
