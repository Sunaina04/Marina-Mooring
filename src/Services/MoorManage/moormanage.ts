import { userApi } from "../userApi";
import { BOATYARD_PAYLOAD, CUSTOMER_PAYLOAD, MOORING_PAYLOAD, TECHNICIAN_PAYLOAD, VENDOR_PAYLOAD } from "./types";

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


    // Boatyards API
    addBoatyards: builder.mutation({
      query: (payload: BOATYARD_PAYLOAD) => ({
        url: "api/v1/boatyards/",
        method: "POST",
        body: payload,
      }),
    }),

    getBoatyards: builder.mutation({
      query: ({
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
      }: {
        pageNumber?: number;
        pageSize?: number;
        sortBy?: string;
        sortDir?: string;
      }) => ({
        url: "api/v1/boatyards/",
        method: "GET",
        params: { pageNumber, pageSize, sortBy, sortDir },
      }),
    }),

    deleteBoatyards: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/boatyards/${id}`,
        method: "DELETE",
      }),
    }),

    updateBoatyards: builder.mutation({
      query: ({ payload, id }: { payload: BOATYARD_PAYLOAD; id: number }) => ({
        url: `api/v1/boatyards/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    // Technician API
    addTechnician: builder.mutation({
      query: (payload: TECHNICIAN_PAYLOAD) => ({
        url: "api/v1/technician/",
        method: "POST",
        body: payload,
      }),
    }),

    getTechnician: builder.mutation({
      query: ({
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
      }: {
        pageNumber?: number;
        pageSize?: number;
        sortBy?: string;
        sortDir?: string;
      }) => ({
        url: "api/v1/technician/",
        method: "GET",
        params: { pageNumber, pageSize, sortBy, sortDir },
      }),
    }),

    getTechnicianById: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/technician/${id}`,
        method: "GET",
      }),
    }),

    deleteTechnician: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/technician/${id}`,
        method: "DELETE",
      }),
    }),

    updateTechnician: builder.mutation({
      query: ({ payload, id }: { payload: TECHNICIAN_PAYLOAD; id: number }) => ({
        url: `api/v1/technician/${id}`,
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
  useAddBoatyardsMutation,
  useDeleteBoatyardsMutation,
  useUpdateBoatyardsMutation,
  useGetBoatyardsMutation,
  useAddTechnicianMutation,
  useGetTechnicianMutation,
  useDeleteTechnicianMutation,
  useUpdateTechnicianMutation,
  useGetTechnicianByIdMutation,
} = moormanageApi;
