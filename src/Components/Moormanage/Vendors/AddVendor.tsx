import React, { useState, useEffect, useCallback } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import InputComponent from '../../CommonComponent/InputComponent'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import {
  useAddVendorsMutation,
  useUpdateVendorMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { Country, State } from '../../../Type/CommonType'
import { AddVendorProps } from '../../../Type/ComponentBasedType'
import { ErrorResponse, VendorResponse } from '../../../Type/ApiTypes'
import { CountriesData, StatesData } from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { ProgressSpinner } from 'primereact/progressspinner'
const AddVendor: React.FC<AddVendorProps> = ({
  vendors,
  editMode,
  closeModal,
  getVendor,
  toastRef,
}) => {
  const [addVendor] = useAddVendorsMutation()
  const [editVendor] = useUpdateVendorMutation()
  const { getStatesData } = StatesData()
  const { getCountriesData } = CountriesData()
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
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

  const validateAddVendorFields = () => {
    const errors: { [key: string]: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^.{10}$|^.{12}$/
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    const zipCodeRegex = /^\d+$/
    if (!formData.phone) {
      errors.phone = 'Phone is required'
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Phone must be a 10-digit number'
    }
    if (!formData.phoneForRepresentative) {
      errors.phoneForRepresentative = 'Phone is required'
    } else if (!phoneRegex.test(formData.phoneForRepresentative)) {
      errors.phoneForRepresentative = 'Phone must be a 10-digit number'
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
    } else if (!emailRegex.test(formData.emailForRepresentative)) {
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
    if (!formData.zipCodeForAddress) {
      errors.zipCodeForAddress = 'Zip Code is required'
    } else if (!zipCodeRegex.test(formData.zipCodeForAddress)) {
      errors.zipCodeForAddress = 'Zip Code contain only numbers'
    }
    if (!formData.streetBuildingForRemit)
      errors.streetBuildingForRemit = 'Street/Building is required'
    if (!formData.aptSuiteForRemit) errors.aptSuiteForRemit = 'Apt/Suite is required'
    if (!formData.countryForRemit) errors.countryForRemit = 'Country is required'
    if (!formData.stateForRemit) errors.stateForRemit = 'State is required'
    if (!formData.zipCodeForRemit) {
      errors.zipCodeForRemit = 'Zip Code is required'
    } else if (!zipCodeRegex.test(formData.zipCodeForRemit)) {
      errors.zipCodeForRemit = 'Zip Code contain only numbers'
    }
    if (!formData.accountNumber) errors.accountNumber = 'accountNumber is required'
    if (!formData.firstName) errors.firstName = 'firstName is required'
    if (!formData.lastName) errors.lastName = 'lastName is required'
    if (!formData.phoneForRepresentative) errors.phoneForRepresentative = 'phone is required'
    if (!formData.note) errors.note = 'note is required'

    setFieldErrors(errors)
    return errors
  }

  const handleInputChange = (field: string, value: any) => {
    const numberRegex = /^\d+$/

    if (field === 'phone' || field === 'phoneForRepresentative' || field === 'phoneForSalesRep') {
      if (!/^\d*$/.test(value)) {
        return
      }
    }

    if (field === 'accountNumber') {
      if (value !== '' && !numberRegex.test(value)) {
        return
      }
    }

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

  const handleClick = () => {
    if (editMode) {
      updateVendor()
    } else {
      saveVendor()
    }
  }

  const handleEditMode = () => {
    setFormData((prevState: any) => ({
      ...prevState,
      companyName: vendors?.companyName || '',
      phone: vendors?.companyPhoneNumber || '',
      website: vendors?.website || '',
      streetBuildingForAddress: vendors?.street || '',
      aptSuiteForAddress: vendors?.aptSuite || '',
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
      phoneForRepresentative: vendors?.salesRepPhoneNumber || '',
      emailForRepresentative: vendors?.salesRepEmail || '',
      note: vendors?.salesRepNote || '',
    }))
  }

  const saveVendor = async () => {
    const errors = validateAddVendorFields()
    if (Object.keys(errors).length > 0) {
      return
    }
    setIsLoading(true)

    try {
      const payload = {
        companyName: formData?.companyName,
        companyPhoneNumber: formData?.phone,
        website: formData?.website,
        street: formData?.streetBuildingForAddress,
        aptSuite: formData?.aptSuiteForAddress,
        stateId: formData?.stateForAddress?.id,
        countryId: formData?.countryForAddress?.id || '',
        zipCode: formData?.zipCodeForAddress,
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
        salesRepPhoneNumber: formData?.phoneForRepresentative,
        salesRepEmail: formData?.emailForRepresentative,
        salesRepNote: formData?.note,
      }
      const response = await addVendor(payload).unwrap()
      const { status, message } = response as VendorResponse
      if (status === 200 || status === 201) {
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Vendor Saved successfully',
          life: 3000,
        })
        closeModal()
        getVendor()
        setIsLoading(false)
      } else {
        setIsLoading(true)
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message, data } = error as ErrorResponse
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: data?.message,
        life: 3000,
      })
    }
  }

  const updateVendor = async () => {
    const errors = validateAddVendorFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    try {
      setIsLoading(true)
      const payload = {
        companyName: formData?.companyName || vendors?.companyName,
        companyPhoneNumber: formData?.phone || vendors?.companyPhoneNumber,
        website: formData?.website || vendors?.website,
        street: formData?.streetBuildingForAddress || vendors?.street,
        aptSuite: formData?.aptSuiteForAddress || vendors?.aptSuite,
        stateId: formData?.stateForAddress?.id || vendors?.stateResponseDto?.id,
        countryId: formData?.countryForAddress?.id || vendors?.countryResponseDto?.id,
        zipCode: formData?.zipCodeForAddress || vendors?.zipCode,
        companyEmail: formData?.emailForAddress || vendors?.companyEmail,
        accountNumber: formData?.accountNumber || vendors?.accountNumber,
        remitStreet: formData?.streetBuildingForRemit || vendors?.remitStreet,
        remitApt: formData?.aptSuiteForRemit || vendors?.remitApt,
        remitStateId: formData?.stateForRemit?.id || vendors?.remitStateResponseDto?.id,
        remitCountryId: formData?.countryForRemit?.id || vendors?.remitCountryResponseDto?.id,
        remitZipCode: formData?.zipCodeForRemit || vendors?.remitZipCode,
        remitEmailAddress: formData?.emailForRemit || vendors?.remitEmailAddress,
        firstName: formData?.firstName || vendors?.firstName,
        lastName: formData?.lastName || vendors?.lastName,
        salesRepPhoneNumber: formData?.phoneForRepresentative || vendors?.salesRepPhoneNumber,
        salesRepEmail: formData?.emailForRepresentative || vendors?.salesRepEmail,
        salesRepNote: formData?.note || vendors?.salesRepNote,
      }
      const response = await editVendor({
        payload: payload,
        id: vendors?.id,
      }).unwrap()
      const { status, message } = response as VendorResponse
      if (status === 200 || status === 201) {
        setIsLoading(false)
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Vendor Updated successfully',
          life: 3000,
        })
        closeModal()
        getVendor()
      } else {
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
        detail: data.message,
        life: 3000,
      })
    }
  }

  useEffect(() => {
    if (editMode && vendors) {
      handleEditMode()
    } else {
    }
  }, [editMode, vendors])

  useEffect(() => {
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  return (
    <>
      <div className="main">
        <div className="flex">
          <div className="flex gap-8">
            <div>
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                <div className="flex gap-1">
                  Company Name
                  <p className="text-red-600">*</p>
                </div>
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
                    fontSize: '0.70rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
              {fieldErrors.companyName && (
                <small className="p-error">{fieldErrors.companyName}</small>
              )}
            </div>
            <div>
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                <div className="flex gap-1">
                  Phone
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-2">
                <InputComponent
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  value={formData.phone}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.phone ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.70rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
              {fieldErrors.phone && <small className="p-error">{fieldErrors.phone}</small>}
            </div>
            <div>
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                <div className="flex gap-1">
                  Website
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-2">
                <InputComponent
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  value={formData.website}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.website ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.70rem',
                    paddingLeft: '0.5rem',
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
              <h1 style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                <div className="flex gap-1">
                  Address
                  <p className="text-red-600">*</p>
                </div>
              </h1>
            </div>

            <div className=" flex gap-2 mt-2">
              <div>
                <div>
                  <div className="mt-2">
                    <InputComponent
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
                  <div className="mt-3">
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
                  <div className="mt-3 ">
                    <InputComponent
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
                    <InputComponent
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
                  <div className="mt-3">
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
                  <div className="mt-3 ">
                    <InputComponent
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
                  <div className="flex gap-1">
                    Remit Address
                    <p className="text-red-600">*</p>
                  </div>
                </h1>
              </div>
              <div className="flex mt-2 gap-2">
                <div className="mt-1">
                  <div>
                    <div className="">
                      <InputComponent
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
                  <div className="mt-3">
                    <Dropdown
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

                  <div className="mt-3">
                    <InputComponent
                      type="text"
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
                      <InputComponent
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
                    <div className="mt-3">
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
                  <div className="mt-3">
                    <InputComponent
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
      <div>
        <div className="mt-5">
          <div className="ml-1 text-black font-semibold text-sm">
            <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
              <div className="flex gap-1">
                Account Number
                <p className="text-red-600">*</p>
              </div>
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
                <div className="flex gap-1">
                  First Name
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>
            <div className="mt-1">
              <InputComponent
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
                  paddingLeft: '0.5rem',
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
                  <div className="flex gap-1">
                    Last Name
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>
              <div className="mt-1">
                <InputComponent
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder=""
                  type="text"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.lastName ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.70rem',
                    backgroundColor: '#F5F5F5',
                    paddingLeft: '0.5rem',
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
                <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                  <div className="flex gap-1">
                    Phone
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>
              <div className="mt-1">
                <InputComponent
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
                    paddingLeft: '0.5rem',
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
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                <div className="flex gap-1">
                  Email
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>
            <div className="mt-1">
              <InputComponent
                value={formData.emailForRepresentative}
                onChange={(e) => handleInputChange('emailForRepresentative', e.target.value)}
                placeholder=""
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
                  paddingLeft: '0.5rem',
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
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                <div className="flex gap-1">
                  Note
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>
            <div className="mt-1">
              <InputComponent
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
                  padding: '10px',
                }}
              />
              <p>{fieldErrors.note && <small className="p-error">{fieldErrors.note}</small>}</p>
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
            fontSize: '1rem',
            boxShadow: 'none',
            color: 'white',
            borderRadius: '0.50rem',
            marginTop: '10px',
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
            height: '42px',
            marginTop: '10px',
          }}
        />
      </div>
    </>
  )
}

export default AddVendor
