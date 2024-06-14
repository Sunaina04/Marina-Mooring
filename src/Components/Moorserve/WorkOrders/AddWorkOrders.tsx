import React, { useState, useEffect, useCallback } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { IoIosAdd } from 'react-icons/io'
import { GrFormSubtract } from 'react-icons/gr'
import { WorkOrderResponse } from '../../../Type/ApiTypes'
import {
  useAddWorkOrderMutation,
  useUpdateWorkOrderMutation,
} from '../../../Services/MoorServe/MoorserveApi'
import { Button } from 'primereact/button'
import { WorkOrderProps } from '../../../Type/ComponentBasedType'
import InputComponent from '../../CommonComponent/InputComponent'
import {
  GetBoatyardBasedOnMooringId,
  GetCustomerBasedOnMooringId,
  GetMooringBasedOnCustomerIdAndBoatyardId,
  GetMooringIds,
  GetMooringsBasedOnBoatyardId,
  GetMooringsBasedOnCustomerId,
  GetTechnicians,
  GetWorkOrderStatus,
} from '../../CommonComponent/MetaDataComponent/MoorserveMetaDataApi'
import { MetaData, MetaDataCustomer } from '../../../Type/CommonType'
import {
  BoatyardNameData,
  CustomersData,
} from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'

const AddWorkOrders: React.FC<WorkOrderProps> = ({ workOrderData, editMode, setVisible }) => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [workOrder, setWorkOrder] = useState<any>({
    customerName: '',
    mooringId: '',
    boatyards: '',
    assignedTo: '',
    dueDate: '',
    scheduleDate: '',
    workOrderStatus: '',
    value: '',
  })
  const [value, setValue] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>('')
  const [mooringId, setMooringId] = useState<string>('')
  const [boatyards, setBoatyards] = useState<string>('')
  const [assignedTo, setAssignedTo] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [scheduleDate, setScheduleDate] = useState<string>('')
  const [workOrderStatus, setWorkOrderStatus] = useState<string>('')
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [basedOnCustomerIdAndBoatyardId, setbasedOnCustomerIdAndBoatyardId] = useState<MetaData[]>()
  const [mooringsBasedOnBoatyardIdData, setMooringsBasedOnBoatyardIdData] = useState<MetaData[]>()
  const [mooringBasedOnCustomerId, setMooringBasedOnCustomerId] = useState<MetaData[]>()
  const [boatyardBasedOnMooringId, setBoatyardBasedOnMooringId] = useState<MetaData[]>()
  const [customerBasedOnMooringId, setCustomerBasedOnMooringId] = useState<MetaData[]>()
  const [technicians, setTechnicians] = useState<MetaData[]>()
  const [moorings, setMoorings] = useState<MetaData[]>()
  const [workOrderStatusValue, setWorkOrderStatusValue] = useState<MetaData[]>()
  const [customerNameValue, setcustomerNameValue] = useState<MetaDataCustomer[]>([])
  const [boatyardsName, setBoatYardsName] = useState<MetaData[]>([])
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({})

  const { getMooringBasedOnCustomerIdAndBoatyardIdData } = GetMooringBasedOnCustomerIdAndBoatyardId(
    workOrder?.customerName?.id && workOrder?.customerName?.id,
    workOrder?.boatyards?.id && workOrder?.boatyards?.id,
  )
  const { getMooringsBasedOnCustomerIdData } = GetMooringsBasedOnCustomerId(
    workOrder?.customerName?.id && workOrder?.customerName?.id,
  )
  const { getMooringsBasedOnBoatyardIdData } = GetMooringsBasedOnBoatyardId(
    workOrder?.boatyards?.id && workOrder?.boatyards?.id,
  )
  const { getBoatyardBasedOnMooringIdData } = GetBoatyardBasedOnMooringId(
    workOrder?.mooringId?.id && workOrder?.mooringId?.id,
  )
  const { getCustomerBasedOnMooringIdData } = GetCustomerBasedOnMooringId(
    workOrder?.mooringId?.id && workOrder?.mooringId?.id,
  )
  const { getCustomersData } = CustomersData(selectedCustomerId)
  const { getBoatYardNameData } = BoatyardNameData(selectedCustomerId)
  const { getTechniciansData } = GetTechnicians()
  const { getMooringIdsData } = GetMooringIds()
  const { getWorkOrderStatusData } = GetWorkOrderStatus()
  const [saveWorkOrder] = useAddWorkOrderMutation()
  const [updateWorkOrder] = useUpdateWorkOrderMutation()

  const boatyardsNameOptions = workOrder?.mooringId ? boatyardBasedOnMooringId : boatyardsName
  const CustomerNameOptions = workOrder?.mooringId ? customerBasedOnMooringId : customerNameValue
  const MooringNameOptions = (() => {
    if (workOrder?.customerName && workOrder?.boatyards) {
      return basedOnCustomerIdAndBoatyardId
    } else if (workOrder?.customerName) {
      return mooringBasedOnCustomerId
    } else if (workOrder?.boatyards) {
      return mooringsBasedOnBoatyardIdData
    } else {
      return moorings
    }
  })()

  const validateFields = () => {
    const errors: { [key: string]: string } = {}

    if (!workOrder.customerName) {
      errors.customerName = 'Customer Name is required'
    }

    if (!workOrder.mooringId) {
      errors.mooringId = 'Mooring Id is required'
    }

    if (!workOrder.boatyards) {
      errors.boatyards = 'Boatyard is required'
    }

    if (!workOrder.assignedTo) {
      errors.assignedTo = 'Assigned to is required'
    }

    if (!workOrder.dueDate) {
      errors.dueDate = 'Due Date is required'
    }

    if (!workOrder.scheduleDate) {
      errors.scheduleDate = 'Schedule Date is required'
    }

    if (!workOrder.workOrderStatus) {
      errors.workOrderStatus = 'Work order Status is required'
    }

    if (!workOrder.time) {
      errors.time = 'Time is required'
    }

    if (!workOrder.value) {
      errors.value = 'Problem description is required'
    }

    setErrorMessage(errors)
    return errors
  }

  const handleInputChange = (field: string, value: any) => {
    setWorkOrder({
      ...workOrder,
      [field]: value,
    })

    if (errorMessage[field]) {
      setErrorMessage({
        ...errorMessage,
        [field]: '',
      })
    }
  }

  const SaveWorkOrder = () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors)
      return
    }
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { getTechnicians } = await getTechniciansData()
    const { mooringIds } = await getMooringIdsData()
    const { WorkOrderStatus } = await getWorkOrderStatusData()
    const { customersData } = await getCustomersData()
    const { boatYardName } = await getBoatYardNameData()

    if (getTechnicians !== null) {
      setTechnicians(getTechnicians)
    }

    if (mooringIds !== null) {
      setMoorings(mooringIds)
    }

    if (WorkOrderStatus !== null) {
      setWorkOrderStatusValue(WorkOrderStatus)
    }

    if (customersData !== null) {
      setcustomerNameValue(customersData)
    }

    if (boatYardName !== null) {
      setBoatYardsName(boatYardName)
    }
  }, [])

  const fetchDataAndUpdateBasedOnCustomerId = useCallback(async () => {
    const { mooringsBasedOnCustomerId } = await getMooringsBasedOnCustomerIdData()

    if (mooringsBasedOnCustomerId !== null) {
      setMooringBasedOnCustomerId(mooringsBasedOnCustomerId)
    }
  }, [workOrder?.customerName?.id])

  const fetchDataAndUpdateBasedOnMooringId = useCallback(async () => {
    const { boatyardBasedOnMooringId } = await getBoatyardBasedOnMooringIdData()
    const { customerBasedOnMooringId } = await getCustomerBasedOnMooringIdData()

    if (boatyardBasedOnMooringId !== null) {
      setBoatyardBasedOnMooringId(boatyardBasedOnMooringId)
    }

    if (customerBasedOnMooringId !== null) {
      setCustomerBasedOnMooringId(customerBasedOnMooringId)
    }
  }, [workOrder?.mooringId?.id])

  const fetchDataAndUpdateBasedOnBoatyardId = useCallback(async () => {
    const { mooringBasedOnBoatyardId } = await getMooringsBasedOnBoatyardIdData()

    if (mooringBasedOnBoatyardId !== null) {
      setMooringsBasedOnBoatyardIdData(mooringBasedOnBoatyardId)
    }
  }, [workOrder?.boatyards?.id])

  const fetchDataAndUpdateBasedOnCuatomerIdAndBoatyardId = useCallback(async () => {
    const { mooringbasedOnCustomerIdAndBoatyardId } =
      await getMooringBasedOnCustomerIdAndBoatyardIdData()

    if (mooringbasedOnCustomerIdAndBoatyardId !== null) {
      setbasedOnCustomerIdAndBoatyardId(mooringbasedOnCustomerIdAndBoatyardId)
    }
  }, [workOrder?.boatyards?.id, workOrder?.customerName?.id])

  useEffect(() => {
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  useEffect(() => {
    if (workOrder?.boatyards?.id) {
      fetchDataAndUpdateBasedOnBoatyardId()
    }
  }, [workOrder?.boatyards?.id])

  useEffect(() => {
    if (workOrder?.mooringId?.id) {
      fetchDataAndUpdateBasedOnMooringId()
    }
  }, [workOrder?.mooringId?.id])

  useEffect(() => {
    if (workOrder?.customerName?.id) {
      fetchDataAndUpdateBasedOnCustomerId()
    }
  }, [workOrder?.customerName?.id])

  useEffect(() => {
    if (workOrder?.customerName?.id && workOrder?.boatyards?.id) {
      fetchDataAndUpdateBasedOnCuatomerIdAndBoatyardId()
    }
  }, [workOrder?.customerName?.id, workOrder?.boatyards?.id])
  const handleIncrement = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 59) {
        setMinutes((prevMinutes) => prevMinutes + 1)
        return 0
      }
      return prevSeconds + 1
    })
  }

  const handleDecrement = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 0) {
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1)
          return 59
        }
        return 0
      }
      return prevSeconds - 1
    })
  }

  const handleTimeChange = (event: { target: { value: any } }) => {
    const value = event.target.value
    const [min, sec] = value.split(':').map(Number)
    if (!isNaN(min) && !isNaN(sec) && min >= 0 && sec >= 0 && sec < 60) {
      setMinutes(min)
      setSeconds(sec)
    }
  }

  const formatTime = (minutes: number, seconds: number) => {
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
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
                value={workOrder.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                options={CustomerNameOptions}
                optionLabel="firstName"
                editable
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.customerName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
            </div>
            <p>
              {errorMessage.customerName && (
                <small className="p-error">{errorMessage.customerName}</small>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerId(e.target.value)}
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
                value={workOrder.mooringId}
                onChange={(e) => handleInputChange('mooringId', e.target.value)}
                options={MooringNameOptions}
                optionLabel="mooringId"
                editable
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.mooringId ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
            <p>
              {errorMessage.mooringId && (
                <small className="p-error">{errorMessage.mooringId}</small>
              )}
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
                value={workOrder.boatyards}
                onChange={(e) => handleInputChange('boatyards', e.target.value)}
                options={boatyardsNameOptions}
                optionLabel="boatyardName"
                editable
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.boatyards ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
            </div>
            <p>
              {errorMessage.boatyards && (
                <small className="p-error">{errorMessage.boatyards}</small>
              )}
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
                value={workOrder.assignedTo}
                onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                options={technicians}
                optionLabel="technicianName"
                editable
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.assignedTo ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
            <p>
              {errorMessage.assignedTo && (
                <small className="p-error">{errorMessage.assignedTo}</small>
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
                value={workOrder.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                type="text"
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.dueDate ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
            </div>
            <p>
              {errorMessage.dueDate && <small className="p-error">{errorMessage.dueDate}</small>}
            </p>
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
                value={workOrder.scheduleDate}
                onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.scheduleDate ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
            </div>
            <p>
              {errorMessage.scheduleDate && (
                <small className="p-error">{errorMessage.scheduleDate}</small>
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
                value={workOrder.workOrderStatus}
                onChange={(e) => handleInputChange('workOrderStatus', e.target.value)}
                options={workOrderStatusValue}
                optionLabel="status"
                editable
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.workOrderStatus ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
            <p>
              {errorMessage.workOrderStatus && (
                <small className="p-error">{errorMessage.workOrderStatus}</small>
              )}
            </p>
          </div>

          {/* Time (in minutes) */}
          <div className="card  ">
            <span>
              <div className="flex gap-1">
                <span className="font-medium text-sm text-[#000000] mt-0.5"> Time </span>{' '}
                <span>(in minutes)</span>
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div
              className=""
              style={{
                width: '8vw',
                height: '32px',
                border: errorMessage.time ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
              }}>
              <div className="flex justify-around text-center">
                <h1
                  className="mt-1 p-[0.1rem] bg-slate-400 rounded-md cursor-pointer"
                  onClick={handleDecrement}>
                  <GrFormSubtract />
                </h1>
                <input
                  type="text"
                  value={formatTime(minutes, seconds)}
                  onChange={handleTimeChange}
                  className="text-center w-16 shadow-none"
                />
                <h1
                  className="mt-1 p-[0.1rem] bg-slate-400 rounded-md cursor-pointer"
                  onClick={handleIncrement}>
                  <IoIosAdd />
                </h1>
              </div>
            </div>
            <p>{errorMessage.time && <small className="p-error">{errorMessage.time}</small>}</p>
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
              <InputTextarea
                value={workOrder.value}
                rows={3}
                cols={30}
                onChange={(e) => handleInputChange('value', e.target.value)}
                style={{
                  width: '740px',
                  height: '66px',
                  border: errorMessage.value ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  boxShadow: 'none',
                  paddingLeft: '0.5rem',
                  resize: 'none',
                }}
              />
            </div>
          </div>
          <p>{errorMessage.value && <small className="p-error">{errorMessage.value}</small>}</p>
        </div>

        {/* Save and Back buttons */}
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
            onClick={SaveWorkOrder}
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
    </div>
  )
}

export default AddWorkOrders
