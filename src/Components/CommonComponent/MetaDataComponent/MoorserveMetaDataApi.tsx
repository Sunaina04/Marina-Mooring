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

  const fetchgetMooringBasedOnCustomerIdAndBoatyardId = async (getData: any) => {
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
    basedOnCustomerIdAndBoatyardId: await fetchgetMooringBasedOnCustomerIdAndBoatyardId(
      getMooringBasedOnCustomerIdAndBoatyardId,
    ),
  })

  return { getMooringBasedOnCustomerIdAndBoatyardIdData }
}

export const GetMooringsBasedOnCustomerId = () => {
  const [getMooringsBasedOnCustomerId] = useGetMooringsBasedOnBoatyardIdMutation()

  const fetchgetgetMooringsBasedOnCustomerIdData = async (getData: any) => {
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
  const getgetMooringsBasedOnCustomerIdData = async () => ({
    getMooringsBasedOnBoatyardIdData: await fetchgetgetMooringsBasedOnCustomerIdData(
      getMooringsBasedOnCustomerId,
    ),
  })

  return { getgetMooringsBasedOnCustomerIdData }
}

export const GetMooringsBasedOnBoatyardId = () => {
  const [getMooringsBasedOnBoatyardId] = useGetMooringsBasedOnCustomerIdMutation()

  const fetchgetMooringBasedOnCustomerIdAndBoatyardId = async (getData: any) => {
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
    mooringBasedOnCustomerIdAndBoatyardId: await fetchgetMooringBasedOnCustomerIdAndBoatyardId(
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
  const getBoatyardBasedOnMooringId = async () => ({
    getBoatyardBasedOnMooringId: await fetchBoatyardBasedOnMooringId(BoatyardBasedOnMooringId),
  })

  return { getBoatyardBasedOnMooringId }
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
  const getCustomerBasedOnMooringId = async () => ({
    getCustomerBasedOnMooringId: await fetchCustomerBasedOnMooringId(CustomerBasedOnMooringId),
  })

  return { getCustomerBasedOnMooringId }
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
  const getTechnicians = async () => ({
    getTechnicians: await fetchTechniciansData(Technicians),
  })

  return { getTechnicians }
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
    mooringIdsData: await fetchMooringIdsData(MooringIdsData),
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
