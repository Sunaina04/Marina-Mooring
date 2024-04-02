import { createApi, fetchBaseQuery, BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://mhtjnn.github.io/marina-mooring-management/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


const baseQueryWithInterceptor = async (
  args: unknown,
  api: BaseQueryApi,
  extraOptions: { signal?: AbortSignal },
) => {
  const result = await baseQuery(args as FetchArgs | string, api, extraOptions);
  // const toast = useRef<Toast | null>(null); // Explicitly provide type annotation
  if (result?.error?.status === 403) {
    // toast?.current?.show([
    //   { sticky: true, life: 4000, severity: 'error', summary: 'Error', detail: 'Session Expired', closable: false }
    // ]);
  }
  return result;
};

export const userApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
