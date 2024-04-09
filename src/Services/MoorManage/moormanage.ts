import { userApi } from "../userApi";
import { CUSTOMER_PAYLOAD, MOORING_PAYLOAD } from "./types";

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
        url: `api/v1/customer/${id}`,
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

    addMoorings: builder.mutation({
      query: (payload: MOORING_PAYLOAD) => ({
        url: "api/v1/mooring/",
        method: "POST",
        body: payload,
      }),
    }),

    getMoorings: builder.mutation({
      query: ({
        page,
        size,
        sortBy,
        sortDir,
      }: {
        page?: number;
        size?: number;
        sortBy?: string;
        sortDir?: string;
      }) => ({
        url: "api/v1/mooring/",
        method: "GET",
        params: { page, size, sortBy, sortDir },
      }),
    }),

    // getMoorings: builder.mutation({
    //   query: ({}) => ({
    //     url: "api/v1/mooring/",
    //     method: "GET",
    //   }),
    // }),

    deleteMoorings: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/mooring/${id}`,
        method: "DELETE",
      }),
    }),

    updateMoorings: builder.mutation({
      query: ({ payload, id }: { payload: CUSTOMER_PAYLOAD; id: number }) => ({
        url: `api/v1/mooring/${id}`,
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
  useAddMooringsMutation,
  useGetMooringsMutation,
  useDeleteMooringsMutation,
  useUpdateMooringsMutation,
} = moormanageApi;
