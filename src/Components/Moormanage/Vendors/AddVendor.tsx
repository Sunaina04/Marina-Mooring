import React, { useState, useEffect, useCallback } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import InputComponent from '../../CommonComponent/InputComponent'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'
import { useAddVendorsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { CityProps, Country, State } from '../../../Type/CommonType'
import { AddVendorProps } from '../../../Type/ComponentBasedType'
import { VendorPayload, VendorResponse } from '../../../Type/ApiTypes'
import { CountriesData, StatesData } from '../../CommonComponent/MetaDataComponent/MetaDataApi'

const AddVendor: React.FC<AddVendorProps> = ({
  vendors,
  editMode,
  closeModal,
  getVendor,
  toastRef,
}) => {
  const [checked, setChecked] = useState<boolean>(false)
  const [addVendor] = useAddVendorsMutation()
  const { getStatesData } = StatesData()
  const { getCountriesData } = CountriesData()
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [formData, setFormData] = useState<any>({
    companyName: '',
    phone: '',
    website: '',
    streetBuildingForAddress: '',
    aptSuiteForAddress: '',
    countryForAddress: '',
    stateForAddress: '',
    zipCodeForAddress: '',
    emailForAddress: '',
    streetBuildingForRemit: '',
    aptSuiteForRemit: '',
    countryForRemit: '',
    stateForRemit: '',
    zipCodeForRemit: '',
    emailForRemit: '',
    accountNumber: '',
    firstName: '',
    lastName: '',
    phoneForRepresentative: '',
    emailForRepresentative: '',
    note: '',
  })

  console.log('data', formData.companyName)
  const validateMooringFields = () => {
    const errors: { [key: string]: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

    if (!formData.phone) {
      errors.phone = 'Phone is required'
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Phone must be a 10-digit number'
    }

    if (!formData.emailForAddress) {
      errors.emailForAddress = 'Email is required'
    } else if (!emailRegex.test(formData.emailForAddress)) {
      errors.emailForAddress = 'Please enter a valid email format'
    }

    if (!formData.emailForRemit) {
      errors.emailForRemit = 'Email is required'
    } else if (!emailRegex.test(formData.emailForRemit)) {
      errors.emailForRemit = 'Please enter a valid email format'
    }

    if (!formData.emailForRepresentative) {
      errors.emailForRepresentative = 'Email is required'
    } else if (!emailRegex.test(formData.emailForRemit)) {
      errors.emailForRepresentative = 'Please enter a valid email format'
    }

    if (!formData.website) {
      errors.website = 'Website is required'
    } else if (!urlRegex.test(formData.website)) {
      errors.website = 'Please enter a valid URL'
    }

    if (!formData.companyName) errors.companyName = 'companyName is required'
    if (!formData.streetBuildingForAddress)
      errors.streetBuildingForAddress = 'street/Building is required'
    if (!formData.aptSuiteForAddress) errors.aptSuiteForAddress = 'aptSuite is required'
    if (!formData.countryForAddress) errors.countryForAddress = 'country is required'
    if (!formData.stateForAddress) errors.stateForAddress = 'state is required'
    if (!formData.zipCodeForAddress) errors.zipCodeForAddress = 'zipCode is required'

    if (!formData.streetBuildingForRemit)
      errors.streetBuildingForRemit = 'street/Building is required'
    if (!formData.aptSuiteForRemit) errors.aptSuiteForRemit = 'apt/Suite is required'
    if (!formData.countryForRemit) errors.countryForRemit = 'country is required'
    if (!formData.stateForRemit) errors.stateForRemit = 'state is required'
    if (!formData.zipCodeForRemit) errors.zipCodeForRemit = 'zipCode is required'

    if (!formData.accountNumber) errors.accountNumber = 'accountNumber is required'

    if (!formData.firstName) errors.firstName = 'firstName is required'
    if (!formData.lastName) errors.lastName = 'lastName is required'
    if (!formData.phoneForRepresentative) errors.phoneForRepresentative = 'phone is required'
    if (!formData.note) errors.note = 'note is required'

    setFieldErrors(errors)
    return errors
  }

  const handleInputChange = (field: string, value: any) => {
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

  const handleEditMode = () => {
    setFormData((prevState: any) => ({
      ...prevState,
      companyName: vendors?.companyName || '',
      phone: vendors?.companyPhoneNumber || '',
      website: vendors?.website || '',
      streetBuildingForAddress: vendors?.street || '',
      aptSuiteForAddress: vendors?.companyEmail || '',
      countryForAddress: vendors?.countryResponseDto?.name || '',
      stateForAddress: vendors?.stateResponseDto?.name || '',
      zipCodeForAddress: vendors?.zipCode || '',
      emailForAddress: vendors?.companyEmail || '',
      streetBuildingForRemit: vendors?.remitStreet || '',
      aptSuiteForRemit: vendors?.remitApt || '',
      countryForRemit: vendors?.remitCountryResponseDto?.name || '',
      stateForRemit: vendors?.remitStateResponseDto?.name || '',
      zipCodeForRemit: vendors?.remitZipCode || '',
      emailForRemit: vendors?.remitEmailAddress || '',
      accountNumber: vendors?.accountNumber || '',
      firstName: vendors?.firstName || '',
      lastName: vendors?.lastName || '',
      // phoneForRepresentative: vendors?. || '',
      // emailForRepresentative: vendors?. || '',
      // note: vendors?. || '',
    }))
  }

  const saveVendor = async () => {
    const errors = validateMooringFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    // const errors = validateFields()
    // if (Object.keys(errors).length > 0) {
    //   setErrorMessage(errors)
    //   return
    // }
    try {
      const payload = {
        companyName: formData?.companyName,
        companyPhoneNumber: formData?.phone,
        website: formData?.website,
        street: formData?.streetBuildingForAddress,
        aptSuite: formData?.aptSuiteForAddress,
        stateId: formData?.stateForAddress,
        countryId: formData?.countryForAddress?.id || '',
        zipCode: formData?.zipCodeForAddress?.id,
        companyEmail: formData?.emailForAddress,
        accountNumber: formData?.accountNumber,
        remitStreet: formData?.streetBuildingForRemit,
        remitApt: formData?.aptSuiteForRemit,
        remitStateId: formData?.stateForRemit?.id,
        remitCountryId: formData?.countryForRemit?.id,
        remitZipCode: formData?.zipCodeForRemit,
        remitEmailAddress: formData?.emailForRemit,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        salesRepPhoneNumber: formData?.salesRepPhone,
        salesRepEmail: formData?.salesRepEmail,
        salesRepNote: formData?.note,
      }
      const response = await addVendor(payload).unwrap()
      const { status, message } = response as VendorResponse
      if (status === 200 || status === 201) {
        closeModal()
        getVendor()
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Boatyard Saved successfully',
          life: 3000,
        })
      } else {
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 3000,
      })
    }
  }

  useEffect(() => {
    if (editMode && vendors) {
      handleEditMode()
      console.log('vendors', vendors)
    } else {
    }
  }, [editMode, vendors])

  return (
    <>
      <div className="main">
        <div className="flex">
          <div className="flex gap-8">
            <div>
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                Company Name
              </span>
              <div className="mt-2">
                <InputComponent
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  value={formData.companyName}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.companyName ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
              {fieldErrors.companyName && (
                <small className="p-error">{fieldErrors.companyName}</small>
              )}
            </div>
            <div>
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>Phone</span>
              <div className="mt-2">
                <InputComponent
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  value={formData.phone}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.phone ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
              {fieldErrors.phone && <small className="p-error">{fieldErrors.phone}</small>}
            </div>
            <div>
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>Website</span>
              <div className="mt-2">
                <InputComponent
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  value={formData.website}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.website ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
              <p>
                {fieldErrors.website && <small className="p-error">{fieldErrors.website}</small>}
              </p>
            </div>
          </div>
        </div>
        <div className="flex mt-3 gap-4">
          <div className="mt-5">
            <div>
              <h1 style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>Address</h1>
            </div>

            <div className=" flex gap-2 mt-2">
              <div>
                <div>
                  <div className="mt-2">
                    <InputText
                      placeholder="Street/Building"
                      value={formData.streetBuildingForAddress}
                      onChange={(e) =>
                        handleInputChange('streetBuildingForAddress', e.target.value)
                      }
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: fieldErrors.streetBuildingForAddress
                          ? '1px solid red'
                          : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                        paddingLeft: '0.5rem',
                      }}
                    />
                  </div>
                  <p>
                    <p>
                      {fieldErrors.streetBuildingForAddress && (
                        <small className="p-error">{fieldErrors.streetBuildingForAddress}</small>
                      )}
                    </p>
                  </p>
                </div>
                <div>
                  <div className="mt-2">
                    <Dropdown
                      value={formData.countryForAddress}
                      onChange={(e) => handleInputChange('countryForAddress', e.target.value)}
                      options={countriesData}
                      optionLabel="name"
                      editable
                      placeholder="Country"
                      className=""
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: fieldErrors.countryForAddress
                          ? '1px solid red'
                          : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                  </div>
                  {fieldErrors.countryForAddress && (
                    <small className="p-error">{fieldErrors.countryForAddress}</small>
                  )}
                </div>
                <div>
                  <div className="mt-2 ">
                    <InputText
                      type="text"
                      placeholder="Zip Code"
                      value={formData.zipCodeForAddress}
                      onChange={(e) => handleInputChange('zipCodeForAddress', e.target.value)}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: fieldErrors.zipCodeForAddress
                          ? '1px solid red'
                          : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                        paddingLeft: '0.5rem',
                      }}
                    />
                  </div>
                  <p>
                    {fieldErrors.zipCodeForAddress && (
                      <small className="p-error">{fieldErrors.zipCodeForAddress}</small>
                    )}
                  </p>
                </div>
              </div>
              <div className="">
                <div>
                  <div className="mt-2">
                    <InputText
                      placeholder="Apt/Suite"
                      value={formData.aptSuiteForAddress}
                      onChange={(e) => handleInputChange('aptSuiteForAddress', e.target.value)}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: fieldErrors.aptSuiteForAddress
                          ? '1px solid red'
                          : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                        paddingLeft: '0.5rem',
                      }}
                    />
                  </div>
                  <p>
                    {fieldErrors.aptSuiteForAddress && (
                      <small className="p-error">{fieldErrors.aptSuiteForAddress}</small>
                    )}
                  </p>
                </div>
                <div>
                  <div className="mt-2">
                    <Dropdown
                      value={formData.stateForAddress}
                      onChange={(e) => handleInputChange('stateForAddress', e.target.value)}
                      options={statesData}
                      optionLabel="name"
                      editable
                      placeholder="State"
                      className=""
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: fieldErrors.stateForAddress ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                      }}
                    />
                  </div>

                  <p>
                    {fieldErrors.stateForAddress && (
                      <small className="p-error">{fieldErrors.stateForAddress}</small>
                    )}
                  </p>
                </div>

                <div>
                  <div className="mt-2 ">
                    <InputText
                      placeholder="Email Address"
                      value={formData.emailForAddress}
                      onChange={(e) => handleInputChange('emailForAddress', e.target.value)}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: fieldErrors.emailForAddress ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                        paddingLeft: '0.5rem',
                      }}
                    />
                  </div>

                  <p>
                    {fieldErrors.emailForAddress && (
                      <small className="p-error">{fieldErrors.emailForAddress}</small>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-1 py-5 px-5 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <div>
                <h1 style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                  Remit Address
                </h1>
              </div>
              <div className="flex mt-2 gap-2">
                <div className="mt-1">
                  <div>
                    <div className="">
                      <InputText
                        placeholder="Street/Building"
                        value={formData.streetBuildingForRemit}
                        onChange={(e) =>
                          handleInputChange('streetBuildingForRemit', e.target.value)
                        }
                        style={{
                          width: '178.39px',
                          height: '32px',
                          border: fieldErrors.streetBuildingForRemit
                            ? '1px solid red'
                            : '1px solid #D5E1EA',
                          borderRadius: '0.50rem',
                          fontSize: '0.70rem',
                          backgroundColor: '#F5F5F5',
                          paddingLeft: '0.5rem',
                        }}
                      />
                    </div>
                    <p>
                      {fieldErrors.streetBuildingForRemit && (
                        <small className="p-error">{fieldErrors.streetBuildingForRemit}</small>
                      )}
                    </p>
                  </div>
                  <div className="mt-2">
                    <Dropdown
                      // value={selectedCity}
                      value={formData.countryForRemit}
                      onChange={(e) => handleInputChange('countryForRemit', e.target.value)}
                      options={countriesData}
                      optionLabel="name"
                      editable
                      placeholder="Country"
                      className=""
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: fieldErrors.countryForRemit ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                        backgroundColor: '#F5F5F5',
                      }}
                    />

                    <p>
                      {fieldErrors.countryForRemit && (
                        <small className="p-error">{fieldErrors.countryForRemit}</small>
                      )}
                    </p>
                  </div>

                  <div className="mt-2">
                    <InputText
                      type="number"
                      placeholder="Zip Code"
                      value={formData.zipCodeForRemit}
                      onChange={(e) => handleInputChange('zipCodeForRemit', e.target.value)}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: fieldErrors.zipCodeForRemit ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                        backgroundColor: '#F5F5F5',
                        paddingLeft: '0.5rem',
                      }}
                    />

                    <p>
                      {fieldErrors.zipCodeForRemit && (
                        <small className="p-error">{fieldErrors.zipCodeForRemit}</small>
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="mt-1">
                      <InputText
                        placeholder="Apt/Suite"
                        value={formData.aptSuiteForRemit}
                        onChange={(e) => handleInputChange('aptSuiteForRemit', e.target.value)}
                        style={{
                          width: '178.39px',
                          height: '32px',
                          border: fieldErrors.aptSuiteForRemit
                            ? '1px solid red'
                            : '1px solid #D5E1EA',
                          borderRadius: '0.50rem',
                          fontSize: '0.70rem',
                          backgroundColor: '#F5F5F5',
                          paddingLeft: '0.5rem',
                        }}
                      />
                    </div>
                    <p>
                      {fieldErrors.aptSuiteForRemit && (
                        <small className="p-error">{fieldErrors.aptSuiteForRemit}</small>
                      )}
                    </p>
                  </div>
                  <div>
                    <div className="mt-2">
                      <Dropdown
                        onChange={(e) => handleInputChange('stateForRemit', e.target.value)}
                        value={formData.stateForRemit}
                        options={statesData}
                        optionLabel="name"
                        editable
                        placeholder="State"
                        className=""
                        style={{
                          width: '178.39px',
                          height: '32px',
                          border: fieldErrors.stateForRemit ? '1px solid red' : '1px solid #D5E1EA',
                          borderRadius: '0.50rem',
                          fontSize: '0.70rem',
                          backgroundColor: '#F5F5F5',
                        }}
                      />
                      <p>
                        {fieldErrors.stateForRemit && (
                          <small className="p-error">{fieldErrors.stateForRemit}</small>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <InputText
                      placeholder="Email Address"
                      value={formData.emailForRemit}
                      onChange={(e) => handleInputChange('emailForRemit', e.target.value)}
                      style={{
                        width: '178.39px',
                        height: '32px',
                        border: fieldErrors.emailForRemit ? '1px solid red' : '1px solid #D5E1EA',
                        borderRadius: '0.50rem',
                        fontSize: '0.70rem',
                        backgroundColor: '#F5F5F5',
                        paddingLeft: '0.5rem',
                      }}
                    />
                    <p>
                      {fieldErrors.emailForRemit && (
                        <small className="p-error">{fieldErrors.emailForRemit}</small>
                      )}
                    </p>
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
            <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
              Account Number
            </span>
          </div>
          <div className="mt-2">
            <InputText
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              type="text"
              style={{
                width: '230px',
                height: '32px',
                border: fieldErrors.accountNumber ? '1px solid red' : '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.70rem',
                padding: '1em',
              }}
            />
            <p>
              {fieldErrors.accountNumber && (
                <small className="p-error">{fieldErrors.accountNumber}</small>
              )}
            </p>
          </div>
        </div>
      </div>

      <div
        className="py-3 pl-3 mb-20 mt-4 rounded-lg"
        style={{ backgroundColor: '#F5F5F5', height: '250px' }}>
        <div className="">
          <h1 style={{ fontWeight: '500', fontSize: '24px', color: '#000000' }}>
            Sales Representative
          </h1>
        </div>

        <div className="flex   mt-2 gap-4 ">
          <div className="mt-2">
            <div>
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                First Name
              </span>
            </div>
            <div className="mt-1">
              <InputText
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder=""
                type="text"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.firstName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.70rem',
                  backgroundColor: '#F5F5F5',
                }}
              />
              <p>
                {fieldErrors.firstName && (
                  <small className="p-error">{fieldErrors.firstName}</small>
                )}
              </p>
            </div>
          </div>

          <div>
            <div className="mt-2">
              <div>
                <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                  Last Name
                </span>
              </div>
              <div className="mt-1">
                <InputText
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="lastname"
                  type="text"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.lastName ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.70rem',
                    backgroundColor: '#F5F5F5',
                  }}
                />
                <p>
                  {fieldErrors.lastName && (
                    <small className="p-error">{fieldErrors.lastName}</small>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="card flex justify-content-center mt-2 ">
            <div className="">
              <div>
                <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>Phone</span>
              </div>
              <div className="mt-1">
                <InputText
                  value={formData.phoneForRepresentative}
                  onChange={(e) => handleInputChange('phoneForRepresentative', e.target.value)}
                  placeholder=""
                  type="text"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.phoneForRepresentative
                      ? '1px solid red'
                      : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.70rem',
                    backgroundColor: '#F5F5F5',
                  }}
                />
                <p>
                  {fieldErrors.phoneForRepresentative && (
                    <small className="p-error">{fieldErrors.phoneForRepresentative}</small>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-2">
            <div>
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>Email</span>
            </div>
            <div className="mt-1">
              <InputText
                value={formData.emailForRepresentative}
                onChange={(e) => handleInputChange('emailForRepresentative', e.target.value)}
                placeholder="email"
                type="text"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.emailForRepresentative
                    ? '1px solid red'
                    : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.70rem',
                  backgroundColor: '#F5F5F5',
                }}
              />
              <p>
                {fieldErrors.emailForRepresentative && (
                  <small className="p-error">{fieldErrors.emailForRepresentative}</small>
                )}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <div className="">
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>Note</span>
            </div>
            <div className="mt-1">
              <InputTextarea
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                style={{
                  width: '487.77px',
                  height: '32px',
                  border: fieldErrors.note ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.70rem',
                  backgroundColor: '#F5F5F5',
                  boxShadow: 'none',
                }}
                autoResize
                // value={note}

                // rows={5}
                // cols={30}
              />
            </div>
            <p>{fieldErrors.note && <small className="p-error">{fieldErrors.note}</small>}</p>
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
          onClick={saveVendor}
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
          }}
        />
        <Button
          onClick={function (): void {
            throw new Error('Function not implemented.')
          }}
          label={'Back'}
          text={true}
          style={{
            backgroundColor: 'white',
            color: '#000000',
            border: 'none',
            width: '89px',
            height: '42px',
          }}
        />
      </div>
    </>
  )
}

export default AddVendor
