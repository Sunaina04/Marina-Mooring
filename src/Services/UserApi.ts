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
    if (result?.error?.status === 500 || result?.error?.status === 401) {
      const token = sessionStorage.getItem('refreshToken')
      await refreshToken(token)
      return baseQuery(args as FetchArgs | string, api, extraOptions)
    }
    return result
  } catch (error: any) {
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
    if (data?.status === 200) {
      sessionStorage.setItem('getRefreshToken', data.token)
      return data.token
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
    throw error
  }
}

// Fetch base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState, endpoint, extra }) => {
    if (
      (getState() as RootState).user.token ||
      sessionStorage.getItem('token') ||
      sessionStorage.getItem('getRefreshToken')
    ) {
      const token =
        (getState() as RootState).user.token ||
        sessionStorage.getItem('token') ||
        sessionStorage.getItem('getRefreshToken')
      const noAuthEndpoints = ['login', 'resetPassword', 'forgetPassword']
      if (token && !noAuthEndpoints.includes(endpoint)) {
        headers.set('Authorization', `Bearer ${token}`)
      } else {
        const token = sessionStorage.getItem('getRefreshToken')
        const noAuthEndpoints = ['login', 'resetPassword', 'forgetPassword']
        if (token && !noAuthEndpoints.includes(endpoint)) {
          headers.set('Authorization', `Bearer ${token}`)
        }
      }
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
