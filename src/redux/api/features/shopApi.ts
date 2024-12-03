import { QueryItem } from "@/types/global.types";
import { baseApi } from "../baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/shops",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Shops"],
    }),

    updateShop: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shops/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Shops"],
    }),
  }),
});

export const { useGetShopsQuery, useUpdateShopMutation } = shopApi;
