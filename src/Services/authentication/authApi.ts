import { userApi } from "../userApi";
import { FORGOT_PASSWORD_PAYLOAD, LOGIN_PAYLOAD, RESET_PASSWORD_PAYLOAD, SIGNUP_PAYLOAD } from "./types";

const authApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload: LOGIN_PAYLOAD) => ({
        url: `user/emailLogin`,
        method: "POST",
        body: payload,
      }),
    }),

    signup: builder.mutation({
      query: (payload: SIGNUP_PAYLOAD) => ({
        url: `/user/signup`,
        method: "POST",
        body: payload,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (payload: FORGOT_PASSWORD_PAYLOAD) => ({
        url: "/user/forgotpassword",
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: (payload: RESET_PASSWORD_PAYLOAD) => ({
        url: "/user/reset-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation,useForgotPasswordMutation, useResetPasswordMutation } = authApi;
