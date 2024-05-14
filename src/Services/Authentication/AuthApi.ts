import { userApi } from '../UserApi'
import {
  ForgotPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  SignUpPayload,
  AddUserPayload,
} from '../../Type/ApiTypes'

const authApi = userApi.injectEndpoints({
  endpoints: (builder: any) => ({
    addUser: builder.mutation({
      query: ({
        payload,
        customerAdminId,
      }: {
        payload: AddUserPayload
        customerAdminId: number
      }) => ({
        url: 'api/v1/user/',
        method: 'POST',
        body: payload,
        params: { customerAdminId },
      }),
    }),

    login: builder.mutation({
      query: (payload: LoginPayload) => ({
        url: 'api/v1/auth/login',
        method: 'POST',
        body: payload,
      }),
      extraOptions: { requiresAuth: false },
    }),

    signup: builder.mutation({
      query: (payload: SignUpPayload) => ({
        url: 'v1/mmm/employees/saveEmployee',
        method: 'POST',
        body: payload,
      }),
    }),

    getUsers: builder.mutation({
      query: ({
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
        customerAdminId,
        searchText,
      }: {
        pageNumber?: number
        pageSize?: number
        sortBy?: string
        sortDir?: string
        customerAdminId?: number
        searchText?: string
      }) => ({
        url: 'api/v1/user/',
        method: 'GET',
        params: { pageNumber, pageSize, sortBy, sortDir, customerAdminId, searchText },
      }),
    }),

    forgotPassword: builder.mutation({
      query: (payload: ForgotPasswordPayload) => ({
        url: 'api/v1/auth/forgetPassword',
        method: 'POST',
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ payload, token }: { payload: ResetPasswordPayload; token: string }) => ({
        url: 'api/v1/auth/resetPassword',
        method: 'POST',
        body: payload,
        params: { token },
      }),
    }),

    validateEmail: builder.mutation({
      query: ({ token }: { token: string }) => ({
        url: 'api/v1/auth/resetPassword',
        method: 'GET',
        params: { token },
      }),
    }),
  }),
})

export const {
  useAddUserMutation,
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUsersMutation,
  useValidateEmailMutation,
} = authApi
