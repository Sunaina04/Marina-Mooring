import React, { useState, useEffect, useCallback, useRef } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { ReasonModalProps } from '../../../Type/ComponentBasedType'

const ReasonModal:React.FC<ReasonModalProps> = ({
  selectedRowData,
  setVisible,
  closeModal,
}) => {
//   const [workOrder, setWorkOrder] = useState<any>({
//     Reason: ''
//   })
const [reasonDetails, setReasonDetails] = useState();
//const toastRef = useRef<Toast>(null)
const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({})
// import { Dialog } from 'primereact/dialog'
// import { AiOutlineDelete } from 'react-icons/ai'
  const validateFields = () => {
    const errors: { [key: string]: string } = {}

    if (!reasonDetails) {
      errors.Reason = 'Customer Name is required'
    }

  }
  return (
    <>
      <div className={`"w-full h-full mb-16 ml-3" }`}>
        {/* <Toast ref={toastRef} /> */}

    
        <div className=" mt-4 mb-20">
          <span className="font-medium text-sm text-[#000000]">
            <div className="flex gap-2 ml-4">
              Reason
              <p className="text-red-600">*</p>
            </div>
          </span>
          <div className="mt-1 ml-3 text-[#000000]">
            <div className="">
              <InputTextarea
                value={reasonDetails}
                rows={3}
                cols={30}
                style={{
                  width: '740px',
                  height: '250px',
                  border: errorMessage.value ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  boxShadow: 'none',
                  paddingLeft: '0.5rem',
                  fontSize: '0.8rem',
                  resize: 'none',
                }}
              />
            </div>
          </div>
          <p>{errorMessage.value && <small className="p-error">{errorMessage.value}</small>}</p>
        </div>
      </div>
      {/* Save and Back buttons */}
      <div
        className={`"flex gap-6 bottom-2 absolute left-7"`}
        style={{
          width: '100%',
          height: '80px',
          backgroundColor: 'white',
          padding: '0 12px',
          bottom: '0px',
        }}>
        <Button
          
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
    </>
  )
}

export default ReasonModal