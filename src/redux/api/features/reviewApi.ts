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

    addReview: builder.mutation({
      query: (review) => ({
        url: `/reviews`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Reviews", "Products"],
    }),
  }),
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewApi;
