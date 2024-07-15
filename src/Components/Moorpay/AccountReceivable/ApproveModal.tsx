import React, { useState, useEffect, useCallback, useRef } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { ApproveModalProps } from '../../../Type/ComponentBasedType'
import InputComponent from '../../CommonComponent/InputComponent'
import { Params } from '../../../Type/CommonType'
import { useApproveWorkOrderMutation } from '../../../Services/MoorServe/MoorserveApi'
import { ErrorResponse, WorkOrderResponse } from '../../../Type/ApiTypes'

const ApproveModal: React.FC<ApproveModalProps> = ({ id, setVisible, closeModal }) => {
  const [invoiceAmount, setInvoiceAmount] = useState<any>()
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({})
  const [approveWorkOrder] = useApproveWorkOrderMutation()
  const toast = useRef<Toast>(null)

  const validateFields = () => {
    const errors: { [key: string]: string } = {}

    if (!invoiceAmount) {
      errors.Reason = 'Customer Name is required'
    }
  }

  const handleBack = () => {
    setVisible(false)
  }

  const ApproveWorkOrderMethod = async () => {
    try {
      const params: Params = {}
      if (invoiceAmount) {
        params.invoiceAmount = invoiceAmount
      }
      const response = await approveWorkOrder({ id: id, invoiceAmount: invoiceAmount }).unwrap()
      const { status, content, message, totalSize } = response as WorkOrderResponse
      if (status === 200 && Array.isArray(content)) {
        closeModal()
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      } else {
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message: msg } = error as ErrorResponse
      console.error('Error occurred while fetching customer data:', msg)
    }
  }

  return (
    <>
      <div>
        <Toast ref={toast} />

        <div className=" mt-4">
          <span className="font-medium text-sm text-[#000000]">
            <div className="flex gap-2 ml-2">
              Invoice Amount
              <p className="text-red-600">*</p>
            </div>
          </span>
          <div className="mt-1 ml-1 text-[#000000]">
            <div className="">
              <InputComponent
                type="number"
                value={invoiceAmount}
                onChange={(e) => {
                  setInvoiceAmount(e.target.value)
                }}
                style={{
                  width: '450px',
                  height: '40px',
                  border: errorMessage.value ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  boxShadow: 'none',
                  paddingLeft: '0.5rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
          <p>{errorMessage.value && <small className="p-error">{errorMessage.value}</small>}</p>
        </div>
      </div>
      {/* Save and Back buttons */}
      <div
        className={`"flex  absolute "`}
        style={{
          width: '100%',
          height: '65px',
          backgroundColor: 'white',
          padding: '0 12px',
          bottom: '0px',

          // border:"1px solid red"
        }}>
        <Button
          label={'Save'}
          onClick={ApproveWorkOrderMethod}
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
          onClick={handleBack}
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

export default ApproveModal
