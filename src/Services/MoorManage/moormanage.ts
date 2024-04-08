import { userApi } from "../userApi";
import { CUSTOMER_PAYLOAD } from "./types";

const moormanageApi = userApi.injectEndpoints({
  endpoints: (builder: any) => ({
    addCustomer: builder.mutation({
      query: (payload: CUSTOMER_PAYLOAD) => ({
        url: "api/v1/customer/",
        method: "POST",
        body: payload,
      }),
    }),

    getCustomer: builder.mutation({
      query: ({}) => ({
        url: "api/v1/customer/",
        method: "GET",
      }),
    }),

    deleteCustomer: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/customer/${id}`, // Append the id to the URL
        method: "DELETE",
      }),
    }),

    updateCustomer: builder.mutation({
      query: (payload: CUSTOMER_PAYLOAD) => ({
        url: "api/v1/customer/",
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetCustomerMutation,
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = moormanageApi;
