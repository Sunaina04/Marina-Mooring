import InputComponent from '../../CommonComponent/InputComponent'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import {
  useAddBoatyardsMutation,
  useUpdateBoatyardsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { BoatYardProps } from '../../../Type/ComponentBasedType'
import { Country, State } from '../../../Type/CommonType'
import { BoatYardResponse, ErrorResponse } from '../../../Type/ApiTypes'
import CustomSelectPositionMap from '../../Map/CustomSelectPositionMap'
import { CountriesData, StatesData } from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { ProgressSpinner } from 'primereact/progressspinner'
import { LatLngExpression } from 'leaflet'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'

const AddBoatyards: React.FC<BoatYardProps> = ({
  closeModal,
  boatYardData,
  setModalVisible,
  customerData,
  editMode,
  toastRef,
}) => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [boatyardId, setBoatyardId] = useState('')
  const [boatyardName, setBoatyardName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [aptSuite, setAptSuite] = useState('')
  const [state, setState] = useState<State>()
  const [country, setCountry] = useState<Country>()
  const [zipCode, setZipCode] = useState('')

  const [mainContact, setMainContact] = useState('')
  const [center, setCenter] = useState<LatLngExpression | undefined>([30.6983149, 76.656095])
  const [gpsCoordinatesValue, setGpsCoordinatesValue] = useState<string>()
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [addBoatyard] = useAddBoatyardsMutation()
  const [updateBoatyard] = useUpdateBoatyardsMutation()
  const { getStatesData } = StatesData()
  const { getCountriesData } = CountriesData()

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    const nameRegex = /^[a-zA-Z ]+$/
    const zipCodeRegex = /^\d+$/
    const errors: { [key: string]: string } = {}

    if (!boatyardName) {
      errors.name = 'Boatyard Name is required'
    } else if (!nameRegex.test(boatyardName)) {
      errors.name = 'Name must only contain letters'
    }
    if (!boatyardId) errors.id = 'Boatyard ID is required'
    if (!phone) {
      errors.phone = 'Phone is required'
    } else if (!phoneRegex.test(phone)) {
      errors.phone = 'Phone must be a 10-digit number'
    }

    if (!emailAddress) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(emailAddress)) {
      errors.email = 'Please enter a valid email format'
    }

    if (!gpsCoordinatesValue) {
      errors.gpsCoordinatesValue = 'GPS Coordinates is required'
    }
    if (!address) errors.address = 'Street/house is required'
    if (!zipCode) {
      errors.zipCode = 'Zipcode is required'
    } else if (!zipCodeRegex.test(zipCode)) {
      errors.zipCode = 'Zipcode contain only numbers'
    }
    if (!mainContact) errors.mainContact = 'Main contact is required'
    if (!country) errors.country = 'Country  is required'
    if (!state) errors.state = 'State  is required'
    if (!aptSuite) errors.aptSuite = 'Apt/Suite is required'
    return errors
  }

  const handlePositionChange = (lat: number, lng: number) => {
    setCenter([lat, lng])
    const formattedLat = lat.toFixed(3)
    const formattedLng = lng.toFixed(3)
    const concatenatedValue = `${formattedLat} ${formattedLng}`
    setGpsCoordinatesValue(concatenatedValue)
  }

  const handleEditMode = () => {
    if (editMode && customerData) {
      setBoatyardId(customerData?.boatyardId || '')
      setBoatyardName(customerData?.boatyardName || '')
      setPhone(customerData?.phone || '')
      setEmailAddress(customerData?.emailAddress || '')
      setAddress(customerData?.street || '')
      setAptSuite(customerData?.apt || '')
      setZipCode(customerData?.zipCode || '')
      setState(customerData?.stateResponseDto?.name || undefined)
      setMainContact(customerData?.mainContact || '')
      setCountry(customerData?.countryResponseDto?.name || undefined)
      setGpsCoordinatesValue(customerData?.gpsCoordinates || '')
      setState(customerData?.stateResponseDto?.name || undefined)
    }
  }

  const saveBoatyards = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors)
      return
    }
    setIsLoading(true)

    try {
      const payload = {
        boatyardId: boatyardId,
        boatyardName: boatyardName,
        phone: phone,
        emailAddress: emailAddress,
        street: address,
        apt: aptSuite,
        zipCode: zipCode,
        contact: mainContact,
        stateId: state?.id,
        countryId: country?.id,
        mainContact: mainContact,
        gpsCoordinates: gpsCoordinatesValue,
        customerOwnerId: selectedCustomerId,
      }
      const response = await addBoatyard(payload).unwrap()
      const { status, message } = response as BoatYardResponse

      if (status === 200 || status === 201) {
        closeModal()
        boatYardData()
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Boatyard Saved successfully',
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

  const updateBoatyards = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors)
      return
    }
    setIsLoading(true)

    try {
      const editBoatYardPayload = {
        boatyardId: boatyardId,
        boatyardName: boatyardName,
        phone: phone,
        emailAddress: emailAddress,
        street: address,
        apt: aptSuite,
        zipCode: zipCode,
        contact: mainContact,
        stateId: state?.id ? state?.id : customerData?.stateResponseDto?.id,
        countryId: country?.id ? country?.id : customerData?.countryResponseDto?.id,
        mainContact: mainContact,
        gpsCoordinates: gpsCoordinatesValue,
        customerOwnerId: selectedCustomerId,
      }
      const response = await updateBoatyard({
        payload: editBoatYardPayload,
        id: customerData?.id,
      }).unwrap()
      const { status, message } = response as BoatYardResponse

      if (status === 200 || status === 201) {
        closeModal()
        boatYardData()
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Boatyard Updated successfully',
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
      updateBoatyards()
    } else {
      saveBoatyards()
    }
  }

  const handleBack = () => {
    setModalVisible(false)
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { statesData } = await getStatesData()
    const { countriesData } = await getCountriesData()

    if (countriesData !== null) {
      setCountriesData(countriesData)
    }

    if (statesData !== null) {
      setStatesData(statesData)
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

  return (
    <>
      <div className=" ml-4">
        <div className="flex gap-6  ">
          <div>
            <span className="font-medium text-sm text-[#000000]">
              Boatyard ID <span className="text-red-500">*</span>
            </span>
            <div className="mt-1">
              <InputComponent
                value={boatyardId}
                onChange={(e) => {
                  setBoatyardId(e.target.value)
                  setErrorMessage((prev) => ({ ...prev, id: '' }))
                }}
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.id ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
            <p>{errorMessage.id && <small className="p-error">{errorMessage.id}</small>}</p>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">
              Boatyard Name <span className="text-red-500">*</span>
            </span>
            <div className="mt-1">
              <InputComponent
                value={boatyardName}
                onChange={(e) => {
                  setBoatyardName(e.target.value)
                  setErrorMessage((prev) => ({ ...prev, name: '' }))
                }}
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.name ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
            <p>{errorMessage.name && <small className="p-error">{errorMessage.name}</small>}</p>
          </div>
        </div>

        <div className="flex  gap-6 mt-4">
          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">
                Email Address <span className="text-red-500">*</span>
              </span>
            </div>

            <div className="mt-1">
              <InputComponent
                value={emailAddress}
                onChange={(e) => {
                  setEmailAddress(e.target.value)
                  setErrorMessage((prev) => ({ ...prev, email: '' }))
                }}
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.email ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
            <p>{errorMessage.email && <small className="p-error">{errorMessage.email}</small>}</p>
          </div>

          <div>
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">
                  Phone <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="mt-1">
                <InputComponent
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    setErrorMessage((prev) => ({ ...prev, phone: '' }))
                  }}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: errorMessage.phone ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '1.2em',
                  }}
                />
              </div>
            </div>
            <p>{errorMessage.phone && <small className="p-error">{errorMessage.phone}</small>}</p>
          </div>
        </div>

        {isLoading && (
          <ProgressSpinner
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '50px',
            }}
            strokeWidth="4"
          />
        )}

        <div className="mt-3">
          <span className="font-medium text-sm text-[#000000]">
            Address <span className="text-red-500">*</span>
          </span>
        </div>
        <div className="flex gap-6 mt-1">
          <div>
            <div className="">
              <InputComponent
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                  setErrorMessage((prev) => ({ ...prev, address: '' }))
                }}
                placeholder="Street/house"
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.address ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>

            <p>
              {errorMessage.address && <small className="p-error">{errorMessage.address}</small>}
            </p>
          </div>

          <div className="">
            <InputComponent
              value={aptSuite}
              placeholder="Apt/Suite"
              onChange={(e) => {
                setAptSuite(e.target.value)
                setErrorMessage((prev) => ({ ...prev, aptSuite: '' }))
              }}
              style={{
                width: '230px',
                height: '32px',
                border: errorMessage.aptSuite ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.8rem',
                padding: '1.2em',
              }}
            />
            <p>
              {errorMessage.aptSuite && <small className="p-error">{errorMessage.aptSuite}</small>}
            </p>
          </div>

          <div className="flex flex-col ">
            <Dropdown
              id="stateDropdown"
              placeholder="State"
              value={state}
              onChange={(e) => {
                setState(e.value)
                setErrorMessage((prev) => ({ ...prev, state: '' }))
              }}
              options={statesData}
              optionLabel="name"
              style={{
                width: '230px',
                height: '32px',
                border: errorMessage.state ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.8rem',
                padding: '4px',
                color: 'black',
              }}
            />

            <p> {errorMessage.state && <small className="p-error">{errorMessage.state}</small>}</p>
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
                  setErrorMessage((prev) => ({ ...prev, country: '' }))
                }}
                placeholder="Country"
                options={countriesData}
                optionLabel="name"
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.country ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '4px',
                }}
              />
            </div>
            <p>
              {errorMessage.country && <small className="p-error">{errorMessage.country}</small>}
            </p>
          </div>

          <div>
            <div>
              <div className="">
                <InputComponent
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value)
                    setErrorMessage((prev) => ({ ...prev, zipCode: '' }))
                  }}
                  placeholder="Zip code"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: errorMessage.zipCode ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '1.2em',
                  }}
                />
              </div>
              <p>
                {errorMessage.zipCode && <small className="p-error">{errorMessage.zipCode}</small>}
              </p>
            </div>
          </div>
          <div>
            <div className="">
              <InputComponent
                value={gpsCoordinatesValue}
                onChange={(e) => {
                  setGpsCoordinatesValue(e.target.value)
                  setErrorMessage((prev) => ({ ...prev, gpsCoordinatesValue: '' }))
                }}
                placeholder="GPS Coordinates"
                style={{
                  width: '230px',
                  height: '32px',
                  border: errorMessage.gpsCoordinatesValue ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>

            <p>
              {errorMessage.gpsCoordinatesValue && (
                <small className="p-error">{errorMessage.gpsCoordinatesValue}</small>
              )}
            </p>
          </div>
        </div>
        {/* </div> */}

        <div className="flex mt-4 ">
          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">
                Main Contact <span className="text-red-500">*</span>
              </span>
            </div>

            <div>
              <div>
                <div className=" mt-1">
                  <InputComponent
                    value={mainContact}
                    onChange={(e) => {
                      setMainContact(e.target.value)
                      setErrorMessage((prev) => ({ ...prev, mainContact: '' }))
                    }}
                    style={{
                      width: '230px',
                      height: '32px',
                      border: errorMessage.mainContact ? '1px solid red' : '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      padding: '1.2em',
                    }}
                  />
                </div>
                <p>
                  {errorMessage.mainContact && (
                    <small className="p-error">{errorMessage.mainContact}</small>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[150px] p-2 rounded-lg mt-[22px]">
            <CustomSelectPositionMap
              onPositionChange={handlePositionChange}
              zoomLevel={50}
              center={center}
              setCenter={setCenter}
            />
          </div>
        </div>

        <div className="flex gap-4 ml-4 bottom-5 absolute left-6">
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
      </div>
    </>
  )
}

export default AddBoatyards
