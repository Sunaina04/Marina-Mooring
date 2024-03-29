import { userApi } from "../userApi";
import {
  FORGOT_PASSWORD_PAYLOAD,
  LOGIN_PAYLOAD,
  RESET_PASSWORD_PAYLOAD,
  SIGNUP_PAYLOAD,
} from "./types";

const authApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload: LOGIN_PAYLOAD) => ({
        url: "api/v1/auth/login",
        method: "POST",
        body: payload,
      }),
    }),

    signup: builder.mutation({
      query: (payload: SIGNUP_PAYLOAD) => ({
        url: "v1/mmm/employees/saveEmployee",
        method: "POST",
        body: payload,
      }),
    }),

    getEmployee: builder.mutation({
      query: () => ({
        url: "v1/mmm/employees/getAllEmployees",
        method: "GET",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (payload: FORGOT_PASSWORD_PAYLOAD) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: (payload: RESET_PASSWORD_PAYLOAD) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetEmployeeMutation,
} = authApi;
