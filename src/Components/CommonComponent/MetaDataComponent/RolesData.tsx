import { useGetRolesMutation } from '../../../Services/MetaDataApi'
import { MetaDataResponse } from '../../../Type/ApiTypes'

const RolesData = () => {
  const [getRoles] = useGetRolesMutation()

  const fetchRolesData = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getRolesData = async () => ({ rolesData: await fetchRolesData(getRoles) })

  return { getRolesData }
}

export default RolesData
