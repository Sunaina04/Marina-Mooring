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
import { CustomerResponse, ErrorResponse } from '../../../Type/ApiTypes'
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
import { ProgressSpinner } from 'primereact/progressspinner'
const AddCustomer: React.FC<CustomerDataProps> = ({
  customer,
  mooringRowData,
  editMode,
  editCustomerMode,
  editMooringMode,
  closeModal,
  getCustomer,
  getCustomerRecord,
  toastRef,
}) => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [selectedCountry, setSelectedCountry] = useState<Country>()
  const [selectedState, setSelectedState] = useState<State>()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
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
  // const [center, setCenter] = useState<LatLngExpression | undefined>([30.6983149, 76.656095])
  const [firstErrorField, setFirstErrorField] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
    depthAtMeanHighWater: '',
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
    const zipCodeRegex = /^\d+$/
    const numberRegex = /^\d+$/
    const harborRegex = /^[a-zA-Z ]+$/
    const alphanumericRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/
    const errors: { [key: string]: string } = {}
    let firstError = ''

    if (!firstName) {
      errors.firstName = 'First name is required'
      firstError = 'firstName'
    } else if (!nameRegex.test(firstName)) {
      errors.firstName = 'First name must only contain letters'
      firstError = 'firstName'
    } else if (firstName.length < 3) {
      errors.firstName = 'First name must be at least 3 characters long'
      firstError = 'firstName'
    }

    if (!lastName) {
      errors.lastName = 'Last name is required'
      if (!firstError) firstError = 'lastName'
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
      errors.pinCode = 'Zipcode is required'
      if (!firstError) firstError = 'pinCode'
    } else if (!zipCodeRegex.test(pinCode)) {
      errors.pinCode = 'Zipcode contain only numbers'
      if (!firstError) firstError = 'pinCode'
    }

    if (!formData?.depthAtMeanHighWater) {
      errors.depthAtMeanHighWater = 'Depth at Mean High Water is required'
      if (!firstError) firstError = 'depthAtMeanHighWater'
    } else if (!numberRegex.test(String(formData?.depthAtMeanHighWater))) {
      errors.depthAtMeanHighWater = 'Depth at Mean High Water must be a number'
      if (!firstError) firstError = 'depthAtMeanHighWater'
    }

    if (!selectedState) {
      errors.state = 'State is required'
      if (!firstError) firstError = 'state'
    }

    if (!selectedCountry) {
      errors.country = 'Country is required'
      if (!firstError) firstError = 'country'
    }

    if (!formData?.harbor) {
      errors.harbor = 'Harbor is required'
      if (!firstError) firstError = 'harbor'
    } else if (!harborRegex.test(formData?.harbor)) {
      errors.harbor = 'Harbor must only contain letters'
      if (!firstError) firstError = 'harbor'
    }
    if (!gpsCoordinatesValue) {
      errors.gpsCoordinatesValue = 'GPS Coordinates is required'
    }

    if (!formData?.mooringId) {
      errors.mooringId = 'Mooring ID is required'
      if (!firstError) firstError = 'mooringId'
    } else if (!alphanumericRegex.test(formData?.mooringId)) {
      errors.mooringId = 'Mooring ID must be alphanumeric'
      if (!firstError) firstError = 'mooringId'
    }

    if (!formData?.waterDepth) {
      errors.waterDepth = 'Water Depth is required'
    } else if (!numberRegex.test(String(formData?.waterDepth))) {
      errors.waterDepth = 'Water Depth must be a number'
      if (!firstError) firstError = 'waterDepth'
    }

    if (!formData?.boatyardName) errors.boatyardName = 'Boatyard Name is required'

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

    if (!formData?.boatType) errors.boatType = 'Type is required'

    if (!formData?.boatWeight) {
      errors.boatWeight = 'BoatWeight  is required'
      if (!firstError) firstError = 'boatWeight'
    } else if (!numberRegex.test(String(formData?.boatWeight))) {
      errors.boatWeight = 'Weight   must be a number'
      if (!firstError) firstError = 'boatWeight'
    }
    if (!formData?.sizeOfWeight) errors.sizeOfWeight = 'Size of Weight is required'

    if (!formData?.typeOfWeight) errors.typeOfWeight = 'Type of Weight is required'
    if (!formData?.topChainCondition) errors.topChainCondition = 'Top Chain Condition is required'
    if (!formData?.conditionOfEye) errors.conditionOfEye = 'Condition of Eye is required'
    if (!formData?.shackleSwivelCondition)
      errors.shackleSwivelCondition = 'Shackle, Swivel Condition is required'
    if (!formData?.bottomChainCondition)
      errors.bottomChainCondition = 'Bottom Chain Condition is required'
    if (!formData?.pennantCondition) errors.pennantCondition = 'Pennant Condition is required'

    setFirstErrorField(firstError)
    setFieldErrors(errors)
    return errors
  }

  const validateCustomerFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    const nameRegex = /^[a-zA-Z ]+$/

    const errors: { [key: string]: string } = {}
    let firstError = ''

    if (!firstName) {
      errors.firstName = 'firstName is required'
      firstError = 'firstName'
    } else if (!nameRegex.test(firstName)) {
      errors.firstName = 'firstName must only contain letters'
      firstError = 'firstName'
    } else if (firstName.length < 3) {
      errors.firstName = 'firstName must be at least 3 characters long'
      firstError = 'firstName'
    }

    if (!lastName) {
      errors.customerId = 'LastName  is required'
      if (!firstError) firstError = 'lastName'
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

    setFirstErrorField(firstError)
    setFieldErrors(errors)
    return errors
  }

  const validateMooringFields = () => {
    const errors: { [key: string]: string } = {}

    if (!gpsCoordinatesValue) {
      errors.gpsCoordinatesValue = 'GPS Coordinates is required'
    }
    if (!formData?.harbor) errors.harbor = 'Harbor is required'
    if (!formData?.mooringId) errors.mooringId = 'Mooring ID is required'
    if (!formData?.harbor) errors.harbor = 'Harbor is required'
    if (!formData?.waterDepth) errors.waterDepth = 'Water Depth is required'

    if (!formData?.boatyardName) errors.boatyardName = 'Boatyard Name is required'
    if (!formData?.boatName) errors.boatName = 'Boat Name is required'
    if (!formData?.boatSize) errors.boatSize = 'Boat Size is required'
    if (!formData?.boatType) errors.boatType = 'Type is required'
    if (!formData?.boatWeight) errors.boatWeight = 'Weight is required'
    if (!formData?.sizeOfWeight) errors.sizeOfWeight = 'Size of Weight is required'
    if (!formData?.typeOfWeight) errors.typeOfWeight = 'Type of Weight is required'
    if (!formData?.topChainCondition) errors.topChainCondition = 'Top Chain Condition is required'
    if (!formData?.conditionOfEye) errors.conditionOfEye = 'Condition of Eye is required'
    if (!formData?.shackleSwivelCondition)
      errors.shackleSwivelCondition = 'Shackle, Swivel Condition is required'
    if (!formData?.depthAtMeanHighWater)
      errors.depthAtMeanHighWater = 'Depth at Mean High Water is required'
    if (!formData?.bottomChainCondition)
      errors.bottomChainCondition = 'Bottom Chain Condition is required'
    if (!formData?.pennantCondition) errors.pennantCondition = 'Pennant Condition is required'

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
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
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
    setFirstName(customer?.firstName || '')
    setLastName(customer?.lastName || '')
    setPhone(customer?.phone || '')
    setEmail(customer?.emailAddress || '')
    setStreetHouse(customer?.streetHouse || '')
    setSectorBlock(customer?.aptSuite || '')
    setPinCode(customer?.zipCode || '')
    setSelectedState(customer?.stateResponseDto?.name || undefined)
    setSelectedCountry(customer?.countryResponseDto?.name || undefined)
    setGpsCoordinatesValue(mooringRowData?.gpsCoordinates || '')
    setFormData((prevState: any) => ({
      ...prevState,
      mooringId: mooringRowData?.mooringId || '',
      mooringName: mooringRowData?.mooringName || '',
      customerName: '',
      harbor: mooringRowData?.harbor || '',
      waterDepth: mooringRowData?.waterDepth || '',
      // gpsCoordinates: mooringRowData?.gpsCoordinates || '',
      boatyardName: mooringRowData?.boatyardResponseDto?.boatyardName || '',
      boatName: mooringRowData?.boatName || '',
      boatSize: mooringRowData?.boatSize || '',
      boatType: mooringRowData?.boatType?.boatType || '',
      boatWeight: mooringRowData?.boatWeight || '',
      sizeOfWeight: mooringRowData?.sizeOfWeight?.weight || '',
      typeOfWeight: mooringRowData?.typeOfWeight?.type || '',
      conditionOfEye: mooringRowData?.eyeCondition?.condition || '',
      topChainCondition: mooringRowData?.topChainCondition?.condition || '',
      shackleSwivelCondition: mooringRowData?.shackleSwivelCondition?.condition || '',
      pennantCondition: mooringRowData?.pennantCondition?.condition || '',
      depthAtMeanHighWater: mooringRowData?.depthAtMeanHighWater || '',
      bottomChainCondition: mooringRowData?.bottomChainCondition?.condition || '',
      status: 0,
    }))
  }

  const SaveCustomer = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    setIsLoading(true)
    const payload = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      phone: phone,
      streetHouse: streetHouse,
      aptSuite: sectorBlock,
      stateId: selectedState?.id,
      countryId: selectedCountry?.id,
      zipCode: pinCode,
      customerOwnerId: selectedCustomerId,
      mooringRequestDtoList: [
        {
          mooringId: formData?.mooringId,
          lastName: lastName,
          harbor: formData?.harbor,
          waterDepth: formData?.waterDepth,
          gpsCoordinates: gpsCoordinatesValue,
          boatyardId: formData?.boatyardName.id,
          boatName: formData?.boatName,
          boatSize: formData?.boatSize,
          boatTypeId: formData?.boatType.id,
          boatWeight: formData?.boatWeight,
          sizeOfWeightId: formData?.sizeOfWeight.id,
          typeOfWeightId: formData?.typeOfWeight.id,
          eyeConditionId: formData?.conditionOfEye.id,
          topChainConditionId: formData?.topChainCondition.id,
          bottomChainConditionId: formData?.bottomChainCondition.id,
          shackleSwivelConditionId: formData?.shackleSwivelCondition.id,
          pennantConditionId: formData?.pennantCondition.id,
          depthAtMeanHighWater: formData?.depthAtMeanHighWater,
          customerOwnerId: selectedCustomerId,
          // statusId: 1,
        },
      ],
    }

    try {
      const response = await addCustomer(payload).unwrap()
      const { status, message } = response as CustomerResponse
      if (status === 200 || status === 201) {
        closeModal()
        getCustomer()
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

  const UpdateCustomer = async () => {
    const errors = validateCustomerFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    try {
      setIsLoading(true)
      const editCustomerPayload = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        phone: phone,
        streetHouse: streetHouse,
        aptSuite: sectorBlock,
        state: selectedState?.id,
        country: selectedCountry?.id,
        zipCode: pinCode,
        customerOwnerId: selectedCustomerId,
      }
      const response = await updateCustomer({
        payload: editCustomerPayload,
        id: customer?.id,
      }).unwrap()
      const { status, message } = response as CustomerResponse
      if (status === 200 || status === 201) {
        setIsLoading(false)
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

  const UpdateMooring = async () => {
    const errors = validateMooringFields()
    if (Object.keys(errors).length > 0) {
      return
    }
    try {
      setIsLoading(true)
      const editMooringPayload = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        phone: phone,
        streetHouse: streetHouse,
        aptSuite: sectorBlock,
        state: selectedState?.id ? selectedState?.id : customer?.stateResponseDto?.id,
        country: selectedCountry?.id ? selectedCountry?.id : customer?.stateResponseDto?.id,
        zipCode: pinCode,
        customerOwnerId: selectedCustomerId,
        mooringRequestDtoList: [
          {
            id: mooringRowData?.id,
            mooringId: formData?.mooringId ? formData?.mooringId : mooringRowData?.mooringId,
            lastName: lastName,
            harbor: formData?.harbor ? formData?.harbor : mooringRowData?.harbor,
            waterDepth: formData?.waterDepth ? formData?.waterDepth : mooringRowData?.waterDepth,
            gpsCoordinates: gpsCoordinatesValue,
            boatyardId: formData?.boatyardName.id
              ? formData?.boatyardName.id
              : mooringRowData?.boatyardResponseDto?.id,
            boatName: formData?.boatName ? formData?.boatName : mooringRowData?.boatName,
            boatSize: formData?.boatSize ? formData?.boatSize : mooringRowData?.boatSize,
            boatTypeId: formData?.boatType.id ? formData?.boatType.id : mooringRowData?.boatType.id,
            boatWeight: formData?.boatWeight ? formData?.boatWeight : mooringRowData?.boatWeight,
            sizeOfWeightId: formData?.sizeOfWeight.id
              ? formData?.sizeOfWeight.id
              : mooringRowData?.sizeOfWeight.id,
            typeOfWeightId: formData?.typeOfWeight.id
              ? formData?.typeOfWeight.id
              : mooringRowData?.typeOfWeight.id,
            eyeConditionId: formData?.conditionOfEye.id
              ? formData?.conditionOfEye.id
              : mooringRowData?.eyeCondition.id,
            topChainConditionId: formData?.topChainCondition.id
              ? formData?.topChainCondition.id
              : mooringRowData?.topChainCondition.id,
            bottomChainConditionId: formData?.bottomChainCondition.id
              ? formData?.bottomChainCondition.id
              : mooringRowData?.bottomChainCondition.id,
            shackleSwivelConditionId: formData?.shackleSwivelCondition.id
              ? formData?.shackleSwivelCondition.id
              : mooringRowData?.shackleSwivelCondition.id,
            pennantConditionId: formData?.pennantCondition.id
              ? formData?.pennantCondition.id
              : mooringRowData?.pennantCondition.id,
            depthAtMeanHighWater: formData?.depthAtMeanHighWater
              ? formData?.depthAtMeanHighWater
              : mooringRowData?.depthAtMeanHighWater,
            customerOwnerId: selectedCustomerId,
            // statusId: 1,
          },
        ],
      }
      const response = await updateCustomer({
        payload: editMooringPayload,
        id: customer?.id,
      }).unwrap()
      const { status, message } = response as CustomerResponse
      if (status === 200 || status === 201) {
        setIsLoading(false)
        closeModal()
        getCustomer()
        if (getCustomerRecord) {
          getCustomerRecord()
        }
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

  const fetchDataAndUpdate = useCallback(async () => {
    if (editCustomerMode || !editMode) {
      const { statesData } = await getStatesData()
      const { countriesData } = await getCountriesData()

      if (countriesData !== null) {
        setCountriesData(countriesData)
      }
      if (statesData !== null) {
        setStatesData(statesData)
      }
    }

    if (editMooringMode || !editMode) {
      const { typeOfBoatTypeData } = await getTypeOfBoatTypeData()
      const { typeOfWeightData } = await getTypeOfWeightData()
      const { typeOfChainData } = await getTypeOfChainData()
      const { TypeOfSizeOfWeightData } = await getTypeOfSizeOfWeightData()
      const { typeOfEyeData } = await getTypeOfEyeData()
      const { typeOfBottomChainData } = await getTypeOfBottomChainData()
      const { typeOfShackleSwivelData } = await getTypeOfShackleSwivelData()
      const { typeOfPennantData } = await getTypeOfPennantData()
      const { boatYardName } = await getBoatYardNameData()

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

      if (typeOfBottomChainData !== null) {
        setBottomChainCondition(typeOfBottomChainData)
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
    }
  }, [])

  const handleClick = () => {
    if (editCustomerMode) {
      UpdateCustomer()
    } else if (editMooringMode) {
      UpdateMooring()
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

  useEffect(() => {
    if (gpsCoordinatesValue) {
      const coordinates = getFomattedCoordinate(gpsCoordinatesValue)
      setCenter(coordinates)
      // handlePositionChange(coordinates[0], coordinates[1])
    }
  }, [gpsCoordinatesValue])

  return (
    <div className="">
      {/* Add Customer */}

      {!editMooringMode && (
        <>
          <div className="flex gap-6">
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    First Name
                    <p className="text-red-600">*</p>
                  </div>
                </span>
                <div className="mt-2">
                  <InputComponent
                    value={firstName}
                    onChange={(e) => handleInputChangeCustomer('firstName', e.target.value)}
                    style={{
                      width: '230px',
                      height: '32px',
                      border: fieldErrors.firstName ? '1px solid red' : '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                    }}
                  />
                  <p className="" id="firstName">
                    {fieldErrors.firstName && (
                      <small className="p-error">{fieldErrors.firstName}</small>
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
                    Last Name
                    <p className="text-red-600">*</p>
                  </div>
                </span>
                <div className="mt-2">
                  <InputComponent
                    value={lastName}
                    onChange={(e) => handleInputChangeCustomer('lastName', e.target.value)}
                    style={{
                      width: '230px',
                      height: '32px',
                      border: fieldErrors.lastName ? '1px solid red' : '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                    }}
                  />
                  <p>
                    <p className="" id="lastName">
                      {fieldErrors.lastName && (
                        <small className="p-error">{fieldErrors.lastName}</small>
                      )}
                    </p>
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
        </>
      )}

      {/* Add Mooring */}

      {!editCustomerMode && (
        <>
          {!editMooringMode && (
            <div className="mt-8 text-xl text-black font-bold">
              <h3>Add Mooring</h3>
            </div>
          )}

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
                    value={formData?.mooringId}
                    onChange={(e) => handleInputChange('mooringId', e.target.value)}
                    style={{
                      width: '230px',
                      height: '32px',
                      border: fieldErrors.mooringId ? '1px solid red' : '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                    }}
                  />
                  {fieldErrors.mooringId && (
                    <small className="p-error">{fieldErrors.mooringId}</small>
                  )}
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
                  {fieldErrors.harbor && <small className="p-error">{fieldErrors.harbor}</small>}
                </div>
              </div>

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
                      border: fieldErrors.gpsCoordinatesValue
                        ? '1px solid red'
                        : '1px solid #D5E1EA',
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
                    value={formData?.boatyardName}
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
                  {fieldErrors.boatName && (
                    <small className="p-error">{fieldErrors.boatName}</small>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Boat Size (feet)
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
                  {fieldErrors.boatSize && (
                    <small className="p-error">{fieldErrors.boatSize}</small>
                  )}
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
                    value={formData?.boatType}
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
                  {fieldErrors.boatType && (
                    <small className="p-error">{fieldErrors.boatType}</small>
                  )}
                </div>
              </div>
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
                    <InputComponent
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
                    {fieldErrors.depthAtMeanHighWater && (
                      <small className="p-error">{fieldErrors.depthAtMeanHighWater}</small>
                    )}
                  </div>
                </div>
              </div>
              <div>
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
                      value={formData?.pennantCondition}
                      onChange={(e) => handleInputChange('pennantCondition', e.value)}
                      options={pennantData}
                      optionLabel="condition"
                      editable
                      placeholder="Select"
                      style={{
                        width: '230px',
                        height: '32px',
                        border: fieldErrors.pennantCondition
                          ? '1px solid red'
                          : '1px solid #D5E1EA',
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
                    zoomLevel={10}
                    center={center}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

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
