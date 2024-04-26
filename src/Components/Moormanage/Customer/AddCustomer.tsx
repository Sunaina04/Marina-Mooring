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

const AddCustomer: React.FC<CustomerDataProps> = ({
  customer,
  editMode,
  closeModal,
  getCustomer,
}) => {
  const [value, setValue] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<CityProps | null>(null)
  const [selectedState, setSelectedState] = useState<CityProps | null>(null)
  const [customerName, setCustomerName] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [streetHouse, setStreetHouse] = useState<string>('')
  const [sectorBlock, setSectorBlock] = useState<string>('')
  const [pinCode, setPinCode] = useState<string>('')
  const [addCustomer] = useAddCustomerMutation()
  const [selectedCity, setSelectedCity] = useState<CityProps | null>(null)
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
    console.log('RESPONSE', response)
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
    console.log('RESPONSE', response)
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
      setSelectedCountry(selectedCountry || null)

      const selectedState = cities.find((city) => city.name === customer.state)
      setSelectedState(selectedState || null)
    }
  }, [editMode, customer])

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  return (
    <div className="w-full h-full">
      <h1 className="ml-5 text-lg font-bold">Add Customer</h1>
      <div className="flex gap-10">
        <div className=" mt-3">
          <div>
            <span className="font-semibold text-sm ml-5">Customer Name</span>
            <div className="mt-2 ml-5">
              <InputComponent
                value={customerName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCustomerName(e.target.value)
                }
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>
          <div className="mt-4 ml-5 ">
            <div>
              <div>
                <span className="font-semibold text-sm">Email Address</span>
              </div>

              <div className="mt-2">
                <InputText
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div>
            <span className="font-semibold text-sm">Customer ID</span>
            <div className="mt-2">
              <InputComponent
                value={customerId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerId(e.target.value)}
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <span className="font-semibold text-sm">Phone</span>
            <div className="mt-2">
              <InputComponent
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="mt-4 ml-5">
          <h1 className="text-sm font-bold">Address</h1>
        </div>

        <div className="flex justify-around ml-3 mt-4 ">
          <div>
            <div className="mt-2">
              <InputText
                value={streetHouse}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStreetHouse(e.target.value)
                }
                placeholder="Street/house"
                style={{
                  width: '14vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                }}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <InputText
                value={sectorBlock}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSectorBlock(e.target.value)
                }
                placeholder="Apt/Suite"
                type="text"
                style={{
                  width: '14vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                }}
              />
            </div>
          </div>

          <div className="card flex justify-content-center mt-2 ">
            <Dropdown
              value={selectedState}
              onChange={(e: DropdownChangeEvent) => setSelectedState(e.value)}
              options={cities}
              optionLabel="name"
              editable
              placeholder="State"
              style={{
                width: '14vw',
                height: '4vh',
                border: '1px solid gray',
                borderRadius: '0.50rem',
              }}
            />
          </div>
        </div>

        <div className="flex mt-5 gap-2 ml-5">
          <div className="card flex justify-content-center">
            <Dropdown
              value={selectedCountry}
              onChange={(e: DropdownChangeEvent) => setSelectedCountry(e.value)}
              options={cities}
              optionLabel="name"
              editable
              placeholder="Country"
              className=""
              style={{
                width: '14vw',
                height: '4vh',
                border: '1px solid gray',
                borderRadius: '0.50rem',
              }}
            />
          </div>
          <div>
            <InputText
              value={pinCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPinCode(e.target.value)}
              placeholder="Pincode"
              style={{
                width: '14vw',
                height: '4vh',
                border: '1px solid gray',
                borderRadius: '0.50rem',
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 ml-4 text-lg font-extrabold">Add Mooring</div>
      <div>
        <div className="flex justify-around mt-3">
          <div>
            <span className="font-semibold text-sm">Mooring ID</span>
            <div className="mt-2">
              <InputComponent
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-sm">Harbor</span>
            <div className="mt-2">
              <InputComponent
                // placeholder="Enter owner name"
                // type="text"
                value={formData.harbor}
                onChange={(e) => handleInputChange('harbor', e.target.value)}
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>
          {/* <div>
            <span className="font-semibold text-sm">Mooring Number</span>
            <div className="mt-2">
              <InputComponent
                // placeholder="Enter customer ID"
                // type="text"
                value={formData.mooringNumber}
                onChange={(e) =>
                  handleInputChange("mooringNumber", e.target.value)
                }
                style={{
                  width: "13vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                  fontSize: "0.80vw",
                }}
              />
            </div>
          </div>*/}
          <div>
            <span className="font-semibold text-sm">Water Depth</span>
            <div className="mt-2">
              <InputComponent
                value={formData.waterDepth}
                onChange={(e) => handleInputChange('waterDepth', e.target.value)}
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-3  ">
          <div className="flex justify-around mt-3">
            <div>
              <span className="font-semibold text-sm">G.P.S Cordinates</span>
              <div className="mt-2">
                <InputComponent
                  // placeholder="Enter customer ID"
                  // type="text"
                  value={formData.gpsCoordinates}
                  onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
            </div>

            <div>
              <span className="font-semibold text-sm">Boat Name</span>
              <div className="mt-2">
                <InputComponent
                  // placeholder="Enter owner name"
                  // type="text"
                  value={formData.boatName}
                  onChange={(e) => handleInputChange('boatName', e.target.value)}
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
            </div>
            <div>
              <span className="font-semibold text-sm">Boat Size</span>
              <div className="mt-2">
                <InputComponent
                  value={formData.boatSize}
                  onChange={(e) => handleInputChange('boatSize', e.target.value)}
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex justify-around  mt-3">
            <div className="">
              <div>
                <span className="font-semibold text-sm">Type</span>
              </div>

              <div className="mt-2 ">
                <Dropdown
                  value={formData.typeOfWeight}
                  onChange={(e) => handleInputChange('typeOfWeight', e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Skiff"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>

            <div>
              <span className="font-semibold text-sm">Weight</span>
              <div className="mt-2">
                <InputComponent
                  // placeholder="Enter owner name"
                  // type="text"
                  value={formData.boatWeight}
                  onChange={(e) => handleInputChange('boatWeight', e.target.value)}
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <span className="font-semibold text-sm">Size of Weight</span>
              </div>

              <div className="mt-2 ">
                <Dropdown
                  value={formData.sizeOfWeight}
                  onChange={(e) => handleInputChange('sizeOfWeight', e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ml-1">
          <div className="flex justify-around mt-3 ">
            <div className="">
              <div>
                <span className="font-semibold text-sm tracking-tighter">Type of Weight</span>
              </div>

              <div className="mt-2 ">
                <Dropdown
                  value={formData.typeOfWeight}
                  onChange={(e) => handleInputChange('typeOfWeight', e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>

            <div className="ml-2">
              <div>
                <span className="font-semibold text-sm tracking-tighter">Top Chain Condition</span>
              </div>

              <div className="mt-2 ">
                <Dropdown
                  value={formData.topChainCondition}
                  onChange={(e) => handleInputChange('topChainCondition', e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <span className="font-semibold text-sm tracking-tighter">Condition of Eye</span>
              </div>

              <div className="mt-2 ">
                <Dropdown
                  value={formData.conditionOfEye}
                  onChange={(e) => handleInputChange('conditionOfEye', e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="flex justify-around mr-20">
          <div className="mt-3">
            <div className="">
              <div>
                <span className="font-semibold text-sm tracking-tighter">
                  Bottom Chain Condition
                </span>
              </div>

              <div className="mt-2 ">
                <Dropdown
                  value={formData.bottomChainCondition}
                  onChange={(e) => handleInputChange('bottomChainCondition', e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>
            <div className="mt-2">
              <div className="">
                <span className="font-semibold text-sm">Pennant Condition</span>
              </div>

              <div className="mt-2 ">
                <Dropdown
                  value={selectedCity}
                  onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>
          </div>
          {/* last row */}

          {/* shackle and depth */}

          <div className="mt-3">
            <div className="">
              <div>
                <span className="font-semibold text-sm tracking-tighter">
                  Shackle,Swivel Condition
                </span>
              </div>

              <div className="mt-2 ">
                <Dropdown
                  value={selectedCity}
                  onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>

            <div className="">
              <div className="mt-2">
                <span className="font-semibold text-sm tracking-tighter">
                  Dept at Mean High Water
                </span>
              </div>

              <div className="mt-2">
                <InputText
                  value={formData.deptAtMeanHighWater}
                  onChange={(e) => handleInputChange('deptAtMeanHighWater', e.target.value)}
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>
              <span className="font-semibold text-sm">Pin on Map</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6 ml-6">
        <Button
          onClick={editMode ? UpdateCustomer : SaveCustomer}
          label={'Save'}
          style={{
            width: '5vw',
            backgroundColor: 'black',
            cursor: 'pointer',
            fontWeight: 'bolder',
            fontSize: '1vw',
            border: '1px solid  gray',
            color: 'white',
            borderRadius: '0.50rem',
          }}
        />
        <Button
          onClick={closeModal}
          label={'Back'}
          text={true}
          style={{ backgroundColor: 'white', color: 'black', border: 'none' }}
        />
      </div>
    </div>
  )
}

export default AddCustomer
