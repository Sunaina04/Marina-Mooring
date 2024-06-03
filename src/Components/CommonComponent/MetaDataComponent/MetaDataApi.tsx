import {
  useGetBoatTypeMutation,
  useGetBottomChainConditionsMutation,
  useGetCountriesMutation,
  useGetEyeConditionMutation,
  useGetPennantConditionsMutation,
  useGetRolesMutation,
  useGetShackleSwivelConditionsMutation,
  useGetSizeOfWeightMutation,
  useGetStatesMutation,
  useGetStatusMutation,
  useGetTopChainConditionMutation,
  useGetTypeOfWeightMutation,
  useGetBoatyardsTypeMutation,
  useGetCustomersDataMutation,
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

export const TypeOfWeightData = () => {
  const [getTypeOfWeight] = useGetTypeOfWeightMutation()

  const fetchTypeOfWeightData = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getTypeOfWeightData = async () => ({
    typeOfWeightData: await fetchTypeOfWeightData(getTypeOfWeight),
  })

  return { getTypeOfWeightData }
}

export const BoatyardNameData = (customerOwnerId: any) => {
  const [getboatyardName] = useGetBoatyardsTypeMutation()

  const fetchBoatyardName = async (getData: any) => {
    try {
      const response = await getData({ customerOwnerId: customerOwnerId })
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getBoatYardNameData = async () => ({
    boatYardName: await fetchBoatyardName(getboatyardName),
  })

  return { getBoatYardNameData }
}

export const TypeOfChainCondition = () => {
  const [getTopChainCondition] = useGetTopChainConditionMutation()

  const fetchTypeOfChainCondition = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getTypeOfChainData = async () => ({
    typeOfChainData: await fetchTypeOfChainCondition(getTopChainCondition),
  })

  return { getTypeOfChainData }
}

export const TypeOfStatus = () => {
  const [getStatus] = useGetStatusMutation()

  const fetchTypeOfStatus = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getTypeOfStatusData = async () => ({
    typeOfStatusData: await fetchTypeOfStatus(getStatus),
  })

  return { getTypeOfStatusData }
}

export const TypeOfSizeOfWeight = () => {
  const [getSizeOfWeight] = useGetSizeOfWeightMutation()

  const fetchTypeOfSizeOfWeight = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getTypeOfSizeOfWeightData = async () => ({
    TypeOfSizeOfWeightData: await fetchTypeOfSizeOfWeight(getSizeOfWeight),
  })

  return { getTypeOfSizeOfWeightData }
}

export const TypeOfShackleSwivel = () => {
  const [getShackleSwivelConditions] = useGetShackleSwivelConditionsMutation()

  const fetchTypeOfShackleSwivel = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getTypeOfShackleSwivelData = async () => ({
    typeOfShackleSwivelData: await fetchTypeOfShackleSwivel(getShackleSwivelConditions),
  })

  return { getTypeOfShackleSwivelData }
}

export const TypeOfPennant = () => {
  const [getPennantConditions] = useGetPennantConditionsMutation()

  const fetchTypeOfPennant = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getTypeOfPennantData = async () => ({
    typeOfPennantData: await fetchTypeOfPennant(getPennantConditions),
  })

  return { getTypeOfPennantData }
}

export const TypeOfEye = () => {
  const [getEyeCondition] = useGetEyeConditionMutation()

  const fetchTypeOfEye = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getTypeOfEyeData = async () => ({
    typeOfEyeData: await fetchTypeOfEye(getEyeCondition),
  })

  return { getTypeOfEyeData }
}

export const TypeOfBottomChain = () => {
  const [getBottomChainConditions] = useGetBottomChainConditionsMutation()

  const fetchTypeOfBottomChain = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getTypeOfBottomChainData = async () => ({
    typeOfBootomChainData: await fetchTypeOfBottomChain(getBottomChainConditions),
  })

  return { getTypeOfBottomChainData }
}

export const TypeOfBoatYards = (customerOwnerId: any) => {
  const [getBoatyards] = useGetBoatyardsTypeMutation()

  const fetchBoatYardsData = async (getData: any) => {
    try {
      const response = await getData({ customerOwnerId: customerOwnerId })
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getBoatYardsData = async () => ({ boatYards: await fetchBoatYardsData(getBoatyards) })

  return { getBoatYardsData }
}

export const TypeOfBoatType = () => {
  const [getBoatType] = useGetBoatTypeMutation()

  const fetchTypeOfBoatType = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getTypeOfBoatTypeData = async () => ({
    typeOfBoatTypeData: await fetchTypeOfBoatType(getBoatType),
  })

  return { getTypeOfBoatTypeData }
}

// export const CustomerName = (customerOwnerId: any) => {
//   const [getCustomerName] = useGetCustomersDataMutation();

//   const fetchCustomerName = async (getData: any) => {
//     try {
//       const response = await getData({ customerOwnerId: customerOwnerId })
//       const { status, content } = response.data as MetaDataResponse
//       return status === 200 && Array.isArray(content?.content) ? content?.content : null
//     } catch (error) {
//       console.error('Error fetching metadata:', error)
//       return null
//     }
//   }

//   const getCustomerNameData = async () => ({ nameOfCustomer: await fetchCustomerName(getCustomerName) })

//   return { getCustomerNameData }
// }

export const CustomersData = (customerOwnerId: any) => {
  const [getCustomers] = useGetCustomersDataMutation()

  const fetchCustomersData = async (getData: any) => {
    try {
      const response = await getData({ customerOwnerId: customerOwnerId })
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      console.error('Error fetching metadata:', error)
      return null
    }
  }

  const getCustomersData = async () => ({ customersData: await fetchCustomersData(getCustomers) })

  return { getCustomersData }
}
