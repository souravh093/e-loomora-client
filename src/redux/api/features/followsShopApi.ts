import { QueryItem } from "@/types/global.types";
import { baseApi } from "../baseApi";

const followShopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFollow: builder.mutation({
      query: (data) => ({
        url: "/follows-shops",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Follows", "Shops"],
    }),
    checkFollow: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/follows-shops/check",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Follows", "Shops"],
    }),
    getShopByUserId: builder.query({
      query: (id) => ({
        url: `/follows-shops/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Shops"],
    }),
    unFollowShop: builder.mutation({
      query: (data) => ({
        url: "/follows-shops",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Follows", "Shops"],
    }),
  }),
});

export const {
  useCreateFollowMutation,
  useGetShopByUserIdQuery,
  useCheckFollowQuery,
  useUnFollowShopMutation,
} = followShopApi;
