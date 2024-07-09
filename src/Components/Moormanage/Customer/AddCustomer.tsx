import React, { useCallback, useEffect, useRef, useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import {
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useUpdateMooringsMutation,
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
  TypeOfSizeOfWeight,
  BoatyardNameData,
  CustomersType,
} from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import CustomSelectPositionMap from '../../Map/CustomSelectPositionMap'
import { LatLngExpression } from 'leaflet'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Checkbox } from 'primereact/checkbox'
import { Calendar } from 'primereact/calendar'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import { FileUpload } from 'primereact/fileupload'
import { FaFileUpload } from 'react-icons/fa'
import { Dialog } from 'primereact/dialog'
import { AiOutlineDelete } from 'react-icons/ai'
const AddCustomer: React.FC<CustomerDataProps> = ({
  customer,
  mooringRowData,
  editMode,
  editCustomerMode,
  editMooringMode,
  closeModal,
  getCustomer,
  getCustomerRecord,
}) => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [selectedCountry, setSelectedCountry] = useState<Country>()
  const [selectedState, setSelectedState] = useState<State>()
  const [selectedCustomerType, setSelectedCustomerType] = useState<any>()
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
  const [customerType, setCustomerType] = useState<MetaData[]>([])
  const [bottomChainCondition, setBottomChainCondition] = useState<MetaData[]>([])
  const [shackleSwivelData, setShackleSwivelData] = useState<MetaData[]>([])
  const [boatyardName, setBoatyardName] = useState<MetaData[]>([])
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [gpsCoordinatesValue, setGpsCoordinatesValue] = useState<string>()
  const [checkedMooring, setCheckedMooring] = useState(false)
  const [checkedDock, setCheckedDock] = useState(false)
  const [customerTypeId, setCustomerTypeId] = useState<any>(customer?.customerTypeDto?.id)
  const toastRef = useRef<Toast>(null)
  const [imageVisible, setImageVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null)
  const [imageRequestDtoList, setimageRequestDtoList] = useState<any>()
  const [emailError, setEmailError] = useState('')

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
  }

  const [center, setCenter] = useState<any>(
    mooringRowData?.gpsCoordinates || gpsCoordinatesValue
      ? getFomattedCoordinate(mooringRowData?.gpsCoordinates || gpsCoordinatesValue)
      : [41.56725, 70.94045],
  )
  const [firstErrorField, setFirstErrorField] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [customerImages, setCustomerImages] = useState<string[]>([])

  const [encodedImages, setEncodedImages] = useState<string[]>([])

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
    pendantCondition: '',
    depthAtMeanHighWater: '',
    status: 0,
    note: '',
  })

  const { getStatesData } = StatesData()
  const { getTypeOfBoatTypeData } = TypeOfBoatType()
  const { getTypeOfWeightData } = TypeOfWeightData()
  const { getTypeOfChainData } = TypeOfChainCondition()
  const { getTypeOfEyeData } = TypeOfEye()
  const { getTypeOfBottomChainData } = TypeOfBottomChain()
  const { getTypeOfShackleSwivelData } = TypeOfShackleSwivel()
  const { getTypeOfSizeOfWeightData } = TypeOfSizeOfWeight()
  const { getBoatYardNameData } = BoatyardNameData(selectedCustomerId)
  const { getCountriesData } = CountriesData()
  const { getCustomersType } = CustomersType()
  const [addCustomer] = useAddCustomerMutation()
  const [updateCustomer] = useUpdateCustomerMutation()
  const [updateMooring] = useUpdateMooringsMutation()

  const handlePositionChange = (lat: number, lng: number) => {
    setCenter([lat, lng])
    const formattedLat = lat.toFixed(3)
    const formattedLng = lng.toFixed(3)
    const concatenatedValue = `${formattedLat} ${formattedLng}`
    setGpsCoordinatesValue(concatenatedValue)
  }

  const handleFocus = () => {
    const passwordMessage = document.getElementById('mooring')
    if (passwordMessage) {
      passwordMessage.style.display = 'block'
      passwordMessage.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target
    const files = Array.from(fileInput.files || [])

    if (files.length === 0) {
      return
    }

    const validImageFiles = files.filter(
      (file) => file.type.startsWith('image/') && file.size >= 5120 && file.size <= 1048576,
    )

    const invalidTypeFiles = files.filter((file) => !file.type.startsWith('image/'))
    const invalidSizeFiles = files.filter((file) => file.size < 5120 || file.size > 1048576)

    if (invalidTypeFiles.length > 0 || invalidSizeFiles.length > 0) {
      setCustomerImages([])
      setEncodedImages([])
      let detailMessage = 'Only image files are allowed'

      if (invalidSizeFiles.length > 0) {
        detailMessage += '. Images must be between 5 KB and 1 MB.'
      }

      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: detailMessage,
        life: 3000,
      })
      fileInput.value = '' // Reset input value
      return
    }

    const newBase64Strings: string[] = []
    const newImageUrls: string[] = []
    const imageRequestDtoList: { imageName: string; imageData: string }[] = []

    for (const file of validImageFiles) {
      try {
        const base64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result.split(',')[1])
            } else {
              reject(new Error('FileReader result is not a string.'))
            }
          }
          reader.onerror = () => {
            reject(new Error('Error reading file.'))
          }
          reader.readAsDataURL(file)
        })
        newBase64Strings.push(base64String)
        newImageUrls.push(`data:image/png;base64,${base64String}`)
        imageRequestDtoList.push({
          imageName: file.name,
          imageData: base64String,
        })
      } catch (error) {
        console.error('Error reading file:', error)
      }
    }

    setCustomerImages((prevImages) => [...prevImages, ...newImageUrls])
    setEncodedImages((prevEncoded) => [...prevEncoded, ...newBase64Strings])
    setimageRequestDtoList(imageRequestDtoList)
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...customerImages]
    newImages.splice(index, 1)
    setCustomerImages(newImages)

    // const newEncodedImages = [...encodedImages]
    // newEncodedImages.splice(index, 1)
    // setEncodedImages(newEncodedImages)
  }

  const validateFields = () => {
    const phoneRegex = /^.{10}$|^.{12}$/
    const nameRegex = /^[a-zA-Z ]+$/

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

    setFirstErrorField(firstError)
    setFieldErrors(errors)
    return errors
  }

  const parseDate = (dateString: any) => {
    if (!dateString) return null
    const [month, day, year] = dateString.split('/')
    return new Date(year, month - 1, day)
  }

  const formatDate = (date: any) => {
    if (!date) return null
    const d = new Date(date)
    const month = ('0' + (d.getMonth() + 1)).slice(-2)
    const day = ('0' + d.getDate()).slice(-2)
    const year = d.getFullYear()
    return `${month}/${day}/${year}`
  }

  const handleInputChange = (field: string, value: any) => {
    const phoneRegex = /^.{10}$|^.{12}$/
    const numberRegex = /^\d+$/

    if (field === 'phone') {
      if (value !== '' && numberRegex.test(value)) {
        return
      }
    }

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
        setEmailError('')
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
      case 'CustomerType':
        setSelectedCustomerType(value)
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
    setSelectedCustomerType(customer?.customerTypeDto?.type)
    setSelectedState(customer?.stateResponseDto?.name || undefined)
    setSelectedCountry(customer?.countryResponseDto?.name || undefined)
    setGpsCoordinatesValue(mooringRowData?.gpsCoordinates || '')
    setCheckedDock(selectedCustomerType === 'Dock')

    setFormData((prevState: any) => ({
      ...prevState,
      mooringNumber: mooringRowData?.mooringNumber || '',
      mooringName: mooringRowData?.mooringName || '',
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
      note: customer?.note || '',
      status: 1,
    }))
  }

  const SaveCustomer = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }
    let payload
    setIsLoading(true)
    if (checkedMooring) {
      payload = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        streetHouse: streetHouse,
        note: formData.note,
        aptSuite: sectorBlock,
        stateId: selectedState?.id,
        countryId: selectedCountry?.id,
        imageRequestDtoList: imageRequestDtoList,
        customerTypeId: selectedCustomerType === 'Dock' ? 5 : selectedCustomerType?.id,
        ...(email && { emailAddress: email }),
        ...(pinCode && { zipCode: pinCode }),
        mooringRequestDtoList: [
          {
            customerId: formData?.customerName,
            addDock: checkedDock,
            mooringNumber: formData?.mooringId,
            harborOrArea: formData?.harbor,
            gpsCoordinates: gpsCoordinatesValue,
            installBottomChainDate: formData?.bottomChainDate,
            installTopChainDate: formData?.topChainDate,
            installConditionOfEyeDate: formData?.conditionEyeDate,
            boatyardId: formData?.boatYardName?.id,
            boatName: formData?.boatName,
            boatSize: formData?.boatSize,
            boatTypeId: formData?.type,
            boatWeight: formData?.boatWeight,
            sizeOfWeight: formData?.sizeOfWeight,
            typeOfWeightId: formData?.typeOfWeight?.id,
            eyeConditionId: formData?.conditionOfEye?.id,
            topChainConditionId: formData?.topChainCondition?.id,
            bottomChainConditionId: formData?.bottomChainCondition?.id,
            shackleSwivelConditionId: formData?.shackleSwivelCondition?.id,
            pendantConditionId: formData?.pendantCondition,
            depthAtMeanHighWater: formData?.depthAtMeanHighWater,
            statusId: 1,
          },
        ],
      }
    } else {
      payload = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        streetHouse: streetHouse,
        note: formData.note,
        aptSuite: sectorBlock,
        stateId: selectedState?.id,
        countryId: selectedCountry?.id,
        // encodedImages: encodedImages,
        imageRequestDtoList: imageRequestDtoList,
        customerTypeId: selectedCustomerType === 'Dock' ? 5 : selectedCustomerType?.id,
        ...(email && { emailAddress: email }),
        ...(pinCode && { zipCode: pinCode }),
      }
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
      const { data, message } = error as ErrorResponse
      setEmailError(data.message)
      setIsLoading(false)
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: data?.message,
        life: 3000,
      })
    }
  }

  const UpdateCustomer = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    try {
      setIsLoading(true)
      const editCustomerPayload = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        streetHouse: streetHouse,
        aptSuite: sectorBlock,
        state: selectedState?.id,
        country: selectedCountry?.id,
        imageRequestDtoList: imageRequestDtoList,
        customerOwnerId: selectedCustomerId,
        customerTypeId: selectedCustomerType === 'Dock' ? 5 : selectedCustomerType?.id,
        note: formData?.note,
        ...(email && { emailAddress: email }),
        ...(pinCode && { zipCode: pinCode }),
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
        statusId: 4,
      }
      const response = await updateMooring({
        payload: editMooringPayload,
        id: mooringRowData?.id,
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
      const { customersType } = await getCustomersType()

      if (countriesData !== null) {
        setIsLoading(false)
        setCountriesData(countriesData)
      }
      if (statesData !== null) {
        setIsLoading(false)
        setStatesData(statesData)
      }
      if (customersType !== null) {
        setIsLoading(false)
        setCustomerType(customersType)
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
      const { boatYardName } = await getBoatYardNameData()

      if (typeOfBoatTypeData !== null) {
        setIsLoading(false)
        setType(typeOfBoatTypeData)
      }
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
        setBottomChainCondition(typeOfBottomChainData)
      }

      if (typeOfShackleSwivelData !== null) {
        setIsLoading(false)
        setShackleSwivelData(typeOfShackleSwivelData)
      }

      if (boatYardName !== null) {
        setIsLoading(false)
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

  const AddDock = () => {
    return (
      <>
        <div className={`flex gap-4 mt-1 ${editCustomerMode && '!mb-14'}`}>
          <span>
            <label className="custom-checkbox-container">
              <input
                type="checkbox"
                onChange={(e: any) => {
                  setCheckedDock(e.target.checked ?? false)
                }}
                checked={checkedDock}
                style={{
                  border: '1px solid #D5E1EA',
                  height: '22px',
                  width: '22px',
                  borderRadius: '5px',
                }}
                className="custom-checkbox-input"
              />
              <span className="custom-checkbox"></span>
            </label>
          </span>
          <p className="font-medium text-lg text-[#000000] mt-5 ml-[14px]">Add Dock</p>
        </div>
      </>
    )
  }

  const AddMooring = () => {
    return (
      <>
        <div className="flex gap-4 mt-1">
          <span>
            <label className="custom-checkbox-container">
              <input
                type="checkbox"
                onChange={(e: any) => {
                  setCheckedMooring(e.target.checked ?? false)
                }}
                checked={checkedMooring}
                style={{
                  border: '1px solid #D5E1EA',
                  height: '22px',
                  width: '22px',
                  borderRadius: '5px',
                }}
                className="custom-checkbox-input"
              />
              <span className="custom-checkbox"></span>
            </label>
          </span>
          <p className="font-medium text-lg text-[#000000] mt-5 ml-4">Add Mooring</p>
        </div>
      </>
    )
  }

  const uploadImages = () => {
    setImageVisible(true)
  }

  useEffect(() => {
    handleFocus()
  }, [checkedMooring])

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
    }
  }, [gpsCoordinatesValue])

  useEffect(() => {
    if (checkedDock === true) {
      setSelectedCustomerType(customerType.find((item: any) => item.id === 5)?.type)
    } else if (checkedDock === false && !editCustomerMode) {
      setSelectedCustomerType(undefined)
    }
  }, [])

  useEffect(() => {
    if (
      selectedCustomerType &&
      (selectedCustomerType?.id === 5 || selectedCustomerType === 'Dock')
    ) {
      setCheckedMooring(true)
      setCheckedDock(true)
    }
  }, [selectedCustomerType])

  useEffect(() => {
    if (
      checkedDock === false &&
      (selectedCustomerType?.id === 5 || selectedCustomerType === 'Dock')
    ) {
      setSelectedCustomerType(undefined)
    }
  }, [checkedDock])

  return (
    <>
      <div className={isLoading ? 'blurred' : ''}>
        {/* Add Customer */}
        <Toast ref={toastRef} />
        {!editMooringMode && (
          <>
            <div className="">
              <div className="flex gap-6">
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
                        paddingLeft: '0.5rem',
                      }}
                    />
                    <p className="" id="firstName">
                      {fieldErrors.firstName && (
                        <small className="p-error">{fieldErrors.firstName}</small>
                      )}
                    </p>
                  </div>
                </div>
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
                        paddingLeft: '0.5rem',
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

                <div className="">
                  <span className="font-medium text-sm text-[#000000]">
                    <div className="flex gap-1">
                      Phone
                      <p className="text-red-600">*</p>
                    </div>
                  </span>
                  <div className="mt-2">
                    <InputComponent
                      value={phone}
                      onChange={(e) => handleInputChangeCustomer('phone', e.target.value)}
                      style={{
                        width: '230px',
                        height: '32px',
                        border: fieldErrors.phone ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        paddingLeft: '0.5rem',
                      }}
                    />
                    <p className="" id="phone">
                      {fieldErrors.phone && <small className="p-error">{fieldErrors.phone}</small>}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="mt-3">
                  <div>
                    <div>
                      <span className="font-medium text-sm text-[#000000]">
                        <div className="flex gap-1">Email Address</div>
                      </span>
                    </div>
                    <div className="mt-2">
                      <InputComponent
                        value={email}
                        onChange={(e) => handleInputChangeCustomer('email', e.target.value)}
                        style={{
                          width: '230px',
                          height: '32px',
                          border: emailError ? '1px solid red' : '1px solid #D5E1EA',
                          borderRadius: '0.50rem',
                          fontSize: '0.8rem',
                          paddingLeft: '0.5rem',
                        }}
                      />
                      <p className="" id="email">
                        <small className="p-error">{emailError}</small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="font-medium text-sm text-[#000000]">
                    <div className="gap-1">Customer Type</div>
                  </span>
                  <div className="mt-2">
                    <Dropdown
                      id="CustomerType"
                      value={selectedCustomerType}
                      options={customerType}
                      onChange={(e) => handleInputChangeCustomer('CustomerType', e.target.value)}
                      optionLabel="type"
                      editable
                      placeholder="Customer Type"
                      disabled={isLoading}
                      style={{
                        width: '230px',
                        height: '32px',
                        border: '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        color: 'black',
                      }}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <span className="font-medium text-sm text-[#000000]">
                    <div className="flex gap-1">Customer Image</div>
                  </span>

                  <div className="mt-2">
                    <div
                      style={{
                        width: '230px',
                        height: '32px',
                        border: fieldErrors.email ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        paddingLeft: '0.5rem',
                        cursor: 'pointer',
                      }}>
                      <div onClick={uploadImages} className="flex gap-3 text-center ">
                        <FaFileUpload
                          style={{ fontSize: '22px', color: '#0098FF', marginTop: '3px' }}
                        />
                        <div className="border-r-2 border-blue-100  h-[30px]"></div>
                        <span className="pl-4 mt-1"> Upload Image </span>
                      </div>
                    </div>
                  </div>

                  {/* <input type="text" onChange={uploadImages}/>p */}
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

            <div className="mt-3">
              <div>
                <h1 className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Address
                    {/* <p className="text-red-600">*</p> */}
                  </div>
                </h1>
              </div>
              <div className="flex gap-6 mt-2 ">
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
                        paddingLeft: '0.5rem',
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
                        paddingLeft: '0.5rem',
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    {fieldErrors.country && (
                      <small className="p-error">{fieldErrors.country}</small>
                    )}
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
                      paddingLeft: '0.5rem',
                    }}
                  />
                  <p className="" id="pinCode">
                    {fieldErrors.pinCode && (
                      <small className="p-error">{fieldErrors.pinCode}</small>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`mt-3 
    ${selectedCustomerType?.id === 5 || selectedCustomerType === 'Dock' ? 'mb-2' : editCustomerMode ? 'mb-20' : ''}`}>
              <div className="">
                <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                  <div className="flex gap-1 font-medium text-sm text-[#000000]">Note</div>
                </span>
              </div>
              <div className="mt-2">
                <InputTextarea
                  value={formData.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  style={{
                    width: '98%',
                    height: '50px',
                    border: fieldErrors.note ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    boxShadow: 'none',
                    paddingLeft: '0.5rem',
                    color: 'black',
                    resize: 'none',
                  }}
                />
                <p>{fieldErrors.note && <small className="p-error">{fieldErrors.note}</small>}</p>
              </div>
            </div>
          </>
        )}

        {/* Add Mooring */}

        {(editCustomerMode && selectedCustomerType === 'Dock') ||
        (editCustomerMode && selectedCustomerType?.id === 5) ? (
          AddDock()
        ) : (
          <></>
        )}

        {!editCustomerMode && (
          <>
            {!editMooringMode && (
              <div className="flex gap-[7rem] text-xl text-black font-bold mb-12">
                {AddMooring()}
                {selectedCustomerType?.id === 5 && AddDock()}
              </div>
            )}

            {(checkedMooring === true || editMooringMode) && (
              <div id="mooring" className="mt-4">
                <div className="flex ">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Mooring Number</div>
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

                  <div className="ml-6">
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Harbor/Area</div>
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
                        {fieldErrors.harbor && (
                          <small className="p-error">{fieldErrors.harbor}</small>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-3">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">G.P.S Coordinates</div>
                    </span>
                    <div className="mt-2">
                      <InputComponent
                        value={gpsCoordinatesValue}
                        onChange={(e) => {
                          setGpsCoordinatesValue(e.target.value)
                          setFieldErrors((prevErrors) => ({
                            ...prevErrors,
                            gpsCoordinatesValue: '',
                          }))
                        }}
                        style={{
                          width: '230px',
                          height: '32px',
                          border: fieldErrors.gpsCoordinatesValue
                            ? '1px solid red'
                            : '1px solid #D5E1EA',
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
                      <div className="flex gap-1">Boatyard Name</div>
                    </span>
                    <div className="mt-2">
                      <Dropdown
                        value={formData?.boatYardName}
                        onChange={(e) => handleInputChange('boatYardName', e.target.value)}
                        options={boatyardName}
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

                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Boat Name</div>
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
                        {fieldErrors.boatName && (
                          <small className="p-error">{fieldErrors.boatName}</small>
                        )}
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
                      }}
                      strokeWidth="4"
                    />
                  )}

                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Boat Size (in feet)</div>
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
                          paddingLeft: '0.5rem',
                        }}
                      />
                      <p id="boatName">
                        {fieldErrors.boatSize && (
                          <small className="p-error">{fieldErrors.boatSize}</small>
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-medium text-sm text-[#000000]">
                        <div className="flex gap-1">Size of Weight</div>
                      </span>
                    </div>

                    <div className="mt-2">
                      <InputComponent
                        value={formData?.sizeOfWeight}
                        onChange={(e) => handleInputChange('sizeOfWeight', e.target.value)}
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
                        <div className="flex gap-1">Type of Weight</div>
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

                <div className="flex gap-6 mt-3">
                  <div>
                    <div>
                      <span className="font-medium text-sm text-[#000000]">
                        <div className="flex gap-1">Top Chain Condition</div>
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
                          border: fieldErrors.topChainCondition
                            ? '1px solid red'
                            : '1px solid #D5E1EA',
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
                          Top Chain Condition{' '}
                          <span style={{ fontSize: '0.6rem' }}> (install date)</span>
                        </div>
                      </span>
                    </div>

                    <div className="mt-2">
                      <Calendar
                        value={parseDate(formData?.topChainDate)}
                        placeholder="mm/dd/yy"
                        onChange={(e) =>
                          handleInputChange('topChainDate', formatDate(e.target.value))
                        }
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
                        <div className="flex gap-1">Depth at Mean High Water</div>
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

                <div className="flex gap-6 mt-3 mb-20">
                  <div>
                    <div className="mt-3">
                      <div>
                        <span className="font-medium text-sm text-[#000000]">
                          <div className="flex gap-1">Bottom Chain Condition</div>
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
                          <div className="flex gap-1">Condition of Eye</div>
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
                            border: fieldErrors.conditionOfEye
                              ? '1px solid red'
                              : '1px solid #D5E1EA',
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
                          <div className="flex gap-1">Pendant Condition</div>
                        </span>
                      </div>

                      <div className="mt-2">
                        <InputComponent
                          value={formData?.pendantCondition}
                          onChange={(e) => handleInputChange('pendantCondition', e.target.value)}
                          style={{
                            width: '230px',
                            height: '32px',
                            border: fieldErrors.pendantCondition
                              ? '1px solid red'
                              : '1px solid #D5E1EA',
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
                          options={type}
                          optionLabel="boatType"
                          editable
                          placeholder="Select"
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

                  <div>
                    <div className="mt-3">
                      <div>
                        <span className="font-medium text-sm text-[#000000]">
                          <div className="flex gap-1">
                            Bottom Chain Condition
                            <span style={{ fontSize: '0.6rem' }}> (install date)</span>
                          </div>
                        </span>
                      </div>

                      <div className="mt-2">
                        <Calendar
                          value={parseDate(formData.bottomChainDate)}
                          onChange={(e) =>
                            handleInputChange('bottomChainDate', formatDate(e.target.value))
                          }
                          dateFormat="mm/dd/yy"
                          placeholder="mm/dd/yy"
                          style={{
                            width: '230px',
                            height: '32px',
                            border: fieldErrors.bottomChainDate
                              ? '1px solid red'
                              : '1px solid #D5E1EA',
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

                    <div className="mt-3">
                      <div>
                        <span className="font-medium text-sm text-[#000000]">
                          <div className="flex gap-1">
                            Condition of Eye{' '}
                            <span style={{ fontSize: '0.6rem' }}> (install date)</span>
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
                          placeholder="mm/dd/yy"
                          style={{
                            width: '230px',
                            height: '32px',
                            border: fieldErrors.conditionEyeDate
                              ? '1px solid red'
                              : '1px solid #D5E1EA',
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
                          editable
                          placeholder="Select"
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
                          zoomLevel={15}
                          center={center}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div
        className={`"flex gap-6 bottom-2 absolute left-6"  ${isLoading ? 'blurred' : ''}`}
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
          }}
        />

        <Dialog
          position="center"
          style={{
            width: '800px',
            minWidth: '800px',
            height: '580px',
            minHeight: '580px',
            borderRadius: '1rem',
            fontWeight: '400',
            cursor: 'alias',
          }}
          draggable={false}
          visible={imageVisible}
          onHide={() => setImageVisible(false)}
          headerStyle={{ cursor: 'alias' }}
          header={'Customers Images'}>
          <div className={`ml-4 ${isLoading ? 'blurred' : ''}`}>
            <div className="flex justify-center">
              <div className="mt-2">
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{
                    display: 'none',
                  }}
                />
                <label
                  htmlFor="file-input"
                  style={{
                    width: '300px',
                    height: '40px',
                    border: '2px solid #0098FF',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                    display: 'flex',
                    gap: '0.5rem',
                    textAlign: 'center',
                    lineHeight: '25px',
                    cursor: 'pointer',
                  }}>
<<<<<<< Updated upstream
                  <div onClick={uploadImages} className="flex gap-3 text-center ">
                    <FaFileUpload
                      style={{
                        fontSize: '29px',
                        color: '#0098FF',
                        marginLeft: '1rem',
                        marginTop: '3px',
                      }}
                    />
                    <div className="border-r-2 border-sky-500  h-9 pl-3"></div>
                    <span className="pl-10 mt-1"> UPLOAD IMAGES </span>
                  </div>
=======
                  <FaFileUpload style={{ fontSize: '25px', color: 'blue' }} />
                  <div>Upload Imagess</div>
>>>>>>> Stashed changes
                </label>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', marginLeft: '40px' }}>
            {customerImages.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-16 flex-wrap">
                  {customerImages.map((image, index) => (
                    <div
                      key={index}
                      style={{ position: 'relative', display: 'inline-block' }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}>
                      {/* <h1
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '0',
                          left: '12px',
                          background: 'gray',
                          color: 'white',
                          fontWeight: 'bolder',
                          border: 'none',
                          width: '80px',
                          cursor: 'pointer',
                          opacity: hoveredIndex === index ? 1 : 0,
                          transition: 'opacity 0.3s',
                        }}>
                        name
                      </h1> */}
                      <AiOutlineDelete
                        onClick={() => handleRemoveImage(index)}
                        style={{
                          position: 'absolute',
                          top: '165px',
                          right: '5px',
                          background: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          width: '28px',
                          height: '25px',
                          cursor: 'pointer',
                          opacity: hoveredIndex === index ? 1 : 0,
                          transition: 'opacity 0.3s',
                        }}
                      />
                      <img
                        src={image}
                        alt={`Uploaded ${index}`}
                        style={{
                          width: '300px',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '0.5rem',
                          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={`flex gap-4 ml-4 bottom-5 absolute left-6 ${isLoading ? 'blurred' : ''}`}>
            <Button
              label={'Close'}
              onClick={() => setImageVisible(false)}
              style={{
                width: '89px',
                height: '42px',
                backgroundColor: '#0098FF',
                cursor: 'pointer',
                fontWeight: 'bolder',
                fontSize: '1rem',
                boxShadow: 'none',
                color: 'white',
                borderRadius: '0.5rem',
              }}
            />
          </div>
          <Toast ref={toastRef} />
        </Dialog>
      </div>
    </>
  )
}

export default AddCustomer
