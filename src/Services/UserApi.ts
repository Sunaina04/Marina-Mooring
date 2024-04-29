import { createApi, fetchBaseQuery, BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react'
import { RootState } from '../Store/Store'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    return headers
  },
})

const baseQueryWithInterceptor = async (
  args: unknown,
  api: BaseQueryApi,
  extraOptions: { signal?: AbortSignal },
) => {
  const result = await baseQuery(args as FetchArgs | string, api, extraOptions)
  if (result?.error?.status === 403) {
  }
  return result
}

export const userApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({}),
})
