import React, { useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

const AddForm = () => {
  const [customerName, setCustomerName] = useState<string>('')
  const [formId, setFormId] = useState<string>('')
  const [formName, setFormName] = useState<string>('')
  const [uploadFile, setUploadFile] = useState<any>('')
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <>
      <div className='ml-4'>
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
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
            </div>
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
                value={formId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormId(e.target.value)
                }
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
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
                value={formName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormName(e.target.value)
                }
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
            </div>
          </div>
        </div>
        <div className='mt-4'>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Upload File
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <InputComponent
                value={uploadFile}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUploadFile(e.target.value)
                }
                style={{
                  width: '700px',
                  height: '184px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
            </div>
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
          //  onClick={editMode ? updateWorkOrder : SaveWorkOrder}
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
