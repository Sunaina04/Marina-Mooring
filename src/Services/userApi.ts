import { createApi, fetchBaseQuery, BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.surflokal.com/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user?.userData?.token;
    headers.set("security_key", `SurfLokal52`);
    const guestToken = localStorage.getItem("guestToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else if (guestToken) {
      headers.set("Authorization", `Bearer ${guestToken}`);
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
  const toast = useRef<Toast | null>(null); // Explicitly provide type annotation
  if (result?.error?.status === 403) {
    toast?.current?.show([
      { sticky: true, life: 4000, severity: 'error', summary: 'Error', detail: 'Session Expired', closable: false }
    ]);
  }
  return result;
};

export const userApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
