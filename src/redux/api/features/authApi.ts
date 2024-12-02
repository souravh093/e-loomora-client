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
        url: "/auths/login",
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/auths/forget-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auths/reset-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignUpVendorMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
