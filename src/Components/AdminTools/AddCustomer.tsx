import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import InputComponent from '../CommonComponent/InputComponent'
import { CityProps } from '../../Type/CommonType'
import { CustomerAdminDataProps } from '../../Type/ComponentBasedType'

const AddCustomer: React.FC<CustomerAdminDataProps> = ({ customerData, editMode }) => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<CityProps | undefined>(undefined)
  const [street, setStreet] = useState('')
  const [apt, setApt] = useState('')
  const [state, setState] = useState<CityProps | undefined>(undefined)
  const [country, setCountry] = useState<CityProps | undefined>(undefined)
  const [zipCode, setZipCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const cities: CityProps[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]

  useEffect(() => {
    if (editMode && customerData) {
      setName(customerData.Name || '')
      setId(customerData.UserId || '')
      setPhone(customerData.Phone || '')
      setEmail(customerData.Email || '')
    }
  }, [editMode, customerData])

  const handleSave = () => {
    const payload = {
      id: 1,
      roleId: role?.code,
      Name: name,
      UserId: id,
      Phone: phone,
      Email: email,
      street: street,
      Apt: apt,
      stateId: state?.code,
      countryId: country?.code,
      zipCode: zipCode,
      password: password,
      createdBy: 'System',
      updatedBy: 'System',
    }
    console.log('Payload:', payload)
  }

  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-around mt-3">
          <div>
            <span className="font-semibold text-sm">Name</span>
            <div className="mt-2">
              <InputText
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <span className="font-semibold text-sm">ID</span>
            <div className="mt-2">
              <InputText
                value={id}
                onChange={(e) => setId(e.target.value)}
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
            <span className="font-semibold text-sm">Phone</span>
            <div className="mt-2">
              <InputText
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

        <div className="flex gap-6 ">
          <div>
            <div className="ml-4 ">
              <div className="mt-3">
                <span className="font-semibold text-sm ">Email Address</span>
              </div>

              <div className="mt-3">
                <InputText
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

          <div>
            <div className="">
              <div className="mt-3">
                <span className="font-semibold text-sm">Role</span>
              </div>

              <div className="mt-3">
                <Dropdown
                  value={role}
                  onChange={(e: DropdownChangeEvent) => setRole(e.value)}
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

        <div className="">
          <div className="mt-8 ml-5">
            <h1 className="text-lg font-bold">Address</h1>
          </div>

          <div className="flex justify-around  mt-4 ml-2 ">
            <div>
              <div className="mt-2">
                <InputText
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street/house"
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
              <div className="mt-2">
                <InputText
                  value={apt}
                  onChange={(e) => setApt(e.target.value)}
                  placeholder="Apt/Suite"
                  type="text"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>

            <div className="card flex justify-content-center mt-2 ">
              <Dropdown
                value={state}
                onChange={(e: DropdownChangeEvent) => setState(e.value)}
                options={cities}
                optionLabel="name"
                editable
                placeholder="State"
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                }}
              />
            </div>
          </div>

          <div className="flex mt-5 gap-6 ml-5">
            <div className="card flex justify-content-center">
              <Dropdown
                value={country}
                onChange={(e: DropdownChangeEvent) => setCountry(e.value)}
                options={cities}
                optionLabel="name"
                editable
                placeholder="Country"
                className=""
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                }}
              />
            </div>
            <InputText
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Zipcode"
              style={{
                width: '13vw',
                height: '4vh',
                border: '1px solid gray',
                borderRadius: '0.50rem',
              }}
            />
          </div>
        </div>
        <div className="flex ml-5 mt-5 gap-6 text-black">
          <div>
            <span className="font-semibold text-sm">Create password</span>
            <div className="mt-2">
              <InputComponent
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
            <span className="font-semibold text-sm">Confirm password</span>
            <div className="mt-2">
              <InputComponent
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

        {/* Save and Back buttons */}
        <div className="flex gap-3 mt-10 ml-6">
          <Button
            label={'Save'}
            onClick={handleSave}
            style={{
              width: '5vw',
              height: '7vh',
              backgroundColor: 'black',
              cursor: 'pointer',
              fontWeight: 'bolder',
              fontSize: '1vw',
              border: '1px solid gray',
              color: 'white',
              borderRadius: '0.50rem',
            }}
          />
          <Button
            label={'Back'}
            text={true}
            style={{ backgroundColor: 'white', color: 'black', border: 'none' }}
          />
        </div>
      </div>
    </>
  )
}

export default AddCustomer
