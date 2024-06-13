import React, { useState } from 'react'
import ButtonComponent from '../../CommonComponent/ButtonComponent'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import InputComponent from '../../CommonComponent/InputComponent'
import { IoIosAdd } from 'react-icons/io'
import { GrFormSubtract } from 'react-icons/gr'
import { Button } from 'primereact/button'

const AddEstimates = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>('')
  const [mooringId, setMooringId] = useState<string>('')
  const [boatyards, setBoatyards] = useState<string>('')
  const [assignedTo, setAssignedTo] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [scheduleDate, setScheduleDate] = useState<string>('')
  const [workOrderStatus, setWorkOrderStatus] = useState<string>('')
  const [fieldError, setFieldError] = useState<{ [key: string]: string }>({})
  const [workEstimate, setWorkEstimate] = useState<any>({
    customerName: '',
    mooringId: '',
    boatyards: '',
    assignedTo: '',
    dueDate: '',
    scheduleDate: '',
    workOrderStatus: '',
    value: '',
  })

  const validateFields = () => {
    const errors: { [key: string]: string } = {}

    if (!workEstimate.customerName) {
      errors.customerName = 'Customer Name is required'
    }

    if (!workEstimate.mooringId) {
      errors.mooringId = 'Mooring Id is required'
    }

    if (!workEstimate.boatyards) {
      errors.boatyards = 'Boatyard is required'
    }

    if (!workEstimate.assignedTo) {
      errors.assignedTo = 'Assigned to is required'
    }

    if (!workEstimate.dueDate) {
      errors.dueDate = 'Due Date is required'
    }

    if (!workEstimate.scheduleDate) {
      errors.scheduleDate = 'Schedule Date is required'
    }

    if (!workEstimate.workOrderStatus) {
      errors.workOrderStatus = 'Work order Status is required'
    }

    if (!workEstimate.time) {
      errors.time = 'Time is required'
    }

    if (!workEstimate.value) {
      errors.value = 'Problem description is required'
    }

    setFieldError(errors)
    return errors
  }

  const handleInputChange = (field: string, value: any) => {
    setWorkEstimate({
      ...workEstimate,
      [field]: value,
    })

    if (fieldError[field]) {
      setFieldError({
        ...fieldError,
        [field]: '',
      })
    }
  }

  const saveEstimate = () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setFieldError(errors)
      return
    }
  }

  return (
    <div>
      <div>
        <div className="w-full h-full ml-4">
          {/* Customer Name */}
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
                  value={workEstimate.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  options={[]}
                  optionLabel="name"
                  editable
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldError.customerName ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
              <p>
                {fieldError.customerName && (
                  <small className="p-error">{fieldError.customerName}</small>
                )}
              </p>
            </div>

            {/* Customer ID */}
            {/* <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Customer ID
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <InputComponent
                  value={customerId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCustomerId(e.target.value)
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
            </div> */}

            {/* Mooring ID */}
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Mooring ID
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <Dropdown
                  value={workEstimate.mooringId}
                  onChange={(e) => handleInputChange('mooringId', e.target.value)}
                  options={[]}
                  optionLabel="name"
                  editable
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldError.mooringId ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
              <p>
                {fieldError.mooringId && <small className="p-error">{fieldError.mooringId}</small>}
              </p>
            </div>
          </div>

          {/* Boatyards */}
          <div className="flex gap-6 mt-3">
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Boatyard
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <Dropdown
                  value={workEstimate.boatyards}
                  onChange={(e) => handleInputChange('boatyards', e.target.value)}
                  options={[]}
                  optionLabel="name"
                  editable
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldError.boatyards ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
              <p>
                {fieldError.boatyards && <small className="p-error">{fieldError.boatyards}</small>}
              </p>
            </div>

            {/* Assigned to */}
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Assigned to
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <Dropdown
                  value={workEstimate.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                  options={[]}
                  editable
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldError.assignedTo ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
              <p>
                {fieldError.assignedTo && (
                  <small className="p-error">{fieldError.assignedTo}</small>
                )}
              </p>
            </div>

            {/* Due Date */}
            <div className="">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Due Date
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <InputComponent
                  value={workEstimate.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  type="text"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldError.dueDate ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
              <p>{fieldError.dueDate && <small className="p-error">{fieldError.dueDate}</small>}</p>
            </div>
          </div>

          {/* Schedule Date */}
          <div className="flex gap-6 mt-3">
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Schedule Date
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <InputComponent
                  value={workEstimate.scheduleDate}
                  onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldError.scheduleDate ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
              <p>
                {fieldError.scheduleDate && (
                  <small className="p-error">{fieldError.scheduleDate}</small>
                )}
              </p>
            </div>

            {/* Status */}
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Status
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <Dropdown
                  value={workEstimate.workOrderStatus}
                  onChange={(e) => handleInputChange('workOrderStatus', e.target.value)}
                  options={[]}
                  optionLabel="name"
                  editable
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldError.workOrderStatus ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
              <p>
                {fieldError.workOrderStatus && (
                  <small className="p-error">{fieldError.workOrderStatus}</small>
                )}
              </p>
            </div>

            {/* Time (in minutes) */}
            <div className="card  ">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Time(in minutes)
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div
                className="mt-1"
                style={{
                  width: '8vw',
                  height: '32px',
                  border: fieldError.time ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                }}>
                <div className="flex justify-around text-center">
                  <h1 className="mt-1 p-[0.1rem] bg-slate-400 rounded-md">
                    <GrFormSubtract />
                  </h1>
                  <p>00:25</p>
                  <h1 className="mt-1 p-[0.1rem] bg-slate-400 rounded-md">
                    <IoIosAdd />
                  </h1>
                </div>
              </div>
              <p>{fieldError.time && <small className="p-error">{fieldError.time}</small>}</p>
            </div>
          </div>

          {/* Report Problem */}
          <div className=" mt-4 mb-20">
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Report Problem
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <div className="">
                <InputComponent
                  value={workEstimate.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  style={{
                    width: '740px',
                    height: '66px',
                    border: fieldError.value ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    boxShadow: 'none',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
            </div>
            <p>{fieldError.value && <small className="p-error">{fieldError.value}</small>}</p>
          </div>

          {/* Save and Back buttons */}
          <div
            className="flex gap-6 bottom-2 absolute left-7 "
            style={{
              width: '100%',
              height: '80px',
              backgroundColor: 'white',
              padding: '0 12px',
              bottom: '0px',
            }}>
            <Button
              onClick={saveEstimate}
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
              onClick={() => setModalVisible(false)}
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
      </div>
    </div>
  )
}

export default AddEstimates
