import React, { useState, useEffect, useCallback, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import InputComponent from '../CommonComponent/InputComponent'
import { Country, Role, State } from '../../Type/CommonType'
import { CustomerAdminDataProps } from '../../Type/ComponentBasedType'
import useMetaData from '../CommonComponent/MetaDataComponent/RolesData'
import { CustomerPayload, SaveUserResponse } from '../../Type/ApiTypes'
import { useAddUserMutation, useUpdateUserMutation } from '../../Services/AdminTools/AdminToolsApi'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import RolesData from '../CommonComponent/MetaDataComponent/RolesData'
import StatesData from '../CommonComponent/MetaDataComponent/StatesData'
import CountriesData from '../CommonComponent/MetaDataComponent/CountriesData'

const AddNewCustomer: React.FC<CustomerAdminDataProps> = ({
  customerData,
  editMode,
  editCustomerMode,
  getUser,
  getCustomerUser,
  closeModal,
  customerAdminId,
  setModalVisible,
  customerUsers,
  permission,
  toastRef,
  setSelectedCustomerUser,
  setSelectedCustomer,
}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [apt, setApt] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [role, setRole] = useState<Role>()
  console.log('role', role)

  const [companyName, setCompanyName] = useState('')
  const [country, setCountry] = useState<Country>()
  const [state, setState] = useState<State>()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rolesData, setRolesData] = useState<Role[]>()
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()
  const [errorMessage, setErrorMessage] = useState<string>()

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [selectedCustomerId, setSelectedCustomerId] = useState<any>()
  const [firstErrorField, setFirstErrorField] = useState('')
  const [customerAdminDropdownEnabled, setCustomerAdminDropdownEnabled] = useState(false)
  const [addCustomer] = useAddUserMutation()
  const [editCustomer] = useUpdateUserMutation()
  const { getRolesData } = RolesData()
  const { getStatesData } = StatesData()
  const { getCountriesData } = CountriesData()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [passwordCriteria, setPasswordCriteria] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    length: false,
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    const nameRegex = /^[a-zA-Z ]+$/
    const errors: { [key: string]: string } = {}
    let firstError = ''
    if (!name) {
      errors.name = 'Name is required'
    } else if (!nameRegex.test(name)) {
      errors.name = 'Name must only contain letters'
    } else if (name.length < 3) {
      errors.name = 'Name must be at least 3 characters long'
    }
    if (errors.name) {
      firstError = 'name'
    }
    if (!phone) {
      errors.phone = 'Phone is required'
    } else if (!phoneRegex.test(phone)) {
      errors.phone = 'Phone must be a 10-digit number'
    }
    if (errors.phone && !firstError) {
      firstError = 'phone'
    }
    if (!email) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email format'
    }
    if (errors.email && !firstError) {
      firstError = 'email'
    }
    if (!street) errors.street = 'Street is required'
    if (errors.street && !firstError) {
      firstError = 'street'
    }
    if (!apt) errors.apt = 'Apt is required'
    if (errors.apt && !firstError) {
      firstError = 'apt'
    }
    if (!zipCode) errors.zipCode = 'ZipCode is required'
    if (errors.zipCode && !firstError) {
      firstError = 'zipCode'
    }
    if (!role) errors.role = 'Role is required'
    if (errors.role && !firstError) {
      firstError = 'role'
    }
    if (
      !selectedCustomerId &&
      customerAdminDropdownEnabled &&
      !permission &&
      (role?.id === 3 || role?.id === 4)
    )
      errors.selectedCustomerId = 'Customer Admin is required'
    if (errors.selectedCustomerId && !firstError) {
      firstError = 'selectedCustomerId'
    }
    if (!companyName) errors.companyName = 'Company Name is required'
    if (errors.companyName && !firstError) {
      firstError = 'companyName'
    }
    if (!country) errors.country = 'Country is required'
    if (errors.country && !firstError) {
      firstError = 'country'
    }
    if (!state) errors.state = 'State is required'
    if (errors.state && !firstError) {
      firstError = 'state'
    }
    if (!password && !editMode) {
      errors.password = 'Password is required'
    }
    if (errors.password && !firstError) {
      firstError = 'password'
    }
    if (!confirmPassword && !editMode) errors.confirmPassword = 'Confirm Password is required'
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match'
    if (errors.confirmPassword && !firstError) {
      firstError = 'confirmPassword'
    }
    setFirstErrorField(firstError)
    return errors
  }

  const validatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[@$!%*?&]/.test(password)
    const hasMinLength = password.length >= 10

    setPasswordCriteria({
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      specialChar: hasSpecialChar,
      length: hasMinLength,
    })

    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar && hasMinLength
  }

  const handleFocus = () => {
    const passwordMessage = document.getElementById('password-message')
    if (passwordMessage) {
      passwordMessage.style.display = 'block'
      passwordMessage.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleInputChange = (fieldName: string, value: any) => {
    switch (fieldName) {
      case 'name':
        setName(value)
        break
      case 'companyName':
        setCompanyName(value)
        break
      case 'phone':
        setPhone(value)
        break
      case 'email':
        setEmail(value)
        setErrorMessage('')
        break
      case 'street':
        setStreet(value)
        break
      case 'apt':
        setApt(value)
        break
      case 'zipCode':
        setZipCode(value)
        break
      case 'password':
        setPassword(value)
        setErrorMessage('')
        validatePassword(value)
        handleFocus()
        break
      case 'confirmPassword':
        setConfirmPassword(value)
        break

      default:
        break
    }
    setFieldErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }))
  }

  const handleBlur = () => {
    const passwordMessage = document.getElementById('password-message')
    if (passwordMessage) passwordMessage.style.display = 'none'
  }

  const handleEdit = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    const editUserPayload = {
      name,
      companyName: companyName,
      phoneNumber: phone,
      email,
      street,
      apt,
      zipCode,
      stateId: state?.id ? state?.id : customerData?.state,
      countryId: country?.id ? country?.id : customerData?.country,
      roleId: role?.id ? role?.id : customerData?.role,
    }

    setIsLoading(true)
    try {
      const response = await editCustomer({
        payload: editUserPayload,
        id: customerData.id,
        customerAdminId: editCustomerMode ? '' : customerData.customerAdminId,
      }).unwrap()
      const { status, message } = response as SaveUserResponse
      if (status === 200 || status === 201) {
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User Updated successfully',
          life: 3000,
        })
        getUser()
        if (getCustomerUser) {
          getCustomerUser()
        }
        setModalVisible(false)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setErrorMessage(message || 'An error occurred while updating the customer.')
      }
    } catch (error) {
      setIsLoading(false)
      setErrorMessage('An unexpected error occurred. Please try again later.')
    }
  }

  const handleSave = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    const selectedCustomer = customerUsers?.find(
      (customer: any) => customer?.name === selectedCustomerId?.name,
    )

    if (!selectedCustomer && (role?.id === 3 || role?.id === 4) && !permission) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        selectedCustomerId: 'Invalid customer admin',
      }))
      return
    }

    const selectedCustomerAdminId = selectedCustomer?.id

    if (password !== confirmPassword) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }))
      return
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password is required')
      return
    }
    setIsLoading(true)
    try {
      // Encode the password using base64
      const encodedPassword = btoa(password)
      const addUserPayload = {
        name,
        companyName: companyName,
        phoneNumber: phone,
        email,
        street,
        apt,
        zipCode,
        password: encodedPassword, // Using base64 encoded password
        stateId: state?.id,
        countryId: country?.id,
        roleId: role?.id,
        confirmPassword: encodedPassword, // Using base64 encoded password for confirmPassword
      }

      // Send the encoded password to the server
      const response = await addCustomer({
        payload: addUserPayload,
        customerAdminId: permission ? customerAdminId : selectedCustomerAdminId,
      }).unwrap()
      const { status, message } = response as SaveUserResponse
      if (status === 200 || status === 201) {
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User Saved successfully',
          life: 3000,
        })
        getUser()
        setIsLoading(false)
      } else {
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message || 'An error occurred while saving the customer.',
          life: 3000,
        })
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
    setModalVisible(false)
  }

  const handleClick = () => {
    if (editMode || editCustomerMode) {
      handleEdit()
    } else {
      handleSave()
    }
  }

  const handleBack = () => {
    setModalVisible(false)
    setSelectedCustomerUser('')
    setSelectedCustomer('')
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { statesData } = await getStatesData()
    const { rolesData } = await getRolesData()
    const { countriesData } = await getCountriesData()
    if (rolesData !== null) {
      setRolesData(rolesData)
    }
    if (countriesData !== null) {
      setCountriesData(countriesData)
    }
    if (statesData !== null) {
      setStatesData(statesData)
    }
  }, [])

  const handleEditMode = () => {
    if (editMode && customerData) {
      setName(customerData.name || '')
      setCompanyName(customerData.userID || '')
      setPhone(customerData.phoneNumber || '')
      setEmail(customerData.email || '')
      setStreet(customerData.street || '')
      setApt(customerData.apt || '')
      setZipCode(customerData.zipCode || '')
      setRole(customerData.role || undefined)
      setCountry(customerData.country || undefined)
      setState(customerData.state || undefined)
      const selectedCustomerAdmin = customerUsers?.find(
        (customer: any) => customer.id === customerAdminId,
      )
      const selectedCustomerAdminName = selectedCustomerAdmin ? selectedCustomerAdmin.name : ''
      setSelectedCustomerId(selectedCustomerAdminName)
    }
  }

  useEffect(() => {
    if (firstErrorField) {
      document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [firstErrorField])

  useEffect(() => {
    if (role && (role.name === 'FINANCE' || role.name === 'TECHNICIAN')) {
      setCustomerAdminDropdownEnabled(true)
    } else {
      setCustomerAdminDropdownEnabled(false)
    }
  }, [role])

  useEffect(() => {
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  useEffect(() => {
    handleEditMode()
  }, [editMode, editCustomerMode, customerData])

  return (
    <>
      <div
        style={{
          height: 'calc(600px - 150px)',
          overflowY: 'scroll',
          overflowX: 'scroll',
          paddingBottom: '50px',
        }}
        className="NoScrollBar">
        <div className="flex gap-8 mt-5 ml-4">
          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Name
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <InputText
                value={name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={fieldErrors.name ? 'p-invalid' : ''}
                style={{
                  width: '232px',
                  height: '32px',
                  border: fieldErrors.name ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>

            <p className="p-1" id="name">
              {fieldErrors.name && <small className="p-error">{fieldErrors.name}</small>}
            </p>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Phone
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <InputText
                value={phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.phone ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
            <p className="p-1" id="phone">
              {fieldErrors.phone && <small className="p-error">{fieldErrors.phone}</small>}
            </p>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Email Address
                <p className="text-red-600">*</p>
              </div>
            </span>

            <div className="mt-1">
              <InputText
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border:
                    fieldErrors.email ||
                    (errorMessage && errorMessage.includes('Email already present'))
                      ? '1px solid red'
                      : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
            <p id="email">
              {fieldErrors.email && <small className="p-error">{fieldErrors.email}</small>}
            </p>
            <p>
              {errorMessage && errorMessage.includes('Email already present') && (
                <small className="p-error mt-1">Email already present</small>
              )}
            </p>
          </div>
        </div>

        <div className="flex gap-8 ml-4">
          <div>
            <div className="mt-3">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Role
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>
            <div className="mt-1">
              <Dropdown
                value={role}
                onChange={(e) => {
                  setRole(e.value)
                  if (e.value !== 'FINANCE' || e.value !== 'TECHNICIAN') {
                    setSelectedCustomerId('')
                  }
                  if (!permission) {
                    setFieldErrors((prevErrors) => ({ ...prevErrors, role: '' }))
                  }
                }}
                options={rolesData}
                optionLabel="name"
                disabled={editCustomerMode}
                editable
                placeholder="Select"
                style={{
                  width: '230px',
                  height: '32px',
                  minHeight: '32px',
                  border: fieldErrors.role ? '1px solid red' : '1px solid #D5E1EA',
                  fontSize: '0.8rem',
                  borderRadius: '0.50rem',
                }}
              />
            </div>
            <p className="p-1" id="role">
              {fieldErrors.role && <small className="p-error">{fieldErrors.role}</small>}
            </p>
          </div>

          {!permission && (
            <div>
              <div className="mt-3">
                <span className="font-medium text-sm text-[#000000]">
                  <div className="flex gap-1">
                    Customer Admin
                    {customerAdminDropdownEnabled && <p className="text-red-600">*</p>}
                  </div>
                </span>
              </div>
              <div className="mt-1">
                <Dropdown
                  value={selectedCustomerId}
                  onChange={(e) => {
                    setSelectedCustomerId(e.value)
                    if (role?.id === 3 || role?.id === 4) {
                      setFieldErrors((prevErrors) => ({ ...prevErrors, selectedCustomerId: '' }))
                    }
                  }}
                  options={customerUsers}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  disabled={customerAdminDropdownEnabled ? false : true}
                  style={{
                    width: '230px',
                    height: '32px',
                    minHeight: '32px',
                    border:
                      role?.name == 'CUSTOMER OWNER' || role?.name === 'ADMINISTRATOR'
                        ? ' '
                        : fieldErrors.selectedCustomerId
                          ? '1px solid red'
                          : '1px solid #D5E1EA',
                    fontSize: '0.8rem',
                    borderRadius: '0.50rem',
                    pointerEvents: customerAdminDropdownEnabled ? 'auto' : 'none',
                    opacity: customerAdminDropdownEnabled ? 1 : 0.5,
                    cursor: customerAdminDropdownEnabled ? 'pointer' : 'not-allowed',
                  }}
                />
              </div>
              <p className="p-1" id="selectedCustomerId">
                {role?.name == 'CUSTOMER OWNER' || role?.name === 'ADMINISTRATOR'
                  ? ' '
                  : fieldErrors.selectedCustomerId && (
                      <small className="p-error">{fieldErrors.selectedCustomerId}</small>
                    )}
              </p>
            </div>
          )}

          <div>
            <div className="mt-3">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Company Name
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>

            <div className="mt-1">
              <InputText
                value={companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.companyName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
            <p id="companyName">
              {fieldErrors.companyName && (
                <small className="p-error">{fieldErrors.companyName}</small>
              )}
            </p>
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

        <div className="mt-5 ml-4">
          <span className="font-medium text-sm text-[#000000]">
            <div className="flex gap-1">
              Address
              <p className="text-red-600">*</p>
            </div>
          </span>
        </div>
        <div className="gap-8 mt-1 ml-4">
          <div className="flex gap-8 ">
            <div>
              <div className="mt-2">
                <InputText
                  value={street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  placeholder="Street/house"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.street ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '0.80em',
                  }}
                />
              </div>

              <p className="p-1" id="street">
                {fieldErrors.street && <small className="p-error">{fieldErrors.street}</small>}
              </p>
            </div>

            <div>
              <div className="mt-2">
                <InputText
                  value={apt}
                  onChange={(e) => handleInputChange('apt', e.target.value)}
                  placeholder="Apt/Suite"
                  type="text"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.apt ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '0.83em',
                  }}
                />
              </div>
              <p className="p-1" id="apt">
                {fieldErrors.apt && <small className="p-error">{fieldErrors.apt}</small>}
              </p>
            </div>

            <div className=" mt-2 ">
              <Dropdown
                value={state}
                onChange={(e) => {
                  setState(e.value)
                  setFieldErrors((prevErrors) => ({ ...prevErrors, state: '' }))
                }}
                options={statesData}
                optionLabel="name"
                editable
                placeholder="State"
                style={{
                  width: '230px',
                  height: '32px',
                  minHeight: '32px',
                  border: fieldErrors.state ? '1px solid red' : '1px solid #D5E1EA',
                  fontSize: '0.8rem',
                  borderRadius: '0.50rem',
                }}
              />
              <p className="p-1" id="state">
                {fieldErrors.state && <small className="p-error">{fieldErrors.state}</small>}
              </p>
            </div>
          </div>

          <div className="flex mt-5 gap-8 ">
            <div className="">
              <Dropdown
                value={country}
                onChange={(e) => {
                  setCountry(e.value)
                  setFieldErrors((prevErrors) => ({ ...prevErrors, country: '' }))
                }}
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

              <p className="p-1" id="country">
                {fieldErrors.country && <small className="p-error">{fieldErrors.country}</small>}
              </p>
            </div>

            <div>
              <InputText
                value={zipCode}
                invalid
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="Zipcode"
                style={{
                  width: '230px',
                  height: '32px',
                  border: fieldErrors.zipCode ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '0.83em',
                }}
              />
              <p className="p-1" id="zipCode">
                {fieldErrors.zipCode && <small className="p-error">{fieldErrors.zipCode}</small>}
              </p>
            </div>
          </div>
        </div>

        {!editMode && (
          <div className="flex mt-5 gap-8 ml-4">
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1 text-center ">
                  Create password
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <div style={{ position: 'relative', width: '230px', marginBottom: '10px' }}>
                  <InputComponent
                    value={password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    onBlur={handleBlur}
                    style={{
                      width: '230px',
                      height: '32px',
                      border:
                        fieldErrors.password || errorMessage
                          ? '1px solid red'
                          : '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      padding: '1.2em',
                    }}
                  />
                  {/* <img
                    src={showPassword ? '/assets/images/eye.png' : '/assets/images/eye-slash.png'}
                    alt="Toggle Password Visibility"
                    onClick={handleShowPassword}
                    className="p-clickable"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      zIndex: '1',
                    }}
                  /> */}
                  <p className="p-1 w-48" id="password">
                    {fieldErrors.password || errorMessage ? (
                      <small className="p-error">
                        {fieldErrors.password}
                        {errorMessage}
                      </small>
                    ) : (
                      ''
                    )}
                  </p>
                </div>

                <div
                  style={{ width: '230px', fontSize: '14px' }}
                  id="password-message"
                  className="mt-2 hidden ">
                  <h3 className="font-medium text-sm text-[#000000] flex justify-center mr-3">
                    PASSWORD MUST CONTAIN:
                  </h3>
                  <div className="flex items-center gap-6 p-1 mt-2">
                    {passwordCriteria.uppercase ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}
                    <p
                      className={`password-message-item ${passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'}`}>
                      At least <span className="font-[500]"> one uppercase letter</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6 p-1 ">
                    {passwordCriteria.lowercase ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}

                    <p
                      className={`password-message-item ${passwordCriteria.lowercase ? 'text-green-500' : 'text-red-500'}`}>
                      At least <span className="font-[500]">one lowercase letter</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-6 p-1 ">
                    {passwordCriteria.number ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}
                    <p
                      className={`password-message-item ${passwordCriteria.number ? 'text-green-500' : 'text-red-500'}`}>
                      At least<span className="font-[500]">one number</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6 p-1 ">
                    {passwordCriteria.specialChar ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}
                    <p
                      className={`password-message-item ${passwordCriteria.specialChar ? 'text-green-500' : 'text-red-500'}`}>
                      At least<span className="font-[500]">one special character</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-6 p-1 ">
                    {passwordCriteria.length ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}
                    <p
                      className={`password-message-item ${passwordCriteria.length ? 'text-green-500' : 'text-red-500'}`}>
                      At least <span className="font-[500]">10 characters</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Confirm password
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1 ">
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <InputComponent
                    value={confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    type={showConfirmPassword ? 'text' : 'password'}
                    style={{
                      width: '230px',
                      height: '32px',
                      border: fieldErrors.confirmPassword ? '1px solid red' : '1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      padding: '1.2em',
                    }}
                  />
                  {/* <img
                    src={
                      showConfirmPassword
                        ? '/assets/images/eye.png'
                        : '/assets/images/eye-slash.png'
                    }
                    alt="Toggle Password Visibility"
                    onClick={handleShowConfirmPassword}
                    className="p-clickable"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      zIndex: '1',
                    }}
                  /> */}
                  {fieldErrors.confirmPassword && (
                    <small className="p-error" id="confirmPassword">
                      {fieldErrors.confirmPassword}
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save and Back buttons */}
        {/* <div style={{ width: '100%', backgroundColor: 'white', padding: '0 12px' }}> */}
      </div>
      <div
        className="flex gap-4 ml-4 bottom-2 absolute left-6"
        style={{
          width: '100%',
          height: '80px',
          backgroundColor: 'white',
          padding: '0 12px',
          marginBottom: '2px',
        }}>
        <Button
          label={editMode ? 'Update' : 'Save'}
          onClick={handleClick}
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
            top: '20px',
          }}
        />
      </div>
      {/* </div> */}
    </>
  )
}

export default AddNewCustomer
