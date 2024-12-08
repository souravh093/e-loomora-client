import { baseApi } from "../baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),
    getCoupons: builder.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
    checkCoupon: builder.query({
      query: (code) => ({
        url: `/coupons/check/${code}`,
        method: "GET",
      }),
    }),
    updateCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coupons/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useCheckCouponQuery,
} = couponApi;
