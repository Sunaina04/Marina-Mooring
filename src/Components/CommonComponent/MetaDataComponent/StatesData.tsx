import { useGetStatesMutation } from '../../../Services/MetaDataApi'
import { MetaDataResponse } from '../../../Type/ApiTypes'

const StatesData = () => {
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

export default StatesData
