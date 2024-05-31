import {
  useGetCountriesMutation,
  useGetRolesMutation,
  useGetStatesMutation,
} from '../../../Services/MetaDataApi'
import { MetaDataResponse } from '../../../Type/ApiTypes'

export const StatesData = () => {
  const [getStates] = useGetStatesMutation()

  const fetchMetaData = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getStatesData = async () => ({ statesData: await fetchMetaData(getStates) })

  return { getStatesData }
}

export const CountriesData = () => {
  const [getCountries] = useGetCountriesMutation()

  const fetchMetaData = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getCountriesData = async () => ({ countriesData: await fetchMetaData(getCountries) })

  return { getCountriesData }
}

export const RolesData = () => {
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
