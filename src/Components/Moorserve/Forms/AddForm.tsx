import React, { useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'

const AddForm = () => {
  const [customerName, setCustomerName] = useState<string>('')
  const [formId, setFormId] = useState<string>('')
  const [formName, setFormName] = useState<string>('')
  const [uploadFile, setUploadFile] = useState<any>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [fieldsError, setFieldsError] = useState<{ [key: string]: string }>({})

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
      errors.id = 'Id is required'
    }

    if (!formData.formName) {
      errors.formName = 'Form Name is required'
    }
    if (!formData.uploadFile) {
      errors.uploadFile = 'Upload file is required'
    }

    setFieldsError(errors)
    return errors
  }

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
  }

  return (
    <>
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
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                options={[]}
                optionLabel="name"
                editable
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldsError.customerName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
            </div>
            <p>
              {fieldsError.customerName && (
                <small className="p-error">{fieldsError.customerName}</small>
              )}
            </p>
          </div>

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
            </div>
            <p>{fieldsError.id && <small className="p-error">{fieldsError.id}</small>}</p>
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
            </div>
            <p>
              {fieldsError.formName && <small className="p-error">{fieldsError.formName}</small>}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <span className="font-medium text-sm text-[#000000]">
            <div className="flex gap-1">
              Upload File
              <p className="text-red-600">*</p>
            </div>
          </span>
          <div className="mt-1">
            <FileUpload
            //   value={formData.uploadFile}
            //   onChange={(e) => handleInputChange('uploadFile', e.target.value)}
            mode='basic'
              style={{
                width: '700px',
                height: '174px',
                border: fieldsError.uploadFile ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.8rem',
              }}
            />
          </div>
          <p>
            {fieldsError.uploadFile && <small className="p-error">{fieldsError.uploadFile}</small>}
          </p>
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
            onClick={() => {
              setVisible(false)
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
