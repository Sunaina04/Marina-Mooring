import React, { useCallback, useEffect, useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import {
  useAddCustomerMutation,
  useUpdateCustomerMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { CustomerDataProps } from '../../../Type/ComponentBasedType'
import { CityProps, Country, State } from '../../../Type/CommonType'
import AddMoorings from '../Moorings/AddMoorings'
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

const AddCustomer: React.FC<CustomerDataProps> = ({
  customer,
  editMode,
  closeModal,
  getCustomer,
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

  const cities: CityProps[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
    { name: 'India', code: 'IND' },
    { name: 'Punjab', code: 'PNB' },
  ]
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
    status: '',
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
      errors.sectorBlock = 'Sector/Block is required'
      if (!firstError) firstError = 'sectorBlock'
    }

    if (!pinCode) {
      errors.pinCode = 'Pin code is required'
      if (!firstError) firstError = 'pinCode'
    }

    // if (!selectedCity) {
    //   errors.selectedCity = 'City is required'
    //   if (!firstError) firstError = 'selectedCity'
    // }

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
      state: selectedState?.name,
      country: pinCode,
      mooringRequestDto: {
        mooringId: formData.mooringId,
        mooringName: formData.mooringName,
        customerName: formData.customerName,
        harbor: formData.harbor,
        waterDepth: formData.waterDepth,
        gpsCoordinates: formData.gpsCoordinates,
        boatyardName: formData.boatyardName,
        boatName: formData.boatName,
        boatSize: formData.boatSize,
        boatType: formData.boatType,
        boatWeight: formData.boatWeight,
        sizeOfWeight: formData.sizeOfWeight,
        typeOfWeight: formData.typeOfWeight,
        conditionOfEye: formData.conditionEye.id,
        topChainCondition: formData.topChainCondition,
        bottomChainCondition: formData.bottomChainCondition,
        shackleSwivelCondition: formData.shackleSwivelCondition,
        pennantCondition: formData.pennantCondition,
        depthAtMeanHighWater: formData.depthAtMeanHighWater,
        status: formData.status,
      },
    }
    const response = await addCustomer(payload)
    closeModal()
    getCustomer()
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

  const handleInputChangeS = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleInputChange = (fieldName: string, value: any) => {
    switch (fieldName) {
      case 'customerName':
        setCustomerName(value)
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
      default:
        setFormData({ ...formData, [fieldName]: value })
        break
    }
    setFieldErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }))
  }

  return (
    <div>
      <div className="flex gap-6">
        <div>
          <div>
            <span className="font-medium text-sm text-[#000000]">Customer Name</span>
            <div className="mt-2">
              <InputComponent
                value={customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
              <p className="" id="name">
                {fieldErrors.customerName && (
                  <small className="p-error">{fieldErrors.customerName}</small>
                )}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">Email Address</span>
              </div>
              <div className="mt-2">
                <InputText
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('email', e.target.value)
                  }
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
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
            <span className="font-medium text-sm text-[#000000]">Customer ID</span>
            <div className="mt-2">
              <InputComponent
                value={customerId}
                onChange={(e) => handleInputChange('customerId', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
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
            <span className="font-medium text-sm text-[#000000]">Phone</span>
            <div className="mt-2">
              <InputComponent
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('phone', e.target.value)
                }
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
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
          <h1 className="font-medium text-sm text-[#000000]">Address</h1>
        </div>
        <div className="flex gap-6 mt-5 ">
          <div>
            <div>
              <InputText
                value={streetHouse}
                onChange={(e) => handleInputChange('streetHouse', e.target.value)}
                placeholder="Street/house"
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
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
                value={sectorBlock}
                onChange={(e) => handleInputChange('AptSuite', e.target.value)}
                placeholder="Apt/Suite"
                type="text"
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  color: 'black',
                  fontSize: '0.8rem',
                }}
              />
              <p className="" id="AptSuite">
                {fieldErrors.AptSuite && <small className="p-error">{fieldErrors.AptSuite}</small>}
              </p>
            </div>
          </div>
          <div>
            <Dropdown
              value={selectedState}
              options={statesData}
              // onChange={(e: DropdownChangeEvent) => setSelectedState("selectedState",e.value)}
              onChange={(e: DropdownChangeEvent) => handleInputChange('selectedState', e.value)}
              optionLabel="name"
              editable
              placeholder="State"
              style={{
                width: '230px',
                height: '32px',
                border: '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                color: 'black',
                fontSize: '0.8rem',
              }}
            />

            <p className="" id="selectedState">
              {fieldErrors.AptSuite && <small className="p-error">{fieldErrors.AptSuite}</small>}
            </p>
          </div>
        </div>
        <div className="flex mt-5 gap-6">
          <div>
            <Dropdown
              value={selectedCountry}
              onChange={(e: DropdownChangeEvent) => setSelectedCountry(e.value)}
              options={countriesData}
              optionLabel="name"
              editable
              placeholder="Country"
              className=""
              style={{
                width: '230px',
                height: '32px',
                border: '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.8rem',
              }}
            />
          </div>
          <div>
            <InputText
              value={pinCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPinCode(e.target.value)}
              placeholder="Zipcode"
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
      <div className="mt-8 text-xl text-black font-bold">
        <h3>Add Mooring</h3>
      </div>

      <div className="mt-6">
        <div className="flex gap-6 ">
          <div>
            <span className="font-medium text-sm text-[#000000]">Mooring ID</span>
            <div className="mt-2">
              <InputComponent
                value={formData.mooringNumber}
                onChange={(e) => handleInputChange('mooringNumber', e.target.value)}
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
            <span className="font-medium text-sm text-[#000000]">Harbor</span>
            <div className="mt-2">
              <InputComponent
                value={formData.harbor}
                onChange={(e) => handleInputChange('harbor', e.target.value)}
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
            <span className="font-medium text-sm text-[#000000]">Water Depth</span>
            <div className="mt-2">
              <InputComponent
                value={formData.waterDepth}
                onChange={(e) => handleInputChange('waterDepth', e.target.value)}
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
            <span className="font-medium text-sm text-[#000000]">G.P.S Coordinates</span>
            <div className="mt-2">
              <InputComponent
                value={formData.gpsCoordinates}
                onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
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
            <span className="font-medium text-sm text-[#000000]">Boatyard Name</span>
            <div className="mt-2">
              <InputComponent
                value={formData.boatyardName}
                onChange={(e) => handleInputChange('boatyardName', e.target.value)}
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
            <span className="font-medium text-sm text-[#000000]">Boat Name</span>
            <div className="mt-2">
              <InputComponent
                value={formData.boatName}
                onChange={(e) => handleInputChange('boatName', e.target.value)}
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
            <span className="font-medium text-sm text-[#000000]">Boat Size</span>
            <div className="mt-2">
              <InputComponent
                value={formData.boatSize}
                onChange={(e) => handleInputChange('boatSize', e.target.value)}
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
              <span className="font-medium text-sm text-[#000000]">Type</span>
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
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
          <div>
            <span className="font-medium text-sm text-[#000000]">Weight</span>
            <div className="mt-2">
              <InputComponent
                value={formData.boatWeight}
                onChange={(e) => handleInputChange('boatWeight', e.target.value)}
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
              <span className="font-medium text-sm text-[#000000]">Size of Weight</span>
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
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">Type of Weight</span>
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
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">Top Chain Condition</span>
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
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
          <div className="mt-3">
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">Condition of Eye</span>
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
                  Shackle, Swivel Condition
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
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">Dept at Mean High Water</span>
              </div>

              <div className="mt-2">
                <InputText
                  value={formData.deptAtMeanHighWater}
                  onChange={(e) => handleInputChange('deptAtMeanHighWater', e.target.value)}
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
                <span className="font-medium text-sm text-[#000000]">Bootom Chain Condition</span>
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
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">Pennant Condition</span>
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
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>
              <span className="font-medium text-sm text-[#000000]">Pin on Map</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4  bottom-8 absolute ">
        <Button
          onClick={SaveCustomer}
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
            top: '20px',
          }}
        />
        <Button
          onClick={() => {}}
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
