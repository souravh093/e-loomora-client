import { QueryItem } from "@/types/global.types";
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),
    updateUsers: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUsersMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = userApi;
