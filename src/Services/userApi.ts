import { createApi, fetchBaseQuery, BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://89a6-2401-4900-1c6f-5cca-8165-71e4-c390-35d8.ngrok-free.app/",
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).user?.userData?.token;
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //   }
  //   // Add the Host header here
  //   headers.set("Host", "example.com"); // Replace "example.com" with your desired host
  //   console.log("headers", headers, headers.get("Host"));
  //   return headers;
  // },
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
