import React, { useCallback, useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import InputComponent from '../../CommonComponent/InputComponent'
import {
  useAddMooringsMutation,
  useUpdateMooringsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { MetaData } from '../../../Type/CommonType'
import { AddMooringProps } from '../../../Type/ComponentBasedType'
import CustomSelectPositionMap from '../../Map/CustomSelectPositionMap'
import {
  BoatyardNameData,
  CustomersData,
  TypeOfBoatType,
  TypeOfBottomChain,
  TypeOfChainCondition,
  TypeOfEye,
  TypeOfShackleSwivel,
  TypeOfSizeOfWeight,
  TypeOfWeightData,
} from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import { CustomerResponse, ErrorResponse } from '../../../Type/ApiTypes'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Calendar } from 'primereact/calendar'
import { Toast } from 'primereact/toast'
import { Checkbox } from 'primereact/checkbox'

const AddMoorings: React.FC<AddMooringProps> = ({
  moorings,
  editMode,
  mooringRowData,
  closeModal,
  getCustomer,
  getCustomerRecord,
}) => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const { getTypeOfBoatTypeData } = TypeOfBoatType()
  const { getTypeOfWeightData } = TypeOfWeightData()
  const { getTypeOfChainData } = TypeOfChainCondition()
  const { getTypeOfEyeData } = TypeOfEye()
  const { getTypeOfBottomChainData } = TypeOfBottomChain()
  const { getTypeOfShackleSwivelData } = TypeOfShackleSwivel()
  const { getTypeOfSizeOfWeightData } = TypeOfSizeOfWeight()
  const { getCustomersData } = CustomersData(selectedCustomerId)
  const { getBoatYardNameData } = BoatyardNameData(selectedCustomerId)

  const [type, setType] = useState<MetaData[]>([])
  const [weightData, setWeightData] = useState<MetaData[]>([])
  const [chainData, setChainData] = useState<MetaData[]>([])
  const [sizeOfWeight, setSizeOfWeight] = useState<MetaData[]>([])
  const [conditionOfEye, setConditionOfEye] = useState<MetaData[]>([])
  const [bottomChainCondition, setbottomChainCondition] = useState<MetaData[]>([])
  const [shackleSwivelData, setShackleSwivelData] = useState<MetaData[]>([])
  const [customerName, setcustomerName] = useState<any[]>([])
  const [boatyardsName, setBoatYardsName] = useState<MetaData[]>([])
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [firstErrorField, setFirstErrorField] = useState('')
  const [gpsCoordinatesValue, setGpsCoordinatesValue] = useState<string>()
  const [checkedDock, setCheckedDock] = useState(false)
  const toastRef = useRef<Toast>(null)

  const getFomattedCoordinate = (gpsCoordinatesValue: any) => {
    try {
      let [lat, long]: any = gpsCoordinatesValue.split(' ')
      if (lat.split('.').length > 2) {
        const [degree, minute, second]: any = lat.split('.').map((num: any) => parseInt(num))
        lat = degree + minute / 60 + second / 3600
      }
      if (long.split('.').length > 2) {
        const [degree, minute, second]: any = long.split('.').map((num: any) => parseInt(num))
        long = degree + minute / 60 + second / 3600
      }
      if (!(isNaN(lat) || isNaN(long))) {
        return [+lat, +long]
      }
    } catch (error) {
      console.log('Error In Setting Center', error)
      return [41.56725, 70.94045]
    }
    // return [41.56725, 70.94045]
  }

  const [center, setCenter] = useState<any>(
    mooringRowData?.gpsCoordinates || gpsCoordinatesValue
      ? getFomattedCoordinate(mooringRowData?.gpsCoordinates || gpsCoordinatesValue)
      : [41.56725, 70.94045],
  )
  const [saveMoorings] = useAddMooringsMutation()
  const [updateMooring] = useUpdateMooringsMutation()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<any>({
    customerName: '',
    mooringNumber: '',
    harbor: '',
    waterDepth: '',
    gpsCoordinates: '',
    boatName: '',
    boatSize: '',
    boatWeight: '',
    sizeOfWeight: '',
    typeOfWeight: '',
    type: '',
    topChainCondition: '',
    conditionOfEye: '',
    bottomChainCondition: '',
    shackleSwivelCondition: '',
    pendantCondition: '',
    depthAtMeanHighWater: '',
    boatYardName: '',
    note: '',
    bottomChainDate: '',
    topChainDate: '',
    conditionEyeDate: '',
  })

  const fetchMetaData = useCallback(async () => {
    const { typeOfBoatTypeData } = await getTypeOfBoatTypeData()
    const { typeOfWeightData } = await getTypeOfWeightData()
    const { typeOfChainData } = await getTypeOfChainData()
    const { TypeOfSizeOfWeightData } = await getTypeOfSizeOfWeightData()
    const { typeOfEyeData } = await getTypeOfEyeData()
    const { typeOfBottomChainData } = await getTypeOfBottomChainData()
    const { typeOfShackleSwivelData } = await getTypeOfShackleSwivelData()
    const { customersData } = await getCustomersData()
    const { boatYardName } = await getBoatYardNameData()

    if (typeOfWeightData !== null) {
      setIsLoading(false)
      setWeightData(typeOfWeightData)
    }
    if (typeOfChainData !== null) {
      setIsLoading(false)
      setChainData(typeOfChainData)
    }
    if (TypeOfSizeOfWeightData !== null) {
      setIsLoading(false)
      setSizeOfWeight(TypeOfSizeOfWeightData)
    }
    if (typeOfEyeData !== null) {
      setIsLoading(false)
      setConditionOfEye(typeOfEyeData)
    }

    if (typeOfBottomChainData !== null) {
      setIsLoading(false)
      setbottomChainCondition(typeOfBottomChainData)
    }

    if (typeOfBoatTypeData !== null) {
      setIsLoading(false)
      setType(typeOfBoatTypeData)
    }

    if (customersData !== null) {
      setIsLoading(false)
      const firstLastName = customersData.map((item) => ({
        label: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      setcustomerName(firstLastName)
    }

    if (boatYardName !== null) {
      setIsLoading(false)
      setBoatYardsName(boatYardName)
    }
  }, [])

  const validateFields = () => {
    const numberRegex = /^[0-9]+$/
    const harborRegex = /^[a-zA-Z ]+$/
    const alphanumericRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/
    const nameRegex = /^[a-zA-Z ]+$/
    const errors: { [key: string]: string } = {}
    let firstError = ''

    if (!formData?.customerName) {
      errors.customerName = 'Customer Name is required'
      if (!firstError) firstError = 'customerName'
    }

    if (!formData?.mooringNumber) {
      errors.mooringNumber = 'Mooring Number is required'
      if (!firstError) firstError = 'mooringNumber'
    } else if (!alphanumericRegex.test(formData?.mooringNumber)) {
      errors.mooringNumber = 'Mooring Number must be alphanumeric'
      if (!firstError) firstError = 'mooringNumber'
    }

    if (!formData?.harbor) {
      errors.harbor = 'Harbor/Area is required'
      if (!firstError) firstError = 'harbor'
    } else if (!harborRegex.test(formData?.harbor)) {
      errors.harbor = 'Harbor/Area must only contain letters'
      if (!firstError) firstError = 'harbor'
    }

    // if (!formData?.waterDepth) {
    //   errors.waterDepth = 'Water Depth is required'
    // } else if (!numberRegex.test(String(formData?.waterDepth))) {
    //   errors.waterDepth = 'Water Depth must be a number'
    //   if (!firstError) firstError = 'waterDepth'
    // }

    if (!gpsCoordinatesValue) {
      errors.gpsCoordinatesValue = 'GPS Coordinates is required'
    }

    if (!formData?.boatName) {
      errors.boatName = 'BoatName is required'
      if (!firstError) firstError = 'boatName'
    } else if (!nameRegex.test(String(formData?.boatName))) {
      errors.boatName = 'BoatName must be a string'
      if (!firstError) firstError = 'boatName'
    }

    if (!formData?.boatSize) {
      errors.boatSize = 'BoatSize is required'
      if (!firstError) firstError = 'boatSize'
    } else if (!numberRegex.test(formData?.boatSize)) {
      errors.boatSize = 'BoatSize must be a number'
      if (!firstError) firstError = 'boatSize'
    }

    if (!formData?.boatYardName) {
      errors.boatYardName = 'BoatYardName is required'
      if (!firstError) firstError = 'boatYardName'
    }

    // if (!formData?.boatWeight) {
    //   errors.boatWeight = 'BoatWeight  is required'
    //   if (!firstError) firstError = 'boatWeight'
    // } else if (!numberRegex.test(String(formData?.boatWeight))) {
    //   errors.boatWeight = 'Weight   must be a number'
    //   if (!firstError) firstError = 'boatWeight'
    // }

    // if (!formData?.sizeOfWeight) {
    //   errors.sizeOfWeight = 'Size of Weight is required'
    //   if (!firstError) firstError = 'sizeOfWeight'
    // }

    if (!formData?.sizeOfWeight) {
      errors.sizeOfWeight = 'Size of Weight is required'
      if (!firstError) firstError = 'sizeOfWeight'
    } else if (!numberRegex.test(String(formData?.sizeOfWeight))) {
      errors.sizeOfWeight = 'Size of Weight must be a number'
      if (!firstError) firstError = 'sizeOfWeight'
    }

    if (!formData?.typeOfWeight) {
      errors.typeOfWeight = 'Type of Weight is required'
      if (!firstError) firstError = 'typeOfWeight'
    }

    if (!formData?.topChainCondition) {
      errors.topChainCondition = 'Top Chain Condition is required'
      if (!firstError) firstError = 'topChainCondition'
    }

    if (!formData?.bottomChainCondition) {
      errors.bottomChainCondition = 'Bottom Chain Condition is required'
      if (!firstError) firstError = 'bottomChainCondition'
    }

    if (!formData?.conditionOfEye) {
      errors.conditionOfEye = 'Condition of Eye is required'
      if (!firstError) firstError = 'conditionOfEye'
    }
    if (!formData?.bottomChainCondition) {
      errors.bottomChainCondition = 'Bottom Chain Condition is required'
      if (!firstError) firstError = 'bottomChainCondition'
    }

    if (!formData?.pendantCondition) {
      errors.pendantCondition = 'Pendant Condition is required'
      if (!firstError) firstError = 'pendantCondition'
    }

    if (!formData?.depthAtMeanHighWater) {
      errors.depthAtMeanHighWater = 'Depth at Mean High Water is required'
      if (!firstError) firstError = 'depthAtMeanHighWater'
    } else if (!numberRegex.test(String(formData?.depthAtMeanHighWater))) {
      errors.depthAtMeanHighWater = 'Depth at Mean High Water must be a number'
      if (!firstError) firstError = 'depthAtMeanHighWater'
    }

    if (!formData?.bottomChainDate) {
      errors.bottomChainDate = 'Install Date is required'
      if (!firstError) firstError = 'bottomChainDate'
    }
    if (!formData?.topChainDate) {
      errors.topChainDate = 'Install Date is required'
      if (!firstError) firstError = 'topChainDate'
    }
    if (!formData?.conditionEyeDate) {
      errors.conditionEyeDate = 'Install Date is required'
      if (!firstError) firstError = 'conditionEyeDate'
    }

    setFirstErrorField(firstError)
    setFieldErrors(errors)
    return errors
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

  const handleInputChange = (field: string, value: any) => {
    const numberRegex = /^\d+$/

    if (field === 'boatSize') {
      if (value !== '' && !numberRegex.test(value)) {
        return
      }
    }
    if (field === 'sizeOfWeight') {
      if (value !== '' && !numberRegex.test(value)) {
        return
      }
    }
    if (field === 'boatWeight') {
      if (value !== '' && !numberRegex.test(value)) {
        return
      }
    }
    if (field === 'depthAtMeanHighWater') {
      if (value !== '' && !numberRegex.test(value)) {
        return
      }
    }
    setFormData({
      ...formData,
      [field]: value,
    })

    if (fieldErrors[field]) {
      setFieldErrors({
        ...fieldErrors,
        [field]: '',
      })
    }
  }

  const handleEditMode = () => {
    setGpsCoordinatesValue(mooringRowData?.gpsCoordinates || '')
    setFormData((prevState: any) => ({
      ...prevState,
      mooringNumber: mooringRowData?.mooringNumber || '',
      mooringName: mooringRowData?.mooringName || '',
      customerName: moorings?.firstName + ' ' + moorings.lastName || '',
      harbor: mooringRowData?.harborOrArea || '',
      boatYardName: mooringRowData?.boatyardResponseDto?.boatyardName || '',
      boatName: mooringRowData?.boatName || '',
      boatSize: mooringRowData?.boatSize || '',
      type: mooringRowData?.boatType?.boatType || '',
      boatWeight: mooringRowData?.boatWeight || '',
      sizeOfWeight: mooringRowData?.sizeOfWeight || '',
      typeOfWeight: mooringRowData?.typeOfWeight?.type || '',
      conditionOfEye: mooringRowData?.eyeCondition?.condition || '',
      topChainCondition: mooringRowData?.topChainCondition?.condition || '',
      shackleSwivelCondition: mooringRowData?.shackleSwivelCondition?.condition || '',
      pendantCondition: mooringRowData?.pendantCondition || '',
      depthAtMeanHighWater: mooringRowData?.depthAtMeanHighWater || '',
      bottomChainCondition: mooringRowData?.bottomChainCondition?.condition || '',
      bottomChainDate: mooringRowData?.installBottomChainDate || '',
      topChainDate: mooringRowData?.installTopChainDate || '',
      conditionEyeDate: mooringRowData?.installConditionOfEyeDate || '',
      status: 3,
    }))
  }

  const SaveMoorings = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }
    try {
      setIsLoading(true)
      const payload = {
        customerId: formData?.customerName,
        mooringNumber: formData?.mooringNumber,
        harborOrArea: formData?.harbor,
        gpsCoordinates: gpsCoordinatesValue,
        installBottomChainDate: formData?.bottomChainDate,
        installTopChainDate: formData?.topChainDate,
        installConditionOfEyeDate: formData?.conditionEyeDate,
        boatyardId: formData?.boatYardName?.id,
        boatName: formData?.boatName,
        boatSize: formData?.boatSize,
        boatTypeId: formData?.type?.id,
        boatWeight: formData?.boatWeight,
        sizeOfWeight: formData?.sizeOfWeight,
        typeOfWeightId: formData?.typeOfWeight?.id,
        eyeConditionId: formData?.conditionOfEye?.id,
        topChainConditionId: formData?.topChainCondition?.id,
        bottomChainConditionId: formData?.bottomChainCondition?.id,
        shackleSwivelConditionId: formData?.shackleSwivelCondition?.id,
        pendantConditionId: formData?.pendantCondition,
        depthAtMeanHighWater: formData?.depthAtMeanHighWater,
        statusId: 2,
      }

      const response = await saveMoorings(payload).unwrap()
      const { status, message } = response as CustomerResponse
      if (status === 200 || status === 201) {
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Mooring Saved successfully',
          life: 3000,
        })
        closeModal()
        getCustomer()
        if (getCustomerRecord) {
          getCustomerRecord()
        }
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
      const { message, data } = error as ErrorResponse
      setIsLoading(false)
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: data.message,
        life: 3000,
      })
    }
  }

  const UpdateMooring = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }
    try {
      setIsLoading(true)
      const editMooringPayload = {
        id: mooringRowData?.id,
        mooringNumber: formData?.mooringNumber
          ? formData?.mooringNumber
          : mooringRowData?.mooringNumber,
        customerId: formData?.customerName?.id
          ? formData?.customerName?.id
          : mooringRowData?.customerId,
        harborOrArea: formData?.harbor ? formData?.harbor : mooringRowData?.harborOrArea,
        gpsCoordinates: gpsCoordinatesValue,
        boatyardId: formData?.boatyardName
          ? formData?.boatyardName
          : mooringRowData?.boatyardResponseDto?.id,
        boatName: formData?.boatName ? formData?.boatName : mooringRowData?.boatName,
        boatSize: formData?.boatSize ? formData?.boatSize : mooringRowData?.boatSize,
        boatTypeId: formData?.type?.id ? formData?.type?.id : mooringRowData?.boatType?.id,
        boatWeight: formData?.boatWeight ? formData?.boatWeight : mooringRowData?.boatWeight,
        installBottomChainDate: formData?.bottomChainDate
          ? formData?.bottomChainDate
          : mooringRowData?.installBottomChainDate,
        installTopChainDate: formData?.topChainDate
          ? formData?.topChainDate
          : mooringRowData?.installTopChainDate,
        installConditionOfEyeDate: formData?.conditionEyeDate
          ? formData?.conditionEyeDate
          : mooringRowData?.installConditionOfEyeDate,
        sizeOfWeight: formData?.sizeOfWeight
          ? formData?.sizeOfWeight
          : mooringRowData?.sizeOfWeight,
        typeOfWeightId: formData?.typeOfWeight.id
          ? formData?.typeOfWeight.id
          : mooringRowData?.typeOfWeight.id,
        eyeConditionId: formData?.conditionOfEye.id
          ? formData?.conditionOfEye.id
          : mooringRowData?.eyeCondition?.id,
        topChainConditionId: formData?.topChainCondition?.id
          ? formData?.topChainCondition?.id
          : mooringRowData?.topChainCondition?.id,
        bottomChainConditionId: formData?.bottomChainCondition?.id
          ? formData?.bottomChainCondition?.id
          : mooringRowData?.bottomChainCondition?.id,
        shackleSwivelConditionId: formData?.shackleSwivelCondition?.id
          ? formData?.shackleSwivelCondition?.id
          : mooringRowData?.shackleSwivelCondition?.id,
        pendantCondition: formData?.pendantCondition
          ? formData?.pendantCondition
          : mooringRowData?.pendantCondition,
        depthAtMeanHighWater: formData?.depthAtMeanHighWater
          ? formData?.depthAtMeanHighWater
          : mooringRowData?.depthAtMeanHighWater,
      }
      const response = await updateMooring({
        payload: editMooringPayload,
        id: mooringRowData?.id,
      }).unwrap()
      const { status, message } = response as CustomerResponse
      if (status === 200 || status === 201) {
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Mooring Updated successfully',
          life: 3000,
        })
        closeModal()
        getCustomer()
        if (getCustomerRecord) {
          getCustomerRecord()
        }
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
      const { message, data } = error as ErrorResponse
      setIsLoading(false)
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: data?.message,
        life: 3000,
      })
    }
  }

  const handlePositionChange = (lat: number, lng: number) => {
    setCenter([lat, lng])
    const formattedLat = lat.toFixed(3)
    const formattedLng = lng.toFixed(3)
    const concatenatedValue = `${formattedLat} ${formattedLng}`
    setGpsCoordinatesValue(concatenatedValue)
  }

  const handleClick = () => {
    if (editMode) {
      UpdateMooring()
    } else {
      SaveMoorings()
    }
  }

  const AddDock = () => {
    return (
      <>
        <div className="flex gap-4 mt-4">
          <span>
            <Checkbox
              onChange={(e: any) => {
                setCheckedDock(e.checked ?? false)
              }}
              checked={checkedDock}
              style={{
                border: '1px solid #D5E1EA',
                height: '22px',
                width: '22px',
                borderRadius: '5px',
              }}></Checkbox>
          </span>
          <p className="font-medium text-lg text-[#000000] mt-1">Add Dock</p>
        </div>
      </>
    )
  }

  useEffect(() => {
    fetchMetaData()
  }, [])

  useEffect(() => {
    if (editMode && moorings) {
      handleEditMode()
    }
  }, [editMode, moorings])

  useEffect(() => {
    if (gpsCoordinatesValue) {
      const coordinates = getFomattedCoordinate(gpsCoordinatesValue)
      setCenter(coordinates)
      // handlePositionChange(coordinates[0], coordinates[1])
    }
  }, [gpsCoordinatesValue])

  return (
    <>
      <div className={isLoading ? 'blurred' : ''}>
        <Toast ref={toastRef} />
        <div className="flex gap-6 ">
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Customer Name
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <Dropdown
                value={formData?.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                options={customerName}
                optionLabel="label"
                optionValue="value"
                placeholder="Select"
                editable
                disabled={isLoading}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.customerName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />

              <p id="customerName">
                {fieldErrors.customerName && (
                  <small className="p-error">{fieldErrors.customerName}</small>
                )}
              </p>
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Mooring Number
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData?.mooringNumber}
                onChange={(e) => handleInputChange('mooringNumber', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.mooringNumber ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              <p id="mooringNumber">
                {fieldErrors.mooringNumber && (
                  <small className="p-error">{fieldErrors.mooringNumber}</small>
                )}
              </p>
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Harbor/Area&nbsp;&nbsp;
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData?.harbor}
                onChange={(e) => handleInputChange('harbor', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.harbor ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              <p id="harbor">
                {fieldErrors.harbor && <small className="p-error">{fieldErrors.harbor}</small>}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                G.P.S Coordinates
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={gpsCoordinatesValue}
                onChange={(e) => {
                  setGpsCoordinatesValue(e.target.value)
                  setFieldErrors((prevErrors) => ({ ...prevErrors, gpsCoordinatesValue: '' }))
                }}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.gpsCoordinatesValue ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              <p id="waterDepth">
                {fieldErrors.gpsCoordinatesValue && (
                  <small className="p-error">{fieldErrors.gpsCoordinatesValue}</small>
                )}
              </p>
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Boatyard Name
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <Dropdown
                value={formData?.boatYardName}
                onChange={(e) => handleInputChange('boatYardName', e.target.value)}
                options={boatyardsName}
                optionLabel="boatyardName"
                placeholder="Select"
                editable
                disabled={isLoading}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.boatYardName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p id="boatYardName">
                {fieldErrors.boatYardName && (
                  <small className="p-error">{fieldErrors.boatYardName}</small>
                )}
              </p>
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Boat Name
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData?.boatName}
                onChange={(e) => handleInputChange('boatName', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.boatName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              <p id="boatName">
                {fieldErrors.boatName && <small className="p-error">{fieldErrors.boatName}</small>}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
          {isLoading && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '50%',
                left: '45%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
                zIndex:4
              }}
              strokeWidth="4"
            />
          )}

          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Boat Size (in feet)
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                type="number"
                value={formData?.boatSize}
                onChange={(e) => handleInputChange('boatSize', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.boatSize ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              <p id="boatName">
                {fieldErrors.boatSize && <small className="p-error">{fieldErrors.boatSize}</small>}
              </p>
            </div>
          </div>
          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Size of Weight
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>

            <div className="mt-2">
              <InputComponent
                value={formData?.sizeOfWeight}
                onChange={(e) => handleInputChange('sizeOfWeight', e.target.value)}
                // options={sizeOfWeight}
                // optionLabel="weight"
                // editable
                // placeholder="Select"
                type="number"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.sizeOfWeight ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              <p id="sizeOfWeight">
                {fieldErrors.sizeOfWeight && (
                  <small className="p-error">{fieldErrors.sizeOfWeight}</small>
                )}
              </p>
            </div>
          </div>

          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Type of Weight
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>

            <div className="mt-2">
              <Dropdown
                value={formData?.typeOfWeight}
                onChange={(e) => handleInputChange('typeOfWeight', e.value)}
                options={weightData}
                optionLabel="type"
                placeholder="Select"
                editable
                disabled={isLoading}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.typeOfWeight ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p id="typeOfWeight">
                {fieldErrors.typeOfWeight && (
                  <small className="p-error">{fieldErrors.typeOfWeight}</small>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Top Chain Condition
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>

            <div className="mt-2">
              <Dropdown
                value={formData?.topChainCondition}
                onChange={(e) => handleInputChange('topChainCondition', e.value)}
                options={chainData}
                optionLabel="condition"
                placeholder="Select"
                editable
                disabled={isLoading}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.topChainCondition ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p id="typeOfWeight">
                {fieldErrors.topChainCondition && (
                  <small className="p-error">{fieldErrors.topChainCondition}</small>
                )}
              </p>
            </div>
          </div>

          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Top Chain Condition <span style={{ fontSize: '0.6rem' }}> (install date)</span>
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>

            <div className="mt-2">
              <Calendar
                value={parseDate(formData?.topChainDate)}
                onChange={(e) => handleInputChange('topChainDate', formatDate(e.target.value))}
                dateFormat="mm/dd/yy"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.topChainDate ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '0.5rem',
                }}
              />
              <p>
                {fieldErrors.topChainDate && (
                  <small className="p-error">{fieldErrors.topChainDate}</small>
                )}
              </p>
            </div>
          </div>

          <div className="">
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Depth at Mean High Water
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>

            <div className="mt-2">
              <InputText
                value={formData?.depthAtMeanHighWater}
                type="number"
                onChange={(e) => handleInputChange('depthAtMeanHighWater', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.depthAtMeanHighWater ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                }}
              />
              <p id="depthAtMeanHighWater">
                {fieldErrors.depthAtMeanHighWater && (
                  <small className="p-error">{fieldErrors.depthAtMeanHighWater}</small>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className=" gap-6 mt-3 mb-16">
          <div className="flex gap-6">
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Bottom Chain Condition
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={formData?.bottomChainCondition}
                  onChange={(e) => handleInputChange('bottomChainCondition', e.value)}
                  options={bottomChainCondition}
                  optionLabel="condition"
                  placeholder="Select"
                  editable
                  disabled={isLoading}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.bottomChainCondition
                      ? '1px solid red'
                      : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
                <p id="bottomChainCondition">
                  {fieldErrors.bottomChainCondition && (
                    <small className="p-error">{fieldErrors.bottomChainCondition}</small>
                  )}
                </p>
              </div>
            </div>
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Bottom Chain Condition
                    <span style={{ fontSize: '0.6rem' }}> (install date)</span>
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>

              <div className="mt-2">
                <Calendar
                  value={parseDate(formData.bottomChainDate)}
                  onChange={(e) => handleInputChange('bottomChainDate', formatDate(e.target.value))}
                  dateFormat="mm/dd/yy"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.bottomChainDate ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '0.5rem',
                  }}
                />
                <p>
                  {fieldErrors.bottomChainDate && (
                    <small className="p-error">{fieldErrors.bottomChainDate}</small>
                  )}
                </p>
              </div>
            </div>
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Pendant Condition
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>

              <div className="mt-2">
                <InputComponent
                  value={formData?.pendantCondition}
                  onChange={(e) => handleInputChange('pendantCondition', e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.pendantCondition ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
                <p id="conditionOfEye">
                  {fieldErrors.pendantCondition && (
                    <small className="p-error">{fieldErrors.pendantCondition}</small>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Condition of Eye
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>
              <div className="mt-2">
                <Dropdown
                  value={formData?.conditionOfEye}
                  onChange={(e) => handleInputChange('conditionOfEye', e.value)}
                  options={conditionOfEye}
                  optionLabel="condition"
                  placeholder="Select"
                  editable
                  disabled={isLoading}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.conditionOfEye ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
                <p id="conditionOfEye">
                  {fieldErrors.conditionOfEye && (
                    <small className="p-error">{fieldErrors.conditionOfEye}</small>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Condition of Eye <span style={{ fontSize: '0.6rem' }}> (install date)</span>
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>
              <div className="mt-2">
                <Calendar
                  value={parseDate(formData.conditionEyeDate)}
                  onChange={(e) =>
                    handleInputChange('conditionEyeDate', formatDate(e.target.value))
                  }
                  dateFormat="mm/dd/yy"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.conditionEyeDate ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '0.5rem',
                  }}
                />
                <p id="conditionOfEye">
                  {fieldErrors.conditionEyeDate && (
                    <small className="p-error">{fieldErrors.conditionEyeDate}</small>
                  )}
                </p>
              </div>
            </div>
            {/* <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">Pin on Map</span>
              </div>
              <div
                style={{
                  height: '200px',
                  width: '230px',
                }}>
                <CustomSelectPositionMap
                  onPositionChange={handlePositionChange}
                  zoomLevel={10}
                  center={center}
                />
              </div>
            </div> */}

            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">Shackle, Swivel Condition</div>
                </span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={formData?.shackleSwivelCondition}
                  onChange={(e) => handleInputChange('shackleSwivelCondition', e.value)}
                  options={shackleSwivelData}
                  optionLabel="condition"
                  placeholder="Select"
                  editable
                  disabled={isLoading}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="mt-3">
                <div>
                  <span className="font-medium text-sm text-[#000000]">
                    <div className="flex gap-1">Type</div>
                  </span>
                </div>

                <div className="mt-2">
                  <Dropdown
                    value={formData?.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    options={[]}
                    disabled={isLoading}
                    style={{
                      width: '230px',
                      height: '32px',
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                    }}
                  />
                </div>
              </div>

              <div className="mt-3">
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">Weight (in kg)</div>
                </span>
                <div className="mt-2">
                  <InputComponent
                    value={formData?.boatWeight}
                    type="number"
                    onChange={(e) => handleInputChange('boatWeight', e.target.value)}
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

            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">Pin on Map</span>
              </div>
              <div
                style={{
                  height: '200px',
                  width: '450px',
                  overflow: 'hidden',
                }}>
                <CustomSelectPositionMap
                  onPositionChange={handlePositionChange}
                  zoomLevel={10}
                  center={center}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex gap-6 bottom-2 absolute left-6"
          style={{
            width: '100%',
            height: '80px',
            backgroundColor: 'white',
            padding: '0 12px',
            bottom: '0px',
          }}>
          <Button
            onClick={handleClick}
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
            onClick={closeModal}
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

export default AddMoorings
