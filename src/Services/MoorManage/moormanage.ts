import { userApi } from "../userApi";
import { CUSTOMER_PAYLOAD, MOORING_PAYLOAD, VENDOR_PAYLOAD } from "./types";

const moormanageApi = userApi.injectEndpoints({
  endpoints: (builder: any) => ({

    //Customer API
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


    //Mooring API
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

    // Vendor API
    addVendors: builder.mutation({
      query: (payload: VENDOR_PAYLOAD) => ({
        url: "api/v1/vendor/",
        method: "POST",
        body: payload,
      }),
    }),

    getVendors: builder.mutation({
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
        url: "api/v1/vendor/",
        method: "GET",
        params: { page, size, sortBy, sortDir },
      }),
    }),

    deleteVendor: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/vendor/${id}`,
        method: "DELETE",
      }),
    }),

    updateVendor: builder.mutation({
      query: ({ payload, id }: { payload: VENDOR_PAYLOAD; id: number }) => ({
        url: `api/v1/vendor/${id}`,
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
  useAddVendorsMutation,
  useGetVendorsMutation,
  useDeleteVendorMutation,
  useUpdateVendorMutation,
} = moormanageApi;
