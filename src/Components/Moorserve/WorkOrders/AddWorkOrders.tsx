import React, { useState, useEffect, useCallback, useRef } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { IoIosAdd } from 'react-icons/io'
import { GrFormSubtract } from 'react-icons/gr'
import { FaFileUpload } from 'react-icons/fa'
import { ErrorResponse, WorkOrderResponse } from '../../../Type/ApiTypes'
import {
  useAddWorkOrderMutation,
  useUpdateWorkOrderMutation,
} from '../../../Services/MoorServe/MoorserveApi'
import {
  useAddEstimateMutation,
  useUpdateEstimateMutation,
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
import { MetaData, MetaDataCustomer, MetaDataTechnician } from '../../../Type/CommonType'
import {
  BoatyardNameData,
  CustomersData,
} from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import { Calendar } from 'primereact/calendar'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'

const AddWorkOrders: React.FC<WorkOrderProps> = ({
  workOrderData,
  editModeEstimate,
  editModeWorkOrder,
  estimate,
  setVisible,
  closeModal,
}) => {
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

  const [time, setTime] = useState({ minutes: 0, seconds: 0 })
  const [basedOnCustomerIdAndBoatyardId, setbasedOnCustomerIdAndBoatyardId] = useState<MetaData[]>()
  const [mooringsBasedOnBoatyardIdData, setMooringsBasedOnBoatyardIdData] = useState<MetaData[]>()
  const [mooringBasedOnCustomerId, setMooringBasedOnCustomerId] = useState<MetaData[]>()
  const [boatyardBasedOnMooringId, setBoatyardBasedOnMooringId] = useState<MetaData[]>()
  const [customerBasedOnMooringId, setCustomerBasedOnMooringId] = useState<any[]>()
  const [technicians, setTechnicians] = useState<MetaDataTechnician[]>()
  const [moorings, setMoorings] = useState<MetaData[]>()
  const [workOrderStatusValue, setWorkOrderStatusValue] = useState<MetaData[]>()
  const [customerNameValue, setcustomerNameValue] = useState<any[]>()
  const [boatyardsName, setBoatYardsName] = useState<MetaData[]>([])
  const [editMode, setEditMode] = useState<boolean>(
    editModeWorkOrder ? editModeWorkOrder : false || editModeEstimate ? editModeEstimate : false,
  )
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({})
  const [lastChangedField, setLastChangedField] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [customerImage, setCustomerImage] = useState<any>()
  const [encodedImages, setEncodedImages] = useState<string[]>([])
  const toast = useRef<Toast>(null)

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
  const [saveEstimation] = useAddEstimateMutation()
  const [updateEstimate] = useUpdateEstimateMutation()
  const toastRef = useRef<Toast>(null)

  const boatyardsNameOptions = workOrder?.mooringId?.id ? boatyardBasedOnMooringId : boatyardsName
  const CustomerNameOptions = workOrder?.mooringId?.id
    ? customerBasedOnMooringId
    : customerNameValue

  const MooringNameOptions = (() => {
    if (workOrder?.customerName?.id && workOrder?.boatyards?.id) {
      return basedOnCustomerIdAndBoatyardId
    } else if (workOrder?.customerName?.id) {
      return mooringBasedOnCustomerId
    } else if (workOrder?.boatyards?.id) {
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
      errors.mooringId = 'Mooring Number is required'
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

    if (time.minutes === 0 && time.seconds === 0) errors.time = 'Time is required.'

    if (!workOrder.value) {
      errors.value = 'Problem description is required'
    }

    setErrorMessage(errors)
    return errors
  }

  const handleInputChange = (field: string, value: any) => {
    let updatedWorkOrder = { ...workOrder, [field]: value }

    if (editMode) {
      if (field === 'mooringId') {
        updatedWorkOrder = {
          ...updatedWorkOrder,
          mooringId: value,
          customerName: lastChangedField === 'customerName' ? updatedWorkOrder.customerName : '',
          boatyards: lastChangedField === 'boatyards' ? updatedWorkOrder.boatyards : '',
        }
      } else if (field === 'customerName') {
        updatedWorkOrder = {
          ...updatedWorkOrder,
          customerName: value,
          mooringId: lastChangedField === 'mooringId' ? updatedWorkOrder.mooringId : '',
          boatyards: lastChangedField === 'boatyards' ? updatedWorkOrder.boatyards : '',
        }
      } else if (field === 'boatyards') {
        updatedWorkOrder = {
          ...updatedWorkOrder,
          boatyards: value,
          customerName: lastChangedField === 'customerName' ? updatedWorkOrder.customerName : '',
          mooringId: lastChangedField === 'mooringId' ? updatedWorkOrder.mooringId : '',
        }
      }
      setLastChangedField(field)
      setEditMode(false)
    }

    setWorkOrder(updatedWorkOrder)
    if (errorMessage[field]) {
      setErrorMessage({
        ...errorMessage,
        [field]: '',
      })
    }
  }

  const handleEditMode = () => {
    setWorkOrder((prevState: any) => ({
      ...prevState,
      mooringId: workOrderData?.mooringResponseDto?.mooringNumber,
      customerName:
        workOrderData?.customerResponseDto?.firstName +
        ' ' +
        workOrderData?.customerResponseDto?.lastName,
      boatyards: workOrderData?.boatyardResponseDto?.boatyardName,
      assignedTo: workOrderData?.technicianUserResponseDto?.name,
      dueDate: workOrderData?.dueDate,
      scheduleDate: workOrderData?.scheduledDate,
      workOrderStatus: workOrderData?.workOrderStatusDto?.status,
      value: workOrderData?.problem,
    }))
    const parseTime = (timeString: any) => {
      const [hours, minutes, seconds] = timeString.split(':').map(Number)
      return { minutes: hours * 60 + minutes, seconds }
    }
    const parsedTime = parseTime(workOrderData.time)
    setTime(parsedTime)
  }

  const handleIncrement = () => {
    let { minutes, seconds } = time
    if (seconds < 59) {
      seconds += 1
    } else {
      minutes += 1
      seconds = 0
    }
    setTime({ minutes, seconds })
    setErrorMessage((prevError) => ({ ...prevError, time: '' }))
  }

  const handleDecrement = () => {
    let { minutes, seconds } = time
    if (seconds > 0) {
      seconds -= 1
    } else if (minutes > 0) {
      minutes -= 1
      seconds = 59
    }
    setTime({ minutes, seconds })
    setErrorMessage((prevError) => ({ ...prevError, time: '' }))
  }

  const handleTimeChange = (event: { target: { value: any } }) => {
    const [min, sec] = event.target.value.split(':').map(Number)
    if (!isNaN(min) && !isNaN(sec) && min >= 0 && sec >= 0 && sec < 60) {
      setTime({ minutes: min, seconds: sec })
      setErrorMessage((prevError) => ({ ...prevError, time: '' }))
    }
  }

  const formatTime = (minutes: number, seconds: number) => {
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  const formatDate = (date: any) => {
    if (!date) return null
    const d = new Date(date)
    const month = ('0' + (d.getMonth() + 1)).slice(-2)
    const day = ('0' + d.getDate()).slice(-2)
    const year = d.getFullYear()
    return `${month}/${day}/${year}`
  }

  const parseDate = (dateString: any) => {
    if (!dateString) return null
    const [month, day, year] = dateString.split('/')
    return new Date(year, month - 1, day)
  }

  const handleImageChange = (event: any) => {
    const fileInput = event.target
    const file = fileInput.files?.[0]

    if (file) {
      if (!file.type.startsWith('image/')) {
        setCustomerImage('')
        setEncodedImages([])
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Only image files are allowed',
          life: 3000,
        })
        fileInput.value = '' // Reset input value
        return
      }

      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result
        if (typeof result === 'string') {
          const base64String = result.split(',')[1]
          setCustomerImage(`data:image/png;base64,${base64String}`)
          setEncodedImages([base64String])
        } else {
          console.error('FileReader result is not a string.')
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setCustomerImage(null)
    setEncodedImages([])
    const fileInput = document.getElementById('file-input') as HTMLInputElement
    if (fileInput) {
      fileInput.value = '' // Reset input value
    }
  }

  const SaveWorkOrder = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors)
      return
    }

    const payload = {
      mooringId: workOrder?.mooringId?.id,
      customerId: workOrder?.customerName?.id,
      boatyardId: workOrder?.boatyards?.id,
      technicianId: workOrder?.assignedTo?.id,
      dueDate: formatDate(workOrder?.dueDate),
      scheduledDate: formatDate(workOrder?.scheduleDate),
      workOrderStatusId: workOrder?.workOrderStatus?.id,
      time: '00:' + formatTime(time.minutes, time.seconds),
      problem: workOrder?.value,
      encodedImages: encodedImages,
    }

    try {
      const response = await saveWorkOrder(payload).unwrap()
      const { status, message } = response as WorkOrderResponse
      if (status === 200 || status === 201) {
        closeModal()
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: message,
          life: 3000,
        })
        setIsLoading(false)
      } else {
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message } = error as ErrorResponse
      setIsLoading(false)
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000,
      })
    }
  }

  const UpdateWorkOrder = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    try {
      setIsLoading(true)
      const editPayload = {
        mooringId: workOrder?.mooringId?.id || workOrderData?.mooringResponseDto?.id,
        customerId: workOrder?.customerName?.id || workOrderData?.customerResponseDto?.id,
        boatyardId: workOrder?.boatyards?.id || workOrderData?.boatyardResponseDto?.id,
        technicianId: workOrder?.assignedTo?.id || workOrderData?.technicianUserResponseDto?.id,
        dueDate: workOrder?.dueDate || workOrderData?.dueDate,
        scheduledDate: workOrder?.scheduleDate || workOrderData?.scheduledDate,
        workOrderStatusId: workOrder?.workOrderStatus?.id || workOrderData?.workOrderStatusDto?.id,
        time: '00:' + formatTime(time.minutes, time.seconds) || workOrderData?.time,
        problem: workOrder?.value || workOrderData?.problem,
        encodedImages: encodedImages,
      }
      const response = await updateWorkOrder({
        payload: editPayload,
        id: workOrderData?.id,
      }).unwrap()
      const { status, message } = response as WorkOrderResponse
      if (status === 200 || status === 201) {
        setIsLoading(false)
        closeModal()
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: message,
          life: 3000,
        })
      } else {
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      setIsLoading(false)
      const { message } = error as ErrorResponse
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000,
      })
    }
  }

  const SaveEstimate = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors)
      return
    }
    const payload = {
      mooringId: workOrder?.mooringId?.id,
      customerId: workOrder?.customerName?.id,
      boatyardId: workOrder?.boatyards?.id,
      technicianId: workOrder?.assignedTo?.id,
      dueDate: formatDate(workOrder?.dueDate),
      scheduledDate: formatDate(workOrder?.scheduleDate),
      workOrderStatusId: workOrder?.workOrderStatus?.id,
      time: '00:' + formatTime(time.minutes, time.seconds),
      problem: workOrder?.value,
    }

    try {
      const response = await saveEstimation(payload).unwrap()
      const { status, message } = response as WorkOrderResponse
      if (status === 200 || status === 201) {
        closeModal()
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: message,
          life: 3000,
        })
        setIsLoading(false)
      } else {
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message } = error as ErrorResponse
      setIsLoading(false)
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000,
      })
    }
  }

  const UpdateEstimate = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    try {
      setIsLoading(true)
      const editCustomerPayload = {
        mooringId: workOrder?.mooringId?.id || workOrderData?.mooringResponseDto?.id,
        customerId: workOrder?.customerName?.id || workOrderData?.customerResponseDto?.id,
        boatyardId: workOrder?.boatyards?.id || workOrderData?.boatyardResponseDto?.id,
        technicianId: workOrder?.assignedTo?.id || workOrderData?.technicianUserResponseDto?.id,
        dueDate: workOrder?.dueDate || workOrderData?.dueDate,
        scheduledDate: workOrder?.scheduleDate || workOrderData?.scheduledDate,
        workOrderStatusId: workOrder?.workOrderStatus?.id || workOrderData?.workOrderStatusDto?.id,
        time: '00:' + formatTime(time.minutes, time.seconds) || workOrderData?.time,
        problem: workOrder?.value || workOrderData?.problem,
      }
      const response = await updateEstimate({
        payload: editCustomerPayload,
        id: workOrderData?.id,
      }).unwrap()
      const { status, message } = response as WorkOrderResponse
      if (status === 200 || status === 201) {
        setIsLoading(false)
        closeModal()
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: message,
          life: 3000,
        })
      } else {
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      setIsLoading(false)
      const { message } = error as ErrorResponse
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000,
      })
    }
  }

  const handleSave = () => {
    if (estimate) {
      if (editModeEstimate) {
        UpdateEstimate()
      } else {
        SaveEstimate()
      }
    } else {
      if (editModeWorkOrder) {
        UpdateWorkOrder()
      } else {
        SaveWorkOrder()
      }
    }
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { getTechnicians } = await getTechniciansData()
    const { mooringIds } = await getMooringIdsData()
    const { WorkOrderStatus } = await getWorkOrderStatusData()
    const { customersData } = await getCustomersData()
    const { boatYardName } = await getBoatYardNameData()

    if (getTechnicians !== null) {
      setIsLoading(false)
      setTechnicians(getTechnicians)
    }
    if (mooringIds !== null) {
      setIsLoading(false)
      setMoorings(mooringIds)
    }
    if (WorkOrderStatus !== null) {
      setIsLoading(false)
      setWorkOrderStatusValue(WorkOrderStatus)
    }
    if (customersData !== null) {
      const firstLastName = customersData.map((item) => ({
        firstName: item.firstName + ' ' + item.lastName,
        id: item.id,
      }))
      setIsLoading(false)
      setcustomerNameValue(firstLastName)
    }
    if (boatYardName !== null) {
      setIsLoading(false)
      setBoatYardsName(boatYardName)
    }
  }, [])

  const fetchDataAndUpdateBasedOnCustomerId = useCallback(async () => {
    const { mooringsBasedOnCustomerId } = await getMooringsBasedOnCustomerIdData()

    if (mooringsBasedOnCustomerId !== null) {
      setIsLoading(false)
      setMooringBasedOnCustomerId(mooringsBasedOnCustomerId)
      if (mooringsBasedOnCustomerId?.length === 0) {
        toast.current?.show({
          severity: 'info',
          summary: 'Info',
          detail: 'No Mooring Associated with Selected Customer',
          life: 3000,
        })
      }
    }
  }, [workOrder?.customerName?.id])

  const fetchDataAndUpdateBasedOnMooringId = useCallback(async () => {
    const { boatyardBasedOnMooringId } = await getBoatyardBasedOnMooringIdData()
    const { customerBasedOnMooringId } = await getCustomerBasedOnMooringIdData()

    if (boatyardBasedOnMooringId !== null) {
      setIsLoading(false)
      setBoatyardBasedOnMooringId(boatyardBasedOnMooringId)
      if (boatyardBasedOnMooringId?.length === 0) {
        toast.current?.show({
          severity: 'info',
          summary: 'Info',
          detail: 'No Boatyard Associated with Selected Mooring',
          life: 3000,
        })
      }
    }

    if (customerBasedOnMooringId !== null) {
      if (customerBasedOnMooringId?.length === 0) {
        toast.current?.show({
          severity: 'info',
          summary: 'Info',
          detail: 'No Customer Associated with Selected Mooring',
          life: 3000,
        })
      } else {
        const firstLastName = customerBasedOnMooringId.map((item: any) => ({
          firstName: item.firstName + ' ' + item.lastName,
          id: item.id,
        }))
        setIsLoading(false)
        setCustomerBasedOnMooringId(firstLastName)
      }
    } else {
      toast.current?.show({
        severity: 'info',
        summary: 'Info',
        detail: 'No Customer Associated with Selected Mooring',
        life: 3000,
      })
    }
  }, [workOrder?.mooringId?.id])

  const fetchDataAndUpdateBasedOnBoatyardId = useCallback(async () => {
    const { mooringBasedOnBoatyardId } = await getMooringsBasedOnBoatyardIdData()

    if (mooringBasedOnBoatyardId !== null) {
      setMooringsBasedOnBoatyardIdData(mooringBasedOnBoatyardId)
      if (mooringBasedOnBoatyardId?.length === 0) {
        toast.current?.show({
          severity: 'info',
          summary: 'Info',
          detail: 'No Mooring Associated with Selected Boatyard',
          life: 3000,
        })
      }
    }
  }, [workOrder?.boatyards?.id])

  const fetchDataAndUpdateBasedOnCuatomerIdAndBoatyardId = useCallback(async () => {
    const { mooringbasedOnCustomerIdAndBoatyardId } =
      await getMooringBasedOnCustomerIdAndBoatyardIdData()

    if (mooringbasedOnCustomerIdAndBoatyardId !== null) {
      setbasedOnCustomerIdAndBoatyardId(mooringbasedOnCustomerIdAndBoatyardId)
      if (mooringbasedOnCustomerIdAndBoatyardId?.length === 0) {
        toast.current?.show({
          severity: 'info',
          summary: 'Info',
          detail: 'No Mooring Associated with Selected Customer and Boatyard',
          life: 3000,
        })
      }
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

  useEffect(() => {
    if (editModeWorkOrder || editModeEstimate) {
      handleEditMode()
    }
  }, [editModeWorkOrder, editModeEstimate])

  return (
    <>
      <div className={`"w-full h-full mb-16 ml-4" ${isLoading ? "blurred" : ""}`}>
        <Toast ref={toastRef} />

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
                value={workOrder.customerName?.firstName || workOrder.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                options={CustomerNameOptions}
                optionLabel="firstName"
                editable
                disabled={isLoading}
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

          {/* Mooring Number */}
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Mooring Number
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <Dropdown
                value={workOrder.mooringId?.mooringNumber || workOrder.mooringId}
                onChange={(e) => handleInputChange('mooringId', e.target.value)}
                options={MooringNameOptions}
                optionLabel="mooringNumber"
                editable
                disabled={isLoading}
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
          <div className="">
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">Work Order Image</div>
            </span>
            <div className="mt-1">
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  display: 'none',
                }}
              />
              <label
                htmlFor="file-input"
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '3px',
                  display: 'flex',
                  gap: '0.5rem',
                  textAlign: 'center',
                  lineHeight: '25px',
                  cursor: 'pointer',
                }}>
                <FaFileUpload style={{ fontSize: '25px', color: 'blue' }} />
                Upload Image
              </label>
              {customerImage && (
                <div className="mt-2">
                  <button
                    onClick={handleRemoveImage}
                    style={{
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    &times;
                  </button>
                  <img
                    src={customerImage}
                    alt="Customer"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '0.50rem',
                    }}
                  />
                </div>
              )}
            </div>
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
                value={workOrder.boatyards?.boatyardName || workOrder.boatyards}
                onChange={(e) => handleInputChange('boatyards', e.target.value)}
                options={boatyardsNameOptions}
                optionLabel="boatyardName"
                editable
                disabled={isLoading}
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
                optionLabel="name"
                editable
                disabled={isLoading}
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

          {isLoading && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '45%',
                left: '45%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
              }}
              strokeWidth="4"
            />
          )}

          {/* Due Date */}
          <div className="">
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Due Date
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <Calendar
                value={parseDate(workOrder.dueDate)}
                onChange={(e) => handleInputChange('dueDate', formatDate(e.target.value))}
                dateFormat="mm/dd/yy"
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.dueDate ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
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
              <Calendar
                value={parseDate(workOrder.scheduleDate)}
                onChange={(e) => handleInputChange('scheduleDate', formatDate(e.target.value))}
                dateFormat="mm/dd/yy"
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.scheduleDate ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
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
                disabled={isLoading}
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
              <div className="flex flex-wrap gap-1">
                <p className="font-medium text-sm text-[#000000] mt-0.5"> Time </p>
                <span>(in minutes)</span>
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div
              className=""
              style={{
                // width: '8vw',
                maxWidth: '100%',
                height: '32px',
                border: errorMessage.time ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
              }}>
              <div className="flex justify-around text-center">
                <h1
                  className="mt-1 p-[0.1rem] bg-slate-300 rounded-md cursor-pointer"
                  onClick={handleDecrement}>
                  <GrFormSubtract />
                </h1>
                <input
                  type="text"
                  value={formatTime(time.minutes, time.seconds)}
                  onChange={handleTimeChange}
                  className="text-center w-16"
                  style={{
                    boxShadow: 'none',
                    //  border: errorMessage.time ? '1px solid red' : '1px solid #D5E1EA',
                  }}
                />
                <h1
                  className="mt-1 p-[0.1rem] bg-slate-300 rounded-md cursor-pointer"
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
          <div className="mt-1 text-[#000000]">
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
          className={`"flex gap-6 bottom-2 absolute left-7" ${isLoading ? "blurred" : ""}`}
          style={{
            width: '100%',
            height: '80px',
            backgroundColor: 'white',
            padding: '0 12px',
            bottom: '0px',
          }}>
          <Button
            onClick={() => {
              handleSave()
            }}
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

export default AddWorkOrders
