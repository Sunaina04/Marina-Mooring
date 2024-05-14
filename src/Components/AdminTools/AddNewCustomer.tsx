import React, { useState, useEffect, useCallback } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import InputComponent from '../CommonComponent/InputComponent'
import { Country, Role, State } from '../../Type/CommonType'
import { CustomerAdminDataProps } from '../../Type/ComponentBasedType'
import useMetaData from '../CommonComponent/MetaDataComponent'
import { SaveUserResponse } from '../../Type/ApiTypes'
import { useAddUserMutation } from '../../Services/AdminTools/AdminToolsApi'
import { Dialog } from 'primereact/dialog'

const AddNewCustomer: React.FC<CustomerAdminDataProps> = ({
  customerData,
  editMode,
  getUser,
  closeModal,
  customerAdminId,
}) => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [apt, setApt] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [role, setRole] = useState<Role>()
  const [country, setCountry] = useState<Country>()
  const [state, setState] = useState<State>()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [addCustomer] = useAddUserMutation()
  const { getMetaData } = useMetaData()
  const [rolesData, setRolesData] = useState<Role[]>()
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [successMessage, setSuccessMessage] = useState<string>()
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const validateFields = () => {
    const errors: { [key: string]: string } = {}
    if (!name) errors.name = 'Name is required'
    if (!id) errors.id = 'ID is required'
    if (!phone) errors.phone = 'Phone is required'
    if (!email) errors.email = 'Email is required'
    if (!street) errors.street = 'Street is required'
    if (!street) errors.apt = 'Apt is required'
    if (!zipCode) errors.zipCode = 'ZipCode is required'
    if (!role) errors.role = 'Role is required'
    if (!country) errors.country = 'Country is required'
    if (!state) errors.state = 'State is required'
    if (!password) errors.password = 'Password is required'
    if (!password) errors.confirmPassword = 'Confirm Password is required'
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match'
    return errors
  }

  const handleInputChange = (fieldName: string, value: any) => {
    switch (fieldName) {
      case 'name':
        setName(value)
        break
      case 'id':
        setId(value)
        break
      case 'phone':
        setPhone(value)
        break
      case 'email':
        setEmail(value)
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
        break
      case 'confirmPassword':
        setConfirmPassword(value)
        break
      default:
        break
    }
    setFieldErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }))
  }

  const handleSave = async () => {
    setErrorMessage('')
    setSuccessMessage('')
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    const addUserPayload = {
      name,
      userID: id,
      phoneNumber: phone,
      email,
      street,
      apt,
      zipCode,
      password,
      state: state?.name,
      country: country?.name,
      role: role?.name,
      confirmPassword,
    }

    try {
      const response = await addCustomer({
        payload: addUserPayload,
        customerAdminId: customerAdminId,
      }).unwrap()
      const { status, content, message } = response as SaveUserResponse
      if (status === 200) {
        setSuccessMessage(message || 'Customer added successfully')
        setShowSuccessModal(true)
        getUser()
      } else {
        setErrorMessage(message || 'An error occurred while saving the customer.')
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again later.')
    }
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { rolesData, countriesData, statesData } = await getMetaData()
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

  useEffect(() => {
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  return (
    <>
      <div style={{ width: '300px', minWidth: '300px', height: '500px' }}>
        {errorMessage && <div className="p-error">{errorMessage}</div>}
        {successMessage && <div className="p-success">{successMessage}</div>}

        <div className="flex gap-6 mt-3 ">
          <div>
            <span className="text-xs text-black">Name</span>
            <div className="mt-1">
              <InputText
                value={name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                  padding: '1.2em',
                }}
              />
              {fieldErrors.name && <small className="p-error">{fieldErrors.name}</small>}
            </div>
          </div>

          <div>
            <span className="text-xs text-black">ID</span>
            <div className="mt-1">
              <InputText
                value={id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                  padding: '1.2em',
                }}
              />
              {fieldErrors.id && <small className="p-error">{fieldErrors.id}</small>}
            </div>
          </div>

          <div>
            <span className="text-xs text-black">Phone</span>
            <div className="mt-1">
              <InputText
                value={phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                  padding: '1.2em',
                }}
              />
              {fieldErrors.phone && <small className="p-error">{fieldErrors.phone}</small>}
            </div>
          </div>
        </div>

        <div className="flex gap-6 ">
          <div>
            <div className="mt-3">
              <span className="text-xs text-black">Email Address</span>
            </div>

            <div className="mt-1">
              <InputText
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                  padding: '1.2em',
                }}
              />
              {fieldErrors.email && <small className="p-error">{fieldErrors.email}</small>}
            </div>
          </div>

          <div>
            <div className="mt-3">
              <span className="text-xs text-black">Role</span>
            </div>

            <div className="mt-1">
              <Dropdown
                value={role}
                onChange={(e) => {
                  setRole(e.value)
                  setFieldErrors((prevErrors) => ({ ...prevErrors, role: '' }))
                }}
                options={rolesData}
                optionLabel="name"
                editable
                placeholder="Select"
                style={{
                  width: '230px',
                  height: '32px',
                  minHeight: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                }}
              />
              {fieldErrors.role && <small className="p-error">{fieldErrors.role}</small>}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h1 className="text-xs text-blac">Address</h1>
        </div>

        <div className="gap-6 mt-4">
          <div className="flex gap-6 ">
            <div>
              <div className="mt-2">
                <InputText
                  value={street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  placeholder="Street/house"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    padding: '0.80em',
                  }}
                />
                {fieldErrors.street && <small className="p-error">{fieldErrors.street}</small>}
              </div>
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
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    padding: '0.83em',
                  }}
                />
              </div>
              {fieldErrors.apt && <small className="p-error">{fieldErrors.apt}</small>}
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
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                }}
              />
              {fieldErrors.state && <small className="p-error">{fieldErrors.state}</small>}
            </div>
          </div>

          <div className="flex mt-5 gap-6 ">
            <div className="card flex justify-content-center">
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
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                }}
              />
            </div>
            {fieldErrors.country && <small className="p-error">{fieldErrors.country}</small>}

            <InputText
              value={zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="Zipcode"
              style={{
                width: '230px',
                height: '32px',
                border: '1px solid #D5E1EA',
                borderRadius: '0.50rem',
                padding: '0.83em',
              }}
            />
            {fieldErrors.zipCode && <small className="p-error">{fieldErrors.zipCode}</small>}
          </div>
        </div>

        <div className="flex mt-5 gap-6">
          <div>
            <span className="text-xs text-black">Create password</span>
            <div className="mt-1">
              <InputComponent
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                  padding: '1.2em',
                }}
              />
              {fieldErrors.password && <small className="p-error">{fieldErrors.password}</small>}
            </div>
          </div>
          <div className="">
            <span className="text-xs text-black">Confirm password</span>
            <div className="mt-1 ">
              <InputComponent
                value={confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                  padding: '1.2em',
                }}
              />
              {fieldErrors.confirmPassword && (
                <small className="p-error">{fieldErrors.confirmPassword}</small>
              )}
            </div>
          </div>
        </div>

        {/* Save and Back buttons */}
        <div className="flex gap-6 mt-10 ">
          <Button
            label={'Save'}
            onClick={handleSave}
            style={{
              width: '6vw',
              height: '6vh',
              minHeight: '6vh',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontSize: '1vw',
              color: 'white',
              borderRadius: '0.50rem',
            }}
          />
          <Button
            label={'Back'}
            onClick={() => {}}
            text={true}
            style={{
              width: '6vw',
              height: '6vh',
              minHeight: '6vh',
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
            }}
          />
        </div>
      </div>

      <Dialog
        header="Success"
        visible={showSuccessModal}
        style={{ width: '50vw' }}
        onHide={() => {
          setShowSuccessModal(false)
          closeModal()
        }}>
        <p>{successMessage}</p>
      </Dialog>
    </>
  )
}

export default AddNewCustomer
