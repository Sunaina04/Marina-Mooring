import { createApi, fetchBaseQuery, BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react'
import { RootState } from '../Store/Store'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).user.token
    const token = localStorage.getItem('token')
    console.log('token', token)
    if (token) {
      return {
        ...headers,
        Authorization: `Bearer ${token}`,
      }
    }

    return headers
  },
})

const baseQueryWithInterceptor = async (
  args: unknown,
  api: BaseQueryApi,
  extraOptions: { signal?: AbortSignal },
) => {
  const result = await baseQuery(args as FetchArgs | string, api, extraOptions)
  return result
}

export const userApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({}),
})
