import { userApi } from "../userApi";
import { CUSTOMER_PAYLOAD } from "./types";

const moormanageApi = userApi.injectEndpoints({
  endpoints: (builder : any) => ({
    addCustomer: builder.mutation({
        query: (payload : CUSTOMER_PAYLOAD) => ({
          url: "api/v1/customer/",
          method: "POST",
          body: payload,
        }),
      }),

    getCustomer: builder.mutation({
      query: ({}) => ({
        url: "api/v1/customer/",
        method: "GET"
      }),
    }),

    deleteCustomer: builder.mutation({
      query: (id: number | undefined) => ({
        url: `api/v1/customer/`,
        method: "DELETE",
        body: {id},
      }),
    }),

    updateCustomer: builder.mutation({
      query: () => ({
        url: "api/v1/users",
        method: "PUT",
      }),
    }),

   
  }),
});

export const {
  useGetCustomerMutation,
  useAddCustomerMutation,
  useDeleteCustomerMutation
} = moormanageApi;
