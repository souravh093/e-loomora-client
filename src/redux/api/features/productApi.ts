import { QueryItem } from "@/types/global.types";
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getUsers: builder.query({
    //   query: (query) => {
    //     const params = new URLSearchParams();

    //     if (query) {
    //       query.forEach((item: QueryItem) => {
    //         params.append(item.name, item.value);
    //       });
    //     }

    //     return {
    //       url: "/users",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["Users"],
    // }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
} = userApi;
