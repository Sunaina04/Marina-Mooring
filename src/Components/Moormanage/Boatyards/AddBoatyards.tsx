import InputComponent from '../../CommonComponent/InputComponent'
import { useState, useEffect, useCallback } from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import CustomStateMap from '../../Map/CustomSelectPositionMap'
import { useAddBoatyardsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { BoatYardProps } from '../../../Type/ComponentBasedType'
import useMetaData from '../../CommonComponent/MetaDataComponent/RolesData'
import { Country, State } from '../../../Type/CommonType'
import { BoatYardResponse } from '../../../Type/ApiTypes'
import { InputText } from 'primereact/inputtext'
import CustomSelectPositionMap from '../../Map/CustomSelectPositionMap'
import RolesData from '../../CommonComponent/MetaDataComponent/RolesData'
import StatesData from '../../CommonComponent/MetaDataComponent/StatesData'
import CountriesData from '../../CommonComponent/MetaDataComponent/CountriesData'

const AddBoatyards: React.FC<BoatYardProps> = ({ closeModal, boatYardData, gpsCoordinates }) => {
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
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()
  const [gpsCoordinatesValue, setGpsCoordinatesValue] = useState<string>()
  const [addBoatyard] = useAddBoatyardsMutation()
  const { getStatesData } = StatesData()
  const { getCountriesData } = CountriesData()
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({})

  const style = {
    width: '13vw',
    height: '4vh',
    border: '1px solid gray',
    borderRadius: '0.50rem',
    fontSize: '0.80vw',
  }

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    const nameRegex = /^[a-zA-Z ]+$/
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

    if (!address) errors.address = 'Street/house is required'

    if (!zipCode) errors.zipCode = 'Zip code is required'
    if (!gpsCoordinatesValue) errors.gpsCoordinatesValue = 'GPS Coordinates is required'

    if (!mainContact) errors.mainContact = 'Main contact is required'
    if (!country) errors.country = 'Country  is required'
    if (!state) errors.state = 'State  is required'
    if (!aptSuite) errors.aptSuite = 'Apt/Suite is required'
    return errors
  }

  const handlePositionChange = (lat: number, lng: number) => {
    setLatitude(lat)
    setLongitude(lng)
    const formattedLat = lat.toFixed(3)
    const formattedLng = lng.toFixed(3)
    const concatenatedValue = `${formattedLat} ${formattedLng}`
    setGpsCoordinatesValue(concatenatedValue)
  }

  const handleSave = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors)
      return
    }

    // const selectedState = statesData?.find((stateItem) => stateItem.id === state)
    // const selectedCountry = countriesData?.find((countryItem) => countryItem.id === country)

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
    }
    console.log(payload)
    const response = await addBoatyard(payload).unwrap()
    const { status } = response as BoatYardResponse
    if (status === 200 || status === 201) {
      closeModal()
      boatYardData()
    }
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
                onChange={(e) => setBoatyardId(e.target.value)}
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
            <p>{errorMessage.id && <small className="p-error">{errorMessage.id}</small>}</p>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">
              Boatyard Name <span className="text-red-500">*</span>
            </span>
            <div className="mt-1">
              <InputComponent
                value={boatyardName}
                onChange={(e) => setBoatyardName(e.target.value)}
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
                onChange={(e) => setEmailAddress(e.target.value)}
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
                  onChange={(e) => setPhone(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
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
              onChange={(e) => setAptSuite(e.target.value)}
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
              onChange={(e) => setState(e.target.value)}
              options={statesData}
              optionLabel="name"
              style={{
                width: '230px',
                height: '32px',
                border: errorMessage.state ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.8rem',
                padding: '4px',
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
                onChange={(e) => setCountry(e.target.value)}
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
                  onChange={(e) => setZipCode(e.target.value)}
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
                onChange={(e) => setGpsCoordinatesValue(e.target.value)}
                placeholder="GPS Coordinates"
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
                    onChange={(e) => setMainContact(e.target.value)}
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
            <CustomSelectPositionMap onPositionChange={handlePositionChange} zoomLevel={50} />
          </div>
        </div>

        <div className="flex gap-6">
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
          <Button label={'Back'} text={true} />
        </div>
      </div>
    </>
  )
}

export default AddBoatyards
