import React, { useEffect, useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import {
  useAddCustomerMutation,
  useUpdateCustomerMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { CustomerDataProps } from '../../../Type/ComponentBasedType'
import { CityProps } from '../../../Type/CommonType'
import AddMoorings from '../Moorings/AddMoorings'
const AddCustomer: React.FC<CustomerDataProps> = ({
  customer,
  editMode,
  closeModal,
  getCustomer,
}) => {
  const [value, setValue] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<CityProps | undefined>(undefined)
  const [selectedState, setSelectedState] = useState<CityProps | undefined>(undefined)
  const [customerName, setCustomerName] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [streetHouse, setStreetHouse] = useState<string>('')
  const [sectorBlock, setSectorBlock] = useState<string>('')
  const [pinCode, setPinCode] = useState<string>('')
  const [addCustomer] = useAddCustomerMutation()
  const [selectedCity, setSelectedCity] = useState<CityProps | undefined>(undefined)
  const [updateCustomer] = useUpdateCustomerMutation()

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
    topChainCondition: '',
    conditionOfEye: '',
    bottomChainCondition: '',
    shackleSwivelCondition: '',
    pennantCondition: '',
    deptAtMeanHighWater: '',
    note: '',
  })

  const SaveCustomer = async () => {
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

      const selectedCountry = cities.find((city) => city.name === customer.country)
      setSelectedCountry(selectedCountry || undefined)

      const selectedState = cities.find((city) => city.name === customer.state)
      setSelectedState(selectedState || undefined)
    }
  }, [editMode, customer])

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCustomerName(e.target.value)
                }
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
          <div className="mt-4">
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">Email Address</span>
              </div>
              <div className="mt-2">
                <InputText
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
        </div>
        <div>
          <div>
            <span className="font-medium text-sm text-[#000000]">Customer ID</span>
            <div className="mt-2">
              <InputComponent
                value={customerId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerId(e.target.value)}
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
          <div className="mt-4">
            <span className="font-medium text-sm text-[#000000]">Phone</span>
            <div className="mt-2">
              <InputComponent
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStreetHouse(e.target.value)
                }
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
            </div>
          </div>
          <div>
            <div>
              <InputText
                value={sectorBlock}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSectorBlock(e.target.value)
                }
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
            </div>
          </div>
          <div>
            <Dropdown
              value={selectedState}
              onChange={(e: DropdownChangeEvent) => setSelectedState(e.value)}
              options={cities}
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
          </div>
        </div>
        <div className="flex mt-5 gap-6">
          <div>
            <Dropdown
              value={selectedCountry}
              onChange={(e: DropdownChangeEvent) => setSelectedCountry(e.value)}
              options={cities}
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
              // className="shadow-none"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 text-xl text-black font-bold">
        <h3>Add Mooring</h3>
      </div>
      <div className="mt-8">
        <AddMoorings moorings={formData} editMode={editMode} />
      </div>
    </div>
  )
}

export default AddCustomer
