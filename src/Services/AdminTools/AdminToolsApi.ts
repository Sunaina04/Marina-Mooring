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
  }),
})

export const { useAddUserMutation, useGetUsersMutation } = adminToolsApi
