import { useState } from 'react'
import { useUploadFormMutation } from '../MoorServe/MoorserveApi'
import { Forms_Response } from '../../Type/ApiTypes'

const useSubmit = () => {
  const [error, setError] = useState<any>(null)
  const [response, setResponse] = useState<Forms_Response>()
  const [uploadForms] = useUploadFormMutation()

  const handleSubmit = async (formData: FormData) => {
    setError(null)

    try {
      const response = await uploadForms(formData).unwrap()
      setResponse(response as Forms_Response)
    } catch (error) {
      setError(error)
    }
  }

  return { error, response, handleSubmit }
}

export default useSubmit
