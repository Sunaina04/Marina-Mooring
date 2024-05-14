import { userApi } from '../UserApi'
import {
  ForgotPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  SignUpPayload,
} from '../../Type/ApiTypes'

const authApi = userApi.injectEndpoints({
  endpoints: (builder: any) => ({
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
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateEmailMutation,
} = authApi
