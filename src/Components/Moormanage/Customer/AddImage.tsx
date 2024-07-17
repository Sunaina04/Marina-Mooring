import { Button } from 'primereact/button'
import React, { useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { InputText } from 'primereact/inputtext'
import { ImageDataProps } from '../../../Type/CommonType'

const AddImage: React.FC<ImageDataProps> = ({ imageData, entityId, entity }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [imageName, setImageName] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<{ imageName?: string; note?: string }>({})

  const validate = (field: string, value: string) => {
    let error = ''

    if (field === 'imageName' && !value) {
      error = 'Image Name is required'
    } else if (field === 'note' && !value) {
      error = 'Note is required'
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }))

    return error === ''
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === 'imageName') {
      setImageName(value)
    } else if (field === 'note') {
      setNote(value)
    }
    validate(field, value)
  }

  const handleSubmit = () => {
    const isImageNameValid = validate('imageName', imageName)
    const isNoteValid = validate('note', note)

    if (isImageNameValid && isNoteValid) {
      // Submit form
      console.log('Form submitted:', { imageName, note })
    }
  }

  return (
    <div>
      <div className={isLoading ? 'blurred' : ''}>
        <div>
          <div className="mt-5 ml-3">
            <div className="ml-1 text-black font-semibold text-sm">
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                <div className="flex gap-1">
                  Image Name
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>
            <div className="mt-2">
              <InputText
                value={imageName}
                onChange={(e) => handleInputChange('imageName', e.target.value)}
                type="text"
                style={{
                  width: '230px',
                  height: '32px',
                  borderRadius: '0.50rem',
                  fontSize: '0.70rem',
                  padding: '1em',
                  border: errors.imageName ? '1px solid red' : '1px solid #D5E1EA',
                }}
              />
              {errors.imageName && (
                <small className="p-error" style={{ color: 'red' }}>
                  {errors.imageName}
                </small>
              )}
            </div>
          </div>
        </div>

        <div className="py-3 pl-3 mb-20 mt-4 rounded-lg" style={{ height: '90px' }}>
          <div className="flex">
            <div className="mt-2 mr-12">
              <div className="">
                <span style={{ fontWeight: '400', fontSize: '14px' }}>
                  <div className="flex gap-1">
                    Note
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>
              <div className="mt-1">
                <InputComponent
                  value={note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  style={{
                    width: '600px',
                    height: '50px',
                    borderRadius: '0.50rem',
                    fontSize: '0.70rem',
                    boxShadow: 'none',
                    padding: '10px',
                    border: errors.note ? '1px solid red' : '1px solid #D5E1EA',
                  }}
                />
                {errors.note && (
                  <small className="p-error" style={{ color: 'red' }}>
                    {errors.note}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex gap-6 absolute left-6 ${isLoading ? 'blurred' : ''}`}
        style={{
          width: '100%',
          height: '80px',
          backgroundColor: 'white',
          padding: '0 12px',
          bottom: '0px',
        }}>
        <Button
          onClick={handleSubmit}
          label={'Save'}
          style={{
            width: '89px',
            height: '42px',
            backgroundColor: '#0098FF',
            cursor: 'pointer',
            fontWeight: 'bolder',
            fontSize: '1rem',
            boxShadow: 'none',
            color: 'white',
            borderRadius: '0.50rem',
            marginTop: '10px',
          }}
        />
        <Button
          // onClick={closeModal}
          label={'Back'}
          text={true}
          style={{
            backgroundColor: 'white',
            color: '#000000',
            border: 'none',
            width: '89px',
            height: '42px',
            marginTop: '10px',
          }}
        />
      </div>
    </div>
  )
}

export default AddImage
