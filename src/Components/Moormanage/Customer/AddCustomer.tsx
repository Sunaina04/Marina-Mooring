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
import { CityProps, Country, State } from '../../../Type/CommonType'
import {
  bottomChainConditionOptions,
  chainConditionOptions,
  conditionOfEyeOptions,
  mooringTypeOptions,
  pennantConditionOptions,
  shackleSwivelConditionOptions,
  sizeOfWeightOptions,
  typeOfWeightOptions,
} from '../../Utils/CustomData'
import StatesData from '../../CommonComponent/MetaDataComponent/StatesData'
import CountriesData from '../../CommonComponent/MetaDataComponent/CountriesData'
import CustomDisplayPositionMap from '../../Map/CustomDisplayPositionMap'
import { CustomerResponse } from '../../../Type/ApiTypes'

const AddCustomer: React.FC<CustomerDataProps> = ({
  customer,
  editMode,
  closeModal,
  getCustomer,
  toastRef,
}) => {
  const [value, setValue] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<Country>()
  const [selectedState, setSelectedState] = useState<State>()
  const [customerName, setCustomerName] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [streetHouse, setStreetHouse] = useState<string>('')
  const [sectorBlock, setSectorBlock] = useState<string>('')
  const [pinCode, setPinCode] = useState<string>('')
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()

  const { getStatesData } = StatesData()
  const { getCountriesData } = CountriesData()
  const [addCustomer] = useAddCustomerMutation()
  const [updateCustomer] = useUpdateCustomerMutation()
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
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
    deptAtMeanHighWater: 0,
    status: 0,
  })

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    const nameRegex = /^[a-zA-Z ]+$/
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
    if (!selectedState || !selectedState.name) {
      errors.state = 'State is required'
      if (!firstError) firstError = 'state'
    }

    if (!selectedCountry || !selectedCountry.name) {
      errors.country = 'Country is required'
      if (!firstError) firstError = 'country'
    }

    if (!formData.harbor) {
      errors.harbor = 'Harbor is required'
      if (!firstError) firstError = 'harbor'
    }

    if (!formData.mooringNumber) errors.mooringNumber = 'Mooring ID is required'
    if (!formData.harbor) errors.harbor = 'Harbor is required'
    if (!formData.waterDepth) errors.waterDepth = 'Water Depth is required'
    if (!formData.gpsCoordinates) errors.gpsCoordinates = 'GPS Coordinates are required'
    if (!formData.boatyardName) errors.boatyardName = 'Boatyard Name is required'
    if (!formData.boatName) errors.boatName = 'Boat Name is required'
    if (!formData.boatSize) errors.boatSize = 'Boat Size is required'
    if (!formData.type) errors.type = 'Type is required'
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
      state: selectedState?.id,
      country: selectedCountry?.id,
      zipCode: pinCode,
      mooringRequestDto: {
        mooringId: formData.mooringId,
        customerName: formData.customerName,
        harbor: formData.harbor,
        waterDepth: formData.waterDepth,
        gpsCoordinates: formData.gpsCoordinates,
        boatyardName: formData.boatyardName,
        boatName: formData.boatName,
        boatSize: formData.boatSize,
        boatType: formData.boatType,
        boatWeight: formData.boatWeight,
        sizeOfWeight: formData.sizeOfWeight.name,
        typeOfWeight: formData.typeOfWeight.name,
        conditionOfEye: formData.conditionEye,
        topChainCondition: formData.topChainCondition.name,
        bottomChainCondition: formData.bottomChainCondition.name,
        shackleSwivelCondition: formData.shackleSwivelCondition.name,
        pennantCondition: formData.pennantCondition.name,
        deptAtMeanHighWater: formData.deptAtMeanHighWater,
        statusId: 1,
      },
    }
    const response = await addCustomer(payload).unwrap()
    const { status } = response as CustomerResponse
    if (status === 200 || status === 201) {
      closeModal()
      getCustomer()
      toastRef?.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Customer Saved successfully',
        life: 3000,
      })
    }
  }

  const UpdateCustomer = async () => {
    const payload = {
      customerName,
      customerId,
      phone,
      emailAddress: email,
      streetHouse,
      sectorBlock,
      state: selectedState?.name || '',
      country: selectedCountry?.name || '',
      pinCode,
      note: value,
    }
    const response = await updateCustomer(payload)
    closeModal()
    getCustomer()
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
      setValue(customer.note || '')
      setCustomerName(customer.customerName || '')
      setCustomerId(customer.customerId || '')
      setPhone(customer.phone || '')
      setEmail(customer.emailAddress || '')
      setStreetHouse(customer.streetHouse || '')
      setSectorBlock(customer.sectorBlock || '')
      setPinCode(customer.pinCode || '')
    }
  }, [editMode, customer])

  const handleInputChange = (field: string, value: any) => {
    const parsedValue = ['deptAtMeanHighWater', 'status'].includes(field)
      ? parseInt(value, 10)
      : value

    setFormData({
      ...formData,
      [field]: parsedValue,
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

  return (
    <div className="">
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
              <InputComponent
                value={customerId}
                onChange={(e) => handleInputChangeCustomer('customerId', e.target.value)}
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
              {fieldErrors.mooringNumber && (
                <small className="p-error">{fieldErrors.mooringNumber}</small>
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
              {fieldErrors.gpsCoordinates && (
                <small className="p-error">{fieldErrors.gpsCoordinates}</small>
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
              <InputComponent
                value={formData.boatyardName}
                onChange={(e) => handleInputChange('boatyardName', e.target.value)}
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
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.value)}
                options={mooringTypeOptions}
                optionLabel="name"
                editable
                placeholder="Skiff"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.type ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              {fieldErrors.type && <small className="p-error">{fieldErrors.type}</small>}
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
                options={sizeOfWeightOptions}
                optionLabel="name"
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
                options={typeOfWeightOptions}
                optionLabel="name"
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
                options={chainConditionOptions}
                optionLabel="name"
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
                  options={conditionOfEyeOptions}
                  optionLabel="name"
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
                  options={shackleSwivelConditionOptions}
                  optionLabel="name"
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
                  options={bottomChainConditionOptions}
                  optionLabel="name"
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
                  options={pennantConditionOptions}
                  optionLabel="name"
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

              {/* <div className="mt-3">
                <div>
                  <span className="font-medium text-sm text-[#000000]">
                    <div className="flex gap-1">
                      Status
                      <p className="text-red-600">*</p>
                    </div>
                  </span>
                </div>

                <div className="mt-2">
                  <InputText
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    style={{
                      width: '230px',
                      height: '32px',
                      border: fieldErrors.status ? '1px solid red' : '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                    }}
                  />
                  <p>
                    {fieldErrors.status && <small className="p-error">{fieldErrors.status}</small>}
                  </p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="mt-3">
            <div>
              <span className="font-medium text-sm text-[#000000]">Pin on Map</span>
            </div>
            <div
              style={{
                flexShrink: 2,

                borderRadius: '10px',
                padding: '0px',
                height: '160px',
                width: '230px',
                gap: '0px',

                opacity: '0px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
              }}>
              <CustomDisplayPositionMap position={[78.965768, 79.8097687]} />
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
