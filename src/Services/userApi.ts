import {
  createApi,
  fetchBaseQuery,
  BaseQueryApi,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8082/",
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token; // Assuming you have a slice in your Redux store for authentication
    // if (token) {
      // headers.set("Authorization", `Bearer ${token}`);
    // }
    return headers;
  },
});

const baseQueryWithInterceptor = async (
  args: unknown,
  api: BaseQueryApi,
  extraOptions: { signal?: AbortSignal }
) => {
  const result = await baseQuery(args as FetchArgs | string, api, extraOptions);
  if (result?.error?.status === 403) {
    // Handle 403 error here
  }
  return result;
};

export const userApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({}),
});
