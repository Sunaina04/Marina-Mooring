import React, { useState, useEffect } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import InputComponent from '../../CommonComponent/InputComponent'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'
import { useAddVendorsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { CityProps } from '../../../Type/CommonType'
import { AddVendorProps } from '../../../Type/ComponentBasedType'
import { VendorPayload, VendorResponse } from '../../../Type/ApiTypes'

const AddVendor: React.FC<AddVendorProps> = ({
  vendors,
  editMode,
  closeModal,
  getVendor,
  toastRef,
}) => {
  const [checked, setChecked] = useState<boolean>(false)
  const [companyName, setCompanyName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [streetBuilding, setStreetBuilding] = useState<string>('')
  const [aptSuite, setAptSuite] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<CityProps | undefined>(undefined)
  const [addressZipCode, setAddressZipCode] = useState<number | undefined>(undefined)
  const [remitStreetBuilding, setRemitStreetBuilding] = useState<string>('')
  const [remitAptSuite, setRemitAptSuite] = useState<string>('')
  const [remitZipCode, setRemitZipCode] = useState<number | undefined>(undefined)
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [accountNumber, setAccountNumber] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [salesRepPhone, setSalesRepPhone] = useState<string>('')
  const [salesRepEmail, setSalesRepEmail] = useState<string>('')
  const [note, setNote] = useState<string>('')
  const [addVendor] = useAddVendorsMutation()
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({})

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    const nameRegex = /^[a-zA-Z ]+$/

    const errors: { [key: string]: string } = {}

    if (!companyName) {
      errors.name = 'Boatyard Name is required'
    } else if (!nameRegex.test(companyName)) {
      errors.name = 'Name must only contain letters'
    }

    // if (!boatyardId) errors.id = 'Boatyard ID is required'

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

    if (!streetBuilding) errors.streetBuilding = 'Street/house is required'
    if (!aptSuite) errors.aptSuite = 'Zip code is required'
    if (!selectedCity) errors.selectedCity = 'Main contact is required'
    // if (!country) errors.country = 'Country  is required'
    // if (!state) errors.state = 'State  is required'
    if (!addressZipCode) errors.addressZipCode = 'Apt/Suite is required'

    if (!firstName) errors.firstName = 'First Name is required'
    if (!lastName) errors.lastName = 'Last Name is required'

    if (!salesRepPhone) {
      errors.salesRepPhone = 'Sales Rep Phone is required'
    } else if (!phoneRegex.test(salesRepPhone)) {
      errors.salesRepPhone = 'Sales Rep Phone must be a 10-digit number'
    }

    if (!salesRepEmail) {
      errors.salesRepEmail = 'Sales Rep Email is required'
    } else if (!emailRegex.test(salesRepEmail)) {
      errors.salesRepEmail = 'Please enter a valid email format'
    }

    return errors
  }

  useEffect(() => {
    if (editMode) {
      setCompanyName(vendors.companyName || '')
      setPhone(vendors.companyPhoneNumber || '')
      setWebsite(vendors.website || '')
      setStreetBuilding(vendors.street || '')
      setAptSuite(vendors.aptSuite || '')
      setSelectedCity({ name: vendors.country, code: '' })
      setAddressZipCode(vendors.zipCode || undefined)
      setEmailAddress(vendors.companyEmail || '')
      setAccountNumber(vendors.accountNumber || '')
      setFirstName(vendors.firstName || '')
      setLastName(vendors.lastName || '')
      setSalesRepPhone(vendors.salesRepPhoneNumber || '')
      setSalesRepEmail(vendors.salesRepEmail || '')
      setNote(vendors.salesRepNote || '')
    } else {
      setCompanyName('')
      setPhone('')
      setWebsite('')
      setStreetBuilding('')
      setAptSuite('')
      setSelectedCity(undefined)
      setAddressZipCode(undefined)
      setEmailAddress('')
      setAccountNumber('')
      setFirstName('')
      setLastName('')
      setSalesRepPhone('')
      setSalesRepEmail('')
      setNote('')
    }
  }, [editMode, vendors])

  const cities: CityProps[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]

  const saveVendor = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors)
      return
    }
    try {
      const payload = {
        companyName: companyName,
        companyPhoneNumber: phone,
        website: website,
        street: streetBuilding,
        aptSuite: aptSuite,
        country: selectedCity?.name || '',
        zipCode: addressZipCode,
        companyEmail: emailAddress,
        accountNumber: accountNumber,
        firstName: firstName,
        lastName: lastName,
        salesRepPhoneNumber: salesRepPhone,
        salesRepEmail: salesRepEmail,
        salesRepNote: note,
        primarySalesRep: true,
      }
      const response = await addVendor(payload).unwrap()
      const { status, message } = response as VendorResponse
      if (status === 200 || status === 201) {
        closeModal()
        getVendor()
        // setIsLoading(false)
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Boatyard Saved successfully',
          life: 3000,
        })
      } else {
        // setIsLoading(false)
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      // setIsLoading(false)
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 3000,
      })
    }
  }

  return (
    <>
      <div className="main">
        <div className="flex">
          <div className="flex gap-8">
            <div>
              <span className="font-semibold text-sm text-black">Company Name</span>
              <div className="mt-2">
                <InputComponent
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value)
                    setErrorMessage((prev) => ({ ...prev, name: '' }))
                  }}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: errorMessage.name ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
              <p>{errorMessage.name && <small className="p-error">{errorMessage.name}</small>}</p>
            </div>
            <div>
              <span className="font-semibold text-sm text-black">Phone</span>
              <div className="mt-2">
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
                    fontSize: '0.80vw',
                  }}
                />
              </div>
              <p>{errorMessage.phone && <small className="p-error">{errorMessage.phone}</small>}</p>
            </div>
            <div>
              <span className="font-semibold text-sm text-black">Website</span>
              <div className="mt-2">
                <InputComponent
                  value={website}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-2 gap-4">
          <div className="mt-5">
            <div>
              <h1 className="text-sm font-bold text-black">Address</h1>
            </div>

            <div className=" flex gap-2 mt-2">
              <div>
                <div>
                  <div className="mt-2">
                    <InputText
                      placeholder="Street/Building"
                      value={streetBuilding}
                      onChange={(e) => {
                        setStreetBuilding(e.target.value)
                        setErrorMessage((prev) => ({ ...prev, streetBuilding: '' }))
                      }}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: errorMessage.streetBuilding ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                  </div>
                  <p>
                    {errorMessage.streetBuilding && (
                      <small className="p-error">{errorMessage.streetBuilding}</small>
                    )}
                  </p>
                </div>
                <div>
                  <div className="mt-2">
                    <Dropdown
                      value={selectedCity}
                      onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value as CityProps)}
                      options={cities}
                      optionLabel="name"
                      editable
                      placeholder="Country"
                      className=""
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: '1px solid  #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-2 ">
                    <InputText
                      type="number"
                      placeholder="Zip Code"
                      value={addressZipCode !== undefined ? addressZipCode.toString() : ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const inputVal = e.target.value
                        const newValue = inputVal !== '' ? parseInt(inputVal, 10) : undefined
                        setAddressZipCode(newValue)
                        setErrorMessage((prev) => ({ ...prev, addressZipCode: '' }))
                      }}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: errorMessage.addressZipCode ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                  </div>
                  <p>
                    {errorMessage.addressZipCode && (
                      <small className="p-error">{errorMessage.addressZipCode}</small>
                    )}
                  </p>
                </div>
              </div>
              <div className="">
                <div>
                  <div className="mt-2">
                    <InputText
                      placeholder="Apt/Suite"
                      value={aptSuite}
                      onChange={(e) => {
                        setAptSuite(e.target.value)
                        setErrorMessage((prev) => ({ ...prev, aptSuite: '' }))
                      }}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: errorMessage.streetBuilding ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                  </div>
                  <p>
                    {errorMessage.aptSuite && (
                      <small className="p-error">{errorMessage.aptSuite}</small>
                    )}
                  </p>
                </div>
                <div>
                  <div className="mt-2">
                    <Dropdown
                      value={selectedCity}
                      onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value as CityProps)}
                      options={cities}
                      optionLabel="name"
                      editable
                      placeholder="State"
                      className=""
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: '1px solid  #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-2 ">
                    <InputText
                      placeholder="Email Address"
                      value={emailAddress}
                      onChange={(e) => {
                        setEmailAddress(e.target.value)
                        setErrorMessage((prev) => ({ ...prev, emailAddress: '' }))
                      }}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: errorMessage.emailAddress ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-1 py-5 px-5 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <div>
                <h1 className="text-sm font-bold text-black">Remit Address</h1>
              </div>
              <div className="flex mt-2 gap-2">
                <div className="mt-1">
                  <div>
                    <div className="">
                      <InputText
                        placeholder="Street/Building"
                        value={remitStreetBuilding}
                        onChange={(e) => {
                          setRemitStreetBuilding(e.target.value)
                          setErrorMessage((prev) => ({ ...prev, streetBuilding: '' }))
                        }}
                        style={{
                          width: '178.39px',
                          height: '32px',
                          border: errorMessage.streetBuilding
                            ? '1px solid red'
                            : '1px solid #D5E1EA',
                          borderRadius: '0.50rem',
                          fontSize: '0.70rem',
                        }}
                      />
                    </div>
                    <p>
                      {errorMessage.streetBuilding && (
                        <small className="p-error">{errorMessage.streetBuilding}</small>
                      )}
                    </p>
                  </div>
                  <div className="mt-1.5">
                    <Dropdown
                      value={selectedCity}
                      onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value as CityProps)}
                      options={cities}
                      optionLabel="name"
                      editable
                      placeholder="Country"
                      className=""
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: '1px solid  #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.40rem',
                      }}
                    />
                  </div>

                  <div className="mt-2">
                    <InputText
                      type="number"
                      placeholder="Zip Code"
                      value={addressZipCode !== undefined ? addressZipCode.toString() : ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const inputVal = e.target.value
                        const newValue = inputVal !== '' ? parseInt(inputVal, 10) : undefined
                        setAddressZipCode(newValue)
                        setErrorMessage((prev) => ({ ...prev, addressZipCode: '' }))
                      }}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: errorMessage.addressZipCode ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                    <p>
                      {errorMessage.addressZipCode && (
                        <small className="p-error">{errorMessage.addressZipCode}</small>
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="mt-1">
                      <InputText
                        placeholder="Apt/Suite"
                        value={remitAptSuite}
                        onChange={(e) => {
                          setRemitAptSuite(e.target.value)
                          setErrorMessage((prev) => ({ ...prev, aptSuite: '' }))
                        }}
                        style={{
                          width: '178.39px',
                          height: '32px',
                          border: errorMessage.aptSuite ? '1px solid red' : '1px solid #D5E1EA',
                          borderRadius: '0.50rem',
                          fontSize: '0.70rem',
                        }}
                      />
                    </div>
                    <p>
                      {errorMessage.aptSuite && (
                        <small className="p-error">{errorMessage.aptSuite}</small>
                      )}
                    </p>
                  </div>
                  <div>
                    <div className="mt-2">
                      <Dropdown
                        value={selectedCity}
                        onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value as CityProps)}
                        options={cities}
                        optionLabel="name"
                        editable
                        placeholder="State"
                        className=""
                        style={{
                          width: '178.39px',
                          height: '32px',
                          border: '1px solid  #D5E1EA',
                          borderRadius: '0.50rem',
                          fontSize: '0.70rem',
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <InputText
                      placeholder="Email Address"
                      value={emailAddress}
                      onChange={(e) => {
                        setEmailAddress(e.target.value)
                        setErrorMessage((prev) => ({ ...prev, emailAddress: '' }))
                      }}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: errorMessage.emailAddress ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex mt-2 gap-2">
          <p>
            {errorMessage.salesRepEmail && (
              <small className="p-error">{errorMessage.salesRepEmail}</small>
            )}
          </p>
          <div className="mt-2 ">
            <InputText
              placeholder="Zip Code"
              value={remitZipCode !== undefined ? remitZipCode.toString() : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const inputVal = e.target.value
                const newValue = inputVal !== '' ? parseInt(inputVal, 10) : undefined
                setRemitZipCode(newValue)
                setErrorMessage((prev) => ({ ...prev, addressZipCode: '' }))
              }}
              style={{
                width: '10vw',
                height: '4vh',
                border: errorMessage.addressZipCode ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.70rem',
              }}
            />
          </div>
          <p>
            {errorMessage.addressZipCode && (
              <small className="p-error">{errorMessage.addressZipCode}</small>
            )}
          </p>

          
          <div className="mt-2 ">
            <InputText
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => {
                setEmailAddress(e.target.value)
                setErrorMessage((prev) => ({ ...prev, emailAddress: '' }))
              }}
              style={{
                width: '10vw',
                height: '4vh',
                border: errorMessage.emailAddress ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.70rem',
              }}
            />
          </div>
        </div> */}
      </div>

      <div>
        <div className="mt-8">
          <div className="ml-1 text-black font-semibold text-sm">
            <span>Account Number</span>
          </div>
          <div className="mt-1">
            <InputText
              value={accountNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccountNumber(e.target.value)
              }
              type="text"
              style={{
                width: '230px',
                height: '32px',
                border: '1px solid  #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.70rem',
                padding: '1em',
              }}
            />
          </div>
        </div>
      </div>

      <div className="py-3 px-5 mt-4 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="">
          <h1 className="text-sm font-bold mt-2">Sales Representative</h1>
        </div>

        <div className="flex   mt-2 gap-2 ">
          <div className="mt-2">
            <div>
              <span>First Name</span>
            </div>
            <div className="mt-1">
              <InputText
                placeholder=""
                type="text"
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid  #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.70rem',
                }}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <div>
                <span>Last Name</span>
              </div>
              <div className="mt-1">
                <InputText
                  value={firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
                  placeholder=""
                  type="text"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid  #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.70rem',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="card flex justify-content-center mt-2 ">
            <div className="">
              <div>
                <span>Phone</span>
              </div>
              <div className="mt-1">
                <InputText
                  value={salesRepEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSalesRepEmail(e.target.value)
                  }
                  placeholder=""
                  type="text"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid  #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.70rem',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-2">
            <div>
              <span>Email</span>
            </div>
            <div className="mt-1">
              <InputText
                placeholder=""
                type="text"
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid  #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.70rem',
                }}
              />
            </div>
          </div>

          <div className="mt-2">
            <div className="">
              <span>Note</span>
            </div>
            <div className="mt-1">
              <InputTextarea
                style={{
                  width: '487.77px',
                  height: '32px',
                  border: '1px solid  #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.70rem',
                }}
                autoResize
                value={note}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
                // rows={5}
                // cols={30}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="card flex justify-content-center gap-3">
        <Checkbox onChange={(e) => setChecked(e.checked ?? false)} checked={checked}></Checkbox>

        <div>
          <p>Primary Sales Representative</p>
        </div>
      </div> */}

      <div className="flex gap-3 mt-4 ">
        <Button
          onClick={saveVendor}
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
    </>
  )
}

export default AddVendor
