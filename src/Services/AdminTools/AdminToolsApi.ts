import { userApi } from '../UserApi'
import { AddUserPayload } from '../../Type/ApiTypes'

const adminToolsApi = userApi.injectEndpoints({
  endpoints: (builder: any) => ({
    addUser: builder.mutation({
      query: ({
        payload,
        customerAdminId,
      }: {
        payload: AddUserPayload
        customerAdminId: number
      }) => ({
        url: 'api/v1/user/',
        method: 'POST',
        body: payload,
        params: { customerAdminId },
      }),
    }),

    getUsers: builder.mutation({
      query: ({
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
        customerAdminId,
        searchText,
      }: {
        pageNumber?: number
        pageSize?: number
        sortBy?: string
        sortDir?: string
        customerAdminId?: number
        searchText?: string
      }) => ({
        url: 'api/v1/user/',
        method: 'GET',
        params: { pageNumber, pageSize, sortBy, sortDir, customerAdminId, searchText },
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ userId, customerAdminId }: { userId?: number; customerAdminId?: number }) => ({
        url: `api/v1/user/${userId}`,
        method: 'DELETE',
        params: customerAdminId,
      }),
    }),

    updateUser: builder.mutation({
      query: ({
        payload,
        id,
        customerAdminId,
      }: {
        payload: AddUserPayload
        id: number
        customerAdminId?: number
      }) => ({
        url: `api/v1/user/${id}`,
        method: 'PUT',
        body: payload,
        params: { customerAdminId },
      }),
    }),
  }),
})

export const { useAddUserMutation, useGetUsersMutation, useUpdateUserMutation } = adminToolsApi
