import React, { useCallback, useEffect, useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import InputComponent from '../../CommonComponent/InputComponent'
import {
  useAddMooringsMutation,
  useUpdateMooringsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { CityProps, MetaData, MetaDataCustomer } from '../../../Type/CommonType'
import { AddMooringProps } from '../../../Type/ComponentBasedType'
import CustomSelectPositionMap from '../../Map/CustomSelectPositionMap'
import { LatLngExpression } from 'leaflet'
import {
  BoatyardNameData,
  CustomersData,
  TypeOfBoatType,
  TypeOfBottomChain,
  TypeOfChainCondition,
  TypeOfEye,
  TypeOfPennant,
  TypeOfShackleSwivel,
  TypeOfSizeOfWeight,
  TypeOfWeightData,
} from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import { CustomerResponse, ErrorResponse } from '../../../Type/ApiTypes'
import { ProgressSpinner } from 'primereact/progressspinner'
const AddMoorings: React.FC<AddMooringProps> = ({
  moorings,
  editMode,
  toastRef,
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
  const { getTypeOfPennantData } = TypeOfPennant()
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
  const [pennantData, setPennantData] = useState<MetaData[]>([])
  const [customerName, setcustomerName] = useState<any[]>([])
  const [customerId, setCustomerId] = useState<string>('')
  const [boatyardsName, setBoatYardsName] = useState<MetaData[]>([])
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [firstErrorField, setFirstErrorField] = useState('')
  const [gpsCoordinatesValue, setGpsCoordinatesValue] = useState<string>()
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
      return [41.56725, -70.94045]
    }
    // return [41.56725, -70.94045]
  }

  const [center, setCenter] = useState<any>(
    mooringRowData?.gpsCoordinates || gpsCoordinatesValue
      ? getFomattedCoordinate(mooringRowData?.gpsCoordinates || gpsCoordinatesValue)
      : [41.56725, -70.94045],
  )
  const [saveMoorings] = useAddMooringsMutation()
  const [updateMooring] = useUpdateMooringsMutation()
  const [isLoading, setIsLoading] = useState(false)
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
    pennantCondition: '',
    depthAtMeanHighWater: '',
    boatYardName: '',
    note: '',
  })

  const fetchMetaData = useCallback(async () => {
    const { typeOfBoatTypeData } = await getTypeOfBoatTypeData()
    const { typeOfWeightData } = await getTypeOfWeightData()
    const { typeOfChainData } = await getTypeOfChainData()
    const { TypeOfSizeOfWeightData } = await getTypeOfSizeOfWeightData()
    const { typeOfEyeData } = await getTypeOfEyeData()
    const { typeOfBottomChainData } = await getTypeOfBottomChainData()
    const { typeOfShackleSwivelData } = await getTypeOfShackleSwivelData()
    const { typeOfPennantData } = await getTypeOfPennantData()
    const { customersData } = await getCustomersData()
    const { boatYardName } = await getBoatYardNameData()

    if (typeOfWeightData !== null) {
      setWeightData(typeOfWeightData)
    }
    if (typeOfChainData !== null) {
      setChainData(typeOfChainData)
    }
    if (TypeOfSizeOfWeightData !== null) {
      setSizeOfWeight(TypeOfSizeOfWeightData)
    }
    if (typeOfEyeData !== null) {
      setConditionOfEye(typeOfEyeData)
    }

    if (typeOfBottomChainData !== null) {
      setbottomChainCondition(typeOfBottomChainData)
    }

    if (typeOfShackleSwivelData !== null) {
      setShackleSwivelData(typeOfShackleSwivelData)
    }

    if (typeOfPennantData !== null) {
      setPennantData(typeOfPennantData)
    }
    if (typeOfBoatTypeData !== null) {
      setType(typeOfBoatTypeData)
    }

    if (customersData !== null) {
      const firstLastName = customersData.map((item) => ({
        label: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      setcustomerName(firstLastName)
    }

    if (boatYardName !== null) {
      setBoatYardsName(boatYardName)
    }
  }, [])

  const validateFields = () => {
    const numberRegex = /^\d+$/
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
      errors.mooringNumber = 'Mooring ID is required'
      if (!firstError) firstError = 'mooringNumber'
    } else if (!alphanumericRegex.test(formData?.mooringNumber)) {
      errors.mooringNumber = 'Mooring ID must be alphanumeric'
      if (!firstError) firstError = 'mooringNumber'
    }

    if (!formData?.harbor) {
      errors.harbor = 'Harbor is required'
      if (!firstError) firstError = 'harbor'
    } else if (!harborRegex.test(formData?.harbor)) {
      errors.harbor = 'Harbor must only contain letters'
      if (!firstError) firstError = 'harbor'
    }

    if (!formData?.waterDepth) {
      errors.waterDepth = 'Water Depth is required'
    } else if (!numberRegex.test(String(formData?.waterDepth))) {
      errors.waterDepth = 'Water Depth must be a number'
      if (!firstError) firstError = 'waterDepth'
    }

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
    } else if (!numberRegex.test(String(formData?.boatSize))) {
      errors.boatSize = 'BoatSize must be a number'
      if (!firstError) firstError = 'boatSize'
    }

    if (!formData?.boatYardName) {
      errors.boatYardName = 'BoatYardName is required'
      if (!firstError) firstError = 'boatYardName'
    }

    if (!formData?.boatWeight) {
      errors.boatWeight = 'BoatWeight  is required'
      if (!firstError) firstError = 'boatWeight'
    } else if (!numberRegex.test(String(formData?.boatWeight))) {
      errors.boatWeight = 'Weight   must be a number'
      if (!firstError) firstError = 'boatWeight'
    }

    if (!formData?.sizeOfWeight) {
      errors.sizeOfWeight = 'Size of Weight is required'
      if (!firstError) firstError = 'sizeOfWeight'
    }
    if (!formData?.typeOfWeight) {
      errors.typeOfWeight = 'Type of Weight is required'
      if (!firstError) firstError = 'typeOfWeight'
    }
    if (!formData?.type) {
      errors.type = 'Type  is required'
      if (!firstError) firstError = 'type'
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
    if (!formData?.shackleSwivelCondition) {
      errors.shackleSwivelCondition = 'Shackle, Swivel Condition is required'
      if (!firstError) firstError = 'shackleSwivelCondition'
    }
    if (!formData?.pennantCondition) {
      errors.pennantCondition = 'Pennant Condition is required'
      if (!firstError) firstError = 'pennantCondition'
    }

    if (!formData?.depthAtMeanHighWater) {
      errors.depthAtMeanHighWater = 'Depth at Mean High Water is required'
      if (!firstError) firstError = 'depthAtMeanHighWater'
    } else if (!numberRegex.test(String(formData?.depthAtMeanHighWater))) {
      errors.depthAtMeanHighWater = 'Depth at Mean High Water must be a number'
      if (!firstError) firstError = 'depthAtMeanHighWater'
    }

    setFirstErrorField(firstError)
    setFieldErrors(errors)
    return errors
  }

  const handleInputChange = (field: string, value: any) => {
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
      mooringNumber: mooringRowData?.mooringId || '',
      mooringName: mooringRowData?.mooringName || '',
      customerName: moorings?.firstName + ' ' + moorings.lastName || '',
      harbor: mooringRowData?.harbor || '',
      waterDepth: mooringRowData?.waterDepth || '',
      // gpsCoordinates: mooringRowData?.gpsCoordinates || '',
      boatYardName: mooringRowData?.boatyardResponseDto?.boatyardName || '',
      boatName: mooringRowData?.boatName || '',
      boatSize: mooringRowData?.boatSize || '',
      type: mooringRowData?.boatType?.boatType || '',
      boatWeight: mooringRowData?.boatWeight || '',
      sizeOfWeight: mooringRowData?.sizeOfWeight?.weight || '',
      typeOfWeight: mooringRowData?.typeOfWeight?.type || '',
      conditionOfEye: mooringRowData?.eyeCondition?.condition || '',
      topChainCondition: mooringRowData?.topChainCondition?.condition || '',
      shackleSwivelCondition: mooringRowData?.shackleSwivelCondition?.condition || '',
      pennantCondition: mooringRowData?.pennantCondition?.condition || '',
      depthAtMeanHighWater: mooringRowData?.depthAtMeanHighWater || '',
      bottomChainCondition: mooringRowData?.bottomChainCondition?.condition || '',
      // status: 1,
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
        mooringId: formData?.mooringNumber,
        harbor: formData?.harbor,
        waterDepth: formData?.waterDepth,
        gpsCoordinates: gpsCoordinatesValue,
        boatyardId: formData?.boatYardName?.id,
        boatName: formData?.boatName,
        boatSize: formData?.boatSize,
        boatTypeId: formData?.type?.id,
        boatWeight: formData?.boatWeight,
        sizeOfWeightId: formData?.sizeOfWeight?.id,
        typeOfWeightId: formData?.typeOfWeight?.id,
        eyeConditionId: formData?.conditionOfEye?.id,
        topChainConditionId: formData?.topChainCondition?.id,
        bottomChainConditionId: formData?.bottomChainCondition?.id,
        shackleSwivelConditionId: formData?.shackleSwivelCondition?.id,
        pennantConditionId: formData?.pennantCondition?.id,
        depthAtMeanHighWater: formData?.depthAtMeanHighWater,
        customerOwnerId: selectedCustomerId,
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
        mooringId: formData?.mooringNumber ? formData?.mooringNumber : mooringRowData?.mooringId,
        customerId: formData?.customerName?.id
          ? formData?.customerName?.id
          : mooringRowData?.customerId,
        harbor: formData?.harbor ? formData?.harbor : mooringRowData?.harbor,
        waterDepth: formData?.waterDepth ? formData?.waterDepth : mooringRowData?.waterDepth,
        gpsCoordinates: gpsCoordinatesValue,
        boatyardId: formData?.boatyardName
          ? formData?.boatyardName
          : mooringRowData?.boatyardResponseDto?.id,
        boatName: formData?.boatName ? formData?.boatName : mooringRowData?.boatName,
        boatSize: formData?.boatSize ? formData?.boatSize : mooringRowData?.boatSize,
        boatTypeId: formData?.type.id ? formData?.type.id : mooringRowData?.boatType.id,
        boatWeight: formData?.boatWeight ? formData?.boatWeight : mooringRowData?.boatWeight,
        sizeOfWeightId: formData?.sizeOfWeight.id
          ? formData?.sizeOfWeight.id
          : mooringRowData?.sizeOfWeight.id,
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
        pennantConditionId: formData?.pennantCondition?.id
          ? formData?.pennantCondition?.id
          : mooringRowData?.pennantCondition?.id,
        depthAtMeanHighWater: formData?.depthAtMeanHighWater
          ? formData?.depthAtMeanHighWater
          : mooringRowData?.depthAtMeanHighWater,
        customerOwnerId: selectedCustomerId,
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
      <div className="">
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
                editable
                placeholder="Select"
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
                Mooring ID
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
                Harbor
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
                Water Depth (meter)
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData?.waterDepth}
                onChange={(e) => handleInputChange('waterDepth', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.waterDepth ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p id="waterDepth">
                {fieldErrors.waterDepth && (
                  <small className="p-error">{fieldErrors.waterDepth}</small>
                )}
              </p>
            </div>
          </div>

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
                editable
                placeholder="Select"
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
        </div>

        <div className="flex gap-6 mt-3">
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
                }}
              />
              <p id="boatName">
                {fieldErrors.boatName && <small className="p-error">{fieldErrors.boatName}</small>}
              </p>
            </div>
          </div>

          {isLoading && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '50%',
                left: '45%',
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
                Boat Size
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData?.boatSize}
                onChange={(e) => handleInputChange('boatSize', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.boatSize ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
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
                  Type
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>

            <div className="mt-2">
              <Dropdown
                value={formData?.type}
                onChange={(e) => handleInputChange('type', e.value)}
                options={type}
                optionLabel="boatType"
                editable
                placeholder="Select"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.type ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p id="type">
                {fieldErrors.type && <small className="p-error">{fieldErrors.type}</small>}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Weight (kg)
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData?.boatWeight}
                onChange={(e) => handleInputChange('boatWeight', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.boatWeight ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p id="boatWeight">
                {fieldErrors.boatWeight && (
                  <small className="p-error">{fieldErrors.boatWeight}</small>
                )}
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
              <Dropdown
                value={formData?.sizeOfWeight}
                onChange={(e) => handleInputChange('sizeOfWeight', e.value)}
                options={sizeOfWeight}
                optionLabel="weight"
                editable
                placeholder="Select"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.sizeOfWeight ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
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
                editable
                placeholder="Select"
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

        <div className="flex gap-6 mt-3 mb-20">
          <div>
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
                  editable
                  placeholder="Select"
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
            <div className="mt-3">
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
                  editable
                  placeholder="Select"
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
            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Pennant Condition
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={formData?.pennantCondition}
                  onChange={(e) => handleInputChange('pennantCondition', e.value)}
                  options={pennantData}
                  optionLabel="condition"
                  editable
                  placeholder="Select"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.pennantCondition ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
                <p id="conditionOfEye">
                  {fieldErrors.pennantCondition && (
                    <small className="p-error">{fieldErrors.pennantCondition}</small>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div>
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
                  editable
                  placeholder="Select"
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
                    Shackle, Swivel Condition
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={formData?.shackleSwivelCondition}
                  onChange={(e) => handleInputChange('shackleSwivelCondition', e.value)}
                  options={shackleSwivelData}
                  optionLabel="condition"
                  editable
                  placeholder="Select"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.shackleSwivelCondition
                      ? '1px solid red'
                      : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
                <p id="shackleSwivelCondition">
                  {fieldErrors.shackleSwivelCondition && (
                    <small className="p-error">{fieldErrors.shackleSwivelCondition}</small>
                  )}
                </p>
              </div>
            </div>
            <div className="mt-3">
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
                  onChange={(e) => handleInputChange('depthAtMeanHighWater', e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.depthAtMeanHighWater
                      ? '1px solid red'
                      : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
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
          <div>
            <div className="mt-3">
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
