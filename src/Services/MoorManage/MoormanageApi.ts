import {
  BoatYardPayload,
  CustomerPayload,
  InventoryPayload,
  MooringPayload,
  TechnicianPayload,
  UpdateMooringPayload,
  VendorPayload,
} from '../../Type/ApiTypes'
import { userApi } from '../UserApi'

const moormanageApi = userApi.injectEndpoints({
  endpoints: (builder: any) => ({
    //Customer API
    addCustomer: builder.mutation({
      query: (payload: CustomerPayload) => ({
        url: 'api/v1/customer/',
        method: 'POST',
        body: payload,
      }),
    }),

    getCustomer: builder.mutation({
      query: ({
        page,
        size,
        sortBy,
        sortDir,
        searchText,
        customerOwnerId,
      }: {
        page?: number
        size?: number
        sortBy?: string
        sortDir?: string
        searchText?: string
        customerOwnerId?: number
      }) => ({
        url: 'api/v1/customer/',
        method: 'GET',
        params: { page, size, sortBy, sortDir, searchText, customerOwnerId },
      }),
    }),

    deleteCustomer: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/customer/${id}`,
        method: 'DELETE',
      }),
    }),

    updateCustomer: builder.mutation({
      query: ({ payload, id }: { payload: CustomerPayload; id: number }) => ({
        url: `api/v1/customer/${id}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    //Mooring API
    addMoorings: builder.mutation({
      query: (payload: MooringPayload) => ({
        url: 'api/v1/mooring/',
        method: 'POST',
        body: payload,
      }),
    }),

    getMoorings: builder.mutation({
      query: ({
        page,
        size,
        sortBy,
        sortDir,
        searchText,
        customerOwnerId,
      }: {
        page?: number
        size?: number
        sortBy?: string
        sortDir?: string
        searchText?: string
        customerOwnerId?: number
      }) => ({
        url: 'api/v1/mooring/',
        method: 'GET',
        params: { page, size, sortBy, sortDir, searchText, customerOwnerId },
      }),
    }),

    deleteMoorings: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/mooring/${id}`,
        method: 'DELETE',
      }),
    }),

    updateMoorings: builder.mutation({
      query: ({ payload, id }: { payload: UpdateMooringPayload; id: number }) => ({
        url: `api/v1/mooring/${id}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    // Vendor API
    addVendors: builder.mutation({
      query: (payload: VendorPayload) => ({
        url: 'api/v1/vendor/',
        method: 'POST',
        body: payload,
      }),
    }),

    getVendors: builder.mutation({
      query: ({
        page,
        size,
        sortBy,
        sortDir,
        searchText,
      }: {
        page?: number
        size?: number
        sortBy?: string
        sortDir?: string
        searchText?: string
      }) => ({
        url: 'api/v1/vendor/',
        method: 'GET',
        params: { page, size, sortBy, sortDir, searchText },
      }),
    }),

    deleteVendor: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/vendor/${id}`,
        method: 'DELETE',
      }),
    }),

    updateVendor: builder.mutation({
      query: ({ payload, id }: { payload: VendorPayload; id: number }) => ({
        url: `api/v1/vendor/${id}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    // Boatyards API
    addBoatyards: builder.mutation({
      query: (payload: BoatYardPayload) => ({
        url: 'api/v1/boatyard/',
        method: 'POST',
        body: payload,
      }),
    }),

    getBoatyards: builder.mutation({
      query: ({
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
        searchText,
        customerOwnerId,
      }: {
        pageNumber?: number
        pageSize?: number
        sortBy?: string
        sortDir?: string
        searchText?: string
        customerOwnerId?: number | null
      }) => ({
        url: 'api/v1/boatyard/',
        method: 'GET',
        params: { pageNumber, pageSize, sortBy, sortDir, searchText, customerOwnerId },
      }),
    }),

    deleteBoatyards: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/boatyard/${id}`,
        method: 'DELETE',
      }),
    }),

    updateBoatyards: builder.mutation({
      query: ({ payload, id }: { payload: BoatYardPayload; id: number }) => ({
        url: `api/v1/boatyard/${id}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    // Technician API
    addTechnician: builder.mutation({
      query: (payload: TechnicianPayload) => ({
        url: 'api/v1/technician/',
        method: 'POST',
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
        pageNumber?: number
        pageSize?: number
        sortBy?: string
        sortDir?: string
      }) => ({
        url: 'api/v1/technician/',
        method: 'GET',
        params: { pageNumber, pageSize, sortBy, sortDir },
      }),
    }),

    getTechnicianById: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/technician/${id}`,
        method: 'GET',
      }),
    }),

    deleteTechnician: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/technician/${id}`,
        method: 'DELETE',
      }),
    }),

    updateTechnician: builder.mutation({
      query: ({ payload, id }: { payload: TechnicianPayload; id: number }) => ({
        url: `api/v1/technician/${id}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    //FetchCustomersWithMooring
    getCustomersWithMooring: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/customer/fetchCustomerWithMoorings/${id}`,
        method: 'GET',
      }),
    }),

    getMooringWithBoatyard: builder.mutation({
      query: ({ id }: { id?: number }) => ({
        url: `api/v1/boatyard/fetchMooringsWithBoatyard/${id}`,
        method: 'GET',
      }),
    }),

    //Inventory Details
    getInventoryDetails: builder.mutation({
      query: ({
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
        searchText,
        vendorId,
      }: {
        pageNumber?: number
        pageSize?: number
        sortBy?: string
        sortDir?: string
        searchText?: string
        vendorId: number
      }) => ({
        url: 'api/v1/inventory/',
        method: 'GET',
        params: { pageNumber, pageSize, sortBy, sortDir, searchText, vendorId },
      }),
    }),

    deleteInventory: builder.mutation({
      query: ({ vendorId, id }: { vendorId: number; id: number }) => ({
        url: `api/v1/inventory/${id}`,
        method: 'DELETE',
        params: { vendorId },
      }),
    }),

    addInventory: builder.mutation({
      query: ({ vendorId, payload }: { vendorId: number; payload: InventoryPayload }) => ({
        url: 'api/v1/inventory/',
        method: 'POST',
        body: payload,
        params: { vendorId },
      }),
    }),

    updateInventory: builder.mutation({
      query: ({
        vendorId,
        payload,
        id,
      }: {
        vendorId: number
        payload: InventoryPayload
        id: number
      }) => ({
        url: `api/v1/inventory/${id}`,
        method: 'PUT',
        body: payload,
        params: { vendorId },
      }),
    }),
  }),
})

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
  useGetCustomersWithMooringMutation,
  useGetMooringWithBoatyardMutation,
  useGetInventoryDetailsMutation,
  useDeleteInventoryMutation,
  useAddInventoryMutation,
  useUpdateInventoryMutation,
} = moormanageApi
