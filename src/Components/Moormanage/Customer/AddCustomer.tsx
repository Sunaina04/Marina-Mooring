import React, { useCallback, useEffect, useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import {
  useAddCustomerMutation,
  useUpdateCustomerMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { CustomerDataProps } from '../../../Type/ComponentBasedType'
import { Country, MetaData, Params, State } from '../../../Type/CommonType'
import { CustomerResponse } from '../../../Type/ApiTypes'
import { InputNumber } from 'primereact/inputnumber'
import {
  CountriesData,
  StatesData,
  TypeOfBoatType,
  TypeOfWeightData,
  TypeOfChainCondition,
  TypeOfEye,
  TypeOfBottomChain,
  TypeOfShackleSwivel,
  TypeOfPennant,
  TypeOfSizeOfWeight,
  BoatyardNameData,
} from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import CustomSelectPositionMap from '../../Map/CustomSelectPositionMap'
import { LatLngExpression } from 'leaflet'

const AddCustomer: React.FC<CustomerDataProps> = ({
  customer,
  editMode,
  closeModal,
  getCustomer,
  getCustomerRecord,
  toastRef,
}) => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [value, setValue] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<Country>()
  const [selectedState, setSelectedState] = useState<State>()
  const [customerName, setCustomerName] = useState<string>('')
  const [customerId, setCustomerId] = useState<number>(0)
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [streetHouse, setStreetHouse] = useState<string>('')
  const [sectorBlock, setSectorBlock] = useState<string>('')
  const [pinCode, setPinCode] = useState<string>('')
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()
  const [type, setType] = useState<MetaData[]>([])
  const [weightData, setWeightData] = useState<MetaData[]>([])
  const [chainData, setChainData] = useState<MetaData[]>([])
  const [sizeOfWeight, setSizeOfWeight] = useState<MetaData[]>([])
  const [conditionOfEye, setConditionOfEye] = useState<MetaData[]>([])
  const [bottomChainCondition, setBottomChainCondition] = useState<MetaData[]>([])
  const [shackleSwivelData, setShackleSwivelData] = useState<MetaData[]>([])
  const [pennantData, setPennantData] = useState<MetaData[]>([])
  const [boatyardName, setBoatyardName] = useState<MetaData[]>([])
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [gpsCoordinatesValue, setGpsCoordinatesValue] = useState<string>()
  const [center, setCenter] = useState<LatLngExpression | undefined>([30.6983149, 76.656095])
  const [firstErrorField, setFirstErrorField] = useState('')
  const [formData, setFormData] = useState<any>({
    mooringId: '',
    mooringName: '',
    customerName: '',
    harbor: '',
    waterDepth: '',
    gpsCoordinates: '',
    boatyardName: '',
    boatName: '',
    boatSize: '',
    boatType: '',
    boatWeight: '',
    sizeOfWeight: '',
    typeOfWeight: '',
    conditionOfEye: '',
    topChainCondition: '',
    bottomChainCondition: '',
    shackleSwivelCondition: '',
    pennantCondition: '',
    deptAtMeanHighWater: '',
    status: 0,
  })

  const { getStatesData } = StatesData()
  const { getTypeOfBoatTypeData } = TypeOfBoatType()
  const { getTypeOfWeightData } = TypeOfWeightData()
  const { getTypeOfChainData } = TypeOfChainCondition()
  const { getTypeOfEyeData } = TypeOfEye()
  const { getTypeOfBottomChainData } = TypeOfBottomChain()
  const { getTypeOfShackleSwivelData } = TypeOfShackleSwivel()
  const { getTypeOfPennantData } = TypeOfPennant()
  const { getTypeOfSizeOfWeightData } = TypeOfSizeOfWeight()
  const { getBoatYardNameData } = BoatyardNameData(selectedCustomerId)
  const { getCountriesData } = CountriesData()
  const [addCustomer] = useAddCustomerMutation()
  const [updateCustomer] = useUpdateCustomerMutation()
  const mooringResponseDtoList = customer?.mooringResponseDtoList || []

  const handlePositionChange = (lat: number, lng: number) => {
    setCenter([lat, lng])
    const formattedLat = lat.toFixed(3)
    const formattedLng = lng.toFixed(3)
    const concatenatedValue = `${formattedLat} ${formattedLng}`
    setGpsCoordinatesValue(concatenatedValue)
  }

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    const nameRegex = /^[a-zA-Z ]+$/
    const gpsRegex = /^\d{1,2}\.\d+ \d{1,2}\.\d+$/

    const errors: { [key: string]: string } = {}
    let firstError = ''

    if (!customerName) {
      errors.customerName = 'Customer name is required'
      firstError = 'CustomerName'
    } else if (!nameRegex.test(customerName)) {
      errors.customerName = 'Name must only contain letters'
      firstError = 'CustomerName'
    } else if (customerName.length < 3) {
      errors.customerName = 'CustomerName must be at least 3 characters long'
      firstError = 'CustomerName'
    }

    if (!customerId) {
      errors.customerId = 'Customer ID is required'
      if (!firstError) firstError = 'customerId'
    }

    if (!phone) {
      errors.phone = 'Phone is required'
      if (!firstError) firstError = 'phone'
    } else if (!phoneRegex.test(phone)) {
      errors.phone = 'Phone must be a 10-digit number'
      if (!firstError) firstError = 'phone'
    }

    if (!email) {
      errors.email = 'Email is required'
      if (!firstError) firstError = 'email'
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email format'
      if (!firstError) firstError = 'email'
    }

    if (!streetHouse) {
      errors.streetHouse = 'Street/House is required'
      if (!firstError) firstError = 'streetHouse'
    }

    if (!sectorBlock) {
      errors.sectorBlock = 'Apt/Suite is required'
      if (!firstError) firstError = 'sectorBlock'
    }

    if (!pinCode) {
      errors.pinCode = 'Zipcode code is required'
      if (!firstError) firstError = 'pinCode'
    }
    if (!selectedState) {
      errors.state = 'State is required'
      if (!firstError) firstError = 'state'
    }

    if (!selectedCountry) {
      errors.country = 'Country is required'
      if (!firstError) firstError = 'country'
    }

    if (!formData.harbor) {
      errors.harbor = 'Harbor is required'
      if (!firstError) firstError = 'harbor'
    }

    if (!gpsCoordinatesValue) {
      errors.gpsCoordinatesValue = 'GPS Coordinates is required'
    } else if (!gpsRegex.test(gpsCoordinatesValue)) {
      errors.gpsCoordinatesValue = 'Invalid GPS coordinates format'
    }

    if (!formData.mooringId) errors.mooringId = 'Mooring ID is required'
    if (!formData.harbor) errors.harbor = 'Harbor is required'
    if (!formData.waterDepth) errors.waterDepth = 'Water Depth is required'
    if (!formData.boatyardName) errors.boatyardName = 'Boatyard Name is required'
    if (!formData.boatName) errors.boatName = 'Boat Name is required'
    if (!formData.boatSize) errors.boatSize = 'Boat Size is required'
    if (!formData.boatType) errors.boatType = 'Type is required'
    if (!formData.boatWeight) errors.boatWeight = 'Weight is required'
    if (!formData.sizeOfWeight) errors.sizeOfWeight = 'Size of Weight is required'
    if (!formData.typeOfWeight) errors.typeOfWeight = 'Type of Weight is required'
    if (!formData.topChainCondition) errors.topChainCondition = 'Top Chain Condition is required'
    if (!formData.conditionOfEye) errors.conditionOfEye = 'Condition of Eye is required'
    if (!formData.shackleSwivelCondition)
      errors.shackleSwivelCondition = 'Shackle, Swivel Condition is required'
    if (!formData.deptAtMeanHighWater)
      errors.deptAtMeanHighWater = 'Dept at Mean High Water is required'
    // if (!formData.status) errors.status = 'Status is required'
    if (!formData.bottomChainCondition)
      errors.bottomChainCondition = 'Bottom Chain Condition is required'
    if (!formData.pennantCondition) errors.pennantCondition = 'Pennant Condition is required'

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

  const handleInputChangeCustomer = (fieldName: string, value: any) => {
    switch (fieldName) {
      case 'customerName':
        setCustomerName(value)
        break
      case 'customerId':
        setCustomerId(value)
        break
      case 'phone':
        setPhone(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'streetHouse':
        setStreetHouse(value)
        break
      case 'sectorBlock':
        setSectorBlock(value)
        break
      case 'pinCode':
        setPinCode(value)
        break
      case 'state':
        setSelectedState(value)
        break
      case 'country':
        setSelectedCountry(value)
        break
      default:
        setFormData({ ...formData, [fieldName]: value })
        break
    }
    setFieldErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }))
  }

  const handleEditMode = () => {
    setValue(customer?.note || '')
    setCustomerName(customer?.customerName || '')
    setCustomerId(customer?.customerId || '')
    setPhone(customer?.phone || '')
    setEmail(customer?.emailAddress || '')
    setStreetHouse(customer?.streetHouse || '')
    setSectorBlock(customer?.aptSuite || '')
    setPinCode(customer?.zipCode || '')
    setSelectedState(customer?.stateResponseDto?.name || undefined)
    setSelectedCountry(customer?.countryResponseDto?.name || undefined)
    setGpsCoordinatesValue(mooringResponseDtoList[0]?.gpsCoordinates || '')
    setFormData((prevState: any) => ({
      ...prevState,
      mooringId: mooringResponseDtoList[0]?.mooringId || '',
      mooringName: mooringResponseDtoList[0]?.mooringName || '',
      customerName: '',
      harbor: mooringResponseDtoList[0]?.harbor || '',
      waterDepth: mooringResponseDtoList[0]?.waterDepth || '',
      gpsCoordinates: mooringResponseDtoList[0]?.gpsCoordinates || '',
      boatyardName: mooringResponseDtoList[0]?.boatyardResponseDto?.boatyardName || '',
      boatName: mooringResponseDtoList[0]?.boatName || '',
      boatSize: mooringResponseDtoList[0]?.boatSize || '',
      boatType: mooringResponseDtoList[0]?.boatType?.boatType || '',
      boatWeight: mooringResponseDtoList[0]?.boatWeight || '',
      sizeOfWeight: mooringResponseDtoList[0]?.sizeOfWeight?.weight || '',
      typeOfWeight: mooringResponseDtoList[0]?.typeOfWeight?.type || '',
      conditionOfEye: mooringResponseDtoList[0]?.eyeCondition?.condition || '',
      topChainCondition: mooringResponseDtoList[0]?.topChainCondition?.condition || '',
      shackleSwivelCondition: mooringResponseDtoList[0]?.shackleSwivelCondition?.condition || '',
      pennantCondition: mooringResponseDtoList[0]?.pennantCondition?.condition || '',
      deptAtMeanHighWater: mooringResponseDtoList[0]?.depthAtMeanHighWater || '',
      bottomChainCondition: mooringResponseDtoList[0]?.bottomChainCondition?.condition || '',
      status: 0,
    }))
  }

  const SaveCustomer = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    const payload = {
      customerName: customerName,
      customerId: customerId,
      emailAddress: email,
      phone: phone,
      streetHouse: streetHouse,
      aptSuite: sectorBlock,
      stateId: selectedState?.id,
      countryId: selectedCountry?.id,
      zipCode: pinCode,
      customerOwnerId: selectedCustomerId,
      mooringRequestDto: {
        mooringId: formData.mooringId,
        customerId: customerId,
        harbor: formData.harbor,
        waterDepth: formData.waterDepth,
        gpsCoordinates: gpsCoordinatesValue,
        boatyardId: formData.boatyardName.id,
        boatName: formData.boatName,
        boatSize: formData.boatSize,
        boatTypeId: formData.boatType.id,
        boatWeight: formData.boatWeight,
        sizeOfWeightId: formData.sizeOfWeight.id,
        typeOfWeightId: formData.typeOfWeight.id,
        eyeConditionId: formData.conditionOfEye.id,
        topChainConditionId: formData.topChainCondition.id,
        bottomChainConditionId: formData.bottomChainCondition.id,
        shackleSwivelConditionId: formData.shackleSwivelCondition.id,
        pennantConditionId: formData.pennantCondition.id,
        depthAtMeanHighWater: formData.deptAtMeanHighWater,
        customerOwnerId: selectedCustomerId,
        // statusId: 1,
      },
    }
    const response = await addCustomer(payload).unwrap()
    const { status, message } = response as CustomerResponse
    if (status === 200 || status === 201) {
      closeModal()
      getCustomer()
      toastRef?.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Customer Saved successfully',
        life: 3000,
      })
    } else {
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000,
      })
    }
  }

  const UpdateCustomer = async () => {
    const errors = validateFields()

    if (Object.keys(errors).length > 0) {
      return
    }
    const editCustomerPayload = {
      customerName: customerName,
      customerId: customerId,
      emailAddress: email,
      phone: phone,
      streetHouse: streetHouse,
      aptSuite: sectorBlock,
      state: selectedState?.id ? selectedState?.id : customer?.stateResponseDto?.id,
      country: selectedCountry?.id ? selectedCountry?.id : customer?.stateResponseDto?.id,
      zipCode: pinCode,
      customerOwnerId: selectedCustomerId,
      mooringRequestDto: {
        id: customer?.mooringResponseDtoList[0]?.id,
        mooringId: formData.mooringId
          ? formData.mooringId
          : customer?.mooringResponseDtoList[0]?.mooringId,
        customerId: customerId,
        harbor: formData.harbor ? formData.harbor : customer?.mooringResponseDtoList[0]?.harbor,
        waterDepth: formData.waterDepth
          ? formData.waterDepth
          : customer?.mooringResponseDtoList[0]?.waterDepth,
        gpsCoordinates: gpsCoordinatesValue,
        boatyardId: formData.boatyardName.id
          ? formData.boatyardName.id
          : customer?.mooringResponseDtoList[0]?.boatyardResponseDto?.id,
        boatName: formData.boatName
          ? formData.boatName
          : customer?.mooringResponseDtoList[0]?.boatName,
        boatSize: formData.boatSize
          ? formData.boatSize
          : customer?.mooringResponseDtoList[0]?.boatSize,
        boatTypeId: formData.boatType.id
          ? formData.boatType.id
          : customer?.mooringResponseDtoList[0]?.boatType.id,
        boatWeight: formData.boatWeight
          ? formData.boatWeight
          : customer?.mooringResponseDtoList[0]?.boatWeight,
        sizeOfWeightId: formData.sizeOfWeight.id
          ? formData.sizeOfWeight.id
          : customer?.mooringResponseDtoList[0]?.sizeOfWeight.id,
        typeOfWeightId: formData.typeOfWeight.id
          ? formData.typeOfWeight.id
          : customer?.mooringResponseDtoList[0]?.typeOfWeight.id,
        eyeConditionId: formData.conditionOfEye.id
          ? formData.conditionOfEye.id
          : customer?.mooringResponseDtoList[0]?.eyeCondition.id,
        topChainConditionId: formData.topChainCondition.id
          ? formData.topChainCondition.id
          : customer?.mooringResponseDtoList[0]?.topChainCondition.id,
        bottomChainConditionId: formData.bottomChainCondition.id
          ? formData.bottomChainCondition.id
          : customer?.mooringResponseDtoList[0]?.bottomChainCondition.id,
        shackleSwivelConditionId: formData.shackleSwivelCondition.id
          ? formData.shackleSwivelCondition.id
          : customer?.mooringResponseDtoList[0]?.shackleSwivelCondition.id,
        pennantConditionId: formData.pennantCondition.id
          ? formData.pennantCondition.id
          : customer?.mooringResponseDtoList[0]?.pennantCondition.id,
        depthAtMeanHighWater: formData.deptAtMeanHighWater
          ? formData.deptAtMeanHighWater
          : customer?.mooringResponseDtoList[0]?.deptAtMeanHighWater,
        customerOwnerId: selectedCustomerId,
        // statusId: 1,
      },
    }
    const response = await updateCustomer({
      payload: editCustomerPayload,
      id: customer?.id,
    }).unwrap()
    const { status, message } = response as CustomerResponse
    if (status === 200 || status === 201) {
      closeModal()
      getCustomer()
      if (getCustomerRecord) {
        getCustomerRecord()
      }
      toastRef?.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Customer Updated successfully',
        life: 3000,
      })
    } else {
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000,
      })
    }
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { statesData } = await getStatesData()
    const { countriesData } = await getCountriesData()
    const { typeOfBoatTypeData } = await getTypeOfBoatTypeData()
    const { typeOfWeightData } = await getTypeOfWeightData()
    const { typeOfChainData } = await getTypeOfChainData()
    const { TypeOfSizeOfWeightData } = await getTypeOfSizeOfWeightData()
    const { typeOfEyeData } = await getTypeOfEyeData()
    const { typeOfBootomChainData } = await getTypeOfBottomChainData()
    const { typeOfShackleSwivelData } = await getTypeOfShackleSwivelData()
    const { typeOfPennantData } = await getTypeOfPennantData()
    const { boatYardName } = await getBoatYardNameData()

    if (countriesData !== null) {
      setCountriesData(countriesData)
    }
    if (statesData !== null) {
      setStatesData(statesData)
    }
    if (typeOfBoatTypeData !== null) {
      setType(typeOfBoatTypeData)
    }
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

    if (boatYardName !== null) {
      setBoatyardName(boatYardName)
    }
  }, [])

  const handleClick = () => {
    if (editMode) {
      UpdateCustomer()
    } else {
      SaveCustomer()
    }
  }

  useEffect(() => {
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  useEffect(() => {
    if (editMode && customer) {
      handleEditMode()
    }
  }, [editMode, customer])

  return (
    <div className="">
      {/* Add Customer */}
      <div className="flex gap-6">
        <div>
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Customer Name
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={customerName}
                onChange={(e) => handleInputChangeCustomer('customerName', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.customerName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p className="" id="customerName">
                {fieldErrors.customerName && (
                  <small className="p-error">{fieldErrors.customerName}</small>
                )}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Email Address
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>
              <div className="mt-2">
                <InputText
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChangeCustomer('email', e.target.value)
                  }
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.email ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
                <p className="" id="email">
                  {fieldErrors.email && <small className="p-error">{fieldErrors.email}</small>}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Customer ID
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputNumber
                value={customerId}
                onChange={(e) => handleInputChangeCustomer('customerId', e.value)}
                min={0}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.customerId ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p className="" id="customerId">
                {fieldErrors.customerId && (
                  <small className="p-error">{fieldErrors.customerId}</small>
                )}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Phone
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChangeCustomer('phone', e.target.value)
                }
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.phone ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p className="" id="phone">
                {fieldErrors.phone && <small className="p-error">{fieldErrors.phone}</small>}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <h1 className="font-medium text-sm text-[#000000]">
            <div className="flex gap-1">
              Address
              <p className="text-red-600">*</p>
            </div>
          </h1>
        </div>
        <div className="flex gap-6 mt-5 ">
          <div>
            <div>
              <InputText
                value={streetHouse}
                onChange={(e) => handleInputChangeCustomer('streetHouse', e.target.value)}
                placeholder="Street/house"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.streetHouse ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  color: 'black',
                  fontSize: '0.8rem',
                }}
              />
              <p className="" id="streetHouse">
                {fieldErrors.streetHouse && (
                  <small className="p-error">{fieldErrors.streetHouse}</small>
                )}
              </p>
            </div>
          </div>
          <div>
            <div>
              <InputText
                id="sectorBlock"
                value={sectorBlock}
                onChange={(e) => handleInputChangeCustomer('sectorBlock', e.target.value)}
                placeholder="Apt/Suite"
                type="text"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.sectorBlock ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  color: 'black',
                  fontSize: '0.8rem',
                }}
              />
              <p className="" id="sectorBlock">
                {fieldErrors.sectorBlock && (
                  <small className="p-error">{fieldErrors.sectorBlock}</small>
                )}
              </p>
            </div>
          </div>
          <div>
            <Dropdown
              id="state"
              value={selectedState}
              options={statesData}
              onChange={(e) => handleInputChangeCustomer('state', e.target.value)}
              optionLabel="name"
              editable
              placeholder="State"
              style={{
                width: '230px',
                height: '32px',
                border: fieldErrors.state ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                color: 'black',
                fontSize: '0.8rem',
              }}
            />

            <p className="" id="selectedState">
              {fieldErrors.state && <small className="p-error">{fieldErrors.state}</small>}
            </p>
          </div>
        </div>
        <div className="flex mt-5 gap-6">
          <div>
            <Dropdown
              id="country"
              value={selectedCountry}
              onChange={(e) => handleInputChangeCustomer('country', e.target.value)}
              options={countriesData}
              optionLabel="name"
              editable
              placeholder="Country"
              className=""
              style={{
                width: '230px',
                height: '32px',
                border: fieldErrors.country ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.8rem',
              }}
            />
            <p className="" id="selectedCountry">
              {fieldErrors.country && <small className="p-error">{fieldErrors.country}</small>}
            </p>
          </div>
          <div>
            <InputText
              id="pinCode"
              value={pinCode}
              onChange={(e) => handleInputChangeCustomer('pinCode', e.target.value)}
              placeholder="Zipcode"
              style={{
                width: '230px',
                height: '32px',
                border: fieldErrors.pinCode ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.8rem',
              }}
            />
            <p className="" id="pinCode">
              {fieldErrors.pinCode && <small className="p-error">{fieldErrors.pinCode}</small>}
            </p>
          </div>
        </div>
      </div>

      {/* Add Mooring */}

      <div className="mt-8 text-xl text-black font-bold">
        <h3>Add Mooring</h3>
      </div>

      <div className="mt-6">
        <div className="flex gap-6 ">
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Mooring ID
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-2">
              <InputComponent
                value={formData.mooringId}
                onChange={(e) => handleInputChange('mooringId', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.mooringId ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              {fieldErrors.mooringId && <small className="p-error">{fieldErrors.mooringId}</small>}
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
              {fieldErrors.harbor && <small className="p-error">{fieldErrors.harbor}</small>}
            </div>
          </div>

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
              {fieldErrors.waterDepth && (
                <small className="p-error">{fieldErrors.waterDepth}</small>
              )}
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
                }}
              />
              {fieldErrors.gpsCoordinatesValue && (
                <small className="p-error">{fieldErrors.gpsCoordinatesValue}</small>
              )}
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
                value={formData.boatyardName}
                onChange={(e) => handleInputChange('boatyardName', e.target.value)}
                options={boatyardName}
                optionLabel="boatyardName"
                editable
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.boatyardName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              {fieldErrors.boatyardName && (
                <small className="p-error">{fieldErrors.boatyardName}</small>
              )}
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
              {fieldErrors.boatName && <small className="p-error">{fieldErrors.boatName}</small>}
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
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
              {fieldErrors.boatSize && <small className="p-error">{fieldErrors.boatSize}</small>}
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
                value={formData.boatType}
                onChange={(e) => handleInputChange('boatType', e.value)}
                options={type}
                optionLabel="boatType"
                editable
                placeholder="Boat Type"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.boatType ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              {fieldErrors.boatType && <small className="p-error">{fieldErrors.boatType}</small>}
            </div>
          </div>
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
              {fieldErrors.boatWeight && (
                <small className="p-error">{fieldErrors.boatWeight}</small>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
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
              {fieldErrors.sizeOfWeight && (
                <small className="p-error">{fieldErrors.sizeOfWeight}</small>
              )}
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
              {fieldErrors.typeOfWeight && (
                <small className="p-error">{fieldErrors.typeOfWeight}</small>
              )}
            </div>
          </div>
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
              {fieldErrors.topChainCondition && (
                <small className="p-error">{fieldErrors.topChainCondition}</small>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3 mb-16">
          <div className="mt-3">
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
                <p>
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
                <p>
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
                <InputNumber
                  value={formData.deptAtMeanHighWater}
                  onChange={(e) => handleInputChange('deptAtMeanHighWater', e.value)}
                  min={0}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.deptAtMeanHighWater ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
                <p>
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
                    border: fieldErrors.bottomChainCondition
                      ? '1px solid red'
                      : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />

                <p>
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

                <p>
                  {fieldErrors.pennantCondition && (
                    <small className="p-error">{fieldErrors.pennantCondition}</small>
                  )}
                </p>
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
          onClick={handleClick}
          label={'Save'}
          style={{
            width: '89px',
            height: '42px',
            backgroundColor: '#0098FF',
            cursor: 'pointer',
            fontWeight: 'bolder',
            fontSize: '14px',
            boxShadow: 'none',
            color: 'white',
            borderRadius: '0.50rem',
            marginTop: '1rem',
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
            fontSize: '14px',
            height: '42px',
            fontWeight: '500',
            top: '20px',
          }}
        />
      </div>
    </div>
  )
}

export default AddCustomer
