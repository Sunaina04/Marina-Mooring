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
  ServiceAreaData,
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
import { FaFileUpload } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { Dialog } from 'primereact/dialog'

const AddMoorings: React.FC<AddMooringProps> = ({
  moorings,
  editMode,
  mooringRowData,
  isEditMooring,
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
  const { getServiceAreaData } = ServiceAreaData()

  const [type, setType] = useState<MetaData[]>([])
  const [weightData, setWeightData] = useState<MetaData[]>([])
  const [chainData, setChainData] = useState<MetaData[]>([])
  const [serviceArea, setServiceArea] = useState<MetaData[]>([])
  const [sizeOfWeight, setSizeOfWeight] = useState<MetaData[]>([])
  const [conditionOfEye, setConditionOfEye] = useState<MetaData[]>([])
  const [bottomChainCondition, setbottomChainCondition] = useState<MetaData[]>([])
  const [shackleSwivelData, setShackleSwivelData] = useState<MetaData[]>([])
  const [imageVisible, setImageVisible] = useState(false)
  const [customerName, setcustomerName] = useState<any[]>([])
  const [boatyardsName, setBoatYardsName] = useState<MetaData[]>([])
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [firstErrorField, setFirstErrorField] = useState('')
  const [gpsCoordinatesValue, setGpsCoordinatesValue] = useState<string>()
  const [checkedDock, setCheckedDock] = useState(false)
  const [mooringImages, setMooringImages] = useState<string[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null)
  const [encodedImages, setEncodedImages] = useState<string[]>([])
  const [imageRequestDtoList, setimageRequestDtoList] = useState<any>()
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
    inspectionDate: '',
    serviceAreaId: '',
    imageNote: '',
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
    const { serviceAreaData } = await getServiceAreaData()

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

    if (serviceAreaData !== null) {
      setIsLoading(false)
      setServiceArea(serviceAreaData)
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

  const uploadImages = () => {
    setImageVisible(true)
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...mooringImages]
    newImages.splice(index, 1)
    setMooringImages(newImages)

    // const newEncodedImages = [...encodedImages]
    // newEncodedImages.splice(index, 1)
    // setEncodedImages(newEncodedImages)
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
      setMooringImages([])
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
      fileInput.value = ''
      return
    }

    const newBase64Strings: string[] = []
    const newImageUrls: string[] = []
    const imageRequestDtoList: { imageName: string; imageData: string; note: string }[] = []

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
          note: formData?.imageNote,
        })
      } catch (error) {
        console.error('Error reading file:', error)
      }
    }

    setMooringImages((prevImages) => [...prevImages, ...newImageUrls])
    setEncodedImages((prevEncoded) => [...prevEncoded, ...newBase64Strings])
    setimageRequestDtoList(imageRequestDtoList)
  }

  const handleEditMode = () => {
    setGpsCoordinatesValue(mooringRowData?.gpsCoordinates || '')
    setFormData((prevState: any) => ({
      ...prevState,
      mooringNumber: mooringRowData?.mooringNumber || '',
      mooringName: mooringRowData?.mooringName || '',
      customerName: mooringRowData?.customerName || '',
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
        inspectionDate: formData?.inspectionDate,
        imageRequestDtoList: imageRequestDtoList,
        serviceAreaId: formData?.serviceAreaId?.id,
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
        customerId:
          mooringRowData?.customerId ||
          mooringRowData?.customerResponseDto?.id ||
          formData?.customerName,
        harborOrArea: formData?.harbor ? formData?.harbor : mooringRowData?.harborOrArea,
        gpsCoordinates: gpsCoordinatesValue,
        boatyardId: formData?.boatYardName?.id
          ? formData?.boatYardName?.id
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
        statusId: 3,
        inspectionDate: formData?.inspectionDate,
        imageRequestDtoList: imageRequestDtoList,
        serviceAreaId: formData?.serviceAreaId?.id,
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
          detail: message,
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
    }
  }, [gpsCoordinatesValue])

  return (
    <>
      <Toast ref={toastRef} />

      <div className={isLoading ? 'blurred' : ''}>
        {isEditMooring ? (
          <>
            <div className="flex gap-6 ">
              <div className="">
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1"> Images</div>
                </span>
                <div className="mt-2">
                  <div />
                  <div
                    style={{
                      width: '230px',
                      height: '32px',
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      paddingLeft: '0.5rem',
                      cursor: 'pointer',
                    }}>
                    <div onClick={uploadImages} className="flex gap-3 text-center">
                      <FaFileUpload
                        style={{ fontSize: '22px', color: '#0098FF', marginTop: '3px' }}
                      />
                      <div className="border-r-2 border-blue-100  h-[30px]"></div>
                      <span className="pl-4 mt-1"> Upload Image </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">Harbor/Area&nbsp;&nbsp;</div>
                </span>
                <div className="mt-2">
                  <InputComponent
                    value={formData?.harbor}
                    onChange={(e) => handleInputChange('harbor', e.target.value)}
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
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">G.P.S Coordinates</div>
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
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      paddingLeft: '0.5rem',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">Boatyard Name</div>
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
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                    }}
                  />
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
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      paddingLeft: '0.5rem',
                    }}
                  />
                </div>
              </div>
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">Boat Size (in feet)</div>
                </span>
                <div className="mt-2">
                  <InputComponent
                    type="number"
                    value={formData?.boatSize}
                    onChange={(e) => handleInputChange('boatSize', e.target.value)}
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
                    zIndex: 4,
                  }}
                  strokeWidth="4"
                />
              )}

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
                    type="text"
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

            <div className="flex gap-6 mt-3">
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
                    onChange={(e) => handleInputChange('topChainDate', formatDate(e.target.value))}
                    dateFormat="mm/dd/yy"
                    style={{
                      width: '230px',
                      height: '32px',
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      padding: '0.5rem',
                    }}
                  />
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
                    type="text"
                    onChange={(e) => handleInputChange('depthAtMeanHighWater', e.target.value)}
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
              <div>
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

            <div className=" gap-6 mt-3 mb-16">
              <div className="flex gap-6">
                <div>
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
                      style={{
                        width: '230px',
                        height: '32px',
                        border: '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        padding: '0.5rem',
                      }}
                    />
                  </div>
                </div>
                <div className="">
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
                        border: '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        paddingLeft: '0.5rem',
                      }}
                    />
                  </div>
                </div>
                <div className="">
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
                <div className="mt-3">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">
                        Condition of Eye <span style={{ fontSize: '0.6rem' }}> (install date)</span>
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
                        border: '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        padding: '0.5rem',
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Inspection Date</div>
                    </span>
                  </div>

                  <div className="mt-2">
                    <Calendar
                      value={parseDate(formData.inspectionDate)}
                      onChange={(e) =>
                        handleInputChange('inspectionDate', formatDate(e.target.value))
                      }
                      dateFormat="mm/dd/yy"
                      style={{
                        width: '230px',
                        height: '32px',
                        border: '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        padding: '0.5rem',
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Service Area</div>
                    </span>
                  </div>
                  <div className="mt-2">
                    <Dropdown
                      value={formData?.serviceAreaId}
                      onChange={(e) => handleInputChange('serviceAreaId', e.value)}
                      options={serviceArea}
                      optionLabel="serviceAreaName"
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
                        <div className="flex gap-1">Shackle, Swivel Condition</div>
                      </span>
                    </div>

                    <div className="mt-3">
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
                        type="text"
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
                    className="mt-2"
                    style={{
                      height: '300px',
                      width: '480px',
                      overflow: 'hidden',
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
          </>
        ) : (
          <>
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

              <div className="">
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1"> Images</div>
                </span>
                <div className="mt-2">
                  <div />
                  <div
                    style={{
                      width: '230px',
                      height: '32px',
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      paddingLeft: '0.5rem',
                      cursor: 'pointer',
                    }}>
                    <div onClick={uploadImages} className="flex gap-3 text-center">
                      <FaFileUpload
                        style={{ fontSize: '22px', color: '#0098FF', marginTop: '3px' }}
                      />
                      <div className="border-r-2 border-blue-100  h-[30px]"></div>
                      <span className="pl-4 mt-1"> Upload Image </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">Harbor/Area&nbsp;&nbsp;</div>
                </span>
                <div className="mt-2">
                  <InputComponent
                    value={formData?.harbor}
                    onChange={(e) => handleInputChange('harbor', e.target.value)}
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
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">G.P.S Coordinates</div>
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
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      paddingLeft: '0.5rem',
                    }}
                  />
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
                    options={boatyardsName}
                    optionLabel="boatyardName"
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
                    zIndex: 4,
                  }}
                  strokeWidth="4"
                />
              )}
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
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      paddingLeft: '0.5rem',
                    }}
                  />
                </div>
              </div>
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">Boat Size (in feet)</div>
                </span>
                <div className="mt-2">
                  <InputComponent
                    type="number"
                    value={formData?.boatSize}
                    onChange={(e) => handleInputChange('boatSize', e.target.value)}
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
                    type="text"
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

            <div className="flex gap-6 mt-3">
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
                    onChange={(e) => handleInputChange('topChainDate', formatDate(e.target.value))}
                    dateFormat="mm/dd/yy"
                    style={{
                      width: '230px',
                      height: '32px',
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      padding: '0.5rem',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" gap-6 mt-3 mb-16">
              <div className="flex gap-6">
                <div className="">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Depth at Mean High Water</div>
                    </span>
                  </div>

                  <div className="mt-2">
                    <InputText
                      value={formData?.depthAtMeanHighWater}
                      type="text"
                      onChange={(e) => handleInputChange('depthAtMeanHighWater', e.target.value)}
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
                <div>
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
                <div>
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
                      style={{
                        width: '230px',
                        height: '32px',
                        border: '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        padding: '0.5rem',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
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
                        border: '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        paddingLeft: '0.5rem',
                      }}
                    />
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

                <div className="mt-3">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">
                        Condition of Eye <span style={{ fontSize: '0.6rem' }}> (install date)</span>
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
                        border: '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        padding: '0.5rem',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="mt-3">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Inspection Date</div>
                    </span>
                  </div>

                  <div className="mt-2">
                    <Calendar
                      value={parseDate(formData.inspectionDate)}
                      onChange={(e) =>
                        handleInputChange('inspectionDate', formatDate(e.target.value))
                      }
                      dateFormat="mm/dd/yy"
                      style={{
                        width: '230px',
                        height: '32px',
                        border: '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.8rem',
                        padding: '0.5rem',
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Service Area</div>
                    </span>
                  </div>
                  <div className="mt-2">
                    <Dropdown
                      value={formData?.serviceAreaId}
                      onChange={(e) => handleInputChange('serviceAreaId', e.value)}
                      options={serviceArea}
                      optionLabel="serviceAreaName"
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

                <div className="mt-3">
                  <div>
                    <span className="font-medium text-sm text-[#000000]">
                      <div className="flex gap-1">Shackle, Swivel Condition</div>
                    </span>
                  </div>
                  <div className="mt-3">
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
                        type="text"
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
                    className="mt-2"
                    style={{
                      height: '300px',
                      width: '480px',
                      overflow: 'hidden',
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
          </>
        )}
      </div>
      <>
        <div
          className={`"flex gap-6 bottom-2 absolute left-6" ${isLoading ? 'blurred' : ''}`}
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
          header={'Images'}>
          <div className={`ml-4 ${isLoading ? 'blurred' : ''}`}>
            <div className="flex justify-between">
              <div className="mt-6">
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
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
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
                </label>
              </div>
              <div className="">
                <div className=" font-medium text-sm text-[#000000]">Note</div>
                <div className="mt-1">
                  <InputComponent
                    value={formData.ImageNote}
                    onChange={(e) => handleInputChange('ImageNote', e.target.value)}
                    style={{
                      width: '370px',
                      height: '40px',
                      border: '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      boxShadow: 'none',
                      paddingLeft: '0.5rem',
                      color: 'black',
                      resize: 'none',
                    }}
                  />
                  {/* <p>{fieldErrors.note && <small className="p-error">{fieldErrors.note}</small>}</p> */}
                </div>
              </div>
            </div>
          </div>

          <div
            //  style={{border:"1px solid red"}}

            style={{ marginTop: '40px', marginLeft: '40px' }}>
            {mooringImages.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-16 flex-wrap">
                  {mooringImages.map((image, index) => (
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
      </>
    </>
  )
}

export default AddMoorings
