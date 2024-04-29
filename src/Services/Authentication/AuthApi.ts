import { userApi } from "../UserApi";
import {
  ForgotPassword_Payload,
  Login_Payload,
  ResetPassword_Payload,
  SignUp_Payload,
} from "../../Type/ApiTypes";

const authApi = userApi.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (payload: Login_Payload) => ({
        url: "api/v1/auth/login",
        method: "POST",
        body: payload,
      }),
    }),

    signup: builder.mutation({
      query: (payload: SignUp_Payload) => ({
        url: "v1/mmm/employees/saveEmployee",
        method: "POST",
        body: payload,
      }),
    }),

    getEmployee: builder.mutation({
      query: () => ({
        url: "api/v1/users",
        method: "GET",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (payload: ForgotPassword_Payload) => ({
        url: "api/v1/auth/forgetPassword",
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({
        payload,
        token,
      }: {
        payload: ResetPassword_Payload;
        token: string;
      }) => ({
        url: "api/v1/auth/resetPassword",
        method: "POST",
        body: payload,
        params: { token },
      }),
    }),

    validateEmail: builder.mutation({
      query: ({ token }: { token: string }) => ({
        url: "api/v1/auth/resetPassword",
        method: "GET",
        params: { token },
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
  useValidateEmailMutation,
} = authApi;
