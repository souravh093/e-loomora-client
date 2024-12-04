import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (shopId) => ({
        url: `/reviews/${shopId}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
  }),
});

export const { useGetReviewsQuery } = reviewApi;
