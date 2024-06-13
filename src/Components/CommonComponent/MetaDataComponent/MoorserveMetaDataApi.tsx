import {
  useGetMooringBasedOnCustomerIdAndBoatyardIdMutation,
  useGetMooringsBasedOnBoatyardIdMutation,
  useGetMooringsBasedOnCustomerIdMutation,
  useGetBoatyardBasedOnMooringIdMutation,
  useGetCustomerBasedOnMooringIdMutation,
  useGetTechniciansMutation,
  useGetMooringIdsMutation,
  useGetWorkOrderStatusMutation,
} from '../../../Services/MoorServe/MoorserveMetaDataApi'
import { ErrorResponse, MetaDataCustomerResponse, MetaDataResponse } from '../../../Type/ApiTypes'

export const GetMooringBasedOnCustomerIdAndBoatyardId = () => {
  const [getMooringBasedOnCustomerIdAndBoatyardId] =
    useGetMooringBasedOnCustomerIdAndBoatyardIdMutation()

  const fetchMooringBasedOnCustomerIdAndBoatyardId = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching metadata:', message)
      return null
    }
  }
  const getMooringBasedOnCustomerIdAndBoatyardIdData = async () => ({
    mooringbasedOnCustomerIdAndBoatyardId: await fetchMooringBasedOnCustomerIdAndBoatyardId(
      getMooringBasedOnCustomerIdAndBoatyardId,
    ),
  })

  return { getMooringBasedOnCustomerIdAndBoatyardIdData }
}

export const GetMooringsBasedOnCustomerId = () => {
  const [getMooringsBasedOnCustomerId] = useGetMooringsBasedOnBoatyardIdMutation()

  const fetchMooringsBasedOnCustomerIdData = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching metadata:', message)
      return null
    }
  }
  const getMooringsBasedOnCustomerIdData = async () => ({
    mooringsBasedOnCustomerId: await fetchMooringsBasedOnCustomerIdData(
      getMooringsBasedOnCustomerId,
    ),
  })

  return { getMooringsBasedOnCustomerIdData }
}

export const GetMooringsBasedOnBoatyardId = () => {
  const [getMooringsBasedOnBoatyardId] = useGetMooringsBasedOnCustomerIdMutation()

  const fetchMooringBasedOnCustomerIdAndBoatyardId = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching metadata:', message)
      return null
    }
  }
  const getMooringsBasedOnBoatyardIdData = async () => ({
    mooringBasedOnBoatyardId: await fetchMooringBasedOnCustomerIdAndBoatyardId(
      getMooringsBasedOnBoatyardId,
    ),
  })

  return { getMooringsBasedOnBoatyardIdData }
}

export const GetBoatyardBasedOnMooringId = () => {
  const [BoatyardBasedOnMooringId] = useGetBoatyardBasedOnMooringIdMutation()

  const fetchBoatyardBasedOnMooringId = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching metadata:', message)
      return null
    }
  }
  const getBoatyardBasedOnMooringIdData = async () => ({
    boatyardBasedOnMooringId: await fetchBoatyardBasedOnMooringId(BoatyardBasedOnMooringId),
  })

  return { getBoatyardBasedOnMooringIdData }
}

export const GetCustomerBasedOnMooringId = () => {
  const [CustomerBasedOnMooringId] = useGetCustomerBasedOnMooringIdMutation()

  const fetchCustomerBasedOnMooringId = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching metadata:', message)
      return null
    }
  }
  const getCustomerBasedOnMooringIdData = async () => ({
    customerBasedOnMooringId: await fetchCustomerBasedOnMooringId(CustomerBasedOnMooringId),
  })

  return { getCustomerBasedOnMooringIdData }
}

export const GetTechnicians = () => {
  const [Technicians] = useGetTechniciansMutation()

  const fetchTechniciansData = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching metadata:', message)
      return null
    }
  }
  const getTechniciansData = async () => ({
    getTechnicians: await fetchTechniciansData(Technicians),
  })

  return { getTechniciansData }
}

export const GetMooringIds = () => {
  const [MooringIdsData] = useGetMooringIdsMutation()

  const fetchMooringIdsData = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching metadata:', message)
      return null
    }
  }
  const getMooringIdsData = async () => ({
    mooringIds: await fetchMooringIdsData(MooringIdsData),
  })

  return { getMooringIdsData }
}

export const GetWorkOrderStatus = () => {
  const [WorkOrderStatus] = useGetWorkOrderStatusMutation()

  const fetchWorkOrderStatusData = async (getData: any) => {
    try {
      const response = await getData({})
      const { status, content } = response.data as MetaDataResponse
      return status === 200 && Array.isArray(content) ? content : null
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching metadata:', message)
      return null
    }
  }
  const getWorkOrderStatusData = async () => ({
    WorkOrderStatus: await fetchWorkOrderStatusData(WorkOrderStatus),
  })

  return { getWorkOrderStatusData }
}
