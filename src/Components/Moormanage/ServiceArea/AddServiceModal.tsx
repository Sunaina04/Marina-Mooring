import InputComponent from '../../CommonComponent/InputComponent'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import {
  useUpdateServiceAreaMutation,
  useAddServiceAreaMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { ServiceAreaProps } from '../../../Type/ComponentBasedType'
import { Country, ServiceAreaType, State } from '../../../Type/CommonType'
import { ErrorResponse, ServiceAreaResponse } from '../../../Type/ApiTypes'
import CustomSelectPositionMap from '../../Map/CustomSelectPositionMap'
import {
  CountriesData,
  ServiceAreaTypeData,
  StatesData,
} from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { Toast } from 'primereact/toast'

const AddServiceModal: React.FC<ServiceAreaProps> = ({
  closeModal,
  serviceAreaData,
  setModalVisible,
  customerData,
  editMode,
}) => {
  const [serviceAreaName, setServiceAreaName] = useState('')
  const [id, setId] = useState('')
  const [serviceAreaTypeId, setServiceAreaTypeId] = useState<any>()
  const [streetHouse, setStreetHouse] = useState('')
  const [notes, setNotes] = useState('')
  const [address, setAddress] = useState('')
  const [aptSuite, setAptSuite] = useState('')
  const [selectedState, setSelectedState] = useState<any>()
  const [selectedType, setSelectedType] = useState<any>()
  const [country, setCountry] = useState<Country>()
  const [zipCode, setZipCode] = useState('')

  const [mainContact, setMainContact] = useState('')
  const [gpsCoordinatesValue, setGpsCoordinatesValue] = useState<any>()
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()
  const [serviceAreaTypeData, setServiceAreaTypeData] = useState<ServiceAreaType[]>()
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({})
  const toastRef = useRef<Toast>(null)
  const [storage, setStorage] = useState('')
  const [storageList, setStorageList] = useState<string[]>([])
  const getFormattedCoordinate = (coordinates: any) => {
    try {
      let [lat, long] = coordinates.split(/[ ,]+/)

      const convertToDecimal = (coordinate: any) => {
        if (coordinate.split('.').length > 2) {
          const [degree, minute, second] = coordinate.split('.').map((num: any) => parseFloat(num))
          return degree + minute / 60 + second / 3600
        }
        return parseFloat(coordinate)
      }

      lat = convertToDecimal(lat)
      long = convertToDecimal(long)

      if (!isNaN(lat) && !isNaN(long)) {
        return [lat, long]
      } else {
        throw new Error('Parsed coordinates are NaN')
      }
    } catch (error) {
      console.error('Error In Setting Center:', error)
      return [41.56725, 70.94045]
    }
  }

  const [center, setCenter] = useState<any>(
    customerData?.gpsCoordinates || gpsCoordinatesValue
      ? getFormattedCoordinate(customerData?.gpsCoordinates || gpsCoordinatesValue)
      : [41.56725, 70.94045],
  )
  const [isLoading, setIsLoading] = useState(true)
  const [addServiceArea] = useAddServiceAreaMutation()
  const [updateServiceArea] = useUpdateServiceAreaMutation()
  const { getStatesData } = StatesData()
  const { getServiceAreaTypeData } = ServiceAreaTypeData()
  const { getCountriesData } = CountriesData()

  const validateFields = () => {
    const nameRegex = /^[a-zA-Z ]+$/
    const errors: { [key: string]: string } = {}

    if (!serviceAreaName) {
      errors.name = 'Service Area Name is required'
    } else if (!nameRegex.test(serviceAreaName)) {
      errors.name = 'Name must only contain letters'
    }

    return errors
  }

  const handleGpsCoordinatesChange = (e: any) => {
    const value = e.target.value
    setGpsCoordinatesValue(value)
    setErrorMessage((prev) => ({ ...prev, gpsCoordinatesValue: '' }))
  }

  const handlePositionChange = (lat: number, lng: number) => {
    setCenter([lat, lng])
    const formattedLat = lat.toFixed(3)
    const formattedLng = lng.toFixed(3)
    const concatenatedValue = `${formattedLat} ${formattedLng}`
    setGpsCoordinatesValue(concatenatedValue)
  }

  const handleEditMode = () => {
    setId(customerData?.Id || '')
    setServiceAreaName(customerData?.serviceAreaName || '')
    setServiceAreaTypeId(customerData?.serviceAreaTypeDto?.type || '')
    setAddress(customerData?.streetHouse || '')
    setAptSuite(customerData?.aptSuite || '')
    setZipCode(customerData?.zipCode || '')
    setSelectedState(customerData?.stateResponseDto?.name || '')
    setNotes(customerData?.notes || '')
    setCountry(customerData?.countryResponseDto?.name || '')
    setGpsCoordinatesValue(customerData?.gpsCoordinates || '')
  }

  const saveServiceArea = async () => {
    const errors = validateFields()

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors)
      return
    }
    setIsLoading(true)

    try {
      const Payload = {
        id: id,
        serviceAreaName: serviceAreaName,
        serviceAreaTypeId: serviceAreaTypeId.id,
        streetHouse: address,
        aptSuite: aptSuite,
        stateId: selectedState?.id,
        countryId: country?.id,
        notes: notes,
        gpsCoordinates: gpsCoordinatesValue,
      }
      const response = await addServiceArea(Payload).unwrap()
      const { status, message } = response as ServiceAreaResponse

      if (status === 200 || status === 201) {
        closeModal()
        serviceAreaData()
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Service Area Saved successfully',
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

  const updateService = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors)
      return
    }
    setIsLoading(true)

    try {
      setIsLoading(true)
      const editServiceAreaPayload = {
        id: id,
        serviceAreaName: serviceAreaName,
        serviceAreaTypeId: serviceAreaTypeId.id,
        streetHouse: address,
        aptSuite: aptSuite,
        stateId: selectedState?.id,
        countryId: country?.id,
        notes: notes,
        gpsCoordinates: gpsCoordinatesValue,
      }
      const response = await updateServiceArea({
        payload: editServiceAreaPayload,
        id: customerData?.id,
      }).unwrap()
      const { status, message } = response as ServiceAreaResponse

      if (status === 200 || status === 201) {
        setIsLoading(false)
        closeModal()
        serviceAreaData()
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Service Area Updated successfully',
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

  const handleSave = () => {
    if (editMode) {
      updateService()
    } else {
      saveServiceArea()
    }
  }

  const handleBack = () => {
    setModalVisible(false)
  }
  const handleAddStorage = () => {
    setStorageList([...storageList, storage])
    setStorage('')
  }

  const handleDeleteStorage = (index: number) => {
    const newList = storageList.filter((_, i) => i !== index)
    setStorageList(newList)
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { statesData } = await getStatesData()
    const { countriesData } = await getCountriesData()
    const { ServiceAreaTypeData } = await getServiceAreaTypeData()
    if (countriesData !== null) {
      setIsLoading(false)
      setCountriesData(countriesData)
    }

    if (statesData !== null) {
      setIsLoading(false)
      setStatesData(statesData)
    }

    if (ServiceAreaTypeData !== null) {
      setIsLoading(false)
      setServiceAreaTypeData(ServiceAreaTypeData)
    }
  }, [])

  useEffect(() => {
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  useEffect(() => {
    if (editMode && customerData) {
      handleEditMode()
    }
  }, [editMode, customerData])

  useEffect(() => {
    if (gpsCoordinatesValue) {
      const coordinates = getFormattedCoordinate(gpsCoordinatesValue)
      setCenter(coordinates)
    }
  }, [gpsCoordinatesValue])

  return (
    <>
      <div className={`" ml-4" ${isLoading ? 'blurred' : ''}`}>
        <Toast ref={toastRef} />

        <div className="flex gap-6  ">
          <div>
            <span className="font-medium text-sm text-[#000000]">
              Service Area Name <span className="text-red-500">*</span>
            </span>
            <div className="mt-1">
              <InputComponent
                value={serviceAreaName}
                onChange={(e) => {
                  setServiceAreaName(e.target.value)
                  setErrorMessage((prev) => ({ ...prev, serviceAreaName: '' }))
                }}
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.id ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '0.5rem',
                }}
              />
            </div>
            <p>{errorMessage.id && <small className="p-error">{errorMessage.id}</small>}</p>
          </div>
          <div>
            <span className="font-medium text-sm text-[#000000]">Type</span>

            <div className="flex flex-col ">
              <Dropdown
                id="typeDropdown"
                placeholder="Select"
                editable
                value={serviceAreaTypeId}
                onChange={(e) => {
                  setServiceAreaTypeId(e.target.value)
                }}
                options={serviceAreaTypeData}
                optionLabel="type"
                disabled={isLoading}
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  paddingLeft: '0.5rem',
                  color: 'black',
                  marginTop: '0.3rem',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <span className="font-medium text-sm text-[#000000]">Address</span>
      </div>
      <div className="flex gap-6 mt-1">
        <div>
          <div className="">
            <InputComponent
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
              }}
              placeholder="Street/house"
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
          <InputComponent
            value={aptSuite}
            placeholder="Apt/Suite"
            onChange={(e) => {
              setAptSuite(e.target.value)
            }}
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

        <div className="flex flex-col ">
          <Dropdown
            id="stateDropdown"
            placeholder="State"
            editable
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value)
            }}
            options={statesData}
            optionLabel="name"
            disabled={isLoading}
            style={{
              width: '230px',
              height: '32px',
              border: '1px solid #D5E1EA',
              borderRadius: '0.50rem',
              fontSize: '0.8rem',
              paddingLeft: '0.5rem',
              color: 'black',
            }}
          />
        </div>
      </div>

      <div className="flex  gap-6 mt-4">
        <div>
          <div className="">
            <Dropdown
              id="stateDropdown"
              value={country}
              onChange={(e) => {
                setCountry(e.value)
              }}
              editable
              placeholder="Country"
              options={countriesData}
              optionLabel="name"
              disabled={isLoading}
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
            <div className="">
              <InputComponent
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value)
                }}
                placeholder="Zip code"
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
        <div>
          <div className="">
            <InputComponent
              value={gpsCoordinatesValue}
              onChange={handleGpsCoordinatesChange}
              placeholder="GPS Coordinates"
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

      <div className="flex mt-4 ">
        <div>
          <div>
            <span className="font-medium text-sm text-[#000000]">Notes</span>
          </div>
          <div>
            <div>
              <div className=" mt-1">
                <InputComponent
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value)
                  }}
                  style={{
                    width: '230px',
                    height: '40px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '0.5rem',
                    marginTop: '0.3rem',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[150px] p-2 rounded-lg mt-[22px]">
          <CustomSelectPositionMap
            onPositionChange={handlePositionChange}
            zoomLevel={15}
            center={center}
          />
        </div>
      </div>

      <div className={`"flex gap-4 ml-4 bottom-5 absolute left-6" ${isLoading ? 'blurred' : ''}`}>
        <Button
          label={'Save'}
          onClick={handleSave}
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
          label={'Back'}
          onClick={handleBack}
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
      </div>
    </>
  )
}
export default AddServiceModal
