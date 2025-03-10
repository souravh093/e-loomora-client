import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout } from "./features/authSlice"; // Import your logout action

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://e-loomora-server.onrender.com/api/v1",
  baseUrl: "https://e-loomora-server.vercel.app/api/v1",
  // baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Users",
    "Shops",
    "Categories",
    "Payments",
    "Products",
    "Reviews",
    "Orders",
    "Follows",
    "Coupons",
    "Subscriptions",
    "Profile",
  ],
  endpoints: () => ({}),
});
