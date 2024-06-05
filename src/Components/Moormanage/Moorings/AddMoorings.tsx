import React, { useCallback, useEffect, useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import InputComponent from '../../CommonComponent/InputComponent'
import { useAddMooringsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { CityProps, MetaData } from '../../../Type/CommonType'
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

const AddMoorings: React.FC<AddMooringProps> = ({
  moorings,
  editMode,
  editCustomerMode,
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
  const [bottomChainCondition, setBottomChainCondition] = useState<MetaData[]>([])
  const [shackleSwivelData, setShackleSwivelData] = useState<MetaData[]>([])
  const [pennantData, setPennantData] = useState<MetaData[]>([])
  const [customerName, setcustomerName] = useState<MetaData[]>([])
  const [boatyardsName, setBoatYardsName] = useState<MetaData[]>([])
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [firstErrorField, setFirstErrorField] = useState('')
  const [center, setCenter] = useState<LatLngExpression | undefined>([30.6983149, 76.656095])
  const [saveMoorings] = useAddMooringsMutation()

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
    deptAtMeanHighWater: '',
    boatYardName: '',
    BootomChainCondition: '',
    note: '',
  })

  const payload = {
    customerName: moorings?.customerName || '',
    mooringNumber: moorings?.mooringNumber || '',
    harbor: moorings?.harbor || '',
    waterDepth: moorings?.waterDepth || '',
    gpsCoordinates: moorings?.gpsCoordinates || '',
    boatName: moorings?.boatName || '',
    boatYardName: moorings?.boatyardName || '',
    boatSize: moorings?.boatSize || '',
    boatWeight: moorings?.boatWeight || '',
    sizeOfWeight: moorings?.sizeOfWeight || '',
    typeOfWeight: moorings?.typeOfWeight || '',
    topChainCondition: moorings?.topChainCondition || '',
    conditionOfEye: moorings?.eyeCondition || '',
    bottomChainCondition: moorings?.bottomChainCondition || '',
    shackleSwivelCondition: moorings?.shackleSwivelCondition || '',
    pennantCondition: moorings?.pennantCondition || '',
    deptAtMeanHighWater: moorings?.depthAtMeanHighWater || '',
  }

  const fetchMetaData = useCallback(async () => {
    const { typeOfBoatTypeData } = await getTypeOfBoatTypeData()
    const { typeOfWeightData } = await getTypeOfWeightData()
    const { typeOfChainData } = await getTypeOfChainData()
    const { TypeOfSizeOfWeightData } = await getTypeOfSizeOfWeightData()
    const { typeOfEyeData } = await getTypeOfEyeData()
    const { typeOfBootomChainData } = await getTypeOfBottomChainData()
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

    if (typeOfBootomChainData !== null) {
      setBottomChainCondition(typeOfBootomChainData)
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
      setcustomerName(customersData)
    }

    if (boatYardName !== null) {
      setBoatYardsName(boatYardName)
    }
  }, [])

  const validateFields = () => {
    const errors: { [key: string]: string } = {}
    let firstError = ''

    if (!formData.customerName) {
      errors.customerName = 'Customer Name is required'
      if (!firstError) firstError = 'customerName'
    }
    if (!formData.mooringNumber) {
      errors.mooringNumber = 'Mooring ID is required'
      if (!firstError) firstError = 'mooringNumber'
    }
    if (!formData.harbor) {
      errors.harbor = 'Harbor is required'
      if (!firstError) firstError = 'harbor'
    }
    if (!formData.waterDepth) {
      errors.waterDepth = 'Water Depth is required'
      if (!firstError) firstError = 'waterDepth'
    }

    if (!formData.gpsCoordinates) {
      errors.gpsCoordinates = 'GPS Coordinates are required'
      if (!firstError) firstError = 'gpsCoordinates'
    }

    if (!formData.boatName) {
      errors.boatName = 'Boat Name is required'
      if (!firstError) firstError = 'boatName'
    }
    if (!formData.boatSize) {
      errors.boatSize = 'Boat Size is required'
      if (!firstError) firstError = 'boatSize'
    }

    if (!formData.boatYardName) {
      errors.boatYardName = 'boatYardName is required'
      if (!firstError) firstError = 'boatYardName'
    }

    if (!formData.boatWeight) {
      errors.boatWeight = 'Weight is required'
      if (!firstError) firstError = 'boatWeight'
    }
    if (!formData.sizeOfWeight) {
      errors.sizeOfWeight = 'Size of Weight is required'
      if (!firstError) firstError = 'sizeOfWeight'
    }
    if (!formData.typeOfWeight) {
      errors.typeOfWeight = 'Type of Weight is required'
      if (!firstError) firstError = 'typeOfWeight'
    }
    if (!formData.type) {
      errors.type = 'Type  is required'
      if (!firstError) firstError = 'type'
    }

    if (!formData.topChainCondition) {
      errors.topChainCondition = 'Top Chain Condition is required'
      if (!firstError) firstError = 'topChainCondition'
    }

    if (!formData.bottomChainCondition) {
      errors.bottomChainCondition = 'Bootom Chain Condition is required'
      if (!firstError) firstError = 'BootomChainCondition'
    }

    if (!formData.conditionOfEye) {
      errors.conditionOfEye = 'Condition of Eye is required'
      if (!firstError) firstError = 'conditionOfEye'
    }
    if (!formData.bottomChainCondition) {
      errors.bottomChainCondition = 'Bottom Chain Condition is required'
      if (!firstError) firstError = 'bottomChainCondition'
    }
    if (!formData.shackleSwivelCondition) {
      errors.shackleSwivelCondition = 'Shackle, Swivel Condition is required'
      if (!firstError) firstError = 'shackleSwivelCondition'
    }
    if (!formData.pennantCondition) {
      errors.pennantCondition = 'Pennant Condition is required'
      if (!firstError) firstError = 'pennantCondition'
    }
    if (!formData.deptAtMeanHighWater) {
      errors.deptAtMeanHighWater = 'Dept at Mean High Water is required'
      if (!firstError) firstError = 'deptAtMeanHighWater'
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

  const handleEditMode = () => {}

  const SaveMoorings = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    try {
      const payload = {
        customerId: formData.customerName?.id,
        mooringId: formData.mooringNumber,
        harbor: formData.harbor,
        waterDepth: formData.waterDepth,
        gpsCoordinates: formData.gpsCoordinates,
        boatyardId: formData.boatYardName?.id,
        boatName: formData.boatName,
        boatSize: formData.boatSize,
        boatTypeId: formData.type?.id,
        boatWeight: formData.boatWeight,
        sizeOfWeightId: formData.sizeOfWeight?.id,
        typeOfWeightId: formData.typeOfWeight?.id,
        eyeConditionId: formData.conditionOfEye?.id,
        topChainConditionId: formData.topChainCondition?.id,
        bottomChainConditionId: formData.bottomChainCondition?.id,
        shackleSwivelConditionId: formData.shackleSwivelCondition?.id,
        pennantConditionId: formData.pennantCondition?.id,
        depthAtMeanHighWater: formData.deptAtMeanHighWater?.id,
        customerOwnerId: selectedCustomerId,
      }

      const response = await saveMoorings(payload).unwrap()
      const { status, message } = response as CustomerResponse
      if (status === 200 || status === 201) {
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
        console.log('here', message)
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message, data } = error as ErrorResponse
      console.log('Error in Catch', error)
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: data.message,
        life: 3000,
      })
    }
  }

  const handlePositionChange = (lat: number, lng: number) => {
    setCenter([lat, lng])
    const formattedLat = lat.toFixed(3)
    const formattedLng = lng.toFixed(3)
    const concatenatedValue = `${formattedLat} ${formattedLng}`

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      gpsCoordinates: concatenatedValue,
    }))
  }

  useEffect(() => {
    fetchMetaData()
  }, [])

  useEffect(() => {
    if (editMode && moorings) {
      handleEditMode()
    }
  }, [editMode, moorings])

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
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                options={customerName}
                optionLabel="customerName"
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
                value={formData.mooringNumber}
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
                value={formData.harbor}
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
                Water Depth
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData.waterDepth}
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
                value={formData.gpsCoordinates}
                onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.gpsCoordinates ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p id="waterDepth">
                {fieldErrors.gpsCoordinates && (
                  <small className="p-error">{fieldErrors.gpsCoordinates}</small>
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
                value={formData.boatName}
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

          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Boat Size
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData.boatSize}
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
                value={formData.type}
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
                Weight
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData.boatWeight}
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
                value={formData.sizeOfWeight}
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
                value={formData.typeOfWeight}
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
                  value={formData.topChainCondition}
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
                    Bootom Chain Condition
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={formData.bottomChainCondition}
                  onChange={(e) => handleInputChange('bottomChainCondition', e.value)}
                  options={bottomChainCondition}
                  optionLabel="condition"
                  editable
                  placeholder="Select"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.BootomChainCondition
                      ? '1px solid red'
                      : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
                <p id="bottomChainCondition">
                  {fieldErrors.BootomChainCondition && (
                    <small className="p-error">{fieldErrors.BootomChainCondition}</small>
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
                  value={formData.pennantCondition}
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
                  value={formData.conditionOfEye}
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
                  value={formData.shackleSwivelCondition}
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
                    Dept at Mean High Water
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>

              <div className="mt-2">
                <InputText
                  value={formData.deptAtMeanHighWater}
                  onChange={(e) => handleInputChange('deptAtMeanHighWater', e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.deptAtMeanHighWater ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
                <p id="deptAtMeanHighWater">
                  {fieldErrors.deptAtMeanHighWater && (
                    <small className="p-error">{fieldErrors.deptAtMeanHighWater}</small>
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
                  zoomLevel={50}
                  center={center}
                  setCenter={setCenter}
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
            onClick={SaveMoorings}
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
            }}
          />
          <Button
            onClick={function (): void {
              throw new Error('Function not implemented.')
            }}
            label={'Back'}
            text={true}
            style={{
              backgroundColor: 'white',
              color: '#000000',
              border: 'none',
              width: '89px',
              height: '42px',
            }}
          />
        </div>
      </div>
    </>
  )
}

export default AddMoorings