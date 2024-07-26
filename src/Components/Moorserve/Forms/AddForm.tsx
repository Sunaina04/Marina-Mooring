import React, { useCallback, useEffect, useRef, useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { useGetCustomerMutation } from '../../../Services/MoorManage/MoormanageApi'
import { CustomerPayload, CustomerResponse, ErrorResponse } from '../../../Type/ApiTypes'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import { useSelector } from 'react-redux'
import { ProgressSpinner } from 'primereact/progressspinner'
import { FormDataProps } from '../../../Type/ComponentBasedType'

const AddForm: React.FC<FormDataProps> = ({ closeModal }) => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [getCustomer] = useGetCustomerMutation()
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [fieldsError, setFieldsError] = useState<{ [key: string]: string }>({})
  const toastRef = useRef<Toast>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [customerData, setCustomerData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useRef<Toast>(null)
  const [formData, setFormData] = useState<any>({
    customerName: '',
    id: '',
    formName: '',
    uploadFile: '',
  })

  const validateFields = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.customerName) {
      errors.customerName = 'Customer Name is required'
    }

    if (!formData.id) {
      errors.id = 'ID is required'
    }

    if (!formData.formName) {
      errors.formName = 'Form Name is required'
    }

    setFieldsError(errors)
    return errors
  }

  const getCustomerData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await getCustomer({}).unwrap()
      const { status, content, message } = response as CustomerResponse
      if (status === 200 && Array.isArray(content)) {
        if (content?.length > 0) {
          setIsLoading(false)
          const extractedData = content.map((item) => {
            const fullname = `${item.firstName} ${item.lastName}`
            return {
              label: fullname,
              id: item.id,
            }
          })
          setCustomerData(extractedData)
        } else {
          setIsLoading(false)
          setCustomerData([])
        }
      } else {
        setIsLoading(false)
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      setIsLoading(false)
      const { message: msg } = error as ErrorResponse
      console.error('Error occurred while fetching customer data:', msg)
    }
  }, [getCustomer, selectedCustomerId])

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    if (fieldsError[field]) {
      setFieldsError({
        ...fieldsError,
        [field]: '',
      })
    }
  }

  const saveForm = () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setFieldsError(errors)
      return
    }

    if (!formData.uploadFile) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Upload file is required',
      })
    }

    console.log({ ...formData, uploadFileName: fileName })
    toastRef.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Form saved successfully!',
    })
  }

  const handleClickUploadButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        setUploadFile(file)
        setFileName(file.name)
        setFileSize(file.size)
        setFormData({ ...formData, uploadFile: file })
        setUploadStatus('success')
        setFieldsError({ ...fieldsError, uploadFile: '' })
        toastRef.current?.show({
          severity: 'success',
          summary: 'File Upload',
          detail: 'File uploaded successfully',
        })
      } else {
        setUploadFile(null)
        setFileName('')
        setFileSize(null)
        setUploadStatus('error')
        toastRef.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Only PDF files are allowed',
        })
      }
    }
  }

  useEffect(() => {
    getCustomerData()
  }, [selectedCustomerId])

  return (
    <>
      <Toast ref={toastRef} />

      <div className="ml-4">
        <div className="flex gap-6">
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Customer Name
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <Dropdown
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.value)}
                options={customerData}
                optionLabel="label"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldsError.customerName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              {fieldsError.customerName && (
                <small className="p-error">{fieldsError.customerName}</small>
              )}
            </div>
          </div>

          {isLoading && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
              }}
              strokeWidth="4"
            />
          )}
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                ID
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <InputComponent
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldsError.id ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              {fieldsError.id && <small className="p-error">{fieldsError.id}</small>}
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Form Name
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <InputComponent
                value={formData.formName}
                onChange={(e) => handleInputChange('formName', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldsError.formName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              {fieldsError.formName && <small className="p-error">{fieldsError.formName}</small>}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <span className="font-medium text-sm text-[#000000]">
            <div className="flex gap-1">
              Upload File
              <p className="text-red-600">*</p>
            </div>
          </span>

          <div
            className="mt-2 flex justify-center items-center flex-col p-4"
            style={{
              width: '100%',
              height: '150px',
              border: '1px dashed #D5E1EA',
              borderRadius: '0.50rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleClickUploadButton}>
            {uploadStatus === 'idle' && (
              <div>
                <img
                  src="/assets/images/file.png"
                  alt="Upload Icon"
                  style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'contain' }}
                />
                <p className="mt-2">Choose file</p>
              </div>
            )}
            {uploadStatus === 'success' && uploadFile && (
              <div>
                <p className="mt-2 text-green-600">File uploaded successfully!</p>
                <div>
                  <label>
                    <strong>File Name:</strong>
                    <input
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      style={{
                        marginLeft: '10px',
                        padding: '5px',
                        border: '1px solid #D5E1EA',
                        borderRadius: '4px',
                      }}
                    />
                  </label>
                </div>
                <p>
                  <strong>File Size:</strong> {Math.round(fileSize! / 1024)} KB
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".pdf"
          />
        </div>

        <div
          className="flex gap-6 bottom-2 absolute left-7"
          style={{
            width: '100%',
            height: '80px',
            backgroundColor: 'white',
            padding: '0 12px',
            bottom: '0px',
          }}>
          <Button
            onClick={saveForm}
            label={'Save'}
            style={{
              width: '100px',
              height: '42px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '0.50rem',
              marginTop: '10px',
            }}
          />
          <Button
            onClick={() => {
              closeModal()
            }}
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
    </>
  )
}

export default AddForm
