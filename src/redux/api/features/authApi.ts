import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (payload) => ({
        url: "/users/customer",
        method: "POST",
        body: payload,
      }),
    }),
    signUpVendor: builder.mutation({
      query: (payload) => ({
        url: "/users/vendor",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignUpVendorMutation,
  useLoginMutation,
} = authApi;
