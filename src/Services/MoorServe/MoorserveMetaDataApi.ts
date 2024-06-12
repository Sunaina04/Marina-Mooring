import { userApi } from '../UserApi'

const MoorserveMetaDataApi = userApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getRoles: builder.mutation({
      query: () => ({
        url: 'api/v1/metadata/',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetRolesMutation } = MoorserveMetaDataApi
