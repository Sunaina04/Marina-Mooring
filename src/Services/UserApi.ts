import { createApi, fetchBaseQuery, BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react'
import { RootState } from '../Store/Store'

// Function to fetch base query with interceptor
const baseQueryWithInterceptor = async (
  args: unknown,
  api: BaseQueryApi,
  extraOptions: { signal?: AbortSignal },
) => {
  try {
    const result = await baseQuery(args as FetchArgs | string, api, extraOptions)
    return result
  } catch (error: any) {
    console.log('in catch', error)
    if (error.status === 401 || error.status === 500) {
      const token = sessionStorage.getItem('refreshToken')
      const newToken = await refreshToken(token)
      return baseQuery(args as FetchArgs | string, api, extraOptions)
    }
    throw error
  }
}

// Function to refresh token
const refreshToken = async (refreshToken: any) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/refresh?refreshToken=${refreshToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }
    const data = await response.json()
    return data.token
  } catch (error) {
    console.error('Error refreshing token:', error)
    throw error
  }
}

// Fetch base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState, endpoint, extra }) => {
    const token = (getState() as RootState).user.token || sessionStorage.getItem('token')
    const noAuthEndpoints = ['login', 'resetPassword', 'forgetPassword']
    if (token && !noAuthEndpoints.includes(endpoint)) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// Create API client
export const userApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({}),
})
