import { userApi } from "../userApi";
import { CUSTOMER_PAYLOAD } from "./types";

const moormanageApi = userApi.injectEndpoints({
  endpoints: (builder : any) => ({
    addCustomer: builder.mutation({
        query: (payload : CUSTOMER_PAYLOAD) => ({
          url: "api/v1/customer",
          method: "POST",
          body: payload,
        }),
      }),

    getCustomer: builder.mutation({
      query: ({}) => ({
        url: "api/v1/customer",
        method: "GET"
      }),
    }),

    signup: builder.mutation({
      query: (payload: "") => ({
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

   
  }),
});

export const {
} = moormanageApi;
